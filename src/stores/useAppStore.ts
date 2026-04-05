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

  detailProject: string | null;
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
