// Prerobené scény (lepšia grafika z knižnice kresby.mjs). Build nimi nahradí pôvodné SVG.
// Kľúč je id témy; pts (nepovinné) posunie popisky: { 'Názov bodu': [x, y] } v percentách.
import K from './kresby.mjs';
const { sky, swing } = K;
const svg = inner => `<svg viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const g = (x, y, inner) => `<g transform="translate(${x} ${y})">${inner}</g>`;
const fall = (x, y, c, d, dur = 4) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="5" fill="${c}"><animate attributeName="cy" values="${y};${y + 150}" dur="${dur}s" begin="${d}s" repeatCount="indefinite"/><animate attributeName="cx" values="${x};${x + 30};${x - 10};${x + 20}" dur="${dur}s" begin="${d}s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" dur="${dur}s" begin="${d}s" repeatCount="indefinite"/></ellipse>`;
const snowfall = (x0, x1, y0, y1, n, seed = 1) => `<g fill="#ffffff">${Array.from({ length: n }, (_, i) => { const x = Math.round(x0 + ((i * 97 * seed) % (x1 - x0))); const d = ((i * 0.37) % 4).toFixed(2); const r = 3 + (i % 3) * 2; return `<circle cx="${x}" cy="${y0}" r="${r}"><animate attributeName="cy" values="${y0};${y1}" dur="${4 + (i % 3)}s" begin="${d}s" repeatCount="indefinite"/><animate attributeName="cx" values="${x};${x + 12};${x - 8};${x + 6}" dur="${4 + (i % 3)}s" begin="${d}s" repeatCount="indefinite"/></circle>`; }).join('')}</g>`;
const snowman = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="2" rx="40" ry="7" fill="#000" opacity=".1"/><circle cy="-34" r="36" fill="#ffffff" stroke="#d5e3f0" stroke-width="3"/><circle cy="-92" r="26" fill="#ffffff" stroke="#d5e3f0" stroke-width="3"/><path d="M-20 -118h40v-6h-8v-22h-24v22h-8z" fill="#3b3f4a"/><path d="M2 -92l22 4l-22 4z" fill="#f57c00"/><circle cx="-8" cy="-98" r="3" fill="#333"/><circle cx="10" cy="-98" r="3" fill="#333"/><circle cy="-46" r="4" fill="#333"/><circle cy="-28" r="4" fill="#333"/><path d="M-24 -72q-26 -14 -34 -30M24 -72q26 -12 32 -28" stroke="#7a5236" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-24 -72q24 10 48 0v10q-24 10 -48 0z" fill="#e53935"/></g>`;

const P = K.person;
const house = (x, y, s = 1, wall = '#f6e3c4', roof = '#c0503a') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cy="4" rx="150" ry="12" fill="#000" opacity=".1"/><rect x="-120" y="-170" width="240" height="170" fill="${wall}"/><rect x="-120" y="-170" width="240" height="20" fill="#000" opacity=".06"/><path d="M-145 -165l145 -110l145 110z" fill="${roof}"/><path d="M-145 -165l145 -110l20 15l-145 110z" fill="#fff" opacity=".12"/><rect x="60" y="-260" width="24" height="56" fill="#8d3f2c"/><rect x="-26" y="-90" width="52" height="90" rx="4" fill="#8a5a3a"/><circle cx="16" cy="-44" r="4" fill="#ffd54f"/><g fill="#bfe3f7" stroke="#ffffff" stroke-width="6"><rect x="-96" y="-136" width="48" height="44"/><rect x="48" y="-136" width="48" height="44"/></g><path d="M-72 -136v44M-96 -114h48M72 -136v44M48 -114h48" stroke="#ffffff" stroke-width="4"/><g fill="#e57373"><circle cx="-90" cy="-86" r="6"/><circle cx="-72" cy="-88" r="6"/><circle cx="-54" cy="-86" r="6"/></g><rect x="-100" y="-86" width="56" height="8" rx="3" fill="#7a5236"/></g>`;
const heart = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g><animateTransform attributeName="transform" type="scale" values="1;1.12;1" dur="1.4s" repeatCount="indefinite"/><path d="M0 30C-50 -4 -40 -46 -12 -40C-4 -38 0 -30 0 -26C0 -30 4 -38 12 -40C40 -46 50 -4 0 30Z" fill="#ef5350"/><path d="M-24 -24q-8 6 -6 16" stroke="#fff" stroke-width="5" opacity=".5" fill="none" stroke-linecap="round"/></g></g>`;
const strawberry = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -4C-16 -4 -18 10 -12 20C-8 28 -2 32 0 34C2 32 8 28 12 20C18 10 16 -4 0 -4Z" fill="#e53935"/><g fill="#ffe082">${[[-6, 6], [4, 4], [-2, 16], [8, 14], [-8, 18], [2, 26]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="1.4" ry="2"/>`).join('')}</g><path d="M0 -4l-10 -6l6 0l-2 -6l6 4l4 -6l2 6l6 -2l-4 6l8 2z" fill="#43a047"/></g>`;
const fam = {
  babka: o => P({ h: 176, hair: '#c9c9c9', style: 'bun', top: '#8e44ad', bottom: '#6d4c41', skirt: true, glasses: true, ...o }),
  dedko: o => P({ h: 184, hair: '#bdbdbd', style: 'bald', top: '#6d4c41', bottom: '#455a64', glasses: true, beard: false, ...o }),
  mama: o => P({ h: 196, hair: '#6b3e26', style: 'long', top: '#e53935', bottom: '#37474f', skirt: true, ...o }),
  otec: o => P({ h: 214, hair: '#3e2723', style: 'short', top: '#1e88e5', bottom: '#37474f', beard: true, ...o }),
  brat: o => P({ h: 132, hair: '#f9a825', style: 'short', top: '#43a047', bottom: '#1565c0', ...o }),
  sestra: o => P({ h: 120, hair: '#5d4037', style: 'long', top: '#ec407a', bottom: '#7e57c2', skirt: true, ...o }),
};

const car = (x, y, c = '#e53935', flip = false, s = 1) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><ellipse cy="4" rx="110" ry="10" fill="#000" opacity=".15"/><path d="M-110 -20q0 -30 30 -34l40 -40q10 -8 30 -8h60q20 0 30 12l26 34q34 4 34 36v20h-250z" fill="${c}"/><path d="M-30 -86h46v34h-76zM26 -86h34q10 0 16 8l20 26h-70z" fill="#cfe9f7"/><path d="M-110 -8h250" stroke="#000" stroke-opacity=".15" stroke-width="6"/><rect x="118" y="-34" width="18" height="10" rx="4" fill="#fff59d"/><rect x="-112" y="-30" width="10" height="10" rx="3" fill="#ef5350"/><g fill="#2f2f36"><circle cx="-60" cy="0" r="22"/><circle cx="90" cy="0" r="22"/></g><g fill="#bdbdbd"><circle cx="-60" cy="0" r="9"/><circle cx="90" cy="0" r="9"/></g></g>`;
const semafor = (x, y, s = 1, ped = true) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="-260" width="12" height="260" fill="#546e7a"/><rect x="-30" y="-${ped ? 340 : 380}" width="60" height="${ped ? 130 : 180}" rx="12" fill="#263238"/>${ped
  ? `<circle cy="-306" r="22" fill="#ef5350"><animate attributeName="opacity" values="1;1;.15;.15" keyTimes="0;.5;.5;1" dur="6s" repeatCount="indefinite"/></circle><g fill="#fff" opacity=".9"><circle cy="-318" r="4.5"/><path d="M-6 -312h12v15h-3v13h-6v-13h-3z"/></g><circle cy="-246" r="22" fill="#4caf50"><animate attributeName="opacity" values=".15;.15;1;1" keyTimes="0;.5;.5;1" dur="6s" repeatCount="indefinite"/></circle><g fill="#fff" opacity=".9"><circle cx="2" cy="-260" r="4.5"/><path d="M-3 -254h8l6 10l-4 2l-4 -5v7l6 12h-5l-5 -8l-5 8h-5l6 -12v-8l-4 5l-4 -2z"/></g>`
  : `<circle cy="-350" r="20" fill="#ef5350"/><circle cy="-300" r="20" fill="#ffca28" opacity=".3"/><circle cy="-250" r="20" fill="#4caf50" opacity=".3"/>`}</g>`;
