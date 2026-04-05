'use client';

import { useAppStore } from '@/stores/useAppStore';
import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export default function ViewToggle() {
  const activeView = useAppStore((s) => s.activeView);
  const setActiveView = useAppStore((s) => s.setActiveView);
  const pillRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pillRef.current || !containerRef.current) return;
    const buttons = containerRef.current.querySelectorAll('button');
    const activeButton = activeView === 'timeline' ? buttons[0] : buttons[1];

    gsap.to(pillRef.current, {
      x: activeButton.offsetLeft,
      width: activeButton.offsetWidth,
      duration: 0.4,
      ease: 'power3.out',
    });
  }, [activeView]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center rounded-full bg-white/10 p-1 backdrop-blur-sm"
    >
      <div
        ref={pillRef}
        className="absolute top-1 left-0 h-[calc(100%-8px)] rounded-full bg-white/20"
      />
      <button
        onClick={() => setActiveView('timeline')}
        className={`relative z-10 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-colors ${
          activeView === 'timeline' ? 'text-white' : 'text-white/50'
        }`}
      >
        Timeline
      </button>
      <button
        onClick={() => setActiveView('category')}
        className={`relative z-10 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-colors ${
          activeView === 'category' ? 'text-white' : 'text-white/50'
        }`}
      >
        By Type
      </button>
    </div>
  );
}
