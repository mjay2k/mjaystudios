// The single swap point for a real backend. Today it is a placeholder.
// When a backend is chosen (Shopify Storefront, Stripe Checkout, Woo REST),
// replace the body of checkout() and keep the signature.

import type { CartItem } from './store';

export interface CheckoutResult {
  ok: boolean;
  /** Where to send the shopper when ok is true. */
  url?: string;
  message?: string;
}

export async function checkout(items: CartItem[]): Promise<CheckoutResult> {
  if (items.length === 0) return { ok: false, message: 'Your cart is empty.' };
  await new Promise((r) => setTimeout(r, 500));
  return {
    ok: false,
    message: 'Checkout is coming soon. Until then, grab it at kentuckydom.com.',
  };
}
