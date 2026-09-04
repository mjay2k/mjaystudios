import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import './nashville.css';
import SiteFooter from '../SiteFooter';
import StreamLinks from '../StreamLinks';
import Follow from '../Follow';
import VideoGrid, { VideoCard } from '../VideoGrid';
import CartButton from '../cart/CartButton';
import MobileNav from '../MobileNav';
import { Icon } from '../icons';
import { site } from '@/data/kyd/site';
import { ownReleases, featuredRelease, formatReleaseDate, type Release } from '@/data/kyd/releases';
import { videos } from '@/data/kyd/videos';
import { products, formatPrice } from '@/data/kyd/products';

/* Direction 03: Nashville Black. Near-black with gold, music first. The
   newest single owns the hero, the discography reads as a ledger, videos
   play big. */

export const metadata: Metadata = {
  title: 'Kentucky Dom',
  description:
    'Kentucky Dom. New single "Face Like Mine" out now on Baste Records. Stream the music, watch the videos, shop the store, book the show.',
};

const STREAM_ICONS: { key: keyof Release['links']; icon: keyof typeof Icon; label: string }[] = [
  { key: 'spotify', icon: 'spotify', label: 'Spotify' },
  { key: 'apple', icon: 'apple', label: 'Apple Music' },
  { key: 'youtube', icon: 'youtube', label: 'YouTube' },
  { key: 'deezer', icon: 'deezer', label: 'Deezer' },
];

