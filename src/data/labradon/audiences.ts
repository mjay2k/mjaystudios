// The four people the site is built to win, weighted equally. Each one drives
// the "I need to..." switcher, the audience doors, and step two of the request form.

export type AudienceId = 'pm' | 'homeowner' | 'agent' | 'commercial';

export type Field = {
  name: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'select' | 'textarea';
  options?: string[];
  optional?: boolean;
  placeholder?: string;
};

export type Audience = {
  id: AudienceId;
  who: string;
  task: string;
  headline: string;
  text: string;
  points: string[];
  photo: 'apartment' | 'kitchen' | 'bedroom' | 'painting';
  cta: string;
  fields: Field[];
};

export const audiences: Audience[] = [
  {
    id: 'pm',
    who: 'Property managers and investors',
    task: 'Turn a rental unit',
    headline: 'Keys back sooner. Nothing left for your team.',
    text: 'Every vacant day costs rent. One crew handles the clean, the paint, the floors and the punch list, on one schedule and one invoice.',
    points: ['Light, standard and total turn packages', 'Same checklist on every door', 'Photo report and your WO number on the invoice'],
    photo: 'apartment',
    cta: 'Request a turn',
    fields: [
      { name: 'address', label: 'Property address', type: 'text', placeholder: 'Street, city' },
      { name: 'moveOut', label: 'Move-out date', type: 'date' },
      { name: 'units', label: 'Units to turn', type: 'number', placeholder: '1' },
      { name: 'scope', label: 'What does it need?', type: 'select', options: ['Light turn (clean only)', 'Standard turn (clean + repairs)', 'Total turn (paint, floors, refresh)', 'Not sure yet, walk it with me'] },
      { name: 'wo', label: 'Work order number', type: 'text', optional: true },
    ],
  },
  {
    id: 'homeowner',
    who: 'Homeowners',
    task: 'Sell or rent my home',
    headline: 'Get it ready to rent or sell.',
    text: 'Repairs, paint, flooring and a real deep clean, so your home shows well and you get top value. One call instead of five contractors.',
    points: ['Repairs, paint and flooring', 'Move-out and deep cleaning', 'Clean-outs and haul-off'],
    photo: 'kitchen',
    cta: 'Get an estimate',
    fields: [
      { name: 'address', label: 'Property address', type: 'text', placeholder: 'Street, city' },
      { name: 'plan', label: 'What is next for the home?', type: 'select', options: ['Selling', 'Renting it out', 'Moving out', 'Just needs work'] },
      { name: 'need', label: 'What needs done?', type: 'textarea', placeholder: 'Paint, flooring, repairs, cleaning...' },
      { name: 'timing', label: 'When do you need it?', type: 'select', options: ['As soon as possible', 'Within 2 weeks', 'Within a month', 'Just planning'] },
    ],
  },
  {
    id: 'agent',
    who: 'Real estate agents',
    task: 'Clear an inspection list',
    headline: 'Fix the repair list. Close on time.',
    text: 'One number for the pre-listing refresh, the inspection addendum and the HOA letter. Priced in writing, scheduled around your deal, with photos for both sides.',
    points: ['Pre-listing paint, touch-ups and clean', 'Inspection and repair addendum items', 'Photos of completed items for your file'],
    photo: 'bedroom',
    cta: 'Send a repair list',
    fields: [
      { name: 'address', label: 'Property address', type: 'text', placeholder: 'Street, city' },
      { name: 'deadline', label: 'Listing or closing date', type: 'date' },
      { name: 'list', label: 'Repair list', type: 'textarea', placeholder: 'Paste the addendum items or describe the work' },
    ],
  },
  {
    id: 'commercial',
    who: 'Businesses and facilities',
    task: 'Service a facility',
    headline: 'Clean, safe and open on schedule.',
    text: 'Facility cleaning, retail support, job-site sanitation and repairs, scheduled around your hours so your people and customers never notice we were there.',
    points: ['Facility and janitorial cleaning', 'Construction site sanitation', 'Recurring schedules, consolidated invoices'],
    photo: 'painting',
    cta: 'Request a site visit',
    fields: [
      { name: 'facility', label: 'Business or facility type', type: 'text', placeholder: 'Office, retail, job site...' },
      { name: 'size', label: 'Approximate square footage', type: 'text', optional: true },
      { name: 'service', label: 'Service', type: 'select', options: ['Facility cleaning', 'Construction cleanup', 'Repairs or renovation', 'Debris removal', 'Something else'] },
      { name: 'frequency', label: 'How often?', type: 'select', options: ['One time', 'Weekly', 'Monthly', 'Per project'] },
    ],
  },
];

export const audienceById = (id: string | undefined) => audiences.find((a) => a.id === id);
