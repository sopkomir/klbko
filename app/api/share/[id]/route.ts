import { NextRequest, NextResponse } from 'next/server';
import { load } from '@/lib/store';
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const v = /^[\w-]{4,20}$/.test(id) ? await load(`z/${id}.json`) : null;
  return v ? NextResponse.json(v) : NextResponse.json({ error: 'Nenašlo sa.' }, { status: 404 });
}
