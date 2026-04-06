'use client'

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-sm">
      <div className="text-xl font-bold tracking-tight text-gray-900">
        MJay Studios
      </div>
      <div className="flex gap-8 text-sm font-medium text-gray-600">
        <a href="#work" className="hover:text-gray-900 transition-colors">Portfolio</a>
        <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
        <a href="#contact" className="hover:text-gray-900 transition-colors">Contact</a>
      </div>
    </nav>
  )
}
