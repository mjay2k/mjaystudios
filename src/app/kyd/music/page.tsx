import type { Metadata } from 'next';
import Image from 'next/image';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import StreamLinks from '../StreamLinks';
import ReleaseCard from '../ReleaseCard';
import VideoGrid, { VideoCard } from '../VideoGrid';
import { releases, featuredRelease, formatReleaseDate } from '@/data/kyd/releases';
import { videos } from '@/data/kyd/videos';
import { site } from '@/data/kyd/site';

export const metadata: Metadata = {
  title: 'Music | Kentucky Dom',
  description: 'Every Kentucky Dom release, newest first. Stream on Spotify, Apple Music, YouTube and more.',
};

export default function MusicPage() {
  const f = featuredRelease;
  const rest = releases.filter((r) => r !== f);
  const own = rest.filter((r) => r.type !== 'feature');
  const feats = rest.filter((r) => r.type === 'feature');

  return (
    <>
      <SiteHeader />
      <main>
        {/* Featured */}
        <section className="relative overflow-hidden" style={{ background: 'var(--kyd-ink)' }}>
          <div className="absolute inset-0 opacity-30">
            <Image src={f.art} alt="" fill sizes="100vw" className="object-cover blur-3xl scale-125" aria-hidden />
          </div>
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-[minmax(0,420px)_1fr] md:px-6 md:py-24">
            <div className="kyd-rise relative aspect-square w-full max-w-[420px] shadow-2xl shadow-black/60">
              <Image src={f.art} alt={`${f.title} cover art`} fill priority sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
            </div>
            <div className="kyd-rise kyd-rise-2">
              <p className="kyd-eyebrow" style={{ color: 'var(--kyd-gold-bright)' }}>
                New single · {formatReleaseDate(f.date)}
              </p>
              <h1 className="kyd-display mt-3 text-6xl uppercase leading-[0.9] md:text-8xl">{f.title}</h1>
              <p className="mt-4 max-w-xl text-lg text-white/70">{f.note}</p>
              <blockquote className="kyd-serif mt-6 max-w-xl text-xl italic leading-relaxed text-white/85">
                {site.featuredLyric.lines.map((l, i) => (
                  <span key={i} className="block">{l}</span>
                ))}
              </blockquote>
              <div className="mt-8">
                <StreamLinks release={f} size="lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Spotify embed */}
        <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <p className="kyd-eyebrow text-white/40">Listen now</p>
              <h2 className="kyd-display mt-1 text-4xl uppercase leading-none md:text-6xl">Top tracks</h2>
              <p className="mt-4 max-w-md text-white/60">
                Follow on Spotify and Apple Music to get every release the day it drops.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {site.streaming.map((s) => (
                  <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="kyd-btn kyd-btn-ghost !py-2 !text-[13px]">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-xl bg-black/30">
              <iframe
                title="Kentucky Dom on Spotify"
                src={`https://open.spotify.com/embed/artist/${site.ids.spotifyArtist}?utm_source=generator&theme=0`}
                width="100%"
                height="420"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Discography */}
        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 md:pb-24">
          <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="kyd-eyebrow text-white/40">2020 to today</p>
              <h2 className="kyd-display mt-1 text-4xl uppercase leading-none md:text-6xl">Discography</h2>
            </div>
            <p className="kyd-condensed text-lg text-white/50">{own.length + 1} releases</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {own.map((r) => (
              <ReleaseCard key={r.slug} r={r} />
            ))}
          </div>

          <div className="mt-16 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="kyd-eyebrow text-white/40">Guest spots</p>
              <h2 className="kyd-display mt-1 text-3xl uppercase leading-none md:text-5xl">Features</h2>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {feats.map((r) => (
              <ReleaseCard key={r.slug} r={r} />
            ))}
          </div>
        </section>

        {/* Videos */}
        <section id="videos" className="border-t border-white/10" style={{ background: 'var(--kyd-ink)' }}>
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="kyd-eyebrow text-white/40">Official videos</p>
                <h2 className="kyd-display mt-1 text-4xl uppercase leading-none md:text-6xl">Watch</h2>
              </div>
              <a href={site.socials[3].url} target="_blank" rel="noreferrer" className="kyd-btn kyd-btn-ghost !py-2 !text-[13px]">
                YouTube channel
              </a>
            </div>
            <div className="mt-8">
              <VideoCard v={videos[0]} big />
            </div>
            <div className="mt-3">
              <VideoGrid skipFirst />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
