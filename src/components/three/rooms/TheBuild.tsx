'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Line } from '@react-three/drei'
import * as THREE from 'three'

const CODE_LINES = [
  'const vision = await ai.create(dream)',
  'function buildImpossible() {',
  '  return reality.transcend()',
  'import { future } from "@mjay/studio"',
  '<Canvas><World /></Canvas>',
  'deploy(imagination, { target: "web" })',
  'const portfolio = shatter(expectations)',
  'export default function Amazing() {',
]

const TECH_STACK = [
  'React', 'Three.js', 'Next.js', 'TypeScript',
  'GSAP', 'Tailwind', 'AI Tools', 'WebGL',
]

function FloatingCode({ line, index }: { line: string; index: number }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.x = -4 + Math.sin(t * 0.3 + index * 0.7) * 0.5
  })

  return (
    <group ref={ref} position={[-4, 3 - index * 0.5, -60 - (index % 3) * 2]}>
      <Text fontSize={0.15} color="#22d3ee" anchorX="left" anchorY="middle">
        {line}
      </Text>
    </group>
  )
}

function TechOrb({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const angle = (index / TECH_STACK.length) * Math.PI * 2
  const radius = 3

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const currentAngle = angle + t * 0.3
    ref.current.position.x = Math.cos(currentAngle) * radius
    ref.current.position.z = -60 + Math.sin(currentAngle) * radius
    ref.current.position.y = 2 + Math.sin(t + index) * 0.3
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
    </mesh>
  )
}

function DataGrid() {
  const lines = useMemo(() => {
    const result: [THREE.Vector3, THREE.Vector3][] = []
    for (let i = -5; i <= 5; i += 1) {
      result.push([new THREE.Vector3(i, 0.01, -52), new THREE.Vector3(i, 0.01, -68)])
      result.push([new THREE.Vector3(-5, 0.01, -52 + i), new THREE.Vector3(5, 0.01, -52 + i)])
    }
    return result
  }, [])

  return (
    <group>
      {lines.map((pair, i) => (
        <Line key={i} points={pair} color="#06b6d4" transparent opacity={0.2} lineWidth={1} />
      ))}
    </group>
  )
}

export default function TheBuild() {
  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -60]}>
        <planeGeometry args={[14, 20]} />
        <meshStandardMaterial color="#050510" />
      </mesh>
      <DataGrid />
      <Text position={[0, 3.5, -52]} fontSize={0.5} color="#22d3ee" anchorX="center">
        The Build
      </Text>
      <Text position={[0, 3, -52]} fontSize={0.15} color="#06b6d4" anchorX="center">
        AI-Powered Development
      </Text>
      {CODE_LINES.map((line, i) => (
        <FloatingCode key={i} line={line} index={i} />
      ))}
      {TECH_STACK.map((tech, i) => (
        <TechOrb key={tech} index={i} />
      ))}
      <pointLight position={[0, 3, -60]} intensity={2} color="#06b6d4" distance={20} />
      <pointLight position={[-3, 1, -58]} intensity={1} color="#22d3ee" distance={8} />
      <pointLight position={[3, 1, -62]} intensity={1} color="#0891b2" distance={8} />
    </group>
  )
}
