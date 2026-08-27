// Giving details as published on jesusanoints.com/give.
// Kept in its own module (rather than inside the `as const` site object) so
// every method shares one shape with optional fields.

export type GivingRow = { label: string; value: string };

export type GivingMethod = {
  region: string;
  note: string;
  rows: GivingRow[];
  primary?: boolean;
  fine?: string;
  link?: { label: string; href: string };
};

export const givingVerse = {
  text: 'Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap. For with the measure you use, it will be measured to you.',
  ref: 'Luke 6:38',
};

export const givingLead =
  'We are deeply grateful for every prayer and every gift. Through your partnership this ministry reaches thousands around the world with the teaching of Jesus Christ. We trust God as our provider, and your support allows the gospel to go further.';

export const givingSupports =
  'Beyond our own work, this ministry regularly supports St. Jude Children’s Research Hospital, Amani for Africa, and pastors and missionaries serving in the field internationally.';

export const givingMethods: GivingMethod[] = [
  {
    region: 'United States',
    primary: true,
    note: 'Give securely online through our Church Center giving page.',
    link: {
      label: 'Give online',
      href: 'https://jesusanointsministries.churchcenter.com/giving',
    },
    rows: [{ label: 'Zelle (no fee)', value: 'Samueltiffany7@aol.com' }],
    fine: 'Card gifts incur a 2.9% + $0.30 processing fee; bank transfers cost only $0.30, so more of your gift reaches the ministry.',
  },
  {
    region: 'India',
    note: 'Gifts within India can be sent directly to the ministry account.',
    rows: [
      { label: 'Bank', value: 'Indian Overseas Bank' },
      { label: 'Account', value: '040201000024257' },
      { label: 'IFC Code', value: '10BA0000402' },
      { label: 'Branch', value: 'No. 9/203 Raja Street, Gudur, India 524101' },
    ],
  },
  {
    region: 'International',
    note: 'Giving from elsewhere in the world? Write to us and we will send the options available in your country.',
    rows: [{ label: 'Email', value: 'JesusAnoints@aol.com' }],
  },
];
