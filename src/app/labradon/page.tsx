import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { facts } from '@/data/labradon/facts';
import { pairById } from '@/data/labradon/projects';
import { BeforeAfter } from './_lab/BeforeAfter';
import { Logo } from './_lab/Logo';
import { OptionsBar } from './_lab/OptionsBar';

export const metadata: Metadata = { title: 'LabraDon Properties | Website options' };

const cards = [
  {
    id: 'rent-ready',
    number: '01',
    name: 'Rent-Ready',
    href: '/labradon/rent-ready',
    tag: 'Recommended',
    look: 'Swiss-industrial black and white, built like a work order. Huge condensed type, ruled grids, monospace job details.',
    best: 'Winning recurring turnover work from property managers and investors, without losing homeowners, agents or facilities.',
    features: ['"I need to..." switcher for all four buyers', 'PCS-season capacity pitch', 'Vacancy calculator and vendor file'],
  },
  {
    id: 'the-finish',
    number: '02',
    name: 'The Finish',
    href: '/labradon/the-finish',
    tag: 'Recommended',
    look: 'A black stage where the only color on the site is finished LabraDon work. Big print serif, cinematic photography.',
    best: 'Standing out as the premium, trustworthy local name. Strongest first impression and the Seth and Donnie story.',
    features: ['Rooms wipe from gray to color as you scroll', '"We bring it back." hero', 'Four photographic doors, one per buyer'],
  },
  {
    id: 'standard',
    number: '03',
    name: 'Property Standard',
    href: '/labradon/standard',
    look: 'Editorial serif and large photography on a calm white page. The first ChatGPT direction, touched up.',
    best: 'A softer, homeowner-leaning presence.',
    features: ['Drag before/after', 'Audience columns', 'Three-step inquiry'],
  },
  {
    id: 'partner',
    number: '04',
    name: 'Operating Partner',
    href: '/labradon/partner',
    look: 'Direct sans-serif, split architectural layout. The second ChatGPT direction, touched up.',
    best: 'A manager-focused campaign page.',
    features: ['Services grid', 'Vacancy illustration', 'Manager-first inquiry'],
  },
];

const compare: [string, string, string, string][] = [
  ['Says what you do in the first screen', 'Partly', 'Partly', 'Yes'],
  ['Speaks to property managers, agents and facilities', 'No', 'No', 'Yes'],
  ['Before and after you can drag', 'No', 'No', 'Yes'],
  ['A next step on every screen, plus a phone bar on mobile', 'Partly', 'Partly', 'Yes'],
  ['Vendor file: W-9, insurance, CAGE, work order numbers', 'No', 'No', 'Yes'],
  ['Founder and story on the home page', 'No', 'Partly', 'Yes'],
  ['Customer reviews on the page', 'Yes', 'Yes', 'To add'],
  ['Decades of history and awards', 'Yes', 'Yes', 'Not yet'],
];

const confirm = [
  'Which phone number leads: (757) 276-1715 on the website, or (812) 470-6195 on the flyers and capability statement.',
  'UEI and NAICS codes differ between the capability statement (DN7PKFKLV4W1, 561720) and the earlier draft (DN3EKPKLV4W1, 236118). CAGE 18Y06 matches in both and is shown.',
  'EPA RRP and OSHA 30: not shown until confirmed. Insurance lines for the certificate of insurance.',
  'Permission to name Keyrenter Property Management of Hampton Roads (shown) and Levco Management (not shown).',
  'The reply promise: "We reply within one business day" is a placeholder.',
  'That the finished kitchen, open-plan apartment and bedroom photos on the turnover page are LabraDon jobs.',
  'Three to five real Google reviews to replace the "to add" row above.',
  'The Hampton Roads waterfront banner on the current site appears to be Halifax, Nova Scotia. It is not used here.',
];

const roadmap = [
  ['Google Business Profile', 'Service-area profile for all seven cities, photos from every job, and a review request after each turn.'],
  ['Local Services Ads', 'Google lists house cleaning, junk removal, handyman, painter and flooring categories. There is no make-ready category, so we enter through those.'],
  ['City pages', 'People search "move out cleaning Norfolk VA" and junk or trash-out terms, not "make ready." One page per city and service.'],
  ['Inquiries to an inbox or CRM', 'Wire the request form with spam protection and call tracking, so every lead is answered inside an hour.'],
];

