'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { projects } from '@/data/projects';

/* ──────────────────────────────────────────────────────────
   "The Wall" — an infinite, free-draggable gallery of every
   piece of work. Tiles live on a toroidally-wrapped 2D grid:
   fling it any direction and it loops forever. Crisp, full-
   color, full-bleed at rest; a subtle velocity-driven warp
   (lens curve + faint RGB split) only while it's moving.

   Reliability over flash — the failures of the old HeroShader
   are designed out: tile size is fixed in world units, so no
   texture decode ever causes a reflow; each tile just fades
   itself in when its own image is ready.

   All imperative state lives in local refs inside WallScene
   (mutated through the ref / mesh material), mirroring the
   pattern the rest of the codebase lints clean against.
   ────────────────────────────────────────────────────────── */

const PAD = 0.1; // padding around each piece (room for the drop shadow)
const CELL_ASPECT = 0.86; // tile w/h — gentle portrait
const TILE_FILL = 0.99; // pieces sit close; gaps are just the padding
const DRIFT = { x: -0.16, y: 0.09 }; // idle px/frame
const TILT = -0.07; // radians, ~ -4°
const OVERSCALE = 1.18; // group zoom so the tilt leaves no corner gaps

type Tile = { src: string; projectId: string; alt: string };

// Build-time webp thumbnails (scripts/build-content.mjs) — tiles render ~300px,
// so the wall loads ~2.6MB of thumbs instead of ~43MB of full-res sources.
const thumbSrc = (src: string) =>
  src.replace(/^\/portfolio\//, '/portfolio-thumbs/').replace(/\.(jpe?g|png|webp|avif)$/i, '.webp');

// Every project image (incl. case-study extras), each tagged with its project.
// Deterministic order — no Math.random at module scope (stable across SSR).
function buildTiles(): Tile[] {
  const out: Tile[] = [];
  for (const p of projects) {
    const imgs = [...(p.images ?? []), ...(p.caseStudy?.additionalImages ?? [])];
    for (const src of imgs) out.push({ src: thumbSrc(src), projectId: p.id, alt: p.title });
  }
  return out;
}

const mod = (a: number, n: number) => ((a % n) + n) % n;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform float uImgAspect;
  uniform float uTileAspect;  // tile aspect (w/h)
  uniform float uOpacity;
  uniform float uVel;         // 0 at rest → subtle warp while moving
  uniform float uHasTex;
  uniform float uPad;         // padding around each piece (fraction of tile)
  uniform vec2  uShadowOff;   // shadow offset (points away from the light)

  void main() {
    if (uHasTex < 0.5) discard;

    // CONTAIN the whole image inside the padded inner box — never crop.
    // The piece is a centered rectangle of half-size ph in tile-uv space.
    float innerScale = 1.0 - 2.0 * uPad;
    vec2 occupy = uImgAspect > uTileAspect
      ? vec2(1.0, uTileAspect / uImgAspect)
      : vec2(uImgAspect / uTileAspect, 1.0);
    vec2 ph = 0.5 * occupy * innerScale;

    vec2 rel = vUv - 0.5;
    vec2 q = abs(rel);

    // hard, square edges (a sub-pixel AA only — NOT a feather)
    float w = 0.0012;
    float inPiece = (1.0 - smoothstep(ph.x - w, ph.x + w, q.x))
                  * (1.0 - smoothstep(ph.y - w, ph.y + w, q.y));

    if (inPiece > 0.5) {
      vec2 art = rel / (2.0 * ph) + 0.5;
      vec2 c = art - 0.5;
      art += c * dot(c, c) * uVel * 0.16;          // subtle warp on the art only
      vec2 suv = clamp(art, 0.0, 1.0);
      float s = uVel * 0.008;                       // faint chromatic split
      vec3 img = vec3(
        texture2D(uTex, vec2(suv.x + s, suv.y)).r,
        texture2D(uTex, suv).g,
        texture2D(uTex, vec2(suv.x - s, suv.y)).b
      );
      gl_FragColor = vec4(img, inPiece * uOpacity);
    } else {
      // soft drop shadow cast away from the center light (shifts as it slides)
      vec2 d = abs(rel - uShadowOff) - ph;
      float sd = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
      float sh = (1.0 - smoothstep(0.0, 0.06, sd)) * 0.26 * uOpacity;
      if (sh <= 0.003) discard;
      gl_FragColor = vec4(0.0, 0.0, 0.0, sh);
    }
  }
`;

const GRAY = '#3c424b'; // dark graphite base for the shimmering backdrop

// Full-screen shimmering silvery backdrop — a brushed-metal sheen with
// slow moving glints and a fine animated sparkle.
const bgVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const bgFragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uRes;
  uniform vec3  uBase;

  float hash(vec2 p){ p = fract(p * vec2(123.34, 345.45)); p += dot(p, p + 34.345); return fract(p.x * p.y); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main(){
    // domain-warped flowing clouds — organic, alive movement (no streaks)
    vec2 p = vUv * uRes / 300.0;
    vec2 q = vec2(fbm(p + uTime * 0.05), fbm(p + vec2(5.2, 1.3) - uTime * 0.04));
    float clouds = fbm(p + q * 1.5 + uTime * 0.03);
    float shimmer = (clouds - 0.5) * 0.18;

    // a brighter highlight sweeping across for liveliness (pops on dark)
    float band = sin((vUv.x * 1.2 + vUv.y * 0.8) * 2.2 - uTime * 0.45) * 0.5 + 0.5;
    float sweep = pow(smoothstep(0.45, 1.0, band), 1.4) * 0.12;

    // dither (~1 LSB of noise) to dissolve gradient banding
    float dth = (hash(gl_FragCoord.xy + uTime) - 0.5) * (2.0 / 255.0);

    vec3 col = uBase + shimmer + sweep + dth;
    gl_FragColor = vec4(col, 1.0);
  }
`;

// Full-screen spotlight vignette — dark toward the rim, dithered so the long
// falloff doesn't band. Drawn on top so pieces dim at the edges too.
const vigFragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 uRes;
  uniform float uTime;

  float hash(vec2 p){ p = fract(p * vec2(123.34, 345.45)); p += dot(p, p + 34.345); return fract(p.x * p.y); }

  void main(){
    vec2 c = vUv - vec2(0.52, 0.46);
    float r = length(c) / 0.76;                 // ~0 center → ~1 at the far corner
    float v = smoothstep(0.4, 1.05, r);         // smooth falloff
    float dth = (hash(gl_FragCoord.xy + uTime) - 0.5) * (3.0 / 255.0);
    float a = clamp(v * 0.62 + dth, 0.0, 1.0);
    gl_FragColor = vec4(0.03, 0.025, 0.02, a);
  }
`;

type MeshUD = { idx: number; prevIdx: number };

function WallScene({
  tiles,
  reduced,
  onOpen,
  wall,
}: {
  tiles: Tile[];
  reduced: boolean;
  onOpen: (projectId: string) => void;
  wall: string;
}) {
  const { size, gl, camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const meshes = useRef<THREE.Mesh[]>([]);

  const N = tiles.length;

  // textures + natural aspects, filled in progressively (no reflow on decode)
  const textures = useRef<(THREE.Texture | null)[]>(new Array(N).fill(null));
  const aspects = useRef<number[]>(new Array(N).fill(1));

  // imperative control state — local ref, safe to mutate
  const ctrl = useRef({
    offset: { x: 0, y: 0 },
    vel: { x: 0, y: 0 },
    dragging: false,
    last: { x: 0, y: 0 },
    down: { x: 0, y: 0, t: 0, moved: 0 },
  });

  // smoothed motion magnitude, pushed to every tile's uVel each frame
  const velSmooth = useRef(0);

  // animated silvery backdrop + dithered spotlight vignette
  const bgMatRef = useRef<THREE.ShaderMaterial>(null);
  const vigMatRef = useRef<THREE.ShaderMaterial>(null);
  const clock = useRef(0);
  const bgUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uBase: { value: new THREE.Color(GRAY) },
    }),
    []
  );
  const vigUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  // palette switch re-tints the field live (via the material ref — the
  // memoized uniforms object itself must stay unmutated for the linter)
  useEffect(() => {
    const mat = bgMatRef.current;
    if (mat) (mat.uniforms.uBase.value as THREE.Color).set(wall);
  }, [wall]);

  // keep the latest onOpen without re-binding listeners
  const onOpenRef = useRef(onOpen);
  useEffect(() => {
    onOpenRef.current = onOpen;
  }, [onOpen]);

  // ── responsive layout (pixels == world units at orthographic zoom 1) ──
  const cellW = Math.max(190, size.width / 2.4);
  const cellH = cellW / CELL_ASPECT;
  const nCols = Math.ceil(size.width / cellW) + 4;
  const nRows = Math.ceil(size.height / cellH) + 4;
  const count = nCols * nRows;
  const spanX = nCols * cellW;
  const spanY = nRows * cellH;
  const focalR = Math.max(size.width, size.height) * 0.42;

  // one uniforms set per pooled mesh (created here, mutated via mesh.material)
  const uniformsArr = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        uTex: { value: null as THREE.Texture | null },
        uImgAspect: { value: 1 },
        uTileAspect: { value: CELL_ASPECT },
        uOpacity: { value: 0 },
        uVel: { value: 0 },
        uHasTex: { value: 0 },
        uPad: { value: PAD },
        uShadowOff: { value: new THREE.Vector2(0.01, -0.015) },
      })),
    [count]
  );

  // deterministic cell → image scatter
  const pick = (cx: number, cy: number) =>
    mod(Math.imul(cx, 73856093) ^ Math.imul(cy, 19349663), N);

  // ── progressive texture loading ──
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const loaded: THREE.Texture[] = [];
    let alive = true;
    tiles.forEach((t, i) => {
      loader.load(t.src, (tex) => {
        if (!alive) {
          tex.dispose();
          return;
        }
        // NoColorSpace: pass raw source pixels straight through. A custom
        // ShaderMaterial does no linear→sRGB output encoding, so decoding the
        // texture to linear here would render every image visibly darker.
        tex.colorSpace = THREE.NoColorSpace;
        // Mipmaps + anisotropy: tiles render smaller than the source, and
        // plain linear minification aliases (shimmering edges in fine detail).
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.generateMipmaps = true;
        tex.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
        const img = tex.image as { width: number; height: number };
        textures.current[i] = tex;
        aspects.current[i] = img.width / img.height || 1;
        loaded.push(tex);
      });
    });
    return () => {
      alive = false;
      loaded.forEach((t) => t.dispose());
    };
  }, [tiles, gl]);

  // ── drag / fling / tap-to-open, bound to the canvas element ──
  useEffect(() => {
    const el = gl.domElement;
    const ray = new THREE.Raycaster();
    const ct = ctrl.current;

    const hitTest = (clientX: number, clientY: number): string | null => {
      const group = groupRef.current;
      if (!group) return null;
      const rect = el.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );
      ray.setFromCamera(ndc, camera);
      const hits = ray.intersectObjects(group.children, false);
      for (const h of hits) {
        const idx = (h.object.userData as MeshUD).idx;
        if (idx != null && tiles[idx]) return tiles[idx].projectId;
      }
      return null;
    };

    const onDown = (e: PointerEvent) => {
      ct.dragging = true;
      ct.last = { x: e.clientX, y: e.clientY };
      ct.down = { x: e.clientX, y: e.clientY, t: performance.now(), moved: 0 };
      ct.vel = { x: 0, y: 0 };
    };
    const onMove = (e: PointerEvent) => {
      if (!ct.dragging) return;
      const dx = e.clientX - ct.last.x;
      const dy = e.clientY - ct.last.y;
      ct.offset.x += dx;
      ct.offset.y -= dy; // screen-down → world-down
      ct.vel = { x: dx, y: -dy };
      ct.last = { x: e.clientX, y: e.clientY };
      ct.down.moved += Math.abs(dx) + Math.abs(dy);
    };
    const onUp = (e: PointerEvent) => {
      if (!ct.dragging) return;
      ct.dragging = false;
      const dt = performance.now() - ct.down.t;
      const travel = Math.hypot(e.clientX - ct.down.x, e.clientY - ct.down.y);
      if (travel < 6 && ct.down.moved < 10 && dt < 400) {
        const id = hitTest(e.clientX, e.clientY);
        if (id) onOpenRef.current(id);
      }
    };

    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [gl, camera, tiles]);

  useFrame((_, delta) => {
    const ct = ctrl.current;

    // animated backdrop + vignette
    clock.current += delta;
    if (bgMatRef.current) {
      bgMatRef.current.uniforms.uTime.value = clock.current;
      bgMatRef.current.uniforms.uRes.value.set(size.width, size.height);
    }
    if (vigMatRef.current) {
      vigMatRef.current.uniforms.uTime.value = clock.current;
      vigMatRef.current.uniforms.uRes.value.set(size.width, size.height);
    }

    // motion: 1:1 while dragging, inertia + idle drift when released
    if (!ct.dragging) {
      ct.vel.x *= 0.9;
      ct.vel.y *= 0.9;
      ct.offset.x += ct.vel.x + (reduced ? 0 : DRIFT.x);
      ct.offset.y += ct.vel.y + (reduced ? 0 : DRIFT.y);
    }

    const speed = Math.hypot(ct.vel.x, ct.vel.y);
    const target = reduced ? 0 : Math.min(speed / 48, 1);
    velSmooth.current += (target - velSmooth.current) * 0.12;
    const v = velSmooth.current;

    for (let k = 0; k < count; k++) {
      const mesh = meshes.current[k];
      if (!mesh) continue;
      const mat = mesh.material as THREE.ShaderMaterial;
      const ud = mesh.userData as MeshUD;
      mat.uniforms.uVel.value = v;
      const i = k % nCols;
      const j = (k / nCols) | 0;

      const wx = mod(i * cellW + ct.offset.x + spanX / 2, spanX) - spanX / 2;
      const wy = mod(j * cellH + ct.offset.y + spanY / 2, spanY) - spanY / 2;
      const cix = Math.round((wx - ct.offset.x) / cellW);
      const ciy = Math.round((wy - ct.offset.y) / cellH);
      const idx = pick(cix, ciy);

      const dist = Math.hypot(wx, wy);
      const swell = 1 + 0.1 * Math.exp(-(dist * dist) / (2 * focalR * focalR));
      mesh.position.set(wx, wy, 0);
      mesh.scale.set(cellW * TILE_FILL * swell, cellH * TILE_FILL * swell, 1);
      ud.idx = idx;

      // shadow cast away from the center light; longer toward the edges,
      // so it visibly shifts as the piece slides across the window
      const distN = Math.min(dist / (Math.max(spanX, spanY) * 0.5), 1);
      const shLen = 0.014 + 0.02 * distN;
      const inv = dist > 1 ? 1 / dist : 0;
      mat.uniforms.uShadowOff.value.set(wx * inv * shLen, wy * inv * shLen);

      const tex = textures.current[idx];
      if (ud.prevIdx !== idx) {
        ud.prevIdx = idx;
        mat.uniforms.uTex.value = tex;
        mat.uniforms.uImgAspect.value = aspects.current[idx];
        mat.uniforms.uHasTex.value = tex ? 1 : 0;
      } else if (!mat.uniforms.uTex.value && tex) {
        mat.uniforms.uTex.value = tex;
        mat.uniforms.uImgAspect.value = aspects.current[idx];
        mat.uniforms.uHasTex.value = 1;
      }
      const targetOp = tex ? 1 : 0;
      mat.uniforms.uOpacity.value += (targetOp - mat.uniforms.uOpacity.value) * 0.08;
    }
  });

  return (
    <>
      {/* animated textured-gray field behind the cards */}
      <mesh renderOrder={-1} frustumCulled={false}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={bgMatRef}
          uniforms={bgUniforms}
          vertexShader={bgVertexShader}
          fragmentShader={bgFragmentShader}
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
      <group ref={groupRef} rotation={[0, 0, TILT]} scale={OVERSCALE}>
        {uniformsArr.map((u, k) => (
        <mesh
          key={k}
          userData={{ idx: -1, prevIdx: -1 }}
          ref={(el) => {
            if (el) meshes.current[k] = el;
          }}
        >
          <planeGeometry args={[1, 1]} />
          <shaderMaterial
            uniforms={u}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            transparent
            depthWrite={false}
          />
        </mesh>
        ))}
      </group>
      {/* dithered spotlight vignette, on top so pieces dim toward the rim */}
      <mesh renderOrder={2} frustumCulled={false}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={vigMatRef}
          uniforms={vigUniforms}
          vertexShader={bgVertexShader}
          fragmentShader={vigFragmentShader}
          transparent
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

export default function HeroWall({
  onOpen,
  wall = GRAY,
}: {
  onOpen: (projectId: string) => void;
  wall?: string;
}) {
  const tiles = useMemo(() => buildTiles(), []);
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ background: wall, touchAction: 'none' }}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 100], zoom: 1, near: 0.1, far: 1000 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%', cursor: 'inherit', touchAction: 'none' }}
      >
        <WallScene tiles={tiles} reduced={reduced} onOpen={onOpen} wall={wall} />
      </Canvas>
    </div>
  );
}
