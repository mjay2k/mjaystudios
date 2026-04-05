# Portfolio Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a scroll-driven art director portfolio with a persistent shell, two swappable content views (Timeline and Category), parallax timeline rail, floating info panel, and fullscreen project detail overlays.

**Architecture:** Single Next.js page with a persistent shell (nav, timeline rail, floating info panel) that never unmounts. Two content view components swap in/out based on a Zustand-managed view toggle. GSAP ScrollTrigger drives all scroll-based animations including parallax, era transitions, and the logo reveal effect.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS 4, GSAP 3 + ScrollTrigger, Zustand 5, TypeScript

**Spec:** `docs/superpowers/specs/2026-04-05-portfolio-timeline-design.md`

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout, font loading, metadata
│   ├── page.tsx                      # Single page — mounts Shell
│   └── globals.css                   # Tailwind + global resets + font-face
├── components/
│   ├── shell/
│   │   ├── Shell.tsx                 # Persistent wrapper: nav + rail + info panel + content area
│   │   ├── NavBar.tsx                # Top nav: wordmark, view toggle, about, contact
│   │   ├── ViewToggle.tsx            # Animated switch between Timeline / By Type
│   │   ├── TimelineRail.tsx          # Dashed vertical line + parallax hash markers
│   │   └── InfoPanel.tsx             # Floating panel with animated content swaps
│   ├── views/
│   │   ├── TimelineView.tsx          # Chronological content: intro, 3 eras, outro
│   │   ├── CategoryView.tsx          # Content grouped by work discipline
│   │   └── EraSection.tsx            # Single era block with background + projects
│   ├── projects/
│   │   ├── ProjectCard.tsx           # Single/campaign item display with auto-cycle
│   │   ├── ProjectGrid.tsx           # Staggered layout of ProjectCards
│   │   └── FullscreenDetail.tsx      # Fullscreen overlay with nav controls
│   ├── popups/
│   │   ├── Modal.tsx                 # Shared modal shell (scale/fade animation)
│   │   ├── AboutPopup.tsx            # About content inside Modal
│   │   └── ContactPopup.tsx          # Contact content inside Modal
│   └── logo/
│       └── LogoReveal.tsx            # Scroll-driven white-to-black logo reveal
├── data/
│   └── projects.ts                   # All project data (Project[] array)
├── lib/
│   └── gsap.ts                       # GSAP + ScrollTrigger registration
└── stores/
    └── useAppStore.ts                # Zustand: activeView, currentSection, scrollProgress
```

---

## Task 1: Clean Up Dependencies and Create Fresh src/

Remove Three.js dependencies from the old approach and create the new source directory structure.

**Files:**
- Modify: `package.json`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`

- [ ] **Step 1: Remove Three.js packages**

```bash
npm uninstall three @react-three/fiber @react-three/drei @types/three
```

- [ ] **Step 2: Register GSAP ScrollTrigger plugin**

We need the ScrollTrigger plugin. GSAP 3.14 includes it but it needs explicit registration.

```bash
npm install gsap@^3.14.2
```

Verify `gsap` and `@gsap/react` are still in package.json dependencies.

- [ ] **Step 3: Create `src/lib/gsap.ts`**

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
```

- [ ] **Step 4: Create `src/app/globals.css`**

```css
@import 'tailwindcss';

html,
body {
  overflow-x: hidden;
}

/* Smooth scroll for GSAP ScrollTrigger */
html {
  scroll-behavior: auto;
}
```

- [ ] **Step 5: Create `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MJay Studios — Art Director Portfolio',
  description:
    'Portfolio of Matthew Johnson — Art Director, Designer, AI Developer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Create `src/app/page.tsx`**

```tsx
'use client';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">MJay Studios</h1>
    </main>
  );
}
```

- [ ] **Step 7: Verify the dev server runs**

```bash
npm run dev
```

Open http://localhost:3000 — should show "MJay Studios" centered on a dark background.

- [ ] **Step 8: Commit**

```bash
git add src/ package.json package-lock.json src/lib/gsap.ts
git commit -m "feat: scaffold fresh src with cleaned dependencies"
```

---

## Task 2: Zustand Store

**Files:**
- Create: `src/stores/useAppStore.ts`

- [ ] **Step 1: Create the store**

```typescript
import { create } from 'zustand';

type ActiveView = 'timeline' | 'category';

interface Section {
  id: string;
  label: string;
  description: string;
  dateRange?: string;
}

interface AppState {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;

  currentSection: Section | null;
  setCurrentSection: (section: Section | null) => void;

  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

  aboutOpen: boolean;
  setAboutOpen: (open: boolean) => void;

  contactOpen: boolean;
  setContactOpen: (open: boolean) => void;

  detailProject: string | null; // project id or null
  setDetailProject: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeView: 'timeline',
  setActiveView: (view) => set({ activeView: view }),

  currentSection: null,
  setCurrentSection: (section) => set({ currentSection: section }),

  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),

  aboutOpen: false,
  setAboutOpen: (open) => set({ aboutOpen: open }),

  contactOpen: false,
  setContactOpen: (open) => set({ contactOpen: open }),

  detailProject: null,
  setDetailProject: (id) => set({ detailProject: id }),
}));

export type { ActiveView, Section, AppState };
```

- [ ] **Step 2: Commit**

```bash
git add src/stores/useAppStore.ts
git commit -m "feat: add Zustand store for app state"
```

---

## Task 3: Project Data Model and Seed Data

**Files:**
- Create: `src/data/projects.ts`

- [ ] **Step 1: Create the data file with type and initial entries**

