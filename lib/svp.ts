import db from '@/data/svp.json';

type Row = [string, string, number | null, string, string[], string, string[], number, number];
const rows = db.rows as unknown as Row[];
const sources = db.sources as { url: string; label: string }[];
export type Program = '2023' | '2015';
export type Standard = { id: string; kind: string; text: string; where: string; source: string; url: string; page: number };

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const STOP = new Set(['a', 'i', 'v', 'vo', 'na', 'do', 'z', 'zo', 'so', 's', 'k', 'ku', 'pre', 'pri', 'je', 'su', 'ako', 'alebo', 'ich', 'jeho', 'tema']);
const stems = (s: string) => [...new Set(norm(s).match(/[a-z0-9]{3,}/g) ?? [])].filter(w => !STOP.has(w)).map(w => w.slice(0, Math.max(4, Math.ceil(w.length * 0.7))));

export const cycleOf = (g: number) => (g <= 3 ? 1 : g <= 5 ? 2 : 3);
const MAP23: Record<string, string> = {
  'Človek a príroda': 'Človek a príroda', Biológia: 'Človek a príroda', Fyzika: 'Človek a príroda', Chémia: 'Človek a príroda',
  'Človek a spoločnosť': 'Človek a spoločnosť', Dejepis: 'Človek a spoločnosť', Geografia: 'Človek a spoločnosť', 'Občianska náuka': 'Človek a spoločnosť',
  Matematika: 'Matematika a informatika', Informatika: 'Matematika a informatika', 'Slovenský jazyk a literatúra': 'Slovenský jazyk a literatúra',
  'Cudzí jazyk': 'Cudzie jazyky', 'Hudobná výchova': 'Umenie a kultúra', 'Výtvarná výchova': 'Umenie a kultúra',
  'Človek a svet práce': 'Človek a svet práce', 'Telesná a športová výchova': 'Telesná a športová výchova',
};
const TAG: Record<string, string> = { Biológia: 'B', Fyzika: 'F', Chémia: 'CH' };
const COMP: Record<string, string> = { Dejepis: 'Dejepisný', Geografia: 'Geografický', 'Občianska náuka': 'Občiansky' };
function subjects15(s: string, g: number): string[] {
  if (s === 'Človek a príroda') return g <= 2 ? ['Prvouka'] : g <= 4 ? ['Prírodoveda'] : ['Biológia', 'Fyzika', 'Chémia'];
  if (s === 'Človek a spoločnosť') return g <= 4 ? ['Vlastiveda'] : ['Dejepis', 'Geografia', 'Občianska náuka'];
  if (s === 'Človek a svet práce') return g <= 4 ? ['Pracovné vyučovanie'] : ['Technika'];
  return [s];
}
export function find(q: { title: string; subject: string; grade: number; program: Program; notes?: string }, limit = 12): { items: Standard[]; exact: boolean } {
  const t = stems(q.title), extra = stems((q.notes ?? '').slice(0, 300));
  const sub = q.program === '2023' ? [MAP23[q.subject] ?? q.subject] : subjects15(q.subject, q.grade);
  const stage = q.program === '2023' ? cycleOf(q.grade) : q.grade;
  const score = (r: Row) => {
    const hay = norm(r[5] + ' ' + r[4].join(' '));
    let s = 0;
    for (const w of t) if (hay.includes(w)) s += r[4].some(p => norm(p).includes(w)) ? 3 : 4;
    for (const w of extra) if (hay.includes(w)) s += 1;
    if (TAG[q.subject] && r[6].includes(TAG[q.subject])) s += 1.5;
    if (COMP[q.subject] && r[4][0]?.startsWith(COMP[q.subject])) s += 2;
    if (r[3] === 'obsahovy') s += 0.2;
    return s;
  };
  const pick = (exactStage: boolean) => rows
    .map((r, i) => ({ r, i }))
    .filter(({ r }) => r[0] === q.program && sub.includes(r[1]) && (!exactStage || r[2] === null || r[2] === stage))
    .map(x => ({ ...x, s: score(x.r) }))
    .filter(x => x.s >= 3)
    .sort((a, b) => b.s - a.s);
  let hits = pick(true);
  const exact = hits.length > 0;
  if (!exact) hits = pick(false);
  return { exact, items: hits.slice(0, limit).map(({ r, i }) => toStd(r, i)) };
}
function toStd(r: Row, i: number): Standard {
  const lvl = r[2] == null ? '' : r[0] === '2023' ? `${r[2]}. cyklus` : `${r[2]}. ročník`;
  const src = sources[r[7]];
  return { id: 'S' + i, kind: r[3] === 'vykonovy' ? 'výkonový štandard' : 'obsahový štandard', text: r[5], where: [lvl, r[1], ...r[4]].filter(Boolean).join(' · '), source: src.label, url: src.url, page: r[8] };
}
export const byIds = (ids: unknown): Standard[] => (Array.isArray(ids) ? ids : [])
  .map(x => /^S(\d+)$/.exec(String(x)))
  .flatMap(m => (m && rows[+m[1]] ? [toStd(rows[+m[1]], +m[1])] : []));
