import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/kyd/site';
import CartButton from './cart/CartButton';
import MobileNav from './MobileNav';

/* Shared sticky header for the inner pages. Directions may use it (pass
   `home` to point the wordmark at their own route) or roll their own. */

export default function SiteHeader({
  home = '/kyd',
  tone = 'dark',
  transparent = false,
}: {
  home?: string;
  tone?: 'dark' | 'light';
  transparent?: boolean;
}) {
  const dark = tone === 'dark';
  return (
    <header
      className={`sticky top-0 z-50 border-b ${dark ? 'border-white/10' : 'border-black/10'} ${transparent ? '' : 'backdrop-blur'}`}
      style={{
        background: transparent ? 'transparent' : dark ? 'rgba(11,10,9,0.92)' : 'rgba(250,246,238,0.94)',
        color: dark ? 'var(--kyd-cream)' : 'var(--kyd-black)',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href={home} aria-label="Kentucky Dom home" className="flex shrink-0 items-center gap-3">
          <Image src={site.brand.icon} alt="" width={300} height={300} className="h-9 w-9" priority />
          <Image
            src={site.brand.wordmark}
            alt="Kentucky Dom"
            width={840}
            height={162}
            priority
            className={`h-6 w-auto ${dark ? '' : 'invert'}`}
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {site.nav.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="kyd-navlink kyd-condensed text-[15px] font-bold uppercase tracking-[0.14em] opacity-80 hover:opacity-100"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-3">
          <a
            href={site.streaming[0].url}
            target="_blank"
            rel="noreferrer"
            className="kyd-btn kyd-btn-red hidden !py-2 !text-[13px] sm:inline-flex"
          >
            Listen
          </a>
          <CartButton />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
