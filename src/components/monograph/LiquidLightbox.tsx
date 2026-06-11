'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import { getProjectById, type Project } from '@/data/projects';
import LogoBoard from './LogoBoard';

/* ──────────────────────────────────────────────────────────
   "Liquid Spotlight" — the monograph's project lightbox.

   The artwork is shown whole (contain-fit) and crisp, sitting
   on a softly blurred, dimmed copy of itself so there are no
   hard letterbox bars — a premium gallery wall. The image
   ripples under the pointer like water, and stepping between
   pieces plays a noise-driven liquid wipe. No darkening of the
   work itself; full color, full resolution at rest.

   The classic version keeps the shared FullscreenDetail — this
   component is monograph-only.
   ────────────────────────────────────────────────────────── */

// Token-driven — follows the monograph's active palette (CSS vars inherit
// from MonographView's root, which wraps this overlay in the DOM tree).
const PALETTE = {
  bg: 'var(--mg-bg)',
  bone: 'var(--mg-fg)',
  muted: 'color-mix(in srgb, var(--mg-fg) 62%, transparent)',
  faint: 'color-mix(in srgb, var(--mg-fg) 34%, transparent)',
  hair: 'color-mix(in srgb, var(--mg-fg) 16%, transparent)',
  brand: '#F15A29',
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uFrom;
  uniform sampler2D uTo;
  uniform float uProgress;
  uniform float uTime;
  uniform vec2  uRes;
  uniform float uFromAspect;
  uniform float uToAspect;
  uniform vec2  uMouse;
  uniform float uFlow;

  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
           + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float canvasAspect() { return uRes.x / uRes.y; }

  // whole image, centered, fit inside the canvas (rgb + inside-mask in .a)
  vec4 containSample(sampler2D tex, float imgA, vec2 uv) {
    float cA = canvasAspect();
    vec2 occupy = imgA > cA ? vec2(1.0, cA / imgA) : vec2(imgA / cA, 1.0);
    vec2 iuv = (uv - 0.5) / occupy + 0.5;
    float inside = step(0.0, iuv.x) * step(iuv.x, 1.0)
                 * step(0.0, iuv.y) * step(iuv.y, 1.0);
    vec3 c = texture2D(tex, clamp(iuv, 0.0, 1.0)).rgb;
    return vec4(c, inside);
  }

  // image scaled to cover the canvas, softly blurred — ambient backdrop
  vec3 coverBlur(sampler2D tex, float imgA, vec2 uv) {
    float cA = canvasAspect();
    vec2 f = imgA > cA ? vec2(cA / imgA, 1.0) : vec2(1.0, imgA / cA);
    vec2 iuv = (uv - 0.5) * f + 0.5;
    vec3 sum = vec3(0.0);
    for (int x = -2; x <= 2; x++) {
      for (int y = -2; y <= 2; y++) {
        sum += texture2D(tex, clamp(iuv + vec2(float(x), float(y)) * 0.013, 0.0, 1.0)).rgb;
      }
    }
    return sum / 25.0;
  }

  void main() {
    vec2 uv = vUv;
    float pr = uProgress;
    float intensity = sin(pr * 3.14159265);

    // pointer ripple — water under the cursor, decays with uFlow
    vec2 tm = uv - uMouse;
    float dd = length(tm);
    float ripK = exp(-dd * dd / 0.03) * uFlow;
    vec2 ripple = normalize(tm + 1e-5) * sin(dd * 45.0 - uTime * 5.0) * 0.006 * ripK;

    // liquid wipe field
    float n  = snoise(uv * 2.5 + uTime * 0.05);
    float n2 = snoise(uv * 3.3 - uTime * 0.04);
    float field = n * 0.5 + 0.5;
    float drive = mix(-0.3, 1.3, pr);
    float mask = smoothstep(field - 0.26, field + 0.26, drive);
    vec2 flow = vec2(n, n2) * 0.05 * intensity;

    // ambient blurred backdrops (no hard bars)
    vec3 bg = mix(coverBlur(uFrom, uFromAspect, uv),
                  coverBlur(uTo,   uToAspect,   uv), mask) * 0.42;

    // crisp foregrounds with transition flow + pointer ripple
    vec4 fFrom = containSample(uFrom, uFromAspect, uv + flow * pr + ripple);
    vec4 fTo   = containSample(uTo,   uToAspect,   uv - flow * (1.0 - pr) + ripple);
    vec3 fg = mix(fFrom.rgb, fTo.rgb, mask);
    float fa = mix(fFrom.a, fTo.a, mask);

    gl_FragColor = vec4(mix(bg, fg, fa), 1.0);
  }
`;

function Scene({ images, index }: { images: string[]; index: number }) {
  const textures = useTexture(images) as THREE.Texture[];
  const { size, gl } = useThree();
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const cur = useRef(index); // currently-settled index
  const progress = useRef({ v: 1 });
  const mounted = useRef(false);
  const flow = useRef(0);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useMemo(() => {
    textures.forEach((t) => {
      // NoColorSpace: a custom ShaderMaterial does no linear→sRGB output
      // encoding, so the raw sRGB texels must pass through undecoded —
      // otherwise the artwork renders uniformly darkened.
      t.colorSpace = THREE.NoColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.wrapS = THREE.ClampToEdgeWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;
      t.generateMipmaps = false;
    });
  }, [textures]);

  const aspects = useMemo(
    () =>
      textures.map((t) => {
        const img = t.image as { naturalWidth?: number; naturalHeight?: number; width: number; height: number };
        return (img?.naturalWidth || img?.width || 1) / (img?.naturalHeight || img?.height || 1);
      }),
    [textures]
  );
  const aspectsRef = useRef(aspects);
  aspectsRef.current = aspects;

  const uniforms = useMemo(
    () => ({
      uFrom: { value: textures[index] },
      uTo: { value: textures[index] },
      uProgress: { value: 1 },
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(size.width, size.height) },
      uFromAspect: { value: aspects[index] ?? 1 },
      uToAspect: { value: aspects[index] ?? 1 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uFlow: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // keep resolution in sync
  useEffect(() => {
    if (matRef.current) matRef.current.uniforms.uRes.value.set(size.width, size.height);
  }, [size]);

  // transition on index change (skip the very first run = open)
  useEffect(() => {
    const mat = matRef.current;
    if (!mat) return;
    if (!mounted.current) {
      mounted.current = true;
      cur.current = index;
      return;
    }
    if (index === cur.current) return;
    const from = cur.current;
    mat.uniforms.uFrom.value = textures[from];
    mat.uniforms.uFromAspect.value = aspectsRef.current[from] ?? 1;
    mat.uniforms.uTo.value = textures[index];
    mat.uniforms.uToAspect.value = aspectsRef.current[index] ?? 1;
    progress.current.v = 0;
    mat.uniforms.uProgress.value = 0;
    const tween = gsap.to(progress.current, {
      v: 1,
      duration: 0.95,
      ease: 'power2.inOut',
      onUpdate: () => {
        mat.uniforms.uProgress.value = progress.current.v;
      },
      onComplete: () => {
        cur.current = index;
        mat.uniforms.uFrom.value = textures[index];
        mat.uniforms.uFromAspect.value = aspectsRef.current[index] ?? 1;
        progress.current.v = 1;
      },
    });
    return () => {
      tween.kill();
    };
  }, [index, textures]);

  // pointer ripple
  useEffect(() => {
    const el = gl.domElement;
    const m = mouse.current;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      m.x = (e.clientX - r.left) / r.width;
      m.y = 1 - (e.clientY - r.top) / r.height;
      flow.current = 1;
    };
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, [gl]);

  useFrame((_, delta) => {
    const mat = matRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value += delta;
    flow.current *= 0.93;
    mat.uniforms.uFlow.value = flow.current;
    mat.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

function LiquidStage({ images, index }: { images: string[]; index: number }) {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Scene images={images} index={index} />
      </Suspense>
    </Canvas>
  );
}

const IconChevron = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
);

function DetailContent({ project }: { project: Project }) {
  const setDetailProject = useAppStore((s) => s.setDetailProject);
  const [index, setIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);

  const images = useMemo(
    () => [...project.images, ...(project.caseStudy?.additionalImages ?? [])],
    [project]
  );
  const total = images.length;

  const close = () => {
    const el = overlayRef.current;
    if (!el) return setDetailProject(null);
    gsap.to(el, { opacity: 0, duration: 0.28, onComplete: () => setDetailProject(null) });
  };
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const currentImage = images[index];
  const currentFilename = currentImage?.split('/').pop() ?? '';
  const caption = project.captions?.[currentFilename];
  const description = caption || project.caseStudy?.extendedDescription || project.description;

  const dynamicLink = project.imageLinks?.[currentImage] || project.link;
  const singleLinkLabel = dynamicLink?.endsWith('.pdf') ? 'View Report' : 'Visit Site';

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[120]"
      style={{ background: PALETTE.bg, fontFamily: 'var(--font-body)' }}
    >
      {/* WebGL spotlight stage fills the screen */}
      <LiquidStage images={images} index={index} />

      {/* top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-7">
        <div className="pointer-events-auto">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.28em]"
            style={{ fontFamily: 'var(--font-display)', color: PALETTE.brand }}
          >
            {project.client ? `${project.client} · ` : ''}{project.categories[0]}
          </p>
        </div>
        <button
          onClick={close}
          aria-label="Close"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-colors"
          style={{ background: 'color-mix(in srgb, var(--mg-bg) 55%, transparent)', border: `1px solid ${PALETTE.hair}`, color: PALETTE.bone }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* edge nav */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-md transition-colors md:left-6"
            style={{ background: 'color-mix(in srgb, var(--mg-bg) 50%, transparent)', border: `1px solid ${PALETTE.hair}`, color: PALETTE.bone }}
          >
            <IconChevron dir="left" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-md transition-colors md:right-6"
            style={{ background: 'color-mix(in srgb, var(--mg-bg) 50%, transparent)', border: `1px solid ${PALETTE.hair}`, color: PALETTE.bone }}
          >
            <IconChevron dir="right" />
          </button>
        </>
      )}

      {/* floating info panel */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:bottom-7 md:left-7 md:right-auto md:max-w-md md:p-0">
        <div
          className="rounded-xl p-5 backdrop-blur-xl md:p-6"
          style={{ background: 'color-mix(in srgb, var(--mg-bg) 68%, transparent)', border: `1px solid ${PALETTE.hair}` }}
        >
          <button
            onClick={() => setShowInfo((s) => !s)}
            className="flex w-full items-center justify-between gap-4 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="block h-[3px] w-7 rounded-full" style={{ background: PALETTE.brand }} />
              <h2 className="mono-serif text-xl font-semibold tracking-tight md:text-2xl" style={{ color: PALETTE.bone }}>
                {project.title}
              </h2>
              {project.concept && (
                <span
                  className="rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                  style={{ background: PALETTE.brand, color: '#000', fontFamily: 'var(--font-display)' }}
                >
                  Concept
                </span>
              )}
            </div>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              className={`shrink-0 transition-transform ${showInfo ? '' : 'rotate-180'}`}
              style={{ color: PALETTE.faint }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <div
            className="grid transition-all duration-300"
            style={{ gridTemplateRows: showInfo ? '1fr' : '0fr', opacity: showInfo ? 1 : 0 }}
          >
            <div className="overflow-hidden">
              <p className="mt-4 text-sm leading-relaxed" style={{ color: PALETTE.muted }}>
                {description}
              </p>
              {project.caseStudy?.processNotes && (
                <p className="mt-3 text-xs italic" style={{ color: PALETTE.faint }}>
                  {project.caseStudy.processNotes}
                </p>
              )}

              {project.multiLinks && project.multiLinks.length > 0 ? (
                <div className="mt-5 flex flex-col gap-2">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-display)', color: PALETTE.faint }}>
                    Reports
                  </div>
                  {project.multiLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors hover:border-[var(--color-brand)]"
                      style={{ border: `1px solid ${PALETTE.hair}`, background: 'color-mix(in srgb, var(--mg-fg) 5%, transparent)', color: PALETTE.bone }}
                    >
                      <span>{l.label}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ))}
                </div>
              ) : dynamicLink ? (
                <a
                  href={dynamicLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
                  style={{ background: PALETTE.brand, color: '#fff', fontFamily: 'var(--font-display)' }}
                >
                  {singleLinkLabel}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* counter + dot strip */}
      {total > 1 && (
        <div className="pointer-events-none absolute bottom-5 right-5 flex items-center gap-3 md:bottom-8 md:right-8">
          <span className="mono-serif text-sm" style={{ color: PALETTE.faint }}>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <div className="pointer-events-auto flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === index ? 24 : 6,
                  background: i === index ? PALETTE.brand : 'color-mix(in srgb, var(--mg-fg) 28%, transparent)',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LiquidLightbox() {
  const detailProjectId = useAppStore((s) => s.detailProject);
  const project = detailProjectId ? getProjectById(detailProjectId) : null;
  if (!project || project.images.length === 0) return null;
  // the logo collection gets its own flip-grid stage
  if (project.id === 'logo-designs') return <LogoBoard key={project.id} />;
  return <DetailContent key={project.id} project={project} />;
}
