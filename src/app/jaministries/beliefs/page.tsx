import Link from 'next/link';
import { site } from '@/data/ja/site';
import { beliefs, beliefsIntro } from '@/data/ja/beliefs';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import { Brush, Curve } from '../brand';

export const metadata = {
  title: 'What We Believe — Jesus Anoints Ministries',
  description:
    'The statement of faith of Jesus Anoints Ministries — fourteen convictions, each grounded in Scripture.',
};

export default function BeliefsPage() {
  return (
    <main className="relative min-h-screen bg-white" style={{ color: 'var(--ja-ink)' }}>
      <SiteHeader />

      {/* masthead */}
      <section className="ja-dove-watermark relative overflow-hidden" style={{ background: 'var(--ja-slate-grad)' }}>
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-20 pt-16 text-center md:px-6 md:pb-28 md:pt-20">
          <p className="ja-display text-[13px] font-bold uppercase tracking-[0.35em]" style={{ color: 'var(--ja-gold-2)' }}>
            What We Believe
          </p>
          <h1 className="ja-display ja-rise mt-6 text-[12vw] font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-[5rem]">
            Fourteen
            <br />
            convictions
          </h1>
          <div className="ja-rise relative mx-auto mt-4 w-fit">
            <span className="ja-script block px-4 text-4xl leading-tight sm:text-5xl md:text-7xl" style={{ color: 'var(--ja-gold-2)' }}>
              one Lord
            </span>
            <Brush className="mx-auto mt-1 h-4 w-3/4" />
          </div>
          <p className="ja-sans mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/80">
            {beliefsIntro.lead}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <Curve fill="#faf7ef" />
        </div>
      </section>

      {/* the verse that frames the confession */}
      <section style={{ background: 'var(--ja-cream)' }}>
        <div className="mx-auto max-w-3xl px-4 py-14 text-center md:px-6 md:py-16">
          <blockquote className="ja-serif text-2xl italic leading-snug md:text-3xl" style={{ color: 'var(--ja-royal)' }}>
            &ldquo;{beliefsIntro.verse.text}&rdquo;
          </blockquote>
          <p className="ja-display mt-4 text-[12px] font-extrabold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-1)' }}>
            {beliefsIntro.verse.ref}
          </p>
        </div>
        <Curve fill="#ffffff" />
      </section>

      {/* the fourteen tenets */}
      <section className="bg-white">
        <ol className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
          {beliefs.map((b) => (
            <li
              key={b.n}
              id={`belief-${b.n}`}
              className="scroll-mt-24 border-t py-10 first:border-t-0 first:pt-0"
              style={{ borderColor: 'var(--ja-sand)' }}
            >
              <div className="grid gap-5 md:grid-cols-[auto_1fr] md:gap-8">
                <span
                  className="ja-display text-4xl font-black leading-none md:text-5xl"
                  style={{ color: 'var(--ja-gold-3)' }}
                  aria-hidden
                >
                  {b.n}
                </span>
                <div>
                  <h2 className="ja-display text-2xl font-extrabold uppercase leading-tight tracking-tight md:text-3xl" style={{ color: 'var(--ja-royal)' }}>
                    {b.title}
                  </h2>
                  <p className="ja-sans mt-4 text-base leading-[1.9] text-[color:var(--ja-ink)]/75">
                    {b.body}
                  </p>
                  <p
                    className="ja-sans mt-4 border-l-2 pl-4 text-sm italic leading-relaxed text-[color:var(--ja-ink)]/60"
                    style={{ borderColor: 'var(--ja-gold-2)' }}
                  >
                    {b.scripture}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* next steps */}
      <section style={{ background: 'var(--ja-gold-grad)' }}>
        <Curve fill="#ffffff" invert />
        <div className="mx-auto max-w-4xl px-4 pb-14 pt-6 text-center md:px-6 md:pb-20 md:pt-8">
          <h2 className="ja-display text-3xl font-black uppercase tracking-tight md:text-4xl" style={{ color: 'var(--ja-ink-900)' }}>
            Walk this out with us
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/jaministries/pray"
              className="ja-display rounded-md px-8 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] text-white transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--ja-ink-900)' }}
            >
              Request prayer
            </Link>
            <Link
              href="/jaministries/blog"
              className="ja-display rounded-md border-2 px-8 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] transition-colors hover:bg-black/5"
              style={{ borderColor: 'var(--ja-ink-900)', color: 'var(--ja-ink-900)' }}
            >
              Read the teachings
            </Link>
          </div>
          <p className="ja-sans mt-8 text-[11px] uppercase tracking-[0.25em]" style={{ color: 'var(--ja-ink-900)', opacity: 0.6 }}>
            {site.pillars}
          </p>
        </div>
      </section>

      <SiteFooter seam={false} />
    </main>
  );
}
