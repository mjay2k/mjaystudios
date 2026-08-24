import type { Metadata } from 'next';
import { Cormorant_Garamond, Great_Vibes, Archivo } from 'next/font/google';
import './ja.css';

// Elegant high-contrast serif — the editorial voice of the Radiance direction.
const jaSerif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-ja-serif',
  display: 'swap',
});

// Formal script echoing the "Jesus Anoints" wordmark in the 2026-08 logo.
const jaScript = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-ja-script',
  display: 'swap',
});

// Heavy grotesque for the Sent direction's statement typography.
const jaDisplay = Archivo({
  subsets: ['latin'],
  weight: ['500', '700', '800', '900'],
  variable: '--font-ja-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jesus Anoints Ministries',
  description:
    'A non-denominational, Holy Spirit–filled Christian ministry — touching the world, one soul at a time.',
  icons: {
    icon: '/jaministries/brand/icon-gold.svg',
  },
};

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`ja ${jaSerif.variable} ${jaScript.variable} ${jaDisplay.variable}`}>
      {children}
    </div>
  );
}
