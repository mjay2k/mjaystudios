import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/ja/site';
import { getAllPosts, formatPostDate } from '@/lib/ja/posts';

export const metadata = {
  title: 'Radiance — Jesus Anoints Ministries',
  description:
    'A non-denominational, Holy Spirit–filled Christian ministry — touching the world, one soul at a time.',
};

/* Direction A — "Radiance"
   Born directly from the 2026-08 logo: white ground, royal-blue script,
   letterspaced navy smallcaps, gold hairlines. Set like an heirloom
   Bible — symmetric, luminous, unhurried. */

const NAV = [
  { label: 'Welcome', href: '#welcome' },
  { label: 'Beliefs', href: '#beliefs' },
  { label: 'The Evangelist', href: '#about' },
  { label: 'Ministry', href: '#ministry' },
  { label: 'Journal', href: '/jaministries/blog' },
  { label: 'Books', href: '#books' },
];

function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`ja-eyebrow ${className}`} style={{ color: 'var(--ja-royal)' }}>
      {children}
    </span>
  );
}

export default async function RadiancePage() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <main className="relative min-h-screen" style={{ background: 'var(--ja-paper)', color: 'var(--ja-ink)' }}>
      {/* ── Header — white, the logo on its native ground ─────────────── */}
      <header className="sticky top-0 z-40 border-b border-[color:var(--ja-sand)] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link
            href="/jaministries/radiance"
            aria-label="Jesus Anoints Ministries home"
            className="flex shrink-0 items-center gap-3"
          >
            <Image
              src={site.brand.icon2026}
              alt=""
              width={347}
              height={304}
              priority
              className="h-10 w-auto md:h-11"
            />
            <span className="leading-tight">
              <span className="ja-serif block text-xl font-semibold" style={{ color: 'var(--ja-royal)' }}>
                Jesus Anoints
              </span>
              <span
                className="ja-sans block text-[9px] font-bold uppercase tracking-[0.4em]"
                style={{ color: 'var(--ja-gold-1)' }}
              >
                Ministries
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className="ja-navlink ja-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ja-ink)]/70 hover:text-[color:var(--ja-royal)]"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link
            href="#give"
            className="ja-sans rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--ja-royal)' }}
          >
            Give
          </Link>
        </div>
      </header>

      {/* ── Hero — the illuminated lockup ─────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'var(--ja-cream)' }}>
        {/* faint gold dove, rising from the right margin like gold leaf */}
        <Image
          src={site.brand.iconGold}
          alt=""
          width={560}
          height={560}
          className="pointer-events-none absolute -right-24 top-1/2 hidden w-[34rem] -translate-y-1/2 opacity-[0.07] md:block"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center md:px-6 md:py-32">
          <Eyebrow className="ja-rise">A Global Gospel Ministry</Eyebrow>

          {/* The logo IS the hero — full lockup at reading size, on its native
              light ground, with room to breathe. */}
          <h1 className="ja-rise mt-10" style={{ animationDelay: '0.08s' }}>
            <Image
              src={site.brand.logo2026}
              alt="Jesus Anoints Ministries — Touching the world, one soul at a time"
              width={1146}
              height={711}
              priority
              className="mx-auto w-full max-w-3xl"
            />
          </h1>

          <div className="ja-gold-rule ja-rise mx-auto mt-10 w-56" style={{ animationDelay: '0.16s' }} />

          <p
            className="ja-serif ja-rise mx-auto mt-8 max-w-2xl text-xl italic leading-relaxed md:text-2xl"
            style={{ color: 'var(--ja-ink)', animationDelay: '0.22s' }}
          >
            &ldquo;{site.verse.text}&rdquo;
          </p>
          <p
            className="ja-sans ja-rise mt-3 text-[11px] font-bold uppercase tracking-[0.35em]"
            style={{ color: 'var(--ja-gold-1)', animationDelay: '0.26s' }}
          >
            {site.verse.ref}
          </p>

          <div className="ja-rise mt-12 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: '0.32s' }}>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noreferrer"
              className="ja-sans rounded-full px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[color:var(--ja-ink-900)] transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--ja-gold-grad)' }}
            >
              Watch &amp; Listen
            </a>
            <Link
              href="/jaministries/blog"
              className="ja-sans rounded-full border px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-white"
              style={{ borderColor: 'var(--ja-royal)', color: 'var(--ja-royal)' }}
            >
              Read the Journal
            </Link>
          </div>
        </div>
      </section>

      {/* ── Welcome — editorial spread with an illuminated drop cap ───── */}
      <section id="welcome" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <div>
            <Eyebrow>{site.welcome.heading}</Eyebrow>
            <p className="ja-serif mt-6 text-3xl font-medium leading-snug md:text-4xl" style={{ color: 'var(--ja-royal)' }}>
              {site.welcome.lead}
            </p>
          </div>
          <div className="ja-sans space-y-6 text-base leading-[1.9] text-[color:var(--ja-ink)]/80 md:text-lg">
            {site.welcome.body.map((p, i) => (
              <p key={i}>
                {i === 0 && (
                  <span
                    className="ja-serif float-left mr-3 mt-1 border px-3 py-1 text-6xl font-medium leading-none"
                    style={{ color: 'var(--ja-gold-1)', borderColor: 'var(--ja-gold-3)' }}
                    aria-hidden
                  >
                    {p.charAt(0)}
                  </span>
                )}
                {i === 0 ? p.slice(1) : p}
              </p>
            ))}
            <p className="ja-sans pt-2 text-[11px] font-bold uppercase tracking-[0.35em]" style={{ color: 'var(--ja-gold-1)' }}>
              {site.pillars}
            </p>
          </div>
        </div>
      </section>

      {/* ── Scripture band — royal, candlelit ─────────────────────────── */}
      <section className="ja-dove-watermark relative overflow-hidden" style={{ background: 'var(--ja-slate-grad)' }}>
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center md:px-6 md:py-28">
          <span className="ja-serif block text-7xl leading-none" style={{ color: 'var(--ja-gold-2)' }} aria-hidden>
            &ldquo;
          </span>
          <blockquote className="ja-serif -mt-6 text-3xl font-light leading-snug text-white md:text-5xl">
            {site.scriptures[0].text}
          </blockquote>
          <p className="ja-sans mt-8 text-[11px] font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--ja-gold-2)' }}>
            — {site.scriptures[0].ref} —
          </p>
        </div>
      </section>

      {/* ── Beliefs — the nine tenets, a numbered confession ──────────── */}
      <section id="beliefs" className="scroll-mt-24" style={{ background: 'var(--ja-cream)' }}>
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
          <div className="text-center">
            <Eyebrow>What We Believe</Eyebrow>
            <h2 className="ja-serif mt-5 text-4xl font-medium md:text-5xl">
              Nine convictions,{' '}
              <span className="ja-script text-5xl md:text-6xl" style={{ color: 'var(--ja-royal)' }}>
                one Lord.
              </span>
            </h2>
          </div>
          <ol className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {site.beliefs.map((b) => (
              <li key={b.n} className="border-t pt-5" style={{ borderColor: 'var(--ja-gold-3)' }}>
                <div className="flex items-baseline gap-4">
                  <span className="ja-serif text-2xl italic" style={{ color: 'var(--ja-gold-1)' }}>
                    {b.n}
                  </span>
                  <h3 className="ja-serif text-xl font-semibold leading-snug" style={{ color: 'var(--ja-royal)' }}>
                    {b.title}
                  </h3>
                </div>
                <p className="ja-sans mt-3 pl-12 text-sm leading-relaxed text-[color:var(--ja-ink)]/70">{b.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── The Evangelist — gold-framed portrait plate ───────────────── */}
      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-6 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
          <figure className="relative mx-auto w-full max-w-md">
            {/* offset gold frame — the "plate" */}
            <div
              className="absolute -inset-0 translate-x-3 translate-y-3 border"
              style={{ borderColor: 'var(--ja-gold-1)' }}
              aria-hidden
            />
            <div className="relative aspect-[4/5] overflow-hidden bg-white shadow-xl">
              <Image
                src={site.about.portrait}
                alt={`Portrait of ${site.about.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <figcaption
              className="ja-sans mt-4 text-center text-[11px] font-bold uppercase tracking-[0.3em]"
              style={{ color: 'var(--ja-gold-1)' }}
            >
              {site.about.role}
            </figcaption>
          </figure>
          <div>
            <Eyebrow>The Evangelist</Eyebrow>
            <h2 className="ja-serif mt-5 text-4xl font-medium md:text-5xl" style={{ color: 'var(--ja-royal)' }}>
              {site.about.name}
            </h2>
            <p className="ja-serif mt-6 text-xl italic leading-relaxed text-[color:var(--ja-ink)]/85 md:text-2xl">
              {site.about.lead}
            </p>
            <div className="ja-sans mt-6 space-y-5 text-base leading-[1.85] text-[color:var(--ja-ink)]/75">
              {site.about.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="border-l-2 pl-5 italic" style={{ borderColor: 'var(--ja-gold-2)' }}>
                {site.about.family}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ministry — what the ministry does, set as a quiet index ───── */}
      <section id="ministry" className="scroll-mt-24 border-y" style={{ borderColor: 'var(--ja-sand)', background: 'var(--ja-paper)' }}>
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
          <div className="text-center">
            <Eyebrow>The Work of the Ministry</Eyebrow>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: 'var(--ja-sand)', background: 'var(--ja-sand)' }}>
            {site.programs.map((p) => (
              <div key={p.title} className="bg-white p-8">
                <div className="ja-gold-hr w-8" />
                <h3 className="ja-serif mt-5 text-2xl font-semibold leading-tight" style={{ color: 'var(--ja-royal)' }}>
                  {p.title}
                </h3>
                <p className="ja-sans mt-3 text-sm leading-relaxed text-[color:var(--ja-ink)]/70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journal teaser ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>The Journal</Eyebrow>
            <h2 className="ja-serif mt-5 text-4xl font-medium md:text-5xl">
              Teachings &amp;{' '}
              <span className="italic" style={{ color: 'var(--ja-royal)' }}>
                Prophecies
              </span>
            </h2>
          </div>
          <Link
            href="/jaministries/blog"
            className="ja-navlink ja-sans text-[12px] font-bold uppercase tracking-[0.2em]"
            style={{ color: 'var(--ja-gold-1)' }}
          >
            Read all posts →
          </Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/jaministries/blog/${p.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden" style={{ background: 'var(--ja-cream)' }}>
                {p.cover && (
                  <Image
                    src={p.cover}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <p className="ja-sans mt-5 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--ja-gold-1)' }}>
                {p.tag} · {formatPostDate(p.date)}
              </p>
              <h3 className="ja-serif mt-2 text-2xl font-semibold leading-snug transition-colors group-hover:text-[color:var(--ja-royal)]">
                {p.title}
              </h3>
              <p className="ja-sans mt-2 text-sm leading-relaxed text-[color:var(--ja-ink)]/65">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Books ─────────────────────────────────────────────────────── */}
      <section id="books" className="scroll-mt-24" style={{ background: 'var(--ja-cream)' }}>
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
          <div className="text-center">
            <Eyebrow>From the Author</Eyebrow>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-10 sm:grid-cols-2">
            {site.books.map((b) => (
              <a key={b.title} href={b.href} target="_blank" rel="noreferrer" className="group text-center">
                <div className="relative mx-auto aspect-[2/3] w-48 overflow-hidden shadow-lg transition-transform duration-500 group-hover:-translate-y-1.5">
                  <Image src={b.cover} alt={`${b.title} book cover`} fill sizes="200px" className="object-cover" />
                </div>
                <h3 className="ja-serif mt-6 text-2xl font-semibold" style={{ color: 'var(--ja-royal)' }}>
                  {b.title}
                </h3>
                <p className="ja-sans mx-auto mt-2 max-w-xs text-sm italic leading-relaxed text-[color:var(--ja-ink)]/65">
                  {b.subtitle}
                </p>
                <span className="ja-sans mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--ja-gold-1)' }}>
                  On Amazon →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Give ──────────────────────────────────────────────────────── */}
      <section id="give" className="ja-dove-watermark relative scroll-mt-24 overflow-hidden" style={{ background: 'var(--ja-slate-grad)' }}>
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-20 text-center md:px-6 md:py-28">
          <span className="ja-script text-5xl md:text-6xl" style={{ color: 'var(--ja-gold-2)' }}>
            Partner with us
          </span>
          <h2 className="ja-serif mt-4 text-3xl font-light text-white md:text-4xl">{site.give.heading}</h2>
          <p className="ja-sans mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75">{site.give.body}</p>
          <a
            href="#give"
            className="ja-sans mt-10 inline-block rounded-full px-10 py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-[color:var(--ja-ink-900)] transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--ja-gold-grad)' }}
          >
            {site.give.cta}
          </a>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center md:px-6">
          <Image
            src={site.brand.logo2026}
            alt="Jesus Anoints Ministries"
            width={1146}
            height={711}
            className="mx-auto h-16 w-auto md:h-20"
          />
          <nav className="ja-sans mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--ja-ink)]/60">
            {NAV.map((n) => (
              <Link key={n.label} href={n.href} className="hover:text-[color:var(--ja-royal)]">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ja-sans mt-6 flex items-center justify-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--ja-gold-1)' }}>
            <a href={site.social.facebook} target="_blank" rel="noreferrer" className="hover:underline">
              Facebook
            </a>
            <a href={site.social.youtube} target="_blank" rel="noreferrer" className="hover:underline">
              YouTube
            </a>
            <a href={site.social.amazon} target="_blank" rel="noreferrer" className="hover:underline">
              Amazon
            </a>
          </div>
          <div className="ja-gold-rule mx-auto mt-8 w-40" />
          <p className="ja-sans mt-6 text-[10px] uppercase tracking-[0.3em] text-[color:var(--ja-ink)]/45">
            {site.transparency}
          </p>
        </div>
      </footer>
    </main>
  );
}
