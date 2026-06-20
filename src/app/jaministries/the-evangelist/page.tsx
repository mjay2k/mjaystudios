import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/data/ja/site';
import { getAllPosts, formatPostDate } from '@/lib/ja/posts';

export const metadata = {
  title: 'Jesus Anoints Ministries — The Evangelist',
};

// "The Evangelist" — warm, personal, testimony-driven, on the 2026 brand.
// Cream/sand light surfaces with slate (#3c4459) accent bands + gold dove motif.

// Small gold-dove divider used between sections.
function DoveDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2" aria-hidden>
      <span className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, var(--ja-gold-1))' }} />
      <Image src={site.brand.iconGold} alt="" width={26} height={26} className="h-6 w-6 opacity-90" />
      <span className="h-px w-16" style={{ background: 'linear-gradient(90deg, var(--ja-gold-1), transparent)' }} />
    </div>
  );
}

export default async function TheEvangelistPage() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <main
      className="relative min-h-screen"
      style={{ background: 'var(--ja-cream)', color: 'var(--ja-ink)' }}
    >
      {/* Back to concept chooser */}
      <Link
        href="/jaministries"
        className="ja-sans fixed bottom-4 left-4 z-50 rounded-full border px-4 py-2 text-xs tracking-wide backdrop-blur-md transition-colors"
        style={{
          borderColor: 'rgba(60,68,89,0.15)',
          background: 'rgba(255,253,248,0.7)',
          color: 'var(--ja-slate)',
        }}
      >
        ← Concepts
      </Link>

      {/* ───────────────────────── Nav ───────────────────────── */}
      <header
        className="ja-fade sticky top-0 z-40 border-b backdrop-blur-md"
        style={{
          borderColor: 'rgba(60,68,89,0.10)',
          background: 'rgba(247,242,232,0.82)',
        }}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="#top" aria-label={`${site.name} — back to top`} className="flex items-center transition-transform duration-300 hover:scale-[1.03]">
            <Image
              src={site.brand.logoHorizontal}
              alt={site.name}
              width={154}
              height={37}
              className="h-11 w-auto md:h-16"
              priority
            />
          </Link>
          <ul className="ja-sans hidden items-center gap-8 text-[0.8rem] font-medium lg:flex">
            {site.nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="ja-navlink hover:text-[color:var(--ja-gold-deep)]"
                  style={{ color: 'var(--ja-slate)' }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/jaministries/blog"
                className="ja-navlink hover:text-[color:var(--ja-gold-deep)]"
                style={{ color: 'var(--ja-slate)' }}
              >
                Journal
              </Link>
            </li>
          </ul>
          <Link
            href={site.social.youtube}
            target="_blank"
            className="ja-sans rounded-full px-5 py-2 text-xs font-semibold tracking-wide text-white transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--ja-slate-grad)' }}
          >
            Watch
          </Link>
        </nav>
      </header>

      {/* ───────────────────────── Hero ───────────────────────── */}
      <section id="top" className="ja-grain relative overflow-hidden">
        {/* warm radiance */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-[70vh] w-[60vw] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(circle, rgba(228,200,108,0.30), transparent 70%)' }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-[1.05fr_0.95fr] md:pb-28 md:pt-24">
          {/* Left — words */}
          <div>
            <p
              className="ja-rise ja-sans text-xs font-semibold uppercase tracking-[0.35em]"
              style={{ color: 'var(--ja-gold-deep)', animationDelay: '0.05s' }}
            >
              {site.about.role}
            </p>
            <h1
              className="ja-rise ja-serif mt-5 text-6xl font-light leading-[0.95] md:text-8xl"
              style={{ color: 'var(--ja-ink)', animationDelay: '0.12s', letterSpacing: '-0.015em' }}
            >
              Samuel
              <br />
              <span className="ja-gold-text italic">Meesala</span>
            </h1>
            <p
              className="ja-rise ja-sans mt-7 max-w-md text-lg leading-relaxed"
              style={{ color: 'var(--ja-slate)', animationDelay: '0.2s' }}
            >
              {site.about.lead}
            </p>
            <div className="ja-rise mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: '0.28s' }}>
              <Link
                href="#books"
                className="ja-sans rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--ja-slate-grad)', boxShadow: '0 14px 30px -12px rgba(60,68,89,0.6)' }}
              >
                Read his books
              </Link>
              <Link
                href={site.social.youtube}
                target="_blank"
                className="ja-sans inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[color:var(--ja-gold-deep)]"
                style={{ color: 'var(--ja-slate)' }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full text-[color:var(--ja-ink)]" style={{ background: 'var(--ja-gold-grad)' }}>
                  ▶
                </span>
                Hear his message
              </Link>
            </div>
          </div>

          {/* Right — portrait */}
          <div className="ja-rise relative mx-auto w-full max-w-sm" style={{ animationDelay: '0.18s' }}>
            <div
              className="relative overflow-hidden rounded-[2rem] rounded-tr-[6rem]"
              style={{
                aspectRatio: '430 / 760',
                boxShadow: '0 40px 80px -30px rgba(60,68,89,0.55)',
                border: '1px solid rgba(191,158,99,0.45)',
              }}
            >
              <Image
                src={site.about.portrait}
                alt={site.about.name}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover object-top"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(32,38,47,0.45), transparent 35%)' }}
              />
              <div className="absolute bottom-5 left-6 right-6">
                <p className="ja-serif text-2xl italic text-white/95">{site.about.name}</p>
                <div className="ja-gold-rule mt-2 w-24" />
              </div>
            </div>
            {/* slate-gradient dove tile seal — gold dove on a blue-gradient tile */}
            <div
              className="ja-fade ja-gold-glow absolute -left-6 -top-6 grid h-24 w-24 place-items-center rounded-[1.4rem]"
              style={{ background: 'var(--ja-slate-grad)', animationDelay: '0.5s' }}
            >
              <Image src={site.brand.iconGold} alt="" width={80} height={80} className="h-20 w-20" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Welcome ───────────────────────── */}
      <section id="welcome" className="relative" style={{ background: 'var(--ja-paper)' }}>
        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
          <Image src={site.brand.iconGold} alt="" width={52} height={52} className="mx-auto mb-7 h-13 w-13" />
          <p className="ja-serif text-3xl font-light leading-snug md:text-[2.6rem]" style={{ color: 'var(--ja-ink)' }}>
            {site.welcome.lead}
          </p>
          <div className="ja-gold-rule mx-auto mt-10 w-32" />
          <p className="ja-sans mx-auto mt-8 max-w-2xl text-base leading-relaxed" style={{ color: 'var(--ja-slate)' }}>
            {site.welcome.body[0]}
          </p>
        </div>
      </section>

      {/* ───────────────────────── His Story ───────────────────────── */}
      <section id="about" className="relative" style={{ background: 'var(--ja-cream)' }}>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:items-center">
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{ aspectRatio: '768 / 460', boxShadow: '0 30px 60px -28px rgba(60,68,89,0.5)' }}
            >
              <Image
                src={site.images.familyCross}
                alt="A family before the cross at sunrise"
                fill
                sizes="(max-width: 768px) 90vw, 520px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="ja-sans text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-deep)' }}>
                His Story
              </p>
              <h2 className="ja-serif mt-3 text-4xl font-light leading-tight md:text-5xl" style={{ color: 'var(--ja-ink)' }}>
                A life given fully to Christ.
              </h2>
              <div className="ja-sans mt-6 space-y-5 text-base leading-relaxed" style={{ color: 'var(--ja-slate)' }}>
                <p>{site.about.body[0]}</p>
              </div>
            </div>
          </div>

          {/* testimony pull-quote on slate */}
          <figure
            className="ja-dove-watermark relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-3xl px-8 py-12 text-center md:px-16 md:py-16"
            style={{ background: 'var(--ja-slate-grad)' }}
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(228,200,108,0.35), transparent 70%)' }}
            />
            <span className="ja-serif relative block text-6xl leading-none" style={{ color: 'var(--ja-gold-2)' }}>
              “
            </span>
            <blockquote className="ja-serif relative -mt-4 text-2xl font-light italic leading-snug text-white md:text-3xl">
              {site.about.body[1]}
            </blockquote>
            <figcaption className="ja-sans relative mt-6 text-xs uppercase tracking-[0.3em] text-white/60">
              A testimony of faith &amp; perseverance
            </figcaption>
          </figure>

          <p className="ja-sans mx-auto mt-14 max-w-3xl text-center text-base leading-relaxed" style={{ color: 'var(--ja-slate)' }}>
            {site.about.family}
          </p>
        </div>
      </section>

      {/* ───────────────────────── Reach / credibility band (slate) ───────────────────────── */}
      <section className="ja-dove-watermark relative overflow-hidden" style={{ background: 'var(--ja-slate-grad)', color: 'var(--ja-paper)' }}>
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
            <div>
              <Image
                src={site.brand.logoHorizontalRev}
                alt={site.name}
                width={154}
                height={37}
                className="h-14 w-auto"
              />
              <p className="ja-sans mt-6 max-w-md text-base leading-relaxed text-white/70">
                Reaching believers worldwide through crusades, teaching, and broadcasts —
                on YouTube, Facebook, and digital platforms — touching the world, one soul at a time.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                ['Global', 'Gospel reach'],
                ['501(c)(3)', 'Non-profit'],
                ['Platinum', 'Candid seal'],
              ].map(([big, small]) => (
                <div key={small} className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-6">
                  <p className="ja-serif text-2xl font-medium md:text-3xl" style={{ color: 'var(--ja-gold-2)' }}>{big}</p>
                  <p className="ja-sans mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-white/55">{small}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Beliefs ribbon ───────────────────────── */}
      <section id="beliefs" className="relative" style={{ background: 'var(--ja-paper)' }}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="mb-9 text-center">
            <p className="ja-sans text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-deep)' }}>
              The Foundations of Our Faith
            </p>
            <h2 className="ja-serif mt-2 text-3xl font-light md:text-4xl" style={{ color: 'var(--ja-ink)' }}>
              What we believe
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {site.beliefs.map((b) => (
              <span
                key={b.n}
                className="ja-sans rounded-full border px-5 py-2.5 text-sm transition-colors hover:border-[color:var(--ja-gold-1)] hover:text-[color:var(--ja-gold-deep)]"
                style={{ borderColor: 'rgba(60,68,89,0.15)', color: 'var(--ja-slate)' }}
              >
                {b.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      <DoveDivider />

      {/* ───────────────────────── How He Serves ───────────────────────── */}
      <section id="programs" className="relative" style={{ background: 'var(--ja-cream)' }}>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="ja-sans text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-deep)' }}>
              The Ministry
            </p>
            <h2 className="ja-serif mt-3 text-4xl font-light leading-tight md:text-5xl" style={{ color: 'var(--ja-ink)' }}>
              How he serves the Body of Christ.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {site.programs.map((p, i) => (
              <div
                key={p.title}
                className="group relative overflow-hidden rounded-2xl border bg-white/60 p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ borderColor: 'rgba(60,68,89,0.10)' }}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(circle, rgba(228,200,108,0.4), transparent 70%)' }}
                />
                <span className="ja-serif text-5xl font-light italic" style={{ color: 'var(--ja-gold-1)' }}>
                  0{i + 1}
                </span>
                <h3 className="ja-serif mt-4 text-2xl font-medium" style={{ color: 'var(--ja-ink)' }}>
                  {p.title}
                </h3>
                <p className="ja-sans mt-2 text-sm leading-relaxed" style={{ color: 'var(--ja-slate)' }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Books ───────────────────────── */}
      <section id="books" className="ja-dove-watermark relative ja-grain" style={{ background: 'var(--ja-slate-deep)', color: 'var(--ja-paper)' }}>
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="ja-sans text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-2)' }}>
                Anointed Teachings
              </p>
              <h2 className="ja-serif mt-3 text-4xl font-light md:text-5xl">Books by Samuel Meesala</h2>
            </div>
            <Link
              href={site.social.amazon}
              target="_blank"
              className="ja-sans text-sm font-semibold transition-colors hover:text-[color:var(--ja-gold-2)]"
              style={{ color: 'var(--ja-gold-1)' }}
            >
              View on Amazon →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {site.books.map((book) => (
              <Link
                key={book.title}
                href={book.href}
                target="_blank"
                className="group block overflow-hidden rounded-2xl border transition-all hover:-translate-y-1"
                style={{ borderColor: 'rgba(228,200,108,0.25)', background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="relative" style={{ aspectRatio: '1024 / 683' }}>
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 520px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <h3 className="ja-serif text-2xl font-medium">{book.title}</h3>
                  <p className="ja-sans mt-2 text-sm leading-relaxed text-white/60">{book.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── From the Journal (blog teaser) ───────────────────────── */}
      <section id="journal" className="relative" style={{ background: 'var(--ja-paper)' }}>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="ja-sans text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-deep)' }}>
                From the Journal
              </p>
              <h2 className="ja-serif mt-3 text-4xl font-light md:text-5xl" style={{ color: 'var(--ja-ink)' }}>
                Recent messages
              </h2>
            </div>
            <Link
              href="/jaministries/blog"
              className="ja-sans text-sm font-semibold transition-colors hover:text-[color:var(--ja-gold-deep)]"
              style={{ color: 'var(--ja-gold-deep)' }}
            >
              Read all →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/jaministries/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-white/70 transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ borderColor: 'rgba(60,68,89,0.10)' }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {post.cover && (
                    <Image
                      src={post.cover}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 90vw, 360px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <span
                    className="ja-sans absolute left-4 top-4 rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em]"
                    style={{ background: 'var(--ja-gold-grad)', color: 'var(--ja-ink-900)' }}
                  >
                    {post.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="ja-sans text-[0.7rem] uppercase tracking-[0.18em]" style={{ color: 'var(--ja-slate)' }}>
                    {formatPostDate(post.date)} · {post.readingMinutes} min
                  </span>
                  <h3 className="ja-serif mt-2 text-xl font-medium leading-snug transition-colors group-hover:text-[color:var(--ja-gold-deep)]" style={{ color: 'var(--ja-ink)' }}>
                    {post.title}
                  </h3>
                  <p className="ja-sans mt-2 text-sm leading-relaxed" style={{ color: 'var(--ja-slate)' }}>
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Scripture moment ───────────────────────── */}
      <section className="relative ja-grain overflow-hidden" style={{ background: 'var(--ja-cream)' }}>
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
          <Image src={site.brand.iconGold} alt="" width={40} height={40} className="mx-auto mb-8 h-10 w-10 opacity-90" />
          <p className="ja-serif text-3xl font-light italic leading-snug md:text-4xl" style={{ color: 'var(--ja-ink)' }}>
            “{site.scriptures[1].text}”
          </p>
          <p className="ja-sans mt-7 text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-deep)' }}>
            {site.scriptures[1].ref}
          </p>
        </div>
      </section>

      {/* ───────────────────────── Give ───────────────────────── */}
      <section id="give" className="ja-dove-watermark relative ja-grain overflow-hidden" style={{ background: 'var(--ja-ink)', color: 'var(--ja-paper)' }}>
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[70vw] -translate-x-1/2 rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(228,200,108,0.20), transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:py-28">
          <h2 className="ja-serif text-4xl font-light md:text-6xl">{site.give.heading}</h2>
          <p className="ja-sans mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70">{site.give.body}</p>
          <Link
            href="#give"
            className="ja-sans mt-10 inline-block rounded-full px-9 py-4 text-sm font-bold tracking-wide transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--ja-gold-grad)', color: 'var(--ja-ink)' }}
          >
            {site.give.cta}
          </Link>
        </div>
      </section>

      {/* ───────────────────────── Footer ───────────────────────── */}
      <footer id="contact" style={{ background: 'var(--ja-ink-900)', color: 'var(--ja-paper)' }}>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col items-center gap-8 text-center">
            <Image
              src={site.brand.logoHorizontalRev}
              alt={site.name}
              width={154}
              height={37}
              className="h-14 w-auto opacity-95"
            />
            <p className="ja-serif text-xl italic" style={{ color: 'var(--ja-gold-2)' }}>
              {site.tagline}
            </p>
            <div className="ja-sans flex flex-wrap items-center justify-center gap-7 text-sm">
              <Link href="/jaministries/blog" className="text-white/70 transition-colors hover:text-white">
                Journal
              </Link>
              <Link href={site.social.facebook} target="_blank" className="text-white/70 transition-colors hover:text-white">
                Facebook
              </Link>
              <Link href={site.social.youtube} target="_blank" className="text-white/70 transition-colors hover:text-white">
                YouTube
              </Link>
              <Link href={site.social.amazon} target="_blank" className="text-white/70 transition-colors hover:text-white">
                Amazon
              </Link>
            </div>
            <div className="ja-gold-rule w-full max-w-xs opacity-50" />
            <p className="ja-sans text-xs tracking-wide text-white/40">{site.transparency}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
