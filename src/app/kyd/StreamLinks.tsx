import type { Release } from '@/data/kyd/releases';
import { Icon } from './icons';

const ORDER: { key: keyof Release['links']; label: string; icon: keyof typeof Icon }[] = [
  { key: 'spotify', label: 'Spotify', icon: 'spotify' },
  { key: 'apple', label: 'Apple Music', icon: 'apple' },
  { key: 'youtube', label: 'YouTube', icon: 'youtube' },
  { key: 'deezer', label: 'Deezer', icon: 'deezer' },
  { key: 'amazon', label: 'Amazon', icon: 'amazon' },
];

/* Row of streaming buttons for a release. `size` md for cards, lg for heroes. */
export default function StreamLinks({
  release,
  size = 'md',
  tone = 'dark',
}: {
  release: Release;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'dark' | 'light';
}) {
  const links = ORDER.filter((o) => release.links[o.key]);
  const dark = tone === 'dark';
  const pad = size === 'lg' ? 'px-5 py-3 text-[15px]' : size === 'sm' ? 'px-3 py-1.5 text-[12px]' : 'px-4 py-2 text-[13px]';
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((o, i) => {
        const I = Icon[o.icon];
        const first = i === 0;
        return (
          <a
            key={o.key}
            href={release.links[o.key]}
            target="_blank"
            rel="noreferrer"
            className={`kyd-condensed inline-flex items-center gap-2 border font-bold uppercase tracking-[0.12em] transition-colors ${pad} ${
              first
                ? 'border-transparent text-white'
                : dark
                  ? 'border-white/20 text-white/85 hover:border-white/60 hover:text-white'
                  : 'border-black/20 text-black/80 hover:border-black hover:text-black'
            }`}
            style={first ? { background: 'var(--kyd-red)' } : undefined}
          >
            <I className={size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
            {o.label}
          </a>
        );
      })}
    </div>
  );
}
