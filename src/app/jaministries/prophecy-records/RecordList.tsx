'use client';

import { useMemo, useState } from 'react';
import { prophecies, type ProphecyStatus } from '@/data/ja/prophecies';

/* Filterable public record. The ministry's whole claim here is that these are
   dated and testable, so the date and status lead each entry. */

const FILTERS: Array<{ label: string; value: ProphecyStatus | 'All' }> = [
  { label: 'All records', value: 'All' },
  { label: 'Fulfilled', value: 'Fulfilled' },
  { label: 'Ongoing', value: 'Ongoing' },
  { label: 'Awaiting', value: 'Awaiting' },
];

const STATUS_STYLE: Record<ProphecyStatus, { bg: string; fg: string; mark: string }> = {
  Fulfilled: { bg: 'var(--ja-royal)', fg: '#ffffff', mark: '✓' },
  Ongoing: { bg: 'var(--ja-gold-2)', fg: 'var(--ja-ink-900)', mark: '◈' },
  Awaiting: { bg: 'var(--ja-sand)', fg: 'var(--ja-ink)', mark: '⏳' },
};

export default function RecordList() {
  const [filter, setFilter] = useState<ProphecyStatus | 'All'>('All');
  const [query, setQuery] = useState('');

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return prophecies.filter((p) => {
      if (filter !== 'All' && p.status !== filter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q) ||
        p.released.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: prophecies.length };
    for (const p of prophecies) c[p.status] = (c[p.status] ?? 0) + 1;
    return c;
  }, []);

  return (
    <>
      {/* controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const on = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={on}
                className="ja-display rounded-md px-4 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.08em] transition-colors"
                style={
                  on
                    ? { background: 'var(--ja-royal)', color: '#ffffff' }
                    : { background: 'var(--ja-cream)', color: 'var(--ja-ink)' }
                }
              >
                {f.label}
                <span className="ml-2 opacity-60">{counts[f.value] ?? 0}</span>
              </button>
            );
          })}
        </div>

        <label className="relative">
          <span className="sr-only">Search the records</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search records…"
            className="ja-sans w-full rounded-md border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[color:var(--ja-royal)] sm:w-64"
            style={{ borderColor: 'var(--ja-sand)' }}
          />
        </label>
      </div>

      {/* the record */}
      <ol className="mt-10 space-y-4">
        {shown.map((p) => {
          const s = STATUS_STYLE[p.status];
          return (
            <li
              key={p.n}
              className="rounded-lg border p-6 transition-shadow hover:shadow-[0_18px_50px_-24px_rgba(14,26,51,0.4)] md:p-7"
              style={{ borderColor: 'var(--ja-sand)' }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="ja-display text-sm font-extrabold" style={{ color: 'var(--ja-gold-3)' }}>
                    {String(p.n).padStart(2, '0')}
                  </span>
                  <h2 className="ja-display max-w-2xl text-xl font-extrabold uppercase leading-tight tracking-tight md:text-2xl" style={{ color: 'var(--ja-royal)' }}>
                    {p.title}
                  </h2>
                </div>
                <span
                  className="ja-display shrink-0 rounded px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em]"
                  style={{ background: s.bg, color: s.fg }}
                >
                  {s.mark} {p.status}
                </span>
              </div>

              <p className="ja-sans mt-4 text-base leading-[1.85] text-[color:var(--ja-ink)]/75">{p.body}</p>

              <p className="ja-sans mt-4 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--ja-gold-1)' }}>
                Released {p.released}
              </p>
            </li>
          );
        })}
      </ol>

      {shown.length === 0 && (
        <p className="ja-sans mt-10 text-center text-sm text-[color:var(--ja-ink)]/60">
          No records match that search.
        </p>
      )}
    </>
  );
}
