import Image from 'next/image';
import Link from 'next/link';
import { audiences } from '@/data/labradon/audiences';
import { finished, pairById, people, photo } from '@/data/labradon/projects';
import { site, story } from '@/data/labradon/site';
import { href } from './directions';
import { Logo } from './Logo';
import { SectionHead, ServiceRows, Standards, Values } from './Sections';
import { Showpiece } from './Showpiece';

const dir = 'the-finish' as const;

const doorPhoto = {
  pm: { src: photo('chesapeake-living-after'), alt: 'Finished Chesapeake rental living room' },
  homeowner: finished.kitchen,
  agent: finished.bedroom,
  commercial: people.painting,
} as const;

/** Direction 02: cinematic and story-led. The only color is finished work. */
export function TheFinishHome() {
  return (
    <>
      <section className="tf-hero">
        <div className="tf-hero-copy">
          <p className="lab-kicker">Veteran-owned · Hampton Roads, Virginia</p>
          <h1>
            We bring
            <br />
            it back.
          </h1>
          <p className="tf-lede">
            Turnovers, repairs, cleaning and clean-outs for the people who own, manage, sell and run property. One loyal crew, from the walkthrough to the final clean.
          </p>
          <div className="lab-actions">
            <Link className="lab-btn lab-btn-invert" href={href(dir, 'request')}>
              Request a walkthrough
            </Link>
            <Link className="lab-link" href={href(dir, 'work')}>
              See the work
            </Link>
          </div>
        </div>
        <figure className="tf-hero-photo">
          <Image src={finished.kitchen.src} alt={finished.kitchen.alt} fill priority sizes="(max-width: 800px) 100vw, 46vw" />
          <figcaption className="lab-label">Finished kitchen</figcaption>
        </figure>
        <nav className="tf-hero-doors" aria-label="Who we work for">
          {audiences.map((a, i) => (
            <Link key={a.id} href={`${href(dir, 'request')}?for=${a.id}`}>
              <span className="lab-label">0{i + 1}</span>
              <b>{a.task}</b>
            </Link>
          ))}
        </nav>
      </section>

      <section className="tf-statement">
        <p>
          Every property has a better version of itself under the wear. LabraDon is the veteran-owned crew that finds it: the clean, the paint, the floors and the repairs,
          finished to a standard you can see. <em>{site.guaranteeLine}</em>
        </p>
      </section>

      <section className="tf-show-intro">
        <SectionHead kicker="Before and after" title="The difference is the finish." lede="Real rooms from a Chesapeake turnover. Scroll, and watch the color come back." />
      </section>
      <Showpiece items={['chesapeake-bed1', 'chesapeake-bed3', 'chesapeake-living'].map(pairById)} />
      <div className="tf-show-more">
        <Link className="lab-btn lab-btn-ghost" href={href(dir, 'work')}>
          Every before and after
        </Link>
      </div>

      <section className="lab-section tf-doors">
        <SectionHead kicker="Who we work for" title="Four ways in. One standard." />
        <div className="tf-door-grid">
          {audiences.map((a) => {
            const p = doorPhoto[a.id];
            return (
              <Link key={a.id} className="tf-door" href={`${href(dir, 'request')}?for=${a.id}`}>
                <span className="tf-door-photo">
                  <Image src={p.src} alt={p.alt} fill sizes="(max-width: 800px) 100vw, 25vw" />
                </span>
                <span className="lab-label">{a.who}</span>
                <h3>{a.headline}</h3>
                <p>{a.text}</p>
                <span className="lab-link">{a.cta}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="tf-story">
        <div className="tf-story-photos">
          <figure className="tf-story-main">
            <Image src={people.beach.src} alt={people.beach.alt} fill sizes="(max-width: 800px) 100vw, 40vw" />
          </figure>
          <figure className="tf-story-dog">
            <Image src={people.donnie.src} alt={people.donnie.alt} fill sizes="(max-width: 800px) 50vw, 18vw" />
            <figcaption className="lab-label">Donnie</figcaption>
          </figure>
        </div>
        <div className="tf-story-copy">
          <Logo variant="mark" className="tf-story-mark" title={null} />
          <h2>
            Disciplined like a Marine.
            <br />
            <em>Loyal like a Lab.</em>
          </h2>
          <p>{story.short}</p>
          <p>{story.name}</p>
          <Values />
          <Link className="lab-link" href={href(dir, 'about')}>
            Meet Seth and Donnie
          </Link>
        </div>
      </section>

      <section className="lab-section tf-services">
        <SectionHead kicker="What we do" title="One call. Every trade." lede={site.trades} />
        <ServiceRows dir={dir} />
      </section>

      <section className="lab-section tf-standards">
        <SectionHead kicker="Our standard" title="What we put in writing." />
        <Standards />
      </section>

      <section className="tf-region">
        <p className="lab-kicker">Serving Hampton Roads, Virginia</p>
        <ul>
          {site.cities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
