'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import AnimatedGradient from '@/components/ui/AnimatedGradient';
import ProjectGrid from '@/components/projects/ProjectGrid';
import LogoShowcase from '@/components/projects/LogoShowcase';
import { getProjectsByCategory, getAllCategories } from '@/data/projects';
import type { Section } from '@/stores/useAppStore';

const categoryLabels: Record<string, string> = {
  advertising: 'Advertising & Print',
  packaging: 'Packaging Design',
  environmental: 'Booth & Environmental',
  logo: 'Logo Design',
  digital: 'Digital & App Development',
};

const categoryDescriptions: Record<string, string> = {
  advertising: 'Print ads, trade advertising, outdoor campaigns, and digital banners.',
  packaging: 'Product packaging, label design, and packaging systems.',
  environmental: 'Trade show booths, environmental graphics, and spatial design.',
  logo: 'A selection of logos from across my full career — agency, corporate, and freelance. Branding is one of the most satisfying creative challenges: distill a business into a single mark that speaks loudly and does its job from day one.',
  digital: 'App design, UI/UX, and digital product development.',
};

const categoryAccents: Record<string, string> = {};

export default function CategoryView() {
  const setCurrentSection = useAppStore((s) => s.setCurrentSection);
  const theme = useAppStore((s) => s.theme);
  const isDark = theme === 'dark';
  const categories = getAllCategories();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToCategory = (cat: string) => {
    const el = sectionRefs.current[cat];
    if (el) {
      gsap.to(window, {
        scrollTo: { y: el, offsetY: 80 },
        duration: 0.8,
        ease: 'power3.inOut',
      });
    }
  };

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    categories.forEach((cat) => {
      const el = sectionRefs.current[cat];
      if (!el) return;

      const section: Section = {
        id: cat,
        label: categoryLabels[cat] ?? cat,
        description: categoryDescriptions[cat] ?? '',
      };

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 40%',
          end: 'bottom 40%',
          onEnter: () => setCurrentSection(section),
          onEnterBack: () => setCurrentSection(section),
        })
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [categories, setCurrentSection, theme]);

  return (
    <div>
      {/* Category jump nav — sticky below navbar */}
      <div className="sticky top-16 z-30 mb-12 flex flex-wrap gap-2 py-3">
        {categories.map((cat) => {
          const projects = getProjectsByCategory(cat);
          if (projects.length === 0 && cat !== 'logo') return null;
          return (
            <button
              key={cat}
              onClick={() => scrollToCategory(cat)}
              className="rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 bg-white text-neutral-500 hover:text-white"
              style={{ ['--tw-bg-opacity' as string]: 1 }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F15A29'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isDark ? '#222' : 'white'; e.currentTarget.style.color = ''; }}
              ref={(el) => { if (el) el.style.backgroundColor = isDark ? '#222' : 'white'; }}
            >
              {categoryLabels[cat] ?? cat}
            </button>
          );
        })}
      </div>

      {categories.map((cat) => {
        const catProjects = getProjectsByCategory(cat);
        const isLogo = cat === 'logo';

        // Skip empty categories (except logo which has its own showcase)
        if (catProjects.length === 0 && !isLogo) return null;

        return (
          <section
            key={cat}
            ref={(el) => { sectionRefs.current[cat] = el; }}
            className="pt-16 pb-8 md:pt-24 md:pb-12"
          >
            {/* Editorial section header */}
            <div className="relative mb-16 md:mb-20 overflow-hidden rounded-2xl p-8 md:p-12">
              <AnimatedGradient variant="card" />
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight font-display leading-[0.9] mb-4">
                <span className={categoryAccents[cat] || ''} style={!categoryAccents[cat] ? { color: 'var(--color-brand)' } : undefined}>
                  {categoryLabels[cat] ?? cat}
                </span>
              </h2>
              <div className="w-full h-px bg-neutral-200 mb-6" />
              <p className={`text-sm md:text-base max-w-lg ${isDark ? 'text-white/50' : 'text-neutral-500'}`}>
                {categoryDescriptions[cat] ?? ''}
              </p>
            </div>

            {isLogo ? (
              <LogoShowcase hideHeader />
            ) : (
              <ProjectGrid projects={catProjects} />
            )}
          </section>
        );
      })}
    </div>
  );
}
