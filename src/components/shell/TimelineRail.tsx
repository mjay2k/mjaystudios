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

// Number of decorative tick marks between each marker
const TICKS_BETWEEN = 4;

function generateTicks(markers: Marker[]) {
  const ticks: { position: number; isMarker: boolean; markerId?: string; label?: string }[] = [];

  // Add marker ticks
  markers.forEach((m) => {
    ticks.push({ position: m.position, isMarker: true, markerId: m.id, label: m.label });
  });

  // Add decorative ticks between markers
  const sorted = [...markers].sort((a, b) => a.position - b.position);
  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i].position;
    const end = sorted[i + 1].position;
    const step = (end - start) / (TICKS_BETWEEN + 1);
    for (let j = 1; j <= TICKS_BETWEEN; j++) {
      ticks.push({ position: start + step * j, isMarker: false });
    }
  }

  // Add a few ticks before first and after last
  if (sorted.length > 0) {
    const first = sorted[0].position;
    const last = sorted[sorted.length - 1].position;
    for (let i = 1; i <= 2; i++) {
      if (first - i * 0.03 > 0.02) {
        ticks.push({ position: first - i * 0.03, isMarker: false });
      }
      if (last + i * 0.03 < 0.98) {
        ticks.push({ position: last + i * 0.03, isMarker: false });
      }
    }
  }

  return ticks.sort((a, b) => a.position - b.position);
}

export default function TimelineRail({ markers }: TimelineRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const ticksRef = useRef<HTMLDivElement>(null);
  const currentSection = useAppStore((s) => s.currentSection);

  const ticks = generateTicks(markers);

  const activeMarkerId = useMemo(() => {
    if (!currentSection) return null;
    return markers.find((m) => m.id === currentSection.id)?.id ?? null;
  }, [currentSection, markers]);

  // Parallax: ticks scroll at 0.5x speed
  useEffect(() => {
    if (!ticksRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (!ticksRef.current) return;
        gsap.set(ticksRef.current, {
          y: self.progress * -150,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Animate ticks when active marker changes
  useEffect(() => {
    if (!ticksRef.current || !activeMarkerId) return;

    const tickEls = ticksRef.current.querySelectorAll('.rail-tick');
    tickEls.forEach((el) => {
      const tickPos = parseFloat(el.getAttribute('data-pos') ?? '0');
      const markerPos = markers.find((m) => m.id === activeMarkerId)?.position ?? 0;
      const distance = Math.abs(tickPos - markerPos);

      // Ticks near the active marker grow wider and brighter
      const isClose = distance < 0.12;
      const isVeryClose = distance < 0.05;
      const targetWidth = isVeryClose ? 32 : isClose ? 20 : 10;
      const targetOpacity = isVeryClose ? 1 : isClose ? 0.5 : 0.2;

      gsap.to(el, {
        width: targetWidth,
        opacity: targetOpacity,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  }, [activeMarkerId, markers]);

  return (
    <div
      ref={railRef}
      className="fixed top-0 left-0 z-40 hidden h-full w-12 md:block"
    >
      <div ref={ticksRef} className="relative h-full">
        {ticks.map((tick, i) => (
          <div
            key={i}
            className="absolute right-0 flex items-center"
            style={{ top: `${tick.position * 100}%` }}
          >
            {/* Label (only for markers with labels) */}
            {tick.isMarker && tick.label && (
              <span className="absolute right-full mr-3 whitespace-nowrap text-[9px] font-medium tracking-wider text-neutral-400 uppercase font-body">
                {tick.label}
              </span>
            )}

            {/* Tick bar */}
            <div
              className="rail-tick h-px bg-neutral-400 origin-right"
              data-pos={tick.position}
              style={{
                width: tick.isMarker ? 24 : 10,
                opacity: tick.isMarker ? 0.6 : 0.2,
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

  const ticks = generateTicks(markers);

  const activeMarkerId = useMemo(() => {
    if (!currentSection) return null;
    return markers.find((m) => m.id === currentSection.id)?.id ?? null;
  }, [currentSection, markers]);

  useEffect(() => {
    if (!ticksRef.current || !activeMarkerId) return;

    const tickEls = ticksRef.current.querySelectorAll('.rail-tick');
    tickEls.forEach((el) => {
      const tickPos = parseFloat(el.getAttribute('data-pos') ?? '0');
      const markerPos = markers.find((m) => m.id === activeMarkerId)?.position ?? 0;
      const distance = Math.abs(tickPos - markerPos);

      const isClose = distance < 0.12;
      const isVeryClose = distance < 0.05;

      gsap.to(el, {
        width: isVeryClose ? 20 : isClose ? 12 : 6,
        opacity: isVeryClose ? 1 : isClose ? 0.5 : 0.15,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  }, [activeMarkerId, markers]);

  return (
    <div className="fixed top-0 left-0 z-40 block h-full w-6 md:hidden">
      <div ref={ticksRef} className="relative h-full">
        {ticks.map((tick, i) => (
          <div
            key={i}
            className="absolute right-0 flex items-center"
            style={{ top: `${tick.position * 100}%` }}
          >
            <div
              className="rail-tick h-px bg-neutral-400 origin-right"
              data-pos={tick.position}
              style={{
                width: tick.isMarker ? 14 : 6,
                opacity: tick.isMarker ? 0.5 : 0.15,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export type { Marker };