function Header() {
  return (
    <header className="nb-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/kyd/nashville" aria-label="Kentucky Dom home" className="flex shrink-0 items-center">
          <Image src={site.brand.wordmark} alt="Kentucky Dom" width={840} height={162} priority className="h-6 w-auto md:h-7" />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="kyd-condensed text-[15px] font-semibold uppercase tracking-[0.16em] text-white/75 transition-colors hover:text-white"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1 md:gap-3">
          <a
            href={featuredRelease.links.spotify ?? site.streaming[0].url}
            target="_blank"
            rel="noreferrer"
            className="kyd-btn kyd-btn-ghost nb-listen hidden !py-2 !text-[13px] sm:inline-flex"
          >
            Listen
          </a>
          <CartButton />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function LedgerRow({ r, n }: { r: Release; n: number }) {
  const primary = r.links.spotify ?? r.links.apple ?? r.links.youtube ?? r.links.deezer;
  return (
    <li className="nb-row">
      <span className="nb-num">{String(n).padStart(2, '0')}</span>
      <a href={primary} target="_blank" rel="noreferrer" className="nb-thumb" tabIndex={-1} aria-hidden>
        <Image src={r.art} alt="" fill sizes="48px" className="object-cover" />
      </a>
      <div className="min-w-0">
        <a href={primary} target="_blank" rel="noreferrer" className="nb-title block">
          {r.title}
          {r.type === 'ep' && <span className="nb-ep kyd-condensed font-bold">EP</span>}
        </a>
        <p className={`nb-sub ${r.featuring ? '' : 'nb-sub-label'}`}>{r.featuring ? `feat. ${r.featuring}` : r.label}</p>
      </div>
      <span className="nb-year">{r.year}</span>
      <span className="nb-label">{r.label}</span>
      <div className="nb-links">
        {STREAM_ICONS.filter((s) => r.links[s.key]).map((s) => {
          const I = Icon[s.icon];
          return (
            <a key={s.key} href={r.links[s.key]} target="_blank" rel="noreferrer" aria-label={`${r.title} on ${s.label}`}>
              <I className="h-4 w-4" />
            </a>
          );
        })}
      </div>
    </li>
  );
}

export default function NashvillePage() {
  const f = featuredRelease;
  const ledger = ownReleases.slice(0, 8);
  const merch = products.slice(0, 4);
  const quote = site.quotes[1];
  const youtube = site.socials.find((s) => s.id === 'youtube')!;

  return (
    <div className="kyd-nb">
      <Header />
      <main>
        {/* Hero: Face Like Mine owns it */}
        <section className="nb-hero">
          <div className="nb-hero-photo">
            <Image
              src="/kyd/press/bluegrass-uk-11.jpg"
              alt="Kentucky Dom in a black hat and burgundy tux jacket"
              fill
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover object-[50%_8%]"
            />
          </div>
          <div className="nb-hero-body">
            <div className="order-2 px-4 pb-14 pt-8 lg:order-1 lg:p-0">
              <p className="kyd-eyebrow kyd-rise" style={{ color: 'var(--kyd-gold)' }}>
                New single · {site.contact.label}
              </p>
              <h1 className="nb-h1 kyd-rise kyd-rise-2 mt-3">
                Face Like <span className="kyd-gold-text">Mine</span>
              </h1>
              <p className="kyd-rise kyd-rise-3 mt-5 max-w-md text-[17px] leading-relaxed text-white/70">
                {f.note} Released {formatReleaseDate(f.date)}.
              </p>
              <div className="kyd-rise kyd-rise-4 mt-8">
                <StreamLinks release={f} size="lg" />
              </div>
              <p className="nb-meta mt-8 opacity-80">
                {site.genreLine}
              </p>
            </div>
            <div className="order-1 nb-hero-art kyd-fade lg:order-2">
              <Image
                src={f.art}
                alt={`${f.title} cover art`}
                width={1200}
                height={1200}
                priority
                sizes="(min-width: 1024px) 360px, 62vw"
                className="block h-auto w-full"
              />
              <span className="nb-stamp">Out now</span>
            </div>
          </div>
        </section>

        {/* Spotify slim panel */}
        <section className="nb-spotify">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-center md:px-6 md:py-10">
            <div>
              <h2 className="nb-h3">Top tracks</h2>
              <p className="mt-2 max-w-sm text-white/60">
                Follow on Spotify or Apple Music and every release lands in your library the day it drops.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {site.streaming.map((s) => (
                  <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="nb-meta hover:text-white">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-xl bg-black/40">
              <iframe
                title="Kentucky Dom on Spotify"
                src={`https://open.spotify.com/embed/artist/${site.ids.spotifyArtist}?utm_source=generator&theme=0`}
                width="100%"
                height="232"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Discography ledger */}
        <section className="mx-auto max-w-7xl px-0 py-16 md:px-6 md:py-24">
          <div className="flex items-end justify-between gap-4 px-4 md:px-0">
            <div>
              <p className="nb-meta">{ownReleases.length} releases since 2020</p>
              <h2 className="nb-h2 mt-2">Discography</h2>
            </div>
            <Link href="/kyd/music" className="kyd-btn kyd-btn-ghost !py-2 !text-[13px]">
              All music
            </Link>
          </div>
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-14">
            <div className="hidden lg:block">
              <div className="nb-sticky">
                <div className="relative aspect-square overflow-hidden" style={{ boxShadow: '0 0 0 1px rgba(201,162,74,0.35), 0 30px 60px rgba(0,0,0,0.6)' }}>
                  <Image src={f.art} alt={`${f.title} cover art`} fill sizes="380px" className="object-cover" />
                </div>
                <div className="mt-4 flex items-baseline justify-between border-b border-white/10 pb-3">
                  <p className="kyd-condensed text-xl font-bold uppercase tracking-wide">{f.title}</p>
                  <p className="nb-meta">{f.year}</p>
                </div>
                <p className="mt-3 text-sm text-white/50">{f.label}</p>
              </div>
            </div>
            <ol className="nb-ledger">
              {ledger.map((r, i) => (
                <LedgerRow key={r.slug} r={r} n={i + 1} />
              ))}
            </ol>
          </div>
        </section>

        {/* Message and pillars */}
        <section style={{ background: 'var(--kyd-ink)' }}>
          <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[560px]">
              <Image
                src="/kyd/press/tonka-tonka-bts-52.jpg"
                alt="Kentucky Dom at a card table in a tavern"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              <div className="nb-photo-dim absolute inset-0 lg:hidden" />
            </div>
            <div className="px-4 py-12 md:px-10 md:py-20 lg:py-24">
              <h2 className="nb-h2 max-w-xl">{site.message.headline}</h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">{site.message.sub}</p>
              <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
                {site.message.pillars.map((p) => (
                  <div key={p.title}>
                    <div className="nb-hairline" />
                    <h3 className="nb-h3 mt-4">{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/60">{p.text}</p>
                  </div>
                ))}
              </div>
              <ul className="mt-12 flex flex-wrap gap-x-4 gap-y-2">
                {site.catchphrases.slice(0, 5).map((c) => (
                  <li key={c} className="nb-meta flex items-center gap-4 opacity-90">
                    <span aria-hidden className="h-3 w-px" style={{ background: 'var(--kyd-gold)' }} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Videos */}
        <section className="mx-auto max-w-7xl px-0 py-16 md:px-6 md:py-24">
          <div className="flex items-end justify-between gap-4 px-4 md:px-0">
            <div>
              <p className="nb-meta">Official videos</p>
              <h2 className="nb-h2 mt-2">Watch</h2>
            </div>
            <a href={youtube.url} target="_blank" rel="noreferrer" className="kyd-btn kyd-btn-ghost !py-2 !text-[13px]">
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

        {/* About the artist */}
        <section className="border-t border-white/10">
          <div className="mx-auto grid max-w-7xl gap-8 px-0 py-16 md:px-6 md:py-24 lg:grid-cols-[minmax(0,4fr)_1px_minmax(0,7fr)] lg:gap-14">
            <div className="relative aspect-[4/5] lg:aspect-[3/4]">
              <Image
                src="/kyd/press/bluegrass-uk-2.jpg"
                alt="Kentucky Dom in a burgundy tux jacket"
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <div className="nb-vrule hidden lg:block" />
            <div className="px-4 md:px-0 lg:py-6">
              <p className="nb-meta">About the artist</p>
              <p className="kyd-serif-display mt-4 max-w-xl text-2xl italic leading-snug md:text-[2rem]">{site.tagline}</p>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/70">{site.bio.short}</p>
              <blockquote className="mt-10 max-w-xl border-l pl-5" style={{ borderColor: 'var(--kyd-gold)' }}>
                <p className="kyd-condensed text-xl font-medium leading-snug text-white/85 md:text-2xl">&ldquo;{quote.text}&rdquo;</p>
                <cite className="nb-meta mt-3 block not-italic opacity-80">{quote.source}</cite>
              </blockquote>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link href="/kyd/about" className="kyd-btn kyd-btn-ghost">
                  Full story
                </Link>
                <p className="nb-meta opacity-80">{site.creed.join('. ')}.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Merch strip */}
        <section style={{ background: 'var(--kyd-ink)' }}>
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="nb-meta">Official store</p>
                <h2 className="nb-h2 mt-2">Merch</h2>
              </div>
              <Link href="/kyd/store" className="kyd-btn kyd-btn-ghost !py-2 !text-[13px]">
                Shop all
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {merch.map((p) => (
                <Link key={p.slug} href={`/kyd/store/${p.slug}`} className="nb-product">
                  <div className="relative aspect-square overflow-hidden bg-black/30">
                    <Image src={p.images[0]} alt={p.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  </div>
                  <div className="flex items-baseline justify-between gap-3 px-3 py-3">
                    <p className="kyd-condensed truncate text-lg font-bold uppercase tracking-wide">{p.name}</p>
                    <p className="nb-price">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Follow */}
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <Follow tone="dark" heading="Follow Dom" />
        </section>

        {/* Booking */}
        <section className="nb-book relative isolate overflow-hidden">
          <Image
            src="/kyd/press/dom-st-louis-41.jpg"
            alt=""
            fill
            sizes="100vw"
            className="-z-10 object-cover object-[70%_50%]"
            aria-hidden
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-32">
            <p className="nb-meta">Booking</p>
            <h2 className="nb-h2 mt-2">Bring Dom to your <span className="kyd-gold-text">stage</span></h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
              Festivals, fairs, rodeos, churches, private events. Full band or acoustic.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Link href="/kyd/book" className="kyd-btn kyd-btn-gold">
                Book a show
              </Link>
              <a href={`mailto:${site.contact.booking}`} className="kyd-condensed text-xl font-semibold tracking-wide text-white/85 hover:text-white">
                {site.contact.booking}
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
