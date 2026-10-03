// Services, turn packages and checklists. Lists come from his services, unit
// turnover and special condition pages, plus the turn packages and trades from
// the Claude draft he commissioned. Packages are always "quoted per unit after a
// walkthrough"; no prices are published.

export type Service = {
  id: string;
  number: string;
  title: string;
  line: string;
  summary: string;
  items: string[];
  audience: string;
};

export const services: Service[] = [
  {
    id: 'turnovers',
    number: '01',
    title: 'Unit turnovers',
    line: 'Move-out to rent-ready, one crew.',
    summary:
      'Full-service turns for apartment communities and rental portfolios. A repeatable checklist on every unit, so the tenth door looks like the first.',
    items: ['Make-ready cleaning and detailing', 'Paint, patch and touch-up', 'Flooring repairs and LVP', 'Fixtures, doors and hardware', 'Trash-out and final quality check'],
    audience: 'Property managers, landlords, investors',
  },
  {
    id: 'special-condition',
    number: '02',
    title: 'Special condition cleanup',
    line: 'For units that come back worse than normal wear.',
    summary:
      'Clearly defined, condition-based add-ons so there are no surprises. Documented and approved before work begins whenever possible.',
    items: ['Excessive pet hair and dander', 'Heavy soil and neglected units', 'Odor remediation', 'Bodily fluid and biocontamination cleanup', 'Emergency and expedited turnarounds'],
    audience: 'Property managers, owners',
  },
  {
    id: 'repairs',
    number: '03',
    title: 'Repairs and renovations',
    line: 'Repairs built to survive the next tenant.',
    summary:
      'The trade depth behind every turn, and the punch list that stands between you and a signed lease, a listing, or a closing.',
    items: ['Drywall, patching and texture', 'Interior paint, full or touch-up', 'LVP flooring install and repair', 'Bath and kitchen refreshes, vanities, counters', 'Doors, trim, locksets and light carpentry'],
    audience: 'Homeowners, agents, investors',
  },
  {
    id: 'cleaning',
    number: '04',
    title: 'Cleaning and clean-outs',
    line: 'Move-in, move-out and everything left behind.',
    summary:
      'Deep cleans, post-renovation finals, and the heavy clean-outs nobody else wants, from a single room to a whole building.',
    items: ['Move-in and move-out cleaning', 'Post-construction final cleans', 'Eviction and abandoned-unit clean-outs', 'Furniture and appliance removal', 'Leasing office and common areas'],
    audience: 'Everyone',
  },
  {
    id: 'debris',
    number: '05',
    title: 'Bulk debris and trash removal',
    line: 'Large or small, hauled and gone.',
    summary: 'Same crew, same accountability. Trash-outs, junk and construction debris loaded, hauled and swept.',
    items: ['Trash-outs', 'Junk and furniture hauling', 'Construction debris', 'Dumpster overflow cleanups'],
    audience: 'Owners, managers, contractors',
  },
  {
    id: 'exterior',
    number: '06',
    title: 'Exterior and seasonal',
    line: 'Curb appeal, storms and the occasional snow day.',
    summary: 'Property cleanups and seasonal work that keep a rental or a listing looking cared for from the street.',
    items: ['Landscaping and property cleanups', 'Storm debris removal', 'Snow removal', 'HOA violation fixes'],
    audience: 'Owners, managers, agents',
  },
  {
    id: 'commercial',
    number: '07',
    title: 'Commercial and facility support',
    line: 'Offices, retail and job sites on your timeline.',
    summary:
      'Large-scale facility cleaning, repairs and renovations, scheduled around your hours so employees and customers walk into a clean, safe space.',
    items: ['Facility and janitorial cleaning', 'Retail store cleaning support', 'Construction site sanitation', 'Repairs and light renovation', 'Recurring schedules and consolidated invoices'],
    audience: 'Businesses, facility managers, general contractors',
  },
];

