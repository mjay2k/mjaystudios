'use client';

import { useAppStore } from '@/stores/useAppStore';
import Modal from './Modal';

export default function AboutPopup() {
  const aboutOpen = useAppStore((s) => s.aboutOpen);
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);

  return (
    <Modal open={aboutOpen} onClose={() => setAboutOpen(false)}>
      <h2 className="text-2xl font-bold font-display">Matthew Johnson</h2>
      <p className="mt-1 text-sm text-white/50">
        Art Director &middot; Designer &middot; AI Developer
      </p>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/70">
        <p>
          With over a decade of experience in art direction and brand design,
          I&apos;ve led creative for major brands from Keller to Berry Global —
          building campaigns, packaging systems, and brand identities that
          connect.
        </p>
        <p>
          After Berry, I pivoted to teaching design for a year before diving
          deep into AI development. That journey led to Bible Warden and News
          Warden — AI-powered apps built from the ground up.
        </p>
        <p>
          I bring a rare combination: the eye of an art director, the strategic
          thinking of a brand leader, and the technical capability to build what
          I design.
        </p>
      </div>
    </Modal>
  );
}
