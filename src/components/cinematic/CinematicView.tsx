'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import { projects, type Project } from '@/data/projects';
import CinematicNav from './CinematicNav';

// Get projects with images, sorted by era chronologically
const featured = projects
  .filter((p) => p.images.length > 0 && !(p.categories.length === 1 && p.categories[0] === 'logo'))
  .sort((a, b) => a.year - b.year);

export default function CinematicView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isIntro, setIsIntro] = useState(true);
  const [detailOpen, setDetailOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const grainRef = useRef<HTMLCanvasElement>(null);
  const scrollAccumulator = useRef(0);
  const isTransitioning = useRef(false);
  const setSiteVersion = useAppStore((s) => s.setSiteVersion);

  const project = featured[activeIndex];

  // Film grain effect
  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const draw = () => {
      canvas.width = window.innerWidth / 3;
      canvas.height = window.innerHeight / 3;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 18;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Intro sequence
  useEffect(() => {
    if (!isIntro) return;
    const tl = gsap.timeline({
      onComplete: () => setIsIntro(false),
    });

    tl.fromTo(
      '.intro-line-1',
      { opacity: 0, y: 40, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 1, ease: 'power4.out' }
    )
      .fromTo(
        '.intro-line-2',
        { opacity: 0, y: 40, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1, ease: 'power4.out' },
        '-=0.5'
      )
      .to('.intro-overlay', {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        delay: 0.8,
      })
      .fromTo(
        '.hero-image-initial',
        { scale: 1.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power3.out' },
        '-=1'
      )
      .fromTo(
        '.hero-text-initial',
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
        '-=1.2'
      );
  }, [isIntro]);

  // Navigate between projects
  const navigateTo = useCallback(
    (index: number) => {
      if (isTransitioning.current || index === activeIndex || index < 0 || index >= featured.length) return;
      isTransitioning.current = true;

      const direction = index > activeIndex ? 1 : -1;
      const currentImage = imageRefs.current[0];
      const currentText = textRefs.current[0];

      const tl = gsap.timeline({
        onComplete: () => {
          setActiveIndex(index);
          isTransitioning.current = false;
        },
      });

      if (currentImage) {
        tl.to(currentImage, {
          scale: 1.1,
          opacity: 0,
          y: direction * -80,
          duration: 0.7,
          ease: 'power3.inOut',
        });
      }
      if (currentText) {
        tl.to(
          currentText,
          {
            opacity: 0,
            x: direction * -100,
            duration: 0.5,
            ease: 'power3.in',
          },
          0
        );
      }
    },
    [activeIndex]
  );

  // Animate in new project after index change
  useEffect(() => {
    if (isIntro) return;
    const currentImage = imageRefs.current[0];
    const currentText = textRefs.current[0];

    if (currentImage) {
      gsap.fromTo(
        currentImage,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
      );
    }
    if (currentText) {
      gsap.fromTo(
        currentText,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, [activeIndex, isIntro]);

  // Scroll/wheel navigation
  useEffect(() => {
    const threshold = 80;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning.current || detailOpen) return;

      scrollAccumulator.current += e.deltaY;

      if (Math.abs(scrollAccumulator.current) > threshold) {
        const direction = scrollAccumulator.current > 0 ? 1 : -1;
        scrollAccumulator.current = 0;
        navigateTo(activeIndex + direction);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeIndex, navigateTo, detailOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (detailOpen) {
        if (e.key === 'Escape') setDetailOpen(false);
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        navigateTo(activeIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        navigateTo(activeIndex - 1);
      } else if (e.key === 'Enter') {
        setDetailOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, navigateTo, detailOpen]);

  // Mouse parallax on the hero image
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const img = imageRefs.current[0];
      if (!img || detailOpen) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(img, { x, y, duration: 1.2, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [detailOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
      style={{ background: '#050505', cursor: 'none' }}
    >
      {/* Film grain overlay */}
      <canvas
        ref={grainRef}
        className="fixed inset-0 z-50 pointer-events-none"
        style={{ width: '100%', height: '100%', mixBlendMode: 'overlay', opacity: 0.4 }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Scanlines */}
      <div
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />

      {/* Intro overlay */}
      {isIntro && (
        <div className="intro-overlay fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black">
          <div className="overflow-hidden">
            <h1
              className="intro-line-1 font-display text-[clamp(2rem,8vw,7rem)] font-black leading-[0.85] tracking-tighter text-white opacity-0"
              style={{ fontFeatureSettings: '"ss01"' }}
            >
              MATTHEW
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              className="intro-line-2 font-display text-[clamp(2rem,8vw,7rem)] font-black leading-[0.85] tracking-tighter opacity-0"
              style={{
                color: '#F15A29',
                fontFeatureSettings: '"ss01"',
              }}
            >
              JOHNSON
            </h1>
          </div>
          <div className="intro-line-2 mt-6 text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 opacity-0">
            Art Director &bull; Designer &bull; Builder
          </div>
        </div>
      )}

      {/* Hero image — full bleed */}
      <div
        ref={(el) => { imageRefs.current[0] = el; }}
        className={`absolute inset-0 ${isIntro ? 'hero-image-initial' : ''}`}
      >
        <div className="absolute inset-0" style={{ transform: 'scale(1.1)' }}>
          <Image
            key={project.id}
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Project info — left side */}
      <div
        ref={(el) => { textRefs.current[0] = el; }}
        className={`absolute left-0 top-0 bottom-0 z-10 flex flex-col justify-end p-8 md:p-16 lg:p-20 max-w-2xl ${isIntro ? 'hero-text-initial' : ''}`}
      >
        {/* Era tag */}
        <div className="mb-4 flex items-center gap-3">
          <div
            className="h-px flex-1 max-w-[60px]"
            style={{ backgroundColor: '#F15A29' }}
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
            {project.era === 'agency' ? 'Agency Era' : project.era === 'berry' ? 'Berry Era' : 'Independent'}
          </span>
          <span className="text-[10px] font-mono text-white/30">{project.year}</span>
        </div>

        {/* Title */}
        <h2
          className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black leading-[0.9] tracking-tight text-white"
          style={{ fontFeatureSettings: '"ss01"' }}
        >
          {project.title}
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50 md:text-base">
          {project.description}
        </p>

        {/* Client */}
        {project.client && (
          <div className="mt-6 flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Client</span>
            <span className="text-xs font-medium text-white/60">{project.client}</span>
          </div>
        )}

        {/* Categories */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{
                border: '1px solid rgba(241,90,41,0.3)',
                color: '#F15A29',
                background: 'rgba(241,90,41,0.05)',
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* View detail CTA */}
        {(project.caseStudy || project.images.length > 1) && (
          <button
            onClick={() => setDetailOpen(true)}
            className="group mt-8 flex items-center gap-3 self-start"
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
              style={{ border: '1px solid rgba(241,90,41,0.5)', background: 'rgba(241,90,41,0.1)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F15A29" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 transition-colors group-hover:text-white/70">
              Explore Project
            </span>
          </button>
        )}
      </div>

      {/* Right-side progress track */}
      <div className="fixed right-6 top-1/2 z-20 -translate-y-1/2 flex flex-col items-center gap-1 md:right-10">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => navigateTo(i)}
            className="group relative flex items-center justify-center"
            style={{ padding: '4px 0' }}
          >
            <div
              className="transition-all duration-500"
              style={{
                width: i === activeIndex ? 3 : 2,
                height: i === activeIndex ? 28 : 12,
                borderRadius: 2,
                backgroundColor: i === activeIndex ? '#F15A29' : 'rgba(255,255,255,0.2)',
              }}
            />
            {/* Tooltip */}
            <span
              className="absolute right-6 whitespace-nowrap rounded px-2 py-1 text-[10px] font-bold text-white/70 opacity-0 transition-opacity group-hover:opacity-100"
              style={{ background: 'rgba(0,0,0,0.8)' }}
            >
              {featured[i].title}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom counter */}
      <div className="fixed bottom-8 right-8 z-20 flex items-baseline gap-1 md:bottom-12 md:right-16">
        <span className="font-display text-4xl font-black text-white/20">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <span className="text-sm text-white/10">/</span>
        <span className="text-sm text-white/10">
          {String(featured.length).padStart(2, '0')}
        </span>
      </div>

      {/* Scroll hint */}
      {!isIntro && activeIndex === 0 && (
        <div className="fixed bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">Scroll</span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
            <rect x="1" y="1" width="10" height="18" rx="5" />
            <line x1="6" y1="5" x2="6" y2="9" />
          </svg>
        </div>
      )}

      {/* Nav */}
      <CinematicNav />

      {/* Detail panel */}
      {detailOpen && (
        <CinematicDetail project={project} onClose={() => setDetailOpen(false)} />
      )}

      {/* Custom cursor */}
      <CinematicCursor />
    </div>
  );
}

// ─── Detail Panel ───────────────────────────────────────────
function CinematicDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(
      panelRef.current,
      { x: '100%' },
      { x: '0%', duration: 0.8, ease: 'power4.out' }
    );
    // Stagger in images
    if (imagesRef.current) {
      const imgs = imagesRef.current.querySelectorAll('.detail-img');
      gsap.fromTo(
        imgs,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.12, delay: 0.4 }
      );
    }
  }, []);

  const handleClose = () => {
    if (!panelRef.current) return;
    gsap.to(panelRef.current, {
      x: '100%',
      duration: 0.6,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[55] overflow-y-auto"
      style={{ background: '#0a0a0a' }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="fixed top-6 right-6 z-[56] flex h-12 w-12 items-center justify-center rounded-full transition-colors"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="mx-auto max-w-5xl px-8 py-24">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-12" style={{ backgroundColor: '#F15A29' }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            {project.era === 'agency' ? 'Agency Era' : project.era === 'berry' ? 'Berry Era' : 'Independent'}
          </span>
        </div>
        <h2 className="font-display text-5xl font-black tracking-tight text-white md:text-7xl">
          {project.title}
        </h2>
        {project.client && (
          <p className="mt-3 text-sm font-medium text-white/40">{project.client} &bull; {project.year}</p>
        )}
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/50">
          {project.caseStudy?.extendedDescription || project.description}
        </p>
        {project.caseStudy?.processNotes && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/30 italic">
            {project.caseStudy.processNotes}
          </p>
        )}

        {/* Image gallery */}
        <div ref={imagesRef} className="mt-16 space-y-6">
          {project.images.map((src, i) => (
            <div key={src} className="detail-img overflow-hidden rounded-lg">
              <Image
                src={src}
                alt={`${project.title} ${i + 1}`}
                width={1200}
                height={800}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
              {project.captions?.[src] && (
                <p className="mt-2 text-xs text-white/30 italic">{project.captions[src]}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Custom Cursor ──────────────────────────────────────────
function CinematicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const handleMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power3.out',
      });
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const handleEnter = () => {
      gsap.to(cursor, { scale: 1.8, opacity: 0.3, duration: 0.3 });
    };
    const handleLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 0.6, duration: 0.3 });
    };

    window.addEventListener('mousemove', handleMove);

    // Detect hoverable elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('button, a, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial pass
    document.querySelectorAll('button, a, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[70] pointer-events-none hidden md:block"
        style={{
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: '50%',
          border: '1px solid rgba(241,90,41,0.4)',
          opacity: 0.6,
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[70] pointer-events-none hidden md:block"
        style={{
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
          borderRadius: '50%',
          backgroundColor: '#F15A29',
        }}
      />
    </>
  );
}
