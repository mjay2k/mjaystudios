import type { Metadata } from 'next';
import './labradon.css';

export const metadata: Metadata = {
  title: 'LabraDon Properties | Client design preview',
  description: 'Two website directions for LabraDon Properties, a veteran-owned property services company serving Hampton Roads, Virginia.',
  robots: { index: false, follow: false },
  icons: { icon: '/labradon/images/Black-and-white-logo.webp' },
};

export default function LabradonLayout({ children }: { children: React.ReactNode }) {
  return <div className="ld">{children}</div>;
}
