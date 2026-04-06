# MJay Studios Portfolio Redesign — Design Document

**Date:** 2026-03-06
**Author:** Matthew Johnson + Claude

## Vision

A portfolio site that subverts expectations. Loads as a clean, professional portfolio — then shatters to reveal a 3D gallery world behind the facade. Core message: "This guy can build anything."

Matthew brings together design, visionary/conceptual thinking, marketing/advertising experience, and AI-powered software development. The site tells his career story as a journey through four rooms.

## Narrative Arc

1. **"The Eye"** — Design career (Keller/10over12, Berry Global). Packaging, branding, advertising. Establishes visual credibility.
2. **"The Mind"** — Strategic/conceptual thinking. How he thinks, not just what he makes. Marketing philosophy, brand storytelling.
3. **"The Build"** — AI-powered development. The site itself is the proof. Apps, tools, web experiences built with AI.
4. **"The Future"** — Contact/collaboration. Forward-looking invitation.

## Experience Flow

### Phase 1: "The Mask"
- User sees a standard modern portfolio site (Tailwind-styled)
- Hero with "Created to Create," work grid, nav bar
- Subtle hint that something is different (flicker, hidden element)

### Phase 2: "The Shatter"
- Triggered by scroll past fold or CTA click
- DOM elements become textured planes in Three.js
- Fragments tumble away with GSAP-driven physics-like animation
- Camera pulls back revealing the 3D gallery

### Phase 3: Gallery Navigation
- **Scroll mode (default):** Camera follows a spline path through all rooms. Scroll = camera position.
- **WASD mode:** Toggle button enables pointer-lock FPS controls. Button to return to guided path.
- Mobile: Scroll-driven only, no WASD.

## Room Designs

### Room 1: "The Eye" — Design Career
- Geometric gallery: white box-geometry walls, dramatic lighting
- Portfolio work as floating image planes with hover glow
- Warm golden lighting — classic, established feel

### Room 2: "The Mind" — Strategy & Vision
- Abstract, darker space with neon accent lighting
- Floating text fragments of philosophy and approach
- Atmospheric — particles or animated lines connecting concepts

### Room 3: "The Build" — AI-Powered Dev
- Most technically impressive room — the room IS the portfolio
- Code snippets, live screenshots, self-reference to this site
- Bright, electric, futuristic aesthetic
- Elements respond to cursor/proximity

### Room 4: "The Future" — Contact
- Expansive open space — sky, horizon
- Contact form/links floating in space
- "Let's build something together"

## Tech Stack

- **Next.js 14** (App Router) — SSR for facade, SEO
- **React Three Fiber + Drei** — Declarative 3D
- **GSAP + ScrollTrigger** — Animations, scroll-driven camera
- **Zustand** — State management (mode, room, scroll progress)
- **Tailwind CSS** — Facade page styling
- **Vercel** — Hosting (free tier)

No Blender. All environments procedural (Drei primitives, shaders, lighting). All AI-driven development.

## Project Structure

```
src/
  app/
    page.tsx              # Entry — facade + 3D canvas
    layout.tsx
  components/
    facade/               # The "fake" portfolio
      FacadePortfolio.tsx
      HeroSection.tsx
      WorkGrid.tsx
      NavBar.tsx
    three/                # 3D components
      Scene.tsx           # Main R3F canvas
      CameraRig.tsx       # Scroll + WASD camera
      ShatterTransition.tsx
      rooms/
        TheEye.tsx
        TheMind.tsx
        TheBuild.tsx
        TheFuture.tsx
    ui/                   # Overlay UI
  stores/
    useAppStore.ts        # Zustand store
  lib/
    cameraPath.ts         # Spline for scroll camera
```

## Scope

### MVP (Day 1)
- Fake portfolio landing page
- Shatter/reveal transition
- 4-room gallery with scroll-driven camera
- WASD toggle for free exploration
- Procedural 3D environments
- Portfolio content as textures/planes
- Mobile responsive fallback (scroll only)
- Deployed to Vercel

### Phase 2 (Post-launch)
- Unique interactive mechanics per room
- Sound design / ambient audio
- Easter eggs and hidden content
- AI-generated 3D models
- Polished room transitions
- Loading screen / progress bar
