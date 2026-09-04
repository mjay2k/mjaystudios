import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '../../SiteHeader';
import SiteFooter from '../../SiteFooter';
import AddToCart from '../../cart/AddToCart';
import { products, getProduct, formatPrice } from '@/data/kyd/products';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p ? `${p.name} | Kentucky Dom Store` : 'Not found' };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const related = products.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3);
  const more = products.filter((x) => x.category !== p.category).slice(0, 4 - related.length);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <nav className="kyd-eyebrow py-5 text-white/40">
          <Link href="/kyd/store" className="hover:text-white">Store</Link> <span className="mx-2">/</span> {p.category}
        </nav>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="grid grid-cols-2 gap-2">
            {p.images.map((src, i) => (
              <div key={src} className={`relative aspect-square overflow-hidden bg-white/5 ${i === 0 ? 'col-span-2' : ''}`}>
                <Image src={src} alt={`${p.name} view ${i + 1}`} fill priority={i === 0} sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            {p.badge && (
              <span className="kyd-eyebrow inline-block px-2 py-1 text-[10px] text-white" style={{ background: 'var(--kyd-red)' }}>{p.badge}</span>
            )}
            <h1 className="kyd-display mt-3 text-5xl uppercase leading-[0.95] md:text-6xl">{p.name}</h1>
            <p className="kyd-condensed mt-3 text-3xl font-bold">
              {p.compareAt && <span className="mr-3 text-white/35 line-through">{formatPrice(p.compareAt)}</span>}
              {formatPrice(p.price)}
            </p>
            <div className="mt-6 space-y-3 text-white/70">
              {(p.description ?? [p.blurb]).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-8 border-t border-white/10 pt-8">
              <AddToCart product={p} />
            </div>
            <p className="mt-6 text-xs text-white/40">Ships from the USA. Checkout opens soon.</p>
          </div>
        </div>

        <section className="mt-20 border-t border-white/10 pt-10">
          <h2 className="kyd-condensed text-2xl font-extrabold uppercase tracking-[0.14em] text-white/70">You might also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[...related, ...more].map((x) => (
              <Link key={x.slug} href={`/kyd/store/${x.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden bg-white/5">
                  <Image src={x.images[0]} alt={x.name} fill sizes="25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="mt-2 flex justify-between gap-2">
                  <p className="kyd-condensed font-bold uppercase tracking-wide">{x.name}</p>
                  <p className="kyd-condensed font-bold">{formatPrice(x.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
