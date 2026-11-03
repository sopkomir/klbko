// Stiahne oficiálne PDF so štátnymi vzdelávacími programami, prevedie ich na text
// a zapíše manifest so zdrojom každého súboru.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const M = 'https://www.minedu.sk/';
const SEEDS = (process.env.SVP_SEEDS?.split(',') ?? [
  // ŠVP 2023
  'statny-vzdelavaci-program-pre-zakladne-vzdelavanie/', '35803-sk/clovek-a-spolocnost/', '35804-sk/jazyk-a-komunikacia/',
  'konsolidovane-znenie-svp-pre-zakladne-vzdelavanie/', '46634-sk/konsolidovany-svp-pre-zakladne-vzdelavanie/', 'dodatky-k-svp-pre-zakladne-vzdelavanie/',
  // ŠVP 2015
  'statne-vzdelavacie-programy-2015/', 'statny-vzdelavaci-program-pre-1-stupen-zs/', 'statny-vzdelavaci-program-pre-2-stupen-zs/',
  'konsolidovane-znenie-statnych-vzdelavacich-programov/', 'dodatky-k-statnym-vzdelavacim-programom/',
  'jazyk-a-komunikacia/', 'matematika-a-praca-s-informaciami/', '29455-sk/clovek-a-spolocnost/', 'clovek-a-priroda/', 'clovek-a-hodnoty/',
  '29451-sk/clovek-a-svet-prace/', 'umenie-a-kultura/', 'zdravie-a-pohyb/', '29465-sk/jazyk-a-komunikacia/', '29464-sk/matematika-a-praca-s-informaciami/',
  'clovek-a-spolocnost/', '29462-sk/clovek-a-priroda/', '29461-sk/clovek-a-hodnoty/', 'clovek-a-svet-prace/', '29459-sk/umenie-a-kultura/', '29458-sk/zdravie-a-pohyb/',
].map(p => M + p));
const HOME = process.env.SVP_HOME ?? M;
const OUT = process.env.SVP_OUT ?? 'svp';
const HOPS = 2, MAX_PAGES = 400;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const clean = u => u.replace(/[​-‍﻿]/g, '').replace(/&amp;/g, '&').trim();

async function get(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': 'Klbko-SVP/1.0 (vzdelavaci projekt)' }, redirect: 'follow', signal: AbortSignal.timeout(90000) });
      if (r.ok) return r;
      if (r.status < 500) throw new Error('HTTP ' + r.status);
    } catch (e) { if (i === 2) throw e; }
    await sleep(2000 * (i + 1));
  }
  throw new Error('Nepodarilo sa stiahnuť');
}
function links(html, base) {
  const out = [];
  for (const m of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    try {
      const u = new URL(clean(m[1]), base); u.hash = '';
      if (u.protocol.startsWith('http')) out.push({ url: u.href, label: m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() });
    } catch { /* neplatný odkaz */ }
  }
  return out;
}
const isPdf = u => /\.pdf($|\?)/i.test(u);
const sameSite = u => new URL(u).hostname === new URL(HOME).hostname;

mkdirSync(join(OUT, 'pdf'), { recursive: true }); mkdirSync(join(OUT, 'text'), { recursive: true });
const nav = new Set(links(await (await get(HOME)).text(), HOME).map(l => l.url));
const seen = new Set(), pdfs = new Map(), errors = [];
let frontier = SEEDS.map(url => ({ url, from: null })), pages = 0;
for (let hop = 0; hop <= HOPS && frontier.length; hop++) {
  const next = [];
  for (const { url } of frontier) {
    if (seen.has(url) || pages >= MAX_PAGES) continue;
    seen.add(url); pages++;
    try {
      const html = await (await get(url)).text();
      for (const l of links(html, url)) {
        if (isPdf(l.url)) { if (!pdfs.has(l.url)) pdfs.set(l.url, { label: l.label, from: url }); }
        else if (sameSite(l.url) && !nav.has(l.url) && !seen.has(l.url)) next.push({ url: l.url });
      }
    } catch (e) { errors.push({ url, error: String(e.message) }); }
    await sleep(300);
  }
  frontier = next;
}
const manifest = [];
for (const [url, meta] of pdfs) {
  try {
    const buf = Buffer.from(await (await get(url)).arrayBuffer());
    const sha256 = createHash('sha256').update(buf).digest('hex');
    if (manifest.some(m => m.sha256 === sha256)) continue;
    const base = decodeURIComponent(new URL(url).pathname.split('/').pop()).replace(/[^\w.-]+/g, '_').slice(-80);
    const file = `${sha256.slice(0, 8)}-${base}`;
    writeFileSync(join(OUT, 'pdf', file), buf);
    let text = false;
    try { execFileSync('pdftotext', ['-layout', '-enc', 'UTF-8', join(OUT, 'pdf', file), join(OUT, 'text', file + '.txt')]); text = true; } catch { /* sken alebo chýbajúci nástroj */ }
    manifest.push({ url, ...meta, file, bytes: buf.length, sha256, text });
    console.log('OK', file);
  } catch (e) { errors.push({ url, error: String(e.message) }); }
  await sleep(300);
}
writeFileSync(join(OUT, 'manifest.json'), JSON.stringify({ pages, documents: manifest, errors }, null, 2));
console.log(`Hotovo: ${manifest.length} dokumentov z ${pages} stránok, chyby: ${errors.length}`);
if (!manifest.length) process.exit(1);