```typescript
export interface CaseStudy {
  extendedDescription: string;
  additionalImages: string[];
  processNotes?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  year: number;
  era: 'agency' | 'berry' | 'afterberry';
  categories: string[];
  images: string[];
  autoCycle: boolean;
  caseStudy?: CaseStudy;
  sortOrder: number;
}

export const projects: Project[] = [
  // === ERA: AGENCY LIFE ===
  {
    id: 'heaven-hill-brands',
    title: 'Heaven Hill Brands',
    description: 'Bourbon and spirits branding, packaging, and advertising campaigns.',
    year: 2012,
    era: 'agency',
    categories: ['advertising', 'packaging'],
    images: [
      '/portfolio/agency/25604_HH.jpg',
      '/portfolio/agency/25608_HH.jpg',
      '/portfolio/agency/25610_HH.jpg',
      '/portfolio/agency/25620_HH.jpg',
      '/portfolio/agency/25623_HH.jpg',
    ],
    autoCycle: true,
    sortOrder: 1,
  },
  {
    id: 'heaven-hill-carousel',
    title: 'Heaven Hill Digital Campaign',
    description: 'Digital carousel ads for Heaven Hill portfolio brands.',
    year: 2013,
    era: 'agency',
    categories: ['advertising'],
    images: [
      '/portfolio/agency/HH_Caro_1.jpg',
      '/portfolio/agency/HH_Caro_2.jpg',
      '/portfolio/agency/HH_Caro_3.jpg',
      '/portfolio/agency/HH_Caro_4.jpg',
      '/portfolio/agency/HH_Caro_5.jpg',
      '/portfolio/agency/HH_Caro_6.jpg',
    ],
    autoCycle: true,
    sortOrder: 2,
  },
  {
    id: 'pama-liqueur',
    title: 'PAMA Pomegranate Liqueur',
    description: 'Trade advertising, outdoor, truck wrap, and Valentine campaign.',
    year: 2013,
    era: 'agency',
    categories: ['advertising', 'packaging'],
    images: [
      '/portfolio/agency/PAMA_TradeAd.jpg',
      '/portfolio/agency/PAMA_TruckWrap.jpg',
      '/portfolio/agency/PAMA-outdoor1.jpg',
      '/portfolio/agency/PAMAValentineAd.jpg',
      '/portfolio/agency/PAMA-JUMBO-28379.jpg',
    ],
    autoCycle: true,
    sortOrder: 3,
  },
  {
    id: 'rittenhouse-rye',
    title: 'Rittenhouse Rye',
    description: 'Label redesign, packaging, and product photography for Rittenhouse Rye whiskey.',
    year: 2014,
    era: 'agency',
    categories: ['packaging'],
    images: [
      '/portfolio/agency/RITTENHOUSE_newlabel.jpg',
      '/portfolio/agency/rittenhouse_rye.jpg',
      '/portfolio/agency/rittenhouse_rye_drama.jpg',
      '/portfolio/agency/RittenhouseCaseMockup.jpg',
      '/portfolio/agency/RittenhouseLabel_UPDATED3.jpg',
    ],
    autoCycle: true,
    sortOrder: 4,
  },
  {
    id: 'burnetts-vodka',
    title: "Burnett's Vodka",
    description: 'Recipe book design, candy poster, and outdoor advertising.',
    year: 2014,
    era: 'agency',
    categories: ['advertising', 'packaging'],
    images: [
      '/portfolio/agency/1of3_BurnettsRecipeBook_Cvr.jpg',
      '/portfolio/agency/2of3_BurnettsRecipeBook_Index.jpg',
      '/portfolio/agency/3of3_BurnettsRecipeBook_Spread.jpg',
      '/portfolio/agency/BURNETTS__HH_CandyPoster.jpg',
      '/portfolio/agency/Burn-outdoor1.jpg',
      '/portfolio/agency/Burn-outdoor2.jpg',
    ],
    autoCycle: true,
    sortOrder: 5,
  },
  {
    id: 'hpnotiq-sparkle',
    title: 'Hpnotiq Sparkle',
    description: 'Sparkle ad campaign and Endless Summer holiday promotions.',
    year: 2015,
    era: 'agency',
    categories: ['advertising'],
    images: [
      '/portfolio/agency/28819_SparkleAd.jpg',
      '/portfolio/agency/25907_endlessOHoliday.jpg',
      '/portfolio/agency/25907_endlessOriginal.jpg',
    ],
    autoCycle: true,
    sortOrder: 6,
  },

  // === ERA: BERRY LIFE ===
  {
    id: 'epic-campaign',
    title: 'EPIC Brand Campaign',
    description: 'Four-part brand values campaign — Engaging, Protective, Innovative, Committed.',
    year: 2018,
    era: 'berry',
    categories: ['advertising'],
    images: [
      '/portfolio/berry/EPIC-agile-BerryAd.png',
      '/portfolio/berry/EPIC-engaging-BerryAd.png',
      '/portfolio/berry/EPIC-spec-BerryAd.png',
      '/portfolio/berry/EPIC-unique-BerryAd.png',
    ],
    autoCycle: true,
    sortOrder: 1,
  },
  {
    id: 'verdant-campaign',
    title: 'Verdant Goodbye',
    description: 'Sustainability-focused brand ad for Berry Global.',
    year: 2019,
    era: 'berry',
    categories: ['advertising'],
    images: ['/portfolio/berry/VerdantGoodbye_BerryAd.png'],
    autoCycle: false,
    sortOrder: 2,
  },
  {
    id: 'resinite-packaging',
    title: 'Resinite Packaging',
    description: 'Product packaging design for Resinite film brand.',
    year: 2019,
    era: 'berry',
    categories: ['packaging'],
    images: [
      '/portfolio/berry/RESINITE-packaging.png',
      '/portfolio/berry/RESINITE-packaging2.png',
    ],
    autoCycle: true,
    sortOrder: 3,
  },
  {
    id: 'protect-campaign',
    title: 'Protect Campaign',
    description: 'Product protection focused advertising for Berry Global.',
    year: 2020,
    era: 'berry',
    categories: ['advertising'],
    images: ['/portfolio/berry/Protect_BerryAd.png'],
    autoCycle: false,
    sortOrder: 4,
  },
  {
    id: 'pack-expo-booths',
    title: 'Pack Expo Trade Show Booths',
    description: 'Booth design and environmental graphics for Pack Expo 2018, 2019, and 2022.',
    year: 2018,
    era: 'berry',
    categories: ['environmental'],
    images: [
      '/portfolio/berry/4584_booth-design.png',
      '/portfolio/berry/2018PackExpoBoothimages1.jpg',
      '/portfolio/berry/2018PackExpoBoothimages2.jpg',
      '/portfolio/berry/2019_Pack-Expo.jpg',
      '/portfolio/berry/2022_Pack-Expo.png',
      '/portfolio/berry/Pack-Expo-Mockup.jpg',
      '/portfolio/berry/4794_booth-02.jpg',
    ],
    autoCycle: true,
    sortOrder: 5,
  },
  {
    id: 'cannabis-kit',
    title: 'Cannabis Packaging Kit',
    description: 'Packaging solutions kit for cannabis industry.',
    year: 2020,
    era: 'berry',
    categories: ['packaging'],
    images: ['/portfolio/berry/5824_Cannabis-Kit.jpg'],
    autoCycle: false,
    sortOrder: 6,
  },
  {
    id: 'delizioso-packaging',
    title: 'Delizioso Ice Cream Packaging',
    description: 'Premium ice cream packaging design concept.',
    year: 2020,
    era: 'berry',
    categories: ['packaging'],
    images: ['/portfolio/berry/Delizioso_icecream_packaging.png'],
    autoCycle: false,
    sortOrder: 7,
  },
  {
    id: 'berry-mosaic',
    title: 'Berry Global Mosaic',
    description: 'Collaborative employee mosaic project for Berry Global.',
    year: 2021,
    era: 'berry',
    categories: ['environmental'],
    images: ['/portfolio/berry/4376_mosaic.jpg'],
    autoCycle: false,
    sortOrder: 8,
  },

  // === ERA: AFTER BERRY ===
  {
    id: 'bible-warden',
    title: 'Bible Warden',
    description: 'AI-powered Bible study app — concept, design, and development.',
    year: 2025,
    era: 'afterberry',
    categories: ['digital'],
    images: ['/portfolio/afterberry/bible-warden-placeholder.jpg'],
    autoCycle: false,
    sortOrder: 1,
  },
  {
    id: 'news-warden',
    title: 'News Warden',
    description: 'AI-powered news aggregation and analysis app.',
    year: 2025,
    era: 'afterberry',
    categories: ['digital'],
    images: ['/portfolio/afterberry/news-warden-placeholder.jpg'],
    autoCycle: false,
    sortOrder: 2,
  },

  // === LOGOS (spans eras, shown in Category view) ===
  {
    id: 'logo-designs',
    title: 'Logo Design Collection',
    description: 'Brand identity designs across multiple industries.',
    year: 2015,
    era: 'agency',
    categories: ['logo'],
    images: [
      '/portfolio/logos/mjLogoDesign_bornand.png',
      '/portfolio/logos/mjLogoDesign_CIH.png',
      '/portfolio/logos/mjLogoDesign_cleanstream.png',
      '/portfolio/logos/mjLogoDesign_community.png',
      '/portfolio/logos/mjLogoDesign_don.png',
      '/portfolio/logos/mjLogoDesign_elastifit.png',
      '/portfolio/logos/mjLogoDesign_flip.png',
      '/portfolio/logos/mjLogoDesign_letgo.png',
      '/portfolio/logos/mjLogoDesign_luster.png',
      '/portfolio/logos/mjLogoDesign_magnolia.png',
      '/portfolio/logos/mjLogoDesign_plastic.png',
      '/portfolio/logos/mjLogoDesign_rodeo.png',
      '/portfolio/logos/mjLogoDesign_sleepguard.png',
      '/portfolio/logos/mjLogoDesign_spark.png',
    ],
    autoCycle: false,
    sortOrder: 10,
  },
];

// Helper: get projects for a given era, sorted
export function getProjectsByEra(era: Project['era']): Project[] {
  return projects
    .filter((p) => p.era === era)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

// Helper: get projects for a given category, sorted
export function getProjectsByCategory(category: string): Project[] {
  return projects
    .filter((p) => p.categories.includes(category))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

// Helper: get all unique categories
export function getAllCategories(): string[] {
  const cats = new Set<string>();
  projects.forEach((p) => p.categories.forEach((c) => cats.add(c)));
  return Array.from(cats);
}

// Helper: find project by id
export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
```

