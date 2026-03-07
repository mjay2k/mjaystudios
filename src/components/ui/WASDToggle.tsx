'use client'

import { useAppStore } from '@/stores/useAppStore'

export default function WASDToggle() {
  const navMode = useAppStore((s) => s.navMode)
  const setNavMode = useAppStore((s) => s.setNavMode)
  const phase = useAppStore((s) => s.phase)

  if (phase !== 'gallery') return null

  return (
    <button
      onClick={() => setNavMode(navMode === 'scroll' ? 'wasd' : 'scroll')}
      className="fixed bottom-8 right-8 z-50 hidden md:block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm hover:bg-white/20 transition-colors"
    >
      {navMode === 'scroll' ? 'Explore Freely (WASD)' : 'Back to Guided Tour'}
    </button>
  )
}
