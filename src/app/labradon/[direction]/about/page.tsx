import type { Metadata } from 'next';
import type { DirectionId } from '../../_lab/directions';
import { AboutView } from '../../_lab/Views';

export const metadata: Metadata = { title: 'LabraDon Properties | About' };

export default async function Page({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  return <AboutView dir={direction as DirectionId} />;
}
