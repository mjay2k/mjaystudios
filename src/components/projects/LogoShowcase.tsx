'use client';

import { useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';
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
  const theme = useAppStore((s) => s.theme);

  const setupTriggers = useCallback(() => {
    if (!gridRef.current) return [];

    const logoItems = gridRef.current.querySelectorAll<HTMLElement>('.logo-item');
    const triggers: ScrollTrigger[] = [];
    const isMobile = window.innerWidth < 768;

    logoItems.forEach((item) => {
      const darkLayer = item.querySelector<HTMLElement>('.logo-dark');
      if (!darkLayer) return;

      if (isMobile) {
        // Mobile: one-shot animation when logo enters viewport
        const trigger = ScrollTrigger.create({
          trigger: item,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.fromTo(darkLayer,
              { clipPath: 'inset(0 0 100% 0)' },
              { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power2.inOut' }
            );
          },
        });
        triggers.push(trigger);
      } else {
        // Desktop: scroll-scrubbed wipe
        const trigger = ScrollTrigger.create({
          trigger: item,
          start: 'center bottom',
          end: 'center 60%',
          scrub: 0.2,
          onUpdate: (self) => {
            const p = Math.min(self.progress * 120, 100);
            darkLayer.style.clipPath = `inset(0 0 ${100 - p}% 0)`;
          },
        });
        triggers.push(trigger);
      }
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
    <div className={`relative ${hideHeader ? '' : 'py-16 md:py-24'}`}>
      {/* Section header — hidden when used inside CategoryView */}
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
              style={{ clipPath: 'inset(0 0 100% 0)' }}
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
