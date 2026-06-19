'use client';

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';
import Image from 'next/image';

/* ──────────────────────────────────────────────────────────
   Warden Showcase — the "I build real products" section.

   Each app gets a full-bleed panel in ITS OWN brand world
   (Bible Warden: dark bronze + gold + Cinzel; News Warden:
   newsprint + ink + gold + Playfair). Switching design
   languages mid-site is itself the demonstration of range.

   Visuals tilt toward the cursor; floating UI elements
   parallax at different depths. The Bible Warden phone plays
   the real app demo video inside the device frame.
   ────────────────────────────────────────────────────────── */

const BW = {
  bg: '#1a1412',
  card: '#2a2220',
  gold: '#d4a853',
  goldBright: '#f4b942',
  text: '#faf5f0',
  muted: '#a69890',
  border: 'rgba(212, 168, 83, 0.16)',
};

const NW = {
  page: '#f5f3ee',
  card: '#ffffff',
  ink: '#3f3f3f',
  inkSoft: '#565656',
  muted: '#7a7a72',
  gold: '#cc8b36',
  rule: '#d8d3c8',
  leanLeft: '#2980b9',
  leanCenter: '#95a5a6',
  leanRight: '#c0392b',
};

/* Tilt + parallax: pointer position writes --mx/--my (-1..1) on the stage;
   children translate/rotate off those vars at their own depth. */
function TiltStage({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // touch devices emulate mouse events on tap, which would jump the
    // parallax — there, the floats bob on their own instead (.mono-bob)
    if (window.matchMedia('(hover: none)').matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width - 0.5) * 2}`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height - 0.5) * 2}`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--mx', '0');
    el.style.setProperty('--my', '0');
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ perspective: '1200px', ['--mx' as string]: '0', ['--my' as string]: '0' }}
    >
      {children}
    </div>
  );
}

