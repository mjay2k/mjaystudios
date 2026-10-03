import Link from 'next/link';
import { site } from '@/data/labradon/site';
import { services } from '@/data/labradon/services';
import { Logo } from './Logo';
import { href, type DirectionId } from './directions';

/** Shared footer: closing call to action, contact, services and service area. */
export function SiteFooter({
  dir,
  title = 'Have a property that needs to be ready?',
  text = 'Send the address and the date. We will set the walkthrough and put the scope in writing.',
}: {
  dir: DirectionId;
  title?: string;
  text?: string;
}) {
  return (
    <footer className="lab-footer">
      <div className="lab-footer-cta">
        <h2>{title}</h2>
        <div>
          <p>{text}</p>
          <div className="lab-actions">
            <Link className="lab-btn lab-btn-invert" href={href(dir, 'request')}>
              Request a walkthrough
            </Link>
            <a className="lab-link" href={site.phoneHref}>
              Call {site.phone}
            </a>
          </div>
          <p className="lab-footer-note">{site.replyPromise}</p>
        </div>
      </div>
      <div className="lab-footer-grid">
        <div className="lab-footer-brand">
          <Logo variant="stacked" title="LabraDon Properties LLC" />
          <p>{site.loyal}</p>
        </div>
        <div>
          <h3>Services</h3>
          <ul>
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`${href(dir, 'services')}#${s.id}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            <li><Link href={href(dir, 'work')}>Our work</Link></li>
            <li><Link href={href(dir, 'about')}>About Seth and Donnie</Link></li>
            <li><Link href={`${href(dir, 'about')}#vendor-file`}>Vendor file</Link></li>
            <li><Link href={href(dir, 'request')}>Request a walkthrough</Link></li>
          </ul>
        </div>
        <div>
          <h3>Reach us</h3>
          <ul>
            <li><a href={site.phoneHref}>{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>{site.cities.join(', ')}</li>
          </ul>
        </div>
      </div>
      <div className="lab-footer-base">
        <span>© {new Date().getFullYear()} {site.legalName}. Veteran-owned and operated.</span>
        <span>Design preview by MJay Studios</span>
      </div>
    </footer>
  );
}
