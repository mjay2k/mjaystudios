// Official music videos on YouTube, newest first. Thumbnails come from
// https://i.ytimg.com/vi/<id>/maxresdefault.jpg (fall back to hqdefault).

export interface Video {
  id: string;
  title: string;
  date: string;
  views?: string;
  note?: string;
}

export const videos: Video[] = [
  { id: 'warCDwrgJ6Y', title: 'Face Like Mine', date: '2026-08-14', views: '2K', note: 'Official video, Baste Records.' },
  { id: 'ZcHmGf2nEDo', title: 'Kick Back ft. Coffey Anderson', date: '2023-06-23', views: '10K' },
  { id: '10avSzNVcSw', title: 'Cowfolk Bougie ft. Taylor Hogan', date: '2022-10-11', views: '3.5K' },
  { id: 'vIjE4JouDss', title: 'One For The Country', date: '2022-06-03', views: '15K' },
  { id: '-Y8n2w-h2ME', title: 'Guns & Hoses', date: '2021-08-28', views: '18K' },
  { id: 'r8n4D5Ypnss', title: 'We All American', date: '2021-05-30', views: '20K' },
  { id: 'sxxMwkrxWlM', title: 'Tonka Tonka', date: '2021-03-11', views: '16K' },
  { id: 'cFCcfM2NLpI', title: 'Born & Raised', date: '2020-10-18', views: '75K' },
  { id: 'eWF5QaoTqP8', title: "Big Ol' Truck", date: '2020-06-26', views: '91K' },
];

export const thumb = (id: string, size: 'max' | 'hq' = 'max') =>
  `https://i.ytimg.com/vi/${id}/${size === 'max' ? 'maxresdefault' : 'hqdefault'}.jpg`;

export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
