import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/data/kyd/site';
import { Icon } from './icons';

/* Chooser hub: three complete front-page directions, plus the shared pages
   every direction uses. Once one wins, promote it into this file. */

export const metadata: Metadata = {
  title: 'Kentucky Dom · Design directions',
  description: 'Three directions for the new kentuckydom.com.',
};

const directions = [
  {
    slug: 'unapologetic',
    n: '01',
    name: 'Unapologetic',
    kind: 'Rally poster',
    tone: 'Loud, proud, printed',
    palette: ['#0b0a09', '#b3261e', '#f3ead8'],
    photo: '/kyd/press/kentucky-dom-9.jpg',
    summary:
      'Black, red and cream. Condensed poster type, halftone and stripes, his catchphrases run as headlines. It reads like a movement more than a music site, and it matches the energy of his daily videos.',
    why: [
      'Facebook audience of 553K came for the message. This leads with it.',
      'Merch and the American Privilege cards already live in this world.',
      'Strong at thumbnail size, which is how most people will meet it.',
    ],
    bestFor: 'If the site should feel like his feed: bold, direct, shareable.',
  },
  {
    slug: 'front-porch',
    n: '02',
    name: 'Front Porch',
    kind: 'Kentucky documentary',
    tone: 'Warm, honest, rooted',
    palette: ['#faf6ee', '#2d4a6b', '#6b4a2b'],
    photo: '/kyd/press/dom-goebel-29-mj.jpg',
    summary:
      'Cream paper, denim blue, tobacco brown. Big serif headlines, full-bleed press photography of horses, barns and fields. Faith and family are the story; the music sits inside it.',
    why: [
      'His best photos are horses and hay. This direction makes them the hero.',
      'Feels like a person, not a brand. Good for bookers, press, and churches.',
      'Ages well. Nothing here goes out of style.',
    ],
    bestFor: 'If the site should promote Dom the man first and the artist second.',
  },
  {
    slug: 'nashville',
    n: '03',
    name: 'Nashville Black',
    kind: 'Modern artist site',
    tone: 'Sleek, music-first',
    palette: ['#0b0a09', '#c9a24a', '#161412'],
    photo: '/kyd/press/bluegrass-uk-11.jpg',
    summary:
      'Near-black with gold. The newest single owns the hero, the discography scrolls like a streaming app, videos play big. The tux-jacket photos finally get used.',
    why: [
      'Baste Records signing and "Face Like Mine" deserve a label-grade presentation.',
      'Familiar to anyone who visits major-artist sites. Zero learning curve.',
      'Store and music share one dark skin, so the whole site feels like one piece.',
    ],
    bestFor: 'If the goal is streams and industry credibility.',
  },
];

const shared = [
  { label: 'Music', href: '/kyd/music', note: '21 releases, Spotify player, 9 videos' },
  { label: 'Store', href: '/kyd/store', note: '7 products, working cart, checkout placeholder' },
  { label: 'About', href: '/kyd/about', note: 'Bio, pillars, quotes, gallery, press' },
  { label: 'Book', href: '/kyd/book', note: 'Gigwell form + email' },
];

export default function KydHub() {
  return (
    <main className="min-h-screen">
      <header className="mx-auto max-w-7xl px-4 pt-10 md:px-6 md:pt-16">
        <div className="flex items-center gap-3">
          <Image src={site.brand.icon} alt="" width={300} height={300} className="h-10 w-10" />
          <Image src={site.brand.wordmark} alt="Kentucky Dom" width={840} height={162} className="h-7 w-auto" />
        </div>
        <p className="kyd-eyebrow mt-8 text-white/40">New site · Design directions · September 2026</p>
        <h1 className="kyd-display mt-2 max-w-4xl text-5xl uppercase leading-[0.9] md:text-8xl">
          Three ways to say <span style={{ color: 'var(--kyd-red-bright)' }}>God, country, family.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/65">
          Each direction is a complete front page built on the same content and the same shared pages below. Pick
          the one that feels like Dom, and we build the rest of the site in that voice.
        </p>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          {directions.map((d) => (
            <Link
              key={d.slug}
              href={`/kyd/${d.slug}`}
              className="group flex flex-col overflow-hidden border border-white/10 transition-colors hover:border-white/30"
              style={{ background: 'var(--kyd-ink)' }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={d.photo} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div>
                    <p className="kyd-eyebrow text-white/60">{d.n} · {d.kind}</p>
                    <p className="kyd-display text-4xl uppercase leading-none text-white md:text-5xl">{d.name}</p>
                  </div>
                  <div className="flex gap-1">
                    {d.palette.map((c) => (
                      <span key={c} className="h-5 w-5 border border-white/30" style={{ background: c }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="kyd-eyebrow" style={{ color: 'var(--kyd-gold-bright)' }}>{d.tone}</p>
                <p className="mt-3 text-white/75">{d.summary}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/60">
                  {d.why.map((w) => (
                    <li key={w} className="flex gap-2">
                      <span className="mt-0.5 shrink-0" style={{ color: "var(--kyd-red-bright)" }}><Icon.star className="h-3.5 w-3.5" /></span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
                <p className="kyd-serif mt-5 text-sm italic text-white/50">{d.bestFor}</p>
                <span className="kyd-btn kyd-btn-cream mt-6 w-full group-hover:bg-white">
                  Open direction <Icon.arrow className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10" style={{ background: 'var(--kyd-ink)' }}>
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <p className="kyd-eyebrow text-white/40">Shared by every direction</p>
          <h2 className="kyd-display mt-1 text-4xl uppercase leading-none md:text-6xl">Inner pages</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {shared.map((s) => (
              <Link key={s.href} href={s.href} className="group border border-white/10 p-5 transition-colors hover:border-white/30 hover:bg-white/5">
                <p className="kyd-display text-3xl uppercase">{s.label}</p>
                <p className="mt-2 text-sm text-white/55">{s.note}</p>
                <p className="kyd-eyebrow mt-4 text-white/40 group-hover:text-white">Open</p>
              </Link>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-sm text-white/45">
            Content sources: kentuckydom.com (bio, merch, videos), Facebook, TikTok, Instagram, YouTube, Spotify and Apple
            Music (discography and links). Checkout, newsletter, and tour dates are placeholders until a backend is chosen.
          </p>
        </div>
      </section>
    </main>
  );
}
