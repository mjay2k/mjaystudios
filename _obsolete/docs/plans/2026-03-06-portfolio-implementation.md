# MJay Studios Portfolio — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a portfolio site that loads as a normal portfolio, then shatters to reveal a 3D gallery of four rooms telling Matthew's career story.

**Architecture:** Next.js App Router renders a Tailwind-styled facade portfolio page with a hidden R3F Canvas underneath. On scroll trigger, GSAP animates the facade fragments away while the Three.js scene activates. Drei's ScrollControls drives the camera along a spline through four procedural rooms. Zustand manages app state (phase, mode, room).

**Tech Stack:** Next.js 14, React Three Fiber, Drei, GSAP + @gsap/react, Zustand, Tailwind CSS, TypeScript

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.js`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

**Step 1: Create Next.js app with dependencies**

```bash
cd /Users/matthewjohnson/Documents/mjaystudios
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack --use-npm
```

Accept defaults, overwrite if prompted.

**Step 2: Install 3D and animation dependencies**

```bash
npm install three @react-three/fiber @react-three/drei gsap @gsap/react zustand
npm install -D @types/three
```

**Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on localhost:3000

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js project with R3F, GSAP, Zustand deps"
```

---

### Task 2: Zustand Store

**Files:**
- Create: `src/stores/useAppStore.ts`

**Step 1: Create the store**

```typescript
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
```

**Step 2: Commit**

```bash
git add src/stores/useAppStore.ts && git commit -m "feat: add Zustand app store with phase/nav state"
```

---

### Task 3: Facade Portfolio — Layout & Hero

**Files:**
- Create: `src/components/facade/FacadePortfolio.tsx`
- Create: `src/components/facade/NavBar.tsx`
- Create: `src/components/facade/HeroSection.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Step 1: Create NavBar**

```tsx
// src/components/facade/NavBar.tsx
'use client'

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-sm">
      <div className="text-xl font-bold tracking-tight text-gray-900">
        MJay Studios
      </div>
      <div className="flex gap-8 text-sm font-medium text-gray-600">
        <a href="#work" className="hover:text-gray-900 transition-colors">Portfolio</a>
        <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
        <a href="#contact" className="hover:text-gray-900 transition-colors">Contact</a>
      </div>
    </nav>
  )
}
```

**Step 2: Create HeroSection**

```tsx
// src/components/facade/HeroSection.tsx
'use client'

import { useAppStore } from '@/stores/useAppStore'

export default function HeroSection() {
  const triggerShatter = useAppStore((s) => s.triggerShatter)

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
        Matthew Johnson
      </p>
      <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 leading-tight">
        Created to<br />Create
      </h1>
      <p className="text-lg text-gray-500 max-w-md mb-12">
        Designer. Visionary. Builder.<br />
        Turning ideas into experiences that move people.
      </p>
      <button
        onClick={triggerShatter}
        className="group relative px-8 py-4 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Explore My World
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
          or just scroll down
        </span>
      </button>
    </section>
  )
}
```

**Step 3: Create FacadePortfolio wrapper**

```tsx
// src/components/facade/FacadePortfolio.tsx
'use client'

import NavBar from './NavBar'
import HeroSection from './HeroSection'

export default function FacadePortfolio() {
  return (
    <div className="facade-container bg-white text-gray-900">
      <NavBar />
      <HeroSection />
    </div>
  )
}
```

**Step 4: Update page.tsx to render facade**

```tsx
// src/app/page.tsx
import FacadePortfolio from '@/components/facade/FacadePortfolio'

export default function Home() {
  return (
    <main>
      <FacadePortfolio />
    </main>
  )
}
```

**Step 5: Clean up globals.css** — remove default Next.js boilerplate styles, keep Tailwind directives only:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body {
  overflow-x: hidden;
}
```

**Step 6: Verify in browser** — should see a clean portfolio hero page

**Step 7: Commit**

```bash
git add src/components/facade/ src/app/page.tsx src/app/globals.css && git commit -m "feat: add facade portfolio with navbar and hero section"
```

---

### Task 4: Facade Portfolio — Work Grid

