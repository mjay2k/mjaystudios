'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
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
      'Started at Keller Crescent as a digital designer building websites and banner ads. Didn\'t have enough digital work to fill the day, so I started contributing to major campaigns — and my concepts started winning. Climbed from junior digital work to art directing national campaigns for Heaven Hill brands including PAMA, Burnett\'s Vodka, and Rittenhouse Rye.\n\nKeller Crescent was a legendary Evansville agency — top 50 in the world in its heyday. I came in during the decline, watched the parent company get bought out and the agency reborn as 10over12 Creative. When that wound down too, I was the last creative standing — a whole floor of the building to myself.',
    section: {
      id: 'agency',
      label: 'Agency Life',
      description: 'From digital designer at Keller Crescent to Art Director at 10over12 Creative.',
      dateRange: '2008 — 2014',
    },
  },
  {
    id: 'berry',
    title: 'Berry Life',
    accent: 'text-blue-500',
    bgClass: 'bg-neutral-100',
    intro:
      'Nine years as Senior Graphic Designer, growing into the creative lead on Berry\'s highest-profile work. National campaigns, packaging design across multiple product lines, large-scale Pack Expo booth designs, annual ESG reports, and sales presentations. If it was important, it was on my desk.',
    section: {
      id: 'berry',
      label: 'Berry Life',
      description: 'Senior Graphic Designer at Berry Global. If it was important, it was on my desk.',
      dateRange: '2015 — 2024',
    },
  },
  {
    id: 'afterberry',
    title: 'After Berry',
    accent: 'text-brand',
    bgClass: 'bg-neutral-100',
    intro:
      'Now combining everything — design, strategy, and AI-powered development. Building apps (Bible Warden, News Warden) and this site from scratch. The next chapter.',
    section: {
      id: 'afterberry',
      label: 'After Berry',
      description: 'Design, strategy, and AI-powered development. The next chapter.',
      dateRange: '2024 — Present',
    },
  },
];

export default function TimelineView() {
  const introRef = useRef<HTMLDivElement>(null);
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);
  const setCurrentSection = useAppStore((s) => s.setCurrentSection);
  const theme = useAppStore((s) => s.theme);

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
      {/* Hero — above the timeline */}
      <div className="flex min-h-[70vh] items-center py-20">
        <div className="flex flex-col md:flex-row md:items-center gap-12 w-full">
          <div className="reveal flex-shrink-0">
            <Image
              src={theme === 'dark' ? '/portfolio/headshot-dark.jpg' : '/portfolio/headshot.jpg'}
              alt="Matthew Johnson"
              width={280}
              height={280}
              className="rounded-2xl object-cover w-48 h-48 md:w-64 md:h-64"
              priority
            />
          </div>
          <div className="flex-1">
            <h1 className="reveal text-5xl font-bold tracking-tight md:text-7xl font-display">
              Created to <span style={{ color: 'var(--color-brand)' }}>Create</span>
            </h1>
            <p className="reveal mt-6 max-w-lg text-lg leading-relaxed text-neutral-500">
              15+ years bridging art direction, brand strategy, and digital innovation.
              From bourbon labels to Fortune 500 campaigns to AI-powered apps —
              recognized with 4 Silver ADDY Awards along the way.
            </p>
            <button
              onClick={() => setAboutOpen(true)}
              className="reveal mt-8 self-start text-sm text-neutral-400 underline underline-offset-4 transition-colors hover:text-neutral-900"
            >
              Read more about me
            </button>
          </div>
        </div>
      </div>

      {/* Timeline starts here — "In the Beginning" is the first marker */}
      <div ref={introRef} id="section-intro" className="py-8">
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-400 mb-2 font-body">
          In the Beginning
        </p>
      </div>

      {/* Era sections */}
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
