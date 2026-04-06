'use client'

import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import CameraRig from './CameraRig'
import AnamorphicFacade from './AnamorphicFacade'
import TheEye from './rooms/TheEye'
import TheMind from './rooms/TheMind'
import TheBuild from './rooms/TheBuild'
import TheFuture from './rooms/TheFuture'

function SceneContent() {
  return (
    <ScrollControls pages={6} damping={0.25}>
      <CameraRig />
      <AnamorphicFacade />
      <ambientLight intensity={0.3} />
      <TheEye />
      <TheMind />
      <TheBuild />
      <TheFuture />
    </ScrollControls>
  )
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1.6, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#ffffff']} />
        <SceneContent />
      </Canvas>
    </div>
  )
}
