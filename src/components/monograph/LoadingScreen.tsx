'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

/* ──────────────────────────────────────────────────────────
   Loading screen — the MJ mark in gray, filling with brand
   orange from the bottom as the page loads, then a clean
   slide-up reveal into the hero.

   Progress is choreographed toward 90% and completes when the
   window load event fires (3.5s failsafe). Shows once per
   session; progress mutates the DOM directly via refs so the
   60fps fill doesn't re-render React.
   ────────────────────────────────────────────────────────── */

const MIDNIGHT = '#0f1620';

export default function LoadingScreen() {
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>('loading');
  const fillRef = useRef<HTMLImageElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  // shown once per session — the flag is written only after the exit
  // animation completes, so this snapshot stays false while we animate
  const seen = useSyncExternalStore(
    () => () => {},
    () => sessionStorage.getItem('mg-loaded') === '1',
    () => false
  );

  useEffect(() => {
    if (seen) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let exitTimer: ReturnType<typeof setTimeout>;
    let loaded = document.readyState === 'complete';
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener('load', onLoad);

    const t0 = performance.now();
    let cur = 0;

    const finish = () => {
      setPhase('exiting');
      exitTimer = setTimeout(() => {
        sessionStorage.setItem('mg-loaded', '1');
        setPhase('done');
      }, reduced ? 50 : 700);
    };

    if (reduced) {
      // no choreography — wait for load (or a beat), then go
      const t = setTimeout(finish, loaded ? 150 : 800);
      return () => {
        clearTimeout(t);
        window.removeEventListener('load', onLoad);
      };
    }

    const tick = (t: number) => {
      const el = (t - t0) / 1000;
      // crawl to 90% over ~1.4s; the load event (or failsafe) buys the last 10%
      const target = loaded || el > 3.5 ? 1 : Math.min(0.9, (el / 1.4) * 0.9);
      cur += (target - cur) * 0.1;
      if (fillRef.current) fillRef.current.style.clipPath = `inset(${(1 - cur) * 100}% 0 0 0)`;
      if (pctRef.current) pctRef.current.textContent = `${Math.round(cur * 100)}`;
      if (cur > 0.995) {
        if (fillRef.current) fillRef.current.style.clipPath = 'inset(0 0 0 0)';
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      window.removeEventListener('load', onLoad);
    };
  }, [seen]);

  if (seen || phase === 'done') return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center"
      style={{
        background: MIDNIGHT,
        transform: phase === 'exiting' ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)',
        willChange: 'transform',
      }}
    >
      <div className="relative h-32 w-auto md:h-40">
        {/* gray base mark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mj-logo.svg"
          alt=""
          className="h-full w-auto"
          style={{ filter: 'grayscale(1) brightness(2.4) opacity(0.18)' }}
        />
        {/* orange fill — revealed bottom-up by load progress */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={fillRef}
          src="/mj-logo.svg"
          alt=""
          className="absolute inset-0 h-full w-auto"
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        />
      </div>
      <p
        className="mt-8 flex items-baseline gap-2 text-[10px] font-bold uppercase tracking-[0.34em]"
        style={{ fontFamily: 'var(--font-display)', color: 'rgba(237,241,245,0.45)' }}
      >
        Matthew Johnson
        <span style={{ color: '#F15A29' }}>
          <span ref={pctRef}>0</span>%
        </span>
      </p>
    </div>
  );
}