export type Package = { name: string; tag?: string; line: string; items: string[] };

export const packages: Package[] = [
  {
    name: 'Light turn',
    line: 'Clean-only, for units that left in good shape.',
    items: ['Kitchen and appliance detail', 'Bath sanitation and detailing', 'Baseboards, doors and trim', 'Floors cleaned and detailed', 'Normal turnover trash-out'],
  },
  {
    name: 'Standard turn',
    tag: 'Most requested',
    line: 'Clean plus the repairs that fail move-in inspections.',
    items: ['Everything in the light turn', 'Drywall patching and touch-up paint', 'Doors, hardware and fixture swaps', 'Caulking, sealing, minor flooring repair', 'Punch list and make-ready repairs'],
  },
  {
    name: 'Total turn',
    line: 'For units that need to be brought all the way back.',
    items: ['Everything in the standard turn', 'Full interior repaint', 'LVP flooring replacement', 'Bath and kitchen refresh', 'Debris haul-off'],
  },
];

// "What's included in a standard unit turnover", verbatim list from his page.
export const turnChecklist = [
  'Full kitchen cleaning: appliances, cabinets, counters, sinks',
  'Bathroom sanitation and detailing',
  'Interior surfaces: baseboards, doors, trim',
  'Floor cleaning and detailing',
  'Trash removal, normal turnover debris',
  'Visual quality check before completion',
  'Unit left rent-ready, ready for inspection and leasing',
];

// Promises he already makes on his turnover page, plus the process.
export const standards = [
  { title: 'A written, itemized scope', text: 'You see every line before work starts. Changes are written up and approved first.' },
  { title: 'No subcontractor roulette', text: 'Work is controlled and held accountable in-house, not handed to whoever is free.' },
  { title: 'Predictable timelines', text: 'Standard scheduling you can plan around, with expedited service when a move-in will not wait.' },
  { title: 'Photos when it is done', text: 'A photo report for your file, the owner, or the other side of the deal.' },
  { title: 'Transparent pricing', text: 'Clear rates by scope, and recurring per-unit pricing for communities on a schedule.' },
  { title: 'We come back', text: 'Tell us anything we missed and we respond immediately. You should not have to touch it again.' },
];

export const process = [
  { step: 'Walkthrough', time: 'Day 0', text: 'We walk the property with you or your maintenance lead and photograph every item.' },
  { step: 'Written scope', time: 'Day 1', text: 'An itemized estimate in writing. Nothing starts until you approve it.' },
  { step: 'Execution', time: 'Day 2+', text: 'One crew works the scope on a set schedule, with updates as work lands.' },
  { step: 'Final walk', time: 'Keys back', text: 'We walk it again, finish touch-ups, and hand back a unit ready to show, with photos.' },
];

export const faqs = [
  {
    q: 'Where do you work?',
    a: 'Across Hampton Roads: Norfolk, Virginia Beach, Chesapeake, Portsmouth, Suffolk, Hampton and Newport News. Send the address and we will confirm.',
  },
  {
    q: 'Can you handle a whole portfolio, not just one unit?',
    a: 'Yes. Multi-unit turns get the same checklist and the same standard on every door. Communities on a recurring schedule can get flat per-unit pricing and consolidated invoices.',
  },
  {
    q: 'What if the unit needs more than cleaning?',
    a: 'Paint, drywall, flooring, fixtures, carpentry and haul-off are handled by the same crew. Special conditions like pet odor or heavy soil are scoped separately and approved before work begins.',
  },
  {
    q: 'How fast can you turn a unit?',
    a: 'It depends on condition and scope. One documented apartment turnover in our gallery took five days; that is an example, not a promise for every unit. The walkthrough gives you a real date.',
  },
  {
    q: 'Can you get set up as a vendor?',
    a: 'Yes. We send a W-9, certificate of insurance and capability statement, and we work to your work order numbers.',
  },
];
