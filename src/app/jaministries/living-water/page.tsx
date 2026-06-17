import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/data/ja/site';

export const metadata = {
  title: `${site.name} — Living Water`,
};

/* ── "Living Water" ───────────────────────────────────────────────────────
   Editorial, typographic, light. The Word is the design: Cormorant serif
   carries the page, gold is used sparingly as illumination, and negative
   space does most of the work. Built as a server component; all motion is
   CSS (staggered .ja-rise). */

export default function LivingWaterPage() {
  return (
    <main
      className="relative min-h-screen"
      style={{ background: 'var(--ja-paper)', color: 'var(--ja-ink)' }}
    >
      {/* Back to concept chooser */}
      <Link
        href="/jaministries"
        className="ja-sans fixed left-5 top-5 z-50 rounded-full border px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] backdrop-blur transition-colors"
        style={{
          borderColor: 'rgba(59,68,90,0.18)',
          color: 'var(--ja-slate)',
          background: 'rgba(255,253,248,0.7)',
        }}
      >
        ← Concepts
      </Link>

      {/* ── Top nav ─────────────────────────────────────────────── */}
      <header className="ja-fade mx-auto flex max-w-6xl items-center justify-between px-6 pt-8 md:pt-10">
        <Image
          src={site.brand.logo}
          alt={site.name}
          width={210}
          height={49}
          className="h-9 w-auto md:h-11"
          priority
        />
        <nav className="ja-sans hidden gap-8 text-[0.72rem] uppercase tracking-[0.22em] md:flex">
          {site.nav.slice(0, 6).map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="transition-colors hover:text-[color:var(--ja-gold-deep)]"
              style={{ color: 'var(--ja-slate)' }}
            >
              {n.label}
            </a>
          ))}
        </nav>
      </header>

      {/* ── Hero: Psalm 1:3 as the opening statement ───────────────── */}
      <section className="relative mx-auto max-w-5xl overflow-hidden px-6 pb-24 pt-20 text-center md:pb-32 md:pt-28">
        {/* faint oversized watermark of the brand icon */}
        <Image
          src={site.brand.icon}
          alt=""
          width={520}
          height={520}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-0 w-[78vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 opacity-[0.05] md:opacity-[0.06]"
        />

        <div className="relative">
          <p
            className="ja-sans ja-rise text-[0.7rem] uppercase tracking-[0.5em]"
            style={{ color: 'var(--ja-gold-deep)', animationDelay: '0.05s' }}
          >
            {site.name}
          </p>

          <div className="ja-gold-rule ja-rise mx-auto mt-8 w-24" style={{ animationDelay: '0.15s' }} />

          <h1
            className="ja-serif ja-rise mx-auto mt-10 max-w-4xl text-4xl font-light leading-[1.12] sm:text-5xl md:text-[4.25rem] md:leading-[1.08]"
            style={{ animationDelay: '0.2s', letterSpacing: '-0.01em' }}
          >
            <span
              className="ja-serif float-left mr-4 mt-2 text-[5.5rem] font-medium italic leading-[0.7] md:text-[8rem]"
              style={{ color: 'var(--ja-gold-1)' }}
            >
              {site.verse.text.charAt(0)}
            </span>
            {site.verse.text.slice(1)}
          </h1>

          <p
            className="ja-sans ja-rise mt-12 text-[0.78rem] uppercase tracking-[0.4em]"
            style={{ color: 'var(--ja-slate)', animationDelay: '0.35s' }}
          >
            — {site.verse.ref}
          </p>

          <p
            className="ja-serif ja-rise mx-auto mt-8 max-w-md text-xl italic"
            style={{ color: 'var(--ja-gold-deep)', animationDelay: '0.45s' }}
          >
            {site.tagline}
          </p>
        </div>
      </section>

      {/* ── Welcome: editorial two-column ──────────────────────────── */}
      <section
        id="welcome"
        className="relative border-t"
        style={{ background: 'var(--ja-cream)', borderColor: 'rgba(59,68,90,0.1)' }}
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-5">
            <p
              className="ja-sans text-[0.7rem] uppercase tracking-[0.4em]"
              style={{ color: 'var(--ja-gold-deep)' }}
            >
              {site.welcome.heading}
            </p>
            <h2
              className="ja-serif mt-5 text-4xl font-light leading-[1.12] md:text-5xl"
              style={{ color: 'var(--ja-ink)' }}
            >
              {site.welcome.lead}
            </h2>
          </div>
          <div className="ja-serif space-y-6 text-lg leading-relaxed md:col-span-7 md:columns-2 md:gap-10 md:space-y-0" style={{ color: 'var(--ja-slate)' }}>
            {site.welcome.body.map((p, i) => (
              <p key={i} className="mb-6 break-inside-avoid">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scripture pull-quotes ──────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center md:py-36">
        {site.scriptures.map((s, i) => (
          <figure key={i} className={i > 0 ? 'mt-20' : ''}>
            <div className="ja-gold-rule mx-auto mb-10 w-16" />
            <blockquote
              className="ja-serif text-3xl font-light italic leading-snug md:text-[2.6rem]"
              style={{ color: 'var(--ja-ink)' }}
            >
              “{s.text}”
            </blockquote>
            <figcaption
              className="ja-sans mt-7 text-[0.72rem] uppercase tracking-[0.4em]"
              style={{ color: 'var(--ja-gold-deep)' }}
            >
              {s.ref}
            </figcaption>
          </figure>
        ))}
      </section>

      {/* ── About the Evangelist ───────────────────────────────────── */}
      <section
        id="about"
        className="border-y"
        style={{ background: 'var(--ja-cream)', borderColor: 'rgba(59,68,90,0.1)' }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-4">
            <div
              className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-sm"
              style={{ boxShadow: '0 30px 60px -30px rgba(27,32,48,0.4)' }}
            >
              <Image
                src={site.about.portrait}
                alt={site.about.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 80vw, 320px"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(192,158,95,0.5)' }}
              />
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="ja-sans text-[0.7rem] uppercase tracking-[0.4em]" style={{ color: 'var(--ja-gold-deep)' }}>
              {site.about.role}
            </p>
            <h2 className="ja-serif mt-4 text-4xl font-light md:text-5xl" style={{ color: 'var(--ja-ink)' }}>
              {site.about.name}
            </h2>
            <p className="ja-serif mt-6 text-xl italic leading-relaxed" style={{ color: 'var(--ja-slate)' }}>
              {site.about.lead}
            </p>
            <div className="ja-sans mt-6 space-y-4 text-base leading-relaxed" style={{ color: 'var(--ja-slate)' }}>
              {site.about.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="italic" style={{ color: 'var(--ja-gold-deep)' }}>
                {site.about.family}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Beliefs: elegant numbered list ─────────────────────────── */}
      <section id="beliefs" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-16 text-center">
          <p className="ja-sans text-[0.7rem] uppercase tracking-[0.4em]" style={{ color: 'var(--ja-gold-deep)' }}>
            What We Believe
          </p>
          <h2 className="ja-serif mt-4 text-4xl font-light md:text-5xl" style={{ color: 'var(--ja-ink)' }}>
            Nine convictions, one foundation
          </h2>
        </div>
        <ol className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {site.beliefs.map((b) => (
            <li key={b.n} className="border-t pt-5" style={{ borderColor: 'rgba(192,158,95,0.4)' }}>
              <span className="ja-serif text-2xl italic" style={{ color: 'var(--ja-gold-1)' }}>
                {b.n}
              </span>
              <h3 className="ja-serif mt-2 text-2xl font-medium leading-tight" style={{ color: 'var(--ja-ink)' }}>
                {b.title}
              </h3>
              <p className="ja-sans mt-2 text-sm leading-relaxed" style={{ color: 'var(--ja-slate)' }}>
                {b.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Programs ───────────────────────────────────────────────── */}
      <section
        id="programs"
        className="border-y"
        style={{ background: 'var(--ja-cream)', borderColor: 'rgba(59,68,90,0.1)' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="ja-sans text-[0.7rem] uppercase tracking-[0.4em]" style={{ color: 'var(--ja-gold-deep)' }}>
            What We Do
          </p>
          <h2 className="ja-serif mt-4 max-w-2xl text-4xl font-light md:text-5xl" style={{ color: 'var(--ja-ink)' }}>
            Spirit-led teaching, gatherings &amp; crusades
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-sm md:grid-cols-2" style={{ background: 'rgba(59,68,90,0.12)' }}>
            {site.programs.map((p, i) => (
              <div
                key={p.title}
                className="p-8 md:p-10"
                style={{ background: 'var(--ja-paper)' }}
              >
                <span className="ja-serif text-xl italic" style={{ color: 'var(--ja-gold-1)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="ja-serif mt-3 text-2xl font-medium" style={{ color: 'var(--ja-ink)' }}>
                  {p.title}
                </h3>
                <p className="ja-sans mt-3 text-base leading-relaxed" style={{ color: 'var(--ja-slate)' }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prophecies: refined index ──────────────────────────────── */}
      <section id="prophecies" className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="ja-sans text-[0.7rem] uppercase tracking-[0.4em]" style={{ color: 'var(--ja-gold-deep)' }}>
              The Record
            </p>
            <h2 className="ja-serif mt-4 text-4xl font-light md:text-5xl" style={{ color: 'var(--ja-ink)' }}>
              Prophecies &amp; teachings
            </h2>
          </div>
        </div>
        <ul>
          {site.prophecies.map((p, i) => (
            <li
              key={i}
              className="group flex items-baseline justify-between gap-6 border-t py-6"
              style={{ borderColor: 'rgba(59,68,90,0.14)' }}
            >
              <div>
                {p.date && (
                  <span className="ja-sans mr-3 text-[0.7rem] uppercase tracking-[0.25em]" style={{ color: 'var(--ja-gold-deep)' }}>
                    {p.date}
                  </span>
                )}
                <span className="ja-serif text-xl md:text-2xl" style={{ color: 'var(--ja-ink)' }}>
                  {p.title}
                </span>
              </div>
              <span className="ja-sans shrink-0 text-[0.62rem] uppercase tracking-[0.25em]" style={{ color: 'var(--ja-slate)' }}>
                {p.tag}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Books ──────────────────────────────────────────────────── */}
      <section
        id="books"
        className="border-y"
        style={{ background: 'var(--ja-cream)', borderColor: 'rgba(59,68,90,0.1)' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="ja-sans text-center text-[0.7rem] uppercase tracking-[0.4em]" style={{ color: 'var(--ja-gold-deep)' }}>
            Anointed Teachings
          </p>
          <h2 className="ja-serif mt-4 text-center text-4xl font-light md:text-5xl" style={{ color: 'var(--ja-ink)' }}>
            Books by Samuel Meesala
          </h2>
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            {site.books.map((b) => (
              <a
                key={b.title}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-6 md:gap-8"
              >
                <div
                  className="relative aspect-[3/4] w-28 shrink-0 overflow-hidden rounded-sm transition-transform duration-500 group-hover:-translate-y-1 md:w-36"
                  style={{ boxShadow: '0 24px 48px -24px rgba(27,32,48,0.45)' }}
                >
                  <Image src={b.cover} alt={b.title} fill className="object-cover" sizes="160px" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="ja-serif text-2xl font-medium leading-tight md:text-3xl" style={{ color: 'var(--ja-ink)' }}>
                    {b.title}
                  </h3>
                  <p className="ja-serif mt-2 text-base italic leading-snug" style={{ color: 'var(--ja-slate)' }}>
                    {b.subtitle}
                  </p>
                  <span
                    className="ja-sans mt-4 text-[0.68rem] uppercase tracking-[0.25em] transition-colors group-hover:text-[color:var(--ja-gold-1)]"
                    style={{ color: 'var(--ja-gold-deep)' }}
                  >
                    Read on Amazon →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Give: calm CTA band ────────────────────────────────────── */}
      <section id="give" className="relative overflow-hidden" style={{ background: 'var(--ja-ink)' }}>
        <Image
          src={site.brand.icon}
          alt=""
          aria-hidden
          width={400}
          height={400}
          className="ja-logo-light pointer-events-none absolute -right-10 top-1/2 w-72 -translate-y-1/2 opacity-[0.06]"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:py-28">
          <p className="ja-sans text-[0.7rem] uppercase tracking-[0.4em]" style={{ color: 'var(--ja-gold-2)' }}>
            Partner With Us
          </p>
          <h2 className="ja-serif mt-5 text-4xl font-light leading-tight md:text-5xl" style={{ color: 'var(--ja-paper)' }}>
            {site.give.heading}
          </h2>
          <p className="ja-sans mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65">
            {site.give.body}
          </p>
          <a
            href={site.social.facebook}
            className="ja-sans mt-10 inline-block rounded-full px-10 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.25em] transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--ja-gold-grad)', color: 'var(--ja-ink)' }}
          >
            {site.give.cta}
          </a>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer id="contact" style={{ background: 'var(--ja-slate-deep)' }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-16 text-center">
          <Image
            src={site.brand.logo}
            alt={site.name}
            width={220}
            height={51}
            className="ja-logo-light h-11 w-auto opacity-90"
          />
          <p className="ja-serif text-lg italic" style={{ color: 'var(--ja-gold-2)' }}>
            {site.tagline}
          </p>
          <div className="ja-sans flex gap-8 text-[0.72rem] uppercase tracking-[0.25em] text-white/70">
            <a href={site.social.facebook} className="transition-colors hover:text-[color:var(--ja-gold-2)]">Facebook</a>
            <a href={site.social.youtube} className="transition-colors hover:text-[color:var(--ja-gold-2)]">YouTube</a>
            <a href={site.social.amazon} className="transition-colors hover:text-[color:var(--ja-gold-2)]">Books</a>
          </div>
          <div className="ja-gold-rule w-40 opacity-60" />
          <p className="ja-sans text-[0.65rem] uppercase tracking-[0.3em] text-white/40">
            {site.transparency}
          </p>
        </div>
      </footer>
    </main>
  );
}
