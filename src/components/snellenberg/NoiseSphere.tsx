'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vDisplacement;

  // Simplex 3D noise
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x4 = x_ * ns.x + ns.yyyy;
    vec4 y4 = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x4) - abs(y4);
    vec4 b0 = vec4(x4.xy, y4.xy);
    vec4 b1 = vec4(x4.zw, y4.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;

    float slowTime = uTime * 0.3;

    // Layered noise for organic displacement
    float noise1 = snoise(position * 1.5 + slowTime * 0.5) * 0.3;
    float noise2 = snoise(position * 3.0 + slowTime * 0.8) * 0.15;
    float noise3 = snoise(position * 6.0 + slowTime * 1.2) * 0.05;

    float displacement = noise1 + noise2 + noise3;

    // Mouse influence — bulge toward cursor
    vec3 mouseDir = normalize(vec3(uMouse.x, uMouse.y, 0.5));
    float mouseInfluence = max(0.0, dot(normalize(position), mouseDir));
    mouseInfluence = pow(mouseInfluence, 3.0) * uHover * 0.25;

    displacement += mouseInfluence;
    vDisplacement = displacement;

    vec3 newPosition = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;
  varying float vDisplacement;

  void main() {
    // Base color — warm cream to dark transition
    vec3 colorA = vec3(0.95, 0.92, 0.88); // warm cream
    vec3 colorB = vec3(0.12, 0.11, 0.10); // near black
    vec3 accent = vec3(0.94, 0.35, 0.16); // brand orange #F15A29

    // Mix based on displacement
    float t = smoothstep(-0.3, 0.4, vDisplacement);
    vec3 color = mix(colorB, colorA, t);

    // Add accent color at high displacement peaks
    float accentMix = smoothstep(0.25, 0.45, vDisplacement) * 0.4;
    color = mix(color, accent, accentMix);

    // Subtle fresnel-like edge glow
    float fresnel = pow(1.0 - abs(dot(vec3(0.0, 0.0, 1.0), normalize(vec3(vUv - 0.5, 0.5)))), 2.0);
    color += fresnel * 0.05;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uHover: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.elapsedTime;

    // Smooth mouse tracking
    const pointer = state.pointer;
    mouseRef.current.x += (pointer.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (pointer.y - mouseRef.current.y) * 0.05;
    material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

    // Smooth hover
    const targetHover = Math.sqrt(pointer.x * pointer.x + pointer.y * pointer.y) < 1.5 ? 1 : 0;
    hoverRef.current += (targetHover - hoverRef.current) * 0.03;
    material.uniforms.uHover.value = hoverRef.current;

    // Slow rotation
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  // Scale sphere based on viewport
  const scale = Math.min(viewport.width, viewport.height) * 0.38;

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function NoiseSphere({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Blob />
      </Canvas>
    </div>
  );
}
