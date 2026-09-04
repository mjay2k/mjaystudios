import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import './unapologetic.css';
import Header from './Header';
import SiteFooter from '../SiteFooter';
import StreamLinks from '../StreamLinks';
import ReleaseCard from '../ReleaseCard';
import VideoGrid, { VideoCard } from '../VideoGrid';
import Follow from '../Follow';
import { Icon } from '../icons';
import { site } from '@/data/kyd/site';
import { ownReleases, featuredRelease, formatReleaseDate } from '@/data/kyd/releases';
import { videos } from '@/data/kyd/videos';
import { products, formatPrice } from '@/data/kyd/products';

export const metadata: Metadata = {
  title: 'Kentucky Dom',
  description:
    'Unapologetically American. Kentucky Dom, country music for God, country and family. New single "Face Like Mine" out now on Baste Records.',
};

const HERO = '/kyd/press/kentucky-dom-9.jpg';
const ABOUT_PHOTO = '/kyd/press/kentucky-dom-149.jpg';

export default function UnapologeticPage() {
  const f = featuredRelease;
  const teaser = ownReleases.filter((r) => r !== f).slice(0, 8);
  const merch = products.slice(0, 4);
  const quote = site.quotes[1];
  const phrases = [...site.catchphrases, ...site.catchphrases];

  return (
    <div className="kyd-unap">
      <Header />

      <main>
        {/* ===== Hero ===== */}
        <section className="kyd-unap-hero">
          <div className="kyd-unap-hero-photo">
            <Image src={HERO} alt="Kentucky Dom on horseback under a big sky" fill priority sizes="100vw" />
          </div>
          <div className="kyd-unap-hero-duo" aria-hidden />
          <div className="kyd-unap-hero-lift" aria-hidden />
          <div className="kyd-unap-hero-dots kyd-halftone" aria-hidden />
          <div className="kyd-unap-hero-shade" aria-hidden />

          <div className="relative px-4 pb-10 pt-40 md:px-8 md:pb-14">
            <div className="kyd-rise mb-6 md:mb-8">
              <a href={f.links.spotify} target="_blank" rel="noreferrer" className="kyd-unap-stamp kyd-unap-stamp-cream text-[15px] md:text-[22px]">
                <small>New single</small>
                <b>Face Like Mine</b>
                <small className="!mb-0 !mt-1">Out now</small>
              </a>
            </div>

            <h1 className="kyd-unap-h1 kyd-rise kyd-rise-2">
              <span className="l1">Unapologetically</span>
              <span className="l2">American</span>
            </h1>

            <div className="kyd-rise kyd-rise-3 mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between">
              <p className="kyd-condensed max-w-md text-xl font-semibold uppercase leading-snug tracking-wide text-white/85 md:text-2xl">
                {site.genreLine}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={f.links.spotify} target="_blank" rel="noreferrer" className="kyd-btn kyd-btn-red">
                  <Icon.play className="h-4 w-4" /> Listen now
                </a>
                <a href={f.links.youtube} target="_blank" rel="noreferrer" className="kyd-btn kyd-btn-ghost">
                  Watch the video
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Marquee band ===== */}
        <div className="kyd-unap-band" aria-hidden>
          <div className="kyd-marquee">
            {phrases.map((p, i) => (
              <span key={i}>{p}</span>
            ))}
          </div>
        </div>

        {/* ===== Featured single ===== */}
        <section className="relative overflow-hidden px-4 py-16 md:px-8 md:py-28">
          <div className="grid gap-10 md:grid-cols-[minmax(0,480px)_1fr] md:gap-16 lg:grid-cols-[minmax(0,560px)_1fr]">
            <div className="kyd-unap-art w-full max-w-[560px]">
              <Image src={f.art} alt={`${f.title} cover art`} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="kyd-unap-kicker" style={{ color: 'var(--kyd-red-bright)' }}>
                New single. {formatReleaseDate(f.date)}. {site.contact.label}.
              </p>
              <blockquote className="kyd-unap-quote mt-5">
                {site.featuredLyric.lines.map((l, i) => (
                  <span key={i} className={`block ${i === site.featuredLyric.lines.length - 1 ? 'last' : ''}`}>
                    {l}
                  </span>
                ))}
              </blockquote>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">{f.note}</p>
              <div className="mt-8">
                <StreamLinks release={f} size="lg" tone="dark" />
              </div>
            </div>
          </div>
        </section>

        <div className="kyd-unap-bar" aria-hidden />

        {/* ===== The Platform ===== */}
        <section className="px-4 py-16 md:px-8 md:py-28">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kyd-unap-kicker text-white/50">The platform</p>
              <h2 className="kyd-unap-title mt-2">{site.message.headline}</h2>
            </div>
            <p className="kyd-condensed max-w-sm text-xl font-semibold uppercase leading-snug tracking-wide text-white/60">
              {site.message.sub}
            </p>
          </div>

          <ol className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
            {site.message.pillars.map((p, i) => (
              <li key={p.title} className="kyd-unap-pillar">
                <span className="num">No. {i + 1}</span>
                <h3>{p.title}</h3>
                <p className="mt-4 max-w-xs text-lg leading-relaxed text-white/75">{p.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-16">
            <p className="kyd-display text-3xl uppercase leading-none md:text-4xl">{site.creed.join('. ')}.</p>
            <p className="kyd-condensed text-lg font-semibold uppercase tracking-wide text-white/50">{site.tagline}</p>
          </div>
        </section>

        {/* ===== Music teaser ===== */}
        <section className="px-4 py-16 md:px-8 md:py-24" style={{ background: 'var(--kyd-ink)' }}>
          <div className="flex items-end justify-between gap-4 border-b-4 pb-4" style={{ borderColor: 'var(--kyd-red)' }}>
            <div>
              <p className="kyd-unap-kicker text-white/50">Since 2020</p>
              <h2 className="kyd-unap-title mt-2">The records</h2>
            </div>
            <Link href="/kyd/music" className="kyd-btn kyd-btn-ghost !py-2 !text-[13px]">
              All music
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {teaser.map((r) => (
              <ReleaseCard key={r.slug} r={r} tone="dark" />
            ))}
          </div>
        </section>

        {/* ===== Videos ===== */}
        <section className="px-4 py-16 md:px-8 md:py-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="kyd-unap-kicker text-white/50">Official videos</p>
              <h2 className="kyd-unap-title mt-2">Watch</h2>
            </div>
            <a href={site.socials[3].url} target="_blank" rel="noreferrer" className="kyd-btn kyd-btn-ghost !py-2 !text-[13px]">
              YouTube
            </a>
          </div>
          <div className="mt-8">
            <VideoCard v={videos[0]} big />
          </div>
          <div className="mt-3">
            <VideoGrid limit={3} skipFirst />
          </div>
        </section>

        {/* ===== About ===== */}
        <section className="kyd-unap-seam-top kyd-unap-flyer px-4 pb-16 md:px-8 md:pb-28">
          <div className="grid gap-10 pt-12 md:grid-cols-[minmax(0,420px)_1fr] md:gap-16 md:pt-20 lg:grid-cols-[minmax(0,520px)_1fr]">
            <div className="kyd-unap-photo w-full max-w-[520px]">
              <Image src={ABOUT_PHOTO} alt="Kentucky Dom smiling beside a horse in a barn, American flag behind" fill sizes="(min-width: 768px) 520px, 100vw" />
              <span className="kyd-unap-photo-stamp">
                <span className="kyd-unap-stamp kyd-unap-stamp-cream text-[13px] md:text-[16px]" style={{ background: 'rgba(11,10,9,0.55)' }}>
                  <small>Henderson, KY</small>
                  <b>Imma Cowboy, Babay</b>
                </span>
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <p className="kyd-unap-kicker" style={{ color: 'var(--kyd-red)' }}>The man</p>
              <h2 className="kyd-unap-title mt-2">Who is Dom</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/80">{site.bio.short}</p>
              <blockquote className="mt-8 max-w-xl border-l-4 pl-5" style={{ borderColor: 'var(--kyd-red)' }}>
                <p className="kyd-display text-2xl uppercase leading-tight md:text-3xl">{quote.text}</p>
                <cite className="kyd-condensed mt-2 block text-sm font-bold not-italic uppercase tracking-[0.18em] text-black/50">{quote.source}</cite>
              </blockquote>
              <div className="mt-8">
                <Link href="/kyd/about" className="kyd-btn kyd-btn-red">
                  The whole story
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="kyd-unap-bar kyd-unap-bar-blue" aria-hidden />

        {/* ===== Merch flyer ===== */}
        <section className="kyd-unap-flyer px-4 py-16 md:px-8 md:py-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="kyd-unap-kicker" style={{ color: 'var(--kyd-red)' }}>Official merch</p>
              <h2 className="kyd-unap-title mt-2">Wear it loud</h2>
            </div>
            <span className="kyd-unap-stamp kyd-unap-stamp-blue hidden text-[14px] sm:inline-grid">
              <small>Ships from</small>
              <b>Nashville, TN</b>
            </span>
          </div>
          <div className="mt-10">
            {merch.map((p) => (
              <Link key={p.slug} href={`/kyd/store/${p.slug}`} className="kyd-unap-flyer-row">
                <span className="thumb">
                  <Image src={p.images[0]} alt={p.name} fill sizes="140px" className="object-cover" />
                </span>
                <span>
                  <span className="name block">{p.name}</span>
                  <span className="kyd-condensed mt-1 block text-base font-semibold uppercase tracking-wide text-black/55">
                    {p.badge ? `${p.badge}. ` : ''}{p.category}
                  </span>
                </span>
                <span className="price">{formatPrice(p.price)}</span>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/kyd/store" className="kyd-btn kyd-btn-red">
              Shop the store
            </Link>
          </div>
        </section>

        {/* ===== Follow ===== */}
        <section className="px-4 py-16 md:px-8 md:py-24" style={{ background: 'var(--kyd-black)' }}>
          <Follow tone="dark" heading="Follow Dom" />
        </section>

        {/* ===== Booking ===== */}
        <section className="kyd-unap-book px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="kyd-unap-kicker text-white/70">Live shows, appearances, brand work</p>
              <h2 className="kyd-unap-title mt-2">Book Dom</h2>
              <a href={`mailto:${site.contact.booking}`} className="mail mt-6 inline-block">
                {site.contact.booking}
              </a>
            </div>
            <Link href="/kyd/book" className="kyd-btn kyd-btn-cream">
              Booking details
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