Note: The image paths above reference files that need to be organized into `public/portfolio/`. This is handled in the image organization step below. Placeholder paths for Bible Warden and News Warden should be updated when those assets are available.

- [ ] **Step 2: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add project data model and seed data"
```

---

## Task 4: Organize Portfolio Images into public/

Copy the best resolution of each image from `portfolio files/` into organized subdirectories under `public/portfolio/`.

**Files:**
- Create: `public/portfolio/agency/` (directory)
- Create: `public/portfolio/berry/` (directory)
- Create: `public/portfolio/afterberry/` (directory)
- Create: `public/portfolio/logos/` (directory)

- [ ] **Step 1: Create directories**

```bash
mkdir -p public/portfolio/{agency,berry,afterberry,logos}
```

- [ ] **Step 2: Copy agency era images (originals, not thumbnails)**

Copy only the original resolution files (no `-150x150`, `-300x204`, `-768x`, `-1024x`, `-scaled` variants):

```bash
# Heaven Hill
cp "portfolio files/25604_HH.jpg" public/portfolio/agency/
cp "portfolio files/25608_HH.jpg" public/portfolio/agency/
cp "portfolio files/25610_HH.jpg" public/portfolio/agency/
cp "portfolio files/25620_HH.jpg" public/portfolio/agency/
cp "portfolio files/25623_HH.jpg" public/portfolio/agency/
cp "portfolio files/HH_Caro_1.jpg" public/portfolio/agency/
cp "portfolio files/HH_Caro_2.jpg" public/portfolio/agency/
cp "portfolio files/HH_Caro_3.jpg" public/portfolio/agency/
cp "portfolio files/HH_Caro_4.jpg" public/portfolio/agency/
cp "portfolio files/HH_Caro_5.jpg" public/portfolio/agency/
cp "portfolio files/HH_Caro_6.jpg" public/portfolio/agency/

# PAMA
cp "portfolio files/PAMA_TradeAd.jpg" public/portfolio/agency/
cp "portfolio files/PAMA_TruckWrap.jpg" public/portfolio/agency/
cp "portfolio files/PAMA-outdoor1.jpg" public/portfolio/agency/
cp "portfolio files/PAMAValentineAd.jpg" public/portfolio/agency/
cp "portfolio files/PAMA-JUMBO-28379.jpg" public/portfolio/agency/
cp "portfolio files/Pama_HH25046_3rdpage.jpg" public/portfolio/agency/

# Rittenhouse
cp "portfolio files/RITTENHOUSE_newlabel.jpg" public/portfolio/agency/
cp "portfolio files/rittenhouse_rye.jpg" public/portfolio/agency/
cp "portfolio files/rittenhouse_rye_drama.jpg" public/portfolio/agency/
cp "portfolio files/RittenhouseCaseMockup.jpg" public/portfolio/agency/
cp "portfolio files/RittenhouseLabel_UPDATED3.jpg" public/portfolio/agency/

# Burnett's
cp "portfolio files/1of3_BurnettsRecipeBook_Cvr.jpg" public/portfolio/agency/
cp "portfolio files/2of3_BurnettsRecipeBook_Index.jpg" public/portfolio/agency/
cp "portfolio files/3of3_BurnettsRecipeBook_Spread.jpg" public/portfolio/agency/
cp "portfolio files/BURNETTS__HH_CandyPoster.jpg" public/portfolio/agency/
cp "portfolio files/Burn-outdoor1.jpg" public/portfolio/agency/
cp "portfolio files/Burn-outdoor2.jpg" public/portfolio/agency/

# Hpnotiq
cp "portfolio files/28819_SparkleAd.jpg" public/portfolio/agency/
cp "portfolio files/25907_endlessOHoliday.jpg" public/portfolio/agency/
cp "portfolio files/25907_endlessOriginal.jpg" public/portfolio/agency/

