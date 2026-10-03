'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { audiences, type Audience } from '@/data/labradon/audiences';
import { finished, people } from '@/data/labradon/projects';
import { href, type DirectionId } from './directions';

function Proof({ a }: { a: Audience }) {
  const shot = { apartment: finished.apartment, kitchen: finished.kitchen, bedroom: finished.bedroom, painting: people.painting }[a.photo];
  return (
    <div className="lab-switch-photo">
      <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 800px) 100vw, 50vw" />
    </div>
  );
}

/** "I need to..." tabs: one site, four buyers, no mushy message. */
export function AudienceSwitcher({ dir }: { dir: DirectionId }) {
  const [active, setActive] = useState(audiences[0].id);
  const a = audiences.find((x) => x.id === active)!;
  return (
    <div className="lab-switch">
      <div className="lab-switch-tabs" role="tablist" aria-label="I need to">
        {audiences.map((x, i) => (
          <button
            key={x.id}
            role="tab"
            id={`tab-${x.id}`}
            aria-selected={x.id === active}
            aria-controls="lab-switch-panel"
            onClick={() => setActive(x.id)}
            onKeyDown={(e) => {
              if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
              const next = audiences[(i + (e.key === 'ArrowRight' ? 1 : audiences.length - 1)) % audiences.length];
              setActive(next.id);
              document.getElementById(`tab-${next.id}`)?.focus();
            }}
            tabIndex={x.id === active ? 0 : -1}
          >
            <small>{String(i + 1).padStart(2, '0')}</small>
            {x.task}
          </button>
        ))}
      </div>
      <div className="lab-switch-panel" id="lab-switch-panel" role="tabpanel" aria-labelledby={`tab-${a.id}`} key={a.id}>
        <div className="lab-switch-copy">
          <p className="lab-kicker">For {a.who.toLowerCase()}</p>
          <h3>{a.headline}</h3>
          <p>{a.text}</p>
          <ul className="lab-ticks">
            {a.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Link className="lab-btn" href={`${href(dir, 'request')}?for=${a.id}`}>
            {a.cta}
          </Link>
        </div>
        <div className="lab-switch-proof">
          <Proof a={a} />
        </div>
      </div>
    </div>
  );
}
