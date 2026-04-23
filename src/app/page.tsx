'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import Shell from '@/components/shell/Shell';
import TimelineView from '@/components/views/TimelineView';
import CategoryView from '@/components/views/CategoryView';
import CinematicView from '@/components/cinematic/CinematicView';
import type { Marker } from '@/components/shell/TimelineRail';

const timelineMarkers: Marker[] = [
  { id: 'intro', label: 'Begin', tooltip: 'In the Beginning', position: 0.1 },
  { id: 'agency', label: '2008', tooltip: 'Agency Life', position: 0.3 },
  { id: 'berry', label: '2015', tooltip: 'Berry Life', position: 0.5 },
  { id: 'afterberry', label: '2024', tooltip: 'After Berry', position: 0.7 },
  { id: 'contact', label: '', tooltip: 'Get in Touch', position: 0.9 },
];

const categoryMarkers: Marker[] = [
  { id: 'advertising', label: 'Ads', tooltip: 'Advertising & Print', position: 0.1 },
  { id: 'packaging', label: 'Packaging', tooltip: 'Packaging Design', position: 0.3 },
  { id: 'environmental', label: 'Booths', tooltip: 'Booth & Environmental', position: 0.5 },
  { id: 'logo', label: 'Logos', tooltip: 'Logo Design', position: 0.7 },
  { id: 'digital', label: 'Digital', tooltip: 'Digital & Apps', position: 0.9 },
];

export default function Home() {
  const activeView = useAppStore((s) => s.activeView);
  const siteVersion = useAppStore((s) => s.siteVersion);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || siteVersion !== 'classic') return;
    window.scrollTo(0, 0);

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeView, siteVersion]);

  // Cinematic version takes over the entire page
  if (siteVersion === 'cinematic') {
    return <CinematicView />;
  }

  const markers = activeView === 'timeline' ? timelineMarkers : categoryMarkers;

  return (
    <Shell markers={markers}>
      <div ref={contentRef}>
        {activeView === 'timeline' ? <TimelineView /> : <CategoryView />}
      </div>
    </Shell>
  );
}
