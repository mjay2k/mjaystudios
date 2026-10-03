import Image from 'next/image';
import Link from 'next/link';
import { finished, people, projects } from '@/data/labradon/projects';
import { services } from '@/data/labradon/services';
import { site, story } from '@/data/labradon/site';
import { href, type DirectionId } from './directions';
import { Faq, PackageCards, ProcessSteps, ProjectBlock, SectionHead, Standards, TurnChecklist, Values, VendorFile } from './Sections';
import { RequestForm } from './RequestForm';

function PageIntro({ kicker, title, lede }: { kicker: string; title: React.ReactNode; lede: string }) {
  return (
    <header className="lab-page-intro">
      <p className="lab-kicker">{kicker}</p>
      <h1>{title}</h1>
      <p className="lab-lede">{lede}</p>
    </header>
  );
}

export function WorkView({ dir }: { dir: DirectionId }) {
  return (
    <>
      <PageIntro
        kicker="Our work"
        title={
          <>
            See it gray.
            <br />
            See it finished.
          </>
        }
        lede="Documented LabraDon turnovers, photographed on site. Befores are shown in black and white; the color is what we brought back. Drag any photo to compare."
      />
      {projects.map((p) => (
        <section key={p.id} className="lab-section">
          <ProjectBlock project={p} dir={dir} />
        </section>
      ))}
      <section className="lab-section lab-finished">
        <SectionHead kicker="Finished rooms" title="Ready to show." />
        <div className="lab-finished-grid">
          {[finished.kitchen, finished.apartment, finished.bedroom].map((f) => (
            <figure key={f.src} style={{ aspectRatio: `${f.w} / ${f.h}` }}>
              <Image src={f.src} alt={f.alt} fill sizes="(max-width: 800px) 100vw, 33vw" />
            </figure>
          ))}
        </div>
        <div className="lab-actions lab-work-cta">
          <Link className="lab-btn" href={href(dir, 'request')}>
            Have a unit like these? Request a walkthrough
          </Link>
        </div>
      </section>
    </>
  );
}

export function ServicesView({ dir }: { dir: DirectionId }) {
  return (
    <>
      <PageIntro
        kicker="Services"
        title={
          <>
            One call.
            <br />
            Every trade.
          </>
        }
        lede="From cleaning and trash removal to paint, flooring and carpentry, one accountable crew handles the job start to finish, so you never juggle contractors."
      />
      <section className="lab-section">
        <SectionHead kicker="Unit turnovers" title={site.guarantee} lede={`${site.guaranteeLine} Every turn follows the same checklist, so the tenth door looks like the first.`} />
        <PackageCards dir={dir} />
      </section>
      <section className="lab-section lab-split">
        <SectionHead kicker="Included in every standard turn" title="The checklist." lede="Repeatable, inspected, and the same on every unit." />
        <TurnChecklist />
      </section>
      {services.map((s) => (
        <section key={s.id} id={s.id} className="lab-section lab-service-detail">
          <div>
            <p className="lab-kicker">
              {s.number} · {s.audience}
            </p>
            <h2>{s.title}</h2>
            <p className="lab-lede">{s.summary}</p>
            <Link className="lab-link" href={href(dir, 'request')}>
              Ask about {s.title.toLowerCase()}
            </Link>
          </div>
          <ul className="lab-ticks">
            {s.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </section>
      ))}
      <section className="lab-section">
        <SectionHead kicker="How it works" title="A clear path to rent-ready." />
        <ProcessSteps />
      </section>
      <section className="lab-section">
        <SectionHead kicker="Questions" title="Straight answers." />
        <Faq />
      </section>
    </>
  );
}

export function AboutView({ dir }: { dir: DirectionId }) {
  return (
    <>
      <PageIntro
        kicker="About LabraDon"
        title={
          <>
            Named for a Labrador.
            <br />
            Run like a mission.
          </>
        }
        lede={story.mission}
      />
      <section className="lab-section lab-about">
        <figure className="lab-about-main">
          <Image src={people.beach.src} alt={people.beach.alt} fill sizes="(max-width: 800px) 100vw, 50vw" />
        </figure>
        <div className="lab-about-copy">
          <h2>Seth French, founder</h2>
          <p>{story.short}</p>
          <p>{story.name}</p>
          <p>{story.education}</p>
          <Values />
        </div>
      </section>
      <section className="lab-section lab-about-strip">
        {[people.donnie, people.painting, people.portrait].map((p) => (
          <figure key={p.src}>
            <Image src={p.src} alt={p.alt} fill sizes="(max-width: 800px) 100vw, 33vw" />
          </figure>
        ))}
      </section>
      <section className="lab-section">
        <SectionHead kicker="Our standard" title="What we put in writing." />
        <Standards />
      </section>
      <section className="lab-section">
        <SectionHead kicker="For property managers and partners" title="Vendor file." lede="Everything vendor onboarding asks for, ready when you are." />
        <VendorFile dir={dir} />
      </section>
      <section className="lab-section lab-area">
        <SectionHead kicker="Service area" title="Hampton Roads, Virginia." />
        <ul>
          {site.cities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function RequestView({ initialFor }: { initialFor?: string }) {
  return (
    <section className="lab-section lab-request">
      <div className="lab-request-side">
        <p className="lab-kicker">Request a walkthrough</p>
        <h1>Tell us about the property.</h1>
        <p className="lab-lede">A minute here saves a phone call. We will set the walkthrough and send a written, itemized scope.</p>
        <ol className="lab-request-next">
          <li>
            <span>
              <b>We call you back.</b> {site.replyPromise}
            </span>
          </li>
          <li>
            <span>
              <b>We walk it.</b> With you, your agent or your maintenance lead.
            </span>
          </li>
          <li>
            <span>
              <b>You get it in writing.</b> Nothing starts until you approve the scope.
            </span>
          </li>
        </ol>
        <p className="lab-request-call">
          Rather talk now? <a href={site.phoneHref}>{site.phone}</a>
        </p>
      </div>
      <RequestForm initialFor={initialFor} />
    </section>
  );
}
