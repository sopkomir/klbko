import { NextRequest, NextResponse } from 'next/server';
import { get } from '@vercel/blob';

const missing = () => NextResponse.json({ error: 'Nenašlo sa.' }, { status: 404 });

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[\w-]{4,20}$/.test(id)) return missing();
  for (const access of ['public', 'private'] as const) {
    try {
      const r = await get(`z/${id}.json`, { access });
      if (r?.stream) return NextResponse.json(await new Response(r.stream).json());
    } catch { /* skúsi druhý typ úložiska */ }
  }
  return missing();
}
