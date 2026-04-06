'use client';

import { useAppStore } from '@/stores/useAppStore';
import Modal from './Modal';

export default function ContactPopup() {
  const contactOpen = useAppStore((s) => s.contactOpen);
  const setContactOpen = useAppStore((s) => s.setContactOpen);

  return (
    <Modal open={contactOpen} onClose={() => setContactOpen(false)}>
      <h2 className="text-2xl font-bold font-display">Get in Touch</h2>
      <p className="mt-2 text-sm text-white/50">
        Open to freelance, collaboration, and creative opportunities.
      </p>
      <div className="mt-6 space-y-4">
        <a
          href="mailto:mjay2k@gmail.com"
          className="block text-sm text-white/70 transition-colors hover:text-white"
        >
          mjay2k@gmail.com
        </a>
        <a
          href="tel:8124537766"
          className="block text-sm text-white/70 transition-colors hover:text-white"
        >
          (812) 453-7766
        </a>
        <a
          href="https://linkedin.com/in/mjaystudios"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-white/70 transition-colors hover:text-white"
        >
          LinkedIn
        </a>
        <a
          href="https://mjaystudios.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-white/70 transition-colors hover:text-white"
        >
          mjaystudios.com
        </a>
      </div>
    </Modal>
  );
}
