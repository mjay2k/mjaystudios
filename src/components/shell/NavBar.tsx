'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import ViewToggle from './ViewToggle';
import ThemeToggle from './ThemeToggle';

export default function NavBar() {
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);
  const setContactOpen = useAppStore((s) => s.setContactOpen);
  const [menuOpen, setMenuOpen] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);

  const scrollToTop = () => {
    gsap.to(window, { scrollTo: { y: 0 }, duration: 1, ease: 'power3.inOut' });
  };

  const handleLogoHover = () => {
    if (logoRef.current) {
      gsap.to(logoRef.current, { rotation: '+=360', duration: 0.6, ease: 'power2.inOut' });
    }
    if (nameRef.current) {
      gsap.to(nameRef.current, { color: 'var(--color-brand)', duration: 0.2 });
    }
  };

  const handleLogoLeave = () => {
    if (nameRef.current) {
      gsap.to(nameRef.current, { clearProps: 'color', duration: 0.3 });
    }
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-3 backdrop-blur-md bg-neutral-100/95">
      <button
        onClick={scrollToTop}
        onMouseEnter={handleLogoHover}
        onMouseLeave={handleLogoLeave}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Image
          ref={logoRef}
          src="/mjaystudios-logo.svg"
          alt="MJay Studios"
          width={200}
          height={48}
          className="h-12 w-auto md:h-12"
          priority
        />
        <span
          ref={nameRef}
          className="text-lg md:text-xl font-bold font-display tracking-tight leading-[0.95] transition-colors text-neutral-500"
        >
          Matthew<br />Johnson
        </span>
      </button>

      {/* Desktop nav */}
      <div className="hidden items-center gap-6 md:flex">
        <ViewToggle />
        <ThemeToggle />
        <button
          onClick={() => setAboutOpen(true)}
          className="text-sm text-neutral-500 transition-colors"
          onMouseEnter={(e) => { e.currentTarget.style.color = '#F15A29'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
        >
          About
        </button>
        <button
          onClick={() => setContactOpen(true)}
          className="text-sm text-neutral-500 transition-colors"
          onMouseEnter={(e) => { e.currentTarget.style.color = '#F15A29'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
        >
          Contact
        </button>
      </div>

      {/* Mobile nav — only dark mode toggle + hamburger visible */}
      <div className="flex items-center gap-3 md:hidden">
        <ThemeToggle />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1"
          aria-label="Menu"
        >
          <span
            className={`h-0.5 w-5 bg-neutral-900 transition-transform ${menuOpen ? 'translate-y-1.5 rotate-45' : ''}`}
          />
          <span
            className={`h-0.5 w-5 bg-neutral-900 transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-0.5 w-5 bg-neutral-900 transition-transform ${menuOpen ? '-translate-y-1.5 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-full right-0 left-0 bg-neutral-100/98 px-6 py-8 backdrop-blur-xl border-t border-neutral-200/50 md:hidden">
          {/* View toggle — full width, large */}
          <div className="mb-8">
            <ViewToggle size="large" />
          </div>

          {/* Nav links — centered, large */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => {
                setAboutOpen(true);
                setMenuOpen(false);
              }}
              className="w-full py-4 text-center text-lg font-display font-bold text-neutral-700 active:text-neutral-900 rounded-xl active:bg-neutral-200/50 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => {
                setContactOpen(true);
                setMenuOpen(false);
              }}
              className="w-full py-4 text-center text-lg font-display font-bold text-neutral-700 active:text-neutral-900 rounded-xl active:bg-neutral-200/50 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
