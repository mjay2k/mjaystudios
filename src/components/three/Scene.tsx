'use client'

import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import { useAppStore } from '@/stores/useAppStore'
import CameraRig from './CameraRig'
import TheEye from './rooms/TheEye'
import TheMind from './rooms/TheMind'
import TheBuild from './rooms/TheBuild'
import TheFuture from './rooms/TheFuture'

function SceneContent() {
  return (
    <ScrollControls pages={5} damping={0.3}>
      <CameraRig />
      <ambientLight intensity={0.3} />
      <TheEye />
      <TheMind />
      <TheBuild />
      <TheFuture />
    </ScrollControls>
  )
}

export default function Scene() {
  const phase = useAppStore((s) => s.phase)

  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        opacity: phase === 'facade' ? 0 : 1,
        pointerEvents: phase === 'facade' ? 'none' : 'auto',
        transition: 'opacity 0.5s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 1.6, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        {phase !== 'facade' && <SceneContent />}
      </Canvas>
    </div>
  )
}
