import * as THREE from 'three'

export const ROOM_POSITIONS = {
  eye:    new THREE.Vector3(0, 1.6, 0),
  mind:   new THREE.Vector3(0, 1.6, -30),
  build:  new THREE.Vector3(0, 1.6, -60),
  future: new THREE.Vector3(0, 1.6, -90),
}

export function createCameraPath(): THREE.CatmullRomCurve3 {
  const points = [
    new THREE.Vector3(0, 1.6, 5),
    new THREE.Vector3(0, 1.6, 0),
    new THREE.Vector3(0, 2, -15),
    new THREE.Vector3(0, 1.6, -30),
    new THREE.Vector3(2, 1.6, -45),
    new THREE.Vector3(0, 1.6, -60),
    new THREE.Vector3(0, 2.5, -75),
    new THREE.Vector3(0, 1.6, -90),
    new THREE.Vector3(0, 1.6, -95),
  ]
  return new THREE.CatmullRomCurve3(points)
}

export function getRoomFromProgress(progress: number): number {
  if (progress < 0.25) return 0
  if (progress < 0.5) return 1
  if (progress < 0.75) return 2
  return 3
}
