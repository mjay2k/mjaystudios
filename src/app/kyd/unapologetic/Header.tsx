import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/kyd/site';
import CartButton from '../cart/CartButton';
import MobileNav from '../MobileNav';

/* Transparent header that sits over the hero. */
export default function Header() {
  return (
    <header className="kyd-unap-header">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
        <Link href="/kyd/unapologetic" aria-label="Kentucky Dom home" className="flex shrink-0 items-center gap-3">
          <Image src={site.brand.wordmark} alt="Kentucky Dom" width={840} height={162} priority className="h-6 w-auto md:h-7" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="kyd-navlink kyd-condensed text-[16px] font-extrabold uppercase tracking-[0.16em]"
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
            className="kyd-btn kyd-btn-cream hidden !py-2 !text-[13px] sm:inline-flex"
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
