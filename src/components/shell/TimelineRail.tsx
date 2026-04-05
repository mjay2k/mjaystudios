'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface Marker {
  id: string;
  label: string;
  position: number; // 0-1 normalized position along the rail
}

interface TimelineRailProps {
  markers: Marker[];
}

export default function TimelineRail({ markers }: TimelineRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!markersRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (!markersRef.current) return;
        gsap.set(markersRef.current, {
          y: self.progress * -200,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={railRef}
      className="fixed top-0 left-0 z-40 hidden h-full w-16 md:block"
    >
      <div className="absolute top-20 bottom-8 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-neutral-300" />

      <div ref={markersRef} className="relative h-full">
        {markers.map((marker) => (
          <div
            key={marker.id}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `${marker.position * 100}%` }}
          >
            <div className="h-px w-4 bg-neutral-400" />
            <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-medium tracking-wider text-neutral-400 uppercase">
              {marker.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimelineRailMobile({ markers }: TimelineRailProps) {
  return (
    <div className="fixed top-0 left-0 z-40 block h-full w-8 md:hidden">
      <div className="absolute top-20 bottom-8 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-neutral-200" />
      <div className="relative h-full">
        {markers.map((marker) => (
          <div
            key={marker.id}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `${marker.position * 100}%` }}
          >
            <div className="h-px w-2 bg-neutral-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

export type { Marker };
