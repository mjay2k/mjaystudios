'use client';

import { useRef, useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import EraSection from './EraSection';
import type { EraConfig } from './EraSection';
import { getProjectsByEra } from '@/data/projects';

const eras: EraConfig[] = [
  {
    id: 'agency',
    title: 'Agency Life',
    accent: 'text-red-500',
    bgClass: 'bg-neutral-950',
    section: {
      id: 'agency',
      label: 'Agency Life',
      description: 'Art direction and brand design for spirits, beverage, and consumer brands at Keller.',
      dateRange: '2010 — 2017',
    },
  },
  {
    id: 'berry',
    title: 'Berry Life',
    accent: 'text-blue-500',
    bgClass: 'bg-neutral-950',
    section: {
      id: 'berry',
      label: 'Berry Life',
      description: 'Leading creative for packaging, campaigns, and trade shows at Berry Global.',
      dateRange: '2017 — 2023',
    },
  },
  {
    id: 'afterberry',
    title: 'After Berry',
    accent: 'text-orange-500',
    bgClass: 'bg-neutral-950',
    section: {
      id: 'afterberry',
      label: 'After Berry',
      description: 'Teaching design, mastering AI development, and launching Bible Warden and News Warden.',
      dateRange: '2023 — Present',
    },
  },
];

export default function TimelineView() {
  const introRef = useRef<HTMLDivElement>(null);
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);
  const setCurrentSection = useAppStore((s) => s.setCurrentSection);

  useEffect(() => {
    if (!introRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: introRef.current,
      start: 'top 40%',
      end: 'bottom 40%',
      onEnter: () =>
        setCurrentSection({
          id: 'intro',
          label: 'MJay Studios',
          description: 'Art Director. Designer. Builder.',
        }),
      onEnterBack: () =>
        setCurrentSection({
          id: 'intro',
          label: 'MJay Studios',
          description: 'Art Director. Designer. Builder.',
        }),
    });

    gsap.fromTo(
      introRef.current.querySelectorAll('.reveal'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );

    return () => {
      trigger.kill();
    };
  }, [setCurrentSection]);

  return (
    <div>
      <div ref={introRef} className="flex min-h-[60vh] flex-col justify-center py-20">
        <h1 className="reveal text-5xl font-bold tracking-tight md:text-7xl">
          Created to Create
        </h1>
        <p className="reveal mt-4 max-w-md text-lg text-white/50">
          A career in art direction, brand design, and building things that matter.
        </p>
        <button
          onClick={() => setAboutOpen(true)}
          className="reveal mt-6 self-start text-sm text-white/40 underline underline-offset-4 transition-colors hover:text-white"
        >
          Read more about me
        </button>
      </div>

      {eras.map((era) => (
        <EraSection
          key={era.id}
          config={era}
          projects={getProjectsByEra(era.id as 'agency' | 'berry' | 'afterberry')}
        />
      ))}

      <div className="flex min-h-[40vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-white/50">Like what you see?</p>
        <button
          onClick={() => useAppStore.getState().setContactOpen(true)}
          className="mt-4 rounded-full bg-white/10 px-8 py-3 text-sm font-medium transition-colors hover:bg-white/20"
        >
          Get in Touch
        </button>
      </div>
    </div>
  );
}
