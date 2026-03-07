import dynamic from 'next/dynamic'
import FacadePortfolio from '@/components/facade/FacadePortfolio'

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false })
const ShatterOverlay = dynamic(() => import('@/components/facade/ShatterOverlay'), { ssr: false })

export default function Home() {
  return (
    <main>
      <FacadePortfolio />
      <ShatterOverlay />
      <Scene />
    </main>
  )
}
