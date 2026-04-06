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
  const imageRef = useRef<HTMLDivElement>(null);
  const setDetailProject = useAppStore((s) => s.setDetailProject);
  const hasDetail = project.caseStudy || project.images.length > 1;
  const loadedHeights = useRef<number[]>([]);

  // Track the tallest image so the container doesn't jump
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

  // Preload all images to measure heights
  useEffect(() => {
    if (project.images.length <= 1) return;

    project.images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [project.images]);

  useEffect(() => {
    if (!project.autoCycle || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % project.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [project.autoCycle, project.images.length]);

  useEffect(() => {
    if (!imageRef.current) return;
    gsap.fromTo(
      imageRef.current,
      { opacity: 0.6 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeIndex]);

  return (
    <div
      className={`group relative ${hasDetail ? 'cursor-pointer' : ''}`}
      onClick={() => hasDetail && setDetailProject(project.id)}
    >
      <div
        ref={imageRef}
        className="relative overflow-hidden rounded-lg bg-neutral-200"
        style={maxHeight ? { minHeight: maxHeight } : undefined}
      >
        <Image
          src={project.images[activeIndex]}
          alt={project.title}
          width={800}
          height={600}
          className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
          onLoad={handleImageLoad}
        />

        {hasDetail && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-[10px] font-medium text-white/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            View Details
          </div>
        )}

        {project.images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {project.images.map((_, i) => (
              <div
                key={i}
                className={`h-1 w-1 rounded-full ${
                  i === activeIndex ? 'bg-white/80' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <h3 className="mt-3 text-sm font-semibold font-display">{project.title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-neutral-500">
        {project.description}
      </p>
    </div>
  );
}
