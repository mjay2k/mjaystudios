'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import Shell from '@/components/shell/Shell';
import TimelineView from '@/components/views/TimelineView';
import CategoryView from '@/components/views/CategoryView';
import type { Marker } from '@/components/shell/TimelineRail';

const timelineMarkers: Marker[] = [
  { id: 'intro', label: '', position: 0.05 },
  { id: 'agency', label: '2010', position: 0.2 },
  { id: 'berry', label: '2017', position: 0.5 },
  { id: 'afterberry', label: '2023', position: 0.75 },
  { id: 'contact', label: '', position: 0.95 },
];

const categoryMarkers: Marker[] = [
  { id: 'advertising', label: 'Ads', position: 0.1 },
  { id: 'packaging', label: 'Packaging', position: 0.3 },
  { id: 'environmental', label: 'Booths', position: 0.5 },
  { id: 'logo', label: 'Logos', position: 0.7 },
  { id: 'digital', label: 'Digital', position: 0.9 },
];

export default function Home() {
  const activeView = useAppStore((s) => s.activeView);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    window.scrollTo(0, 0);

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeView]);

  const markers = activeView === 'timeline' ? timelineMarkers : categoryMarkers;

  return (
    <Shell markers={markers}>
      <div ref={contentRef}>
        {activeView === 'timeline' ? <TimelineView /> : <CategoryView />}
      </div>
    </Shell>
  );
}
