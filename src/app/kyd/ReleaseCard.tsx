import Image from 'next/image';
import type { Release } from '@/data/kyd/releases';
import StreamLinks from './StreamLinks';

/* Album-art card with the best single stream link on hover and a link row below. */
export default function ReleaseCard({ r, tone = 'dark' }: { r: Release; tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark';
  const primary = r.links.spotify ?? r.links.apple ?? r.links.youtube ?? r.links.deezer;
  return (
    <article className="group">
      <a href={primary} target="_blank" rel="noreferrer" className="relative block aspect-square overflow-hidden bg-black/20">
        <Image
          src={r.art}
          alt={`${r.title} cover art`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {r.type === 'feature' && (
          <span className="kyd-eyebrow absolute left-2 top-2 bg-black/70 px-2 py-1 text-[10px] text-white">Feature</span>
        )}
        {r.type === 'ep' && (
          <span className="kyd-eyebrow absolute left-2 top-2 px-2 py-1 text-[10px] text-white" style={{ background: 'var(--kyd-red)' }}>EP</span>
        )}
      </a>
      <div className="mt-3">
        <h3 className="kyd-condensed text-xl font-bold uppercase leading-tight tracking-wide">
          {r.title}
        </h3>
        <p className={`text-sm ${dark ? 'text-white/50' : 'text-black/50'}`}>
          {r.artist ? `${r.artist} · ` : ''}
          {r.featuring ? `feat. ${r.featuring} · ` : ''}
          {r.year}
        </p>
        <div className="mt-3">
          <StreamLinks release={r} size="sm" tone={tone} />
        </div>
      </div>
    </article>
  );
}
