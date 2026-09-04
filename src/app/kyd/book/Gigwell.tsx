'use client';

import { useEffect, useRef } from 'react';

/* Embeds the same Gigwell "Book Now" widget the current site uses. The script
   scans for its container on load, so we inject it after mount. */

export default function Gigwell({ agencyId }: { agencyId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const s = document.createElement('script');
    s.src = 'https://connect.gigwell.com/booknow/booknow.js';
    s.async = true;
    s.setAttribute('agency-id', agencyId);
    ref.current.appendChild(s);
    return () => {
      s.remove();
    };
  }, [agencyId]);
  return (
    <div ref={ref} className="min-h-[420px] border border-black/10 bg-white p-2">
      <div className="gigwell-booknow" data-agency-id={agencyId} />
    </div>
  );
}
