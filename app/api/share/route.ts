import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { hasStore, save } from '@/lib/store';
export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (raw.length > 60000) return NextResponse.json({ error: 'Materiál je príliš veľký.' }, { status: 413 });
  try { JSON.parse(raw); } catch { return NextResponse.json({ error: 'Neplatné dáta.' }, { status: 400 }); }
  if (!hasStore()) return NextResponse.json({ error: 'nostore' }, { status: 501 });
  const id = randomBytes(6).toString('base64url');
  try { await save(`z/${id}.json`, raw); } catch (e) { console.error(e); return NextResponse.json({ error: 'nostore' }, { status: 501 }); }
  return NextResponse.json({ id });
}
