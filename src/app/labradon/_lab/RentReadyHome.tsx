import Link from 'next/link';
import { facts } from '@/data/labradon/facts';
import { pairById } from '@/data/labradon/projects';
import { clients, site } from '@/data/labradon/site';
import { AudienceSwitcher } from './AudienceSwitcher';
import { BeforeAfter } from './BeforeAfter';
import { href } from './directions';
import { Faq, Founder, PackageCards, ProcessSteps, SectionHead, ServiceRows, VendorFile } from './Sections';
import { VacancyCalculator } from './VacancyCalculator';

const dir = 'rent-ready' as const;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Direction 01: the operator. Swiss-industrial, built like a work order. */
export function RentReadyHome() {
  const hero = pairById('chesapeake-living');
  return (
    <>
      <section className="rr-hero">
        <p className="lab-label rr-hero-label">
          <span>Veteran-owned property services</span>
          <span>Hampton Roads, Virginia</span>
        </p>
        <h1 className="rr-mega">
          Rent-ready.
          <br />
          Guaranteed.
        </h1>
        <div className="rr-hero-grid">
          <div className="rr-hero-copy">
            <p className="rr-lede">
              Turnovers, repairs, cleaning and clean-outs for rentals, homes and facilities across Hampton Roads. One crew. One point of contact.{' '}
              <b>{site.guaranteeLine}</b>
            </p>
            <div className="lab-actions">
              <Link className="lab-btn" href={href(dir, 'request')}>
                Request a walkthrough
              </Link>
              <a className="lab-link" href={site.phoneHref}>
                Call {site.phone}
              </a>
            </div>
            <ul className="rr-hero-facts lab-mono">
              <li>USMC veteran-owned</li>
              <li>{site.noRoulette.replace('.', '')}</li>
              <li>Written scope before work starts</li>
            </ul>
          </div>
          <figure className="rr-wo">
            <header className="lab-mono">
              <span>Work order · documented job</span>
              <span>{hero.project.location}</span>
            </header>
            <BeforeAfter pair={hero} priority sizes="(max-width: 800px) 100vw, 58vw" />
            <dl className="lab-mono">
              <div>
                <dt>Client</dt>
                <dd>{clients[0].name}</dd>
              </div>
              <div>
                <dt>Scope</dt>
                <dd>{hero.scope}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd className="rr-status">Rent-ready</dd>
              </div>
            </dl>
          </figure>
        </div>
      </section>

      <div className="rr-strip lab-mono" aria-label="What you get">
        <span>One crew, every trade</span>
        <span>Same checklist on every door</span>
        <span>Photo report on every job</span>
        <span>Your work order number on the invoice</span>
      </div>

      <section className="lab-section rr-switch-section">
        <SectionHead kicker="Who we work for" title="I need to…" />
        <AudienceSwitcher dir={dir} />
      </section>

      <section className="lab-section rr-wall">
        <SectionHead
          kicker="Proof in the finish"
          title={
            <>
              Gray is how we found it.
              <br />
              Color is how we left it.
            </>
          }
          lede="Real LabraDon jobs, photographed on site. Drag any photo to compare."
        />
        <div className="rr-wall-grid">
          {['chesapeake-bed1', 'chesapeake-bed3', 'chesapeake-bed2', 'chesapeake-bath', 'apt-counter'].map((id) => {
            const p = pairById(id);
            return (
              <figure key={id} className={p.mode === 'diptych' ? 'is-wide' : ''}>
                <BeforeAfter pair={p} aspect="3 / 4" sizes="(max-width: 800px) 100vw, 25vw" />
                <figcaption className="lab-mono">
                  <b>{p.room}</b>
                  <span>{p.project.location}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
        <Link className="lab-btn lab-btn-ghost" href={href(dir, 'work')}>
          See every project
        </Link>
      </section>

      <section className="lab-section rr-services">
        <SectionHead kicker="What we do" title="One call. Every trade a turn needs." lede={site.trades} />
        <ServiceRows dir={dir} />
      </section>

      <section className="lab-section rr-packages">
        <SectionHead kicker="Turn packages" title="Pick the turn the unit needs." />
        <PackageCards dir={dir} />
      </section>

      <section className="lab-section rr-process">
        <SectionHead
          kicker="How a turn runs"
          title="Run like a mission."
          lede="Seth was a Marine Joint Terminal Attack Controller: the job is getting many moving parts to land on one target, on time. Your turnover gets the same plan."
        />
        <ProcessSteps />
      </section>

      <section className="rr-pcs">
        <div className="rr-pcs-copy">
          <p className="lab-kicker">Hampton Roads runs on military moves</p>
          <h2>PCS season is turnover season.</h2>
          <p>
            About {facts.pcs.value} of military household moves land between mid-May and the end of August, and Virginia lets servicemembers with orders end a lease early. That means
            short-notice turns, all at once. Get on the schedule before the rush.
          </p>
          <Link className="lab-btn lab-btn-invert" href={`${href(dir, 'request')}?for=pm`}>
            Reserve 2027 summer capacity
          </Link>
          <p className="lab-source">
            Sources: <a href={facts.pcs.url}>{facts.pcs.source}</a>, <a href={facts.pcsLease.url}>Va. Code §{facts.pcsLease.value}</a>
          </p>
        </div>
        <ol className="rr-cal" aria-label="Peak PCS months: May through August">
          {months.map((m, i) => (
            <li key={m} className={i >= 4 && i <= 7 ? 'is-peak' : ''}>
              <span className="lab-mono">{m}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="lab-section rr-numbers">
        <SectionHead kicker="The math on vacancy" title="An empty unit is the most expensive line on the turn." />
        <div className="rr-stats">
          {[facts.vacantDays, facts.turnCost, facts.localRent].map((f) => (
            <div key={f.id}>
              <strong>{f.value}</strong>
              <p>{f.label}</p>
              <a className="lab-source" href={f.url}>
                {f.source}
              </a>
            </div>
          ))}
        </div>
        <VacancyCalculator />
      </section>

      <section className="lab-section rr-vendor">
        <SectionHead
          kicker="For property managers"
          title="Ready for your vendor file."
          lede="Everything vendor onboarding asks for, before you have to ask. Then give us one unit and judge us on the finish."
        />
        <VendorFile dir={dir} />
      </section>

      <Founder dir={dir} title="Coordination is the job." />

      <section className="lab-section rr-faq">
        <SectionHead kicker="Before you call" title="Straight answers." />
        <Faq />
      </section>
    </>
  );
}
