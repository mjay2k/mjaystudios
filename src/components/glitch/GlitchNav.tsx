'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import VersionSwitcher from '@/components/shell/VersionSwitcher';

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#';

export default function GlitchNav() {
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);
  const setContactOpen = useAppStore((s) => s.setContactOpen);
  const logoRef = useRef<HTMLImageElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [scrambledItems, setScrambledItems] = useState<Record<string, string>>({});

  const handleLogoHover = () => {
    if (logoRef.current) {
      const tl = gsap.timeline();
      tl.to(logoRef.current, { x: -3, filter: 'hue-rotate(90deg)', duration: 0.05, ease: 'none' })
        .to(logoRef.current, { x: 5, filter: 'hue-rotate(-90deg)', duration: 0.05, ease: 'none' })
        .to(logoRef.current, { x: -2, filter: 'hue-rotate(180deg)', duration: 0.05, ease: 'none' })
        .to(logoRef.current, { x: 0, filter: 'hue-rotate(0deg)', duration: 0.05, ease: 'none' });
    }
  };

  // Scramble a menu label on hover
  const scrambleLabel = useCallback((key: string, original: string) => {
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambledItems((prev) => ({
        ...prev,
        [key]: original
          .split('')
          .map((c, i) => {
            if (c === ' ') return ' ';
            if (i < iteration) return original[i];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join(''),
      }));
      iteration += 1;
      if (iteration > original.length) {
        clearInterval(interval);
        setScrambledItems((prev) => ({ ...prev, [key]: original }));
      }
    }, 25);
  }, []);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    if (!menuRef.current || !backdropRef.current) {
      setMenuOpen(false);
      return;
    }
    const tl = gsap.timeline({ onComplete: () => setMenuOpen(false) });
    tl.to(menuRef.current, {
      clipPath: 'inset(0% 0% 100% 0%)', duration: 0.3, ease: 'power3.in',
    });
    tl.to(backdropRef.current, { opacity: 0, duration: 0.2 }, 0.1);
  }, []);

  // Animate menu open with glitch
  useEffect(() => {
    if (!menuOpen || !menuRef.current || !backdropRef.current) return;

    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });

    // Glitch open
    const tl = gsap.timeline();
    tl.fromTo(menuRef.current,
      { clipPath: 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.35, ease: 'power4.out' }
    );
    // Horizontal tear
    tl.to(menuRef.current, { x: 5, duration: 0.03, ease: 'none' }, 0.1);
    tl.to(menuRef.current, { x: -3, duration: 0.03, ease: 'none' }, 0.13);
    tl.to(menuRef.current, { x: 0, duration: 0.04, ease: 'power2.out' }, 0.16);

    const items = menuRef.current.querySelectorAll('.menu-item');
    tl.fromTo(items,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power3.out' },
      0.15
    );
  }, [menuOpen]);

  const handleAbout = () => {
    closeMenu();
    setTimeout(() => setAboutOpen(true), 350);
  };
  const handleContact = () => {
    closeMenu();
    setTimeout(() => setContactOpen(true), 350);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 py-3 md:px-10 md:py-4">
        {/* Logo */}
        <button onMouseEnter={handleLogoHover} className="flex items-center gap-2 sm:gap-3">
          <Image
            ref={logoRef}
            src="/mjaystudios-logo.svg"
            alt="MJay Studios"
            width={140}
            height={36}
            className="h-7 w-auto sm:h-9 brightness-0 invert opacity-40 transition-opacity hover:opacity-80"
            style={{ filter: 'brightness(0) invert(1) sepia(1) hue-rotate(100deg) saturate(5)' }}
            priority
          />
          <span
            className="hidden sm:block font-mono text-[10px] font-bold tracking-[0.2em] uppercase leading-tight"
            style={{ color: 'rgba(0,255,136,0.3)', textShadow: '0 0 8px rgba(0,255,136,0.15)' }}
          >
            MJAY<br />STUDIOS
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
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

        {/* Mobile hamburger — terminal style */}
        <button
          onClick={openMenu}
          className="md:hidden flex items-center gap-2 p-2 -mr-2"
          aria-label="Open menu"
        >
          <span className="font-mono text-[9px] font-bold" style={{ color: 'rgba(0,255,136,0.3)' }}>[MENU]</span>
          <div className="flex flex-col gap-[4px]">
            <div className="w-4 h-[1.5px] rounded-full" style={{ background: '#00ff88', opacity: 0.5 }} />
            <div className="w-3 h-[1.5px] rounded-full" style={{ background: '#00ff88', opacity: 0.3 }} />
            <div className="w-4 h-[1.5px] rounded-full" style={{ background: '#00ff88', opacity: 0.5 }} />
          </div>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <>
          <div
            ref={backdropRef}
            className="fixed inset-0 z-[80] md:hidden"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={closeMenu}
          />
          <div
            ref={menuRef}
            className="fixed top-0 left-0 right-0 z-[81] md:hidden"
            style={{
              background: 'rgba(2,8,4,0.98)',
              borderBottom: '1px solid rgba(0,255,136,0.1)',
            }}
          >
            {/* Header with close */}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-mono text-[9px] font-bold tracking-[0.2em]" style={{ color: 'rgba(0,255,136,0.4)' }}>
                SYSTEM_MENU
              </span>
              <button
                onClick={closeMenu}
                className="flex h-10 w-10 items-center justify-center rounded"
                style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.15)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="mx-4 h-px" style={{ background: 'rgba(0,255,136,0.06)' }} />

            {/* Menu items */}
            <div className="px-4 py-4 space-y-1">
              <button
                onClick={handleAbout}
                onTouchStart={() => scrambleLabel('about', '[ABOUT]')}
                className="menu-item w-full flex items-center gap-3 rounded px-3 py-3 text-left transition-all active:bg-[rgba(0,255,136,0.05)]"
                style={{ border: '1px solid transparent' }}
              >
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: '#00ff88', boxShadow: '0 0 4px rgba(0,255,136,0.5)' }} />
                <div className="flex-1">
                  <div className="font-mono text-xs font-bold" style={{ color: 'rgba(0,255,136,0.7)' }}>
                    {scrambledItems['about'] || '[ABOUT]'}
                  </div>
                  <div className="font-mono text-[9px] mt-0.5" style={{ color: 'rgba(0,255,136,0.25)' }}>
                    cat /sys/operator/profile.dat
                  </div>
                </div>
              </button>
              <button
                onClick={handleContact}
                onTouchStart={() => scrambleLabel('contact', '[CONTACT]')}
                className="menu-item w-full flex items-center gap-3 rounded px-3 py-3 text-left transition-all active:bg-[rgba(0,255,136,0.05)]"
                style={{ border: '1px solid transparent' }}
              >
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: '#00ff88', boxShadow: '0 0 4px rgba(0,255,136,0.5)' }} />
                <div className="flex-1">
                  <div className="font-mono text-xs font-bold" style={{ color: 'rgba(0,255,136,0.7)' }}>
                    {scrambledItems['contact'] || '[CONTACT]'}
                  </div>
                  <div className="font-mono text-[9px] mt-0.5" style={{ color: 'rgba(0,255,136,0.25)' }}>
                    ls /sys/operator/links/
                  </div>
                </div>
              </button>
            </div>

            {/* Version switcher */}
            <div className="mx-4 h-px" style={{ background: 'rgba(0,255,136,0.06)' }} />
            <div className="menu-item px-4 py-4 flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.15em]" style={{ color: 'rgba(0,255,136,0.2)' }}>VERSION</span>
              <VersionSwitcher />
            </div>

            {/* Terminal prompt at bottom */}
            <div className="px-4 pb-4">
              <div className="font-mono text-[9px]" style={{ color: 'rgba(0,255,136,0.15)' }}>
                mjay:~$ <span style={{ animation: 'flicker 1s step-end infinite' }}>&#9646;</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
