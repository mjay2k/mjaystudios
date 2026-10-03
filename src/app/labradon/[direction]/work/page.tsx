import type { Metadata } from 'next';
import type { DirectionId } from '../../_lab/directions';
import { WorkView } from '../../_lab/Views';

export const metadata: Metadata = { title: 'LabraDon Properties | Our work' };

export default async function Page({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  return <WorkView dir={direction as DirectionId} />;
}
