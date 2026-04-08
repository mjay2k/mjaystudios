'use client';

import { useAppStore } from '@/stores/useAppStore';
import Modal from './Modal';

export default function ContactPopup() {
  const contactOpen = useAppStore((s) => s.contactOpen);
  const setContactOpen = useAppStore((s) => s.setContactOpen);

  const contacts = [
    {
      label: 'Email',
      value: 'mjay2k@gmail.com',
      href: 'mailto:mjay2k@gmail.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      label: 'Phone',
      value: '(812) 453-7766',
      href: 'tel:8124537766',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/mjaystudios',
      href: 'https://linkedin.com/in/mjaystudios',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: 'Website',
      value: 'mjaystudios.com',
      href: 'https://mjaystudios.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
  ];

  return (
    <Modal open={contactOpen} onClose={() => setContactOpen(false)}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-[2px] rounded-full" style={{ backgroundColor: 'var(--color-brand)' }} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Get in Touch</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-display text-white leading-tight">
          Let&apos;s work<br />together.
        </h2>
        <p className="mt-3 text-sm text-white/40">
          Open to freelance, collaboration, and creative opportunities.
        </p>
      </div>

      {/* Contact links as cards */}
      <div className="space-y-3">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-4 rounded-xl bg-white/5 px-5 py-4 transition-all hover:bg-white/10 group"
          >
            <div className="flex-shrink-0 text-white/30 group-hover:text-white/60 transition-colors" style={{ color: undefined }}>
              {c.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/30">{c.label}</p>
              <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors truncate">{c.value}</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        ))}
      </div>
    </Modal>
  );
}
