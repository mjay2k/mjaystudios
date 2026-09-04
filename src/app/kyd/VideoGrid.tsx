import { videos, thumb, watchUrl, type Video } from '@/data/kyd/videos';
import { Icon } from './icons';

/* Video cards that link out to YouTube. Uses YouTube's own thumbnails so no
   assets to manage. */

export function VideoCard({ v, big = false }: { v: Video; big?: boolean }) {
  return (
    <a
      href={watchUrl(v.id)}
      target="_blank"
      rel="noreferrer"
      className="group relative block overflow-hidden bg-black"
      style={{ aspectRatio: '16 / 9' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb(v.id, big ? 'max' : 'hq')}
        alt={v.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform group-hover:scale-110"
          style={{ background: 'var(--kyd-red)' }}
        >
          <Icon.play className="ml-0.5 h-7 w-7" />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
        <p className={`kyd-condensed font-bold uppercase leading-tight tracking-wide ${big ? 'text-2xl md:text-3xl' : 'text-lg'}`}>{v.title}</p>
        {v.views && <p className="kyd-eyebrow shrink-0 text-white/60">{v.views} views</p>}
      </div>
    </a>
  );
}

export default function VideoGrid({ limit, skipFirst = false }: { limit?: number; skipFirst?: boolean }) {
  const list = (skipFirst ? videos.slice(1) : videos).slice(0, limit ?? videos.length);
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((v) => (
        <VideoCard key={v.id} v={v} />
      ))}
    </div>
  );
}
