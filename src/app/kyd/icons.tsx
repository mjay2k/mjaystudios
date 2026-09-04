// Small inline icon set. Server-safe, no deps. Each takes className for sizing.

type P = { className?: string };

export const Icon = {
  facebook: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3z" />
    </svg>
  ),
  instagram: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.5 3c.3 2.3 1.7 3.8 4 4v3.1c-1.5 0-2.9-.5-4-1.3v6.4c0 3.3-2.6 5.8-5.9 5.8S4.7 18.5 4.7 15.2s2.6-5.8 5.9-5.8c.3 0 .6 0 .9.1v3.2c-.3-.1-.6-.2-.9-.2-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7V3h3.2z" />
    </svg>
  ),
  youtube: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22.5 7.2c-.3-1-1-1.7-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4c-1 .3-1.7 1-2 2C1 8.9 1 12 1 12s0 3.1.5 4.8c.3 1 1 1.7 2 2 1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4c1-.3 1.7-1 2-2 .5-1.7.5-4.8.5-4.8s0-3.1-.5-4.8zM9.8 15.1V8.9l5.7 3.1-5.7 3.1z" />
    </svg>
  ),
  x: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z" />
    </svg>
  ),
  spotify: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.4c-.2.3-.6.4-.9.2-2.5-1.5-5.6-1.9-9.3-1-.4.1-.7-.1-.8-.5-.1-.4.1-.7.5-.8 4-.9 7.5-.5 10.3 1.2.3.2.4.6.2.9zm1.2-2.7c-.2.4-.7.5-1.1.3-2.9-1.8-7.2-2.3-10.6-1.2-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 3.9-1.2 8.7-.6 12 1.4.4.2.5.7.2 1zm.1-2.8C14.5 8.9 8.8 8.7 5.5 9.7c-.5.2-1.1-.1-1.2-.6-.2-.5.1-1.1.6-1.2 3.8-1.2 10.1-.9 14.1 1.4.5.3.6.9.4 1.4-.3.4-.9.6-1.5.2z" />
    </svg>
  ),
  apple: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.4 12.6c0-2.5 2-3.7 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.8-1.7 0-3.2 1-4.1 2.5-1.8 3-.5 7.5 1.3 10 .8 1.2 1.8 2.6 3.2 2.5 1.3-.1 1.8-.8 3.3-.8s2 .8 3.3.8c1.4 0 2.2-1.2 3.1-2.5.9-1.4 1.3-2.7 1.4-2.8-.1 0-2.9-1.1-2.9-4.1zM14 5.3c.7-.8 1.2-2 1-3.2-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3.1 1.1.1 2.2-.6 2.9-1.4z" />
    </svg>
  ),
  deezer: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.8 4h4v2.5h-4zM18.8 8h4v2.5h-4zM13.4 8h4v2.5h-4zM18.8 12h4v2.5h-4zM13.4 12h4v2.5h-4zM8 12h4v2.5H8zM18.8 16h4v2.5h-4zM13.4 16h4v2.5h-4zM8 16h4v2.5H8zM2.6 16h4v2.5h-4z" />
    </svg>
  ),
  amazon: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden>
      <path d="M3 16.5c4.5 3.2 12 3.6 18 .3M19.5 16.2l1.8-.3-.6 1.8" />
      <path d="M8 9.5c0-1.7 1.4-2.5 3.3-2.5 2.1 0 3.2 1 3.2 2.8V14M14.5 11.3c-2.6.1-6.3.1-6.3 2.3 0 1.2 1 1.9 2.4 1.9 1.6 0 3.9-1 3.9-3" />
    </svg>
  ),
  cart: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 8H6.5" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17.5" cy="20" r="1.3" />
    </svg>
  ),
  close: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  play: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  ),
  arrow: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  menu: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  mail: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  cross: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M10 2h4v6h6v4h-6v10h-4V12H4V8h6z" />
    </svg>
  ),
  star: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.4 5.8 21l1.6-7L2 9.3l7.1-.7z" />
    </svg>
  ),
};

export type IconName = keyof typeof Icon;
