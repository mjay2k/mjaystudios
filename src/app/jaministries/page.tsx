import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/ja/site';
import { getAllPosts, formatPostDate } from '@/lib/ja/posts';
import Gallery from './Gallery';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { Brush, Curve } from './brand';

export const metadata = {
  title: 'Jesus Anoints Ministries | Touching the world, one soul at a time',
  description:
    'A Holy Spirit–filled gospel movement touching the world, one soul at a time.',
};

/* Direction B — "Sent"
   Mission-movement energy in the spirit of crossroadsyouth.org, recast in
   the new brand: statement grotesque type on royal blue, the logo's gold
   brush swash as a living underline, sweeping curved section breaks,
   and direct calls to action. */

export default async function SentPage() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <main className="relative min-h-screen bg-white" style={{ color: 'var(--ja-ink)' }}>
      <SiteHeader homeAnchors />

      {/* ── Masthead — the logo gets its hero space on white before the
             statement block takes over ─────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 text-center md:pb-14 md:pt-14">
          <Image
            src={site.brand.logo2026}
            alt="Jesus Anoints Ministries: Touching the world, one soul at a time"
            width={1146}
            height={711}
            priority
            className="ja-rise mx-auto w-full max-w-2xl"
          />
        </div>
      </section>

      {/* ── Hero — statement type on royal blue ────────────────────────── */}
      <section className="ja-dove-watermark relative overflow-hidden" style={{ background: 'var(--ja-slate-grad)' }}>
        <Curve fill="#ffffff" invert />
        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-8 text-center md:px-6 md:pb-36 md:pt-12">
          <p className="ja-display ja-rise text-[13px] font-bold uppercase tracking-[0.35em]" style={{ color: 'var(--ja-gold-2)' }}>
            A global gospel movement
          </p>
          <h1
            className="ja-display ja-rise mx-auto mt-6 max-w-5xl text-[13vw] font-black uppercase leading-[0.95] tracking-tight text-white sm:text-7xl md:text-[6.2rem]"
            style={{ animationDelay: '0.08s' }}
          >
            Equipping.
            <br />
            Empowering.
          </h1>
          <div className="ja-rise relative mx-auto mt-4 w-fit md:mt-6" style={{ animationDelay: '0.16s' }}>
            <span className="ja-script block px-4 text-5xl leading-tight sm:text-6xl md:text-8xl" style={{ color: 'var(--ja-gold-2)' }}>
              enriching lives
            </span>
            <Brush className="mx-auto mt-1 h-4 w-3/4 md:h-6" />
          </div>
          <p
            className="ja-sans ja-rise mx-auto mt-10 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
            style={{ animationDelay: '0.24s' }}
          >
            {site.welcome.lead} {site.established}.
          </p>
          <div className="ja-rise mt-10 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: '0.3s' }}>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noreferrer"
              className="ja-display rounded-md px-8 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] text-[color:var(--ja-ink-900)] transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--ja-gold-grad)' }}
            >
              Watch Live
            </a>
            <Link
              href="#give"
              className="ja-display rounded-md border-2 border-white/60 px-8 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Partner With Us
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <Curve fill="#ffffff" />
        </div>
      </section>

      {/* ── Mission statement — big type, brush-marked ─────────────────── */}
      <section id="mission" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-16 text-center md:px-6 md:py-24">
        <p className="ja-display text-[13px] font-bold uppercase tracking-[0.35em]" style={{ color: 'var(--ja-royal)' }}>
          Our calling
        </p>
        <h2 className="ja-display mx-auto mt-6 max-w-4xl text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl md:text-6xl">
          To{' '}
          <span className="relative inline-block" style={{ color: 'var(--ja-royal)' }}>
            exhort, edify, and comfort
            <Brush className="absolute -bottom-2 left-0 h-3 w-full md:-bottom-3 md:h-4" />
          </span>{' '}
          the Body of Christ through Spirit-led teaching, gatherings, and evangelistic crusades.
        </h2>
        <p className="ja-sans mx-auto mt-8 max-w-2xl text-base leading-[1.9] text-[color:var(--ja-ink)]/70 md:text-lg">
          {site.welcome.body[1]}
        </p>
      </section>

      {/* ── Three pillars, each planted in Scripture ───────────────────── */}
      <Curve fill="#faf7ef" />
      <section className="relative" style={{ background: 'var(--ja-cream)' }}>
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-4 md:px-6 md:pb-24 md:pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            {(
              [
                { word: 'Equipping', line: 'believers to walk in salvation, righteousness, and purpose.', s: site.scriptures[1] },
                { word: 'Empowering', line: 'the Church by the Spirit, not by might, nor by power.', s: site.scriptures[0] },
                { word: 'Enriching', line: 'lives with the liberty found where the Spirit of the Lord is.', s: site.scriptures[2] },
              ] as const
            ).map((p, i) => (
              <article
                key={p.word}
                className="ja-rise rounded-lg bg-white p-8 shadow-[0_10px_40px_-18px_rgba(14,26,51,0.25)]"
                style={{ animationDelay: `${0.06 * i}s` }}
              >
                <div className="ja-gold-hr w-10" />
                <h3 className="ja-display mt-5 text-3xl font-black uppercase tracking-tight" style={{ color: 'var(--ja-royal)' }}>
                  {p.word}
                </h3>
                <p className="ja-sans mt-2 text-sm leading-relaxed text-[color:var(--ja-ink)]/70">{p.line}</p>
                <blockquote className="ja-serif mt-6 border-l-2 pl-4 text-lg italic leading-snug text-[color:var(--ja-ink)]/85" style={{ borderColor: 'var(--ja-gold-2)' }}>
                  {p.s.text}
                  <cite className="ja-sans mt-2 block text-[11px] font-bold uppercase not-italic tracking-[0.25em]" style={{ color: 'var(--ja-gold-1)' }}>
                    {p.s.ref}
                  </cite>
                </blockquote>
              </article>
            ))}
          </div>
        </div>
        <Curve fill="#ffffff" />
      </section>

      {/* ── What we do — photo split rows ──────────────────────────────── */}
      <section id="work" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 md:space-y-24 md:px-6 md:py-24">
          {(
            [
              {
                img: site.images.familyCross,
                alt: 'Gathered in worship beneath the cross',
                tag: 'Crusades & Gatherings',
                head: 'Proclaiming Christ to the nations',
                body: site.programs[0].body + ' ' + site.programs[3].body,
                cta: { label: 'Watch broadcasts', href: site.social.youtube, external: true },
              },
              {
                img: site.images.portraitCream,
                alt: 'Evangelist Samuel Meesala teaching',
                tag: 'Teaching the Word',
                head: 'Bible-centered, Spirit-led teaching',
                body: site.programs[1].body + ' Series and messages reach believers worldwide via YouTube and Facebook.',
                cta: { label: 'Read the teachings', href: '/jaministries/blog', external: false },
              },
              {
                img: '/jaministries/curated/doves-sky-clean.jpg',
                alt: 'Doves in flight against the sky',
                tag: 'Prophetic Record',
                head: 'A public record, kept to the glory of God',
                body: site.programs[2].body + ' Every word is dated, tested, and submitted to Scripture.',
                cta: { label: 'See the record', href: '/jaministries/blog', external: false },
              },
            ] as const
          ).map((row, i) => (
            <div key={row.tag} className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${i % 2 ? 'md:[&>figure]:order-2' : ''}`}>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={row.img}
                  alt={row.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </figure>
              <div>
                <p className="ja-display text-[13px] font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-1)' }}>
                  {row.tag}
                </p>
                <h3 className="ja-display mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl" style={{ color: 'var(--ja-ink)' }}>
                  {row.head}
                </h3>
                <p className="ja-sans mt-5 text-base leading-[1.85] text-[color:var(--ja-ink)]/70">{row.body}</p>
                {row.cta.external ? (
                  <a
                    href={row.cta.href}
                    target="_blank"
                    rel="noreferrer"
                    className="ja-display mt-6 inline-block text-[13px] font-extrabold uppercase tracking-[0.1em] underline decoration-2 underline-offset-8 hover:decoration-4"
                    style={{ color: 'var(--ja-royal)', textDecorationColor: 'var(--ja-gold-2)' }}
                  >
                    {row.cta.label} →
                  </a>
                ) : (
                  <Link
                    href={row.cta.href}
                    className="ja-display mt-6 inline-block text-[13px] font-extrabold uppercase tracking-[0.1em] underline decoration-2 underline-offset-8 hover:decoration-4"
                    style={{ color: 'var(--ja-royal)', textDecorationColor: 'var(--ja-gold-2)' }}
                  >
                    {row.cta.label} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimony band — the evangelist's story ────────────────────── */}
      <section id="testimony" className="relative scroll-mt-24">
        <Curve fill="#faf7ef" />
        <div style={{ background: 'var(--ja-cream)' }}>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[4fr_8fr] md:gap-16 md:px-6 md:py-20">
            <figure className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-lg md:max-w-none">
              <Image
                src={site.about.portrait}
                alt={`Portrait of ${site.about.name}`}
                fill
                sizes="(max-width: 768px) 80vw, 33vw"
                className="object-cover"
              />
            </figure>
            <div>
              <p className="ja-display text-[13px] font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-1)' }}>
                A living testimony
              </p>
              <blockquote className="ja-display mt-5 text-2xl font-extrabold leading-[1.25] tracking-tight sm:text-3xl md:text-4xl" style={{ color: 'var(--ja-ink)' }}>
                Two kidney transplants. End-stage renal failure. And a message of faith{' '}
                <span className="relative inline-block" style={{ color: 'var(--ja-royal)' }}>
                  God kept alive
                  <Brush className="absolute -bottom-1.5 left-0 h-3 w-full" />
                </span>{' '}
                through it all.
              </blockquote>
              <p className="ja-sans mt-6 max-w-2xl text-base leading-[1.85] text-[color:var(--ja-ink)]/70">
                {site.about.body[0]}
              </p>
              <p className="ja-display mt-6 text-[13px] font-extrabold uppercase tracking-[0.1em]" style={{ color: 'var(--ja-royal)' }}>
                {site.about.name} · {site.about.role}
              </p>
            </div>
          </div>
        </div>
        <Curve fill="#ffffff" />
      </section>

      {/* ── Gallery — drifting ribbons that open into the full album ───── */}
      <section id="gallery" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 md:px-6 md:pb-20 md:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="ja-display text-[13px] font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-1)' }}>
              The Gallery
            </p>
            <h2 className="ja-display mt-4 text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">
              {site.gallery.heading}
            </h2>
            <p className="ja-sans mx-auto mt-5 max-w-2xl text-base leading-[1.85] text-[color:var(--ja-ink)]/70">
              {site.gallery.body}
            </p>
          </div>
        </div>
        <div className="pb-16 md:pb-24">
          <Gallery />
        </div>
      </section>

      {/* ── Beliefs — the nine convictions ─────────────────────────────── */}
      <Curve fill="#faf7ef" />
      <section id="beliefs" className="scroll-mt-24" style={{ background: 'var(--ja-cream)' }}>
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-4 md:px-6 md:pb-24 md:pt-6">
          <div className="text-center">
            <p className="ja-display text-[13px] font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-1)' }}>
              What We Believe
            </p>
            <h2 className="ja-display mt-4 text-3xl font-black uppercase tracking-tight md:text-5xl">
              Nine convictions,{' '}
              <span className="relative inline-block" style={{ color: 'var(--ja-royal)' }}>
                one Lord
                <Brush className="absolute -bottom-1.5 left-0 h-3 w-full" />
              </span>
            </h2>
          </div>
          <ol className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {site.beliefs.map((b) => (
              <li key={b.n} className="rounded-lg bg-white p-6 shadow-[0_10px_40px_-22px_rgba(14,26,51,0.35)]">
                <span className="ja-display text-sm font-extrabold" style={{ color: 'var(--ja-gold-1)' }}>
                  {b.n}
                </span>
                <h3 className="ja-display mt-2 text-lg font-extrabold uppercase leading-tight tracking-tight" style={{ color: 'var(--ja-royal)' }}>
                  {b.title}
                </h3>
                <p className="ja-sans mt-2 text-sm leading-relaxed text-[color:var(--ja-ink)]/70">{b.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <Link
              href="/jaministries/beliefs"
              className="ja-display inline-block rounded-md px-8 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] text-white transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--ja-royal)' }}
            >
              Read the full statement of faith →
            </Link>
          </div>
        </div>
        <Curve fill="#ffffff" />
      </section>

      {/* ── Books ─────────────────────────────────────────────────────── */}
      <section id="books" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-20">
          <div className="text-center">
            <p className="ja-display text-[13px] font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-1)' }}>
              From the Author
            </p>
            <h2 className="ja-display mt-4 text-3xl font-black uppercase tracking-tight md:text-4xl">
              Books by Samuel Meesala
            </h2>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {site.books.map((b) => (
              <a key={b.title} href={b.href} target="_blank" rel="noreferrer" className="group flex gap-5">
                <div className="relative aspect-[2/3] w-28 shrink-0 overflow-hidden rounded-md shadow-lg transition-transform duration-500 group-hover:-translate-y-1.5">
                  <Image src={b.cover} alt={`${b.title} book cover`} fill sizes="112px" className="object-cover" />
                </div>
                <div>
                  <h3 className="ja-display text-xl font-extrabold uppercase leading-tight tracking-tight" style={{ color: 'var(--ja-royal)' }}>
                    {b.title}
                  </h3>
                  <p className="ja-sans mt-2 text-sm italic leading-relaxed text-[color:var(--ja-ink)]/65">{b.subtitle}</p>
                  <span className="ja-display mt-3 inline-block text-[12px] font-extrabold uppercase tracking-[0.1em] underline decoration-2 underline-offset-4" style={{ color: 'var(--ja-royal)', textDecorationColor: 'var(--ja-gold-2)' }}>
                    On Amazon →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA quad — gold band ───────────────────────────────────────── */}
      <section id="give" className="relative scroll-mt-24" style={{ background: 'var(--ja-gold-grad)' }}>
        <Curve fill="#ffffff" invert />
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-6 md:px-6 md:pb-20 md:pt-8">
          <h2 className="ja-display text-center text-3xl font-black uppercase tracking-tight md:text-5xl" style={{ color: 'var(--ja-ink-900)' }}>
            Take your place in the harvest
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                { label: 'Pray with us', sub: 'Send a prayer request', href: '/jaministries/pray', external: false },
                { label: 'Watch & listen', sub: 'Broadcasts on YouTube & Facebook', href: site.social.youtube, external: true },
                { label: 'Prophecy records', sub: 'The dated public record', href: '/jaministries/prophecy-records', external: false },
                { label: 'Give', sub: 'Partner with the ministry', href: '/jaministries/give', external: false },
              ] as const
            ).map((t) =>
              t.external ? (
                <a
                  key={t.label}
                  href={t.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-lg p-6 transition-transform hover:-translate-y-1"
                  style={{ background: 'var(--ja-ink-900)' }}
                >
                  <p className="ja-display text-xl font-extrabold uppercase tracking-tight text-white">{t.label}</p>
                  <p className="ja-sans mt-2 text-xs leading-relaxed text-white/60">{t.sub}</p>
                  <span className="ja-display mt-4 inline-block text-sm font-extrabold" style={{ color: 'var(--ja-gold-2)' }}>
                    →
                  </span>
                </a>
              ) : (
                <Link
                  key={t.label}
                  href={t.href}
                  className="group rounded-lg p-6 transition-transform hover:-translate-y-1"
                  style={{ background: 'var(--ja-ink-900)' }}
                >
                  <p className="ja-display text-xl font-extrabold uppercase tracking-tight text-white">{t.label}</p>
                  <p className="ja-sans mt-2 text-xs leading-relaxed text-white/60">{t.sub}</p>
                  <span className="ja-display mt-4 inline-block text-sm font-extrabold" style={{ color: 'var(--ja-gold-2)' }}>
                    →
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
        <Curve fill="#ffffff" />
      </section>

      {/* ── Journal — latest posts ─────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="ja-display text-3xl font-black uppercase tracking-tight md:text-5xl">
            From the{' '}
            <span className="relative inline-block" style={{ color: 'var(--ja-royal)' }}>
              journal
              <Brush className="absolute -bottom-1.5 left-0 h-3 w-full" />
            </span>
          </h2>
          <Link
            href="/jaministries/blog"
            className="ja-display text-[13px] font-extrabold uppercase tracking-[0.1em] underline decoration-2 underline-offset-8 hover:decoration-4"
            style={{ color: 'var(--ja-royal)', textDecorationColor: 'var(--ja-gold-2)' }}
          >
            All posts →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/jaministries/blog/${p.slug}`}
              className="group overflow-hidden rounded-lg border border-black/8 transition-shadow hover:shadow-[0_18px_50px_-20px_rgba(14,26,51,0.35)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden" style={{ background: 'var(--ja-cream)' }}>
                {p.cover && (
                  <Image
                    src={p.cover}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <span
                  className="ja-display absolute left-4 top-4 rounded px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[color:var(--ja-ink-900)]"
                  style={{ background: 'var(--ja-gold-2)' }}
                >
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <p className="ja-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--ja-ink)]/50">
                  {formatPostDate(p.date)} · {p.readingMinutes} min
                </p>
                <h3 className="ja-display mt-2 text-xl font-extrabold leading-snug tracking-tight transition-colors group-hover:text-[color:var(--ja-royal)]">
                  {p.title}
                </h3>
                <p className="ja-sans mt-2 text-sm leading-relaxed text-[color:var(--ja-ink)]/65">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Staff ─────────────────────────────────────────────────────── */}
      <Curve fill="#faf7ef" />
      <section id="staff" className="scroll-mt-24" style={{ background: 'var(--ja-cream)' }}>
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-4 md:px-6 md:pb-20 md:pt-6">
          <div className="text-center">
            <p className="ja-display text-[13px] font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-1)' }}>
              Our Staff
            </p>
            <h2 className="ja-display mt-4 text-3xl font-black uppercase tracking-tight md:text-4xl">
              The family serving this work
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {site.staff.map((s) => (
              <article key={s.name} className="rounded-lg bg-white p-7 shadow-[0_10px_40px_-22px_rgba(14,26,51,0.35)]">
                <div className="ja-gold-hr w-8" />
                <h3 className="ja-display mt-4 text-xl font-extrabold uppercase leading-tight tracking-tight" style={{ color: 'var(--ja-royal)' }}>
                  {s.name}
                </h3>
                <p className="ja-sans mt-1 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--ja-gold-1)' }}>
                  {s.role}
                </p>
                <p className="ja-sans mt-3 text-sm leading-relaxed text-[color:var(--ja-ink)]/70">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
        <Curve fill="#ffffff" />
      </section>

      {/* ── Trust — Platinum Seal, Credentials, Contact ────────────────── */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-3 md:px-6 md:py-20">
          <article id="seal" className="scroll-mt-24 rounded-lg border p-7" style={{ borderColor: 'var(--ja-sand)' }}>
            <p className="ja-display text-[12px] font-extrabold uppercase tracking-[0.25em]" style={{ color: 'var(--ja-gold-1)' }}>
              Platinum Seal
            </p>
            <h3 className="ja-display mt-3 text-2xl font-black uppercase leading-tight tracking-tight" style={{ color: 'var(--ja-royal)' }}>
              Transparency, certified
            </h3>
            <p className="ja-sans mt-3 text-sm leading-relaxed text-[color:var(--ja-ink)]/70">
              Jesus Anoints Ministries is a registered 501(c)(3) non-profit, certified with the
              Candid Platinum Transparency Seal, the highest level of transparency Candid awards.
            </p>
          </article>

          <article id="credentials" className="scroll-mt-24 rounded-lg border p-7" style={{ borderColor: 'var(--ja-sand)' }}>
            <p className="ja-display text-[12px] font-extrabold uppercase tracking-[0.25em]" style={{ color: 'var(--ja-gold-1)' }}>
              Credentials
            </p>
            <h3 className="ja-display mt-3 text-2xl font-black uppercase leading-tight tracking-tight" style={{ color: 'var(--ja-royal)' }}>
              Ministry credentialing
            </h3>
            <p className="ja-sans mt-3 text-sm leading-relaxed text-[color:var(--ja-ink)]/70">
              {site.credentials}
            </p>
          </article>

          <article id="contact" className="scroll-mt-24 rounded-lg p-7" style={{ background: 'var(--ja-ink-900)' }}>
            <p className="ja-display text-[12px] font-extrabold uppercase tracking-[0.25em]" style={{ color: 'var(--ja-gold-2)' }}>
              Contact
            </p>
            <h3 className="ja-display mt-3 text-2xl font-black uppercase leading-tight tracking-tight text-white">
              Reach the ministry
            </h3>
            <p className="ja-sans mt-3 text-sm leading-relaxed text-white/65">
              For prayer, speaking invitations, or partnership, reach us on any of these
              channels and we will respond.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <a href={site.social.facebook} target="_blank" rel="noreferrer" className="ja-display text-[12px] font-extrabold uppercase tracking-[0.1em]" style={{ color: 'var(--ja-gold-2)' }}>
                Facebook →
              </a>
              <a href={site.social.youtube} target="_blank" rel="noreferrer" className="ja-display text-[12px] font-extrabold uppercase tracking-[0.1em]" style={{ color: 'var(--ja-gold-2)' }}>
                YouTube →
              </a>
              <Link href="/jaministries/pray" className="ja-display text-[12px] font-extrabold uppercase tracking-[0.1em]" style={{ color: 'var(--ja-gold-2)' }}>
                Prayer &amp; contact →
              </Link>
            </div>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
