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

    cards.forEach((card, i) => {
      // Slide in from the right (timeline side) with a slight rotation
      // like cards being dealt from the timeline rail
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
      className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12"
      style={{ perspective: '1200px' }}
    >
      {projects.map((project, i) => (
        <div
          key={project.id}
          className={`project-card ${
            i % 2 === 1 ? 'md:mt-12' : ''
          }`}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
