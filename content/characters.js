// ═══════════════════════════════════════════════════════════════════
//  PERSONAGGI — Il Mondo di Eliana
//  Per AGGIUNGERE un amico: copia una riga qui sotto e cambia i campi.
//  Campi:
//    id       identificativo unico (minuscolo, senza spazi)
//    name     nome mostrato
//    type     tipo in italiano (Gatto, Cane, Gufo…) — mostrato nel pannello ⓘ
//    desc     descrizione breve (mostrata nel pannello ⓘ)
//    species  FORMA del corpo. Deve esistere in creatures.js. Valori disponibili:
//             cat dog wolf horse gorilla hedgehog squirrel croc caterpillar monkey owl bear cow
//    colors   [corpo, accento, extra?] in esadecimale — es. ['#e8443a','#ffd7a0']
//    size     grandezza (10 piccolo … 36 grande)
//    speed    velocità di movimento (0.2 lento … 0.8 veloce)
//    motion   come si muove: wander | float | dart | hop | crawl
//    sound    voce: {type: sine|square|triangle|sawtooth, base: frequenza Hz, rate: quanto spesso 0..1}
//    env      ambiente "di casa": acqua | foresta | spiaggia | parco | casa
// ═══════════════════════════════════════════════════════════════════

const CAST = [
  {id:'maddalena', name:'Maddalena', type:'Gatta',      desc:'Gatta rossa gigante dalla coda super soffice: adora popcorn e percorsi a ostacoli.',
   species:'cat',    colors:['#e8443a','#ffd7a0'],                 size:32, speed:0.75, motion:'hop',    sound:{type:'triangle',base:210, rate:0.28}, env:'casa'},
  {id:'catto',     name:'Catto',     type:'Gattino',    desc:'Micio blu minuscolo: da schizzinoso a coraggioso, fa il super-duper-mega-fusa.',
   species:'cat',    colors:['#5aa9ff','#dff0ff'],                 size:15, speed:0.5,  motion:'dart',   sound:{type:'sine',    base:520, rate:0.16}, env:'casa'},
  {id:'gallo',     name:'Gallo',     type:'Gatto',      desc:'Gatto dal mento rosso e coda blu piumosa: vive su una barca e ha una voce fortissima.',
   species:'cat',    colors:['#9b6a44','#e8443a','#4f8bff'],       size:22, speed:0.4,  motion:'wander', sound:{type:'sawtooth',base:300, rate:0.2},  env:'acqua'},
  {id:'ciuffo',    name:'Ciuffo',    type:'Cavallo',    desc:'Cavallo a macchie tramonto: impetuoso e giocherellone, ama spiaggia e parco.',
   species:'horse',  colors:['#e0662f','#c23b2a','#b98a52'],       size:32, speed:0.8,  motion:'dart',   sound:{type:'sawtooth',base:180, rate:0.14}, env:'spiaggia'},
  {id:'ciuffa',    name:'Ciuffa',    type:'Cavalla',    desc:'Cavalla a macchie arcobaleno: vivace e curiosa, migliore amica di Ciuffo.',
   species:'horse',  colors:['#eef0f5','#ffe27a','#7fb2ff'],       size:32, speed:0.72, motion:'wander', sound:{type:'sawtooth',base:200, rate:0.14}, env:'spiaggia'},
  {id:'grunt',     name:'Grunt',     type:'Gorilla',    desc:'Gorilla blu grande e rimbalzante: pieno di energia, impara a lanciare solo cose sicure.',
   species:'gorilla',colors:['#4f7fe0','#bcd2ff'],                 size:36, speed:0.5,  motion:'hop',    sound:{type:'square',  base:120, rate:0.2},  env:'casa'},
  {id:'henry',     name:'Henry',     type:'Riccio',     desc:'Riccetto super-eccitabile: ama i giri in macchina e fa la danza a patata.',
   species:'hedgehog',colors:['#8a6a4a','#d8b088'],                size:13, speed:0.62, motion:'dart',   sound:{type:'square',  base:1100,rate:0.22}, env:'parco'},
  {id:'peppa',     name:'Peppa',     type:'Scoiattola', desc:'Scoiattolina zucchero filato: giocosa e disordinata, poi impara a riordinare.',
   species:'squirrel',colors:['#7fb2ff','#ff9ecb'],                size:14, speed:0.55, motion:'hop',    sound:{type:'sine',    base:800, rate:0.2},  env:'foresta'},
  {id:'tinto',     name:'Tinto',     type:'Scoiattolo', desc:'Scoiattolino verde e blu: gemello di Peppa, impila pigne e fa il supereroe.',
   species:'squirrel',colors:['#6fd06f','#4f8bff'],                size:14, speed:0.55, motion:'hop',    sound:{type:'sine',    base:760, rate:0.2},  env:'foresta'},
  {id:'tutti',     name:'Tutti',     type:'Coccodrillo',desc:'Coccodrillo giallo gentile e sereno: aiuta gli amici stando loro vicino.',
   species:'croc',   colors:['#ffd23a','#e0b020'],                 size:30, speed:0.24, motion:'wander', sound:{type:'sine',    base:150, rate:0.1},  env:'acqua'},
  {id:'jugi',      name:'Jugi',      type:'Cane',       desc:'Cagnolino rosso ciliegia: giocoso e competitivo, poi impara a condividere.',
   species:'dog',    colors:['#d63a3a','#ffd0d0'],                 size:20, speed:0.52, motion:'hop',    sound:{type:'square',  base:340, rate:0.2},  env:'casa'},
  {id:'jugetta',   name:'Jugetta',   type:'Cagnolina',  desc:'Cagnolina azzurro cielo: gemella di Jugi, costruisce torri di blocchi.',
   species:'dog',    colors:['#8fd0ff','#eaf6ff'],                 size:20, speed:0.46, motion:'wander', sound:{type:'square',  base:400, rate:0.2},  env:'casa'},
  {id:'caterina',  name:'Caterina',  type:'Lupa',       desc:'Lupa dal mantello blu e rosso: birichina, poi impara a essere generosa.',
   species:'wolf',   colors:['#4f7fe0','#e8443a'],                 size:24, speed:0.62, motion:'dart',   sound:{type:'sawtooth',base:260, rate:0.14}, env:'foresta'},
  {id:'tata',      name:'Tata',      type:'Lupa',       desc:'Lupetta autunno: sorella minore, suona il tamburo con ritmi buffi.',
   species:'wolf',   colors:['#e0662f','#ffd23a','#9b6a44'],       size:22, speed:0.5,  motion:'hop',    sound:{type:'triangle',base:220, rate:0.16}, env:'foresta'},
  {id:'giacomo',   name:'Giacomo',   type:'Bruco',      desc:'Bruco arcobaleno timido e sensibile: vive in un barattolo di Dido.',
   species:'caterpillar',colors:['#ff5a5a','#ffd23a','#6fd06f','#7fb2ff'], size:16, speed:0.3, motion:'crawl', sound:{type:'sine', base:600, rate:0.08}, env:'casa'},
  {id:'george',    name:'George',    type:'Scimmietta', desc:'Marmoset saggio e buffo: insegna il trucco fermati-respira-stringi.',
   species:'monkey', colors:['#ffd23a','#e0902f'],                 size:14, speed:0.5,  motion:'hop',    sound:{type:'triangle',base:700, rate:0.18}, env:'casa'},
  {id:'poppy',     name:'Poppy',     type:'Scimmietta', desc:'Marmoset dolce e calma: mostra il respiro profondo con le guance a palloncino.',
   species:'monkey', colors:['#e8443a','#e0902f'],                 size:14, speed:0.35, motion:'float',  sound:{type:'sine',    base:640, rate:0.12}, env:'casa'},
  {id:'momo',      name:'Momo',      type:'Gufo',       desc:'Gufo di bronzo dagli occhioni dorati: intelligente, raccoglie i pensieri felici.',
   species:'owl',    colors:['#b98a52','#ffe27a'],                 size:22, speed:0.3,  motion:'float',  sound:{type:'sine',    base:340, rate:0.14}, env:'foresta'},
  {id:'jack',      name:'Jack',      type:'Cane',       desc:'Cane viola giocosissimo: si arrabbia in fretta ma impara a calmarsi come le bolle.',
   species:'dog',    colors:['#9a5ad6','#e0c0ff'],                 size:20, speed:0.5,  motion:'dart',   sound:{type:'sawtooth',base:280, rate:0.18}, env:'casa'},
  {id:'patpat',    name:'Patpat',    type:'Orso',       desc:'Orsetto morbido come marshmallow: coccolone, impara a dormire da solo.',
   species:'bear',   colors:['#efe0c8','#d8c5a0'],                 size:32, speed:0.2,  motion:'wander', sound:{type:'sine',    base:180, rate:0.08}, env:'casa'},
  {id:'frullato',  name:'Frullato',  type:'Mucca',      desc:'Mucca di peluche profumata di vaniglia: Protettrice della Notte, scaccia gli incubi.',
   species:'cow',    colors:['#f2e9d8','#d8b8a0'],                 size:24, speed:0.3,  motion:'float',  sound:{type:'sine',    base:240, rate:0.1},  env:'casa'},
];

// indice per id + tabella INFO (tipo/descrizione) derivata — non modificare, si aggiorna da solo
const BYID = Object.fromEntries(CAST.map(c => [c.id, c]));
const INFO = Object.fromEntries(CAST.map(c => [c.id, [c.type, c.desc]]));
