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

// stima lat/long SENZA chiedere permessi: config → fuso del browser → offset.
// Tabella piccola "good enough" (fuso IANA → coordinate città). Non serve precisione.
const TZ_COORDS = {
  'Europe/Rome':[41.9,12.5], 'Europe/Paris':[48.85,2.35], 'Europe/Madrid':[40.4,-3.7],
  'Europe/Berlin':[52.5,13.4], 'Europe/London':[51.5,-0.1], 'Europe/Amsterdam':[52.37,4.9],
  'Europe/Lisbon':[38.7,-9.1], 'Europe/Athens':[38.0,23.7], 'Europe/Warsaw':[52.2,21.0],
  'Europe/Moscow':[55.75,37.6], 'Europe/Istanbul':[41.0,28.9], 'Europe/Zurich':[47.4,8.5],
  'America/New_York':[40.7,-74.0], 'America/Chicago':[41.85,-87.65], 'America/Denver':[39.7,-105.0],
  'America/Los_Angeles':[34.05,-118.2], 'America/Toronto':[43.65,-79.4], 'America/Sao_Paulo':[-23.55,-46.6],
  'America/Mexico_City':[19.4,-99.1], 'Asia/Tokyo':[35.7,139.7], 'Asia/Shanghai':[31.2,121.5],
  'Asia/Kolkata':[28.6,77.2], 'Asia/Dubai':[25.2,55.3], 'Asia/Singapore':[1.35,103.8],
  'Australia/Sydney':[-33.87,151.2], 'Pacific/Auckland':[-36.85,174.8], 'Africa/Johannesburg':[-26.2,28.0],
  'Africa/Cairo':[30.0,31.2],
};
function guessLatLon(date){
  // 1) config esplicito
  if(typeof CONFIG!=='undefined' && CONFIG.latitude!=null && CONFIG.longitude!=null)
    return [CONFIG.latitude, CONFIG.longitude];
  // 2) nome fuso del browser → tabella
  try{ const tz=Intl.DateTimeFormat().resolvedOptions().timeZone;
    if(tz && TZ_COORDS[tz]) return TZ_COORDS[tz]; }catch(e){}
  // 3) fallback: longitudine da offset, latitudine 45°N (nord medio)
  const off=-date.getTimezoneOffset()/60;
  return [45, off*15];
}

// day (1=giorno pieno, 0=notte) e isNight dall'ora reale + alba/tramonto veri.
// Transizioni morbide di ~1h attorno ad alba e tramonto.
function solarDay(now){
  const [lat, lon] = guessLatLon(now);
  const st = sunTimes(now, lat, lon);
  const h = now.getHours()+now.getMinutes()/60;
  if(!st) return null;                          // sole polare estremo → il chiamante usa il fallback
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
