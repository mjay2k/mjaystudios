import type { Metadata } from 'next';
import { Archivo, Frank_Ruhl_Libre, Hanken_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './labradon.css';
import './_lab/lab.css';

// Rent-Ready: one variable grotesk, squeezed narrow for display, normal for text.
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-lab-archivo', display: 'swap' });
// Work-order labels and figures.
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-lab-mono', display: 'swap' });
// The Finish: sturdy print serif for headlines (Cinzel small caps come from the root layout).
const frankRuhl = Frank_Ruhl_Libre({ subsets: ['latin'], variable: '--font-lab-serif', display: 'swap' });
const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-lab-hanken', display: 'swap' });

export const metadata: Metadata = {
  title: 'LabraDon Properties | Website preview',
  description: 'Website options for LabraDon Properties, a veteran-owned property services company serving Hampton Roads, Virginia.',
  robots: { index: false, follow: false },
  icons: { icon: '/labradon/brand/logo-mark.svg' },
};

// Fonts only. Each option scopes its own styles: the original two wrap
// themselves in .ld, the new directions and hub in .lab.
export default function LabradonLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${archivo.variable} ${plexMono.variable} ${frankRuhl.variable} ${hanken.variable}`}>{children}</div>;
}
