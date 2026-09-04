// Tiny external store for the cart so React can subscribe with
// useSyncExternalStore (no setState-in-effect, no hydration mismatch).

export interface CartItem {
  key: string; // slug + option
  slug: string;
  name: string;
  price: number;
  image: string;
  option?: string;
  qty: number;
}

const KEY = 'kyd-cart-v1';
const EMPTY: CartItem[] = [];
let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) items = JSON.parse(raw) as CartItem[];
  } catch {}
}

function set(next: CartItem[]) {
  items = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
  listeners.forEach((l) => l());
}

export const cartStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
  getSnapshot() {
    load();
    return items;
  },
  getServerSnapshot() {
    return EMPTY;
  },
  add(item: Omit<CartItem, 'key' | 'qty'>, qty = 1) {
    load();
    const key = item.option ? `${item.slug}:${item.option}` : item.slug;
    const i = items.findIndex((p) => p.key === key);
    if (i >= 0) {
      const next = [...items];
      next[i] = { ...next[i], qty: next[i].qty + qty };
      set(next);
    } else {
      set([...items, { ...item, key, qty }]);
    }
  },
  remove(key: string) {
    load();
    set(items.filter((i) => i.key !== key));
  },
  setQty(key: string, qty: number) {
    load();
    set(qty <= 0 ? items.filter((i) => i.key !== key) : items.map((i) => (i.key === key ? { ...i, qty } : i)));
  },
  clear() {
    set([]);
  },
};
