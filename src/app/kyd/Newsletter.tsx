'use client';

import { useState } from 'react';

/* Placeholder signup. Wire to Mailchimp (the existing list) or the chosen
   store's customer list later; for now it just confirms locally. */

export default function Newsletter({ light = false }: { light?: boolean }) {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState('');
  if (done) {
    return <p className="mt-3 text-sm opacity-80">You&apos;re on the list. Talk soon.</p>;
  }
  return (
    <form
      className="mt-3 flex max-w-sm"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.includes('@')) setDone(true);
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className={`min-w-0 flex-1 border px-3 py-2.5 text-sm outline-none ${
          light ? 'border-black/20 bg-white text-black placeholder:text-black/40' : 'border-white/20 bg-white/5 text-white placeholder:text-white/40'
        }`}
      />
      <button type="submit" className="kyd-btn kyd-btn-red !px-4 !py-2.5 !text-[13px]">
        Sign up
      </button>
    </form>
  );
}
