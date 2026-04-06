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

interface Tick {
  position: number;
  isMarker: boolean;
  isGhost: boolean; // extra ticks that only appear on hover
  markerId?: string;
  label?: string;
  tooltip?: string;
  belongsTo?: string; // which marker section this tick falls under (for click targeting)
}

function generateTicks(markers: Marker[]): Tick[] {
  const ticks: Tick[] = [];
  const sorted = [...markers].sort((a, b) => a.position - b.position);

  // Add markers
  sorted.forEach((m) => {
    ticks.push({ position: m.position, isMarker: true, isGhost: false, markerId: m.id, label: m.label, tooltip: m.tooltip, belongsTo: m.id });
  });

  // Between each pair of markers, add evenly spaced ticks
  // Pattern: visible, ghost, visible, ghost, visible, ghost, visible
  // = 3 visible + 4 ghost = 7 ticks between each marker pair, all evenly spaced
  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i].position;
    const end = sorted[i + 1].position;
    const sectionId = sorted[i].id;
    const totalBetween = 7;
    const step = (end - start) / (totalBetween + 1);

    for (let j = 1; j <= totalBetween; j++) {
      const isGhost = j % 2 === 0; // even positions are ghosts
      ticks.push({
        position: start + step * j,
        isMarker: false,
        isGhost,
        belongsTo: sectionId,
      });
    }
  }

  return ticks.sort((a, b) => a.position - b.position);
}

