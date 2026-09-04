import type { Metadata } from 'next';
import { Anton, Barlow, Barlow_Condensed } from 'next/font/google';
import './kyd.css';
import { CartProvider } from './cart/CartProvider';
import CartDrawer from './cart/CartDrawer';

// Heavy condensed display for stamps and rally headlines (Unapologetic, Nashville).
const kydDisplay = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-kyd-display',
  display: 'swap',
});

// Workhorse sans for body copy, nav, buttons.
const kydSans = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-kyd-sans',
  display: 'swap',
});

// Condensed companion for labels, prices, track lists.
const kydCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-kyd-condensed',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kentucky Dom',
  description:
    'Kentucky Dom. Country music inspired by God, family, faith and cowboy culture. New single "Face Like Mine" out now.',
  icons: { icon: '/kyd/brand/icon.png' },
  openGraph: {
    title: 'Kentucky Dom',
    description: 'A modern voice for traditional American values.',
    images: ['/kyd/press/dom-goebel-29-mj.jpg'],
  },
};

export default function KydLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`kyd ${kydDisplay.variable} ${kydSans.variable} ${kydCondensed.variable}`}>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </div>
  );
}
