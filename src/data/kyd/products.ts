// Store catalog. Backend-agnostic: the shape is plain enough to map onto
// Shopify, Stripe, or WooCommerce later. Seeded from the current WooCommerce
// store on kentuckydom.com (2026-09-04). New merch: append here.

export type ProductCategory = 'Shirts' | 'Hats' | 'Cards';

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Product {
  slug: string;
  name: string;
  price: number; // USD
  compareAt?: number; // strike-through price when on sale
  category: ProductCategory;
  images: string[]; // first image is the card image
  blurb: string; // one line for cards
  description?: string[]; // paragraphs for the product page
  options?: ProductOption[];
  badge?: string;
  /** Legacy WooCommerce id, kept for migration. */
  legacyId?: number;
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

export const products: Product[] = [
  {
    slug: 'black-dom-shirt',
    name: 'Black Dom Tee',
    price: 27,
    category: 'Shirts',
    images: ['/kyd/products/black-shirt-1.jpg', '/kyd/products/black-shirt-2.jpg'],
    blurb: 'Soft black tee with the Kentucky Dom rooster on the chest.',
    description: [
      'The everyday one. Black cotton tee with the Kentucky Dom rooster patch printed left chest.',
      'Unisex fit. Runs true to size.',
    ],
    options: [{ name: 'Size', values: SIZES }],
    legacyId: 111,
  },
  {
    slug: 'white-dom-shirt',
    name: 'White Dom Tee',
    price: 27,
    category: 'Shirts',
    images: ['/kyd/products/white-shirt-1.jpg', '/kyd/products/white-shirt-2.jpg'],
    blurb: 'Clean white tee, rooster on the chest.',
    description: ['White cotton tee with the Kentucky Dom rooster printed left chest.', 'Unisex fit. Runs true to size.'],
    options: [{ name: 'Size', values: SIZES }],
    legacyId: 106,
  },
  {
    slug: 'camo-dom-shirt',
    name: 'Camo Dom Tee',
    price: 27,
    category: 'Shirts',
    images: ['/kyd/products/camo-shirt-1.jpg', '/kyd/products/camo-shirt-2.jpg'],
    blurb: 'Camo tee with the full-size rooster and wordmark.',
    description: ['Woodland camo tee with the large Kentucky Dom rooster and wordmark across the chest.', 'Unisex fit. Runs true to size.'],
    options: [{ name: 'Size', values: SIZES }],
    badge: 'Fan favorite',
    legacyId: 116,
  },
  {
    slug: 'black-dom-hat',
    name: 'Black Dom Hat',
    price: 22,
    category: 'Hats',
    images: ['/kyd/products/black-hat-1.jpg', '/kyd/products/black-hat-2.jpg'],
    blurb: 'Black trucker cap with the rooster patch.',
    description: ['Black mesh-back trucker cap with the embroidered Kentucky Dom rooster patch.', 'Snapback, one size.'],
    legacyId: 121,
  },
  {
    slug: 'camo-dom-hat',
    name: 'Camo Dom Hat',
    price: 22,
    category: 'Hats',
    images: ['/kyd/products/camo-hat-1.jpg', '/kyd/products/camo-hat-2.jpg'],
    blurb: 'Camo trucker cap with the rooster patch.',
    description: ['Woodland camo trucker cap with the embroidered Kentucky Dom rooster patch.', 'Snapback, one size.'],
    legacyId: 127,
  },
  {
    slug: 'american-privilege-card',
    name: 'The American Privilege Card',
    price: 10,
    compareAt: 20,
    category: 'Cards',
    images: [
      '/kyd/products/american-privilege-card-1.jpg',
      '/kyd/products/american-privilege-card-front.png',
      '/kyd/products/american-privilege-card-back.png',
    ],
    blurb: 'A tribute to the greatness of being an American citizen.',
    description: [
      'A tribute to the greatness of being an American citizen. Whether you\'re at a barbecue, at a party, or simply hanging out with friends, this card lets you boast your pride in being part of the land of the free.',
      'Packed with patriotic easter eggs, it\'s a light-hearted way to say "I\'m proud to be an American." Carry it wherever you go and embrace the privilege of being part of the best nation on earth.',
    ],
    badge: 'Sale',
    legacyId: 730,
  },
  {
    slug: 'faith-card',
    name: 'The Faith Card',
    price: 10,
    compareAt: 20,
    category: 'Cards',
    images: ['/kyd/products/faith-card-1.jpg', '/kyd/products/faith-card-front.png', '/kyd/products/faith-card-back.png'],
    blurb: 'A reminder of God\'s love and the power of faith. More precious than gold.',
    description: [
      'A beautiful reminder of God\'s love and the power of faith. Not just a card, it\'s a symbol of belief, hope, and devotion.',
      'Keep it in your wallet or on your desk as a constant reminder that your faith in God is always with you. Filled with thoughtful easter eggs that lift your spirit every time you look at it.',
    ],
    badge: 'Sale',
    legacyId: 743,
  },
];

export const categories: ProductCategory[] = ['Shirts', 'Hats', 'Cards'];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const formatPrice = (n: number) => `$${n.toFixed(n % 1 === 0 ? 0 : 2)}`;