**Files:**
- Create: `src/components/facade/WorkGrid.tsx`
- Create: `src/lib/portfolioData.ts`
- Modify: `src/components/facade/FacadePortfolio.tsx`

**Step 1: Create portfolio data**

```typescript
// src/lib/portfolioData.ts
export interface PortfolioItem {
  id: string
  title: string
  category: string
  description: string
  image: string // placeholder for now, real images later
  color: string // accent color for the card
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
```

**Step 2: Create WorkGrid component**

```tsx
// src/components/facade/WorkGrid.tsx
'use client'

import { portfolioItems } from '@/lib/portfolioData'

export default function WorkGrid() {
  return (
    <section id="work" className="px-8 py-24 max-w-6xl mx-auto">
      <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-12">
        Selected Work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            style={{ backgroundColor: item.color + '15' }}
          >
            {/* Placeholder — real images will replace this */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: item.color + '20' }}
            >
              <span className="text-4xl font-bold opacity-10" style={{ color: item.color }}>
                {item.title[0]}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-xs text-white/70 uppercase tracking-wider mb-1">
                {item.category}
              </p>
              <p className="text-white font-semibold">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

**Step 3: Add WorkGrid to FacadePortfolio**

```tsx
// src/components/facade/FacadePortfolio.tsx
'use client'

import NavBar from './NavBar'
import HeroSection from './HeroSection'
import WorkGrid from './WorkGrid'

export default function FacadePortfolio() {
  return (
    <div className="facade-container bg-white text-gray-900">
      <NavBar />
      <HeroSection />
      <WorkGrid />
    </div>
  )
}
```

**Step 4: Verify** — page should show hero + a grid of colored cards with hover effects

**Step 5: Commit**

```bash
git add src/components/facade/WorkGrid.tsx src/lib/portfolioData.ts src/components/facade/FacadePortfolio.tsx && git commit -m "feat: add work grid with portfolio items to facade"
```

---

### Task 5: Three.js Canvas Setup

**Files:**
- Create: `src/components/three/Scene.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create the Scene component**

This must be a client component and dynamically imported in Next.js (no SSR for Three.js).

```tsx
// src/components/three/Scene.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { useAppStore } from '@/stores/useAppStore'

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </>
  )
}

export default function Scene() {
  const phase = useAppStore((s) => s.phase)

  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        opacity: phase === 'facade' ? 0 : 1,
        pointerEvents: phase === 'facade' ? 'none' : 'auto',
        transition: 'opacity 0.5s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
```

**Step 2: Dynamically import Scene in page.tsx**

```tsx
// src/app/page.tsx
import dynamic from 'next/dynamic'
import FacadePortfolio from '@/components/facade/FacadePortfolio'

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false })

export default function Home() {
  return (
    <main>
      <FacadePortfolio />
      <Scene />
    </main>
  )
}
```

**Step 3: Verify** — facade page still visible, pink cube hidden behind it. Set phase to 'gallery' temporarily in store to verify canvas renders.

**Step 4: Commit**

```bash
git add src/components/three/Scene.tsx src/app/page.tsx && git commit -m "feat: add R3F canvas with dynamic import"
```

---

### Task 6: Shatter Transition

**Files:**
- Create: `src/components/facade/ShatterOverlay.tsx`
- Modify: `src/components/facade/FacadePortfolio.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create ShatterOverlay**

This captures the facade visually, breaks it into grid fragments, and animates them away with GSAP. This is a DOM-based effect (not Three.js) for simplicity and performance.

```tsx
// src/components/facade/ShatterOverlay.tsx
'use client'

import { useRef, useEffect, useCallback } from 'react'
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
```

**Step 2: Wire up scroll trigger in FacadePortfolio**

```tsx
// src/components/facade/FacadePortfolio.tsx
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
```

**Step 3: Add ShatterOverlay to page.tsx**

```tsx
// src/app/page.tsx
import dynamic from 'next/dynamic'
import FacadePortfolio from '@/components/facade/FacadePortfolio'

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false })
const ShatterOverlay = dynamic(() => import('@/components/facade/ShatterOverlay'), { ssr: false })

