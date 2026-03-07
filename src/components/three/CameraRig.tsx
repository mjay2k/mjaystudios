'use client'

import { useRef, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '@/stores/useAppStore'
import { createCameraPath, getRoomFromProgress } from '@/lib/cameraPath'

export default function CameraRig() {
  const navMode = useAppStore((s) => s.navMode)
  const setCurrentRoom = useAppStore((s) => s.setCurrentRoom)
  const setScrollProgress = useAppStore((s) => s.setScrollProgress)
  const scroll = useScroll()
  const { camera } = useThree()
  const path = useMemo(() => createCameraPath(), [])
  const lookAtPoint = useRef(new THREE.Vector3())

  const keys = useRef({ w: false, a: false, s: false, d: false })

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key in keys.current) keys.current[key as keyof typeof keys.current] = true
    }
    const onKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key in keys.current) keys.current[key as keyof typeof keys.current] = false
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    if (navMode === 'scroll') {
      const offset = scroll.offset
      setScrollProgress(offset)
      setCurrentRoom(getRoomFromProgress(offset))

      const point = path.getPointAt(offset)
      camera.position.lerp(point, 0.05)

      const lookAhead = Math.min(offset + 0.01, 1)
      const target = path.getPointAt(lookAhead)
      lookAtPoint.current.lerp(target, 0.05)
      camera.lookAt(lookAtPoint.current)
    } else {
      const speed = 5 * delta
      const direction = new THREE.Vector3()
      camera.getWorldDirection(direction)
      const right = new THREE.Vector3().crossVectors(direction, camera.up).normalize()

      if (keys.current.w) camera.position.addScaledVector(direction, speed)
      if (keys.current.s) camera.position.addScaledVector(direction, -speed)
      if (keys.current.a) camera.position.addScaledVector(right, -speed)
      if (keys.current.d) camera.position.addScaledVector(right, speed)
    }
  })

  return navMode === 'wasd' ? <PointerLockControls /> : null
}
