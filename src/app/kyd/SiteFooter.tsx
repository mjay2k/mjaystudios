import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/kyd/site';
import { Icon } from './icons';
import Newsletter from './Newsletter';

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10" style={{ background: 'var(--kyd-black)', color: 'var(--kyd-cream)' }}>
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Image src={site.brand.wordmark} alt="Kentucky Dom" width={840} height={162} className="h-8 w-auto" />
            <p className="kyd-serif mt-5 max-w-sm text-lg italic text-white/70">{site.tagline}</p>
            <p className="kyd-eyebrow mt-4 text-white/40">{site.creed.join('  •  ')}</p>
          </div>

          <div>
            <p className="kyd-eyebrow text-white/40">Never miss new music</p>
            <Newsletter />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="kyd-eyebrow text-white/40">Site</p>
              <ul className="mt-3 space-y-2">
                {site.nav.map((n) => (
                  <li key={n.label}>
                    <Link href={n.href} className="kyd-condensed text-lg font-semibold uppercase tracking-wider text-white/80 hover:text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kyd-eyebrow text-white/40">Follow</p>
              <ul className="mt-3 space-y-2">
                {site.socials.map((s) => {
                  const I = Icon[s.id as keyof typeof Icon];
                  return (
                    <li key={s.id}>
                      <a href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white/80 hover:text-white">
                        <I className="h-4 w-4" />
                        <span className="kyd-condensed text-lg font-semibold uppercase tracking-wider">{s.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Kentucky Dom · {site.contact.company}</p>
          <p>
            Booking: <a href={`mailto:${site.contact.booking}`} className="text-white/70 hover:text-white">{site.contact.booking}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
