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
    bgClass: 'bg-neutral-100',
    intro:
      'It started at Keller — a Louisville agency where bourbon was the business and bold creative was the expectation. Art directing campaigns for Heaven Hill, PAMA, Burnett\'s, Hpnotiq, and Rittenhouse Rye meant learning to sell through design. Every label, every ad, every trade show booth had to earn its space. This is where the eye got trained.',
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
    bgClass: 'bg-neutral-100',
    intro:
      'Berry Global was a different scale — a Fortune 500 packaging company where creative had to work across divisions, continents, and trade shows the size of city blocks. Leading the in-house creative team meant building brand campaigns like EPIC, designing Pack Expo booths that stopped traffic, and making industrial packaging feel like something worth caring about.',
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
    bgClass: 'bg-neutral-100',
    intro:
      'After a decade in corporate creative, I stepped out to teach design — and fell headfirst into AI. What started as curiosity became mastery. I taught myself to build what I could envision, and that led to Bible Warden and News Warden — AI-powered apps designed, developed, and shipped from scratch. The art director learned to code.',
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
          label: 'In the Beginning',
          description: 'Art Director. Designer. Builder.',
        }),
      onEnterBack: () =>
        setCurrentSection({
          id: 'intro',
          label: 'In the Beginning',
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
      {/* Opening — no dates, just the beginning */}
      <div ref={introRef} id="section-intro" className="flex min-h-[60vh] flex-col justify-center py-20">
        <p className="reveal text-sm font-medium uppercase tracking-widest text-neutral-400 mb-4">
          In the Beginning
        </p>
        <h1 className="reveal text-5xl font-bold tracking-tight md:text-7xl font-display">
          Created to Create
        </h1>
        <p className="reveal mt-6 max-w-lg text-lg leading-relaxed text-neutral-500">
          Over a decade of art direction, brand design, and building things that connect.
          From bourbon labels to Fortune 500 campaigns to AI-powered apps — every chapter
          sharpened the eye and expanded what was possible.
        </p>
        <button
          onClick={() => setAboutOpen(true)}
          className="reveal mt-8 self-start text-sm text-neutral-400 underline underline-offset-4 transition-colors hover:text-neutral-900"
        >
          Read more about me
        </button>
      </div>

      {/* Era sections — dates start here */}
      {eras.map((era) => (
        <EraSection
          key={era.id}
          config={era}
          projects={getProjectsByEra(era.id as 'agency' | 'berry' | 'afterberry')}
        />
      ))}

      {/* Outro */}
      <div id="section-contact" className="flex min-h-[40vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-neutral-500">Like what you see?</p>
        <button
          onClick={() => useAppStore.getState().setContactOpen(true)}
          className="mt-4 rounded-full bg-neutral-900/10 px-8 py-3 text-sm font-medium font-display transition-colors hover:bg-neutral-900/15"
        >
          Get in Touch
        </button>
      </div>
    </div>
  );
}
