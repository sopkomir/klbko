// Klbko – spoločná knižnica kresieb pre scény a obrázky.
// Jednotný štýl: zaoblené tvary, dva až tri odtiene (svetlo zľava hore), tmavý obrys len pri detailoch,
// oči s odleskom a jemný tieň pod postavou. Žiadny text.
// Každá funkcia vracia <g>. Počiatok (0,0) je bod, kde kresba stojí na zemi, pozerá doprava.
// Voľby: x, y, s (mierka), flip (pozerá doľava), anim (jednoduchý pohyb), shadow (tieň, predvolene áno).

const O = '#3b3f4a';
const n2 = v => Math.round(v * 10) / 10;
function hex(c) { const h = c.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); }
const mix = (c, d, k) => '#' + hex(c).map((v, i) => Math.round(v + (hex(d)[i] - v) * k).toString(16).padStart(2, '0')).join('');
const dark = (c, k = 0.22) => mix(c, '#000000', k);
const light = (c, k = 0.3) => mix(c, '#ffffff', k);
const wrap = ({ x = 0, y = 0, s = 1, flip = false } = {}, inner, shadowW = 0) =>
  `<g transform="translate(${n2(x)} ${n2(y)}) scale(${flip ? -s : s} ${s})">${shadowW ? `<ellipse cx="0" cy="2" rx="${shadowW}" ry="${n2(shadowW * 0.16)}" fill="#000000" opacity=".14"/>` : ''}${inner}</g>`;
const eye = (x, y, r = 4, iris = '#2b2b2b') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${iris}"/><circle cx="${n2(x + r * 0.35)}" cy="${n2(y - r * 0.35)}" r="${n2(r * 0.38)}" fill="#ffffff"/>`;
const bob = (inner, dy = -4, dur = 2, begin = 0) => `<g><animateTransform attributeName="transform" type="translate" values="0 0;0 ${dy};0 0" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>${inner}</g>`;
const swing = (inner, cx, cy, a = 6, dur = 1.2, begin = 0) => `<g><animateTransform attributeName="transform" type="rotate" values="${-a} ${cx} ${cy};${a} ${cx} ${cy};${-a} ${cx} ${cy}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>${inner}</g>`;
const leg = (x, top, bot, w, c, hoof) => `<path d="M${x - w / 2} ${top}L${x - w * 0.42} ${bot - 4}Q${x} ${bot + 1} ${x + w * 0.42} ${bot - 4}L${x + w / 2} ${top}Z" fill="${c}"/>${hoof ? `<rect x="${n2(x - w * 0.46)}" y="${bot - 7}" width="${n2(w * 0.92)}" height="7" rx="2" fill="${hoof}"/>` : ''}`;
const sh = o => (o.shadow === false ? 0 : 1);

