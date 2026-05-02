'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import { projects, type Project } from '@/data/projects';
import VersionSwitcher from '@/components/shell/VersionSwitcher';

// Lazy-load the 3D sphere (heavy)
const NoiseSphere = dynamic(() => import('./NoiseSphere'), { ssr: false });

// Featured projects for the work list
const featured = projects
  .filter((p) => p.images.length > 0 && !(p.categories.length === 1 && p.categories[0] === 'logo'))
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .slice(0, 8);

// Category label formatting
function formatCategory(cats: string[]): string {
  return cats.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(' & ');
}

export default function SnellenbergView() {
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);
  const setContactOpen = useAppStore((s) => s.setContactOpen);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const hoverImgRef = useRef<HTMLDivElement>(null);
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);

  // Custom cursor
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power3.out' });
      }
      if (cursorDotRef.current) {
        gsap.to(cursorDotRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Hover image follows cursor
  useEffect(() => {
    if (!hoverImgRef.current) return;
    if (hoveredProject) {
      gsap.to(hoverImgRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' });
    } else {
      gsap.to(hoverImgRef.current, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in' });
    }
  }, [hoveredProject]);

  useEffect(() => {
    if (!hoverImgRef.current || !hoveredProject) return;
    gsap.to(hoverImgRef.current, {
      x: cursorPos.x + 20,
      y: cursorPos.y - 120,
      duration: 0.4,
      ease: 'power3.out',
    });
  }, [cursorPos, hoveredProject]);

  // Scroll reveal animations
  useEffect(() => {
    if (!containerRef.current) return;

    const reveals = containerRef.current.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Hero parallax
    if (heroRef.current) {
      const heroContent = heroRef.current.querySelector('.hero-content');
      if (heroContent) {
        gsap.to(heroContent, {
          y: 150,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }

    return () => {
      // ScrollTrigger cleanup handled by GSAP
    };
  }, []);

  // Cursor grow on interactive elements
  useEffect(() => {
    const grow = () => {
      if (cursorRef.current) gsap.to(cursorRef.current, { scale: 2.5, opacity: 0.15, duration: 0.3 });
    };
    const shrink = () => {
      if (cursorRef.current) gsap.to(cursorRef.current, { scale: 1, opacity: 0.4, duration: 0.3 });
    };

    const attach = () => {
      document.querySelectorAll('a, button, [role="button"], .work-row').forEach((el) => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });
    };

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
    attach();
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen"
      style={{ background: '#1a1a1a', color: '#e8e4df', cursor: 'none', fontFamily: 'var(--font-display), system-ui, sans-serif' }}
    >
      {/* ═══════════════════ NAV ═══════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 mix-blend-difference">
        <button
          onClick={() => scrollTo(heroRef)}
          className="text-sm font-bold tracking-tight text-white"
        >
          Matthew Johnson
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo(workRef)} className="text-xs font-medium uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors">Work</button>
          <button onClick={() => scrollTo(aboutRef)} className="text-xs font-medium uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors">About</button>
          <button onClick={() => scrollTo(contactRef)} className="text-xs font-medium uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors">Contact</button>
          <div className="h-4 w-px bg-white/10" />
          <VersionSwitcher />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-xs font-bold uppercase tracking-[0.15em] text-white/60"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden" style={{ background: '#1a1a1a' }}>
          <button onClick={() => scrollTo(workRef)} className="text-3xl font-bold font-display text-white/80 hover:text-white">Work</button>
          <button onClick={() => scrollTo(aboutRef)} className="text-3xl font-bold font-display text-white/80 hover:text-white">About</button>
          <button onClick={() => scrollTo(contactRef)} className="text-3xl font-bold font-display text-white/80 hover:text-white">Contact</button>
          <div className="mt-4">
            <VersionSwitcher />
          </div>
        </div>
      )}

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center"
      >
        <div className="hero-content relative z-10 px-6 md:px-12 lg:px-20 pb-20 pt-32">
          {/* Greeting ticker */}
          <div className="mb-8 overflow-hidden">
            <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.3em] text-white/30 reveal">
              Creative Director &bull; Art Director &bull; Developer
            </p>
          </div>

          {/* Big name — mix-blend-mode difference creates the inverted effect over the blob */}
          <h1 className="reveal" style={{ mixBlendMode: 'difference' }}>
            <span
              className="block text-[clamp(3rem,10vw,9rem)] font-black leading-[0.88] tracking-tighter text-white"
              style={{ fontFeatureSettings: '"ss01"' }}
            >
              Designing
            </span>
            <span
              className="block text-[clamp(3rem,10vw,9rem)] font-black leading-[0.88] tracking-tighter"
              style={{ color: '#F15A29', fontFeatureSettings: '"ss01"' }}
            >
              experiences
            </span>
            <span
              className="block text-[clamp(3rem,10vw,9rem)] font-black leading-[0.88] tracking-tighter text-white"
              style={{ fontFeatureSettings: '"ss01"' }}
            >
              that matter.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="reveal mt-8 max-w-md text-sm sm:text-base leading-relaxed text-white/40">
            Award-winning creative leader with 15+ years bridging brand strategy,
            digital innovation, and multimedia production.
          </p>
        </div>

        {/* 3D Sphere — right side on desktop, behind text on mobile.
            Intentionally overflows the hero section for organic feel */}
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none md:pointer-events-auto"
          style={{ width: '110vh', height: '110vh', maxWidth: '900px', maxHeight: '900px', right: '-10%' }}
        >
          <Suspense fallback={null}>
            <NoiseSphere className="w-full h-full" />
          </Suspense>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-6 md:left-12 flex items-center gap-3 reveal">
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/60 animate-pulse" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">Scroll</span>
        </div>
      </section>

      {/* ═══════════════════ WORK ═══════════════════ */}
      <section ref={workRef} className="relative py-24 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="reveal mb-16 md:mb-24">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/30 mb-3">Selected Work</p>
          <h2
            className="text-4xl md:text-6xl font-black tracking-tight text-white"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            Recent projects
          </h2>
        </div>

        {/* Project list */}
        <div className="border-t border-white/10">
          {featured.map((project, i) => (
            <button
              key={project.id}
              className="work-row group w-full flex items-center justify-between py-6 md:py-8 border-b border-white/10 text-left transition-colors hover:border-white/25"
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setExpandedProject(project)}
            >
              <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
                <span className="text-xs font-mono text-white/20 hidden sm:block w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-display tracking-tight text-white/70 group-hover:text-white transition-colors truncate">
                  {project.title}
                </h3>
              </div>
              <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
                <span className="hidden md:block text-xs uppercase tracking-wider text-white/25 group-hover:text-white/40 transition-colors">
                  {formatCategory(project.categories)}
                </span>
                <span className="text-xs font-mono text-white/20 group-hover:text-white/40 transition-colors">
                  {project.year}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-white/15 group-hover:text-[#F15A29] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ═══════════════════ ABOUT ═══════════════════ */}
      <section ref={aboutRef} className="relative py-24 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div className="reveal">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/30 mb-3">About</p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[0.95]"
              style={{ fontFeatureSettings: '"ss01"' }}
            >
              Building brands<br />
              <span style={{ color: '#F15A29' }}>from every angle.</span>
            </h2>
          </div>
          <div className="reveal space-y-5 text-sm sm:text-base leading-relaxed text-white/45">
            <p>
              My career started in agency life — building websites at Keller
              Crescent, then art directing multi-channel campaigns at 10over12
              Creative for brands like Heaven Hill, PAMA, and Rittenhouse Rye.
            </p>
            <p>
              At Berry Global, I spent nearly a decade as Senior Graphic Designer
              driving the company&apos;s visual identity, designing ADDY-winning
              trade show booths, and building campaigns across a Fortune 500 brand
              portfolio.
            </p>
            <p>
              Now I&apos;m teaching computer science and media production while
              building AI-powered apps from the ground up. I bring the eye of an
              art director, the strategic thinking of a brand leader, and the
              technical capability to build what I design.
            </p>

            {/* Awards */}
            <div className="pt-6 flex flex-wrap gap-2">
              {['2018 Silver ADDY', '2019 Silver ADDY', '2022 Silver ADDY', '2024 Silver ADDY'].map((a) => (
                <span
                  key={a}
                  className="rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide"
                  style={{ background: 'rgba(241,90,41,0.1)', color: '#F15A29' }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CONTACT / FOOTER ═══════════════════ */}
      <section
        ref={contactRef}
        className="relative py-24 md:py-40 px-6 md:px-12 lg:px-20"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="reveal mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/30 mb-3">Contact</p>
          <h2
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.95]"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            Let&apos;s work<br />
            <span style={{ color: '#F15A29' }}>together.</span>
          </h2>
        </div>

        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <ContactLink label="Email" value="mjay2k@gmail.com" href="mailto:mjay2k@gmail.com" />
          <ContactLink label="Phone" value="(812) 453-7766" href="tel:8124537766" />
          <ContactLink label="LinkedIn" value="linkedin.com/in/mjaystudios" href="https://linkedin.com/in/mjaystudios" external />
          <ContactLink label="Website" value="mjaystudios.com" href="https://mjaystudios.com" external />
        </div>

        {/* Footer bottom */}
        <div className="mt-24 md:mt-40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] sm:text-xs text-white/20">
          <span>&copy; {new Date().getFullYear()} Matthew Johnson</span>
          <span className="uppercase tracking-[0.15em]">Studio Noir Edition</span>
        </div>
      </section>

      {/* ═══════════════════ HOVER IMAGE ═══════════════════ */}
      <div
        ref={hoverImgRef}
        className="fixed top-0 left-0 z-30 pointer-events-none hidden md:block"
        style={{ opacity: 0, transform: 'scale(0.9)' }}
      >
        {hoveredProject && (
          <div className="w-64 rounded-lg overflow-hidden shadow-2xl" style={{ background: '#111' }}>
            <Image
              src={hoveredProject.images[0]}
              alt={hoveredProject.title}
              width={400}
              height={400}
              className="w-full h-auto"
              style={{ objectFit: 'contain' }}
              sizes="256px"
            />
          </div>
        )}
      </div>

      {/* ═══════════════════ EXPANDED PROJECT ═══════════════════ */}
      {expandedProject && (
        <ProjectDetail project={expandedProject} onClose={() => setExpandedProject(null)} />
      )}

      {/* ═══════════════════ CUSTOM CURSOR ═══════════════════ */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[60] pointer-events-none hidden md:block"
        style={{
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          opacity: 0.4,
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 z-[60] pointer-events-none hidden md:block"
        style={{
          width: 5,
          height: 5,
          marginLeft: -2.5,
          marginTop: -2.5,
          borderRadius: '50%',
          background: '#fff',
          mixBlendMode: 'difference',
        }}
      />
    </div>
  );
}

// ─── Contact Link ──────────────────────────────────────────
function ContactLink({ label, value, href, external }: { label: string; value: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group block"
    >
      <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-white/25 mb-1">{label}</span>
      <span className="block text-sm text-white/60 group-hover:text-white transition-colors">{value}</span>
      <div className="mt-2 h-px bg-white/5 group-hover:bg-white/15 transition-colors" />
    </a>
  );
}

// ─── Project Detail ────────────────────────────────────────
function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(panelRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
    if (imagesRef.current) {
      const imgs = imagesRef.current.querySelectorAll('.detail-img');
      gsap.fromTo(imgs,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.2, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const handleClose = () => {
    if (!panelRef.current) return;
    gsap.to(panelRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[80] overflow-y-auto"
      style={{ background: '#1a1a1a' }}
    >
      <button
        onClick={handleClose}
        className="fixed top-5 right-5 z-[81] flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="mx-auto max-w-5xl px-6 py-24 md:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/30 mb-3">
          {formatCategory(project.categories)} &bull; {project.year}
        </p>
        <h2
          className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4"
          style={{ fontFeatureSettings: '"ss01"' }}
        >
          {project.title}
        </h2>
        {project.client && (
          <p className="text-sm text-white/40 mb-2">{project.client}</p>
        )}
        <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-white/45 mb-16">
          {project.caseStudy?.extendedDescription || project.description}
        </p>

        <div ref={imagesRef} className="space-y-6">
          {project.images.map((src, i) => (
            <div key={src} className="detail-img overflow-hidden rounded-lg flex items-center justify-center">
              <Image
                src={src}
                alt={`${project.title} ${i + 1}`}
                width={1200}
                height={800}
                className="w-auto h-auto max-w-full"
                style={{ maxHeight: '75vh', objectFit: 'contain' }}
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
