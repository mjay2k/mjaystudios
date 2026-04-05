'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import ProjectGrid from '@/components/projects/ProjectGrid';
import type { Project } from '@/data/projects';
import type { Section } from '@/stores/useAppStore';

interface EraConfig {
  id: string;
  title: string;
  accent: string;
  section: Section;
}

interface EraSectionProps {
  config: EraConfig;
  projects: Project[];
}

export default function EraSection({ config, projects }: EraSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const setCurrentSection = useAppStore((s) => s.setCurrentSection);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 40%',
      end: 'bottom 40%',
      onEnter: () => setCurrentSection(config.section),
      onEnterBack: () => setCurrentSection(config.section),
    });

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    return () => {
      trigger.kill();
    };
  }, [config.section, setCurrentSection]);

  return (
    <section ref={sectionRef} className="relative py-20">
      <h2
        ref={titleRef}
        className="mb-12 text-3xl font-bold tracking-tight md:text-5xl"
      >
        <span className={config.accent}>{config.title}</span>
      </h2>

      <ProjectGrid projects={projects} />
    </section>
  );
}

export type { EraConfig };