export default function Home() {
  return (
    <main>
      <FacadePortfolio />
      <ShatterOverlay />
      <Scene />
    </main>
  )
}
```

**Step 4: Verify** — scroll down or click "Explore My World" → white fragments shatter away → pink cube visible behind

**Step 5: Commit**

```bash
git add src/components/facade/ShatterOverlay.tsx src/components/facade/FacadePortfolio.tsx src/app/page.tsx && git commit -m "feat: add shatter transition from facade to 3D scene"
```

---

### Task 7: Camera Rig — Scroll-Driven Path + WASD

**Files:**
- Create: `src/components/three/CameraRig.tsx`
- Create: `src/lib/cameraPath.ts`
- Modify: `src/components/three/Scene.tsx`

**Step 1: Define camera path through rooms**

```typescript
// src/lib/cameraPath.ts
import * as THREE from 'three'

// Room positions along Z axis, camera travels forward
export const ROOM_POSITIONS = {
  eye:    new THREE.Vector3(0, 1.6, 0),     // Room 1: z=0
  mind:   new THREE.Vector3(0, 1.6, -30),   // Room 2: z=-30
  build:  new THREE.Vector3(0, 1.6, -60),   // Room 3: z=-60
  future: new THREE.Vector3(0, 1.6, -90),   // Room 4: z=-90
}

// Create a smooth CatmullRom spline through the rooms
export function createCameraPath(): THREE.CatmullRomCurve3 {
  const points = [
    new THREE.Vector3(0, 1.6, 5),       // Start: pulled back from Room 1
    new THREE.Vector3(0, 1.6, 0),       // Room 1 center
    new THREE.Vector3(0, 2, -15),       // Transition: slight elevation
    new THREE.Vector3(0, 1.6, -30),     // Room 2 center
    new THREE.Vector3(2, 1.6, -45),     // Transition: slight side offset
    new THREE.Vector3(0, 1.6, -60),     // Room 3 center
    new THREE.Vector3(0, 2.5, -75),     // Transition: elevated pullback
    new THREE.Vector3(0, 1.6, -90),     // Room 4 center
    new THREE.Vector3(0, 1.6, -95),     // End: slightly past Room 4
  ]
  return new THREE.CatmullRomCurve3(points)
}

// Determine which room the camera is in based on scroll progress (0-1)
export function getRoomFromProgress(progress: number): number {
  if (progress < 0.25) return 0
  if (progress < 0.5) return 1
  if (progress < 0.75) return 2
  return 3
}
```

**Step 2: Create CameraRig with scroll + WASD modes**

```tsx
// src/components/three/CameraRig.tsx
'use client'

import { useRef, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '@/stores/useAppStore'
import { createCameraPath, getRoomFromProgress } from '@/lib/cameraPath'

export default function CameraRig() {
  const navMode = useAppStore((s) => s.navMode)
  const setCurrentRoom = useAppStore((s) => s.setCurrentRoom)
  const setScrollProgress = useAppStore((s) => s.setScrollProgress)
  const scroll = useScroll()
  const { camera } = useThree()
  const path = useMemo(() => createCameraPath(), [])
  const lookAtPoint = useRef(new THREE.Vector3())

  // Keyboard state for WASD
  const keys = useRef({ w: false, a: false, s: false, d: false })

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key in keys.current) keys.current[key as keyof typeof keys.current] = true
    }
    const onKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key in keys.current) keys.current[key as keyof typeof keys.current] = false
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    if (navMode === 'scroll') {
      const offset = scroll.offset
      setScrollProgress(offset)
      setCurrentRoom(getRoomFromProgress(offset))

      // Position camera along spline
      const point = path.getPointAt(offset)
      camera.position.lerp(point, 0.05)

      // Look slightly ahead on the path
      const lookAhead = Math.min(offset + 0.01, 1)
      const target = path.getPointAt(lookAhead)
      lookAtPoint.current.lerp(target, 0.05)
      camera.lookAt(lookAtPoint.current)
    } else {
      // WASD movement
      const speed = 5 * delta
      const direction = new THREE.Vector3()
      camera.getWorldDirection(direction)
      const right = new THREE.Vector3().crossVectors(direction, camera.up).normalize()

      if (keys.current.w) camera.position.addScaledVector(direction, speed)
      if (keys.current.s) camera.position.addScaledVector(direction, -speed)
      if (keys.current.a) camera.position.addScaledVector(right, -speed)
      if (keys.current.d) camera.position.addScaledVector(right, speed)
    }
  })

  return navMode === 'wasd' ? <PointerLockControls /> : null
}
```

**Step 3: Update Scene to use ScrollControls + CameraRig**

```tsx
// src/components/three/Scene.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import { useAppStore } from '@/stores/useAppStore'
import CameraRig from './CameraRig'

