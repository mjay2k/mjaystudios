'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';

/* ──────────────────────────────────────────────────────────
   LogoBoard — the Logo Design Collection gets its own stage.

   The 24 source files are 12 logo PAIRS (odd = dark face,
   even = reversed light face). A master switch cascade-flips
   the entire wall in 3D from one corner; hovering any tile
   flips just that mark to peek at its other face.
   ────────────────────────────────────────────────────────── */

const BASE = '/portfolio/agency/logo-designs';
// odd file = dark face, even file = reversed/light face
const FILE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 23, 24, 25, 26, 27, 28];
const PAIRS = Array.from({ length: 12 }, (_, i) => ({
  dark: `${BASE}/logos-2-${String(FILE_NUMBERS[i * 2]).padStart(2, '0')}.jpg`,
  light: `${BASE}/logos-2-${String(FILE_NUMBERS[i * 2 + 1]).padStart(2, '0')}.jpg`,
}));

const COLS = 4; // desktop grid — 4 × 3

// Token-driven — follows the monograph's active palette.
const PALETTE = {
  bg: 'var(--mg-bg)',
  bone: 'var(--mg-fg)',
  muted: 'color-mix(in srgb, var(--mg-fg) 60%, transparent)',
  hair: 'color-mix(in srgb, var(--mg-fg) 16%, transparent)',
  brand: '#F15A29',
};

function FlipTile({
  pair,
  flipped,
  delay,
}: {
  pair: { dark: string; light: string };
  flipped: boolean;
  delay: number;
}) {
  const [hover, setHover] = useState(false);
  // hover peeks at the OTHER face relative to the board state
  const showLight = hover ? !flipped : flipped;

  return (
    <div
      className="relative aspect-square"
      style={{ perspective: '900px' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${showLight ? 180 : 0}deg)`,
          transition: `transform 0.7s cubic-bezier(0.34, 1.3, 0.5, 1) ${hover ? 0 : delay}ms`,
          willChange: 'transform',
        }}
      >
        {/* dark face */}
        <div
          className="absolute inset-0 overflow-hidden rounded-md"
          style={{ backfaceVisibility: 'hidden', boxShadow: '0 14px 34px rgba(0,0,0,0.45)' }}
        >
          <Image src={pair.dark} alt="Logo — dark version" fill sizes="(max-width: 768px) 50vw, 22vw" className="object-cover" />
        </div>
        {/* reversed face */}
        <div
          className="absolute inset-0 overflow-hidden rounded-md"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: '0 14px 34px rgba(0,0,0,0.45)',
          }}
        >
          <Image src={pair.light} alt="Logo — reversed version" fill sizes="(max-width: 768px) 50vw, 22vw" className="object-cover" />
        </div>
      </div>
    </div>
  );
}

export default function LogoBoard() {
  const setDetailProject = useAppStore((s) => s.setDetailProject);
  const [flipped, setFlipped] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const close = () => {
    const el = overlayRef.current;
    if (!el) return setDetailProject(null);
    gsap.to(el, { opacity: 0, duration: 0.28, onComplete: () => setDetailProject(null) });
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 });
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      // space flips the whole board — it begs to be toggled
      if (e.key === ' ') {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // cascade: each tile waits on its diagonal distance from the active corner;
  // flipping back cascades from the opposite corner so it never feels canned
  const delayFor = (i: number) => {
    const r = Math.floor(i / COLS);
    const c = i % COLS;
    const d = flipped ? r + c : (2 - r) + (COLS - 1 - c);
    return d * 70;
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[120] overflow-y-auto"
      style={{ background: PALETTE.bg, fontFamily: 'var(--font-body)' }}
    >
      {/* top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 md:px-8" style={{ background: 'color-mix(in srgb, var(--mg-bg) 86%, transparent)', backdropFilter: 'blur(10px)' }}>
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-[0.28em]"
            style={{ fontFamily: 'var(--font-display)', color: PALETTE.brand }}
          >
            Identity Design
          </p>
          <h2 className="mono-serif mt-1 text-xl font-semibold tracking-tight md:text-2xl" style={{ color: PALETTE.bone }}>
            Twelve marks, two faces.
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* the switch */}
          <button
            onClick={() => setFlipped((f) => !f)}
            aria-pressed={flipped}
            aria-label="Show reversed versions"
            className="flex items-center gap-3"
          >
            <span
              className="hidden text-[10px] font-bold uppercase tracking-[0.2em] sm:block"
              style={{ fontFamily: 'var(--font-display)', color: flipped ? PALETTE.muted : PALETTE.bone }}
            >
              Positive
            </span>
            <span
              className="relative h-7 w-14 rounded-full transition-colors duration-300"
              style={{ background: flipped ? PALETTE.brand : 'color-mix(in srgb, var(--mg-fg) 18%, transparent)', border: `1px solid ${PALETTE.hair}` }}
            >
              <span
                className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full transition-all duration-300"
                style={{ left: flipped ? 'calc(100% - 1.4rem)' : '0.18rem', background: PALETTE.bone }}
              />
            </span>
            <span
              className="hidden text-[10px] font-bold uppercase tracking-[0.2em] sm:block"
              style={{ fontFamily: 'var(--font-display)', color: flipped ? PALETTE.bone : PALETTE.muted }}
            >
              Reversed
            </span>
          </button>

          <button
            onClick={close}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: 'color-mix(in srgb, var(--mg-fg) 8%, transparent)', border: `1px solid ${PALETTE.hair}`, color: PALETTE.bone }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* the wall */}
      <div className="mx-auto max-w-[1200px] px-5 pb-10 pt-6 md:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {PAIRS.map((pair, i) => (
            <FlipTile key={pair.dark} pair={pair} flipped={flipped} delay={delayFor(i)} />
          ))}
        </div>
        <p className="mt-6 text-center text-[11px]" style={{ color: PALETTE.muted }}>
          Flip the switch — or hover any mark — to see its reversed face.
          <span className="hidden md:inline"> (Spacebar works too.)</span>
        </p>
      </div>
    </div>
  );
}
