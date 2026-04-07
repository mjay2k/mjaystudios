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

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
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
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10"
    >
      {projects.map((project, i) => (
        <div
          key={project.id}
          className={`project-card ${
            i % 2 === 1 ? 'md:mt-8' : ''
          }`}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
