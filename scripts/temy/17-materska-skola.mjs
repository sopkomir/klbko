// Materská škola – prvá dávka (10 tém). Štandardy: ŠVP pre predprimárne vzdelávanie v MŠ (2016), doslovné znenie.
// Deti väčšinou nečítajú: hlavná je animácia, kartičky a kvíz číta učiteľka nahlas.

const CaP = 'Človek a príroda', CaS = 'Človek a spoločnosť', MAT = 'Matematika a práca s informáciami', ZaP = 'Zdravie a pohyb', UaK = 'Umenie a kultúra';
const S = (t, where) => ({ t, where, kind: 'výkonový štandard' });

/* ---------- pomocné kreslenie ---------- */
const tree = (x, y, s = 1, crown = '#66bb6a') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="-90" width="20" height="90" fill="#8d6e63"/><circle cy="-120" r="55" fill="${crown}"/><circle cx="-35" cy="-95" r="35" fill="${crown}"/><circle cx="35" cy="-95" r="35" fill="${crown}"/></g>`;
const flower = (x, y, c, d = 0) => `<g transform="translate(${x} ${y})"><g><animateTransform attributeName="transform" type="rotate" values="-6 0 0;6 0 0;-6 0 0" dur="3s" begin="${d}s" repeatCount="indefinite"/><path d="M0 0V-60" stroke="#43a047" stroke-width="5"/><g transform="translate(0 -66)" fill="${c}"><circle cx="-11" r="10"/><circle cx="11" r="10"/><circle cy="-11" r="10"/><circle cy="11" r="10"/><circle r="8" fill="#ffd54f"/></g></g></g>`;
const cloud = (x, y, s = 1, c = '#ffffff') => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><ellipse rx="70" ry="34"/><circle cx="-30" cy="-22" r="32"/><circle cx="20" cy="-30" r="38"/></g>`;
const bird = (x, y, d) => `<g transform="translate(${x} ${y})"><g><animateTransform attributeName="transform" type="translate" values="0 0;0 -10;0 0" dur="1.6s" begin="${d}s" repeatCount="indefinite"/><path d="M-26 0q13 -16 26 0q13 -16 26 0" fill="none" stroke="#37474f" stroke-width="6" stroke-linecap="round"/></g></g>`;
// ľudia: v = výška, vlasy, tričko, typ účesu
const person = (x, base, h, hair, shirt, style = 'short', wave = 0) => {
  const k = h / 300, head = base - h + 40 * k;
  const hairSvg = style === 'bun' ? `<circle cx="0" cy="${head - 38 * k}" r="${16 * k}" fill="${hair}"/><path d="M${-34 * k} ${head}a${34 * k} ${34 * k} 0 0 1 ${68 * k} 0z" fill="${hair}"/>`
    : style === 'long' ? `<path d="M${-36 * k} ${head + 40 * k}V${head}a${36 * k} ${36 * k} 0 0 1 ${72 * k} 0V${head + 40 * k}z" fill="${hair}"/>`
    : style === 'bald' ? `<path d="M${-34 * k} ${head - 2 * k}a${34 * k} ${20 * k} 0 0 1 ${10 * k} -${18 * k}M${34 * k} ${head - 2 * k}a${34 * k} ${20 * k} 0 0 0 -${10 * k} -${18 * k}" stroke="${hair}" stroke-width="${8 * k}" fill="none"/>`
    : `<path d="M${-34 * k} ${head}a${34 * k} ${34 * k} 0 0 1 ${68 * k} 0z" fill="${hair}"/>`;
  const arm = (side) => `<path d="M${side * 30 * k} ${head + 70 * k}l${side * 34 * k} ${70 * k}" stroke="#ffcc80" stroke-width="${16 * k}" stroke-linecap="round"/>`;
  const waveArm = `<g><animateTransform attributeName="transform" type="rotate" values="-170 ${30 * k} ${head + 70 * k};-140 ${30 * k} ${head + 70 * k};-170 ${30 * k} ${head + 70 * k}" dur="1.2s" repeatCount="indefinite"/><path d="M${30 * k} ${head + 70 * k}l${34 * k} ${70 * k}" stroke="#ffcc80" stroke-width="${16 * k}" stroke-linecap="round"/></g>`;
  return `<g transform="translate(${x} 0)"><rect x="${-14 * k}" y="${base - 90 * k}" width="${12 * k}" height="${90 * k}" fill="#455a64"/><rect x="${2 * k}" y="${base - 90 * k}" width="${12 * k}" height="${90 * k}" fill="#455a64"/><rect x="${-32 * k}" y="${head + 40 * k}" width="${64 * k}" height="${base - 90 * k - head - 40 * k + 6 * k}" rx="${16 * k}" fill="${shirt}"/>${arm(-1)}${wave ? waveArm : arm(1)}<circle cy="${head}" r="${32 * k}" fill="#ffcc80"/>${hairSvg}<circle cx="${-11 * k}" cy="${head + 2 * k}" r="${3.5 * k}" fill="#3e2723"/><circle cx="${11 * k}" cy="${head + 2 * k}" r="${3.5 * k}" fill="#3e2723"/><path d="M${-10 * k} ${head + 14 * k}q${10 * k} ${9 * k} ${20 * k} 0" stroke="#3e2723" stroke-width="${3 * k}" fill="none" stroke-linecap="round"/></g>`;
};

