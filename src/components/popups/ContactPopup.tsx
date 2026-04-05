'use client';

import { useAppStore } from '@/stores/useAppStore';
import Modal from './Modal';

export default function ContactPopup() {
  const contactOpen = useAppStore((s) => s.contactOpen);
  const setContactOpen = useAppStore((s) => s.setContactOpen);

  return (
    <Modal open={contactOpen} onClose={() => setContactOpen(false)}>
      <h2 className="text-2xl font-bold">Get in Touch</h2>
      <p className="mt-2 text-sm text-white/50">
        Open to freelance, collaboration, and creative opportunities.
      </p>
      <div className="mt-6 space-y-4">
        <a
          href="mailto:matt@mjaystudios.com"
          className="block text-sm text-white/70 transition-colors hover:text-white"
        >
          matt@mjaystudios.com
        </a>
        <a
          href="https://linkedin.com/in/matthewjohnson"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-white/70 transition-colors hover:text-white"
        >
          LinkedIn
        </a>
      </div>
    </Modal>
  );
}
