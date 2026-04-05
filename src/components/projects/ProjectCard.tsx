'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const setDetailProject = useAppStore((s) => s.setDetailProject);
  const hasDetail = project.caseStudy || project.images.length > 1;

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
        className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-800"
      >
        <Image
          src={project.images[activeIndex]}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
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

      <h3 className="mt-3 text-sm font-semibold">{project.title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-white/50">
        {project.description}
      </p>
    </div>
  );
}
