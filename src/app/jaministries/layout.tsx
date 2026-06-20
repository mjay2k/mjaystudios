import type { Metadata } from 'next';
import { Cormorant_Garamond } from 'next/font/google';
import './ja.css';

// Elegant high-contrast serif standing in for the Baskerville brand wordmark.
const jaSerif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-ja-serif',
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
  return <div className={`ja ${jaSerif.variable}`}>{children}</div>;
}
