import { NextRequest, NextResponse } from 'next/server';
import { libById, libFull, libIndex } from '@/lib/temy';

export function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ items: libIndex() }, { headers: { 'cache-control': 'public, max-age=300' } });
  const t = libById(id);
  return t ? NextResponse.json(libFull(t)) : NextResponse.json({ error: 'Téma sa nenašla.' }, { status: 404 });
}
