'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import ProjectGrid from '@/components/projects/ProjectGrid';
import LogoReveal from '@/components/logo/LogoReveal';
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
  logo: 'Brand identity and logo design across industries.',
  digital: 'App design, UI/UX, and digital product development.',
};

export default function CategoryView() {
  const setCurrentSection = useAppStore((s) => s.setCurrentSection);
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
  }, [categories, setCurrentSection]);

  return (
    <div>
      <div className="sticky top-20 z-30 mb-12 flex flex-wrap gap-2 bg-neutral-100/80 py-3 backdrop-blur-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => scrollToCategory(cat)}
            className="rounded-full bg-neutral-900/5 px-4 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-900/10 hover:text-neutral-900"
          >
            {categoryLabels[cat] ?? cat}
          </button>
        ))}
      </div>

      {categories.map((cat) => {
        const catProjects = getProjectsByCategory(cat);
        const isLogo = cat === 'logo';

        return (
          <section
            key={cat}
            ref={(el) => { sectionRefs.current[cat] = el; }}
            className="py-16"
          >
            <h2 className="mb-10 text-2xl font-bold tracking-tight md:text-4xl font-display">
              {categoryLabels[cat] ?? cat}
            </h2>

            {isLogo ? (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {catProjects.flatMap((p) =>
                  p.images.map((img, i) => (
                    <LogoReveal key={`${p.id}-${i}`} src={img} alt={`${p.title} logo ${i + 1}`} />
                  ))
                )}
              </div>
            ) : (
              <ProjectGrid projects={catProjects} />
            )}
          </section>
        );
      })}
    </div>
  );
}
