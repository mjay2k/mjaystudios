'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const BIO_PARAGRAPHS = [
  'Award-winning creative leader with over 15 years bridging strategic brand development, digital innovation, and multimedia production. Managing high-stakes projects from concept to completion while leveraging AI-driven tools to accelerate development and generate dynamic media.',
  'My career started in agency life \u2014 building websites at Keller Crescent, then art directing multi-channel campaigns at 10over12 Creative for brands like Heaven Hill, PAMA, and Rittenhouse Rye. At Berry Global, I spent nearly a decade as Senior Graphic Designer driving the company\u2019s visual identity, designing ADDY-winning trade show booths, and building campaigns across a Fortune 500 brand portfolio.',
  'Now I\u2019m teaching computer science and media production while building AI-powered apps \u2014 Bible Warden (iOS, Swift) and News Warden (web) \u2014 from the ground up. I bring a rare combination: the eye of an art director, the strategic thinking of a brand leader, and the technical capability to build what I design.',
];

const AWARDS = [
  '2018 Silver ADDY',
  '2019 Silver ADDY',
  '2022 Silver ADDY',
  '2024 Silver ADDY',
];

export default function GlitchAbout() {
  const { aboutOpen, setAboutOpen } = useAppStore();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const [scrambledTitle, setScrambledTitle] = useState('');
  const [bioLoaded, setBioLoaded] = useState(false);
  const glitchIntervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const titleText = 'OPERATOR_PROFILE \u2014 ACCESS_GRANTED';

  useEffect(() => {
    if (!aboutOpen || !overlayRef.current || !panelRef.current) return;
    setBioLoaded(false);

    const tl = gsap.timeline();

    // 1. Flash — brief white screen flash before reveal
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.05, ease: 'none' }
    );
    tl.fromTo(
      overlayRef.current,
      { background: 'rgba(0,255,136,0.15)' },
      { background: 'rgba(0,0,0,0)', duration: 0.3, ease: 'power2.out' },
      0.05
    );

    // 2. Panel tears open with clipPath + horizontal glitch slices
    tl.fromTo(
      panelRef.current,
      { clipPath: 'inset(48% 48% 48% 48%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power4.out' },
      0.08
    );

    // 3. Quick horizontal tear glitch
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

    // 5. Content lines stagger in with typewriter energy
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
      setTimeout(() => setBioLoaded(true), 500);
    }, 250);

    // 6. Ambient border glitch flicker
    glitchIntervalRef.current = setInterval(() => {
      if (!borderRef.current) return;
      const r = Math.random();
      if (r > 0.7) {
        gsap.to(borderRef.current, {
          borderColor: 'rgba(0,255,136,0.5)',
          boxShadow: '0 0 20px rgba(0,255,136,0.1), inset 0 0 20px rgba(0,255,136,0.03)',
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
  }, [aboutOpen, titleText]);

  // Stagger bio + awards after load
  useEffect(() => {
    if (!bioLoaded || !contentRef.current) return;
    const paras = contentRef.current.querySelectorAll('.bio-para');
    gsap.fromTo(
      paras,
      { opacity: 0, y: 10, filter: 'brightness(2) hue-rotate(90deg)' },
      {
        opacity: 1,
        y: 0,
        filter: 'brightness(1) hue-rotate(0deg)',
        duration: 0.5,
        stagger: 0.12,
        ease: 'power3.out',
      }
    );
    const awards = contentRef.current.querySelectorAll('.award-line');
    gsap.fromTo(
      awards,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.06, ease: 'power2.out', delay: 0.25 }
    );
  }, [bioLoaded]);

  const handleClose = useCallback(() => {
    if (!panelRef.current || !overlayRef.current) return;
    clearInterval(glitchIntervalRef.current);

    const tl = gsap.timeline({
      onComplete: () => setAboutOpen(false),
    });

    // Glitch out
    tl.to(panelRef.current, { x: -6, duration: 0.03, ease: 'none' });
    tl.to(panelRef.current, { x: 4, duration: 0.03, ease: 'none' });
    tl.to(panelRef.current, {
      clipPath: 'inset(48% 48% 48% 48%)',
      duration: 0.35,
      ease: 'power3.in',
    });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.2);
  }, [setAboutOpen]);

  // Escape key
  useEffect(() => {
    if (!aboutOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [aboutOpen, handleClose]);

  if (!aboutOpen) return null;

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
                className="stagger-line mb-4 sm:mb-6 break-all sm:break-normal"
                style={{
                  color: '#00ff88',
                  textShadow: '0 0 8px rgba(0,255,136,0.5)',
                }}
              >
                <span className="hidden sm:inline">mjay@studio:~$ cat /sys/operator/profile.dat</span>
                <span className="sm:hidden">mjay:~$ cat profile.dat</span>
              </div>

              {/* Profile info — ASCII box on desktop, inline on mobile */}
              <div className="stagger-line mb-4 sm:mb-6">
                {/* Desktop: ASCII box */}
                <pre
                  className="hidden sm:block text-xs leading-relaxed"
                  style={{ color: 'rgba(0,255,136,0.6)' }}
                >
{`\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502  OPERATOR: Matthew Johnson              \u2502
\u2502  ROLE: Creative Leader \u00b7 Art Director   \u2502
\u2502  STATUS: ACTIVE                         \u2502
\u2502  CLEARANCE: LEVEL 5                     \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518`}
                </pre>
                {/* Mobile: clean inline */}
                <div className="sm:hidden space-y-1 text-[11px]" style={{ color: 'rgba(0,255,136,0.6)' }}>
                  <div><span style={{ color: 'rgba(0,255,136,0.35)' }}>OPERATOR:</span> Matthew Johnson</div>
                  <div><span style={{ color: 'rgba(0,255,136,0.35)' }}>ROLE:</span> Creative Leader</div>
                  <div><span style={{ color: 'rgba(0,255,136,0.35)' }}>STATUS:</span> <span style={{ color: '#00ff88' }}>ACTIVE</span></div>
                  <div><span style={{ color: 'rgba(0,255,136,0.35)' }}>CLEARANCE:</span> LEVEL 5</div>
                </div>
              </div>

              {/* Visual feed / headshot */}
              <div className="stagger-line mb-4 sm:mb-6">
                <div className="mb-2 text-[10px] sm:text-xs" style={{ color: 'rgba(0,255,136,0.4)' }}>
                  {'> VISUAL_FEED'}
                </div>
                <div
                  className="inline-block rounded-full overflow-hidden"
                  style={{ border: '1px solid rgba(0,255,136,0.3)' }}
                >
                  <Image
                    src="/portfolio/headshot-dark.jpg"
                    alt="Operator visual feed"
                    width={80}
                    height={80}
                    className="block w-16 h-16 sm:w-20 sm:h-20"
                    style={{
                      filter: 'sepia(1) hue-rotate(100deg) saturate(0.5) brightness(0.8)',
                    }}
                  />
                </div>
              </div>

              {/* Bio loading / content */}
              <div className="mb-4 sm:mb-6">
                {!bioLoaded ? (
                  <div
                    className="stagger-line text-[10px] sm:text-xs"
                    style={{ color: 'rgba(0,255,136,0.4)' }}
                  >
                    {'> LOADING BIO DATA...'}
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {BIO_PARAGRAPHS.map((p, i) => (
                      <p
                        key={i}
                        className="bio-para text-[11px] sm:text-sm leading-relaxed opacity-0"
                        style={{ color: 'rgba(0,255,136,0.4)' }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Awards */}
              <div className="mb-4 sm:mb-6">
                <div
                  className="stagger-line mb-2 text-[10px] sm:text-xs"
                  style={{ color: 'rgba(0,255,136,0.5)' }}
                >
                  {'> VERIFIED COMMENDATIONS:'}
                </div>
                {AWARDS.map((award, i) => (
                  <div key={i} className="award-line text-[10px] sm:text-xs opacity-0">
                    <span style={{ color: '#00ff88', textShadow: '0 0 6px rgba(0,255,136,0.3)' }}>[OK]</span>{' '}
                    <span style={{ color: 'rgba(0,255,136,0.5)' }}>{award}</span>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="stagger-line mb-4 sm:mb-6">
                <div className="mb-1 text-[10px] sm:text-xs" style={{ color: 'rgba(0,255,136,0.5)' }}>
                  {'> CREDENTIALS:'}
                </div>
                <div className="text-[10px] sm:text-xs pl-2" style={{ color: 'rgba(0,255,136,0.4)' }}>
                  BS Interdisciplinary Studies — Liberty University
                </div>
                <div className="text-[10px] sm:text-xs pl-2" style={{ color: 'rgba(0,255,136,0.4)' }}>
                  AA Visual Communications — Ivy Tech
                </div>
              </div>

              {/* LinkedIn */}
              <div className="stagger-line mb-4 sm:mb-6 text-[10px] sm:text-xs">
                <span style={{ color: 'rgba(0,255,136,0.5)' }}>{'> LINKED_PROFILE: '}</span>
                <a
                  href="https://linkedin.com/in/mjaystudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 underline underline-offset-2 decoration-current/30"
                  style={{ color: 'rgba(0,255,136,0.6)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00ff88';
                    e.currentTarget.style.textShadow = '0 0 8px rgba(0,255,136,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(0,255,136,0.6)';
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  linkedin.com/in/mjaystudios
                </a>
              </div>

              {/* Blinking cursor */}
              <div style={{ color: '#00ff88', textShadow: '0 0 8px rgba(0,255,136,0.5)' }}>
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