/* A floating element that drifts with the cursor at a given depth. */
function Float({
  depth = 12,
  className = '',
  style,
  children,
}: {
  depth?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={`mono-bob absolute ${className}`}
      style={{
        ...style,
        transform: `translate3d(calc(var(--mx) * ${depth}px), calc(var(--my) * ${depth}px), 0) ${style?.rotate ? '' : ''}`,
        transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        // touch devices: gentle self-bob (desktop ignores this — the
        // animation only activates inside @media (hover: none))
        animationDelay: `${(depth % 7) * 0.55}s`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

/* The Bible Warden device — real demo video inside the real frame PNG. */
function BWPhone() {
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="relative"
      style={{
        width: 'min(280px, 62vw)',
        aspectRatio: '599 / 1219',
        transform:
          'rotateY(calc(var(--mx) * 9deg)) rotateX(calc(var(--my) * -7deg))',
        transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.55))',
      }}
    >
      {/* the app, actually running */}
      <video
        ref={vidRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/showcase/bible-warden/screen-quest.jpg"
        className="absolute object-cover"
        // explicit width/height: video is a replaced element, so inset-only
        // sizing falls back to its intrinsic aspect and overflows the frame.
        // Geometry matches the frame PNG's measured screen cutout; the radius
        // runs a touch larger than the bezel's squircle so corners stay inside.
        style={{ top: '1.75%', left: '5%', width: '90.3%', height: '96.5%', borderRadius: '15% / 6.8%' }}
        src="/showcase/bible-warden/app-demo.mp4"
      />
      <Image
        src="/showcase/bible-warden/PhoneFrame.png"
        alt="Bible Warden running on iPhone"
        fill
        sizes="300px"
        className="pointer-events-none select-none"
      />
    </div>
  );
}

/* Smaller flanking phone with a static screen. */
function BWSideScreen({ src, tilt, className = '' }: { src: string; tilt: number; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.4rem] ${className}`}
      style={{
        aspectRatio: '552 / 1200',
        rotate: `${tilt}deg`,
        border: `1px solid ${BW.border}`,
        boxShadow: '0 24px 50px rgba(0,0,0,0.5)',
      }}
    >
      <Image src={src} alt="Bible Warden screen" fill sizes="180px" className="object-cover" />
    </div>
  );
}

const STACK_BW = ['Swift', 'SwiftUI', 'Xcode', 'Claude'];
const STACK_NW = ['Next.js', 'TypeScript', 'Claude API', 'Vercel'];

function StackChips({ items, color, border }: { items: string[]; color: string; border: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s) => (
        <span
          key={s}
          className="rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ borderColor: border, color, fontFamily: 'var(--font-display)' }}
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export default function WardenShowcase() {
  return (
    <section id="apps" aria-label="Product work — Bible Warden and News Warden">
      {/* ── Bible Warden — dark bronze & gold ─────────────── */}
      {/* gold hairline divides the site's midnight from the app's bronze world */}
      <div
        className="relative overflow-hidden"
        style={{
          background: BW.bg,
          borderTop: `1px solid ${BW.gold}`,
          boxShadow: 'inset 0 1px 0 rgba(212,168,83,0.35), inset 0 18px 30px -24px rgba(212,168,83,0.5)',
        }}
      >
        {/* ambient gold glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 70% 45%, rgba(212,168,83,0.13), transparent 70%)',
          }}
        />
        <TiltStage className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-14 px-6 py-24 md:grid-cols-[1fr_1.05fr] md:px-12 md:py-32">
          {/* copy */}
          <div className="relative z-10">
            <p
              className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em]"
              style={{ fontFamily: 'var(--font-display)', color: BW.gold }}
            >
              <span className="h-px w-8" style={{ background: BW.gold }} />
              Designed · Branded · Built by me
            </p>
            <div className="mb-7 w-[min(360px,80%)]">
              <Image
                src="/showcase/bible-warden/logo-text.svg"
                alt="Bible Warden"
                width={360}
                height={80}
                className="h-auto w-full"
              />
            </div>
            <h3
              className="mb-5 text-2xl font-semibold leading-snug md:text-3xl"
              style={{ fontFamily: 'var(--font-cinzel)', color: BW.text }}
            >
              Scripture, turned into a quest.
            </h3>
            <p className="mb-7 max-w-md text-sm leading-relaxed md:text-base" style={{ color: BW.muted }}>
              A gamified Bible-reading app for iOS — streak tracking, XP progression,
              reading quests, and Bible Battles. Every screen, every icon, and every
              line of Swift: one person, zero handoffs.
            </p>
            <div className="mb-8">
              <StackChips items={STACK_BW} color={BW.gold} border={BW.border} />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://apps.apple.com/us/app/bible-warden/id6757679669" target="_blank" rel="noopener noreferrer" aria-label="Bible Warden on the App Store">
                <Image
                  src="/showcase/bible-warden/app-store-badge.svg"
                  alt="Download on the App Store"
                  width={140}
                  height={47}
                  className="h-[44px] w-auto transition-transform hover:-translate-y-0.5"
                />
              </a>
              <a
                href="https://biblewarden.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#f4b942]"
                style={{ fontFamily: 'var(--font-display)', color: BW.gold }}
              >
                biblewarden.com →
              </a>
            </div>
          </div>

          {/* visual stage */}
          <div className="relative flex min-h-[460px] items-center justify-center md:min-h-[620px]">
            {/* halo emblem behind the device */}
            <Float depth={6} className="left-1/2 top-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-[0.12]">
              <Image src="/showcase/bible-warden/triune.svg" alt="" width={420} height={420} className="h-auto w-full" />
            </Float>

            {/* flanking screens */}
            <Float depth={26} className="left-[2%] top-1/2 hidden w-[150px] -translate-y-[62%] md:block lg:w-[170px]">
              <BWSideScreen src="/showcase/bible-warden/screen-biblebattle.jpg" tilt={-9} />
            </Float>
            <Float depth={32} className="right-[2%] top-1/2 hidden w-[150px] -translate-y-[34%] md:block lg:w-[170px]">
              <BWSideScreen src="/showcase/bible-warden/screen-highlight.jpg" tilt={8} />
            </Float>

            {/* hero device with live demo */}
            <div className="relative z-10">
              <BWPhone />
            </div>

            {/* floating app icon */}
            <Float depth={44} className="right-[2%] top-[2%] z-20 scale-90 md:right-[14%] md:top-[6%] md:scale-100">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl p-3"
                style={{ background: BW.card, border: `1px solid ${BW.border}`, boxShadow: '0 18px 36px rgba(0,0,0,0.5)' }}
              >
                <Image src="/showcase/bible-warden/logo-icon.svg" alt="" width={40} height={40} className="h-auto w-full" />
              </div>
            </Float>

            {/* PLACEHOLDER chips — to be replaced with real exported UI SVGs */}
            <Float depth={52} className="left-0 top-[6%] z-20 scale-90 md:left-[12%] md:top-[12%] md:scale-100">
              <div
                className="rounded-full px-4 py-2 text-xs font-bold"
                style={{ background: BW.card, border: `1px solid ${BW.border}`, color: BW.goldBright, boxShadow: '0 14px 30px rgba(0,0,0,0.45)' }}
              >
                🔥 12-day streak
              </div>
            </Float>
            <Float depth={38} className="bottom-[4%] left-0 z-20 scale-90 md:bottom-[10%] md:left-[16%] md:scale-100">
              <div
                className="rounded-full px-4 py-2 text-xs font-bold"
                style={{ background: BW.card, border: `1px solid ${BW.border}`, color: BW.gold, boxShadow: '0 14px 30px rgba(0,0,0,0.45)' }}
              >
                +25 XP · Quest complete
              </div>
            </Float>
          </div>
        </TiltStage>
      </div>

      {/* ── News Warden — newsprint & ink ─────────────────── */}
      <div className="relative overflow-hidden" style={{ background: NW.page }}>
        <TiltStage className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-14 px-6 py-24 md:grid-cols-[1.05fr_1fr] md:px-12 md:py-32">
          {/* visual stage — left on desktop to alternate rhythm */}
          <div className="relative order-2 flex min-h-[420px] items-center justify-center md:order-1 md:min-h-[560px]">
            {/* anchor: floats position against the browser box itself, so
                they always straddle its edges at every screen size */}
            <div className="relative z-10 w-[min(640px,92%)]">
            {/* browser mockup with real product */}
            <div
              className="overflow-hidden rounded-xl"
              style={{
                transform: 'rotateY(calc(var(--mx) * 7deg)) rotateX(calc(var(--my) * -5deg))',
                transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                boxShadow: '0 50px 90px -30px rgba(63,63,63,0.45)',
                border: `1px solid ${NW.rule}`,
                background: NW.card,
                willChange: 'transform',
              }}
            >
              {/* chrome */}
              <div className="flex items-center gap-3 border-b px-4 py-2.5" style={{ borderColor: NW.rule, background: '#efece5' }}>
                <span className="flex gap-1.5">
                  <i className="h-2.5 w-2.5 rounded-full" style={{ background: '#e0564f' }} />
                  <i className="h-2.5 w-2.5 rounded-full" style={{ background: '#e0a93e' }} />
                  <i className="h-2.5 w-2.5 rounded-full" style={{ background: '#5fb874' }} />
                </span>
                <span
                  className="mx-auto rounded-md px-6 py-0.5 text-[10px]"
                  style={{ background: NW.card, color: NW.muted, border: `1px solid ${NW.rule}` }}
                >
                  newswarden.com
                </span>
              </div>
              <Image
                src="/showcase/news-warden/site-home.jpg"
                alt="News Warden — AI-curated news reader, live front page"
                width={1600}
                height={1000}
                className="block h-auto w-full"
              />
            </div>

            {/* PLACEHOLDER floating elements — to be replaced with real UI SVGs.
                Negative offsets from the browser box = always overlapping it. */}
            {/* sits just below the chrome bar so the URL stays readable —
                the mobile bob lets it brush over it only momentarily */}
            <Float depth={42} className="-right-5 top-11 z-20 scale-90 md:top-12 md:-right-12 md:scale-100">
              <div
                className="rounded-lg px-4 py-3"
                style={{ background: NW.card, border: `1px solid ${NW.rule}`, boxShadow: '0 18px 40px rgba(63,63,63,0.22)' }}
              >
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: NW.muted }}>
                  Coverage lean
                </p>
                <span className="flex items-center gap-2">
                  {[NW.leanLeft, NW.leanCenter, NW.leanRight, NW.gold].map((c, i) => (
                    <i key={i} className="h-3 w-3 rounded-full" style={{ background: c, opacity: i === 1 ? 1 : 0.85 }} />
                  ))}
                  <span className="ml-1 text-[10px]" style={{ color: NW.inkSoft }}>all sides shown</span>
                </span>
              </div>
            </Float>
            <Float depth={30} className="-bottom-8 left-2 z-20 scale-90 md:-bottom-9 md:-left-7 md:scale-100">
              <div
                className="max-w-[210px] rounded-lg border-l-4 px-4 py-3"
                style={{ background: NW.card, borderColor: NW.gold, boxShadow: '0 18px 40px rgba(63,63,63,0.22)' }}
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: NW.gold }}>
                  Story tracking
                </p>
                <p className="mt-1 text-[11px] leading-snug" style={{ color: NW.inkSoft, fontFamily: 'var(--font-playfair)' }}>
                  Follows developing stories so you don’t re-read the news.
                </p>
              </div>
            </Float>
            </div>
            <Float depth={54} className="left-[1%] top-[16%] z-20 hidden lg:block">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full p-3"
                style={{ background: NW.ink, boxShadow: '0 18px 36px rgba(63,63,63,0.3)' }}
              >
                <Image src="/showcase/news-warden/icon-e-light.svg" alt="" width={32} height={32} className="h-auto w-full" />
              </div>
            </Float>
          </div>

          {/* copy */}
          <div className="relative z-10 order-1 md:order-2">
            <p
              className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em]"
              style={{ fontFamily: 'var(--font-display)', color: NW.gold }}
            >
              <span className="h-px w-8" style={{ background: NW.gold }} />
              Designed · Branded · Built by me
            </p>
            <div className="mb-7 w-[min(380px,84%)]">
              <Image
                src="/showcase/news-warden/logo-dark.svg"
                alt="News Warden"
                width={380}
                height={112}
                className="h-auto w-full"
              />
            </div>
            <h3
              className="mb-5 text-2xl font-semibold leading-snug md:text-3xl"
              style={{ fontFamily: 'var(--font-playfair)', color: NW.ink }}
            >
              The news, without the noise.
            </h3>
            <p className="mb-4 max-w-md text-sm leading-relaxed md:text-base" style={{ color: NW.inkSoft }}>
              A snapshot of everything happening right now — the day’s headlines
              gathered, organized, and set in one quick, readable place. Ongoing
              stories are tracked as they develop, with every side of the coverage
              shown, so you see the whole picture at a glance.
            </p>
            <p className="mb-7 max-w-md text-sm leading-relaxed md:text-base" style={{ color: NW.inkSoft }}>
              Under the hood, a local model and a frontier model work around the
              clock — curating the feed, grouping coverage, and writing synopses.
              Designed and built from scratch for the web.
            </p>
            <div className="mb-8">
              <StackChips items={STACK_NW} color={NW.gold} border={NW.rule} />
            </div>
            <a
              href="https://newswarden.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-transform hover:-translate-y-0.5"
              style={{ background: NW.gold, fontFamily: 'var(--font-display)' }}
            >
              Read on newswarden.com
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </TiltStage>
      </div>
    </section>
  );
}