export default function TimelineRail({ markers }: TimelineRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const ticksRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const currentSection = useAppStore((s) => s.currentSection);
  const [hoveredTick, setHoveredTick] = useState<{ tooltip: string; top: number } | null>(null);

  const ticks = useMemo(() => generateTicks(markers), [markers]);

  const activeMarkerId = useMemo(() => {
    if (!currentSection) return null;
    return markers.find((m) => m.id === currentSection.id)?.id ?? null;
  }, [currentSection, markers]);

  // Parallax offset + fade in when timeline section appears
  useEffect(() => {
    if (!ticksRef.current || !railRef.current) return;

    // Fade in only the ticks (not the whole rail) when section-intro enters viewport
    const introEl = document.getElementById('section-intro');
    let fadeInTrigger: ScrollTrigger | undefined;
    if (introEl && ticksRef.current) {
      gsap.set(ticksRef.current, { opacity: 0 });
      fadeInTrigger = ScrollTrigger.create({
        trigger: introEl,
        start: 'top 80%',
        onEnter: () => {
          if (ticksRef.current) gsap.to(ticksRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' });
        },
        onLeaveBack: () => {
          if (ticksRef.current) gsap.to(ticksRef.current, { opacity: 0, duration: 0.4, ease: 'power2.in' });
        },
      });
    }

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (!ticksRef.current) return;
        gsap.set(ticksRef.current, { y: self.progress * -80 });

        // Animate ticks based on scroll position (like a scroll indicator)
        if (isHoveringRef.current) return; // don't fight the mouse hover
        const tickEls = ticksRef.current.querySelectorAll('.rail-tick');
        tickEls.forEach((el) => {
          const tickPos = parseFloat(el.getAttribute('data-pos') ?? '0');
          const isGhost = el.getAttribute('data-ghost') === 'true';
          const distance = Math.abs(tickPos - self.progress);

          if (isGhost) {
            const ghostProx = Math.max(0, 1 - distance / 0.08);
            gsap.set(el, { width: ghostProx * 14, opacity: ghostProx * 0.4 });
          } else {
            const isVeryClose = distance < 0.05;
            const isClose = distance < 0.12;
            gsap.set(el, {
              width: isVeryClose ? 32 : isClose ? 18 : 8,
              opacity: isVeryClose ? 0.9 : isClose ? 0.4 : 0.15,
            });
          }
        });
      },
    });

    return () => {
      trigger.kill();
      fadeInTrigger?.kill();
    };
  }, []);

  // Default animation: active section drives tick sizes, ghosts hidden
  useEffect(() => {
    if (!ticksRef.current || isHoveringRef.current) return;

    const tickEls = ticksRef.current.querySelectorAll('.rail-tick');
    const markerPos = activeMarkerId
      ? (markers.find((m) => m.id === activeMarkerId)?.position ?? -1)
      : -1;

    tickEls.forEach((el) => {
      const isGhost = el.getAttribute('data-ghost') === 'true';
      if (isGhost) {
        gsap.to(el, { width: 0, opacity: 0, duration: 0.4, ease: 'power2.out' });
        return;
      }

      const tickPos = parseFloat(el.getAttribute('data-pos') ?? '0');
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

  // Mouse proximity animation — all ticks react to cursor Y
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ticksRef.current) return;

    const tickEls = ticksRef.current.querySelectorAll('.rail-tick');
    const mouseY = e.clientY;

    tickEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const tickCenterY = rect.top + rect.height / 2;
      const distancePx = Math.abs(mouseY - tickCenterY);
      const isGhost = el.getAttribute('data-ghost') === 'true';

      const maxRadius = 120;
      const proximity = Math.max(0, 1 - distancePx / maxRadius);

      if (isGhost) {
        // Ghosts only appear when cursor is nearby
        const ghostRadius = 80;
        const ghostProximity = Math.max(0, 1 - distancePx / ghostRadius);
        gsap.to(el, {
          width: ghostProximity * 20,
          opacity: ghostProximity * 0.6,
          duration: 0.15,
          ease: 'none',
          overwrite: 'auto',
        });
      } else {
        const width = 6 + proximity * 34;
        const opacity = 0.1 + proximity * 0.9;
        gsap.to(el, {
          width,
          opacity,
          duration: 0.15,
          ease: 'none',
          overwrite: 'auto',
        });
      }
    });

    // Find closest marker for tooltip
    const markerTicks = ticks.filter((t) => t.isMarker && t.tooltip);
    let closestTooltip: string | null = null;
    let closestDist = Infinity;

    markerTicks.forEach((tick) => {
      const tickEl = ticksRef.current?.querySelector(`[data-marker-id="${tick.markerId}"]`);
      if (!tickEl) return;
      const rect = tickEl.getBoundingClientRect();
      const dist = Math.abs(mouseY - (rect.top + rect.height / 2));
      if (dist < closestDist && dist < 40) {
        closestDist = dist;
        closestTooltip = tick.tooltip ?? null;
      }
    });

    if (closestTooltip) {
      setHoveredTick({ tooltip: closestTooltip, top: mouseY });
    } else {
      setHoveredTick(null);
    }
  }, [ticks]);

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    setHoveredTick(null);

    // Restore default active-section-based animation
    if (!ticksRef.current) return;
    const tickEls = ticksRef.current.querySelectorAll('.rail-tick');
    const markerPos = activeMarkerId
      ? (markers.find((m) => m.id === activeMarkerId)?.position ?? -1)
      : -1;

    tickEls.forEach((el) => {
      const isGhost = el.getAttribute('data-ghost') === 'true';
      if (isGhost) {
        gsap.to(el, { width: 0, opacity: 0, duration: 0.4, ease: 'power2.out' });
        return;
      }

      const tickPos = parseFloat(el.getAttribute('data-pos') ?? '0');
      const distance = Math.abs(tickPos - markerPos);
      const isVeryClose = distance < 0.06;
      const isClose = distance < 0.15;

      gsap.to(el, {
        width: isVeryClose ? 28 : isClose ? 16 : 8,
        opacity: isVeryClose ? 0.8 : isClose ? 0.35 : 0.15,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  }, [activeMarkerId, markers]);

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

  // Tooltip animation
  useEffect(() => {
    if (!tooltipRef.current) return;
    if (hoveredTick) {
      gsap.to(tooltipRef.current, { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' });
    } else {
      gsap.to(tooltipRef.current, { opacity: 0, x: 4, duration: 0.15, ease: 'power2.in' });
    }
  }, [hoveredTick]);

  const railTop = 80;
  const railBottom = 40;

  const scrollToTop = useCallback(() => {
    gsap.to(window, { scrollTo: { y: 0 }, duration: 1, ease: 'power3.inOut' });
  }, []);

  return (
    <>
    {/* Click-to-top zone — always interactive, separate from rail */}
    <div
      className="fixed top-0 right-0 z-50 hidden h-20 cursor-pointer md:block"
      style={{ width: 80 }}
      onClick={scrollToTop}
      title="Back to top"
    />

    <div
      ref={railRef}
      className="fixed top-0 right-0 z-40 hidden h-full md:block cursor-pointer"
      style={{ width: 80 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Tooltip */}
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
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-neutral-900 rotate-45" />
        </div>
      </div>

      <div
        ref={ticksRef}
        style={{ top: railTop, bottom: railBottom, position: 'absolute', right: 0, left: 0 }}
      >
        {ticks.map((tick, i) => {
          // Click target: markers scroll to themselves, in-between ticks scroll to their section
          const clickTarget = tick.markerId ?? tick.belongsTo;

          return (
            <div
              key={i}
              className={`absolute right-0 flex items-center justify-end ${clickTarget ? 'cursor-pointer' : ''}`}
              style={{ top: `${tick.position * 100}%`, padding: '6px 0' }}
              onClick={() => clickTarget && handleTickClick(clickTarget)}
            >
              {/* Label */}
              {tick.isMarker && tick.label && (
                <span className="mr-2 whitespace-nowrap text-[9px] font-medium tracking-wider text-neutral-400 uppercase font-body">
                  {tick.label}
                </span>
              )}
              {/* Tick */}
              <div
                className="rail-tick h-[1.5px] bg-neutral-900 rounded-l-full"
                data-pos={tick.position}
                data-marker-id={tick.markerId ?? ''}
                data-ghost={tick.isGhost}
                style={{
                  width: tick.isGhost ? 0 : tick.isMarker ? 24 : 10,
                  opacity: tick.isGhost ? 0 : tick.isMarker ? 0.4 : 0.15,
                  marginRight: tick.isMarker ? -4 : -2,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
    </>
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
