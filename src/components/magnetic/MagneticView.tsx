'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import { projects, type Project } from '@/data/projects';
import VersionSwitcher from '@/components/shell/VersionSwitcher';

const featured = projects
  .filter((p) => p.images.length > 0 && !(p.categories.length === 1 && p.categories[0] === 'logo'))
  .sort((a, b) => a.year - b.year);

// Each project gets a unique color palette that bleeds into the whole page
const palettes: Record<string, { bg: string; accent: string; text: string; muted: string }> = {
  'burnetts-vodka':    { bg: '#1a0a0e', accent: '#ff2d55', text: '#ffeef2', muted: '#8a4a5a' },
  'ellisParkBillboard':{ bg: '#0d1a0a', accent: '#4cd964', text: '#eefff0', muted: '#5a8a5e' },
  'pama-liqueur':      { bg: '#1a0518', accent: '#e040a0', text: '#ffedf8', muted: '#8a4a7a' },
  'rittenhouse-rye':   { bg: '#1a140a', accent: '#d4a040', text: '#fff8ee', muted: '#8a7a5a' },
  'sitex-corp':        { bg: '#0a0f1a', accent: '#4a90d9', text: '#eef4ff', muted: '#5a6a8a' },
  'epic-campaign':     { bg: '#1a0a05', accent: '#F15A29', text: '#fff2ee', muted: '#8a5a4a' },
  'pack-expo-booths':  { bg: '#0a1a1a', accent: '#40d4d4', text: '#eeffff', muted: '#5a8a8a' },
  'packaging':         { bg: '#0f0a1a', accent: '#9040d4', text: '#f4eeff', muted: '#6a5a8a' },
  'protect-campaign':  { bg: '#0a1a10', accent: '#40d480', text: '#eefff6', muted: '#5a8a6a' },
  'verdant-campaign':  { bg: '#0a1a0f', accent: '#60d440', text: '#f2ffee', muted: '#6a8a5a' },
  'bible-warden':      { bg: '#0a0a1a', accent: '#6080ff', text: '#eeeeff', muted: '#5a5a8a' },
  'news-warden':       { bg: '#1a0a0a', accent: '#ff6040', text: '#ffeeee', muted: '#8a5a5a' },
};

const defaultPalette = { bg: '#0a0a0a', accent: '#F15A29', text: '#f5f5f5', muted: '#666' };

function getPalette(id: string) {
  return palettes[id] || defaultPalette;
}

