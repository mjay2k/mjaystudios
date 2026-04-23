'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import VersionSwitcher from '@/components/shell/VersionSwitcher';

export default function CinematicNav() {
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);
  const setContactOpen = useAppStore((s) => s.setContactOpen);
  const logoRef = useRef<HTMLImageElement>(null);

  const handleLogoHover = () => {
    if (logoRef.current) {
      gsap.to(logoRef.current, { rotation: '+=360', duration: 0.6, ease: 'power2.inOut' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 md:px-10">
      {/* Logo */}
      <button
        onMouseEnter={handleLogoHover}
        className="flex items-center gap-2"
      >
        <Image
          ref={logoRef}
          src="/mjaystudios-logo.svg"
          alt="MJay Studios"
          width={160}
          height={40}
          className="h-10 w-auto brightness-0 invert opacity-60 transition-opacity hover:opacity-100"
          priority
        />
        <span className="text-sm font-bold font-display tracking-tight leading-[0.95] text-white/40 transition-colors hover:text-white/70">
          Matthew<br />Johnson
        </span>
      </button>

      {/* Right side */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setAboutOpen(true)}
          className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/30 transition-colors hover:text-white/70"
        >
          About
        </button>
        <button
          onClick={() => setContactOpen(true)}
          className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/30 transition-colors hover:text-white/70"
        >
          Contact
        </button>
        <div className="h-4 w-px bg-white/10" />
        <VersionSwitcher />
      </div>
    </nav>
  );
}
