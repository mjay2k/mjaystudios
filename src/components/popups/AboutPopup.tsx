'use client';

import Image from 'next/image';
import { useAppStore } from '@/stores/useAppStore';
import Modal from './Modal';

export default function AboutPopup() {
  const aboutOpen = useAppStore((s) => s.aboutOpen);
  const setAboutOpen = useAppStore((s) => s.setAboutOpen);
  const theme = useAppStore((s) => s.theme);

  return (
    <Modal open={aboutOpen} onClose={() => setAboutOpen(false)}>
      {/* Hero area with headshot */}
      <div className="relative -mx-8 -mt-8 mb-8 overflow-hidden rounded-t-2xl">
        <div className="bg-gradient-to-br from-neutral-800 to-neutral-950 px-8 pt-10 pb-8">
          <div className="flex items-end gap-5">
            <Image
              src={theme === 'dark' ? '/portfolio/headshot-dark.jpg' : '/portfolio/headshot.jpg'}
              alt="Matthew Johnson"
              width={96}
              height={96}
              className="rounded-xl object-cover w-20 h-20 md:w-24 md:h-24 ring-2 ring-white/10"
            />
            <div className="pb-1">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white">
                Matthew Johnson
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-4 h-[2px] rounded-full" style={{ backgroundColor: 'var(--color-brand)' }} />
                <p className="text-xs font-medium text-white/50 tracking-wide">
                  Creative Leader &middot; Art Director &middot; Developer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Awards bar */}
      <div className="flex flex-wrap gap-3 mb-8">
        {['2018 Silver ADDY', '2019 Silver ADDY', '2022 Silver ADDY', '2024 Silver ADDY'].map((award) => (
          <span
            key={award}
            className="rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide"
            style={{ backgroundColor: 'rgba(241, 90, 41, 0.08)', color: '#F15A29' }}
          >
            {award}
          </span>
        ))}
      </div>

      {/* Bio */}
      <div className="space-y-4 text-sm leading-[1.7] text-white/65">
        <p>
          Award-winning creative leader with over 15 years bridging strategic
          brand development, digital innovation, and multimedia production.
          Managing high-stakes projects from concept to completion while
          leveraging AI-driven tools to accelerate development.
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
          (web) — from the ground up.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
        <p className="text-[10px] text-white/30 leading-relaxed">
          BS Interdisciplinary Studies, Liberty University<br />
          AA Visual Communications, Ivy Tech
        </p>
        <a
          href="https://linkedin.com/in/mjaystudios"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-white/50 border border-white/10 transition-colors hover:border-white/30 hover:text-white/80"
        >
          LinkedIn
        </a>
      </div>
    </Modal>
  );
}
