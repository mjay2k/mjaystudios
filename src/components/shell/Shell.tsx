'use client';

import { ReactNode } from 'react';
import NavBar from './NavBar';
import TimelineRail, { TimelineRailMobile, Marker } from './TimelineRail';
import AboutPopup from '@/components/popups/AboutPopup';
import ContactPopup from '@/components/popups/ContactPopup';
import FullscreenDetail from '@/components/projects/FullscreenDetail';

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
      <AboutPopup />
      <ContactPopup />
      <FullscreenDetail />

      <div className="px-4 pt-20 pr-8 md:px-10 md:pr-28">
        {children}
      </div>
    </div>
  );
}
