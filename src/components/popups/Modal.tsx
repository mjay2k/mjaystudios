'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;

    if (open) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  const handleClose = () => {
    if (!overlayRef.current || !contentRef.current) return;
    gsap.to(contentRef.current, { y: 10, opacity: 0, duration: 0.2, ease: 'power2.in' });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      delay: 0.1,
      onComplete: onClose,
    });
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 opacity-0 backdrop-blur-md"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-t-3xl md:rounded-2xl bg-neutral-900 p-8 md:m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Drag handle for mobile */}
        <div className="md:hidden flex justify-center mb-4 -mt-2">
          <div className="w-10 h-1 rounded-full bg-white/15" />
        </div>

        {children}
      </div>
    </div>
  );
}
