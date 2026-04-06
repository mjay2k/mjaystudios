'use client';

import { ReactNode } from 'react';
import NavBar from './NavBar';
import TimelineRail, { TimelineRailMobile, Marker } from './TimelineRail';
import InfoPanel from './InfoPanel';
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
      <InfoPanel />
      <AboutPopup />
      <ContactPopup />
      <FullscreenDetail />

      <div className="px-6 pt-20 pr-10 md:px-16 md:pr-24">
        {children}
      </div>
    </div>
  );
}