function SceneContent() {
  return (
    <>
      <ScrollControls pages={5} damping={0.3}>
        <CameraRig />
        {/* Rooms will be added here */}
        <ambientLight intensity={0.3} />
        {/* Temporary markers for room positions */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
        <mesh position={[0, 1, -30]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#8b5cf6" />
        </mesh>
        <mesh position={[0, 1, -60]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#06b6d4" />
        </mesh>
        <mesh position={[0, 1, -90]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
      </ScrollControls>
    </>
  )
}

export default function Scene() {
  const phase = useAppStore((s) => s.phase)

  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        opacity: phase === 'facade' ? 0 : 1,
        pointerEvents: phase === 'facade' ? 'none' : 'auto',
        transition: 'opacity 0.5s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 1.6, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        {phase !== 'facade' && <SceneContent />}
      </Canvas>
    </div>
  )
}
```

**Step 4: Verify** — trigger shatter → scroll through 3D space, camera moves past 4 colored cubes on the path

**Step 5: Commit**

```bash
git add src/components/three/CameraRig.tsx src/lib/cameraPath.ts src/components/three/Scene.tsx && git commit -m "feat: add scroll-driven camera rig with WASD support"
```

---

### Task 8: Room 1 — "The Eye" (Design Career)

**Files:**
- Create: `src/components/three/rooms/TheEye.tsx`
- Modify: `src/components/three/Scene.tsx`

**Step 1: Build the room**

```tsx
// src/components/three/rooms/TheEye.tsx
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

function GalleryWall({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <mesh position={position} rotation={rotation || [0, 0, 0]}>
      <boxGeometry args={[12, 5, 0.2]} />
      <meshStandardMaterial color="#f5f5f0" />
    </mesh>
  )
}

function ArtFrame({ position, color, title, rotation }: {
  position: [number, number, number]
  color: string
  title: string
  rotation?: [number, number, number]
}) {
  const frameRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <group position={position} rotation={rotation || [0, 0, 0]}>
      {/* Frame border */}
      <mesh ref={frameRef}>
        <boxGeometry args={[2.2, 1.7, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Art placeholder — colored plane */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[2, 1.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Title */}
      <Text
        position={[0, -1.1, 0.1]}
        fontSize={0.12}
        color="#666"
        anchorX="center"
      >
        {title}
      </Text>
      {/* Spotlight glow */}
      <pointLight ref={glowRef} position={[0, 1, 0.5]} intensity={0.5} color="#fff5e0" distance={3} />
    </group>
  )
}

export default function TheEye() {
  return (
    <group position={[0, 0, 0]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[14, 20]} />
        <meshStandardMaterial color="#e8e4de" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[14, 20]} />
        <meshStandardMaterial color="#fafafa" />
      </mesh>

      {/* Walls */}
      <GalleryWall position={[-6, 2, -5]} rotation={[0, Math.PI / 2, 0]} />
      <GalleryWall position={[6, 2, -5]} rotation={[0, -Math.PI / 2, 0]} />
      <GalleryWall position={[0, 2, -10]} />

      {/* Room label */}
      <Text
        position={[0, 3.2, 4]}
        fontSize={0.5}
        color="#333"
        anchorX="center"
        font="/fonts/inter-bold.woff"
      >
        The Eye
      </Text>
      <Text
        position={[0, 2.7, 4]}
        fontSize={0.15}
        color="#999"
        anchorX="center"
      >
        Design & Advertising
      </Text>

      {/* Art pieces on walls */}
      {/* Left wall */}
      <ArtFrame position={[-5.8, 2, -2]} color="#2563eb" title="Berry's Barrier" rotation={[0, Math.PI / 2, 0]} />
      <ArtFrame position={[-5.8, 2, -6]} color="#dc2626" title="EPIC" rotation={[0, Math.PI / 2, 0]} />

      {/* Right wall */}
      <ArtFrame position={[5.8, 2, -2]} color="#16a34a" title="Verdant" rotation={[0, -Math.PI / 2, 0]} />
      <ArtFrame position={[5.8, 2, -6]} color="#9333ea" title="Burnett's Vodka" rotation={[0, -Math.PI / 2, 0]} />

      {/* Back wall */}
      <ArtFrame position={[-2.5, 2, -9.8]} color="#0891b2" title="Hpnotiq Sparkle" />
      <ArtFrame position={[2.5, 2, -9.8]} color="#f97316" title="Tufflite Film" />

      {/* Warm ambient light for this room */}
      <pointLight position={[0, 3.5, -5]} intensity={1} color="#fff5e0" distance={20} />
      <pointLight position={[-4, 3, -3]} intensity={0.4} color="#fff5e0" distance={10} />
      <pointLight position={[4, 3, -7]} intensity={0.4} color="#fff5e0" distance={10} />
    </group>
  )
}
```

**Step 2: Add to Scene, remove temp cube at position 0**

Replace the first temp mesh in Scene.tsx SceneContent with `<TheEye />` import.

**Step 3: Verify** — first room shows gallery walls with colored art frames, warm lighting

**Step 4: Commit**

```bash
git add src/components/three/rooms/TheEye.tsx src/components/three/Scene.tsx && git commit -m "feat: add Room 1 'The Eye' — design gallery"
```

---

### Task 9: Room 2 — "The Mind" (Strategy & Vision)

**Files:**
- Create: `src/components/three/rooms/TheMind.tsx`
- Modify: `src/components/three/Scene.tsx`

**Step 1: Build the room**

```tsx
// src/components/three/rooms/TheMind.tsx
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const CONCEPTS = [
  'Brand Strategy', 'Visual Storytelling', 'Consumer Psychology',
  'Creative Direction', 'Market Positioning', 'Design Thinking',
  'Campaign Architecture', 'Cultural Insight', 'Concept Development',
  'Art Direction', 'Audience Connection', 'Visual Impact',
]

function FloatingConcept({ text, index }: { text: string; index: number }) {
  const ref = useRef<THREE.Group>(null)
  const baseY = 1 + (index % 3) * 1.2
  const baseX = (index % 4 - 1.5) * 3
  const baseZ = -30 + Math.floor(index / 4) * -3

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = baseY + Math.sin(t * 0.5 + index) * 0.3
    ref.current.rotation.y = Math.sin(t * 0.3 + index * 0.5) * 0.1
  })

  return (
    <group ref={ref} position={[baseX, baseY, baseZ]}>
      <Text
        fontSize={0.25}
        color={`hsl(${270 + index * 15}, 80%, 70%)`}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  )
}

function ConnectingLines() {
  const ref = useRef<THREE.LineSegments>(null)
  const geometry = useMemo(() => {
    const points: number[] = []
    for (let i = 0; i < 30; i++) {
      points.push(
        (Math.random() - 0.5) * 10, Math.random() * 3 + 0.5, -25 - Math.random() * 15,
        (Math.random() - 0.5) * 10, Math.random() * 3 + 0.5, -25 - Math.random() * 15,
      )
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return geo
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#8b5cf6" transparent opacity={0.15} />
    </lineSegments>
  )
}

export default function TheMind() {
  return (
    <group position={[0, 0, 0]}>
      {/* Dark floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -30]}>
        <planeGeometry args={[14, 20]} />
        <meshStandardMaterial color="#0a0a0f" />
      </mesh>

      {/* Room label */}
      <Text
        position={[0, 3.5, -22]}
        fontSize={0.5}
        color="#a78bfa"
        anchorX="center"
      >
        The Mind
      </Text>
      <Text
        position={[0, 3, -22]}
        fontSize={0.15}
        color="#7c3aed"
        anchorX="center"
      >
        Strategy & Vision
      </Text>

      {/* Floating concept words */}
      {CONCEPTS.map((text, i) => (
        <FloatingConcept key={text} text={text} index={i} />
      ))}

      {/* Connecting lines between concepts */}
      <ConnectingLines />

      {/* Neon accent lights */}
      <pointLight position={[0, 3, -30]} intensity={2} color="#8b5cf6" distance={15} />
      <pointLight position={[-5, 1, -28]} intensity={1} color="#6d28d9" distance={10} />
      <pointLight position={[5, 1, -33]} intensity={1} color="#a78bfa" distance={10} />
    </group>
  )
}
```

**Step 2: Add to Scene, remove temp cube at -30**

**Step 3: Verify** — dark room with floating purple concept words, subtle connecting lines

**Step 4: Commit**

```bash
git add src/components/three/rooms/TheMind.tsx src/components/three/Scene.tsx && git commit -m "feat: add Room 2 'The Mind' — strategy & vision"
```

---

### Task 10: Room 3 — "The Build" (AI-Powered Dev)

**Files:**
- Create: `src/components/three/rooms/TheBuild.tsx`
- Modify: `src/components/three/Scene.tsx`

**Step 1: Build the room**

```tsx
// src/components/three/rooms/TheBuild.tsx
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const CODE_LINES = [
  'const vision = await ai.create(dream)',
  'function buildImpossible() {',
  '  return reality.transcend()',
  'import { future } from "@mjay/studio"',
  '<Canvas><World /></Canvas>',
  'deploy(imagination, { target: "web" })',
  'const portfolio = shatter(expectations)',
  'export default function Amazing() {',
]

const TECH_STACK = [
  'React', 'Three.js', 'Next.js', 'TypeScript',
  'GSAP', 'Tailwind', 'AI Tools', 'WebGL',
]

function FloatingCode({ line, index }: { line: string; index: number }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.x = -4 + Math.sin(t * 0.3 + index * 0.7) * 0.5
    ref.current.material && (ref.current.children[0] as any)
  })

  return (
    <group ref={ref} position={[-4, 3 - index * 0.5, -60 - (index % 3) * 2]}>
      <Text
        fontSize={0.15}
        color="#22d3ee"
        anchorX="left"
        anchorY="middle"
        font="/fonts/fira-code.woff"
      >
        {line}
      </Text>
    </group>
  )
}

function TechOrb({ label, index }: { label: string; index: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const angle = (index / TECH_STACK.length) * Math.PI * 2
  const radius = 3

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const currentAngle = angle + t * 0.3
    ref.current.position.x = Math.cos(currentAngle) * radius
    ref.current.position.z = -60 + Math.sin(currentAngle) * radius
    ref.current.position.y = 2 + Math.sin(t + index) * 0.3
  })

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}

