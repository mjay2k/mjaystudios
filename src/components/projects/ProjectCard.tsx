'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const [pickerOpen, setPickerOpen] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const setDetailProject = useAppStore((s) => s.setDetailProject);
  const hasDetail = project.caseStudy || project.images.length > 1;
  const aspectRatios = useRef<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Close picker on outside click
  useEffect(() => {
    if (!pickerOpen) return;
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [pickerOpen]);

  // Recompute minHeight from the tallest image's aspect ratio and the
  // current container width — keeps the stack from leaving blank space
  // when the viewport resizes after first load.
  const recalcHeight = useCallback(() => {
    if (!stackRef.current || aspectRatios.current.length === 0) return;
    const w = stackRef.current.clientWidth;
    if (w === 0) return;
    const tallestRatio = Math.max(...aspectRatios.current);
    setMaxHeight(w * tallestRatio);
  }, []);

  const handleImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      if (img.naturalWidth > 0) {
        aspectRatios.current.push(img.naturalHeight / img.naturalWidth);
      }
      recalcHeight();
    },
    [recalcHeight]
  );

  // Watch container width — when viewport shrinks/grows, scale minHeight
  useEffect(() => {
    const el = stackRef.current;
    if (!el || project.images.length <= 1) return;
    const ro = new ResizeObserver(() => recalcHeight());
    ro.observe(el);
    return () => ro.disconnect();
  }, [project.images.length, recalcHeight]);

  // Preload all images
  useEffect(() => {
    if (project.images.length <= 1) return;
    project.images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [project.images]);

  // Crossfade via GSAP — all images are always in the DOM, stacked
  useEffect(() => {
    if (!stackRef.current || project.images.length <= 1) return;

    const layers = stackRef.current.querySelectorAll('.img-layer');
    layers.forEach((layer, i) => {
      gsap.to(layer, {
        opacity: i === activeIndex ? 1 : 0,
        duration: 1.5,
        ease: 'power2.inOut',
      });
    });
  }, [activeIndex, project.images.length]);

  // Auto-cycle with random start offset
  useEffect(() => {
    if (!project.autoCycle || project.images.length <= 1) return;

    const holdTime = 7000;
    const randomDelay = Math.random() * holdTime;

    const timeout = setTimeout(() => {
      advance();
      intervalRef.current = setInterval(advance, holdTime);
    }, randomDelay);

    function advance() {
      setActiveIndex((prev) => (prev + 1) % project.images.length);
    }

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [project.autoCycle, project.images.length]);

  const multiImage = project.images.length > 1;

  return (
    <div
      className={`group relative transition-all duration-300 ${hasDetail ? 'cursor-pointer' : ''}`}
      onClick={() => hasDetail && setDetailProject(project.id)}
    >
      <div
        className="relative overflow-hidden rounded-xl bg-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
        style={maxHeight && multiImage ? { minHeight: maxHeight } : undefined}
      >
        {multiImage ? (
          <div ref={stackRef} className="relative">
            {project.images.map((src, i) => (
              <div
                key={src}
                className="img-layer"
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                <Image
                  src={src}
                  alt={`${project.title} ${i + 1}`}
                  width={800}
                  height={600}
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onLoad={handleImageLoad}
                />
              </div>
            ))}
          </div>
        ) : (
          <Image
            src={project.images[0]}
            alt={project.title}
            width={800}
            height={600}
            className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
            onLoad={handleImageLoad}
          />
        )}

        {project.multiLinks && project.multiLinks.length > 0 ? (
          <div ref={pickerRef} className="absolute top-3 left-3 z-10" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPickerOpen((v) => !v)}
              className="group/link flex h-9 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 w-9 hover:w-auto hover:px-4 hover:gap-2 overflow-hidden"
              style={{ backgroundColor: '#F15A29' }}
              aria-haspopup="menu"
              aria-expanded={pickerOpen}
            >
              <svg className="flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span className="whitespace-nowrap text-[11px] font-semibold max-w-0 overflow-hidden transition-all duration-300 group-hover/link:max-w-[100px]">View Report</span>
            </button>
            {pickerOpen && (
              <div
                role="menu"
                className="absolute left-0 top-11 w-44 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl"
              >
                <div className="px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-100">
                  Pick a year
                </div>
                {project.multiLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setPickerOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-xs font-bold font-display text-neutral-700 hover:bg-neutral-50 hover:text-[#F15A29] transition-colors"
                    role="menuitem"
                  >
                    <span>{l.label}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
        ) : (() => {
          const currentImage = project.images[activeIndex];
          const dynamicLink = project.imageLinks?.[currentImage] || project.link;
          if (!dynamicLink) return null;
          const label = dynamicLink.endsWith('.pdf') ? 'View Report' : 'Visit Site';
          return (
            <a
              href={dynamicLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/link absolute top-3 left-3 z-10 flex h-9 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 w-9 hover:w-auto hover:px-4 hover:gap-2 overflow-hidden"
              style={{ backgroundColor: '#F15A29' }}
            >
              <svg className="flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span className="whitespace-nowrap text-[11px] font-semibold max-w-0 overflow-hidden transition-all duration-300 group-hover/link:max-w-[80px]">{label}</span>
            </a>
          );
        })()}

        {hasDetail && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-[10px] font-medium text-white/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            View Details
          </div>
        )}

        {project.concept && (
          <div className="absolute top-3 right-3 rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider z-10"
            style={{ backgroundColor: '#F15A29', color: '#000' }}
          >
            Concept
          </div>
        )}

      </div>

      {/* Title + hash mark indicators */}
      <div className="mt-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold font-display tracking-tight">{project.title}</h3>
          {multiImage && (
            <div className="flex items-end gap-[3px]">
              {project.images.map((_, i) => (
                <div
                  key={i}
                  className="transition-all duration-300"
                  style={{
                    width: i === activeIndex ? 3 : 2,
                    height: i === activeIndex ? 14 : (i % 2 === 0 ? 8 : 6),
                    borderRadius: 1,
                    backgroundColor: i === activeIndex ? '#F15A29' : '#333333',
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
          {project.description}
        </p>
      </div>
    </div>
  );
}
