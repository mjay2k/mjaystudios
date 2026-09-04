'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { site } from '@/data/kyd/site';
import { Icon } from './icons';

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(true)} aria-label="Open menu" className="p-2">
        <Icon.menu className="h-6 w-6" />
      </button>
      {open && (
        <div className="fixed inset-0 z-[90] flex flex-col" style={{ background: 'var(--kyd-black)', color: 'var(--kyd-cream)' }}>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="kyd-eyebrow opacity-60">Kentucky Dom</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
              <Icon.close className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center px-6">
            {site.nav.map((n, i) => (
              <Link
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`kyd-display kyd-rise kyd-rise-${Math.min(i + 1, 4)} border-b border-white/10 py-4 text-5xl uppercase tracking-wide`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-center gap-6 px-6 py-8 text-white/60">
            {site.socials.map((s) => {
              const I = Icon[s.id as keyof typeof Icon];
              return (
                <a key={s.id} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="hover:text-white">
                  <I className="h-6 w-6" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
