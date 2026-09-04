// Press mentions for the about page. Verified 2026-09-04.

export interface PressItem {
  outlet: string;
  title: string;
  date: string;
  url: string;
  blurb: string;
}

export const press: PressItem[] = [
  {
    outlet: 'City-County Observer',
    title: 'Kentucky Dom on music, business and mentorship',
    date: '2024-02-26',
    url: 'https://city-countyobserver.com/',
    blurb: 'Profile covering ARK ND Entertainment, the Tennis Bandits youth program, and the "We All American" message.',
  },
  {
    outlet: 'Tristate Homepage (WEHT / WTVW)',
    title: 'Kentucky Dom shoots music video in Henderson',
    date: '2023-04-19',
    url: 'https://www.tristatehomepage.com/',
    blurb: 'Henderson native returns home to film "Kick Back" with Coffey Anderson.',
  },
  {
    outlet: 'The Hype Magazine',
    title: 'Kentucky Dom: One For The Country',
    date: '2022-07-02',
    url: 'https://www.thehypemagazine.com/2022/07/02/kentucky-dom-one-for-the-country/',
    blurb: 'On bridging cultures: rodeo, rural living, and a hip-hop background brought together as one.',
  },
  {
    outlet: 'Straight Official Magazine',
    title: 'Kentucky Dom',
    date: '2022-07-06',
    url: 'https://www.straightofficial.com/kentucky-dom/',
    blurb: 'EP feature on One For The Country.',
  },
];
