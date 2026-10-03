// Documented LabraDon work, from his project gallery (labradonllc.com/project-gallery).
// Photos are built by scripts/prepare-labradon-photos.mjs into /labradon/photos.
// Before/after shots were taken from different spots. For slider pairs, each
// layer carries a CSS transform (solved from hand-picked landmarks like window
// corners and door frames) so the two halves line up; pairs that cannot line up
// are shown side by side (diptych) instead.

export const photo = (slug: string) => `/labradon/photos/${slug}.webp`;

export type Shot = {
  src: string;
  alt: string;
  w: number;
  h: number;
  /** CSS object-position inside the frame. */
  pos?: string;
  /** CSS transform on this layer (origin: center) to line it up with the other half. */
  transform?: string;
};

export type Pair = {
  id: string;
  room: string;
  scope: string;
  /** Frame aspect ratio, CSS syntax. */
  aspect: string;
  /** slider: halves line up; diptych: angles differ, show side by side. */
  mode: 'slider' | 'diptych';
  before: Shot;
  after: Shot;
};

export type Project = {
  id: string;
  title: string;
  kind: string;
  location: string;
  client?: string;
  duration?: string;
  summary: string;
  pairs: Pair[];
  extras: Shot[];
};

const shot = (slug: string, alt: string, w: number, h: number, extra: Partial<Shot> = {}): Shot => ({
  src: photo(slug),
  alt,
  w,
  h,
  ...extra,
});

export const chesapeake: Project = {
  id: 'chesapeake',
  title: 'Chesapeake home turnover',
  kind: 'Single-family turnover',
  location: 'Chesapeake, VA',
  client: 'Keyrenter Property Management of Hampton Roads',
  summary:
    'A worn single-family rental brought back to rent-ready: fresh paint and trim throughout, new flooring in every room, new light fixtures, and a new bathroom vanity and fixtures.',
  pairs: [
    {
      id: 'chesapeake-living',
      room: 'Living room',
      scope: 'Paint and trim throughout, new flooring',
      aspect: '4 / 3',
      mode: 'slider',
      before: shot('chesapeake-living-before', 'Chesapeake living room before: stained subfloor, dark trim, furniture left behind', 640, 480, { transform: 'translate(10.63%, 10.71%) scale(1.237)' }),
      after: shot('chesapeake-living-after', 'Chesapeake living room after: gray walls, white trim, new wood-look flooring', 1600, 1200),
    },
    {
      id: 'chesapeake-bed1',
      room: 'Bedroom one',
      scope: 'Carpet out, new flooring, paint, new light',
      aspect: '3 / 4',
      mode: 'slider',
      before: shot('chesapeake-bed1-before', 'Bedroom before: stained blue carpet and scuffed walls', 480, 640, { transform: 'translate(11.86%, 1.97%) rotate(-4deg) scale(1.325)' }),
      after: shot('chesapeake-bed1-after', 'Bedroom after: new flooring, fresh paint and a new ceiling light', 1200, 1600, { transform: 'scale(1.06)' }),
    },
    {
      id: 'chesapeake-bed2',
      room: 'Bedroom two',
      scope: 'Red carpet out, new flooring, paint and trim',
      aspect: '3 / 4',
      mode: 'diptych',
      before: shot('chesapeake-bed2-before', 'Bedroom before: worn red carpet and stained walls', 640, 480),
      after: shot('chesapeake-bed2-after', 'Bedroom after: wood-look flooring, gray walls and white trim', 1200, 1600),
    },
    {
      id: 'chesapeake-bed3',
      room: 'Bedroom three',
      scope: 'New flooring, paint, trim and fixture',
      aspect: '3 / 4',
      mode: 'slider',
      before: shot('chesapeake-bed3-before', 'Bedroom before: blue carpet and old wood door', 480, 640, { transform: 'translate(3.23%, -10.52%) rotate(-6.44deg) scale(1.28)' }),
      after: shot('chesapeake-bed3-after', 'Bedroom after: bright, freshly painted with new flooring', 1200, 1600, { transform: 'scale(1.17)' }),
    },
    {
      id: 'chesapeake-bath',
      room: 'Bathroom',
      scope: 'Wallpaper out, paint, new vanity, fixtures and flooring',
      aspect: '3 / 4',
      mode: 'diptych',
      before: shot('chesapeake-bath-before', 'Bathroom before: floral wallpaper and dated vanity', 480, 640),
      after: shot('chesapeake-bath-after', 'Bathroom after: painted walls, new vanity, black fixtures and new lighting', 1200, 1600),
    },
  ],
  extras: [shot('chesapeake-hall-after', 'Finished hallway with new flooring', 1200, 1600)],
};

