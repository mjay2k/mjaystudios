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
    introImages: [
      '/portfolio/agency/keller-crescent-logo.png',
      '/portfolio/agency/10over12-logo-v2.png',
    ],
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
    introImages: [
      '/portfolio/berry/berry-global-logo.png',
    ],
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
              className="reveal mt-8 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: 'var(--color-brand)' }}
            >
              About me
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Timeline anchor — invisible marker for scroll tracking */}
      <div ref={introRef} id="section-intro" className="h-px" />

      {/* Era sections with spacing */}
      {eras.map((era) => {
        const eraProjects = getProjectsByEra(era.id as 'agency' | 'berry' | 'afterberry');
        // Skip eras with no projects
        if (eraProjects.length === 0) return (
          <EraSection key={era.id} config={era} projects={[]} />
        );
        return (
          <EraSection
            key={era.id}
            config={era}
            projects={eraProjects}
          />
        );
      })}

      {/* Outro — stronger CTA */}
      <div id="section-contact" className="flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
        <div className="w-12 h-[3px] rounded-full mb-8" style={{ backgroundColor: 'var(--color-brand)' }} />
        <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">
          Let&apos;s <span style={{ color: 'var(--color-brand)' }}>build</span> something.
        </h2>
        <p className="mt-4 max-w-md text-neutral-500">
          Open to freelance, collaboration, and creative opportunities.
        </p>
        <button
          onClick={() => useAppStore.getState().setContactOpen(true)}
          className="mt-8 rounded-full px-10 py-3.5 text-sm font-semibold font-display text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: 'var(--color-brand)' }}
        >
          Get in Touch
        </button>
      </div>
    </div>
  );
}
