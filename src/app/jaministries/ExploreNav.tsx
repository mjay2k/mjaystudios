'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { site } from '@/data/ja/site';

/* "Explore" dropdown — carries every section from the old site's tab bar
   (Welcome, About, Beliefs, Platinum Seal, Books, Credentials, Staff, Give,
   Contact, Prophecy Records) without crowding the header. Doubles as the
   mobile menu. */

export default function ExploreNav() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="ja-display flex items-center gap-2 rounded-md border-2 px-4 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.08em] transition-colors"
        style={{ borderColor: 'var(--ja-royal)', color: 'var(--ja-royal)' }}
      >
        Explore
        <span
          className={`text-[10px] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          className="ja-rise absolute right-0 z-50 mt-3 w-[min(92vw,44rem)] rounded-xl border bg-white p-6 shadow-[0_30px_80px_-24px_rgba(14,26,51,0.45)] md:p-8"
          style={{ borderColor: 'var(--ja-sand)' }}
        >
          <div className="grid gap-8 sm:grid-cols-3">
            {site.explore.map((group) => (
              <div key={group.group}>
                <p
                  className="ja-display text-[11px] font-extrabold uppercase tracking-[0.25em]"
                  style={{ color: 'var(--ja-gold-1)' }}
                >
                  {group.group}
                </p>
                <div className="ja-gold-hr mt-2 w-8" />
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group block"
                      >
                        <span
                          className="ja-display block text-[15px] font-extrabold uppercase tracking-tight transition-colors group-hover:text-[color:var(--ja-royal)]"
                          style={{ color: 'var(--ja-ink)' }}
                        >
                          {item.label}
                        </span>
                        <span className="ja-sans block text-[12px] leading-snug text-[color:var(--ja-ink)]/55">
                          {item.note}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
