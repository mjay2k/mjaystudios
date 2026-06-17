import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/ja/site';

export const metadata = {
  title: 'Jesus Anoints Ministries — Concept Preview',
};

const concepts = [
  {
    slug: 'living-water',
    n: '01',
    name: 'Living Water',
    kind: 'Editorial · Typographic',
    desc: 'Scripture-forward. Big Baskerville serif, gold on cream and slate. Quiet, reverent, word-led.',
    hero: 'Psalm 1:3 as the opening statement',
  },
  {
    slug: 'anointed',
    n: '02',
    name: 'Anointed',
    kind: 'Cinematic · Photographic',
    desc: 'Full-bleed dark hero, the flame-and-dove motif, gold light breaking through. Bold and atmospheric.',
    hero: 'The ministry’s work, dramatized',
  },
  {
    slug: 'the-evangelist',
    n: '03',
    name: 'The Evangelist',
    kind: 'Warm · Personal',
    desc: 'Portrait-led around Evangelist Samuel Meesala. Inviting, human, testimony-driven.',
    hero: 'Meet the person behind the ministry',
  },
  {
    slug: 'sanctuary',
    n: '04',
    name: 'Sanctuary',
    kind: 'Modern · Bento Grid',
    desc: 'Every offering at a glance — teaching, prophecies, books, giving — in a clean structured grid.',
    hero: 'The whole ministry, organized',
  },
];

export default function ChooserPage() {
  return (
    <main
      className="ja-grain relative min-h-screen overflow-hidden"
      style={{ background: 'var(--ja-ink)', color: 'var(--ja-paper)' }}
    >
      {/* Ambient gold glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(229,201,101,0.18), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* Header */}
        <header className="ja-rise text-center">
          <Image
            src={site.brand.icon}
            alt=""
            width={64}
            height={64}
            className="mx-auto mb-8 h-16 w-16"
          />
          <p
            className="ja-sans text-xs uppercase tracking-[0.45em]"
            style={{ color: 'var(--ja-gold-2)' }}
          >
            Jesus Anoints Ministries
          </p>
          <h1
            className="ja-serif mt-5 text-5xl font-light leading-[1.05] md:text-7xl"
            style={{ letterSpacing: '-0.01em' }}
          >
            Four ways to <span className="ja-gold-text italic">begin.</span>
          </h1>
          <p className="ja-sans mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
            Four distinct front-page directions for the new ministry site. Open
            each, compare, and choose the one to build out in full.
          </p>
          <div className="ja-gold-rule mx-auto mt-10 w-40" />
        </header>

        {/* Concept grid */}
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {concepts.map((c, i) => (
            <Link
              key={c.slug}
              href={`/jaministries/${c.slug}`}
              className="group ja-rise relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:border-[color:var(--ja-gold-1)]/50 hover:bg-white/[0.06]"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(circle, rgba(229,201,101,0.25), transparent 70%)' }}
              />
              <div className="relative flex items-baseline justify-between">
                <span
                  className="ja-serif text-5xl font-light italic"
                  style={{ color: 'var(--ja-gold-1)' }}
                >
                  {c.n}
                </span>
                <span className="ja-sans text-[0.65rem] uppercase tracking-[0.3em] text-white/40">
                  {c.kind}
                </span>
              </div>
              <h2 className="ja-serif mt-6 text-3xl font-medium md:text-4xl">
                {c.name}
              </h2>
              <p className="ja-sans mt-3 text-sm leading-relaxed text-white/60">
                {c.desc}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span
                  className="ja-sans text-xs font-medium uppercase tracking-[0.2em] transition-colors group-hover:text-[color:var(--ja-gold-2)]"
                  style={{ color: 'var(--ja-gold-1)' }}
                >
                  View concept
                </span>
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: 'var(--ja-gold-1)' }}
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <footer className="ja-fade mt-20 text-center">
          <p className="ja-sans text-xs uppercase tracking-[0.3em] text-white/30">
            {site.transparency}
          </p>
        </footer>
      </div>
    </main>
  );
}
