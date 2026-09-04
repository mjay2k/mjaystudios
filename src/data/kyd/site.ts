// Kentucky Dom — single source of truth for identity, message, socials, contact.
// Sourced 2026-09-04 from kentuckydom.com, his socials, press, and streaming pages.
// Every direction and shared page imports from here.

export interface Social {
  id: 'facebook' | 'tiktok' | 'instagram' | 'youtube' | 'x';
  label: string;
  handle: string;
  url: string;
  count?: string;
  countLabel?: string;
  primary?: boolean;
}

export const site = {
  name: 'Kentucky Dom',
  shortName: 'KY Dom',
  realName: 'Dominique "Dom" Cosby',
  hometown: 'Henderson, Kentucky',
  base: 'Nashville, Tennessee',
  domain: 'kentuckydom.com',

  // The line he uses to describe himself on Facebook.
  tagline: 'A modern voice for traditional American values.',
  // Three-word creed from his TikTok bio.
  creed: ['Faith', 'Family', 'Freedom'],
  // Official video tagline from One For The Country.
  genreLine: 'Country music, inspired by God, family, faith and cowboy culture.',

  // Phrases he repeats in his daily videos. Use as headlines and stamps.
  catchphrases: [
    'Unapologetically American',
    'Make America Pray Again',
    'Make America Country Again',
    'God Ova Everything',
    'Pray for USA',
    'Imma Cowboy, Babay',
    'We All American',
  ],

  // The message, in plain language, for hero and about copy.
  message: {
    headline: 'God first. Country second. Family always.',
    sub: 'Kentucky-born country artist, cowboy, and entrepreneur with a simple message: keep the main things the main things.',
    pillars: [
      {
        title: 'God',
        text: 'Raised on prayer and the rod. Every song, every show, every post starts there.',
      },
      {
        title: 'Country',
        text: 'One nation, one flag, no hyphens. American made, and proud to say it out loud.',
      },
      {
        title: 'Family',
        text: 'A daddy named Country and a coal-mine mama. The people who raised him are the reason he sings.',
      },
    ],
  },

  // Bio blocks. Rewritten from the 2021 EPK and 2022-2026 press, brought current.
  bio: {
    short:
      'Kentucky Dom is a country artist from Henderson, Kentucky, blending country, folk and a hip-hop cadence into songs about faith, family, trucks, horses and the American flag. A Wrangler and Montana Silversmiths model, entrepreneur, and community leader, he has built an audience of more than half a million by saying what a lot of people think and few will say on camera.',
    long: [
      'Born and raised in Henderson, Kentucky, Dominique "Dom" Cosby spent eight years in music before he found his own sound. He managed artists, wrote for other people, and cut Christian hip-hop under the name Anno Domini. In 2020 he put on the hat, picked up the twang, and released "Big Ol\' Truck" as Kentucky Dom.',
      'Since then he has put out more than a dozen singles and the EP One For The Country, filmed videos at rodeos, tank ranges and small-town taverns, modeled for Wrangler and Montana Silversmiths, and become one of the most-followed independent country voices on Facebook. In 2026 he signed with Baste Records and released "Face Like Mine", co-written with Chris Wallin and Ira Dean.',
      'Off stage he runs ARK ND Entertainment, founded the Tennis Bandits youth program in 2012, and posts nearly every day about God, country and common sense. He calls himself a modern voice for traditional American values. Most days that just means telling the truth in a cowboy hat.',
    ],
  },

  // Things he has actually said, with sources, for pull quotes.
  quotes: [
    {
      text: 'Artists of color can still be about the country, rodeo and things of rural living. Life and music doesn\'t have to be determined by the color of your skin. You do not need to fit a certain stereotype to enjoy the things you love.',
      source: 'The Hype Magazine, 2022',
    },
    {
      text: 'I just want to bring my two personal cultures together as one to share with the world.',
      source: 'Straight Official Magazine, 2022',
    },
    {
      text: 'I want to make music that provides hope for people.',
      source: 'WAVE 3 News, 2016',
    },
  ],

  // Lyric excerpts from the featured single, cleared for promo use on his own site.
  featuredLyric: {
    lines: ['Why do you look so surprised?', 'Why\'s it gotta be so black and white?', 'You\'re lookin\' at me like it don\'t sound right', 'Comin\' from a face like mine'],
    song: 'Face Like Mine',
  },

  socials: [
    { id: 'facebook', label: 'Facebook', handle: '@kentuckydom', url: 'https://www.facebook.com/kentuckydom/', count: '553K', countLabel: 'followers', primary: true },
    { id: 'tiktok', label: 'TikTok', handle: '@kentuckydom', url: 'https://www.tiktok.com/@kentuckydom', count: '49K', countLabel: 'followers' },
    { id: 'instagram', label: 'Instagram', handle: '@kentuckydommusic', url: 'https://www.instagram.com/kentuckydommusic/', count: '52K', countLabel: 'followers' },
    { id: 'youtube', label: 'YouTube', handle: '@kentuckydom', url: 'https://www.youtube.com/@kentuckydom', count: '307K', countLabel: 'views' },
    { id: 'x', label: 'X', handle: '@kentucky_dom', url: 'https://x.com/kentucky_dom' },
  ] as Social[],

  streaming: [
    { id: 'spotify', label: 'Spotify', url: 'https://open.spotify.com/artist/0fyvEJ08jA3uFt239SbEBM' },
    { id: 'apple', label: 'Apple Music', url: 'https://music.apple.com/us/artist/kentucky-dom/1520836746' },
    { id: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@kentuckydom' },
    { id: 'deezer', label: 'Deezer', url: 'https://www.deezer.com/artist/99119652' },
    { id: 'amazon', label: 'Amazon Music', url: 'https://www.amazon.com/s?k=Kentucky+Dom&i=digital-music' },
  ] as const,

  ids: {
    spotifyArtist: '0fyvEJ08jA3uFt239SbEBM',
    appleArtist: '1520836746',
    youtubeChannel: 'UCVNo3BtjfXRYTYI9HsyOOCg',
    gigwellAgency: '422563',
  },

  contact: {
    email: 'Info@kentuckydom.com',
    booking: 'Info@kentuckydom.com',
    label: 'Baste Records',
    company: 'ARK ND Entertainment',
  },

  brand: {
    wordmark: '/kyd/brand/wordmark.png', // 840x162, cream on transparent — needs a dark ground
    icon: '/kyd/brand/icon.png', // 300x300, KY DOM mark
  },

  nav: [
    { label: 'Music', href: '/kyd/music' },
    { label: 'Videos', href: '/kyd/music#videos' },
    { label: 'Store', href: '/kyd/store' },
    { label: 'About', href: '/kyd/about' },
    { label: 'Book', href: '/kyd/book' },
  ],
};

