# Art Director Portfolio Research — What Works

**Date:** 2026-04-03
**Purpose:** Research the best art director / creative director portfolios to inform the MJay Studios redesign.

---

## Portfolios Worth Studying

### 1. Lu Yu — luyu.co
**Role:** Interaction designer & art director. Former Head of Brand at Pitch. Awwwards jury member.

**What makes it great:**
- **Typography-forward:** Uses Cosi Azure (display), Cosi Times (secondary), and Patron (body) — a refined, intentional type system that immediately signals design taste.
- **Offset layout:** Project names are positioned partially on/off their images, creating visual tension and sophistication without gimmicks.
- **Color as accent:** Teal-to-blue gradient highlights content sections against a mostly neutral backdrop.
- **Intersection of brand + product:** The site itself demonstrates the exact skill being sold — graphic sensibility applied to digital.
- **Teaches a Domestika course on portfolio design** — meaning this site is literally a textbook example.

### 2. Fabian Wilhelm — fabianwilhelm.de
**Role:** Art director & digital designer, Berlin. 10+ years in web, motion, and digital marketing.

**What makes it great:**
- **Simple grid, elevated execution:** Projects categorized by web / motion / app / print in a straightforward grid, but the typography, color, and whitespace make it feel premium.
- **Fully responsive** — recognized by Awwwards.
- **Proves that a "simple" portfolio done with taste > a complex one done without it.**
- Inspired use of whitespace gives breathing room to every project.

### 3. Derek Boateng
**Role:** London-based designer, 10+ years experience. Featured by Creative Bloq.

**What makes it great:**
- Art-directed portfolio where the site itself feels like a design project.
- Demonstrates confidence — the portfolio *is* the work.

### 4. Simon Kern — simonkern.fr
**Role:** Art director based in Nantes, France. Awwwards Honorable Mention.

**What makes it great:**
- Creative/art director who uses his portfolio as a demonstration of his taste.
- Clean execution with personality.

### 5. Anthony Goodwin — designembraced.com
**Role:** Creative/Art Director and Designer.

**What makes it great:**
- Clean typography paired with WebGL and experimental design elements.
- Proves you can add interactive flair without building a full 3D world.
- Balance of polish and personality.

### 6. Kacper Chlebowicz
**Role:** Art director. Featured on Awwwards.

**What makes it great:**
- Focus on motion and interaction design.
- The portfolio demonstrates motion skills *through* the site interactions themselves.

### 7. Kazuki Noda
**Role:** Visual designer and art director. Featured on Awwwards.

**What makes it great:**
- Clean, refined visual design.
- The site reflects the precision and taste of the work inside it.

---

## Key Patterns Across the Best Portfolios

### Layout
- **Grid-based project displays** are the standard, but elevated with asymmetry, offset positioning, or varied image sizes (masonry).
- **Generous whitespace** is universal. Nothing feels cramped. Let the work breathe.
- **Projects organized by type** (web / print / motion / brand) rather than by client tends to work better for art directors — it tells a story about your range.
- **Case study pages** that show process (problem → approach → outcome) add depth, but lead with the result, not wireframes.

### Typography
- **Typography IS the design.** The best portfolios use 2-3 carefully chosen typefaces as their primary design element.
- **Large display type** for project titles and hero sections. This is the single biggest "quality signal."
- **Contrasting type pairings:** A distinctive display face + a clean sans-serif body. The display face carries all the personality.
- Fonts commonly seen: custom or premium typefaces (not Google Fonts defaults). Investing in type = investing in perceived quality.

### Color
- **Restrained palettes.** Most use black/white/neutral as the base with 1-2 accent colors.
- **Let the work provide the color.** When your portfolio pieces are colorful, the site itself should be neutral.
- Monochrome or near-monochrome sites feel more "art director" than saturated ones.

### Navigation
- **Simple, almost invisible navigation.** Minimal nav bars. Sometimes just a name/logo + a menu toggle.
- **Scroll as primary interaction.** The best portfolios are designed to be scrolled through like a curated exhibition.
- **No hamburger menus on desktop** — the nav has few enough items (Work, About, Contact) to show them all.

### Interactions & Animation
- **Subtle, purposeful motion.** Hover effects on project thumbnails (scale, reveal, color shift). Smooth scroll transitions. Fade-ins on scroll.
- **The site IS the proof of skill.** If you do motion, the site should move. If you do typography, the site should be typographically beautiful.
- **Micro-interactions > spectacles.** A satisfying hover state beats a full WebGL scene for most art directors.

### Content Strategy
- **Lead with the work.** The best portfolios put projects above the fold, not mission statements.
- **Brief, confident copy.** Short bio. Let the work speak. No paragraphs explaining your creative philosophy.
- **Social proof woven in naturally** — client logos, awards, notable brands mentioned within project context, not as a separate "clients" section.

---

## 2026 Portfolio Trends (from Envato, Colorlib, UDIT research)

1. **Immersive case studies** — narratives that unfold progressively with scroll, combining multimedia, interactive timelines, and dynamic moodboards.
2. **Motion-first experiences** — GSAP 4.0 + ScrollTrigger for scroll-based storytelling. Motion is expected now, not optional.
3. **Authenticity over polish** — showing the messy process (sketches, dead ends, iterations) builds trust.
4. **Light 3D / WebGL accents** — a single interactive hero element or background, NOT a full 3D world.
5. **AI-built portfolios are common now** — which means hand-crafted details and strong art direction are the differentiator more than ever.

---

## Recommended Direction for MJay Studios

Based on this research, here's what I'd suggest:

### The Formula
**Clean, typographically bold portfolio with scroll-driven animations and immersive case studies.**

### Specifically:
1. **Hero:** Large display typography ("Created to Create" or similar) with a subtle animation (text reveal, parallax image, or a single tasteful WebGL accent). No 3D world — one premium moment.

2. **Project Grid:** Asymmetric grid of project thumbnails. Hover states that feel crafted (image reveal, color shift, subtle zoom). Projects categorized by discipline: Design / Strategy / Build.

3. **Case Study Pages:** The star of the site. Each project gets a full-page scroll-driven narrative: the brief → the thinking → the work → the outcome. Use GSAP ScrollTrigger for reveals.

4. **About Section:** Short. Confident. Photo + 2-3 sentences + career highlights (Keller, Berry Global, AI development). Let the work do the heavy lifting.

5. **Contact:** Simple. Email + LinkedIn + a one-liner. No form needed unless you want one.

6. **Typography:** Invest in 1 great display face + 1 clean sans. This single choice will define the entire site's personality.

7. **Color:** Near-monochrome base (black/white/warm gray) + one accent color that's uniquely yours.

8. **Tech:** Next.js + Tailwind + GSAP. Drop Three.js entirely unless we want ONE small accent. Way simpler to build and maintain.

### What This Gets You
- **Ships fast** — no 3D rooms to debug.
- **Looks premium** — typography + whitespace + motion = art director energy.
- **Easy to update** — add a new case study without touching 3D code.
- **Mobile-first** — no WebGL performance worries.
- **The site proves the skill** — an art director's portfolio should feel *directed*, not engineered.
