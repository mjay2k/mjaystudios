import type { Metadata } from 'next';
import { directions, isDirection } from '../_lab/directions';
import { RentReadyHome } from '../_lab/RentReadyHome';
import { TheFinishHome } from '../_lab/TheFinishHome';

type Props = { params: Promise<{ direction: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { direction } = await params;
  const name = isDirection(direction) ? directions[direction].name : '';
  return { title: `LabraDon Properties | ${name} preview` };
}

export default async function DirectionHome({ params }: Props) {
  const { direction } = await params;
  return direction === 'the-finish' ? <TheFinishHome /> : <RentReadyHome />;
}
