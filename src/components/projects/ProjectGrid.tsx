'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import ProjectCard from './ProjectCard';
import type { Project } from '@/data/projects';

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.project-card');
    let normalIndex = 0;

    cards.forEach((card) => {
      const isCompact = card.classList.contains('compact-card');
      const isRightCol = !isCompact && normalIndex % 2 === 1;
      if (!isCompact) normalIndex++;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: isRightCol || isCompact ? 80 : 60,
          rotateY: 8,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'center bottom',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [projects]);

  // Track normal card index for stagger offset
  let normalIdx = 0;

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
      style={{ perspective: '1200px' }}
    >
      {projects.map((project) => {
        if (project.compact) {
          return (
            <div
              key={project.id}
              className="project-card compact-card col-span-1"
            >
              <ProjectCard project={project} />
            </div>
          );
        }

        if (project.wide) {
          normalIdx++;
          return (
            <div
              key={project.id}
              className="project-card col-span-2 md:col-span-3"
            >
              <ProjectCard project={project} />
            </div>
          );
        }

        const idx = normalIdx++;
        return (
          <div
            key={project.id}
            className={`project-card col-span-2 ${idx % 2 === 1 ? 'md:mt-12' : ''}`}
          >
            <ProjectCard project={project} />
          </div>
        );
      })}
    </div>
  );
}
