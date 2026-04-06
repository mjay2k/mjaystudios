'use client'

import { portfolioItems } from '@/lib/portfolioData'

export default function WorkGrid() {
  return (
    <section id="work" className="px-8 py-24 max-w-6xl mx-auto">
      <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-12">
        Selected Work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            style={{ backgroundColor: item.color + '15' }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: item.color + '20' }}
            >
              <span className="text-4xl font-bold opacity-10" style={{ color: item.color }}>
                {item.title[0]}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-xs text-white/70 uppercase tracking-wider mb-1">
                {item.category}
              </p>
              <p className="text-white font-semibold">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
