import { logoLayouts } from './logo-paths';

type Variant = keyof typeof logoLayouts;

/** The traced LabraDon logo, inline so it inherits `color`. */
export function Logo({
  variant = 'horizontal',
  className,
  title = 'LabraDon Properties LLC',
}: {
  variant?: Variant;
  className?: string;
  title?: string | null;
}) {
  const layout = logoLayouts[variant];
  return (
    <svg
      viewBox={layout.viewBox}
      className={className}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
    >
      {layout.parts.map((p, i) => (
        <path key={i} transform={p.transform} d={p.d} />
      ))}
    </svg>
  );
}
