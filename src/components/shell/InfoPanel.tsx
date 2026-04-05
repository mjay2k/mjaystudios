'use client';

import { useRef, useEffect, useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { gsap } from '@/lib/gsap';

export default function InfoPanel() {
  const currentSection = useAppStore((s) => s.currentSection);
  const contentRef = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState(currentSection);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!contentRef.current || !currentSection) return;

    const tl = gsap.timeline();
    tl.to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => setDisplayed(currentSection),
    }).to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out',
    });

    return () => {
      tl.kill();
    };
  }, [currentSection]);

  if (!displayed) return null;

  return (
    <>
      <div className="fixed top-28 left-20 z-40 hidden w-48 md:block">
        <div ref={contentRef}>
          <h3 className="text-sm font-bold tracking-wide uppercase text-neutral-700">
            {displayed.label}
          </h3>
          {displayed.dateRange && (
            <p className="mt-1 text-xs text-neutral-400">{displayed.dateRange}</p>
          )}
          <p className="mt-2 text-xs leading-relaxed text-neutral-500">
            {displayed.description}
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 left-0 z-40 block md:hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full bg-white/95 px-4 py-3 text-left backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wide uppercase text-neutral-700">
              {displayed.label}
            </span>
            <span
              className={`text-neutral-400 transition-transform text-xs ${expanded ? 'rotate-180' : ''}`}
            >
              ^
            </span>
          </div>
          {expanded && (
            <div className="mt-2">
              {displayed.dateRange && (
                <p className="text-xs text-neutral-400">{displayed.dateRange}</p>
              )}
              <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                {displayed.description}
              </p>
            </div>
          )}
        </button>
      </div>
    </>
  );
}
