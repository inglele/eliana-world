// ═══════════════════════════════════════════════════════════════════
//  FORME / SILHOUETTE — Il Mondo di Eliana
//  Qui si disegnano i CORPI degli animali (stile geometrico).
//  Serve toccare questo file SOLO per aggiungere un NUOVO TIPO di corpo
//  (una "species" nuova). Per aggiungere un animale di un tipo che esiste
//  già (es. un altro gatto), basta characters.js.
//
//  Per aggiungere una species nuova: aggiungi un ramo `else if(S==='drago'){…}`
//  usando gli helper ell()/tri() (coordinate centrate in 0,0, scala = s).
//    ell(x,y,rx,ry,fill)          → ellisse
//    tri(x1,y1,x2,y2,x3,y3,fill)  → triangolo
//    col[0]=corpo  col[1]=accento  col[2]=extra
//  Poi usa quel nome in characters.js nel campo `species`.
// ═══════════════════════════════════════════════════════════════════

// Nota: usa la variabile globale `ctx` (canvas del mondo), condivisa con index.html.
function drawCreature(c, sz){
  const col=c.colors, sleeping=c.sleep>0.6;
  ctx.lineJoin='round'; ctx.lineCap='round';
  const body=col[0], acc=col[1]||col[0], ex=col[2]||acc;
  const S=c.species;
  // helper base
  function ell(x,y,rx,ry,fill){ ctx.beginPath(); ctx.ellipse(x,y,rx,ry,0,0,6.2832); ctx.fillStyle=fill; ctx.fill(); }
  function tri(x1,y1,x2,y2,x3,y3,fill){ ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.lineTo(x3,y3); ctx.closePath(); ctx.fillStyle=fill; ctx.fill(); }
  const s=sz;
  if(S==='cat'){
    ell(0,0,s*0.9,s*0.75,body);
    tri(-s*0.6,-s*0.55,-s*0.3,-s*1.15,-s*0.05,-s*0.5,body); // orecchio L
    tri( s*0.6,-s*0.55, s*0.3,-s*1.15, s*0.05,-s*0.5,body); // orecchio R
    ctx.strokeStyle=acc; ctx.lineWidth=s*0.14; ctx.beginPath(); ctx.moveTo(s*0.8,s*0.2); ctx.quadraticCurveTo(s*1.5,-s*0.1,s*1.3,-s*0.8); ctx.stroke(); // coda
  } else if(S==='dog'){
    ell(0,0,s*0.95,s*0.72,body);
    ell(-s*0.7,-s*0.2,s*0.28,s*0.5,acc); ell(s*0.7,-s*0.2,s*0.28,s*0.5,acc); // orecchie flosce
    ctx.strokeStyle=acc; ctx.lineWidth=s*0.14; ctx.beginPath(); ctx.moveTo(s*0.85,0); ctx.quadraticCurveTo(s*1.4,-s*0.3,s*1.2,-s*0.7); ctx.stroke();
  } else if(S==='wolf'){
    ell(0,0,s*0.9,s*0.68,body);
    tri(-s*0.55,-s*0.5,-s*0.35,-s*1.2,-s*0.1,-s*0.45,acc);
    tri( s*0.55,-s*0.5, s*0.35,-s*1.2, s*0.1,-s*0.45,acc);
    tri(s*0.8,s*0.1,s*1.5,-s*0.2,s*1.3,-s*0.9,body); // coda folta
  } else if(S==='horse'){
    ell(0,s*0.1,s*1.1,s*0.6,body);
    ell(s*0.9,-s*0.6,s*0.5,s*0.45,body); // testa
    tri(-s*1.0,-s*0.5,-s*0.6,-s*0.5,-s*0.8,s*0.1,acc); // criniera
    ctx.strokeStyle=col[2]||acc; ctx.lineWidth=s*0.16; ctx.beginPath(); ctx.moveTo(-s*1.0,0); ctx.quadraticCurveTo(-s*1.5,s*0.4,-s*1.3,s*0.9); ctx.stroke();
  } else if(S==='gorilla'){
    ell(0,0,s*1.0,s*0.95,body);
    ell(-s*0.85,-s*0.5,s*0.3,s*0.35,body); ell(s*0.85,-s*0.5,s*0.3,s*0.35,body);
    ell(0,s*0.15,s*0.55,s*0.5,acc); // pancia
  } else if(S==='hedgehog'){
    ell(0,s*0.1,s*0.95,s*0.7,acc); // faccia chiara
    for(let i=-3;i<=3;i++) tri(i*s*0.28,-s*0.3, i*s*0.28-s*0.12,-s*1.15, i*s*0.28+s*0.12,-s*0.3, body); // aculei
    ell(s*0.7,s*0.2,s*0.35,s*0.3,acc);
  } else if(S==='squirrel'){
    ell(0,s*0.1,s*0.7,s*0.72,body);
    ctx.beginPath(); ctx.moveTo(-s*0.5,s*0.3); ctx.quadraticCurveTo(-s*1.6,-s*0.2,-s*0.9,-s*1.2); ctx.quadraticCurveTo(-s*0.3,-s*0.6,-s*0.5,s*0.3); ctx.fillStyle=acc; ctx.fill(); // coda grande
    tri(-s*0.3,-s*0.55,-s*0.15,-s*1.0,0,-s*0.5,body);
  } else if(S==='croc'){
    ell(0,0,s*1.2,s*0.5,body);
    ell(s*1.1,s*0.05,s*0.7,s*0.28,body); // muso lungo
    for(let i=0;i<5;i++) tri(-s*0.8+i*s*0.45,-s*0.45,-s*0.65+i*s*0.45,-s*0.85,-s*0.5+i*s*0.45,-s*0.45,acc); // dorso
  } else if(S==='caterpillar'){
    for(let i=0;i<5;i++){ ell((i-2)*s*0.55,Math.sin(i*0.9+ (performance.now()/300))*s*0.12, s*0.42,s*0.42, col[i%col.length]); }
  } else if(S==='monkey'){
    ell(0,0,s*0.8,s*0.75,body);
    ell(-s*0.75,-s*0.1,s*0.28,s*0.32,body); ell(s*0.75,-s*0.1,s*0.28,s*0.32,body); // orecchie tonde
    ell(0,s*0.15,s*0.5,s*0.45,acc);
    ctx.strokeStyle=body; ctx.lineWidth=s*0.13; ctx.beginPath(); ctx.moveTo(-s*0.7,s*0.3); ctx.quadraticCurveTo(-s*1.5,s*0.2,-s*1.2,-s*0.5); ctx.stroke();
  } else if(S==='owl'){
    ell(0,0,s*0.85,s*0.95,body);
    ell(-s*0.38,-s*0.3,s*0.32,s*0.32,'#20303a'); ell(s*0.38,-s*0.3,s*0.32,s*0.32,'#20303a'); // occhioni scuri
    if(!sleeping){ ell(-s*0.38,-s*0.3,s*0.15,s*0.15,acc); ell(s*0.38,-s*0.3,s*0.15,s*0.15,acc); }
    tri(-s*0.7,-s*0.7,-s*0.35,-s*1.1,-s*0.15,-s*0.6,body);
    tri( s*0.7,-s*0.7, s*0.35,-s*1.1, s*0.15,-s*0.6,body);
  } else if(S==='bear'){
    ell(0,0,s*0.95,s*0.9,body);
    ell(-s*0.7,-s*0.6,s*0.3,s*0.3,body); ell(s*0.7,-s*0.6,s*0.3,s*0.3,body);
    ell(0,s*0.2,s*0.45,s*0.4,acc);
  } else if(S==='cow'){
    ell(0,0,s*1.0,s*0.75,body);
    ell(-s*0.7,-s*0.55,s*0.22,s*0.28,acc); ell(s*0.7,-s*0.55,s*0.22,s*0.28,acc); // orecchie
    tri(-s*0.5,-s*0.7,-s*0.35,-s*1.05,-s*0.2,-s*0.7,'#e8e0d0'); // cornino
    tri( s*0.5,-s*0.7, s*0.35,-s*1.05, s*0.2,-s*0.7,'#e8e0d0');
    ell(0,s*0.35,s*0.4,s*0.3,acc);
  } else {
    ell(0,0,s*0.9,s*0.7,body);   // fallback: corpo generico
  }
  // occhi: frontali (2 occhi) vs di profilo (1 occhio). Gufo ha i suoi, bruco nessuno.
  const FRONTAL = ['cat','dog','wolf','gorilla','monkey','bear','cow'];
  const PROFILE = ['horse','croc','hedgehog','squirrel'];
  if(FRONTAL.includes(S)){
    const ey=-s*0.42;   // occhi in alto sulla faccia, NON sul muso
    if(sleeping){ ctx.strokeStyle='#12202a'; ctx.lineWidth=Math.max(1,s*0.08); ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(-s*0.32,ey); ctx.lineTo(-s*0.10,ey); ctx.stroke();
      ctx.beginPath(); ctx.moveTo( s*0.10,ey); ctx.lineTo( s*0.32,ey); ctx.stroke(); }
    else { ell(-s*0.22,ey,s*0.1,s*0.12,'#182530'); ell(s*0.22,ey,s*0.1,s*0.12,'#182530'); }
  } else if(PROFILE.includes(S)){
    // occhio singolo verso il muso (lato destro, dove guarda)
    const ex = (S==='horse'||S==='croc') ? s*0.85 : s*0.3;
    const ey = (S==='horse') ? -s*0.6 : (S==='croc') ? s*0.0 : -s*0.1;
    if(sleeping){ ctx.strokeStyle='#12202a'; ctx.lineWidth=Math.max(1,s*0.08); ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(ex-s*0.12,ey); ctx.lineTo(ex+s*0.12,ey); ctx.stroke(); }
    else { ell(ex,ey,s*0.1,s*0.12,'#182530'); }
  }
}
