import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/ja/site';

export const metadata = {
  title: `${site.name} — Sanctuary`,
};

/* ── Small presentational helpers ─────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="ja-sans text-[0.65rem] font-semibold uppercase tracking-[0.32em]"
      style={{ color: 'var(--ja-gold-deep)' }}
    >
      {children}
    </span>
  );
}

/* A bento tile — rounded card with hover lift and a gold accent on hover. */
function Tile({
  children,
  className = '',
  delay = 0,
  tone = 'paper',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  tone?: 'paper' | 'cream' | 'slate' | 'gold';
  id?: string;
}) {
  const tones: Record<string, React.CSSProperties> = {
    paper: { background: 'var(--ja-paper)', color: 'var(--ja-slate-deep)' },
    cream: { background: 'var(--ja-cream)', color: 'var(--ja-slate-deep)' },
    slate: { background: 'var(--ja-slate-deep)', color: '#fff' },
    gold: { background: 'var(--ja-gold-grad)', color: 'var(--ja-ink-900)' },
  };
  return (
    <div
      id={id}
      className={`ja-rise group relative flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] p-7 shadow-[0_1px_2px_rgba(27,32,48,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_50px_-18px_rgba(27,32,48,0.28)] ${className}`}
      style={{ ...tones[tone], animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function SanctuaryPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: 'var(--ja-sand)', color: 'var(--ja-slate-deep)' }}
    >
      {/* Back to concepts */}
      <Link
        href="/jaministries"
        className="ja-sans fixed left-5 top-5 z-50 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--ja-slate)] shadow-sm backdrop-blur transition-colors hover:text-[color:var(--ja-gold-deep)]"
      >
        ← Concepts
      </Link>

      {/* Sticky top bar */}
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-[color:var(--ja-sand)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="#top" className="flex items-center gap-3">
            <Image src={site.brand.icon} alt="" width={34} height={34} className="h-9 w-9" />
            <Image src={site.brand.logo} alt={site.name} width={150} height={34} className="hidden h-7 w-auto sm:block" />
          </Link>
          <nav className="ja-sans hidden items-center gap-7 text-[0.8rem] font-medium text-[color:var(--ja-slate)] lg:flex">
            {site.nav.slice(0, 6).map((n) => (
              <a key={n.label} href={n.href} className="transition-colors hover:text-[color:var(--ja-gold-deep)]">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#give"
            className="ja-sans rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[color:var(--ja-ink-900)] shadow-sm transition-transform hover:scale-105"
            style={{ background: 'var(--ja-gold-grad)' }}
          >
            Give
          </a>
        </div>
      </header>

      <div id="top" className="mx-auto max-w-7xl px-6 pb-24 pt-14 md:pt-20">
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="ja-rise relative mb-6 overflow-hidden rounded-[2rem] px-8 py-16 text-center md:px-16 md:py-24" style={{ background: 'var(--ja-slate-deep)', color: '#fff' }}>
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[90px]"
            style={{ background: 'radial-gradient(circle, rgba(229,201,101,0.35), transparent 70%)' }}
          />
          <div
            className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full blur-[110px]"
            style={{ background: 'radial-gradient(circle, rgba(192,158,95,0.22), transparent 70%)' }}
          />
          <div className="relative">
            <Image src={site.brand.icon} alt="" width={56} height={56} className="mx-auto mb-7 h-14 w-14" />
            <Eyebrow>{site.pillars}</Eyebrow>
            <h1 className="ja-serif mx-auto mt-5 max-w-4xl text-5xl font-light leading-[1.02] md:text-7xl">
              {site.name.split(' ').slice(0, 2).join(' ')}{' '}
              <span className="ja-gold-text italic">Ministries</span>
            </h1>
            <p className="ja-sans mx-auto mt-6 max-w-xl text-base text-white/70">
              {site.tagline}
            </p>
            <p className="ja-serif mx-auto mt-8 max-w-2xl text-xl italic text-white/85 md:text-2xl">
              “{site.verse.text}”
              <span className="ja-sans ml-2 align-middle text-xs not-italic tracking-[0.2em] text-[color:var(--ja-gold-2)]">
                — {site.verse.ref}
              </span>
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#give"
                className="ja-sans rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[color:var(--ja-ink-900)] transition-transform hover:scale-105"
                style={{ background: 'var(--ja-gold-grad)' }}
              >
                {site.give.cta}
              </a>
              <a
                href="#about"
                className="ja-sans rounded-full border border-white/25 px-7 py-3 text-sm font-medium uppercase tracking-[0.15em] text-white/90 transition-colors hover:border-[color:var(--ja-gold-2)] hover:text-[color:var(--ja-gold-2)]"
              >
                Meet the Evangelist
              </a>
            </div>
          </div>
        </section>

        {/* ── Bento grid ─────────────────────────────────────────────── */}
        <section className="grid auto-rows-[minmax(0,auto)] grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {/* Welcome — large */}
          <Tile className="md:col-span-2 lg:col-span-2 lg:row-span-2" delay={0.05}>
            <Eyebrow>{site.welcome.heading}</Eyebrow>
            <h2 className="ja-serif mt-3 text-3xl font-medium leading-tight md:text-4xl">
              {site.welcome.lead}
            </h2>
            <div className="ja-sans mt-5 space-y-4 text-sm leading-relaxed text-[color:var(--ja-slate)]/85">
              {site.welcome.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="ja-gold-rule mt-auto pt-8" />
          </Tile>

          {/* Verse / scripture — gold */}
          <Tile className="lg:col-span-2" delay={0.1} tone="gold">
            <Eyebrow>Scripture</Eyebrow>
            <p className="ja-serif mt-3 text-2xl font-medium italic leading-snug md:text-3xl">
              “{site.scriptures[0].text}”
            </p>
            <p className="ja-sans mt-4 text-xs font-semibold uppercase tracking-[0.25em]">
              {site.scriptures[0].ref}
            </p>
          </Tile>

          {/* Programs */}
          <Tile className="lg:col-span-2" delay={0.15} tone="slate">
            <Eyebrow>What We Do</Eyebrow>
            <ul className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {site.programs.map((p) => (
                <li key={p.title}>
                  <h3 className="ja-serif text-lg" style={{ color: 'var(--ja-gold-2)' }}>
                    {p.title}
                  </h3>
                  <p className="ja-sans mt-1 text-xs leading-relaxed text-white/65">{p.body}</p>
                </li>
              ))}
            </ul>
          </Tile>

          {/* About + portrait — tall */}
          <Tile id="about" className="lg:row-span-2 !p-0" delay={0.2}>
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={site.about.portrait}
                alt={site.about.name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-2/3"
                style={{ background: 'linear-gradient(to top, rgba(43,49,66,0.95), transparent)' }}
              />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <Eyebrow>The Evangelist</Eyebrow>
              <h3 className="ja-serif mt-2 text-2xl font-medium">{site.about.name}</h3>
              <p className="ja-sans mt-1 text-xs uppercase tracking-[0.18em] text-[color:var(--ja-gold-deep)]">
                {site.about.role}
              </p>
              <p className="ja-sans mt-4 text-sm leading-relaxed text-[color:var(--ja-slate)]/85">
                {site.about.lead}
              </p>
            </div>
          </Tile>

          {/* Prophecies feed — tall */}
          <Tile className="md:col-span-2 lg:row-span-2" delay={0.25}>
            <div className="flex items-center justify-between">
              <Eyebrow>Prophecies & Teaching</Eyebrow>
              <span className="ja-sans text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--ja-slate)]/45">
                Public Record
              </span>
            </div>
            <ul className="mt-4 divide-y divide-black/[0.07]">
              {site.prophecies.map((p) => (
                <li key={p.title} className="group/row flex items-start gap-4 py-3.5">
                  <span
                    className="ja-sans mt-0.5 shrink-0 rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em]"
                    style={{ background: 'var(--ja-cream)', color: 'var(--ja-gold-deep)' }}
                  >
                    {p.tag}
                  </span>
                  <div>
                    <p className="ja-sans text-sm font-medium leading-snug transition-colors group-hover/row:text-[color:var(--ja-gold-deep)]">
                      {p.title}
                    </p>
                    {p.date && (
                      <p className="ja-sans mt-0.5 text-[0.7rem] uppercase tracking-[0.15em] text-[color:var(--ja-slate)]/45">
                        {p.date}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Tile>

          {/* Books */}
          <Tile className="lg:col-span-2" delay={0.3} tone="cream">
            <Eyebrow>Books by {site.about.name.split(' ').slice(-2).join(' ')}</Eyebrow>
            <div className="mt-5 grid grid-cols-2 gap-5">
              {site.books.map((b) => (
                <a key={b.title} href={b.href} target="_blank" rel="noreferrer" className="group/book block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-md">
                    <Image src={b.cover} alt={b.title} fill className="object-cover transition-transform duration-500 group-hover/book:scale-105" />
                  </div>
                  <h3 className="ja-serif mt-3 text-lg leading-tight">{b.title}</h3>
                  <p className="ja-sans mt-1 text-xs leading-snug text-[color:var(--ja-slate)]/70">{b.subtitle}</p>
                </a>
              ))}
            </div>
          </Tile>

          {/* Beliefs summary */}
          <Tile delay={0.35}>
            <Eyebrow>What We Believe</Eyebrow>
            <p className="ja-serif mt-3 text-5xl font-light" style={{ color: 'var(--ja-gold-deep)' }}>
              {site.beliefs.length}
            </p>
            <p className="ja-sans mt-1 text-sm text-[color:var(--ja-slate)]/75">tenets of faith</p>
            <ul className="ja-sans mt-4 space-y-1.5 text-xs text-[color:var(--ja-slate)]/70">
              {site.beliefs.slice(0, 4).map((b) => (
                <li key={b.n} className="flex gap-2">
                  <span style={{ color: 'var(--ja-gold-deep)' }}>{b.n}</span>
                  {b.title}
                </li>
              ))}
            </ul>
            <a href="#beliefs" className="ja-sans mt-auto pt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[color:var(--ja-gold-deep)]">
              All beliefs →
            </a>
          </Tile>

          {/* Give CTA */}
          <Tile id="give" delay={0.4} tone="slate">
            <Eyebrow>{site.give.heading}</Eyebrow>
            <p className="ja-sans mt-3 flex-1 text-sm leading-relaxed text-white/75">{site.give.body}</p>
            <a
              href={site.social.amazon}
              className="ja-sans mt-5 inline-block w-fit rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[color:var(--ja-ink-900)] transition-transform hover:scale-105"
              style={{ background: 'var(--ja-gold-grad)' }}
            >
              {site.give.cta}
            </a>
          </Tile>
        </section>

        {/* ── Full beliefs ───────────────────────────────────────────── */}
        <section id="beliefs" className="mt-20">
          <div className="mb-8 text-center">
            <Eyebrow>What We Believe</Eyebrow>
            <h2 className="ja-serif mt-3 text-4xl font-light md:text-5xl">Our Foundation</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {site.beliefs.map((b, i) => (
              <div
                key={b.n}
                className="ja-rise rounded-2xl border border-black/[0.06] bg-[color:var(--ja-paper)] p-6 transition-colors hover:border-[color:var(--ja-gold-1)]/50"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <span className="ja-serif text-2xl italic" style={{ color: 'var(--ja-gold-deep)' }}>
                  {b.n}
                </span>
                <h3 className="ja-serif mt-2 text-xl leading-tight">{b.title}</h3>
                <p className="ja-sans mt-2 text-sm leading-relaxed text-[color:var(--ja-slate)]/75">{b.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer style={{ background: 'var(--ja-ink-900)', color: '#fff' }}>
        <div className="mx-auto max-w-7xl px-6 py-14 text-center">
          <Image src={site.brand.icon} alt="" width={44} height={44} className="mx-auto h-11 w-11" />
          <p className="ja-serif mt-5 text-2xl">{site.name}</p>
          <p className="ja-sans mt-2 text-sm text-white/55">{site.tagline}</p>
          <div className="ja-sans mt-7 flex items-center justify-center gap-7 text-xs font-medium uppercase tracking-[0.18em]">
            <a href={site.social.facebook} className="text-white/70 transition-colors hover:text-[color:var(--ja-gold-2)]">Facebook</a>
            <a href={site.social.youtube} className="text-white/70 transition-colors hover:text-[color:var(--ja-gold-2)]">YouTube</a>
            <a href={site.social.amazon} className="text-white/70 transition-colors hover:text-[color:var(--ja-gold-2)]">Books</a>
          </div>
          <p className="ja-sans mt-8 text-[0.7rem] uppercase tracking-[0.22em] text-white/35">
            {site.transparency}
          </p>
        </div>
      </footer>
    </main>
  );
}