# Shelf talker
cp "portfolio files/shelftalker-1.jpg" public/portfolio/agency/
```

- [ ] **Step 3: Copy Berry era images**

```bash
# EPIC campaign
cp "portfolio files/obs/Ads/EPIC-agile-BerryAd.png" public/portfolio/berry/
cp "portfolio files/obs/Ads/EPIC-engaging-BerryAd.png" public/portfolio/berry/
cp "portfolio files/obs/Ads/EPIC-spec-BerryAd.png" public/portfolio/berry/
cp "portfolio files/obs/Ads/EPIC-unique-BerryAd.png" public/portfolio/berry/

# Other Berry ads
cp "portfolio files/obs/Ads/VerdantGoodbye_BerryAd.png" public/portfolio/berry/
cp "portfolio files/obs/Ads/Protect_BerryAd.png" public/portfolio/berry/
cp "portfolio files/obs/Ads/3003_a-lot_BerryAd.png" public/portfolio/berry/

# Packaging
cp "portfolio files/RESINITE-packaging.png" public/portfolio/berry/
cp "portfolio files/RESINITE-packaging2.png" public/portfolio/berry/
cp "portfolio files/5824_Cannabis-Kit.jpg" public/portfolio/berry/
cp "portfolio files/Delizioso_icecream_packaging.png" public/portfolio/berry/

# Pack Expo
cp "portfolio files/4584_booth-design.png" public/portfolio/berry/
cp "portfolio files/2018PackExpoBoothimages1.jpg" public/portfolio/berry/
cp "portfolio files/2018PackExpoBoothimages2.jpg" public/portfolio/berry/
cp "portfolio files/2019_Pack-Expo.jpg" public/portfolio/berry/
cp "portfolio files/2022_Pack-Expo.png" public/portfolio/berry/
cp "portfolio files/Pack-Expo-Mockup.jpg" public/portfolio/berry/
cp "portfolio files/4794_booth-02.jpg" public/portfolio/berry/

# Mosaic
cp "portfolio files/4376_mosaic.jpg" public/portfolio/berry/

# Calendar
cp "portfolio files/4881_calendar_preview.jpg" public/portfolio/berry/
```

- [ ] **Step 4: Copy logo files**

```bash
cp "portfolio files/obs/logos/mjLogoDesign_bornand.png" public/portfolio/logos/
cp "portfolio files/obs/logos/mjLogoDesign_CIH.png" public/portfolio/logos/
cp "portfolio files/obs/logos/mjLogoDesign_cleanstream.png" public/portfolio/logos/
cp "portfolio files/obs/logos/mjLogoDesign_community.png" public/portfolio/logos/
cp "portfolio files/obs/logos/mjLogoDesign_don.png" public/portfolio/logos/
cp "portfolio files/obs/logos/mjLogoDesign_elastifit.png" public/portfolio/logos/
cp "portfolio files/obs/logos/mjLogoDesign_flip.png" public/portfolio/logos/
cp "portfolio files/obs/logos/mjLogoDesign_letgo.png" public/portfolio/logos/
cp "portfolio files/obs/logos/mjLogoDesign_luster.png" public/portfolio/logos/
cp "portfolio files/obs/logos/mjLogoDesign_magnolia.png" public/portfolio/logos/
cp "portfolio files/obs/logos/mjLogoDesign_plastic.png" public/portfolio/logos/
cp "portfolio files/obs/logos/mjLogoDesign_rodeo.png" public/portfolio/logos/
cp "portfolio files/obs/logos/mjLogoDesign_sleepguard.png" public/portfolio/logos/
cp "portfolio files/obs/logos/mjLogoDesign_spark.png" public/portfolio/logos/
cp "portfolio files/obs/logos/mjaystudios-logo.svg" public/portfolio/logos/
```

- [ ] **Step 5: Create placeholder files for After Berry era**

```bash
# These will be replaced with real screenshots later
touch public/portfolio/afterberry/.gitkeep
```

- [ ] **Step 6: Verify all images referenced in projects.ts exist**

```bash
cd /Users/matthewjohnson/Documents/mjaystudios
node -e "
const { projects } = require('./src/data/projects.ts') || {};
// Quick manual check:
const fs = require('fs');
const missing = [];
const imgs = [
  'public/portfolio/agency/25604_HH.jpg',
  'public/portfolio/agency/PAMA_TradeAd.jpg',
  'public/portfolio/berry/EPIC-agile-BerryAd.png',
  'public/portfolio/logos/mjLogoDesign_bornand.png',
];
imgs.forEach(f => { if (!fs.existsSync(f)) missing.push(f); });
console.log(missing.length ? 'MISSING: ' + missing.join(', ') : 'All spot-checked images present');
"
```

- [ ] **Step 7: Commit**

```bash
git add public/portfolio/
git commit -m "feat: organize portfolio images into public directory"
```

---

## Task 5: Shell — NavBar and ViewToggle

**Files:**
- Create: `src/components/shell/NavBar.tsx`
- Create: `src/components/shell/ViewToggle.tsx`

- [ ] **Step 1: Create `src/components/shell/ViewToggle.tsx`**

```tsx
'use client';

import { useAppStore } from '@/stores/useAppStore';
import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export default function ViewToggle() {
  const activeView = useAppStore((s) => s.activeView);
  const setActiveView = useAppStore((s) => s.setActiveView);
  const pillRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pillRef.current || !containerRef.current) return;
    const buttons = containerRef.current.querySelectorAll('button');
    const activeButton = activeView === 'timeline' ? buttons[0] : buttons[1];

    gsap.to(pillRef.current, {
      x: activeButton.offsetLeft,
      width: activeButton.offsetWidth,
      duration: 0.4,
      ease: 'power3.out',
    });
  }, [activeView]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center rounded-full bg-white/10 p-1 backdrop-blur-sm"
    >
      <div
        ref={pillRef}
        className="absolute top-1 left-0 h-[calc(100%-8px)] rounded-full bg-white/20"
      />
      <button
        onClick={() => setActiveView('timeline')}
        className={`relative z-10 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-colors ${
          activeView === 'timeline' ? 'text-white' : 'text-white/50'
        }`}
      >
        Timeline
      </button>
      <button
        onClick={() => setActiveView('category')}
        className={`relative z-10 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-colors ${
          activeView === 'category' ? 'text-white' : 'text-white/50'
        }`}
      >
        By Type
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/shell/NavBar.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import ViewToggle from './ViewToggle';

