'use client';

import { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';

interface Marker {
  id: string;
  label: string;
  tooltip?: string;
  position: number;
}

interface TimelineRailProps {
  markers: Marker[];
}

function generateTicks(markers: Marker[]) {
  const ticks: { position: number; isMarker: boolean; markerId?: string; label?: string; tooltip?: string }[] = [];

  markers.forEach((m) => {
    ticks.push({ position: m.position, isMarker: true, markerId: m.id, label: m.label, tooltip: m.tooltip });
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
  const tooltipRef = useRef<HTMLDivElement>(null);
  const currentSection = useAppStore((s) => s.currentSection);
  const [hoveredTick, setHoveredTick] = useState<{ tooltip: string; top: number } | null>(null);

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

  // Tooltip animation
  useEffect(() => {
    if (!tooltipRef.current) return;
    if (hoveredTick) {
      gsap.to(tooltipRef.current, { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' });
    } else {
      gsap.to(tooltipRef.current, { opacity: 0, x: 4, duration: 0.15, ease: 'power2.in' });
    }
  }, [hoveredTick]);

  const handleTickClick = useCallback((markerId: string) => {
    const el = document.getElementById(`section-${markerId}`);
    if (el) {
      gsap.to(window, {
        scrollTo: { y: el, offsetY: 80 },
        duration: 1,
        ease: 'power3.inOut',
      });
    }
    setHoveredTick(null);
  }, []);

  const handleTickHover = useCallback((tick: typeof ticks[0], e: React.MouseEvent) => {
    if (!tick.isMarker || !tick.tooltip) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHoveredTick({ tooltip: tick.tooltip, top: rect.top + rect.height / 2 });
  }, []);

  const railTop = 80;
  const railBottom = 40;

  return (
    <div className="fixed top-0 right-0 z-40 hidden h-full md:block" style={{ width: 80 }}>
      {/* Tooltip — appears to the left of the rail */}
      <div
        ref={tooltipRef}
        className="fixed z-50 pointer-events-none"
        style={{
          right: 84,
          top: hoveredTick?.top ?? 0,
          transform: 'translateY(-50%) translateX(4px)',
          opacity: 0,
        }}
      >
        <div className="rounded-md bg-neutral-900 px-3 py-1.5 text-[10px] font-medium text-white shadow-lg whitespace-nowrap font-body">
          {hoveredTick?.tooltip}
          {/* Arrow pointing right */}
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-neutral-900 rotate-45" />
        </div>
      </div>

      <div
        ref={ticksRef}
        style={{ top: railTop, bottom: railBottom, position: 'absolute', right: 0, left: 0 }}
      >
        {ticks.map((tick, i) => {
          const isInteractive = tick.isMarker && tick.markerId;

          return (
            <div
              key={i}
              className={`absolute right-0 flex items-center justify-end group ${isInteractive ? 'cursor-pointer' : ''}`}
              style={{ top: `${tick.position * 100}%`, padding: '6px 0' }}
              onMouseEnter={(e) => {
                if (!isInteractive) return;
                handleTickHover(tick, e);
                const tickEl = (e.currentTarget as HTMLElement).querySelector('.rail-tick');
                if (tickEl) gsap.to(tickEl, { width: 36, opacity: 1, duration: 0.25, ease: 'power2.out' });
              }}
              onMouseLeave={(e) => {
                setHoveredTick(null);
                const tickEl = (e.currentTarget as HTMLElement).querySelector('.rail-tick');
                if (tickEl) {
                  const tickPos = parseFloat(tickEl.getAttribute('data-pos') ?? '0');
                  const markerPos = activeMarkerId
                    ? (markers.find((m) => m.id === activeMarkerId)?.position ?? 0)
                    : -1;
                  const distance = Math.abs(tickPos - markerPos);
                  const isVeryClose = distance < 0.06;
                  const isClose = distance < 0.15;
                  gsap.to(tickEl, {
                    width: isVeryClose ? 28 : isClose ? 16 : tick.isMarker ? 24 : 10,
                    opacity: isVeryClose ? 0.8 : isClose ? 0.35 : tick.isMarker ? 0.4 : 0.15,
                    duration: 0.4,
                    ease: 'power2.out',
                  });
                }
              }}
              onClick={() => tick.markerId && handleTickClick(tick.markerId)}
            >
              {/* Label on the left side of the tick */}
              {tick.isMarker && tick.label && (
                <span className="mr-2 whitespace-nowrap text-[9px] font-medium tracking-wider text-neutral-400 uppercase font-body group-hover:text-neutral-700 transition-colors">
                  {tick.label}
                </span>
              )}
              {/* Tick bleeds off right edge */}
              <div
                className="rail-tick h-[1.5px] bg-neutral-900 rounded-l-full transition-colors"
                data-pos={tick.position}
                style={{
                  width: tick.isMarker ? 24 : 10,
                  opacity: tick.isMarker ? 0.4 : 0.15,
                  marginRight: tick.isMarker ? -4 : -2,
                }}
              />
            </div>
          );
        })}
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

  const handleTickClick = useCallback((markerId: string) => {
    const el = document.getElementById(`section-${markerId}`);
    if (el) {
      gsap.to(window, {
        scrollTo: { y: el, offsetY: 60 },
        duration: 1,
        ease: 'power3.inOut',
      });
    }
  }, []);

  // Mobile stays on the right too
  return (
    <div className="fixed top-0 right-0 z-40 block h-full w-5 md:hidden">
      <div
        ref={ticksRef}
        style={{ top: 72, bottom: 60, position: 'absolute', right: 0, left: 0 }}
      >
        {ticks.map((tick, i) => (
          <div
            key={i}
            className={`absolute right-0 flex items-center justify-end ${tick.isMarker ? 'cursor-pointer' : ''}`}
            style={{ top: `${tick.position * 100}%`, padding: '4px 0' }}
            onClick={() => tick.markerId && handleTickClick(tick.markerId)}
          >
            <div
              className="rail-tick h-px bg-neutral-900 rounded-l-full"
              data-pos={tick.position}
              style={{
                width: tick.isMarker ? 14 : 5,
                opacity: tick.isMarker ? 0.3 : 0.12,
                marginRight: -2,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export type { Marker };
