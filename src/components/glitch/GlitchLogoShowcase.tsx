'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

const LOGO_COUNT = 12;
const BASE_PATH = '/portfolio/agency/logo-designs';

function getLogoPair(index: number) {
  const fileNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 23, 24, 25, 26, 27, 28,
  ];
  const darkNum = String(fileNumbers[index * 2]).padStart(2, '0');
  const lightNum = String(fileNumbers[index * 2 + 1]).padStart(2, '0');
  return {
    dark: `${BASE_PATH}/logos-2-${darkNum}.jpg`,
    light: `${BASE_PATH}/logos-2-${lightNum}.jpg`,
  };
}

const logos = Array.from({ length: LOGO_COUNT }, (_, i) => getLogoPair(i));

interface Props {
  onClose: () => void;
}

export default function GlitchLogoShowcase({ onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const glitchIntervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  // Entrance animation
  useEffect(() => {
    if (!panelRef.current) return;

    const tl = gsap.timeline();

    // Flash + clipPath tear
    tl.fromTo(panelRef.current,
      { clipPath: 'inset(48% 48% 48% 48%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power4.out' }
    );
    tl.to(panelRef.current, { x: 6, duration: 0.03, ease: 'none' }, 0.12);
    tl.to(panelRef.current, { x: -4, duration: 0.03, ease: 'none' }, 0.15);
    tl.to(panelRef.current, { x: 0, duration: 0.05, ease: 'power2.out' }, 0.18);

    // Stagger cards in
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.logo-card');
      tl.fromTo(cards,
        { opacity: 0, scale: 0.85, filter: 'brightness(3) hue-rotate(90deg)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'brightness(1) hue-rotate(0deg)',
          duration: 0.5,
          stagger: { each: 0.04, from: 'random' },
          ease: 'power3.out',
        },
        0.25
      );
    }

    // Ambient random glitch on cards
    glitchIntervalRef.current = setInterval(() => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll('.logo-card');
      const idx = Math.floor(Math.random() * cards.length);
      const card = cards[idx] as HTMLElement;
      if (!card) return;

      gsap.to(card, {
        filter: 'hue-rotate(180deg) saturate(3) brightness(1.4)',
        x: `+=${(Math.random() - 0.5) * 8}`,
        duration: 0.05,
        ease: 'none',
        onComplete: () => {
          gsap.to(card, {
            filter: 'hue-rotate(0deg) saturate(1) brightness(1)',
            x: 0,
            duration: 0.15,
          });
        },
      });
    }, 2000);

    return () => {
      tl.kill();
      clearInterval(glitchIntervalRef.current);
    };
  }, []);

  const handleClose = useCallback(() => {
    if (!panelRef.current) return;
    clearInterval(glitchIntervalRef.current);

    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, { x: -4, duration: 0.03, ease: 'none' });
    tl.to(panelRef.current, { x: 3, duration: 0.03, ease: 'none' });
    tl.to(panelRef.current, {
      clipPath: 'inset(48% 48% 48% 48%)',
      duration: 0.35,
      ease: 'power3.in',
    });
  }, [onClose]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleClose]);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[55] overflow-y-auto"
      style={{ background: 'rgba(2,8,4,0.97)', scrollbarWidth: 'none' }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="fixed top-4 right-4 z-[65] flex h-11 w-11 items-center justify-center rounded transition-all hover:scale-110"
        style={{
          border: '1px solid rgba(0,255,136,0.25)',
          background: 'rgba(0,255,136,0.06)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="mx-auto max-w-5xl px-4 pt-14 pb-16 sm:px-6 md:px-8 md:py-24">
        {/* Terminal chrome header */}
        <div
          className="rounded-t overflow-hidden"
          style={{
            border: '1px solid rgba(0,255,136,0.15)',
            borderBottom: 'none',
            background: 'rgba(0,255,136,0.02)',
          }}
        >
          <div
            className="px-3 sm:px-4 py-2 flex items-center gap-2"
            style={{ borderBottom: '1px solid rgba(0,255,136,0.08)' }}
          >
            <div className="flex gap-1">
              <div className="h-[6px] w-[6px] rounded-full" style={{ background: '#ff5f57' }} />
              <div className="h-[6px] w-[6px] rounded-full" style={{ background: '#ffbd2e' }} />
              <div className="h-[6px] w-[6px] rounded-full" style={{ background: '#28c840' }} />
            </div>
            <span className="font-mono text-[8px] sm:text-[9px]" style={{ color: 'rgba(0,255,136,0.4)' }}>
              LOGO_MATRIX — IDENTITY_ARCHIVE
            </span>
          </div>

          <div className="p-4 sm:p-6 font-mono">
            <div
              className="text-xs sm:text-sm mb-1"
              style={{ color: '#00ff88', textShadow: '0 0 8px rgba(0,255,136,0.5)' }}
            >
              <span className="hidden sm:inline">mjay@studio:~$ </span>
              <span className="sm:hidden">mjay:~$ </span>
              render --mode=chromatic /archive/logos/*
            </div>
            <div className="text-[10px] sm:text-xs" style={{ color: 'rgba(0,255,136,0.35)' }}>
              {'> 12 identity pairs loaded — dark/light channels separated'}
            </div>
            <div className="text-[10px] sm:text-xs mt-1" style={{ color: 'rgba(0,255,136,0.25)' }}>
              {'> hover to reveal — signal will alternate between colorways'}
            </div>
          </div>
        </div>

        {/* Logo grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1"
          style={{
            border: '1px solid rgba(0,255,136,0.15)',
            borderTop: 'none',
            background: 'rgba(0,255,136,0.01)',
            borderRadius: '0 0 4px 4px',
            padding: 4,
          }}
        >
          {logos.map((pair, i) => (
            <LogoCard
              key={i}
              index={i}
              pair={pair}
              isHovered={hoveredIdx === i}
              onHover={() => setHoveredIdx(i)}
              onLeave={() => setHoveredIdx(null)}
            />
          ))}
        </div>

        {/* Footer status */}
        <div className="mt-4 font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: '#00ff88', boxShadow: '0 0 4px rgba(0,255,136,0.5)' }}
            />
            <span className="text-[9px] sm:text-[10px]" style={{ color: 'rgba(0,255,136,0.3)' }}>
              RENDER: STABLE — {LOGO_COUNT} PAIRS ACTIVE
            </span>
          </div>
          <span className="text-[9px]" style={{ color: 'rgba(0,255,136,0.15)' }}>
            MJAY://IDENTITY_ARCHIVE
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Individual Logo Card ──────────────────────────────────
function LogoCard({
  index,
  pair,
  isHovered,
  onHover,
  onLeave,
}: {
  index: number;
  pair: { dark: string; light: string };
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const greenOverlayRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<gsap.core.Timeline | null>(null);

  // Hover: remove distortion, show clean logo, start glitch cycle
  useEffect(() => {
    if (!darkRef.current || !lightRef.current || !scanlineRef.current || !greenOverlayRef.current) return;

    // Kill any running cycle
    if (cycleRef.current) {
      cycleRef.current.kill();
      cycleRef.current = null;
    }

    if (isHovered) {
      // Immediately show clean dark version — no filters, no blend modes, no scanlines
      gsap.to(darkRef.current, {
        filter: 'none',
        x: 0, y: 0,
        duration: 0.25,
        ease: 'power2.out',
      });
      // Hide light layer and reset it for clean display later
      gsap.set(lightRef.current, { filter: 'none', mixBlendMode: 'normal' });
      gsap.to(lightRef.current, { opacity: 0, x: 0, y: 0, duration: 0.2 });
      gsap.to(greenOverlayRef.current, { opacity: 0, duration: 0.2 });
      gsap.to(scanlineRef.current, { opacity: 0, duration: 0.2 });

      // Glitch cycle: dark (clean) → burst → light (clean) → burst → dark → repeat
      const buildCycle = () => {
        const tl = gsap.timeline({ repeat: -1, delay: 2 });

        // ── Glitch burst: dark → light ──
        tl.to(darkRef.current, { filter: 'brightness(2) hue-rotate(90deg)', x: 3, duration: 0.04, ease: 'none' });
        tl.to(darkRef.current, { filter: 'brightness(0.5) hue-rotate(-60deg)', x: -4, duration: 0.04, ease: 'none' });
        tl.to(darkRef.current, { filter: 'brightness(1.5) hue-rotate(45deg)', x: 2, duration: 0.04, ease: 'none' });
        // Swap: hide dark, show light (both clean, no filters)
        tl.set(darkRef.current, { filter: 'none', x: 0 });
        tl.to(darkRef.current, { opacity: 0, duration: 0.03 });
        tl.to(lightRef.current, { opacity: 1, filter: 'none', duration: 0.03 }, '<');
        // Hold light clean
        tl.to({}, { duration: 3 });

        // ── Glitch burst: light → dark ──
        tl.to(lightRef.current, { filter: 'brightness(2) hue-rotate(-90deg)', x: -3, duration: 0.04, ease: 'none' });
        tl.to(lightRef.current, { filter: 'brightness(0.5) hue-rotate(60deg)', x: 4, duration: 0.04, ease: 'none' });
        tl.to(lightRef.current, { filter: 'brightness(1.5) hue-rotate(-45deg)', x: -2, duration: 0.04, ease: 'none' });
        // Swap: hide light, show dark (both clean)
        tl.set(lightRef.current, { filter: 'none', x: 0 });
        tl.to(lightRef.current, { opacity: 0, duration: 0.03 });
        tl.to(darkRef.current, { opacity: 1, filter: 'none', duration: 0.03 }, '<');
        // Hold dark clean
        tl.to({}, { duration: 3 });

        return tl;
      };

      cycleRef.current = buildCycle();
    } else {
      // Restore distorted resting state
      gsap.to(darkRef.current, {
        filter: 'saturate(0.3) brightness(0.7) contrast(1.2)',
        opacity: 1, x: 0, y: 0,
        duration: 0.4,
        ease: 'power3.out',
      });
      gsap.to(lightRef.current, {
        filter: 'saturate(0.2) brightness(1.2) contrast(1.1) hue-rotate(180deg)',
        opacity: 0.35, x: 0, y: 0,
        mixBlendMode: 'screen',
        duration: 0.4,
        ease: 'power3.out',
      });
      gsap.to(greenOverlayRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(scanlineRef.current, { opacity: 0.5, duration: 0.3 });
    }

    return () => {
      if (cycleRef.current) {
        cycleRef.current.kill();
        cycleRef.current = null;
      }
    };
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className="logo-card relative aspect-square overflow-hidden rounded cursor-pointer"
      style={{
        background: '#0a0f0c',
        border: `1px solid ${isHovered ? 'rgba(0,255,136,0.35)' : 'rgba(0,255,136,0.06)'}`,
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Dark version — base layer. Filter on wrapper so GSAP can control it */}
      <div
        ref={darkRef}
        className="absolute inset-0"
        style={{ filter: 'saturate(0.3) brightness(0.7) contrast(1.2)' }}
      >
        <Image
          src={pair.dark}
          alt={`Logo ${index + 1} dark`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
      </div>

      {/* Green CRT overlay — fades out on hover */}
      <div
        ref={greenOverlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(0,255,136,0.06)', mixBlendMode: 'color' }}
      />

      {/* Light version — hidden at rest, shown during glitch cycle.
          Filter + blend on wrapper so GSAP can clear them on hover */}
      <div
        ref={lightRef}
        className="absolute inset-0"
        style={{
          opacity: 0.35,
          filter: 'saturate(0.2) brightness(1.2) contrast(1.1) hue-rotate(180deg)',
          mixBlendMode: 'screen',
        }}
      >
        <Image
          src={pair.light}
          alt={`Logo ${index + 1} light`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
      </div>

      {/* Scanline */}
      <div
        ref={scanlineRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
          opacity: 0.5,
        }}
      />

      {/* Corner brackets on hover */}
      {isHovered && (
        <>
          <div className="absolute top-1.5 left-1.5 w-3 h-3" style={{ borderTop: '1px solid #00ff88', borderLeft: '1px solid #00ff88' }} />
          <div className="absolute top-1.5 right-1.5 w-3 h-3" style={{ borderTop: '1px solid #00ff88', borderRight: '1px solid #00ff88' }} />
          <div className="absolute bottom-1.5 left-1.5 w-3 h-3" style={{ borderBottom: '1px solid #00ff88', borderLeft: '1px solid #00ff88' }} />
          <div className="absolute bottom-1.5 right-1.5 w-3 h-3" style={{ borderBottom: '1px solid #00ff88', borderRight: '1px solid #00ff88' }} />
        </>
      )}

      {/* Index label */}
      <div className="absolute bottom-1 right-1.5 font-mono text-[7px] sm:text-[8px]" style={{ color: 'rgba(0,255,136,0.25)' }}>
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  );
}
