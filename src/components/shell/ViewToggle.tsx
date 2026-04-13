'use client';

import { useAppStore } from '@/stores/useAppStore';
import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface ViewToggleProps {
  size?: 'default' | 'large';
  onSelect?: () => void;
}

export default function ViewToggle({ size = 'default', onSelect }: ViewToggleProps) {
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

  const isLarge = size === 'large';

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center rounded-full bg-neutral-900/10 ${isLarge ? 'p-1.5 w-full' : 'p-1'}`}
    >
      <div
        ref={pillRef}
        className={`absolute left-0 rounded-full ${isLarge ? 'top-1.5 h-[calc(100%-12px)]' : 'top-1 h-[calc(100%-8px)]'}`}
        style={{ backgroundColor: 'var(--color-brand)' }}
      />
      <button
        onClick={() => { setActiveView('timeline'); onSelect?.(); }}
        className={`relative z-10 rounded-full font-medium tracking-wide transition-colors ${
          isLarge ? 'flex-1 px-6 py-3 text-sm' : 'px-4 py-1.5 text-xs'
        } ${
          activeView === 'timeline'
            ? 'text-white'
            : isLarge ? 'text-neutral-500' : 'text-neutral-400'
        }`}
      >
        Timeline
      </button>
      <button
        onClick={() => { setActiveView('category'); onSelect?.(); }}
        className={`relative z-10 rounded-full font-medium tracking-wide transition-colors ${
          isLarge ? 'flex-1 px-6 py-3 text-sm' : 'px-4 py-1.5 text-xs'
        } ${
          activeView === 'category'
            ? 'text-white'
            : isLarge ? 'text-neutral-500' : 'text-neutral-400'
        }`}
      >
        By Type
      </button>
    </div>
  );
}
