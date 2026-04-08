'use client';

import { useRef, useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';

interface VantaBackgroundProps {
  className?: string;
}

export default function VantaBackground({ className = '' }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaEffect = useRef<any>(null);
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    if (typeof window === 'undefined' || !vantaRef.current) return;

    let cancelled = false;

    function createEffect() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (cancelled || !vantaRef.current || !(window as any).VANTA) return;

      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }

      const isDark = document.documentElement.classList.contains('dark');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vantaEffect.current = (window as any).VANTA.CLOUDS({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        skyColor: isDark ? 0x080808 : 0xd4cec6,
        cloudColor: isDark ? 0x222222 : 0xa09488,
        cloudShadowColor: isDark ? 0x000000 : 0x8a7e72,
        sunColor: isDark ? 0xF15A29 : 0xF15A29,
        sunGlareColor: isDark ? 0x4a1a08 : 0xf0b090,
        sunlightColor: isDark ? 0x2a0e04 : 0xe8c0a0,
        speed: 0.8,
      });
    }

    // If already loaded
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).VANTA) {
      createEffect();
      return () => {
        cancelled = true;
        if (vantaEffect.current) { vantaEffect.current.destroy(); vantaEffect.current = null; }
      };
    }

    // Load scripts
    const existingThree = document.querySelector('script[src*="three.min.js"]');
    if (existingThree) {
      const existingVanta = document.querySelector('script[src*="vanta.clouds"]');
      if (existingVanta) {
        existingVanta.addEventListener('load', createEffect);
      }
    } else {
      const threeScript = document.createElement('script');
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      threeScript.onload = () => {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js';
        vantaScript.onload = createEffect;
        document.head.appendChild(vantaScript);
      };
      document.head.appendChild(threeScript);
    }

    return () => {
      cancelled = true;
      if (vantaEffect.current) { vantaEffect.current.destroy(); vantaEffect.current = null; }
    };
  }, [theme]);

  return (
    <div
      ref={vantaRef}
      className={`absolute inset-0 -z-10 ${className}`}
      style={{ opacity: theme === 'dark' ? 0.8 : 0.7 }}
      aria-hidden="true"
    />
  );
}
