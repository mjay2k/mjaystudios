'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';
import type { Product } from '@/data/kyd/products';

export default function AddToCart({ product, compact = false }: { product: Product; compact?: boolean }) {
  const cart = useCart();
  const opt = product.options?.[0];
  const [value, setValue] = useState<string>(opt?.values[2] ?? opt?.values[0] ?? '');

  function add() {
    cart.add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      option: opt ? `${opt.name} ${value}` : undefined,
    });
  }

  if (compact) {
    return (
      <button onClick={add} className="kyd-btn kyd-btn-cream w-full">
        Add to cart
      </button>
    );
  }

  return (
    <div>
      {opt && (
        <div>
          <p className="kyd-eyebrow mb-2 text-white/50">{opt.name}</p>
          <div className="flex flex-wrap gap-2">
            {opt.values.map((v) => (
              <button
                key={v}
                onClick={() => setValue(v)}
                className="kyd-condensed min-w-[3rem] border px-3 py-2 text-sm font-bold uppercase tracking-wider transition-colors"
                style={
                  v === value
                    ? { background: 'var(--kyd-cream)', color: 'var(--kyd-black)', borderColor: 'var(--kyd-cream)' }
                    : { borderColor: 'rgba(243,234,216,0.25)' }
                }
                aria-pressed={v === value}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}
      <button onClick={add} className="kyd-btn kyd-btn-red mt-6 w-full sm:w-auto sm:min-w-[16rem]">
        Add to cart
      </button>
    </div>
  );
}
