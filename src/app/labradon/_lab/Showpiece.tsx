'use client';

import Image from 'next/image';
import { useEffect, useRef, type CSSProperties } from 'react';
import type { Pair, Project } from '@/data/labradon/projects';

type Item = Pair & { project: Project };

/**
 * Scroll-linked wipes for The Finish. Each room sits in a tall track with a
 * sticky stage; scrolling through the track drives --p from 0 to 1, wiping the
 * grayscale before into the color after. Pure CSS sticky + one scroll listener.
 */
export function Showpiece({ items }: { items: Item[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tracks = Array.from(root.current?.querySelectorAll<HTMLElement>('.lab-show-track') ?? []);
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const t of tracks) {
        const r = t.getBoundingClientRect();
        const span = r.height - vh;
        // Hold the before for the first 15% of the track, finish by 80%.
        const raw = span > 0 ? -r.top / span : 0;
        const p = Math.min(1, Math.max(0, (raw - 0.15) / 0.65));
        t.style.setProperty('--p', p.toFixed(4));
        t.classList.toggle('is-after', p > 0.55);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="lab-show" ref={root}>
      {items.map((it, i) => (
        <section key={it.id} className="lab-show-track" style={{ '--p': 0 } as CSSProperties} aria-label={`${it.room}, before and after`}>
          <div className="lab-show-stage">
            <div className="lab-show-caption">
              <span className="lab-show-count">
                {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <h3>{it.room}</h3>
              <p>{it.scope}</p>
              <p className="lab-label">
                {it.project.location}
                {it.project.client ? ` · ${it.project.client}` : ''}
              </p>
              <span className="lab-show-state" aria-hidden>
                <span>Before</span>
                <span>After</span>
              </span>
            </div>
            <div className="lab-show-frame" style={{ aspectRatio: it.aspect }}>
              <div className="lab-ba-layer lab-ba-before">
                <div className="lab-ba-zoom" style={it.before.transform ? { transform: it.before.transform } : undefined}>
                  <Image src={it.before.src} alt={it.before.alt} fill sizes="(max-width: 800px) 100vw, 55vw" style={{ objectPosition: it.before.pos ?? '50% 50%' }} />
                </div>
                <span className="lab-grain" aria-hidden />
              </div>
              <div className="lab-ba-layer lab-show-after">
                <div className="lab-ba-zoom" style={it.after.transform ? { transform: it.after.transform } : undefined}>
                  <Image src={it.after.src} alt={it.after.alt} fill sizes="(max-width: 800px) 100vw, 55vw" style={{ objectPosition: it.after.pos ?? '50% 50%' }} />
                </div>
              </div>
              <span className="lab-show-line" aria-hidden />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
