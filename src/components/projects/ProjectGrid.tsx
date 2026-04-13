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

  // Split into normal and compact projects
  const normalProjects = projects.filter((p) => !p.compact);
  const compactProjects = projects.filter((p) => p.compact);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.project-card');

    cards.forEach((card, i) => {
      const isRightCol = i % 2 === 1;
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: isRightCol ? 80 : 60,
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

  return (
    <div ref={gridRef} style={{ perspective: '1200px' }}>
      {/* Normal-sized projects — 2 column grid */}
      {normalProjects.length > 0 && (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {normalProjects.map((project, i) => (
            <div
              key={project.id}
              className={`project-card ${i % 2 === 1 ? 'md:mt-12' : ''}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}

      {/* Compact projects — 4 column grid (2 on mobile) */}
      {compactProjects.length > 0 && (
        <div className={`grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 ${normalProjects.length > 0 ? 'mt-10 md:mt-12' : ''}`}>
          {compactProjects.map((project) => (
            <div key={project.id} className="project-card">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
