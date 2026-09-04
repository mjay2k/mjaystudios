import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import Follow from '../Follow';
import StreamLinks from '../StreamLinks';
import ReleaseCard from '../ReleaseCard';
import VideoGrid, { VideoCard } from '../VideoGrid';
import { Icon } from '../icons';
import { site } from '@/data/kyd/site';
import { ownReleases, featuredRelease, formatReleaseDate } from '@/data/kyd/releases';
import { videos } from '@/data/kyd/videos';
import { products, formatPrice } from '@/data/kyd/products';
import { photos } from '@/data/kyd/gallery';
import './front-porch.css';

/* Direction 02, Front Porch. A Kentucky documentary: paper ground, serif
   headlines, the press photography carrying the page. Faith and family are
   the story; the music sits inside it. */

export const metadata: Metadata = {
  title: 'Kentucky Dom',
  description: `${site.tagline} Country music from Henderson, Kentucky. New single "Face Like Mine" out now.`,
};

const pick = (name: string) => photos.find((p) => p.src.endsWith(name))!;
const HERO = pick('dom-goebel-29-mj.jpg');
const RIDING = pick('kentucky-dom-8.jpg');
const FLAG = pick('kentucky-dom-149.jpg');
const RED_BARN = pick('dom-goebel-1.jpg');
const PETTING = pick('kentucky-dom-3.jpg');
const FENCE = pick('kentucky-dom-19.jpg');
const USED = new Set([HERO, RIDING, FLAG, RED_BARN, PETTING, FENCE].map((p) => p.src));
const RAIL = photos.filter((p) => !USED.has(p.src));

const ROMAN = ['I', 'II', 'III'];

function Dateline({ left, right }: { left: string; right: string }) {
  return (
    <div className="fp-dateline">
      <span className="fp-cap">{left}</span>
      <span className="fp-cap">{right}</span>
    </div>
  );
}

