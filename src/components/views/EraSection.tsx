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
  bgClass?: string;
  intro: string;
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
      onEnter: () => {
        setCurrentSection(config.section);
        document.querySelectorAll('.era-bg').forEach((el) => el.classList.remove('active'));
        document.getElementById(`era-bg-${config.id}`)?.classList.add('active');
      },
      onEnterBack: () => {
        setCurrentSection(config.section);
        document.querySelectorAll('.era-bg').forEach((el) => el.classList.remove('active'));
        document.getElementById(`era-bg-${config.id}`)?.classList.add('active');
      },
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
  }, [config.section, config.id, setCurrentSection]);

  return (
    <section ref={sectionRef} className="relative">
      <div
        className={`era-bg ${config.bgClass ?? ''}`}
        id={`era-bg-${config.id}`}
      />

      {/* Era intro card */}
      <div className="mb-16 rounded-2xl bg-neutral-50 px-8 py-12 md:px-12 md:py-16">
        <h2
          ref={titleRef}
          className="text-3xl font-bold tracking-tight md:text-5xl font-display"
        >
          <span className={config.accent}>{config.title}</span>
        </h2>
        {config.section.dateRange && (
          <p className="mt-2 text-sm font-medium text-neutral-400">
            {config.section.dateRange}
          </p>
        )}
        <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600">
          {config.intro}
        </p>
      </div>

      {/* Projects */}
      <div className="py-8">
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}

export type { EraConfig };
