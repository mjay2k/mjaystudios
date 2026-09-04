'use client';

import { useCart } from './CartProvider';
import { Icon } from '../icons';

export default function CartButton({ className = '' }: { className?: string }) {
  const { count, setOpen } = useCart();
  return (
    <button
      onClick={() => setOpen(true)}
      aria-label={`Open cart, ${count} items`}
      className={`relative inline-flex items-center justify-center p-2 ${className}`}
    >
      <Icon.cart className="h-6 w-6" />
      {count > 0 && (
        <span
          className="kyd-condensed absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[11px] font-extrabold text-white"
          style={{ background: 'var(--kyd-red)' }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