/* ======================= ZVIERATÁ ======================= */
export function cow(o = {}) {
  const young = !!o.young, bull = !!o.bull, c = o.color || '#fbfaf7', sp = o.spots === false ? c : (o.spots || '#3e2c23');
  const legs = [[-46, '#d9d4cc'], [36, '#d9d4cc'], [-30, c], [52, c]].map(([x, col]) => leg(x, -40, 0, 15, col, '#4e3b30')).join('');
  const body = `<path d="M-70 -78q-4 -38 34 -42h74q40 2 42 40q2 34 -26 42h-96q-26 -4 -28 -40z" fill="${c}"/><path d="M-70 -78q2 34 28 40h96q20 -6 25 -24q-30 22 -100 16q-38 -4 -49 -32z" fill="${dark(c, 0.1)}"/>`
    + `<path d="M-40 -118q22 -2 30 14q4 18 -14 22q-24 2 -28 -14q-4 -14 12 -22z" fill="${sp}"/><path d="M18 -96q18 -4 24 10q2 16 -16 18q-16 0 -18 -12q-2 -12 10 -16z" fill="${sp}"/><path d="M-66 -96q10 4 8 18q-4 10 -12 4z" fill="${sp}"/>`
    + (young || bull ? '' : `<path d="M4 -42q10 14 24 0q-2 -10 -12 -10q-10 0 -12 10z" fill="#f4b6c2"/>`)
    + `<path d="M-72 -100q-16 6 -14 32" stroke="#e6e1d8" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-86 -70q-4 6 2 10q6 -2 4 -10z" fill="${sp}"/>`;
  const head = `<g transform="translate(76 -100)"><path d="M-14 -14q-12 -14 -2 -18l10 8zM20 -16q14 -14 18 -4l-12 10z" fill="${c}" stroke="#d9d4cc" stroke-width="2"/>${young ? '' : bull ? '<path d="M-8 -20q-22 -6 -20 -24q8 10 24 12zM16 -20q22 -6 20 -24q-8 10 -24 12z" fill="#efe6cf" stroke="#bfae8a" stroke-width="1.5"/>' : '<path d="M-6 -22q-6 -14 2 -16q2 6 6 14zM14 -22q4 -14 12 -12q-4 6 -8 14z" fill="#e8dcc0"/>'}<path d="M-12 -18q14 -10 30 0q8 14 6 34q-2 14 -20 16q-18 -2 -20 -16q-4 -20 4 -34z" fill="${c}"/><path d="M-10 -8q8 -8 18 -4q-2 10 -10 12q-8 -2 -8 -8z" fill="${sp}"/><path d="M-12 18q16 -10 34 0q4 12 -6 18q-10 4 -22 0q-10 -6 -6 -18z" fill="#f4b6c2"/><circle cx="-2" cy="26" r="2.6" fill="#a6566a"/><circle cx="12" cy="26" r="2.6" fill="#a6566a"/>${eye(12, -4, 4)}</g>`;
  const tail = swing(`<path d="M-72 -96q-14 20 -12 50" stroke="${c}" stroke-width="4" fill="none"/>`, -72, -96, 8, 1.6);
  const all = legs + tail + body + head;
  return wrap(o, (young ? `<g transform="scale(0.68)">${all}</g>` : all), sh(o) * (young ? 52 : 76));
}
export function sheep(o = {}) {
  const young = !!o.young, w = '#ffffff', wd = '#e3e3e3', f = '#3b3a3f';
  const legs = [-36, -18, 24, 40].map(x => leg(x, -34, 0, 10, f)).join('');
  const puffs = [[-44, -66, 26], [-20, -82, 28], [8, -84, 28], [34, -74, 26], [44, -52, 22], [-50, -44, 22], [-22, -42, 24], [10, -42, 24], [30, -42, 22]];
  const wool = `<g fill="${wd}">${puffs.map(([x, y, r]) => `<circle cx="${x + 2}" cy="${y + 3}" r="${r}"/>`).join('')}</g><g fill="${w}">${puffs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r - 2}"/>`).join('')}</g>`;
  const head = `<g transform="translate(58 -80)"><ellipse cx="-14" cy="-8" rx="11" ry="6" fill="${f}" transform="rotate(-25 -14 -8)"/><path d="M-10 -14q16 -10 26 6q6 14 0 26q-8 10 -18 6q-12 -6 -14 -20q-2 -12 6 -18z" fill="${f}"/>${eye(6, -2, 3.4, '#f5f5f5')}<circle cx="6" cy="-2" r="1.8" fill="#222"/><circle cx="-6" cy="-14" r="9" fill="${w}"/><circle cx="4" cy="-18" r="8" fill="${w}"/></g>`;
  const all = legs + wool + head;
  return wrap(o, young ? `<g transform="scale(0.66)">${all}</g>` : all, sh(o) * (young ? 40 : 58));
}
export function pig(o = {}) {
  const young = !!o.young, c = '#f7b8c8', cd = '#ee95ad';
  const legs = [-36, -18, 22, 38].map(x => leg(x, -30, 0, 13, cd, '#c9687f')).join('');
  const body = `<path d="M-60 -60q0 -40 50 -40h30q44 2 46 38q0 34 -40 36h-50q-36 -2 -36 -34z" fill="${c}"/><path d="M-60 -56q4 26 36 30h50q30 -2 38 -22q-30 18 -86 10q-28 -4 -38 -18z" fill="${cd}" opacity=".7"/>`;
  const tail = swing(`<path d="M-58 -70q-16 -2 -14 -12q4 -8 10 -2q4 6 -6 10q-8 2 -10 -4" stroke="${cd}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`, -58, -70, 12, 0.9);
  const head = `<g transform="translate(62 -66)"><path d="M-14 -26l-4 -18l16 10z" fill="${cd}"/><path d="M-22 -16q8 -22 30 -16q16 8 18 26q0 18 -20 22q-26 2 -30 -14q-2 -10 2 -18z" fill="${c}"/><ellipse cx="22" cy="2" rx="9" ry="11" fill="${cd}"/><ellipse cx="20" cy="-2" rx="2" ry="3" fill="#a4485f"/><ellipse cx="25" cy="5" rx="2" ry="3" fill="#a4485f"/>${eye(4, -8, 3.4)}</g>`;
  const all = legs + tail + body + head;
  return wrap(o, young ? `<g transform="scale(0.6)">${all}</g>` : all, sh(o) * (young ? 38 : 62));
}
export function hen(o = {}) {
  const c = o.color || '#b4774d', cl = light(c, 0.25), cd = dark(c, 0.25);
  const inner = `<path d="M-6 -22v22M8 -22v22M-6 0h-8M-6 0h6M8 0h-6M8 0h8" stroke="#f0a030" stroke-width="4" stroke-linecap="round"/>`
    + `<path d="M-40 -58q-24 -30 -6 -46q8 18 16 26q-6 -26 12 -30q0 22 6 32z" fill="${cd}"/>`
    + `<path d="M-40 -56q2 -26 30 -30q26 -4 40 14q14 20 2 40q-14 14 -40 12q-34 -2 -32 -36z" fill="${c}"/><path d="M-30 -48q16 4 34 -6q-6 22 -26 22q-10 -2 -8 -16z" fill="${cl}"/><path d="M-26 -52q20 6 36 -6" stroke="${cd}" stroke-width="2.5" fill="none"/>`
    + `<g transform="translate(24 -76)"><path d="M-8 -16q2 -12 8 -6q4 -12 10 -2q6 -8 8 4z" fill="#e53935"/><path d="M-12 -2q0 -16 16 -16q14 2 14 16q0 14 -14 14q-16 0 -16 -14z" fill="${c}"/><path d="M14 -4l12 4l-12 4z" fill="#f6b026"/><path d="M10 6q2 10 -4 12q-4 -6 0 -12z" fill="#e53935"/>${eye(5, -4, 3)}</g>`;
  return wrap(o, inner, sh(o) * 34);
}
export function chick(o = {}) {
  const inner = `<path d="M-4 -10v10M4 -10v10" stroke="#f0a030" stroke-width="3" stroke-linecap="round"/><path d="M-18 -20q0 -18 18 -18q20 0 20 18q0 14 -20 14q-18 0 -18 -14z" fill="#ffd84d"/><path d="M-12 -18q8 6 16 0q-2 8 -8 8q-6 0 -8 -8z" fill="#f6c02c"/><circle cx="10" cy="-40" r="12" fill="#ffd84d"/><path d="M20 -42l9 3l-9 3z" fill="#f08c00"/>${eye(13, -43, 2.4)}<path d="M4 -52q2 -6 6 -2q2 -6 5 0" stroke="#f6c02c" stroke-width="2" fill="none"/>`;
  return wrap(o, inner, sh(o) * 18);
}
export function horse(o = {}) {
  const c = o.color || '#8a5a3c', cd = dark(c), m = '#3b2a22';
  const legs = [[-46, cd], [34, cd], [-32, c], [50, c]].map(([x, col]) => leg(x, -70, 0, 13, col, '#2d2420')).join('');
  const inner = legs + swing(`<path d="M-66 -120q-26 10 -20 60q12 -20 14 -50z" fill="${m}"/>`, -66, -120, 6, 1.4)
    + `<path d="M-70 -112q0 -32 40 -34h60q36 2 40 34q2 30 -30 38h-80q-30 -6 -30 -38z" fill="${c}"/><path d="M-70 -106q4 26 32 32h80q22 -4 28 -24q-40 20 -140 -8z" fill="${cd}" opacity=".6"/>`
    + `<path d="M40 -132q10 -40 36 -58q26 -4 30 18q2 14 -10 22l-26 44z" fill="${c}"/><path d="M56 -190l4 -18l10 14zM70 -192l8 -14l4 16z" fill="${c}"/><path d="M50 -150q8 -30 26 -46q-18 4 -26 22q-8 14 -10 34z" fill="${m}"/><path d="M92 -168q14 2 16 14q0 10 -12 12q-12 -2 -14 -12z" fill="${cd}"/><circle cx="100" cy="-156" r="2.4" fill="#1b1410"/>${eye(80, -176, 3.6)}`;
  return wrap(o, inner, sh(o) * 78);
}
export function dog(o = {}) {
  const c = o.color || '#c58a4f', cd = dark(c), cl = light(c, 0.35);
  const legs = [[-30, cd], [22, cd], [-20, c], [32, c]].map(([x, col]) => leg(x, -34, 0, 11, col)).join('');
  const inner = legs + swing(`<path d="M-40 -56q-22 -10 -24 -32q10 6 26 22z" fill="${c}"/>`, -40, -56, 14, 0.5)
    + `<path d="M-44 -50q0 -24 30 -24h36q24 2 24 24q0 20 -24 22h-42q-24 -2 -24 -22z" fill="${c}"/><path d="M-30 -36q24 8 52 0q-6 10 -26 10q-20 0 -26 -10z" fill="${cl}"/>`
    + `<g transform="translate(46 -72)"><path d="M-18 -4q0 -22 20 -22q20 0 22 18q8 2 10 10q0 10 -12 10h-20q-20 0 -20 -16z" fill="${c}"/><path d="M-14 -20q-14 6 -10 30q12 -6 14 -24z" fill="${cd}"/><circle cx="34" cy="2" r="4" fill="#1d1a18"/><path d="M14 10q8 6 16 2" stroke="#5b4636" stroke-width="2" fill="none" stroke-linecap="round"/>${eye(8, -10, 3.4)}</g>`;
  return wrap(o, inner, sh(o) * 50);
}
export function cat(o = {}) {
  const c = o.color || '#9e9e9e', cd = dark(c), cl = light(c, 0.4);
  const inner = swing(`<path d="M-34 -18q-30 -6 -24 -44q4 -8 10 -2q-6 30 18 32z" fill="${c}"/>`, -34, -18, 8, 1.6)
    + `<path d="M-38 -20q-4 -34 26 -38q30 -2 38 22q4 16 -4 30q-6 6 -14 6h-34q-12 0 -12 -20z" fill="${c}"/><path d="M-30 0v-10M-14 0v-10M8 0v-10" stroke="${cd}" stroke-width="7" stroke-linecap="round"/>`
    + `<g transform="translate(16 -62)"><path d="M-16 -6l-2 -22l14 10zM16 -6l2 -22l-14 10z" fill="${c}"/><path d="M-12 -14l-1 -9l6 5z" fill="#f4b6c2"/><circle r="20" fill="${c}"/><path d="M-10 6q10 8 20 0q-4 8 -10 8q-6 0 -10 -8z" fill="${cl}"/><path d="M-2 4l2 2l2 -2z" fill="#e57a90"/><path d="M-6 6h-16M6 6h16M-6 8l-14 4M6 8l14 4" stroke="${cd}" stroke-width="1" /><ellipse cx="-7" cy="-4" rx="3.2" ry="4.4" fill="#8bc34a"/><ellipse cx="7" cy="-4" rx="3.2" ry="4.4" fill="#8bc34a"/><ellipse cx="-7" cy="-4" rx="1.2" ry="3.6" fill="#1b1b1b"/><ellipse cx="7" cy="-4" rx="1.2" ry="3.6" fill="#1b1b1b"/></g>`;
  return wrap(o, inner, sh(o) * 40);
}
export function fox(o = {}) {
  const c = '#e8742a', cd = '#c45a18', w = '#fff6ec', k = '#3a2a24';
  const legs = [[-30, k], [24, k], [-18, k], [36, k]].map(([x, col]) => leg(x, -30, 0, 9, col)).join('');
  const tail = swing(`<path d="M-44 -46q-46 -6 -60 24q22 18 52 4q14 -8 12 -24z" fill="${c}"/><path d="M-96 -24q10 14 28 8q-12 -4 -18 -14z" fill="${w}"/>`, -44, -46, 7, 1.8);
  const inner = legs + tail + `<path d="M-46 -40q0 -24 28 -26h40q26 2 26 24q0 18 -22 20h-46q-26 -2 -26 -18z" fill="${c}"/><path d="M14 -24q14 0 22 -10q-4 14 -22 14z" fill="${w}"/><path d="M-40 -30q30 10 64 2" stroke="${cd}" stroke-width="3" fill="none" opacity=".6"/>`
    + `<g transform="translate(46 -64)"><path d="M-14 -6l-6 -22l16 10zM6 -10l2 -22l12 16z" fill="${c}"/><path d="M-10 -14l-3 -10l7 5z" fill="${k}"/><path d="M-18 -4q0 -16 20 -18q18 0 22 12l20 10q-2 8 -14 10q-22 6 -36 2q-12 -4 -12 -16z" fill="${c}"/><path d="M-4 8q18 2 38 -6q-8 10 -22 12q-12 0 -16 -6z" fill="${w}"/><circle cx="42" cy="0" r="3.6" fill="${k}"/>${eye(8, -8, 3)}</g>`;
  return wrap(o, inner, sh(o) * 48);
}
export function deer(o = {}) {
  const c = '#a8703f', cd = dark(c, 0.2), w = '#f6efe4';
  const legs = [[-34, cd], [24, cd], [-24, c], [34, c]].map(([x, col]) => leg(x, -62, 0, 8, col, '#3a2a22')).join('');
  const inner = legs + `<path d="M-48 -86q0 -26 30 -28h40q26 2 28 26q0 22 -24 26h-50q-24 -2 -24 -24z" fill="${c}"/><path d="M-50 -92q-8 6 -4 18q8 0 12 -10z" fill="${w}"/><path d="M-40 -74q36 12 74 0" stroke="${cd}" stroke-width="3" fill="none" opacity=".6"/>`
    + `<path d="M30 -100q4 -26 18 -44l14 4q-4 24 -14 46z" fill="${c}"/><g transform="translate(58 -150)"><path d="M-6 -10l-14 -10q8 -6 18 4zM6 -12l10 -14q6 6 -4 16z" fill="${c}"/><path d="M-10 -4q2 -14 16 -12q16 4 22 18q-2 10 -14 10q-16 0 -24 -16z" fill="${c}"/><circle cx="27" cy="6" r="3" fill="#1d1612"/>${eye(4, -2, 3.2)}</g>`;
  return wrap(o, inner, sh(o) * 50);
}
export function rabbit(o = {}) {
  const c = o.color || '#b9a58f', cd = dark(c, 0.15), w = '#fffaf2';
  const inner = `<path d="M-30 -2q-6 -34 22 -40q28 -2 34 24q2 14 -6 18z" fill="${c}"/><circle cx="-30" cy="-26" r="9" fill="${w}"/><path d="M-6 -2q2 -12 18 -10q10 2 10 12z" fill="${cd}"/>`
    + `<g transform="translate(20 -48)">${swing(`<path d="M-6 -10q-10 -36 2 -40q10 2 8 38z" fill="${c}"/><path d="M-3 -14q-6 -26 1 -30q4 2 4 28z" fill="#f2b6c0"/>`, -2, -10, 6, 2.4)}<path d="M4 -10q6 -34 18 -34q8 6 -8 38z" fill="${cd}"/><circle r="16" fill="${c}"/><path d="M8 6q8 -2 10 4q-6 4 -10 -4z" fill="${w}"/><circle cx="16" cy="3" r="2.2" fill="#d47a8c"/>${eye(6, -4, 3)}</g>`;
  return wrap(o, inner, sh(o) * 30);
}
export function mouse(o = {}) {
  const c = '#9b928c', cd = dark(c, 0.2);
  const inner = `<path d="M-24 -8q-30 4 -40 -10" stroke="#d8a8a8" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M-26 -4q-2 -20 20 -22q24 0 30 14l10 6q-2 6 -12 6h-36q-12 0 -12 -4z" fill="${c}"/><circle cx="8" cy="-24" r="9" fill="${cd}"/><circle cx="8" cy="-24" r="5.5" fill="#e9b5b5"/><circle cx="34" cy="-6" r="2.5" fill="#d47a8c"/>${eye(20, -14, 2.4)}<path d="M-14 0v2M4 0v2" stroke="#d8a8a8" stroke-width="3" stroke-linecap="round"/>`;
  return wrap(o, inner, sh(o) * 24);
}
export function hedgehog(o = {}) {
  const sp = '#6d5546', c = '#d8b48c';
  const spikes = Array.from({ length: 13 }, (_, i) => { const a = Math.PI * (1.02 + i * 0.075), x = n2(Math.cos(a) * 36 - 4), y = n2(Math.sin(a) * 30 - 6); const x2 = n2(Math.cos(a) * 52 - 4), y2 = n2(Math.sin(a) * 44 - 6); return `<path d="M${x - 4} ${y}L${x2} ${y2}L${x + 4} ${y + 2}z" fill="${sp}"/>`; }).join('');
  const inner = spikes + `<path d="M-40 -6q0 -34 36 -36q34 0 40 24q-2 18 -36 18h-30q-10 0 -10 -6z" fill="${dark(sp, 0.1)}"/><path d="M14 -24q16 -2 26 12l8 6q-2 6 -12 6h-22z" fill="${c}"/><circle cx="48" cy="-6" r="3" fill="#2a2220"/>${eye(26, -14, 2.4)}`;
  return wrap(o, inner, sh(o) * 34);
}
export function owl(o = {}) {
  const c = '#8c6a4f', cl = '#d9c2a3', cd = dark(c, 0.25);
  const inner = `<path d="M-6 0v-6M6 0v-6" stroke="#f0a030" stroke-width="4" stroke-linecap="round"/><path d="M-30 -14q-6 -60 30 -66q36 6 30 66q-6 16 -30 16q-24 0 -30 -16z" fill="${c}"/><path d="M-18 -20q0 -30 18 -32q18 2 18 32q-4 12 -18 12q-14 0 -18 -12z" fill="${cl}"/>${[-8, 0, 8].map(x => `<path d="M${x - 4} -34q4 4 8 0M${x - 4} -24q4 4 8 0" stroke="${cd}" stroke-width="1.6" fill="none"/>`).join('')}`
    + `<path d="M-30 -60l-6 -20l16 12zM30 -60l6 -20l-16 12z" fill="${c}"/><circle cx="-12" cy="-58" r="12" fill="#f3e3c4"/><circle cx="12" cy="-58" r="12" fill="#f3e3c4"/><circle cx="-12" cy="-58" r="7" fill="#f6a623"/><circle cx="12" cy="-58" r="7" fill="#f6a623"/>${eye(-12, -58, 4, '#111')}${eye(12, -58, 4, '#111')}<path d="M-4 -48l4 8l4 -8z" fill="#e89a1e"/><path d="M-30 -20q-10 -24 4 -40q-2 24 4 34zM30 -20q10 -24 -4 -40q2 24 -4 34z" fill="${cd}"/>`;
  return wrap(o, inner, sh(o) * 26);
}
export function songbird(o = {}) {
  const c = o.color || '#7a8a99', br = o.breast || '#f28a3a';
  const inner = `<path d="M-4 0l-2 -10M6 0l2 -10" stroke="#6b5b4b" stroke-width="2.4" stroke-linecap="round"/><path d="M-30 -24l-14 -6l4 10z" fill="${dark(c)}"/><path d="M-30 -22q2 -22 26 -24q24 0 26 20q0 14 -22 16q-28 2 -30 -12z" fill="${c}"/><path d="M-6 -12q14 -2 20 -14q4 14 -6 18q-8 2 -14 -4z" fill="${br}"/><circle cx="14" cy="-34" r="12" fill="${c}"/><path d="M8 -28q8 4 14 0q-2 8 -8 8z" fill="${br}"/><path d="M24 -36l10 3l-10 3z" fill="#e0a030"/>${eye(17, -37, 2.4)}<path d="M-18 -22q10 -6 22 -2" stroke="${dark(c, 0.3)}" stroke-width="2.4" fill="none"/>`;
  return wrap(o, inner, sh(o) * 16);
}
export function flyingBird(o = {}) {
  const c = o.color || '#46505e';
  const wing = up => `<path d="M-2 -2q-14 ${up ? -22 : 10} -34 ${up ? -18 : 6}q18 0 30 ${up ? 12 : -2}z" fill="${dark(c, 0.15)}"/>`;
  const inner = `<path d="M-22 0q14 -10 34 -6q10 2 14 -2l8 3l-8 3q-8 8 -24 8q-14 0 -24 -6z" fill="${c}"/><g><animate attributeName="opacity" values="1;0;1" dur=".5s" repeatCount="indefinite"/>${wing(true)}</g><g><animate attributeName="opacity" values="0;1;0" dur=".5s" repeatCount="indefinite"/>${wing(false)}</g>${eye(18, -4, 1.8)}`;
  return wrap({ ...o, shadow: false }, inner, 0);
}
export function crow(o = {}) {
  const c = '#2b2d33', cl = '#4a4e58';
  const inner = `<path d="M-6 0v-10M6 0v-10" stroke="#555" stroke-width="3" stroke-linecap="round"/><path d="M-48 -30l-16 -6l8 12z" fill="${c}"/><path d="M-46 -28q4 -24 32 -26q28 0 32 20q0 14 -26 18q-32 4 -38 -12z" fill="${c}"/><path d="M-30 -30q16 -10 36 -6" stroke="${cl}" stroke-width="4" fill="none"/><circle cx="16" cy="-48" r="14" fill="${c}"/><path d="M26 -52l22 4l-22 6z" fill="#3d3f46"/>${eye(20, -51, 2.8, '#111')}${o.cheese ? '<path d="M40 -50l16 -2l-4 12z" fill="#ffd54f" stroke="#e0a800" stroke-width="1.5"/>' : ''}`;
  return wrap(o, inner, sh(o) * 30);
}
export function fish(o = {}) {
  if (o.long) return wrap({ ...o, shadow: false }, `<g transform="scale(1.7 0.8)">${fish({ ...o, long: false, x: 0, y: 0, s: 1 }).replace(/^<g transform="[^"]*">/, '<g>')}</g>`, 0);
  const c = o.color || '#ff8a3d', cd = dark(c, 0.2), cl = light(c, 0.35);
  const inner = swing(`<path d="M-34 0l-20 -16q-4 16 0 32z" fill="${cd}"/>`, -34, 0, 10, 0.6) + `<path d="M-36 0q16 -24 44 -22q22 2 30 22q-8 20 -30 22q-28 2 -44 -22z" fill="${c}"/><path d="M-30 4q20 14 52 8q-14 10 -30 8q-14 -2 -22 -16z" fill="${cl}"/><path d="M-6 -20q10 -12 22 -4l-8 6z" fill="${cd}"/><path d="M14 -10q4 10 0 20" stroke="${cd}" stroke-width="2" fill="none"/>${eye(26, -4, 3.4)}`;
  return wrap({ ...o, shadow: false }, inner, 0);
}
export function frog(o = {}) {
  const c = '#5fae3f', cd = '#3f8a2a', cl = '#cfe8a0';
  const inner = `<path d="M-30 0q-14 -2 -12 -14q8 -8 22 0zM30 0q14 -2 12 -14q-8 -8 -22 0z" fill="${cd}"/><path d="M-32 -8q-2 -30 32 -32q34 2 32 32q-4 10 -32 10q-28 0 -32 -10z" fill="${c}"/><path d="M-20 -6q20 8 40 0q-4 -12 -20 -12q-16 0 -20 12z" fill="${cl}"/><circle cx="-14" cy="-38" r="10" fill="${c}"/><circle cx="14" cy="-38" r="10" fill="${c}"/>${eye(-14, -39, 5, '#1b2a10')}${eye(14, -39, 5, '#1b2a10')}<path d="M-14 -22q14 8 28 0" stroke="${cd}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M-12 0l-6 2M-4 0l-2 3M12 0l6 2M4 0l2 3" stroke="${cd}" stroke-width="3" stroke-linecap="round"/>`;
  return wrap(o, inner, sh(o) * 34);
}
export function snail(o = {}) {
  const inner = `<path d="M-30 0q20 -4 54 -2q10 -16 6 -26l4 -10M28 -28l8 -8" stroke="#c9a17a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M-34 0q24 -6 58 -2q6 -10 2 -20q-6 -4 -8 4q0 10 -10 10h-40q-6 4 -2 8z" fill="#e3bf95"/><circle cx="34" cy="-40" r="2.6" fill="#3b2f26"/><circle cx="26" cy="-36" r="2.6" fill="#3b2f26"/><circle cx="-6" cy="-24" r="22" fill="#b5754a"/><path d="M-6 -24m-14 0a14 14 0 1 1 14 14a9 9 0 1 1 -8 -9a4 4 0 1 1 4 4" stroke="#7d4a2c" stroke-width="3" fill="none"/>`;
  return wrap(o, inner, sh(o) * 30);
}
export function worm(o = {}) {
  const inner = `<path d="M-40 0q10 -16 20 0t20 0t20 0t16 -6" stroke="#e5879a" stroke-width="9" fill="none" stroke-linecap="round"><animate attributeName="d" values="M-40 0q10 -16 20 0t20 0t20 0t16 -6;M-40 0q10 -6 20 0t20 0t20 0t16 -10;M-40 0q10 -16 20 0t20 0t20 0t16 -6" dur="1.6s" repeatCount="indefinite"/></path><path d="M-2 -4v8M6 -4v8" stroke="#c96a7e" stroke-width="1.6"/>`;
  return wrap({ ...o, shadow: false }, inner, 0);
}
export function bee(o = {}) {
  const inner = `<g opacity=".85"><ellipse cx="-4" cy="-30" rx="10" ry="16" fill="#e8f4ff" stroke="#9cc4e4" stroke-width="1.5" transform="rotate(-25 -4 -30)"><animateTransform attributeName="transform" type="rotate" values="-25 -4 -18;-45 -4 -18;-25 -4 -18" dur=".2s" repeatCount="indefinite"/></ellipse><ellipse cx="8" cy="-30" rx="9" ry="14" fill="#e8f4ff" stroke="#9cc4e4" stroke-width="1.5" transform="rotate(20 8 -30)"/></g><path d="M-26 -14q2 -14 22 -14q20 0 22 14q-2 14 -22 14q-20 0 -22 -14z" fill="#ffc42a"/><path d="M-12 -27v26M0 -28v28M-24 -18q0 10 2 14" stroke="#3a2c1e" stroke-width="6"/><path d="M-26 -14l-8 2l8 2z" fill="#3a2c1e"/><circle cx="22" cy="-16" r="10" fill="#3a2c1e"/>${eye(26, -18, 2.4, '#000')}<path d="M26 -24q4 -12 10 -12M22 -25q0 -10 4 -14" stroke="#3a2c1e" stroke-width="1.8" fill="none"/>`;
  return wrap({ ...o, shadow: false }, inner, 0);
}
export function butterfly(o = {}) {
  const c = o.color || '#ff8c2a', c2 = o.color2 || '#ffd23f', k = '#2d2a32';
  const wings = `<path d="M0 -4q-34 -40 -46 -14q-6 22 46 18z" fill="${c}"/><path d="M0 0q-30 4 -32 24q8 14 32 -20z" fill="${c2}"/><circle cx="-26" cy="-14" r="5" fill="#ffffff" opacity=".8"/>`;
  const inner = `<g>${swing(wings, 0, 0, 0, 1)}<animateTransform attributeName="transform" type="scale" values="1 1;0.35 1;1 1" dur=".45s" repeatCount="indefinite"/></g><g transform="scale(-1 1)"><g><animateTransform attributeName="transform" type="scale" values="1 1;0.35 1;1 1" dur=".45s" repeatCount="indefinite"/>${wings}</g></g><path d="M0 -14v32" stroke="${k}" stroke-width="5" stroke-linecap="round"/><path d="M0 -14q-6 -12 -10 -14M0 -14q6 -12 10 -14" stroke="${k}" stroke-width="1.8" fill="none"/>`;
  return wrap({ ...o, shadow: false }, inner, 0);
}
export function spider(o = {}) {
  const k = '#2f2a33';
  const legs = [-1, 1].map(sd => [[-18, -28], [-6, -36], [6, -36], [18, -28]].map(([a, b], i) => `<path d="M${sd * 6} ${-14 + i * 4}q${sd * 22} ${-24 + i * 6} ${sd * (34 + i * 2)} ${-2 + i * 10}" stroke="${k}" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')).join('');
  const inner = `<path d="M0 -60v-80" stroke="#bbbbbb" stroke-width="1.2"/>` + legs + `<ellipse cx="0" cy="-14" rx="14" ry="16" fill="${k}"/><circle cx="0" cy="-34" r="9" fill="${k}"/><circle cx="-3" cy="-36" r="1.6" fill="#fff"/><circle cx="3" cy="-36" r="1.6" fill="#fff"/><path d="M-6 -16q6 4 12 0" stroke="#5a4a62" stroke-width="2" fill="none"/>`;
  return wrap({ ...o, shadow: false }, inner, 0);
}
export function lion(o = {}) {
  const c = '#e0a84a', m = '#a8641f', cd = dark(c, 0.15);
  const legs = [[-40, cd], [30, cd], [-28, c], [42, c]].map(([x, col]) => leg(x, -46, 0, 13, col)).join('');
  const inner = legs + swing(`<path d="M-56 -66q-26 10 -22 40" stroke="${c}" stroke-width="5" fill="none"/><circle cx="-78" cy="-24" r="7" fill="${m}"/>`, -56, -66, 8, 1.8)
    + `<path d="M-60 -60q0 -30 34 -32h48q30 2 32 30q0 24 -28 26h-56q-30 -2 -30 -24z" fill="${c}"/>`
    + `<g transform="translate(50 -84)"><circle r="34" fill="${m}"/><circle cx="6" r="22" fill="${c}"/><path d="M14 8q8 2 12 -2q-2 10 -12 8z" fill="#fbe1b6"/><path d="M16 0l8 2l-6 4z" fill="#5a3418"/>${eye(4, -8, 3.2)}${eye(18, -8, 3.2)}<path d="M-12 -22l-4 -8l10 4zM20 -24l6 -8l2 10z" fill="${c}"/></g>`;
  return wrap(o, inner, sh(o) * 60);
}
export function elephant(o = {}) {
  const c = '#9aa3ad', cd = dark(c, 0.15);
  const legs = [-44, -20, 22, 44].map(x => `<rect x="${x - 10}" y="-60" width="20" height="60" rx="6" fill="${x < 0 ? cd : c}"/>`).join('');
  const inner = legs + `<path d="M-64 -80q0 -50 56 -52q60 2 66 50q2 26 -30 28h-64q-28 -2 -28 -26z" fill="${c}"/><path d="M-66 -90q-10 10 -8 24" stroke="${cd}" stroke-width="4" fill="none"/>`
    + `<g transform="translate(58 -100)"><path d="M-16 -20q-22 -4 -24 22q2 22 22 20z" fill="${cd}"/><circle r="28" fill="${c}"/>${swing(`<path d="M14 8q18 20 12 56q-2 10 -10 6q4 -34 -12 -50z" fill="${c}"/>`, 14, 8, 6, 2.4)}<path d="M10 16q12 6 18 0" stroke="#fff8e6" stroke-width="5" stroke-linecap="round"/>${eye(10, -6, 3.2)}</g>`;
  return wrap(o, inner, sh(o) * 74);
}
export function giraffe(o = {}) {
  const c = '#f2c25a', sp = '#b9762f';
  const legs = [-28, -16, 18, 30].map(x => leg(x, -90, 0, 8, c, '#5a3a20')).join('');
  const inner = legs + `<path d="M-40 -112q0 -24 30 -26h30q26 2 26 24q0 22 -26 24h-34q-26 -2 -26 -22z" fill="${c}"/><path d="M26 -122l22 -110l16 4l-14 116z" fill="${c}"/>`
    + [[-24, -118], [-4, -104], [12, -124], [-20, -98], [34, -150], [42, -190], [48, -216], [28, -112]].map(([x, y]) => `<path d="M${x} ${y}l6 -6l8 2l2 8l-6 6l-8 -2z" fill="${sp}"/>`).join('')
    + `<g transform="translate(58 -236)"><path d="M-6 -14v-12M6 -14v-12" stroke="${sp}" stroke-width="4" stroke-linecap="round"/><circle cx="-6" cy="-27" r="3.5" fill="${sp}"/><circle cx="6" cy="-27" r="3.5" fill="${sp}"/><path d="M-12 -8q4 -12 16 -10q16 2 22 16q-2 10 -14 10q-18 -2 -24 -16z" fill="${c}"/>${eye(2, -6, 3)}</g>`;
  return wrap(o, inner, sh(o) * 46);
}
export function zebra(o = {}) {
  const w = '#fbfbfb', k = '#2b2b2b';
  const legs = [-40, -28, 30, 42].map(x => leg(x, -64, 0, 10, w, k)).join('');
  const stripes = [-46, -32, -18, -4, 10, 24, 38].map(x => `<path d="M${x} -126q6 16 0 40" stroke="${k}" stroke-width="5" fill="none"/>`).join('');
  const inner = legs + `<path d="M-56 -96q0 -30 34 -32h44q30 2 32 30q0 24 -28 28h-52q-30 -2 -30 -26z" fill="${w}"/>${stripes}<path d="M36 -110q8 -30 28 -44q22 -2 24 18q0 12 -10 18l-20 30z" fill="${w}"/><path d="M48 -148l6 -16l8 12zM40 -122q6 -20 18 -32" stroke="${k}" stroke-width="4" fill="none"/><path d="M74 -130q12 2 14 12q-2 8 -12 8z" fill="${k}"/>${eye(66, -144, 3)}`;
  return wrap(o, inner, sh(o) * 62);
}

export function lizard(o = {}) {
  const c = o.color || '#7cb342', cd = dark(c, 0.25);
  const inner = swing(`<path d="M-40 -8q-40 4 -70 -10q30 18 70 18z" fill="${c}"/>`, -40, -8, 6, 1.4)
    + `<path d="M-44 -10q10 -16 44 -16q36 0 52 12q10 6 22 6q-4 10 -20 10q-30 6 -60 4q-30 0 -38 -16z" fill="${c}"/><path d="M-30 -14q30 -10 70 0" stroke="${cd}" stroke-width="3" fill="none" stroke-dasharray="6 6"/><path d="M-26 -4l-10 8l-6 0M-20 -4l4 10l6 0M28 -4l-8 10l-6 0M34 -4l6 10l6 0" stroke="${cd}" stroke-width="4" fill="none" stroke-linecap="round"/>${eye(62, -14, 2.6)}`;
  return wrap(o, inner, sh(o) * 50);
}
export function barn(o = {}) {
  const inner = `<path d="M-90 0v-120l90 -70l90 70v120z" fill="#c0392b"/><path d="M-90 -120l90 -70l90 70" stroke="#7b241c" stroke-width="10" fill="none" stroke-linejoin="round"/><path d="M-90 -120l90 -70v190h-90z" fill="#000000" opacity=".08"/><rect x="-34" y="-84" width="68" height="84" fill="#f5e6c8"/><path d="M-34 -84l68 84M34 -84l-68 84" stroke="#c0392b" stroke-width="6"/><rect x="-34" y="-84" width="68" height="84" fill="none" stroke="#f5e6c8" stroke-width="6"/><rect x="-14" y="-150" width="28" height="26" fill="#f5e6c8"/><path d="M-90 0h180" stroke="#7b241c" stroke-width="4"/>`;
  return wrap(o, inner, sh(o) * 100);
}
export function fence(o = {}) { const w = o.w || 400, n = Math.round(w / 50); return wrap({ ...o, shadow: false }, `<g fill="#c8a27a">${Array.from({ length: n + 1 }, (_, i) => `<path d="M${i * 50 - 6} 0v-56l6 -8l6 8v56z"/>`).join('')}</g><rect x="-6" y="-46" width="${w + 12}" height="9" fill="#b08860"/><rect x="-6" y="-24" width="${w + 12}" height="9" fill="#b08860"/>`, 0); }
export function heron(o = {}) {
  const c = '#9aa7b4', cd = dark(c, 0.2);
  const inner = `<path d="M-4 0v-70M8 0v-70" stroke="#c99a3a" stroke-width="4"/><path d="M-30 -80q-6 -34 26 -44q30 -6 44 16q6 18 -10 30q-26 16 -60 -2z" fill="${c}"/><path d="M-30 -80q-30 0 -46 14q24 -2 40 -4z" fill="${cd}"/><path d="M-20 -96q24 6 50 -6" stroke="${cd}" stroke-width="4" fill="none"/><path d="M28 -116q4 -40 -6 -62q-4 -14 8 -20q18 -6 22 10" stroke="${c}" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="40" cy="-196" r="11" fill="#eef2f6"/><path d="M48 -198l40 6l-40 6z" fill="#e0a530"/><path d="M30 -204q-16 -4 -24 4" stroke="#2b2f36" stroke-width="3" fill="none"/>${eye(42, -198, 2.4)}`;
  return wrap(o, inner, sh(o) * 30);
}
export function squirrel(o = {}) {
  const c = '#c4662a', cl = '#f3d9b8';
  const inner = swing(`<path d="M-14 -10q-46 0 -40 -50q4 -30 28 -24q-20 10 -14 34q6 24 30 30z" fill="${c}"/>`, -14, -10, 5, 2)
    + `<path d="M-16 0q-6 -30 10 -46q20 -14 32 4q8 16 2 32q-6 10 -18 10z" fill="${c}"/><path d="M4 -10q8 -16 2 -30q12 10 8 26z" fill="${cl}"/><circle cx="18" cy="-52" r="14" fill="${c}"/><path d="M10 -64l2 -14l8 10z" fill="${c}"/><circle cx="30" cy="-50" r="2.4" fill="#2b2b2b"/>${eye(22, -56, 2.6)}<path d="M14 -30q10 -2 16 6" stroke="${c}" stroke-width="5" stroke-linecap="round" fill="none"/>`;
  return wrap(o, inner, sh(o) * 22);
}
export function waterLily(o = {}) {
  return wrap({ ...o, shadow: false }, `<path d="M-60 0a60 16 0 1 0 120 0a60 16 0 1 0 -120 0zM0 0l40 -12" fill="#4caf50"/><path d="M0 0l58 -6" stroke="#e3f2fd" stroke-width="6"/>${o.flower ? `<g transform="translate(-10 -8)"><g fill="#ffffff" stroke="#f8bbd0" stroke-width="1.5">${[-40, -20, 0, 20, 40].map(r => `<ellipse cx="0" cy="-12" rx="7" ry="16" transform="rotate(${r})"/>`).join('')}</g><circle cy="-6" r="6" fill="#ffd54f"/></g>` : ''}`, 0);
}
export function cattail(o = {}) {
  const h = o.h || 160;
  return wrap({ ...o, shadow: false }, `<path d="M0 0q-4 ${-h / 2} 2 ${-h}" stroke="#6a8f3a" stroke-width="5" fill="none"/><rect x="-5" y="${-h * 0.85}" width="12" height="${h * 0.28}" rx="6" fill="#6d4c33"/><path d="M-6 0q-20 ${-h * 0.4} -30 ${-h * 0.7}M6 0q22 ${-h * 0.45} 30 ${-h * 0.8}" stroke="#7fa64a" stroke-width="5" fill="none" stroke-linecap="round"/>`, 0);
}
export function moon(o = {}) {
  return wrap({ ...o, shadow: false }, `<path d="M10 -40a40 40 0 1 0 30 56a32 32 0 1 1 -30 -56z" fill="#fff3b0"/><circle cx="-12" cy="8" r="5" fill="#f1e090"/><circle cx="2" cy="22" r="3" fill="#f1e090"/>`, 0);
}
/* ======================= RASTLINY ======================= */
export function tree(o = {}) {
  // listnatý strom; season: leto | jar | jesen | zima
  const season = o.season || 'leto', h = o.h || 1;
  const tr = '#7a5236', trd = '#5f3f29';
  const crown = { leto: ['#58a845', '#3f8a34', '#7cc35a'], jar: ['#8dcf5a', '#6db544', '#b6e28a'], jesen: ['#f08a24', '#d8641a', '#ffc04a'] }[season];
  const trunk = `<path d="M-12 0q4 -60 2 -${n2(120 * h)}h20q-2 60 4 ${n2(120 * h)}z" fill="${tr}"/><path d="M2 0q2 -60 0 -${n2(118 * h)}h8q-2 60 4 ${n2(118 * h)}z" fill="${trd}"/><path d="M0 -${n2(90 * h)}q-20 -10 -34 -34M4 -${n2(100 * h)}q22 -10 30 -36" stroke="${tr}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  if (season === 'zima') { const t = n2(120 * h); const br = [[0, -t, -46, -t - 60], [0, -t, 44, -t - 66], [0, -t, 4, -t - 80], [-30, -t + 26, -70, -t - 10], [30, -t + 20, 72, -t - 14], [-22, -t - 30, -40, -t - 70], [24, -t - 34, 30, -t - 76]];
    return wrap(o, trunk + br.map(([x1, y1, x2, y2]) => `<path d="M${x1} ${y1}Q${n2((x1 + x2) / 2 + 6)} ${n2((y1 + y2) / 2)} ${x2} ${y2}" stroke="${tr}" stroke-width="6" fill="none" stroke-linecap="round"/>`).join('') + br.map(([, , x2, y2]) => `<ellipse cx="${x2}" cy="${y2 + 2}" rx="9" ry="4" fill="#ffffff"/>`).join(''), sh(o) * 40); }
  const cy = -150 * h, blobs = [[0, cy, 62], [-46, cy + 30, 44], [46, cy + 28, 46], [-24, cy - 30, 40], [28, cy - 28, 42]];
  const crownSvg = `<g fill="${crown[1]}">${blobs.map(([x, y, r]) => `<circle cx="${x + 4}" cy="${n2(y + 6)}" r="${r}"/>`).join('')}</g><g fill="${crown[0]}">${blobs.map(([x, y, r]) => `<circle cx="${x}" cy="${n2(y)}" r="${r - 3}"/>`).join('')}</g><g fill="${crown[2]}" opacity=".85">${blobs.map(([x, y, r]) => `<circle cx="${n2(x - r * 0.3)}" cy="${n2(y - r * 0.35)}" r="${n2(r * 0.4)}"/>`).join('')}</g>`;
  const extra = season === 'jar' ? `<g fill="#ffffff">${[[-30, cy - 10], [20, cy - 40], [40, cy + 20], [-10, cy + 30], [-50, cy + 30], [10, cy]].map(([x, y]) => `<circle cx="${x}" cy="${n2(y)}" r="5"/><circle cx="${x}" cy="${n2(y)}" r="2" fill="#f48fb1"/>`).join('')}</g>`
    : o.fruit ? `<g fill="${o.fruit}">${[[-30, cy + 10], [24, cy - 20], [44, cy + 30], [-6, cy + 36], [-44, cy + 40], [8, cy - 8]].map(([x, y]) => `<circle cx="${x}" cy="${n2(y)}" r="8"/><circle cx="${x - 2}" cy="${n2(y - 3)}" r="2.4" fill="#ffffff" opacity=".6"/>`).join('')}</g>` : '';
  const sway = o.sway === false ? crownSvg + extra : swing(crownSvg + extra, 0, -110 * h, 1.6, 4);
  return wrap(o, trunk + sway, sh(o) * 54);
}
export function conifer(o = {}) {
  const h = o.h || 1, g = ['#2f7d4a', '#3d9a5a', '#246b3c'];
  const tiers = [0, 1, 2, 3].map(i => { const w = 70 - i * 14, y = -40 - i * 44 * h; return `<path d="M${-w} ${n2(y)}L0 ${n2(y - 70 * h)}L${w} ${n2(y)}q-${w} 14 -${w * 2} 0z" fill="${g[i % 2]}"/><path d="M0 ${n2(y - 70 * h)}L${w} ${n2(y)}q-${n2(w * 0.5)} 10 -${w} 6z" fill="${g[2]}" opacity=".55"/>`; }).join('');
  return wrap(o, `<rect x="-7" y="-46" width="14" height="46" fill="#6d4a33"/>` + tiers + (o.snow ? `<g fill="#ffffff">${[0, 1, 2, 3].map(i => { const w = 70 - i * 14, y = -40 - i * 44 * h; return `<path d="M${-w + 6} ${n2(y - 4)}q${w - 6} -14 ${w * 2 - 12} 0q-${w - 6} 6 -${w * 2 - 12} 0z"/>`; }).join('')}</g>` : ''), sh(o) * 52);
}
export function bush(o = {}) {
  const c = o.color || '#4f9a3d';
  return wrap(o, `<g fill="${dark(c, 0.15)}"><circle cx="-24" cy="-22" r="24"/><circle cx="20" cy="-24" r="26"/><circle cx="0" cy="-38" r="26"/></g><g fill="${c}"><circle cx="-26" cy="-24" r="20"/><circle cx="18" cy="-26" r="22"/><circle cx="-2" cy="-40" r="22"/></g><g fill="${light(c, 0.3)}"><circle cx="-10" cy="-50" r="8"/><circle cx="-34" cy="-32" r="6"/></g>${o.berries ? `<g fill="${o.berries}">${[[-20, -30], [8, -44], [24, -22], [-4, -18]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5"/>`).join('')}</g>` : ''}`, sh(o) * 46);
}
export function flower(o = {}) {
  const c = o.color || '#ec407a', h = o.h || 60, type = o.type || 'daisy';
  const stem = `<path d="M0 0q-4 ${-h / 2} 0 ${-h}" stroke="#4f9a3d" stroke-width="4" fill="none"/><path d="M0 ${-h * 0.35}q-18 -10 -22 -24q16 2 22 18z" fill="#5fae3f"/><path d="M0 ${-h * 0.55}q16 -8 22 -22q-16 0 -22 16z" fill="#6dbb48"/>`;
  let head;
  if (type === 'tulip') head = `<g transform="translate(0 ${-h})"><path d="M-14 -4q-4 -22 4 -30l6 10l6 -12l6 12l6 -10q8 8 4 30q-6 10 -16 10q-10 0 -16 -10z" fill="${c}"/><path d="M0 -24l6 -12l6 12q4 16 -6 24z" fill="${dark(c, 0.15)}"/></g>`;
  else if (type === 'sunflower') head = `<g transform="translate(0 ${-h})"><g fill="#ffcc1f">${Array.from({ length: 14 }, (_, i) => `<ellipse cx="0" cy="-20" rx="6" ry="13" transform="rotate(${i * 360 / 14})"/>`).join('')}</g><circle r="13" fill="#6b4423"/><circle r="8" fill="#55361b"/></g>`;
  else head = `<g transform="translate(0 ${-h})"><g fill="${c}">${Array.from({ length: 8 }, (_, i) => `<ellipse cx="0" cy="-11" rx="6" ry="10" transform="rotate(${i * 45})"/>`).join('')}</g><g fill="${dark(c, 0.12)}" opacity=".5">${Array.from({ length: 8 }, (_, i) => `<ellipse cx="0" cy="-8" rx="3" ry="6" transform="rotate(${i * 45 + 8})"/>`).join('')}</g><circle r="7" fill="#ffc928"/><circle cx="-2" cy="-2" r="2.5" fill="#fff2a8"/></g>`;
  const body = stem + head;
  return wrap({ ...o, shadow: false }, o.sway === false ? body : swing(body, 0, 0, 4, 3, o.delay || 0), 0);
}
export function grass(o = {}) {
  const c = o.color || '#5fae3f';
  return wrap({ ...o, shadow: false }, `<path d="M-14 0q-2 -16 -10 -24q10 4 14 18q0 -20 -4 -30q10 10 10 30q2 -14 10 -22q-2 12 -4 28q4 -10 12 -14q-4 8 -6 14z" fill="${c}"/><path d="M-2 0q0 -14 4 -26q2 14 0 26z" fill="${dark(c, 0.15)}"/>`, 0);
}
export function mushroom(o = {}) {
  const type = o.type || 'hrib';
  const inner = type === 'muchotravka'
    ? `<path d="M-8 0q-2 -20 0 -40h16q2 20 0 40z" fill="#fbf7ef"/><path d="M-12 -26q12 4 24 0" stroke="#ece2d0" stroke-width="5"/><path d="M-34 -38q4 -34 34 -36q30 2 34 36q-34 8 -68 0z" fill="#e53935"/><path d="M-34 -38q34 8 68 0q-34 4 -68 0z" fill="#b71c1c"/><g fill="#ffffff"><circle cx="-16" cy="-52" r="5"/><circle cx="6" cy="-62" r="4"/><circle cx="18" cy="-48" r="5"/><circle cx="-2" cy="-46" r="3"/></g>`
    : `<path d="M-12 0q-4 -22 2 -40h18q6 18 2 40z" fill="#f1e2c3"/><path d="M-10 -6q10 4 20 0" stroke="#dcc79f" stroke-width="3"/><path d="M-36 -36q2 -34 36 -36q34 2 36 36q-36 10 -72 0z" fill="#8a5432"/><path d="M-30 -48q8 -16 24 -18" stroke="#a9704a" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-36 -36q36 10 72 0q-36 4 -72 0z" fill="#e8d6a8"/>`;
  return wrap(o, inner, sh(o) * 28);
}
export function apple(o = {}) {
  const c = o.color || '#e53935';
  return wrap({ ...o, shadow: false }, `<path d="M0 -26c14 -8 30 2 26 22c-2 14 -14 24 -24 20c-2 -1 -4 -1 -6 0c-10 4 -22 -6 -24 -20c-4 -20 12 -30 28 -22z" fill="${c}"/><path d="M-14 -18q-8 8 -4 20" stroke="#ffffff" stroke-width="4" opacity=".45" fill="none" stroke-linecap="round"/><path d="M0 -26q2 -10 8 -14" stroke="#6b4423" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M6 -34q10 -8 18 -2q-8 8 -18 2z" fill="#5fae3f"/>`, 0);
}
export function carrot(o = {}) {
  return wrap({ ...o, shadow: false }, `<path d="M-12 0h24l-10 70q-2 6 -4 0z" fill="#f57c00"/><path d="M-8 14h8M-6 30h10M-4 46h6" stroke="#d65f00" stroke-width="2.5"/><path d="M0 0q-14 -20 -8 -32q8 12 8 32zM0 0q0 -26 8 -30q4 14 -8 30zM0 0q14 -18 22 -14q-8 12 -22 14z" fill="#4f9a3d"/>`, 0);
}
export function cabbage(o = {}) {
  return wrap(o, `<circle cy="-30" r="32" fill="#7fbf4f"/><path d="M-30 -30q4 -30 30 -32q-24 14 -20 48zM30 -30q-4 -30 -30 -32q24 14 20 48z" fill="#5fa53a"/><circle cy="-30" r="16" fill="#b5dc8a"/><path d="M0 -46q-6 16 0 30" stroke="#8cc865" stroke-width="3" fill="none"/>`, sh(o) * 32);
}

/* ======================= ĽUDIA ======================= */
// person: h = výška postavy v px, hair, skin, top, bottom, style: short | long | bun | bald | cap; arm: down | wave | hold
export function person(o = {}) {
  const h = o.h || 200, k = h / 200, skin = o.skin || '#f2c49b', hair = o.hair || '#5b3a26', top = o.top || '#3f7fd6', bot = o.bottom || '#3b4a63', st = o.style || 'short';
  const shoe = '#2f2f36', headY = -170, hairSvg = {
    short: `<path d="M-19 -176q0 -24 19 -24q20 0 20 22q-6 -8 -20 -8q-12 0 -19 10z" fill="${hair}"/>`,
    long: `<path d="M-22 -150v-30q0 -22 22 -22q22 0 22 22v30q-8 4 -10 -6v-22q-12 -8 -24 0v22q-2 10 -10 6z" fill="${hair}"/>`,
    bun: `<circle cx="0" cy="-202" r="9" fill="${hair}"/><path d="M-20 -174q0 -24 20 -24q20 0 20 24q-8 -10 -20 -10q-12 0 -20 10z" fill="${hair}"/>`,
    bald: `<path d="M-20 -172q-2 -10 4 -14M20 -172q2 -10 -4 -14" stroke="${hair}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    cap: `<path d="M-20 -176q0 -22 20 -22q20 0 20 22z" fill="${o.capColor || '#e53935'}"/><path d="M14 -180h16q2 6 -4 6h-12z" fill="${dark(o.capColor || '#e53935')}"/>`,
  }[st];
  const armL = `<path d="M-18 -128q-10 30 -8 54" stroke="${top}" stroke-width="13" stroke-linecap="round" fill="none"/><circle cx="-26" cy="-72" r="6" fill="${skin}"/>`;
  const armR = o.arm === 'wave' ? swing(`<path d="M18 -128q20 -20 26 -46" stroke="${top}" stroke-width="13" stroke-linecap="round" fill="none"/><circle cx="45" cy="-178" r="6" fill="${skin}"/>`, 18, -128, 10, 1.1)
    : o.arm === 'hold' ? `<path d="M18 -128q16 22 22 40" stroke="${top}" stroke-width="13" stroke-linecap="round" fill="none"/><circle cx="42" cy="-84" r="6" fill="${skin}"/>`
    : `<path d="M18 -128q10 30 8 54" stroke="${top}" stroke-width="13" stroke-linecap="round" fill="none"/><circle cx="26" cy="-72" r="6" fill="${skin}"/>`;
  const legs = o.skirt
    ? `<path d="M-22 -96h44l10 36h-64z" fill="${bot}"/><path d="M-10 -60v54M10 -60v54" stroke="${skin}" stroke-width="9" stroke-linecap="round"/>`
    : `<path d="M-15 -96h30l-2 90h-11l-2 -66l-2 66h-11z" fill="${bot}"/>`;
  const inner = legs + `<path d="M-16 -6h14v6h-18q0 -6 4 -6zM2 -6h14q4 0 4 6h-18z" fill="${shoe}"/>`
    + armL + `<path d="M-22 -96v-30q0 -18 22 -18q22 0 22 18v30z" fill="${top}"/><path d="M0 -144q10 0 16 6q-6 10 -16 10q-10 0 -16 -10q6 -6 16 -6z" fill="${dark(top, 0.12)}"/>` + armR
    + `<rect x="-6" y="-150" width="12" height="10" fill="${dark(skin, 0.06)}"/><circle cx="0" cy="${headY}" r="20" fill="${skin}"/>${hairSvg}<circle cx="-7" cy="-168" r="2.4" fill="#2b2b2b"/><circle cx="7" cy="-168" r="2.4" fill="#2b2b2b"/><path d="${o.mood === 'sad' ? 'M-6 -156q6 -5 12 0' : o.mood === 'angry' ? 'M-6 -157h12' : 'M-6 -159q6 5 12 0'}" stroke="#9a5b4a" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="-12" cy="-162" r="3.5" fill="#f19c9c" opacity=".45"/><circle cx="12" cy="-162" r="3.5" fill="#f19c9c" opacity=".45"/>${o.mood === 'angry' ? '<path d="M-12 -176l9 4M12 -176l-9 4" stroke="#2b2b2b" stroke-width="2.4" stroke-linecap="round"/>' : o.mood === 'sad' ? '<path d="M-11 -173l7 -2M11 -173l-7 -2" stroke="#2b2b2b" stroke-width="2" stroke-linecap="round"/><path d="M-8 -163q-1 6 1 8" stroke="#64b5f6" stroke-width="2.4" fill="none"/>' : ''}${o.glasses ? '<g fill="none" stroke="#3b3f4a" stroke-width="1.6"><circle cx="-7" cy="-168" r="5.5"/><circle cx="7" cy="-168" r="5.5"/><path d="M-1.5 -168h3"/></g>' : ''}${o.beard ? `<path d="M-14 -162q14 18 28 0q-2 12 -14 14q-12 -2 -14 -14z" fill="${hair}"/>` : ''}`;
  return wrap({ ...o, s: (o.s || 1) * k }, inner, sh(o) * 26);
}

/* ======================= OKOLIE ======================= */
export const sky = (top = '#8fd0f5', bottom = '#e3f4fd', id = 'sky') => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="1200" height="640" fill="url(#${id})"/>`;
export const hills = (y = 470, c1 = '#a5d67a', c2 = '#8cc65f') => `<path d="M0 ${y - 30}q220 -70 460 -10t480 -20t260 0V640H0z" fill="${c1}"/><path d="M0 ${y}q300 -40 620 0t580 -10V640H0z" fill="${c2}"/>`;
export function cloud(o = {}) { const c = o.color || '#ffffff'; return wrap({ ...o, shadow: false }, `<g fill="${dark(c, 0.06)}"><ellipse cx="4" cy="6" rx="64" ry="24"/></g><g fill="${c}"><ellipse rx="64" ry="24"/><circle cx="-24" cy="-16" r="26"/><circle cx="16" cy="-24" r="32"/><circle cx="44" cy="-6" r="20"/></g>`, 0); }
export function sun(o = {}) { return wrap({ ...o, shadow: false }, `<g stroke="#ffc928" stroke-width="7" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="0;360" dur="24s" repeatCount="indefinite"/>${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<path d="M${n2(Math.cos(a) * 54)} ${n2(Math.sin(a) * 54)}L${n2(Math.cos(a) * 70)} ${n2(Math.sin(a) * 70)}"/>`; }).join('')}</g><circle r="44" fill="#ffd84d"/><circle r="44" fill="#ffb300" opacity=".25"/><circle cx="-14" cy="-14" r="16" fill="#fff4b8" opacity=".6"/>`, 0); }

export const K = { heron, squirrel, waterLily, cattail, moon, lizard, barn, fence, cow, sheep, pig, hen, chick, horse, dog, cat, fox, deer, rabbit, mouse, hedgehog, owl, songbird, flyingBird, crow, fish, frog, snail, worm, bee, butterfly, spider, lion, elephant, giraffe, zebra, tree, conifer, bush, flower, grass, mushroom, apple, carrot, cabbage, person, cloud, sun, sky, hills, bob, swing };
export default K;
