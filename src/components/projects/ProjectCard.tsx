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
  const stackRef = useRef<HTMLDivElement>(null);
  const setDetailProject = useAppStore((s) => s.setDetailProject);
  const hasDetail = project.caseStudy || project.images.length > 1;
  const loadedHeights = useRef<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      const renderedHeight = img.offsetHeight;
      loadedHeights.current.push(renderedHeight);

      if (loadedHeights.current.length > 0) {
        const tallest = Math.max(...loadedHeights.current);
        setMaxHeight((prev) => (prev === undefined || tallest > prev ? tallest : prev));
      }
    },
    []
  );

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

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group/link absolute top-3 left-3 z-10 flex h-9 items-center gap-2 rounded-full px-2.5 text-white shadow-lg transition-all duration-300 w-9 hover:w-[120px] overflow-hidden"
            style={{ backgroundColor: '#F15A29' }}
          >
            <svg className="flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span className="whitespace-nowrap text-[11px] font-semibold opacity-0 transition-opacity duration-300 group-hover/link:opacity-100">Visit Site</span>
          </a>
        )}

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
