# LabraDon Properties site preview (/labradon), design

Date: 2026-10-02. Status: built (see "As built" at the end).

## Goal
Pitch LabraDon Properties LLC (Seth French, USMC veteran, Hampton Roads VA) a
website that wins new clients across **all four audiences equally**: property
managers and investors, homeowners, real estate agents, and commercial/facility
owners. It must look clearly better than jerryharrisremodeling.com and
vbhomesliving.com, feel bold and trustworthy, embrace the black and white logo,
make the imagery shine, and never read as a quick AI site.

Hosted as a noindex preview at `mjaystudios.com/labradon`. Four options in total:
the two ChatGPT directions already in the repo (kept, lightly touched up) plus
two new directions.

## Positioning (from research, sources in docs/labradon/research.md)
- Hampton Roads is ~41% renter households, renters growing 1.7%/yr vs owners
  0.3% (HUD CHMA 2024). 366 property-management firms in the metro (BLS QCEW
  2024). 9 military installations.
- PCS moving season (about May 15 to Aug 31) spikes turnovers; Va. Code
  55.1-1235 lets PCS'd servicemembers end leases early, so turns come at short
  notice. No local competitor speaks to this.
- Vacant units average 34.4 days move-out to move-in (RealPage); a turnover costs
  about $3,872 all-in (Zego). Local apartment rent $1,519 (HUD) means roughly
  $50 per vacant day.
- PMs choose vendors on paperwork and process: COI with additional insured,
  W-9, response time, photo documentation, WO numbers on invoices.
- "Veteran-owned" alone is not distinctive locally (JDog VB). Seth's JTAC role,
  coordinating many moving parts on a timeline, is the real differentiator.
- Competitors win on history, reviews and pro photography. LabraDon cannot fake
  those, so it wins on clarity, niche specificity, visible process and
  presentation of real work.

Brand lines: his own **"Rent-Ready. Guaranteed. Your team won't have to touch it
again."**, **"No subcontractor roulette."**, the Claude draft's **"A loyal
partner in every deal."**, and new: **"We bring it back."** (retriever + restoring
properties + color returning) and **"Disciplined like a Marine. Loyal like a
Lab."**

## Imagery system (shared)
- The UI is strictly black and white like the logo. **Every "before" photo is
  grayscale with light grain (CSS filter); every "after" is full color.** The only
  color on the site is finished LabraDon work. This also hides that the befores
  are 480px phone shots.
- Use the high-res originals found in his WordPress media library (1200 to 4032px)
  instead of the 640px copies. `scripts/prepare-labradon-photos.mjs` (sharp)
  auto-rotates, applies one mild consistent grade, crops IMG_4341's black bars,
  and writes WebP (max 2400px) to `public/labradon/photos/`. Originals stay in
  `public/labradon/assets/` (already vercelignored).
- Before/after pairs are not pixel-aligned; each pair carries per-image
  `objectPosition` and `scale` so the slider halves line up visually.
- **No AI-generated images** (his library has several: flyers, dog in tactical
  gear, "sold" families). Real project photos, Seth and Donnie, crew at work, and
  one Pexels Norfolk waterfront photo for the region.
- Pairs: apartment kitchen (8600/9584, 8594/9581), apartment living
  (Better-Entrance-After-2/9568), apartment bedroom (8611/9572), apartment bath
  (8623/9574), Chesapeake living (7734/9813), Chesapeake bedrooms (7778/9808,
  7780/9796, 7781/9812), Chesapeake bath (7768/9807). Finished hero shots:
  IMG_0545 kitchen, APARTMENT-CLEAN, Master-bedroom-clean.

## Logo (shared)
Trace the supplied logo with potrace into clean SVGs: stacked lockup, horizontal
lockup, and the doghouse + Lab mark alone (favicon and brand device). Black and
white versions via `currentColor`. Replaces the `contrast(2.2)` filter hack.

## Routes
- `/labradon` becomes the **hub**: pitch page for Seth (see Hub below).
- `/labradon/rent-ready/...` and `/labradon/the-finish/...` are new, served by
  `src/app/labradon/[direction]/` with `generateStaticParams` and
  `dynamicParams = false`. Each direction has: home, `work`, `services`,
  `about`, `request`.
- ChatGPT options: "The Property Standard" moves from `/labradon` to
  `/labradon/standard`; "The Operating Partner" stays at `/labradon/partner`;
  their work page stays at `/labradon/work`. `/labradon/strategy` redirects to
  the hub (its notes fold into the hub).
- One shared **options bar** across all four options and the hub so the client
  can flip between them.

## Code structure
- `src/data/labradon/`: `site.ts` (identity, phone, email, cities, credentials
  with a `confirm` flag), `services.ts` (7 services, turn packages, special
  condition list, trades), `projects.ts` (pairs and finished shots), `audiences.ts`
  (4 audiences: copy, proof photo, request preset), `facts.ts` (cited stats).
- `src/app/labradon/layout.tsx`: loads fonts as CSS variables only; no longer
  wraps everything in `.ld`. The ChatGPT pages wrap themselves in `.ld` so their
  global-ish rules cannot leak into the new directions.
- New code is scoped under `.lab` with `data-dir="rent-ready" | "the-finish"`
  setting tokens (fonts, ground, display case). Readable multi-line components
  and CSS, matching the KYD code style.
- Shared components (`src/app/labradon/_lab/`): `BeforeAfter` (pointer drag +
  keyboard via range input, clip-path), `Logo`, `OptionsBar`, `SiteHeader`,
  `SiteFooter`, `MobileBar` (sticky Call / Request), `RequestForm`, `ProjectGrid`,
  `ServiceDetail`, `VendorFile`, `FounderStory`, `Faq`.

