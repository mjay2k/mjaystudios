'use client';

import { useRef, useEffect, useMemo } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';

interface Marker {
  id: string;
  label: string;
  position: number; // 0-1 normalized position along the rail
}

interface TimelineRailProps {
  markers: Marker[];
}

// Generate decorative ticks between markers
function generateTicks(markers: Marker[]) {
  const ticks: { position: number; isMarker: boolean; markerId?: string; label?: string }[] = [];

  markers.forEach((m) => {
    ticks.push({ position: m.position, isMarker: true, markerId: m.id, label: m.label });
  });

  const sorted = [...markers].sort((a, b) => a.position - b.position);
  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i].position;
    const end = sorted[i + 1].position;
    const count = 3;
    const step = (end - start) / (count + 1);
    for (let j = 1; j <= count; j++) {
      ticks.push({ position: start + step * j, isMarker: false });
    }
  }

  return ticks.sort((a, b) => a.position - b.position);
}

export default function TimelineRail({ markers }: TimelineRailProps) {
  const ticksRef = useRef<HTMLDivElement>(null);
  const currentSection = useAppStore((s) => s.currentSection);

  const ticks = useMemo(() => generateTicks(markers), [markers]);

  const activeMarkerId = useMemo(() => {
    if (!currentSection) return null;
    return markers.find((m) => m.id === currentSection.id)?.id ?? null;
  }, [currentSection, markers]);

  // Parallax offset
  useEffect(() => {
    if (!ticksRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (!ticksRef.current) return;
        gsap.set(ticksRef.current, {
          y: self.progress * -80,
        });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  // Animate tick widths based on active section
  useEffect(() => {
    if (!ticksRef.current) return;

    const tickEls = ticksRef.current.querySelectorAll('.rail-tick');
    tickEls.forEach((el) => {
      const tickPos = parseFloat(el.getAttribute('data-pos') ?? '0');
      const markerPos = activeMarkerId
        ? (markers.find((m) => m.id === activeMarkerId)?.position ?? 0)
        : -1;
      const distance = Math.abs(tickPos - markerPos);

      const isVeryClose = distance < 0.06;
      const isClose = distance < 0.15;

      gsap.to(el, {
        width: isVeryClose ? 28 : isClose ? 16 : 8,
        opacity: isVeryClose ? 0.8 : isClose ? 0.35 : 0.15,
        duration: 0.6,
        ease: 'power2.out',
      });
    });
  }, [activeMarkerId, markers]);

  // Rail area: top 80px (nav) to bottom 40px
  const railTop = 80;
  const railBottom = 40;

  return (
    <div className="fixed top-0 left-0 z-40 hidden h-full w-14 md:block">
      <div
        ref={ticksRef}
        style={{ top: railTop, bottom: railBottom, position: 'absolute', right: 0, left: 0 }}
      >
        {ticks.map((tick, i) => (
          <div
            key={i}
            className="absolute right-0 flex items-center justify-end"
            style={{ top: `${tick.position * 100}%` }}
          >
            {tick.isMarker && tick.label && (
              <span className="mr-2 whitespace-nowrap text-[9px] font-medium tracking-wider text-neutral-400 uppercase font-body">
                {tick.label}
              </span>
            )}
            <div
              className="rail-tick h-[1.5px] bg-neutral-900 rounded-full"
              data-pos={tick.position}
              style={{
                width: tick.isMarker ? 20 : 8,
                opacity: tick.isMarker ? 0.4 : 0.15,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimelineRailMobile({ markers }: TimelineRailProps) {
  const ticksRef = useRef<HTMLDivElement>(null);
  const currentSection = useAppStore((s) => s.currentSection);

  const ticks = useMemo(() => generateTicks(markers), [markers]);

  const activeMarkerId = useMemo(() => {
    if (!currentSection) return null;
    return markers.find((m) => m.id === currentSection.id)?.id ?? null;
  }, [currentSection, markers]);

  useEffect(() => {
    if (!ticksRef.current) return;

    const tickEls = ticksRef.current.querySelectorAll('.rail-tick');
    tickEls.forEach((el) => {
      const tickPos = parseFloat(el.getAttribute('data-pos') ?? '0');
      const markerPos = activeMarkerId
        ? (markers.find((m) => m.id === activeMarkerId)?.position ?? 0)
        : -1;
      const distance = Math.abs(tickPos - markerPos);

      const isVeryClose = distance < 0.06;
      const isClose = distance < 0.15;

      gsap.to(el, {
        width: isVeryClose ? 18 : isClose ? 10 : 5,
        opacity: isVeryClose ? 0.8 : isClose ? 0.35 : 0.12,
        duration: 0.6,
        ease: 'power2.out',
      });
    });
  }, [activeMarkerId, markers]);

  return (
    <div className="fixed top-0 left-0 z-40 block h-full w-7 md:hidden">
      <div
        ref={ticksRef}
        style={{ top: 72, bottom: 60, position: 'absolute', right: 0, left: 0 }}
      >
        {ticks.map((tick, i) => (
          <div
            key={i}
            className="absolute right-0 flex items-center justify-end"
            style={{ top: `${tick.position * 100}%` }}
          >
            <div
              className="rail-tick h-px bg-neutral-900 rounded-full"
              data-pos={tick.position}
              style={{
                width: tick.isMarker ? 12 : 5,
                opacity: tick.isMarker ? 0.3 : 0.12,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export type { Marker };
