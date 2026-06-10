# Monograph — "The Wall" hero + "Liquid Spotlight" lightbox

**Date:** 2026-06-10
**Status:** Approved design, pending implementation plan
**Scope:** The monograph version of the site only. The classic version (`Shell.tsx` + `FullscreenDetail.tsx`) is left untouched.

## Goal

Make the monograph hero a show-stopping, memorable experience that proves the
operator is elite at design *and* at building sophisticated software — while
fixing the concrete failures of the current `HeroShader` (layout reflow on
texture load, darkened/matted art, busy small tiles).

Two pieces:

1. **The Wall** — an interactive, infinite, draggable WebGL gallery of *all*
   project images, replacing the hero's right panel.
2. **Liquid Spotlight** — a monograph-specific lightbox with pointer-reactive
   liquid transitions, replacing the monograph's use of the shared
   `FullscreenDetail`.

## Confirmed decisions

- Wall motion: **free 2D drag** — fling any direction, grid wraps infinitely on
  both axes (toroidal).
- Lightbox fit: **object-contain on a blurred backdrop** — whole artwork always
  visible, no harsh dark letterbox bars.
- Wall distortion: **subtle & refined** — gentle curvature + faint RGB-split
  only while flinging fast; exactly zero at rest.

## Asset inventory (designed against)

- 15 projects, 14 with images; ~92 image paths across `images` +
  `caseStudy.additionalImages`; 109 files total under `public/portfolio`.
- Source of truth: `src/data/projects.ts` (`projects`, `getProjectById`).

---

## Piece 1 — The Wall

### Component

`src/components/monograph/HeroWall.tsx` (new). Replaces the `HeroShader` usage
inside the hero-right `<div>` in `MonographView.tsx` (around lines 333–382).
`HeroShader.tsx` is removed once the Wall is verified working.

### Data

- A flat list of `{ src, projectId, alt }` built from all projects with images
  (one tile per image, both `images` and `caseStudy.additionalImages`).
- Order is **deterministic** (no `Math.random()` at module scope) — e.g. an
  index-based interleave/shuffle so the visual mix is varied but stable across
  renders and SSR. Built once via `useMemo` and passed as a stable reference,
  mirroring the existing `HERO_IMAGES` stable-ref pattern.

### Rendering / layout

- A single R3F `<Canvas>` filling the hero-right panel (absolute inset-0).
- Tiles are **fixed world-size** plane meshes (e.g. uniform tile + gutter),
  laid out on a grid of `cols × rows` covering the visible area plus a margin
  ring for wrap.
