// Blog content layer for Jesus Anoints Ministries.
//
// ── Sanity-ready by design ────────────────────────────────────────────────
// Today this returns local placeholder posts. When the Sanity project is set
// up, swap ONLY the two functions at the bottom (getAllPosts / getPostBySlug)
// to fetch from Sanity — every consumer (blog index, post page, homepage
// teaser) already awaits them and renders the `Post` shape below, so nothing
// else changes. A reference GROQ query is included in a comment for that step.
//
// The `Post.body` block model is intentionally a small subset of Sanity's
// Portable Text (paragraph / heading / quote), so the Sanity migration is a
// mechanical Portable-Text → Block mapping.

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'quote'; text: string; cite?: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  author: string;
  tag: 'Prophecy' | 'Teaching' | 'Public Record' | 'Testimony';
  readingMinutes: number;
  cover?: string; // /jaministries/... path, optional
  body: Block[];
};

// ── Placeholder content ────────────────────────────────────────────────────
// Three representative posts so the design reads as a real, full blog. Replace
// with Sanity-managed content; these mirror the ministry's actual themes.
const PLACEHOLDER_POSTS: Post[] = [
  {
    slug: 'iran-war-prophecies-fulfilled',
    title: 'Iran War Prophecies Fulfilled',
    excerpt:
      'A public record of what was spoken before it happened, and the call to pray for the nations in a season of shaking.',
    date: '2026-06-14',
    author: 'Evangelist Samuel Meesala',
    tag: 'Public Record',
    readingMinutes: 6,
    cover: '/jaministries/curated/doves-sky-clean.jpg',
    body: [
      {
        kind: 'p',
        text: 'There are seasons when the Lord makes known the end from the beginning, not to satisfy curiosity, but to turn hearts to Himself. What follows is offered as a public record, written plainly, dated, and held up to the light of Scripture, so that God alone receives the glory.',
      },
      {
        kind: 'quote',
        text: 'I make known the end from the beginning, from ancient times, what is still to come.',
        cite: 'Isaiah 46:10',
      },
      { kind: 'h2', text: 'A word given in advance' },
      {
        kind: 'p',
        text: 'Long before the headlines, the burden came to pray for the nations: that conflict would be contained and not escalate, that leadership would be hemmed in, and that the Lord would move toward an end of hostility rather than years of ruin. We do not rejoice over judgment; we plead for mercy and for the gospel to go forward in the midst of it.',
      },
      { kind: 'h2', text: 'Why we keep a public record' },
      {
        kind: 'p',
        text: 'Prophecy is never about the messenger. It is tested, dated, and submitted to the whole counsel of the Word. We keep these accounts so that the faithfulness of God is remembered, so that the Church prays with understanding, and so that no one mistakes a gift for the Giver.',
      },
      {
        kind: 'p',
        text: 'Pray for the nations of this world, for peace, for justice, and for many to come to the knowledge of Jesus Christ while it is still called today.',
      },
    ],
  },
  {
    slug: 'when-spiritual-leadership-becomes-control',
    title: 'When Spiritual Leadership Becomes Control',
    excerpt:
      'True leadership releases, equips, and honors what God is doing in others. Here is how to tell the difference.',
    date: '2026-05-28',
    author: 'Evangelist Samuel Meesala',
    tag: 'Teaching',
    readingMinutes: 7,
    cover: '/jaministries/curated/family-cross.jpg',
    body: [
      {
        kind: 'p',
        text: 'The Holy Spirit gives leaders to the Church as a gift, to feed, to guard, and to build up. But there is a counterfeit that wears the same clothing. It says, “Follow the Spirit,” while resisting the Spirit whenever He moves through someone it cannot control.',
      },
      { kind: 'h2', text: 'Order is not the same as control' },
      {
        kind: 'p',
        text: 'Healthy order in the house of God protects people and makes room for the gifts. Control protects a position. It applies one standard to itself and another to everyone else, and it quietly silences the Word when the Word comes through an unexpected vessel.',
      },
      {
        kind: 'quote',
        text: 'Where the Spirit of the Lord is, there is liberty.',
        cite: '2 Corinthians 3:17',
      },
      { kind: 'h2', text: 'The marks of Spirit-led leadership' },
      {
        kind: 'p',
        text: 'True spiritual leadership releases rather than restrains. It equips the saints for the work of ministry instead of hoarding it. It honors what God is doing in others, even when it did not originate the work, because it fears God more than it fears losing influence.',
      },
      {
        kind: 'p',
        text: 'Ask the Lord for a heart like that: secure enough to celebrate the anointing on someone else, humble enough to be corrected, and free enough to let the Spirit lead.',
      },
    ],
  },
  {
    slug: 'the-exodus-reveals-christ',
    title: 'The Exodus Reveals Christ',
    excerpt:
      'From bondage to inheritance: the journey out of Egypt is a portrait of redemption, holiness, and the One who leads us home.',
    date: '2026-05-09',
    author: 'Evangelist Samuel Meesala',
    tag: 'Teaching',
    readingMinutes: 8,
    cover: '/jaministries/curated/doves-sky-clean.jpg',
    body: [
      {
        kind: 'p',
        text: 'The exodus is not merely Israel’s history; it is the gospel told in advance. A people in bondage, a lamb whose blood shelters them, a sea opened by the hand of God, a wilderness that tests and forms. Every scene leans forward to Christ.',
      },
      { kind: 'h2', text: 'From bondage to the blood of the Lamb' },
      {
        kind: 'p',
        text: 'Deliverance began not with striving but with a lamb. The doorposts marked by blood preached the cross long before Calvary: judgment passes over those who shelter beneath the appointed sacrifice.',
      },
      {
        kind: 'quote',
        text: 'Not by might, nor by power, but by My Spirit, says the Lord of hosts.',
        cite: 'Zechariah 4:6',
      },
      { kind: 'h2', text: 'From wilderness to inheritance' },
      {
        kind: 'p',
        text: 'The wilderness was never the destination. It was the school of dependence, where manna taught daily trust and the pillar of fire taught daily obedience, preparing a people to receive an inheritance they could never have seized on their own.',
      },
      {
        kind: 'p',
        text: 'So it is with us. Redeemed by the blood, led by the Spirit, formed in the wilderness, and bound for a promised inheritance kept by the faithfulness of God.',
      },
    ],
  },
];

// Sort newest-first; shared by every consumer.
const byDateDesc = (a: Post, b: Post) => (a.date < b.date ? 1 : -1);

// ── Public API (the only thing to swap for Sanity) ──────────────────────────
//
// Sanity version would look roughly like:
//   import { createClient } from 'next-sanity';
//   const client = createClient({ projectId, dataset, apiVersion, useCdn: true });
//   export async function getAllPosts() {
//     return client.fetch(`*[_type == "post"] | order(date desc){
//       "slug": slug.current, title, excerpt, date, author, tag,
//       readingMinutes, "cover": cover.asset->url, body
//     }`);
//   }
//   export async function getPostBySlug(slug: string) {
//     return client.fetch(`*[_type == "post" && slug.current == $slug][0]{...}`, { slug });
//   }

export async function getAllPosts(): Promise<Post[]> {
  return [...PLACEHOLDER_POSTS].sort(byDateDesc);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return PLACEHOLDER_POSTS.find((p) => p.slug === slug) ?? null;
}

export function formatPostDate(iso: string): string {
  // Stable, locale-independent format so server/client markup matches.
  const [y, m, d] = iso.split('-').map(Number);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}
