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

type TickSize = 'big' | 'small';

interface Tick {
  position: number;
  size: TickSize;           // alternating big/small base pattern
  isGhost: boolean;         // hidden by default, appears on hover
  isMarker: boolean;        // has a label/tooltip, clickable to section
  markerId?: string;
  label?: string;
  tooltip?: string;
  belongsTo?: string;       // which section to scroll to on click
}

function generateTicks(markers: Marker[]): Tick[] {
  const ticks: Tick[] = [];
  const sorted = [...markers].sort((a, b) => a.position - b.position);

  // Between each pair of markers, create a uniform grid:
  // marker(big) - small - ghost - big - ghost - small - ghost - big - small - marker(big)
  // This gives evenly spaced ticks with a clean big/small alternation
  for (let i = 0; i < sorted.length - 1; i++) {
    const startMarker = sorted[i];
    const endMarker = sorted[i + 1];
    const sectionId = startMarker.id;

    // Total slots between markers (not counting the markers themselves): 8
    // So 10 total positions including both markers, step = gap/9
    const totalSlots = 9;
    const gap = endMarker.position - startMarker.position;
    const step = gap / totalSlots;

    for (let j = 0; j <= totalSlots; j++) {
      const position = startMarker.position + step * j;
      const isStartMarker = j === 0;
      const isEndMarker = j === totalSlots;

      // Skip end marker — it'll be the start of the next segment
      if (isEndMarker) continue;

      // Alternating pattern: even index = big, odd = small
      const size: TickSize = j % 2 === 0 ? 'big' : 'small';

      // Ghosts: positions 2, 4, 6, 8 (every other non-marker slot)
      const isGhost = !isStartMarker && j % 3 === 0;

      if (isStartMarker) {
        ticks.push({
          position,
          size: 'big',
          isGhost: false,
          isMarker: true,
          markerId: startMarker.id,
          label: startMarker.label,
          tooltip: startMarker.tooltip,
          belongsTo: sectionId,
        });
      } else {
        ticks.push({
          position,
          size,
          isGhost,
          isMarker: false,
          belongsTo: sectionId,
        });
      }
    }
  }

  // Add the last marker
  const last = sorted[sorted.length - 1];
  ticks.push({
    position: last.position,
    size: 'big',
    isGhost: false,
    isMarker: true,
    markerId: last.id,
    label: last.label,
    tooltip: last.tooltip,
    belongsTo: last.id,
  });

  return ticks.sort((a, b) => a.position - b.position);
}

