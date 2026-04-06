'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const CONCEPTS = [
  'Brand Strategy', 'Visual Storytelling', 'Consumer Psychology',
  'Creative Direction', 'Market Positioning', 'Design Thinking',
  'Campaign Architecture', 'Cultural Insight', 'Concept Development',
  'Art Direction', 'Audience Connection', 'Visual Impact',
]

function FloatingConcept({ text, index }: { text: string; index: number }) {
  const ref = useRef<THREE.Group>(null)
  const baseY = 1 + (index % 3) * 1.2
  const baseX = (index % 4 - 1.5) * 3
  const baseZ = -30 + Math.floor(index / 4) * -3

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = baseY + Math.sin(t * 0.5 + index) * 0.3
    ref.current.rotation.y = Math.sin(t * 0.3 + index * 0.5) * 0.1
  })

  return (
    <group ref={ref} position={[baseX, baseY, baseZ]}>
      <Text fontSize={0.25} color={`hsl(${270 + index * 15}, 80%, 70%)`} anchorX="center" anchorY="middle">
        {text}
      </Text>
    </group>
  )
}

function ConnectingLines() {
  const ref = useRef<THREE.LineSegments>(null)
  const geometry = useMemo(() => {
    const points: number[] = []
    for (let i = 0; i < 30; i++) {
      points.push(
        (Math.random() - 0.5) * 10, Math.random() * 3 + 0.5, -25 - Math.random() * 15,
        (Math.random() - 0.5) * 10, Math.random() * 3 + 0.5, -25 - Math.random() * 15,
      )
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return geo
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#8b5cf6" transparent opacity={0.15} />
    </lineSegments>
  )
}

export default function TheMind() {
  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -30]}>
        <planeGeometry args={[14, 20]} />
        <meshStandardMaterial color="#0a0a0f" />
      </mesh>
      <Text position={[0, 3.5, -22]} fontSize={0.5} color="#a78bfa" anchorX="center">
        The Mind
      </Text>
      <Text position={[0, 3, -22]} fontSize={0.15} color="#7c3aed" anchorX="center">
        Strategy &amp; Vision
      </Text>
      {CONCEPTS.map((text, i) => (
        <FloatingConcept key={text} text={text} index={i} />
      ))}
      <ConnectingLines />
      <pointLight position={[0, 3, -30]} intensity={2} color="#8b5cf6" distance={15} />
      <pointLight position={[-5, 1, -28]} intensity={1} color="#6d28d9" distance={10} />
      <pointLight position={[5, 1, -33]} intensity={1} color="#a78bfa" distance={10} />
    </group>
  )
}
