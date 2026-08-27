import Link from 'next/link';
import { site } from '@/data/ja/site';
import { Brush, Curve } from './brand';

/* Shared footer. `seam` draws the white→navy woosh above it; pass false when
   the preceding section is not white. */

const FOOTER_LINKS = [
  { label: 'Beliefs', href: '/jaministries/beliefs' },
  { label: 'Prophecy Records', href: '/jaministries/prophecy-records' },
  { label: 'Journal', href: '/jaministries/blog' },
  { label: 'Give', href: '/jaministries/give' },
  { label: 'Pray & Contact', href: '/jaministries/pray' },
];

export default function SiteFooter({ seam = true }: { seam?: boolean }) {
  return (
    <footer
      className="ja-dove-watermark relative overflow-hidden"
      style={{ background: 'var(--ja-slate-grad)' }}
    >
      {seam && <Curve fill="#ffffff" invert />}
      <div className={`relative z-10 mx-auto max-w-6xl px-4 pb-12 text-center md:px-6 ${seam ? 'pt-8 md:pt-12' : 'pt-16 md:pt-20'}`}>
        <p className="ja-script text-4xl md:text-6xl" style={{ color: 'var(--ja-gold-2)' }}>
          Touching the world, one soul at a time.
        </p>
        <Brush className="mx-auto mt-2 h-4 w-64 md:w-96" />

        <nav className="ja-display mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white/70">
          {FOOTER_LINKS.map((n) => (
            <Link key={n.label} href={n.href} className="hover:text-white">
              {n.label}
            </Link>
          ))}
          <a href={site.social.facebook} target="_blank" rel="noreferrer" className="hover:text-white">
            Facebook
          </a>
          <a href={site.social.youtube} target="_blank" rel="noreferrer" className="hover:text-white">
            YouTube
          </a>
        </nav>

        <p className="ja-sans mt-8 text-[10px] uppercase tracking-[0.3em] text-white/40">
          {site.transparency}
        </p>
      </div>
    </footer>
  );
}
