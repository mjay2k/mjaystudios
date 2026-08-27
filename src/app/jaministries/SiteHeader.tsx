import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/ja/site';
import ExploreNav from './ExploreNav';

/* Shared sticky header. `homeAnchors` is true only on the front page, where
   the quick links point at in-page sections; every other page links back to
   the front page's anchors instead. */

export default function SiteHeader({ homeAnchors = false }: { homeAnchors?: boolean }) {
  const base = homeAnchors ? '' : '/jaministries';
  const quick = [
    { label: 'Our Mission', href: `${base}#mission` },
    { label: 'What We Do', href: `${base}#work` },
    { label: 'The Evangelist', href: `${base}#testimony` },
    { label: 'Prophecy Records', href: '/jaministries/prophecy-records' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          href="/jaministries"
          aria-label="Jesus Anoints Ministries home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <Image
            src={site.brand.icon2026}
            alt=""
            width={347}
            height={304}
            priority
            className="h-10 w-auto"
          />
          <span
            className="ja-display text-lg font-black uppercase leading-none tracking-tight"
            style={{ color: 'var(--ja-royal)' }}
          >
            Jesus Anoints{' '}
            <span
              className="block text-[10px] font-extrabold tracking-[0.3em]"
              style={{ color: 'var(--ja-gold-1)' }}
            >
              Ministries
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-5">
          <nav className="hidden items-center gap-6 xl:flex">
            {quick.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className="ja-navlink ja-display text-[13px] font-bold uppercase tracking-[0.08em] text-[color:var(--ja-ink)]/75 hover:text-[color:var(--ja-royal)]"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <ExploreNav />
          <Link
            href="/jaministries/give"
            className="ja-display hidden rounded-md px-5 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[color:var(--ja-ink-900)] transition-transform hover:-translate-y-0.5 sm:block"
            style={{ background: 'var(--ja-gold-grad)' }}
          >
            Give
          </Link>
        </div>
      </div>
    </header>
  );
}
