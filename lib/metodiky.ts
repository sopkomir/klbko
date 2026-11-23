import db from '@/data/metodiky.json';

type Row = [number, number, string];
type Src = { title: string; url: string; tags: string[] };
const rows = db.rows as unknown as Row[];
const sources = db.sources as Src[];
export type Passage = { id: string; title: string; url: string; page: number; text: string };

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const STOP = new Set(['a', 'i', 'v', 'na', 'do', 'z', 'zo', 'so', 's', 'k', 'pre', 'pri', 'je', 'su', 'ako', 'alebo', 'ich', 'tema', 'rocnik', 'ziaci', 'ziakov', 'skola', 'hodina']);
const stems = (s: string) => [...new Set(norm(s).match(/[a-z0-9]{3,}/g) ?? [])].filter(w => !STOP.has(w)).map(w => w.slice(0, Math.max(4, Math.ceil(w.length * 0.7))));
let N: string[] | null = null;
const normed = () => (N ??= rows.map(r => norm(r[2] + ' ' + sources[r[0]].title + ' ' + sources[r[0]].tags.join(' '))));

export function findMethod(title: string, subject: string, limit = 5): Passage[] {
  const t = stems(title), s = stems(subject), all = normed();
  if (!t.length) return [];
  const idf = new Map(t.map(w => { let n = 0; for (const x of all) if (x.includes(w)) n++; return [w, n ? Math.log(1 + all.length / n) : 0]; }));
  const scored: { i: number; v: number }[] = [];
  all.forEach((x, i) => {
    let v = 0, hit = 0;
    for (const w of t) if (x.includes(w)) { v += idf.get(w)!; hit++; }
    if (!hit || (t.length >= 2 && hit < Math.min(t.length, 3) - (t.length > 3 ? 1 : 0))) return;
    v *= hit === t.length ? 1.5 : (hit / t.length) ** 2;
    if (/metodick|priruck|sprievod/.test(x.slice(-200))) v += 0.5;
    if (/ (jsou|které|nebo|ještě|děti) /.test(x)) v *= 0.3;
    for (const w of s) if (x.includes(w)) v += 0.6;
    scored.push({ i, v });
  });
  scored.sort((a, b) => b.v - a.v);
  const per = new Map<number, number>(), out: Passage[] = [];
  for (const { i, v } of scored) {
    if (out.length >= limit || v < 2) break;
    const r = rows[i], k = per.get(r[0]) ?? 0;
    if (k >= 2) continue;
    per.set(r[0], k + 1);
    const src = sources[r[0]];
    out.push({ id: 'M' + i, title: src.title, url: src.url + (r[1] ? '#page=' + r[1] : ''), page: r[1], text: r[2] });
  }
  return out;
}
export const methodById = (ids: unknown, pool: Passage[]) => {
  const m = new Map(pool.map(p => [p.id, p]));
  return (Array.isArray(ids) ? ids : []).map(String).filter(id => m.has(id)).map(id => { const { text: _t, ...p } = m.get(id)!; return p; });
};
