export const metadata = { title: 'Návod · Klbko', description: 'Ako pracovať s Klbkom: nástroje, podoby pomôcok a pedagogické tipy.' };

const FORMS: [string, string, string, string][] = [
  ['Animácia', 'Dej alebo stavba, ktorú treba vidieť: kolobeh, srdce, sopka, atóm.', 'Výklad nového učiva.', 'Obraz spolu so slovom sa pamätá lepšie ako samotný text. Nechajte žiakov najprv opísať, čo vidia, až potom vysvetľujte.'],
  ['Myšlienková mapa', 'Pojmy a ich vzťahy okolo jednej témy.', 'Úvod do celku aj zhrnutie na konci.', 'Žiak vidí celok a nové poznatky si pripája k tomu, čo už vie.'],
  ['Časová os a postup', 'Udalosti v čase alebo kroky postupu.', 'Dejepis, pracovné postupy, riešenie úloh.', 'Pred odkrytím ďalšieho kroku nechajte žiakov tipovať. Predpovedanie udrží pozornosť.'],
  ['Vennov diagram', 'Dve veci, ktoré majú niečo spoločné a niečo rozdielne.', 'Porovnanie: rastlinná a živočíšna bunka, Atény a Sparta.', 'Porovnávanie núti hľadať podstatné znaky, nie len opakovať definíciu.'],
  ['T-tabuľka', 'Dva pojmy postavené presne proti sebe.', 'Keď žiaci pojmy zamieňajú: obvod a obsah, vdych a výdych.', 'Rozdiely v jednom riadku odstraňujú najčastejšie omyly.'],
  ['Rybia kosť', 'Príčiny a následky jedného problému.', 'Diskusia: prečo zanikla ríša, prečo vypukla vojna.', 'Učí myslieť v súvislostiach a argumentovať.'],
  ['Cyklus', 'Dej, ktorý sa opakuje dokola.', 'Kolobeh vody, ročné obdobia, životný cyklus.', 'Kruh ukáže, že dej nemá začiatok ani koniec.'],
  ['Strom', 'Triedenie a delenie do skupín.', 'Slovné druhy, stavovce, látky a zmesi.', 'Žiak vidí, čo je nadradené a čo podradené.'],
  ['Kartičky', 'Otázka na jednej strane, odpoveď na druhej.', 'Fixácia a opakovanie vo dvojiciach.', 'Vybavovanie z pamäti je jeden z najúčinnejších spôsobov učenia, oveľa účinnejší ako opakované čítanie.'],
  ['Kvíz', 'Otázky s možnosťami a vysvetlením správnej odpovede.', 'Overenie na konci hodiny, aj cez mobil žiakov.', 'Okamžitá spätná väzba ukáže vám aj žiakom, čo treba zopakovať.'],
  ['Tabuľka VVN', 'Tri stĺpce: Viem, Chcem vedieť, Naučil som sa. Priestor pre žiakove vlastné otázky.', 'Prvé minúty hodiny a záverečná reflexia.', 'Žiak začína od seba a na konci vidí, čo sa naučil.'],
];

const TOOLS: [string, string][] = [
  ['Cieľ hodiny', 'Podľa cieľa Klbko odporučí podobu: pri výklade napríklad animáciu alebo mapu, pri opakovaní kartičky, pri aktivácii tabuľku VVN.'],
  ['Úrovne', 'Základ, Rozšírenie a Výzva pridávajú alebo uberajú obsah. Pomôcka sa prispôsobí bez prepisovania.'],
  ['Zjednodušená (ŠVVP)', 'Krátke vety a bežné slová pre žiakov so špeciálnymi výchovno-vzdelávacími potrebami. Môžete ju dať aj žiakom, ktorí ešte dobre nečítajú po slovensky.'],
  ['Skryť uzly', 'Časti pomôcky sa zakryjú a odkrývate ich ťuknutím. Výborné na tipovanie a opakovanie.'],
  ['Na tabuľu', 'Pomôcka na celú obrazovku interaktívnej tabule alebo projektora, s veľkým písmom.'],
  ['Zahraj sa', 'Žiaci triedia kartičky do skupín, zoraďujú kroky alebo spájajú otázky s odpoveďami. Ťukaním alebo ťahaním prstom, na tablete aj na interaktívnej tabuli. Hra vychádza z práve otvorenej podoby a úrovne.'],
  ['Prehrať', 'Tabuľa odkrýva pomôcku krok za krokom s popisom. Hodí sa na pokojný výklad.'],
  ['Pre žiakov', 'Vytvorí QR kód a odkaz. Žiaci ho otvoria na tablete alebo mobile bez účtu a prihlasovania.'],
  ['Tlač', 'Pracovný list s doplňovaním, kľúč riešení a metodický list pre vás. Uložíte ho aj ako PDF.'],
  ['Uložiť a Moje prípravy', 'Prípravu uložíte a dostanete odkaz, ktorým ju otvoríte aj na inom zariadení. Zoznam príprav je v tomto prehliadači.'],
  ['Farby obrázka', 'Pri animácii zmeníte farby jedným klikom, napríklad pre lepší kontrast na projektore.'],
  ['Sprievodca hodinou', 'Téma za minútu, priebeh hodiny s vetami, ktoré môžete povedať, časté omyly žiakov a odpovede na ich otázky.'],
  ['Štandardy ŠVP', 'Výkonové a obsahové štandardy ŠVP 2023 aj 2015, ku ktorým téma patrí, s odkazom na stranu v dokumente.'],
];

