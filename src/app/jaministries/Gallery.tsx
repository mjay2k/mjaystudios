'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { gallery } from '@/data/ja/gallery';

/* Ministry photo gallery.
   Two ribbons of photos drift in opposite directions, motion that suits a
   sending ministry, and expand into a full mosaic. Any photo opens a
   lightbox with keyboard navigation. */

const ROW_A = gallery.filter((_, i) => i % 2 === 0);
const ROW_B = gallery.filter((_, i) => i % 2 === 1);

function Ribbon({
  images,
  reverse = false,
  onPick,
}: {
  images: typeof gallery;
  reverse?: boolean;
  onPick: (src: string) => void;
}) {
  // Duplicated once so the translate loop is seamless.
  const strip = [...images, ...images];
  return (
    <div className="ja-ribbon-mask overflow-hidden">
      <ul
        className={`ja-ribbon flex w-max gap-3 ${reverse ? 'ja-ribbon-rev' : ''}`}
        style={{ ['--ja-ribbon-count' as string]: images.length }}
      >
        {strip.map((img, i) => (
          <li key={`${img.src}-${i}`} className="shrink-0">
            <button
              type="button"
              onClick={() => onPick(img.src)}
              aria-label="Open photo"
              className="group relative block h-36 overflow-hidden rounded-lg ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:h-48"
              style={{ aspectRatio: `${img.w} / ${img.h}` }}
            >
              <Image
                src={img.src}
                alt=""
                width={img.w}
                height={img.h}
                sizes="320px"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Gallery() {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const openBySrc = useCallback((src: string) => {
    setActive(gallery.findIndex((g) => g.src === src));
  }, []);

  const step = useCallback((dir: number) => {
    setActive((cur) => (cur === null ? cur : (cur + dir + gallery.length) % gallery.length));
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, step]);

  const current = active === null ? null : gallery[active];

  return (
    <>
      {/* drifting ribbons */}
      <div className="space-y-3">
        <Ribbon images={ROW_A} onPick={openBySrc} />
        <Ribbon images={ROW_B} reverse onPick={openBySrc} />
      </div>

      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="ja-display rounded-md px-8 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] text-[color:var(--ja-ink-900)] transition-transform hover:-translate-y-0.5"
          style={{ background: 'var(--ja-gold-grad)' }}
          aria-expanded={expanded}
        >
          {expanded ? 'Close the album' : `See all ${gallery.length} photos`}
        </button>
      </div>

      {/* full mosaic */}
      {expanded && (
        <div className="ja-rise mt-10 [column-fill:_balance] gap-3 [columns:2] sm:[columns:3] lg:[columns:4]">
          {gallery.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label="Open photo"
              className="group mb-3 block w-full overflow-hidden rounded-lg ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2"
            >
              <Image
                src={img.src}
                alt=""
                width={img.w}
                height={img.h}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="w-full transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      )}

      {/* lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="ja-fade fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          style={{ background: 'rgba(10,19,38,0.94)' }}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full text-2xl text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-2 z-10 grid h-12 w-12 place-items-center rounded-full text-3xl text-white/70 transition-colors hover:bg-white/10 hover:text-white md:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
            className="absolute right-2 z-10 grid h-12 w-12 place-items-center rounded-full text-3xl text-white/70 transition-colors hover:bg-white/10 hover:text-white md:right-6"
          >
            ›
          </button>

          <figure className="relative max-h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={current.src}
              alt=""
              width={current.w}
              height={current.h}
              sizes="90vw"
              className="max-h-[80vh] w-auto rounded-lg object-contain"
              priority
            />
            <figcaption
              className="ja-display mt-4 text-center text-[12px] font-bold uppercase tracking-[0.25em]"
              style={{ color: 'var(--ja-gold-2)' }}
            >
              {(active ?? 0) + 1} / {gallery.length}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