function DataGrid() {
  const ref = useRef<THREE.Group>(null)

  const gridLines = useMemo(() => {
    const lines: { start: THREE.Vector3; end: THREE.Vector3 }[] = []
    for (let i = -5; i <= 5; i += 1) {
      lines.push({
        start: new THREE.Vector3(i, 0.01, -52),
        end: new THREE.Vector3(i, 0.01, -68),
      })
      lines.push({
        start: new THREE.Vector3(-5, 0.01, -52 - (i + 5)),
        end: new THREE.Vector3(5, 0.01, -52 - (i + 5)),
      })
    }
    return lines
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        const mat = (child as THREE.Line).material as THREE.LineBasicMaterial
        mat.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.3) * 0.1
      })
    }
  })

  return (
    <group ref={ref}>
      {gridLines.map((line, i) => {
        const points = [line.start, line.end]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color="#06b6d4" transparent opacity={0.2} />
          </line>
        )
      })}
    </group>
  )
}

export default function TheBuild() {
  return (
    <group position={[0, 0, 0]}>
      {/* Dark floor with grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -60]}>
        <planeGeometry args={[14, 20]} />
        <meshStandardMaterial color="#050510" />
      </mesh>

      <DataGrid />

      {/* Room label */}
      <Text
        position={[0, 3.5, -52]}
        fontSize={0.5}
        color="#22d3ee"
        anchorX="center"
      >
        The Build
      </Text>
      <Text
        position={[0, 3, -52]}
        fontSize={0.15}
        color="#06b6d4"
        anchorX="center"
      >
        AI-Powered Development
      </Text>

      {/* Floating code */}
      {CODE_LINES.map((line, i) => (
        <FloatingCode key={i} line={line} index={i} />
      ))}

      {/* Orbiting tech stack */}
      {TECH_STACK.map((tech, i) => (
        <TechOrb key={tech} label={tech} index={i} />
      ))}

      {/* Electric lighting */}
      <pointLight position={[0, 3, -60]} intensity={2} color="#06b6d4" distance={20} />
      <pointLight position={[-3, 1, -58]} intensity={1} color="#22d3ee" distance={8} />
      <pointLight position={[3, 1, -62]} intensity={1} color="#0891b2" distance={8} />
    </group>
  )
}
```

**Step 2: Add to Scene, remove temp cube at -60**

**Step 3: Verify** — futuristic room with floating code, orbiting tech spheres, grid floor

**Step 4: Commit**

```bash
git add src/components/three/rooms/TheBuild.tsx src/components/three/Scene.tsx && git commit -m "feat: add Room 3 'The Build' — AI-powered dev"
```

---

### Task 11: Room 4 — "The Future" (Contact)

**Files:**
- Create: `src/components/three/rooms/TheFuture.tsx`
- Modify: `src/components/three/Scene.tsx`

**Step 1: Build the room**

```tsx
// src/components/three/rooms/TheFuture.tsx
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

