'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import { getProjectById, type Project } from '@/data/projects';

function DetailContent({ project }: { project: Project }) {
  const setDetailProject = useAppStore((s) => s.setDetailProject);
  const [activeIndex, setActiveIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;

    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(contentRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.15 });

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      onComplete: () => setDetailProject(null),
    });
  };

  const allImages = [
    ...project.images,
    ...(project.caseStudy?.additionalImages ?? []),
  ];

  const prev = () => setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length);
  const next = () => setActiveIndex((i) => (i + 1) % allImages.length);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative flex h-full w-full max-w-5xl flex-col items-center justify-center gap-6 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-2xl text-white/40 hover:text-white"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="relative aspect-[4/3] w-full max-h-[60vh] overflow-hidden rounded-lg">
          <Image
            src={allImages[activeIndex]}
            alt={`${project.title} — ${activeIndex + 1}`}
            fill
            className="object-contain"
            sizes="90vw"
          />
        </div>

        {allImages.length > 1 && (
          <div className="flex items-center gap-6">
            <button
              onClick={prev}
              className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/20 hover:text-white"
            >
              Prev
            </button>
            <span className="text-xs text-white/40">
              {activeIndex + 1} / {allImages.length}
            </span>
            <button
              onClick={next}
              className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/20 hover:text-white"
            >
              Next
            </button>
          </div>
        )}

        <div className="max-w-lg text-center">
          <h2 className="text-xl font-bold">{project.title}</h2>
          <p className="mt-2 text-sm text-white/60">
            {project.caseStudy?.extendedDescription ?? project.description}
          </p>
          {project.caseStudy?.processNotes && (
            <p className="mt-4 text-xs italic text-white/40">
              {project.caseStudy.processNotes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FullscreenDetail() {
  const detailProjectId = useAppStore((s) => s.detailProject);
  const project = detailProjectId ? getProjectById(detailProjectId) : null;

  if (!project) return null;

  // Key by project id so state (activeIndex) resets when project changes
  return <DetailContent key={project.id} project={project} />;
}
