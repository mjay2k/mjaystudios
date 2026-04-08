'use client';

import { useAppStore } from '@/stores/useAppStore';

export default function FloatingBubbles() {
  const theme = useAppStore((s) => s.theme);
  const aboutOpen = useAppStore((s) => s.aboutOpen);
  const contactOpen = useAppStore((s) => s.contactOpen);
  const detailProject = useAppStore((s) => s.detailProject);
  const isDark = theme === 'dark';

  // Elevate above content when a popup is open so bubbles show through backdrop
  const isPopupOpen = aboutOpen || contactOpen || !!detailProject;

  // Light: white/gray bubbles. Dark: darker subtle bubbles
  const colors = isDark
    ? ['#1a1a1a', '#222222', '#181818', '#252525']
    : ['#ffffff', '#d6d6d6', '#c0c0c0', '#ffffff'];

  const bubbles = [
    { color: 0, top: 8, left: 76, dur: 15, delay: -13, ox: -8, oy: -7, shadow: 7.17 },
    { color: 0, top: 32, left: 75, dur: 47, delay: -33, ox: 5, oy: -6, shadow: 7.43 },
    { color: 1, top: 72, left: 58, dur: 35, delay: -11, ox: 0, oy: 5, shadow: -6.57 },
    { color: 1, top: 54, left: 30, dur: 16, delay: -36, ox: -7, oy: -13, shadow: 7.08 },
    { color: 1, top: 47, left: 82, dur: 30, delay: -16, ox: 5, oy: -22, shadow: 6.53 },
    { color: 2, top: 68, left: 58, dur: 12, delay: -45, ox: -6, oy: 18, shadow: 6.59 },
    { color: 1, top: 12, left: 87, dur: 47, delay: -11, ox: 17, oy: -1, shadow: -7.12 },
    { color: 1, top: 23, left: 26, dur: 11, delay: -33, ox: -20, oy: -13, shadow: 7.05 },
    { color: 0, top: 60, left: 100, dur: 55, delay: -21, ox: -12, oy: -4, shadow: 6.76 },
    { color: 0, top: 38, left: 27, dur: 30, delay: -32, ox: 12, oy: -13, shadow: -6.93 },
    { color: 0, top: 7, left: 9, dur: 23, delay: -16, ox: -18, oy: -4, shadow: -7.10 },
    { color: 0, top: 55, left: 88, dur: 18, delay: -17, ox: 7, oy: 13, shadow: 7.16 },
    { color: 2, top: 69, left: 19, dur: 23, delay: -31, ox: 2, oy: -15, shadow: 7.04 },
    { color: 2, top: 32, left: 46, dur: 48, delay: -8, ox: 2, oy: -7, shadow: 6.59 },
    { color: 0, top: 62, left: 62, dur: 7, delay: -50, ox: -16, oy: -1, shadow: -7.19 },
    { color: 0, top: 63, left: 59, dur: 45, delay: -8, ox: 19, oy: 25, shadow: 7.00 },
    { color: 2, top: 4, left: 2, dur: 24, delay: -12, ox: -9, oy: -12, shadow: 6.99 },
    { color: 0, top: 100, left: 43, dur: 24, delay: -25, ox: 22, oy: 8, shadow: -6.70 },
    { color: 1, top: 64, left: 13, dur: 20, delay: -42, ox: 9, oy: 16, shadow: -7.48 },
    { color: 0, top: 80, left: 69, dur: 55, delay: -50, ox: 24, oy: -21, shadow: -6.73 },
    { color: 0, top: 25, left: 53, dur: 34, delay: -6, ox: 23, oy: -10, shadow: 6.50 },
    { color: 2, top: 89, left: 51, dur: 8, delay: -7, ox: 21, oy: -15, shadow: -7.18 },
    { color: 1, top: 27, left: 17, dur: 24, delay: -19, ox: 3, oy: -24, shadow: -6.66 },
    { color: 1, top: 96, left: 87, dur: 12, delay: -19, ox: 20, oy: 19, shadow: -6.69 },
    { color: 2, top: 93, left: 35, dur: 13, delay: -42, ox: 1, oy: 15, shadow: -6.82 },
  ];

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        background: isDark ? '#0a0a0a' : '#ebebeb',
        zIndex: isPopupOpen ? 95 : 1,
        transition: 'z-index 0s',
      }}
      aria-hidden="true"
    >
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            width: '26vmin',
            height: '26vmin',
            top: `${b.top}%`,
            left: `${b.left}%`,
            color: colors[b.color],
            animation: `bubble-move ${b.dur}s linear infinite`,
            animationDelay: `${b.delay}s`,
            transformOrigin: `${b.ox}vw ${b.oy}vh`,
            boxShadow: `${b.shadow > 0 ? '' : '-'}52vmin 0 ${Math.abs(b.shadow)}vmin currentColor`,
            backfaceVisibility: 'hidden',
          }}
        />
      ))}
    </div>
  );
}