function Stars() {
  const ref = useRef<THREE.Points>(null)
  const count = 500
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40
    positions[i * 3 + 1] = Math.random() * 20
    positions[i * 3 + 2] = -80 - Math.random() * 30
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

function ContactLink({ text, url, position }: {
  text: string
  url: string
  position: [number, number, number]
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1
  })

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.25}
        color="#10b981"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  )
}

export default function TheFuture() {
  return (
    <group position={[0, 0, 0]}>
      {/* No floor — open space */}
      <Stars />

      {/* Room label */}
      <Text
        position={[0, 3, -83]}
        fontSize={0.6}
        color="#10b981"
        anchorX="center"
      >
        The Future
      </Text>
      <Text
        position={[0, 2.4, -83]}
        fontSize={0.2}
        color="#6ee7b7"
        anchorX="center"
      >
        Let&apos;s build something together
      </Text>

      {/* Contact links */}
      <ContactLink text="LinkedIn" url="https://linkedin.com" position={[-2, 1.6, -88]} />
      <ContactLink text="Email" url="mailto:hello@mjaystudios.com" position={[0, 1.6, -88]} />
      <ContactLink text="mjaystudios.com" url="https://mjaystudios.com" position={[2, 1.6, -88]} />

      {/* Tagline */}
      <Text
        position={[0, 1, -90]}
        fontSize={0.15}
        color="#4ade80"
        anchorX="center"
      >
        Designer. Visionary. Builder.
      </Text>

      {/* Open, expansive lighting */}
      <pointLight position={[0, 5, -88]} intensity={1.5} color="#10b981" distance={25} />
      <ambientLight intensity={0.1} />
    </group>
  )
}
```

**Step 2: Add to Scene, remove remaining temp cubes**

**Step 3: Verify** — open starfield room with floating contact info

**Step 4: Commit**

```bash
git add src/components/three/rooms/TheFuture.tsx src/components/three/Scene.tsx && git commit -m "feat: add Room 4 'The Future' — contact space"
```

---

### Task 12: UI Overlay — Room Labels & WASD Toggle

**Files:**
- Create: `src/components/ui/RoomIndicator.tsx`
- Create: `src/components/ui/WASDToggle.tsx`
- Create: `src/components/ui/GalleryUI.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create RoomIndicator**

