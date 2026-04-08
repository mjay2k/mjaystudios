'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import AnimatedGradient from '@/components/ui/AnimatedGradient';
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
  introImages?: string[];
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
    <section ref={sectionRef} id={`section-${config.id}`} className="relative pt-16 md:pt-28">
      <div
        className={`era-bg ${config.bgClass ?? ''}`}
        id={`era-bg-${config.id}`}
      />

      {/* Era intro — editorial style */}
      <div className="relative mb-20 md:mb-28 overflow-hidden rounded-2xl p-8 md:p-12">
        <AnimatedGradient variant="card" />
        {/* Large era title as visual moment */}
        <div className="flex items-end gap-4 mb-6">
          <h2
            ref={titleRef}
            className="text-5xl md:text-8xl font-bold tracking-tight font-display leading-[0.9]"
          >
            <span className={config.accent}>{config.title}</span>
          </h2>
          {config.section.dateRange && (
            <span className="text-sm font-medium text-neutral-400 pb-1 md:pb-2">
              {config.section.dateRange}
            </span>
          )}
        </div>

        {/* Divider line */}
        <div className="w-full h-px bg-neutral-200 mb-8" />

        {/* Copy + logos side by side */}
        <div className="flex flex-col md:flex-row md:gap-16">
          <div className="flex-1 max-w-2xl space-y-4 text-[13px] md:text-[15px] leading-relaxed text-neutral-500">
            {config.intro.split('\n').filter(Boolean).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {config.introImages && config.introImages.length > 0 && (
            <div className="flex md:flex-col items-center justify-center gap-6 mt-6 md:mt-0 flex-shrink-0 md:w-40 rounded-2xl p-4 border border-neutral-200/30 backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              {config.introImages.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`${config.title} logo`}
                  width={140}
                  height={70}
                  className="h-10 md:h-auto md:w-28 w-auto object-contain opacity-50"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Projects */}
      <div className="py-8">
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}

export type { EraConfig };
