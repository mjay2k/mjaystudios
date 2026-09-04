# Kentucky Dom site preview (/kyd) — design

Date: 2026-09-04. Status: approved in chat, building.

## Goal
Replace kentuckydom.com (WordPress + WooCommerce, last updated ~2021/2024) with a
custom site that promotes Dom first, then his music, socials and merch, and
communicates his message: God, country, family, common sense. Build it as a
preview inside mjaystudios (Vercel) at `/kyd` so progress can be reviewed
remotely, with several design directions to choose from.

## Architecture (mirrors /jaministries)
- `src/app/kyd/layout.tsx` — segment layout: imports `kyd.css`, loads KYD-only
  Google fonts as `--font-kyd-*` vars, exports metadata + favicon, wraps in
  `<div class="kyd">`.
- `src/app/kyd/kyd.css` — every design token and utility scoped under `.kyd`.
- `src/app/kyd/page.tsx` — chooser hub listing the directions with rationale.
- Direction home pages, each a complete front page with its own visual world:
  - `/kyd/unapologetic` — rally-poster energy. Black, red, cream, condensed
    display type, flag/halftone texture, catchphrases as headlines.
  - `/kyd/front-porch` — warm Kentucky documentary. Cream, denim, tobacco,
    serif headlines, press photography, faith and family story first.
  - `/kyd/nashville` — sleek modern artist site. Near-black, gold, music-first,
    newest single as hero, Spotify-style discography.
- Shared inner pages (used by every direction, neutral dark skin):
  `/kyd/music`, `/kyd/store`, `/kyd/store/[slug]`, `/kyd/about`, `/kyd/book`.
- Shared chrome: `SiteHeader.tsx`, `SiteFooter.tsx`, `cart/` (client context,
  drawer, localStorage persistence), `Follow` social block, `VideoGrid`.
- Content is plain TypeScript under `src/data/kyd/`: `site.ts` (identity, taglines,
  catchphrases, socials, contact, nav), `releases.ts` (21 releases with dates,
  labels, art, stream links), `videos.ts`, `products.ts`, `press.ts`, `gallery.ts`.
- Assets under `public/kyd/` (`brand/`, `art/`, `press/`, `products/`, `banners/`).

## Store
Generic, backend-agnostic. `Product` = { slug, name, price, compareAt?, category,
images[], description?, options?: { name, values[] }[] }. Cart is client-side,
persisted to localStorage; "Checkout" posts nothing and shows a "coming soon"
notice. Swap point is a single `checkout()` function in `cart/checkout.ts`.
Current 7 WooCommerce products are seeded; new merch is added by appending to
`products.ts`.

## Music
`releases.ts` is newest-first. "Face Like Mine" (2026-08-14, Baste Records) is
the featured release everywhere. Stream links: Spotify (artist + tracks where
known), Apple Music, Deezer, YouTube. Music page embeds the Spotify artist
player and lists every release with art and links; features are marked.

## Socials
Facebook is the primary channel (553K). Use the active Instagram handle
`@kentuckydommusic`, not the dormant `@kentucky_dom` the old site links.
Follow block links Facebook, TikTok, Instagram, YouTube, X, Spotify, Apple.

## Booking
Gigwell widget (agency 422563) embedded on `/kyd/book` plus Info@kentuckydom.com.

## Out of scope for now
Real checkout, CMS, newsletter backend (form is a placeholder), tour dates.

## Deploy
Push to `main` deploys to https://mjaystudios.com/kyd via Vercel. No config change
required. Add `public/kyd/scraped` to `.vercelignore` if bulk assets are staged.
