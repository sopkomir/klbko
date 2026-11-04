import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { randomBytes } from 'node:crypto';

export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (raw.length > 60000) return NextResponse.json({ error: 'Materiál je príliš veľký.' }, { status: 413 });
  try { JSON.parse(raw); } catch { return NextResponse.json({ error: 'Neplatné dáta.' }, { status: 400 }); }
  if (!process.env.BLOB_STORE_ID && !process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ error: 'nostore' }, { status: 501 });
  const id = randomBytes(6).toString('base64url');
  const opts = { addRandomSuffix: false, contentType: 'application/json' };
  try {
    await put(`z/${id}.json`, raw, { ...opts, access: 'public' });
  } catch {
    try {
      await put(`z/${id}.json`, raw, { ...opts, access: 'private' });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: 'nostore' }, { status: 501 });
    }
  }
  return NextResponse.json({ id });
}
