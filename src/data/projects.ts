import generatedProjects from './projects.generated.json';

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
  client?: string;
  link?: string;
  captions?: Record<string, string>;
}

export const projects: Project[] = generatedProjects as Project[];

export function getProjectsByEra(era: Project['era']): Project[] {
  return projects
    .filter((p) => p.era === era)
    // Exclude logo-only projects from timeline view
    .filter((p) => !(p.categories.length === 1 && p.categories[0] === 'logo'))
    // Exclude projects with no images
    .filter((p) => p.images.length > 0)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects
    .filter((p) => p.categories.includes(category))
    .filter((p) => p.images.length > 0)
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
