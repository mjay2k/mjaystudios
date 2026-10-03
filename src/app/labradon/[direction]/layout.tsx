import { notFound } from 'next/navigation';
import { MobileBar, SiteHeader } from '../_lab/Chrome';
import { directionIds, isDirection } from '../_lab/directions';
import { SiteFooter } from '../_lab/Footer';
import { OptionsBar } from '../_lab/OptionsBar';

export const dynamicParams = false;

export function generateStaticParams() {
  return directionIds.map((direction) => ({ direction }));
}

export default async function DirectionLayout({ children, params }: LayoutProps<'/labradon/[direction]'>) {
  const { direction } = await params;
  if (!isDirection(direction)) notFound();
  return (
    <div className="lab" data-dir={direction}>
      <a href="#lab-main" className="lab-skip">
        Skip to content
      </a>
      <OptionsBar current={direction} />
      <SiteHeader dir={direction} />
      <main id="lab-main">{children}</main>
      <SiteFooter
        dir={direction}
        title={direction === 'the-finish' ? 'Tell us about the property.' : 'Have a unit to turn?'}
        text={
          direction === 'the-finish'
            ? 'Send the address and what it needs. We will walk it with you and put the scope in writing.'
            : 'Send the address and the move-out date. We will set the walkthrough and put the scope in writing.'
        }
      />
      <MobileBar dir={direction} />
    </div>
  );
}
