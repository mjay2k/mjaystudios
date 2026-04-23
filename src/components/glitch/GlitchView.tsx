'use client';

import { useState, useEffect, useRef, useCallback, useMemo, forwardRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import { projects, type Project } from '@/data/projects';
import GlitchNav from './GlitchNav';

const featured = projects
  .filter((p) => p.images.length > 0 && !(p.categories.length === 1 && p.categories[0] === 'logo'))
  .sort((a, b) => a.year - b.year);

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

// Deterministic scattered layout — each card gets a position in a large scrollable field
// Some big, some small, overlapping, rotated — like a hacker's multi-monitor wall
function generateLayout(count: number) {
  const cols = 4;
  const baseW = 340;
  const baseH = 240;
  const gapX = 380;
  const gapY = 300;

  return Array.from({ length: count }, (_, i) => {
    // Seeded pseudo-random using index
    const seed = (i * 7919 + 1301) % 1000 / 1000;
    const seed2 = (i * 6271 + 947) % 1000 / 1000;
    const seed3 = (i * 4391 + 2203) % 1000 / 1000;

    const col = i % cols;
    const row = Math.floor(i / cols);

    // Base grid position with randomized offset
    const x = col * gapX + (seed - 0.5) * 120 + 80;
    const y = row * gapY + (seed2 - 0.5) * 80 + 120;

    // Size variation: some panels are big "primary monitors", others small
    const isPrimary = i % 5 === 0 || i % 7 === 0;
    const w = isPrimary ? baseW * 1.4 : baseW * (0.7 + seed3 * 0.5);
    const h = isPrimary ? baseH * 1.3 : baseH * (0.7 + seed * 0.4);

    // Slight rotation
    const rot = (seed - 0.5) * 4;

    // Z-depth for parallax
    const z = seed2 * 0.6 + 0.4; // 0.4 to 1.0

    return { x, y, w, h, rot, z, isPrimary };
  });
}

const layout = generateLayout(featured.length);

// ─── Main Component ─────────────────────────────────────────
export default function GlitchView() {
  const [booted, setBooted] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const fieldRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const staticCanvasRef = useRef<HTMLCanvasElement>(null);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);

  // Static noise canvas
  useEffect(() => {
    const canvas = staticCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;
    const draw = () => {
      frame++;
      if (frame % 3 === 0) {
        canvas.width = window.innerWidth / 4;
        canvas.height = window.innerHeight / 4;
        const d = ctx.createImageData(canvas.width, canvas.height);
        for (let i = 0; i < d.data.length; i += 4) {
          const v = Math.random() * 255;
          d.data[i] = v * 0.3;
          d.data[i + 1] = v;
          d.data[i + 2] = v * 0.5;
          d.data[i + 3] = 10;
        }
        ctx.putImageData(d, 0, 0);
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Boot sequence
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.boot-line', { opacity: 0, x: -20 }, {
      opacity: 1, x: 0, duration: 0.08, stagger: 0.06, ease: 'none',
    })
      .to({}, { duration: 1.2 })
      .to('.boot-screen', {
        opacity: 0, duration: 0.1, ease: 'none',
        onComplete: () => setBooted(true),
      });
  }, []);

  // Stagger in cards after boot
  useEffect(() => {
    if (!booted) return;
    const cards = cardEls.current.filter(Boolean);
    gsap.fromTo(cards, {
      opacity: 0,
      scale: 0.8,
      filter: 'brightness(3) hue-rotate(90deg)',
    }, {
      opacity: 1,
      scale: 1,
      filter: 'brightness(1) hue-rotate(0deg)',
      duration: 0.4,
      stagger: { each: 0.06, from: 'random' },
      ease: 'power2.out',
    });
  }, [booted]);

  // Track scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handler = () => setScrollY(container.scrollTop);
    container.addEventListener('scroll', handler, { passive: true });
    return () => container.removeEventListener('scroll', handler);
  }, []);

  // Track mouse
  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // Random per-card glitch bursts
  useEffect(() => {
    if (!booted) return;
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * featured.length);
      const card = cardEls.current[idx];
      if (!card || expandedId) return;

      const glitchType = Math.random();
      if (glitchType > 0.5) {
        // Chromatic burst
        gsap.to(card, {
          filter: 'hue-rotate(180deg) saturate(4) brightness(1.5)',
          x: `+=${(Math.random() - 0.5) * 15}`,
          duration: 0.06,
          ease: 'none',
          onComplete: () => {
            gsap.to(card, {
              filter: 'hue-rotate(0deg) saturate(1) brightness(1)',
              x: 0,
              duration: 0.1,
            });
          },
        });
      } else {
        // Skew glitch
        gsap.to(card, {
          skewX: (Math.random() - 0.5) * 8,
          scaleY: 0.97,
          duration: 0.04,
          ease: 'none',
          onComplete: () => {
            gsap.to(card, { skewX: 0, scaleY: 1, duration: 0.15 });
          },
        });
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [booted, expandedId]);

  // Expand a project
  const handleExpand = useCallback((id: string) => {
    setExpandedId(id);
  }, []);

  // Close expanded
  const handleClose = useCallback(() => {
    setExpandedId(null);
  }, []);

  // Keyboard: Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedId(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Calculate total field height
  const fieldHeight = useMemo(() => {
    let maxY = 0;
    layout.forEach((l, i) => {
      const bottom = l.y + l.h;
      if (bottom > maxY) maxY = bottom;
    });
    return maxY + 200;
  }, []);

  const distortionStyle = useMemo(() => ({
    background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, rgba(0,255,136,0.04) 0%, transparent 100%)`,
  }), [mousePos.x, mousePos.y]);

  // Mouse parallax offset for entire field
  const parallaxX = (mousePos.x / window.innerWidth - 0.5) * -15;
  const parallaxY = (mousePos.y / window.innerHeight - 0.5) * -10;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#020804', cursor: 'none' }}>
      {/* Static noise */}
      <canvas
        ref={staticCanvasRef}
        className="fixed inset-0 z-50 pointer-events-none"
        style={{ width: '100%', height: '100%', mixBlendMode: 'screen', opacity: 0.4 }}
      />

      {/* Scanline sweep */}
      <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
        <div
          className="absolute left-0 right-0 h-[2px]"
          style={{
            background: 'rgba(0,255,136,0.06)',
            animation: 'scanline-scroll 4s linear infinite',
            boxShadow: '0 0 20px rgba(0,255,136,0.08)',
          }}
        />
      </div>

      {/* CRT vignette */}
      <div
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* Grid */}
      <div
        className="fixed inset-0 z-[5] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Mouse distortion field */}
      <div className="fixed inset-0 z-[6] pointer-events-none" style={distortionStyle} />

      {/* Boot sequence */}
      {!booted && (
        <div className="boot-screen fixed inset-0 z-[60] flex flex-col justify-center px-12 md:px-24 bg-[#020804]">
          <div className="font-mono text-[11px] leading-relaxed max-w-xl" style={{ color: '#00ff88' }}>
            {[
              'MJAY_STUDIOS v3.1.0 — SURVEILLANCE INTERFACE',
              '> Initializing multi-feed renderer...',
              '> Loading artifact database [████████████████] 100%',
              `> ${featured.length} feeds detected across 3 temporal zones`,
              '> Chromatic stabilizers: ENGAGED',
              '> Spatial mapping: COMPLETE',
              '> WARNING: Dimensional bleed in sectors 4, 7, 11',
              '> Deploying containment grid...',
              '> All feeds online.',
              '',
              '> OPENING WALL ▮',
            ].map((line, i) => (
              <div key={i} className="boot-line opacity-0" style={{ textShadow: '0 0 8px rgba(0,255,136,0.5)' }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scrollable surveillance wall */}
      {booted && (
        <div
          ref={containerRef}
          className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* Field container — holds all scattered cards */}
          <div
            ref={fieldRef}
            className="relative"
            style={{
              height: fieldHeight,
              minHeight: '100vh',
              transform: `translate(${parallaxX}px, ${parallaxY}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            {featured.map((project, i) => {
              const l = layout[i];
              // Parallax: deeper cards (lower z) move slower on scroll
              const parallaxOffset = scrollY * (1 - l.z) * 0.3;

              return (
                <TerminalCard
                  key={project.id}
                  project={project}
                  index={i}
                  layout={l}
                  parallaxOffset={parallaxOffset}
                  onExpand={handleExpand}
                  ref={(el) => { cardEls.current[i] = el; }}
                />
              );
            })}

            {/* Data streams — decorative vertical lines between cards */}
            <DataStreams count={8} fieldHeight={fieldHeight} />
          </div>

          {/* Bottom status bar — fixed */}
          <div
            className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-3 md:px-12"
            style={{ borderTop: '1px solid rgba(0,255,136,0.06)', background: 'rgba(2,8,4,0.9)', backdropFilter: 'blur(8px)' }}
          >
            <div className="flex items-center gap-6">
              <StatusDot label="FEEDS" value={`${featured.length} ACTIVE`} />
              <StatusDot label="GRID" value="STABLE" />
              <StatusDot label="RIFT" value="CONTAINED" />
            </div>
            <div className="font-mono text-[9px]" style={{ color: 'rgba(0,255,136,0.2)' }}>
              SCROLL: {Math.round((scrollY / (fieldHeight - window.innerHeight)) * 100 || 0)}% — MJAY://SURVEILLANCE_WALL
            </div>
          </div>
        </div>
      )}

      {/* Expanded detail overlay */}
      {expandedId && (
        <ExpandedDetail
          project={featured.find((p) => p.id === expandedId)!}
          onClose={handleClose}
        />
      )}

      {/* Nav */}
      <GlitchNav />

      {/* Cursor */}
      <GlitchCursor mousePos={mousePos} />
    </div>
  );
}

