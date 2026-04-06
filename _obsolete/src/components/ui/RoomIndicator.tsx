'use client'

import { useAppStore } from '@/stores/useAppStore'

const ROOM_NAMES = ['The Eye', 'The Mind', 'The Build', 'The Future']
const ROOM_SUBS = ['Design & Advertising', 'Strategy & Vision', 'AI-Powered Dev', 'Contact']

export default function RoomIndicator() {
  const currentRoom = useAppStore((s) => s.currentRoom)
  const phase = useAppStore((s) => s.phase)

  if (phase !== 'gallery' || currentRoom < 0) return null

  return (
    <div className="fixed top-8 left-8 z-50 text-white">
      <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">
        {ROOM_SUBS[currentRoom] ?? ''}
      </p>
      <h2 className="text-2xl font-bold">{ROOM_NAMES[currentRoom] ?? ''}</h2>
      <div className="flex gap-2 mt-3">
        {ROOM_NAMES.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentRoom ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