export default function Hub() {
  return (
    <div className="lab" data-dir="hub">
      <OptionsBar current="hub" />
      <main className="hub">
        <header className="hub-hero">
          <Logo variant="stacked" className="hub-logo" />
          <div>
            <p className="lab-kicker">Website options for LabraDon Properties · Prepared by MJay Studios, October 2026</p>
            <h1>Four ways to win more work.</h1>
            <p className="lab-lede">
              Two new directions built from research on the Hampton Roads market, plus the two earlier directions with light touch-ups. All four use the black and white logo, real
              LabraDon photos, and the same honest rule: no invented reviews, awards or promises.
            </p>
          </div>
        </header>

        <section className="hub-options">
          {cards.map((c) => (
            <article key={c.id} className={c.tag ? 'is-new' : ''}>
              <Link href={c.href} className="hub-shot">
                <Image src={`/labradon/hub/${c.id}.webp`} alt={`${c.name} home page`} fill sizes="(max-width: 900px) 100vw, 50vw" />
              </Link>
              <div className="hub-card-copy">
                <p className="lab-mono">
                  Option {c.number} {c.tag && <span className="lab-tag">{c.tag}</span>}
                </p>
                <h2>{c.name}</h2>
                <p>{c.look}</p>
                <p>
                  <b>Best for:</b> {c.best}
                </p>
                <ul className="lab-ticks">
                  {c.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link className="lab-btn" href={c.href}>
                  Open {c.name}
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="lab-section hub-idea">
          <div>
            <p className="lab-kicker">The imagery idea</p>
            <h2>Gray is how we found it. Color is how we left it.</h2>
            <p className="lab-lede">
              The logo is black and white, so the sites are too. Every before photo is shown in grayscale and every after in full color, so the only color on the page is
              finished LabraDon work. It turns phone photos into the strongest thing on the site instead of competing with professional photography.
            </p>
          </div>
          <BeforeAfter pair={pairById('chesapeake-bed2')} sizes="(max-width: 900px) 100vw, 45vw" />
        </section>

        <section className="lab-section hub-research">
          <div className="lab-head">
            <p className="lab-kicker">What the research says</p>
            <h2>Built on the Hampton Roads market.</h2>
          </div>
          <div className="hub-facts">
            {[facts.renters, facts.vacantDays, facts.turnCost, facts.localRent, facts.pcs, facts.pcsLease].map((f) => (
              <div key={f.id}>
                <strong>{f.id === 'pcsLease' ? 'PCS' : f.value}</strong>
                <p>{f.label}</p>
                <a className="lab-source" href={f.url}>
                  {f.source}
                </a>
              </div>
            ))}
          </div>
          <ul className="hub-insights">
            <li>
              <b>Property managers pick vendors on paperwork and process:</b> certificates of insurance, W-9s, response times, photo documentation and work order numbers. The
              new directions answer all of it up front.
            </li>
            <li>
              <b>“Veteran-owned” alone is not distinctive here.</b> Seth’s JTAC role, coordinating many moving parts on a deadline, is. That is the story both new directions
              lead with.
            </li>
            <li>
              <b>Military moves drive the turnover calendar.</b> No local competitor talks about PCS season. Rent-Ready sells summer capacity months ahead.
            </li>
          </ul>
        </section>

        <section className="lab-section hub-compare">
          <div className="lab-head">
            <p className="lab-kicker">Against the references</p>
            <h2>Where LabraDon wins, and where it has to catch up.</h2>
          </div>
          <div className="hub-table-wrap">
            <table className="hub-table">
              <thead>
                <tr>
                  <th />
                  <th>Jerry Harris Remodeling</th>
                  <th>VB Homes</th>
                  <th>New LabraDon</th>
                </tr>
              </thead>
              <tbody>
                {compare.map(([k, a, b, c]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{a}</td>
                    <td>{b}</td>
                    <td className={c === 'Yes' ? 'is-yes' : ''}>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="lab-fineprint">
            Reviewed October 2, 2026. Jerry Harris (since 1985) and VB Homes (since 1988) are custom remodelers with real history and reviews; LabraDon earns its edge with clarity,
            focus and proof, and closes the gap with reviews.
          </p>
        </section>

        <section className="lab-section hub-lists">
          <div>
            <p className="lab-kicker">Confirm before launch</p>
            <h2>Eight things only Seth can answer.</h2>
            <ol className="hub-confirm">
              {confirm.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ol>
          </div>
          <div>
            <p className="lab-kicker">After you pick a direction</p>
            <h2>Turn it into a lead machine.</h2>
            <dl className="hub-roadmap">
              {roadmap.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <footer className="hub-foot lab-mono">
        <span>Design preview by MJay Studios for LabraDon Properties LLC</span>
        <span>Not indexed. Forms do not send.</span>
      </footer>
    </div>
  );
}
