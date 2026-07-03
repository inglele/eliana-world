// ═══════════════════════════════════════════════════════════════════
//  AMBIENTI (SCENARI) — Il Mondo di Eliana
//  Per AGGIUNGERE uno scenario: copia una riga e cambia i campi.
//  Campi:
//    chiave   id interno (es. "acqua") — usato dai personaggi nel campo env
//    name     etichetta col simbolo, mostrata nel bottone
//    sky      colori cielo di GIORNO [alto, basso] in [R,G,B]
//    night    colori cielo di NOTTE  [alto, basso] in [R,G,B]
//    water    true = disegna riflessi d'acqua/onde (opzionale)
//    trees    true = disegna alberi silhouette sul fondo (opzionale)
//    amb      suono ambientale: {cut: taglio filtro Hz (più basso = più ovattato), g: volume 0..1}
// ═══════════════════════════════════════════════════════════════════

const ENVS = {
  acqua:    {name:'🌊 Laghetto', sky:[[80,150,210],[40,105,150]],  night:[[8,16,34],[6,26,52]],  water:true,  amb:{cut:520, g:0.12}},
  foresta:  {name:'🌲 Foresta',  sky:[[110,175,150],[60,120,90]],  night:[[10,22,20],[8,30,26]],  trees:true,  amb:{cut:900, g:0.09}},
  spiaggia: {name:'🏖 Spiaggia', sky:[[150,200,230],[220,200,160]],night:[[20,30,50],[40,44,60]], water:true,  amb:{cut:620, g:0.11}},
  parco:    {name:'🌳 Parco',    sky:[[130,190,225],[110,170,110]],night:[[12,22,38],[14,34,28]], trees:true,  amb:{cut:1000,g:0.08}},
  casa:     {name:'🏠 Casa',     sky:[[70,90,120],[120,110,140]],  night:[[18,18,30],[30,26,40]],               amb:{cut:400, g:0.06}},
};
let curEnv = 'acqua';   // ambiente iniziale
