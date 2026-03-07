import dynamic from 'next/dynamic'
import FacadePortfolio from '@/components/facade/FacadePortfolio'

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false })

export default function Home() {
  return (
    <main>
      <FacadePortfolio />
      <Scene />
    </main>
  )
}
