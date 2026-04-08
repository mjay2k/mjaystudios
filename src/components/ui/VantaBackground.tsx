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
        skyColor: isDark ? 0x0a0a0a : 0xf0ebe6,
        cloudColor: isDark ? 0x1a1a1a : 0xe0d8d0,
        cloudShadowColor: isDark ? 0x050505 : 0xc8beb2,
        sunColor: isDark ? 0xF15A29 : 0xF15A29,
        sunGlareColor: isDark ? 0x331008 : 0xf5ddd0,
        sunlightColor: isDark ? 0x1a0a04 : 0xf0d8c8,
        speed: 0.7,
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
      className={`absolute inset-0 ${className}`}
      style={{ opacity: theme === 'dark' ? 0.6 : 0.4 }}
      aria-hidden="true"
    />
  );
}
