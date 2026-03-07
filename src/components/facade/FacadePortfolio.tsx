'use client'

import { useEffect } from 'react'
import NavBar from './NavBar'
import HeroSection from './HeroSection'
import WorkGrid from './WorkGrid'
import { useAppStore } from '@/stores/useAppStore'

export default function FacadePortfolio() {
  const phase = useAppStore((s) => s.phase)
  const triggerShatter = useAppStore((s) => s.triggerShatter)

  useEffect(() => {
    if (phase !== 'facade') return

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        triggerShatter()
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [phase, triggerShatter])

  if (phase === 'gallery') return null

  return (
    <div className="facade-container bg-white text-gray-900" style={{
      opacity: phase === 'transition' ? 0 : 1,
      transition: 'opacity 0.3s ease',
    }}>
      <NavBar />
      <HeroSection />
      <WorkGrid />
    </div>
  )
}
