import type { Metadata } from 'next';
import type { DirectionId } from '../../_lab/directions';
import { ServicesView } from '../../_lab/Views';

export const metadata: Metadata = { title: 'LabraDon Properties | Services' };

export default async function Page({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  return <ServicesView dir={direction as DirectionId} />;
}
