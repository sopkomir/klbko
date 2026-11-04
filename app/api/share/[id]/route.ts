import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[\w-]{4,20}$/.test(id) || !process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ error: 'Nenašlo sa.' }, { status: 404 });
  const { blobs } = await list({ prefix: `z/${id}.json`, limit: 1 });
  if (!blobs[0]) return NextResponse.json({ error: 'Nenašlo sa.' }, { status: 404 });
  return NextResponse.json(await (await fetch(blobs[0].url)).json());
}
