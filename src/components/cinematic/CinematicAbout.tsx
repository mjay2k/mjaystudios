'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';

const awards = [
  '2018 Silver ADDY',
  '2019 Silver ADDY',
  '2022 Silver ADDY',
  '2024 Silver ADDY',
];

const bio = [
  'Award-winning creative leader with over 15 years bridging strategic brand development, digital innovation, and multimedia production. Managing high-stakes projects from concept to completion while leveraging AI-driven tools to accelerate development and generate dynamic media.',
  'My career started in agency life — building websites at Keller Crescent, then art directing multi-channel campaigns at 10over12 Creative for brands like Heaven Hill, PAMA, and Rittenhouse Rye. At Berry Global, I spent nearly a decade as Senior Graphic Designer driving the company\u2019s visual identity, designing ADDY-winning trade show booths, and building campaigns across a Fortune 500 brand portfolio.',
  'Now I\u2019m teaching computer science and media production while building AI-powered apps — Bible Warden (iOS, Swift) and News Warden (web) — from the ground up. I bring a rare combination: the eye of an art director, the strategic thinking of a brand leader, and the technical capability to build what I design.',
];

export default function CinematicAbout() {
  const aboutOpen = useAppStore((s) => s.aboutOpen);
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headshotRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!aboutOpen || !overlayRef.current || !panelRef.current) return;

    const tl = gsap.timeline();
    tlRef.current = tl;

    // 1. Backdrop fades in with blur
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    // 2. Panel slides in with scale for depth
    tl.fromTo(
      panelRef.current,
      { x: '100%', scale: 0.95, opacity: 0 },
      { x: '0%', scale: 1, opacity: 1, duration: 0.9, ease: 'power4.out' },
      0.15
    );

    // 3. Content staggers in with cinematic skew
    if (contentRef.current) {
      const items = contentRef.current.querySelectorAll('.stagger-item');
      tl.fromTo(
        items,
        { opacity: 0, y: 40, skewY: 2 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.8,
          ease: 'power4.out',
          stagger: 0.08,
        },
        0.5
      );
    }

    // 4. Ken Burns on headshot — slow, cinematic
    if (headshotRef.current) {
      const img = headshotRef.current.querySelector('img');
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1 },
          { scale: 1.12, duration: 20, ease: 'none', yoyo: true, repeat: -1 }
        );
      }
    }

    return () => {
      tl.kill();
    };
  }, [aboutOpen]);

  const handleClose = useCallback(() => {
    if (!panelRef.current || !overlayRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => setAboutOpen(false),
    });

    // Content fades out first
    if (contentRef.current) {
      const items = contentRef.current.querySelectorAll('.stagger-item');
      tl.to(items, {
        opacity: 0,
        y: -20,
        skewY: -1,
        duration: 0.3,
        ease: 'power2.in',
        stagger: 0.03,
      });
    }

    // Panel slides out
    tl.to(
      panelRef.current,
      { x: '100%', scale: 0.95, opacity: 0, duration: 0.6, ease: 'power3.in' },
      0.15
    );

    // Backdrop fades
    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.3, ease: 'power2.in' },
      0.3
    );
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
    <div ref={overlayRef} className="fixed inset-0 z-[100] opacity-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{ background: 'rgba(0,0,0,0.5)' }}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute inset-0 overflow-y-auto"
        style={{ background: '#0a0a0a' }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="fixed top-4 right-4 z-[101] flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full transition-all hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Mobile drag handle */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/15" />
        </div>

        <div ref={contentRef} className="mx-auto max-w-3xl px-5 pt-12 pb-16 md:px-8 md:py-24">
          {/* Section label */}
          <div className="stagger-item mb-8 md:mb-10 flex items-center gap-3">
            <div className="h-px w-12" style={{ backgroundColor: '#F15A29' }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              Production Dossier
            </span>
          </div>

          {/* Headshot + name — stacks on mobile */}
          <div className="stagger-item flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 md:mb-10">
            <div
              ref={headshotRef}
              className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-xl ring-2 ring-white/10"
            >
              <Image
                src="/portfolio/headshot-dark.jpg"
                alt="Matthew Johnson"
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2
                className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white"
                style={{ fontFeatureSettings: '"ss01"' }}
              >
                Matthew Johnson
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-white/40">
                Creative Leader &middot; Art Director &middot; Developer
              </p>
            </div>
          </div>

          {/* Commendations */}
          <div className="stagger-item mb-8 md:mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3 block">
              Commendations
            </span>
            <div className="flex flex-wrap gap-2">
              {awards.map((award) => (
                <span
                  key={award}
                  className="rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-semibold"
                  style={{
                    background: 'rgba(241,90,41,0.08)',
                    color: '#F15A29',
                  }}
                >
                  {award}
                </span>
              ))}
            </div>
          </div>

          {/* Bio paragraphs */}
          {bio.map((paragraph, i) => (
            <p
              key={i}
              className="stagger-item mb-4 md:mb-5 text-sm leading-relaxed text-white/50"
            >
              {paragraph}
            </p>
          ))}

          {/* Footer */}
          <div className="stagger-item mt-10 md:mt-12 border-t border-white/5 pt-6 md:pt-8">
            <p className="text-[10px] sm:text-xs text-white/20 mb-1">
              BS Interdisciplinary Studies, Liberty University
            </p>
            <p className="text-[10px] sm:text-xs text-white/20 mb-5 md:mb-6">
              AA Visual Communications, Ivy Tech
            </p>
            <a
              href="https://linkedin.com/in/mjaystudios"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-white/60 transition-all hover:text-white/90 hover:scale-105 active:scale-95"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