- **Toroidal wrap:** the grid offset is driven by a 2D drag offset; each tile's
  displayed image index and screen position are computed modulo the grid bounds
  so dragging any direction loops seamlessly and forever. A finite tile pool is
  reused; images repeat across the infinite field (acceptable — it's a teaser).
- Tiles **cover-crop** their image (UV cover fit) — cropping is fine for dozens
  of teaser thumbnails. Subtle ~-8° tilt of the whole field to echo the current
  aesthetic.
- Resize only repositions the camera / recomputes how many tiles are visible;
  **tile world-size never changes**, so there is no reflow.

### Texture loading (kills the reflow bug)

- Each tile owns its texture; a tile renders its background color until its
  texture decodes, then **fades itself in** (per-tile opacity tween). No global
  layout depends on any texture's natural aspect, so decode timing cannot cause
  a reflow. (This is the root-cause fix vs. the old aspect-driven cell sizing.)

### Motion / physics

- **Idle drift:** slow constant diagonal velocity when not interacting.
- **Drag:** pointer down → track delta → move offset 1:1. On release, the
  recent pointer velocity becomes inertial velocity that eases out
  (exponential damping toward the idle drift).
- **Focal swell:** tiles near the panel center gently scale up + lift in z
  (distance-based), giving depth without darkening.

### Distortion shader (subtle)

- Per-tile or full-field shader uniform `uVelocity` (magnitude of current
  motion).
- Effects scale with `uVelocity` and are **0 at rest**: a gentle lens curvature
  and a faint RGB channel split. Crisp, full-color, full-bleed when settled.

### Interaction: click vs drag

- Track pointer travel between down and up. If under a small threshold (e.g.
  6px) and quick → treat as a **tap** → open that tile's project in the
  lightbox via `setDetailProject(projectId)`. Above threshold → it was a drag,
  no open.
- Hover affordance (cursor + slight tile highlight) optional.

### Edge seam / blend

- A **light** CSS gradient overlay only on the inner edge meeting the type panel
  — far softer than today's `rgba(16,12,10,0.95)` wall. Mobile keeps the bottom
  fade.

### Reduced motion / mobile

- `prefers-reduced-motion`: static neat grid, no drift, no distortion; tiles
  still tappable.
- Mobile: hero-right becomes the top ~46vh band; fewer columns; touch-drag
  works; tap-to-open works.

### Reliability checklist (explicit, because the old one failed here)

- [ ] No layout depends on texture natural dimensions.
- [ ] Tile world-size constant across resize and load.
- [ ] Deterministic order (no `Math.random()` / `Date.now()` at module/render).
- [ ] Stable props to the Canvas (no array re-creation per render restarting loops).
- [ ] Art never matted or dimmed at rest.

---

## Piece 2 — Liquid Spotlight lightbox

### Component

`src/components/monograph/LiquidLightbox.tsx` (new). `MonographView` renders this
instead of `<FullscreenDetail />`. The classic `Shell.tsx` keeps
`FullscreenDetail` unchanged.

### Behavior ported from FullscreenDetail

- Reads `detailProject` / `setDetailProject` from `useAppStore`.
- `allImages = [...project.images, ...(caseStudy?.additionalImages ?? [])]`.
- Per-image caption lookup via `project.captions[filename]`.
- Links: `multiLinks`, `imageLinks[currentImage]`, or `project.link`
  (label = "View Report" for `.pdf`, else "Visit Site").
- Info: title, concept badge, description, process notes, `n of N`, dot strip,
  prev/next, minimize-to-focus, Esc + click-scrim to close, body scroll lock.
- Open/close transitions via GSAP (mirror existing fade/slide).

### Image stage (the new part)

- WebGL canvas in the image area (replaces the `next/image` swap).
- Current image rendered **object-contain** (whole piece visible, never
  cropped), sitting on a **blurred + dimmed copy of the same image** as backdrop
  so there are no hard dark bars — premium gallery feel.
- **Pointer-reactive flowmap:** cursor movement feeds a decaying flow buffer; the
  art ripples/displaces subtly where the pointer moves. Decays to still.
- **Transition:** changing image (arrows / keyboard ←→ / dot click) plays a
  **directional liquid wipe** — a noise + flow-driven displacement blending
  `from` → `to` textures. Crisp and full-color throughout; no darkening.
- Keyboard: ←/→ navigate, Esc closes.

### Reliability

- Contain-fit computed from the canvas size + texture aspect, recomputed on
  resize (letterbox math, not a layout grid — no reflow of page content).
- Single quad, two textures (from/to) — much simpler than the multi-cell hero
  shader.

---

## Shared / technical notes

- Stack already present: `@react-three/fiber`, `@react-three/drei`, `three`,
  `gsap` (`@/lib/gsap`). No new heavy deps expected.
- Palette constants reused from `MonographView` (`#100c0a` bg, brand `#F15A29`).
- Both components are `'use client'`.
- Keep WebGL work isolated per component; share small GLSL helpers (e.g. simplex
  noise) via a local util if duplicated.

## Out of scope

- No changes to the classic version, timeline view, or shared `FullscreenDetail`.
- No changes to project data or the gallery grid further down the monograph page.
- No new image assets.

## Success criteria

- Hero-right loads with **zero reflow** and **no darkened/matted art**.
- The Wall is draggable in any direction, wraps infinitely, flings with inertia,
  and tiles are crisp + full-color at rest.
- Tapping a tile opens the correct project in the Liquid Spotlight lightbox.
- The lightbox shows whole artwork (no crop), ripples under the pointer, and
  plays a liquid transition between images.
- Reduced-motion and mobile paths both work and are clickable.
- Classic version is visually and behaviorally unchanged.
