'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';

// 12 logo pairs: odd = dark, even = light
const LOGO_COUNT = 12;
const BASE_PATH = '/portfolio/agency/logo-designs';

function getLogoPair(index: number) {
  const fileNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 23, 24, 25, 26, 27, 28,
  ];
  const darkIdx = index * 2;
  const lightIdx = index * 2 + 1;
  const darkNum = String(fileNumbers[darkIdx]).padStart(2, '0');
  const lightNum = String(fileNumbers[lightIdx]).padStart(2, '0');
  return {
    dark: `${BASE_PATH}/logos-2-${darkNum}.jpg`,
    light: `${BASE_PATH}/logos-2-${lightNum}.jpg`,
  };
}

export default function LogoShowcase({ hideHeader = false }: { hideHeader?: boolean }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const darkLayersRef = useRef<HTMLElement[]>([]);
  const [wipeProgress, setWipeProgress] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const progressRef = useRef(0);
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Apply wipe to all dark layers (instant — used during drag)
  const applyWipe = useCallback((progress: number) => {
    const clamped = Math.max(0, Math.min(100, progress));
    progressRef.current = clamped;
    setWipeProgress(clamped);
    darkLayersRef.current.forEach((layer) => {
      if (layer) {
        // Wipe from right to left: cursor/finger moves right = wipe goes right
        layer.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
      }
    });
  }, []);

  // Smooth animated snap to a target progress
  const animateWipe = useCallback((target: number) => {
    const obj = { val: progressRef.current };
    gsap.to(obj, {
      val: target,
      duration: 0.4,
      ease: 'power2.out',
      onUpdate: () => applyWipe(obj.val),
    });
  }, [applyWipe]);

  // Desktop: cursor X position over grid controls wipe
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = (x / rect.width) * 100;
    applyWipe(progress);
  }, [applyWipe]);

  const handleMouseLeave = useCallback(() => {
    // Smooth snap to nearest state
    animateWipe(progressRef.current > 50 ? 100 : 0);
  }, [animateWipe]);

  // Mobile: swipe controls wipe (starts from current position)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsTouching(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const deltaX = e.touches[0].clientX - touchStartX.current;
    // Swipe right = reveal dark, swipe left = restore light
    const swipeProgress = (deltaX / rect.width) * 200;
    const startProgress = progressRef.current;
    // If already dark (100), swiping left goes back. If light (0), swiping right goes dark.
    const progress = startProgress > 50
      ? 100 + swipeProgress  // swiping left from dark state
      : swipeProgress;        // swiping right from light state
    applyWipe(progress);
  }, [applyWipe]);

  const handleTouchEnd = useCallback(() => {
    setIsTouching(false);
    // Smooth snap to nearest state
    animateWipe(progressRef.current > 50 ? 100 : 0);
  }, [animateWipe]);

  const logos = Array.from({ length: LOGO_COUNT }, (_, i) => getLogoPair(i));
  const isRevealed = wipeProgress > 50;

  return (
    <div className={`relative ${hideHeader ? '' : 'py-16 md:py-24'}`}>
      {/* Section header */}
      {!hideHeader && (
        <div className="mb-12 md:mb-16">
          <h3 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-neutral-300">
            Logo <span style={{ color: 'var(--color-brand)' }}>Design</span>
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400 max-w-lg">
            A selection of logos that have gone live throughout my career — at Keller Crescent, 10over12, Berry Global, and freelance. Branding is one of the most satisfying creative challenges: distill an entire business into a single mark that speaks loudly, works at any scale, and does its job from day one.
          </p>
        </div>
      )}

      {/* Interaction hint */}
      <div className="flex items-center gap-2 mb-6 text-neutral-400">
        {isMobile ? (
          <>
            {/* Swipe icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
              <path d="M15 15l3-3 3 3" />
              <path d="M21 15l-3-3-3 3" />
            </svg>
            <span className="text-xs font-medium">
              {isRevealed ? 'Swipe left to restore' : 'Swipe right to reverse'}
            </span>
          </>
        ) : (
          <>
            {/* Cursor icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3l14 9-7 2-4 7z" />
            </svg>
            <span className="text-xs font-medium">
              {isRevealed ? 'Move left to restore' : 'Hover to reveal reverse colorways'}
            </span>
          </>
        )}
      </div>

      {/* Logo grid — interactive */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 select-none"
        onMouseMove={!isMobile ? handleMouseMove : undefined}
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchMove={isMobile ? handleTouchMove : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
        style={{ cursor: !isMobile ? 'ew-resize' : undefined }}
      >
        {logos.map((pair, i) => {
          const isDark = theme === 'dark';
          const baseSrc = isDark ? pair.dark : pair.light;
          const overlaySrc = isDark ? pair.light : pair.dark;
          return (
            <div key={i} className="logo-item relative aspect-square overflow-hidden rounded-xl" style={{ backgroundColor: isDark ? '#111111' : '#f2f2f2' }}>
              {/* Base layer — matches current theme */}
              <Image
                src={baseSrc}
                alt={`Logo design ${i + 1}`}
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Wipe overlay — opposite colorway */}
              <div
                className="logo-dark absolute inset-0 pointer-events-none"
                ref={(el) => { if (el) darkLayersRef.current[i] = el; }}
                style={{ clipPath: 'inset(0 100% 0 0)' }}
              >
                <Image
                  src={overlaySrc}
                  alt={`Logo design ${i + 1} alt`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
