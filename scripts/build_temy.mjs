// Zloží knižnicu pripravených tém zo súborov scripts/temy/*.mjs do data/temy.json a skontroluje ich tvar.
// Spustenie: node scripts/build_temy.mjs
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const dir = path.join(root, 'scripts/temy');
const svp = JSON.parse(fs.readFileSync(path.join(root, 'data/svp.json'), 'utf8')).rows;
const ICONS = new Set('sun cloud rain drop snow river mountain plant factory people crown book cross castle sword cell bolt star map'.split(' '));
const FORMS = ['scene', 'mind', 'timeline', 'venn', 'ttable', 'fish', 'cycle', 'tree', 'cards', 'quiz', 'vvn'];
const KIND = { pojmy: 'mind', chrono: 'timeline', porovnanie: 'venn', pricina: 'fish', proces: 'cycle', hierarchia: 'tree' };
const SHAPE = {
  mind: v => Array.isArray(v?.branches) && v.branches.length >= 3, timeline: v => Array.isArray(v?.events) && v.events.length >= 3,
  cycle: v => Array.isArray(v?.steps) && v.steps.length >= 3, venn: v => ['left', 'mid', 'right'].every(k => Array.isArray(v?.[k])),
  ttable: v => Array.isArray(v?.rows) && v.rows.every(r => r.length === 2), fish: v => Array.isArray(v?.groups) && v.groups.length >= 3,
  tree: v => Array.isArray(v?.root?.kids) && v.root.kids.length >= 2, vvn: v => ['know', 'want', 'learned'].every(k => Array.isArray(v?.[k])),
  quiz: v => Array.isArray(v) && v.length >= 3 && v.every(q => Array.isArray(q.o) && q.o[q.k] !== undefined && q.w),
  cards: v => Array.isArray(v) && v.length >= 4 && v.every(c => c.q && c.a),
  scene: v => /^<svg[\s>]/.test(v?.svg) && /<animate/.test(v.svg) && !/<text|<script|<image|style=/i.test(v.svg) && v.points?.length >= 3 && v.points.every(p => p.t && p.x >= 0 && p.x <= 100 && p.y >= 0 && p.y <= 100),
};
const errs = [];
const topics = [];
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.mjs')).sort()) {
  const list = (await import(pathToFileURL(path.join(dir, f)).href)).default;
  for (const t of list) {
    const at = `${f}:${t.id}`;
    for (const k of ['id', 'title', 'subject', 'grade', 'kind', 'rec', 'why', 'alts', 'std', 'method', 'guide', 'forms']) if (t[k] === undefined) errs.push(`${at}: chýba ${k}`);
    if (!KIND[t.kind]) errs.push(`${at}: zlý kind ${t.kind}`);
    if (!t.forms?.[t.rec]) errs.push(`${at}: chýba odporúčaná podoba ${t.rec}`);
    for (const [k, v] of Object.entries(t.forms ?? {})) {
      if (!FORMS.includes(k)) errs.push(`${at}: neznáma podoba ${k}`);
      else if (!SHAPE[k](v)) errs.push(`${at}: zlý tvar ${k}`);
    }
    for (const [a] of t.alts ?? []) if (!FORMS.includes(a)) errs.push(`${at}: zlá alternatíva ${a}`);
    const cyc = g => (g <= 3 ? 1 : g <= 5 ? 2 : 3);
    for (const id of t.std ?? []) {
      const r = svp[+String(id).slice(1)];
      if (!r) { errs.push(`${at}: neexistuje ${id}`); continue; }
      // ŠVP 2023 musí sedieť na cyklus, ŠVP 2015 na ročník (±1, lebo programy učivo rozkladajú inak)
      if (r[2] != null && (r[0] === '2023' ? r[2] !== cyc(t.grade) : Math.abs(r[2] - t.grade) > 1)) errs.push(`${at}: ${id} nepatrí k ${t.grade}. ročníku`);
    }
    // každá téma má štandard ŠVP 2023, alebo vysvetlenie, prečo ho nemá
    if (!(t.std ?? []).some(id => svp[+String(id).slice(1)]?.[0] === '2023') && !t.svpnote) errs.push(`${at}: chýba štandard ŠVP 2023 aj vysvetlenie svpnote`);
    const g = t.guide;
    if (!(g?.primer && g.steps?.length >= 3 && g.traps?.length >= 2 && g.qa?.length >= 1)) errs.push(`${at}: neúplný sprievodca`);
    if (!(t.method?.goals?.length && t.method.plan?.length)) errs.push(`${at}: neúplná metodika`);
    JSON.stringify(t.forms, (k, v) => { if (k === 'ic' && !ICONS.has(v)) errs.push(`${at}: neznámy piktogram ${v}`); return v; });
    for (const m of (t.forms?.scene?.svg ?? '').matchAll(/<animate\w*\b[^>]*>/g)) {
      const kt = /keyTimes="([^"]+)"/.exec(m[0]), vs = /values="([^"]+)"/.exec(m[0]);
      if (kt) { const k = kt[1].split(';').map(Number); if (!vs || vs[1].split(';').length !== k.length || k[0] !== 0 || k.at(-1) !== 1) errs.push(`${at}: chybné keyTimes v animácii`); }
    }
    if (topics.some(x => x.id === t.id)) errs.push(`${at}: duplicitné id`);
    topics.push(t);
  }
}
if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
fs.writeFileSync(path.join(root, 'data/temy.json'), JSON.stringify({ v: 1, topics }));
const by = {};
topics.forEach(t => { by[t.subject] = (by[t.subject] ?? 0) + 1; });
console.log(`Témy: ${topics.length}, ${(fs.statSync(path.join(root, 'data/temy.json')).size / 1024).toFixed(0)} kB`, by);
