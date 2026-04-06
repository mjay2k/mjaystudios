'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAppStore } from '@/stores/useAppStore';
import ViewToggle from './ViewToggle';

export default function NavBar() {
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);
  const setContactOpen = useAppStore((s) => s.setContactOpen);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-neutral-100/80">
      <div className="flex items-center gap-2">
        <Image
          src="/mjaystudios-logo.svg"
          alt="MJay Studios"
          width={200}
          height={48}
          className="h-10 w-auto md:h-12"
          priority
        />
        <span className="text-lg md:text-xl font-bold font-display text-orange-500 tracking-tight">
          Matthew Johnson
        </span>
      </div>

      <div className="hidden items-center gap-6 md:flex">
        <ViewToggle />
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

      <div className="flex items-center gap-4 md:hidden">
        <ViewToggle />
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

      {menuOpen && (
        <div className="absolute top-full right-0 left-0 flex flex-col gap-4 bg-neutral-100/95 px-6 py-4 backdrop-blur-md md:hidden">
          <button
            onClick={() => {
              setAboutOpen(true);
              setMenuOpen(false);
            }}
            className="text-left text-sm text-neutral-500 hover:text-neutral-900"
          >
            About
          </button>
          <button
            onClick={() => {
              setContactOpen(true);
              setMenuOpen(false);
            }}
            className="text-left text-sm text-neutral-500 hover:text-neutral-900"
          >
            Contact
          </button>
        </div>
      )}
    </nav>
  );
}
