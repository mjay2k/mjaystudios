import Link from 'next/link';
import { site } from '@/data/ja/site';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import { Brush, Curve } from '../brand';

export const metadata = {
  title: 'Pray With Us — Jesus Anoints Ministries',
  description:
    'Send a prayer request or reach the ministry. Email, phone, and office hours for Jesus Anoints Ministries in Jackson, Missouri.',
};

const PRAYER_SUBJECT = 'Prayer request';

export default function PrayPage() {
  const [primaryEmail, secondaryEmail] = site.contact.emails;

  return (
    <main className="relative min-h-screen bg-white" style={{ color: 'var(--ja-ink)' }}>
      <SiteHeader />

      {/* masthead */}
      <section className="ja-dove-watermark relative overflow-hidden" style={{ background: 'var(--ja-slate-grad)' }}>
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-20 pt-16 text-center md:px-6 md:pb-28 md:pt-20">
          <p className="ja-display text-[13px] font-bold uppercase tracking-[0.35em]" style={{ color: 'var(--ja-gold-2)' }}>
            Prayer &amp; Contact
          </p>
          <h1 className="ja-display ja-rise mt-6 text-[13vw] font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-[5.5rem]">
            Pray
            <br />
            with us
          </h1>
          <div className="ja-rise relative mx-auto mt-4 w-fit">
            <span className="ja-script block px-4 text-4xl leading-tight sm:text-5xl md:text-6xl" style={{ color: 'var(--ja-gold-2)' }}>
              you are not alone
            </span>
            <Brush className="mx-auto mt-1 h-4 w-3/4" />
          </div>
          <p className="ja-sans mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/80">
            {site.contact.lead}
          </p>

          <a
            href={`mailto:${primaryEmail}?subject=${encodeURIComponent(PRAYER_SUBJECT)}`}
            className="ja-display mt-10 inline-block rounded-md px-10 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] text-[color:var(--ja-ink-900)] transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--ja-gold-grad)' }}
          >
            Send a prayer request
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <Curve fill="#ffffff" />
        </div>
      </section>

      {/* ways to reach us */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <h2 className="ja-display text-center text-3xl font-black uppercase tracking-tight md:text-4xl">
            Reach the ministry
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* email */}
            <article className="rounded-lg border p-8" style={{ borderColor: 'var(--ja-sand)' }}>
              <div className="ja-gold-hr w-10" />
              <h3 className="ja-display mt-5 text-xl font-black uppercase tracking-tight" style={{ color: 'var(--ja-royal)' }}>
                Email
              </h3>
              <p className="ja-sans mt-3 text-sm leading-relaxed text-[color:var(--ja-ink)]/70">
                For prayer requests, questions, or speaking invitations.
              </p>
              <div className="mt-5 space-y-2">
                {site.contact.emails.map((e) => (
                  <a
                    key={e}
                    href={`mailto:${e}`}
                    className="ja-sans block break-words text-sm font-semibold transition-colors hover:underline"
                    style={{ color: 'var(--ja-royal)' }}
                  >
                    {e}
                  </a>
                ))}
              </div>
            </article>

            {/* phone */}
            <article className="rounded-lg border p-8" style={{ borderColor: 'var(--ja-sand)' }}>
              <div className="ja-gold-hr w-10" />
              <h3 className="ja-display mt-5 text-xl font-black uppercase tracking-tight" style={{ color: 'var(--ja-royal)' }}>
                Phone
              </h3>
              <p className="ja-sans mt-3 text-sm leading-relaxed text-[color:var(--ja-ink)]/70">
                Call during office hours and we will do our best to answer.
              </p>
              <a
                href={`tel:${site.contact.phone.replace(/[^0-9+]/g, '')}`}
                className="ja-display mt-5 inline-block text-lg font-extrabold tracking-tight transition-colors hover:underline"
                style={{ color: 'var(--ja-royal)' }}
              >
                {site.contact.phone}
              </a>
            </article>

            {/* location */}
            <article className="rounded-lg p-8" style={{ background: 'var(--ja-ink-900)' }}>
              <div className="ja-gold-hr w-10" />
              <h3 className="ja-display mt-5 text-xl font-black uppercase tracking-tight text-white">
                Visit
              </h3>
              <p className="ja-sans mt-3 text-sm leading-relaxed text-white/65">
                Jesus Anoints Ministries
                <br />
                {site.contact.address}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(site.contact.address)}`}
                target="_blank"
                rel="noreferrer"
                className="ja-display mt-5 inline-block text-[12px] font-extrabold uppercase tracking-[0.1em]"
                style={{ color: 'var(--ja-gold-2)' }}
              >
                Open in maps →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* office hours */}
      <Curve fill="#faf7ef" />
      <section style={{ background: 'var(--ja-cream)' }}>
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-4 md:px-6 md:pb-20 md:pt-6">
          <h2 className="ja-display text-center text-2xl font-black uppercase tracking-tight md:text-3xl">
            Office hours
          </h2>
          <dl className="mt-8 overflow-hidden rounded-lg bg-white shadow-[0_10px_40px_-24px_rgba(14,26,51,0.35)]">
            {site.contact.hours.map((h, i) => (
              <div
                key={h.days}
                className={`flex flex-wrap items-center justify-between gap-2 px-6 py-4 ${i ? 'border-t' : ''}`}
                style={{ borderColor: 'var(--ja-sand)' }}
              >
                <dt className="ja-display text-[13px] font-extrabold uppercase tracking-[0.1em]" style={{ color: 'var(--ja-royal)' }}>
                  {h.days}
                </dt>
                <dd className="ja-sans text-sm text-[color:var(--ja-ink)]/70">{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="ja-sans mt-6 text-center text-xs leading-relaxed text-[color:var(--ja-ink)]/55">
            Outside these hours, email is the fastest way to reach us — write to{' '}
            <a href={`mailto:${primaryEmail}`} className="font-semibold hover:underline" style={{ color: 'var(--ja-royal)' }}>
              {primaryEmail}
            </a>
            {secondaryEmail && (
              <>
                {' '}or{' '}
                <a href={`mailto:${secondaryEmail}`} className="font-semibold hover:underline" style={{ color: 'var(--ja-royal)' }}>
                  {secondaryEmail}
                </a>
              </>
            )}
            .
          </p>
        </div>
        <Curve fill="#ffffff" />
      </section>

      {/* follow along */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-6 md:py-20">
          <h2 className="ja-display text-2xl font-black uppercase tracking-tight md:text-3xl">
            Follow the ministry
          </h2>
          <p className="ja-sans mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[color:var(--ja-ink)]/70">
            Broadcasts, teaching, and prophetic messages go out regularly — join us there between
            gatherings.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noreferrer"
              className="ja-display rounded-md px-8 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] text-[color:var(--ja-ink-900)] transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--ja-gold-grad)' }}
            >
              YouTube
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="ja-display rounded-md border-2 px-8 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] transition-colors hover:bg-black/5"
              style={{ borderColor: 'var(--ja-royal)', color: 'var(--ja-royal)' }}
            >
              Facebook
            </a>
            <Link
              href="/jaministries/give"
              className="ja-display rounded-md border-2 px-8 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] transition-colors hover:bg-black/5"
              style={{ borderColor: 'var(--ja-royal)', color: 'var(--ja-royal)' }}
            >
              Give
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
