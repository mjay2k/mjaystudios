import { site } from '@/data/kyd/site';
import { Icon } from './icons';

/* Social block: big Facebook card (his real audience) plus the rest. Dark by
   default; pass `tone="light"` on cream grounds. */

export default function Follow({ tone = 'dark', heading = 'Follow Dom' }: { tone?: 'dark' | 'light'; heading?: string }) {
  const dark = tone === 'dark';
  const primary = site.socials.find((s) => s.primary)!;
  const rest = site.socials.filter((s) => s !== primary);
  const border = dark ? 'border-white/12' : 'border-black/12';
  const sub = dark ? 'text-white/50' : 'text-black/50';

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className={`kyd-eyebrow ${sub}`}>Daily, unfiltered</p>
          <h2 className="kyd-display mt-1 text-4xl uppercase leading-none md:text-6xl">{heading}</h2>
        </div>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <a
          href={primary.url}
          target="_blank"
          rel="noreferrer"
          className={`group flex flex-col justify-between border p-5 sm:col-span-2 lg:row-span-2 ${border}`}
          style={{ background: 'var(--kyd-red)', color: '#fff', borderColor: 'transparent' }}
        >
          <div className="flex items-center justify-between">
            <Icon.facebook className="h-8 w-8" />
            <Icon.arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </div>
          <div className="mt-16">
            <p className="kyd-display text-6xl leading-none md:text-8xl">{primary.count}</p>
            <p className="kyd-eyebrow mt-2 text-white/80">{primary.countLabel} on {primary.label}</p>
            <p className="mt-4 max-w-sm text-white/85">
              Where the conversation happens. New videos almost every day.
            </p>
          </div>
        </a>
        {rest.map((s) => {
          const I = Icon[s.id as keyof typeof Icon];
          return (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className={`group flex flex-col justify-between border p-5 transition-colors ${border} ${dark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
            >
              <div className="flex items-center justify-between">
                <I className="h-6 w-6" />
                <Icon.arrow className="h-4 w-4 opacity-50 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="mt-8">
                <p className="kyd-display text-3xl leading-none">{s.count ?? s.label}</p>
                <p className={`kyd-eyebrow mt-1 ${sub}`}>{s.count ? `${s.countLabel} · ${s.label}` : s.handle}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
