import { NextRequest, NextResponse } from 'next/server';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { list } from '@vercel/blob';
import { hasStore, load, remove, save } from '@/lib/store';

// Hlásenia chýb od učiteľov. Ukladajú sa do úložiska ako hlasenia/<dátum>-<id>.json.
// Zoznam a mazanie sú len pre správcu s kľúčom KLBKO_ADMIN_KEY (nastavuje sa vo Verceli).
const KINDS = ['obsah', 'zobrazenie', 'navrh', 'ine'];
const cut = (v: unknown, n: number) => (typeof v === 'string' ? v.trim().slice(0, n) : '');

function isAdmin(req: NextRequest) {
  const want = process.env.KLBKO_ADMIN_KEY || '';
  const got = req.headers.get('x-klbko-admin') || '';
  if (!want || !got) return false;
  const a = Buffer.from(want), b = Buffer.from(got);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (raw.length > 20000) return NextResponse.json({ error: 'Hlásenie je príliš dlhé.' }, { status: 413 });
  let d: Record<string, unknown>;
  try { d = JSON.parse(raw); } catch { return NextResponse.json({ error: 'Neplatné dáta.' }, { status: 400 }); }
  if (cut(d.web, 200)) return NextResponse.json({ ok: true }); // pasca na roboty
  const text = cut(d.text, 3000);
  if (text.length < 5) return NextResponse.json({ error: 'Napíšte prosím, čo je zle.' }, { status: 400 });
  if (!hasStore()) return NextResponse.json({ error: 'nostore' }, { status: 501 });
  const c = (d.ctx && typeof d.ctx === 'object' ? d.ctx : {}) as Record<string, unknown>;
  const now = new Date();
  const id = now.toISOString().slice(0, 10) + '-' + randomBytes(9).toString('base64url');
  const rec = {
    id, at: now.toISOString(),
    kind: KINDS.includes(String(d.kind)) ? String(d.kind) : 'ine',
    text, email: cut(d.email, 200),
    ctx: { topic: cut(c.topic, 120), title: cut(c.title, 200), form: cut(c.form, 40), level: cut(c.level, 40), page: cut(c.page, 300) },
    ua: cut(req.headers.get('user-agent'), 300),
  };
  try { await save(`hlasenia/${id}.json`, JSON.stringify(rec)); }
  catch (e) { console.error(e); return NextResponse.json({ error: 'nostore' }, { status: 501 }); }
  return NextResponse.json({ ok: true, id });
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Nesprávny kľúč správcu.' }, { status: 401 });
  if (!hasStore()) return NextResponse.json({ items: [] });
  const out: unknown[] = [];
  let cursor: string | undefined;
  do {
    const r = await list({ prefix: 'hlasenia/', cursor, limit: 1000 });
    for (const b of r.blobs) { const x = await load(b.pathname); if (x) out.push(x); }
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor && out.length < 500);
  out.sort((a, b) => String((b as { at: string }).at).localeCompare(String((a as { at: string }).at)));
  return NextResponse.json({ items: out });
}

export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Nesprávny kľúč správcu.' }, { status: 401 });
  const id = req.nextUrl.searchParams.get('id') || '';
  if (!/^[\w-]{6,40}$/.test(id)) return NextResponse.json({ error: 'Neplatné id.' }, { status: 400 });
  try { await remove(`hlasenia/${id}.json`); } catch (e) { console.error(e); return NextResponse.json({ error: 'Nepodarilo sa zmazať.' }, { status: 500 }); }
  return NextResponse.json({ ok: true });
}
