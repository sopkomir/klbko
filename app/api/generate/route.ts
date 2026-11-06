import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { AiError, askJson } from '@/lib/ai';
import { hasStore, load, save } from '@/lib/store';
import { byIds, find, type Program } from '@/lib/svp';
import { FORMS, KIND, formPrompt, guidePrompt, topicPrompt, validForm, type Q } from '@/lib/prompts';

export const maxDuration = 60;
const hits = new Map<string, { day: string; n: number }>();
const cache = new Map<string, unknown>();
const bad = (m: string, s = 400) => NextResponse.json({ error: m }, { status: s });
const COPY: Record<string, [string, number]> = {
  nokey: ['Aplikácia nemá nastavený kľúč k AI.', 503],
  key: ['Kľúč k AI je neplatný alebo nemá povolenie. Skontrolujte ho vo Verceli.', 502],
  limit: ['Bezplatný limit AI je na chvíľu vyčerpaný. Skúste to o minútu.', 429],
  credit: ['Záložná AI nemá kredit a hlavná práve neodpovedá. Skúste to o minútu.', 402],
  timeout: ['AI odpovedala príliš dlho. Skúste to ešte raz.', 504],
  model: ['Model AI odmietol požiadavku. Treba upraviť nastavenie modelu.', 502],
  invalid: ['AI vrátila neúplný výsledok. Skúste to ešte raz.', 502],
  down: ['AI je teraz nedostupná. Skúste to o chvíľu.', 502],
};

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => null);
  const type = b?.type, title = String(b?.title ?? '').trim().slice(0, 120), subject = String(b?.subject ?? '').slice(0, 60), grade = Number(b?.grade);
  if (!['topic', 'form', 'guide'].includes(type) || !title || !(grade >= 1 && grade <= 9)) return bad('Doplňte tému, predmet a ročník.');
  const q: Q = { title, subject, grade, notes: String(b?.notes ?? ''), form: b?.form };
  if (type === 'form' && !FORMS.includes(String(q.form))) return bad('Neznáma podoba.');
  const key = JSON.stringify([type, title.toLowerCase(), subject, grade, q.form, q.notes]);
  if (cache.has(key)) return NextResponse.json(cache.get(key));
  const shared = !q.notes && hasStore() ? 'cache/' + createHash('sha256').update(key).digest('hex').slice(0, 32) + '.json' : null;
  if (shared) {
    const hit = await load(shared);
    if (hit) { cache.set(key, hit); return NextResponse.json(hit); }
  }
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'local', day = new Date().toISOString().slice(0, 10);
  const u = hits.get(ip);
  const n = u?.day === day ? u.n : 0;
  if (n >= Number(process.env.DAILY_LIMIT || 60)) return bad('Dnešný limit je vyčerpaný. Skúste to zajtra.', 429);
  hits.set(ip, { day, n: n + 1 });
  try {
    let out: unknown;
    if (type === 'topic') {
      const cands = (['2023', '2015'] as Program[]).flatMap(program => find({ title, subject, grade, program, notes: q.notes }, 15).items);
      const { value: v, provider } = await askJson(topicPrompt(q, cands), x => !!KIND[x?.kind] && validForm(KIND[x.kind], x.data));
      const allowed = new Set(cands.map(c => c.id));
      out = { provider, kind: v.kind, why: String(v.why ?? ''), form: KIND[v.kind], data: v.data,
        alts: (Array.isArray(v.alts) ? v.alts : []).filter((a: string[]) => FORMS.includes(a?.[0])).map((a: string[]) => [a[0], String(a[1])]),
        standards: byIds((v.standards ?? []).filter((i: string) => allowed.has(i))) };
    } else if (type === 'form') {
      const { value, provider } = await askJson(formPrompt(q), x => validForm(q.form!, x));
      out = { provider, data: value };
    } else {
      const { value, provider } = await askJson(guidePrompt(q), x => !!x?.primer && x.steps?.length > 0 && x.traps?.length > 0);
      out = { provider, guide: { primer: String(value.primer), steps: value.steps, traps: value.traps, qa: value.qa ?? [] } };
    }
    if (cache.size > 300) cache.clear();
    cache.set(key, out);
    if (shared) await save(shared, JSON.stringify(out)).catch(e => console.error(e));
    return NextResponse.json(out);
  } catch (e) {
    const code = e instanceof AiError ? e.code : 'down';
    console.error(e);
    const [msg, status] = COPY[code] ?? COPY.down;
    return NextResponse.json({ error: msg, code }, { status });
  }
}
