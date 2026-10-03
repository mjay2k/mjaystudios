// LabraDon Properties: single source of truth for identity, contact and story.
// Sourced 2026-10-02 from labradonllc.com (about, services, turnover, special
// condition, gallery, contact), his capability statement PDF and the earlier
// Claude draft. Anything not verified on his own pages carries `confirm: true`
// and is listed on the hub's "confirm before launch" checklist.
// Site copy rule: no em dashes.

export const site = {
  name: 'LabraDon Properties',
  legalName: 'LabraDon Properties LLC',
  founder: 'Seth French',
  dog: 'Donnie',
  region: 'Hampton Roads, Virginia',

  phone: '(757) 276-1715',
  phoneHref: 'tel:+17572761715',
  email: 'support@labradonproperties.com',

  // His own lines, from the turnover and services pages.
  guarantee: 'Rent-Ready. Guaranteed.',
  guaranteeLine: 'Your team won’t have to touch it again.',
  noRoulette: 'No subcontractor roulette.',
  oneCall: 'One call. One company. Total property solutions.',
  trades: 'From cleaning and trash-out to paint, flooring and carpentry, one crew handles the job start to finish, so you never juggle contractors.',
  // From the Claude draft he commissioned.
  loyal: 'A loyal partner in every deal.',

  // Placeholder promise; Seth must confirm before launch.
  replyPromise: 'We reply within one business day.',

  cities: ['Norfolk', 'Virginia Beach', 'Chesapeake', 'Portsmouth', 'Suffolk', 'Hampton', 'Newport News'],

  values: [
    { name: 'Integrity', line: 'Honest scopes, itemized pricing, and we tell you when something is wrong.' },
    { name: 'Discipline', line: 'Checklists, schedules and follow-through, so every unit meets the same standard.' },
    { name: 'Attention to detail', line: 'The last five percent of a job is what a tenant or buyer notices first.' },
  ],
};

// Founder story, condensed from his About page.
export const story = {
  short:
    'Seth French served in the United States Marine Corps as a Joint Terminal Attack Controller, the Marine who coordinates air, ground and timing so a mission lands exactly where it should. He runs property turnovers the same way.',
  name:
    'Born and raised in Evansville, Indiana, with family ties to Hampton Roads, Seth built a business around helping people get what they want from their properties. It needed a name. His Labrador, Donnie, was right there. LabraDon Properties.',
  education:
    'Seth holds an MBA and an MA in Strategic Communication from Regent University, and a BA in Communication Studies.',
  mission:
    'Reliable, high-quality turnover, repair and cleaning work for Hampton Roads property managers, investors, homeowners and businesses. Done right, on schedule, and accountable to one company.',
};

export type Credential = { label: string; value: string; confirm?: boolean };

// The vendor file property managers ask for. Values marked `confirm` are not
// shown as facts until Seth confirms them.
export const vendorFile: Credential[] = [
  { label: 'Ownership', value: 'Veteran-owned and operated (USMC)' },
  { label: 'W-9', value: 'Sent on request' },
  { label: 'Insurance', value: 'Certificate of insurance on request', confirm: true },
  { label: 'CAGE code', value: '18Y06' },
  { label: 'Documentation', value: 'Photo report on every turn' },
  { label: 'Invoicing', value: 'Itemized, tied to your work order number' },
];

// Clients named on his own gallery and capability statement.
export const clients = [
  { name: 'Keyrenter Property Management of Hampton Roads', source: 'Project gallery', confirm: true },
  { name: 'Levco Management LLC', source: 'Capability statement', confirm: true },
];
