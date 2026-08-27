import Link from 'next/link';
import { prophecies, propheciesIntro } from '@/data/ja/prophecies';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import { Brush, Curve } from '../brand';
import RecordList from './RecordList';

export const metadata = {
  title: 'Prophecy Records & Fulfillments — Jesus Anoints Ministries',
  description:
    'A dated, public record of prophetic words released before the events they describe — offered so that God alone receives the glory.',
};

export default function ProphecyRecordsPage() {
  const fulfilled = prophecies.filter((p) => p.status === 'Fulfilled').length;
  const ongoing = prophecies.filter((p) => p.status === 'Ongoing').length;
  const awaiting = prophecies.filter((p) => p.status === 'Awaiting').length;

  return (
    <main className="relative min-h-screen bg-white" style={{ color: 'var(--ja-ink)' }}>
      <SiteHeader />

      {/* masthead */}
      <section className="ja-dove-watermark relative overflow-hidden" style={{ background: 'var(--ja-slate-grad)' }}>
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-20 pt-16 text-center md:px-6 md:pb-28 md:pt-20">
          <p className="ja-display text-[13px] font-bold uppercase tracking-[0.35em]" style={{ color: 'var(--ja-gold-2)' }}>
            The Public Record
          </p>
          <h1 className="ja-display ja-rise mt-6 text-[12vw] font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-[5rem]">
            Prophecy
            <br />
            records
          </h1>
          <div className="ja-rise relative mx-auto mt-4 w-fit">
            <span className="ja-script block px-4 text-4xl leading-tight sm:text-5xl md:text-7xl" style={{ color: 'var(--ja-gold-2)' }}>
              &amp; fulfillments
            </span>
            <Brush className="mx-auto mt-1 h-4 w-3/4" />
          </div>
          <p className="ja-sans mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/80">
            {propheciesIntro.lead}
          </p>

          {/* tally */}
          <dl className="mx-auto mt-12 grid max-w-lg grid-cols-3 gap-4">
            {[
              { n: fulfilled, label: 'Fulfilled' },
              { n: ongoing, label: 'Ongoing' },
              { n: awaiting, label: 'Awaiting' },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-white/15 py-5">
                <dd className="ja-display text-4xl font-black" style={{ color: 'var(--ja-gold-2)' }}>
                  {s.n}
                </dd>
                <dt className="ja-display mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <Curve fill="#faf7ef" />
        </div>
      </section>

      {/* how to weigh a prophetic word */}
      <section style={{ background: 'var(--ja-cream)' }}>
        <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-16">
          <blockquote className="ja-serif text-center text-2xl italic leading-snug md:text-3xl" style={{ color: 'var(--ja-royal)' }}>
            &ldquo;{propheciesIntro.verse.text}&rdquo;
          </blockquote>
          <p className="ja-display mt-4 text-center text-[12px] font-extrabold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-1)' }}>
            {propheciesIntro.verse.ref}
          </p>

          <div className="mt-12 rounded-lg bg-white p-8 shadow-[0_10px_40px_-22px_rgba(14,26,51,0.35)]">
            <h2 className="ja-display text-xl font-extrabold uppercase tracking-tight" style={{ color: 'var(--ja-royal)' }}>
              How to weigh what you read here
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {propheciesIntro.standards.map((s) => (
                <li key={s} className="ja-sans flex gap-3 text-sm leading-relaxed text-[color:var(--ja-ink)]/75">
                  <span className="shrink-0 font-bold" style={{ color: 'var(--ja-gold-1)' }} aria-hidden>
                    ✓
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Curve fill="#ffffff" />
      </section>

      {/* the record itself */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-20">
          <RecordList />
        </div>
      </section>

      {/* closing */}
      <section style={{ background: 'var(--ja-gold-grad)' }}>
        <Curve fill="#ffffff" invert />
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-6 text-center md:px-6 md:pb-20 md:pt-8">
          <h2 className="ja-display text-2xl font-black uppercase leading-tight tracking-tight md:text-4xl" style={{ color: 'var(--ja-ink-900)' }}>
            Prophecy is never about the messenger
          </h2>
          <p className="ja-sans mx-auto mt-5 max-w-xl text-base leading-relaxed" style={{ color: 'var(--ja-ink-900)', opacity: 0.75 }}>
            These accounts are kept so that the faithfulness of God is remembered, so the Church
            prays with understanding, and so that no one mistakes a gift for the Giver.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/jaministries/blog"
              className="ja-display rounded-md px-8 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] text-white transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--ja-ink-900)' }}
            >
              Read the teachings
            </Link>
            <Link
              href="/jaministries/pray"
              className="ja-display rounded-md border-2 px-8 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] transition-colors hover:bg-black/5"
              style={{ borderColor: 'var(--ja-ink-900)', color: 'var(--ja-ink-900)' }}
            >
              Pray with us
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter seam={false} />
    </main>
  );
}
