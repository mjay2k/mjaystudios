'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

function GalleryWall({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <mesh position={position} rotation={rotation || [0, 0, 0]}>
      <boxGeometry args={[12, 5, 0.2]} />
      <meshStandardMaterial color="#f5f5f0" />
    </mesh>
  )
}

function ArtFrame({ position, color, title, rotation }: {
  position: [number, number, number]
  color: string
  title: string
  rotation?: [number, number, number]
}) {
  const glowRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <group position={position} rotation={rotation || [0, 0, 0]}>
      <mesh>
        <boxGeometry args={[2.2, 1.7, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[2, 1.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text position={[0, -1.1, 0.1]} fontSize={0.12} color="#666" anchorX="center">
        {title}
      </Text>
      <pointLight ref={glowRef} position={[0, 1, 0.5]} intensity={0.5} color="#fff5e0" distance={3} />
    </group>
  )
}

export default function TheEye() {
  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[14, 20]} />
        <meshStandardMaterial color="#e8e4de" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[14, 20]} />
        <meshStandardMaterial color="#fafafa" />
      </mesh>
      <GalleryWall position={[-6, 2, -5]} rotation={[0, Math.PI / 2, 0]} />
      <GalleryWall position={[6, 2, -5]} rotation={[0, -Math.PI / 2, 0]} />
      <GalleryWall position={[0, 2, -10]} />
      <Text position={[0, 3.2, 4]} fontSize={0.5} color="#333" anchorX="center">
        The Eye
      </Text>
      <Text position={[0, 2.7, 4]} fontSize={0.15} color="#999" anchorX="center">
        Design &amp; Advertising
      </Text>
      <ArtFrame position={[-5.8, 2, -2]} color="#2563eb" title="Berry's Barrier" rotation={[0, Math.PI / 2, 0]} />
      <ArtFrame position={[-5.8, 2, -6]} color="#dc2626" title="EPIC" rotation={[0, Math.PI / 2, 0]} />
      <ArtFrame position={[5.8, 2, -2]} color="#16a34a" title="Verdant" rotation={[0, -Math.PI / 2, 0]} />
      <ArtFrame position={[5.8, 2, -6]} color="#9333ea" title="Burnett's Vodka" rotation={[0, -Math.PI / 2, 0]} />
      <ArtFrame position={[-2.5, 2, -9.8]} color="#0891b2" title="Hpnotiq Sparkle" />
      <ArtFrame position={[2.5, 2, -9.8]} color="#f97316" title="Tufflite Film" />
      <pointLight position={[0, 3.5, -5]} intensity={1} color="#fff5e0" distance={20} />
      <pointLight position={[-4, 3, -3]} intensity={0.4} color="#fff5e0" distance={10} />
      <pointLight position={[4, 3, -7]} intensity={0.4} color="#fff5e0" distance={10} />
    </group>
  )
}
