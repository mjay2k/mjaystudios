import Link from 'next/link';
import { options, type OptionId } from './directions';

/**
 * Thin preview bar shared by all four options and the hub, so the client can
 * flip between directions. Self-contained styles (.lab-options) so it renders
 * the same inside the older .ld pages.
 */
export function OptionsBar({ current }: { current: OptionId }) {
  return (
    <div className="lab-options">
      <Link href="/labradon" className="lab-options-brand" aria-current={current === 'hub' ? 'page' : undefined}>
        <span>MJay Studios</span> / LabraDon preview
      </Link>
      <nav aria-label="Design options">
        {options.map((o) => (
          <Link key={o.id} href={o.href} aria-current={current === o.id ? 'page' : undefined}>
            <b>{o.number}</b>
            <span>{o.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