export default function MagneticView() {
  const [currentPalette, setCurrentPalette] = useState(getPalette(featured[0]?.id));
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);
  const setContactOpen = useAppStore((s) => s.setContactOpen);

  // Track mouse for cursor
  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // Animate custom cursor
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, { x: mousePos.x, y: mousePos.y, duration: 0.5, ease: 'power3.out' });
    }
    if (cursorDotRef.current) {
      gsap.to(cursorDotRef.current, { x: mousePos.x, y: mousePos.y, duration: 0.08 });
    }
    if (cursorLabelRef.current) {
      gsap.to(cursorLabelRef.current, { x: mousePos.x, y: mousePos.y, duration: 0.3, ease: 'power2.out' });
    }
  }, [mousePos]);

  // Cursor hover scaling
  useEffect(() => {
    const ring = cursorRef.current;
    const label = cursorLabelRef.current;
    if (!ring || !label) return;

    const onEnter = () => {
      gsap.to(ring, { scale: 2.5, opacity: 0.15, duration: 0.4, ease: 'power3.out' });
      gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 0.4, duration: 0.4, ease: 'power3.out' });
      gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2 });
    };

    const attach = () => {
      document.querySelectorAll('.mag-card').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
    attach();
    return () => obs.disconnect();
  }, []);

  // Intersection observer for color transitions + scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            const idx = Number(entry.target.getAttribute('data-index'));
            const p = featured[idx];
            if (p) {
              setCurrentPalette(getPalette(p.id));
            }
          }
        });
      },
      { threshold: [0.4, 0.6, 0.8], rootMargin: '-10% 0px' }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll-triggered text reveals using GSAP
  useEffect(() => {
    // Stagger in each section's elements as they enter viewport
    sectionRefs.current.forEach((section) => {
      if (!section) return;

      const title = section.querySelector('.mag-title');
      const meta = section.querySelector('.mag-meta');
      const desc = section.querySelector('.mag-desc');
      const image = section.querySelector('.mag-image-wrap');
      const divider = section.querySelector('.mag-divider');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      if (divider) tl.fromTo(divider, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, 0);
      if (meta) tl.fromTo(meta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.1);
      if (title) tl.fromTo(title, { opacity: 0, y: 60, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.8, ease: 'power4.out' }, 0.15);
      if (desc) tl.fromTo(desc, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.3);
      if (image) tl.fromTo(image, { opacity: 0, y: 40, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }, 0.2);
    });

    return () => {
      // ScrollTrigger cleanup handled by GSAP
    };
  }, []);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedProject(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen transition-colors duration-1000"
      style={{ background: currentPalette.bg, cursor: 'none' }}
    >
      {/* ─── Nav ─────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 md:px-12 transition-colors duration-1000"
        style={{ background: `${currentPalette.bg}cc`, backdropFilter: 'blur(20px)' }}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/mjaystudios-logo.svg"
            alt="MJay Studios"
            width={140}
            height={36}
            className="h-9 w-auto brightness-0 invert opacity-50 transition-opacity hover:opacity-100"
            priority
          />
          <span
            className="text-sm font-bold font-display tracking-tight leading-[0.95] transition-colors duration-1000"
            style={{ color: `${currentPalette.text}60` }}
          >
            Matthew<br />Johnson
          </span>
        </div>
        <div className="flex items-center gap-6">
          <MagneticButton
            label="About"
            onClick={() => setAboutOpen(true)}
            color={currentPalette.accent}
            textColor={currentPalette.text}
          />
          <MagneticButton
            label="Contact"
            onClick={() => setContactOpen(true)}
            color={currentPalette.accent}
            textColor={currentPalette.text}
          />
          <VersionSwitcher />
        </div>
      </nav>

      {/* ─── Hero intro ──────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center px-8">
        <div className="text-center">
          <div
            className="mb-6 text-[10px] font-bold uppercase tracking-[0.5em] transition-colors duration-1000"
            style={{ color: currentPalette.accent }}
          >
            Art Director &bull; Designer &bull; Builder
          </div>
          <h1
            className="font-display text-[clamp(3rem,10vw,9rem)] font-black leading-[0.85] tracking-tighter transition-colors duration-1000"
            style={{ color: currentPalette.text }}
          >
            Selected<br />Works
          </h1>
          <div
            className="mx-auto mt-8 h-px w-16 transition-colors duration-1000"
            style={{ backgroundColor: currentPalette.accent }}
          />
          <p
            className="mt-6 text-sm tracking-wide transition-colors duration-1000"
            style={{ color: `${currentPalette.text}50` }}
          >
            Scroll to explore
          </p>
        </div>
      </section>

      {/* ─── Project sections ────────────────────────── */}
      {featured.map((project, i) => {
        const palette = getPalette(project.id);
        const isEven = i % 2 === 0;

        return (
          <section
            key={project.id}
            ref={(el) => { sectionRefs.current[i] = el; }}
            data-index={i}
            className="relative px-8 py-24 md:px-12 md:py-32 lg:px-20"
          >
            {/* Divider line */}
            <div
              className="mag-divider mb-16 h-px origin-left"
              style={{ backgroundColor: `${palette.accent}30` }}
            />

            {/* Layout alternates: text-left/image-right, then image-left/text-right */}
            <div className={`flex flex-col gap-8 md:gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-start`}>
              {/* Text column */}
              <div className="flex-1 flex flex-col justify-center md:max-w-lg">
                {/* Meta */}
                <div className="mag-meta flex items-center gap-4 mb-4">
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-1000"
                    style={{ color: palette.accent }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1 max-w-[40px]" style={{ backgroundColor: `${palette.accent}40` }} />
                  <span
                    className="text-[10px] uppercase tracking-[0.2em] transition-colors duration-1000"
                    style={{ color: `${palette.text}40` }}
                  >
                    {project.era === 'agency' ? 'Agency' : project.era === 'berry' ? 'Berry' : 'Independent'} &mdash; {project.year}
                  </span>
                </div>

                {/* Title */}
                <div className="overflow-hidden">
                  <h2
                    className="mag-title font-display text-[clamp(2rem,4vw,4rem)] font-black leading-[0.9] tracking-tight transition-colors duration-1000"
                    style={{ color: palette.text }}
                  >
                    {project.title}
                  </h2>
                </div>

                {/* Description */}
                <p
                  className="mag-desc mt-5 text-sm leading-relaxed max-w-md transition-colors duration-1000"
                  style={{ color: palette.muted }}
                >
                  {project.description}
                </p>

                {/* Categories */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors duration-1000"
                      style={{
                        border: `1px solid ${palette.accent}30`,
                        color: palette.accent,
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                  {project.concept && (
                    <span
                      className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ border: '1px solid rgba(255,255,255,0.15)', color: `${palette.text}60` }}
                    >
                      Concept
                    </span>
                  )}
                </div>

                {/* Client */}
                {project.client && (
                  <div className="mt-6">
                    <span className="text-[9px] uppercase tracking-[0.3em] block" style={{ color: `${palette.text}25` }}>Client</span>
                    <span className="text-xs font-medium" style={{ color: `${palette.text}60` }}>{project.client}</span>
                  </div>
                )}
              </div>

              {/* Image column */}
              <div className="flex-1 w-full">
                <MagneticImage
                  project={project}
                  palette={palette}
                  onExpand={() => setExpandedProject(project)}
                />
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── Footer ──────────────────────────────────── */}
      <footer className="relative px-8 py-32 md:px-12 text-center">
        <div className="h-px mx-auto w-16 mb-12" style={{ backgroundColor: `${currentPalette.accent}30` }} />
        <h3
          className="font-display text-[clamp(2rem,5vw,4rem)] font-black tracking-tight transition-colors duration-1000"
          style={{ color: currentPalette.text }}
        >
          Let&rsquo;s Work Together
        </h3>
        <p className="mt-4 text-sm" style={{ color: `${currentPalette.text}40` }}>
          Art direction, design, and development for brands that want to stand out.
        </p>
        <button
          onClick={() => setContactOpen(true)}
          className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: currentPalette.accent,
            color: currentPalette.bg,
          }}
        >
          Get in Touch
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </footer>

      {/* ─── Expanded Detail ─────────────────────────── */}
      {expandedProject && (
        <ExpandedDetail
          project={expandedProject}
          palette={getPalette(expandedProject.id)}
          onClose={() => setExpandedProject(null)}
        />
      )}

      {/* ─── About/Contact Popups ────────────────────── */}
      <AboutPopup />
      <ContactPopup />

      {/* ─── Magnetic Cursor ─────────────────────────── */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[70] pointer-events-none hidden md:block rounded-full transition-colors duration-1000"
        style={{
          width: 48,
          height: 48,
          marginLeft: -24,
          marginTop: -24,
          border: `1.5px solid ${currentPalette.accent}`,
          opacity: 0.4,
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 z-[70] pointer-events-none hidden md:block rounded-full transition-colors duration-1000"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          backgroundColor: currentPalette.accent,
        }}
      />
      <div
        ref={cursorLabelRef}
        className="fixed top-0 left-0 z-[70] pointer-events-none hidden md:block opacity-0"
        style={{ marginLeft: 30, marginTop: -6 }}
      >
        <span
          className="text-[9px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-1000"
          style={{ color: currentPalette.accent }}
        >
          View
        </span>
      </div>
    </div>
  );
}

// ─── Magnetic Image Card ────────────────────────────────────
// Image warps toward cursor on hover, creating a gravitational pull effect
function MagneticImage({
  project,
  palette,
  onExpand,
}: {
  project: Project;
  palette: { bg: string; accent: string; text: string; muted: string };
  onExpand: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!wrapRef.current || !imgRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Image moves toward cursor
      gsap.to(imgRef.current, {
        x: x * 25,
        y: y * 25,
        rotateY: x * 8,
        rotateX: -y * 8,
        scale: 1.04,
        duration: 0.6,
        ease: 'power3.out',
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!imgRef.current) return;
    setHovered(false);
    gsap.to(imgRef.current, {
      x: 0,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    });
  }, []);

  return (
    <div
      ref={wrapRef}
      className="mag-card mag-image-wrap relative overflow-hidden rounded-2xl"
      style={{
        perspective: '800px',
        boxShadow: hovered
          ? `0 30px 80px ${palette.accent}20, 0 0 0 1px ${palette.accent}20`
          : `0 10px 40px ${palette.bg}80`,
        transition: 'box-shadow 0.5s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onExpand}
    >
      <div ref={imgRef} style={{ transformStyle: 'preserve-3d' }}>
        <Image
          src={project.images[0]}
          alt={project.title}
          width={900}
          height={600}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Accent glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${palette.accent}10 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Multi-image indicator */}
      {project.images.length > 1 && (
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1"
          style={{ background: `${palette.bg}cc`, backdropFilter: 'blur(8px)' }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={palette.accent} strokeWidth="2">
            <rect x="2" y="2" width="16" height="16" rx="2" />
            <rect x="6" y="6" width="16" height="16" rx="2" />
          </svg>
          <span className="text-[9px] font-bold" style={{ color: palette.accent }}>
            {project.images.length}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Magnetic Button ────────────────────────────────────────
// Button that pulls toward cursor on hover (Snellenberg-style)
function MagneticButton({
  label,
  onClick,
  color,
  textColor,
}: {
  label: string;
  onClick: () => void;
  color: string;
  textColor: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btnRef.current, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: 'power3.out',
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
    });
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hidden md:block text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-1000"
      style={{ color: `${textColor}50` }}
      onMouseEnter={(e) => { e.currentTarget.style.color = color; }}
    >
      {label}
    </button>
  );
}

// ─── Expanded Detail ────────────────────────────────────────
function ExpandedDetail({
  project,
  palette,
  onClose,
}: {
  project: Project;
  palette: { bg: string; accent: string; text: string; muted: string };
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;
    // Clip reveal from center
    gsap.fromTo(panelRef.current,
      { clipPath: 'circle(0% at 50% 50%)' },
      { clipPath: 'circle(150% at 50% 50%)', duration: 0.8, ease: 'power4.out' }
    );

    if (imagesRef.current) {
      const imgs = imagesRef.current.querySelectorAll('.exp-img');
      gsap.fromTo(imgs,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, delay: 0.4, ease: 'power3.out' }
      );
    }
  }, []);

  const handleClose = () => {
    if (!panelRef.current) return;
    gsap.to(panelRef.current, {
      clipPath: 'circle(0% at 50% 50%)',
      duration: 0.5,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[55] overflow-y-auto"
      style={{ background: palette.bg, scrollbarWidth: 'none', cursor: 'auto' }}
    >
      {/* Close */}
      <button
        onClick={handleClose}
        className="fixed top-6 right-6 z-[56] flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
        style={{ border: `1px solid ${palette.accent}40`, background: `${palette.accent}10` }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.accent} strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="mx-auto max-w-5xl px-8 py-24">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-12" style={{ backgroundColor: palette.accent }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: palette.muted }}>
            {project.era} &mdash; {project.year}
          </span>
        </div>
        <h2
          className="font-display text-5xl md:text-7xl font-black tracking-tight"
          style={{ color: palette.text }}
        >
          {project.title}
        </h2>
        {project.client && (
          <p className="mt-3 text-sm font-medium" style={{ color: palette.muted }}>
            {project.client}
          </p>
        )}
        <p className="mt-6 max-w-2xl text-base leading-relaxed" style={{ color: `${palette.text}70` }}>
          {project.caseStudy?.extendedDescription || project.description}
        </p>

        {/* Images */}
        <div ref={imagesRef} className="mt-16 space-y-6">
          {project.images.map((src, i) => (
            <div key={src} className="exp-img overflow-hidden rounded-xl">
              <Image
                src={src}
                alt={`${project.title} ${i + 1}`}
                width={1200}
                height={800}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Import popups for the magnetic view ────────────────────
import AboutPopup from '@/components/popups/AboutPopup';
import ContactPopup from '@/components/popups/ContactPopup';