export default function NavBar() {
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);
  const setContactOpen = useAppStore((s) => s.setContactOpen);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-neutral-950/60">
      {/* Wordmark */}
      <span className="text-lg font-bold tracking-tight">MJay Studios</span>

      {/* Desktop: toggle + links */}
      <div className="hidden items-center gap-6 md:flex">
        <ViewToggle />
        <button
          onClick={() => setAboutOpen(true)}
          className="text-sm text-white/70 transition-colors hover:text-white"
        >
          About
        </button>
        <button
          onClick={() => setContactOpen(true)}
          className="text-sm text-white/70 transition-colors hover:text-white"
        >
          Contact
        </button>
      </div>

      {/* Mobile: toggle always visible + hamburger */}
      <div className="flex items-center gap-4 md:hidden">
        <ViewToggle />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1"
          aria-label="Menu"
        >
          <span
            className={`h-0.5 w-5 bg-white transition-transform ${menuOpen ? 'translate-y-1.5 rotate-45' : ''}`}
          />
          <span
            className={`h-0.5 w-5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-0.5 w-5 bg-white transition-transform ${menuOpen ? '-translate-y-1.5 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="absolute top-full right-0 left-0 flex flex-col gap-4 bg-neutral-950/95 px-6 py-4 backdrop-blur-md md:hidden">
          <button
            onClick={() => {
              setAboutOpen(true);
              setMenuOpen(false);
            }}
            className="text-left text-sm text-white/70 hover:text-white"
          >
            About
          </button>
          <button
            onClick={() => {
              setContactOpen(true);
              setMenuOpen(false);
            }}
            className="text-left text-sm text-white/70 hover:text-white"
          >
            Contact
          </button>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 3: Verify NavBar renders**

Update `src/app/page.tsx` temporarily:

```tsx
'use client';

import NavBar from '@/components/shell/NavBar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <div className="flex h-screen items-center justify-center pt-16">
        <h1 className="text-4xl font-bold">MJay Studios</h1>
      </div>
    </main>
  );
}
```

Run `npm run dev` and verify: wordmark on left, toggle + About + Contact on right. Toggle pill slides between states. Mobile hamburger works at narrow widths.

- [ ] **Step 4: Commit**

```bash
git add src/components/shell/NavBar.tsx src/components/shell/ViewToggle.tsx src/app/page.tsx
git commit -m "feat: add NavBar with ViewToggle and mobile hamburger"
```

---

## Task 6: Shell — Timeline Rail

**Files:**
- Create: `src/components/shell/TimelineRail.tsx`

- [ ] **Step 1: Create `src/components/shell/TimelineRail.tsx`**

```tsx
'use client';

