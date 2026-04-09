'use client';

import { useAppStore } from '@/stores/useAppStore';

interface AnimatedGradientProps {
  variant?: 'hero' | 'card' | 'popup';
  className?: string;
}

export default function AnimatedGradient({ variant = 'hero', className = '' }: AnimatedGradientProps) {
  const theme = useAppStore((s) => s.theme);
  const isDark = theme === 'dark';

  // Different gradient configs per variant and theme
  const gradients = {
    hero: isDark
      ? `
        radial-gradient(ellipse 80% 60% at 20% 40%, rgba(241,90,41,0.06) 0%, transparent 70%),
        radial-gradient(ellipse 60% 80% at 80% 20%, rgba(59,130,246,0.04) 0%, transparent 70%),
        radial-gradient(ellipse 70% 50% at 50% 80%, rgba(241,90,41,0.03) 0%, transparent 70%)
      `
      : `
        radial-gradient(ellipse 80% 60% at 20% 40%, rgba(241,90,41,0.07) 0%, transparent 70%),
        radial-gradient(ellipse 60% 80% at 80% 20%, rgba(200,200,200,0.3) 0%, transparent 70%),
        radial-gradient(ellipse 70% 50% at 50% 80%, rgba(241,90,41,0.04) 0%, transparent 70%)
      `,
    card: isDark
      ? `
        radial-gradient(ellipse 80% 60% at 30% 30%, rgba(241,90,41,0.05) 0%, transparent 70%),
        radial-gradient(ellipse 60% 70% at 70% 70%, rgba(59,130,246,0.03) 0%, transparent 70%)
      `
      : `
        radial-gradient(ellipse 80% 60% at 30% 30%, rgba(241,90,41,0.06) 0%, transparent 70%),
        radial-gradient(ellipse 60% 70% at 70% 70%, rgba(180,180,180,0.2) 0%, transparent 70%)
      `,
    popup: isDark
      ? `
        radial-gradient(ellipse 80% 60% at 20% 30%, rgba(241,90,41,0.15) 0%, transparent 70%),
        radial-gradient(ellipse 60% 80% at 80% 70%, rgba(59,130,246,0.10) 0%, transparent 70%),
        radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)
      `
      : `
        radial-gradient(ellipse 80% 60% at 20% 30%, rgba(241,90,41,0.10) 0%, transparent 70%),
        radial-gradient(ellipse 60% 80% at 80% 70%, rgba(160,160,160,0.25) 0%, transparent 70%),
        radial-gradient(ellipse 50% 40% at 50% 50%, rgba(241,90,41,0.06) 0%, transparent 70%)
      `,
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 animate-mesh-drift"
        style={{
          backgroundImage: gradients[variant],
          backgroundSize: '200% 200%',
        }}
      />
      <div
        className="absolute inset-0 animate-mesh-drift-reverse"
        style={{
          backgroundImage: gradients[variant],
          backgroundSize: '250% 250%',
          opacity: 0.5,
        }}
      />
    </div>
  );
}
