import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/data/ja/site';
import { getAllPosts, formatPostDate } from '@/lib/ja/posts';

export const metadata = {
  title: 'Jesus Anoints Ministries — Anointed',
};

// nav adds the blog ("Teachings") link alongside the section anchors
const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Beliefs', href: '#beliefs' },
  { label: 'Programs', href: '#programs' },
  { label: 'Teachings', href: '/jaministries/blog' },
  { label: 'Books', href: '#books' },
];

export default async function AnointedConcept() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <main
      className="relative overflow-hidden"
      style={{ background: 'var(--ja-ink-900)', color: 'var(--ja-paper)' }}
    >
      {/* Back to concepts */}
      <Link
        href="/jaministries"
        className="ja-sans fixed bottom-5 left-5 z-50 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[0.7rem] uppercase tracking-[0.25em] text-white/70 backdrop-blur-md transition-colors hover:border-[color:var(--ja-gold-1)] hover:text-[color:var(--ja-gold-2)]"
      >
        ← Concepts
      </Link>

      {/* ───────────────────────── NAV ───────────────────────── */}
      <header className="absolute inset-x-0 top-0 z-40">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#top" aria-label={`${site.name} — back to top`} className="transition-transform duration-300 hover:scale-[1.03]">
            <Image
              src={site.brand.logoHorizontalRev}
              alt={site.name}
              width={154}
              height={37}
              className="h-11 w-auto md:h-16"
              priority
            />
          </a>
          <ul className="ja-sans hidden items-center gap-8 text-[0.72rem] uppercase tracking-[0.18em] text-white/70 lg:flex">
            {NAV.map((n) => (
              <li key={n.label}>
                <a
                  href={n.href}
                  className="ja-navlink hover:text-[color:var(--ja-gold-2)]"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#give"
            className="ja-sans rounded-full px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-transform hover:scale-105"
            style={{ background: 'var(--ja-gold-grad)', color: 'var(--ja-ink-900)' }}
          >
            Give
          </a>
        </nav>
      </header>

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section id="top" className="relative flex min-h-screen items-center justify-center">
        <Image
          src={site.images.familyCross}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Cinematic slate darkening (brand surface, not flat black) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(32,38,47,0.78) 0%, rgba(44,51,63,0.48) 42%, rgba(22,27,34,0.92) 100%)',
          }}
        />
        {/* Gold light break */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-[55vh] w-[55vw] -translate-x-1/2 rounded-full blur-[130px]"
          style={{
            background:
              'radial-gradient(circle, rgba(228,200,108,0.30), transparent 70%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          {/* the brand lockup itself carries the wordmark */}
          <Image
            src={site.brand.logoStackedRev}
            alt={site.name}
            width={114}
            height={78}
            priority
            className="ja-fade mx-auto w-[clamp(220px,34vw,340px)] drop-shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
          />
          <p
            className="ja-rise ja-sans mt-8 text-[0.7rem] uppercase tracking-[0.5em]"
            style={{ color: 'var(--ja-gold-2)', animationDelay: '0.1s' }}
          >
            Holy Spirit · Christian Ministry
          </p>
          <div
            className="ja-rise ja-gold-rule mx-auto mt-7 w-48"
            style={{ animationDelay: '0.25s' }}
          />
          <p
            className="ja-rise ja-serif mx-auto mt-8 max-w-2xl text-2xl font-light italic leading-snug text-white/90 md:text-3xl"
            style={{ animationDelay: '0.35s' }}
          >
            “{site.verse.text}”
          </p>
          <p
            className="ja-rise ja-sans mt-4 text-xs uppercase tracking-[0.35em]"
            style={{ color: 'var(--ja-gold-1)', animationDelay: '0.45s' }}
          >
            {site.verse.ref}
          </p>
          <p
            className="ja-rise ja-sans mt-10 text-sm uppercase tracking-[0.3em] text-white/55"
            style={{ animationDelay: '0.55s' }}
          >
            {site.tagline}
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40">
          <span className="ja-sans text-[0.6rem] uppercase tracking-[0.4em]">
            Scroll
          </span>
        </div>
      </section>

      {/* ───────────────────────── WELCOME ───────────────────────── */}
      <section
        id="welcome"
        className="ja-grain ja-dove-watermark relative px-6 py-28"
        style={{ background: 'var(--ja-ink)' }}
      >
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Image
            src={site.brand.iconGold}
            alt=""
            width={64}
            height={64}
            className="mx-auto mb-7 h-14 w-14"
          />
          <p
            className="ja-sans text-[0.7rem] uppercase tracking-[0.45em]"
            style={{ color: 'var(--ja-gold-1)' }}
          >
            {site.welcome.heading}
          </p>
          <h2 className="ja-serif mx-auto mt-6 max-w-3xl text-4xl font-light leading-tight md:text-5xl">
            {site.welcome.lead}
          </h2>
          <div className="ja-gold-rule mx-auto mt-10 w-32" />
          <div className="ja-sans mx-auto mt-10 grid max-w-3xl gap-6 text-left text-base leading-relaxed text-white/65 md:grid-cols-2">
            {site.welcome.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── CREDIBILITY BAND (new) ─────────────────── */}
      <section
        className="ja-slate-fill relative border-y border-white/10 px-6 py-14"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 text-center md:grid-cols-4">
          {[
            { k: '501(c)(3)', v: 'Registered Non-Profit' },
            { k: 'Platinum', v: 'Candid Transparency Seal' },
            { k: 'Worldwide', v: 'Broadcasts · YouTube & Facebook' },
            { k: 'Spirit-Led', v: site.pillars },
          ].map((s) => (
            <div key={s.k} className="px-3">
              <p
                className="ja-serif text-3xl font-light italic md:text-4xl"
                style={{ color: 'var(--ja-gold-2)' }}
              >
                {s.k}
              </p>
              <p className="ja-sans mt-2 text-[0.72rem] uppercase tracking-[0.2em] text-white/55">
                {s.v}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────── ABOUT ───────────────────────── */}
      <section
        id="about"
        className="relative px-6 py-28"
        style={{ background: 'var(--ja-slate-deep)' }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[0.85fr_1.15fr]">
          {/* Portrait frame */}
          <div className="relative mx-auto w-full max-w-sm">
            <div
              className="pointer-events-none absolute -inset-4 rounded-[2rem] opacity-60 blur-2xl"
              style={{ background: 'var(--ja-gold-grad)' }}
            />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-[color:var(--ja-gold-1)]/40 shadow-2xl">
              <Image
                src={site.about.portrait}
                alt={site.about.name}
                width={430}
                height={816}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 60%, rgba(22,27,34,0.6) 100%)',
                }}
              />
            </div>
          </div>

          <div>
            <p
              className="ja-sans text-[0.7rem] uppercase tracking-[0.45em]"
              style={{ color: 'var(--ja-gold-1)' }}
            >
              {site.about.role}
            </p>
            <h2 className="ja-serif mt-4 text-5xl font-light md:text-6xl">
              {site.about.name}
            </h2>
            <p className="ja-serif mt-6 text-2xl font-light italic leading-snug text-white/85">
              {site.about.lead}
            </p>
            <div className="ja-sans mt-6 space-y-4 text-base leading-relaxed text-white/60">
              {site.about.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p
              className="ja-sans mt-6 border-l-2 pl-5 text-sm italic leading-relaxed text-white/55"
              style={{ borderColor: 'var(--ja-gold-1)' }}
            >
              {site.about.family}
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────── SCRIPTURES ───────────────────────── */}
      <section
        className="ja-grain relative px-6 py-28"
        style={{ background: 'var(--ja-ink-900)' }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[40vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
          style={{
            background:
              'radial-gradient(circle, rgba(228,200,108,0.16), transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl space-y-16">
          {site.scriptures.map((s, i) => (
            <blockquote
              key={i}
              className={`max-w-3xl ${i % 2 === 1 ? 'ml-auto text-right' : ''}`}
            >
              <p className="ja-serif text-3xl font-light italic leading-snug text-white/90 md:text-4xl">
                “{s.text}”
              </p>
              <footer
                className="ja-sans mt-4 text-xs uppercase tracking-[0.35em]"
                style={{ color: 'var(--ja-gold-2)' }}
              >
                — {s.ref}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ───────────────────────── BELIEFS ───────────────────────── */}
      <section
        id="beliefs"
        className="relative px-6 py-28"
        style={{ background: 'var(--ja-ink)' }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p
              className="ja-sans text-[0.7rem] uppercase tracking-[0.45em]"
              style={{ color: 'var(--ja-gold-1)' }}
            >
              What We Believe
            </p>
            <h2 className="ja-serif mt-4 text-5xl font-light md:text-6xl">
              Anchored in the <span className="ja-gold-text italic">Word</span>
            </h2>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
            {site.beliefs.map((b) => (
              <div
                key={b.n}
                className="group relative bg-[color:var(--ja-ink)] p-8 transition-colors duration-500 hover:bg-[color:var(--ja-slate-deep)]"
              >
                <span
                  className="ja-serif text-4xl font-light italic"
                  style={{ color: 'var(--ja-gold-1)' }}
                >
                  {b.n}
                </span>
                <h3 className="ja-serif mt-3 text-2xl font-medium leading-tight">
                  {b.title}
                </h3>
                <p className="ja-sans mt-3 text-sm leading-relaxed text-white/55">
                  {b.body}
                </p>
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: 'var(--ja-gold-grad)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── PROGRAMS ───────────────────────── */}
      <section
        id="programs"
        className="relative px-6 py-28"
        style={{ background: 'var(--ja-slate-deep)' }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p
              className="ja-sans text-[0.7rem] uppercase tracking-[0.45em]"
              style={{ color: 'var(--ja-gold-1)' }}
            >
              What We Do
            </p>
            <h2 className="ja-serif mt-4 text-5xl font-light md:text-6xl">
              The Work of the Ministry
            </h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {site.programs.map((p, i) => (
              <div
                key={p.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-9 transition-all duration-500 hover:border-[color:var(--ja-gold-1)]/50"
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(228,200,108,0.3), transparent 70%)',
                  }}
                />
                <span
                  className="ja-serif text-3xl font-light italic"
                  style={{ color: 'var(--ja-gold-1)' }}
                >
                  0{i + 1}
                </span>
                <h3 className="ja-serif relative mt-3 text-3xl font-medium">
                  {p.title}
                </h3>
                <p className="ja-sans relative mt-3 text-base leading-relaxed text-white/60">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── PROPHECIES ───────────────────────── */}
      <section
        id="prophecies"
        className="ja-grain relative px-6 py-28"
        style={{ background: 'var(--ja-ink-900)' }}
      >
        <div className="relative mx-auto max-w-4xl">
          <div className="text-center">
            <p
              className="ja-sans text-[0.7rem] uppercase tracking-[0.45em]"
              style={{ color: 'var(--ja-gold-1)' }}
            >
              Prophetic Insight
            </p>
            <h2 className="ja-serif mt-4 text-5xl font-light md:text-6xl">
              A Public <span className="ja-gold-text italic">Record</span>
            </h2>
          </div>
          <ol className="mt-16 border-l border-white/15 pl-8">
            {site.prophecies.map((p, i) => (
              <li key={i} className="relative pb-10 last:pb-0">
                <span
                  className="absolute -left-[2.15rem] top-1.5 h-3 w-3 rounded-full ring-4 ring-[color:var(--ja-ink-900)]"
                  style={{ background: 'var(--ja-gold-grad)' }}
                />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  {p.date && (
                    <span
                      className="ja-sans text-xs uppercase tracking-[0.25em]"
                      style={{ color: 'var(--ja-gold-2)' }}
                    >
                      {p.date}
                    </span>
                  )}
                  <span className="ja-sans rounded-full border border-white/15 px-3 py-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-white/50">
                    {p.tag}
                  </span>
                </div>
                <h3 className="ja-serif mt-2 text-2xl font-light leading-snug text-white/90">
                  {p.title}
                </h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────────────── BLOG TEASER (new) ─────────────────── */}
      <section
        className="relative px-6 py-28"
        style={{ background: 'var(--ja-ink)' }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p
                className="ja-sans text-[0.7rem] uppercase tracking-[0.45em]"
                style={{ color: 'var(--ja-gold-1)' }}
              >
                From the Journal
              </p>
              <h2 className="ja-serif mt-4 text-5xl font-light md:text-6xl">
                Latest <span className="ja-gold-text italic">Teachings</span>
              </h2>
            </div>
            <Link
              href="/jaministries/blog"
              className="ja-sans text-xs font-semibold uppercase tracking-[0.2em] transition-transform hover:translate-x-1"
              style={{ color: 'var(--ja-gold-2)' }}
            >
              Read all →
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/jaministries/blog/${post.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-[color:var(--ja-gold-1)]/50 hover:bg-white/[0.05]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {post.cover && (
                    <Image
                      src={post.cover}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, transparent 40%, rgba(22,27,34,0.9))',
                    }}
                  />
                  <span
                    className="ja-sans absolute left-4 top-4 rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em]"
                    style={{ background: 'rgba(22,27,34,0.65)', color: 'var(--ja-gold-2)' }}
                  >
                    {post.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="ja-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/45">
                    {formatPostDate(post.date)} · {post.readingMinutes} min
                  </span>
                  <h3 className="ja-serif mt-2 text-2xl font-medium leading-snug transition-colors group-hover:text-[color:var(--ja-gold-2)]">
                    {post.title}
                  </h3>
                  <p className="ja-sans mt-3 text-sm leading-relaxed text-white/60">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── BOOKS ───────────────────────── */}
      <section
        id="books"
        className="relative px-6 py-28"
        style={{ background: 'var(--ja-slate-deep)' }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p
              className="ja-sans text-[0.7rem] uppercase tracking-[0.45em]"
              style={{ color: 'var(--ja-gold-1)' }}
            >
              Anointed Teachings
            </p>
            <h2 className="ja-serif mt-4 text-5xl font-light md:text-6xl">
              Books by Samuel Meesala
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {site.books.map((b) => (
              <Link
                key={b.title}
                href={b.href}
                target="_blank"
                className="group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:border-[color:var(--ja-gold-1)]/60"
              >
                <Image
                  src={b.cover}
                  alt={b.title}
                  width={512}
                  height={288}
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 30%, rgba(22,27,34,0.95) 100%)',
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="ja-serif text-3xl font-medium">{b.title}</h3>
                  <p className="ja-sans mt-2 text-sm leading-relaxed text-white/65">
                    {b.subtitle}
                  </p>
                  <span
                    className="ja-sans mt-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] transition-transform group-hover:translate-x-1"
                    style={{ color: 'var(--ja-gold-2)' }}
                  >
                    On Amazon →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── GIVE ───────────────────────── */}
      <section id="give" className="relative px-6 py-28">
        <div
          className="absolute inset-0"
          style={{ background: 'var(--ja-gold-grad)' }}
        />
        <div className="ja-grain absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-3xl text-center" style={{ color: 'var(--ja-ink-900)' }}>
          <Image
            src={site.brand.iconLight}
            alt=""
            width={56}
            height={56}
            className="mx-auto mb-6 h-12 w-12 opacity-80"
          />
          <h2 className="ja-serif text-5xl font-medium md:text-6xl">
            {site.give.heading}
          </h2>
          <p className="ja-sans mx-auto mt-6 max-w-xl text-base leading-relaxed" style={{ color: 'rgba(22,27,34,0.82)' }}>
            {site.give.body}
          </p>
          <a
            href={site.social.facebook}
            className="ja-sans mt-9 inline-block rounded-full px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] transition-transform hover:scale-105"
            style={{ background: 'var(--ja-ink-900)', color: 'var(--ja-gold-2)' }}
          >
            {site.give.cta}
          </a>
        </div>
      </section>

      {/* ───────────────────────── FOOTER ───────────────────────── */}
      <footer
        id="contact"
        className="ja-dove-watermark relative px-6 py-20"
        style={{ background: 'var(--ja-ink-900)' }}
      >
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-8 text-center">
            <Image
              src={site.brand.logoHorizontalRev}
              alt={site.name}
              width={154}
              height={37}
              className="h-14 w-auto"
            />
            <p className="ja-serif max-w-md text-xl font-light italic text-white/70">
              {site.tagline}
            </p>
            <div className="ja-sans flex flex-wrap items-center justify-center gap-7 text-xs uppercase tracking-[0.25em] text-white/60">
              <a
                href={site.social.facebook}
                className="transition-colors hover:text-[color:var(--ja-gold-2)]"
              >
                Facebook
              </a>
              <a
                href={site.social.youtube}
                className="transition-colors hover:text-[color:var(--ja-gold-2)]"
              >
                YouTube
              </a>
              <a
                href={site.social.amazon}
                className="transition-colors hover:text-[color:var(--ja-gold-2)]"
              >
                Amazon
              </a>
              <Link
                href="/jaministries/blog"
                className="transition-colors hover:text-[color:var(--ja-gold-2)]"
              >
                Teachings
              </Link>
            </div>
            <div className="ja-gold-rule w-40" />
            <p className="ja-sans text-[0.65rem] uppercase tracking-[0.3em] text-white/35">
              {site.transparency}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
