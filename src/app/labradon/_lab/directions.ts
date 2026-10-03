// The four LabraDon options shown to the client, in the order the hub presents
// them. The first two are the new directions served by /labradon/[direction];
// the last two are the earlier ChatGPT directions, kept with light touch-ups.

export type DirectionId = 'rent-ready' | 'the-finish';

export const directions: Record<DirectionId, { name: string; short: string; tagline: string }> = {
  'rent-ready': {
    name: 'Rent-Ready',
    short: 'The operator',
    tagline: 'Swiss-industrial black and white, built like a work order.',
  },
  'the-finish': {
    name: 'The Finish',
    short: 'Cinematic, story-led',
    tagline: 'A black stage where the only color is finished work.',
  },
};

export const directionIds = Object.keys(directions) as DirectionId[];

export const isDirection = (v: string): v is DirectionId => v in directions;

export const options = [
  { id: 'rent-ready', number: '01', name: 'Rent-Ready', href: '/labradon/rent-ready' },
  { id: 'the-finish', number: '02', name: 'The Finish', href: '/labradon/the-finish' },
  { id: 'standard', number: '03', name: 'Property Standard', href: '/labradon/standard' },
  { id: 'partner', number: '04', name: 'Operating Partner', href: '/labradon/partner' },
] as const;

export type OptionId = (typeof options)[number]['id'] | 'hub';

/** Build a path inside a direction: href('rent-ready', 'work') -> /labradon/rent-ready/work */
export const href = (dir: DirectionId, path = '') => `/labradon/${dir}${path ? `/${path}` : ''}`;
