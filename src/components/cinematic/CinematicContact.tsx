'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';

const contacts = [
  {
    label: 'Email',
    value: 'mjay2k@gmail.com',
    href: 'mailto:mjay2k@gmail.com',
    external: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13L2 4" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '(812) 453-7766',
    href: 'tel:8124537766',
    external: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/mjaystudios',
    href: 'https://linkedin.com/in/mjaystudios',
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Website',
    value: 'mjaystudios.com',
    href: 'https://mjaystudios.com',
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
];

export default function CinematicContact() {
  const contactOpen = useAppStore((s) => s.contactOpen);
  const setContactOpen = useAppStore((s) => s.setContactOpen);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contactOpen || !overlayRef.current || !panelRef.current) return;

    const tl = gsap.timeline();

    // 1. Backdrop
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    // 2. Panel slides in with depth
    tl.fromTo(
      panelRef.current,
      { x: '100%', scale: 0.95, opacity: 0 },
      { x: '0%', scale: 1, opacity: 1, duration: 0.9, ease: 'power4.out' },
      0.15
    );

    // 3. Content staggers with cinematic skew
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

      // Contact cards get extra entrance — slight x offset
      const cards = contentRef.current.querySelectorAll('.contact-card');
      tl.fromTo(
        cards,
        { opacity: 0, x: 60, skewY: 1 },
        {
          opacity: 1,
          x: 0,
          skewY: 0,
          duration: 0.7,
          ease: 'power4.out',
          stagger: 0.1,
        },
        0.7
      );
    }

    return () => { tl.kill(); };
  }, [contactOpen]);

  const handleClose = useCallback(() => {
    if (!panelRef.current || !overlayRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => setContactOpen(false),
    });

    // Cards slide out
    if (contentRef.current) {
      const cards = contentRef.current.querySelectorAll('.contact-card');
      tl.to(cards, {
        opacity: 0,
        x: 40,
        duration: 0.25,
        ease: 'power2.in',
        stagger: 0.04,
      });
    }

    // Panel
    tl.to(
      panelRef.current,
      { x: '100%', scale: 0.95, opacity: 0, duration: 0.6, ease: 'power3.in' },
      0.15
    );

    // Backdrop
    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.3, ease: 'power2.in' },
      0.3
    );
  }, [setContactOpen]);

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
          {/* Header */}
          <div className="stagger-item mb-4 flex items-center gap-3">
            <div className="h-px w-12" style={{ backgroundColor: '#F15A29' }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              Production Contacts
            </span>
          </div>

          <h2
            className="stagger-item font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2 sm:mb-3"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            Let&apos;s work<br className="sm:hidden" /> together.
          </h2>
          <p className="stagger-item text-sm sm:text-base text-white/40 mb-8 md:mb-12">
            Open to freelance, collaboration, and creative opportunities.
          </p>

          {/* Contact cards */}
          <div className="space-y-3">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.external ? '_blank' : undefined}
                rel={contact.external ? 'noopener noreferrer' : undefined}
                className="contact-card group flex items-center gap-3 sm:gap-4 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 transition-all duration-300 border-l-2 border-transparent hover:border-[#F15A29] active:scale-[0.98]"
                style={{ background: 'rgba(255,255,255,0.05)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                }}
              >
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg text-white/30 transition-colors group-hover:text-[#F15A29]">
                  {contact.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-0.5">
                    {contact.label}
                  </span>
                  <span className="block text-xs sm:text-sm text-white/70 group-hover:text-white transition-colors truncate">
                    {contact.value}
                  </span>
                </div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-white/10 transition-all duration-300 group-hover:text-white/40 group-hover:translate-x-1 flex-shrink-0"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
