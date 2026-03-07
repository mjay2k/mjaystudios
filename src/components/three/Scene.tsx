'use client'

import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import { useAppStore } from '@/stores/useAppStore'
import CameraRig from './CameraRig'

function SceneContent() {
  return (
    <ScrollControls pages={5} damping={0.3}>
      <CameraRig />
      <ambientLight intensity={0.3} />
      {/* Temporary markers for room positions */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[0, 1, -30]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
      <mesh position={[0, 1, -60]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#06b6d4" />
      </mesh>
      <mesh position={[0, 1, -90]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
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
