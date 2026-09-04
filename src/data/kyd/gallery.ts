// Press photos in /public/kyd/press. Dimensions baked in so next/image can
// reserve space without measuring. `tags` help each direction pick a mood.

export interface Photo {
  src: string;
  w: number;
  h: number;
  alt: string;
  tags: ('horse' | 'field' | 'barn' | 'denim' | 'dress' | 'studio' | 'bar' | 'crew' | 'portrait' | 'sky')[];
}

export const photos: Photo[] = [
  { src: '/kyd/press/dom-goebel-29-mj.jpg', w: 1483, h: 1483, alt: 'Kentucky Dom in a sherpa-lined Wrangler denim jacket and black hat, leaning on hay bales in a barn', tags: ['barn', 'denim', 'portrait'] },
  { src: '/kyd/press/kentucky-dom-9.jpg', w: 1600, h: 2405, alt: 'Kentucky Dom on horseback under a big cloudy sky', tags: ['horse', 'field', 'sky', 'portrait'] },
  { src: '/kyd/press/kentucky-dom-8.jpg', w: 1600, h: 1064, alt: 'Kentucky Dom riding across an open field, clouds overhead', tags: ['horse', 'field', 'sky'] },
  { src: '/kyd/press/kentucky-dom-7.jpg', w: 1600, h: 2405, alt: 'Kentucky Dom sitting tall on a bay horse in a plowed field', tags: ['horse', 'field', 'sky', 'portrait'] },
  { src: '/kyd/press/kentucky-dom-12.jpg', w: 1600, h: 2240, alt: 'Kentucky Dom on horseback, teal sky, second rider in the distance', tags: ['horse', 'field', 'sky', 'portrait'] },
  { src: '/kyd/press/kentucky-dom-149.jpg', w: 1600, h: 1065, alt: 'Kentucky Dom smiling beside a horse in a barn, American flag behind', tags: ['horse', 'barn'] },
  { src: '/kyd/press/kentucky-dom-3.jpg', w: 1600, h: 1064, alt: 'Kentucky Dom in a white pearl-snap shirt petting a horse', tags: ['horse', 'field'] },
  { src: '/kyd/press/kentucky-dom-19.jpg', w: 1600, h: 1064, alt: 'Kentucky Dom leaning on a fence post at golden hour', tags: ['field', 'portrait'] },
  { src: '/kyd/press/dom-goebel-1.jpg', w: 1600, h: 1064, alt: 'Kentucky Dom in denim by a red barn and hay bales', tags: ['barn', 'denim'] },
  { src: '/kyd/press/bluegrass-uk-11.jpg', w: 1600, h: 2405, alt: 'Kentucky Dom in a black hat and burgundy jacquard tux jacket stepping out of a truck', tags: ['dress', 'portrait'] },
  { src: '/kyd/press/bluegrass-uk-2.jpg', w: 1600, h: 2405, alt: 'Kentucky Dom in a tux jacket outside a red-and-grey storefront', tags: ['dress', 'portrait'] },
  { src: '/kyd/press/dom-refinery-1.jpg', w: 1600, h: 1064, alt: 'Kentucky Dom in a plaid shirt with coffee at a cafe table', tags: ['portrait'] },
  { src: '/kyd/press/dom-st-louis-41.jpg', w: 1600, h: 1064, alt: 'Kentucky Dom with his boots up in a recording studio', tags: ['studio'] },
  { src: '/kyd/press/born-and-raised-1.jpg', w: 1600, h: 1064, alt: 'Kentucky Dom playing a log drum kit in a vineyard', tags: ['field', 'crew'] },
  { src: '/kyd/press/born-and-raised-2-129.jpg', w: 1600, h: 1064, alt: 'Kentucky Dom and the Born & Raised video crew in a barn', tags: ['barn', 'crew'] },
  { src: '/kyd/press/tonka-tonka-bts-52.jpg', w: 1600, h: 1064, alt: 'Kentucky Dom at a card table in a tavern, Tonka Tonka video shoot', tags: ['bar', 'crew'] },
];

export const byTag = (tag: Photo['tags'][number]) => photos.filter((p) => p.tags.includes(tag));
export const portrait = photos.filter((p) => p.h > p.w);
export const landscape = photos.filter((p) => p.w > p.h);
