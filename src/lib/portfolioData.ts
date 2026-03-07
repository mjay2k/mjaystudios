export interface PortfolioItem {
  id: string
  title: string
  category: string
  description: string
  image: string
  color: string
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'berrys-barrier',
    title: "Berry's Barrier",
    category: 'Packaging Design',
    description: 'Protective packaging brand identity',
    image: '/portfolio/berrys-barrier.jpg',
    color: '#2563eb',
  },
  {
    id: 'epic',
    title: 'EPIC',
    category: 'Brand Identity',
    description: 'Bold brand system for performance products',
    image: '/portfolio/epic.jpg',
    color: '#dc2626',
  },
  {
    id: 'verdant',
    title: 'Verdant',
    category: 'Packaging Design',
    description: 'Sustainable packaging design system',
    image: '/portfolio/verdant.jpg',
    color: '#16a34a',
  },
  {
    id: 'burnetts',
    title: "Burnett's Vodka",
    category: 'Beverage Branding',
    description: 'Premium vodka brand refresh',
    image: '/portfolio/burnetts.jpg',
    color: '#9333ea',
  },
  {
    id: 'hpnotiq',
    title: 'Hpnotiq Sparkle',
    category: 'Beverage Branding',
    description: 'Limited edition sparkle line launch',
    image: '/portfolio/hpnotiq.jpg',
    color: '#0891b2',
  },
  {
    id: 'mjaystudios',
    title: 'MJay Studios Site',
    category: 'Web Development',
    description: 'This very site — built with AI tools',
    image: '/portfolio/mjaystudios.jpg',
    color: '#f97316',
  },
]
