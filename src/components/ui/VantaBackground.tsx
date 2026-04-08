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
        ...(isDark ? {
          // Dark: nighttime cloudy scene
          skyColor: 0x050510,
          cloudColor: 0x151525,
          cloudShadowColor: 0x000005,
          sunColor: 0x222240,
          sunGlareColor: 0x080818,
          sunlightColor: 0x101020,
        } : {
          // Light: pure black and white clouds
          skyColor: 0xd0d0d0,
          cloudColor: 0xffffff,
          cloudShadowColor: 0x909090,
          sunColor: 0xffffff,
          sunGlareColor: 0xe0e0e0,
          sunlightColor: 0xd8d8d8,
        }),
        speed: 0.6,
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
      style={{ opacity: 1 }}
      aria-hidden="true"
    />
  );
}
