'use client'

import dynamic from 'next/dynamic'
import GalleryUI from '@/components/ui/GalleryUI'

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false })

export default function Home() {
  return (
    <main>
      <Scene />
      <GalleryUI />
    </main>
  )
}
