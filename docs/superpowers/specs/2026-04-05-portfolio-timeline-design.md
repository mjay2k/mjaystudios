# MJay Studios Portfolio — Timeline Design Spec

**Date:** 2026-04-05
**Status:** Approved
**Stack:** Next.js 16 + Tailwind CSS 4 + GSAP + Zustand

---

## Overview

A scroll-driven art director portfolio organized as a career timeline. The site uses a persistent shell architecture (Approach C) with two swappable content views — a chronological Timeline view (default) and a Category view — sharing the same scroll mechanics, floating info panel, and timeline rail.

---

## 1. Persistent Shell

Four elements that never unmount regardless of active view:

### 1.1 Top Nav Bar
- Transparent/blurred background, fixed top
- **Left:** "MJay Studios" wordmark in the display font
- **Right (in order):** View Toggle, About, Contact
- **Mobile:** Hamburger menu containing About + Contact; view toggle remains visible

### 1.2 View Toggle
- Stylized switch component with two states: "Timeline" and "By Type"
- Animated sliding indicator — not a dropdown, something with personality (label morph, sliding pill, etc.)
- Always visible on both desktop and mobile

### 1.3 Timeline Rail
- Dashed vertical line, positioned along the left edge (~60-80px from left on desktop)
- Hash markers at milestone points
- **Parallax:** Rail and markers scroll at a slower speed than content, creating depth
- **Timeline view:** Markers are year/era labels
- **Category view:** Markers are work type labels
- **Mobile:** Rail stays present but narrower/more compact, content sits flush-right with small spacing for the rail

### 1.4 Floating Info Panel
- Fixed position, left side between the rail and content area (~100-300px from left on desktop)
- Displays: section title, brief description, date range (context-dependent)
- **Animation:** Content inside the panel transitions out (fade/slide down) and new content transitions in (fade/slide up) when the active section changes. The panel container itself stays fixed.
- **Category view behavior:** Becomes a jump-nav menu — shows current section name + compact list of all categories for jump-scrolling
- **Mobile:** Sticky card at top or bottom, collapses to one line (era/section name), expands on tap for full description

---

## 2. Content Area

Right ~60-70% of viewport on desktop. Full-width minus rail space on mobile.

### 2.1 Layout
- Staggered images at varied sizes — not a rigid grid
- Scrolls at normal speed (content scroll speed is the baseline; rail scrolls slower)
- **Mobile:** Single column, clean vertical feed

### 2.2 Campaign Items (multi-image)
- Hero image auto-cycles through campaign variations with a subtle transition animation
- Description text alongside
- **On click:** Fullscreen overlay with manual navigation controls (prev/next), expanded description, and additional examples/information
- Passive scrolling = highlight reel; active click = deep dive

### 2.3 Single Pieces
- Static image + description
- **On click:** Fullscreen detail view if case study data exists (visual affordance like subtle icon or "View Details" on hover indicates clickable items)
- Items without case study data have no click affordance — they look complete as-is

---

## 3. Timeline View (Default)

Chronological scroll through three career eras, each with its own environmental identity.

### 3.1 Intro / About Teaser
- First thing visible before the eras begin
- Name, one-liner, subtle intro animation
- "Read more" link opens the About popup

### 3.2 Era 1: Agency Life
- **Accent color:** Keller red (subtle — accents, not fills)
- **Typography energy:** Futura-inspired boldness
- **Background:** Custom user-designed background, unique to this era
- **Content:** Heaven Hill, PAMA, Burnett's, Hpnotiq, Rittenhouse — spirits/beverage work, booth designs, print ads, recipe books, shelf talkers

### 3.3 Era 2: Berry Life
- **Accent color:** Berry blue (subtle accents)
- **Typography:** Shifts subtly to match Berry's corporate-clean energy
- **Background:** Custom user-designed background, unique to this era
- **Content:** EPIC campaign, Verdant, Resinite, Protect, Pack Expo booths, cannabis kit, trade ads

### 3.4 Era 3: After Berry
- **Accent color:** MJay orange
- **Typography:** More tech-influenced font treatment
- **Background:** Custom user-designed background, unique to this era
- **Content:** Teaching chapter (brief), AI mastery story, Bible Warden, News Warden — app screenshots, product/UI work, a different content format reflecting the shift from print to digital

