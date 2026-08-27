import Link from 'next/link';
import { site } from '@/data/ja/site';
import { givingMethods, givingVerse, givingLead, givingSupports } from '@/data/ja/giving';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import { Brush, Curve } from '../brand';

export const metadata = {
  title: 'Give — Jesus Anoints Ministries',
  description:
    'Partner with Jesus Anoints Ministries. Give online, by Zelle, or by bank transfer — every gift sends the gospel further.',
};

export default function GivePage() {
  const online = givingMethods.find((m) => m.link);

  return (
    <main className="relative min-h-screen bg-white" style={{ color: 'var(--ja-ink)' }}>
      <SiteHeader />

      {/* masthead */}
      <section className="ja-dove-watermark relative overflow-hidden" style={{ background: 'var(--ja-slate-grad)' }}>
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-20 pt-16 text-center md:px-6 md:pb-28 md:pt-20">
          <p className="ja-display text-[13px] font-bold uppercase tracking-[0.35em]" style={{ color: 'var(--ja-gold-2)' }}>
            Partner With the Ministry
          </p>
          <h1 className="ja-display ja-rise mt-6 text-[13vw] font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-[5.5rem]">
            Give
          </h1>
          <div className="ja-rise relative mx-auto mt-4 w-fit">
            <span className="ja-script block px-4 text-4xl leading-tight sm:text-5xl md:text-7xl" style={{ color: 'var(--ja-gold-2)' }}>
              and it will be given
            </span>
            <Brush className="mx-auto mt-1 h-4 w-3/4" />
          </div>

          <blockquote className="ja-serif mx-auto mt-10 max-w-2xl text-lg italic leading-relaxed text-white/85 md:text-xl">
            &ldquo;{givingVerse.text}&rdquo;
          </blockquote>
          <p className="ja-display mt-4 text-[12px] font-extrabold uppercase tracking-[0.3em]" style={{ color: 'var(--ja-gold-2)' }}>
            {givingVerse.ref}
          </p>

          {online?.link && (
            <a
              href={online.link.href}
              target="_blank"
              rel="noreferrer"
              className="ja-display mt-10 inline-block rounded-md px-10 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] text-[color:var(--ja-ink-900)] transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--ja-gold-grad)' }}
            >
              Give online now
            </a>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <Curve fill="#ffffff" />
        </div>
      </section>

      {/* why give */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-6 md:py-20">
          <p className="ja-sans text-lg leading-[1.9] text-[color:var(--ja-ink)]/75">{givingLead}</p>
        </div>
      </section>

      {/* ways to give */}
      <Curve fill="#faf7ef" />
      <section style={{ background: 'var(--ja-cream)' }}>
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-4 md:px-6 md:pb-24 md:pt-6">
          <h2 className="ja-display text-center text-3xl font-black uppercase tracking-tight md:text-4xl">
            Ways to give
          </h2>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {givingMethods.map((m) => (
              <article
                key={m.region}
                className="flex flex-col rounded-lg bg-white p-8 shadow-[0_10px_40px_-22px_rgba(14,26,51,0.35)]"
                style={m.primary ? { outline: '2px solid var(--ja-gold-2)' } : undefined}
              >
                <div className="ja-gold-hr w-10" />
                <h3 className="ja-display mt-5 text-2xl font-black uppercase tracking-tight" style={{ color: 'var(--ja-royal)' }}>
                  {m.region}
                </h3>
                <p className="ja-sans mt-3 text-sm leading-relaxed text-[color:var(--ja-ink)]/70">{m.note}</p>

                <dl className="mt-6 space-y-3">
                  {m.rows.map((r) => (
                    <div key={r.label} className="border-t pt-3" style={{ borderColor: 'var(--ja-sand)' }}>
                      <dt className="ja-sans text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--ja-gold-1)' }}>
                        {r.label}
                      </dt>
                      <dd className="ja-sans mt-1 break-words text-sm font-semibold" style={{ color: 'var(--ja-ink)' }}>
                        {r.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {m.fine && (
                  <p className="ja-sans mt-5 text-xs leading-relaxed text-[color:var(--ja-ink)]/55">{m.fine}</p>
                )}

                <div className="mt-6 flex-1" />
                {m.link && (
                  <a
                    href={m.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="ja-display inline-block rounded-md px-6 py-3.5 text-center text-[13px] font-extrabold uppercase tracking-[0.08em] text-[color:var(--ja-ink-900)] transition-transform hover:-translate-y-0.5"
                    style={{ background: 'var(--ja-gold-grad)' }}
                  >
                    {m.link.label} →
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
        <Curve fill="#ffffff" />
      </section>

      {/* where it goes + transparency */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
          <article className="rounded-lg border p-8" style={{ borderColor: 'var(--ja-sand)' }}>
            <p className="ja-display text-[12px] font-extrabold uppercase tracking-[0.25em]" style={{ color: 'var(--ja-gold-1)' }}>
              Where your gift goes
            </p>
            <h3 className="ja-display mt-3 text-2xl font-black uppercase leading-tight tracking-tight" style={{ color: 'var(--ja-royal)' }}>
              Beyond our own work
            </h3>
            <p className="ja-sans mt-4 text-sm leading-[1.85] text-[color:var(--ja-ink)]/70">
              {givingSupports}
            </p>
          </article>

          <article className="rounded-lg p-8" style={{ background: 'var(--ja-ink-900)' }}>
            <p className="ja-display text-[12px] font-extrabold uppercase tracking-[0.25em]" style={{ color: 'var(--ja-gold-2)' }}>
              Transparency
            </p>
            <h3 className="ja-display mt-3 text-2xl font-black uppercase leading-tight tracking-tight text-white">
              A record you can check
            </h3>
            <p className="ja-sans mt-4 text-sm leading-[1.85] text-white/70">
              Jesus Anoints Ministries is a registered 501(c)(3) non-profit, certified with the
              Candid Platinum Transparency Seal — the highest level of transparency Candid awards.
            </p>
            <Link
              href="/jaministries#seal"
              className="ja-display mt-6 inline-block text-[12px] font-extrabold uppercase tracking-[0.1em]"
              style={{ color: 'var(--ja-gold-2)' }}
            >
              More on the seal →
            </Link>
          </article>
        </div>
      </section>

      {/* prayer nudge */}
      <section style={{ background: 'var(--ja-gold-grad)' }}>
        <Curve fill="#ffffff" invert />
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-6 text-center md:px-6 md:pb-20 md:pt-8">
          <h2 className="ja-display text-2xl font-black uppercase leading-tight tracking-tight md:text-4xl" style={{ color: 'var(--ja-ink-900)' }}>
            Not able to give? Pray with us
          </h2>
          <p className="ja-sans mx-auto mt-5 max-w-xl text-base leading-relaxed" style={{ color: 'var(--ja-ink-900)', opacity: 0.75 }}>
            Prayer carries this ministry as surely as provision does. If you cannot give today,
            stand with us in prayer — it is no lesser partnership.
          </p>
          <Link
            href="/jaministries/pray"
            className="ja-display mt-8 inline-block rounded-md px-10 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] text-white transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--ja-ink-900)' }}
          >
            Pray with us
          </Link>
        </div>
      </section>

      <SiteFooter seam={false} />
    </main>
  );
}