```tsx
// src/components/ui/RoomIndicator.tsx
'use client'

import { useAppStore } from '@/stores/useAppStore'

const ROOM_NAMES = ['The Eye', 'The Mind', 'The Build', 'The Future']
const ROOM_SUBS = ['Design & Advertising', 'Strategy & Vision', 'AI-Powered Dev', 'Contact']

export default function RoomIndicator() {
  const currentRoom = useAppStore((s) => s.currentRoom)
  const phase = useAppStore((s) => s.phase)

  if (phase !== 'gallery') return null

  return (
    <div className="fixed top-8 left-8 z-50 text-white">
      <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">
        {ROOM_SUBS[currentRoom]}
      </p>
      <h2 className="text-2xl font-bold">{ROOM_NAMES[currentRoom]}</h2>
      {/* Progress dots */}
      <div className="flex gap-2 mt-3">
        {ROOM_NAMES.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentRoom ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
```

**Step 2: Create WASDToggle**

```tsx
// src/components/ui/WASDToggle.tsx
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
      className="fixed bottom-8 right-8 z-50 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm hover:bg-white/20 transition-colors"
    >
      {navMode === 'scroll' ? '🎮 Explore Freely (WASD)' : '📜 Back to Guided Tour'}
    </button>
  )
}
```

**Step 3: Create GalleryUI wrapper**

