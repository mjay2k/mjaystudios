import type { Metadata } from 'next';
import Image from 'next/image';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import Gigwell from './Gigwell';
import { site } from '@/data/kyd/site';
import { photos } from '@/data/kyd/gallery';
import { Icon } from '../icons';

export const metadata: Metadata = {
  title: 'Book Kentucky Dom',
  description: 'Book Kentucky Dom for shows, festivals, rodeos, corporate and church events, and appearances.',
};

export default function BookPage() {
  const hero = photos.find((p) => p.src.includes('bluegrass-uk-11')) ?? photos[1];
  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1fr_1fr] md:items-center md:px-6 md:py-20">
          <div>
            <p className="kyd-eyebrow" style={{ color: 'var(--kyd-gold-bright)' }}>Shows, festivals, rodeos, events</p>
            <h1 className="kyd-display mt-2 text-6xl uppercase leading-[0.9] md:text-8xl">Book Dom</h1>
            <p className="mt-6 max-w-lg text-lg text-white/70">
              Full band or acoustic. Fairs, rodeos, patriotic and faith events, corporate, colleges, and private parties.
              Speaking and appearances too.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${site.contact.booking}?subject=Booking%20inquiry`} className="kyd-btn kyd-btn-red">
                <Icon.mail className="h-5 w-5" /> {site.contact.booking}
              </a>
              <a href="#form" className="kyd-btn kyd-btn-ghost">Request form</a>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 text-sm">
              <div>
                <dt className="kyd-eyebrow text-white/40">Based in</dt>
                <dd className="mt-1 text-white/80">{site.base}</dd>
              </div>
              <div>
                <dt className="kyd-eyebrow text-white/40">Label</dt>
                <dd className="mt-1 text-white/80">{site.contact.label}</dd>
              </div>
              <div>
                <dt className="kyd-eyebrow text-white/40">Management</dt>
                <dd className="mt-1 text-white/80">{site.contact.company}</dd>
              </div>
              <div>
                <dt className="kyd-eyebrow text-white/40">Press kit</dt>
                <dd className="mt-1 text-white/80">Photos and bio on the <a href="/kyd/about" className="underline">About</a> page</dd>
              </div>
            </dl>
          </div>
          <div className="relative aspect-[2/3] overflow-hidden md:aspect-[3/4]">
            <Image src={hero.src} alt={hero.alt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </section>

        <section id="form" className="scroll-mt-24 border-t border-white/10" style={{ background: 'var(--kyd-paper)', color: 'var(--kyd-black)' }}>
          <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
            <p className="kyd-eyebrow text-black/40">Booking request</p>
            <h2 className="kyd-display mt-1 text-4xl uppercase leading-none md:text-6xl">Tell us about the show</h2>
            <p className="mt-3 text-black/60">Powered by Gigwell. If the form doesn&apos;t load, email {site.contact.booking}.</p>
            <div className="mt-8">
              <Gigwell agencyId={site.ids.gigwellAgency} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
