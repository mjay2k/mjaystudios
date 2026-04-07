'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAppStore } from '@/stores/useAppStore';
import ViewToggle from './ViewToggle';
import ThemeToggle from './ThemeToggle';

export default function NavBar() {
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);
  const setContactOpen = useAppStore((s) => s.setContactOpen);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-3 backdrop-blur-md bg-neutral-100/80">
      <div className="flex items-center gap-2">
        <Image
          src="/mjaystudios-logo.svg"
          alt="MJay Studios"
          width={200}
          height={48}
          className="h-12 w-auto md:h-12"
          priority
        />
        <span
          className="text-lg md:text-xl font-bold font-display tracking-tight leading-[1.1]"
          style={{ color: 'var(--color-brand)' }}
        >
          Matthew<br />Johnson
        </span>
      </div>

      {/* Desktop nav */}
      <div className="hidden items-center gap-6 md:flex">
        <ViewToggle />
        <ThemeToggle />
        <button
          onClick={() => setAboutOpen(true)}
          className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
        >
          About
        </button>
        <button
          onClick={() => setContactOpen(true)}
          className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
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

      {/* Mobile dropdown — full-width, touch-friendly */}
      {menuOpen && (
        <div className="absolute top-full right-0 left-0 bg-neutral-100/98 px-6 py-6 backdrop-blur-xl border-t border-neutral-200/50 md:hidden">
          {/* View toggle — prominent */}
          <div className="pb-5 mb-5 border-b border-neutral-200/50">
            <p className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 mb-3">View</p>
            <ViewToggle />
          </div>

          {/* Nav links — large touch targets */}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                setAboutOpen(true);
                setMenuOpen(false);
              }}
              className="flex items-center justify-between py-3.5 text-base font-medium text-neutral-700 active:text-neutral-900"
            >
              About
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-neutral-300"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
            <button
              onClick={() => {
                setContactOpen(true);
                setMenuOpen(false);
              }}
              className="flex items-center justify-between py-3.5 text-base font-medium text-neutral-700 active:text-neutral-900"
            >
              Contact
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-neutral-300"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
