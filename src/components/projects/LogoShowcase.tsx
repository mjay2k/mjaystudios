'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';

// 12 logo pairs: odd = dark, even = light
const LOGO_COUNT = 12;
const BASE_PATH = '/portfolio/agency/logo-designs';

function getLogoPair(index: number) {
  // Files: logos-2-01 (dark), logos-2-02 (light), logos-2-03 (dark), logos-2-04 (light)...
  // Numbering skips 19-22: 01-18, then 23-28
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

export default function LogoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const theme = useAppStore((s) => s.theme);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return;

    const darkLayers = gridRef.current.querySelectorAll<HTMLElement>('.logo-dark');
    const triggers: ScrollTrigger[] = [];

    // Pin the grid while the diagonal wipe happens
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 64px', // below navbar
      end: '+=80%',
      pin: true,
      pinSpacing: true,
    });
    triggers.push(pinTrigger);

    // Diagonal wipe: sweeps from top-right to bottom-left
    const wipeTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 64px',
      end: '+=80%',
      scrub: 0.3,
      onUpdate: (self) => {
        const progress = self.progress;
        const p = progress * 160; // scale so all logos finish before end
        darkLayers.forEach((layer, i) => {
          const stagger = i * 4;
          const localP = Math.max(0, Math.min(100, p - stagger));
          const offset = 15;
          const left = 100 - localP - offset;
          const right = 100 - localP + offset;
          layer.style.clipPath = `polygon(${Math.max(0, right)}% 0%, 100% 0%, 100% 100%, ${Math.max(0, left)}% 100%)`;
        });
      },
    });
    triggers.push(wipeTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const logos = Array.from({ length: LOGO_COUNT }, (_, i) => getLogoPair(i));

  return (
    <div
      ref={containerRef}
      className="relative py-16 md:py-24"
      style={{ backgroundColor: isDark ? '#111111' : '#f2f2f2', zIndex: 10 }}
    >
      {/* Section header */}
      <div className="mb-12 md:mb-16">
        <h3 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-neutral-300">
          Logo <span style={{ color: 'var(--color-brand)' }}>Design</span>
        </h3>
        <p className="mt-3 text-sm text-neutral-400 max-w-md">
          Brand identity work across multiple industries. Scroll to reveal the reverse colorways.
        </p>
      </div>

      {/* Logo grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
      >
        {logos.map((pair, i) => (
          <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
            {/* Light version (base layer — always visible) */}
            <Image
              src={pair.light}
              alt={`Logo design ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {/* Dark version (diagonal wipe overlay — starts clipped to nothing) */}
            <div
              className="logo-dark absolute inset-0"
              style={{ clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' }}
            >
              <Image
                src={pair.dark}
                alt={`Logo design ${i + 1} dark`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