const building = (x, y, w, h, c) => `<g transform="translate(${x} ${y})"><rect x="0" y="${-h}" width="${w}" height="${h}" fill="${c}"/><rect x="0" y="${-h}" width="${w}" height="12" fill="#000" opacity=".08"/>${Array.from({ length: Math.floor((h - 60) / 70) }, (_, r) => Array.from({ length: Math.floor((w - 20) / 60) }, (_, k) => `<rect x="${24 + k * 60}" y="${-h + 34 + r * 70}" width="32" height="40" rx="3" fill="${(r + k) % 3 ? '#e3f2fd' : '#fff59d'}"/>`).join('')).join('')}</g>`;
const umbrella = (x, y, c = '#e53935', s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0v80q0 12 -12 10" stroke="#37474f" stroke-width="4" fill="none"/><path d="M-70 0q0 -60 70 -62q70 2 70 62q-12 -10 -24 0q-12 -10 -23 0q-12 -10 -23 0q-12 -10 -23 0q-12 -10 -24 0q-12 -10 -23 0z" fill="${c}"/></g>`;
const rain = (x0, x1, y0, y1, n) => `<g stroke="#4f9fe0" stroke-width="4" stroke-linecap="round">${Array.from({ length: n }, (_, i) => { const x = Math.round(x0 + (i * 53) % (x1 - x0)); const d = ((i * 0.29) % 1).toFixed(2); return `<path d="M${x} ${y0}l-6 18"><animateTransform attributeName="transform" type="translate" values="0 0;-20 ${y1 - y0}" dur="1s" begin="${d}s" repeatCount="indefinite"/></path>`; }).join('')}</g>`;
const wind = (x, y) => `<g stroke="#ffffff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".9">${[0, 50, 100].map((d, i) => `<path d="M${x} ${y + d}q60 -20 120 0t80 -20" stroke-dasharray="60 200"><animate attributeName="stroke-dashoffset" values="260;0" dur="1.6s" begin="${i * .4}s" repeatCount="indefinite"/></path>`).join('')}</g>`;
const pocasie = id => svg(`<defs><linearGradient id="${id}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fcaf5"/><stop offset="1" stop-color="#e3f4fd"/></linearGradient><linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b0c4d4"/><stop offset="1" stop-color="#e8eef3"/></linearGradient><linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d8fa0"/><stop offset="1" stop-color="#c5d0da"/></linearGradient><linearGradient id="${id}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9dcf0"/><stop offset="1" stop-color="#f3f7fc"/></linearGradient></defs>`
  + `<rect width="300" height="640" fill="url(#${id}a)"/><rect x="300" width="300" height="640" fill="url(#${id}b)"/><rect x="600" width="300" height="640" fill="url(#${id}c)"/><rect x="900" width="300" height="640" fill="url(#${id}d)"/>`
  + `<path d="M0 480q150 -20 300 0V640H0z" fill="#8cc65f"/><path d="M300 480q150 -20 300 0V640H300z" fill="#7fb85a"/><path d="M600 480q150 -20 300 0V640H600z" fill="#5f9a45"/><path d="M900 480q150 -20 300 0V640H900z" fill="#ffffff"/>`
  + K.sun({ x: 150, y: 150, s: 1.1 }) + K.flower({ x: 70, y: 540, h: 60, color: '#ec407a' }) + K.flower({ x: 120, y: 550, h: 50, type: 'tulip', color: '#ffca28', delay: .5 }) + K.flower({ x: 230, y: 540, type: 'sunflower', h: 90, delay: 1 }) + `<g transform="translate(190 330)"><g><animateTransform attributeName="transform" type="translate" values="0 0;20 -14;0 0" dur="3s" repeatCount="indefinite"/>${K.butterfly({ s: 0.7 })}</g></g>`
  + K.cloud({ x: 400, y: 90, s: 0.9 }) + K.cloud({ x: 520, y: 150, s: 0.6 }) + `<g><animateTransform attributeName="transform" type="rotate" values="-3 450 500;9 450 500;-3 450 500" dur="1.4s" repeatCount="indefinite"/>${K.tree({ x: 450, y: 500, s: 0.85, sway: false })}</g>` + wind(330, 250)
  + `<g transform="translate(540 300)"><g><animateTransform attributeName="transform" type="rotate" values="-8;8;-8" dur="2s" repeatCount="indefinite"/><path d="M0 -40l26 40l-26 40l-26 -40z" fill="#ff7043"/><path d="M0 -40v80M-26 0h52" stroke="#fff" stroke-width="3"/><path d="M0 40q-10 30 10 60q-10 20 0 40" stroke="#5d4037" stroke-width="2" fill="none"/></g></g>`
  + K.cloud({ x: 750, y: 110, s: 1.3, color: '#7d8a96' }) + rain(630, 880, 150, 470, 18) + `<ellipse cx="760" cy="560" rx="90" ry="16" fill="#4f9fe0" opacity=".7"/>` + umbrella(760, 380, '#ffca28', 0.9) + K.person({ x: 760, y: 560, h: 150, top: '#e53935', bottom: '#1e88e5', style: 'cap', capColor: '#ffca28' }).replace(/^/, '')
  + K.cloud({ x: 1050, y: 100, s: 1, color: '#eef3f8' }) + snowfall(910, 1190, 140, 480, 18, 1) + K.conifer({ x: 960, y: 500, s: 0.8, snow: 1 }) + snowman(1100, 520, 0.9)
  + `<path d="M300 0V640M600 0V640M900 0V640" stroke="#ffffff" stroke-width="8"/>`);
const caveman = o => P({ skin: '#e0ac7e', hair: '#4e342e', top: '#8d6e4a', bottom: '#6d4c33', style: 'long', ...o });

const palm = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0q-6 -80 10 -150" stroke="#8d6e4a" stroke-width="12" fill="none"/>${swing(`<g fill="#4f9a3d"><path d="M10 -150q-60 -30 -90 10q50 -20 90 -10z"/><path d="M10 -150q60 -36 96 4q-50 -18 -96 -4z"/><path d="M10 -150q-30 -50 -80 -50q50 20 80 50z"/><path d="M10 -150q30 -56 84 -46q-50 16 -84 46z"/></g><circle cx="4" cy="-146" r="7" fill="#6d4c33"/><circle cx="16" cy="-144" r="7" fill="#6d4c33"/>`, 10, -150, 3, 3)}</g>`;
const pyramid = (x, y, w, h) => `<g transform="translate(${x} ${y})"><path d="M${-w / 2} 0L0 ${-h}L${w / 2} 0z" fill="#e8c27a"/><path d="M0 ${-h}L${w / 2} 0H${w * 0.12}z" fill="#c99a4a"/><g stroke="#c99a4a" stroke-width="2" opacity=".6">${[0.2, 0.4, 0.6, 0.8].map(k => `<path d="M${-w / 2 * k} ${-h * (1 - k)}H${w * 0.12 * k}"/>`).join('')}</g></g>`;
const castle = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-110" y="-120" width="220" height="120" fill="#b0a99f"/><g fill="#b0a99f">${[-110, -80, -50, -20, 10, 40, 70].map(a => `<rect x="${a + 4}" y="-136" width="20" height="18"/>`).join('')}</g><rect x="-150" y="-200" width="60" height="200" fill="#9e968b"/><rect x="90" y="-200" width="60" height="200" fill="#9e968b"/><path d="M-160 -200l40 -50l40 50zM80 -200l40 -50l40 50z" fill="#8d3f2c"/><path d="M-120 -250v-40" stroke="#5d4037" stroke-width="4"/><path d="M-118 -290h34l-8 10l8 10h-34z" fill="#e53935"><animate attributeName="d" values="M-118 -290h34l-8 10l8 10h-34z;M-118 -290q18 6 34 -2l-8 12l8 10q-16 -6 -34 0z;M-118 -290h34l-8 10l8 10h-34z" dur="1.4s" repeatCount="indefinite"/></path><path d="M-24 0v-50q24 -30 48 0v50z" fill="#5d4037"/><g fill="#3e3a36"><rect x="-130" y="-160" width="16" height="26" rx="8"/><rect x="114" y="-160" width="16" height="26" rx="8"/><rect x="-70" y="-90" width="14" height="22" rx="7"/><rect x="56" y="-90" width="14" height="22" rx="7"/></g><g stroke="#8a8278" stroke-width="2" opacity=".5"><path d="M-110 -60h220M-110 -30h220M-150 -100h60M90 -100h60M-150 -50h60M90 -50h60"/></g></g>`;
const hut = (x, y, s = 1, wall = '#d7b98a') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cy="4" rx="70" ry="8" fill="#000" opacity=".1"/><rect x="-56" y="-60" width="112" height="60" fill="${wall}"/><path d="M-72 -56l72 -56l72 56z" fill="#c9a640"/><path d="M-72 -56l72 -56l10 8l-66 52z" fill="#e0bf5a"/><rect x="-14" y="-40" width="28" height="40" fill="#6d4c33"/><rect x="24" y="-44" width="20" height="18" fill="#8d6e4a"/></g>`;
const church = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-60" y="-110" width="120" height="110" fill="#f3e9d8"/><path d="M-72 -106l72 -50l72 50z" fill="#8d3f2c"/><rect x="-26" y="-240" width="52" height="140" fill="#efe2cc"/><path d="M-32 -236l32 -70l32 70z" fill="#5d7a8c"/><path d="M0 -306v-30M-10 -326h20" stroke="#ffca28" stroke-width="5"/><rect x="-12" y="-210" width="24" height="34" rx="12" fill="#5d4037"/><path d="M-18 0v-50q18 -26 36 0v50z" fill="#6d4c33"/></g>`;
const bell = (x, y) => `<g transform="translate(${x} ${y})">${swing('<path d="M-24 30q0 -46 24 -48q24 2 24 48z" fill="#ffca28"/><path d="M-30 30h60" stroke="#f9a825" stroke-width="6" stroke-linecap="round"/><circle cy="36" r="7" fill="#c49000"/>', 0, -18, 14, 1.2)}</g>`;
const columns = (x, y, n, w, h, c = '#fbfaf6') => `<g transform="translate(${x} ${y})"><rect x="-10" y="0" width="${w + 20}" height="14" fill="#e6e0d2"/><rect x="-24" y="14" width="${w + 48}" height="14" fill="#d9d1bf"/>${Array.from({ length: n }, (_, i) => { const cx = i * w / (n - 1); return `<rect x="${cx - 12}" y="${-h}" width="24" height="${h}" fill="${c}"/><rect x="${cx - 4}" y="${-h}" width="5" height="${h}" fill="#e6e0d2"/><rect x="${cx - 16}" y="${-h - 10}" width="32" height="10" fill="#e6e0d2"/>`; }).join('')}<rect x="-20" y="${-h - 30}" width="${w + 40}" height="20" fill="#efe9dc"/><path d="M-26 ${-h - 30}L${w / 2} ${-h - 90}L${w + 26} ${-h - 30}z" fill="#f6f1e6"/><path d="M${w / 2 - 60} ${-h - 42}h120" stroke="#c9b48a" stroke-width="4"/></g>`;
const legionar = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${P({ h: 200, top: '#c62828', bottom: '#6d4c33', skin: '#e9b48a', style: 'cap', capColor: '#9e9e9e', arm: 'hold' })}<path d="M-14 -196q14 -30 28 0" fill="#e53935"/><path d="M-22 -96h44v10h-44z" fill="#ffca28"/><path d="M-22 -116h44M-22 -106h44" stroke="#8d6e63" stroke-width="3"/><rect x="-62" y="-130" width="44" height="80" rx="10" fill="#c62828" stroke="#ffca28" stroke-width="5"/><circle cx="-40" cy="-90" r="8" fill="#ffca28"/><path d="M40 -84l12 -120" stroke="#6d4c33" stroke-width="5"/><path d="M52 -204l-6 -20l14 2z" fill="#9e9e9e"/></g>`;

export default {
  'rocne-obdobia': {
    svg: svg(
      `<defs><linearGradient id="q1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6f0ff"/><stop offset="1" stop-color="#eefbe6"/></linearGradient><linearGradient id="q2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3ff"/><stop offset="1" stop-color="#fff4c4"/></linearGradient><linearGradient id="q3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe0b8"/><stop offset="1" stop-color="#fdf0dc"/></linearGradient><linearGradient id="q4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9dcf0"/><stop offset="1" stop-color="#eef4fb"/></linearGradient></defs>`
      + `<rect width="600" height="320" fill="url(#q1)"/><rect x="600" width="600" height="320" fill="url(#q2)"/><rect y="320" width="600" height="320" fill="url(#q3)"/><rect x="600" y="320" width="600" height="320" fill="url(#q4)"/>`
      // jar
      + `<path d="M0 250q150 -30 300 0t300 -6V320H0z" fill="#a8dc80"/><path d="M0 280q200 -16 600 -4V320H0z" fill="#8bcb62"/>`
      + K.tree({ x: 190, y: 290, s: 0.78, season: 'jar' }) + K.flower({ x: 360, y: 300, type: 'tulip', color: '#e53935', h: 50 }) + K.flower({ x: 400, y: 304, type: 'tulip', color: '#fdd835', h: 44, delay: 0.5 }) + K.flower({ x: 450, y: 300, color: '#ffffff', h: 40, delay: 1 }) + K.flower({ x: 500, y: 306, color: '#f48fb1', h: 46, delay: 1.5 })
      + K.flyingBird({ x: 420, y: 90, s: 0.9 }) + K.flyingBird({ x: 480, y: 60, s: 0.7 })
      // leto
      + `<path d="M600 250q150 -30 300 0t300 -6V320H600z" fill="#7cc35a"/><path d="M600 282q200 -16 600 -4V320H600z" fill="#62ad45"/>`
      + K.sun({ x: 1080, y: 80, s: 0.8 }) + K.tree({ x: 780, y: 292, s: 0.8, fruit: '#e53935' }) + K.flower({ x: 960, y: 300, type: 'sunflower', h: 90 }) + K.flower({ x: 1010, y: 304, type: 'sunflower', h: 70, delay: 0.7 })
      + `<g transform="translate(940 150)"><g><animateTransform attributeName="transform" type="translate" values="0 0;24 -10;0 0" dur="3s" repeatCount="indefinite"/>${K.butterfly({ s: 0.7 })}</g></g>`
      // jeseň
      + `<path d="M0 570q150 -24 300 0t300 -4V640H0z" fill="#c9a26a"/><path d="M0 600q300 -14 600 0V640H0z" fill="#b08654"/>`
      + K.tree({ x: 190, y: 606, s: 0.78, season: 'jesen' }) + K.hedgehog({ x: 420, y: 612, s: 1 }) + K.mushroom({ x: 520, y: 614, s: 0.7 }) + K.mushroom({ x: 470, y: 616, s: 0.5, type: 'muchotravka' })
      + fall(270, 430, '#e5672a', 0, 3.4) + fall(130, 450, '#f2b632', 1, 4) + fall(320, 470, '#d8641a', 2, 3.6) + fall(90, 470, '#ffc04a', 0.6, 4.4)
      // zima
      + `<path d="M600 570q150 -24 300 0t300 -4V640H600z" fill="#ffffff"/><path d="M600 600q300 -14 600 0V640H600z" fill="#eef4fb"/>`
      + K.conifer({ x: 700, y: 606, s: 0.72, snow: 1 }) + K.tree({ x: 880, y: 606, s: 0.78, season: 'zima' }) + snowman(1060, 608, 0.9) + snowfall(620, 1190, 330, 600, 16, 1)
      + `<path d="M600 0V640M0 320H1200" stroke="#ffffff" stroke-width="8"/>`),
  },
  motyl: {
    svg: svg(sky('#bfe6ff', '#f4fbe9', 'skm') + `<path d="M0 520q300 -40 600 0t600 -10V640H0z" fill="#a8dc80"/><path d="M0 560q400 -20 1200 0V640H0z" fill="#8bcb62"/>`
      + K.tree({ x: -40, y: 560, s: 1.6, sway: false, shadow: false })
      + `<path d="M40 300Q300 250 580 296" stroke="#6b4a2b" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M300 270q20 -30 60 -40" stroke="#6b4a2b" stroke-width="9" fill="none" stroke-linecap="round"/>`
      + `<path d="M140 290Q190 196 276 266Q200 326 140 290Z" fill="#5cb85c"/><path d="M146 288Q210 250 270 266" stroke="#3f8a34" stroke-width="3" fill="none"/><path d="M380 285Q450 190 526 268Q450 332 380 285Z" fill="#4caf50"/><path d="M386 284Q456 246 520 268" stroke="#2e7d32" stroke-width="3" fill="none"/>`
      + `<g fill="#fff6c8" stroke="#d1b450" stroke-width="2"><ellipse cx="196" cy="262" rx="7" ry="9"/><ellipse cx="212" cy="258" rx="7" ry="9"/><ellipse cx="226" cy="262" rx="7" ry="9"/><ellipse cx="204" cy="248" rx="7" ry="9"/></g>`
      + `<g><animateTransform attributeName="transform" type="translate" values="0 0;24 -2;0 0" dur="5s" repeatCount="indefinite"/><g transform="translate(410 274)">${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${i * 13}" cy="${i % 2 ? -3 : 0}" r="${i === 5 ? 13 : 11}" fill="${i % 2 ? '#8bd14f' : '#6fb83b'}"/><circle cx="${i * 13}" cy="${(i % 2 ? -3 : 0) - 6}" r="2.6" fill="#ffd54f"/>`).join('')}<circle cx="70" cy="-6" r="2.6" fill="#222"/><path d="M66 -14l-2 -8M72 -14l2 -8" stroke="#3a5a20" stroke-width="2"/></g></g>`
      + `<path d="M640 110H760" stroke="#6b4a2b" stroke-width="16" stroke-linecap="round"/><line x1="700" y1="116" x2="700" y2="172" stroke="#6b4a2b" stroke-width="3"/>`
      + `<g><animateTransform attributeName="transform" type="rotate" values="-5 700 172;5 700 172;-5 700 172" dur="3s" repeatCount="indefinite"/><path d="M700 172q34 10 34 60q-4 50 -34 66q-30 -16 -34 -66q0 -50 34 -60z" fill="#a8c66c"/><path d="M700 176q20 14 22 56q-4 40 -22 60z" fill="#8aab4f"/><path d="M676 210q24 8 48 0M674 240q26 8 52 0M680 268q20 6 40 0" stroke="#7a9a40" stroke-width="2.5" fill="none"/><circle cx="700" cy="182" r="4" fill="#ffd54f"/></g>`
      + `<g transform="translate(870 380)"><g><animateTransform attributeName="transform" type="translate" values="0 0;10 -18;0 0" dur="2.6s" repeatCount="indefinite"/>${K.butterfly({ s: 2.1, color: '#e8573c', color2: '#f2a33a' })}</g></g>`
      + K.flower({ x: 1040, y: 560, h: 120, s: 1.4, color: '#ff8fb8' }) + K.flower({ x: 1110, y: 566, h: 80, color: '#ba68c8', delay: 1 }) + K.grass({ x: 980, y: 566 }) + K.grass({ x: 300, y: 560, s: 1.3 }) + K.grass({ x: 640, y: 566 })),
    pts: { 'Kvet s nektárom': [87, 66] },
  },
  huby: {
    svg: svg(sky('#d7efd9', '#eef7e6', 'skh') + K.conifer({ x: 90, y: 352, s: 1.3, shadow: false }) + K.tree({ x: 1040, y: 352, s: 1.2, shadow: false }) + K.conifer({ x: 1170, y: 352, s: 0.9, shadow: false })
      + `<rect y="352" width="1200" height="288" fill="#6d4c33"/><path d="M0 352q300 -14 600 0t600 0v12H0z" fill="#5a9e3e"/><g fill="#5c3f2a" opacity=".5">${[60, 210, 420, 700, 860, 1080].map((x, i) => `<ellipse cx="${x}" cy="${470 + (i % 3) * 50}" rx="14" ry="6"/>`).join('')}</g>`
      + `<g stroke="#f3e6c8" stroke-width="3" fill="none" stroke-dasharray="10 8" stroke-linecap="round"><path d="M520 360Q420 450 300 430T120 520"><animate attributeName="stroke-dashoffset" values="0;-36" dur="1.5s" repeatCount="indefinite"/></path><path d="M560 360Q620 470 760 450T1000 540"><animate attributeName="stroke-dashoffset" values="0;-36" dur="1.5s" repeatCount="indefinite"/></path><path d="M540 360Q540 480 480 600"><animate attributeName="stroke-dashoffset" values="0;-36" dur="1.5s" repeatCount="indefinite"/></path><path d="M300 430Q260 520 330 600M760 450Q820 540 760 610"><animate attributeName="stroke-dashoffset" values="0;-36" dur="1.5s" repeatCount="indefinite"/></path></g>`
      + K.mushroom({ x: 540, y: 356, s: 3.2 })
      + `<g fill="#7b5b3a">${[[470, 0], [540, 1], [610, 2], [500, 1.5], [580, 0.5]].map(([x, d]) => `<circle cx="${x}" cy="240" r="4"><animate attributeName="cy" values="240;350" dur="3s" begin="${d}s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="3s" begin="${d}s" repeatCount="indefinite"/></circle>`).join('')}<circle cx="640" cy="236" r="4"><animate attributeName="cx" values="640;760" dur="4s" repeatCount="indefinite"/><animate attributeName="cy" values="236;180" dur="4s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="4s" repeatCount="indefinite"/></circle></g>`
      + K.mushroom({ x: 860, y: 356, s: 1.7, type: 'muchotravka' }) + K.mushroom({ x: 920, y: 358, s: 0.9, type: 'muchotravka' })
      + `<g>${[[150, 352, '#c9862f', -15], [196, 350, '#d79a3b', 20], [240, 354, '#e5672a', -5], [120, 356, '#b5652a', 30]].map(([x, y, c, r]) => `<ellipse cx="${x}" cy="${y - 6}" rx="22" ry="9" fill="${c}" transform="rotate(${r} ${x} ${y - 6})"/>`).join('')}</g>` + K.grass({ x: 330, y: 356 }) + K.grass({ x: 700, y: 356, s: 1.2 })),
  },
  'kvet-opelenie': {
    svg: svg(sky('#d6efff', '#f2fbe9', 'skk') + `<path d="M0 500q300 -30 600 0t600 -6V640H0z" fill="#a8dc80"/><path d="M0 540q400 -20 1200 0V640H0z" fill="#8bcb62"/>`
      + (() => { const fl = (x, top, dropping) => `<g transform="translate(${x} 540)"><path d="M0 0q-8 ${(top) / 2} 0 ${top}" stroke="#558b2f" stroke-width="10" fill="none"/><path d="M0 ${top * 0.45}q-60 -40 -84 -10q40 26 84 10z" fill="#7cb342"/><path d="M0 ${top * 0.65}q60 -36 80 -6q-40 22 -80 6z" fill="#8bc34a"/><g transform="translate(0 ${top})">${dropping ? '<g><animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.5;0.6;0.95;1" dur="10s" repeatCount="indefinite"/>' : '<g>'}<g fill="#f48fb1">${Array.from({ length: 8 }, (_, i) => `<ellipse cx="0" cy="-48" rx="22" ry="34" transform="rotate(${i * 45})"/>`).join('')}</g><g fill="#ec6f9b" opacity=".6">${Array.from({ length: 8 }, (_, i) => `<ellipse cx="0" cy="-36" rx="8" ry="16" transform="rotate(${i * 45 + 10})"/>`).join('')}</g></g><circle r="28" fill="#ffd54f">${dropping ? '<animate attributeName="fill" values="#ffd54f;#ffd54f;#7cb342;#7cb342;#ffd54f" keyTimes="0;0.5;0.7;0.95;1" dur="10s" repeatCount="indefinite"/><animate attributeName="r" values="28;28;40;40;28" keyTimes="0;0.5;0.75;0.95;1" dur="10s" repeatCount="indefinite"/>' : ''}</circle>${Array.from({ length: 10 }, (_, i) => { const a = i * Math.PI / 5; return `<path d="M0 0L${Math.round(Math.cos(a) * 22)} ${Math.round(Math.sin(a) * 22)}" stroke="#c8961c" stroke-width="2.5"/><circle cx="${Math.round(Math.cos(a) * 22)}" cy="${Math.round(Math.sin(a) * 22)}" r="4" fill="#f9a825"/>`; }).join('')}</g></g>`; return fl(300, -270, false) + fl(700, -230, true); })()
      + `<g><animateTransform attributeName="transform" type="translate" values="0 0;150 30;150 30;0 0;0 0" keyTimes="0;0.4;0.5;0.9;1" dur="8s" repeatCount="indefinite"/><g transform="translate(440 270)">${K.bee({ s: 2 })}<g fill="#f9a825"><circle cx="-10" cy="4" r="5"/><circle cx="6" cy="6" r="5"/></g></g></g>`
      + K.tree({ x: 1010, y: 545, s: 1.05, fruit: '#e53935' }) + K.grass({ x: 520, y: 545 }) + K.grass({ x: 860, y: 548, s: 1.2 }) + K.flower({ x: 140, y: 550, h: 60, color: '#ffffff' }) + K.flower({ x: 180, y: 556, h: 46, color: '#fdd835', delay: 1 })),
    pts: { 'Včela': [43, 34], 'Plody': [84, 52] },
  },
  stavovce: {
    svg: svg(sky('#bfe6ff', '#eaf7ff', 'sks') + K.cloud({ x: 260, y: 110, s: 0.9 }) + K.cloud({ x: 700, y: 80, s: 0.7 })
      + `<path d="M0 400q300 -40 600 0t600 -10V640H0z" fill="#a5d67a"/><path d="M0 450q400 -24 1200 0V640H0z" fill="#8cc65f"/><path d="M-20 470q180 -30 400 0q20 90 -40 170H-20z" fill="#4fc3f7"/><path d="M-20 470q180 -30 400 0" stroke="#b3e5fc" stroke-width="6" fill="none"/>`
      + `<g><animateTransform attributeName="transform" type="translate" values="0 0;110 -6;0 0" dur="8s" repeatCount="indefinite"/>${K.fish({ x: 120, y: 550, s: 1.7 })}</g>` + K.grass({ x: 380, y: 470, s: 1.3, color: '#3f8a34' })
      + `<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -40;0 0;0 0" keyTimes="0;0.15;0.3;1" dur="3s" repeatCount="indefinite"/>${K.frog({ x: 420, y: 470, s: 1.3 })}</g>`
      + `<path d="M560 520q80 -30 160 0" fill="#c9b18a"/><ellipse cx="640" cy="512" rx="90" ry="20" fill="#b9a07a"/>` + `<g><animateTransform attributeName="transform" type="translate" values="0 0;18 0;0 0" dur="5s" repeatCount="indefinite"/>${K.lizard({ x: 630, y: 500, s: 1.4 })}</g>`
      + K.tree({ x: 880, y: 440, s: 0.9, shadow: false }) + `<g transform="translate(860 150)"><g><animateTransform attributeName="transform" type="translate" values="0 0;30 -10;0 0" dur="3s" repeatCount="indefinite"/>${K.flyingBird({ s: 2.6, color: '#3949ab' })}</g></g>`
      + K.fox({ x: 980, y: 520, s: 1.6 }) + K.flower({ x: 760, y: 470, h: 40, color: '#ffffff' }) + K.flower({ x: 1140, y: 480, h: 44, color: '#f48fb1', delay: 1 })),
    pts: { 'Ryba': [14, 84], 'Obojživelník': [35, 64], 'Plaz': [55, 70], 'Vták': [73, 30], 'Cicavec': [82, 68] },
  },
  'domace-zvierata': {
    svg: svg(sky('#bfe6ff', '#eaf7ff', 'skd') + `<path d="M0 430q300 -20 600 0V640H0z" fill="#b5dc8a"/><path d="M600 430q300 -20 600 0V640H600z" fill="#7fb85a"/><path d="M600 0V640" stroke="#ffffff" stroke-width="8"/>`
      + K.barn({ x: 130, y: 440, s: 1 }) + K.fence({ x: 240, y: 440, w: 340 }) + K.cow({ x: 330, y: 540, s: 1.15 })
      + K.hen({ x: 500, y: 608, s: 1.15 }) + K.bob(K.chick({ x: 560, y: 612, s: 1 }), -6, 0.9) + K.bob(K.chick({ x: 440, y: 616, s: 0.9 }), -6, 0.9, 0.3)
      + K.conifer({ x: 720, y: 440, s: 1.5, shadow: false }) + K.tree({ x: 940, y: 436, s: 1.2, shadow: false }) + K.conifer({ x: 1120, y: 440, s: 1.7, shadow: false })
      + K.deer({ x: 880, y: 540, s: 1.15 }) + K.fox({ x: 1060, y: 610, s: 1.2, flip: true }) + K.bush({ x: 680, y: 600, s: 0.9 }) + K.mushroom({ x: 760, y: 612, s: 0.6 })),
    pts: { 'Krava': [27, 68], 'Sliepka': [42, 83], 'Srnka': [75, 66], 'Líška': [88, 84] },
  },
  'potravovy-retazec': {
    svg: svg(sky('#cfe9f7', '#eef8e8', 'skp') + K.sun({ x: 1090, y: 80, s: 0.7 })
      + `<path d="M0 450q300 -24 600 0t600 -8V640H0z" fill="#6fb04f"/><rect y="470" width="1200" height="170" fill="#7a5a3a"/><path d="M0 470q300 10 600 0t600 4V490H0z" fill="#5a9e3e"/><g fill="#6b4c31" opacity=".6">${[80, 260, 520, 760, 940, 1120].map((x, i) => `<ellipse cx="${x}" cy="${560 + (i % 2) * 30}" rx="${10 + (i % 3) * 4}" ry="5"/>`).join('')}</g>`
      + K.tree({ x: 160, y: 478, s: 1.25, fruit: '#9c6b2f' })
      + K.conifer({ x: 808, y: 478, s: 1.35 }) + `<path d="M770 300h80" stroke="#6d4a33" stroke-width="10" stroke-linecap="round"/>` + K.bob(K.owl({ x: 808, y: 296, s: 1.2, shadow: false }), -5, 2.5)
      + `<g><animateTransform attributeName="transform" type="translate" values="0 0;30 0;0 0" dur="6s" repeatCount="indefinite"/>${K.mouse({ x: 470, y: 474, s: 1.4 })}</g>`
      + `<g transform="translate(330 560)"><ellipse rx="56" ry="16" fill="#b5834a"/>${[[-30, -6, '#e5672a', -20], [0, -12, '#f2b632', 10], [24, -4, '#c75a28', 35], [-8, 2, '#d89a3a', -40]].map(([x, y, c, r]) => `<ellipse cx="${x}" cy="${y}" rx="18" ry="8" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`).join('')}</g>`
      + K.mushroom({ x: 640, y: 600, s: 1 }) + K.mushroom({ x: 690, y: 604, s: 0.6 }) + K.worm({ x: 980, y: 606, s: 1.4 })
      + `<g stroke="#ffb74d" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="14 16"><path d="M200 340Q320 390 430 430"><animate attributeName="stroke-dashoffset" values="60;0" dur="1.5s" repeatCount="indefinite"/></path><path d="M520 430Q650 340 760 290"><animate attributeName="stroke-dashoffset" values="60;0" dur="1.5s" repeatCount="indefinite"/></path><path d="M390 560Q500 600 600 590"><animate attributeName="stroke-dashoffset" values="60;0" dur="1.5s" repeatCount="indefinite"/></path><path d="M700 610Q480 640 230 480"><animate attributeName="stroke-dashoffset" values="60;0" dur="1.5s" repeatCount="indefinite"/></path></g>`),
    pts: { 'Dub so žaluďmi': [13, 38], 'Sova lesná': [67, 38], 'Myš': [41, 64], 'Huby a dážďovky': [62, 86] },
  },
  bajka: {
    svg: svg(sky('#bfe3f7', '#f3f9e6', 'skb') + K.cloud({ x: 980, y: 90, s: 0.8 }) + K.hills(500, '#b5dc8a', '#9ccf6e')
      + K.conifer({ x: 1120, y: 470, s: 1.2, shadow: false }) + K.bush({ x: 300, y: 560, s: 1.2 })
      + `<path d="M560 560q14 -160 6 -330h44q-6 170 12 330z" fill="#7a5236"/><path d="M590 560q8 -160 2 -330h18q-4 170 10 330z" fill="#5f3f29"/><path d="M580 250Q480 200 400 210M600 330Q700 290 820 300" stroke="#7a5236" stroke-width="16" fill="none" stroke-linecap="round"/>`
      + `<g fill="#3f8a34">${[[460, 160, 60], [560, 110, 80], [680, 120, 76], [760, 170, 56], [400, 190, 44]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g><g fill="#58a845">${[[460, 150, 52], [560, 100, 72], [680, 110, 68], [760, 160, 48]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>`
      + K.bob(K.crow({ x: 760, y: 304, s: 1.7, flip: true, shadow: false }), -4, 1.6)
      + `<g><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 170;0 170" keyTimes="0;0.5;0.7;1" dur="5s" repeatCount="indefinite"/><path d="M666 216l-26 -4l6 22z" fill="#ffd54f" stroke="#e0a800" stroke-width="2"/></g>`
      + K.fox({ x: 880, y: 540, s: 1.9, flip: true })
      + `<g transform="translate(200 200)"><rect x="-90" y="-60" width="180" height="120" rx="12" fill="#fff8e1" stroke="#d7b56d" stroke-width="4"/><path d="M-60 -24h120M-60 0h100M-60 24h80" stroke="#c9a65a" stroke-width="7" stroke-linecap="round"/><circle cx="70" cy="34" r="16" fill="#ffca28"/><path d="M62 34l6 6l10 -12" stroke="#fff" stroke-width="4" fill="none"/></g>`
      + K.flower({ x: 260, y: 600, h: 40, color: '#f48fb1' }) + K.flower({ x: 860, y: 600, h: 46, color: '#ffffff', delay: 1 }) + K.grass({ x: 900, y: 604 }) + K.grass({ x: 140, y: 610 })),
    pts: { 'Havran so syrom': [66, 30], 'Líška': [76, 94], 'Syr padá': [49, 48], 'Ponaučenie': [17, 47] },
  },
  'les-ekosystem': {
    svg: svg(sky('#cfeaf8', '#eef7e4', 'ske') + K.sun({ x: 1100, y: 70, s: 0.6 })
      + `<rect y="470" width="1200" height="170" fill="#7a5a3a"/><path d="M0 470q300 -14 600 0t600 -6V480H0z" fill="#4c8a34"/><g fill="#5c4128">${[100, 330, 560, 820, 1060].map((x, i) => `<ellipse cx="${x}" cy="${560 + (i % 2) * 34}" rx="16" ry="6"/>`).join('')}</g>`
      + `<g stroke="#a07850" stroke-width="5" fill="none" stroke-linecap="round"><path d="M300 480q-10 40 -40 70M300 480q20 50 10 90M300 480q40 30 70 40"/><path d="M700 480q-20 40 -10 90M700 480q30 40 60 50"/></g>`
      + K.tree({ x: 300, y: 480, s: 1.55, shadow: false }) + K.conifer({ x: 90, y: 480, s: 1.7, shadow: false }) + K.conifer({ x: 700, y: 480, s: 1.6, shadow: false }) + K.tree({ x: 1080, y: 480, s: 1.3, season: 'leto', shadow: false })
      + K.bush({ x: 520, y: 480, s: 1.5, berries: '#c62828' }) + K.bush({ x: 860, y: 480, s: 1.1 })
      + K.flower({ x: 120, y: 500, h: 44, color: '#ffffff' }) + K.flower({ x: 160, y: 504, h: 50, color: '#8e7cc3', delay: .6 }) + K.grass({ x: 200, y: 504 }) + K.grass({ x: 60, y: 506 }) + K.flower({ x: 240, y: 502, h: 36, color: '#ffd54f', delay: 1 })
      + `<g fill="#6fae3e">${[920, 950, 980, 1010].map((x, i) => `<ellipse cx="${x}" cy="${506 - (i % 2) * 4}" rx="22" ry="12"/>`).join('')}</g><g fill="#8cc65f">${[930, 965, 1000].map(x => `<ellipse cx="${x}" cy="500" rx="14" ry="7"/>`).join('')}</g>`
      + K.mushroom({ x: 1110, y: 508, s: 0.6 }) + K.squirrel({ x: 360, y: 170, s: 0.9, shadow: false }) + K.deer({ x: 620, y: 500, s: 0.8 })
      + K.worm({ x: 820, y: 600, s: 1.2 }) + `<g transform="translate(980 590)"><ellipse rx="40" ry="10" fill="#4e3622"/><path d="M-26 -2q26 -24 52 0" fill="#9b7b5a"/></g>`
      + `<path d="M0 476H1200" stroke="#ffffff" stroke-opacity=".0"/>`),
    pts: { 'Stromová vrstva': [25, 12], 'Krovinná vrstva': [44, 57], 'Bylinná vrstva': [12, 70], 'Machová vrstva': [81, 70], 'Podzemná vrstva': [55, 92] },
  },
  bezstavovce: {
    svg: svg(sky('#e3f3fb', '#f5fbec', 'skz') + `<rect y="520" width="1200" height="120" fill="#7a5a3a"/><path d="M0 520q300 -12 600 0t600 -4V530H0z" fill="#6fae3e"/>`
      + `<g transform="translate(0 20)"><g stroke="#3e2f25" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M300 380l-40 70l-30 30M320 384l0 80l-10 40M340 380l50 64l40 20"/><path d="M430 300q30 -60 70 -70M440 300q50 -40 90 -30"/></g>`
      + `<ellipse cx="170" cy="360" rx="120" ry="78" fill="#4e342e"/><ellipse cx="150" cy="340" rx="80" ry="40" fill="#6d4c41"/><path d="M90 320q-4 70 30 100M150 296q-6 80 20 136M210 300q0 70 20 120" stroke="#3e2723" stroke-width="5" fill="none" opacity=".5"/>`
      + `<ellipse cx="320" cy="350" rx="60" ry="44" fill="#5d4037"/><ellipse cx="310" cy="336" rx="34" ry="18" fill="#795548"/>`
      + `<circle cx="430" cy="320" r="46" fill="#4e342e"/><circle cx="446" cy="310" r="16" fill="#1b1b1b"/><circle cx="452" cy="304" r="5" fill="#fff"/><path d="M466 340q16 8 10 20" stroke="#2b1d16" stroke-width="6" fill="none"/></g>`
      + `<g transform="translate(940 330)"><g stroke="#c9d6e0" stroke-width="2" fill="none">${[0, 30, 60, 90, 120, 150].map(a => `<path d="M0 0L${Math.round(190 * Math.cos(a * Math.PI / 180))} ${Math.round(190 * Math.sin(a * Math.PI / 180))}M0 0L${-Math.round(190 * Math.cos(a * Math.PI / 180))} ${-Math.round(190 * Math.sin(a * Math.PI / 180))}"/>`).join('')}${[40, 80, 120, 160].map(r => `<circle r="${r}"/>`).join('')}</g></g>`
      + K.spider({ x: 940, y: 360, s: 1.8 })
      + K.worm({ x: 620, y: 590, s: 2 }) + K.snail({ x: 760, y: 528, s: 1.3 }) + `<g transform="translate(640 180)"><g><animateTransform attributeName="transform" type="translate" values="0 0;30 -14;0 0" dur="4s" repeatCount="indefinite"/>${K.butterfly({ s: 1, color: '#7e57c2', color2: '#b39ddb' })}</g></g>`
      + K.grass({ x: 520, y: 526, s: 1.2 }) + K.flower({ x: 560, y: 526, h: 56, color: '#ffd54f' })),
    pts: { 'Hlava hmyzu': [37, 35], 'Hruď hmyzu': [27, 70], 'Bruško': [12, 37], 'Pavúk': [78, 66], 'Dážďovka': [52, 85] },
  },
  rybnik: {
    svg: svg(sky('#c6e7fa', '#eef8ff', 'skr') + K.cloud({ x: 600, y: 80, s: 0.8 }) + K.sun({ x: 1110, y: 70, s: 0.6 })
      + `<path d="M0 230q300 -20 600 0t600 -6V260H0z" fill="#8cc65f"/><defs><linearGradient id="wr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc8ea"/><stop offset="1" stop-color="#2f7fae"/></linearGradient></defs><rect y="250" width="1200" height="320" fill="url(#wr)"/>`
      + `<path d="M0 560q200 -30 400 -4t400 0t400 -6V640H0z" fill="#8b6b45"/><path d="M0 590q300 -14 600 0t600 0V640H0z" fill="#73572f"/><g fill="#a5875f">${[120, 360, 640, 900, 1100].map(x => `<ellipse cx="${x}" cy="600" rx="18" ry="7"/>`).join('')}</g>`
      + `<g stroke="#b8e4f7" stroke-width="3" fill="none" opacity=".7"><path d="M300 270q30 -6 60 0M760 280q40 -8 80 0M980 266q24 -4 48 0"/></g>`
      + K.cattail({ x: 40, y: 270, h: 170 }) + K.cattail({ x: 80, y: 274, h: 140 }) + K.cattail({ x: 120, y: 270, h: 160 }) + K.heron({ x: 220, y: 276, s: 0.95 })
      + K.waterLily({ x: 560, y: 262, s: 1.2, flower: true }) + K.waterLily({ x: 680, y: 270, s: 0.8 })
      + `<g fill="#5aa13a">${[200, 500, 860, 1080].map((x, i) => `<path d="M${x} 600q-10 -60 6 -110q-2 50 8 110zM${x + 14} 600q10 -50 30 -80q-16 40 -18 80z"/>`).join('')}</g>`
      + `<g><animateTransform attributeName="transform" type="translate" values="0 0;70 -6;0 0" dur="9s" repeatCount="indefinite"/>${K.fish({ x: 380, y: 400, s: 2, color: '#c89b3c' })}</g>`
      + `<g><animateTransform attributeName="transform" type="translate" values="0 0;-60 0;0 0" dur="7s" repeatCount="indefinite"/>${K.fish({ x: 940, y: 330, s: 1.6, flip: true, long: true, color: '#7d9a4a' })}</g>`
      + `<g fill="#ffffff" opacity=".7">${[[420, 360], [430, 330], [440, 300]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${4 + i}"><animate attributeName="cy" values="${y};${y - 40}" dur="2s" begin="${i * .5}s" repeatCount="indefinite"/></circle>`).join('')}</g>`
      + K.snail({ x: 760, y: 588, s: 0.8 })),
    pts: { 'Pálka a trstina': [7, 12], 'Volavka': [20, 20], 'Lekno': [47, 30], 'Kapor': [33, 74], 'Šťuka': [78, 64], 'Dno': [60, 94] },
  },
  'vybrane-slova-b': {
    svg: svg(sky('#c9e8fa', '#f2faea', 'skv') + K.cloud({ x: 600, y: 90, s: 0.7 }) + K.hills(420, '#b5dc8a', '#9ccf6e')
      + `<g transform="translate(180 400)"><rect x="-110" y="-150" width="220" height="150" fill="#f3e3c3"/><path d="M-130 -146l130 -96l130 96z" fill="#c0503a"/><rect x="-24" y="-80" width="48" height="80" fill="#8a5a3a"/><rect x="-86" y="-120" width="40" height="36" fill="#bfe3f7" stroke="#fff" stroke-width="5"/><rect x="46" y="-120" width="40" height="36" fill="#bfe3f7" stroke="#fff" stroke-width="5"/><rect x="60" y="-220" width="22" height="50" fill="#8d3f2c"/></g>`
      + K.fence({ x: 340, y: 430, w: 300 }) + K.horse({ x: 520, y: 470, s: 1.2, color: '#9a6a3e' }) + K.cow({ x: 830, y: 480, s: 1.25, bull: true, color: '#6d4c33', spots: false })
      + K.flower({ x: 290, y: 560, h: 50, color: '#f8bbd0' }) + K.flower({ x: 330, y: 566, h: 40, color: '#ffffff', delay: .5 }) + K.flower({ x: 370, y: 560, h: 60, color: '#b39ddb', delay: 1 }) + K.grass({ x: 250, y: 566 }) + K.grass({ x: 400, y: 566 })
      + `<path d="M1200 300q-80 40 -100 120t-40 220h140z" fill="#5aa9d8"/><path d="M1180 330q-60 60 -70 150M1160 420q-30 80 -40 200" stroke="#d6f0ff" stroke-width="5" fill="none" stroke-dasharray="20 24"><animate attributeName="stroke-dashoffset" values="88;0" dur="1.2s" repeatCount="indefinite"/></path><g fill="#9e9e9e">${[[1080, 470, 22], [1050, 560, 26], [1110, 600, 18]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.6}"/>`).join('')}</g>`),
    pts: { 'byt, bývať': [15, 40], 'kobyla': [43, 58], 'býk': [70, 60], 'bylina': [27, 92], 'bystrina': [91, 52] },
  },
  'casti-rastliny': {
    svg: svg(sky('#d9f0fb', '#f6fbee', 'skc') + `<rect y="380" width="1200" height="260" fill="#8b6b45"/><path d="M0 380q300 -14 600 0t600 -4V392H0z" fill="#6fae3e"/><g fill="#a5875f" opacity=".7">${[[120, 470], [300, 560], [880, 480], [1060, 580], [760, 600]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="14" ry="6"/>`).join('')}</g>`
      + `<g stroke="#f3e3c3" stroke-width="7" fill="none" stroke-linecap="round"><path d="M600 386q-4 60 -40 110q-20 30 -60 40M600 386q6 70 0 150M600 386q20 50 60 90q24 20 60 26M560 496q-30 10 -40 40M660 476q30 -6 50 10M600 470q-14 30 -10 60"/></g>`
      + `<path d="M600 386q-8 -120 0 -290" stroke="#4f9a3d" stroke-width="14" fill="none"/>`
      + `<path d="M596 300q-90 -40 -130 0q50 40 130 0z" fill="#5fae3f"/><path d="M596 300q-60 -10 -126 0" stroke="#3f8a34" stroke-width="3" fill="none"/><path d="M604 230q80 -50 130 -10q-50 40 -130 10z" fill="#6dbb48"/><path d="M604 230q60 -12 126 -10" stroke="#3f8a34" stroke-width="3" fill="none"/>`
      + `<path d="M604 330q50 6 70 34" stroke="#4f9a3d" stroke-width="6" fill="none"/><circle cx="790" cy="370" r="0"/>`
      + `<g transform="translate(600 94)">${swing(`<g fill="#ec407a">${Array.from({ length: 8 }, (_, i) => `<ellipse cx="0" cy="-30" rx="16" ry="28" transform="rotate(${i * 45})"/>`).join('')}</g><circle r="22" fill="#ffd54f"/><circle r="12" fill="#f9a825"/>`, 0, 0, 3, 4)}</g>`
      + `<g transform="translate(790 370)"><circle r="40" fill="#e53935"/><path d="M-16 -22q-10 14 -6 30" stroke="#fff" stroke-width="5" opacity=".45" fill="none" stroke-linecap="round"/><path d="M-120 -40q60 -30 116 0" stroke="#4f9a3d" stroke-width="6" fill="none"/><g fill="#f5e6c8" stroke="#8d6e3a" stroke-width="2"><ellipse cx="-8" cy="6" rx="6" ry="9"/><ellipse cx="10" cy="4" rx="6" ry="9"/><ellipse cx="2" cy="20" rx="6" ry="9"/></g><path d="M-36 -10a40 40 0 0 1 0 22" stroke="#b71c1c" stroke-width="3" fill="none"/></g>`
      + `<g transform="translate(250 470)"><ellipse rx="40" ry="26" fill="#c9a26a"/><ellipse cx="-8" cy="-6" rx="20" ry="10" fill="#e3c08c"/><path d="M10 20q10 40 -10 70" stroke="#f3e3c3" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M-6 -20q-6 -50 10 -90" stroke="#6dbb48" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M4 -108q-30 -20 -40 -4q20 14 40 4zM4 -108q30 -26 44 -8q-20 14 -44 8z" fill="#8dcf5a"/></g>`
      + K.bee({ x: 700, y: 110, s: 1 })),
    pts: { 'Koreň': [50, 88], 'Stonka': [46, 54], 'List': [39, 41], 'Kvet': [57, 6], 'Plod so semenami': [66, 68], 'Klíčiace semeno': [21, 86] },
  },
  klicenie: {
    svg: svg(sky('#d6eefb', '#fbf6e4', 'skk') + K.sun({ x: 1090, y: 80, s: 0.7 }) + `<rect y="420" width="1200" height="220" fill="#8b6b45"/><path d="M0 420q300 -12 600 0t600 -4V430H0z" fill="#6fae3e"/>`
      + `<g stroke="#ffffff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".9"><path d="M290 360h60l-14 -12M290 360l46 12M590 360h60l-14 -12M650 360l-14 12M880 360h60l-14 -12M940 360l-14 12"/></g>`
      + `<g transform="translate(160 500)"><ellipse rx="44" ry="28" fill="#c9a26a"/><ellipse cx="-10" cy="-8" rx="20" ry="10" fill="#e3c08c"/><path d="M-6 26q0 4 2 0" stroke="#8d6e3a" stroke-width="3"/></g>`
      + `<g transform="translate(450 480)"><ellipse rx="40" ry="26" fill="#c9a26a"/><path d="M8 22q16 40 4 80q-6 20 0 34" stroke="#f3e3c3" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M12 70q20 6 30 20M4 100q-20 4 -26 18" stroke="#f3e3c3" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-4 -22q-4 -16 6 -30" stroke="#8dcf5a" stroke-width="6" fill="none" stroke-linecap="round"/></g>`
      + `<g transform="translate(740 420)"><g stroke="#f3e3c3" stroke-width="6" fill="none" stroke-linecap="round"><path d="M0 0q-4 60 -24 100M0 0q10 60 30 100M0 0v120M-12 60q-20 10 -30 26M14 60q20 8 26 24"/></g>${swing('<path d="M0 0q-6 -90 0 -150" stroke="#5fae3f" stroke-width="9" fill="none"/><path d="M0 -150q-60 -40 -84 -4q40 26 84 4zM0 -150q60 -46 86 -8q-40 28 -86 8z" fill="#7cc35a"/><path d="M0 -80q-40 -24 -54 0q26 16 54 0z" fill="#8dcf5a"/>', 0, 0, 3, 4)}</g>`
      + `<g transform="translate(1000 420)"><g stroke="#f3e3c3" stroke-width="7" fill="none" stroke-linecap="round"><path d="M0 0q-10 70 -50 130M0 0q16 70 50 130M0 0v160M-20 70q-30 10 -46 36M20 70q30 6 46 30"/></g>${swing('<path d="M0 0q-8 -150 0 -280" stroke="#4f9a3d" stroke-width="12" fill="none"/><path d="M0 -100q-70 -40 -100 0q50 30 100 0zM0 -160q70 -46 104 -6q-50 34 -104 6zM0 -220q-60 -30 -84 0q40 24 84 0z" fill="#6dbb48"/><g transform="translate(0 -294)"><g fill="#ffd54f">' + Array.from({ length: 10 }, (_, i) => `<ellipse cx="0" cy="-24" rx="10" ry="20" transform="rotate(${i * 36})"/>`).join('') + '</g><circle r="16" fill="#8d5a2b"/></g>', 0, 0, 2.5, 4)}</g>`
      + `<g fill="#6fbfe8">${[[420, 640], [740, 640], [1000, 640]].map(([x, y], i) => `<path d="M${x - 30} ${y - 60}q6 -10 10 0q0 8 -5 8q-5 0 -5 -8z"><animate attributeName="opacity" values="0;1;0" dur="2.4s" begin="${i * .6}s" repeatCount="indefinite"/></path>`).join('')}</g>`),
    pts: { 'Semeno': [13, 86], 'Korienok': [41, 97], 'Stonka a prvé lístky': [62, 30], 'Dospelá rastlina': [83, 10], 'Svetlo': [91, 26] },
  },
  fotosynteza: {
    svg: svg(sky('#bfe6ff', '#f1fae8', 'skf') + K.sun({ x: 200, y: 110, s: 1.1 })
      + `<g stroke="#ffd54f" stroke-width="10" stroke-linecap="round" stroke-dasharray="20 22" fill="none"><path d="M280 170L560 290M250 210L520 360"><animate attributeName="stroke-dashoffset" values="84;0" dur="1.4s" repeatCount="indefinite"/></path></g>`
      + `<rect y="460" width="1200" height="180" fill="#8b6b45"/><path d="M0 460q300 -12 600 0t600 -4V470H0z" fill="#6fae3e"/>`
      + `<g stroke="#f3e3c3" stroke-width="7" fill="none" stroke-linecap="round"><path d="M660 466q-20 70 -70 110M660 466v140M660 466q30 60 80 100"/></g>`
      + `<g fill="#4fc3f7">${[[600, 600], [700, 590], [650, 560]].map(([x, y], i) => `<path d="M${x} ${y}q10 -16 0 -26q-10 10 0 26z"><animateTransform attributeName="transform" type="translate" values="0 0;0 -30;0 -30" dur="2s" begin="${i * .5}s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" dur="2s" begin="${i * .5}s" repeatCount="indefinite"/></path>`).join('')}</g>`
      + `<path d="M660 466q-10 -140 0 -260" stroke="#4f9a3d" stroke-width="14" fill="none"/><path d="M656 300q-110 -60 -170 -6q70 54 170 6z" fill="#5fae3f"/><path d="M656 300q-80 -14 -164 -6" stroke="#3f8a34" stroke-width="3" fill="none"/><path d="M664 230q110 -70 180 -16q-70 60 -180 16z" fill="#6dbb48"/><path d="M664 230q90 -18 174 -14" stroke="#3f8a34" stroke-width="3" fill="none"/><path d="M660 380q80 -40 130 -6q-60 40 -130 6z" fill="#58a845"/>`
      + `<g transform="translate(744 316)"><rect x="-38" y="-24" width="76" height="48" rx="10" fill="#fff8e1" stroke="#e0a800" stroke-width="3"/><g fill="#ffca28"><circle cx="-14" r="9"/><circle cx="2" cy="-4" r="9"/><circle cx="18" cy="2" r="9"/></g></g>`
      + `<g font-family="sans-serif">${[[1020, 230, '#90a4ae', 0], [1060, 280, '#90a4ae', .7], [990, 300, '#90a4ae', 1.4]].map(([x, y, c, d]) => `<g><animateTransform attributeName="transform" type="translate" values="0 0;-200 0" dur="3s" begin="${d}s" repeatCount="indefinite"/><circle cx="${x}" cy="${y}" r="14" fill="#555"/><circle cx="${x - 22}" cy="${y}" r="10" fill="#ef5350"/><circle cx="${x + 22}" cy="${y}" r="10" fill="#ef5350"/><animate attributeName="opacity" values="0;1;1;0" dur="3s" begin="${d}s" repeatCount="indefinite"/></g>`).join('')}</g>`
      + `${[[520, 260, 0], [480, 220, 1], [540, 200, 2]].map(([x, y, d]) => `<g><animateTransform attributeName="transform" type="translate" values="0 0;-130 -50" dur="3s" begin="${d}s" repeatCount="indefinite"/><circle cx="${x}" cy="${y}" r="10" fill="#ef5350"/><circle cx="${x + 18}" cy="${y}" r="10" fill="#ef5350"/><animate attributeName="opacity" values="0;1;1;0" dur="3s" begin="${d}s" repeatCount="indefinite"/></g>`).join('')}`
      + K.grass({ x: 300, y: 466, s: 1.2 }) + K.flower({ x: 960, y: 466, h: 50, color: '#ffffff' }) + K.grass({ x: 1000, y: 470 })),
    pts: { 'Svetlo': [18, 34], 'Oxid uhličitý': [87, 52], 'Voda': [55, 95], 'Kyslík': [32, 24], 'Glukóza': [62, 57] },
  },
  'ms-pocitame': {
    svg: svg(sky('#9fd8f7', '#e8f7ff', 'skn') + K.hills(470, '#a5d67a', '#8cc65f')
      + K.sun({ x: 130, y: 100, s: 1 }) + K.cloud({ x: 440, y: 100, s: 1 }) + K.cloud({ x: 660, y: 70, s: 0.8 })
      + [[880, 110, 0], [960, 70, 0.4], [1040, 120, 0.8]].map(([x, y, d]) => K.bob(K.flyingBird({ x, y, s: 1 }), -10, 1.6, d)).join('')
      + [110, 250, 390, 530].map((x, i) => K.tree({ x, y: 460, s: 0.62, fruit: i % 2 ? '#e53935' : false })).join('')
      + [['#ec407a', 680], ['#ff9800', 790], ['#ab47bc', 900], ['#fdd835', 1010], ['#ef5350', 1120]].map(([c, x], i) => K.flower({ x, y: 590, h: 80, color: c, delay: i * 0.4 })).join('')
      + K.grass({ x: 620, y: 596 }) + K.grass({ x: 200, y: 600 })),
    pts: { 'Jedno slnko': [11, 33], 'Dva oblaky': [46, 27], 'Tri vtáky': [80, 29], 'Štyri stromy': [27, 78], 'Päť kvetov': [75, 95] },
  },
  'ms-rodina': {
    svg: svg(sky('#bfe6ff', '#fff6e6', 'skrd') + K.sun({ x: 100, y: 90, s: 0.8 }) + K.cloud({ x: 560, y: 90, s: 0.7 }) + `<path d="M0 520q300 -20 600 0t600 -6V640H0z" fill="#9ccf6e"/><path d="M0 560q400 -14 1200 0V640H0z" fill="#8cc65f"/>`
      + house(1010, 524, 1.15) + K.tree({ x: 790, y: 524, s: 0.8, fruit: '#e53935' })
      + fam.babka({ x: 90, y: 560 }) + fam.dedko({ x: 180, y: 560, arm: 'wave' }) + fam.mama({ x: 380, y: 560 }) + fam.otec({ x: 490, y: 560, arm: 'wave' })
      + K.bob(fam.brat({ x: 640, y: 572 }), -8, 0.9) + K.bob(fam.sestra({ x: 720, y: 574, arm: 'wave' }), -8, 0.9, 0.45) + K.dog({ x: 840, y: 590, s: 1, flip: true })
      + K.flower({ x: 300, y: 600, h: 40, color: '#f48fb1' }) + K.flower({ x: 960, y: 610, h: 36, color: '#ffffff', delay: .6 })),
    pts: { 'Babka a dedko': [11, 44], 'Mama': [32, 43], 'Otec': [41, 39], 'Brat a sestra': [57, 57], 'Domáci miláčik': [71, 97] },
  },
  'ms-mladata': {
    svg: svg(sky('#bfe6ff', '#eef8ff', 'skml') + K.cloud({ x: 600, y: 80, s: 0.8 }) + `<path d="M0 360q300 -24 600 0t600 -6V640H0z" fill="#b5dc8a"/><path d="M0 420q400 -14 1200 0V640H0z" fill="#a5d67a"/>`
      + K.barn({ x: 620, y: 372, s: 0.85 }) + K.fence({ x: 760, y: 372, w: 420 }) + K.fence({ x: 0, y: 372, w: 480 })
      + K.cow({ x: 150, y: 400, s: 1 }) + K.bob(K.cow({ x: 300, y: 420, s: 0.95, young: true }), -5, 1.4)
      + K.hen({ x: 720, y: 420, s: 1.1 }) + K.bob(K.chick({ x: 800, y: 426, s: 1 }), -6, 0.8) + K.bob(K.chick({ x: 850, y: 420, s: 0.9 }), -6, 0.8, 0.3) + K.bob(K.chick({ x: 650, y: 428, s: 0.9, flip: true }), -6, 0.8, 0.5)
      + K.sheep({ x: 980, y: 420, s: 1 }) + K.bob(K.sheep({ x: 1110, y: 430, s: 0.9, young: true }), -6, 1.2)
      + `<ellipse cx="500" cy="600" rx="230" ry="28" fill="#a1785a"/><ellipse cx="460" cy="596" rx="80" ry="12" fill="#8d6748"/>`
      + K.pig({ x: 420, y: 590, s: 1.2 }) + K.bob(K.pig({ x: 570, y: 598, s: 1, young: true }), -5, 1) + K.flower({ x: 860, y: 600, h: 40, color: '#ffd54f' }) + K.grass({ x: 900, y: 604 }) + K.grass({ x: 120, y: 600 })),
    pts: { 'Krava a teľa': [19, 40], 'Sliepka a kuriatka': [63, 77], 'Ovca a jahňa': [87, 77], 'Sviňa a prasiatko': [42, 95] },
  },
  'ms-ovocie-zelenina': {
    svg: svg(sky('#bfe6ff', '#f4fbe9', 'skoz') + K.sun({ x: 1110, y: 70, s: 0.6 }) + `<path d="M0 380q300 -20 600 0t600 -6V640H0z" fill="#9ccf6e"/><path d="M380 430h820v210H380z" fill="#8b6b45"/><g stroke="#73572f" stroke-width="6">${[470, 530, 590].map(y => `<path d="M380 ${y}h820"/>`).join('')}</g>`
      + K.tree({ x: 180, y: 520, s: 1.3, fruit: '#e53935' }) + `<g><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 120;0 120" keyTimes="0;0.6;0.75;1" dur="6s" repeatCount="indefinite"/>${K.apple({ x: 260, y: 380, s: 0.8 })}</g>` + `<g transform="translate(110 570)"><path d="M-50 0h100l-12 50h-76z" fill="#a1785a"/><path d="M-50 0h100" stroke="#7a5236" stroke-width="6"/>${[[-26, -10], [0, -14], [24, -8], [-12, -24], [12, -26]].map(([a, b]) => K.apple({ x: a, y: b + 18, s: 0.5 })).join('')}</g>`
      + `<g>${[440, 520, 600].map((x, i) => `<g transform="translate(${x} 400)"><path d="M0 0q-30 -30 -40 -10q20 14 40 10zM0 0q30 -30 40 -10q-20 14 -40 10zM0 0q-4 -40 10 -44q10 20 -10 44z" fill="#43a047"/>${strawberry(-18, 4, 0.9)}${strawberry(18, 8, 0.8)}</g>`).join('')}</g>`
      + [700, 760, 820, 880].map((x, i) => `<g transform="translate(${x} ${530 - (i % 2) * 6})">${K.carrot({ s: 1, y: 0 })}</g>`).join('').replace(/<g transform="translate\(0 0\) scale\(1 1\)">/g, '<g>')
      + K.cabbage({ x: 1020, y: 480, s: 1.3 }) + K.cabbage({ x: 1130, y: 490, s: 1.1 }) + K.cabbage({ x: 1070, y: 560, s: 1.2 })
      + K.butterfly({ x: 560, y: 200, s: 0.8, color: '#ffffff', color2: '#e0e0e0' })),
    pts: { 'Jablko': [15, 14], 'Jahody': [46, 52], 'Mrkva': [66, 97], 'Kapusta': [90, 57] },
  },
  rodina: {
    svg: svg(sky('#bfe6ff', '#fff6e6', 'skro') + K.cloud({ x: 200, y: 80, s: 0.7 }) + K.cloud({ x: 1000, y: 100, s: 0.6 }) + `<path d="M0 540q300 -20 600 0t600 -6V640H0z" fill="#9ccf6e"/>`
      + house(600, 548, 1.2) + heart(600, 170, 1.4)
      + fam.mama({ x: 200, y: 580 }) + fam.otec({ x: 300, y: 580, arm: 'wave' })
      + K.bob(fam.brat({ x: 880, y: 590, arm: 'wave' }), -8, 0.9) + K.bob(fam.sestra({ x: 960, y: 590 }), -8, 0.9, 0.45)
      + fam.babka({ x: 1060, y: 580 }) + fam.dedko({ x: 1140, y: 580 }) + K.cat({ x: 790, y: 600, s: 0.9 })
      + K.flower({ x: 80, y: 610, h: 40, color: '#f48fb1' }) + K.flower({ x: 420, y: 610, h: 44, color: '#ffd54f', delay: .6 })),
    pts: { 'Domov': [50, 72], 'Citová funkcia': [50, 43], 'Rodičia': [21, 46], 'Deti': [77, 63], 'Starí rodičia': [86, 56] },
  },
  'my-family': {
    svg: svg(sky('#d7efff', '#fff8ec', 'skmf') + `<rect y="430" width="1200" height="210" fill="#e9d5b5"/><path d="M0 430h1200" stroke="#cdb28a" stroke-width="6"/><rect x="420" y="80" width="360" height="200" rx="14" fill="#fff" stroke="#c8a77a" stroke-width="10"/><path d="M440 260l90 -90l60 60l50 -40l120 70z" fill="#9ccf6e"/><circle cx="700" cy="130" r="22" fill="#ffd54f"/>`
      + `<g transform="translate(80 440)"><rect x="0" y="-40" width="60" height="40" fill="#a1785a"/><path d="M30 -40v-120" stroke="#6d4c41" stroke-width="6"/><path d="M-10 -160h80l-14 -50h-52z" fill="#ffe082"/></g><g transform="translate(1040 440)">${K.bush({ s: 0.9, color: '#5fae3f' }).replace('<g transform="translate(0 0) scale(1 1)">', '<g>')}<path d="M-50 0h100l-10 -30h-80z" fill="#c0503a"/></g>`
      + fam.dedko({ x: 300, y: 470, glasses: true }) + fam.mama({ x: 500, y: 450 }) + fam.otec({ x: 690, y: 450, arm: 'wave' }) + fam.babka({ x: 900, y: 470 })
      + K.bob(fam.sestra({ x: 440, y: 610, arm: 'wave' }), -8, 0.9) + K.bob(fam.brat({ x: 760, y: 610 }), -8, 0.9, 0.45) + K.dog({ x: 600, y: 620, s: 0.8 })),
    pts: { 'grandpa': [25, 40], 'mum': [42, 35], 'dad': [58, 31], 'grandma': [75, 40], 'sister': [32, 92], 'brother': [70, 92] },
  },
  'ms-pocasie': {
    svg: pocasie('pm'),
    pts: { 'Slnečno': [12, 44], 'Oblačno': [40, 30], 'Fúka vietor': [37, 82], 'Prší': [62, 40], 'Sneží': [87, 40] },
  },
  weather: {
    svg: pocasie('pw'),
    pts: { 'sunny': [12, 44], 'cloudy': [40, 30], 'windy': [37, 82], 'rainy': [62, 40], 'snowy': [87, 40] },
  },
  pravek: {
    svg: svg(sky('#f7d9a8', '#fbefd8', 'skpr') + K.sun({ x: 700, y: 90, s: 0.7 }) + `<path d="M0 470q300 -30 600 0t600 -10V640H0z" fill="#b99b62"/><path d="M0 540q400 -20 1200 0V640H0z" fill="#a8895a"/>`
      + `<path d="M-20 480Q40 200 200 180Q360 170 420 480z" fill="#8d7a66"/><path d="M60 480q20 -150 120 -160q100 4 130 160z" fill="#3e3128"/><path d="M200 180q120 10 170 140" stroke="#a89582" stroke-width="10" fill="none" opacity=".6"/>`
      + `<g transform="translate(180 470)"><path d="M-40 0l80 -10M-40 -10l80 10" stroke="#6d4c33" stroke-width="10" stroke-linecap="round"/>${swing('<path d="M-26 -6q-6 -40 16 -66q-2 26 12 34q4 -20 18 -30q6 30 4 62z" fill="#ff7043"/><path d="M-12 -6q0 -26 12 -40q4 20 14 26q2 10 -2 14z" fill="#ffca28"/>', 0, 0, 5, 0.5)}</g>`
      + `<g transform="translate(580 470)"><ellipse cy="4" rx="130" ry="12" fill="#000" opacity=".12"/><path d="M-120 0L0 -170L120 0z" fill="#a07850"/><path d="M-120 0L0 -170L-20 0z" fill="#8a6440"/><path d="M0 -170l-14 -30M0 -170l16 -28M0 -170l-2 -34" stroke="#6d4c33" stroke-width="6" stroke-linecap="round"/><path d="M-30 0q0 -70 30 -76q30 6 30 76z" fill="#3e3128"/><g stroke="#6d4c33" stroke-width="3" opacity=".6"><path d="M-90 -40l60 -80M90 -40l-60 -80M-60 -10l40 -60M60 -10l-40 -60"/></g></g>`
      + caveman({ x: 330, y: 520, h: 170, arm: 'hold' }) + caveman({ x: 450, y: 530, h: 150, hair: '#6d4c41', style: 'bun', skirt: true, bottom: '#8d6e4a', arm: 'wave' })
      + `<g>${[820, 850, 880, 910, 940, 970].map((x, i) => `<g transform="translate(${x} ${470 + (i % 2) * 6})">${swing(`<path d="M0 0q-2 -60 2 -110" stroke="#c9a640" stroke-width="4" fill="none"/>${[0, 1, 2, 3].map(j => `<ellipse cx="${j % 2 ? 6 : -6}" cy="${-100 + j * 8}" rx="5" ry="9" fill="#e0b84a"/>`).join('')}<path d="M0 -40q14 -10 18 -26M0 -60q-14 -8 -16 -24" stroke="#c9a640" stroke-width="3" fill="none"/>`, 0, 0, 3, 3, i * .3)}</g>`).join('')}</g>`
      + K.sheep({ x: 1080, y: 520, s: 0.9 }) + K.bob(K.sheep({ x: 1150, y: 540, s: 0.7, young: true }), -5, 1.2) + `<path d="M1010 530h190" stroke="#6d4c33" stroke-width="5"/><path d="M1020 530v-60M1080 530v-50M1140 530v-56M1190 530v-50" stroke="#6d4c33" stroke-width="7" stroke-linecap="round"/><path d="M1010 490h190" stroke="#6d4c33" stroke-width="5"/>`
      + `<g transform="translate(560 590)"><path d="M-40 -50h80l-10 50h-60z" fill="#b5653a"/><path d="M-36 -36h72M-32 -20h64" stroke="#8d4a28" stroke-width="3" stroke-dasharray="6 6"/></g><g transform="translate(470 600)"><path d="M0 0l40 -50" stroke="#7a5236" stroke-width="7" stroke-linecap="round"/><path d="M30 -64l26 4l-8 22l-22 -6z" fill="#8e8e8e"/></g><g transform="translate(660 604)"><path d="M-24 0q4 -22 24 -24q20 2 24 24z" fill="#9e9e9e"/><path d="M-14 -10l28 -6" stroke="#757575" stroke-width="3"/></g>`),
    pts: { 'Oheň': [15, 86], 'Jaskyňa': [16, 30], 'Obydlie': [48, 34], 'Obilie': [74, 58], 'Chov zvierat': [89, 70], 'Nástroje a nádoby': [47, 97] },
  },
  sikanovanie: {
    svg: svg(`<rect width="1200" height="640" fill="#fdf4e3"/><rect y="0" width="1200" height="40" fill="#f3e3c3"/><rect y="520" width="1200" height="120" fill="#d7c2a3"/><path d="M0 520h1200" stroke="#b89b74" stroke-width="6"/>`
      + `<g transform="translate(400 90)"><rect width="420" height="200" rx="8" fill="#2e6b4a" stroke="#8d6e63" stroke-width="14"/><path d="M40 60h140M40 100h220M40 140h100" stroke="#e8f5e9" stroke-width="6" stroke-linecap="round" opacity=".7"/></g>`
      + `<g transform="translate(40 520)"><rect x="0" y="-330" width="150" height="330" fill="#a1785a"/><rect x="12" y="-318" width="126" height="318" fill="#8d6748"/><circle cx="120" cy="-160" r="8" fill="#ffd54f"/></g>`
      + P({ x: 150, y: 560, h: 270, hair: '#6b3e26', style: 'bun', top: '#5c6bc0', bottom: '#37474f', skirt: true, glasses: true, arm: 'wave' })
      + P({ x: 380, y: 570, h: 230, hair: '#3e2723', top: '#e57373', bottom: '#455a64', mood: 'angry', arm: 'hold' })
      + P({ x: 590, y: 570, h: 210, hair: '#f9a825', style: 'long', top: '#90a4ae', bottom: '#607d8b', mood: 'sad' })
      + P({ x: 820, y: 570, h: 225, hair: '#5d4037', top: '#81c784', bottom: '#455a64', arm: 'wave' })
      + `<g opacity=".75">${P({ x: 1000, y: 570, h: 215, hair: '#212121', style: 'long', top: '#bdbdbd', bottom: '#757575', skirt: true })}${P({ x: 1110, y: 570, h: 210, hair: '#8d6e63', top: '#bdbdbd', bottom: '#757575' })}</g>`
),
    pts: { 'Agresor': [32, 46], 'Obeť': [49, 50], 'Svedok, ktorý pomôže': [69, 47], 'Svedkovia, ktorí mlčia': [88, 48], 'Učiteľ': [12, 30] },
  },
  rozcvicka: {
    svg: svg(sky('#d6eefb', '#eef8e8', 'skrz') + `<rect y="470" width="1200" height="170" fill="#8bcb62"/><path d="M0 470h1200" stroke="#fff" stroke-width="6"/><path d="M0 560h1200" stroke="#fff" stroke-width="4" opacity=".6"/>`
      + K.tree({ x: 1120, y: 470, s: 0.9 }) + K.cloud({ x: 860, y: 90, s: 0.7 })
      + `<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -18;0 0" dur=".6s" repeatCount="indefinite"/>${P({ x: 250, y: 540, h: 270, top: '#42a5f5', bottom: '#1565c0', hair: '#5d4037', arm: 'wave' })}</g>`
      + `<g>${P({ x: 600, y: 540, h: 270, top: '#ef5350', bottom: '#b71c1c', hair: '#3e2723', style: 'long', arm: 'wave' })}</g>` + `<g transform="translate(600 310)"><circle r="50" fill="none" stroke="#ffffff" stroke-width="5" stroke-dasharray="12 12"><animateTransform attributeName="transform" type="rotate" values="0;360" dur="2s" repeatCount="indefinite"/></circle></g>`
      + `<g transform="rotate(-18 950 540)">${P({ x: 950, y: 540, h: 270, top: '#ab47bc', bottom: '#6a1b9a', hair: '#f9a825', style: 'bun', arm: 'wave' })}</g>`
      + heart(600, 90, 1.1) + `<path d="M520 160h40l14 -26l18 50l16 -40l12 16h40" stroke="#ef5350" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
      + `<g transform="translate(1040 560)"><circle r="34" fill="#4caf50"/><path d="M-14 0l10 12l20 -22" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`),
    pts: { 'Zahriatie': [21, 36], 'Rozhýbanie kĺbov': [50, 36], 'Strečing': [79, 36], 'Tep': [50, 6], 'Bez bolesti': [87, 97] },
  },
  'ms-ulica': {
    svg: svg(sky('#cfe9f7', '#eef7fc', 'skul') + building(40, 300, 220, 240, '#ffcc80') + building(300, 300, 160, 200, '#b0bec5') + building(860, 300, 200, 260, '#a5d6a7') + building(1080, 300, 140, 180, '#f8bbd0')
      + `<rect y="300" width="1200" height="90" fill="#cfd8dc"/><path d="M0 300h1200" stroke="#b0bec5" stroke-width="6"/><rect y="390" width="1200" height="170" fill="#546e7a"/><path d="M0 475h1200" stroke="#fff" stroke-width="6" stroke-dasharray="50 40"/><rect y="560" width="1200" height="80" fill="#cfd8dc"/>`
      + `<g fill="#ffffff">${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${560 + i * 30}" y="398" width="18" height="154"/>`).join('')}</g>`
      + `<g transform="translate(470 300)"><rect x="-5" y="-200" width="10" height="200" fill="#78909c"/><rect x="-40" y="-260" width="80" height="80" rx="6" fill="#1e88e5" stroke="#fff" stroke-width="4"/><path d="M-30 -190l30 -60l30 60z" fill="#fff"/><path d="M-4 -236h8v14l8 16h-6l-6 -10l-6 10h-6l8 -16z" fill="#263238"/></g>`
      + semafor(860, 310, 0.9) + `<g><animateTransform attributeName="transform" type="translate" values="0 0;-1400 0;-1400 0" keyTimes="0;.45;1" dur="6s" repeatCount="indefinite"/>${car(1350, 460, '#e53935', true)}</g>`
      + P({ x: 940, y: 384, h: 190, top: '#1e88e5', bottom: '#37474f', hair: '#6b3e26', style: 'long', skirt: true, arm: 'hold' }) + P({ x: 990, y: 386, h: 110, top: '#ffca28', bottom: '#1565c0', hair: '#f9a825' })
      + P({ x: 150, y: 384, h: 120, top: '#ec407a', bottom: '#7e57c2', hair: '#5d4037', style: 'long', skirt: true }) + K.dog({ x: 230, y: 388, s: 0.6 })),
    pts: { 'Chodník': [15, 93], 'Značka priechodu': [28, 12], 'Priechod pre chodcov': [53, 74], 'Semafor pre chodcov': [83, 8], 'S dospelým za ruku': [82, 33] },
  },
  'bezpecne-na-ceste': {
    svg: svg(sky('#cfe9f7', '#eef7fc', 'skbc') + building(60, 260, 200, 200, '#ffcc80') + building(900, 260, 220, 220, '#b0bec5')
      + `<rect y="260" width="1200" height="80" fill="#cfd8dc"/><rect y="340" width="1200" height="200" fill="#546e7a"/><path d="M0 440h1200" stroke="#fff" stroke-width="6" stroke-dasharray="50 40"/><rect y="540" width="1200" height="100" fill="#cfd8dc"/><path d="M0 540h1200" stroke="#b0bec5" stroke-width="6"/>`
      + `<g fill="#ffffff">${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${520 + i * 30}" y="348" width="18" height="184"/>`).join('')}</g>`
      + semafor(780, 560, 0.9, false) + car(240, 470, '#1e88e5', false, 1.1)
      + P({ x: 600, y: 610, h: 150, top: '#ffeb3b', bottom: '#1565c0', hair: '#5d4037' }) + `<path d="M583 515h34M583 535h34" stroke="#eceff1" stroke-width="5"><animate attributeName="stroke" values="#eceff1;#ffffff;#b0bec5;#eceff1" dur="1.5s" repeatCount="indefinite"/></path>`),
    pts: { 'Chodník': [30, 92], 'Priechod pre chodcov': [50, 58], 'Semafor': [66, 14], 'Auto': [20, 60], 'Reflexná vesta': [56, 76] },
  },
  egypt: {
    svg: svg(sky('#ffd99a', '#fff3da', 'skeg') + K.sun({ x: 1090, y: 90, s: 0.9 })
      + `<path d="M0 300q200 -40 400 0t400 -10t400 4V640H0z" fill="#ecc47a"/><path d="M0 330q300 -30 600 0t600 0V640H0z" fill="#e3b768"/>`
      + pyramid(240, 330, 380, 240) + pyramid(470, 330, 260, 170) + pyramid(90, 330, 160, 100)
      + `<path d="M700 300q80 -40 160 0q60 -30 120 10" stroke="#d9a85a" stroke-width="6" fill="none" opacity=".5"/>`
      + `<path d="M0 410q300 -30 600 0t600 -10V560q-300 30 -600 0t-600 10z" fill="#6aa84f"/><path d="M0 450q300 -24 600 0t600 -10V510q-300 24 -600 0t-600 10z" fill="#3b9ad8"/><path d="M0 470q300 -20 600 0t600 -6" stroke="#9fd6f5" stroke-width="5" fill="none" stroke-dasharray="40 30"><animate attributeName="stroke-dashoffset" values="70;0" dur="2s" repeatCount="indefinite"/></path>`
      + `<path d="M0 410q150 -20 360 -6V440q-200 -20 -360 8z" fill="#3b9ad8"><animate attributeName="opacity" values="0;.8;.8;0" dur="6s" repeatCount="indefinite"/></path>`
      + `<g>${[880, 920, 960, 1000, 1040, 1080, 1120].map((x, i) => `<g transform="translate(${x} ${560 + (i % 2) * 6})">${swing(`<path d="M0 0q-2 -40 2 -70" stroke="#b58f2a" stroke-width="3" fill="none"/>${[0, 1, 2].map(j => `<ellipse cx="${j % 2 ? 4 : -4}" cy="${-64 + j * 7}" rx="4" ry="7" fill="#e0b84a"/>`).join('')}`, 0, 0, 3, 3, i * .2)}</g>`).join('')}</g>`
      + palm(780, 420, 0.9) + palm(1150, 410, 0.8) + palm(560, 560, 0.7)
      + `<g><animateTransform attributeName="transform" type="translate" values="0 0;60 0;0 0" dur="10s" repeatCount="indefinite"/><g transform="translate(560 478)"><path d="M-70 0q70 30 140 0l-10 14q-60 16 -120 0z" fill="#8d5a2b"/><path d="M0 -4v-110" stroke="#6d4c33" stroke-width="5"/><path d="M4 -110q50 50 4 100z" fill="#fff8e1"/></g></g>`
      + P({ x: 960, y: 600, h: 130, top: '#ffffff', bottom: '#ffffff', skin: '#c68b59', hair: '#1b1b1b', arm: 'hold' })),
    pts: { 'Níl': [44, 85], 'Záplavy': [15, 60], 'Úrodná pôda': [92, 72], 'Pyramídy': [20, 12], 'Púšť': [72, 45] },
  },
  'stredoveka-spolocnost': {
    svg: svg(sky('#bfe3f7', '#eef7fb', 'sksp') + K.cloud({ x: 560, y: 90, s: 0.8 })
      + `<path d="M0 360Q120 200 340 220Q420 260 460 360z" fill="#8cc65f"/><path d="M0 360q300 -20 600 0t600 -10V640H0z" fill="#a5d67a"/>`
      + castle(200, 300, 0.85)
      + `<path d="M230 300q40 40 110 60" stroke="#c9a26a" stroke-width="14" fill="none" stroke-linecap="round"/>`
      + hut(130, 490, 0.9) + hut(290, 520, 0.8, '#e0c79a') + K.tree({ x: 40, y: 500, s: 0.6 })
      + `<g transform="translate(380 520)"><path d="M0 0h400l40 120H-60z" fill="#d6b45a"/><g stroke="#b58f2a" stroke-width="4">${[1, 2, 3, 4, 5].map(i => `<path d="M${i * 70 - 30} 0l${-20 + i * 8} 120"/>`).join('')}</g></g>` + P({ x: 560, y: 600, h: 150, top: '#8d6e4a', bottom: '#5d4037', style: 'cap', capColor: '#a1887f', arm: 'hold' }) + `<path d="M600 520l40 -60" stroke="#6d4c33" stroke-width="5"/>`
      + `<g transform="translate(760 420)"><rect x="0" y="0" width="420" height="16" fill="#9e968b"/><rect x="0" y="-80" width="20" height="96" fill="#9e968b"/><rect x="400" y="-80" width="20" height="96" fill="#9e968b"/></g>`
      + `<g>${[[790, 420, 70, 120, '#f6d7a7'], [880, 420, 80, 150, '#ffcc80'], [1090, 420, 80, 130, '#f8bbd0']].map(([x, y, w, h, c]) => `<g transform="translate(${x} ${y})"><rect x="0" y="${-h}" width="${w}" height="${h}" fill="${c}"/><path d="M-6 ${-h}l${w / 2 + 6} -40l${w / 2 + 6} 40z" fill="#c0503a"/><rect x="${w / 2 - 10}" y="-36" width="20" height="36" fill="#6d4c33"/><rect x="${w / 2 - 14}" y="${-h + 20}" width="28" height="24" fill="#e3f2fd"/></g>`).join('')}</g>` + church(1010, 420, 0.8)
      + `<path d="M760 436h420" stroke="#9e968b" stroke-width="12"/>`),
    pts: { 'Hrad': [17, 52], 'Dedina': [18, 86], 'Pole': [50, 97], 'Mesto': [76, 72], 'Kostol': [84, 26] },
  },
  'maria-terezia': {
    svg: svg(sky('#cfe8f7', '#f8f1e4', 'skmt') + `<path d="M0 520h1200V640H0z" fill="#b5a38a"/><path d="M0 520h1200" stroke="#9c8a70" stroke-width="6"/>`
      + `<g transform="translate(300 520)"><rect x="-220" y="-260" width="440" height="260" fill="#f3e3c3"/><path d="M-240 -256l240 -110l240 110z" fill="#a0503a"/><rect x="-40" y="-430" width="80" height="120" fill="#efe2cc"/><path d="M-50 -426l50 -50l50 50z" fill="#7a4a3a"/><rect x="-30" y="-140" width="60" height="140" rx="4" fill="#8a5a3a"/><g fill="#bfe3f7" stroke="#fff" stroke-width="6">${[-180, -100, 60, 140].map(x => `<rect x="${x}" y="-220" width="44" height="60"/>`).join('')}</g><path d="M-90 -290h180" stroke="#c9a65a" stroke-width="8"/></g>` + bell(300, 30 + 0) .replace('translate(300 30)', 'translate(300 128)')
      + [[130, 600, '#ef5350', 'short', '#f9a825'], [210, 604, '#42a5f5', 'long', '#5d4037'], [390, 600, '#66bb6a', 'short', '#3e2723'], [470, 604, '#ab47bc', 'long', '#f9a825']].map(([x, y, c, st, hr], i) => K.bob(P({ x, y, h: 120, top: c, bottom: '#455a64', style: st, hair: hr, skirt: st === 'long', arm: i % 2 ? 'wave' : 'down' }), -6, 1, i * .25)).join('')
      + `<g transform="translate(860 540)"><ellipse cy="4" rx="120" ry="14" fill="#000" opacity=".12"/><path d="M-110 0q10 -150 70 -190h80q60 40 70 190z" fill="#f48fb1"/><path d="M-80 0q10 -120 50 -170M80 0q-10 -120 -50 -170" stroke="#ec407a" stroke-width="4" fill="none"/><path d="M-40 -190q0 -60 40 -64q40 4 40 64z" fill="#f8bbd0"/><path d="M-30 -230h60" stroke="#fff" stroke-width="10"/><rect x="-8" y="-268" width="16" height="16" fill="#f2c49b"/><circle cy="-290" r="30" fill="#f2c49b"/><path d="M-32 -290q-4 -42 32 -44q36 2 32 44q-8 -26 -32 -26q-24 0 -32 26z" fill="#e0c27a"/><circle cx="-10" cy="-290" r="3" fill="#2b2b2b"/><circle cx="10" cy="-290" r="3" fill="#2b2b2b"/><path d="M-8 -276q8 6 16 0" stroke="#9a5b4a" stroke-width="2.4" fill="none"/><path d="M-26 -322l8 -24l10 16l8 -22l8 22l10 -16l8 24z" fill="#ffca28" stroke="#f9a825" stroke-width="2"/><path d="M40 -200q40 20 60 60" stroke="#f8bbd0" stroke-width="16" fill="none" stroke-linecap="round"/></g>`
      + `<g transform="translate(1040 330)"><g><animateTransform attributeName="transform" type="rotate" values="-3;3;-3" dur="3s" repeatCount="indefinite"/><rect x="-60" y="-80" width="120" height="170" rx="6" fill="#fff8e1" stroke="#c9a65a" stroke-width="4"/><path d="M-40 -50h80M-40 -26h80M-40 -2h60M-40 22h80M-40 46h40" stroke="#b08a4a" stroke-width="5" stroke-linecap="round"/><circle cx="30" cy="66" r="16" fill="#c62828"/></g></g>`),
    pts: { 'Škola': [25, 48], 'Žiaci': [25, 97], 'Mária Terézia': [72, 29], 'Listina': [87, 70], 'Zvon': [31, 26] },
  },
  grecko: {
    svg: svg(sky('#9fd3f7', '#e9f6ff', 'skgr') + K.sun({ x: 1100, y: 80, s: 0.7 }) + `<rect y="380" width="1200" height="80" fill="#3b9ad8"/><path d="M0 390q100 -10 200 0t200 0t200 0t200 0t200 0t200 0" stroke="#9fd6f5" stroke-width="4" fill="none"/>`
      + `<path d="M0 420Q120 260 340 250Q520 260 600 420z" fill="#c9b48a"/><path d="M0 460q300 -40 600 0t600 -10V640H0z" fill="#e8d6a6"/><path d="M0 520q400 -20 1200 0V640H0z" fill="#ddc690"/>`
      + columns(160, 264, 6, 300, 120)
      + `<g transform="translate(860 520)"><path d="M-260 0a260 140 0 0 1 520 0z" fill="#d9c79a"/>${[1, 2, 3, 4].map(i => `<path d="M${-260 + i * 30} 0a${260 - i * 30} ${140 - i * 22} 0 0 1 ${520 - i * 60} 0" fill="none" stroke="#bfa877" stroke-width="5"/>`).join('')}<rect x="-90" y="-10" width="180" height="16" fill="#bfa877"/></g>` + P({ x: 860, y: 506, h: 110, top: '#ffffff', bottom: '#ffffff', hair: '#3e2723', arm: 'wave', skin: '#e9b48a' })
      + `<g><animateTransform attributeName="transform" type="translate" values="0 0;200 0;200 0;0 0" keyTimes="0;.45;.55;1" dur="8s" repeatCount="indefinite"/>${P({ x: 400, y: 600, h: 150, top: '#ffffff', bottom: '#ffffff', hair: '#5d4037', skin: '#e9b48a', arm: 'wave' })}<g transform="translate(436 470)">${swing('<path d="M0 0l6 -30" stroke="#8d6e4a" stroke-width="6"/><path d="M6 -30q-10 -20 4 -40q4 16 12 18q-2 16 -16 22z" fill="#ff7043"/>', 0, 0, 6, .4)}</g></g>`
      + K.tree({ x: 1120, y: 470, s: 0.7, color: '#7a9a5a', fruit: '#3f4a2a' }) + K.tree({ x: 60, y: 600, s: 0.6, fruit: '#3f4a2a' })
      + `<g transform="translate(70 120)"><rect x="-50" y="-36" width="100" height="72" rx="8" fill="#fff" stroke="#3b9ad8" stroke-width="4"/>${[0, 1, 2].map(i => `<rect x="${-36 + i * 26}" y="-14" width="18" height="34" fill="#e0e0e0"/>`).join('')}<path d="M-40 -14l40 -18l40 18z" fill="#bdbdbd"/></g>`),
    pts: { 'Chrám so stĺpmi': [26, 18], 'Divadlo': [72, 58], 'Olympijské hry': [47, 96], 'Polis': [6, 28] },
  },
  rim: {
    svg: svg(sky('#bfe3f7', '#eef7fb', 'skrm') + K.cloud({ x: 260, y: 80, s: 0.7 })
      + `<path d="M0 330q300 -20 600 0t600 -6V640H0z" fill="#a5d67a"/>`
      + `<g transform="translate(400 330)"><rect x="-240" y="-110" width="480" height="110" fill="#a1785a"/><g fill="#8d6748">${Array.from({ length: 24 }, (_, i) => `<path d="M${-240 + i * 20} -110l10 -20l10 20z"/>`).join('')}</g><rect x="-270" y="-170" width="60" height="170" fill="#8d6748"/><rect x="210" y="-170" width="60" height="170" fill="#8d6748"/><path d="M-280 -170h80l-40 -30zM200 -170h80l-40 -30z" fill="#6d4c33"/><path d="M-40 0v-70h80v70z" fill="#5d4037"/><path d="M0 -110v-60" stroke="#5d4037" stroke-width="5"/><path d="M2 -170h44v30h-44z" fill="#c62828"><animate attributeName="d" values="M2 -170h44v30h-44z;M2 -170q22 8 44 0v30q-22 -8 -44 0z;M2 -170h44v30h-44z" dur="1.6s" repeatCount="indefinite"/></path><circle cx="24" cy="-155" r="7" fill="#ffca28"/></g>`
      + `<path d="M0 470q300 -30 600 0t600 -20V540q-300 30 -600 0t-600 16z" fill="#3b9ad8"/><path d="M0 500q300 -20 600 0t600 -10" stroke="#9fd6f5" stroke-width="5" fill="none" stroke-dasharray="40 30"><animate attributeName="stroke-dashoffset" values="70;0" dur="2s" repeatCount="indefinite"/></path>`
      + `<path d="M0 600L460 560L1200 600V640H0z" fill="#b0a99f"/><g stroke="#8a8278" stroke-width="3">${Array.from({ length: 14 }, (_, i) => `<path d="M${i * 90} ${600 - (i < 6 ? i * 7 : 40 - (i - 6) * 5)}v40"/>`).join('')}</g>`
      + legionar(560, 600, 0.9)
      + `<path d="M760 330q120 -60 440 -40V340H760z" fill="#8cc65f"/>` + K.conifer({ x: 820, y: 420, s: 0.8 }) + K.conifer({ x: 960, y: 400, s: 0.95 }) + K.conifer({ x: 1120, y: 410, s: 0.85 }) + hut(1040, 440, 0.8, '#c9a26a')),
    pts: { 'Rímsky tábor': [33, 16], 'Dunaj': [72, 79], 'Rímska cesta': [15, 97], 'Legionár': [52, 60], 'Za hranicou': [80, 34] },
  },
};