const NUDA: [string, string][] = [
  ['Začnite otázkou, nie definíciou', 'Každý Sprievodca hodinou začína otázkou alebo malým pokusom. Zvedavosť je najlepší začiatok.'],
  ['Nechajte žiakov predpovedať', 'Skryte uzly alebo spustite Prehrať a pred každým krokom sa pýtajte: čo bude ďalej? Žiak, ktorý tipuje, sa nenudí.'],
  ['Striedajte činnosti', 'Plán hodiny strieda výklad, prácu vo dvojiciach a overenie zhruba po 10 až 15 minútach.'],
  ['Ukážte, nielen povedzte', 'Animácia a obraz spolu so slovom pomáhajú pochopeniu aj zapamätaniu.'],
  ['Nech si žiaci vybavujú, nielen čítajú', 'Kartičky a kvíz sú krátke a dajú sa opakovať aj na začiatku ďalšej hodiny.'],
  ['Každý na svojej úrovni', 'Nudí sa ten, pre koho je učivo príliš ľahké, aj ten, kto sa stratil. Úrovne a verzia pre ŠVVP pomáhajú obom.'],
  ['Nechajte deti hýbať kartičkami', 'V hre Zahraj sa žiaci sami triedia, zoraďujú a spájajú. Kto robí rukami, ten nedrieme.'],
  ['Spätná väzba hneď', 'Kvíz cez QR kód ukáže výsledok aj s vysvetlením. Žiak nečaká týždeň na opravenú písomku.'],
];

const SCEN: [string, string[]][] = [
  ['Výklad nového učiva (45 min)', ['Úvodná otázka zo Sprievodcu.', 'Animácia alebo odporúčaná podoba na tabuli, odkrývanie s tipovaním.', 'Pracovný list vo dvojiciach.', 'Kvíz cez QR kód a krátka reflexia.']],
  ['Opakovanie pred písomkou', ['Cieľ hodiny: Opakovanie, Klbko odporučí kartičky.', 'Kartičky vo dvojiciach, potom hra Zahraj sa na tablete alebo tabuli.', 'Kvíz s vysvetleniami.', 'Žiaci si odkaz otvoria aj doma.']],
  ['Suplovanie cudzieho predmetu', ['Otvorte hotovú tému a prečítajte si Tému za minútu.', 'Riaďte sa Priebehom hodiny, vety v úvodzovkách môžete povedať doslova.', 'Pozrite si Na čo si dať pozor: tam sú omyly, s ktorými žiaci prídu.']],
  ['Trieda so žiakmi so ŠVVP', ['Celá trieda pracuje s tou istou pomôckou.', 'Žiakom so ŠVVP dajte zjednodušenú úroveň cez QR alebo vytlačenú.', 'Do poznámok o triede môžete napísať potreby triedy, AI tému upraví. Neuvádzajte mená žiakov.']],
];

