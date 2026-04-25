'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import VersionSwitcher from '@/components/shell/VersionSwitcher';

export default function CinematicNav() {
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);
  const setContactOpen = useAppStore((s) => s.setContactOpen);
  const logoRef = useRef<HTMLImageElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleLogoHover = () => {
    if (logoRef.current) {
      gsap.to(logoRef.current, { rotation: '+=360', duration: 0.6, ease: 'power2.inOut' });
    }
  };

  const openMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    if (!menuRef.current || !backdropRef.current) {
      setMenuOpen(false);
      return;
    }
    const tl = gsap.timeline({ onComplete: () => setMenuOpen(false) });
    tl.to(menuRef.current.querySelectorAll('.menu-item'), {
      opacity: 0, y: -10, duration: 0.15, stagger: 0.03, ease: 'power2.in',
    });
    tl.to(menuRef.current, { opacity: 0, y: -10, duration: 0.2, ease: 'power2.in' }, 0.1);
    tl.to(backdropRef.current, { opacity: 0, duration: 0.2 }, 0.1);
  }, []);

  // Animate menu open
  useEffect(() => {
    if (!menuOpen || !menuRef.current || !backdropRef.current) return;
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(menuRef.current, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
    const items = menuRef.current.querySelectorAll('.menu-item');
    gsap.fromTo(items, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out', delay: 0.1 });
  }, [menuOpen]);

  const handleAbout = () => {
    closeMenu();
    setTimeout(() => setAboutOpen(true), 300);
  };
  const handleContact = () => {
    closeMenu();
    setTimeout(() => setContactOpen(true), 300);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 py-3 md:px-10 md:py-4">
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
            className="h-8 w-auto md:h-10 brightness-0 invert opacity-60 transition-opacity hover:opacity-100"
            priority
          />
          <span className="hidden sm:block text-sm font-bold font-display tracking-tight leading-[0.95] text-white/40 transition-colors hover:text-white/70">
            Matthew<br />Johnson
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
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

        {/* Mobile hamburger */}
        <button
          onClick={openMenu}
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
          aria-label="Open menu"
        >
          <div className="w-5 h-[1.5px] bg-white/50 rounded-full" />
          <div className="w-4 h-[1.5px] bg-white/30 rounded-full" />
          <div className="w-5 h-[1.5px] bg-white/50 rounded-full" />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <>
          <div
            ref={backdropRef}
            className="fixed inset-0 z-[80] md:hidden"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            onClick={closeMenu}
          />
          <div
            ref={menuRef}
            className="fixed top-0 left-0 right-0 z-[81] md:hidden"
            style={{ background: 'rgba(10,10,10,0.98)' }}
          >
            {/* Header with close */}
            <div className="flex items-center justify-between px-4 py-3">
              <Image
                src="/mjaystudios-logo.svg"
                alt="MJay Studios"
                width={120}
                height={30}
                className="h-7 w-auto brightness-0 invert opacity-50"
              />
              <button
                onClick={closeMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="mx-4 h-px bg-white/5" />

            {/* Menu items */}
            <div className="px-4 py-6 space-y-1">
              <button
                onClick={handleAbout}
                className="menu-item w-full flex items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-colors active:bg-white/5"
              >
                <div className="w-1 h-4 rounded-full" style={{ background: '#F15A29' }} />
                <div>
                  <div className="text-sm font-bold text-white/80">About</div>
                  <div className="text-[10px] text-white/30 mt-0.5">Production dossier</div>
                </div>
              </button>
              <button
                onClick={handleContact}
                className="menu-item w-full flex items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-colors active:bg-white/5"
              >
                <div className="w-1 h-4 rounded-full" style={{ background: '#F15A29' }} />
                <div>
                  <div className="text-sm font-bold text-white/80">Contact</div>
                  <div className="text-[10px] text-white/30 mt-0.5">Get in touch</div>
                </div>
              </button>
            </div>

            {/* Version switcher */}
            <div className="mx-4 h-px bg-white/5" />
            <div className="menu-item px-4 py-4 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">Version</span>
              <VersionSwitcher />
            </div>
          </div>
        </>
      )}
    </>
  );
}
