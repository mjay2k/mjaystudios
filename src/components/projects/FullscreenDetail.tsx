'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import { getProjectById, type Project } from '@/data/projects';

function DetailContent({ project }: { project: Project }) {
  const setDetailProject = useAppStore((s) => s.setDetailProject);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;

    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(contentRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.15 });

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      onComplete: () => setDetailProject(null),
    });
  };

  const allImages = [
    ...project.images,
    ...(project.caseStudy?.additionalImages ?? []),
  ];

  const prev = () => setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length);
  const next = () => setActiveIndex((i) => (i + 1) % allImages.length);

  const description = project.caseStudy?.extendedDescription ?? project.description;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[110] bg-neutral-950/80 backdrop-blur-xl"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative h-full w-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar — close + minimize */}
        <div className="fixed top-5 right-5 z-20 flex items-center gap-2">
          {/* Minimize toggle — desktop only */}
          <button
            onClick={() => setMinimized(!minimized)}
            className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/50 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
            title={minimized ? 'Show details' : 'Focus on image'}
          >
            {minimized ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
            )}
          </button>
          {/* Close */}
          <button
            onClick={handleClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex h-full" style={{ padding: 15 }}>
          {/* Image area — always fits in viewport */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-4 w-full h-full">
              {allImages.length > 1 ? (
                <button
                  onClick={prev}
                  className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/40 transition hover:bg-white/10 hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
              ) : <div className="w-10 flex-shrink-0" />}

              <div className="relative flex-1 flex items-center justify-center h-full overflow-hidden rounded-xl">
                <Image
                  src={allImages[activeIndex]}
                  alt={`${project.title} — ${activeIndex + 1}`}
                  width={1200}
                  height={900}
                  className="max-h-full max-w-full h-auto w-auto object-contain"
                  sizes="70vw"
                />
              </div>

              {allImages.length > 1 ? (
                <button
                  onClick={next}
                  className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/40 transition hover:bg-white/10 hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              ) : <div className="w-10 flex-shrink-0" />}
            </div>
          </div>

          {/* Info sidebar — collapsible */}
          <div className={`flex-shrink-0 flex flex-col justify-center border-l border-white/5 transition-all duration-500 overflow-hidden ${minimized ? 'w-0 p-0 border-transparent' : 'w-80 p-8'}`}>
            <div className={`transition-opacity duration-300 min-w-[260px] ${minimized ? 'opacity-0' : 'opacity-100'}`}>
              <div className="w-8 h-[3px] rounded-full mb-6" style={{ backgroundColor: 'var(--color-brand)' }} />

              <h2 className="text-2xl font-bold font-display text-white">
                {project.title}
              </h2>

              {allImages.length > 1 && (
                <p className="mt-2 text-xs text-white/30">
                  {activeIndex + 1} of {allImages.length}
                </p>
              )}

              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {description}
              </p>

              {project.caseStudy?.processNotes && (
                <p className="mt-4 text-xs italic text-white/35">
                  {project.caseStudy.processNotes}
                </p>
              )}

              {allImages.length > 1 && (
                <div className="mt-6 flex gap-1.5">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeIndex ? 'w-6' : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                      style={i === activeIndex ? { backgroundColor: 'var(--color-brand)' } : undefined}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col md:hidden min-h-full" style={{ padding: 15 }}>
          {/* Image — constrained to viewport */}
          <div className="flex-1 flex items-center justify-center pt-12">
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
              <Image
                src={allImages[activeIndex]}
                alt={`${project.title} — ${activeIndex + 1}`}
                width={800}
                height={600}
                className="max-h-full max-w-full h-auto w-auto object-contain"
                sizes="95vw"
              />
            </div>
          </div>

          {/* Nav arrows below image */}
          {allImages.length > 1 && (
            <div className="flex items-center justify-center gap-5 py-4">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/40"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <div className="flex gap-1.5">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeIndex ? 'w-6' : 'w-1.5 bg-white/20'
                    }`}
                    style={i === activeIndex ? { backgroundColor: 'var(--color-brand)' } : undefined}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/40"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          )}

          {/* Info panel — tap to toggle */}
          <div className={`px-5 pb-8 transition-all duration-300 ${minimized ? 'opacity-0 h-0 overflow-hidden pb-0' : ''}`}>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex w-full items-center justify-between py-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-[2px] rounded-full" style={{ backgroundColor: 'var(--color-brand)' }} />
                <h2 className="text-lg font-bold font-display text-white">
                  {project.title}
                </h2>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className={`text-white/40 transition-transform ${showInfo ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {showInfo && (
              <div className="pb-4">
                <p className="text-sm leading-relaxed text-white/60">
                  {description}
                </p>
                {project.caseStudy?.processNotes && (
                  <p className="mt-3 text-xs italic text-white/35">
                    {project.caseStudy.processNotes}
                  </p>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default function FullscreenDetail() {
  const detailProjectId = useAppStore((s) => s.detailProject);
  const project = detailProjectId ? getProjectById(detailProjectId) : null;

  if (!project) return null;

  return <DetailContent key={project.id} project={project} />;
}