### 3.5 Era Transitions
- Background transitions are animated — not simple wipes
- Specific transition effect TBD (options to prototype: dissolve with parallax, noise grain dissolve, gradient bleed from edges, clip-path geometric reveal, or combinations)
- User will design the custom backgrounds; transition style to be prototyped during build
- Floating info panel style subtly shifts to match the current era's mood

### 3.6 Outro / Contact Teaser
- Natural scroll endpoint after Era 3
- Simple CTA leading to Contact popup

---

## 4. Category View (Alternate)

Same shell, content organized by work discipline instead of chronology.

### 4.1 Sections
- Packaging Design
- Advertising / Print
- Booth / Environmental Design
- Logo Design
- Digital / App Development
- (Additional categories as needed based on content)

### 4.2 Category Backgrounds
- Each category gets its own custom user-designed subtle background
- Same animated transition treatment as era transitions

### 4.3 Timeline Rail Adaptation
- Hash markers become category labels instead of year/era labels

### 4.4 Info Panel as Jump-Nav
- Shows current category section name
- Compact list of all categories for tap-to-jump-scroll navigation

### 4.5 Logo Section Special Behavior
- Logos displayed on white background initially
- On scroll, each logo image reveals its black background version via a vertical clip/mask that slides down (each source image contains both versions — white on top, black on bottom)
- Creates a scroll-driven before/after reveal effect

---

## 5. Popups

### 5.1 About Popup
- Triggered from nav link or intro teaser "read more"
- Modal overlay with smooth scale/fade animation
- Content: photo, fuller bio, career highlights (Keller, Berry Global, teaching, AI development)

### 5.2 Contact Popup
- Triggered from nav link or outro CTA
- Same modal treatment as About
- Content: email, LinkedIn, optional simple form
- Clean and minimal

### 5.3 Fullscreen Project Detail
- Triggered by clicking campaign items or case-study-enabled single pieces
- Fullscreen overlay with manual navigation (prev/next for multi-image campaigns)
- Expanded description, additional examples, process information
- Close button returns to scroll position

---

## 6. Data Architecture

Single data structure powers both views:

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  year: number;
  era: 'agency' | 'berry' | 'afterberry';
  categories: string[];            // e.g. ['packaging', 'advertising']
  images: string[];                // single or multiple for campaigns
  autoCycle: boolean;              // true for multi-variation campaigns
  caseStudy?: {                    // optional — enables click-to-detail
    extendedDescription: string;
    additionalImages: string[];
    processNotes?: string;
  };
  sortOrder: number;               // controls position within era and category
}
```

- **Timeline view** filters/sorts by `era` + `sortOrder`
- **Category view** filters/sorts by `categories` + `sortOrder`
- Same data, different lenses

---

## 7. Visual Design Tokens

### 7.1 Typography
- **Display font:** Modern with artistic/stylized character (specific font TBD — to be selected during implementation)
- **Body font:** Clean sans-serif
- Two fonts total — display carries personality, body stays readable

### 7.2 Era Color Palettes (accent use only, not fills)
- **Agency Life:** Keller red + warm neutrals
- **Berry Life:** Berry blue + cool neutrals
- **After Berry:** MJay orange + tech-influenced neutrals

### 7.3 Base Palette
- Near-monochrome foundation (black/white/warm gray)
- Era accent colors are used sparingly for highlights, markers, links, info panel accents

### 7.4 Backgrounds
- Custom user-designed backgrounds per era (timeline view) and per category (category view)
- Animated transitions between them on scroll

---

## 8. Tech Stack

- **Next.js 16** — App Router, single-page architecture
- **Tailwind CSS 4** — styling and responsive design
- **GSAP + ScrollTrigger** — scroll-driven animations, parallax, content transitions, era background reveals
- **Zustand** — state management (active view, current section, scroll position)
- **No Three.js** — dropped entirely from the old approach

---

## 9. Mobile Adaptations Summary

| Element | Desktop | Mobile |
|---|---|---|
| Nav | Full bar with toggle + links | Hamburger for About/Contact, toggle stays visible |
| Timeline rail | Left edge, ~60-80px | Narrower, still present on left |
| Info panel | Fixed left side, ~100-300px | Sticky top/bottom card, tap to expand |
| Content | Right ~60-70% viewport | Full-width minus rail, single column |
| Campaign cycling | Auto-cycle with click-to-fullscreen | Same behavior |
| Logo reveal | Scroll-driven clip | Same, full-width |
| Background transitions | Animated | Same effects |