export default function Navod() {
  return (
    <main className="nv">
      <header className="nv-top">
        <a href="/" className="btn">← Späť do Klbka</a>
        <button className="btn" type="button" data-print>Vytlačiť návod</button>
      </header>
      <h1>Ako pracovať s Klbkom</h1>
      <p className="nv-lead">Klbko pripraví z jednej témy pomôcku na hodinu v rôznych podobách, s podkladmi podľa ŠVP 2023 aj 2015. Je to pomocník pre učiteľa: šetrí čas na prípravu, aby ostal čas na žiakov.</p>

      <section>
        <h2>Začnite za päť minút</h2>
        <ol className="nv-steps">
          <li><b>Vyberte predmet a ročník.</b> Pod zadaním sa objavia hotové témy. Všetky nájdete v ponuke Všetky hotové témy.</li>
          <li><b>Otvorte tému alebo napíšte vlastnú.</b> Hotové témy sa otvoria hneď. Vlastnú tému pripraví AI, zvyčajne do minúty.</li>
          <li><b>Zvoľte cieľ hodiny a úroveň.</b> Klbko odporučí vhodnú podobu a vysvetlí prečo.</li>
          <li><b>Prečítajte si Sprievodcu hodinou.</b> Dozviete sa podstatu témy, priebeh hodiny a časté omyly žiakov.</li>
          <li><b>Použite pomôcku.</b> Na tabuľu, pre žiakov cez QR kód alebo vytlačenú ako pracovný list.</li>
        </ol>
      </section>

      <section>
        <h2>Hotové témy a úprava pre vašu triedu</h2>
        <p>Hotové témy sú pripravené vopred a otvoria sa bez čakania. Ak pod zadaním otvoríte <b>Pridať vlastné poznámky</b> a napíšete niečo o svojej triede, napríklad „veľa pohybu, dvaja žiaci s dyslexiou“, AI tému upraví a do Sprievodcu doplní časť <b>Pre vašu triedu</b>. Fakty pritom nemení. Do poznámok nepíšte mená ani iné osobné údaje žiakov.</p>
      </section>

      <section>
        <h2>Podoby pomôcky: kedy ktorú</h2>
        <div className="nv-table" role="table">
          <div className="nv-row nv-head" role="row"><span>Podoba</span><span>Na čo je</span><span>Kedy na hodine</span><span>Prečo to funguje</span></div>
          {FORMS.map(([a, b, c, d]) => (
            <div className="nv-row" role="row" key={a}><b>{a}</b><span>{b}</span><span>{c}</span><span>{d}</span></div>
          ))}
        </div>
      </section>

      <section>
        <h2>Nástroje</h2>
        <dl className="nv-tools">
          {TOOLS.map(([a, b]) => (<div key={a}><dt>{a}</dt><dd>{b}</dd></div>))}
        </dl>
      </section>

      <section className="nv-quote">
        <h2>Nuda je smrteľný hriech učiteľa</h2>
        <blockquote>Nudiť je najhorší hriech vyučovania.<cite>Myšlienka, ktorá sa pripisuje nemeckému pedagógovi Johannovi Friedrichovi Herbartovi</cite></blockquote>
        <p>Herbart chápal vyučovanie ako cestu, na ktorej má žiak záujem a pozornosť. Opísal ju v krokoch, ktoré sa v rôznych podobách učia dodnes: najprv <b>jasne ukázať</b> nové učivo, potom ho <b>spojiť</b> s tým, čo žiak pozná, <b>usporiadať</b> do celku a nakoniec <b>použiť</b>. Klbko tieto kroky podporuje:</p>
        <ul className="nv-herbart">
          <li><b>Jasnosť</b>: animácia, časová os, cyklus. Jedna jasná predstava namiesto vety z učebnice.</li>
          <li><b>Spojenie</b>: myšlienková mapa, Vennov diagram, tabuľka VVN.</li>
          <li><b>Systém</b>: strom, T-tabuľka, rybia kosť.</li>
          <li><b>Použitie</b>: kartičky, kvíz, hra Zahraj sa, pracovný list.</li>
        </ul>
        <h3>Osem tipov proti nude</h3>
        <ol className="nv-tips">
          {NUDA.map(([a, b]) => (<li key={a}><b>{a}.</b> {b}</li>))}
        </ol>
      </section>

      <section>
        <h2>Osvedčené scenáre</h2>
        <div className="nv-scen">
          {SCEN.map(([a, l]) => (<article key={a}><h3>{a}</h3><ol>{l.map(x => <li key={x}>{x}</li>)}</ol></article>))}
        </div>
      </section>

      <section className="nv-note">
        <h2>Na čo pamätať</h2>
        <ul>
          <li>Obsah je pripravený starostlivo, ale za hodinu zodpovedá učiteľ. Pred použitím si ho prečítajte a prispôsobte triede.</li>
          <li>Štandardy ŠVP sú vybrané automaticky z oficiálnych dokumentov. Pri plánovaní ich porovnajte so školským vzdelávacím programom vašej školy.</li>
          <li>Žiaci nepotrebujú účty. Do poznámok pre AI nepíšte osobné údaje.</li>
        </ul>
      </section>
      <script dangerouslySetInnerHTML={{ __html: "document.querySelector('[data-print]')?.addEventListener('click',()=>print())" }} />
    </main>
  );
}
