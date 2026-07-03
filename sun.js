// ═══════════════════════════════════════════════════════════════════
//  sun.js — alba/tramonto reali (algoritmo NOAA, nessuna dipendenza)
//  Dà l'ora di alba e tramonto per la data odierna e la posizione in config.js.
//  Usato per far seguire al mondo il ciclo solare vero (giornate lunghe d'estate,
//  corte d'inverno) invece di soglie fisse.
// ═══════════════════════════════════════════════════════════════════

// ritorna {sunrise, sunset} come ore decimali locali (es. 5.33 = 05:20), oppure null
function sunTimes(date, lat, lon){
  const rad=Math.PI/180, deg=180/Math.PI;
  // giorno dell'anno
  const start=new Date(date.getFullYear(),0,0);
  const day=Math.floor((date-start)/86400000);
  // frazione solare
  const lngHour=lon/15;
  function calc(isSunrise){
    const t=day + ((isSunrise?6:18)-lngHour)/24;
    const M=(0.9856*t)-3.289;                                  // anomalia media
    let Lsun=M + (1.916*Math.sin(M*rad)) + (0.020*Math.sin(2*M*rad)) + 282.634;
    Lsun=((Lsun%360)+360)%360;
    let RA=deg*Math.atan(0.91764*Math.tan(Lsun*rad));
    RA=((RA%360)+360)%360;
    RA += (Math.floor(Lsun/90)*90) - (Math.floor(RA/90)*90);   // stesso quadrante di Lsun
    RA/=15;
    const sinDec=0.39782*Math.sin(Lsun*rad);
    const cosDec=Math.cos(Math.asin(sinDec));
    const zenith=90.833;                                        // sole ufficiale
    const cosH=(Math.cos(zenith*rad)-(sinDec*Math.sin(lat*rad)))/(cosDec*Math.cos(lat*rad));
    if(cosH>1||cosH<-1) return null;                            // sole mai su/mai giù (poli)
    let H=isSunrise ? 360-deg*Math.acos(cosH) : deg*Math.acos(cosH);
    H/=15;
    const T=H + RA - (0.06571*t) - 6.622;                       // tempo locale medio
    let UT=((T-lngHour)%24+24)%24;                             // in UT
    return UT;
  }
  const rUT=calc(true), sUT=calc(false);
  if(rUT==null||sUT==null) return null;
  // da UT a ora locale del dispositivo
  const off=-date.getTimezoneOffset()/60;
  const wrap=x=>((x+off)%24+24)%24;
  return { sunrise: wrap(rUT), sunset: wrap(sUT) };
}

// day (1=giorno pieno, 0=notte) e isNight dall'ora reale + alba/tramonto veri.
// Transizioni morbide di ~1h attorno ad alba e tramonto.
function solarDay(now){
  const lat=(typeof CONFIG!=='undefined'&&CONFIG.latitude), lon=(typeof CONFIG!=='undefined'&&CONFIG.longitude);
  const st = (lat!=null && lon!=null) ? sunTimes(now, lat, lon) : null;
  const h = now.getHours()+now.getMinutes()/60;
  if(!st) return null;                          // niente config → il chiamante usa il fallback
  const {sunrise, sunset}=st;
  const tw=1.0;                                 // durata crepuscolo (ore) per la sfumatura
  let day;
  if(h < sunrise-tw || h > sunset+tw) day=0;                    // notte
  else if(h < sunrise+tw*0.0) day=(h-(sunrise-tw))/tw;          // alba: sale
  else if(h < sunset-tw*0.0) day=1;                             // pieno giorno
  else day=1-((h-(sunset))/tw);                                 // tramonto: scende
  day=Math.max(0,Math.min(1,day));
  const isNight=(h < sunrise-tw*0.3 || h > sunset+tw*0.3);
  return { day, isNight, sunrise, sunset, hour:h };
}
