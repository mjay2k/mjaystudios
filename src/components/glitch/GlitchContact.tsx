'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

interface LinkEntry {
  filename: string;
  permissions: string;
  size: number;
  href: string;
  value: string;
  label: string;
}

const LINKS: LinkEntry[] = [
  {
    filename: 'email.sh',
    permissions: '-rwxr-x---',
    size: 128,
    href: 'mailto:mjay2k@gmail.com',
    value: 'mjay2k@gmail.com',
    label: 'EMAIL',
  },
  {
    filename: 'phone.dat',
    permissions: '-rwxr-x---',
    size: 64,
    href: 'tel:8124537766',
    value: '(812) 453-7766',
    label: 'PHONE',
  },
  {
    filename: 'linkedin.lnk',
    permissions: '-rwxr-x---',
    size: 256,
    href: 'https://linkedin.com/in/mjaystudios',
    value: 'linkedin.com/in/mjaystudios',
    label: 'LINKEDIN',
  },
  {
    filename: 'website.url',
    permissions: '-rwxr-x---',
    size: 512,
    href: 'https://mjaystudios.com',
    value: 'mjaystudios.com',
    label: 'WEBSITE',
  },
];

export default function GlitchContact() {
  const { contactOpen, setContactOpen } = useAppStore();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const [scrambledTitle, setScrambledTitle] = useState('');
  const [connectingIdx, setConnectingIdx] = useState<number | null>(null);
  const glitchIntervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const titleText = 'ESTABLISH_CONNECTION \u2014 SECURE_CHANNEL';

  useEffect(() => {
    if (!contactOpen || !overlayRef.current || !panelRef.current) return;

    const tl = gsap.timeline();

    // 1. Flash
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.05, ease: 'none' });
    tl.fromTo(
      overlayRef.current,
      { background: 'rgba(0,255,136,0.15)' },
      { background: 'rgba(0,0,0,0)', duration: 0.3, ease: 'power2.out' },
      0.05
    );

    // 2. ClipPath tear-in
    tl.fromTo(
      panelRef.current,
      { clipPath: 'inset(48% 48% 48% 48%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power4.out' },
      0.08
    );

    // 3. Horizontal tear glitch
    tl.to(panelRef.current, { x: 8, duration: 0.03, ease: 'none' }, 0.15);
    tl.to(panelRef.current, { x: -5, duration: 0.03, ease: 'none' }, 0.18);
    tl.to(panelRef.current, { x: 3, duration: 0.03, ease: 'none' }, 0.21);
    tl.to(panelRef.current, { x: 0, duration: 0.05, ease: 'power2.out' }, 0.24);

    // 4. Scramble title
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambledTitle(
        titleText
          .split('')
          .map((c, i) => {
            if (c === ' ' || c === '\u2014') return c;
            if (i < iteration) return titleText[i];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('')
      );
      iteration += 1;
      if (iteration > titleText.length) {
        clearInterval(interval);
        setScrambledTitle(titleText);
      }
    }, 20);

    // 5. Content staggers
    const timer = setTimeout(() => {
      if (!contentRef.current) return;
      const lines = contentRef.current.querySelectorAll('.stagger-line');
      gsap.fromTo(
        lines,
        { opacity: 0, x: -15, skewX: -2 },
        {
          opacity: 1,
          x: 0,
          skewX: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.05,
        }
      );

      // File entries get extra glitch entrance
      const entries = contentRef.current.querySelectorAll('.file-entry');
      gsap.fromTo(
        entries,
        { opacity: 0, x: -20, filter: 'brightness(3) hue-rotate(90deg)' },
        {
          opacity: 1,
          x: 0,
          filter: 'brightness(1) hue-rotate(0deg)',
          duration: 0.4,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.3,
        }
      );
    }, 250);

    // 6. Border glitch flicker
    glitchIntervalRef.current = setInterval(() => {
      if (!borderRef.current) return;
      if (Math.random() > 0.7) {
        gsap.to(borderRef.current, {
          borderColor: 'rgba(0,255,136,0.5)',
          boxShadow: '0 0 20px rgba(0,255,136,0.1)',
          duration: 0.05,
          ease: 'none',
          onComplete: () => {
            gsap.to(borderRef.current, {
              borderColor: 'rgba(0,255,136,0.15)',
              boxShadow: 'none',
              duration: 0.2,
            });
          },
        });
      }
    }, 3000);

    return () => {
      tl.kill();
      clearInterval(interval);
      clearTimeout(timer);
      clearInterval(glitchIntervalRef.current);
    };
  }, [contactOpen, titleText]);

  const handleClose = useCallback(() => {
    if (!panelRef.current || !overlayRef.current) return;
    clearInterval(glitchIntervalRef.current);

    const tl = gsap.timeline({
      onComplete: () => setContactOpen(false),
    });

    tl.to(panelRef.current, { x: -6, duration: 0.03, ease: 'none' });
    tl.to(panelRef.current, { x: 4, duration: 0.03, ease: 'none' });
    tl.to(panelRef.current, {
      clipPath: 'inset(48% 48% 48% 48%)',
      duration: 0.35,
      ease: 'power3.in',
    });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.2);
  }, [setContactOpen]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, idx: number, href: string) => {
      e.preventDefault();
      setConnectingIdx(idx);
      setTimeout(() => {
        setConnectingIdx(null);
        window.open(href, href.startsWith('mailto:') || href.startsWith('tel:') ? '_self' : '_blank');
      }, 400);
    },
    []
  );

  // Escape key
  useEffect(() => {
    if (!contactOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [contactOpen, handleClose]);

  if (!contactOpen) return null;

  const dateStr = 'Apr 24 2026';

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute inset-0 overflow-y-auto"
        style={{ background: 'rgba(2,8,4,0.97)', scrollbarWidth: 'none' }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="fixed top-4 right-4 z-[101] flex h-11 w-11 items-center justify-center rounded transition-all hover:scale-110"
          style={{
            border: '1px solid rgba(0,255,136,0.25)',
            background: 'rgba(0,255,136,0.06)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Mobile drag handle */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(0,255,136,0.15)' }} />
        </div>

        <div className="mx-auto max-w-3xl px-4 pt-12 pb-16 sm:px-6 md:px-8 md:py-24" ref={contentRef}>
          {/* Terminal chrome */}
          <div
            ref={borderRef}
            className="rounded overflow-hidden transition-all"
            style={{
              border: '1px solid rgba(0,255,136,0.15)',
              background: 'rgba(0,255,136,0.02)',
            }}
          >
            {/* Title bar */}
            <div
              className="px-3 sm:px-4 py-2 flex items-center gap-2"
              style={{ borderBottom: '1px solid rgba(0,255,136,0.08)' }}
            >
              <div className="flex gap-1">
                <div className="h-[6px] w-[6px] rounded-full" style={{ background: '#ff5f57' }} />
                <div className="h-[6px] w-[6px] rounded-full" style={{ background: '#ffbd2e' }} />
                <div className="h-[6px] w-[6px] rounded-full" style={{ background: '#28c840' }} />
              </div>
              <span className="font-mono text-[8px] sm:text-[9px] truncate" style={{ color: 'rgba(0,255,136,0.4)' }}>
                {scrambledTitle || titleText}
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-4 sm:p-6 md:p-10 font-mono text-xs sm:text-sm" style={{ color: 'rgba(0,255,136,0.6)' }}>
              {/* Command prompt */}
              <div
                className="stagger-line mb-4 sm:mb-6"
                style={{
                  color: '#00ff88',
                  textShadow: '0 0 8px rgba(0,255,136,0.5)',
                }}
              >
                <span className="hidden sm:inline">mjay@studio:~$ ls -la /sys/operator/links/</span>
                <span className="sm:hidden">mjay:~$ ls links/</span>
              </div>

              {/* Desktop: full ls -la output */}
              <div className="hidden sm:block">
                <div className="stagger-line text-xs mb-1" style={{ color: 'rgba(0,255,136,0.4)' }}>
                  total 4
                </div>
                <div className="stagger-line text-xs" style={{ color: 'rgba(0,255,136,0.35)' }}>
                  {'drwxr-xr-x  2 mjay studio 4096 ' + dateStr + ' .'}
                </div>
                <div className="stagger-line text-xs mb-3" style={{ color: 'rgba(0,255,136,0.35)' }}>
                  {'drwxr-xr-x  5 mjay studio 4096 ' + dateStr + ' ..'}
                </div>

                {LINKS.map((link, i) => (
                  <div key={link.filename} className="file-entry">
                    {connectingIdx === i ? (
                      <div
                        className="text-xs py-0.5"
                        style={{
                          color: '#00ff88',
                          textShadow: '0 0 12px rgba(0,255,136,0.6)',
                        }}
                      >
                        {'> CONNECTING TO '}{link.value}{'...'}
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, i, link.href)}
                        className="group/link block text-xs py-0.5 transition-colors duration-150 cursor-pointer"
                        style={{ color: 'rgba(0,255,136,0.5)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#00ff88';
                          e.currentTarget.style.textShadow = '0 0 8px rgba(0,255,136,0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'rgba(0,255,136,0.5)';
                          e.currentTarget.style.textShadow = 'none';
                        }}
                      >
                        <span className="inline-block w-0 overflow-hidden group-hover/link:w-3 transition-all duration-150">
                          {'> '}
                        </span>
                        {`${link.permissions}  1 mjay studio  ${String(link.size).padStart(3, ' ')} ${dateStr} ${link.filename}`}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile: simplified file listing as cards */}
              <div className="sm:hidden space-y-2">
                {LINKS.map((link, i) => (
                  <div key={link.filename} className="file-entry">
                    {connectingIdx === i ? (
                      <div
                        className="rounded px-3 py-2.5 text-[11px]"
                        style={{
                          color: '#00ff88',
                          textShadow: '0 0 12px rgba(0,255,136,0.6)',
                          background: 'rgba(0,255,136,0.08)',
                          border: '1px solid rgba(0,255,136,0.3)',
                        }}
                      >
                        {'> CONNECTING...'}
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, i, link.href)}
                        className="block rounded px-3 py-2.5 transition-all duration-200 active:scale-[0.98]"
                        style={{
                          background: 'rgba(0,255,136,0.03)',
                          border: '1px solid rgba(0,255,136,0.08)',
                        }}
                        onTouchStart={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,255,136,0.3)';
                          (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.06)';
                        }}
                        onTouchEnd={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,255,136,0.08)';
                          (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.03)';
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[9px] font-bold tracking-[0.15em] mb-0.5" style={{ color: 'rgba(0,255,136,0.35)' }}>
                              {link.label}
                            </div>
                            <div className="text-[11px]" style={{ color: 'rgba(0,255,136,0.6)' }}>
                              {link.value}
                            </div>
                          </div>
                          <div className="text-[9px]" style={{ color: 'rgba(0,255,136,0.25)' }}>
                            {link.filename}
                          </div>
                        </div>
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Status message */}
              <div
                className="stagger-line mt-6 sm:mt-8 text-[10px] sm:text-xs"
                style={{ color: 'rgba(0,255,136,0.4)' }}
              >
                {'> OPERATOR STATUS: Available for freelance, collaboration, and creative ops.'}
              </div>

              {/* Blinking cursor */}
              <div
                className="mt-4 sm:mt-6"
                style={{
                  color: '#00ff88',
                  textShadow: '0 0 8px rgba(0,255,136,0.5)',
                }}
              >
                <span className="hidden sm:inline">mjay@studio:~$ </span>
                <span className="sm:hidden">mjay:~$ </span>
                <span style={{ animation: 'flicker 1s step-end infinite' }}>&#9646;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