export const apartment: Project = {
  id: 'apartment',
  title: 'Five-day apartment turnover',
  kind: 'Apartment turnover',
  location: 'Hampton Roads, VA',
  duration: '5 days',
  summary:
    'A full apartment turn in five days: refreshed cabinets and new countertops, fresh paint throughout, new flooring, and a deep clean.',
  pairs: [
    {
      id: 'apt-living',
      room: 'Living room',
      scope: 'Fresh paint throughout, new flooring',
      aspect: '3 / 4',
      mode: 'diptych',
      before: shot('apt-living-before', 'Apartment living room before: worn gray carpet and scuffed walls', 640, 480),
      after: shot('apt-living-after', 'Apartment living room after: new wood-look flooring and fresh paint', 480, 640),
    },
    {
      id: 'apt-kitchen',
      room: 'Kitchen',
      scope: 'Cabinets refreshed, new countertops, paint',
      aspect: '4 / 5',
      mode: 'diptych',
      before: shot('apt-kitchen-before', 'Kitchen before: yellowed cabinets and stained walls', 480, 640),
      after: shot('apt-kitchen-after', 'Kitchen after: white cabinets and marble-look countertops', 640, 480),
    },
    {
      id: 'apt-counter',
      room: 'Kitchen wall',
      scope: 'Drywall repaired, counters and cabinets',
      aspect: '4 / 5',
      mode: 'diptych',
      before: shot('apt-counter-before', 'Kitchen before: torn drywall behind the stove', 480, 640),
      after: shot('apt-counter-after', 'Kitchen after: new counters, white cabinets and new flooring', 640, 480),
    },
    {
      id: 'apt-bed',
      room: 'Bedroom',
      scope: 'Deep cleaned, new paint and flooring',
      aspect: '4 / 5',
      mode: 'diptych',
      before: shot('apt-bed-before', 'Bedroom before: stained walls and baseboard heater', 480, 640),
      after: shot('apt-bed-after', 'Bedroom after: new flooring and fresh paint', 480, 640),
    },
  ],
  extras: [shot('apt-bath-after', 'Finished apartment bathroom', 480, 640)],
};

export const projects = [chesapeake, apartment];

// Finished rooms from his turnover page. Confirm they are LabraDon jobs before launch.
export const finished = {
  kitchen: shot('kitchen-finished', 'Finished kitchen with white shaker cabinets, quartz counters and stainless appliances', 1800, 2400),
  apartment: shot('apartment-finished', 'Finished open-plan apartment with new flooring and fresh paint', 2400, 1800),
  bedroom: shot('bedroom-finished', 'Finished bedroom with new carpet and fresh paint', 2400, 1800),
};

export const people = {
  beach: shot('seth-donnie-beach', 'Seth French kneeling on the beach with his black Labrador, Donnie', 1536, 2048),
  donnie: shot('donnie', 'Donnie, a black Labrador, grinning in the grass', 1179, 1560),
  painting: shot('crew-painting', 'A LabraDon crew member painting a ceiling edge', 1242, 2208),
  crew: shot('seth-crew', 'Seth and a crew member mid-job with paint rollers', 640, 480),
  portrait: shot('seth-portrait', 'Seth French in a suit and tie', 896, 1088),
};

export const allPairs = projects.flatMap((p) => p.pairs.map((pair) => ({ ...pair, project: p })));
export const pairById = (id: string) => allPairs.find((p) => p.id === id)!;
