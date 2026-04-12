'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// 12 logo pairs: odd = dark, even = light
const LOGO_COUNT = 12;
const BASE_PATH = '/portfolio/agency/logo-designs';

function getLogoPair(index: number) {
  // Files: logos-2-01 (dark), logos-2-02 (light), logos-2-03 (dark), logos-2-04 (light)...
  // But numbering skips 19-22: 01-18, then 23-28
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

  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return;

    const darkLayers = gridRef.current.querySelectorAll('.logo-dark');

    // Pin the grid while the diagonal wipe happens
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: true,
    });

    // Animate each dark layer's clip-path from hidden to fully revealed
    darkLayers.forEach((layer, i) => {
      // Stagger the reveal slightly per logo
      const staggerDelay = i * 0.03;

      gsap.fromTo(
        layer,
        { clipPath: 'polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: true,
          },
          delay: staggerDelay,
        }
      );
    });

    return () => {
      pinTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const logos = Array.from({ length: LOGO_COUNT }, (_, i) => getLogoPair(i));

  return (
    <div ref={containerRef} className="relative py-16 md:py-24">
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
              style={{ clipPath: 'polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)' }}
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
