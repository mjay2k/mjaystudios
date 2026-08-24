import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/ja/site';
import { getAllPosts, formatPostDate } from '@/lib/ja/posts';

export const metadata = {
  title: 'Teachings & Prophecies — Jesus Anoints Ministries',
  description:
    'Spirit-led teaching, prophetic insight, and a public record of revelation given and fulfilled.',
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  const [lead, ...rest] = posts;

  return (
    <main
      className="ja-grain relative min-h-screen overflow-hidden"
      style={{ background: 'var(--ja-slate-grad)', color: 'var(--ja-paper)' }}
    >
      {/* faint dove watermark + ambient gold glow */}
      <div className="ja-dove-watermark pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[55vh] w-[80vw] -translate-x-1/2 rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(228,200,108,0.14), transparent 70%)' }}
      />

      {/* top bar */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/jaministries" aria-label="Jesus Anoints Ministries home" className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-white md:h-12 md:w-12">
            <Image
              src={site.brand.icon2026}
              alt=""
              width={347}
              height={304}
              className="h-8 w-auto md:h-9"
              priority
            />
          </span>
          <span className="leading-tight">
            <span className="ja-serif block text-xl font-semibold text-white">Jesus Anoints</span>
            <span className="ja-sans block text-[9px] font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--ja-gold-2)' }}>
              Ministries
            </span>
          </span>
        </Link>
        <Link
          href="/jaministries"
          className="ja-sans rounded-full border border-white/15 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-[color:var(--ja-gold-2)]"
        >
          ← Concepts
        </Link>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-28 pt-10 md:pt-16">
        {/* masthead */}
        <div className="ja-rise mb-16 max-w-3xl">
          <p
            className="ja-sans text-[11px] font-bold uppercase tracking-[0.4em]"
            style={{ color: 'var(--ja-gold-2)' }}
          >
            The Journal
          </p>
          <h1 className="ja-serif mt-4 text-5xl font-light leading-[1.04] md:text-7xl">
            Teachings &amp; <span className="ja-gold-text italic">Prophecies</span>
          </h1>
          <p className="ja-sans mt-5 max-w-xl text-base leading-relaxed text-white/65">
            Spirit-led teaching, prophetic insight, and a public record of revelation
            given and fulfilled — that God alone may be glorified.
          </p>
          <div className="ja-gold-rule mt-9 w-44" />
        </div>

        {/* lead / featured post */}
        {lead && (
          <Link
            href={`/jaministries/blog/${lead.slug}`}
            className="group ja-rise relative mb-6 grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-[color:var(--ja-gold-1)]/40 md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
              {lead.cover && (
                <Image
                  src={lead.cover}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(120deg, transparent, rgba(44,51,63,0.5))' }}
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="ja-sans rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ background: 'var(--ja-gold-grad)', color: 'var(--ja-ink-900)' }}
                >
                  {lead.tag}
                </span>
                <span className="ja-sans text-[11px] uppercase tracking-[0.2em] text-white/45">
                  {formatPostDate(lead.date)}
                </span>
              </div>
              <h2 className="ja-serif text-3xl font-medium leading-tight transition-colors group-hover:text-[color:var(--ja-gold-2)] md:text-4xl">
                {lead.title}
              </h2>
              <p className="ja-sans mt-4 text-sm leading-relaxed text-white/65 md:text-base">
                {lead.excerpt}
              </p>
              <span
                className="ja-sans mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: 'var(--ja-gold-1)' }}
              >
                Read the post
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        )}

        {/* the rest */}
        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((p, i) => (
            <Link
              key={p.slug}
              href={`/jaministries/blog/${p.slug}`}
              className="group ja-rise relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-[color:var(--ja-gold-1)]/40 hover:bg-white/[0.05]"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                {p.cover && (
                  <Image
                    src={p.cover}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(44,51,63,0.85))' }} />
                <span
                  className="ja-sans absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ background: 'rgba(20,24,30,0.6)', color: 'var(--ja-gold-2)' }}
                >
                  {p.tag}
                </span>
              </div>
              <div className="p-7">
                <span className="ja-sans text-[11px] uppercase tracking-[0.2em] text-white/45">
                  {formatPostDate(p.date)} · {p.readingMinutes} min read
                </span>
                <h3 className="ja-serif mt-2 text-2xl font-medium leading-snug transition-colors group-hover:text-[color:var(--ja-gold-2)]">
                  {p.title}
                </h3>
                <p className="ja-sans mt-3 text-sm leading-relaxed text-white/60">
                  {p.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <footer className="ja-fade mt-20 border-t border-white/10 pt-8 text-center">
          <p className="ja-sans text-[11px] uppercase tracking-[0.3em] text-white/35">
            {site.transparency}
          </p>
        </footer>
      </div>
    </main>
  );
}
