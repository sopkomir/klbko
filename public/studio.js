(function(){

'use strict';
/* ---------- pomocné ---------- */
const $=s=>document.querySelector(s);
function el(tag,attrs,...kids){const e=document.createElement(tag);for(const[k,v]of Object.entries(attrs||{})){if(v==null||v===false)continue;if(k==='class')e.className=v;else if(k.startsWith('on'))e.addEventListener(k.slice(2),v);else if(k==='html')e.innerHTML=v;else e.setAttribute(k,v===true?'':v)}for(const c of kids.flat()){if(c==null||c===false)continue;e.append(c.nodeType?c:document.createTextNode(String(c)))}return e}
const P={
 sun:'<circle cx="12" cy="12" r="4.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
 cloud:'<path d="M7 18a4 4 0 0 1 0-8 6 6 0 0 1 11.5 1.5A3.3 3.3 0 0 1 18 18z"/>',
 rain:'<path d="M7 14a4 4 0 0 1 0-8 6 6 0 0 1 11.5 1.5A3.3 3.3 0 0 1 18 14z"/><path d="M8 18l-1 3M13 18l-1 3M18 18l-1 3"/>',
 drop:'<path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.500 7-12 7-12z"/>',
 snow:'<path d="M12 2v20M3.500 7l17 10M20.500 7l-17 10"/>',
 river:'<path d="M3 8c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0"/>',
 mountain:'<path d="M2 20 9 7l4 7 3-4 6 10z"/>',
 plant:'<path d="M12 21v-9M12 12C12 7 8 5 4 5c0 5 3 7 8 7zM12 15c0-4 3-6 8-6 0 4-3 6-8 6z"/>',
 factory:'<path d="M3 21V10l6 4v-4l6 4V4h6v17z"/>',
 people:'<circle cx="9" cy="8" r="3.500"/><path d="M3 20c0-4 3-6 6-6s6 2 6 6M16 5a3 3 0 0 1 0 6M18 14c2 1 3 3 3 6"/>',
 crown:'<path d="M3 19 2 7l6 4 4-7 4 7 6-4-1 12z"/>',
 book:'<path d="M12 6c-2-2-5-2-8-2v15c3 0 6 0 8 2 2-2 5-2 8-2V4c-3 0-6 0-8 2zM12 6v15"/>',
 cross:'<path d="M12 2v20M6 8h12"/>',
 castle:'<path d="M4 21V6h3v3h3V6h4v3h3V6h3v15h-6v-5h-4v5z"/>',
 sword:'<path d="M20 3l-9 9M20 3h-4M20 3v4M8 11l5 5M6 18l3-3M4 20l2-2"/>',
 cell:'<ellipse cx="12" cy="12" rx="9.500" ry="7.500"/><circle cx="10" cy="11" r="3"/>',
 bolt:'<path d="M13 2 5 14h6l-1 8 8-12h-6z"/>',
 star:'<path d="M12 3l2.700 6 6.300.6-4.800 4.200 1.400 6.200L12 16.800 6.400 20l1.400-6.200L3 9.600 9.300 9z"/>',
 map:'<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15"/>',
 mind:'<circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="M6 7l4 3M18 7l-4 3M6 17l4-3M18 17l-4-3"/>',
 line:'<path d="M2 12h20"/><circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/>',
 venn:'<circle cx="9" cy="12" r="6.500"/><circle cx="15" cy="12" r="6.500"/>',
 ttab:'<path d="M3 5h18M12 5v15"/>',
 fish:'<path d="M2 12h17M6 5l4 7M6 19l4-7M12 5l4 7M12 19l4-7M19 8l3 4-3 4"/>',
 cycle:'<path d="M20 11a8 8 0 0 0-14-4L3 10M3 4v6h6M4 13a8 8 0 0 0 14 4l3-3M21 20v-6h-6"/>',
 tree:'<rect x="9" y="3" width="6" height="4"/><rect x="2" y="16" width="6" height="4"/><rect x="16" y="16" width="6" height="4"/><path d="M12 7v5M5 16v-4h14v4"/>',
 cards:'<rect x="3" y="7" width="13" height="14" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v12"/>',
 quiz:'<path d="M9 9a3 3 0 1 1 4 3c-1 .5-1 1-1 2M12 18h.01"/><circle cx="12" cy="12" r="10"/>',
 vvn:'<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M9 4v16M15 4v16"/>',
 eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 screen:'<rect x="2" y="4" width="20" height="13" rx="1"/><path d="M12 17v4M8 21h8"/>',
 print:'<path d="M6 9V3h12v6M6 18H3v-8h18v8h-3M6 14h12v7H6z"/>'
};
const ICONS=Object.keys(P).slice(0,20);
const ic=(n,c='pic')=>{const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('viewBox','0 0 24 24');s.setAttribute('class',c);s.setAttribute('aria-hidden','true');s.setAttribute('fill','none');s.setAttribute('stroke','currentColor');s.setAttribute('stroke-width','1.8');s.setAttribute('stroke-linecap','round');s.setAttribute('stroke-linejoin','round');s.innerHTML=P[n]||P.star;return s};

/* ---------- číselníky ---------- */
const FORMS=[
 {id:'mind',n:'Myšlienková mapa',ic:'mind',a:'pojmy a vzťahy'},
 {id:'timeline',n:'Časová os',ic:'line',a:'chronológia'},
 {id:'venn',n:'Vennov diagram',ic:'venn',a:'porovnanie'},
 {id:'ttable',n:'T-tabuľka',ic:'ttab',a:'porovnanie dvoch strán'},
 {id:'fish',n:'Rybia kosť',ic:'fish',a:'príčiny a následky'},
 {id:'cycle',n:'Cyklus',ic:'cycle',a:'proces, cyklus'},
 {id:'tree',n:'Strom',ic:'tree',a:'hierarchia'},
 {id:'cards',n:'Kartičky',ic:'cards',a:'opakovanie'},
 {id:'quiz',n:'Kvíz',ic:'quiz',a:'overenie'},
 {id:'vvn',n:'Tabuľka VVN',ic:'vvn',a:'aktivácia na začiatku hodiny'}];
const F=Object.fromEntries(FORMS.map(f=>[f.id,f]));
const KIND={pojmy:{n:'pojmy a vzťahy',f:'mind'},chrono:{n:'chronológia',f:'timeline'},porovnanie:{n:'porovnanie',f:'venn'},pricina:{n:'príčiny a následky',f:'fish'},proces:{n:'proces, cyklus',f:'cycle'},hierarchia:{n:'hierarchia',f:'tree'}};
const GOALS=[['vyklad','Výklad nového učiva'],['aktivacia','Aktivácia na začiatku hodiny'],['fixacia','Fixácia'],['opakovanie','Opakovanie'],['projekt','Projektová práca']];
const SUBJECTS=['Človek a príroda','Človek a spoločnosť','Slovenský jazyk a literatúra','Matematika','Informatika','Biológia','Fyzika','Chémia','Dejepis','Geografia','Občianska náuka','Cudzí jazyk','Hudobná výchova','Výtvarná výchova','Človek a svet práce','Telesná a športová výchova'];
const LEVELS=[[1,'Základ'],[2,'Rozšírenie'],[3,'Výzva'],[4,'Zjednodušená (ŠVVP)']];
const cycleOf=g=>g<=3?'1. cyklus':g<=5?'2. cyklus':'3. cyklus';

/* ---------- pripravené témy ---------- */
const TOPICS={
kolobeh:{title:'Kolobeh vody',subject:'Človek a príroda',grade:5,kind:'proces',
 why:{cycle:'Učivo nemá začiatok ani koniec, deje sa stále dokola. Kruh žiakom ukáže presne to, čo by zoznam krokov zakryl.'},
 alts:[['mind','Keď chcete skôr usporiadať pojmy okolo vody než sledovať dej.'],['fish','Keď sa hodina zameria na to, ako človek kolobeh narúša.'],['ttable','Keď žiaci zamieňajú vyparovanie a kondenzáciu.']],
 method:{goals:['Žiak opíše kolobeh vody vlastnými slovami.','Žiak priradí skupenské premeny k miestam v prírode.','Žiak uvedie príklad, ako človek kolobeh narúša.'],plan:[['5 min','Otázka na úvod: Kam zmizne mláka po daždi?'],['15 min','Spoločné odkrývanie cyklu na tabuli, žiaci tipujú ďalší krok.'],['15 min','Pracovný list vo dvojiciach.'],['10 min','Porovnanie riešení a reflexia.']],ask:['Prečo sa kolobeh nikdy nezastaví?','Čo by sa stalo, keby sme zabetónovali celé mesto?']},
 forms:{
  cycle:{hub:'Voda je stále v pohybe',steps:[
   {t:'Vyparovanie',d:'Slnko zohrieva vodu v moriach, riekach a jazerách. Voda sa mení na vodnú paru.',e:'Slnko hreje vodu. Voda ide hore.',ic:'sun'},
   {t:'Výpar z rastlín',d:'Rastliny prijímajú vodu koreňmi a cez listy ju uvoľňujú ako vodnú paru.',ic:'plant',l:3},
   {t:'Kondenzácia',d:'Vodná para stúpa a ochladzuje sa. Vznikajú drobné kvapôčky, z ktorých sa tvoria oblaky.',e:'Hore je zima. Vznikne oblak.',ic:'cloud'},
   {t:'Zrážky',d:'Kvapky sa spájajú a padajú na zem ako dážď, sneh alebo krúpy.',e:'Z oblaku padá dážď alebo sneh.',ic:'rain'},
   {t:'Vsakovanie',d:'Časť vody vsakuje do pôdy a stáva sa podzemnou vodou.',ic:'mountain',l:2},
   {t:'Odtok do mora',d:'Potoky a rieky odvádzajú vodu späť do mora. Kolobeh pokračuje.',e:'Rieka nesie vodu do mora.',ic:'river'}]},
  mind:{center:'Kolobeh vody',branches:[
   {t:'Skupenstvá vody',ic:'drop',kids:[{t:'kvapalné: dážď, rieka'},{t:'tuhé: sneh, ľad'},{t:'plynné: vodná para'}]},
   {t:'Premeny vody',ic:'cycle',e:'Ako sa voda mení',kids:[{t:'vyparovanie'},{t:'kondenzácia'},{t:'topenie',l:2},{t:'tuhnutie',l:2}]},
   {t:'Zdroje vody',ic:'river',kids:[{t:'zrážková'},{t:'povrchová'},{t:'podzemná'},{t:'ľadovce',l:2}]},
   {t:'Človek a voda',ic:'people',kids:[{t:'znečistenie'},{t:'ochrana zdrojov'},{t:'betón bráni vsakovaniu',l:3}]}]},
  timeline:{note:'Nie je to dej v dátumoch, preto sú tu kroky jednej kvapky.',events:[
   {y:'1',t:'Kvapka je v mori',e:'Kvapka je v mori.',ic:'river'},{y:'2',t:'Stúpa ako para',e:'Kvapka ide hore.',ic:'sun'},{y:'3',t:'Je súčasťou oblaku',e:'Kvapka je v oblaku.',ic:'cloud'},{y:'4',t:'Padá ako dážď',e:'Kvapka padá.',ic:'rain'},{y:'5',t:'Rieka ju nesie späť',e:'Kvapka ide do mora.',ic:'river'}]},
  venn:{a:'Dážď',b:'Sneh',left:[{t:'kvapalné skupenstvo'},{t:'rýchlo steká alebo vsakuje',l:2}],mid:[{t:'sú to zrážky'},{t:'padajú z oblakov'},{t:'dopĺňajú zásoby vody',l:2}],right:[{t:'tuhé skupenstvo'},{t:'môže ležať týždne a pomaly sa topiť',l:2}]},
  ttable:{a:'Vyparovanie',b:'Kondenzácia',rows:[[{t:'z kvapaliny vzniká plyn',e:'voda sa mení na paru'},{t:'z plynu vzniká kvapalina',e:'para sa mení na vodu'}],[{t:'príklad: mláka po daždi zmizne'},{t:'príklad: orosené okno v kúpeľni'}],[{t:'voda musí prijať teplo',l:2},{t:'para teplo odovzdáva',l:2}]]},
  fish:{problem:'Kolobeh vody je narušený',groups:[{t:'Znečistenie',items:[{t:'odpad v riekach'},{t:'chemikálie z polí',l:2}]},{t:'Krajina',items:[{t:'výrub lesov'},{t:'betón a asfalt'}]},{t:'Spotreba',items:[{t:'plytvanie vodou'},{t:'nadmerné čerpanie podzemnej vody',l:3}]},{t:'Podnebie',l:2,items:[{t:'dlhé suchá',l:2},{t:'prudké lejaky',l:2}]}]},
  tree:{root:{t:'Voda na Zemi',kids:[{t:'Slaná voda',kids:[{t:'moria',l:1},{t:'oceány'}]},{t:'Sladká voda',kids:[{t:'ľadovce'},{t:'podzemná voda',l:2},{t:'rieky a jazerá'}]}]}},
  cards:[{q:'Čo je vyparovanie?',a:'Premena kvapalnej vody na vodnú paru.',e:'Voda sa mení na paru.'},{q:'Ako vzniká oblak?',a:'Vodná para sa ochladí a vzniknú drobné kvapôčky.',e:'Para sa ochladí.'},{q:'Vymenuj tri druhy zrážok.',a:'Dážď, sneh, krúpy.'},{q:'Čo je podzemná voda?',a:'Voda, ktorá vsiakla do pôdy a hornín.',l:2},{q:'Ako môže človek narušiť kolobeh vody?',a:'Znečisťovaním, výrubom lesov, zastavaním pôdy.',l:2},{q:'Prečo kolobeh nikdy neskončí?',a:'Voda sa stále mení z jedného skupenstva na iné a premiestňuje sa.',l:3}],
  quiz:[{q:'Čo poháňa vyparovanie vody?',o:['Slnko','Mesiac','Vietor z mora'],k:0,w:'Slnečné teplo mení kvapalnú vodu na vodnú paru.'},{q:'Čo vzniká pri kondenzácii?',o:['Sneh na zemi','Drobné kvapôčky','Podzemná voda'],k:1,w:'Vodná para sa ochladí a vzniknú kvapôčky.'},{q:'Ktorá voda je v tuhom skupenstve?',o:['Hmla','Rieka','Ľadovec'],k:2,w:'Ľad a sneh sú tuhé skupenstvo vody.'},{q:'Čo najviac bráni vsakovaniu dažďa?',o:['Les','Lúka','Asfaltová plocha'],k:2,w:'Asfalt vodu neprepustí, tak rýchlo odteká.',l:2}],
  vvn:{know:['Čo sa stane s mlákou po daždi?','Odkiaľ sa berie dážď?'],want:['Na čo chcete dostať odpoveď?','Čo vám na tom nesedí?'],learned:['Dokresli kolobeh z pamäti.','Vysvetli ho spolužiakovi tromi vetami.']}
 }},
morava:{title:'Veľká Morava',subject:'Dejepis',grade:7,kind:'chrono',
 why:{timeline:'Žiaci si potrebujú uložiť poradie vládcov a udalostí. Časová os ukáže, čo predchádzalo čomu, a pripraví ich na otázku, prečo ríša zanikla.'},
 alts:[['fish','Keď hodinu zameriate na príčiny zániku.'],['ttable','Keď chcete rozlíšiť vonkajšie a vnútorné okolnosti.'],['mind','Keď zhŕňate celé obdobie.']],
 method:{goals:['Žiak zoradí kľúčové udalosti Veľkej Moravy.','Žiak vysvetlí význam misie Konštantína a Metoda.','Žiak rozlíši vonkajšie a vnútorné príčiny zániku.'],plan:[['5 min','Otázka na úvod: Prečo si 5. júla pripomíname Cyrila a Metoda?'],['15 min','Odkrývanie časovej osi na tabuli.'],['15 min','Pracovný list, doplnenie udalostí.'],['10 min','Diskusia: čo rozhodlo o zániku ríše?']],ask:['Prečo Rastislav hľadal učiteľov práve v Byzancii?','Čo po Veľkej Morave zostalo dodnes?']},
 forms:{
  timeline:{events:[
   {y:'okolo 833',t:'Vznik Veľkej Moravy',d:'Mojmír I. vyhnal Pribinu z Nitry a spojil dve kniežatstvá.',e:'Mojmír spojil dve kniežatstvá.',ic:'castle'},
   {y:'846',t:'Vláda Rastislava',d:'Rastislav sa usiluje o nezávislosť od Franskej ríše.',ic:'crown',l:2},
   {y:'863',t:'Príchod Konštantína a Metoda',d:'Bratia zo Solúna prinášajú písmo hlaholiku a bohoslužby v slovanskom jazyku.',e:'Prišli Konštantín a Metod. Priniesli písmo.',ic:'book'},
   {y:'871',t:'Vláda Svätopluka',d:'Svätopluk vládne po Rastislavovi a ríša dosahuje najväčší rozsah.',e:'Vládne Svätopluk. Ríša je najväčšia.',ic:'crown'},
   {y:'885',t:'Smrť Metoda',d:'Metodovi žiaci museli odísť z Veľkej Moravy.',ic:'cross',l:2},
   {y:'894',t:'Smrť Svätopluka',d:'Medzi jeho synmi vznikajú spory.',ic:'sword',l:3},
   {y:'okolo 907',t:'Zánik ríše',d:'Veľká Morava podľahla nájazdom starých Maďarov.',e:'Ríša zanikla.',ic:'sword'}]},
  mind:{center:'Veľká Morava',branches:[
   {t:'Vládcovia',ic:'crown',kids:[{t:'Mojmír I.'},{t:'Rastislav'},{t:'Svätopluk'},{t:'Mojmír II.',l:3}]},
   {t:'Kultúra a viera',ic:'book',kids:[{t:'Konštantín a Metod'},{t:'hlaholika'},{t:'Proglas',l:3}]},
   {t:'Významné miesta',ic:'castle',kids:[{t:'Nitra'},{t:'Devín'},{t:'Mikulčice',l:2}]},
   {t:'Susedia',ic:'map',kids:[{t:'Franská ríša'},{t:'Byzancia',l:2},{t:'starí Maďari'}]}]},
  fish:{problem:'Prečo Veľká Morava zanikla?',groups:[{t:'Vnútorné spory',items:[{t:'boje Svätoplukových synov'},{t:'slabšia vláda po roku 894',l:2}]},{t:'Tlak Frankov',items:[{t:'opakované vojny'},{t:'politický vplyv v okolí',l:3}]},{t:'Starí Maďari',items:[{t:'nájazdy jazdcov'},{t:'nová moc v Karpatskej kotline',l:2}]}]},
  ttable:{a:'Vonkajšie okolnosti',b:'Vnútorné okolnosti',rows:[[{t:'tlak Franskej ríše'},{t:'boje o moc v rode Mojmírovcov'}],[{t:'pomoc z Byzancie',l:2},{t:'upevnenie moci za Svätopluka',l:2}],[{t:'nájazdy starých Maďarov'},{t:'spory synov po Svätoplukovej smrti'}]]},
  cards:[{q:'Kto prišiel na Veľkú Moravu v roku 863?',a:'Konštantín a Metod.'},{q:'Ako sa volá písmo, ktoré zostavil Konštantín?',a:'Hlaholika.'},{q:'Za koho vlády mala ríša najväčší rozsah?',a:'Za Svätopluka.'},{q:'Kto bol prvým známym vládcom Veľkej Moravy?',a:'Mojmír I.',l:2},{q:'Kto ríšu ohrozoval zo západu?',a:'Franská ríša.',l:2}],
  quiz:[{q:'Odkiaľ prišli Konštantín a Metod?',o:['Z Byzancie','Z Franskej ríše','Z Ríma'],k:0,w:'Pozval ich Rastislav, poslal ich byzantský cisár.'},{q:'Čo sa stalo s Veľkou Moravou okolo roku 907?',o:['Spojila sa s Byzanciou','Zanikla','Stala sa kráľovstvom'],k:1,w:'Podľahla nájazdom starých Maďarov.'},{q:'Ktoré písmo súvisí s touto dobou?',o:['Latinka','Azbuka','Hlaholika'],k:2,w:'Hlaholiku zostavil Konštantín.'}]
 }},
bunka:{title:'Rastlinná a živočíšna bunka',subject:'Biológia',grade:6,kind:'porovnanie',
 why:{venn:'Podstata učiva je v tom, čo majú bunky spoločné a čím sa líšia. Vennov diagram ukáže oboje naraz.'},
 alts:[['ttable','Keď je pre vás dôležitý rozdiel a spoločné časti netreba.'],['mind','Keď prechádzate jednotlivé časti a ich funkcie.'],['cards','Keď si žiaci potrebujú zapamätať názvy.']],
 method:{goals:['Žiak pomenuje základné časti bunky.','Žiak porovná rastlinnú a živočíšnu bunku.','Žiak vysvetlí funkciu chloroplastov.'],plan:[['5 min','Otázka na úvod: Prečo rastlina stojí aj bez kostí?'],['15 min','Spoločné vypĺňanie diagramu.'],['15 min','Pozorovanie alebo obrázky a pracovný list.'],['10 min','Kartičky vo dvojiciach.']],ask:['Prečo živočíšna bunka nepotrebuje chloroplasty?','Čo dáva rastline pevnosť?']},
 forms:{
  venn:{a:'Rastlinná bunka',b:'Živočíšna bunka',left:[{t:'bunková stena',e:'pevný obal'},{t:'chloroplasty'},{t:'veľká vakuola',l:2}],mid:[{t:'jadro'},{t:'cytoplazmatická membrána',e:'tenký obal'},{t:'mitochondrie',l:2}],right:[{t:'nemá bunkovú stenu',e:'nemá pevný obal'},{t:'nemá chloroplasty'},{t:'potravu prijíma hotovú',l:2}]},
  ttable:{a:'Rastlinná bunka',b:'Živočíšna bunka',rows:[[{t:'má bunkovú stenu'},{t:'nemá bunkovú stenu'}],[{t:'má chloroplasty'},{t:'nemá chloroplasty'}],[{t:'živiny si vytvára fotosyntézou',l:2},{t:'živiny prijíma z potravy',l:2}]]},
  mind:{center:'Bunka',branches:[
   {t:'Obaly',ic:'cell',kids:[{t:'bunková stena'},{t:'cytoplazmatická membrána'}]},
   {t:'Riadenie',ic:'star',kids:[{t:'jadro'}]},
   {t:'Energia',ic:'bolt',kids:[{t:'mitochondrie'},{t:'chloroplasty'}]},
   {t:'Typy buniek',ic:'plant',kids:[{t:'rastlinná'},{t:'živočíšna'}]}]},
  cards:[{q:'Čo riadi činnosť bunky?',a:'Jadro.'},{q:'Čo dáva rastlinnej bunke pevný tvar?',a:'Bunková stena.'},{q:'Kde prebieha fotosyntéza?',a:'V chloroplastoch.'},{q:'Čo robia mitochondrie?',a:'Získavajú pre bunku energiu.',l:2}],
  quiz:[{q:'Čo živočíšna bunka nemá?',o:['Jadro','Bunkovú stenu','Membránu'],k:1,w:'Bunkovú stenu majú rastlinné bunky.'},{q:'Čo majú obe bunky spoločné?',o:['Jadro','Chloroplasty','Bunkovú stenu'],k:0,w:'Jadro majú rastlinné aj živočíšne bunky.'}]
 }}};


TOPICS.kolobeh.guide={primer:'Voda na Zemi sa nestráca, iba mení skupenstvo a miesto. Slnko ju odparí, para sa vo výške ochladí na kvapôčky, tie spadnú ako zrážky a voda sa vráti do riek a mora. Keď žiaci pochopia, že ide o stále tú istú vodu, majú jadro učiva.',
 steps:[{time:'5 min',do:'Nakreslite na tabuľu mláku a opýtajte sa.',say:'Včera tu bola mláka, dnes tu nie je. Kam sa podela voda?',check:'Nechajte zaznieť viac nápadov, zatiaľ žiadny neopravujte.'},
  {time:'15 min',do:'Na tabuli odkrývajte kolobeh krok za krokom.',say:'Čo si myslíte, že sa stane s parou vysoko nad zemou?',check:'Pred každým krokom nechajte žiakov tipovať.'},
  {time:'15 min',do:'Žiaci vo dvojiciach vyplnia pracovný list.',check:'Obíďte triedu a sledujte, či nezamieňajú vyparovanie a kondenzáciu.'},
  {time:'10 min',do:'Spoločná kontrola a vysvetlenie vlastnými slovami.',check:'Každá dvojica povie kolobeh tromi vetami.'}],
 traps:[['Oblaky sú z vodnej pary.','Vodná para je neviditeľná. Oblaky tvoria drobné kvapôčky a ľadové kryštáliky.'],['Biely „dym“ nad hrncom je para.','Vidíme už kvapôčky. Samotná para je priehľadná.'],['Voda sa vyparuje, až keď vrie.','Vyparuje sa aj pri nižšej teplote, preto zmizne aj mláka.']],
 qa:[['Prečo dážď nie je slaný, keď sa voda odparuje z mora?','Soľ sa neodparuje, zostáva v mori. Do vzduchu stúpa len voda.'],['Prečo oblaky nespadnú?','Kvapôčky sú veľmi malé a drží ich stúpajúci vzduch. Padajú, až keď sa spoja do väčších kvapiek.']]};
TOPICS.morava.guide={primer:'Veľká Morava bola slovanská ríša v 9. storočí, rozprestierala sa aj na časti dnešného Slovenska. Jej vládcovia lavírovali medzi Franskou ríšou a Byzanciou. Najtrvalejším odkazom je misia Konštantína a Metoda, ktorá priniesla písmo a bohoslužby v zrozumiteľnom jazyku.',
 steps:[{time:'5 min',do:'Spýtajte sa na sviatok 5. júla.',say:'Prečo máme 5. júla voľno a kto sú Cyril a Metod?',check:'Zapíšte nápady, vrátite sa k nim na konci.'},
  {time:'15 min',do:'Odkrývajte časovú os a pri každej udalosti sa pristavte.',say:'Čo sa mohlo stať potom a prečo?',check:'Žiaci hľadajú súvislosti medzi udalosťami.'},
  {time:'15 min',do:'Žiaci doplnia pracovný list.',check:'Sledujte, či správne radia udalosti.'},
  {time:'10 min',do:'Diskusia o príčinách zániku.',check:'Každý žiak uvedie jednu vonkajšiu a jednu vnútornú príčinu.'}],
 traps:[['Konštantín a Cyril sú dvaja ľudia.','Je to ten istý človek. Meno Cyril prijal ako mních krátko pred smrťou.'],['Bratia priniesli cyriliku.','Konštantín zostavil hlaholiku. Cyrilika vznikla až neskôr.'],['Veľká Morava bola dnešné Slovensko.','Zahŕňala najmä dnešnú Moravu a časť Slovenska a jej rozsah sa menil.']],
 qa:[['Prečo Rastislav hľadal učiteľov v Byzancii?','Chcel vzdelávanie v jazyku ľudu a menší vplyv franských kňazov.'],['Je príbeh o Svätoplukových prútoch pravdivý?','Je to povesť. Učí o jednote, ale nie je doloženou udalosťou.']]};
TOPICS.bunka.guide={primer:'Bunka je základná stavebná jednotka organizmov. Rastlinné aj živočíšne bunky majú jadro, membránu a mitochondrie. Rastlinná má navyše bunkovú stenu a chloroplasty, preto drží tvar a vie si tvoriť živiny fotosyntézou.',
 steps:[{time:'5 min',do:'Ukážte rastlinu a spýtajte sa.',say:'Rastlina nemá kosti. Čo ju teda drží?',check:'Hľadajte nápady, odpoveď príde v diagrame.'},
  {time:'15 min',do:'Prejdite obe bunky a pomenujte časti.',say:'Čo majú obe bunky rovnaké a čo má len jedna z nich?',check:'Žiaci ukazujú časti na obrázku.'},
  {time:'15 min',do:'Pozorovanie alebo obrázky a pracovný list.',check:'Sledujte, či nezamieňajú stenu a membránu.'},
  {time:'10 min',do:'Opakovanie kartičkami vo dvojiciach.',check:'Každý vysvetlí rozdiel medzi bunkami.'}],
 traps:[['Rastlinné bunky nemajú mitochondrie.','Majú ich. Chloroplasty ich nenahrádzajú.'],['Bunková stena a membrána sú to isté.','Rastlinná bunka má obe. Stena je pevná a je vonku, membrána je tenká a je pod ňou.'],['Bunka je plochá.','Bunka je trojrozmerná, plochá je len na obrázku.']],
 qa:[['Prečo sú listy zelené?','Pre chlorofyl, zelené farbivo v chloroplastoch.'],['Dá sa bunka vidieť voľným okom?','Väčšina buniek nie, treba mikroskop.']]};
TOPICS.kolobeh.forms.cycle.scene='water';
{const at={'Vyparovanie':[75,47],'Výpar z rastlín':[37,56],'Kondenzácia':[55,10],'Zrážky':[17,42],'Vsakovanie':[20,87],'Odtok do mora':[50,74]};TOPICS.kolobeh.forms.cycle.steps.forEach(x=>{x.at=at[x.t]})}
TOPICS.morava.forms.timeline.scene='morava';TOPICS.bunka.forms.venn.scene='cells';

/* ---------- stav ---------- */
const S={key:'kolobeh',topic:TOPICS.kolobeh,form:'cycle',level:2,hide:false,goal:'vyklad',prog:'v2023',busy:null};
const recOf=t=>S.goal==='opakovanie'||S.goal==='fixacia'?'cards':S.goal==='aktivacia'?'vvn':KIND[t.kind]?.f||t.rec||'mind';
const norm=i=>typeof i==='string'?{t:i}:i;
const vis=(i,lv)=>{const l=norm(i).l||1;return lv===4?l<=1:l<=lv};
const txt=(i,lv)=>{i=norm(i);return lv===4?(i.e||i.t):i.t};

/* ---------- niť ---------- */
function threads(host,links,o={}){
 let svg=host.querySelector(':scope>.threads');
 if(!svg){svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','threads');svg.setAttribute('aria-hidden','true');host.prepend(svg)}
 const hr=host.getBoundingClientRect();if(!hr.width)return;
 let out='';
 for(const[a,b,mode,color]of links){const hue=color?` style="stroke:${color}"`:'';
  if(!a||!b||a.classList.contains('veil')||b.classList.contains('veil'))continue;
  const A=a.getBoundingClientRect(),B=b.getBoundingClientRect();
  const ax=A.left-hr.left,ay=A.top-hr.top,bx=B.left-hr.left,by=B.top-hr.top;
  const ac=[ax+A.width/2,ay+A.height/2],bc=[bx+B.width/2,by+B.height/2];
  const dx=bc[0]-ac[0],dy=bc[1]-ac[1];let p,q,c1,c2;
  if(mode==='h'||Math.abs(dx)/Math.max(1,A.width+B.width)>Math.abs(dy)/Math.max(1,A.height+B.height)){
   const s=Math.sign(dx)||1;p=[ac[0]+s*A.width/2,ac[1]];q=[bc[0]-s*B.width/2,bc[1]];const k=(q[0]-p[0])*.5;c1=[p[0]+k,p[1]];c2=[q[0]-k,q[1]];
  }else{
   const s=Math.sign(dy)||1;p=[ac[0],ac[1]+s*A.height/2];q=[bc[0],bc[1]-s*B.height/2];const k=(q[1]-p[1])*.5;c1=[p[0],p[1]+k];c2=[q[0],q[1]-k];
  }
  if(mode==='arc'){const hit=(c,r,t)=>{const vx=t[0]-c[0],vy=t[1]-c[1],k=Math.min((r.width/2+6)/Math.abs(vx||1e-6),(r.height/2+6)/Math.abs(vy||1e-6));return[c[0]+vx*k,c[1]+vy*k]};p=hit(ac,A,bc);q=hit(bc,B,ac);const m=[(p[0]+q[0])/2,(p[1]+q[1])/2],cx=hr.width/2,cy=hr.height/2,ox=m[0]-cx,oy=m[1]-cy,L=Math.hypot(ox,oy)||1,f=Math.min(46,Math.hypot(q[0]-p[0],q[1]-p[1])*.3);c1=c2=[m[0]+ox/L*f,m[1]+oy/L*f]}
  const d=`M${p[0].toFixed(1)} ${p[1].toFixed(1)}C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
  out+=`<path class="t1"${hue} pathLength="1" d="${d}"/><path class="t2" d="${d}"/>`;
  if(o.arrow||mode==='arc'){const ang=Math.atan2(q[1]-c2[1],q[0]-c2[0]),s=9;const pt=(r,t)=>`${(q[0]+Math.cos(ang+t)*r).toFixed(1)},${(q[1]+Math.sin(ang+t)*r).toFixed(1)}`;out+=`<polygon class="ah"${color?` style="fill:${color}"`:''} points="${pt(0,0)} ${pt(-s*1.3,.5)} ${pt(-s*1.3,-.5)}"/>`}
 }
 svg.innerHTML=out;
}
function linked(host,get,o){const draw=()=>threads(host,get(),o);host._draw=draw;let f;const ro=new ResizeObserver(()=>{cancelAnimationFrame(f);f=requestAnimationFrame(draw)});ro.observe(host);host._ro=ro;document.fonts?.ready.then(draw);return host}

/* ---------- uzly ---------- */
const W=i=>`var(--w${i%6+1})`;
function node(item,ctx,cls='',hue){
 item=norm(item);const lv=ctx.level,detail=lv>=2&&lv<4&&item.d;
 const n=el('div',{class:'n '+cls,'data-k':item.t});if(hue!=null)n.style.setProperty('--c',W(hue));
 if(item.ic&&(lv===4||ctx.icons!==false))n.append(ic(item.ic));
 n.append(el('div',{class:'tx'},detail?el('b',{},txt(item,lv)):txt(item,lv),detail?el('small',{},item.d):null));
 if(ctx.hide&&!cls.includes('keep')){n.classList.add('hid');n.dataset.word=txt(item,lv);if(!ctx.sheet){n.tabIndex=0;n.setAttribute('role','button');n.setAttribute('aria-label','Odkryť skrytý uzol');const open=()=>{n.classList.remove('hid');n.removeAttribute('role');n.tabIndex=-1};n.addEventListener('click',open);n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}})}}
 return n;
}
const R={
 mind(d,c){const b=d.branches.filter(x=>vis(x,c.level)),mid=Math.ceil(b.length/2),hub=node({t:d.center},c,'strong keep'),links=[];let h0=0;
  const col=list=>el('div',{class:'col'},list.map(x=>{const hue=h0++,h=node(x,c,'mid',hue),k=(x.kids||[]).filter(y=>vis(y,c.level));if(c.width>=560)links.push([hub,h,'h',W(hue)]);return el('div',{class:'branch'},h,el('div',{class:'kids'},k.map(y=>node(y,c,'',hue))))}));
  return linked(el('div',{class:'dg mind'},col(b.slice(0,mid)),el('div',{class:'hubc'},hub),col(b.slice(mid))),()=>links)},
 cycle(d,c){if(d.scene==='water')return waterScene(d,c);const s=d.steps.filter(x=>vis(x,c.level)),wide=c.width>=620;
  if(!wide){const ns=s.map((x,i)=>node(x,c,'',i));return linked(el('div',{class:'dg list-cyc'},ns),()=>ns.map((n,i)=>[n,ns[(i+1)%ns.length]].slice(0)).slice(0,-1),{arrow:true})}
  const ns=s.map((x,i)=>{const a=-Math.PI/2+i*2*Math.PI/s.length,n=node(x,c,'',i);n.style.left=(50+35*Math.cos(a))+'%';n.style.top=(50+38*Math.sin(a))+'%';return n});
  return linked(el('div',{class:'dg cyc'},el('div',{class:'hub'},d.hub||''),ns),()=>ns.map((n,i)=>[n,ns[(i+1)%ns.length],'arc']),{arrow:true})},
 timeline(d,c){const e=d.events.filter(x=>vis(x,c.level)),dots=[];
  if(d.scene==='morava'&&c.width>=760)return moravaScene(e,c);
  if(c.width<560)return el('div',{},d.note?el('p',{class:'sub'},d.note):null,el('div',{class:'dg tl-list'},e.map((x,i)=>el('div',{class:'ev'},el('span',{class:'y'},x.y),node(x,c,'',i)))));
  const g=el('div',{class:'dg tl',style:'--c:'+e.length},e.map(x=>{const dot=el('span',{class:'dot'});dots.push(dot);return el('div',{class:'ev'},el('span',{class:'y'},x.y),dot,node(x,c,'',e.indexOf(x)))}));
  linked(g,()=>dots.slice(0,-1).map((p,i)=>[p,dots[i+1]]));
  return el('div',{},d.note?el('p',{class:'sub'},d.note):null,el('div',{class:'fig'},g))},
 venn(d,c){if(d.scene==='cells'&&c.width>=560)return cellsScene(d,c);const side=(h,l,i)=>el('div',{class:'side'},h?el('h4',{},h):null,l.filter(x=>vis(x,c.level)).map(x=>node(x,c,'',i)));return el('div',{class:'dg venn'},side(d.a,d.left,0),side('Spoločné',d.mid,4),side(d.b,d.right,2))},
 ttable(d,c){const r=d.rows.filter(x=>vis(x[0],c.level));return el('div',{class:'dg tt'},el('h4',{style:'--c:'+W(0)},d.a),el('h4',{style:'--c:'+W(3)},d.b),r.flatMap(p=>[node(p[0],c,'',0),node(p[1],c,'',3)]))},
 fish(d,c){const g=d.groups.filter(x=>vis(x,c.level)),head=node({t:d.problem},c,'strong keep');
  const grp=(x,top)=>{const hue=g.indexOf(x),h=node(x,c,'mid',hue),it=(x.items||[]).filter(y=>vis(y,c.level)).map(y=>node(y,c,'',hue));h._hue=hue;return{h,box:el('div',{class:'g'},top?[...it,h]:[h,...it])}};
  if(c.width<560)return el('div',{class:'dg fish-list'},head,g.map(x=>grp(x,false).box));
  const m=Math.ceil(g.length/2),top=g.slice(0,m).map(x=>grp(x,true)),low=g.slice(m).map(x=>grp(x,false)),anc=Array.from({length:m},()=>el('i',{}));
  const links=[...top.map((x,i)=>[x.h,anc[i],null,W(x.h._hue)]),...low.map((x,i)=>[x.h,anc[i],null,W(x.h._hue)]),...anc.map((a,i)=>[a,anc[i+1]||head])];
  const box=el('div',{class:'dg fish',style:'--m:'+m},el('div',{class:'bones'},el('div',{class:'row'},top.map(x=>x.box)),el('div',{class:'anc'},anc),el('div',{class:'row low'},low.map(x=>x.box))),head);
  return linked(box,()=>links,{arrow:false})},
 tree(d,c){const root=node(d.root,c,'strong keep'),k=d.root.kids.filter(x=>vis(x,c.level)),links=[],lv2=k.map((x,i)=>{const n=node(x,c,'mid',i);links.push([root,n,null,W(i)]);return n}),lv3=k.flatMap((x,i)=>(x.kids||[]).filter(y=>vis(y,c.level)).map(y=>{const n=node(y,c,'',i);links.push([lv2[i],n,null,W(i)]);return n}));
  const b=el('div',{class:'dg tree'+(c.width<560?' narrow':'')},el('div',{class:'lv'},root),el('div',{class:'lv'},lv2),el('div',{class:'lv'},lv3));linked(b,()=>links);return el('div',{class:'tree-wrap'},b)},
 cards(d,c){return el('div',{class:'dg cards'},d.filter(x=>vis(x,c.level)).map((x,i)=>{const b=el('button',{class:'card',type:'button',style:'--c:'+W(i)}),show=on=>{b.replaceChildren(el('small',{},on?'Odpoveď':'Otázka'),el('span',{},on?(c.level===4&&x.e)||x.a:x.q));b.classList.toggle('on',on);b.dataset.on=on?'1':''};show(false);b.addEventListener('click',()=>show(!b.dataset.on));return b}))},
 quiz(d,c){return el('div',{class:'dg quiz'},d.filter(x=>vis(x,c.level)).map(x=>{const why=el('div',{class:'why',hidden:true},x.w);const q=el('div',{class:'q'},el('p',{},x.q),x.o.map((o,i)=>el('button',{type:'button',onclick(ev){q.querySelectorAll('button').forEach(b=>b.classList.remove('good','badc'));ev.currentTarget.classList.add(i===x.k?'good':'badc');why.hidden=false;why.textContent=(i===x.k?'Správne. ':'Skúste ešte raz. ')+x.w}},o)),why);return q}))},
 vvn(d,c){const col=(h,l,i)=>el('div',{class:'c',style:'--c:'+W(i)},el('h4',{},h),l.map(x=>node(x,{...c,hide:false},'',i)));return el('div',{class:'dg vvn'},col('Viem',d.know,0),col('Chcem vedieť',d.want,3),col('Naučil/a som sa',d.learned,2))}
};
function renderForm(form,data,ctx){const out=R[form](data,ctx);if(ctx.sheet||matchMedia('(prefers-reduced-motion:reduce)').matches)out.querySelectorAll('[data-anim],animate,animateMotion,animateTransform').forEach(a=>a.remove());return ctx.level===4?el('div',{class:'easy'},out):out}

/* ---------- ilustrované scény ---------- */
function waterSVG(){
 let tr='';for(let i=0;i<30;i++){const x=30+i*20+(i*37%13),y=392+(i*53%46),h=30+(i*29%24);tr+=`<path d="M${x} ${y-h}l${(h*.38).toFixed(1)} ${h}h${(-h*.76).toFixed(1)}z" fill="${i%3?'#2f8f5b':'#1f7448'}"/><rect x="${x-2}" y="${y}" width="4" height="7" fill="#6b4a2f"/>`}
 const cloud=(x,y,k,f)=>`<g transform="translate(${x} ${y}) scale(${k})" fill="${f}"><circle cx="-60" cy="12" r="38"/><circle cx="-10" cy="-14" r="54"/><circle cx="52" cy="6" r="44"/><rect x="-96" y="10" width="190" height="42" rx="21"/></g>`;
 let rain='';for(let i=0;i<16;i++){const x=130+i*17,y=165+(i*47%40);rain+=`<path d="M${x} ${y}l-8 26" stroke="#2b8fd6" stroke-width="4" stroke-linecap="round"><animateTransform attributeName="transform" type="translate" values="0 -30;-14 90" dur="${(.8+(i%4)*.13).toFixed(2)}s" begin="${(i*.09).toFixed(2)}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="${(.8+(i%4)*.13).toFixed(2)}s" begin="${(i*.09).toFixed(2)}s" repeatCount="indefinite"/></path>`}
 let vap='';for(let i=0;i<7;i++){const x=800+i*58,d=(2.6+(i%3)*.5).toFixed(1);vap+=`<path d="M${x} 430c-16-26 16-44 0-70s16-44 0-70" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-dasharray="26 18" opacity=".8"><animate attributeName="stroke-dashoffset" values="0;-132" dur="${d}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.9;0" dur="${d}s" repeatCount="indefinite"/></path>`}
 const rays=Array.from({length:12},(_,i)=>`<rect x="-5" y="-92" width="10" height="26" rx="5" fill="#ffb627" transform="rotate(${i*30})"/>`).join('');
 const loop='M900 430C905 260 850 145 680 122C520 100 350 90 262 135C200 168 186 305 238 392C300 478 520 476 700 472C800 470 870 455 900 430Z';
 return `<svg viewBox="0 0 1200 640" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5bbcf0"/><stop offset="1" stop-color="#e6f8ff"/></linearGradient><linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d9be0"/><stop offset="1" stop-color="#114f96"/></linearGradient></defs>
 <rect width="1200" height="460" fill="url(#sky)"/>
 <g transform="translate(1050 100)"><g>${rays}<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="40s" repeatCount="indefinite"/></g><circle r="60" fill="#ffd23f"/></g>
 <path d="M-20 420L150 165L270 300L410 110L640 420Z" fill="#7186ad"/><path d="M150 165L108 228L140 214L168 240L196 214L212 233ZM410 110L352 190L392 172L418 204L452 176L478 203Z" fill="#fff"/>
 <path d="M0 410Q300 340 640 412L820 440L820 640L0 640Z" fill="#58b777"/>${tr}
 <g fill="#fff" stroke="#b5503c" stroke-width="2"><path d="M520 408h30v22h-30zM556 414h26v18h-26z"/></g><path d="M516 408l19-15 19 15zM553 414l16-13 16 13z" fill="#d9583e"/>
 <path d="M660 430Q900 412 1200 424V640H720Q690 520 660 430Z" fill="url(#sea)"/>
 <g fill="none" stroke="#a8e0ff" stroke-width="4" stroke-linecap="round" opacity=".7"><path d="M780 500q24-14 48 0t48 0"><animateTransform attributeName="transform" type="translate" values="0 0;26 0;0 0" dur="5s" repeatCount="indefinite"/></path><path d="M930 556q24-14 48 0t48 0"><animateTransform attributeName="transform" type="translate" values="0 0;-26 0;0 0" dur="6s" repeatCount="indefinite"/></path></g>
 <path d="M0 530Q300 505 720 540L740 640H0Z" fill="#8a5f3c"/><path d="M0 590Q340 566 736 600L740 640H0Z" fill="#5f7fb0"/>
 <path d="M60 612h620" stroke="#cfe6ff" stroke-width="4" stroke-dasharray="14 18" stroke-linecap="round"><animate attributeName="stroke-dashoffset" values="0;-64" dur="3s" repeatCount="indefinite"/></path>
 <path d="M430 200C450 300 330 340 400 412S560 470 720 468" fill="none" stroke="#2b8fd6" stroke-width="15" stroke-linecap="round"/><path d="M430 200C450 300 330 340 400 412S560 470 720 468" fill="none" stroke="#bfe9ff" stroke-width="3.500" stroke-dasharray="14 22"><animate attributeName="stroke-dashoffset" values="0;-72" dur="2s" repeatCount="indefinite"/></path>
 ${vap}${rain}${cloud(235,105,1.1,'#7c8eb0')}${cloud(660,110,1,'#fff')}${cloud(960,190,.5,'#fff')}
 <path id="loop" d="${loop}" fill="none" stroke="#e5376b" stroke-width="7" stroke-linecap="round"/><path d="${loop}" fill="none" stroke="#fff" stroke-width="2.200" stroke-dasharray="4 11" stroke-linecap="round"/>
 <path d="M0-20C7-8 13 0 13 8a13 13 0 0 1-26 0C-13 0-7-8 0-20z" data-anim="1" fill="#1f7fe0" stroke="#fff" stroke-width="3"><animateMotion dur="11s" repeatCount="indefinite" path="${loop}"/></path></svg>`}
function waterScene(d,c){const lv=c.level,s=d.steps.filter(x=>vis(x,lv)),sc=el('div',{class:'scene',html:waterSVG()});
 const ns=s.map((x,i)=>{const n=node(x,c,'',i);n.dataset.no=i+1;const lab=el('span',{},c.hide?(c.sheet?'':'?'):txt(x,lv)),pin=el('button',{class:'pin',type:'button',style:`left:${x.at[0]}%;top:${x.at[1]}%;--c:${W(i)}`,'aria-label':'Krok '+(i+1),onclick:()=>{if(n.classList.contains('hid'))n.click()}},el('i',{},i+1),lab);n._pin=pin;if(c.hide)n.addEventListener('click',()=>{lab.textContent=txt(x,lv)});sc.append(pin);return n});
 return el('div',{class:'dg scenewrap side'},sc,el('div',{class:'strip'},ns))}
function moravaSVG(path){let st='';for(let i=0;i<40;i++)st+=`<circle cx="${i*97%1200}" cy="${i*61%230}" r="${1+i%3*.6}" fill="#fff" opacity="${.3+i%4*.18}"/>`;
 let pal='';for(let i=0;i<34;i++)pal+=`<path d="M${820+i*9} 452v-${26+i%3*5}l4-7 4 7v${26+i%3*5}z" fill="#3d2a4a"/>`;
 let pine='';for(let i=0;i<26;i++){const x=i*48+(i*31%20),y=500+(i*17%26),h=36+(i*13%22);pine+=`<path d="M${x} ${y-h}l${(h*.32).toFixed(1)} ${h}h${(-h*.64).toFixed(1)}z" fill="#183a3f"/>`}
 return `<svg viewBox="0 0 1200 600" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1b4b"/><stop offset=".55" stop-color="#7a3b82"/><stop offset=".85" stop-color="#f08a5d"/><stop offset="1" stop-color="#ffc56b"/></linearGradient></defs>
 <rect width="1200" height="600" fill="url(#dusk)"/>${st}<circle cx="170" cy="110" r="44" fill="#fff2c9"/><circle cx="188" cy="100" r="40" fill="#2b2558"/>
 <path d="M0 420Q200 330 420 400T840 380T1200 410V600H0Z" fill="#4a3468"/>
 <path d="M0 470Q260 400 560 462T1200 440V600H0Z" fill="#2e4a58"/>${pal}
 <path d="M880 424h44v-40l12-14 12 14v40h46v30H880z" fill="#3d2a4a"/><path d="M930 454v-16a8 8 0 0 1 14 0v16z" fill="#ffc56b"/>
 ${pine}<path d="M0 540Q400 505 1200 546V600H0Z" fill="#14292f"/>
 <path d="${path}" fill="none" stroke="#ff8fb6" stroke-width="8" stroke-linecap="round"/><path d="${path}" fill="none" stroke="#fff" stroke-width="2.400" stroke-dasharray="5 12" stroke-linecap="round"/></svg>`}
function moravaScene(e,c){const lv=c.level,PATH='M30 300C150 170 250 420 400 310S640 170 780 300S1020 420 1175 270';
 const sc=el('div',{class:'scene mv',html:moravaSVG(PATH)}),pa=document.createElementNS('http://www.w3.org/2000/svg','path');pa.setAttribute('d',PATH);const L=pa.getTotalLength();
 const ns=e.map((x,i)=>{const pt=pa.getPointAtLength(L*(i+.5)/e.length),n=node({...x,ic:null},c,'',i);n.dataset.no=x.y;const lab=el('span',{},c.hide?'':txt({t:x.t},lv)),up=i%2===0;
  const m=el('div',{class:'med',style:`left:${pt.x/12}%;top:${pt.y/6+(up?-3:3)}%;--c:${W(i)}`},up?[lab,el('b',{},x.y),el('div',{class:'disc'},ic(x.ic,''))]:[el('div',{class:'disc'},ic(x.ic,'')),el('b',{},x.y),lab]);n._pin=m;if(c.hide)n.addEventListener('click',()=>{lab.textContent=x.t});sc.append(m);return n});
 const strip=el('div',{class:'strip tlstrip'},ns);ns.forEach(n=>{n.dataset.no=ns.indexOf(n)+1});return el('div',{class:'dg scenewrap'},sc,strip)}
const CELLAT={'bunková stena':[[4.8,70]],'chloroplasty':[[36,76]],'veľká vakuola':[[27,50]],'jadro':[[14,33],[71,42]],'cytoplazmatická membrána':[[23,87],[80,90]],'mitochondrie':[[14,70],[64,66]]};
function cellsSVG(){const ch=[[110,100],[90,270],[440,120],[452,280],[440,400],[120,395],[300,410]].map(([x,y],i)=>`<g transform="translate(${x} ${y}) rotate(${i*40})"><ellipse rx="30" ry="16" fill="#3fa34d"/><path d="M-20 0h40M-14-6h28M-14 6h28" stroke="#a7e39f" stroke-width="2"/></g>`).join('');
 const mt=(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="42" ry="20" fill="#f08a24"/><path d="M-30 0l9-11 9 22 9-22 9 22 9-22 9 11" fill="none" stroke="#ffe0b8" stroke-width="3"/></g>`;
 const nuc=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#a678d8" stroke="#6d3fb0" stroke-width="5"/><circle cx="${x+10}" cy="${y-6}" r="${r*.33}" fill="#5b2d9e"/>`;
 return `<svg viewBox="0 0 1200 520" aria-hidden="true"><rect x="48" y="30" width="470" height="440" rx="44" fill="#d8efc4" stroke="#5a9e3c" stroke-width="20"/><rect x="66" y="48" width="434" height="404" rx="30" fill="none" stroke="#8cc763" stroke-width="5"/><ellipse cx="322" cy="250" rx="104" ry="150" fill="#bfe6f5" stroke="#68b8dc" stroke-width="5"/>${nuc(165,170,62)}${mt(170,360,-20)}${ch}
 <path d="M690 150C760 30 990 20 1080 125C1165 225 1125 395 1010 445C880 498 710 450 672 330C655 270 660 205 690 150Z" fill="#fcdcd2" stroke="#e0786a" stroke-width="9"/>${nuc(850,215,66)}${mt(770,345,30)}${mt(1000,150,-30)}${mt(990,340,15)}<g fill="#fff" stroke="#e0a79a" stroke-width="3"><circle cx="960" cy="240" r="17"/><circle cx="880" cy="385" r="13"/><circle cx="1060" cy="250" r="11"/></g>
 <g font-family="Bricolage Grotesque,sans-serif" font-weight="700" font-size="26" text-anchor="middle" fill="#16214d"></g></svg>`}
function cellsScene(d,c){const lv=c.level,sc=el('div',{class:'scene ce',html:cellsSVG()}),links=[];let hue=0;
 const side=(h,l)=>el('div',{class:'lc'},el('h4',{},h),l.filter(x=>vis(x,lv)).map(x=>{const t=norm(x).t,at=CELLAT[t],i=hue++,n=node(x,c,'',i);(at||[]).forEach(([a,b])=>{const dot=el('span',{class:'an',style:`left:${a}%;top:${b}%;--c:${W(i)}`});sc.append(dot);links.push([n,dot,null,W(i)])});return n}));
 const lab=el('div',{class:'labels'},side(d.a,d.left),side('Spoločné',d.mid),side(d.b,d.right));
 return linked(el('div',{class:'dg cells'},sc,lab),()=>links)}

/* ---------- kreslenie štúdia ---------- */
function paintBrief(){
 $('#fTopic').value=S.topic.title;$('#fSubject').value=S.topic.subject;$('#fGrade').value=S.topic.grade;$('#fGoal').value=S.goal;
 for(const b of document.querySelectorAll('#samples .chip'))b.setAttribute('aria-pressed',b.dataset.k===S.key);
}
function paintRail(){
 const r=$('#rail'),rec=recOf(S.topic);r.replaceChildren(...FORMS.map(f=>{const has=!!S.topic.forms[f.id];
  return el('button',{type:'button',class:(has?'':'none ')+(f.id===rec?'rec':''),'aria-pressed':String(S.form===f.id),title:has?f.n:f.n+': pripraví AI',onclick(){S.form=f.id;paintAll()}},ic(f.ic,''),f.n)}));
}
function paintLevels(){
 $('#levels').replaceChildren(...LEVELS.map(([v,n])=>el('button',{type:'button','aria-pressed':String(S.level===v),onclick(){S.level=v;paintAll()}},n)));
 const h=$('#hideBtn');h.replaceChildren(ic('eye',''),S.hide?'Ukázať všetko':'Skryť uzly');h.setAttribute('aria-pressed',String(S.hide));
 const can=['cards','quiz','vvn'].includes(S.form);h.disabled=can;h.title=can?'Táto podoba už pracuje s odkrývaním sama.':'';
}
function flipSnap(){const m=new Map();document.querySelectorAll('#canvas .n[data-k]').forEach(n=>{if(!m.has(n.dataset.k))m.set(n.dataset.k,n.getBoundingClientRect())});return m}
function flipPlay(m){settle();if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;let i=0;document.querySelectorAll('#canvas .n[data-k]').forEach(n=>{const a=m.get(n.dataset.k),b=n.getBoundingClientRect();if(a&&n.animate){n.animate([{translate:`${a.left-b.left}px ${a.top-b.top}px`},{translate:'0 0'}],{duration:620,easing:'cubic-bezier(.2,.85,.2,1)'})}else if(n.animate){n.animate([{opacity:0,scale:.7},{opacity:1,scale:1}],{duration:380,delay:Math.min(i++*35,420),easing:'ease-out',fill:'backwards'})}})}
let flipT;function settle(){clearTimeout(flipT);flipT=setTimeout(()=>document.querySelectorAll('#canvas .dg').forEach(d=>{d.querySelector(':scope>.threads')?.classList.add('still');d._draw?.()}),1000)}
function paintCanvas(){
 const c=$('#canvas'),f=F[S.form],data=S.topic.forms[S.form],snap=flipSnap();
 c.querySelectorAll('.dg').forEach(d=>d._ro?.disconnect());
 const head=[el('h2',{},S.topic.title),el('div',{class:'sub'},`${f.n} · ${S.topic.grade}. ročník · ${S.topic.subject}`)];
 if(!data){
  const s=sample;c.replaceChildren(...head,el('p',{},`Podobu ${f.n} pre túto tému ešte nemáme.`),
   s?el('button',{class:'btn main',type:'button',onclick:()=>genForm(S.form)},'Pripraviť túto podobu cez AI'):'');return}
 const w=Math.max(200,c.clientWidth-36);
 if(S.hide&&!['cards','quiz','vvn'].includes(S.form))head.push(el('div',{class:'note-hide'},'Ťuknite na uzol a odkryte ho.'));
 c.replaceChildren(...head,renderForm(S.form,data,{level:S.level,hide:S.hide,width:w}));
 flipPlay(snap);
}
function paintWhy(){
 const t=S.topic,rec=recOf(t),byGoal=rec!==(KIND[t.kind]?.f),p=$('#whyPanel');if(!p)return;
 const reason=byGoal?(S.goal==='aktivacia'?'Na začiatku hodiny žiaci najprv sami pomenujú, čo už vedia a čo chcú zistiť.':'Pri tomto cieli hodiny si žiaci učivo vybavujú z pamäti, a to najviac pomáha zapamätaniu.'):(t.why?.[rec]||`Táto podoba sa pre typ učiva ${KIND[t.kind]?.n||''} hodí najviac.`);
 const kids=[el('div',{class:'kind'},'Typ učiva: '+(KIND[t.kind]?.n||'iný')),el('h3',{},'Odporúčam: '+F[rec].n),el('p',{},reason)];
 const alts=(t.alts||[]).filter(a=>a[0]!==rec).slice(0,3);
 if(alts.length)kids.push(el('div',{class:'alts'},alts.map(([id,w])=>el('button',{type:'button',onclick(){S.form=id;paintAll()}},el('b',{},F[id].n),el('small',{},w)))));
 p.replaceChildren(...kids);
}
const stdCache={};
function paintSvp(){
 const t=S.topic,prog=S.prog==='v2015'?'2015':'2023',p=$('#svpPanel');
 const tabs=el('div',{class:'prog',role:'group','aria-label':'Štátny vzdelávací program'},[['v2023','ŠVP 2023'],['v2015','ŠVP 2015']].map(([id,n])=>el('button',{type:'button','aria-pressed':String(S.prog===id),onclick(){S.prog=id;paintSvp()}},n)));
 const box=el('div',{},el('p',{class:'warn'},'Hľadám štandardy…'));p.replaceChildren(el('h3',{},'Štandardy'),tabs,box);
 const draw=(items,exact)=>{if(S.topic!==t||(S.prog==='v2015'?'2015':'2023')!==prog)return;
  if(!items.length){box.replaceChildren(el('p',{class:'warn'},'V tomto programe sme k téme nenašli zodpovedajúci štandard. Vyberte ho prosím sami.'));return}
  box.replaceChildren(exact===false?el('p',{class:'warn'},'Pre tento ročník sme zhodu nenašli, zobrazujeme najbližšie štandardy z iných ročníkov.'):'',el('ul',{class:'std'},items.map(x=>el('li',{},x.text,el('small',{},`${x.kind} · ${x.where} · `,el('a',{href:x.url+'#page='+x.page,target:'_blank',rel:'noopener'},'strana '+x.page))))))};
 const picked=(t.picked||[]).filter(x=>x.where&&(prog==='2023'?/cyklus/.test(x.where):/ročník/.test(x.where)));
 if(picked.length){draw(picked,true);return}
 const k=[t.title,t.subject,t.grade,prog].join('|');
 if(stdCache[k]){draw(stdCache[k].items,stdCache[k].exact);return}
 const q=new URLSearchParams({title:t.title,subject:t.subject,grade:t.grade,program:prog});
 http('/api/standards?'+q).then(r=>{stdCache[k]=r;draw(r.items,r.exact)}).catch(()=>box.replaceChildren(el('p',{class:'warn'},'Štandardy sa nepodarilo načítať.')));
}
function guideBoxes(g){const it=(l,hue)=>el('div',{class:'g-list'},l.map(([a,b])=>el('div',{class:'g-item',style:'--c:'+W(hue)},el('b',{},a),b)));
 return{primer:el('div',{class:'g-box'},el('h3',{},'Téma za minútu'),el('p',{},g.primer)),
  steps:el('div',{class:'g-box'},el('h3',{},'Priebeh hodiny'),el('ol',{class:'g-steps'},g.steps.map(s=>el('li',{},el('span',{class:'tm'},s.time),el('div',{},el('b',{},s.do),s.say?el('q',{},s.say):null,el('small',{},s.check)))))),
  traps:el('div',{class:'g-box'},el('h3',{},'Na čo si dať pozor'),it(g.traps,0)),
  qa:el('div',{class:'g-box'},el('h3',{},'Keď sa žiaci opýtajú'),it(g.qa,3))}}
function paintGuide(){const p=$('#guide'),g=S.topic.guide;
 const head=[el('h2',{},'Sprievodca hodinou'),el('p',{},'Všetko, čo potrebujete vedieť a povedať, aj keď tento predmet neučíte každý deň.')];
 if(!g){p.replaceChildren(...head,sample?el('button',{class:'btn main',type:'button',style:'justify-self:start',onclick:()=>genGuide()},'Pripraviť sprievodcu cez AI'):el('p',{class:'warn'},'Sprievodcu pripraví AI.'));return}
 const b=guideBoxes(g);p.replaceChildren(...head,el('div',{class:'g-grid'},el('div',{class:'g-col'},b.primer,b.steps),el('div',{class:'g-col'},b.traps,b.qa)))}
function paintAll(){paintBrief();paintRail();paintLevels();paintCanvas();paintGuide();paintWhy();paintSvp()}

/* ---------- tabuľa ---------- */
function openBoard(){
 const data=S.topic.forms[S.form];if(!data)return;
 const root=$('#ovRoot');let hide=false,step=0,nodes=[],dg;
 const stage=el('div',{class:'stage'}),count=el('span',{class:'count'});
 const close=()=>{document.removeEventListener('keydown',key);root.replaceChildren();if(document.fullscreenElement)document.exitFullscreen?.().catch(()=>{})};
 function apply(){nodes.forEach((n,i)=>{n.classList.toggle('veil',i>=step);n._pin?.classList.toggle('veil',i>=step)});count.textContent=nodes.length?`${Math.min(step,nodes.length)} / ${nodes.length}`:'';stage.querySelectorAll('.dg').forEach(d=>d._draw?.());prevB.disabled=step<=0;nextB.disabled=step>=nodes.length}
 function build(reset){stage.querySelectorAll('.dg').forEach(d=>d._ro?.disconnect());
  const out=renderForm(S.form,data,{level:S.level,hide,width:Math.max(stage.clientWidth,window.innerWidth-40)});stage.replaceChildren(out);
  nodes=[...stage.querySelectorAll('.n:not(.keep)')];if(reset)step=0;apply()}
 const prevB=el('button',{class:'btn',type:'button',onclick(){if(step>0){step--;apply()}}},'Späť');
 const nextB=el('button',{class:'btn main',type:'button',onclick(){if(step<nodes.length){step++;apply()}}},'Ďalší uzol');
 const showAll=el('button',{class:'btn',type:'button',onclick(){step=nodes.length;apply()}},'Ukázať všetko');
 const hideB=el('button',{class:'btn',type:'button','aria-pressed':'false',onclick(){hide=!hide;hideB.setAttribute('aria-pressed',String(hide));hideB.textContent=hide?'Režim hádania: zapnutý':'Režim hádania';build(false)}},'Režim hádania');
 const full=el('button',{class:'btn',type:'button',onclick(){const o=document.querySelector('.ov');if(o?.requestFullscreen)o.requestFullscreen().catch(()=>{full.hidden=true});else full.hidden=true}},'Celá obrazovka');
 const ov=el('div',{class:'ov board',role:'dialog','aria-modal':'true','aria-label':'Režim tabule'},
  el('div',{class:'bar'},el('b',{},S.topic.title),prevB,count,nextB,showAll,hideB,full,el('button',{class:'btn',type:'button',onclick:close},'Zavrieť')),stage);
 root.replaceChildren(ov);
 const key=e=>{if(e.key==='Escape')close();else if(['ArrowRight',' ','PageDown'].includes(e.key)){e.preventDefault();nextB.click()}else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();prevB.click()}};
 document.addEventListener('keydown',key);build(true);nextB.focus();
}

/* ---------- tlač ---------- */
function wordBank(host){const w=[...host.querySelectorAll('.n.hid')].map(n=>n.dataset.word).filter(Boolean);for(let i=w.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[w[i],w[j]]=[w[j],w[i]]}return w}
function qList(form,data,lv,key){
 if(form==='cards')return el('div',{class:'lines'},data.filter(x=>vis(x,lv)).flatMap(x=>[el('p',{},x.q),key?el('p',{},el('b',{},(lv===4&&x.e)||x.a)):el('i',{})]));
 if(form==='quiz')return el('ol',{},data.filter(x=>vis(x,lv)).map(x=>el('li',{},x.q,el('ul',{style:'list-style:none;padding-left:4px'},x.o.map((o,i)=>el('li',{},(key&&i===x.k?'☑ ':'☐ ')+o))))));
 return null}
function openPrint(){
 const t=S.topic,data=t.forms[S.form];if(!data)return;
 const lv=S.level,form=S.form,isQ=form==='cards'||form==='quiz',title=`${t.title}: ${F[form].n}`,foot=`Klbko · ${t.grade}. ročník · ${t.subject} · úroveň ${LEVELS[lv-1][1]}`;
 const sheet=(...k)=>el('section',{class:'sheet'+(lv===4?' easy':'')},...k,el('div',{class:'foot'},foot));
 const ctxS=(hide)=>({level:lv,hide,sheet:true,width:674,icons:lv===4});
 const body1=isQ?qList(form,data,lv,false):form==='vvn'?el('div',{class:'dg vvn'},['Viem','Chcem vedieť','Naučil/a som sa'].map(h=>el('div',{class:'c'},el('h4',{},h),el('div',{class:'lines'},Array.from({length:12},()=>el('i',{}))))))
  :renderForm(form,data,ctxS(true));
 const bank=el('div',{class:'bank',hidden:true});
 const s1=sheet(el('h2',{},t.title),el('div',{class:'who'},el('span',{},'Meno:'),el('i',{}),el('span',{},'Dátum:'),el('i',{style:'flex:.5'})),el('p',{},isQ?'Odpovedz na otázky.':form==='vvn'?'Doplň tabuľku.':'Doplň prázdne políčka. Pomôž si slovami v rámčeku.'),bank,body1);
 const s2=sheet(el('h2',{},'Kľúč riešení: '+t.title),isQ?qList(form,data,lv,true):renderForm(form,data,ctxS(false)));
 const m=t.method;
 const gb=t.guide?guideBoxes(t.guide):null;
 const s3=m?sheet(el('h2',{},'Metodický list: '+t.title),el('h3',{},'Ciele'),el('ul',{},m.goals.map(g=>el('li',{},g))),gb?[gb.primer,gb.steps,gb.traps,gb.qa]:el('ol',{},m.plan.map(([a,b])=>el('li',{},el('b',{},a+': '),b))),el('p',{},'Materiál pripravila AI. Pred použitím ho, prosím, odborne skontrolujte a prispôsobte svojej triede.')):null;
 const pages=el('div',{class:'pages'},s1,s2,s3);
 const close=()=>$('#ovRoot').replaceChildren();
 const saveB=el('button',{class:'btn main',type:'button',onclick:()=>window.print()},'Vytlačiť alebo uložiť ako PDF');
 const msg=el('span',{role:'status',style:'font-size:14px'});
 const ov=el('div',{class:'ov print',role:'dialog','aria-modal':'true','aria-label':'Náhľad tlače'},el('div',{class:'bar noprint'},el('b',{},'Náhľad tlače A4'),msg,saveB,el('button',{class:'btn',type:'button',onclick:close},'Zavrieť')),pages);
 $('#ovRoot').replaceChildren(ov);
 const w=wordBank(s1);if(w.length){bank.hidden=false;bank.textContent=w.join('   ·   ')}
 pages.querySelectorAll('.dg').forEach(d=>d._draw?.());
}
/* ---------- živé generovanie ---------- */
const sample=true;
function setStatus(t,err,stop){const s=$('#status');s.hidden=!t;s.className='status'+(err?' err':'');s.replaceChildren(t||'');if(stop)s.append(stop)}
function errCopy(c){return({not_granted:'Bez povolenia sa vlastná téma nedá spracovať. Vyberte niektorú z pripravených tém.',sampling_disabled:'AI nie je pre tento účet dostupná.',rate_limited:'Dosiahli ste limit používania. Skúste to o chvíľu.',session_expired:'Prihláste sa znova a skúste to ešte raz.',refused:'Túto tému sa nepodarilo spracovať. Skúste ju sformulovať inak.',invalid_json:'Výsledok sa nepodaril. Stlačte Pripraviť pomôcku ešte raz.'})[c]||'Spojenie zlyhalo. Skúste to ešte raz.'}
const http=(u,o)=>fetch(u,o).then(async r=>{const j=await r.json().catch(()=>({}));if(!r.ok)throw Object.assign(new Error(j.error||'Chyba'),{user:j.error});return j});
async function ask(body,onOk,quiet){
 const ctl=new AbortController();const stop=el('button',{class:'btn',type:'button',onclick:()=>ctl.abort()},'Zastaviť');
 setStatus(quiet?'Dopĺňam Sprievodcu hodinou. ':'AI pripravuje materiál, zvyčajne to trvá do minúty. ',false,stop);$('#goBtn').disabled=true;
 try{onOk(await http('/api/generate',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body),signal:ctl.signal}));setStatus('')}
 catch(e){setStatus(e.name==='AbortError'?'':(quiet?'Sprievodcu sa teraz nepodarilo pripraviť. Pomôcka je hotová, skúste ho o chvíľu.':(e.user||'Spojenie zlyhalo. Skúste to ešte raz.')),true)}
 finally{$('#goBtn').disabled=false}
}
const base=()=>({title:S.topic.title,subject:S.topic.subject,grade:S.topic.grade,notes:S.topic.notes||''});
function genTopic(title,subject,grade,notes){
 ask({type:'topic',title,subject,grade,notes},v=>{const f=v.form;if(f==='timeline'&&subject==='Dejepis')v.data.scene='morava';
  const t={title,subject,grade,notes,kind:v.kind,why:{[f]:v.why},alts:v.alts,picked:v.standards,method:null,forms:{[f]:v.data}};
  S.key='vlastna';S.topic=t;S.form=recOf(t);if(!t.forms[S.form])S.form=f;paintAll();setTimeout(()=>{if(!t.guide)genGuide(true)},0)});
}
function genGuide(q){const t=S.topic;ask({...base(),type:'guide'},v=>{t.guide=v.guide;if(S.topic===t)paintGuide()},q===true)}
function genForm(form){const t=S.topic;ask({...base(),type:'form',form},v=>{if(form==='timeline'&&t.subject==='Dejepis')v.data.scene='morava';t.forms[form]=v.data;if(S.form===form)paintAll()})}

/* ---------- zdieľanie so žiakmi ---------- */
function openShare(){
 const t=S.topic,data=t.forms[S.form];if(!data)return;
 const pay={t:{title:t.title,subject:t.subject,grade:t.grade,forms:{[S.form]:data}},f:S.form,l:S.level,h:S.hide};
 const body=el('div',{class:'sharebox'},el('p',{},'Pripravujem odkaz…'));
 const close=()=>$('#ovRoot').replaceChildren();
 $('#ovRoot').replaceChildren(el('div',{class:'ov print',role:'dialog','aria-modal':'true','aria-label':'Odkaz pre žiakov'},el('div',{class:'bar noprint'},el('b',{},'Pre žiakov'),el('button',{class:'btn',type:'button',onclick:close},'Zavrieť')),body));
 const show=u=>{const inp=el('input',{id:'shareUrl',readonly:true,value:u});body.replaceChildren(el('img',{src:'/api/qr?u='+encodeURIComponent(u),alt:'QR kód odkazu',width:340,height:340}),el('p',{},'Žiaci naskenujú kód alebo otvoria odkaz. Nepotrebujú účet.'),inp,el('button',{class:'btn main',type:'button',onclick(ev){navigator.clipboard?.writeText(u).then(()=>{ev.target.textContent='Skopírované'}).catch(()=>inp.select())}},'Kopírovať odkaz'))};
 http('/api/share',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(pay)}).then(r=>show(location.origin+'/z/'+r.id)).catch(()=>{const h=btoa(unescape(encodeURIComponent(JSON.stringify(pay))));show(location.origin+'/z/m#'+h)});
}
async function loadShare(){
 document.body.classList.add('student');let p=null;
 try{const h=location.hash.slice(1);if(h)p=JSON.parse(decodeURIComponent(escape(atob(h))));else p=await http('/api/share/'+encodeURIComponent(window.KLBKO_SHARE))}catch{}
 if(!p?.t?.forms){$('#canvas').replaceChildren(el('h2',{},'Materiál sa nenašiel'),el('p',{},'Požiadajte učiteľa o nový odkaz.'));return}
 S.topic={...p.t,kind:null,alts:[]};S.form=p.f;S.level=p.l||2;S.hide=!!p.h;paintCanvas();paintLevels();
}

/* ---------- štart ---------- */
function loadTopic(k){S.key=k;S.topic=TOPICS[k];S.form=recOf(S.topic);if(!S.topic.forms[S.form])S.form=KIND[S.topic.kind].f;S.hide=false;paintAll();setStatus('')}
(function init(){
 $('#fSubject').replaceChildren(...SUBJECTS.map(s=>el('option',{},s)));
 $('#fGrade').replaceChildren(...Array.from({length:9},(_,i)=>el('option',{value:i+1},`${i+1}. (${cycleOf(i+1)})`)));
 $('#fGoal').replaceChildren(...GOALS.map(([v,n])=>el('option',{value:v},n)));
 $('#samples').append(el('span',{},'Vyskúšajte:'),...Object.entries(TOPICS).map(([k,t])=>el('button',{class:'chip',type:'button','data-k':k,onclick:()=>loadTopic(k)},t.title)));
 $('#boardBtn').append(ic('screen',''),'Na tabuľu');$('#printBtn').append(ic('print',''),'Tlač');
 $('#boardBtn').addEventListener('click',openBoard);$('#shareBtn').append(ic('people',''),'Pre žiakov');$('#shareBtn').addEventListener('click',openShare);$('#printBtn').addEventListener('click',openPrint);
 $('#hideBtn').addEventListener('click',()=>{S.hide=!S.hide;paintLevels();paintCanvas()});
 $('#fGoal').addEventListener('change',e=>{S.goal=e.target.value;const r=recOf(S.topic);if(S.topic.forms[r])S.form=r;paintAll()});
 $('#briefForm').addEventListener('submit',e=>{e.preventDefault();const title=$('#fTopic').value.trim();if(!title){setStatus('Napíšte tému.',true);return}
  const subj=$('#fSubject').value,gr=Number($('#fGrade').value),k=Object.keys(TOPICS).find(k=>TOPICS[k].title.toLowerCase()===title.toLowerCase()&&TOPICS[k].subject===subj&&TOPICS[k].grade===gr);if(k){loadTopic(k);return}
  genTopic(title,subj,gr,$('#fNotes').value)});
 let rw;window.addEventListener('resize',()=>{cancelAnimationFrame(rw);rw=requestAnimationFrame(()=>{if(!$('#ovRoot').firstChild&&S.form==='cycle')paintCanvas()})});
 if(!window.KLBKO_SHARE)paintAll();
 if(window.KLBKO_SHARE)loadShare();
})();

})();
