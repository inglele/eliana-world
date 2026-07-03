// ═══════════════════════════════════════════════════════════════════
//  AMBIENTE — Il Mondo di Eliana
//  Il mondo è UNO SOLO (cielo + prato). Gli elementi naturali qui sotto
//  si accendono/spengono con gli interruttori in basso e si combinano.
//  Sono in posizione FISSA. Solo natura.
//  Campi layer:
//    name  etichetta col simbolo (mostrata sull'interruttore; testo tradotto in locales)
//    on    acceso all'avvio?
//    amb   suono ambientale {cut: filtro Hz, g: volume 0..1}. Sommati se più attivi.
// ═══════════════════════════════════════════════════════════════════

// Base sempre presente: cielo + prato (colori giorno e notte)
const BASE = {
  skyDay:   [[135,195,235],[200,225,245]],   // [alto, basso]
  skyNight: [[8,16,38],[16,28,58]],
  groundDay:  [96,165,92],
  groundNight:[16,40,26],
  horizon: 0.45,   // frazione di altezza dove finisce il cielo e inizia il prato (più basso = più prato per gli animali)
};

// Elementi natura (ordine = ordine interruttori). key usato in personaggi (campo env) e audio.
const LAYERS = {
  montagne: { name:'⛰️ Montagne', on:false, amb:{cut:280, g:0.03} },
  bosco:    { name:'🌲 Bosco',    on:true,  amb:{cut:900, g:0.09} },
  laghetto: { name:'💧 Laghetto', on:true,  amb:{cut:520, g:0.11} },
  mare:     { name:'🌊 Mare',     on:false, amb:{cut:620, g:0.12} },
  fiori:    { name:'🌸 Fiori',    on:false, amb:{cut:0,   g:0.0 } },
};
