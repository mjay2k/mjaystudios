'use client';

import { ReactNode } from 'react';
import NavBar from './NavBar';
import TimelineRail, { TimelineRailMobile, Marker } from './TimelineRail';
import InfoPanel from './InfoPanel';

interface ShellProps {
  markers: Marker[];
  children: ReactNode;
}

export default function Shell({ markers, children }: ShellProps) {
  return (
    <div className="relative min-h-screen">
      <NavBar />
      <TimelineRail markers={markers} />
      <TimelineRailMobile markers={markers} />
      <InfoPanel />

      <div className="ml-8 pt-20 md:ml-64">
        {children}
      </div>
    </div>
  );
}