import { useRef, useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface Marker {
  id: string;
  label: string;
  position: number; // 0-1 normalized position along the rail
}

interface TimelineRailProps {
  markers: Marker[];
}

export default function TimelineRail({ markers }: TimelineRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!markersRef.current) return;

    // Parallax: markers scroll at 0.6x speed of content
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (!markersRef.current) return;
        gsap.set(markersRef.current, {
          y: self.progress * -200, // slower scroll offset
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={railRef}
      className="fixed top-0 left-0 z-40 hidden h-full w-16 md:block"
    >
      {/* Dashed line */}
      <div className="absolute top-20 bottom-8 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-white/20" />

      {/* Markers */}
      <div ref={markersRef} className="relative h-full">
        {markers.map((marker) => (
          <div
            key={marker.id}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `${marker.position * 100}%` }}
          >
            {/* Hash mark */}
            <div className="h-px w-4 bg-white/40" />
            {/* Label */}
            <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-medium tracking-wider text-white/40 uppercase">
              {marker.label}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile: narrower version */}
    </div>
  );
}

// Mobile variant
export function TimelineRailMobile({ markers }: TimelineRailProps) {
  return (
    <div className="fixed top-0 left-0 z-40 block h-full w-8 md:hidden">
      <div className="absolute top-20 bottom-8 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-white/15" />
      <div className="relative h-full">
        {markers.map((marker) => (
          <div
            key={marker.id}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `${marker.position * 100}%` }}
          >
            <div className="h-px w-2 bg-white/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

export type { Marker };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/shell/TimelineRail.tsx
git commit -m "feat: add TimelineRail with parallax hash markers"
```

---

## Task 7: Shell — Floating Info Panel

**Files:**
- Create: `src/components/shell/InfoPanel.tsx`

- [ ] **Step 1: Create `src/components/shell/InfoPanel.tsx`**

```tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { gsap } from '@/lib/gsap';

export default function InfoPanel() {
  const currentSection = useAppStore((s) => s.currentSection);
  const activeView = useAppStore((s) => s.activeView);
  const contentRef = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState(currentSection);

  // Mobile expand/collapse
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!contentRef.current || !currentSection) return;

    // Animate out, swap content, animate in
    const tl = gsap.timeline();
    tl.to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => setDisplayed(currentSection),
    }).to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out',
    });

    return () => {
      tl.kill();
    };
  }, [currentSection]);

  if (!displayed) return null;

  return (
    <>
      {/* Desktop: fixed panel */}
      <div className="fixed top-28 left-20 z-40 hidden w-48 md:block">
        <div ref={contentRef}>
          <h3 className="text-sm font-bold tracking-wide uppercase text-white/80">
            {displayed.label}
          </h3>
          {displayed.dateRange && (
            <p className="mt-1 text-xs text-white/40">{displayed.dateRange}</p>
          )}
          <p className="mt-2 text-xs leading-relaxed text-white/50">
            {displayed.description}
          </p>
        </div>
      </div>

      {/* Mobile: sticky bottom card */}
      <div className="fixed bottom-0 right-0 left-0 z-40 block md:hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full bg-neutral-900/95 px-4 py-3 text-left backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wide uppercase text-white/80">
              {displayed.label}
            </span>
            <span
              className={`text-white/40 transition-transform text-xs ${expanded ? 'rotate-180' : ''}`}
            >
              ^
            </span>
          </div>
          {expanded && (
            <div className="mt-2">
              {displayed.dateRange && (
                <p className="text-xs text-white/40">{displayed.dateRange}</p>
              )}
              <p className="mt-1 text-xs leading-relaxed text-white/50">
                {displayed.description}
              </p>
            </div>
          )}
        </button>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/shell/InfoPanel.tsx
git commit -m "feat: add floating InfoPanel with animated content swaps"
```

---

## Task 8: Shell — Assemble Shell Component

**Files:**
- Create: `src/components/shell/Shell.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/shell/Shell.tsx`**

```tsx
'use client';

import { ReactNode } from 'react';
import NavBar from './NavBar';
import TimelineRail, { TimelineRailMobile, Marker } from './TimelineRail';
import InfoPanel from './InfoPanel';

interface ShellProps {
  markers: Marker[];
  children: ReactNode;
}

export default function Shell({ markers, children }: ShellProps) {
  return (
    <div className="relative min-h-screen">
      <NavBar />
      <TimelineRail markers={markers} />
      <TimelineRailMobile markers={markers} />
      <InfoPanel />

      {/* Content area: offset for rail on desktop, narrower offset on mobile */}
      <div className="ml-8 pt-20 md:ml-64">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update `src/app/page.tsx` to use Shell**

```tsx
'use client';

import Shell from '@/components/shell/Shell';
import type { Marker } from '@/components/shell/TimelineRail';

const placeholderMarkers: Marker[] = [
  { id: 'agency', label: 'Agency Life', position: 0.15 },
  { id: 'berry', label: 'Berry Life', position: 0.45 },
  { id: 'afterberry', label: 'After Berry', position: 0.75 },
];

export default function Home() {
  return (
    <Shell markers={placeholderMarkers}>
      {/* Placeholder content to test scroll */}
      <div className="space-y-96 py-20">
        <section className="h-screen">
          <h2 className="text-3xl font-bold">Agency Life</h2>
          <p className="mt-4 text-white/50">Keller era work goes here</p>
        </section>
        <section className="h-screen">
          <h2 className="text-3xl font-bold">Berry Life</h2>
          <p className="mt-4 text-white/50">Berry Global work goes here</p>
        </section>
        <section className="h-screen">
          <h2 className="text-3xl font-bold">After Berry</h2>
          <p className="mt-4 text-white/50">Teaching, AI, apps</p>
        </section>
      </div>
    </Shell>
  );
}
```

- [ ] **Step 3: Verify shell renders**

Run `npm run dev` — should see: nav bar at top, dashed line on left with three hash markers that parallax on scroll, placeholder sections scrolling through. Mobile: narrower rail, bottom sticky card.

- [ ] **Step 4: Commit**

```bash
git add src/components/shell/Shell.tsx src/app/page.tsx
git commit -m "feat: assemble persistent Shell with nav, rail, and info panel"
```

---

## Task 9: Modal System and Popups

**Files:**
- Create: `src/components/popups/Modal.tsx`
- Create: `src/components/popups/AboutPopup.tsx`
- Create: `src/components/popups/ContactPopup.tsx`

- [ ] **Step 1: Create `src/components/popups/Modal.tsx`**

```tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;

    if (open) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        contentRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  const handleClose = () => {
    if (!overlayRef.current || !contentRef.current) return;
    gsap.to(contentRef.current, { scale: 0.95, opacity: 0, duration: 0.2, ease: 'power2.in' });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      delay: 0.1,
      onComplete: onClose,
    });
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 opacity-0 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-neutral-900 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/40 transition-colors hover:text-white"
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/popups/AboutPopup.tsx`**

```tsx
'use client';

import { useAppStore } from '@/stores/useAppStore';
import Modal from './Modal';

export default function AboutPopup() {
  const aboutOpen = useAppStore((s) => s.aboutOpen);
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);

  return (
    <Modal open={aboutOpen} onClose={() => setAboutOpen(false)}>
      <h2 className="text-2xl font-bold">Matthew Johnson</h2>
      <p className="mt-1 text-sm text-white/50">
        Art Director &middot; Designer &middot; AI Developer
      </p>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/70">
        <p>
          With over a decade of experience in art direction and brand design,
          I&apos;ve led creative for major brands from Keller to Berry Global —
          building campaigns, packaging systems, and brand identities that
          connect.
        </p>
        <p>
          After Berry, I pivoted to teaching design for a year before diving
          deep into AI development. That journey led to Bible Warden and News
          Warden — AI-powered apps built from the ground up.
        </p>
        <p>
          I bring a rare combination: the eye of an art director, the strategic
          thinking of a brand leader, and the technical capability to build what
          I design.
        </p>
      </div>
    </Modal>
  );
}
```

- [ ] **Step 3: Create `src/components/popups/ContactPopup.tsx`**

```tsx
'use client';

import { useAppStore } from '@/stores/useAppStore';
import Modal from './Modal';

export default function ContactPopup() {
  const contactOpen = useAppStore((s) => s.contactOpen);
  const setContactOpen = useAppStore((s) => s.setContactOpen);

  return (
    <Modal open={contactOpen} onClose={() => setContactOpen(false)}>
      <h2 className="text-2xl font-bold">Get in Touch</h2>
      <p className="mt-2 text-sm text-white/50">
        Open to freelance, collaboration, and creative opportunities.
      </p>
      <div className="mt-6 space-y-4">
        <a
          href="mailto:matt@mjaystudios.com"
          className="block text-sm text-white/70 transition-colors hover:text-white"
        >
          matt@mjaystudios.com
        </a>
        <a
          href="https://linkedin.com/in/matthewjohnson"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-white/70 transition-colors hover:text-white"
        >
          LinkedIn
        </a>
      </div>
    </Modal>
  );
}
```

- [ ] **Step 4: Wire popups into the Shell**

Update `src/components/shell/Shell.tsx`:

```tsx
'use client';

import { ReactNode } from 'react';
import NavBar from './NavBar';
import TimelineRail, { TimelineRailMobile, Marker } from './TimelineRail';
import InfoPanel from './InfoPanel';
import AboutPopup from '@/components/popups/AboutPopup';
import ContactPopup from '@/components/popups/ContactPopup';

interface ShellProps {
  markers: Marker[];
  children: ReactNode;
}

export default function Shell({ markers, children }: ShellProps) {
  return (
    <div className="relative min-h-screen">
      <NavBar />
      <TimelineRail markers={markers} />
      <TimelineRailMobile markers={markers} />
      <InfoPanel />
      <AboutPopup />
      <ContactPopup />

      <div className="ml-8 pt-20 md:ml-64">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify popups work**

Run `npm run dev` — click About and Contact in the nav. Modals should open with scale/fade animation and close on backdrop click or X button.

- [ ] **Step 6: Commit**

```bash
git add src/components/popups/ src/components/shell/Shell.tsx
git commit -m "feat: add Modal system with About and Contact popups"
```

---

## Task 10: ProjectCard with Auto-Cycle

**Files:**
- Create: `src/components/projects/ProjectCard.tsx`

- [ ] **Step 1: Create `src/components/projects/ProjectCard.tsx`**

```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const setDetailProject = useAppStore((s) => s.setDetailProject);
  const hasDetail = project.caseStudy || project.images.length > 1;

  // Auto-cycle for campaigns
  useEffect(() => {
    if (!project.autoCycle || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % project.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [project.autoCycle, project.images.length]);

  // Crossfade on image change
  useEffect(() => {
    if (!imageRef.current) return;
    gsap.fromTo(
      imageRef.current,
      { opacity: 0.6 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeIndex]);

  return (
    <div
      className={`group relative ${hasDetail ? 'cursor-pointer' : ''}`}
      onClick={() => hasDetail && setDetailProject(project.id)}
    >
      {/* Image container */}
      <div
        ref={imageRef}
        className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-800"
      >
        <Image
          src={project.images[activeIndex]}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Detail indicator */}
        {hasDetail && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-[10px] font-medium text-white/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            View Details
          </div>
        )}

        {/* Image counter for campaigns */}
        {project.images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {project.images.map((_, i) => (
              <div
                key={i}
                className={`h-1 w-1 rounded-full ${
                  i === activeIndex ? 'bg-white/80' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Text */}
      <h3 className="mt-3 text-sm font-semibold">{project.title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-white/50">
        {project.description}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/projects/ProjectCard.tsx
git commit -m "feat: add ProjectCard with auto-cycle for campaigns"
```

---

## Task 11: ProjectGrid — Staggered Layout

**Files:**
- Create: `src/components/projects/ProjectGrid.tsx`

- [ ] **Step 1: Create `src/components/projects/ProjectGrid.tsx`**

```tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import ProjectCard from './ProjectCard';
import type { Project } from '@/data/projects';

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.project-card');

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [projects]);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10"
    >
      {projects.map((project, i) => (
        <div
          key={project.id}
          className={`project-card ${
            // Stagger: odd items get top margin on desktop for asymmetry
            i % 2 === 1 ? 'md:mt-16' : ''
          }`}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/projects/ProjectGrid.tsx
git commit -m "feat: add staggered ProjectGrid with scroll-reveal"
```

---

## Task 12: Fullscreen Project Detail Overlay

**Files:**
- Create: `src/components/projects/FullscreenDetail.tsx`

- [ ] **Step 1: Create `src/components/projects/FullscreenDetail.tsx`**

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import { getProjectById } from '@/data/projects';

export default function FullscreenDetail() {
  const detailProjectId = useAppStore((s) => s.detailProject);
  const setDetailProject = useAppStore((s) => s.setDetailProject);
  const [activeIndex, setActiveIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const project = detailProjectId ? getProjectById(detailProjectId) : null;

  // Reset index when project changes
  useEffect(() => {
    setActiveIndex(0);
  }, [detailProjectId]);

  // Animate in
  useEffect(() => {
    if (!overlayRef.current || !contentRef.current || !project) return;

    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(contentRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.15 });

    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  const handleClose = () => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      onComplete: () => setDetailProject(null),
    });
  };

  if (!project) return null;

  const allImages = [
    ...project.images,
    ...(project.caseStudy?.additionalImages ?? []),
  ];

  const prev = () => setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length);
  const next = () => setActiveIndex((i) => (i + 1) % allImages.length);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative flex h-full w-full max-w-5xl flex-col items-center justify-center gap-6 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-2xl text-white/40 hover:text-white"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Image */}
        <div className="relative aspect-[4/3] w-full max-h-[60vh] overflow-hidden rounded-lg">
          <Image
            src={allImages[activeIndex]}
            alt={`${project.title} — ${activeIndex + 1}`}
            fill
            className="object-contain"
            sizes="90vw"
          />
        </div>

        {/* Navigation */}
        {allImages.length > 1 && (
          <div className="flex items-center gap-6">
            <button
              onClick={prev}
              className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/20 hover:text-white"
            >
              Prev
            </button>
            <span className="text-xs text-white/40">
              {activeIndex + 1} / {allImages.length}
            </span>
            <button
              onClick={next}
              className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/20 hover:text-white"
            >
              Next
            </button>
          </div>
        )}

        {/* Info */}
        <div className="max-w-lg text-center">
          <h2 className="text-xl font-bold">{project.title}</h2>
          <p className="mt-2 text-sm text-white/60">
            {project.caseStudy?.extendedDescription ?? project.description}
          </p>
          {project.caseStudy?.processNotes && (
            <p className="mt-4 text-xs italic text-white/40">
              {project.caseStudy.processNotes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire into Shell**

Update `src/components/shell/Shell.tsx` — add the import and render:

```tsx
import FullscreenDetail from '@/components/projects/FullscreenDetail';
```

Add `<FullscreenDetail />` after the other popups inside the Shell return.

- [ ] **Step 3: Commit**

```bash
git add src/components/projects/FullscreenDetail.tsx src/components/shell/Shell.tsx
git commit -m "feat: add fullscreen project detail overlay with navigation"
```

---

## Task 13: EraSection and Timeline View

**Files:**
- Create: `src/components/views/EraSection.tsx`
- Create: `src/components/views/TimelineView.tsx`

- [ ] **Step 1: Create `src/components/views/EraSection.tsx`**

```tsx
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
  accent: string;        // Tailwind color class for accents
  section: Section;       // Info panel data
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

    // Update info panel when this section enters viewport
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 40%',
      end: 'bottom 40%',
      onEnter: () => setCurrentSection(config.section),
      onEnterBack: () => setCurrentSection(config.section),
    });

    // Title reveal animation
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
      {/* Era title */}
      <h2
        ref={titleRef}
        className="mb-12 text-3xl font-bold tracking-tight md:text-5xl"
      >
        <span className={config.accent}>{config.title}</span>
      </h2>

      {/* Projects */}
      <ProjectGrid projects={projects} />
    </section>
  );
}

export type { EraConfig };
```

- [ ] **Step 2: Create `src/components/views/TimelineView.tsx`**

```tsx
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

    // Set intro section when at the top
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

    // Intro text animation
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
      {/* Intro / About teaser */}
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

      {/* Three eras */}
      {eras.map((era) => (
        <EraSection
          key={era.id}
          config={era}
          projects={getProjectsByEra(era.id as 'agency' | 'berry' | 'afterberry')}
        />
      ))}

      {/* Outro / Contact teaser */}
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/views/EraSection.tsx src/components/views/TimelineView.tsx
git commit -m "feat: add TimelineView with three era sections and intro/outro"
```

---

## Task 14: Category View with Jump-Nav

**Files:**
- Create: `src/components/views/CategoryView.tsx`
- Create: `src/components/logo/LogoReveal.tsx`

- [ ] **Step 1: Create `src/components/logo/LogoReveal.tsx`**

```tsx
'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface LogoRevealProps {
  src: string;
  alt: string;
}

export default function LogoReveal({ src, alt }: LogoRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !clipRef.current) return;

    // Scroll-driven clip: reveals the bottom half (black bg) of the logo image
    gsap.fromTo(
      clipRef.current,
      { clipPath: 'inset(0 0 50% 0)' }, // show only top half (white bg)
      {
        clipPath: 'inset(0 0 0% 0)',     // reveal full image (including black bg)
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 0.5,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative aspect-square overflow-hidden rounded-lg">
      <div ref={clipRef} className="h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/views/CategoryView.tsx`**

```tsx
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

  // Jump-scroll to category
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
      {/* Jump nav at top */}
      <div className="sticky top-20 z-30 mb-12 flex flex-wrap gap-2 bg-neutral-950/80 py-3 backdrop-blur-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => scrollToCategory(cat)}
            className="rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            {categoryLabels[cat] ?? cat}
          </button>
        ))}
      </div>

      {/* Category sections */}
      {categories.map((cat) => {
        const catProjects = getProjectsByCategory(cat);
        const isLogo = cat === 'logo';

        return (
          <section
            key={cat}
            ref={(el) => { sectionRefs.current[cat] = el; }}
            className="py-16"
          >
            <h2 className="mb-10 text-2xl font-bold tracking-tight md:text-4xl">
              {categoryLabels[cat] ?? cat}
            </h2>

            {isLogo ? (
              // Logo section: special grid with scroll reveal
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
```

Note: This uses `gsap.to(window, { scrollTo })` which requires the GSAP ScrollToPlugin. Install it:

```bash
# ScrollToPlugin is included in gsap, just needs registration
```

Update `src/lib/gsap.ts` to register it:

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export { gsap, ScrollTrigger };
```

- [ ] **Step 3: Commit**

```bash
git add src/components/views/CategoryView.tsx src/components/logo/LogoReveal.tsx src/lib/gsap.ts
git commit -m "feat: add CategoryView with jump-nav and LogoReveal"
```

---

## Task 15: Wire Views into Page with Animated Swap

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update `src/app/page.tsx` with view switching**

```tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import Shell from '@/components/shell/Shell';
import TimelineView from '@/components/views/TimelineView';
import CategoryView from '@/components/views/CategoryView';
import type { Marker } from '@/components/shell/TimelineRail';

const timelineMarkers: Marker[] = [
  { id: 'intro', label: 'Intro', position: 0.05 },
  { id: 'agency', label: '2010', position: 0.2 },
  { id: 'berry', label: '2017', position: 0.5 },
  { id: 'afterberry', label: '2023', position: 0.75 },
  { id: 'contact', label: 'Contact', position: 0.95 },
];

const categoryMarkers: Marker[] = [
  { id: 'advertising', label: 'Ads', position: 0.1 },
  { id: 'packaging', label: 'Packaging', position: 0.3 },
  { id: 'environmental', label: 'Booths', position: 0.5 },
  { id: 'logo', label: 'Logos', position: 0.7 },
  { id: 'digital', label: 'Digital', position: 0.9 },
];

export default function Home() {
  const activeView = useAppStore((s) => s.activeView);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animate view swap
  useEffect(() => {
    if (!contentRef.current) return;
    window.scrollTo(0, 0);

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeView]);

  const markers = activeView === 'timeline' ? timelineMarkers : categoryMarkers;

  return (
    <Shell markers={markers}>
      <div ref={contentRef}>
        {activeView === 'timeline' ? <TimelineView /> : <CategoryView />}
      </div>
    </Shell>
  );
}
```

- [ ] **Step 2: Verify the full experience**

Run `npm run dev`:

1. Page loads with Timeline view — intro, three eras, outro
2. Toggle to "By Type" — categories with jump nav, logo section with scroll reveal
3. Toggle back — smooth transition
4. Click a campaign item — fullscreen detail with prev/next
5. Nav About/Contact — modals open and close
6. Timeline rail parallax on scroll
7. Info panel updates as you scroll through sections
8. Test mobile widths — hamburger, sticky bottom card, narrow rail

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire Timeline and Category views with animated swap"
```

---

## Task 16: Era Background Transitions (Placeholder)

This task sets up the infrastructure for the custom era backgrounds that the user will design. Uses CSS custom properties and GSAP to transition between them.

**Files:**
- Modify: `src/components/views/EraSection.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add background layer styles to `src/app/globals.css`**

```css
@import 'tailwindcss';

html,
body {
  overflow-x: hidden;
}

html {
  scroll-behavior: auto;
}

/* Era background layers */
.era-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
  background-size: cover;
  background-position: center;
}

.era-bg.active {
  opacity: 1;
}
```

- [ ] **Step 2: Update EraSection to manage backgrounds**

Update `src/components/views/EraSection.tsx` — add a background management effect:

Add to the interface:

```typescript
interface EraConfig {
  id: string;
  title: string;
  accent: string;
  section: Section;
  bgClass?: string; // CSS class for the custom background (user-designed)
}
```

Add a background div inside the section:

```tsx
{/* Background trigger — activates this era's bg when in view */}
<div
  className={`era-bg ${config.bgClass ?? ''}`}
  id={`era-bg-${config.id}`}
/>
```

Add to the ScrollTrigger onEnter/onEnterBack callbacks:

```typescript
// Activate this era's background
document.querySelectorAll('.era-bg').forEach((el) => el.classList.remove('active'));
document.getElementById(`era-bg-${config.id}`)?.classList.add('active');
```

- [ ] **Step 3: Update era configs in TimelineView.tsx**

Add placeholder `bgClass` values that the user will replace with their custom backgrounds:

```typescript
const eras: EraConfig[] = [
  {
    id: 'agency',
    title: 'Agency Life',
    accent: 'text-red-500',
    bgClass: 'bg-neutral-950', // Placeholder — user will replace with custom bg
    section: { /* ... same as before */ },
  },
  // ... same pattern for berry and afterberry
];
```

- [ ] **Step 4: Commit**

```bash
git add src/components/views/EraSection.tsx src/components/views/TimelineView.tsx src/app/globals.css
git commit -m "feat: add era background transition infrastructure"
```

---

## Task 17: Final Cleanup and Build Verification

**Files:**
- Modify: `package.json` (name field)
- Verify: full build passes

- [ ] **Step 1: Update package name**

In `package.json`, change `"name": "mjaystudios-temp"` to `"name": "mjaystudios"`.

- [ ] **Step 2: Remove default Next.js SVGs from public/**

```bash
rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Fix any TypeScript errors or build warnings.

- [ ] **Step 4: Run lint**

```bash
npm run lint
```

Fix any lint errors.

- [ ] **Step 5: Manual smoke test**

```bash
npm run dev
```

Walk through the full experience one more time — both views, popups, fullscreen detail, mobile responsive.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: cleanup defaults and verify production build"
```

---

## Summary

| Task | What it builds | Depends on |
|------|---------------|------------|
| 1 | Clean deps, fresh src scaffold | — |
| 2 | Zustand store | 1 |
| 3 | Project data model + seed data | 2 |
| 4 | Organize portfolio images | 3 |
| 5 | NavBar + ViewToggle | 2 |
| 6 | Timeline Rail | 1 |
| 7 | Floating Info Panel | 2 |
| 8 | Assemble Shell | 5, 6, 7 |
| 9 | Modal system + popups | 2, 8 |
| 10 | ProjectCard with auto-cycle | 3 |
| 11 | ProjectGrid staggered layout | 10 |
| 12 | Fullscreen detail overlay | 3, 8 |
| 13 | EraSection + TimelineView | 3, 11 |
| 14 | CategoryView + LogoReveal | 3, 11 |
| 15 | Wire views into page | 8, 13, 14 |
| 16 | Era background transitions | 13 |
| 17 | Final cleanup + build verify | All |