## Direction 01 · Rent-Ready (the operator)
Swiss-industrial black and white on white paper with black blocks. Archivo
variable (condensed, weight 800, uppercase) for display, Archivo normal width for
body, IBM Plex Mono for work-order labels. Square corners, ruled grids.

Home: utility bar (veteran-owned, Hampton Roads, phone) → hero "RENT-READY.
GUARANTEED." with full-width before/after (Chesapeake Keyrenter living room)
framed as an example work order → **"I need to…" switcher** (turn a rental unit /
sell or rent my home / clear an inspection list / service a facility) swapping
headline, bullets, proof photo and prefilled CTA → numbers band (34.4 days, $3,872,
one call, 5-day documented turn labeled as a project example) → turn packages
(Light / Standard / Total, quoted per unit after walkthrough) → before/after wall
→ "The turn, run like a mission" timeline → **PCS season band** ("PCS season is
turnover season. Reserve 2027 summer capacity.") → vacancy calculator (defaults
$1,519 rent, 5 days, 12 turns; sourced) → vendor file → founder "Coordination is
the job." → FAQ → footer CTA "Have a move-out coming?"

## Direction 02 · The Finish (cinematic, story-led)
Black ground, white type. Frank Ruhl Libre (heavy) display serif, Cinzel small
caps for labels echoing the logo's "PROPERTIES", Hanken Grotesk body.

Home: centered stacked logo header → hero: IMG_0545 kitchen bleeding from
grayscale to color on load, headline **"We bring it back."** → large serif intro
statement → **scroll showpiece**: three rooms pinned in turn, each wiping
grayscale before → color after with scope and city (GSAP ScrollTrigger; static
side-by-side under reduced motion) → four photographic audience doors → Seth &
Donnie "Disciplined like a Marine. Loyal like a Lab." (beach photo, Donnie, crew
at work) → numbered services index with disclosure → "What we put in writing"
standards → grayscale Norfolk waterfront with the seven cities → footer CTA
"Tell us about the property."

## Shared inner pages (both new directions, themed by tokens)
- **Work**: projects grouped (5-day apartment turnover; Chesapeake home turnover
  for Keyrenter PM of Hampton Roads), every pair as a slider, plus finished shots.
- **Services**: 7 services incl. turn packages and what a standard turn includes
  (his checklist), special condition cleanup, commercial/facility support.
- **About**: JTAC story, Evansville roots, Regent MBA/MA, Donnie, values, vendor
  file, service area.
- **Request**: step 1 "I'm a…" (4 audiences); step 2 has 3 to 5 audience-specific
  fields (PM: address, move-out date, units, WO #; homeowner: address, need,
  timing; agent: address, closing date, repair list; facility: type, size,
  frequency); step 3 contact. Prefilled from `?for=&service=`. Preview never
  sends or stores data and says so; ends with a work-order style summary.

## ChatGPT options: light touch-ups only
Same layouts and copy, plus: readable type sizes (body 15 to 16px, labels 11 to
12px instead of 9 to 13px); high-res originals; Property Standard hero swapped from
the unverified staged living room to a real LabraDon finished room; toggle
replaced by the shared drag `BeforeAfter`; new SVG logo; JTAC detail in the
founder copy; shared options bar; work page shows all project pairs.

## Hub (/labradon)
Branded B&W pitch page: short intro, four option cards with screenshots and who
each is best for (recommend the new two), "why this beats Jerry Harris and VB
Homes" comparison, research highlights with sources, the imagery idea, **confirm
before launch** list, and the post-pick roadmap.

Confirm-before-launch list: phone (757) 276-1715 vs (812) 470-6195 on flyers and
capability statement; UEI (DN7PKFKLV4W1 vs DN3EKPKLV4W1) and NAICS (561720 vs
236118) mismatch; EPA RRP and OSHA 30 (not shown until confirmed); insurance
lines; permission to name Keyrenter and Levco; response-time promise ("reply
within one business day" is used as a placeholder); whether IMG_0545,
APARTMENT-CLEAN and Master-bedroom-clean are LabraDon jobs; real Google reviews.
Never publish the third-party reference contact on his capability statement.

Roadmap after a pick: Google Business Profile and review requests, Local Services
Ads categories (house cleaning, junk removal, handyman, painter, flooring), city
pages for "move out cleaning [city] va" and junk/trash-out searches, form to CRM
or inbox with spam protection, call tracking.

## Copy rules
No em dashes in site copy. No invented reviews, awards, project counts or
turnaround promises; every stat is cited. "5 days" only as a documented project.

## Verification
Lint and typecheck scoped to labradon; production build; puppeteer screenshots of
every route at 390px and 1440px (`scripts/shoot-labradon.mjs`); slider works by
pointer and keyboard; request flow all four audiences; no horizontal overflow at
320px; reduced-motion path for the showpiece.

## Out of scope
Real form delivery, CMS, reviews integration, city/service SEO pages (roadmap).

## Deploy
Push to `main` deploys via the existing Vercel project. Pages stay noindex.

## As built (2026-10-02)
- Slider pairs use solved per-layer CSS transforms (landmark-based) instead of
  object-position/scale; bathroom, red-carpet bedroom and all apartment pairs
  are diptychs because the shots cannot be aligned.
- The Pexels "Hampton Roads" waterfront appears to be Halifax, NS; The Finish
  ends with a typographic city list instead of a photo.
- The Finish header keeps the logo left (wordmark) rather than centered.
- Hub thumbnails live in `public/labradon/hub/` (regenerate after visual changes).
- Logo SVGs come from `scripts/trace-labradon-logo.py`.
