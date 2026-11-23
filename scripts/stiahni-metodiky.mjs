// Stiahne metodické príručky, sprievodcov a materiály na výučbu z portálu Učíme (NIVAM).
// Ukladá text stránok, priložené PDF a manifest so zdrojom každého súboru.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const HOST = process.env.MET_HOST ?? 'https://ucime.vzdelavanie21.sk/';
const OUT = process.env.MET_OUT ?? 'metodiky';
const PAGES = Number(process.env.MET_PAGES ?? 40);
const LISTS = [HOST + 'metodicke-prirucky/', HOST + 'sprievodcovia/', ...Array.from({ length: PAGES }, (_, i) => `${HOST}materialy-na-vyucbu/?paged=${i + 1}`)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const UA = { 'user-agent': 'Klbko-metodiky/1.0 (vzdelavaci projekt)' };

async function get(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers: UA, redirect: 'follow', signal: AbortSignal.timeout(90000) });
      if (r.ok) return r;
      if (r.status === 404) return null;
      if (r.status < 500) throw new Error('HTTP ' + r.status);
    } catch (e) { if (i === 2) throw e; }
    await sleep(2000 * (i + 1));
  }
  return null;
}
const decode = s => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#8211;|&ndash;/g, '–').replace(/&#8222;/g, '„').replace(/&#8220;/g, '“').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const links = (html, base) => [...html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi)].flatMap(m => {
  try { const u = new URL(decode(m[1].trim()), base); return [{ url: u.href, label: decode(m[2].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim() }]; } catch { return []; }
});
function article(html) {
  const main = (/<main[\s\S]*?<\/main>/i.exec(html) ?? /<article[\s\S]*?<\/article>/i.exec(html) ?? [html])[0];
  return decode(main.replace(/<(script|style|nav|footer|header|form|svg)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(p|h\d|li|tr|div|section)>/gi, '\n').replace(/<br\s*\/?>/gi, '\n').replace(/<li[^>]*>/gi, '• ').replace(/<h(\d)[^>]*>/gi, (_, n) => '\n' + '#'.repeat(+n) + ' ')
    .replace(/<[^>]+>/g, ' ')).replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n\n').trim();
}
const title = html => decode((/<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html)?.[1] ?? /<title>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const tags = html => [...new Set([...html.matchAll(/rel=["']tag["'][^>]*>([\s\S]*?)<\/a>|\/(?:tag|predmet|cyklus|oblast)\/([\w-]+)\//gi)].map(m => decode((m[1] ?? m[2] ?? '').replace(/<[^>]+>/g, '')).trim()).filter(Boolean))].slice(0, 30);

const isItem = u => u.startsWith(HOST) && !/[?]|\/(wp-|tag\/|category\/|author\/|feed|page\/|kontakt|o-nas|vyhlasenie|materialy-na-vyucbu|metodicke-prirucky|sprievodcovia|inspiracie|webinare|kurikulum|slovnik|eduhuby)/.test(u.slice(HOST.length)) && u.split('/').filter(Boolean).length === 3;
const isPdf = u => /\.pdf($|\?)/i.test(u);

mkdirSync(join(OUT, 'text'), { recursive: true }); mkdirSync(join(OUT, 'pdf'), { recursive: true });
const items = new Map(), errors = [];
for (const l of LISTS) {
  try {
    const r = await get(l); if (!r) continue;
    const html = await r.text(); let n = 0;
    for (const a of links(html, l)) if (isItem(a.url) && !items.has(a.url)) { items.set(a.url, { list: l, label: a.label }); n++; }
    console.log('Zoznam', l, 'nové', n);
    if (/paged=/.test(l) && n === 0) break;
  } catch (e) { errors.push({ url: l, error: String(e.message) }); }
  await sleep(400);
}
const docs = [], pdfs = new Map();
for (const [url, meta] of items) {
  try {
    const r = await get(url); if (!r) continue;
    const html = await r.text(); const t = article(html);
    const file = url.slice(HOST.length).replace(/\/$/, '').replace(/[^\w-]+/g, '_').slice(0, 90);
    writeFileSync(join(OUT, 'text', file + '.txt'), t);
    const own = links(html, url).filter(a => isPdf(a.url)).map(a => a.url);
    own.forEach(p => { if (!pdfs.has(p)) pdfs.set(p, url); });
    docs.push({ url, title: title(html), list: meta.list, tags: tags(html), file: file + '.txt', chars: t.length, pdfs: own });
    console.log('OK', file, t.length);
  } catch (e) { errors.push({ url, error: String(e.message) }); }
  await sleep(400);
}
const files = [];
for (const [url, from] of pdfs) {
  try {
    const r = await get(url); if (!r) continue;
    const buf = Buffer.from(await r.arrayBuffer());
    const sha256 = createHash('sha256').update(buf).digest('hex');
    if (files.some(f => f.sha256 === sha256)) continue;
    const base = decodeURIComponent(new URL(url).pathname.split('/').pop()).replace(/[^\w.-]+/g, '_').slice(-80);
    const file = `${sha256.slice(0, 8)}-${base}`;
    writeFileSync(join(OUT, 'pdf', file), buf);
    let text = false;
    try { execFileSync('pdftotext', ['-enc', 'UTF-8', join(OUT, 'pdf', file), join(OUT, 'text', file + '.txt')]); text = true; } catch { /* sken */ }
    files.push({ url, from, file, bytes: buf.length, sha256, text });
    console.log('PDF', file);
  } catch (e) { errors.push({ url, error: String(e.message) }); }
  await sleep(400);
}
writeFileSync(join(OUT, 'manifest.json'), JSON.stringify({ source: HOST, downloaded: new Date().toISOString(), pages: docs, pdfs: files, errors }, null, 2));
console.log(`Hotovo: ${docs.length} stránok, ${files.length} PDF, chyby: ${errors.length}`);
if (!docs.length) process.exit(1);
