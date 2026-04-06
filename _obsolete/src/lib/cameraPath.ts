import * as THREE from 'three'

export const ROOM_POSITIONS = {
  eye:    new THREE.Vector3(0, 1.6, 0),
  mind:   new THREE.Vector3(0, 1.6, -30),
  build:  new THREE.Vector3(0, 1.6, -60),
  future: new THREE.Vector3(0, 1.6, -90),
}

export function createCameraPath(): THREE.CatmullRomCurve3 {
  const points = [
    new THREE.Vector3(0, 1.6, 5),       // Start: anamorphic view point
    new THREE.Vector3(0.5, 1.8, 3),     // Slight shift -- illusion starts breaking
    new THREE.Vector3(1, 2, 1),         // Moving through the particle cloud
    new THREE.Vector3(0, 1.6, 0),       // Room 1 entrance
    new THREE.Vector3(0, 2, -15),       // Transition
    new THREE.Vector3(0, 1.6, -30),     // Room 2
    new THREE.Vector3(2, 1.6, -45),     // Transition
    new THREE.Vector3(0, 1.6, -60),     // Room 3
    new THREE.Vector3(0, 2.5, -75),     // Transition
    new THREE.Vector3(0, 1.6, -90),     // Room 4
    new THREE.Vector3(0, 1.6, -95),     // End
  ]
  return new THREE.CatmullRomCurve3(points)
}

export function getRoomFromProgress(progress: number): number {
  if (progress < 0.15) return -1 // Still in facade zone
  if (progress < 0.35) return 0
  if (progress < 0.55) return 1
  if (progress < 0.75) return 2
  return 3
}
