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
    title: 'Endless PAMAbilities',
    description: 'Dozens of cocktails composed into mosaic art around the bottle. Scaled across seasons — Valentine\'s, Holiday. Ran nationally in print, outdoor, and digital.',
    year: 2013,
    era: 'agency',
    categories: ['advertising', 'packaging'],
    caseStudy: {
      extendedDescription: 'The client wanted to communicate the vast mixability of PAMA. I took a show-don\'t-tell approach — dozens of unique cocktails, each professionally mixed and shot, composed into a single mosaic art piece around the bottle. The full composition lives inside a branded frame built on PAMA\'s pomegranate motif. The concept scaled across seasons — Valentine\'s Day, Holiday — same framework, fresh executions. Ran nationally in print, outdoor, and digital. Award-winning campaign.',
      additionalImages: [],
    },
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
    description: 'Complete packaging overhaul for a heritage whiskey brand dating back to 1934. Currently on shelves nationwide.',
    caseStudy: {
      extendedDescription: 'A complete packaging overhaul for a heritage whiskey brand dating back to 1934, named after Philadelphia\'s Rittenhouse Square. The new design draws from the original label language while making it feel current and authoritative — honoring the history without being stuck in it. Currently on shelves nationwide.',
      additionalImages: [],
    },
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
    title: 'Always Your Flavorite',
    description: 'Hero flavor bursts from the bottle, revealing ingredients. The lineup stretches behind it — there\'s always more. Ran nationally across print, outdoor, and digital.',
    caseStudy: {
      extendedDescription: 'Burnett\'s needed a campaign that could spotlight any single flavor while reinforcing the range behind it. I designed a system where the hero flavor bursts from the bottle, revealing the ingredients in a way that makes them look alive and appetizing. The rest of the lineup stretches out behind it, bleeding off the edge — there\'s always more. One layout, infinite flavor swaps. The campaign ran nationally across print, outdoor, and digital.',
      additionalImages: [],
    },
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
  // Bible Warden and News Warden — add back when screenshots are available

  // === LOGOS (Category view only — not shown in timeline) ===
  {
    id: 'logo-designs',
    title: 'Logo Design Collection',
    description: 'Brand identity designs across multiple industries.',
    year: 2015,
    era: 'agency',
    categories: ['logo'],  // No 'advertising' or 'packaging' — only appears in Category > Logo view
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

export function getProjectsByEra(era: Project['era']): Project[] {
  return projects
    .filter((p) => p.era === era)
    // Exclude logo-only projects from timeline view
    .filter((p) => !(p.categories.length === 1 && p.categories[0] === 'logo'))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects
    .filter((p) => p.categories.includes(category))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getAllCategories(): string[] {
  const cats = new Set<string>();
  projects.forEach((p) => p.categories.forEach((c) => cats.add(c)));
  return Array.from(cats);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
