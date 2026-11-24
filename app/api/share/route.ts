import { NextRequest, NextResponse } from 'next/server';
import { createHash, randomBytes } from 'node:crypto';
import { hasStore, load, save } from '@/lib/store';
const own = (key: string) => createHash('sha256').update(key).digest('hex');
export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (raw.length > 250000) return NextResponse.json({ error: 'Materiál je príliš veľký.' }, { status: 413 });
  let data: Record<string, unknown>;
  try { data = JSON.parse(raw); } catch { return NextResponse.json({ error: 'Neplatné dáta.' }, { status: 400 }); }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return NextResponse.json({ error: 'Neplatné dáta.' }, { status: 400 });
  if (!hasStore()) return NextResponse.json({ error: 'nostore' }, { status: 501 });
  // poznámky o triede sa na web neukladajú
  const t = data.t as Record<string, unknown> | undefined;
  if (t && typeof t === 'object') delete t.notes;
  delete data._owner;
  // tá istá príprava sa prepíše na rovnakom odkaze, ak sa autor preukáže kľúčom
  let id = '', key = '';
  const oldId = req.headers.get('x-klbko-id') || '', oldKey = req.headers.get('x-klbko-key') || '';
  if (/^[\w-]{4,20}$/.test(oldId) && oldKey) {
    const prev = await load(`z/${oldId}.json`) as Record<string, unknown> | null;
    if (prev && prev._owner === own(oldKey)) { id = oldId; key = oldKey; }
  }
  if (!id) { id = randomBytes(9).toString('base64url'); key = randomBytes(18).toString('base64url'); }
  data._owner = own(key);
  try { await save(`z/${id}.json`, JSON.stringify(data)); } catch (e) { console.error(e); return NextResponse.json({ error: 'nostore' }, { status: 501 }); }
  return NextResponse.json({ id, key });
}
