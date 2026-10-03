import Image from 'next/image';
import Link from 'next/link';
import { clients, site, story, vendorFile } from '@/data/labradon/site';
import { faqs, packages, process, services, standards, turnChecklist } from '@/data/labradon/services';
import { people, type Project } from '@/data/labradon/projects';
import { BeforeAfter } from './BeforeAfter';
import { href, type DirectionId } from './directions';

/** Kicker + headline + optional lede, used at the top of most sections. */
export function SectionHead({
  kicker,
  title,
  lede,
  children,
  className = '',
}: {
  kicker?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`lab-head ${className}`}>
      {kicker && <p className="lab-kicker">{kicker}</p>}
      <h2>{title}</h2>
      {lede && <p className="lab-lede">{lede}</p>}
      {children}
    </div>
  );
}

export function PackageCards({ dir }: { dir: DirectionId }) {
  return (
    <>
      <div className="lab-packages">
        {packages.map((p, i) => (
          <article key={p.name} className={p.tag ? 'is-featured' : ''}>
            <header>
              <span className="lab-mono">Package {String(i + 1).padStart(2, '0')}</span>
              {p.tag && <span className="lab-tag">{p.tag}</span>}
            </header>
            <h3>{p.name}</h3>
            <p>{p.line}</p>
            <ul className="lab-ticks">
              {p.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <Link className="lab-link" href={`${href(dir, 'request')}?for=pm`}>
              Quote a {p.name.toLowerCase()}
            </Link>
          </article>
        ))}
      </div>
      <p className="lab-fineprint">Every package is quoted per unit after a walkthrough, in writing, before work starts.</p>
    </>
  );
}

export function ServiceRows({ dir, open = false }: { dir: DirectionId; open?: boolean }) {
  return (
    <div className="lab-service-rows">
      {services.map((s) => (
        <details key={s.id} id={s.id} open={open}>
          <summary>
            <span className="lab-mono">{s.number}</span>
            <h3>{s.title}</h3>
            <span className="lab-service-line">{s.line}</span>
            <i aria-hidden className="lab-plus" />
          </summary>
          <div className="lab-service-body">
            <p>{s.summary}</p>
            <ul className="lab-ticks">
              {s.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <p className="lab-label">For {s.audience.toLowerCase()}</p>
            <Link className="lab-link" href={href(dir, 'request')}>
              Ask about {s.title.toLowerCase()}
            </Link>
          </div>
        </details>
      ))}
    </div>
  );
}

export function TurnChecklist() {
  return (
    <ol className="lab-checklist">
      {turnChecklist.map((c, i) => (
        <li key={c}>
          <span className="lab-mono">{String(i + 1).padStart(2, '0')}</span>
          {c}
        </li>
      ))}
    </ol>
  );
}

export function ProcessSteps() {
  return (
    <ol className="lab-process">
      {process.map((p, i) => (
        <li key={p.step}>
          <span className="lab-mono">
            {String(i + 1).padStart(2, '0')} · {p.time}
          </span>
          <h3>{p.step}</h3>
          <p>{p.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Standards() {
  return (
    <div className="lab-standards">
      {standards.map((s, i) => (
        <article key={s.title}>
          <span className="lab-mono">{String(i + 1).padStart(2, '0')}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </article>
      ))}
    </div>
  );
}

export function VendorFile({ dir }: { dir: DirectionId }) {
  const rows = vendorFile.filter((v) => !v.confirm || v.label === 'Insurance');
  return (
    <div className="lab-vendor" id="vendor-file">
      <dl>
        {rows.map((v) => (
          <div key={v.label}>
            <dt className="lab-mono">{v.label}</dt>
            <dd>{v.value}</dd>
          </div>
        ))}
        <div>
          <dt className="lab-mono">Recent work for</dt>
          <dd>{clients[0].name}</dd>
        </div>
      </dl>
      <Link className="lab-btn" href={`${href(dir, 'request')}?for=pm`}>
        Request the vendor packet
      </Link>
    </div>
  );
}

export function Values() {
  return (
    <ul className="lab-values">
      {site.values.map((v) => (
        <li key={v.name}>
          <b>{v.name}.</b> {v.line}
        </li>
      ))}
    </ul>
  );
}

export function Founder({ title, dir }: { title: React.ReactNode; dir: DirectionId }) {
  return (
    <section className="lab-founder">
      <figure className="lab-founder-photo">
        <Image src={people.beach.src} alt={people.beach.alt} fill sizes="(max-width: 800px) 100vw, 45vw" />
        <figcaption className="lab-label">Seth and Donnie, the dog behind the name</figcaption>
      </figure>
      <div className="lab-founder-copy">
        <p className="lab-kicker">Veteran-owned. Personally accountable.</p>
        <h2>{title}</h2>
        <p>{story.short}</p>
        <p>{story.name}</p>
        <Values />
        <Link className="lab-link" href={href(dir, 'about')}>
          The full story
        </Link>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <div className="lab-faq">
      {faqs.map((f) => (
        <details key={f.q}>
          <summary>
            {f.q}
            <i aria-hidden className="lab-plus" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** One documented project: header, every before/after pair, then extras. */
export function ProjectBlock({ project, dir }: { project: Project; dir: DirectionId }) {
  return (
    <article className="lab-project" id={project.id}>
      <header className="lab-project-head">
        <div>
          <p className="lab-kicker">{project.kind}</p>
          <h2>{project.title}</h2>
        </div>
        <dl className="lab-project-meta">
          <div>
            <dt className="lab-mono">Location</dt>
            <dd>{project.location}</dd>
          </div>
          {project.client && (
            <div>
              <dt className="lab-mono">Client</dt>
              <dd>{project.client}</dd>
            </div>
          )}
          {project.duration && (
            <div>
              <dt className="lab-mono">Turnaround</dt>
              <dd>{project.duration}, documented</dd>
            </div>
          )}
        </dl>
        <p className="lab-lede">{project.summary}</p>
      </header>
      <div className="lab-project-pairs">
        {project.pairs.map((p) => {
          // Landscape sliders lead full width; everything else sits on an even
          // grid of 3:4 frames (a diptych takes two).
          const featured = p.mode === 'slider' && p.aspect === '4 / 3';
          return (
            <figure key={p.id} className={`lab-pair ${featured ? 'is-featured' : p.mode === 'diptych' ? 'is-wide' : ''}`}>
              <BeforeAfter pair={p} hint={featured} aspect={featured ? undefined : '3 / 4'} sizes={featured ? '(max-width: 800px) 100vw, 80vw' : '(max-width: 800px) 100vw, 25vw'} />
              <figcaption>
                <b>{p.room}</b> {p.scope}
              </figcaption>
            </figure>
          );
        })}
        {project.extras.map((x) => (
          <figure key={x.src} className="lab-pair">
            <div className="lab-extra">
              <Image src={x.src} alt={x.alt} fill sizes="(max-width: 800px) 100vw, 25vw" />
              <span className="lab-ba-label lab-ba-label-after">Finished</span>
            </div>
            <figcaption>
              <b>Finished</b> {x.alt.replace(/^Finished /, '')}
            </figcaption>
          </figure>
        ))}
        <Link className="lab-pair-cta" href={`${href(dir, 'request')}?for=pm`}>
          <span className="lab-kicker">{project.client ? `Turned for ${project.client}` : project.kind}</span>
          <b>Have a unit like this?</b>
          <span className="lab-link">Request a turn</span>
        </Link>
      </div>
    </article>
  );
}