export default function TimelineRail({ markers }: TimelineRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const ticksRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const [hoveredTick, setHoveredTick] = useState<{ tooltip: string; top: number } | null>(null);

  const ticks = useMemo(() => generateTicks(markers), [markers]);
  const sortedMarkers = useMemo(() => [...markers].sort((a, b) => a.position - b.position), [markers]);

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

        // Animate ticks based on scroll position
        if (isHoveringRef.current) return;

        // Remap scroll progress (0-1) to tick range (first marker to last marker)
        const firstPos = sortedMarkers[0]?.position ?? 0.1;
        const lastPos = sortedMarkers[sortedMarkers.length - 1]?.position ?? 0.9;
        const mappedProgress = firstPos + self.progress * (lastPos - firstPos);

        const tickEls = ticksRef.current.querySelectorAll('.rail-tick');
        const radius = 0.12;

        // Find single closest non-ghost tick for orange highlight
        let closestEl: Element | null = null;
        let closestDist = Infinity;
        tickEls.forEach((el) => {
          if (el.getAttribute('data-ghost') === 'true') return;
          const d = Math.abs(parseFloat(el.getAttribute('data-pos') ?? '0') - mappedProgress);
          if (d < closestDist) { closestDist = d; closestEl = el; }
        });

        tickEls.forEach((el) => {
          const tickPos = parseFloat(el.getAttribute('data-pos') ?? '0');
          const isGhost = el.getAttribute('data-ghost') === 'true';
          const tickSize = el.getAttribute('data-size'); // 'big' or 'small'
          const distance = Math.abs(tickPos - mappedProgress);
          const proximity = Math.max(0, 1 - distance / radius);

          // Base widths: big=20, small=10. Proximity amplifies from base.
          const baseWidth = tickSize === 'big' ? 20 : 10;
          const baseOpacity = tickSize === 'big' ? 0.2 : 0.12;

          if (isGhost) {
            const ghostProx = Math.max(0, 1 - distance / 0.06);
            const gw = tickSize === 'big' ? ghostProx * 16 : ghostProx * 8;
            gsap.set(el, { width: gw, opacity: ghostProx * 0.3, backgroundColor: '' });
          } else {
            const width = baseWidth + proximity * 18;
            const opacity = baseOpacity + proximity * 0.7;
            const isClosest = el === closestEl;
            gsap.set(el, { width, opacity, backgroundColor: isClosest ? '#F15A29' : '' });
          }
        });
      },
    });

    return () => {
      trigger.kill();
      fadeInTrigger?.kill();
    };
  }, [sortedMarkers]);

  // No separate "default" effect — scroll handler drives tick sizes continuously

  // Mouse proximity animation — all ticks react to cursor Y
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ticksRef.current) return;

    const tickEls = ticksRef.current.querySelectorAll('.rail-tick');
    const mouseY = e.clientY;

    // Find single closest non-ghost tick for orange highlight
    let closestHoverEl: Element | null = null;
    let closestHoverDist = Infinity;
    tickEls.forEach((el) => {
      if (el.getAttribute('data-ghost') === 'true') return;
      const rect = el.getBoundingClientRect();
      const d = Math.abs(mouseY - (rect.top + rect.height / 2));
      if (d < closestHoverDist) { closestHoverDist = d; closestHoverEl = el; }
    });

    tickEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const tickCenterY = rect.top + rect.height / 2;
      const distancePx = Math.abs(mouseY - tickCenterY);
      const isGhost = el.getAttribute('data-ghost') === 'true';
      const tickSize = el.getAttribute('data-size');

      const maxRadius = 120;
      const proximity = Math.max(0, 1 - distancePx / maxRadius);
      const baseWidth = tickSize === 'big' ? 20 : 10;

      if (isGhost) {
        const ghostRadius = 80;
        const ghostProximity = Math.max(0, 1 - distancePx / ghostRadius);
        const gw = tickSize === 'big' ? ghostProximity * 18 : ghostProximity * 10;
        gsap.to(el, {
          width: gw,
          opacity: ghostProximity * 0.5,
          backgroundColor: '',
          duration: 0.15,
          ease: 'none',
          overwrite: 'auto',
        });
      } else {
        const width = baseWidth + proximity * 22;
        const opacity = 0.1 + proximity * 0.9;
        const isClosest = el === closestHoverEl;
        gsap.to(el, {
          width,
          opacity,
          backgroundColor: isClosest ? '#F15A29' : '',
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
    // Scroll handler will take back over on next scroll tick
  }, []);

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

  const railTop = 20; // relative to rail container which starts at 64px
  const railBottom = 40;

  const scrollToTop = useCallback(() => {
    gsap.to(window, { scrollTo: { y: 0 }, duration: 1, ease: 'power3.inOut' });
  }, []);

  return (
    <>

    <div
      ref={railRef}
      className="fixed top-0 right-0 z-40 hidden h-full md:block cursor-pointer"
      style={{ width: 92, top: 64 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        // If click is above the ticks area, scroll to top
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        if (clickY < railTop - 64) {
          scrollToTop();
        }
      }}
    >

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-50 pointer-events-none"
        style={{
          right: 96,
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
                className="rail-tick h-[2px] bg-neutral-900 rounded-l-full"
                data-pos={tick.position}
                data-marker-id={tick.markerId ?? ''}
                data-ghost={tick.isGhost}
                data-size={tick.size}
                style={{
                  width: tick.isGhost ? 0 : tick.size === 'big' ? 20 : 10,
                  opacity: tick.isGhost ? 0 : tick.size === 'big' ? 0.2 : 0.12,
                  marginRight: -2,
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