```tsx
// src/components/ui/GalleryUI.tsx
'use client'

import RoomIndicator from './RoomIndicator'
import WASDToggle from './WASDToggle'

export default function GalleryUI() {
  return (
    <>
      <RoomIndicator />
      <WASDToggle />
    </>
  )
}
```

**Step 4: Add GalleryUI to page.tsx**

```tsx
// src/app/page.tsx
import dynamic from 'next/dynamic'
import FacadePortfolio from '@/components/facade/FacadePortfolio'
import GalleryUI from '@/components/ui/GalleryUI'

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false })
const ShatterOverlay = dynamic(() => import('@/components/facade/ShatterOverlay'), { ssr: false })

export default function Home() {
  return (
    <main>
      <FacadePortfolio />
      <ShatterOverlay />
      <Scene />
      <GalleryUI />
    </main>
  )
}
```

**Step 5: Verify** — room name shows in top-left, WASD toggle in bottom-right, both only visible after shatter

**Step 6: Commit**

```bash
git add src/components/ui/ src/app/page.tsx && git commit -m "feat: add gallery UI overlay — room indicator and WASD toggle"
```

---

### Task 13: Polish & Mobile Responsive

**Files:**
- Modify: `src/components/ui/WASDToggle.tsx` — hide on mobile
- Modify: `src/components/three/CameraRig.tsx` — disable WASD on touch devices
- Modify: `src/app/layout.tsx` — meta tags, title, description

**Step 1: Update layout.tsx with proper meta**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MJay Studios — Created to Create',
  description: 'Portfolio of Matthew Johnson — Designer, Visionary, Builder. Explore an interactive 3D gallery of design, strategy, and AI-powered development.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  )
}
```

**Step 2: Hide WASD toggle on mobile** — add `hidden md:block` to the button wrapper

**Step 3: Add touch detection to CameraRig** — skip WASD key listeners if `'ontouchstart' in window`

**Step 4: Verify on mobile viewport** — scroll-only experience, no WASD button

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: add meta tags, mobile responsive, hide WASD on touch"
```

---

### Task 14: Deploy to Vercel

**Step 1: Ensure build succeeds locally**

```bash
npm run build
```

Fix any TypeScript or build errors.

**Step 2: Initialize Vercel project**

```bash
npx vercel --yes
```

**Step 3: Deploy to production**

```bash
npx vercel --prod
```

**Step 4: Verify live URL works** — full flow from facade → shatter → gallery

**Step 5: Commit any build fixes**

```bash
git add -A && git commit -m "fix: build fixes for Vercel deployment"
```

---

## Task Dependency Order

```
Task 1 (Scaffold) → Task 2 (Store) → Task 3 (Hero) → Task 4 (Grid) → Task 5 (Canvas)
→ Task 6 (Shatter) → Task 7 (Camera) → Task 8-11 (Rooms, can parallelize)
→ Task 12 (UI) → Task 13 (Polish) → Task 14 (Deploy)
```

Tasks 8-11 (the four rooms) are independent and can be built in parallel by subagents.
