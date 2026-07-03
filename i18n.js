// ═══════════════════════════════════════════════════════════════════
//  i18n — loader lingue (Il Mondo di Eliana)
//  Le stringhe stanno nei file locales/<codice BCP 47>.js (es. it-IT.js, en-US.js),
//  che si registrano dentro l'oggetto I18N. Questo file sceglie la lingua attiva.
//  Deve essere caricato PRIMA dei file locales/*.js in index.html.
// ═══════════════════════════════════════════════════════════════════

const I18N = {};              // riempito dai file locales/*.js
const DEFAULT_LOCALE = 'it-IT';

// risolve un codice richiesto (es. "en", "en-GB", "it") al locale disponibile più vicino
function resolveLocale(want){
  if(!want) return null;
  want = want.replace('_','-');
  if(I18N[want]) return want;                                  // match esatto: en-US
  const lang = want.slice(0,2).toLowerCase();
  const hit = Object.keys(I18N).find(k => k.slice(0,2).toLowerCase()===lang); // stessa lingua, altra regione
  return hit || null;
}

// lingua attiva: risolta da initI18n() DOPO che i file locales/*.js si sono registrati
let LANG = DEFAULT_LOCALE;
let L = null;
function initI18n(){
  LANG = resolveLocale(new URLSearchParams(location.search).get('lang'))
      || resolveLocale(localStorage.getItem('eliana_lang'))
      || resolveLocale(navigator.language)
      || (navigator.languages||[]).map(resolveLocale).find(Boolean)
      || DEFAULT_LOCALE;
  L = I18N[LANG] || I18N[DEFAULT_LOCALE];
  return L;
}

// helper: tipo+descrizione personaggio nella lingua attiva (fallback ai campi type/desc di characters.js)
function charInfo(c){ const t=(L.chars||{})[c.id]; return t ? t : [c.type, c.desc]; }
function envName(key){ return (L.envs||{})[key] || key; }
// passa alla prossima lingua disponibile (ciclo)
function cycleLang(){
  const codes = Object.keys(I18N);
  const next = codes[(codes.indexOf(LANG)+1) % codes.length];
  localStorage.setItem('eliana_lang', next);
  location.search = '?lang=' + next;
}
