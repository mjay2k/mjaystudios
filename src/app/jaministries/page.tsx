import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/ja/site';

export const metadata = {
  title: 'Jesus Anoints Ministries — Concept Preview',
};

const concepts = [
  {
    slug: 'anointed',
    n: '01',
    name: 'Anointed',
    kind: 'Cinematic · Photographic',
    desc: 'Full-bleed slate-and-gold hero, the dove motif, light breaking through. Bold, reverent, atmospheric.',
  },
  {
    slug: 'the-evangelist',
    n: '02',
    name: 'The Evangelist',
    kind: 'Warm · Personal',
    desc: 'Portrait-led around Evangelist Samuel Meesala. Inviting, human, testimony-driven.',
  },
];

export default function ChooserPage() {
  return (
    <main
      className="ja-grain ja-dove-watermark relative min-h-screen overflow-hidden"
      style={{ background: 'var(--ja-slate-grad)', color: 'var(--ja-paper)' }}
    >
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(228,200,108,0.16), transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:py-28">
        <header className="ja-rise text-center">
          <Image
            src={site.brand.iconGold}
            alt=""
            width={72}
            height={72}
            className="mx-auto mb-8 h-18 w-18"
          />
          <p
            className="ja-sans text-xs uppercase tracking-[0.45em]"
            style={{ color: 'var(--ja-gold-2)' }}
          >
            Jesus Anoints Ministries
          </p>
          <h1 className="ja-serif mt-5 text-5xl font-light leading-[1.05] md:text-7xl">
            Two directions, <span className="ja-gold-text italic">refined.</span>
          </h1>
          <p className="ja-sans mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
            The two front-page directions we&rsquo;re building out, now on the 2026
            brand. Open each, compare, and choose the one to carry through the full site.
          </p>
          <div className="ja-gold-rule mx-auto mt-10 w-40" />
        </header>

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
                style={{ background: 'radial-gradient(circle, rgba(228,200,108,0.25), transparent 70%)' }}
              />
              <div className="relative flex items-baseline justify-between">
                <span className="ja-serif text-5xl font-light italic" style={{ color: 'var(--ja-gold-1)' }}>
                  {c.n}
                </span>
                <span className="ja-sans text-[0.65rem] uppercase tracking-[0.3em] text-white/40">
                  {c.kind}
                </span>
              </div>
              <h2 className="ja-serif mt-6 text-3xl font-medium md:text-4xl">{c.name}</h2>
              <p className="ja-sans mt-3 text-sm leading-relaxed text-white/60">{c.desc}</p>
              <div className="mt-8 flex items-center gap-3">
                <span
                  className="ja-sans text-xs font-medium uppercase tracking-[0.2em] transition-colors group-hover:text-[color:var(--ja-gold-2)]"
                  style={{ color: 'var(--ja-gold-1)' }}
                >
                  View concept
                </span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--ja-gold-1)' }}>
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Shared blog link */}
        <Link
          href="/jaministries/blog"
          className="group ja-rise mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-6 transition-all duration-500 hover:border-[color:var(--ja-gold-1)]/50 hover:bg-white/[0.05]"
          style={{ animationDelay: '0.3s' }}
        >
          <div>
            <p className="ja-sans text-[0.65rem] uppercase tracking-[0.3em] text-white/40">
              Shared section
            </p>
            <h2 className="ja-serif mt-1 text-2xl font-medium md:text-3xl">
              Teachings &amp; Prophecies <span className="text-white/40">— the blog</span>
            </h2>
          </div>
          <span className="ja-sans text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--ja-gold-1)' }}>
            Open →
          </span>
        </Link>

        <footer className="ja-fade mt-20 text-center">
          <p className="ja-sans text-xs uppercase tracking-[0.3em] text-white/30">
            {site.transparency}
          </p>
        </footer>
      </div>
    </main>
  );
}
