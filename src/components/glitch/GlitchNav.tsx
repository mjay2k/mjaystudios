'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import VersionSwitcher from '@/components/shell/VersionSwitcher';

export default function GlitchNav() {
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);
  const setContactOpen = useAppStore((s) => s.setContactOpen);
  const logoRef = useRef<HTMLImageElement>(null);

  const handleLogoHover = () => {
    if (logoRef.current) {
      // Glitch-style logo animation
      const tl = gsap.timeline();
      tl.to(logoRef.current, { x: -3, filter: 'hue-rotate(90deg)', duration: 0.05, ease: 'none' })
        .to(logoRef.current, { x: 5, filter: 'hue-rotate(-90deg)', duration: 0.05, ease: 'none' })
        .to(logoRef.current, { x: -2, filter: 'hue-rotate(180deg)', duration: 0.05, ease: 'none' })
        .to(logoRef.current, { x: 0, filter: 'hue-rotate(0deg)', duration: 0.05, ease: 'none' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 md:px-10">
      <button onMouseEnter={handleLogoHover} className="flex items-center gap-3">
        <Image
          ref={logoRef}
          src="/mjaystudios-logo.svg"
          alt="MJay Studios"
          width={140}
          height={36}
          className="h-9 w-auto brightness-0 invert opacity-40 transition-opacity hover:opacity-80"
          style={{ filter: 'brightness(0) invert(1) sepia(1) hue-rotate(100deg) saturate(5)' }}
          priority
        />
        <span
          className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase leading-tight"
          style={{ color: 'rgba(0,255,136,0.3)', textShadow: '0 0 8px rgba(0,255,136,0.15)' }}
        >
          MJAY<br />STUDIOS
        </span>
      </button>

      <div className="flex items-center gap-5">
        <button
          onClick={() => setAboutOpen(true)}
          className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
          style={{ color: 'rgba(0,255,136,0.25)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#00ff88';
            e.currentTarget.style.textShadow = '0 0 10px rgba(0,255,136,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(0,255,136,0.25)';
            e.currentTarget.style.textShadow = 'none';
          }}
        >
          [ABOUT]
        </button>
        <button
          onClick={() => setContactOpen(true)}
          className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
          style={{ color: 'rgba(0,255,136,0.25)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#00ff88';
            e.currentTarget.style.textShadow = '0 0 10px rgba(0,255,136,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(0,255,136,0.25)';
            e.currentTarget.style.textShadow = 'none';
          }}
        >
          [CONTACT]
        </button>
        <div className="h-4 w-px" style={{ background: 'rgba(0,255,136,0.1)' }} />
        <VersionSwitcher />
      </div>
    </nav>
  );
}
