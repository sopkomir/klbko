import { NextRequest, NextResponse } from 'next/server';
import { createHash, timingSafeEqual } from 'node:crypto';
import { load, remove } from '@/lib/store';
type P = { params: Promise<{ id: string }> };
const ok = (id: string) => /^[\w-]{4,20}$/.test(id);
export async function GET(_: NextRequest, { params }: P) {
  const { id } = await params;
  const v = ok(id) ? (await load(`z/${id}.json`)) as Record<string, unknown> | null : null;
  if (!v) return NextResponse.json({ error: 'Nenašlo sa.' }, { status: 404 });
  const { _owner, ...rest } = v; void _owner;
  return NextResponse.json(rest, { headers: { 'cache-control': 'no-store' } });
}
export async function DELETE(req: NextRequest, { params }: P) {
  const { id } = await params;
  const key = req.headers.get('x-klbko-key') || '';
  if (!ok(id) || !key) return NextResponse.json({ error: 'Chýba kľúč.' }, { status: 400 });
  const v = await load(`z/${id}.json`) as Record<string, unknown> | null;
  if (!v) return NextResponse.json({ ok: true, gone: true });
  const want = typeof v._owner === 'string' ? Buffer.from(v._owner, 'hex') : null;
  const got = createHash('sha256').update(key).digest();
  if (!want || want.length !== got.length || !timingSafeEqual(want, got)) return NextResponse.json({ error: 'Túto prípravu môže zmazať len ten, kto ju uložil.' }, { status: 403 });
  try { await remove(`z/${id}.json`); } catch (e) { console.error(e); return NextResponse.json({ error: 'Zmazanie sa nepodarilo.' }, { status: 502 }); }
  return NextResponse.json({ ok: true });
}
