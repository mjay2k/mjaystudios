'use client';

import NavBar from '@/components/shell/NavBar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <div className="flex h-screen items-center justify-center pt-16">
        <h1 className="text-4xl font-bold">MJay Studios</h1>
      </div>
    </main>
  );
}
