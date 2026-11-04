import { NextRequest, NextResponse } from 'next/server';
import { askJson, NoProvider } from '@/lib/ai';
import { byIds, find, type Program } from '@/lib/svp';
import { FORMS, KIND, formPrompt, guidePrompt, topicPrompt, validForm, type Q } from '@/lib/prompts';

export const maxDuration = 60;
const hits = new Map<string, { day: string; n: number }>();
const cache = new Map<string, unknown>();
const bad = (m: string, s = 400) => NextResponse.json({ error: m }, { status: s });

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => null);
  const type = b?.type, title = String(b?.title ?? '').trim().slice(0, 120), subject = String(b?.subject ?? '').slice(0, 60), grade = Number(b?.grade);
  if (!['topic', 'form', 'guide'].includes(type) || !title || !(grade >= 1 && grade <= 9)) return bad('Doplňte tému, predmet a ročník.');
  const q: Q = { title, subject, grade, notes: String(b?.notes ?? ''), form: b?.form };
  if (type === 'form' && !FORMS.includes(String(q.form))) return bad('Neznáma podoba.');
  const key = JSON.stringify([type, title.toLowerCase(), subject, grade, q.form, q.notes]);
  if (cache.has(key)) return NextResponse.json(cache.get(key));
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'local', day = new Date().toISOString().slice(0, 10);
  const u = hits.get(ip);
  const n = u?.day === day ? u.n : 0;
  if (n >= Number(process.env.DAILY_LIMIT || 60)) return bad('Dnešný limit je vyčerpaný. Skúste to zajtra.', 429);
  hits.set(ip, { day, n: n + 1 });
  try {
    let out: unknown;
    if (type === 'topic') {
      const cands = (['2023', '2015'] as Program[]).flatMap(program => find({ title, subject, grade, program, notes: q.notes }, 30).items);
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
    return NextResponse.json(out);
  } catch (e) {
    if (e instanceof NoProvider) return bad('Aplikácia ešte nemá nastavený kľúč k AI.', 503);
    console.error(e);
    return bad('AI teraz nevie odpovedať. Skúste to o chvíľu.', 502);
  }
}