export default [
/* =============================== 1. POČASIE =============================== */
{
 id: 'ms-pocasie', title: 'Aké je dnes počasie', aka: ['Počasie', 'Pozorujeme počasie', 'Slnko, dážď, sneh, vietor', 'Kalendár počasia'], subject: 'Materská škola', grade: 0, kind: 'pojmy', rec: 'scene',
 why: 'Deti počasie vidia a cítia každý deň. Obrázok so štyrmi oknami ukáže slnko, oblaky s vetrom, dážď a sneh vedľa seba, takže ich deti ľahko porovnajú.',
 alts: [['mind', 'Keď sa s deťmi rozprávate, čo si pri ktorom počasí obliecť.'], ['cards', 'Na hru „ukáž, aké je počasie“.'], ['quiz', 'Na krátke overenie po pozorovaní.']],
 std: [], svpms: [S('Identifikuje prvky počasia a realizuje krátkodobé pozorovania zmien v počasí.', `${CaP} · Vnímanie prírody`)],
 method: { goals: ['Dieťa pomenuje slnečno, oblačno, dážď, sneh a vietor.', 'Dieťa povie, aké je počasie dnes, podľa pozorovania z okna.', 'Dieťa priradí oblečenie k počasiu.'],
  plan: [['5 min', 'Pozorovanie z okna: čo vidíme na oblohe?'], ['10 min', 'Animácia počasia na tabuli, deti napodobňujú zvuky dažďa a vetra.'], ['10 min', 'Hra: čo si oblečiem? Deti priraďujú oblečenie k počasiu.'], ['5 min', 'Značka do kalendára počasia.']],
  ask: ['Ako vieš, že fúka vietor, keď ho nevidíš?', 'Kam sa podeje mláka, keď vyjde slnko?'] },
 guide: { primer: 'Počasie je to, aké je práve vonku: či svieti slnko, či je oblačno, prší, sneží alebo fúka vietor, a či je teplo alebo zima. Mení sa počas dňa aj zo dňa na deň. Vietor nevidíme, ale vidíme, čo robí: hýbe listami, zástavou, oblakmi. Pre deti je najlepšie počasie pozorovať a zaznamenávať, napríklad v kalendári počasia so značkami.',
  steps: [
   { time: '5 min', do: 'Pri okne sa spýtajte na oblohu a stromy.', say: 'Pozrime sa von. Je obloha modrá alebo sivá? Hýbu sa konáre?', check: 'Dieťa opíše aspoň jednu vec, ktorú vidí.' },
   { time: '10 min', do: 'Pustite animáciu a postupne ukazujte okná. Deti napodobnia zvuk: dážď bubnovaním prstov, vietor fúkaním.', say: 'V ktorom okne prší? Ukáž mi ho.', check: 'Deti správne ukážu dážď a sneh.' },
   { time: '10 min', do: 'Rozložte obrázky oblečenia. Deti ich prinesú k správnemu oknu: dáždnik, čiapka, šiltovka, bunda.', check: 'Dieťa vysvetlí, prečo dáždnik patrí k dažďu.' },
   { time: '5 min', do: 'Nalepte do kalendára počasia značku dnešného dňa.', say: 'Akú značku dáme dnes?', check: 'Deti sa zhodnú na značke podľa pozorovania.' }],
  traps: [['Keď je zima, sneží.', 'Môže byť zima a slnečno, alebo zima a sucho. Sneh padá, len keď z oblakov padajú zrážky a vo vzduchu je dosť chladno.'], ['Vietor robia stromy, keď sa hýbu.', 'Je to naopak: vietor hýbe stromami. Stromy ukazujú, že fúka.'], ['Slnko v zime nesvieti.', 'Slnko svieti aj v zime, len je nižšie na oblohe a menej hreje.']],
  qa: [['Odkiaľ sa berie dážď?', 'Z oblakov. Oblak je z malých kvapôčok vody. Keď sa spoja do veľkých kvapiek, padajú dolu ako dážď.'], ['Prečo je niekedy dúha?', 'Keď svieti slnko a zároveň prší, svetlo sa v kvapkách rozloží na farby.']] },
 forms: {
  scene: { svg: `<svg viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="640" fill="#bfe6f7"/><rect x="300" width="300" height="640" fill="#cfd8dc"/><rect x="600" width="300" height="640" fill="#90a4ae"/><rect x="900" width="300" height="640" fill="#e3f2fd"/>
<g transform="translate(150 150)"><g stroke="#ffb300" stroke-width="12" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="0;360" dur="20s" repeatCount="indefinite"/><path d="M0 -95v-30M0 95v30M-95 0h-30M95 0h30M67 67l21 21M-67 -67l-21 -21M67 -67l21 -21M-67 67l-21 21"/></g><circle r="62" fill="#ffd54f"/></g>
<g><animateTransform attributeName="transform" type="translate" values="0 0;40 0;0 0" dur="6s" repeatCount="indefinite"/>${cloud(410, 120, 0.9)}${cloud(520, 200, 0.7, '#eceff1')}</g>
<g><animateTransform attributeName="transform" type="rotate" values="-3 450 480;9 450 480;-3 450 480" dur="2s" repeatCount="indefinite"/>${tree(450, 480, 1, '#7cb342')}</g>
<g stroke="#eceff1" stroke-width="5" stroke-linecap="round" fill="none" opacity=".9"><path d="M330 300q40 -14 80 0"><animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/></path><path d="M500 260q40 -14 80 0"><animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite"/></path></g>
${cloud(750, 150, 1.2, '#607d8b')}
<g stroke="#1e88e5" stroke-width="6" stroke-linecap="round">${[660, 700, 740, 780, 820, 860, 690, 760, 830].map((x, i) => `<path d="M${x} 210v26"><animateTransform attributeName="transform" type="translate" values="0 0;-10 250" dur="1.1s" begin="${(i * 0.13).toFixed(2)}s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" dur="1.1s" begin="${(i * 0.13).toFixed(2)}s" repeatCount="indefinite"/></path>`).join('')}</g>
${cloud(1050, 140, 1.1, '#ffffff')}
<g fill="#ffffff" stroke="#b0bec5" stroke-width="2">${[940, 990, 1040, 1090, 1140, 965, 1065, 1115].map((x, i) => `<circle cx="${x}" cy="200" r="9"><animate attributeName="cy" values="200;470" dur="4s" begin="${(i * 0.5).toFixed(1)}s" repeatCount="indefinite"/><animate attributeName="cx" values="${x};${x + 14};${x - 6};${x + 8}" dur="4s" begin="${(i * 0.5).toFixed(1)}s" repeatCount="indefinite"/></circle>`).join('')}</g>
<rect y="480" width="600" height="160" fill="#7cb342"/><rect x="600" y="480" width="300" height="160" fill="#558b2f"/><ellipse cx="760" cy="560" rx="90" ry="22" fill="#4fc3f7" opacity=".8"/><rect x="900" y="480" width="300" height="160" fill="#ffffff"/>
${flower(120, 560, '#ec407a', 0)}${flower(200, 590, '#ab47bc', 1)}<g transform="translate(1050 470)"><circle cy="-40" r="30" fill="#fff" stroke="#b0bec5" stroke-width="3"/><circle cy="-95" r="22" fill="#fff" stroke="#b0bec5" stroke-width="3"/><path d="M-8 -95l18 4-18 4z" fill="#ff7043"/><circle cx="-7" cy="-101" r="3" fill="#263238"/></g>
<path d="M300 0V640M600 0V640M900 0V640" stroke="#ffffff" stroke-width="10"/></svg>`,
   points: [
    { t: 'Slnečno', d: 'Svieti slnko, obloha je modrá a je svetlo. V lete pri slnku hreje.', e: 'Svieti slnko.', ic: 'sun', x: 12, y: 40 },
    { t: 'Oblačno', d: 'Slnko schovávajú oblaky. Obloha je sivá.', e: 'Sú tu oblaky.', ic: 'cloud', x: 40, y: 12 },
    { t: 'Fúka vietor', d: 'Vietor nevidíme. Vidíme, ako hýbe stromom a oblakmi.', e: 'Vietor hýbe stromom.', ic: 'cloud', x: 37, y: 62 },
    { t: 'Prší', d: 'Z tmavého oblaku padajú kvapky dažďa. Vznikajú mláky.', e: 'Padá dážď.', ic: 'rain', x: 62, y: 45 },
    { t: 'Sneží', d: 'Keď je veľká zima, z oblakov môžu padať snehové vločky. Môžeme stavať snehuliaka.', e: 'Padá sneh.', ic: 'snow', x: 87, y: 45 }] },
  mind: { center: 'Čo si oblečiem?', branches: [
   { t: 'Slnečno a teplo', ic: 'sun', kids: [{ t: 'šiltovka' }, { t: 'tričko' }, { t: 'krém na opaľovanie', l: 2 }] },
   { t: 'Prší', ic: 'rain', kids: [{ t: 'dáždnik' }, { t: 'gumáky' }, { t: 'pršiplášť', l: 2 }] },
   { t: 'Sneží a mrzne', ic: 'snow', kids: [{ t: 'čiapka' }, { t: 'rukavice' }, { t: 'šál' }] },
   { t: 'Fúka vietor', ic: 'cloud', kids: [{ t: 'bunda' }, { t: 'kapucňa', l: 2 }] }] },
  cards: [{ q: 'Čo padá z oblakov, keď prší?', a: 'Kvapky dažďa.' }, { q: 'Čo môže padať z oblakov, keď mrzne?', a: 'Snehové vločky.' }, { q: 'Ako spoznáš, že fúka vietor?', a: 'Hýbu sa listy, konáre, zástava.' }, { q: 'Čo si zoberieš, keď prší?', a: 'Dáždnik a gumáky.' }, { q: 'Čo si oblečieš, keď sneží?', a: 'Čiapku, rukavice a šál.' }, { q: 'Kedy môže byť dúha?', a: 'Keď svieti slnko a zároveň prší.', l: 3 }],
  quiz: [{ q: 'Čo si zoberieš, keď prší?', o: ['Dáždnik', 'Sánky', 'Slnečné okuliare'], k: 0, w: 'Dáždnik nás chráni pred kvapkami.' }, { q: 'Čo môže padať z oblakov, keď mrzne?', o: ['Sneh', 'Listy', 'Piesok'], k: 0, w: 'V mraze sa z vody v oblakoch tvoria snehové vločky.' }, { q: 'Čo ukazuje, že fúka vietor?', o: ['Hýbu sa konáre', 'Svieti slnko', 'Je ticho'], k: 0, w: 'Vietor nevidíme, ale hýbe stromami.' }, { q: 'Kedy si dáme čiapku a rukavice?', o: ['Keď je zima', 'Keď je horúco', 'Keď sa kúpeme'], k: 0, w: 'Čiapka a rukavice nás zohrejú.', l: 2 }] } },

/* =============================== 2. POČÍTAME =============================== */
{
 id: 'ms-pocitame', title: 'Počítame do 10', aka: ['Čísla do 10', 'Počítanie', 'Koľko je', 'Viac a menej', 'Číselný rad'], subject: 'Materská škola', grade: 0, kind: 'pojmy', rec: 'scene',
 why: 'Deti sa učia počítať na veciach, ktoré vidia. Na lúke je jedno slnko, dva oblaky, tri vtáky, štyri stromy a päť kvetov, takže každý počet sa dá ukázať prstom.',
 alts: [['cards', 'Na hru „koľko ich je“ s predmetmi z triedy.'], ['quiz', 'Na porovnávanie: kde je viac a kde menej.']],
 std: [], svpms: [S('Vymenuje čísla od 1 do 10 tak, ako idú za sebou.', `${MAT} · Čísla a vzťahy`), S('V obore do 10 určí počítaním po jednej počet predmetov v skupine.', `${MAT} · Čísla a vzťahy`), S('Pre dve skupiny určí, kde je viac, kde je menej alebo rovnako veľa predmetov podľa zisteného počtu', `${MAT} · Čísla a vzťahy`)],
 method: { goals: ['Dieťa vymenuje čísla od 1 do 10 po poradí.', 'Dieťa určí počet predmetov do 10 tak, že ukazuje na každý a počíta po jednej.', 'Dieťa porovná dve skupiny: kde je viac a kde menej.'],
  plan: [['5 min', 'Počítanka na prstoch od 1 do 10.'], ['10 min', 'Lúka na tabuli: deti počítajú slnko, oblaky, vtáky, stromy a kvety.'], ['10 min', 'Porovnávanie skupín kociek: kde je viac?'], ['5 min', 'Hra: tlesknite toľkokrát, koľko ukážem prstov.']],
  ask: ['Kde je viac: vtákov alebo stromov? Ako si na to prišiel?', 'Čo sa stane, keď jeden kvet odtrhneme?'] },
 guide: { primer: 'Pri počítaní je dôležité, aby dieťa ku každej veci povedalo práve jedno číslo a žiadnu vec nevynechalo ani nepočítalo dvakrát. Pomáha ukazovať prstom alebo veci presúvať. Posledné povedané číslo je počet celej skupiny. Pri porovnávaní najprv spočítame obe skupiny a potom povieme, kde je viac, kde menej, alebo či je ich rovnako.',
  steps: [
   { time: '5 min', do: 'Spolu počítajte na prstoch od 1 do 10, nahlas a pomaly.', say: 'Koľko prstov máme na dvoch rukách?', check: 'Deti povedia čísla po poradí bez vynechania.' },
   { time: '10 min', do: 'Ukazujte na lúke skupiny. Jedno dieťa ukazuje prstom na tabuli, ostatní počítajú nahlas.', say: 'Ukáž na každý strom a počítaj.', check: 'Dieťa ukáže na každú vec práve raz.' },
   { time: '10 min', do: 'Dajte dvom deťom kocky: jednému 3, druhému 5. Deti ich postavia do radov vedľa seba.', say: 'Kto má viac kociek? Ako to vidíme?', check: 'Dieťa povie, kde je viac, a ukáže to na rade.' },
   { time: '5 min', do: 'Ukážte počet prstov, deti toľkokrát tlesknú.', check: 'Počet tlesknutí sedí s počtom prstov.' }],
  traps: [['Dieťa vie odrecitovať 1 až 10, tak vie počítať.', 'Recitovanie je iné ako počítanie vecí. Sledujte, či dieťa priraďuje ku každej veci jedno číslo.'], ['Väčšie veci znamenajú väčší počet.', 'Tri veľké stromy sú menej ako päť malých kvetov. Počet nezávisí od veľkosti.'], ['Keď veci roztiahneme, je ich viac.', 'Počet sa nezmení, keď veci posunieme. Overte to s deťmi znova spočítaním.']],
  qa: [['Čo je pred jednotkou?', 'Nula. Nula znamená, že tam nie je nič.'], ['Ktoré číslo je najväčšie?', 'Neexistuje. Ku každému číslu vieme pridať ešte jeden.']] },
 forms: {
  scene: { svg: `<svg viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="640" fill="#bfe6f7"/><rect y="430" width="1200" height="210" fill="#9ccc65"/><ellipse cx="900" cy="460" rx="420" ry="50" fill="#aed581"/>
<g transform="translate(130 100)"><g stroke="#ffb300" stroke-width="10" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="0;360" dur="18s" repeatCount="indefinite"/><path d="M0 -78v-24M0 78v24M-78 0h-24M78 0h24M55 55l17 17M-55 -55l-17 -17M55 -55l17 -17M-55 55l-17 17"/></g><circle r="52" fill="#ffd54f"/></g>
<g><animateTransform attributeName="transform" type="translate" values="0 0;30 0;0 0" dur="7s" repeatCount="indefinite"/>${cloud(430, 110, 0.85)}${cloud(640, 80, 0.75)}</g>
${bird(880, 140, 0)}${bird(960, 100, 0.5)}${bird(1050, 150, 1)}
${tree(110, 470, 0.8)}${tree(250, 470, 0.8, '#43a047')}${tree(390, 470, 0.8)}${tree(530, 470, 0.8, '#43a047')}
${flower(680, 580, '#ec407a', 0)}${flower(790, 580, '#ff7043', 0.4)}${flower(900, 580, '#ab47bc', 0.8)}${flower(1010, 580, '#ec407a', 1.2)}${flower(1120, 580, '#ff7043', 1.6)}</svg>`,
   points: [
    { t: 'Jedno slnko', d: 'Na oblohe je jedno slnko. Ukáž naň a povedz: jeden.', e: 'Jedno slnko.', ic: 'sun', x: 11, y: 33 },
    { t: 'Dva oblaky', d: 'Ukáž na každý oblak a počítaj: jeden, dva.', e: 'Dva oblaky.', ic: 'cloud', x: 44, y: 31 },
    { t: 'Tri vtáky', d: 'Vtáky letia. Spočítaj ich: jeden, dva, tri.', e: 'Tri vtáky.', ic: 'star', x: 81, y: 33 },
    { t: 'Štyri stromy', d: 'Ukáž na každý strom raz. Posledné číslo, ktoré povieš, je počet.', e: 'Štyri stromy.', ic: 'plant', x: 27, y: 82 },
    { t: 'Päť kvetov', d: 'Spočítaj kvety. Kde je viac: stromov alebo kvetov?', e: 'Päť kvetov.', ic: 'plant', x: 75, y: 94 }] },
  cards: [{ q: 'Koľko je na lúke slniek?', a: 'Jedno.' }, { q: 'Koľko je tam oblakov?', a: 'Dva.' }, { q: 'Koľko vtákov letí?', a: 'Tri.' }, { q: 'Koľko je stromov?', a: 'Štyri.' }, { q: 'Koľko je kvetov?', a: 'Päť.' }, { q: 'Kde je viac: vtákov alebo kvetov?', a: 'Kvetov. Kvetov je päť, vtáky sú tri.', l: 2 }, { q: 'Ktoré číslo ide po štyroch?', a: 'Päť.', l: 2 }, { q: 'Koľko prstov máš na dvoch rukách?', a: 'Desať.', l: 3 }],
  quiz: [{ q: 'Ktoré číslo ide po troch?', o: ['Štyri', 'Dva', 'Šesť'], k: 0, w: 'Jeden, dva, tri, štyri.' }, { q: 'Kde je viac: tri vtáky alebo päť kvetov?', o: ['Kvetov', 'Vtákov', 'Je ich rovnako'], k: 0, w: 'Päť je viac ako tri.' }, { q: 'Kde je menej: dva oblaky alebo štyri stromy?', o: ['Oblakov', 'Stromov', 'Je ich rovnako'], k: 0, w: 'Dva je menej ako štyri.' }, { q: 'Koľko prstov máš na jednej ruke?', o: ['Päť', 'Desať', 'Tri'], k: 0, w: 'Na jednej ruke máme päť prstov.', l: 2 }] } },

/* =============================== 3. TVARY =============================== */
{
 id: 'ms-tvary', title: 'Tvary okolo nás', aka: ['Geometrické tvary', 'Kruh, štvorec, trojuholník', 'Obdĺžnik', 'Guľa a kocka', 'Tvary'], subject: 'Materská škola', grade: 0, kind: 'porovnanie', rec: 'scene',
 why: 'Tvary sa deti najlepšie učia na veciach okolo seba. Domček na obrázku je poskladaný zo štvorca, trojuholníka a obdĺžnika a na oblohe svieti kruhové slnko.',
 alts: [['ttable', 'Pre predškolákov: čo kreslíme na papier a čo chytíme do ruky.'], ['cards', 'Na hľadanie tvarov v triede.'], ['quiz', 'Na overenie názvov tvarov.']],
 std: [], svpms: [S('V skupine útvarov identifikuje (aj hmatom) kruh, štvorec, obdĺžnik, trojuholník.', `${MAT} · Geometria a meranie`), S('Približne nakreslí kruh, štvorec, obdĺžnik, trojuholník.', `${MAT} · Geometria a meranie`), S('Určí (aj len hmatom), pomenuje a vymodeluje guľu, kocku, valec.', `${MAT} · Geometria a meranie`)],
 method: { goals: ['Dieťa pomenuje a ukáže kruh, štvorec, obdĺžnik a trojuholník.', 'Dieťa nájde tvary na veciach v triede.', 'Dieťa približne nakreslí kruh, štvorec a trojuholník.'],
  plan: [['5 min', 'Vrecko s tvarmi: deti hmatom hádajú tvar.'], ['10 min', 'Domček na tabuli: z akých tvarov je postavený?'], ['10 min', 'Hľadanie tvarov v triede.'], ['5 min', 'Kreslenie domčeka z tvarov.']],
  ask: ['Ako spoznáš trojuholník so zavretými očami?', 'Prečo sa lopta kotúľa a kocka nie?'] },
 guide: { primer: 'Kruh je okrúhly a nemá rohy. Štvorec má štyri rovnaké strany a štyri rohy. Obdĺžnik má tiež štyri rohy, ale dve strany sú dlhšie a dve kratšie. V matematike je štvorec zvláštny obdĺžnik, ktorý má všetky strany rovnaké. V materskej škole ich však deti rozlišujú ako dva tvary a toto spresnenie im netreba vysvetľovať. Trojuholník má tri strany a tri rohy. Tieto tvary kreslíme na papier. Guľa, kocka a valec sú telesá, ktoré môžeme chytiť do ruky: lopta je guľa, hracia kocka je kocka, hrnček alebo plechovka má tvar valca.',
  steps: [
   { time: '5 min', do: 'Do vrecka dajte vystrihnuté tvary z kartónu. Dieťa vytiahne tvar len hmatom a hádá.', say: 'Koľko má rohov? Je okrúhly?', check: 'Dieťa pomenuje tvar podľa rohov.' },
   { time: '10 min', do: 'Na tabuli ukazujte časti domčeka.', say: 'Z akého tvaru je strecha? Spočítajme jej rohy.', check: 'Deti ukážu trojuholník a štvorec.' },
   { time: '10 min', do: 'Deti hľadajú v triede tvary: okno, tanier, dvere, stôl.', check: 'Každé dieťa nájde aspoň jednu vec s tvarom.' },
   { time: '5 min', do: 'Deti nakreslia domček zo štvorca, trojuholníka a obdĺžnika a slnko ako kruh.', check: 'Na kresbe sú aspoň tri rôzne tvary.' }],
  traps: [['Obdĺžnik je natiahnutý štvorec, preto je to tiež štvorec.', 'Štvorec má všetky strany rovnaké. Obdĺžnik má dve strany dlhšie.'], ['Otočený štvorec je už iný tvar.', 'Keď štvorec otočíme na roh, je to stále štvorec. Tvar sa otočením nemení.'], ['Lopta je kruh.', 'Lopta je guľa, dá sa chytiť do ruky. Kruh nakreslíme na papier.']],
  qa: [['Je kosoštvorec tiež štvorec?', 'Len niekedy. Kosoštvorec má všetky strany rovnaké, ale jeho rohy nemusia byť pravé. Ak sú pravé, je to štvorec.'], ['Prečo sú kolesá okrúhle?', 'Kruh nemá rohy, preto sa koleso hladko kotúľa.']] },
 forms: {
  scene: { svg: `<svg viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="ball" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#ff8a80"/><stop offset="1" stop-color="#d32f2f"/></radialGradient></defs><rect width="1200" height="640" fill="#e1f5fe"/><rect y="560" width="1200" height="80" fill="#9ccc65"/>
<rect x="300" y="300" width="260" height="260" fill="#ffe082" stroke="#f9a825" stroke-width="6"/><path d="M270 302L430 160L590 302z" fill="#ef5350" stroke="#c62828" stroke-width="6" stroke-linejoin="round"/><rect x="460" y="420" width="70" height="140" fill="#8d6e63" stroke="#5d4037" stroke-width="5"/><circle cx="515" cy="495" r="6" fill="#ffd54f"/><circle cx="375" cy="380" r="34" fill="#81d4fa" stroke="#0277bd" stroke-width="6"/>
<g transform="translate(900 130)"><circle r="70" fill="#ffd54f"><animate attributeName="r" values="66;74;66" dur="3s" repeatCount="indefinite"/></circle></g>
<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -70;0 0" keyTimes="0;0.5;1" dur="1.4s" calcMode="spline" keySplines=".3 0 .6 1;.4 0 .7 1" repeatCount="indefinite"/><circle cx="780" cy="515" r="45" fill="url(#ball)"/></g>
<g transform="translate(960 470)"><path d="M0 0h80v80h-80z" fill="#fff" stroke="#455a64" stroke-width="5"/><path d="M0 0l30 -30h80l-30 30zM80 0l30 -30v80l-30 30z" fill="#eceff1" stroke="#455a64" stroke-width="5" stroke-linejoin="round"/><circle cx="20" cy="20" r="7" fill="#263238"/><circle cx="40" cy="40" r="7" fill="#263238"/><circle cx="60" cy="60" r="7" fill="#263238"/></g>
<g transform="translate(1120 470)"><rect x="-30" y="0" width="60" height="86" fill="#90caf9" stroke="#1565c0" stroke-width="5"/><ellipse cy="0" rx="30" ry="11" fill="#bbdefb" stroke="#1565c0" stroke-width="5"/><path d="M-30 86a30 11 0 0 0 60 0" fill="none" stroke="#1565c0" stroke-width="5"/></g></svg>`,
   points: [
    { t: 'Trojuholník', d: 'Strecha má tri strany a tri rohy.', e: 'Strecha je trojuholník.', ic: 'mountain', x: 36, y: 33 },
    { t: 'Štvorec', d: 'Stena domčeka má štyri rovnaké strany a štyri rohy.', e: 'Stena je štvorec.', ic: 'castle', x: 29, y: 74 },
    { t: 'Obdĺžnik', d: 'Dvere majú štyri rohy. Dve strany sú dlhé a dve krátke.', e: 'Dvere sú obdĺžnik.', ic: 'castle', x: 42, y: 62 },
    { t: 'Kruh', d: 'Slnko a okno sú okrúhle. Kruh nemá žiadny roh.', e: 'Slnko je kruh.', ic: 'sun', x: 75, y: 37 },
    { t: 'Guľa', d: 'Lopta je guľa. Chytíme ju do ruky a kotúľa sa.', e: 'Lopta je guľa.', ic: 'star', x: 65, y: 94, l: 3 },
    { t: 'Kocka a valec', d: 'Hracia kocka má rohy a rovné steny. Plechovka je valec, dole aj hore má kruh.', e: 'Kocka a valec.', ic: 'star', x: 87, y: 66, l: 3 }] },
  ttable: { a: 'Nakreslíme na papier', b: 'Chytíme do ruky', rows: [[{ t: 'kruh' }, { t: 'guľa: lopta' }], [{ t: 'štvorec' }, { t: 'kocka: hracia kocka' }], [{ t: 'kruh dole aj hore', l: 3 }, { t: 'valec: hrnček, plechovka', l: 3 }]] },
  cards: [{ q: 'Koľko rohov má trojuholník?', a: 'Tri.' }, { q: 'Ktorý tvar nemá žiadny roh?', a: 'Kruh.' }, { q: 'Nájdi v triede niečo okrúhle.', a: 'Napríklad tanier, hodiny, gombík.' }, { q: 'Nájdi v triede obdĺžnik.', a: 'Napríklad dvere, kniha, tabuľa.' }, { q: 'Aký tvar má lopta?', a: 'Guľa.', l: 3 }, { q: 'Aký tvar má plechovka?', a: 'Valec.', l: 3 }],
  quiz: [{ q: 'Aký tvar má strecha domčeka na obrázku?', o: ['Trojuholník', 'Kruh', 'Štvorec'], k: 0, w: 'Strecha má tri rohy.' }, { q: 'Ktorý tvar nemá roh?', o: ['Kruh', 'Štvorec', 'Trojuholník'], k: 0, w: 'Kruh je okrúhly.' }, { q: 'Koľko rohov má štvorec?', o: ['Štyri', 'Tri', 'Päť'], k: 0, w: 'Štvorec má štyri rohy a štyri rovnaké strany.' }, { q: 'Čo z toho je guľa?', o: ['Lopta', 'Kniha', 'Tanier'], k: 0, w: 'Lopta je guľa, môžeme ju chytiť do ruky.', l: 3 }] } },

/* =============================== 4. MLÁĎATÁ =============================== */
{
 id: 'ms-mladata', title: 'Zvieratá a ich mláďatá', aka: ['Domáce zvieratá', 'Mláďatá', 'Zvieratá na dvore', 'Na farme', 'Mama a mláďa'], subject: 'Materská škola', grade: 0, kind: 'porovnanie', rec: 'scene',
 why: 'Na dvore stojí každá mama so svojím mláďaťom. Deti porovnajú, čím sú si podobné, a naučia sa, ako sa mláďa volá.',
 alts: [['ttable', 'Keď chcete dvojice mama a mláďa usporiadať do tabuľky.'], ['cards', 'Na hru „kto je moja mama“.'], ['quiz', 'Na overenie mien mláďat.']],
 std: [], svpms: [S('Identifikuje rôznorodosť živočíšnej ríše.', `${CaP} · Živočíchy`), S('Rozpoznáva mláďatá vybraných živočíšnych druhov a pomenúva ich.', `${CaP} · Živočíchy`)],
 method: { goals: ['Dieťa pomenuje štyri domáce zvieratá a ich mláďatá.', 'Dieťa priradí mláďa k mame.', 'Dieťa napodobní hlas zvieraťa.'],
  plan: [['5 min', 'Hádanka podľa hlasu: kto robí bú, kot-kot, bé, kroch?'], ['10 min', 'Dvor na tabuli: mama a mláďa.'], ['10 min', 'Hra Kto je moja mama: deti hľadajú dvojice obrázkov.'], ['5 min', 'Pohybová hra: napodobňujeme zvieratá.']],
  ask: ['Čím je teliatko podobné krave a čím sa líši?', 'Čo potrebuje mláďa od mamy?'] },
 guide: { primer: 'Mláďatá domácich zvierat majú vlastné mená: krava má teľa, teda teliatko, sliepka má kuriatka, ovca má jahniatko a sviňa, v reči detí prasa, má prasiatka. Mláďatá cicavcov pijú mamino mlieko. Kuriatka sa liahnu z vajíčok a hneď chodia a zobú. Pri rozhovore sa držte pomenovaní, ktoré deti poznajú, a ďalšie pridávajte postupne.',
  steps: [
   { time: '5 min', do: 'Napodobnite hlas zvieraťa, deti hádajú.', say: 'Kto robí bú?', check: 'Deti priradia hlas k zvieraťu.' },
   { time: '10 min', do: 'Na tabuli ukazujte dvojice na dvore.', say: 'Kto je mama tohto malého? Ako sa volá mláďa?', check: 'Dieťa pomenuje aspoň dve mláďatá.' },
   { time: '10 min', do: 'Rozdajte obrázky mám a mláďat. Deti hľadajú svoju dvojicu podľa hlasu: mama volá, mláďa odpovedá.', check: 'Dvojice sa správne nájdu.' },
   { time: '5 min', do: 'Deti sa pohybujú ako zvieratá: kuriatka zobú, jahniatka skáču, prasiatka sa váľajú.', check: 'Deti napodobnia pohyb podľa pokynu.' }],
  traps: [['Kuriatko je mláďa kohúta.', 'Kuriatka sa liahnu z vajíčok, ktoré znesie sliepka. Kohút je otec.'], ['Mláďa vyzerá rovnako ako mama, len je menšie.', 'Niektoré mláďatá vyzerajú inak: kuriatko je žlté a páperisté, sliepka má perie.'], ['Všetky mláďatá pijú mlieko.', 'Mlieko pijú mláďatá cicavcov, napríklad teliatko a jahniatko. Kuriatka zobú zrno.']],
  qa: [['Prečo krava dáva mlieko?', 'Mlieko vzniká na kŕmenie teliatka. Ľudia kravy chovajú aj kvôli mlieku.'], ['Ako sa volá mláďa koňa?', 'Žriebä.']] },
 forms: {
  scene: { svg: (() => {
   const cow = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-55" y="20" width="14" height="50" fill="#5d4037"/><rect x="-25" y="20" width="14" height="50" fill="#5d4037"/><rect x="15" y="20" width="14" height="50" fill="#5d4037"/><rect x="40" y="20" width="14" height="50" fill="#5d4037"/><ellipse rx="75" ry="42" fill="#fafafa" stroke="#616161" stroke-width="4"/><ellipse cx="-30" cy="-8" rx="20" ry="14" fill="#3e2723"/><ellipse cx="20" cy="12" rx="16" ry="12" fill="#3e2723"/><g transform="translate(78 -28)"><ellipse rx="28" ry="24" fill="#fafafa" stroke="#616161" stroke-width="4"/><ellipse cx="10" cy="12" rx="18" ry="12" fill="#f8bbd0"/><circle cx="-6" cy="-6" r="4" fill="#212121"/><path d="M-16 -22l-10 -14M8 -22l8 -14" stroke="#bcaaa4" stroke-width="6" stroke-linecap="round"/></g></g>`;
   const sheep = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-35" y="15" width="12" height="45" fill="#424242"/><rect x="20" y="15" width="12" height="45" fill="#424242"/><g fill="#fff" stroke="#bdbdbd" stroke-width="3"><circle cx="-35" r="28"/><circle cx="0" cy="-12" r="32"/><circle cx="32" r="28"/><circle cx="0" cy="14" r="28"/></g><g transform="translate(60 -12)"><ellipse rx="20" ry="24" fill="#424242"/><circle cx="6" cy="-6" r="4" fill="#fff"/></g></g>`;
   const pig = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-40" y="18" width="14" height="36" fill="#f48fb1"/><rect x="25" y="18" width="14" height="36" fill="#f48fb1"/><ellipse rx="62" ry="40" fill="#f8bbd0" stroke="#ec407a" stroke-width="4"/><path d="M-62 -6q-22 -10 -12 -22q8 -8 0 -14" fill="none" stroke="#ec407a" stroke-width="5"/><g transform="translate(58 -8)"><circle r="28" fill="#f8bbd0" stroke="#ec407a" stroke-width="4"/><ellipse cx="18" cy="6" rx="12" ry="10" fill="#f48fb1"/><circle cx="15" cy="4" r="2.5" fill="#880e4f"/><circle cx="22" cy="4" r="2.5" fill="#880e4f"/><circle cx="-2" cy="-8" r="4" fill="#212121"/></g></g>`;
   const hen = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-8 26v22M8 26v22" stroke="#ff8f00" stroke-width="5"/><ellipse rx="38" ry="30" fill="#a1887f" stroke="#6d4c41" stroke-width="4"/><path d="M-36 -6q-22 -26 -8 -36q6 14 14 20" fill="#8d6e63"/><g transform="translate(30 -30)"><circle r="17" fill="#a1887f" stroke="#6d4c41" stroke-width="4"/><path d="M-8 -16q4 -14 8 -4q4 -12 8 2" fill="#e53935"/><path d="M14 -2l14 5-14 5z" fill="#ffb300"/><circle cx="4" cy="-4" r="3" fill="#212121"/></g></g>`;
   const chick = (x, y, d) => `<g transform="translate(${x} ${y})"><g><animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="0.9s" begin="${d}s" repeatCount="indefinite"/><circle r="15" fill="#ffee58" stroke="#f9a825" stroke-width="3"/><circle cx="12" cy="-14" r="10" fill="#ffee58" stroke="#f9a825" stroke-width="3"/><path d="M20 -14l9 3-9 3z" fill="#ff8f00"/><circle cx="14" cy="-17" r="2" fill="#212121"/></g></g>`;
   return `<svg viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="640" fill="#bfe6f7"/><rect y="330" width="1200" height="310" fill="#aed581"/><g transform="translate(1000 140)"><rect width="190" height="190" fill="#c62828"/><path d="M-15 0L95 -80L205 0z" fill="#8e2424"/><rect x="65" y="100" width="60" height="90" fill="#6d4c41"/></g><g stroke="#8d6e63" stroke-width="8"><path d="M0 345H980M0 375H980"/>${Array.from({ length: 13 }, (_, i) => `<path d="M${20 + i * 75} 320V395"/>`).join('')}</g>
${cow(150, 450, 1)}${cow(320, 475, 0.55)}
${hen(740, 460)}${chick(810, 510, 0)}${chick(860, 495, 0.3)}${chick(700, 520, 0.6)}
<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="2s" repeatCount="indefinite"/>${sheep(990, 470, 1)}</g><g><animateTransform attributeName="transform" type="translate" values="0 0;0 -18;0 0" dur="1.3s" repeatCount="indefinite"/>${sheep(1110, 560, 0.55)}</g>
${pig(470, 585, 0.8)}${pig(610, 600, 0.45)}</svg>`; })(),
   points: [
    { t: 'Krava a teľa', d: 'Mláďa kravy je teľa, láskavo teliatko. Pije mamino mlieko.', e: 'Krava a teliatko.', ic: 'people', x: 13, y: 57 },
    { t: 'Sliepka a kuriatka', d: 'Kuriatka sa liahnu z vajíčok. Sú žlté a páperisté a hneď zobú zrno.', e: 'Sliepka a kuriatka.', ic: 'star', x: 64, y: 58 },
    { t: 'Ovca a jahňa', d: 'Mláďa ovce je jahňa, láskavo jahniatko. Ovca má hustú vlnu.', e: 'Ovca a jahniatko.', ic: 'cloud', x: 86, y: 59 },
    { t: 'Sviňa a prasiatko', d: 'Mama prasiatok je sviňa. Deti jej často hovoria prasa. Prasiatka rady rýpu v blate.', e: 'Mama a prasiatko.', ic: 'people', x: 42, y: 80 }] },
  ttable: { a: 'Mama', b: 'Mláďa', rows: [[{ t: 'krava' }, { t: 'teľa, teliatko' }], [{ t: 'sliepka' }, { t: 'kura, kuriatko' }], [{ t: 'ovca' }, { t: 'jahňa, jahniatko' }], [{ t: 'sviňa' }, { t: 'prasiatko' }], [{ t: 'kobyla', l: 2 }, { t: 'žriebä', l: 2 }], [{ t: 'koza', l: 3 }, { t: 'kozľa, kozliatko', l: 3 }]] },
  cards: [{ q: 'Ako sa volá mláďa kravy?', a: 'Teľa, teliatko.' }, { q: 'Ako sa volá mláďa sliepky?', a: 'Kuriatko.' }, { q: 'Ako sa volá mláďa ovce?', a: 'Jahňa, jahniatko.' }, { q: 'Kto robí kot-kot-kodák?', a: 'Sliepka.' }, { q: 'Ako sa volá mláďa koňa?', a: 'Žriebä.', l: 2 }, { q: 'Z čoho sa liahnu kuriatka?', a: 'Z vajíčok.', l: 2 }],
  quiz: [{ q: 'Kto je mama teliatka?', o: ['Krava', 'Ovca', 'Sliepka'], k: 0, w: 'Teliatko je mláďa kravy.' }, { q: 'Ako sa volá mláďa ovce?', o: ['Jahniatko', 'Kuriatko', 'Šteniatko'], k: 0, w: 'Ovca má jahniatko.' }, { q: 'Kto sa liahne z vajíčka?', o: ['Kuriatko', 'Teliatko', 'Prasiatko'], k: 0, w: 'Kuriatka sa liahnu z vajíčok.' }, { q: 'Ako sa volá mláďa koňa?', o: ['Žriebä', 'Teľa', 'Kozľa'], k: 0, w: 'Mláďa koňa je žriebä.', l: 2 }] } },

/* =============================== 5. ULICA =============================== */
{
 id: 'ms-ulica', title: 'Bezpečne na ulici', aka: ['Dopravná výchova', 'Priechod pre chodcov', 'Semafor', 'Chodec', 'Cez cestu'], subject: 'Materská škola', grade: 0, kind: 'proces', rec: 'scene',
 why: 'Na obrázku je ulica s chodníkom, priechodom a semaforom pre chodcov. Auto prejde, keď majú chodci červenú, a potom ulica stíchne. Deti tak vidia, prečo čakáme.',
 alts: [['timeline', 'Keď nacvičujete postup krok za krokom: ako prejsť cez cestu.'], ['cards', 'Na otázky pred vychádzkou.'], ['quiz', 'Na overenie pravidiel.']],
 std: [], svpms: [S('Pozná nebezpečenstvá súvisiace s cestnou premávkou.', `${CaS} · Dopravná výchova`), S('Pozná a dodržiava základné pravidlá správania účastníkov cestnej premávky týkajúce sa chodcov.', `${CaS} · Dopravná výchova`), S('Pozná rôzne druhy dopravných prostriedkov.', `${CaS} · Dopravná výchova`), S('Pozná význam vybraných dopravných značiek.', `${CaS} · Dopravná výchova`)],
 method: { goals: ['Dieťa ukáže chodník a priechod pre chodcov.', 'Dieťa povie, čo znamená červený a zelený panáčik.', 'Dieťa predvedie, ako prejsť cez cestu s dospelým.'],
  plan: [['5 min', 'Rozhovor: kade chodíš do škôlky?'], ['10 min', 'Ulica na tabuli: chodník, priechod, semafor, značka.'], ['10 min', 'Nácvik v triede: priechod z papiera, semafor z dvoch kruhov.'], ['5 min', 'Zopakovanie postupu a reflexné prvky.']],
  ask: ['Prečo nevbiehame do cesty za loptou?', 'Prečo je dobré mať na sebe niečo, čo svieti v tme?'] },
 guide: { primer: 'Chodci chodia po chodníku. Cez cestu prechádzame na priechode pre chodcov, a ak je tam semafor, iba na zelenom panáčikovi. Malé deti chodia po ulici s dospelým a držia ho za ruku. Pred prechodom zastaneme na okraji, pozrieme vľavo, vpravo a znova vľavo, a keď nič nejde, prejdeme rovno a nebežíme. Aj na zelenú sa oplatí pozrieť, či auto naozaj zastavilo. V tme a v hmle nás vodiči lepšie uvidia, keď máme reflexné prvky.',
  steps: [
   { time: '5 min', do: 'Spýtajte sa, kade deti chodia do škôlky a čo cestou vidia.', say: 'Kde chodíme, keď ideme po ulici?', check: 'Deti spomenú chodník alebo priechod.' },
   { time: '10 min', do: 'Na tabuli ukazujte časti ulice. Pri semafore počkajte, kým sa panáčik zmení.', say: 'Môžeme ísť teraz? Prečo nie?', check: 'Deti správne povedia stoj pri červenom a choď pri zelenom.' },
   { time: '10 min', do: 'Na podlahe vytvorte priechod z pásov papiera. Jedno dieťa drží semafor, ostatní prechádzajú vo dvojiciach s „dospelým“.', check: 'Deti zastanú pri okraji a pozrú vľavo, vpravo, vľavo.' },
   { time: '5 min', do: 'Ukážte reflexnú vestu alebo pásik a posvieťte naň baterkou.', check: 'Deti povedia, prečo je dobré mať reflexné prvky.' }],
  traps: [['Na zelenú môžem bežať bez pozerania.', 'Aj na zelenú najprv pozrieme, či autá zastavili, a potom prejdeme pokojne, nebežíme.'], ['Keď vodiča vidím ja, vidí aj on mňa.', 'Vodič malé dieťa za autom alebo v tme často nevidí. Preto stojíme na okraji, kde nás vidno, a nosíme reflexné prvky.'], ['Za loptou môžem rýchlo vybehnúť.', 'Za loptou do cesty nikdy nevybiehame. Zavoláme dospelého.']],
  qa: [['Prečo má semafor pre chodcov len dve farby?', 'Chodcom stačí vedieť, či stáť alebo ísť. Semafor pre autá má tri farby.'], ['Čo je to reflexný prvok?', 'Pásik alebo vesta, ktorá sa v svetle áut rozžiari. Vodič nás tak uvidí zďaleka.']] },
 forms: {
  scene: { svg: `<svg viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="640" fill="#e3f2fd"/><g fill="#b0bec5"><rect x="40" y="90" width="160" height="230"/><rect x="230" y="40" width="140" height="280"/><rect x="900" y="70" width="170" height="250"/></g><g fill="#fff59d"><rect x="70" y="120" width="40" height="40"/><rect x="130" y="120" width="40" height="40"/><rect x="70" y="200" width="40" height="40"/><rect x="260" y="80" width="30" height="40"/><rect x="310" y="80" width="30" height="40"/><rect x="930" y="110" width="40" height="40"/><rect x="1000" y="110" width="40" height="40"/></g>
<rect y="320" width="1200" height="60" fill="#cfd8dc"/><rect y="380" width="1200" height="150" fill="#546e7a"/><rect y="530" width="1200" height="60" fill="#cfd8dc"/><rect y="590" width="1200" height="50" fill="#9ccc65"/><path d="M0 455H520M760 455H1200" stroke="#fff" stroke-width="6" stroke-dasharray="40 30"/>
<g fill="#fafafa">${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${545 + i * 34}" y="388" width="20" height="134"/>`).join('')}</g>
<g transform="translate(470 330)"><rect x="-4" y="-150" width="8" height="150" fill="#607d8b"/><rect x="-32" y="-210" width="64" height="64" fill="#1565c0" stroke="#fff" stroke-width="4"/><path d="M-22 -156L0 -200L22 -156z" fill="#fff"/><g stroke="#212121" stroke-width="3" stroke-linecap="round" fill="none"><circle cx="0" cy="-186" r="3.5" fill="#212121"/><path d="M0 -182v12M0 -176l-6 6M0 -176l6 4M0 -170l-6 9M0 -170l5 9"/></g><path d="M-18 -158h36" stroke="#212121" stroke-width="3" stroke-dasharray="5 3"/></g>
<g transform="translate(790 330)"><rect x="-5" y="-170" width="10" height="170" fill="#607d8b"/><rect x="-34" y="-290" width="68" height="128" rx="10" fill="#263238"/>
<g><animate attributeName="opacity" values="1;1;0.15;0.15" keyTimes="0;0.49;0.5;1" dur="8s" repeatCount="indefinite"/><circle cx="0" cy="-258" r="24" fill="#e53935"/><g fill="#fff"><circle cx="0" cy="-270" r="4"/><rect x="-5" y="-265" width="10" height="16" rx="3"/><rect x="-5" y="-250" width="4" height="12"/><rect x="1" y="-250" width="4" height="12"/></g></g>
<g><animate attributeName="opacity" values="0.15;0.15;1;1" keyTimes="0;0.49;0.5;1" dur="8s" repeatCount="indefinite"/><circle cx="0" cy="-194" r="24" fill="#43a047"/><g fill="#fff"><circle cx="2" cy="-207" r="4"/><path d="M-2 -202l6 0 3 12 -4 0 0 0z"/><path d="M-1 -190l-7 12M4 -190l6 11" stroke="#fff" stroke-width="4" stroke-linecap="round"/></g></g></g>
<g><animateTransform attributeName="transform" type="translate" values="-320 0;1500 0;1500 0" keyTimes="0;0.47;1" dur="8s" repeatCount="indefinite"/><g transform="translate(0 395)"><rect x="0" y="22" width="200" height="50" rx="16" fill="#e53935"/><path d="M40 22l25 -26h70l25 26z" fill="#ef5350"/><path d="M58 18l14 -16h26v16zM106 18v-16h26l14 16z" fill="#bbdefb"/><circle cx="50" cy="74" r="18" fill="#263238"/><circle cx="155" cy="74" r="18" fill="#263238"/><circle cx="194" cy="40" r="6" fill="#fff59d"/></g></g>
${person(870, 585, 210, '#5d4037', '#1e88e5', 'short', 0)}${person(930, 585, 120, '#ffb300', '#fdd835', 'long', 0)}<path d="M895 505q12 -6 22 2" stroke="#ffcc80" stroke-width="12" stroke-linecap="round" fill="none"/></svg>`,
   points: [
    { t: 'Chodník', d: 'Chodci chodia po chodníku, nie po ceste.', e: 'Chodíme po chodníku.', ic: 'people', x: 15, y: 54 },
    { t: 'Značka priechodu', d: 'Modrá značka s panáčikom hovorí: tu je priechod pre chodcov.', e: 'Tu je priechod.', ic: 'map', x: 39, y: 17, l: 2 },
    { t: 'Priechod pre chodcov', d: 'Biele pruhy na ceste. Tu prechádzame cez cestu.', e: 'Tu ideme cez cestu.', ic: 'map', x: 53, y: 70 },
    { t: 'Semafor pre chodcov', d: 'Červený panáčik: stojíme. Zelený panáčik: pozrieme sa a ideme.', e: 'Červená stoj, zelená choď.', ic: 'bolt', x: 72, y: 26 },
    { t: 'S dospelým za ruku', d: 'Dieťa čaká na okraji chodníka s dospelým a drží ho za ruku. Žltá vesta svieti, keď na ňu dopadne svetlo.', e: 'Držím sa za ruku.', ic: 'people', x: 75, y: 62 }] },
  timeline: { note: 'Postup, ako prejsť cez cestu s dospelým.', events: [
   { y: '1', t: 'Zastavím na okraji chodníka.', e: 'Zastavím.', ic: 'people' },
   { y: '2', t: 'Pozriem vľavo, vpravo a znova vľavo.', e: 'Pozriem sa.', ic: 'star' },
   { y: '3', t: 'Počúvam, či nejde auto.', e: 'Počúvam.', ic: 'bolt', l: 2 },
   { y: '4', t: 'Prejdem, až keď autá stoja alebo nič nejde. Pri semafore len na zelenú. Idem rovno a nebežím.', e: 'Idem pomaly.', ic: 'map' }] },
  cards: [{ q: 'Kde chodíme po ulici?', a: 'Po chodníku.' }, { q: 'Kde prechádzame cez cestu?', a: 'Na priechode pre chodcov.' }, { q: 'Čo znamená červený panáčik?', a: 'Stojíme a čakáme.' }, { q: 'Čo znamená zelený panáčik?', a: 'Pozrieme sa a ideme.' }, { q: 'Kam sa pozrieme pred prechodom?', a: 'Vľavo, vpravo a znova vľavo.', l: 2 }, { q: 'Prečo nosíme reflexné prvky?', a: 'Aby nás vodiči videli v tme.', l: 2 }, { q: 'Vymenuj dopravné prostriedky.', a: 'Auto, autobus, električka, bicykel, vlak.', l: 3 }],
  quiz: [{ q: 'Kde prechádzame cez cestu?', o: ['Na priechode pre chodcov', 'Hocikde', 'Medzi autami'], k: 0, w: 'Priechod má biele pruhy a vodiči na ňom dávajú pozor.' }, { q: 'Čo robíme pri červenom panáčikovi?', o: ['Stojíme', 'Bežíme', 'Skáčeme'], k: 0, w: 'Červená znamená stoj.' }, { q: 'Lopta sa kotúľa na cestu. Čo urobíš?', o: ['Zavolám dospelého', 'Vybehnem za ňou', 'Kopnem ju ďalej'], k: 0, w: 'Za loptou do cesty nevybiehame.' }, { q: 'Čo nám pomôže, aby nás vodič videl v tme?', o: ['Reflexná vesta', 'Čierna bunda', 'Slnečné okuliare'], k: 0, w: 'Reflexné prvky sa vo svetle áut rozžiaria.', l: 2 }] } },

/* =============================== 6. UMÝVAME RUKY =============================== */
{
 id: 'ms-ruky', title: 'Umývame si ruky', aka: ['Hygiena', 'Umývanie rúk', 'Čisté ruky', 'Mydlo a voda', 'Hygienické návyky'], subject: 'Materská škola', grade: 0, kind: 'proces', rec: 'timeline',
 why: 'Umývanie rúk je postup, ktorý sa opakuje každý deň v rovnakom poradí. Kroky za sebou si deti zapamätajú a pri umývadle ich nájdu na obrázkoch.',
 alts: [['scene', 'Keď chcete ukázať umývadlo, mydlo a uterák.'], ['mind', 'Keď sa rozprávate, kedy si ruky umývame.'], ['cards', 'Na otázky pri umývadle.']],
 std: [], svpms: [S('Má osvojené základné hygienické návyky (použitie toalety a toaletného papiera, umývanie rúk po použití toalety, umývanie rúk pred jedlom a po zašpinení sa atď.).', `${ZaP} · Hygiena a sebaobslužné činnosti`), S('Ovláda základné sebaobslužné činnosti.', `${ZaP} · Hygiena a sebaobslužné činnosti`)],
 method: { goals: ['Dieťa si umyje ruky v správnom poradí krokov.', 'Dieťa povie, kedy si ruky umývame.', 'Dieťa vysvetlí, prečo používame mydlo.'],
  plan: [['5 min', 'Pokus s trblietkami: „mikróby“ prejdú z ruky na ruku.'], ['10 min', 'Kroky umývania na tabuli.'], ['10 min', 'Umývanie pri umývadle podľa krokov.'], ['5 min', 'Kedy si umývame ruky? Rozhovor a kartičky.']],
  ask: ['Prečo nestačí ruky iba opláchnuť vodou?', 'Prečo má každý svoj uterák?'] },
 guide: { primer: 'Na rukách máme drobné mikróby, ktoré nevidíme. Mydlo a trenie ich z rúk uvoľnia a voda ich spláchne. Postup: namočiť ruky, namydliť, trieť dlane, chrbty rúk, medzi prstami, palce a končeky prstov, opláchnuť a utrieť do vlastného uteráka. Trieme dosť dlho, napríklad kým pomaly napočítame do dvadsať. Ruky si umývame pred jedlom, po použití toalety, po hre vonku, po smrkaní a po pohladkaní zvieraťa.',
  steps: [
   { time: '5 min', do: 'Jednému dieťaťu nasypte na dlaň trochu trblietok. Podá ruku kamarátovi, ten ďalšiemu.', say: 'Pozrite, kam všade sa „mikróby“ dostali.', check: 'Deti si všimnú, že sa trblietky prenášajú.' },
   { time: '10 min', do: 'Na tabuli prejdite kroky. Deti ich naprázdno predvádzajú rukami.', say: 'Čo urobíme po namydlení?', check: 'Deti zopakujú poradie krokov.' },
   { time: '10 min', do: 'Pri umývadle si deti umývajú ruky po skupinkách. Spolu pomaly počítajte do dvadsať pri trení.', check: 'Deti trú aj medzi prstami a palce.' },
   { time: '5 min', do: 'Ukazujte kartičky so situáciami: obed, toaleta, záhrada, smrkanie.', say: 'Treba si teraz umyť ruky?', check: 'Deti správne vyberú situácie.' }],
  traps: [['Ruky sú čisté, keď nevidno špinu.', 'Mikróby sú také malé, že ich nevidíme. Preto si ruky umývame aj vtedy, keď vyzerajú čisto.'], ['Stačí ruky opláchnuť.', 'Bez mydla a trenia zostane na rukách veľa mikróbov.'], ['Ruky si utrieme do nohavíc.', 'Ruky utrieme do vlastného uteráka. Na mokrých rukách sa mikróby šíria ľahšie.']],
  qa: [['Čo sú mikróby?', 'Veľmi malé živé tvory, ktoré nevidíme. Niektoré nám môžu spôsobiť chorobu.'], ['Prečo kýchame do lakťa?', 'Aby sme kvapôčky s mikróbmi nepreniesli na ruky a ďalej na hračky.']] },
 forms: {
  timeline: { note: 'Kroky umývania rúk.', events: [
   { y: '1', t: 'Namočím si ruky vodou.', e: 'Voda.', ic: 'drop' },
   { y: '2', t: 'Namydlím si ruky.', e: 'Mydlo.', ic: 'cell' },
   { y: '3', t: 'Triem dlane, chrbty rúk a medzi prstami.', e: 'Triem ruky.', ic: 'people' },
   { y: '4', t: 'Triem palce a končeky prstov. Počítam do dvadsať.', e: 'Počítam.', ic: 'star', l: 2 },
   { y: '5', t: 'Opláchnem mydlo vodou.', e: 'Opláchnem.', ic: 'drop' },
   { y: '6', t: 'Utriem si ruky do svojho uteráka.', e: 'Utriem.', ic: 'sun' }] },
  scene: { svg: `<svg viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="640" fill="#e0f7fa"/><g fill="#b2ebf2">${Array.from({ length: 10 }, (_, i) => `<rect x="${i * 120}" y="0" width="118" height="118"/><rect x="${i * 120 + 60}" y="120" width="118" height="118"/>`).join('')}</g>
<rect x="120" y="360" width="520" height="40" rx="12" fill="#eceff1" stroke="#90a4ae" stroke-width="4"/><path d="M150 400h460l-50 120h-360z" fill="#fafafa" stroke="#90a4ae" stroke-width="4"/>
<g fill="#90a4ae"><rect x="250" y="250" width="26" height="110"/><path d="M250 250h110a20 20 0 0 1 20 20v20h-30v-10h-100z"/></g>
<g fill="#4fc3f7">${[0, 1, 2, 3].map(i => `<ellipse cx="${360 + (i % 2) * 6}" cy="300" rx="7" ry="11"><animate attributeName="cy" values="300;380" dur="0.6s" begin="${(i * 0.15).toFixed(2)}s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0.3" dur="0.6s" begin="${(i * 0.15).toFixed(2)}s" repeatCount="indefinite"/></ellipse>`).join('')}</g>
<g transform="translate(520 345)"><rect x="-45" y="-22" width="90" height="34" rx="16" fill="#f48fb1" stroke="#ec407a" stroke-width="4"/></g>
<g><animateTransform attributeName="transform" type="translate" values="0 0;10 -6;0 0;-10 6;0 0" dur="1s" repeatCount="indefinite"/><g transform="translate(770 380)"><ellipse rx="60" ry="80" fill="#ffcc80" transform="rotate(-25)"/><ellipse cx="60" cy="10" rx="60" ry="80" fill="#ffb74d" transform="rotate(25 60 10)"/></g></g>
<g fill="#fff" stroke="#81d4fa" stroke-width="3">${[[740, 300], [800, 290], [850, 330], [700, 360], [830, 260]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${10 + (i % 3) * 5}"><animate attributeName="cy" values="${y};${y - 120}" dur="2.4s" begin="${(i * 0.45).toFixed(2)}s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="2.4s" begin="${(i * 0.45).toFixed(2)}s" repeatCount="indefinite"/></circle>`).join('')}</g>
<g transform="translate(1030 230)"><rect x="-70" y="-10" width="140" height="12" rx="6" fill="#8d6e63"/><path d="M-55 2h110v220a10 10 0 0 1 -10 10h-90a10 10 0 0 1 -10 -10z" fill="#ffb74d"/><path d="M-55 190h110M-55 205h110" stroke="#fff3e0" stroke-width="6"/><circle cx="0" cy="40" r="16" fill="#fff3e0"/></g></svg>`,
   points: [
    { t: 'Voda', d: 'Najprv si ruky namočíme.', e: 'Voda.', ic: 'drop', x: 30, y: 42 },
    { t: 'Mydlo', d: 'Namydlíme si ruky. Mydlo uvoľní nečistoty.', e: 'Mydlo.', ic: 'cell', x: 43, y: 63 },
    { t: 'Trieme ruky', d: 'Trieme dlane, chrbty rúk, medzi prstami a palce. Vznikajú bublinky.', e: 'Triem ruky.', ic: 'people', x: 67, y: 82 },
    { t: 'Vlastný uterák', d: 'Ruky si utrieme do svojho uteráka.', e: 'Môj uterák.', ic: 'sun', x: 86, y: 58 }] },
  mind: { center: 'Kedy si umývam ruky?', branches: [
   { t: 'Pred jedlom', ic: 'plant', kids: [{ t: 'pred desiatou' }, { t: 'pred obedom' }] },
   { t: 'Po toalete', ic: 'drop', kids: [{ t: 'po použití toalety' }] },
   { t: 'Po hre vonku', ic: 'sun', kids: [{ t: 'po pieskovisku' }, { t: 'po pohladkaní zvieraťa', l: 2 }] },
   { t: 'Keď som chorý', ic: 'cross', l: 2, kids: [{ t: 'po smrkaní', l: 2 }, { t: 'po kýchnutí do dlane', l: 2 }] }] },
  cards: [{ q: 'Čím si umývame ruky?', a: 'Mydlom a vodou.' }, { q: 'Čo urobíme po namydlení?', a: 'Trieme ruky aj medzi prstami.' }, { q: 'Kedy si umývame ruky?', a: 'Pred jedlom, po toalete, po hre vonku.' }, { q: 'Do čoho si utrieme ruky?', a: 'Do svojho uteráka.' }, { q: 'Ako dlho trieme ruky?', a: 'Kým pomaly napočítame do dvadsať.', l: 2 }, { q: 'Prečo používame mydlo?', a: 'Mydlo a trenie uvoľnia nečistoty a mikróby a voda ich spláchne.', l: 3 }],
  quiz: [{ q: 'Čo patrí k umývaniu rúk?', o: ['Mydlo', 'Hrebeň', 'Pastelka'], k: 0, w: 'Mydlo pomáha ruky vyčistiť.' }, { q: 'Kedy si umyjeme ruky?', o: ['Pred obedom', 'Keď si prezeráme knihu', 'Keď kreslíme'], k: 0, w: 'Pred jedlom si ruky umývame.' }, { q: 'Čo urobíme na konci?', o: ['Utrieme si ruky', 'Namydlíme si ruky', 'Namočíme si ruky'], k: 0, w: 'Najprv voda a mydlo, nakoniec uterák.' }, { q: 'Kde sa schovávajú mikróby?', o: ['Medzi prstami a pod nechtami', 'Len na lakťoch', 'Nikde'], k: 0, w: 'Preto trieme aj medzi prstami.', l: 2 }] } },

/* =============================== 7. OVOCIE A ZELENINA =============================== */
{
 id: 'ms-ovocie-zelenina', title: 'Ovocie a zelenina', aka: ['Ovocie', 'Zelenina', 'Zdravé jedlo', 'Záhrada', 'Zdravá výživa'], subject: 'Materská škola', grade: 0, kind: 'porovnanie', rec: 'scene',
 why: 'V záhrade deti vidia, kde čo rastie: jablko na strome, jahody pri zemi, mrkva v zemi a kapusta na hriadke. Potom ich roztriedia na ovocie a zeleninu.',
 alts: [['ttable', 'Keď deti triedia ovocie a zeleninu do dvoch skupín.'], ['cards', 'Na hádanie podľa chuti a hmatu.'], ['quiz', 'Na overenie.']],
 std: [], svpms: [S('Rozpozná rôzne druhy ovocia a zeleniny a uvedomí si význam ich konzumácie pre správnu životosprávu.', `${CaP} · Rastliny`), S('Uvádza príklady zdravej a nezdravej výživy.', `${ZaP} · Zdravie a zdravý životný štýl`)],
 method: { goals: ['Dieťa pomenuje päť druhov ovocia a zeleniny.', 'Dieťa roztriedi obrázky na ovocie a zeleninu.', 'Dieťa povie, prečo je dobré jesť ovocie a zeleninu.'],
  plan: [['5 min', 'Kúzelné vrecko: hmatom hádame ovocie a zeleninu.'], ['10 min', 'Záhrada na tabuli: kde čo rastie?'], ['10 min', 'Triedenie do dvoch košíkov: ovocie a zelenina.'], ['5 min', 'Ochutnávka a rozhovor o zdravej desiate.']],
  ask: ['Ktorá zelenina rastie v zemi?', 'Prečo je jablko lepšia desiata ako cukrík?'] },
 guide: { primer: 'Ovocie sú zvyčajne sladké alebo kyslasté plody, napríklad jablko, hruška, slivka, jahody či banán. Zelenina sú jedlé časti rastlín, ktoré často pripravujeme ako jedlo: koreň mrkvy, listy kapusty a šalátu, cibuľa. Niektoré rastú na strome, iné pri zemi a niektoré v zemi. Ovocie a zelenina obsahujú vitamíny a vlákninu, preto je dobré jesť ich každý deň. Pozor, delenie na ovocie a zeleninu je kuchynské. Pri paradajke alebo uhorke ho radšej s deťmi nerozoberajte do hĺbky.',
  steps: [
   { time: '5 min', do: 'Do vrecka dajte jablko, mrkvu, banán a cibuľu. Dieťa hmatom hádá.', say: 'Je to hladké alebo drsné? Okrúhle alebo dlhé?', check: 'Dieťa uhádne aspoň jednu vec.' },
   { time: '10 min', do: 'Na tabuli ukazujte záhradu.', say: 'Kde rastie mrkva? Vidíme ju nad zemou?', check: 'Deti povedia, že mrkva rastie v zemi.' },
   { time: '10 min', do: 'Deti triedia obrázky alebo skutočné kúsky do dvoch košíkov.', check: 'Väčšina vecí je v správnom košíku.' },
   { time: '5 min', do: 'Ochutnajte kúsky jablka a mrkvy. Porozprávajte sa o zdravej desiate.', say: 'Čo si dáš na desiatu, keď chceš mať veľa sily?', check: 'Deti uvedú aspoň jeden zdravý príklad.' }],
  traps: [['Ovocie je sladké a zelenina nie.', 'Mrkva je sladkastá a citrón je kyslý. Podľa chuti sa ovocie a zelenina rozlíšiť nedajú.'], ['Všetko ovocie rastie na stromoch.', 'Jahody rastú nízko pri zemi, maliny na kríkoch.'], ['Zemiak je ovocie, lebo rastie v zemi ako mrkva.', 'Zemiak nie je ovocie. Ako jedlo ho dávame k zelenine alebo prílohám.']],
  qa: [['Prečo má jablko jadierka?', 'Z jadierok môže vyrásť nová jabloň.'], ['Prečo jeme ovocie a zeleninu?', 'Majú vitamíny, ktoré nám pomáhajú byť zdraví a mať silu.']] },
 forms: {
  scene: { svg: `<svg viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="640" fill="#e1f5fe"/><rect y="420" width="1200" height="220" fill="#8d6e63"/><rect y="400" width="1200" height="30" fill="#7cb342"/>
<rect x="160" y="200" width="30" height="210" fill="#6d4c41"/><circle cx="175" cy="170" r="120" fill="#66bb6a"/><circle cx="90" cy="210" r="70" fill="#66bb6a"/><circle cx="260" cy="210" r="70" fill="#66bb6a"/>
<g fill="#e53935">${[[120, 150], [210, 120], [250, 220], [140, 240], [190, 200]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="16"/>`).join('')}</g><g><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 175;0 175" keyTimes="0;0.6;0.8;1" dur="5s" repeatCount="indefinite"/><circle cx="80" cy="230" r="16" fill="#e53935"/></g>
<g transform="translate(430 400)">${[0, 1, 2, 3].map(i => `<g transform="translate(${i * 70} 0)"><path d="M0 0q-25 -30 -5 -40q15 10 5 40zM0 0q25 -30 5 -40q-15 10 -5 40z" fill="#43a047"/><path d="M0 2q-14 2 -14 16q0 14 14 22q14 -8 14 -22q0 -14 -14 -16z" fill="#e53935"/></g>`).join('')}</g>
<g transform="translate(740 420)">${[0, 1, 2].map(i => `<g transform="translate(${i * 90} 0)"><path d="M0 0q-20 -50 -6 -60M0 0q0 -55 8 -62M0 0q20 -45 12 -58" stroke="#43a047" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M-16 2h32l-12 110q-4 10 -8 0z" fill="#fb8c00"/></g>`).join('')}</g>
<g transform="translate(1080 380)"><circle r="56" fill="#9ccc65"/><path d="M-40 -10q40 -50 80 0M-46 14q46 -40 92 0" stroke="#689f38" stroke-width="6" fill="none"/><circle r="26" fill="#c5e1a5"/></g>
<g><animateMotion path="M560 160c80 -60 160 40 240 -20s140 20 180 -30c-60 60 -260 120 -420 50z" dur="9s" repeatCount="indefinite"/><g><path d="M0 0c-22 -26 -40 -6 -24 10c-14 8 -6 26 24 -10zM0 0c22 -26 40 -6 24 10c14 8 6 26 -24 -10z" fill="#ffb300"><animateTransform attributeName="transform" type="scale" values="1 1;0.4 1;1 1" dur="0.35s" repeatCount="indefinite"/></path></g></g></svg>`,
   points: [
    { t: 'Jablko', d: 'Ovocie. Rastie na jabloni. Keď dozreje, môže spadnúť na zem.', e: 'Jablko rastie na strome.', ic: 'plant', x: 15, y: 13 },
    { t: 'Jahody', d: 'Ovocie. Rastú nízko pri zemi a sú sladké.', e: 'Jahody sú pri zemi.', ic: 'plant', x: 46, y: 52 },
    { t: 'Mrkva', d: 'Zelenina. Jeme jej koreň, ktorý rastie v zemi. Nad zemou sú len listy.', e: 'Mrkva je v zemi.', ic: 'plant', x: 70, y: 90 },
    { t: 'Kapusta', d: 'Zelenina. Jeme jej listy, ktoré sú zbalené do hlávky.', e: 'Kapusta má listy.', ic: 'plant', x: 90, y: 47 }] },
  ttable: { a: 'Ovocie', b: 'Zelenina', rows: [[{ t: 'jablko' }, { t: 'mrkva' }], [{ t: 'hruška' }, { t: 'kapusta' }], [{ t: 'jahody' }, { t: 'cibuľa' }], [{ t: 'slivka', l: 2 }, { t: 'šalát', l: 2 }], [{ t: 'čerešne', l: 3 }, { t: 'kaleráb', l: 3 }]] },
  cards: [{ q: 'Kde rastie jablko?', a: 'Na strome, na jabloni.' }, { q: 'Kde rastie mrkva?', a: 'V zemi.' }, { q: 'Vymenuj tri druhy ovocia.', a: 'Napríklad jablko, hruška, banán.' }, { q: 'Vymenuj tri druhy zeleniny.', a: 'Napríklad mrkva, kapusta, cibuľa.' }, { q: 'Čo je zdravšia desiata: jablko alebo cukrík?', a: 'Jablko.', l: 2 }, { q: 'Čo z kapusty jeme?', a: 'Listy.', l: 3 }],
  quiz: [{ q: 'Čo je ovocie?', o: ['Jablko', 'Mrkva', 'Cibuľa'], k: 0, w: 'Jablko je ovocie, rastie na strome.' }, { q: 'Čo rastie v zemi?', o: ['Mrkva', 'Jablko', 'Čerešne'], k: 0, w: 'Mrkve jeme koreň, ktorý je v zemi.' }, { q: 'Čo je zdravá desiata?', o: ['Jablko a chlieb', 'Cukríky', 'Čipsy'], k: 0, w: 'Ovocie a pečivo nám dajú silu.' }, { q: 'Čo z toho je zelenina?', o: ['Kapusta', 'Hruška', 'Jahody'], k: 0, w: 'Kapusta je zelenina, jeme jej listy.', l: 2 }] } },

/* =============================== 8. RODINA =============================== */
{
 id: 'ms-rodina', title: 'Moja rodina', aka: ['Rodina', 'Členovia rodiny', 'Mama a otec', 'Starí rodičia', 'Súrodenci'], subject: 'Materská škola', grade: 0, kind: 'hierarchia', rec: 'scene',
 why: 'Na obrázku sa celá rodina stretla pri dome. Deti pomenujú, kto je kto, a postupne pochopia, že maminu mamu voláme babka.',
 alts: [['tree', 'Pre predškolákov: kto patrí ku komu v rodine.'], ['cards', 'Na otázky o vlastnej rodine.'], ['quiz', 'Na príbuzenské vzťahy.']],
 std: [], svpms: [S('Vymenuje členov blízkej rodiny, identifikuje príbuzenské vzťahy v blízkej rodine.', `${CaS} · Ľudia v blízkom a širšom okolí`)],
 method: { goals: ['Dieťa vymenuje členov svojej blízkej rodiny.', 'Dieťa pomenuje babku, dedka, mamu, otca, brata a sestru.', 'Dieťa povie, kto je maminou alebo otcovou mamou.'],
  plan: [['5 min', 'Rozhovor: kto býva s tebou doma?'], ['10 min', 'Rodina na tabuli.'], ['10 min', 'Kreslenie mojej rodiny.'], ['5 min', 'Hra na rodinu s bábkami.']],
  ask: ['Čo rád robíš so svojou rodinou?', 'Ako voláš mamu svojej mamy?'] },
 guide: { primer: 'Blízku rodinu tvoria rodičia, súrodenci a starí rodičia. Mamina alebo otcova mama je babka, ich otec je dedko. Rodiny sú rôzne: niektoré deti žijú s jedným rodičom, so starými rodičmi alebo v pestúnskej rodine. Rozhovor veďte tak, aby každé dieťa mohlo hovoriť o svojej rodine, ako ju samo vníma, a nikoho nenúťte. Obrázok ukazuje jednu z mnohých podôb rodiny.',
  steps: [
   { time: '5 min', do: 'V kruhu sa spýtajte, kto býva s dieťaťom doma. Nechajte deti hovoriť dobrovoľne.', say: 'Kto ťa ráno budí?', check: 'Deti spomenú aspoň jedného člena rodiny.' },
   { time: '10 min', do: 'Na tabuli ukazujte jednotlivých členov rodiny.', say: 'Kto je mama tejto mamy?', check: 'Deti pomenujú babku a dedka.' },
   { time: '10 min', do: 'Deti kreslia svoju rodinu. Pri kresbe sa pýtajte, kto je kto.', check: 'Dieťa pomenuje ľudí na svojej kresbe.' },
   { time: '5 min', do: 'Hra s bábkami: deti hrajú rodinu pri obede.', check: 'Deti používajú slová mama, otec, babka, dedko, brat, sestra.' }],
  traps: [['Každá rodina má mamu, otca a deti.', 'Rodiny sú rôzne. Rodinu tvoria ľudia, ktorí sa o seba starajú a majú sa radi.'], ['Babka je každá stará pani.', 'Babka je mama mojej mamy alebo môjho otca. Iným starším ľuďom tak hovoríme len zo zdvorilosti.'], ['Brat musí byť starší.', 'Brat aj sestra môžu byť starší alebo mladší.']],
  qa: [['Prečo mám dve babky?', 'Jedna je mamina mama a druhá je otcova mama.'], ['Je pes tiež rodina?', 'Pre veľa ľudí áno, patrí k domácnosti. Príbuzný však nie je.']] },
 forms: {
  scene: { svg: `<svg viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="640" fill="#fff3e0"/><rect y="520" width="1200" height="120" fill="#a5d6a7"/><g transform="translate(860 140)"><rect width="300" height="380" fill="#ffccbc"/><path d="M-30 0L150 -110L330 0z" fill="#d84315"/><rect x="40" y="60" width="80" height="80" fill="#bbdefb" stroke="#fff" stroke-width="6"/><rect x="180" y="60" width="80" height="80" fill="#bbdefb" stroke="#fff" stroke-width="6"/><rect x="115" y="230" width="70" height="150" fill="#8d6e63"/></g>
<g transform="translate(80 120)"><circle r="45" fill="#ffd54f"><animate attributeName="r" values="42;48;42" dur="4s" repeatCount="indefinite"/></circle></g>
${person(120, 560, 270, '#bdbdbd', '#8e24aa', 'bun', 0)}${person(230, 560, 285, '#9e9e9e', '#6d4c41', 'bald', 0)}
${person(380, 560, 300, '#6d4c41', '#e53935', 'long', 1)}${person(500, 560, 320, '#3e2723', '#1e88e5', 'short', 0)}
${person(620, 560, 170, '#ffb300', '#43a047', 'short', 1)}${person(710, 560, 130, '#6d4c41', '#ec407a', 'long', 0)}
<g transform="translate(800 560)"><ellipse cx="0" cy="-30" rx="40" ry="22" fill="#a1887f"/><circle cx="36" cy="-50" r="18" fill="#a1887f"/><path d="M44 -66l6 -12 4 14z" fill="#6d4c41"/><circle cx="42" cy="-52" r="3" fill="#212121"/><path d="M-30 -10v10M-12 -10v10M12 -10v10M28 -10v10" stroke="#6d4c41" stroke-width="6"/><g><animateTransform attributeName="transform" type="rotate" values="-20 -40 -38;25 -40 -38;-20 -40 -38" dur="0.5s" repeatCount="indefinite"/><path d="M-40 -38q-24 -8 -30 -28" stroke="#a1887f" stroke-width="8" fill="none" stroke-linecap="round"/></g></g></svg>`,
   points: [
    { t: 'Babka a dedko', d: 'Starí rodičia. Babka je mamina alebo otcova mama, dedko je ich otec.', e: 'Babka a dedko.', ic: 'people', x: 15, y: 34 },
    { t: 'Mama', d: 'Mama sa stará o deti. Na obrázku máva.', e: 'Mama.', ic: 'people', x: 32, y: 28 },
    { t: 'Otec', d: 'Otec sa stará o deti. Hovoríme mu aj ocko alebo tato.', e: 'Otec.', ic: 'people', x: 42, y: 22 },
    { t: 'Brat a sestra', d: 'Súrodenci. Brat je chlapec, sestra je dievča. Môžu byť starší aj mladší.', e: 'Brat a sestra.', ic: 'people', x: 55, y: 54 },
    { t: 'Domáci miláčik', d: 'Pes patrí k domácnosti. Rodina sa oň stará.', e: 'Psík.', ic: 'star', x: 69, y: 76, l: 2 }] },
  tree: { root: { t: 'Moja rodina', kids: [
   { t: 'Starí rodičia', kids: [{ t: 'babka' }, { t: 'dedko' }] },
   { t: 'Rodičia', kids: [{ t: 'mama' }, { t: 'otec' }] },
   { t: 'Deti', kids: [{ t: 'ja' }, { t: 'brat', l: 2 }, { t: 'sestra', l: 2 }] }] } },
  cards: [{ q: 'Kto býva s tebou doma?', a: 'Každá rodina je iná. Povedz o tej svojej.' }, { q: 'Ako voláš maminu mamu?', a: 'Babka.' }, { q: 'Ako voláš otcovho otca?', a: 'Dedko.' }, { q: 'Máš brata alebo sestru?', a: 'Brat a sestra sú súrodenci. Povedz, ako sa volajú.' }, { q: 'Čo rád robíš so svojou rodinou?', a: 'Rozprávanie dieťaťa.', l: 2 }, { q: 'Prečo môžeš mať dve babky?', a: 'Jedna je mamina mama, druhá otcova mama.', l: 3 }],
  quiz: [{ q: 'Ako voláme maminu mamu?', o: ['Babka', 'Sestra', 'Teta'], k: 0, w: 'Mamina mama je moja babka.' }, { q: 'Kto je brat?', o: ['Chlapec, súrodenec', 'Dedko', 'Kamarát zo škôlky'], k: 0, w: 'Brat je môj súrodenec.' }, { q: 'Kto sú starí rodičia?', o: ['Babka a dedko', 'Mama a otec', 'Brat a sestra'], k: 0, w: 'Starí rodičia sú rodičia mojej mamy alebo otca.' }, { q: 'Ako voláme otcovho otca?', o: ['Dedko', 'Strýko', 'Brat'], k: 0, w: 'Otcov otec je dedko.', l: 2 }] } },

/* =============================== 9. FARBY =============================== */
{
 id: 'ms-farby', title: 'Farby a miešanie farieb', aka: ['Farby', 'Miešanie farieb', 'Základné farby', 'Zmiešané farby', 'Maľujeme'], subject: 'Materská škola', grade: 0, kind: 'porovnanie', rec: 'scene',
 why: 'Tri kruhy sa na obrázku prekrývajú a tam, kde sa stretnú, vznikne nová farba. Deti tak vidia miešanie farieb skôr, než ho samy vyskúšajú štetcom.',
 alts: [['ttable', 'Keď zapisujete, čo s čím zmiešame a čo vznikne.'], ['cards', 'Na pokusy pri maľovaní.'], ['quiz', 'Na overenie.']],
 std: [], svpms: [S('Pomenuje základné a zmiešané farby.', `${UaK} · Výtvarná výchova`), S('Ovláda základy miešania farieb.', `${UaK} · Výtvarná výchova`), S('Farbami vyjadruje pocity.', `${UaK} · Výtvarná výchova`)],
 method: { goals: ['Dieťa pomenuje červenú, žltú, modrú, oranžovú, zelenú a fialovú.', 'Dieťa zmieša dve farby a povie, čo vzniklo.', 'Dieťa vyberie farbu podľa nálady.'],
  plan: [['5 min', 'Hľadanie farieb v triede.'], ['10 min', 'Kruhy na tabuli: kde sa farby stretnú?'], ['10 min', 'Miešanie temperami na palete.'], ['5 min', 'Akú farbu má dnes moja nálada?']],
  ask: ['Čo vznikne, keď zmiešame žltú a modrú?', 'Akou farbou by si namaľoval radosť?'] },
 guide: { primer: 'V materskej škole pracujeme so základnými farbami červenou, žltou a modrou. Zmiešaním dvoch z nich vzniknú zmiešané farby: červená a žltá dajú oranžovú, žltá a modrá zelenú, červená a modrá fialovú. Výsledok závisí od konkrétnych farieb a od množstva, preto s deťmi skúšajte: viac žltej dá svetlejšiu zelenú. Ak zmiešame všetky tri, vznikne tmavá, hnedastá farba.',
  steps: [
   { time: '5 min', do: 'Deti hľadajú v triede niečo červené, žlté a modré.', say: 'Prines mi niečo modré.', check: 'Dieťa nájde vec správnej farby.' },
   { time: '10 min', do: 'Na tabuli ukazujte kruhy a miesta, kde sa prekrývajú.', say: 'Kde sa stretla žltá s modrou? Akú farbu vidíš?', check: 'Deti pomenujú oranžovú, zelenú a fialovú.' },
   { time: '10 min', do: 'Deti na palete miešajú dve farby a výsledok namaľujú na papier.', check: 'Dieťa povie, z čoho svoju farbu zmiešalo.' },
   { time: '5 min', do: 'Každé dieťa vyberie farbu podľa svojej nálady a ukáže ju.', say: 'Prečo si vybral práve túto farbu?', check: 'Dieťa spojí farbu s pocitom.' }],
  traps: [['Zmiešaním vždy vznikne pekná farba.', 'Keď zmiešame veľa farieb naraz, vznikne tmavá, hnedastá farba.'], ['Zelená je základná farba.', 'Pri maľovaní ju vieme namiešať zo žltej a modrej, preto je zmiešaná.'], ['Biela sa mieša ako ostatné.', 'Bielou farbu zosvetlíme a čiernou stmavíme. S deťmi to skúšajte samostatne.']],
  qa: [['Prečo je tráva zelená?', 'Listy a tráva majú zelené farbivo, ktoré rastlinám pomáha rásť zo slnečného svetla.'], ['Ako vznikne ružová?', 'Keď do červenej pridáme bielu.']] },
 forms: {
  scene: { svg: `<svg viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="fA"><circle cx="520" cy="250" r="150"/></clipPath><clipPath id="fB"><circle cx="680" cy="250" r="150"/></clipPath><clipPath id="fC"><circle cx="600" cy="390" r="150"/></clipPath></defs><rect width="1200" height="640" fill="#fffdf7"/>
<circle cx="520" cy="250" r="150" fill="#e53935"/><circle cx="680" cy="250" r="150" fill="#fdd835"/><circle cx="600" cy="390" r="150" fill="#1e88e5"/>
<g clip-path="url(#fA)"><circle cx="680" cy="250" r="150" fill="#fb8c00"><animate attributeName="opacity" values="0;1;1;1" keyTimes="0;0.15;0.9;1" dur="9s" repeatCount="indefinite"/></circle></g>
<g clip-path="url(#fB)"><circle cx="600" cy="390" r="150" fill="#43a047"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.3;0.45;1" dur="9s" repeatCount="indefinite"/></circle></g>
<g clip-path="url(#fA)"><circle cx="600" cy="390" r="150" fill="#8e24aa"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.6;0.75;1" dur="9s" repeatCount="indefinite"/></circle></g>
<g clip-path="url(#fA)"><g clip-path="url(#fB)"><circle cx="600" cy="390" r="150" fill="#5d4037"/></g></g>
<circle cx="520" cy="250" r="150" fill="none" stroke="#fff" stroke-width="5"/><circle cx="680" cy="250" r="150" fill="none" stroke="#fff" stroke-width="5"/><circle cx="600" cy="390" r="150" fill="none" stroke="#fff" stroke-width="5"/>
<g transform="translate(150 420)"><path d="M-110 0c0 -80 90 -110 150 -80c60 30 40 90 0 100c-30 8 -20 50 -60 50c-50 0 -90 -30 -90 -70z" fill="#d7ccc8" stroke="#8d6e63" stroke-width="5"/><circle cx="-60" cy="-30" r="16" fill="#e53935"/><circle cx="-20" cy="-60" r="16" fill="#fdd835"/><circle cx="25" cy="-55" r="16" fill="#1e88e5"/><circle cx="-60" cy="20" r="14" fill="#fffdf7"/></g>
<g><animateTransform attributeName="transform" type="rotate" values="-8 1000 500;8 1000 500;-8 1000 500" dur="2.5s" repeatCount="indefinite"/><path d="M1000 500L1080 260" stroke="#8d6e63" stroke-width="16" stroke-linecap="round"/><path d="M1080 260l8 -24" stroke="#90a4ae" stroke-width="20"/><path d="M1088 236q14 -40 -2 -60q-22 18 -14 56z" fill="#8e24aa"/></g></svg>`,
   points: [
    { t: 'Červená', d: 'Základná farba. V škôlke ju nemiešame, berieme ju priamo z tuby.', e: 'Červená.', ic: 'star', x: 35, y: 30 },
    { t: 'Oranžová', d: 'Zmiešame červenú a žltú.', e: 'Červená a žltá.', ic: 'sun', x: 50, y: 22 },
    { t: 'Žltá', d: 'Základná farba, ako slnko.', e: 'Žltá.', ic: 'sun', x: 65, y: 30 },
    { t: 'Zelená', d: 'Zmiešame žltú a modrú.', e: 'Žltá a modrá.', ic: 'plant', x: 58, y: 55 },
    { t: 'Modrá', d: 'Základná farba, ako obloha.', e: 'Modrá.', ic: 'drop', x: 50, y: 78 },
    { t: 'Fialová', d: 'Zmiešame červenú a modrú.', e: 'Červená a modrá.', ic: 'star', x: 42, y: 55 }] },
  ttable: { a: 'Zmiešame', b: 'Vznikne', rows: [[{ t: 'červená a žltá' }, { t: 'oranžová' }], [{ t: 'žltá a modrá' }, { t: 'zelená' }], [{ t: 'červená a modrá' }, { t: 'fialová' }], [{ t: 'červená a biela', l: 2 }, { t: 'ružová', l: 2 }], [{ t: 'všetky tri spolu', l: 3 }, { t: 'tmavá, hnedastá', l: 3 }]] },
  cards: [{ q: 'Ktoré sú tri základné farby?', a: 'Červená, žltá a modrá.' }, { q: 'Čo vznikne zo žltej a modrej?', a: 'Zelená.' }, { q: 'Čo vznikne z červenej a žltej?', a: 'Oranžová.' }, { q: 'Čo vznikne z červenej a modrej?', a: 'Fialová.' }, { q: 'Ako zosvetlíme farbu?', a: 'Pridáme bielu.', l: 2 }, { q: 'Akou farbou namaľuješ radosť?', a: 'Každý môže inou. Povedz, prečo si ju vybral.', l: 2 }],
  quiz: [{ q: 'Čo vznikne zo žltej a modrej?', o: ['Zelená', 'Červená', 'Biela'], k: 0, w: 'Žltá a modrá dajú zelenú.' }, { q: 'Ktorá farba je základná?', o: ['Červená', 'Zelená', 'Fialová'], k: 0, w: 'Červená, žltá a modrá sú základné.' }, { q: 'Z ktorých farieb vznikne oranžová?', o: ['Červenej a žltej', 'Modrej a žltej', 'Modrej a červenej'], k: 0, w: 'Červená a žltá dajú oranžovú.' }, { q: 'Čo vznikne z červenej a modrej?', o: ['Fialová', 'Zelená', 'Oranžová'], k: 0, w: 'Červená a modrá dajú fialovú.', l: 2 }] } },

/* =============================== 10. POCITY =============================== */
{
 id: 'ms-pocity', title: 'Moje pocity', aka: ['Pocity', 'Emócie', 'Radosť a smútok', 'Hnev a strach', 'Nálada'], subject: 'Materská škola', grade: 0, kind: 'pojmy', rec: 'scene',
 why: 'Štyri tváre ukazujú radosť, smútok, hnev a strach. Deti podľa očí a úst spoznajú pocit a povedia, čo im pomáha, keď ho cítia.',
 alts: [['mind', 'Keď sa rozprávate, čo pri ktorom pocite pomáha.'], ['cards', 'Na hru na zrkadlo: ukáž pocit tvárou.'], ['quiz', 'Na rozpoznanie pocitov a dohodnuté pravidlá.']],
 std: [], svpms: [S('Opíše aktuálne emócie.', `${CaS} · Ľudské vlastnosti a emócie`), S('Vyjadruje pocity zo zážitku, vypočutej rozprávky alebo príbehu – pozitívne i negatívne.', `${CaS} · Ľudské vlastnosti a emócie`), S('Rešpektuje dohodnuté pravidlá spoločensky prijateľného správania.', `${CaS} · Základy etikety`)],
 method: { goals: ['Dieťa pomenuje radosť, smútok, hnev a strach.', 'Dieťa povie, ako sa práve cíti.', 'Dieťa uvedie, čo môže urobiť, keď sa hnevá alebo bojí.'],
  plan: [['5 min', 'Ranný kruh: ako sa dnes cítiš?'], ['10 min', 'Tváre na tabuli: spoznáš pocit?'], ['10 min', 'Hra na zrkadlo a dýchanie ako balón.'], ['5 min', 'Dohoda v triede: čo robíme, keď sa hneváme.']],
  ask: ['Kedy si sa naposledy veľmi tešil?', 'Čo ti pomôže, keď sa bojíš?'] },
 guide: { primer: 'Pocity máme všetci a všetky sú v poriadku: radosť, smútok, hnev aj strach. Dôležité je, čo s pocitom urobíme. Hnev môžeme povedať slovami a pomôcť si dýchaním, nie bitkou. So smútkom alebo strachom pomáha povedať to dospelému, objatie alebo pokojné miesto. Deti pocity spoznávajú podľa tváre, tela a hlasu. Rozhovor veďte bez hodnotenia a dovoľte aj odpoveď „neviem“.',
  steps: [
   { time: '5 min', do: 'V kruhu sa každé dieťa môže dotknúť obrázka tváre, ktorý sedí s jeho náladou.', say: 'Ako sa dnes cítiš?', check: 'Deti, ktoré chcú, ukážu svoj pocit.' },
   { time: '10 min', do: 'Na tabuli ukazujte tváre. Deti hádajú pocit podľa očí a úst.', say: 'Prečo si myslíš, že je smutný?', check: 'Deti pomenujú aspoň tri pocity.' },
   { time: '10 min', do: 'Hra na zrkadlo: jedno dieťa ukáže pocit, druhé ho zopakuje. Potom spolu dýchajte ako balón: nádych, pomalý výdych.', check: 'Deti napodobnia pocit a skúsia pokojné dýchanie.' },
   { time: '5 min', do: 'Spoločne sa dohodnite, čo robíme, keď sa hneváme. Dohodu nakreslite na plagát.', check: 'Deti navrhnú aspoň dve pravidlá, napríklad povedať to slovami.' }],
  traps: [['Hnev je zlý pocit.', 'Hnev je normálny pocit. Nesprávne je niekomu ublížiť. Hnev povieme slovami.'], ['Chlapci neplačú.', 'Plakať môže každý. Plač ukazuje, že je nám smutno alebo nás niečo bolí.'], ['Keď sa bojím, som zbabelec.', 'Strach nás chráni pred nebezpečenstvom. Pomôže povedať to dospelému.']],
  qa: [['Prečo plačem, keď sa teším?', 'Niekedy je radosť taká veľká, že sa nám zarosia oči.'], ['Môžem cítiť dva pocity naraz?', 'Áno. Môžeš sa tešiť na výlet a zároveň sa trochu báť.']] },
 forms: {
  scene: { svg: (() => {
   const face = (cx, fill, mouth, brows, extra = '') => `<g transform="translate(${cx} 300)"><circle r="115" fill="${fill}" stroke="#ffffff" stroke-width="8"/><circle cx="-40" cy="-25" r="13" fill="#263238"/><circle cx="40" cy="-25" r="13" fill="#263238"/>${brows}${mouth}${extra}</g>`;
   return `<svg viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="640" fill="#f3e5f5"/><g fill="#e1bee7">${[80, 360, 640, 920].map((x, i) => `<rect x="${x + 10}" y="120" width="260" height="360" rx="40"/>`).join('')}</g>
${face(180, '#ffd54f', '<path d="M-55 30q55 60 110 0" stroke="#263238" stroke-width="10" fill="#fff" stroke-linecap="round"/>', '', '<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -10;0 0" dur="1s" repeatCount="indefinite"/><circle cx="-80" cy="20" r="14" fill="#ff8a80" opacity=".7"/><circle cx="80" cy="20" r="14" fill="#ff8a80" opacity=".7"/></g>')}
${face(460, '#90caf9', '<path d="M-45 60q45 -40 90 0" stroke="#263238" stroke-width="10" fill="none" stroke-linecap="round"/>', '<path d="M-62 -55l34 10M62 -55l-34 10" stroke="#263238" stroke-width="7" stroke-linecap="round"/>', '<ellipse cx="-42" cy="0" rx="8" ry="12" fill="#1e88e5"><animate attributeName="cy" values="0;70" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite"/></ellipse>')}
<g><animateTransform attributeName="transform" type="translate" values="0 0;3 0;-3 0;0 0" dur="0.3s" repeatCount="indefinite"/>${face(740, '#ef5350', '<path d="M-40 55h80" stroke="#263238" stroke-width="10" stroke-linecap="round"/>', '<path d="M-65 -60l40 18M65 -60l-40 18" stroke="#263238" stroke-width="9" stroke-linecap="round"/>', '<g stroke="#ef9a9a" stroke-width="8" stroke-linecap="round" fill="none"><path d="M-60 -125q-10 -20 0 -40"><animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/></path><path d="M60 -125q10 -20 0 -40"><animate attributeName="opacity" values="0;1;0" dur="1.5s" begin=".7s" repeatCount="indefinite"/></path></g>')}</g>
<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0;0 4;0 0" dur="0.25s" repeatCount="indefinite"/>${face(1020, '#ce93d8', '<ellipse cx="0" cy="55" rx="22" ry="28" fill="#263238"/>', '<path d="M-60 -60q20 -18 40 -6M60 -60q-20 -18 -40 -6" stroke="#263238" stroke-width="7" fill="none" stroke-linecap="round"/>', '<circle cx="-40" cy="-25" r="22" fill="none" stroke="#fff" stroke-width="5"/><circle cx="40" cy="-25" r="22" fill="none" stroke="#fff" stroke-width="5"/>')}</g></svg>`; })(),
   points: [
    { t: 'Radosť', d: 'Usmievame sa a chce sa nám skákať. Radosť môžeme zdieľať s kamarátmi.', e: 'Teším sa.', ic: 'sun', x: 15, y: 80 },
    { t: 'Smútok', d: 'Kútiky úst idú dole, môžu tiecť slzy. Pomôže objatie alebo rozhovor.', e: 'Som smutný.', ic: 'rain', x: 38, y: 80 },
    { t: 'Hnev', d: 'Mračíme sa, telo je napäté. Pomôže zhlboka dýchať a povedať to slovami.', e: 'Hnevám sa.', ic: 'bolt', x: 62, y: 80 },
    { t: 'Strach', d: 'Oči sú veľké, srdce búši. Pomôže povedať to dospelému.', e: 'Bojím sa.', ic: 'cloud', x: 85, y: 80 }] },
  mind: { center: 'Moje pocity', branches: [
   { t: 'Radosť', ic: 'sun', kids: [{ t: 'smejem sa' }, { t: 'chce sa mi skákať' }, { t: 'podelím sa o ňu', l: 2 }] },
   { t: 'Smútok', ic: 'rain', kids: [{ t: 'plačem' }, { t: 'pomôže objatie' }, { t: 'poviem, čo sa stalo', l: 2 }] },
   { t: 'Hnev', ic: 'bolt', kids: [{ t: 'mračím sa' }, { t: 'dýcham ako balón' }, { t: 'poviem to slovami' }] },
   { t: 'Strach', ic: 'cloud', kids: [{ t: 'srdce mi búši' }, { t: 'poviem to dospelému' }, { t: 'chytím sa za ruku', l: 2 }] }] },
  cards: [{ q: 'Ukáž tvárou radosť.', a: 'Úsmev, veselé oči.' }, { q: 'Ukáž tvárou smútok.', a: 'Kútiky úst dole.' }, { q: 'Čo ti pomôže, keď sa hneváš?', a: 'Zhlboka dýchať a povedať to slovami.' }, { q: 'Komu povieš, keď sa bojíš?', a: 'Dospelému: pani učiteľke, mame, otcovi.' }, { q: 'Kedy si sa naposledy tešil?', a: 'Rozprávanie dieťaťa.', l: 2 }, { q: 'Môžeš cítiť dva pocity naraz?', a: 'Áno, napríklad tešiť sa a trochu sa báť.', l: 3 }],
  quiz: [{ q: 'Ako vyzerá veselá tvár?', o: ['Usmieva sa', 'Mračí sa', 'Plače'], k: 0, w: 'Radosť ukazuje úsmev.' }, { q: 'Čo môžeš urobiť, keď sa hneváš?', o: ['Zhlboka dýchať a povedať to', 'Udrieť kamaráta', 'Hodiť hračku'], k: 0, w: 'Hnev povieme slovami a nikomu neublížime.' }, { q: 'Kamarát plače. Čo urobíš?', o: ['Spýtam sa, čo sa stalo', 'Vysmejem sa mu', 'Odídem preč'], k: 0, w: 'Smutnému kamarátovi pomôže, keď si ho všimneme.' }, { q: 'Bojíš sa. Komu to povieš?', o: ['Dospelému', 'Nikomu', 'Hračke'], k: 0, w: 'Dospelý ti pomôže.', l: 2 }] } },
];
