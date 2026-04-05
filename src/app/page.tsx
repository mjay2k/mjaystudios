'use client';

import Shell from '@/components/shell/Shell';
import type { Marker } from '@/components/shell/TimelineRail';

const placeholderMarkers: Marker[] = [
  { id: 'agency', label: 'Agency Life', position: 0.15 },
  { id: 'berry', label: 'Berry Life', position: 0.45 },
  { id: 'afterberry', label: 'After Berry', position: 0.75 },
];

export default function Home() {
  return (
    <Shell markers={placeholderMarkers}>
      <div className="space-y-96 py-20">
        <section className="h-screen">
          <h2 className="text-3xl font-bold">Agency Life</h2>
          <p className="mt-4 text-white/50">Keller era work goes here</p>
        </section>
        <section className="h-screen">
          <h2 className="text-3xl font-bold">Berry Life</h2>
          <p className="mt-4 text-white/50">Berry Global work goes here</p>
        </section>
        <section className="h-screen">
          <h2 className="text-3xl font-bold">After Berry</h2>
          <p className="mt-4 text-white/50">Teaching, AI, apps</p>
        </section>
      </div>
    </Shell>
  );
}
