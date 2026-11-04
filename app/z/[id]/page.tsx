import Studio from '@/app/studio';
export const metadata = { title: 'Klbko pre žiakov', robots: 'noindex' };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Studio share={id} />;
}