export default function FrontPorchPage() {
  const single = featuredRelease;
  const [headline1, headline2, headline3] = site.message.headline.split('. ').map((s) => s.replace(/\.$/, ''));
  const teaser = ownReleases.filter((r) => r.slug !== single.slug).slice(0, 6);
  const shop = products.slice(0, 4);
  const [q1, q2, q3] = site.quotes;

  return (
    <div className="kyd-fp">
      <SiteHeader home="/kyd/front-porch" tone="light" />

      <main>
        {/* 1. Magazine opener */}
        <section className="mx-auto max-w-7xl px-4 pt-6 md:px-6 md:pt-10">
          <Dateline left={site.hometown} right={`Vol. 1, ${formatReleaseDate(single.date)}`} />

          <div className="grid gap-8 pt-8 md:grid-cols-[1.15fr_1fr] md:gap-12 md:pt-12 lg:grid-cols-[1.25fr_1fr]">
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="fp-head fp-head-wonk text-[15vw] leading-[0.95] sm:text-6xl md:text-[5.4rem] lg:text-[6.6rem] xl:text-[7.4rem]">
                  {headline1}.
                  <br />
                  {headline2}.
                  <br />
                  {headline3}.
                </h1>
                <p className="fp-ital mt-6 max-w-md text-2xl leading-snug md:mt-8 md:text-3xl" style={{ color: 'var(--kyd-denim)' }}>
                  {site.tagline}
                </p>
              </div>

              {/* The single, pinned to the bottom of the column like a ticket. */}
              <div className="mt-10 border-t border-b py-4 md:mt-14" style={{ borderColor: 'var(--fp-hair-strong)' }}>
                <div className="flex items-center gap-4">
                  <a href={single.links.spotify ?? single.links.apple} target="_blank" rel="noreferrer" className="relative block h-20 w-20 shrink-0 md:h-24 md:w-24">
                    <Image src={single.art} alt={`${single.title} cover art`} fill sizes="96px" className="object-cover" />
                  </a>
                  <div className="min-w-0 flex-1">
                    <p className="fp-cap">New single, {site.contact.label}</p>
                    <p className="fp-head mt-1 text-3xl leading-none md:text-4xl">{single.title}</p>
                    <p className="mt-1 text-sm" style={{ color: 'var(--fp-quiet)' }}>
                      Out now everywhere. Written with Chris Wallin and Ira Dean.
                    </p>
                  </div>
                  <div className="hidden shrink-0 sm:block">
                    <a href={single.links.spotify ?? single.links.apple} target="_blank" rel="noreferrer" className="kyd-btn kyd-btn-red">
                      <Icon.play className="h-4 w-4" />
                      Listen
                    </a>
                  </div>
                </div>
                <div className="mt-4 sm:hidden">
                  <a href={single.links.spotify ?? single.links.apple} target="_blank" rel="noreferrer" className="kyd-btn kyd-btn-red w-full">
                    <Icon.play className="h-4 w-4" />
                    Listen to Face Like Mine
                  </a>
                </div>
              </div>
            </div>

            <figure className="-mx-4 md:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]" style={{ background: 'var(--kyd-sand)' }}>
                <Image
                  src={HERO.src}
                  alt={HERO.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover object-[50%_20%]"
                />
              </div>
              <figcaption className="fp-cap mt-3 px-4 md:px-0" style={{ color: 'var(--fp-quiet)' }}>
                Dominique &ldquo;Dom&rdquo; Cosby. Photograph by Goebel.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 2. Full-bleed riding photo */}
        <section className="mt-14 md:mt-20">
          <figure>
            <div className="relative aspect-[3/2] md:aspect-[21/9]">
              <Image src={RIDING.src} alt={RIDING.alt} fill sizes="100vw" className="object-cover" />
            </div>
            <figcaption className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 md:px-6">
              <span className="fp-cap" style={{ color: 'var(--fp-quiet)' }}>Henderson County, Kentucky</span>
              <span className="fp-ital text-lg" style={{ color: 'var(--fp-quiet)' }}>Imma cowboy, babay.</span>
            </figcaption>
          </figure>
        </section>

        {/* 3. The front porch story */}
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <Dateline left="The story" right="From Henderson to Nashville" />

          <div className="grid gap-10 pt-10 md:grid-cols-12 md:gap-x-12 md:pt-14">
            <h2 className="fp-head text-5xl md:col-span-12 md:text-7xl lg:max-w-4xl">
              Telling the truth in a cowboy hat.
            </h2>

            {/* Paragraph one, drop cap, beside the flag photo */}
            <div className="fp-prose md:col-span-5 md:pt-4">
              <p className="fp-dropcap">{site.bio.long[0]}</p>
            </div>
            <figure className="-mx-4 md:col-span-7 md:mx-0">
              <div className="relative aspect-[3/2]" style={{ background: 'var(--kyd-sand)' }}>
                <Image src={FLAG.src} alt={FLAG.alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="fp-cap mt-3 px-4 md:px-0" style={{ color: 'var(--fp-quiet)' }}>One nation, one flag, no hyphens.</figcaption>
            </figure>

            {/* Pull quote across the width */}
            <blockquote className="fp-pull md:col-span-8 md:col-start-3 md:my-6">
              <p>&ldquo;{q1.text}&rdquo;</p>
              <footer className="fp-cap mt-4" style={{ color: 'var(--fp-quiet)' }}>{q1.source}</footer>
            </blockquote>

            {/* Paragraph two, red barn on the left this time */}
            <figure className="-mx-4 md:col-span-7 md:mx-0">
              <div className="relative aspect-[3/2]" style={{ background: 'var(--kyd-sand)' }}>
                <Image src={RED_BARN.src} alt={RED_BARN.alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="fp-cap mt-3 px-4 md:px-0" style={{ color: 'var(--fp-quiet)' }}>Wrangler denim, Kentucky hay.</figcaption>
            </figure>
            <div className="fp-prose md:col-span-5 md:pt-4">
              <p>{site.bio.long[1]}</p>
            </div>

            {/* Second pull quote and paragraph three beside the horse */}
            <div className="md:col-span-5 md:pt-4">
              <blockquote className="fp-pull">
                <p>&ldquo;{q2.text}&rdquo;</p>
                <footer className="fp-cap mt-4" style={{ color: 'var(--fp-quiet)' }}>{q2.source}</footer>
              </blockquote>
              <div className="fp-prose mt-8">
                <p>{site.bio.long[2]}</p>
              </div>
              <Link href="/kyd/about" className="fp-link kyd-condensed mt-8 inline-flex items-center gap-2 text-lg font-bold uppercase tracking-[0.14em]">
                Read the whole story
                <Icon.arrow className="h-4 w-4" />
              </Link>
            </div>
            <figure className="-mx-4 md:col-span-7 md:mx-0">
              <div className="relative aspect-[3/2]" style={{ background: 'var(--kyd-sand)' }}>
                <Image src={PETTING.src} alt={PETTING.alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="fp-cap mt-3 px-4 md:px-0" style={{ color: 'var(--fp-quiet)' }}>Pearl snaps and a quiet horse.</figcaption>
            </figure>
          </div>
        </section>

        {/* 4. The pillars as a ledger */}
        <section style={{ background: 'var(--kyd-cream)' }}>
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
            <Dateline left="What he stands on" right={site.creed.join(', ')} />
            <div className="grid gap-10 pt-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:pt-14">
              <div>
                <h2 className="fp-head text-5xl md:text-6xl">Keep the main things the main things.</h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed" style={{ color: 'var(--fp-body)' }}>
                  {site.message.sub}
                </p>
                <p className="fp-ital mt-8 text-xl leading-snug" style={{ color: 'var(--kyd-tobacco)' }}>
                  {site.catchphrases.slice(0, 4).join('. ')}.
                </p>
              </div>
              <ol className="fp-ledger">
                {site.message.pillars.map((p, i) => (
                  <li key={p.title}>
                    <span className="fp-numeral">{ROMAN[i]}.</span>
                    <h3 className="fp-head text-3xl md:text-4xl">{p.title}</h3>
                    <p className="text-base leading-relaxed md:text-lg" style={{ color: 'var(--fp-body)' }}>{p.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 5. Listen interlude, on ink */}
        <section className="fp-ink">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
            <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-4">
              <span className="fp-cap" style={{ color: 'var(--kyd-gold-bright)' }}>Now playing</span>
              <span className="fp-cap text-white/50">{formatReleaseDate(single.date)}, {site.contact.label}</span>
            </div>

            <div className="grid gap-10 pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-center md:gap-14 md:pt-14">
              <a href={single.links.spotify ?? single.links.apple} target="_blank" rel="noreferrer" className="relative block aspect-square overflow-hidden">
                <Image src={single.art} alt={`${single.title} cover art`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              </a>
              <div>
                <h2 className="fp-head text-5xl md:text-6xl lg:text-7xl">{single.title}</h2>
                <p className="fp-lyric mt-8 text-2xl text-white/90 md:text-3xl lg:text-[2.4rem]">
                  {site.featuredLyric.lines.map((l, i) => (
                    <span key={i} className="block">
                      {l}
                    </span>
                  ))}
                </p>
                {single.note && <p className="mt-6 max-w-md text-sm text-white/50">{single.note}</p>}
                <div className="mt-8">
                  <StreamLinks release={single} size="lg" tone="dark" />
                </div>
              </div>
            </div>

            <div className="mt-14 md:mt-20">
              <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-4">
                <span className="fp-cap text-white/50">The video</span>
                <a href={site.socials.find((s) => s.id === 'youtube')?.url} target="_blank" rel="noreferrer" className="fp-cap text-white/70 hover:text-white">
                  YouTube
                </a>
              </div>
              <div className="-mx-4 mt-6 md:mx-0">
                <VideoCard v={videos[0]} big />
              </div>
            </div>
          </div>
        </section>

        {/* 6. Music teaser */}
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <Dateline left="From the catalog" right="2020 to now" />
          <div className="flex flex-wrap items-end justify-between gap-4 pt-10 md:pt-14">
            <h2 className="fp-head text-5xl md:text-6xl">More songs from the porch.</h2>
            <Link href="/kyd/music" className="fp-link kyd-condensed inline-flex items-center gap-2 text-lg font-bold uppercase tracking-[0.14em]">
              All music
              <Icon.arrow className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-6">
            {teaser.map((r) => (
              <ReleaseCard key={r.slug} r={r} tone="light" />
            ))}
          </div>

          <div className="mt-16 md:mt-24">
            <Dateline left="More videos" right="Rodeos, tank ranges, taverns" />
            <div className="pt-6">
              <VideoGrid limit={3} skipFirst />
            </div>
          </div>
        </section>

        {/* 7. Photo rail */}
        <section className="py-4 md:py-8">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Dateline left="Press photographs" right="Drag to look through" />
          </div>
          <div className="fp-rail kyd-rail mt-6">
            {RAIL.map((p) => (
              <figure key={p.src}>
                <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(min-width: 768px) 660px, 450px" />
              </figure>
            ))}
          </div>
        </section>

        {/* 8. About teaser */}
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <Dateline left="Who he is" right={site.base} />
          <div className="grid gap-10 pt-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-14 md:pt-14">
            <figure className="-mx-4 md:mx-0">
              <div className="relative aspect-[3/2]" style={{ background: 'var(--kyd-sand)' }}>
                <Image src={FENCE.src} alt={FENCE.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="fp-cap mt-3 px-4 md:px-0" style={{ color: 'var(--fp-quiet)' }}>Golden hour, on the fence line.</figcaption>
            </figure>
            <div>
              <h2 className="fp-head text-4xl md:text-5xl">{site.name}</h2>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--fp-body)' }}>{site.bio.short}</p>
              <blockquote className="fp-pull mt-8">
                <p className="!text-xl">&ldquo;{q3.text}&rdquo;</p>
                <footer className="fp-cap mt-3" style={{ color: 'var(--fp-quiet)' }}>{q3.source}</footer>
              </blockquote>
              <Link href="/kyd/about" className="fp-link kyd-condensed mt-8 inline-flex items-center gap-2 text-lg font-bold uppercase tracking-[0.14em]">
                About Dom
                <Icon.arrow className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 9. General store */}
        <section style={{ background: 'var(--kyd-cream)' }}>
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="fp-cap">General store</p>
                <h2 className="fp-head mt-2 text-4xl md:text-5xl">Tees, hats, and the cards.</h2>
              </div>
              <Link href="/kyd/store" className="fp-link kyd-condensed inline-flex items-center gap-2 text-lg font-bold uppercase tracking-[0.14em]">
                Open the store
                <Icon.arrow className="h-4 w-4" />
              </Link>
            </div>
            <div className="fp-store mt-8">
              {shop.map((p) => (
                <Link key={p.slug} href={`/kyd/store/${p.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden" style={{ background: 'var(--kyd-paper)' }}>
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                    <p className="fp-head text-xl md:text-2xl">{p.name}</p>
                    <p className="kyd-condensed shrink-0 text-lg font-bold tracking-wider" style={{ color: 'var(--kyd-tobacco)' }}>
                      {formatPrice(p.price)}
                    </p>
                  </div>
                  <p className="mt-1 text-sm" style={{ color: 'var(--fp-quiet)' }}>{p.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Follow */}
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <Follow tone="light" heading="Come sit a spell" />
        </section>

        {/* 11. Booking */}
        <section className="border-t" style={{ borderColor: 'var(--fp-hair-strong)' }}>
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-[1.4fr_1fr] md:items-end md:px-6 md:py-24">
            <div>
              <p className="fp-cap">Booking</p>
              <h2 className="fp-head mt-3 text-5xl md:text-7xl">Bring Dom to your town.</h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed" style={{ color: 'var(--fp-body)' }}>
                Fairs, rodeos, churches, festivals, and private events. Send the date and the room, and the team will get back to you.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <a href={`mailto:${site.contact.booking}`} className="fp-ital text-2xl md:text-3xl" style={{ color: 'var(--kyd-denim)' }}>
                {site.contact.booking}
              </a>
              <Link href="/kyd/book" className="kyd-btn kyd-btn-ghost-dark">
                Book Dom
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
