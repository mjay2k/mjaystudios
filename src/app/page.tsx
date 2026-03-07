'use client'

import dynamic from 'next/dynamic'
import FacadePortfolio from '@/components/facade/FacadePortfolio'
import GalleryUI from '@/components/ui/GalleryUI'

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false })
const ShatterOverlay = dynamic(() => import('@/components/facade/ShatterOverlay'), { ssr: false })

export default function Home() {
  return (
    <main>
      <FacadePortfolio />
      <ShatterOverlay />
      <Scene />
      <GalleryUI />
    </main>
  )
}
