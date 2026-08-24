import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/ja/site';

export const metadata = {
  title: 'Jesus Anoints Ministries — Design Directions',
};

/* Preview hub: the new 2026-08 brand, two front-page directions, and the
   reasoning behind each — so the direction can be chosen with eyes open. */

const directions = [
  {
    slug: 'radiance',
    n: 'I',
    name: 'Radiance',
    kind: 'Classic · Luminous · Editorial',
    tone: 'Calm, reverent, timeless',
    palette: ['#ffffff', '#faf7ef', '#24418c', '#d9ad3c'],
    summary:
      'The logo treated as a design system. White and ivory grounds, royal-blue script, letterspaced smallcaps, and gold hairlines — the whole page set like an heirloom Bible.',
    why: [
      'The new logo already carries a complete typographic language: Spencerian script, letterspaced caps, gold rules, gold-leaf dove. Radiance simply extends that language to the whole site, so brand and website become one thing.',
      'The mark lives on a white ground — so the site stays light, and the logo is always at home. Dark royal sections are reserved for Scripture and for the Give appeal, where weight means reverence.',
      'The nine beliefs are set as a numbered confession, the portrait as a gold-framed plate, the tagline as an illuminated lockup: devices borrowed from scripture publishing, the visual world this ministry actually lives in.',
    ],
    bestFor:
      'Best if the site should feel like the ministry’s printed letterhead come to life — trustworthy, established, unhurried.',
  },
  {
    slug: 'sent',
    n: 'II',
    name: 'Sent',
    kind: 'Bold · Missional · Movement',
    tone: 'Urgent, direct, energetic',
    palette: ['#24418c', '#142343', '#d9ad3c', '#ffffff'],
    summary:
      'The crossroadsyouth.org energy — statement typography, sweeping curved section breaks, color-block bands, direct calls to action — recast in the new royal-blue and gold.',
    why: [
      'Crossroads leads with a movement, not an institution: a huge declaration, Scripture right under it, and four plain calls to act. Sent keeps that skeleton but replaces their red/black with the logo’s royal blue and gold.',
      'The logo’s gold brush swash becomes the site’s signature: a hand-drawn underline that marks the words that matter — the same device Crossroads uses with its red marker strokes.',
      'The evangelist’s two-transplant testimony gets a full quote band, because a movement is carried by a story; and the CTA quad (Pray · Watch · Journal · Give) turns visitors into participants instead of readers.',
    ],
    bestFor:
      'Best if the site should feel like a revival in progress — built to move visitors to watch, pray, partner, and give.',
  },
];

export default function ChooserPage() {
  return (
    <main className="min-h-screen bg-white" style={{ color: 'var(--ja-ink)' }}>
      {/* masthead — the new logo, full and proud */}
      <header className="mx-auto max-w-4xl px-4 pb-4 pt-16 text-center md:px-6 md:pt-24">
        <Image
          src={site.brand.logo2026}
          alt="Jesus Anoints Ministries — Touching the world, one soul at a time"
          width={2115}
          height={744}
          priority
          className="ja-rise ja-logo-blend mx-auto h-auto w-full max-w-xl"
        />
        <p
          className="ja-eyebrow ja-rise mt-10 justify-center"
          style={{ color: 'var(--ja-royal)', animationDelay: '0.1s' }}
        >
          The new brand · Two directions
        </p>
        <h1 className="ja-serif ja-rise mt-5 text-4xl font-medium md:text-5xl" style={{ animationDelay: '0.16s' }}>
          Same ministry, two ways to say it.
        </h1>
        <p
          className="ja-sans ja-rise mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[color:var(--ja-ink)]/65"
          style={{ animationDelay: '0.22s' }}
        >
          Both directions are built on the new logo&rsquo;s royal blue and gold, use the real
          content from jesusanoints.com, and share the same Journal (blog). They differ in
          voice: one speaks like a letterhead, the other like a revival meeting. Open each,
          scroll to the end, and see which one sounds like you.
        </p>
      </header>

      {/* the two directions, with their reasoning */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {directions.map((d, i) => (
            <article
              key={d.slug}
              className="ja-rise flex flex-col rounded-xl border p-8 md:p-10"
              style={{ borderColor: 'var(--ja-sand)', animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="ja-serif text-2xl italic" style={{ color: 'var(--ja-gold-1)' }}>
                    {d.n}
                  </span>
                  <h2 className="ja-serif mt-1 text-4xl font-semibold" style={{ color: 'var(--ja-royal)' }}>
                    {d.name}
                  </h2>
                  <p className="ja-sans mt-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[color:var(--ja-ink)]/50">
                    {d.kind}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1.5 pt-2" aria-label="Palette">
                  {d.palette.map((c) => (
                    <span
                      key={c}
                      className="h-6 w-6 rounded-full border border-black/10"
                      style={{ background: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              <p className="ja-sans mt-6 text-base leading-relaxed text-[color:var(--ja-ink)]/75">{d.summary}</p>

              <h3 className="ja-eyebrow mt-8" style={{ color: 'var(--ja-royal)' }}>
                Why this direction
              </h3>
              <ul className="ja-sans mt-4 space-y-3 text-sm leading-relaxed text-[color:var(--ja-ink)]/70">
                {d.why.map((w, j) => (
                  <li key={j} className="border-l-2 pl-4" style={{ borderColor: 'var(--ja-gold-3)' }}>
                    {w}
                  </li>
                ))}
              </ul>

              <p className="ja-serif mt-6 text-lg italic leading-snug text-[color:var(--ja-ink)]/85">{d.bestFor}</p>

              <div className="mt-8 flex-1" />
              <Link
                href={`/jaministries/${d.slug}`}
                className="ja-sans inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--ja-royal)' }}
              >
                Open {d.name} →
              </Link>
            </article>
          ))}
        </div>

        {/* shared blog */}
        <Link
          href="/jaministries/blog"
          className="group ja-rise mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border px-8 py-6 transition-colors hover:bg-[color:var(--ja-cream)]"
          style={{ borderColor: 'var(--ja-sand)', animationDelay: '0.3s' }}
        >
          <div>
            <p className="ja-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[color:var(--ja-ink)]/50">
              Shared by both directions
            </p>
            <h2 className="ja-serif mt-1 text-2xl font-semibold md:text-3xl" style={{ color: 'var(--ja-royal)' }}>
              The Journal — teachings, prophecies &amp; the blog
            </h2>
          </div>
          <span className="ja-sans text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--ja-gold-1)' }}>
            Open →
          </span>
        </Link>

        <p className="ja-sans mt-10 text-center text-xs leading-relaxed text-[color:var(--ja-ink)]/45">
          The earlier slate-and-gold concepts (Anointed, The Evangelist) are archived and remain
          available for reference.
        </p>
      </section>

      <footer className="border-t py-10 text-center" style={{ borderColor: 'var(--ja-sand)' }}>
        <p className="ja-sans text-[10px] uppercase tracking-[0.3em] text-[color:var(--ja-ink)]/45">
          {site.transparency}
        </p>
      </footer>
    </main>
  );
}
