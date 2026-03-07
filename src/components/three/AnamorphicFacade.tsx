'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Calculate world position for anamorphic alignment
function getAnamorphicPosition(
  screenX: number, // -1 to 1
  screenY: number, // -1 to 1
  depth: number,   // world Z position
  cameraZ: number = 5,
  cameraY: number = 1.6,
  fov: number = 75,
  aspect: number = 16 / 9
): [number, number, number] {
  const dist = cameraZ - depth
  const halfHeight = dist * Math.tan((fov * Math.PI / 180) / 2)
  const halfWidth = halfHeight * aspect
  return [
    screenX * halfWidth,
    cameraY + screenY * halfHeight,
    depth,
  ]
}

// Calculate scale so object appears a target size from the starting angle
function getAnamorphicScale(
  targetApparentSize: number,
  depth: number,
  cameraZ: number = 5
): number {
  const dist = cameraZ - depth
  const refDist = 5
  return targetApparentSize * (dist / refDist)
}

// Generate particle positions for text by sampling an offscreen canvas
function generateTextParticles(
  text: string,
  fontSize: number = 80,
  width: number = 600,
  height: number = 150,
  sampleCount: number = 200
): { x: number; y: number }[] {
  if (typeof document === 'undefined') return []

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return []

  ctx.fillStyle = 'black'
  ctx.font = `bold ${fontSize}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, width / 2, height / 2)

  const imageData = ctx.getImageData(0, 0, width, height)
  const points: { x: number; y: number }[] = []

  for (let i = 0; i < sampleCount * 10 && points.length < sampleCount; i++) {
    const px = Math.floor(Math.random() * width)
    const py = Math.floor(Math.random() * height)
    const idx = (py * width + px) * 4
    if (imageData.data[idx + 3] > 128) {
      points.push({
        x: (px / width) * 2 - 1,
        y: -((py / height) * 2 - 1),
      })
    }
  }
  return points
}

interface AnamorphicObject {
  id: string
  type: 'box' | 'sphere' | 'plane'
  screenPos: [number, number]
  depth: number
  scale: [number, number, number]
  color: string
  opacity?: number
}

function AnamorphicElement({
  obj,
  cameraZ,
  cameraY,
  fov,
  aspect,
}: {
  obj: AnamorphicObject
  cameraZ: number
  cameraY: number
  fov: number
  aspect: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  const worldPos = useMemo(
    () =>
      getAnamorphicPosition(
        obj.screenPos[0],
        obj.screenPos[1],
        obj.depth,
        cameraZ,
        cameraY,
        fov,
        aspect
      ),
    [obj.screenPos, obj.depth, cameraZ, cameraY, fov, aspect]
  )

  return (
    <mesh ref={ref} position={worldPos} scale={obj.scale}>
      {obj.type === 'box' && <boxGeometry args={[1, 1, 1]} />}
      {obj.type === 'sphere' && <sphereGeometry args={[0.5, 16, 16]} />}
      {obj.type === 'plane' && <planeGeometry args={[1, 1]} />}
      <meshStandardMaterial
        color={obj.color}
        transparent={obj.opacity !== undefined}
        opacity={obj.opacity ?? 1}
      />
    </mesh>
  )
}

// Instanced particles for text
function TextParticles({
  text,
  screenCenter,
  screenScale,
  depthRange,
  color,
  particleSize,
  count,
}: {
  text: string
  screenCenter: [number, number]
  screenScale: number
  depthRange: [number, number]
  color: string
  particleSize: number
  count: number
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const [ready, setReady] = useState(false)

  // Generate particles client-side only
  useEffect(() => {
    if (!meshRef.current) return

    const points = generateTextParticles(text, 80, 600, 150, count)
    const dummy = new THREE.Object3D()
    const cameraZ = 5
    const cameraY = 1.6
    const fov = 75
    const aspect = window.innerWidth / window.innerHeight

    points.forEach((pt, i) => {
      const depth =
        depthRange[0] + Math.random() * (depthRange[1] - depthRange[0])
      const dist = cameraZ - depth
      const refDist = cameraZ - (depthRange[0] + depthRange[1]) / 2

      const sx = screenCenter[0] + pt.x * screenScale
      const sy = screenCenter[1] + pt.y * (screenScale * 0.3)

      const pos = getAnamorphicPosition(
        sx,
        sy,
        depth,
        cameraZ,
        cameraY,
        fov,
        aspect
      )
      dummy.position.set(pos[0], pos[1], pos[2])

      const s = particleSize * (dist / refDist)
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
    setReady(true)
  }, [text, screenCenter, screenScale, depthRange, count, particleSize])

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      visible={ready}
    >
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshStandardMaterial color={color} />
    </instancedMesh>
  )
}

export default function AnamorphicFacade() {
  const { viewport } = useThree()
  const aspect =
    typeof window !== 'undefined'
      ? window.innerWidth / window.innerHeight
      : 16 / 9
  const cameraZ = 5
  const cameraY = 1.6
  const fov = 75

  // Portfolio card objects -- 6 cards in 3x2 grid, each at different depths
  const cards: AnamorphicObject[] = useMemo(() => {
    const colors = [
      '#2563eb',
      '#dc2626',
      '#16a34a',
      '#9333ea',
      '#0891b2',
      '#f97316',
    ]
    const depths = [2, -3, 0.5, -8, 3, -5]
    const cardPositions: [number, number][] = [
      [-0.4, -0.15],
      [0, -0.15],
      [0.4, -0.15],
      [-0.4, -0.45],
      [0, -0.45],
      [0.4, -0.45],
    ]

    return cardPositions.map((pos, i) => {
      const depth = depths[i]
      const dist = cameraZ - depth
      const refDist = 5
      const baseScale = 0.12
      const s = baseScale * (dist / refDist)

      return {
        id: `card-${i}`,
        type: 'box' as const,
        screenPos: pos,
        depth,
        scale: [s * aspect, s * 0.75, s * 0.3] as [number, number, number],
        color: colors[i],
      }
    })
  }, [aspect])

  // Nav link planes at different depths
  const navLinks: AnamorphicObject[] = useMemo(() => {
    const positions: [number, number][] = [
      [-0.15, 0.42],
      [0.05, 0.42],
      [0.25, 0.42],
    ]
    const depths = [1, 3.5, -1]

    return positions.map((pos, i) => {
      const depth = depths[i]
      const dist = cameraZ - depth
      const refDist = 5
      const s = 0.04 * (dist / refDist)
      return {
        id: `nav-${i}`,
        type: 'plane' as const,
        screenPos: pos,
        depth,
        scale: [s * 2, s * 0.5, 0.01] as [number, number, number],
        color: '#666666',
        opacity: 0.7,
      }
    })
  }, [])

  // "Explore My World" button
  const buttonDepth = 1
  const buttonDist = cameraZ - buttonDepth
  const buttonScale = 0.05 * (buttonDist / 5)
  const buttonPos = useMemo(
    () =>
      getAnamorphicPosition(0, -0.25, buttonDepth, cameraZ, cameraY, fov, aspect),
    [aspect]
  )

  return (
    <group>
      {/* "Matthew Johnson" -- small particle text */}
      <TextParticles
        text="Matthew Johnson"
        screenCenter={[0, 0.25]}
        screenScale={0.25}
        depthRange={[-2, 4]}
        color="#999999"
        particleSize={0.015}
        count={150}
      />

      {/* "Created to" -- large particle text */}
      <TextParticles
        text="Created to"
        screenCenter={[0, 0.1]}
        screenScale={0.45}
        depthRange={[-5, 4]}
        color="#1a1a1a"
        particleSize={0.025}
        count={250}
      />

      {/* "Create" -- even larger particle text */}
      <TextParticles
        text="Create"
        screenCenter={[0, -0.05]}
        screenScale={0.35}
        depthRange={[-8, 3]}
        color="#1a1a1a"
        particleSize={0.03}
        count={200}
      />

      {/* Portfolio cards -- actual 3D boxes at wildly different depths */}
      {cards.map((card) => (
        <AnamorphicElement
          key={card.id}
          obj={card}
          cameraZ={cameraZ}
          cameraY={cameraY}
          fov={fov}
          aspect={aspect}
        />
      ))}

      {/* Nav link planes */}
      {navLinks.map((link) => (
        <AnamorphicElement
          key={link.id}
          obj={link}
          cameraZ={cameraZ}
          cameraY={cameraY}
          fov={fov}
          aspect={aspect}
        />
      ))}

      {/* "Explore My World" button -- rounded box */}
      <mesh
        position={buttonPos}
        scale={[buttonScale * 3, buttonScale * 0.8, buttonScale * 0.5]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Lighting for the white "page" feel */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
    </group>
  )
}
