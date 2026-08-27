/* Shared brand primitives for the Jesus Anoints Ministries site.
   Pure presentational SVG, safe to use from server components. */

/* The gold brush swash from the logo, redrawn as a tapered stroke.
   Used as a hand-drawn underline marking the words that matter. */
export function Brush({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 26" className={className} aria-hidden preserveAspectRatio="none">
      <defs>
        <linearGradient id="jam-brush" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a3781a" />
          <stop offset="0.55" stopColor="#d9ad3c" />
          <stop offset="1" stopColor="#edcb6d" />
        </linearGradient>
      </defs>
      <path
        d="M8 16 C 90 6, 230 3, 312 9 C 250 11, 120 14, 40 21 C 30 22, 12 20, 8 16 Z"
        fill="url(#jam-brush)"
      />
    </svg>
  );
}

/* Sweeping curved seam between two color blocks. The boundary always crests
   in the middle. Two ways to draw the same seam:
   - default: the NEXT section's color as an arc, placed at the END of the
     previous section (works when the next section is a flat color);
   - invert: the PREVIOUS section's color above the arc, placed at the TOP
     of the next section (use when the next section has a gradient). */
export function Curve({ fill, invert = false }: { fill: string; invert?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden
      className="block h-[7vw] max-h-24 min-h-10 w-full"
    >
      <path
        d={
          invert
            ? 'M0,0 L1440,0 L1440,90 C1020,8 420,8 0,90 Z'
            : 'M0,90 C420,8 1020,8 1440,90 L1440,90 L0,90 Z'
        }
        fill={fill}
      />
    </svg>
  );
}
