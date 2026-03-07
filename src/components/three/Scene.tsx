'use client'

import { Canvas } from '@react-three/fiber'
import { useAppStore } from '@/stores/useAppStore'

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </>
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
