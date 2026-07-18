'use client';

import { useEffect, useRef, useState, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';
import Image from 'next/image';
import { useAppStore } from '@/stores/useAppStore';
import { projects, getProjectById, type Project } from '@/data/projects';
import VersionSwitcher from '@/components/shell/VersionSwitcher';
import HeroWall from './HeroWall';
import LiquidLightbox from './LiquidLightbox';
import Magnetic from './Magnetic';
import WardenShowcase from './WardenShowcase';
import LoadingScreen from './LoadingScreen';
import { MONO_PALETTES } from './palettes';

/* Pointer-follow spotlight: feeds --mx/--my to a `.mono-spot` element so its
   glow tracks the cursor. Cheap DOM write in an event handler. */
function spot(e: ReactMouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
  el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
}

/* ──────────────────────────────────────────────────────────
   Editorial Monograph — a design-annual / gallery treatment.
   Warm near-black canvas so the colorful campaign work glows.
   Leads with the WORK, surfaces credibility immediately, and
   tells the marketing story with Problem → Approach → Impact.
   ────────────────────────────────────────────────────────── */

// Tokenized palette — actual colors come from CSS variables set on the root
// (see MONO_PALETTES); every tint derives from the three tokens via color-mix.
const PALETTE = {
  bg: 'var(--mg-bg)',
  surface: 'var(--mg-surface)',
  bone: 'var(--mg-fg)',
  muted: 'color-mix(in srgb, var(--mg-fg) 62%, transparent)',
  faint: 'color-mix(in srgb, var(--mg-fg) 34%, transparent)',
  hair: 'color-mix(in srgb, var(--mg-fg) 14%, transparent)',
  brand: '#F15A29',
};

const CLIENTS = [
  'Heaven Hill', // parent co. — covers PAMA, Burnett's, Rittenhouse, Hpnotiq, etc.
  'Berry Global',
  'Ameriqual',
  'J.E. Shekell',
  'Flanders',
  'Atlas',
  'Liberty FCU',
  'Ellis Park',
  'Nkosi Records',
];

const SKILLS = [
  'Brand Strategy',
  'Art Direction',
  'Packaging Design',
  'Environmental Design',
  'AI Development',
  'Campaign Systems',
  'Identity Design',
  'iOS · Swift',
  'Creative Direction',
  'Motion',
];

// Interleave brands (proof: who I've worked for) with skills (range: what I do)
// so the ticker reads as both at a glance — and the alternating type/treatment
// gives it visual rhythm a flat list of names can't.
type TickerItem = { label: string; kind: 'brand' | 'skill' };
const TICKER: TickerItem[] = [
  ...CLIENTS.flatMap((c, i) =>
    SKILLS[i]
      ? [{ label: c, kind: 'brand' as const }, { label: SKILLS[i], kind: 'skill' as const }]
      : [{ label: c, kind: 'brand' as const }]
  ),
  ...SKILLS.slice(CLIENTS.length).map((s) => ({ label: s, kind: 'skill' as const })),
];

// Per the resume: each Silver ADDY attributed to the work that won it.
const AWARDS = [
  '2018 Silver ADDY · Premium Jars Sales Kit',
  '2019 Silver ADDY · Airport Business Lounge',
  '2022 Silver ADDY · Pack Expo Booth',
  '2024 Silver ADDY · Dose Better Campaign',
];

// Featured case studies — real projects reframed as marketing outcomes.
const CASE_STUDIES: {
  id: string;
  kicker: string;
  problem: string;
  approach: string;
  impact: string;
}[] = [
  {
    id: 'epic-campaign',
    kicker: 'Brand Campaign · Berry Global',
    problem:
      'A Fortune 500 packaging leader needed one voice across trade publications and internal communications — not four disconnected messages.',
    approach:
      'A four-part system built on the brand pillars — Engaging, Protective, Innovative, Committed — each ad distinct in imagery but locked to a single layout framework.',
    impact: 'A unified brand identity that scaled across every trade channel.',
  },
  {
    id: 'pack-expo-booths',
    kicker: 'Environmental · Berry Global',
    problem:
      'Pack Expo is a sea of competitors. Berry needed presence that pulled buyers across a crowded show floor.',
    approach:
      'Large-scale environmental design — booth architecture, signage, and brand storytelling engineered to read from across the hall and reward a closer look.',
    impact: 'The 2022 booth won a Silver ADDY.',
  },
  {
    id: 'rittenhouse-rye',
    kicker: 'Packaging · Heaven Hill',
    problem:
      'A heritage rye dating to 1934 had the history but a label that no longer earned its place on a premium shelf.',
    approach:
      'A complete packaging overhaul drawn from the original 1934 label language — modernized for authority without erasing the heritage that made the brand worth buying.',
    impact: 'On shelves nationwide.',
  },
];

/* ── Reduced-motion-aware scroll reveal ─────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`mono-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── Curated work order: strongest, image-rich pieces first ── */
// Curated, image-rich highlights — strongest craft first.
// Non-alcohol pieces fill the prominent full-width slots (lead + closers);
// the spirits work stays present but only in smaller paired tiles.
// The Warden apps live in their own showcase section (#apps), so the gallery
// focuses on brand/print/environmental craft.
const WORK_ORDER = [
  'pack-expo-booths',
  'album-covers',
  'pama-liqueur',
  'epic-campaign',
  'more-campaigns',
  'burnetts-vodka',
  'ellisParkBillboard',
  'rittenhouse-rye',
  'packaging',
  'reports',
  'logo-designs',
];

// Discipline filters — let visitors pull breadth on demand.
const FILTERS: { label: string; match: (p: Project) => boolean }[] = [
  { label: 'All', match: () => true },
  { label: 'Brand & Advertising', match: (p) => p.categories.includes('advertising') || p.categories.includes('logo') },
  { label: 'Packaging', match: (p) => p.categories.includes('packaging') },
  { label: 'Environmental', match: (p) => p.categories.includes('environmental') },
  { label: 'Digital & AI', match: (p) => p.categories.includes('digital') },
];


function curatedWork(): Project[] {
  const byId = new Map(projects.map((p) => [p.id, p]));
  const ordered: Project[] = [];
  WORK_ORDER.forEach((id) => {
    const p = byId.get(id);
    if (p && p.images.length > 0) ordered.push(p);
  });
  return ordered;
}

export default function MonographView() {
  const setDetailProject = useAppStore((s) => s.setDetailProject);
  const [filter, setFilter] = useState(0);
  // Midnight won the palette review — deep navy, the complement that makes
  // the brand orange glow hottest. (Alternatives kept in palettes.ts.)
  const pal = MONO_PALETTES.find((p) => p.id === 'midnight')!;
  const work = curatedWork();
  const visibleWork = work.filter(FILTERS[filter].match);

  // Force the gallery palette regardless of global theme.
  useEffect(() => {
    const root = document.documentElement;
    const prevBg = document.body.style.backgroundColor;
    root.classList.remove('dark');
    window.scrollTo(0, 0);
    return () => {
      document.body.style.backgroundColor = prevBg;
    };
  }, []);
  useEffect(() => {
    document.body.style.backgroundColor = pal.bg;
  }, [pal]);

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [menuOpen]);

  const open = (id: string) => setDetailProject(id);

  return (
    <div
      className="mono-grain min-h-screen w-full antialiased"
      style={{
        ['--mg-bg' as string]: pal.bg,
        ['--mg-surface' as string]: pal.surface,
        ['--mg-fg' as string]: pal.fg,
        ['--mg-slab-from' as string]: pal.slabFrom,
        ['--mg-slab-to' as string]: pal.slabTo,
        background: PALETTE.bg,
        color: PALETTE.bone,
        fontFamily: 'var(--font-body)',
      }}
    >
      <LoadingScreen />
      <LiquidLightbox />

      {/* ── Header — two angled corner plates ──────────────── */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
        {/* soft corner scrim — the only "holder": a shadow, not a box.
            Explicit rgba stops of the midnight bg (NOT the `transparent`
            keyword, which Safari interpolates as transparent BLACK and
            renders as a hard edge), eased across many stops so the fade
            completes well inside the oversized box on any screen. */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-72 w-[44rem]"
          style={{
            background:
              'radial-gradient(120% 100% at 0% 0%, rgba(15,22,32,0.88) 0%, rgba(15,22,32,0.62) 22%, rgba(15,22,32,0.34) 40%, rgba(15,22,32,0.14) 54%, rgba(15,22,32,0.04) 63%, rgba(15,22,32,0) 72%)',
          }}
        />
        {/* floating mark: the full logo hangs free, never cropped */}
        <a
          href="#top"
          aria-label="Matthew Johnson — back to top"
          className="mono-mark pointer-events-auto absolute left-0 top-0 flex items-center gap-3.5 py-4 pl-5 pr-8 md:pl-8"
        >
          <Image
            src="/mj-logo.svg"
            alt=""
            width={61}
            height={98}
            className="mono-mark-logo h-16 w-auto md:h-[4.6rem]"
            style={{ filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.55))' }}
            priority
          />
          <span
            className="mono-mark-name hidden text-[13px] font-bold uppercase tracking-[0.22em] lg:inline"
            style={{
              fontFamily: 'var(--font-display)',
              textShadow: '0 2px 10px rgba(0,0,0,0.45)',
            }}
          >
            Matthew Johnson
          </span>
        </a>

        {/* right plate: roller nav — labels roll up to reveal an alternate word.
            The plate visuals live on a background layer so the nav itself has
            no overflow clipping (the version dropdown must escape the plate). */}
        <nav
          className="mono-plate-host pointer-events-auto absolute right-0 top-0 hidden items-center py-4 pr-6 md:flex md:pr-10"
          style={{
            columnGap: 'clamp(1.15rem, 2.4vw, 2rem)',
            paddingLeft: 'clamp(2rem, 4.5vw, 3.5rem)',
          }}
        >
          <span
            aria-hidden
            className="mono-plate absolute inset-0 -z-10"
            style={{
              background: 'color-mix(in srgb, var(--mg-surface) 88%, transparent)',
              backdropFilter: 'blur(10px)',
              clipPath: 'polygon(28px 0, 100% 0, 100% 100%, 0 100%)',
              borderBottom: `1px solid ${PALETTE.hair}`,
            }}
          />
          {(
            [
              ['#work', 'Work', 'The Proof'],
              ['#apps', 'Apps', 'Shipped'],
              ['#studies', 'Case Studies', 'The Thinking'],
              ['#about', 'About', 'The Operator'],
              ['#contact', 'Contact', 'Say Hello'],
            ] as const
          ).map(([href, label, alt]) => (
            <a
              key={href}
              href={href}
              className="mono-roller font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(10px, 1vw, 11px)' }}
            >
              <span className="r-stack">
                <span className="r-row" style={{ color: PALETTE.muted }}>{label}</span>
                <span className="r-row" style={{ color: PALETTE.brand }}>{alt}</span>
              </span>
            </a>
          ))}
          <VersionSwitcher dark />
        </nav>

        {/* mobile: floating hamburger — no plate, no hard edges */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="pointer-events-auto absolute right-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md md:hidden"
          style={{
            background: 'color-mix(in srgb, var(--mg-surface) 82%, transparent)',
            border: `1px solid ${PALETTE.hair}`,
            color: PALETTE.bone,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          {menuOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7" /><line x1="7" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          )}
        </button>

        {/* mobile menu — full-screen, nav + version picker together */}
        {menuOpen && (
          <div
            className="mono-csfade pointer-events-auto fixed inset-0 flex flex-col overflow-y-auto px-7 pb-10 pt-24 backdrop-blur-xl md:hidden"
            style={{ background: 'color-mix(in srgb, var(--mg-bg) 93%, transparent)' }}
          >
            <nav className="flex flex-col gap-1">
              {(
                [
                  ['#work', 'Work', 'The Proof'],
                  ['#apps', 'Apps', 'Shipped'],
                  ['#studies', 'Case Studies', 'The Thinking'],
                  ['#about', 'About', 'The Operator'],
                  ['#contact', 'Contact', 'Say Hello'],
                ] as const
              ).map(([href, label, alt], i) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 border-b py-4"
                  style={{ borderColor: PALETTE.hair }}
                >
                  <span className="text-xs font-bold" style={{ fontFamily: 'var(--font-display)', color: PALETTE.brand }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mono-serif text-3xl font-semibold tracking-tight" style={{ color: PALETTE.bone }}>
                    {label}
                  </span>
                  <span
                    className="ml-auto text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ fontFamily: 'var(--font-display)', color: PALETTE.faint }}
                  >
                    {alt}
                  </span>
                </a>
              ))}
            </nav>

            <div className="mt-10">
              <p
                className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: 'var(--font-display)', color: PALETTE.brand }}
              >
                Site Version
              </p>
              <VersionSwitcher mobileInline dark onSelect={() => setMenuOpen(false)} />
            </div>
          </div>
        )}
      </div>

      {/* ── HERO — editorial split: type panel + framed work ── */}
      <header id="top" className="relative grid min-h-screen w-full grid-cols-1 md:grid-cols-[1fr_0.92fr]">
        {/* Left — type on a deep WARM slab, raised in front of the cool wall */}
        <div
          className="relative z-10 order-2 flex flex-col justify-center px-6 pb-16 pt-10 md:order-1 md:border-r md:px-12 md:py-32 md:pl-[max(3rem,calc((100vw-1500px)/2+3rem))]"
          style={{
            borderColor: 'color-mix(in srgb, var(--mg-fg) 18%, transparent)',
            background: 'linear-gradient(115deg, var(--mg-slab-from) 0%, var(--mg-slab-to) 72%)',
            boxShadow: '34px 0 90px -30px rgba(0,0,0,0.85)',
          }}
        >
          <p
            className="mono-rise mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.34em]"
            style={{ fontFamily: 'var(--font-display)', color: PALETTE.brand, animationDelay: '0.05s' }}
          >
            <span className="h-px w-8" style={{ background: PALETTE.brand }} />
            Art Director · Brand · AI
          </p>
          <h1
            className="mono-rise mono-serif font-semibold leading-[0.9] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.9rem, 4.7vw, 4.7rem)', animationDelay: '0.15s' }}
          >
            <span className="whitespace-nowrap">Strategy you can <span className="italic" style={{ color: PALETTE.brand }}>see</span>.</span>
            <br />
            <span className="whitespace-nowrap">Design that <span className="italic" style={{ color: PALETTE.brand }}>sells</span>.</span>
          </h1>
          <p className="mono-rise mt-7 max-w-md text-base leading-relaxed md:text-lg" style={{ color: PALETTE.muted, animationDelay: '0.28s' }}>
            Fifteen years turning brand strategy into work that ships, sells, and wins —
            from packaging on shelves nationwide to Fortune&nbsp;500 campaigns to
            AI-built&nbsp;apps.
          </p>

          {/* credibility row — visible without a click */}
          <div className="mono-rise mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: '0.4s' }}>
            {[
              ['4×', 'Silver ADDY'],
              ['15+', 'Years'],
              ['Fortune 500', 'Brand work'],
              ['Nationwide', 'On shelves'],
            ].map(([big, small]) => (
              <div key={small} className="flex flex-col border-l pl-3" style={{ borderColor: PALETTE.hair }}>
                <span className="mono-serif text-[1.6rem] font-semibold leading-none" style={{ color: PALETTE.bone }}>{big}</span>
                <span
                  className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                  style={{ fontFamily: 'var(--font-display)', color: PALETTE.muted }}
                >
                  {small}
                </span>
              </div>
            ))}
          </div>

          <div className="mono-rise mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: '0.52s' }}>
            <Magnetic>
              <a
                href="#work"
                className="block rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.2em]"
                style={{ background: PALETTE.brand, color: '#fff', fontFamily: 'var(--font-display)' }}
              >
                View the Work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="block rounded-full border px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                style={{ borderColor: PALETTE.hair, color: PALETTE.bone, fontFamily: 'var(--font-display)' }}
              >
                Get in Touch
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Right — "The Wall": infinite draggable gallery of all work */}
        <div className="mono-hero-img relative order-1 h-[46vh] min-h-[320px] w-full overflow-hidden md:order-2 md:h-auto md:min-h-screen">
          <HeroWall onOpen={open} wall={pal.wall} />
          {/* spotlight vignette is rendered (dithered) inside HeroWall's canvas.
              The type panel casts its own shadow onto the wall (see header left). */}
          <div
            className="pointer-events-none absolute inset-0 md:hidden"
            style={{ background: 'linear-gradient(180deg, transparent 55%, color-mix(in srgb, var(--mg-bg) 84%, transparent) 100%)' }}
          />
          {/* drag affordance — label contrast follows the wall's lightness */}
          <div className="pointer-events-none absolute bottom-5 right-5 flex items-center gap-3 md:bottom-8 md:right-8">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.25em]"
              style={{
                fontFamily: 'var(--font-display)',
                color: pal.wallIsLight ? 'rgba(28,26,28,0.72)' : 'rgba(245,242,236,0.78)',
                textShadow: pal.wallIsLight ? '0 1px 6px rgba(255,255,255,0.4)' : '0 1px 6px rgba(0,0,0,0.5)',
              }}
            >
              Drag to explore
            </span>
            <span className="h-px w-7" style={{ background: PALETTE.brand }} />
          </div>
        </div>

        {/* scroll cue */}
        <div className="pointer-events-none absolute bottom-7 left-6 z-20 hidden items-center gap-3 md:left-12 md:flex md:pl-[max(0px,calc((100vw-1500px)/2))]">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: 'var(--font-display)', color: PALETTE.faint }}
          >
            Scroll
          </span>
          <span className="block h-8 w-px" style={{ background: `linear-gradient(${PALETTE.brand}, transparent)` }} />
        </div>
      </header>

      {/* ── Clients × skills ticker ────────────────────────── */}
      <section
        className="overflow-hidden border-y py-7"
        style={{ borderColor: PALETTE.hair, background: PALETTE.surface }}
        aria-label="Selected clients and disciplines"
      >
        <div className="flex w-max items-center mono-marquee-track">
          {[...TICKER, ...TICKER].map((it, i) => (
            <div key={i} className="flex items-center">
              {it.kind === 'brand' ? (
                <span
                  className="mono-serif whitespace-nowrap px-7 text-2xl md:text-[2rem]"
                  style={{ color: PALETTE.bone }}
                >
                  {it.label}
                </span>
              ) : (
                <span
                  className="mx-7 whitespace-nowrap rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ fontFamily: 'var(--font-display)', borderColor: 'rgba(241,90,41,0.45)', color: PALETTE.brand }}
                >
                  {it.label}
                </span>
              )}
              <span className="text-sm" style={{ color: PALETTE.brand, opacity: 0.55 }}>✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Capabilities — the three-part pitch, made concrete ── */}
      <section className="mx-auto max-w-[1500px] px-6 py-24 md:px-12 md:py-28">
        <Reveal className="mb-14 max-w-3xl">
          <p
            className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: 'var(--font-display)', color: PALETTE.brand }}
          >
            What I do
          </p>
          <h2 className="mono-serif text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            Three disciplines, one operator.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-px md:grid-cols-3" style={{ background: PALETTE.hair }}>
          {[
            {
              n: '01',
              title: 'Art Direction & Design',
              body: 'National campaigns, packaging on shelves nationwide, and an ADDY-winning Pack Expo booth — from first concept to final file.',
            },
            {
              n: '02',
              title: 'Brand Strategy',
              body: 'Identity systems and campaign frameworks that stay coherent across every channel of a Fortune 500 portfolio.',
            },
            {
              n: '03',
              title: 'AI Development',
              body: 'I ship real products — Bible Warden on iOS (Swift) and News Warden on the web — built and designed from the ground up.',
            },
          ].map((c, i) => (
            <Reveal key={c.n} delay={i * 90}>
              <div onMouseMove={spot} className="mono-spot mono-lift h-full p-8 md:p-10" style={{ background: PALETTE.bg }}>
                <div className="mb-6 flex items-baseline justify-between">
                  <span className="mono-serif text-4xl font-semibold" style={{ color: PALETTE.brand }}>{c.n}</span>
                  <span className="h-px flex-1 ml-5" style={{ background: PALETTE.hair }} />
                </div>
                <h3 className="mono-serif mb-4 text-2xl font-semibold tracking-tight">{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: PALETTE.muted }}>{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Selected Work — editorial gallery ─────────────── */}
      <section id="work" className="mx-auto max-w-[1500px] px-6 pb-24 pt-8 md:px-12 md:pb-32">
        <Reveal className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em]"
              style={{ fontFamily: 'var(--font-display)', color: PALETTE.brand }}
            >
              Selected Work
            </p>
            <h2 className="mono-serif text-4xl font-semibold tracking-tight md:text-6xl">
              A decade and a half, edited down.
            </h2>
          </div>
          <span className="mono-serif hidden text-5xl md:block" style={{ color: PALETTE.faint }}>
            {String(visibleWork.length).padStart(2, '0')}
          </span>
        </Reveal>

        {/* discipline filter */}
        <Reveal className="mb-12 flex flex-wrap gap-2.5">
          {FILTERS.map((f, i) => {
            const active = i === filter;
            return (
              <button
                key={f.label}
                onClick={() => setFilter(i)}
                className="rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors"
                style={{
                  fontFamily: 'var(--font-display)',
                  background: active ? PALETTE.brand : 'transparent',
                  borderColor: active ? PALETTE.brand : PALETTE.hair,
                  color: active ? '#fff' : PALETTE.muted,
                }}
              >
                {f.label}
              </button>
            );
          })}
        </Reveal>

        {/* Masonry: every piece at its true aspect — never cropped. Tall print
            campaigns naturally read tall-and-skinny; nothing spans full width. */}
        <div className="gap-6 [column-gap:1.5rem] sm:columns-2 lg:columns-3">
          {visibleWork.map((p, i) => (
            <Reveal key={p.id} className="mb-6 break-inside-avoid" delay={(i % 3) * 80}>
              <WorkTile project={p} index={i} onClick={() => open(p.id)} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Built products — intro bridge into the brand-world panels ── */}
      <section className="mx-auto max-w-[1500px] px-6 pb-14 pt-4 md:px-12 md:pb-20">
        <Reveal className="max-w-3xl">
          <p
            className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: 'var(--font-display)', color: PALETTE.brand }}
          >
            Beyond the handoff
          </p>
          <h2 className="mono-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Designed. Branded. <span className="italic" style={{ color: PALETTE.brand }}>Built.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed" style={{ color: PALETTE.muted }}>
            Most creatives stop where the developers begin. These two products are live
            right now — every pixel, every interaction, and every line of code by one
            person, working with AI.
          </p>
        </Reveal>
      </section>

      <WardenShowcase />

      {/* ── Featured Case Studies — Problem / Approach / Impact ── */}
      <section id="studies" className="border-t py-24 md:py-32" style={{ borderColor: PALETTE.hair, background: PALETTE.surface }}>
        <div className="mx-auto max-w-[1500px] px-6 md:px-12">
          <Reveal className="mb-16">
            <p
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em]"
              style={{ fontFamily: 'var(--font-display)', color: PALETTE.brand }}
            >
              Case Studies
            </p>
            <h2 className="mono-serif max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              The thinking behind the work.
            </h2>
          </Reveal>

          <div className="space-y-24 md:space-y-32">
            {CASE_STUDIES.map((cs, i) => {
              const p = getProjectById(cs.id);
              if (!p || p.images.length === 0) return null;
              const flip = i % 2 === 1;
              return (
                <Reveal key={cs.id}>
                  <article className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                    <CaseImage
                      project={p}
                      label={`${String(i + 1).padStart(2, '0')} / ${String(CASE_STUDIES.length).padStart(2, '0')}`}
                      stagger={i}
                      className={flip ? 'md:order-2' : ''}
                      onClick={() => open(cs.id)}
                    />

                    <div className={flip ? 'md:order-1' : ''}>
                      <p
                        className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em]"
                        style={{ fontFamily: 'var(--font-display)', color: PALETTE.brand }}
                      >
                        {cs.kicker}
                      </p>
                      <h3 className="mono-serif mb-6 text-3xl font-semibold tracking-tight md:text-4xl">{p.title}</h3>

                      <dl className="space-y-5">
                        {[
                          ['Problem', cs.problem],
                          ['Approach', cs.approach],
                        ].map(([label, body]) => (
                          <div key={label} className="grid grid-cols-[80px_1fr] gap-4">
                            <dt
                              className="pt-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                              style={{ fontFamily: 'var(--font-display)', color: PALETTE.faint }}
                            >
                              {label}
                            </dt>
                            <dd className="text-sm leading-relaxed md:text-base" style={{ color: PALETTE.muted }}>{body}</dd>
                          </div>
                        ))}
                        <div className="grid grid-cols-[80px_1fr] gap-4 border-t pt-5" style={{ borderColor: PALETTE.hair }}>
                          <dt
                            className="pt-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                            style={{ fontFamily: 'var(--font-display)', color: PALETTE.brand }}
                          >
                            Impact
                          </dt>
                          <dd className="mono-serif text-xl font-medium leading-snug md:text-2xl" style={{ color: PALETTE.bone }}>
                            {cs.impact}
                          </dd>
                        </div>
                      </dl>

                      <button
                        onClick={() => open(cs.id)}
                        className="mt-7 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-[var(--color-brand)]"
                        style={{ fontFamily: 'var(--font-display)', color: PALETTE.bone }}
                      >
                        See the project
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── About — credibility, not hidden in a modal ────── */}
      <section id="about" className="mx-auto max-w-[1500px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[300px_1fr] md:gap-20">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-3 rounded-sm" style={{ border: `1px solid ${PALETTE.brand}` }} />
              <Image
                src="/portfolio/headshot-dark.jpg"
                alt="Matthew Johnson"
                width={300}
                height={360}
                className="relative w-full rounded-sm object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em]"
              style={{ fontFamily: 'var(--font-display)', color: PALETTE.brand }}
            >
              About
            </p>
            <h2 className="mono-serif mb-7 max-w-2xl text-3xl font-semibold leading-[1.12] tracking-tight md:text-5xl">
              The art director’s eye, the brand leader’s strategy, the builder’s hands.
            </h2>
            <div className="max-w-2xl space-y-4 text-sm leading-[1.8] md:text-base" style={{ color: PALETTE.muted }}>
              <p>
                Award-winning creative leader with 15+ years bridging brand strategy, digital
                innovation, and multimedia production. From agency life — art directing national
                campaigns for Heaven Hill, PAMA, and Rittenhouse Rye — to nearly a decade as Senior
                Graphic Designer at Berry Global, driving the visual identity of a Fortune 500 portfolio.
              </p>
              <p>
                Now I teach computer science and media production while building AI-powered apps —
                Bible&nbsp;Warden (iOS, Swift) and News&nbsp;Warden (web) — from the ground up. A rare
                combination: I can think the strategy, design the work, and build the product.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-2.5">
              {AWARDS.map((a) => (
                <span
                  key={a}
                  className="rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em]"
                  style={{ fontFamily: 'var(--font-display)', background: 'rgba(241,90,41,0.10)', color: PALETTE.brand }}
                >
                  {a}
                </span>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed" style={{ color: PALETTE.faint }}>
              BS Interdisciplinary Studies, Liberty University &nbsp;·&nbsp; AA Visual Communications, Ivy Tech
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Contact / CTA ─────────────────────────────────── */}
      <section
        id="contact"
        className="border-t py-28 text-center md:py-40"
        style={{ borderColor: PALETTE.hair, background: PALETTE.surface }}
      >
        <Reveal>
          <span className="mx-auto mb-8 block h-px w-12" style={{ background: PALETTE.brand }} />
          <h2 className="mono-serif mx-auto max-w-4xl px-6 text-4xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            Let’s make something
            <br />
            that <span className="italic" style={{ color: PALETTE.brand }}>ships</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-md px-6 text-base" style={{ color: PALETTE.muted }}>
            Open to freelance, collaboration,
            <br />
            and creative leadership.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href="mailto:mjay2k@gmail.com"
                className="block rounded-full px-9 py-3.5 text-xs font-bold uppercase tracking-[0.2em]"
                style={{ background: PALETTE.brand, color: '#fff', fontFamily: 'var(--font-display)' }}
              >
                mjay2k@gmail.com
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://linkedin.com/in/mjaystudios"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full border px-9 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                style={{ borderColor: PALETTE.hair, color: PALETTE.bone, fontFamily: 'var(--font-display)' }}
              >
                LinkedIn
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/Matthew-Johnson-Resume.pdf"
                download="Matthew-Johnson-Resume.pdf"
                className="flex items-center gap-2 rounded-full border px-9 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                style={{ borderColor: PALETTE.hair, color: PALETTE.bone, fontFamily: 'var(--font-display)' }}
              >
                Resume
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </section>

      <footer className="px-6 py-8 text-center md:px-12" style={{ background: PALETTE.bg }}>
        <p className="text-[10px] uppercase tracking-[0.25em]" style={{ fontFamily: 'var(--font-display)', color: PALETTE.faint }}>
          © {2026} Matthew Johnson — MJay Studios
        </p>
      </footer>
    </div>
  );
}

/* ── Case-study preview — cycles its project's set with a simple fade.
      Timer-driven (staggered per study) and only runs while on screen. ── */
function CaseImage({
  project,
  label,
  stagger,
  className = '',
  onClick,
}: {
  project: Project;
  label: string;
  stagger: number;
  className?: string;
  onClick: () => void;
}) {
  const [curr, setCurr] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const currRef = useRef(0);
  const ref = useRef<HTMLButtonElement>(null);
  const n = project.images.length;

  useEffect(() => {
    const el = ref.current;
    if (!el || n < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    let clearFade: ReturnType<typeof setTimeout>;
    const tick = () => {
      const c = currRef.current;
      const next = (c + 1) % n;
      setPrev(c);
      currRef.current = next;
      setCurr(next);
      clearTimeout(clearFade);
      clearFade = setTimeout(() => setPrev(null), 850);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!timer) timer = setInterval(tick, 3800 + stagger * 600);
        } else {
          clearInterval(timer);
          timer = undefined;
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
      clearTimeout(clearFade);
    };
  }, [n, stagger]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={spot}
      className={`mono-spot mono-lift group relative aspect-[4/3] overflow-hidden rounded-sm ring-1 ${className}`}
      style={{ background: PALETTE.bg, ['--tw-ring-color' as string]: PALETTE.hair }}
    >
      {/* Same stable-index keying as WorkTile: reuse the painted element on
          current→previous so the crossfade never starts from a blank frame. */}
      {prev !== null && (
        <Image
          key={prev}
          src={tileThumb(project.images[prev])}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      )}
      <Image
        key={curr}
        src={tileThumb(project.images[curr])}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04] ${prev !== null ? 'mono-csfade' : ''}`}
      />
      {/* invisible preload of the next image so the fade never waits */}
      {n > 1 && (
        <span aria-hidden className="absolute h-px w-px opacity-0">
          <Image src={tileThumb(project.images[(curr + 1) % n])} alt="" width={8} height={8} />
        </span>
      )}
      <span
        className="absolute left-5 top-5 text-[10px] font-bold uppercase tracking-[0.25em]"
        style={{ fontFamily: 'var(--font-display)', color: PALETTE.bone, textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
      >
        {label}
      </span>
    </button>
  );
}

/* ── Work tile — frame holds the cover's true aspect; the set rotates
      through on scroll (staggered per tile so they don't flip in sync).
      Tiles render from the build-time 640px thumbs so the wipe never
      reveals a half-loaded image; the lightbox keeps full-res. ── */
const tileThumb = (src: string) =>
  src.replace(/^\/portfolio\//, '/portfolio-thumbs/').replace(/\.(jpe?g|png|webp|avif)$/i, '.webp');

function WorkTile({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const [curr, setCurr] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const currRef = useRef(0);
  const n = project.images.length;

  useEffect(() => {
    if (n < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let clearTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // advance one image per ~520px scrolled; fractional per-tile offset
        // staggers the flip moments across the grid
        const i = ((Math.floor(window.scrollY / 520 + index * 0.63) % n) + n) % n;
        if (i !== currRef.current) {
          setPrev(currRef.current);
          currRef.current = i;
          setCurr(i);
          clearTimeout(clearTimer);
          clearTimer = setTimeout(() => setPrev(null), 750);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(clearTimer);
    };
  }, [n, index]);

  return (
    <button onClick={onClick} className="group block w-full text-left">
      <div
        onMouseMove={spot}
        className="mono-spot mono-lift relative w-full overflow-hidden rounded-sm"
        style={{ background: 'var(--mg-surface)', aspectRatio: `${project.coverW ?? 1000} / ${project.coverH ?? 1250}` }}
      >
        {/* Key each layer by its stable image index (not a p/c role prefix) so a
            tile going current→previous reuses the SAME painted element instead of
            remounting — otherwise the freshly-mounted base is blank for one frame
            while the incoming layer is still clip-wiped, which reads as a flash. */}
        {prev !== null && (
          <Image
            key={prev}
            src={tileThumb(project.images[prev])}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        )}
        <Image
          key={curr}
          src={tileThumb(project.images[curr])}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04] ${
            prev !== null ? (index % 2 === 0 ? 'mono-tilewipe' : 'mono-tilewipe-rev') : ''
          }`}
        />
        {/* invisible preloads of the scroll-neighbors — the wipe never waits */}
        {n > 1 && (
          <span aria-hidden className="absolute h-px w-px opacity-0">
            <Image src={tileThumb(project.images[(curr + 1) % n])} alt="" width={8} height={8} />
            <Image src={tileThumb(project.images[(curr - 1 + n) % n])} alt="" width={8} height={8} />
          </span>
        )}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--mg-bg) 10%, transparent) 0%, transparent 35%, color-mix(in srgb, var(--mg-bg) 90%, transparent) 100%)',
          }}
        />
        <span
          className="mono-serif absolute left-4 top-3 text-lg font-semibold transition-colors duration-500 group-hover:text-[var(--color-brand)]"
          style={{ color: '#f6f1e9', textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        {/* hover "View" affordance */}
        <span
          className="absolute bottom-4 left-4 flex translate-y-2 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ fontFamily: 'var(--font-display)', color: '#f6f1e9' }}
        >
          View
          <svg width="22" height="8" viewBox="0 0 22 8" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M0 4h20M16 1l4 3-4 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="mono-serif text-xl font-semibold tracking-tight transition-colors group-hover:text-[var(--color-brand)]">
            {project.title}
          </h3>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ fontFamily: 'var(--font-display)', color: 'color-mix(in srgb, var(--mg-fg) 45%, transparent)' }}>
            {project.client ? `${project.client} · ` : ''}{project.categories[0]}
          </p>
        </div>
        <span className="mono-serif text-sm" style={{ color: 'color-mix(in srgb, var(--mg-fg) 40%, transparent)' }}>{project.year}</span>
      </div>
    </button>
  );
}
