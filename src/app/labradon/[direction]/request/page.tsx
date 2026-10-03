import type { Metadata } from 'next';
import { RequestView } from '../../_lab/Views';

export const metadata: Metadata = { title: 'LabraDon Properties | Request a walkthrough' };

export default async function Page({ searchParams }: { searchParams: Promise<{ for?: string }> }) {
  const { for: initialFor } = await searchParams;
  return <RequestView initialFor={initialFor} />;
}
