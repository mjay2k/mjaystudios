import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans, Fraunces, Cinzel, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

// Expressive editorial serif — used by the Monograph version
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-editorial',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

// App brand typefaces — used by the Warden product showcase
const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MJay Studios — Art Director Portfolio',
  description:
    'Portfolio of Matthew Johnson — Art Director, Designer, AI Developer.',
  icons: {
    icon: '/mjaystudios-logo-favi.svg',
    shortcut: '/mjaystudios-logo-favi.svg',
    apple: '/mjaystudios-logo-favi.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${jakarta.variable} ${fraunces.variable} ${cinzel.variable} ${playfair.variable}`}>
      <body className="text-neutral-900 antialiased font-body">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
