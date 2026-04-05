import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MJay Studios — Art Director Portfolio',
  description:
    'Portfolio of Matthew Johnson — Art Director, Designer, AI Developer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
