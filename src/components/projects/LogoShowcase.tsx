'use client';

import { useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ScrollTrigger } from '@/lib/gsap';
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

export default function LogoShowcase() {
  const gridRef = useRef<HTMLDivElement>(null);
  const theme = useAppStore((s) => s.theme);

  const setupTriggers = useCallback(() => {
    if (!gridRef.current) return [];

    const logoItems = gridRef.current.querySelectorAll<HTMLElement>('.logo-item');
    const triggers: ScrollTrigger[] = [];

    logoItems.forEach((item) => {
      const darkLayer = item.querySelector<HTMLElement>('.logo-dark');
      if (!darkLayer) return;

      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top bottom',
        end: 'top 50%',
        scrub: 0.3,
        onUpdate: (self) => {
          // Scale progress so wipe fully completes
          const p = Math.min(self.progress * 130, 100);
          const offset = 15;
          const left = 100 - p - offset;
          const right = 100 - p + offset;
          darkLayer.style.clipPath = p >= 100
            ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
            : `polygon(${Math.max(0, right)}% 0%, 100% 0%, 100% 100%, ${Math.max(0, left)}% 100%)`;
        },
      });
      triggers.push(trigger);
    });

    return triggers;
  }, []);

  // Recreate triggers when theme changes (ScrollTrigger positions can shift)
  useEffect(() => {
    const triggers = setupTriggers();
    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [setupTriggers, theme]);

  const logos = Array.from({ length: LOGO_COUNT }, (_, i) => getLogoPair(i));

  return (
    <div className="relative py-16 md:py-24">
      {/* Section header */}
      <div className="mb-12 md:mb-16">
        <h3 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-neutral-300">
          Logo <span style={{ color: 'var(--color-brand)' }}>Design</span>
        </h3>
        <p className="mt-3 text-sm text-neutral-400 max-w-md">
          Brand identity work across multiple industries.
        </p>
      </div>

      {/* Logo grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
      >
        {logos.map((pair, i) => (
          <div key={i} className="logo-item relative aspect-square overflow-hidden rounded-xl">
            {/* Light version (base layer) */}
            <Image
              src={pair.light}
              alt={`Logo design ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {/* Dark version (diagonal wipe overlay) */}
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
