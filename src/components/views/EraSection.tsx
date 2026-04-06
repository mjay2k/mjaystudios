'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
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
    <section ref={sectionRef} id={`section-${config.id}`} className="relative">
      <div
        className={`era-bg ${config.bgClass ?? ''}`}
        id={`era-bg-${config.id}`}
      />

      {/* Era intro card */}
      <div className="mb-16 rounded-2xl bg-neutral-50 px-8 py-12 md:px-12 md:py-16">
        <div className="flex flex-col md:flex-row md:gap-12">
          {/* Copy */}
          <div className="flex-1">
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
            <div className="mt-4 max-w-xl space-y-3 text-base leading-relaxed text-neutral-600">
              {config.intro.split('\n').filter(Boolean).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Logos — stacked on the right on desktop, inline on mobile */}
          {config.introImages && config.introImages.length > 0 && (
            <>
              <div className="hidden md:flex flex-col items-center justify-evenly flex-shrink-0 w-40 self-stretch">
                {config.introImages.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt={`${config.title} logo`}
                    width={160}
                    height={80}
                    className="h-auto w-32 object-contain"
                  />
                ))}
              </div>
              <div className="mt-6 flex items-center gap-6 md:hidden">
                {config.introImages.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt={`${config.title} logo`}
                    width={100}
                    height={50}
                    className="h-8 w-auto object-contain opacity-100"
                  />
                ))}
              </div>
            </>
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
