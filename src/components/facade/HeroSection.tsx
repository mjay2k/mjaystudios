'use client'

import { useAppStore } from '@/stores/useAppStore'

export default function HeroSection() {
  const triggerShatter = useAppStore((s) => s.triggerShatter)

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
        Matthew Johnson
      </p>
      <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 leading-tight">
        Created to<br />Create
      </h1>
      <p className="text-lg text-gray-500 max-w-md mb-12">
        Designer. Visionary. Builder.<br />
        Turning ideas into experiences that move people.
      </p>
      <button
        onClick={triggerShatter}
        className="group relative px-8 py-4 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Explore My World
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
          or just scroll down
        </span>
      </button>
    </section>
  )
}
