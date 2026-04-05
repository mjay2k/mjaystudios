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

export function getProjectsByEra(era: Project['era']): Project[] {
  return projects
    .filter((p) => p.era === era)
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
