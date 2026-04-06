import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MJay Studios — Created to Create',
  description: 'Portfolio of Matthew Johnson — Designer, Visionary, Builder. Explore an interactive 3D gallery of design, strategy, and AI-powered development.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  )
}
