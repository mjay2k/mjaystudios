// Discography, newest first. Art lives in /public/kyd/art (1200x1200).
// Stream links verified 2026-09-04. `feature` = Dom is a guest on someone else's record.

export type ReleaseType = 'single' | 'ep' | 'feature';

export interface Release {
  slug: string;
  title: string;
  type: ReleaseType;
  date: string; // YYYY-MM-DD
  year: number;
  label: string;
  art: string;
  /** Primary artist credit when it is not Kentucky Dom alone. */
  artist?: string;
  featuring?: string;
  tracks?: string[];
  links: {
    spotify?: string;
    apple?: string;
    deezer?: string;
    youtube?: string;
    amazon?: string;
    presave?: string;
  };
  /** YouTube video id for the official video, if one exists. */
  video?: string;
  featured?: boolean;
  note?: string;
}

export const releases: Release[] = [
  {
    slug: 'face-like-mine',
    title: 'Face Like Mine',
    type: 'single',
    date: '2026-08-14',
    year: 2026,
    label: "Baste Records / Real America's Music",
    art: '/kyd/art/face-like-mine-single.jpg',
    links: {
      spotify: 'https://open.spotify.com/track/7el6G8Z4pDm0QqCcnhtGsv',
      apple: 'https://music.apple.com/us/album/face-like-mine-single/6799000273',
      deezer: 'https://www.deezer.com/album/1050610092',
      youtube: 'https://www.youtube.com/watch?v=warCDwrgJ6Y',
      presave: 'https://too.fm/facelikemine',
    },
    video: 'warCDwrgJ6Y',
    featured: true,
    note: 'Written by Chris Wallin, Ira Dean and Kentucky Dom. Produced by Chris Wallin and Clarence Jey.',
  },
  {
    slug: 'walking-each-other-home',
    title: 'Walking Each Other Home',
    type: 'feature',
    date: '2026-02-20',
    year: 2026,
    label: 'Avid',
    art: '/kyd/art/walking-each-other-home-feat-kentucky-dom-the-kentucky-linem.jpg',
    artist: 'Tonja Rose',
    featuring: 'Kentucky Dom & The Kentucky Linemen',
    links: {
      apple: 'https://music.apple.com/us/album/walking-each-other-home-feat-kentucky-dom-the/1867222620',
    },
  },
  {
    slug: 'american-all-along',
    title: 'American All Along',
    type: 'single',
    date: '2026-01-19',
    year: 2026,
    label: 'ARK ND Entertainment',
    art: '/kyd/art/american-all-along-single.jpg',
    links: {
      apple: 'https://music.apple.com/us/album/american-all-along-single/1868292506',
      deezer: 'https://www.deezer.com/album/895505822',
    },
  },
  {
    slug: 'light-it-up',
    title: 'Light It Up (Shelbyville Chrysler)',
    type: 'single',
    date: '2026-01-16',
    year: 2026,
    label: 'ARK ND Entertainment',
    art: '/kyd/art/light-it-up-shelbyville-chrysler-single.jpg',
    links: {
      apple: 'https://music.apple.com/us/album/light-it-up-shelbyville-chrysler-single/1868310503',
      deezer: 'https://www.deezer.com/album/895556162',
    },
  },
  {
    slug: 'backroad-tobacco',
    title: 'Backroad Tobacco',
    type: 'single',
    date: '2025-07-04',
    year: 2025,
    label: 'ARK ND Entertainment',
    art: '/kyd/art/backroad-tobacco-single.jpg',
    links: {
      apple: 'https://music.apple.com/us/album/backroad-tobacco-single/1822652745',
      deezer: 'https://www.deezer.com/album/777374401',
    },
  },
  {
    slug: 'i-like-ya-remix',
    title: 'I Like Ya (Great Scott Remix)',
    type: 'feature',
    date: '2025-06-12',
    year: 2025,
    label: 'SugarBank Music',
    art: '/kyd/art/i-like-ya-feat-kdon-kentucky-dom-kpz-great-scott-remix-singl.jpg',
    artist: 'Katelyn Paige',
    featuring: 'KDON, Kentucky Dom & Kpz',
    links: {
      apple: 'https://music.apple.com/us/album/i-like-ya-feat-kdon-kentucky-dom-kpz-great-scott-remix-single/1812636431',
    },
  },
  {
    slug: 'i-like-ya',
    title: 'I Like Ya',
    type: 'feature',
    date: '2025-05-15',
    year: 2025,
    label: 'SugarBank Music',
    art: '/kyd/art/i-like-ya-feat-kdon-kentucky-dom-single.jpg',
    artist: 'Katelyn Paige',
    featuring: 'KDON & Kentucky Dom',
    links: {
      apple: 'https://music.apple.com/us/album/i-like-ya-feat-kdon-kentucky-dom-single/1812628846',
    },
  },
  {
    slug: '2-step',
    title: '2 Step',
    type: 'single',
    date: '2025-01-01',
    year: 2025,
    label: 'ARK ND Entertainment',
    art: '/kyd/art/2-step-feat-ofendaa-single.jpg',
    featuring: 'Ofendaa',
    links: {
      apple: 'https://music.apple.com/us/album/2-step-feat-ofendaa-single/1783019019',
      deezer: 'https://www.deezer.com/album/678289261',
    },
  },
  {
    slug: 'louis-vuitton-guitar',
    title: 'Louis Vuitton Guitar',
    type: 'single',
    date: '2024-05-12',
    year: 2024,
    label: 'ARK ND Entertainment',
    art: '/kyd/art/louis-vuitton-guitar-single.jpg',
    links: {
      apple: 'https://music.apple.com/us/album/louis-vuitton-guitar-single/1743868095',
      deezer: 'https://www.deezer.com/album/580772071',
    },
  },
  {
    slug: 'cool-being-country',
    title: 'Cool Being Country',
    type: 'single',
    date: '2023-08-25',
    year: 2023,
    label: 'ARK ND Entertainment',
    art: '/kyd/art/cool-being-country-single.jpg',
    links: {
      apple: 'https://music.apple.com/us/album/cool-being-country-single/1703513071',
      deezer: 'https://www.deezer.com/album/478591155',
    },
  },
  {
    slug: 'cowboy-hat',
    title: 'Cowboy Hat',
    type: 'single',
    date: '2023-07-21',
    year: 2023,
    label: 'ARK ND Entertainment',
    art: '/kyd/art/cowboy-hat-single.jpg',
    links: {
      spotify: 'https://open.spotify.com/track/5f8Cced6xEHUewtUUiDlbg',
      apple: 'https://music.apple.com/us/album/cowboy-hat-single/1692449567',
      deezer: 'https://www.deezer.com/album/453114215',
    },
  },
  {
    slug: 'kick-back',
    title: 'Kick Back',
    type: 'single',
    date: '2023-06-23',
    year: 2023,
    label: 'ARK ND Entertainment',
    art: '/kyd/art/kick-back-feat-coffey-anderson-single.jpg',
    featuring: 'Coffey Anderson',
    links: {
      spotify: 'https://open.spotify.com/track/1wRsFgRobffgieAA6YXWFL',
      apple: 'https://music.apple.com/us/album/kick-back-feat-coffey-anderson-single/1692448510',
      deezer: 'https://www.deezer.com/album/453070975',
      youtube: 'https://www.youtube.com/watch?v=ZcHmGf2nEDo',
    },
    video: 'ZcHmGf2nEDo',
    note: 'Shot in Henderson, Kentucky, with a cameo from Miss Kentucky 2023.',
  },
  {
    slug: 'in-my-truck',
    title: 'In My Truck',
    type: 'single',
    date: '2023-06-09',
    year: 2023,
    label: 'ARC ND Entertainment',
    art: '/kyd/art/in-my-truck-single.jpg',
    links: {
      apple: 'https://music.apple.com/us/album/in-my-truck-single/1690697118',
      deezer: 'https://www.deezer.com/album/448620315',
    },
  },
  {
    slug: 'darius-rucker-ii',
    title: 'Darius Rucker II',
    type: 'feature',
    date: '2023-05-05',
    year: 2023,
    label: 'No. More Records',
    art: '/kyd/art/darius-rucker-ii-single.jpg',
    artist: 'The Marine Rapper & Kentucky Dom',
    links: {
      apple: 'https://music.apple.com/us/album/darius-rucker-ii-single/1685435068',
      deezer: 'https://www.deezer.com/album/435606247',
    },
  },
  {
    slug: 'cowfolk-bougie',
    title: 'Cowfolk Bougie',
    type: 'single',
    date: '2022-10-11',
    year: 2022,
    label: 'ARC ND Entertainment',
    art: '/kyd/art/cowfolk-bougie-feat-taylor-hogan-single.jpg',
    featuring: 'Taylor Hogan',
    links: {
      spotify: 'https://open.spotify.com/track/4KEcIk3wwB3pxlOxYQq8Lk',
      apple: 'https://music.apple.com/us/album/cowfolk-bougie-feat-taylor-hogan-single/1648417881',
      deezer: 'https://www.deezer.com/album/363320867',
      youtube: 'https://www.youtube.com/watch?v=10avSzNVcSw',
    },
    video: '10avSzNVcSw',
  },
  {
    slug: 'one-for-the-country',
    title: 'One For The Country',
    type: 'ep',
    date: '2022-05-20',
    year: 2022,
    label: 'ARC ND Entertainment',
    art: '/kyd/art/one-for-the-country-ep.jpg',
    tracks: [
      'One For The Country',
      'Born & Raised',
      'She Belong To The Country',
      'We All American',
      'Tonka Tonka',
      "It's The Weekend",
    ],
    links: {
      spotify: 'https://open.spotify.com/album/5WDlaXjr61qt0B1oFHSk0J',
      apple: 'https://music.apple.com/us/album/one-for-the-country-ep/1624528802',
      deezer: 'https://www.deezer.com/album/319161797',
      youtube: 'https://www.youtube.com/watch?v=vIjE4JouDss',
    },
    video: 'vIjE4JouDss',
    note: 'Six tracks. Video shot at the Southern Indiana River City Rodeo.',
  },
  {
    slug: 'guns-and-hoses',
    title: 'Guns & Hoses',
    type: 'single',
    date: '2021-08-26',
    year: 2021,
    label: 'ARC ND Entertainment',
    art: '/kyd/art/guns-hoses-single.jpg',
    links: {
      apple: 'https://music.apple.com/us/album/guns-hoses-single/1580563639',
      deezer: 'https://www.deezer.com/album/250800092',
      youtube: 'https://www.youtube.com/watch?v=-Y8n2w-h2ME',
    },
    video: '-Y8n2w-h2ME',
    note: 'For the first responders of the Evansville Guns & Hoses charity fight.',
  },
  {
    slug: 'we-all-american',
    title: 'We All American',
    type: 'single',
    date: '2021-04-09',
    year: 2021,
    label: 'ARC ND Entertainment',
    art: '/kyd/art/we-all-american-single.jpg',
    links: {
      spotify: 'https://open.spotify.com/track/4uw8VU99xFVWliei2FXUA4',
      apple: 'https://music.apple.com/us/album/we-all-american-single/1561916852',
      deezer: 'https://www.deezer.com/album/220467602',
      youtube: 'https://www.youtube.com/watch?v=r8n4D5Ypnss',
    },
    video: 'r8n4D5Ypnss',
    note: 'Video shot at a tank range in Uvalde, Texas.',
  },
  {
    slug: 'tonka-tonka',
    title: 'Tonka Tonka',
    type: 'single',
    date: '2021-03-12',
    year: 2021,
    label: 'ARC ND Entertainment',
    art: '/kyd/art/tonka-tonka-single.jpg',
    links: {
      spotify: 'https://open.spotify.com/track/0uNHNLDWnJPhgTSUWFWnmq',
      apple: 'https://music.apple.com/us/album/tonka-tonka-single/1552796108',
      deezer: 'https://www.deezer.com/album/206298432',
      youtube: 'https://www.youtube.com/watch?v=sxxMwkrxWlM',
    },
    video: 'sxxMwkrxWlM',
  },
  {
    slug: 'born-and-raised',
    title: 'Born & Raised',
    type: 'single',
    date: '2020-10-19',
    year: 2020,
    label: 'Kentucky Dom',
    art: '/kyd/art/born-raised-single.jpg',
    links: {
      spotify: 'https://open.spotify.com/track/5hLpPrzTATKqXd2cbp9dql',
      apple: 'https://music.apple.com/us/album/born-raised-single/1533281303',
      deezer: 'https://www.deezer.com/album/175644302',
      youtube: 'https://www.youtube.com/watch?v=cFCcfM2NLpI',
    },
    video: 'cFCcfM2NLpI',
  },
  {
    slug: 'big-ol-truck',
    title: "Big Ol' Truck",
    type: 'single',
    date: '2020-06-26',
    year: 2020,
    label: 'Kentucky Dom',
    art: '/kyd/art/big-ol-truck-single.jpg',
    links: {
      spotify: 'https://open.spotify.com/track/6VxjDl4BX0zaKHpEAVyIJx',
      apple: 'https://music.apple.com/us/album/big-ol-truck-single/1520837510',
      deezer: 'https://www.deezer.com/album/157408022',
      amazon: 'https://www.amazon.com/Big-Ol-Truck-Kentucky-Dom/dp/B08CD42H25',
      youtube: 'https://www.youtube.com/watch?v=eWF5QaoTqP8',
    },
    video: 'eWF5QaoTqP8',
    note: 'The debut.',
  },
];

export const featuredRelease = releases.find((r) => r.featured) ?? releases[0];

/** Releases where Dom is the primary artist (drops guest features). */
export const ownReleases = releases.filter((r) => r.type !== 'feature');

export function getRelease(slug: string) {
  return releases.find((r) => r.slug === slug);
}

export function formatReleaseDate(date: string) {
  const d = new Date(date + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
