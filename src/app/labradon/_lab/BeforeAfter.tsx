'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Pair, Shot } from '@/data/labradon/projects';

function Layer({ shot, sizes, priority, kind, align = true }: { shot: Shot; sizes: string; priority?: boolean; kind: 'before' | 'after'; align?: boolean }) {
  const style: CSSProperties = { objectPosition: shot.pos ?? '50% 50%' };
  return (
    <div className={`lab-ba-layer lab-ba-${kind}`}>
      <div className="lab-ba-zoom" style={align && shot.transform ? { transform: shot.transform } : undefined}>
        <Image src={shot.src} alt={shot.alt} fill sizes={sizes} priority={priority} style={style} draggable={false} />
      </div>
      {kind === 'before' && <span className="lab-grain" aria-hidden />}
    </div>
  );
}

/**
 * Before/after comparison. Befores are always grayscale (the brand is black and
 * white; color is what LabraDon brings back). Aligned pairs get a drag slider;
 * pairs shot from different angles get a side-by-side diptych instead.
 */
export function BeforeAfter({
  pair,
  sizes = '(max-width: 800px) 100vw, 60vw',
  priority,
  hint = true,
  className = '',
  start = 50,
  labels = ['Before', 'After'],
  aspect,
}: {
  pair: Pair;
  sizes?: string;
  priority?: boolean;
  hint?: boolean;
  className?: string;
  start?: number;
  labels?: [string, string];
  /** Override the pair's frame aspect ratio, e.g. to keep a grid even. */
  aspect?: string;
}) {
  const [pos, setPos] = useState(start);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);

  const fromClientX = useCallback((x: number) => {
    const r = frame.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  }, []);

  // A one-time sweep the first time the slider scrolls into view, so people
  // know it moves. Skipped for reduced motion or once someone has touched it.
  useEffect(() => {
    if (!hint || pair.mode !== 'slider' || !frame.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const keys = [start, 18, 78, start];
        const t0 = performance.now() + 350;
        const dur = 2200;
        const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
        const tick = (now: number) => {
          if (touched.current) return;
          const t = Math.min(1, Math.max(0, (now - t0) / dur));
          const seg = Math.min(keys.length - 2, Math.floor(t * (keys.length - 1)));
          const local = t * (keys.length - 1) - seg;
          setPos(keys[seg] + (keys[seg + 1] - keys[seg]) * ease(local));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(frame.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [hint, pair.mode, start]);

  if (pair.mode === 'diptych') {
    return (
      <div className={`lab-dip ${className}`}>
        {(['before', 'after'] as const).map((kind, i) => (
          <figure key={kind} className="lab-dip-frame" style={{ aspectRatio: aspect ?? pair.aspect }}>
            <Layer shot={pair[kind]} sizes="(max-width: 800px) 50vw, 30vw" kind={kind} align={false} />
            <figcaption className={`lab-ba-label lab-ba-label-${kind}`}>{labels[i]}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={frame}
      className={`lab-ba ${className}`}
      style={{ aspectRatio: aspect ?? pair.aspect, '--pos': `${pos}%` } as CSSProperties}
      onPointerDown={(e) => {
        dragging.current = true;
        touched.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        fromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && fromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Layer shot={pair.after} sizes={sizes} priority={priority} kind="after" />
      <Layer shot={pair.before} sizes={sizes} priority={priority} kind="before" />
      <span className="lab-ba-label lab-ba-label-before" aria-hidden>
        {labels[0]}
      </span>
      <span className="lab-ba-label lab-ba-label-after" aria-hidden>
        {labels[1]}
      </span>
      <span className="lab-ba-handle" aria-hidden>
        <span className="lab-ba-knob">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </span>
      <input
        className="lab-ba-range"
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(pos)}
        aria-label={`${pair.room}: compare before and after`}
        onChange={(e) => {
          touched.current = true;
          setPos(Number(e.target.value));
        }}
      />
    </div>
  );
}
