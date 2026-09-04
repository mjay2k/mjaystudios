'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from './CartProvider';
import { checkout } from './checkout';
import { Icon } from '../icons';
import { formatPrice } from '@/data/kyd/products';

export default function CartDrawer() {
  const cart = useCart();
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!cart.open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && cart.setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [cart]);

  if (!cart.open) return null;

  async function onCheckout() {
    setBusy(true);
    setNotice(null);
    const res = await checkout(cart.items);
    setBusy(false);
    if (res.ok && res.url) window.location.href = res.url;
    else setNotice(res.message ?? 'Something went wrong.');
  }

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal aria-label="Cart">
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={() => cart.setOpen(false)}
        aria-label="Close cart"
      />
      <aside
        className="kyd-slide-in absolute right-0 top-0 flex h-full w-full max-w-md flex-col"
        style={{ background: 'var(--kyd-ink)', color: 'var(--kyd-cream)' }}
      >
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="kyd-condensed text-xl font-extrabold uppercase tracking-[0.12em]">
            Your cart <span className="text-white/40">({cart.count})</span>
          </h2>
          <button onClick={() => cart.setOpen(false)} aria-label="Close" className="p-1 text-white/60 hover:text-white">
            <Icon.close className="h-6 w-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Icon.cart className="h-10 w-10 text-white/25" />
              <p className="mt-4 text-white/60">Nothing in here yet.</p>
              <Link href="/kyd/store" onClick={() => cart.setOpen(false)} className="kyd-btn kyd-btn-red mt-6">
                Shop merch
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {cart.items.map((i) => (
                <li key={i.key} className="flex gap-4 py-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-white/5">
                    <Image src={i.image} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="kyd-condensed truncate text-lg font-bold uppercase tracking-wide">{i.name}</p>
                    {i.option && <p className="text-sm text-white/50">{i.option}</p>}
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center border border-white/15">
                        <button className="px-2.5 py-1 text-white/70 hover:text-white" onClick={() => cart.setQty(i.key, i.qty - 1)} aria-label="Decrease">−</button>
                        <span className="min-w-[2ch] text-center text-sm">{i.qty}</span>
                        <button className="px-2.5 py-1 text-white/70 hover:text-white" onClick={() => cart.setQty(i.key, i.qty + 1)} aria-label="Increase">+</button>
                      </div>
                      <button className="text-xs uppercase tracking-wider text-white/40 hover:text-white" onClick={() => cart.remove(i.key)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="kyd-condensed text-lg font-bold">{formatPrice(i.price * i.qty)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.items.length > 0 && (
          <footer className="border-t border-white/10 px-5 py-5">
            <div className="flex items-center justify-between">
              <span className="kyd-eyebrow text-white/50">Subtotal</span>
              <span className="kyd-condensed text-2xl font-extrabold">{formatPrice(cart.subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-white/40">Shipping and tax calculated at checkout.</p>
            {notice && (
              <p className="mt-3 border border-[color:var(--kyd-gold)]/40 bg-[color:var(--kyd-gold)]/10 px-3 py-2 text-sm text-[color:var(--kyd-gold-bright)]">
                {notice}
              </p>
            )}
            <button onClick={onCheckout} disabled={busy} className="kyd-btn kyd-btn-red mt-4 w-full disabled:opacity-60">
              {busy ? 'One sec…' : 'Checkout'}
            </button>
            <button onClick={cart.clear} className="mt-3 w-full text-center text-xs uppercase tracking-wider text-white/40 hover:text-white">
              Clear cart
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
