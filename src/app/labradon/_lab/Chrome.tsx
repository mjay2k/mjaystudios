'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { site } from '@/data/labradon/site';
import { Logo } from './Logo';
import { href, type DirectionId } from './directions';

const nav = [
  { label: 'Our work', path: 'work' },
  { label: 'Services', path: 'services' },
  { label: 'About', path: 'about' },
];

/** Shared header for both new directions; each direction restyles it via data-dir. */
export function SiteHeader({ dir }: { dir: DirectionId }) {
  const [open, setOpen] = useState(false);
  const current = usePathname()?.split('/')[3];
  return (
    <header className="lab-header">
      <Link href={href(dir)} className="lab-header-logo" aria-label="LabraDon Properties home">
        <Logo variant={dir === 'the-finish' ? 'wordmark' : 'horizontal'} title={null} />
      </Link>
      <nav id="lab-nav" className={`lab-header-nav ${open ? 'is-open' : ''}`} aria-label="Main">
        {nav.map((n) => (
          <Link key={n.path} href={href(dir, n.path)} aria-current={current === n.path ? 'page' : undefined} onClick={() => setOpen(false)}>
            {n.label}
          </Link>
        ))}
        <a className="lab-header-phone" href={site.phoneHref}>
          {site.phone}
        </a>
        <Link className="lab-btn lab-header-cta" href={href(dir, 'request')} onClick={() => setOpen(false)}>
          Request a walkthrough
        </Link>
      </nav>
      <button className="lab-header-toggle" aria-expanded={open} aria-controls="lab-nav" onClick={() => setOpen(!open)}>
        <span>{open ? 'Close' : 'Menu'}</span>
        <i aria-hidden className={open ? 'is-open' : ''} />
      </button>
    </header>
  );
}

/** Sticky call / request bar for phones. */
export function MobileBar({ dir }: { dir: DirectionId }) {
  return (
    <div className="lab-mobilebar">
      <a href={site.phoneHref}>Call {site.phone}</a>
      <Link href={href(dir, 'request')}>Request a walkthrough</Link>
    </div>
  );
}
