import { create } from 'zustand'

export type AppPhase = 'facade' | 'transition' | 'gallery'
export type NavMode = 'scroll' | 'wasd'

interface AppState {
  phase: AppPhase
  navMode: NavMode
  currentRoom: number
  scrollProgress: number
  setPhase: (phase: AppPhase) => void
  setNavMode: (mode: NavMode) => void
  setCurrentRoom: (room: number) => void
  setScrollProgress: (progress: number) => void
  triggerShatter: () => void
}

export const useAppStore = create<AppState>((set) => ({
  phase: 'facade',
  navMode: 'scroll',
  currentRoom: 0,
  scrollProgress: 0,
  setPhase: (phase) => set({ phase }),
  setNavMode: (mode) => set({ navMode: mode }),
  setCurrentRoom: (room) => set({ currentRoom: room }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  triggerShatter: () => set({ phase: 'transition' }),
}))
