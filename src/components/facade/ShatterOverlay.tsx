'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useAppStore } from '@/stores/useAppStore'

gsap.registerPlugin(useGSAP)

const GRID_COLS = 8
const GRID_ROWS = 6

export default function ShatterOverlay() {
  const containerRef = useRef<HTMLDivElement>(null)
  const phase = useAppStore((s) => s.phase)
  const setPhase = useAppStore((s) => s.setPhase)

  useEffect(() => {
    if (phase !== 'transition' || !containerRef.current) return

    const fragments = containerRef.current.querySelectorAll('.fragment')

    gsap.set(fragments, {
      opacity: 1,
    })

    const tl = gsap.timeline({
      onComplete: () => setPhase('gallery'),
    })

    tl.to(fragments, {
      y: () => gsap.utils.random(200, 800),
      x: () => gsap.utils.random(-300, 300),
      rotation: () => gsap.utils.random(-180, 180),
      opacity: 0,
      scale: () => gsap.utils.random(0.3, 0.8),
      duration: 1.2,
      ease: 'power3.in',
      stagger: {
        amount: 0.4,
        from: 'center',
        grid: [GRID_ROWS, GRID_COLS],
      },
    })
  }, [phase, setPhase])

  if (phase === 'gallery') return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 pointer-events-none"
      style={{
        display: phase === 'facade' ? 'none' : 'grid',
        gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
      }}
    >
      {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, i) => (
        <div
          key={i}
          className="fragment bg-white"
          style={{ opacity: 1 }}
        />
      ))}
    </div>
  )
}
