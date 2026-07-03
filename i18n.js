// ═══════════════════════════════════════════════════════════════════
//  LINGUE (i18n) — Il Mondo di Eliana
//  Tutte le stringhe visibili all'utente, in italiano e inglese.
//  Per AGGIUNGERE una lingua: copia il blocco "en" e traduci i valori.
//  I nomi propri dei personaggi (Maddalena, Gallo…) NON si traducono.
//
//  Nota: i tipi/descrizioni italiani stanno in characters.js (campi type/desc).
//  Qui sotto ci sono solo le traduzioni EN dei personaggi + tutta la UI.
// ═══════════════════════════════════════════════════════════════════

const I18N = {
  it: {
    enter: 'tocca per entrare',
    clear: 'Svuota',
    friends: 'Gli amici',
    friendsIntro: 'Gli amici che vivono nel mondo:',
    clockTitle: 'Che ore sono?',
    phases: { alba:'🌅 Alba', giorno:'🌞 Giorno', tramonto:'🌇 Tramonto', notte:'🌙 Notte', auto:'🕒 Auto (ora reale)' },
    envs: { acqua:'🌊 Laghetto', foresta:'🌲 Foresta', spiaggia:'🏖 Spiaggia', parco:'🌳 Parco', casa:'🏠 Casa' },
    // tipi/descrizioni personaggi = presi da characters.js (IT), non serve ripeterli qui
    chars: {},
  },
  en: {
    enter: 'tap to enter',
    clear: 'Clear',
    friends: 'The friends',
    friendsIntro: 'The friends who live in the world:',
    clockTitle: 'What time is it?',
    phases: { alba:'🌅 Dawn', giorno:'🌞 Day', tramonto:'🌇 Sunset', notte:'🌙 Night', auto:'🕒 Auto (real time)' },
    envs: { acqua:'🌊 Pond', foresta:'🌲 Forest', spiaggia:'🏖 Beach', parco:'🌳 Park', casa:'🏠 Home' },
    chars: {
      maddalena:['Cat',        'Giant red cat with a super-fluffy tail: loves popcorn and obstacle courses.'],
      catto:    ['Kitten',     'Tiny blue cat: picky-turned-brave, does the super-duper-mega-purr.'],
      gallo:    ['Cat',        'Red-chinned cat with a blue feathery tail: lives on a boat, has a huge voice.'],
      ciuffo:   ['Horse',      'Sunset-patched horse: impetuous and playful, loves beach and park.'],
      ciuffa:   ['Mare',       'Rainbow-patched mare: lively and curious, Ciuffo\u2019s best friend.'],
      grunt:    ['Gorilla',    'Big bouncy blue gorilla: full of energy, learns to throw only safe things.'],
      henry:    ['Hedgehog',   'Super-excitable little hedgehog: loves car rides and does a wobbly potato dance.'],
      peppa:    ['Squirrel',   'Cotton-candy squirrel: playful and messy, then learns to tidy up.'],
      tinto:    ['Squirrel',   'Green-and-blue squirrel: Peppa\u2019s twin, stacks pinecones, plays superhero.'],
      tutti:    ['Crocodile',  'Gentle serene yellow croc: helps friends by staying close.'],
      jugi:     ['Dog',        'Cherry-red pup: playful and competitive, then learns to share.'],
      jugetta:  ['Dog',        'Sky-blue pup: Jugi\u2019s twin, builds block towers.'],
      caterina: ['Wolf',       'Blue-and-red caped wolf: mischievous, then generous.'],
      tata:     ['Wolf',       'Autumn-coloured wolf: little sister, drums funny rhythms.'],
      giacomo:  ['Caterpillar','Rainbow caterpillar: shy and sensitive, lives in a Play-Doh jar.'],
      george:   ['Marmoset',   'Wise and funny marmoset: teaches the stop-breathe-squeeze trick.'],
      poppy:    ['Marmoset',   'Sweet calm marmoset: shows deep breathing with balloon cheeks.'],
      momo:     ['Owl',        'Bronze owl with golden eyes: clever, collects happy thoughts.'],
      jack:     ['Dog',        'Purple pup: super playful, gets angry fast but learns to calm like bubbles.'],
      patpat:   ['Bear',       'Marshmallow-soft teddy bear: cuddly, learns to sleep on his own.'],
      frullato: ['Cow',        'Vanilla-scented plush cow: the Night Protector, chases nightmares away.'],
    },
  },
};

// lingua attiva: ?lang= o salvata o quella del browser, default italiano
let LANG = (new URLSearchParams(location.search).get('lang')
         || localStorage.getItem('eliana_lang')
         || (navigator.language||'it').slice(0,2));
if(!I18N[LANG]) LANG = 'it';

const L = I18N[LANG];
// helper: tipo+descrizione personaggio nella lingua attiva (fallback all'italiano di characters.js)
function charInfo(c){ const en=L.chars[c.id]; return en ? en : [c.type, c.desc]; }
function envName(key){ return L.envs[key] || key; }
function setLang(code){ localStorage.setItem('eliana_lang', code); location.search='?lang='+code; }
