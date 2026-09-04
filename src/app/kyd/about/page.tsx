import type { Metadata } from 'next';
import Image from 'next/image';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import Follow from '../Follow';
import { site } from '@/data/kyd/site';
import { photos } from '@/data/kyd/gallery';
import { press } from '@/data/kyd/press';

export const metadata: Metadata = {
  title: 'About | Kentucky Dom',
  description: site.bio.short,
};

export default function AboutPage() {
  const portrait = photos[0];
  const gallery = photos.slice(1);
  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1fr_1.1fr] md:items-center md:px-6 md:py-20">
          <div className="relative aspect-square overflow-hidden">
            <Image src={portrait.src} alt={portrait.alt} fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="kyd-eyebrow" style={{ color: 'var(--kyd-gold-bright)' }}>{site.hometown}</p>
            <h1 className="kyd-display mt-2 text-6xl uppercase leading-[0.9] md:text-8xl">{site.message.headline}</h1>
            <p className="kyd-serif mt-6 text-xl italic leading-relaxed text-white/80">{site.tagline}</p>
            <p className="mt-6 text-lg text-white/70">{site.bio.short}</p>
          </div>
        </section>

        <section className="border-y border-white/10" style={{ background: 'var(--kyd-ink)' }}>
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-3 md:px-6 md:py-16">
            {site.message.pillars.map((p, i) => (
              <div key={p.title} className="border-l-2 pl-5" style={{ borderColor: 'var(--kyd-red)' }}>
                <p className="kyd-eyebrow text-white/40">0{i + 1}</p>
                <h2 className="kyd-display mt-1 text-4xl uppercase">{p.title}</h2>
                <p className="mt-3 text-white/65">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <p className="kyd-eyebrow text-white/40">The story</p>
              <h2 className="kyd-display mt-1 text-4xl uppercase leading-none md:text-6xl">From Henderson to Nashville</h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-white/75">
              {site.bio.long.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {site.quotes.map((q) => (
              <blockquote key={q.source} className="border border-white/10 p-6">
                <p className="kyd-serif text-lg italic leading-relaxed text-white/85">&ldquo;{q.text}&rdquo;</p>
                <footer className="kyd-eyebrow mt-4 text-white/40">{q.source}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6 md:pb-20">
          <p className="kyd-eyebrow text-white/40">Press photos</p>
          <h2 className="kyd-display mt-1 text-4xl uppercase leading-none md:text-6xl">Gallery</h2>
          <div className="mt-8 columns-2 gap-3 md:columns-3 [&>*]:mb-3">
            {gallery.map((p) => (
              <div key={p.src} className="relative break-inside-avoid overflow-hidden bg-white/5">
                <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(min-width: 768px) 33vw, 50vw" className="h-auto w-full" />
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10" style={{ background: 'var(--kyd-ink)' }}>
          <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
            <p className="kyd-eyebrow text-white/40">In the press</p>
            <h2 className="kyd-display mt-1 text-4xl uppercase leading-none md:text-6xl">Coverage</h2>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {press.map((p) => (
                <li key={p.url + p.title}>
                  <a href={p.url} target="_blank" rel="noreferrer" className="group grid gap-2 py-5 md:grid-cols-[180px_1fr_auto] md:items-center">
                    <p className="kyd-eyebrow text-white/40">{p.date.slice(0, 4)} · {p.outlet}</p>
                    <div>
                      <p className="kyd-condensed text-xl font-bold uppercase tracking-wide group-hover:underline">{p.title}</p>
                      <p className="text-sm text-white/55">{p.blurb}</p>
                    </div>
                    <span className="kyd-eyebrow text-white/40 group-hover:text-white">Read</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <Follow />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
