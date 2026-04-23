'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import { projects, type Project } from '@/data/projects';
import GlitchNav from './GlitchNav';

const featured = projects
  .filter((p) => p.images.length > 0 && !(p.categories.length === 1 && p.categories[0] === 'logo'))
  .sort((a, b) => a.year - b.year);

// Characters for the scramble effect
const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function useScrambleText(text: string, trigger: boolean, speed = 30) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    clearInterval(frameRef.current);

    frameRef.current = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return text[i];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('')
      );
      iteration += 1 / 2;
      if (iteration >= text.length) {
        clearInterval(frameRef.current);
        setDisplay(text);
      }
    }, speed);

    return () => clearInterval(frameRef.current);
  }, [text, trigger, speed]);

  return display;
}

export default function GlitchView() {
  const [activeIndex, setActiveIndex] = useState(-1); // -1 = intro
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollAccumulator = useRef(0);
  const staticCanvasRef = useRef<HTMLCanvasElement>(null);

  const project = activeIndex >= 0 ? featured[activeIndex] : null;
  const title = useScrambleText(project?.title ?? '', scrambleTrigger, 25);
  const description = useScrambleText(project?.description ?? '', scrambleTrigger, 15);

  // Static noise canvas — more aggressive than cinematic
  useEffect(() => {
    const canvas = staticCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;
    const draw = () => {
      frame++;
      // Only update every 3rd frame for that choppy digital feel
      if (frame % 3 === 0) {
        canvas.width = window.innerWidth / 4;
        canvas.height = window.innerHeight / 4;
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255;
          data[i] = v * 0.3;
          data[i + 1] = v;
          data[i + 2] = v * 0.5;
          data[i + 3] = 12;
        }
        ctx.putImageData(imageData, 0, 0);
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Intro sequence
  useEffect(() => {
    const tl = gsap.timeline();

    // Boot sequence
    tl.fromTo('.boot-line', { opacity: 0, x: -20 }, {
      opacity: 1, x: 0, duration: 0.1, stagger: 0.08, ease: 'none',
    })
      .to('.boot-screen', { duration: 1.5 }) // hold
      .to('.boot-screen', {
        opacity: 0, duration: 0.15, ease: 'none',
        onComplete: () => {
          setActiveIndex(0);
          setScrambleTrigger(true);
        },
      })
      .fromTo('.glitch-main', { opacity: 0 }, { opacity: 1, duration: 0.05, ease: 'none' });
  }, []);

  // Re-trigger scramble on index change
  useEffect(() => {
    if (activeIndex < 0) return;
    setScrambleTrigger(false);
    requestAnimationFrame(() => setScrambleTrigger(true));
  }, [activeIndex]);

  // Navigate
  const navigateTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === activeIndex || index < 0 || index >= featured.length) return;
      setIsTransitioning(true);

      // Glitch-out the current view
      const tl = gsap.timeline({
        onComplete: () => {
          setActiveIndex(index);
          setIsTransitioning(false);
        },
      });

      // Chromatic split burst
      tl.to('.glitch-hero-img', {
        filter: 'hue-rotate(90deg) saturate(3) brightness(1.5)',
        x: () => (Math.random() - 0.5) * 30,
        duration: 0.15,
        ease: 'none',
      })
        .to('.glitch-hero-img', {
          filter: 'hue-rotate(-90deg) saturate(5)',
          x: () => (Math.random() - 0.5) * 50,
          scaleX: 1.02,
          duration: 0.1,
          ease: 'none',
        })
        .to('.glitch-hero-img', {
          opacity: 0,
          filter: 'hue-rotate(0deg) saturate(1) brightness(1)',
          x: 0,
          scaleX: 1,
          duration: 0.1,
          ease: 'none',
        })
        .to('.glitch-text-block', { opacity: 0, x: -30, duration: 0.15, ease: 'power2.in' }, 0);
    },
    [activeIndex, isTransitioning]
  );

  // Animate in new project
  useEffect(() => {
    if (activeIndex < 0) return;

    gsap.fromTo('.glitch-hero-img', { opacity: 0, scale: 1.05 }, {
      opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', delay: 0.05,
    });
    gsap.fromTo('.glitch-text-block', { opacity: 0, x: 40 }, {
      opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', delay: 0.15,
    });
    // Data lines stagger in
    gsap.fromTo('.data-line', { opacity: 0, x: -20 }, {
      opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.3,
    });
  }, [activeIndex]);

  // Wheel navigation
  useEffect(() => {
    const threshold = 100;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning || activeIndex < 0) return;
      scrollAccumulator.current += e.deltaY;
      if (Math.abs(scrollAccumulator.current) > threshold) {
        const dir = scrollAccumulator.current > 0 ? 1 : -1;
        scrollAccumulator.current = 0;
        navigateTo(activeIndex + dir);
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeIndex, navigateTo, isTransitioning]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeIndex < 0) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') navigateTo(activeIndex + 1);
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') navigateTo(activeIndex - 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, navigateTo]);

  // Mouse tracking for distortion field
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Random glitch bursts
  useEffect(() => {
    if (activeIndex < 0) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const el = containerRef.current;
        if (!el) return;
        gsap.to(el, {
          skewX: (Math.random() - 0.5) * 4,
          duration: 0.05,
          ease: 'none',
          onComplete: () => { gsap.to(el, { skewX: 0, duration: 0.1 }); },
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const distortionStyle = useMemo(() => ({
    background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, rgba(0,255,136,0.06) 0%, transparent 100%)`,
  }), [mousePos.x, mousePos.y]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden" style={{ background: '#020804', cursor: 'none' }}>
      {/* Static noise */}
      <canvas
        ref={staticCanvasRef}
        className="fixed inset-0 z-50 pointer-events-none"
        style={{ width: '100%', height: '100%', mixBlendMode: 'screen', opacity: 0.5 }}
      />

      {/* Scanline sweep */}
      <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
        <div
          className="absolute left-0 right-0 h-[2px]"
          style={{
            background: 'rgba(0,255,136,0.08)',
            animation: 'scanline-scroll 4s linear infinite',
            boxShadow: '0 0 20px rgba(0,255,136,0.1)',
          }}
        />
      </div>

      {/* CRT curvature vignette */}
      <div
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.8) 100%)',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)',
        }}
      />

      {/* Mouse distortion field */}
      <div className="fixed inset-0 z-30 pointer-events-none" style={distortionStyle} />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 z-[35] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Boot sequence */}
      {activeIndex < 0 && (
        <div className="boot-screen fixed inset-0 z-[60] flex flex-col justify-center px-12 md:px-24 bg-[#020804]">
          <div className="font-mono text-[11px] leading-relaxed max-w-xl" style={{ color: '#00ff88' }}>
            {[
              'MJAY_STUDIOS v3.1.0 — DIMENSIONAL INTERFACE',
              '> Initializing render pipeline...',
              '> Loading portfolio matrix [████████████████] 100%',
              '> Mapping dimensional coordinates...',
              `> ${featured.length} artifacts detected across 3 temporal zones`,
              '> Chromatic stabilizers: ENGAGED',
              '> Reality anchors: NOMINAL',
              '> WARNING: Dimensional bleed detected in sector 7',
              '> Compensating...',
              '> Interface ready.',
              '',
              '> ENTERING THE RIFT ▮',
            ].map((line, i) => (
              <div key={i} className="boot-line opacity-0" style={{ textShadow: '0 0 8px rgba(0,255,136,0.5)' }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main content */}
      {activeIndex >= 0 && project && (
        <div className="glitch-main absolute inset-0">
          {/* Hero image with chromatic treatment */}
          <div className="glitch-hero-img absolute inset-0">
            <div className="absolute inset-0" style={{ transform: 'scale(1.08)' }}>
              <Image
                key={project.id}
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
                style={{
                  filter: 'saturate(0.7) contrast(1.2) brightness(0.6)',
                  mixBlendMode: 'luminosity',
                }}
                sizes="100vw"
                priority
              />
            </div>
            {/* Green channel ghost */}
            <div className="absolute inset-0" style={{ transform: 'scale(1.08) translate(3px, -2px)' }}>
              <Image
                key={`${project.id}-g`}
                src={project.images[0]}
                alt=""
                fill
                className="object-cover"
                style={{
                  filter: 'saturate(0) brightness(0.4) contrast(1.5)',
                  mixBlendMode: 'screen',
                  opacity: 0.15,
                }}
                sizes="100vw"
                aria-hidden="true"
              />
            </div>
            {/* Overlays */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,8,4,0.9) 0%, rgba(0,8,4,0.4) 40%, rgba(0,8,4,0.7) 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,8,4,0.95) 0%, transparent 40%)' }} />
          </div>

          {/* Project info — left side */}
          <div className="glitch-text-block absolute left-0 top-0 bottom-0 z-10 flex flex-col justify-end p-8 md:p-16 lg:p-20 max-w-2xl">
            {/* Index + Era */}
            <div className="data-line mb-6 flex items-center gap-4">
              <span
                className="font-mono text-[10px] font-bold tracking-[0.4em] uppercase"
                style={{ color: '#00ff88', textShadow: '0 0 10px rgba(0,255,136,0.4)' }}
              >
                [{String(activeIndex + 1).padStart(2, '0')}/{String(featured.length).padStart(2, '0')}]
              </span>
              <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to right, #00ff88, transparent)' }} />
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(0,255,136,0.4)' }}>
                {project.era === 'agency' ? 'TEMPORAL_ZONE::AGENCY' : project.era === 'berry' ? 'TEMPORAL_ZONE::BERRY' : 'TEMPORAL_ZONE::INDEPENDENT'}
              </span>
            </div>

            {/* Title — glitched */}
            <div className="relative">
              <h2
                className="glitch-text font-display text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.85] tracking-tighter uppercase"
                style={{ color: '#fff', textShadow: '0 0 30px rgba(0,255,136,0.15)' }}
                data-text={project.title}
              >
                {title}
              </h2>
            </div>

            {/* Description */}
            <p
              className="data-line mt-5 max-w-lg font-mono text-xs leading-relaxed md:text-sm"
              style={{ color: 'rgba(0,255,136,0.5)' }}
            >
              {description}
            </p>

            {/* Metadata grid */}
            <div className="data-line mt-8 grid grid-cols-2 gap-x-8 gap-y-2 max-w-md">
              {project.client && (
                <DataField label="CLIENT" value={project.client} />
              )}
              <DataField label="YEAR" value={String(project.year)} />
              <DataField label="TYPE" value={project.categories.join(' / ').toUpperCase()} />
              <DataField label="IMAGES" value={`${project.images.length} ARTIFACTS`} />
            </div>

            {/* Rift tags */}
            <div className="data-line mt-6 flex flex-wrap gap-2">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="rift-border rounded px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    border: '1px solid rgba(0,255,136,0.2)',
                    color: '#00ff88',
                    background: 'rgba(0,255,136,0.03)',
                  }}
                >
                  {cat}
                </span>
              ))}
              {project.concept && (
                <span
                  className="rounded px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    border: '1px solid rgba(255,0,64,0.3)',
                    color: '#ff0040',
                    background: 'rgba(255,0,64,0.05)',
                  }}
                >
                  CONCEPT
                </span>
              )}
            </div>

            {/* Multi-image indicator */}
            {project.images.length > 1 && (
              <div className="data-line mt-8 flex items-center gap-3">
                <div className="flex gap-[2px]">
                  {project.images.map((_, i) => (
                    <div
                      key={i}
                      className="transition-all duration-300"
                      style={{
                        width: 2,
                        height: i === 0 ? 16 : 8,
                        background: i === 0 ? '#00ff88' : 'rgba(0,255,136,0.2)',
                        borderRadius: 1,
                      }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[9px]" style={{ color: 'rgba(0,255,136,0.3)' }}>
                  {project.images.length} DIMENSIONAL CAPTURES
                </span>
              </div>
            )}
          </div>

          {/* Right side — dimensional rift progress */}
          <div className="fixed right-4 top-1/2 z-20 -translate-y-1/2 flex flex-col items-center md:right-8">
            {/* Rift line */}
            <div
              className="absolute top-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(0,255,136,0.15) 20%, rgba(0,255,136,0.15) 80%, transparent)',
              }}
            />
            {featured.map((p, i) => (
              <button
                key={p.id}
                onClick={() => navigateTo(i)}
                className="group relative z-10 py-[6px]"
              >
                <div
                  className="relative transition-all duration-500"
                  style={{
                    width: i === activeIndex ? 8 : 3,
                    height: i === activeIndex ? 8 : 3,
                    borderRadius: '50%',
                    background: i === activeIndex ? '#00ff88' : 'rgba(0,255,136,0.2)',
                    boxShadow: i === activeIndex ? '0 0 12px rgba(0,255,136,0.6), 0 0 30px rgba(0,255,136,0.2)' : 'none',
                  }}
                />
                {/* Tooltip */}
                <span
                  className="absolute right-8 top-1/2 -translate-y-1/2 whitespace-nowrap rounded px-2 py-1 font-mono text-[9px] opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background: 'rgba(0,8,4,0.95)',
                    color: '#00ff88',
                    border: '1px solid rgba(0,255,136,0.15)',
                    textShadow: '0 0 5px rgba(0,255,136,0.3)',
                  }}
                >
                  {p.title}
                </span>
              </button>
            ))}
          </div>

          {/* Bottom data bar */}
          <div className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-4 md:px-16" style={{ borderTop: '1px solid rgba(0,255,136,0.06)' }}>
            <div className="flex items-center gap-6">
              <StatusIndicator label="RIFT" status="STABLE" />
              <StatusIndicator label="CHROMATIC" status="NOMINAL" />
              <StatusIndicator label="DIMENSION" status={project.era.toUpperCase()} />
            </div>
            <div className="font-mono text-[9px]" style={{ color: 'rgba(0,255,136,0.2)' }}>
              MJAY_STUDIOS://PORTFOLIO/{project.id.toUpperCase().replace(/-/g, '_')}
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <GlitchNav />

      {/* Custom cursor — distortion ring */}
      <GlitchCursor mousePos={mousePos} />
    </div>
  );
}

// ─── Data Field ─────────────────────────────────────────────
function DataField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-mono text-[8px] tracking-[0.3em] block" style={{ color: 'rgba(0,255,136,0.25)' }}>
        {label}
      </span>
      <span className="font-mono text-[11px] font-bold" style={{ color: 'rgba(0,255,136,0.7)' }}>
        {value}
      </span>
    </div>
  );
}

// ─── Status Indicator ───────────────────────────────────────
function StatusIndicator({ label, status }: { label: string; status: string }) {
  return (
    <div className="hidden md:flex items-center gap-2">
      <div className="h-1.5 w-1.5 rounded-full" style={{ background: '#00ff88', boxShadow: '0 0 6px rgba(0,255,136,0.5)' }} />
      <span className="font-mono text-[8px] tracking-[0.2em]" style={{ color: 'rgba(0,255,136,0.3)' }}>
        {label}:
      </span>
      <span className="font-mono text-[9px] font-bold" style={{ color: 'rgba(0,255,136,0.5)' }}>
        {status}
      </span>
    </div>
  );
}

// ─── Glitch Cursor ──────────────────────────────────────────
function GlitchCursor({ mousePos }: { mousePos: { x: number; y: number } }) {
  const ringRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ringRef.current) {
      gsap.to(ringRef.current, {
        x: mousePos.x,
        y: mousePos.y,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
    if (crossRef.current) {
      gsap.to(crossRef.current, {
        x: mousePos.x,
        y: mousePos.y,
        duration: 0.08,
      });
    }
  }, [mousePos]);

  // Hover scale
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const handleEnter = () => gsap.to(ring, { scale: 2, opacity: 0.2, duration: 0.3 });
    const handleLeave = () => gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.3 });

    const attach = () => {
      document.querySelectorAll('button, a, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
    };

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });
    attach();

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[70] pointer-events-none hidden md:block"
        style={{
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          borderRadius: '50%',
          border: '1px solid rgba(0,255,136,0.3)',
          opacity: 0.5,
          boxShadow: '0 0 15px rgba(0,255,136,0.1)',
        }}
      />
      {/* Crosshair */}
      <div
        ref={crossRef}
        className="fixed top-0 left-0 z-[70] pointer-events-none hidden md:block"
        style={{ width: 0, height: 0 }}
      >
        <div style={{ position: 'absolute', width: 10, height: 1, left: -5, top: 0, background: '#00ff88', opacity: 0.7 }} />
        <div style={{ position: 'absolute', width: 1, height: 10, left: 0, top: -5, background: '#00ff88', opacity: 0.7 }} />
      </div>
    </>
  );
}
