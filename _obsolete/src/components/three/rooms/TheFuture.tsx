'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

function Stars() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const count = 500
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = Math.random() * 20
      pos[i * 3 + 2] = -80 - Math.random() * 30
    }
    return pos
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

function ContactLink({ text, position }: {
  text: string
  position: [number, number, number]
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1
  })

  return (
    <group ref={ref} position={position}>
      <Text fontSize={0.25} color="#10b981" anchorX="center" anchorY="middle">
        {text}
      </Text>
    </group>
  )
}

export default function TheFuture() {
  return (
    <group position={[0, 0, 0]}>
      <Stars />
      <Text position={[0, 3, -83]} fontSize={0.6} color="#10b981" anchorX="center">
        The Future
      </Text>
      <Text position={[0, 2.4, -83]} fontSize={0.2} color="#6ee7b7" anchorX="center">
        {"Let's build something together"}
      </Text>
      <ContactLink text="LinkedIn" position={[-2, 1.6, -88]} />
      <ContactLink text="Email" position={[0, 1.6, -88]} />
      <ContactLink text="mjaystudios.com" position={[2, 1.6, -88]} />
      <Text position={[0, 1, -90]} fontSize={0.15} color="#4ade80" anchorX="center">
        Designer. Visionary. Builder.
      </Text>
      <pointLight position={[0, 5, -88]} intensity={1.5} color="#10b981" distance={25} />
      <ambientLight intensity={0.1} />
    </group>
  )
}
