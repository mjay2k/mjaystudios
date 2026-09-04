import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import { products, categories, formatPrice } from '@/data/kyd/products';

export const metadata: Metadata = {
  title: 'Store | Kentucky Dom',
  description: 'Official Kentucky Dom merch: tees, hats, and the American Privilege and Faith cards.',
};

export default function StorePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <section className="py-12 md:py-20">
          <p className="kyd-eyebrow text-white/40">Official merch</p>
          <h1 className="kyd-display mt-1 text-6xl uppercase leading-[0.9] md:text-8xl">Store</h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Wear the rooster. New drops coming. Sign up in the footer to hear first.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <a key={c} href={`#${c.toLowerCase()}`} className="kyd-btn kyd-btn-ghost !py-2 !text-[13px]">
                {c}
              </a>
            ))}
          </div>
        </section>

        {categories.map((c) => {
          const list = products.filter((p) => p.category === c);
          return (
            <section key={c} id={c.toLowerCase()} className="scroll-mt-24 border-t border-white/10 py-10 md:py-14">
              <h2 className="kyd-condensed text-2xl font-extrabold uppercase tracking-[0.14em] text-white/70">{c}</h2>
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
                {list.map((p) => (
                  <Link key={p.slug} href={`/kyd/store/${p.slug}`} className="group block">
                    <div className="relative aspect-square overflow-hidden bg-white/5">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      {p.images[1] && (
                        <Image
                          src={p.images[1]}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                          className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      )}
                      {p.badge && (
                        <span className="kyd-eyebrow absolute left-2 top-2 px-2 py-1 text-[10px] text-white" style={{ background: 'var(--kyd-red)' }}>
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="kyd-condensed text-xl font-bold uppercase leading-tight tracking-wide group-hover:underline">{p.name}</h3>
                        <p className="mt-0.5 text-sm text-white/50">{p.blurb}</p>
                      </div>
                      <p className="kyd-condensed shrink-0 text-xl font-bold">
                        {p.compareAt && <span className="mr-2 text-white/35 line-through">{formatPrice(p.compareAt)}</span>}
                        {formatPrice(p.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>
      <SiteFooter />
    </>
  );
}