// ─── Terminal Card ───────────────────────────────────────────
interface TerminalCardProps {
  project: Project;
  index: number;
  layout: { x: number; y: number; w: number; h: number; rot: number; z: number; isPrimary: boolean };
  parallaxOffset: number;
  onExpand: (id: string) => void;
}

const TerminalCard = forwardRef<HTMLDivElement, TerminalCardProps>(
  function Card({ project, index, layout: l, parallaxOffset, onExpand }, ref) {
    const [hovered, setHovered] = useState(false);
    const [titleText, setTitleText] = useState(project.title);
    const scrambleRef = useRef<ReturnType<typeof setInterval>>(undefined);

    // Scramble title on hover
    useEffect(() => {
      if (hovered) {
        let iteration = 0;
        scrambleRef.current = setInterval(() => {
          setTitleText(
            project.title.split('').map((c, i) => {
              if (c === ' ') return ' ';
              if (i < iteration) return project.title[i];
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            }).join('')
          );
          iteration += 1;
          if (iteration > project.title.length) {
            clearInterval(scrambleRef.current);
            setTitleText(project.title);
          }
        }, 30);
      } else {
        clearInterval(scrambleRef.current);
        setTitleText(project.title);
      }
      return () => clearInterval(scrambleRef.current);
    }, [hovered, project.title]);

    return (
      <div
        ref={ref}
        className="absolute group"
        style={{
          left: l.x,
          top: l.y - parallaxOffset,
          width: l.w,
          transform: `rotate(${hovered ? 0 : l.rot}deg) scale(${hovered ? 1.08 : 1})`,
          zIndex: hovered ? 30 : Math.round(l.z * 10),
          transition: 'transform 0.4s cubic-bezier(0.19,1,0.22,1), z-index 0s',
          willChange: 'transform',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onExpand(project.id)}
      >
        {/* Terminal window chrome */}
        <div
          className="rounded overflow-hidden cursor-pointer"
          style={{
            border: `1px solid ${hovered ? 'rgba(0,255,136,0.4)' : 'rgba(0,255,136,0.1)'}`,
            background: 'rgba(2,8,4,0.85)',
            boxShadow: hovered
              ? '0 0 30px rgba(0,255,136,0.15), 0 20px 60px rgba(0,0,0,0.5)'
              : '0 4px 20px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between px-3 py-1.5"
            style={{ borderBottom: '1px solid rgba(0,255,136,0.08)', background: 'rgba(0,255,136,0.03)' }}
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="h-[6px] w-[6px] rounded-full" style={{ background: hovered ? '#ff5f57' : 'rgba(255,95,87,0.3)' }} />
                <div className="h-[6px] w-[6px] rounded-full" style={{ background: hovered ? '#ffbd2e' : 'rgba(255,189,46,0.3)' }} />
                <div className="h-[6px] w-[6px] rounded-full" style={{ background: hovered ? '#28c840' : 'rgba(40,200,64,0.3)' }} />
              </div>
              <span className="font-mono text-[8px] tracking-wider" style={{ color: 'rgba(0,255,136,0.4)' }}>
                FEED_{String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <span className="font-mono text-[7px]" style={{ color: 'rgba(0,255,136,0.2)' }}>
              {project.year}
            </span>
          </div>

          {/* Image area */}
          <div className="relative overflow-hidden" style={{ height: l.h }}>
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover transition-all duration-500"
              style={{
                filter: hovered
                  ? 'saturate(1.1) brightness(0.9) contrast(1.1)'
                  : 'saturate(0.4) brightness(0.5) contrast(1.3)',
              }}
              sizes={`${Math.round(l.w)}px`}
            />
            {/* Green overlay when not hovered */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(0,255,136,0.08) 0%, transparent 60%)',
                mixBlendMode: 'color',
                opacity: hovered ? 0 : 0.5,
              }}
            />
            {/* Scan line across individual card */}
            <div
              className="absolute left-0 right-0 h-px pointer-events-none"
              style={{
                background: 'rgba(0,255,136,0.15)',
                animation: 'scanline-scroll 3s linear infinite',
                opacity: hovered ? 0.6 : 0.2,
              }}
            />
            {/* Corner brackets on hover */}
            {hovered && (
              <>
                <div className="absolute top-2 left-2 w-4 h-4" style={{ borderTop: '1px solid #00ff88', borderLeft: '1px solid #00ff88' }} />
                <div className="absolute top-2 right-2 w-4 h-4" style={{ borderTop: '1px solid #00ff88', borderRight: '1px solid #00ff88' }} />
                <div className="absolute bottom-2 left-2 w-4 h-4" style={{ borderBottom: '1px solid #00ff88', borderLeft: '1px solid #00ff88' }} />
                <div className="absolute bottom-2 right-2 w-4 h-4" style={{ borderBottom: '1px solid #00ff88', borderRight: '1px solid #00ff88' }} />
              </>
            )}
            {/* Status indicator */}
            <div className="absolute top-2 right-2 flex items-center gap-1.5">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: '#00ff88',
                  boxShadow: '0 0 4px rgba(0,255,136,0.6)',
                  animation: 'flicker 4s infinite',
                }}
              />
              <span className="font-mono text-[7px] font-bold" style={{ color: 'rgba(0,255,136,0.5)' }}>
                LIVE
              </span>
            </div>
          </div>

          {/* Info footer */}
          <div className="px-3 py-2" style={{ borderTop: '1px solid rgba(0,255,136,0.06)' }}>
            <div
              className="font-mono text-[10px] font-bold truncate transition-all duration-300"
              style={{
                color: hovered ? '#00ff88' : 'rgba(0,255,136,0.5)',
                textShadow: hovered ? '0 0 8px rgba(0,255,136,0.4)' : 'none',
              }}
            >
              {titleText}
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="font-mono text-[8px]" style={{ color: 'rgba(0,255,136,0.2)' }}>
                {project.categories[0]?.toUpperCase()}
              </span>
              <div className="flex items-center gap-1">
                {project.images.length > 1 && (
                  <span className="font-mono text-[7px]" style={{ color: 'rgba(0,255,136,0.25)' }}>
                    [{project.images.length}]
                  </span>
                )}
                {project.concept && (
                  <span className="font-mono text-[7px] px-1 rounded" style={{ color: '#ff0040', border: '1px solid rgba(255,0,64,0.2)' }}>
                    CONCEPT
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// ─── Data Streams ───────────────────────────────────────────
function DataStreams({ count, fieldHeight }: { count: number; fieldHeight: number }) {
  // Vertical streams of "falling" characters
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const x = ((i + 1) / (count + 1)) * 100;
        const speed = 8 + (i * 3.7) % 12;
        const opacity = 0.02 + (i % 3) * 0.01;
        return (
          <div
            key={i}
            className="absolute pointer-events-none overflow-hidden"
            style={{
              left: `${x}%`,
              top: 0,
              width: 12,
              height: fieldHeight,
              opacity,
            }}
          >
            <div
              className="font-mono text-[8px] leading-[10px] whitespace-pre"
              style={{
                color: '#00ff88',
                animation: `data-stream ${speed}s linear infinite`,
                writingMode: 'vertical-rl',
              }}
            >
              {'01001101010101001110100110'.repeat(20)}
            </div>
          </div>
        );
      })}
    </>
  );
}

// ─── Expanded Detail ────────────────────────────────────────
function ExpandedDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const [scrambledTitle, setScrambledTitle] = useState('');

  useEffect(() => {
    if (!panelRef.current) return;
    // Glitch-in animation
    const tl = gsap.timeline();
    tl.fromTo(panelRef.current,
      { clipPath: 'inset(50% 50% 50% 50%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.4, ease: 'power4.out' }
    );

    // Scramble title
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambledTitle(
        project.title.split('').map((c, i) => {
          if (c === ' ') return ' ';
          if (i < iteration) return project.title[i];
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }).join('')
      );
      iteration += 1;
      if (iteration > project.title.length) {
        clearInterval(interval);
        setScrambledTitle(project.title);
      }
    }, 25);

    // Stagger images
    if (imagesRef.current) {
      const imgs = imagesRef.current.querySelectorAll('.detail-img');
      gsap.fromTo(imgs,
        { opacity: 0, y: 30, filter: 'hue-rotate(90deg) brightness(2)' },
        { opacity: 1, y: 0, filter: 'hue-rotate(0deg) brightness(1)', duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
      );
    }

    return () => clearInterval(interval);
  }, [project.title]);

  const handleClose = () => {
    if (!panelRef.current) return;
    gsap.to(panelRef.current, {
      clipPath: 'inset(50% 50% 50% 50%)',
      duration: 0.3,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[55] overflow-y-auto"
      style={{ background: 'rgba(2,8,4,0.97)', scrollbarWidth: 'none' }}
    >
      {/* Close */}
      <button
        onClick={handleClose}
        className="fixed top-6 right-6 z-[56] flex h-10 w-10 items-center justify-center rounded transition-colors"
        style={{ border: '1px solid rgba(0,255,136,0.2)', background: 'rgba(0,255,136,0.05)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="mx-auto max-w-5xl px-8 py-24">
        {/* Header terminal chrome */}
        <div
          className="mb-8 rounded overflow-hidden"
          style={{ border: '1px solid rgba(0,255,136,0.15)', background: 'rgba(0,255,136,0.02)' }}
        >
          <div className="px-4 py-2 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(0,255,136,0.08)' }}>
            <div className="flex gap-1">
              <div className="h-[6px] w-[6px] rounded-full" style={{ background: '#ff5f57' }} />
              <div className="h-[6px] w-[6px] rounded-full" style={{ background: '#ffbd2e' }} />
              <div className="h-[6px] w-[6px] rounded-full" style={{ background: '#28c840' }} />
            </div>
            <span className="font-mono text-[9px]" style={{ color: 'rgba(0,255,136,0.4)' }}>
              ARTIFACT_DETAIL — {project.id.toUpperCase().replace(/-/g, '_')}
            </span>
          </div>
          <div className="p-6 md:p-10">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-10" style={{ background: '#00ff88' }} />
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(0,255,136,0.4)' }}>
                {project.era}_{project.year}
              </span>
            </div>
            <h2
              className="font-display text-4xl md:text-6xl font-black tracking-tight uppercase"
              style={{ color: '#fff', textShadow: '0 0 30px rgba(0,255,136,0.1)' }}
            >
              {scrambledTitle || project.title}
            </h2>
            {project.client && (
              <div className="mt-3 font-mono text-xs" style={{ color: 'rgba(0,255,136,0.5)' }}>
                CLIENT: {project.client}
              </div>
            )}
            <p className="mt-6 max-w-2xl font-mono text-sm leading-relaxed" style={{ color: 'rgba(0,255,136,0.4)' }}>
              {project.caseStudy?.extendedDescription || project.description}
            </p>
          </div>
        </div>

        {/* Images */}
        <div ref={imagesRef} className="space-y-4">
          {project.images.map((src, i) => (
            <div
              key={src}
              className="detail-img rounded overflow-hidden"
              style={{ border: '1px solid rgba(0,255,136,0.08)' }}
            >
              <Image
                src={src}
                alt={`${project.title} ${i + 1}`}
                width={1200}
                height={800}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Status Dot ─────────────────────────────────────────────
function StatusDot({ label, value }: { label: string; value: string }) {
  return (
    <div className="hidden md:flex items-center gap-2">
      <div className="h-1.5 w-1.5 rounded-full" style={{ background: '#00ff88', boxShadow: '0 0 4px rgba(0,255,136,0.5)' }} />
      <span className="font-mono text-[8px] tracking-[0.15em]" style={{ color: 'rgba(0,255,136,0.3)' }}>{label}:</span>
      <span className="font-mono text-[8px] font-bold" style={{ color: 'rgba(0,255,136,0.5)' }}>{value}</span>
    </div>
  );
}

// ─── Glitch Cursor ──────────────────────────────────────────
function GlitchCursor({ mousePos }: { mousePos: { x: number; y: number } }) {
  const ringRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ringRef.current) {
      gsap.to(ringRef.current, { x: mousePos.x, y: mousePos.y, duration: 0.4, ease: 'power2.out' });
    }
    if (crossRef.current) {
      gsap.to(crossRef.current, { x: mousePos.x, y: mousePos.y, duration: 0.08 });
    }
  }, [mousePos]);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const enter = () => { gsap.to(ring, { scale: 2, opacity: 0.2, duration: 0.3 }); };
    const leave = () => { gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.3 }); };
    const attach = () => {
      document.querySelectorAll('button, a, [role="button"], .group').forEach((el) => {
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });
    };
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
    attach();
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[70] pointer-events-none hidden md:block"
        style={{
          width: 36, height: 36, marginLeft: -18, marginTop: -18,
          borderRadius: '50%', border: '1px solid rgba(0,255,136,0.3)',
          opacity: 0.5, boxShadow: '0 0 15px rgba(0,255,136,0.1)',
        }}
      />
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
