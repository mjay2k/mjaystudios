'use client';

import Image from 'next/image';
import { useAppStore } from '@/stores/useAppStore';
import Modal from './Modal';

export default function AboutPopup() {
  const aboutOpen = useAppStore((s) => s.aboutOpen);
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);

  return (
    <Modal open={aboutOpen} onClose={() => setAboutOpen(false)}>
      <div className="flex items-center gap-4 mb-6">
        <Image
          src="/portfolio/headshot.jpg"
          alt="Matthew Johnson"
          width={64}
          height={64}
          className="rounded-full object-cover w-16 h-16"
        />
        <div>
          <h2 className="text-2xl font-bold font-display">Matthew Johnson</h2>
          <p className="text-sm text-white/50">
            Creative Leader &middot; Art Director &middot; Developer
          </p>
        </div>
      </div>
      <div className="space-y-4 text-sm leading-relaxed text-white/70">
        <p>
          Award-winning creative leader with over 15 years of experience
          bridging strategic brand development, digital innovation, and
          multimedia production. I manage high-stakes projects from concept to
          completion while leveraging AI-driven tools to accelerate development
          and generate dynamic media.
        </p>
        <p>
          My career started in agency life — building websites at Keller
          Crescent, then art directing multi-channel campaigns at 10over12
          Creative for brands like Heaven Hill, PAMA, and Rittenhouse Rye. At
          Berry Global, I spent nearly a decade as Senior Graphic Designer
          driving the company&apos;s visual identity, designing ADDY-winning
          trade show booths, and building campaigns across a Fortune 500 brand
          portfolio.
        </p>
        <p>
          Now I&apos;m teaching computer science and media production while
          building AI-powered apps — Bible Warden (iOS, Swift) and News Warden
          (web) — from the ground up. I bring a rare combination: the eye of an
          art director, the strategic thinking of a brand leader, and the
          technical capability to build what I design.
        </p>
        <div className="pt-2 border-t border-white/10">
          <p className="text-xs text-white/40">
            4x Silver ADDY Award Winner &middot; BS Interdisciplinary Studies,
            Liberty University &middot; AA Visual Communications, Ivy Tech
          </p>
        </div>
      </div>
    </Modal>
  );
}
