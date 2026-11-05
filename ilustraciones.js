// Las ilustraciones de la carta: un dibujo por tipo de producto, todos con el mismo trazo,
// para que los 230 queden parejos. En las bebidas el líquido toma el color de cada una (--liq).
// Va inline (y no como archivo .svg aparte) para que funcione abriendo index.html sin servidor.
(() => {
  const T = 'style="fill:none;stroke:var(--ilu);stroke-width:2.4;stroke-linejoin:round;stroke-linecap:round"';
  const C = 'style="fill:var(--ilu)"';
  const L = 'style="fill:var(--liq)"';
  const R = 'style="fill:var(--accent)"';
  const hielo = (x, y, r) => `<rect x="${x}" y="${y}" width="7" height="7" rx="1.5" transform="rotate(${r} ${x + 3.5} ${y + 3.5})" style="fill:var(--ilu);opacity:.5"/>`;

  const DIBUJOS = {
    pinta: `<path d="M22.6 22 H41.4 L39.3 50 H24.7 Z" ${L}/><circle cx="24" cy="18" r="4.5" ${C}/><circle cx="30.5" cy="16" r="5" ${C}/><circle cx="37" cy="16.5" r="4.6" ${C}/><circle cx="41" cy="19" r="3.4" ${C}/><rect x="21" y="18" width="22" height="5" ${C}/><path d="M20 15 H44 L41 52 H23 Z" ${T}/>`,
    media: `<path d="M25.4 31 H38.6 L37.3 50 H26.7 Z" ${L}/><circle cx="27" cy="28" r="3.6" ${C}/><circle cx="32" cy="26.5" r="4" ${C}/><circle cx="37" cy="28" r="3.4" ${C}/><rect x="24" y="28" width="16" height="3.6" ${C}/><path d="M23 25 H41 L39 52 H25 Z" ${T}/>`,
    lata: `<rect x="21" y="15" width="22" height="36" rx="4" ${L}/><rect x="22.5" y="12" width="19" height="5" rx="2.5" ${C}/><rect x="22.5" y="49" width="19" height="4" rx="2" ${C}/><rect x="21" y="27" width="22" height="11" ${C}/><circle cx="32" cy="32.5" r="3.4" ${R}/>`,
    porron: `<path d="M28.5 10 h7 v9 c0 3.5 6.5 5.5 6.5 12 v18.5 a3 3 0 0 1 -3 3 h-14 a3 3 0 0 1 -3 -3 V31 c0 -6.5 6.5 -8.5 6.5 -12 z" ${L}/><rect x="27.5" y="8" width="9" height="4.5" rx="1.2" ${R}/><rect x="22" y="34" width="20" height="11" ${C}/><circle cx="32" cy="39.5" r="2.6" ${R}/>`,
    copa: `<path d="M22.4 22 h19.2 c-0.9 8 -4.4 12.5 -9.6 12.5 c-5.2 0 -8.7 -4.5 -9.6 -12.5 z" ${L}/><path d="M21 11 h22 c0.6 14 -3.6 23.5 -11 23.5 c-7.4 0 -11.6 -9.5 -11 -23.5 z" ${T}/><path d="M32 34.5 V49" ${T}/><path d="M23.5 50.5 h17" ${T}/>`,
    flauta: `<path d="M27.6 18 h8.8 l-0.7 15.5 c-0.2 2.4 -1.7 3.6 -3.7 3.6 s-3.5 -1.2 -3.7 -3.6 z" ${L}/><circle cx="31" cy="25" r="1" ${C}/><circle cx="33" cy="30" r="1" ${C}/><circle cx="31.5" cy="33" r="0.9" ${C}/><path d="M26.5 9 h11 l-0.9 25 c-0.2 3.2 -2.2 4.8 -4.6 4.8 s-4.4 -1.6 -4.6 -4.8 z" ${T}/><path d="M32 39 V50" ${T}/><path d="M25 51 h14" ${T}/>`,
    largo: `<path d="M22.4 24 H41.6 L39.6 50 H24.4 Z" ${L}/>${hielo(25, 27, 12)}${hielo(32, 33, -10)}${hielo(26, 39, 20)}<path d="M37 6 L32.5 42" style="fill:none;stroke:var(--accent);stroke-width:2.6;stroke-linecap:round"/><path d="M21 15 H43 L41 52 H23 Z" ${T}/>`,
    balon: `<path d="M18.6 21 h26.8 c-1 9.5 -6 14.5 -13.4 14.5 S19.6 30.5 18.6 21 z" ${L}/><circle cx="25" cy="23.5" r="2.2" ${R}/><circle cx="29.5" cy="25" r="2" ${R}/>${hielo(34, 23, 15)}<path d="M17 11 h30 c0.8 15 -5.6 25 -15 25 S16.2 26 17 11 z" ${T}/><path d="M32 36 V49.5" ${T}/><path d="M23.5 51 h17" ${T}/>`,
    corto: `<path d="M20.6 33 H43.4 L42.2 48.5 H21.8 Z" ${L}/>${hielo(24, 29, 14)}${hielo(32, 30, -12)}<path d="M19 24 H45 L43.2 51 H20.8 Z" ${T}/><path d="M21.4 47 H42.6" ${T}/>`,
    shot: `<path d="M25.5 33 H38.5 L37.3 49 H26.7 Z" ${L}/><path d="M24 27 H40 L38.4 51 H25.6 Z" ${T}/><path d="M34.5 27 a6.5 6.5 0 0 1 13 0 z" ${R}/><path d="M41 27 v-5" style="stroke:var(--ilu);stroke-width:1"/>`,
    coctel: `<path d="M20.5 17 H43.5 L32 29.5 Z" ${L}/><path d="M16 12 H48 L32 31 Z" ${T}/><path d="M32 31 V49" ${T}/><path d="M24 50.5 h16" ${T}/><path d="M42 12 Q44 6 48 5" style="fill:none;stroke:var(--ilu);stroke-width:1.6;stroke-linecap:round"/><circle cx="41.5" cy="13" r="3.4" ${R}/>`,
    jarra: `<rect x="19.6" y="22" width="20.8" height="28.4" rx="1.5" ${L}/>${hielo(23, 25, 10)}${hielo(31, 31, -15)}<path d="M18 13 H42 V50 a2.5 2.5 0 0 1 -2.5 2.5 h-19 A2.5 2.5 0 0 1 18 50 Z" ${T}/><path d="M42 19 h3.5 a4.5 4.5 0 0 1 4.5 4.5 v11 a4.5 4.5 0 0 1 -4.5 4.5 H42" ${T}/>`,
    tanque: `<rect x="25.6" y="14" width="12.8" height="31.4" rx="2" ${L}/><rect x="24" y="7" width="16" height="40" rx="3" ${T}/><path d="M40 39 h5 v4" ${T}/><rect x="43" y="42" width="4" height="4" rx="1" ${R}/><rect x="19" y="47" width="26" height="5" rx="1.5" ${C}/>`,
    botella: `<path d="M28 13 h8 v6 l4.5 4.5 v26 a3 3 0 0 1 -3 3 h-15 a3 3 0 0 1 -3 -3 v-26 L28 19 z" ${L}/><rect x="27" y="7" width="10" height="6.5" rx="1.3" ${R}/><rect x="21.5" y="31" width="21" height="13" ${C}/><path d="M26 37.5 h12" style="fill:none;stroke:var(--accent);stroke-width:2"/>`,
    gaseosa: `<path d="M28.5 13 h7 v3 c0 2.5 5.5 3.5 5.5 8.5 v4 c0 2 -2 3 -2 5 s2 3 2 5 v11.5 a3 3 0 0 1 -3 3 h-13 a3 3 0 0 1 -3 -3 V38.5 c0 -2 2 -3 2 -5 s-2 -3 -2 -5 v-4 c0 -5 5.5 -6 5.5 -8.5 z" ${L}/><rect x="27.5" y="8" width="9" height="5.5" rx="1.2" ${R}/><rect x="23" y="38" width="18" height="8" ${C}/>`,
    hamburguesa: `<path d="M14 29 c0 -9 8 -14.5 18 -14.5 s18 5.5 18 14.5 z" style="fill:#d6913f"/><ellipse cx="25" cy="21" rx="1.6" ry="1" ${C}/><ellipse cx="33" cy="19" rx="1.6" ry="1" ${C}/><ellipse cx="39" cy="23" rx="1.6" ry="1" ${C}/><path d="M13 31 q4.5 -3 9 0 t9 0 t9 0 t9 0 v2 H13 z" style="fill:#6f9c3c"/><path d="M14 33 h36 l-4 5 l-4 -3 h-24 z" style="fill:#f2b330"/><rect x="13.5" y="35" width="37" height="7" rx="3.5" style="fill:#5b2c17"/><path d="M15 43.5 h34 c0 4 -3 6.5 -7 6.5 H22 c-4 0 -7 -2.5 -7 -6.5 z" style="fill:#d6913f"/>`,
    pizza: `<circle cx="32" cy="32" r="19" style="fill:#d6913f"/><circle cx="32" cy="32" r="15.5" style="fill:#f2c55a"/><circle cx="25" cy="25" r="3" ${R}/><circle cx="38" cy="27" r="3" ${R}/><circle cx="28" cy="38" r="3" ${R}/><circle cx="39" cy="38.5" r="2.6" ${R}/><circle cx="33" cy="31" r="1.2" style="fill:#3d5a24"/><circle cx="22" cy="33" r="1.2" style="fill:#3d5a24"/><path d="M32 13 V51 M13 32 H51 M18.6 18.6 L45.4 45.4 M45.4 18.6 L18.6 45.4" style="stroke:#9a5f22;stroke-width:1;opacity:.7"/>`,
    papas: `<rect x="23" y="13" width="4" height="22" rx="1" transform="rotate(-10 25 24)" style="fill:#f2c55a"/><rect x="28" y="10" width="4" height="24" rx="1" style="fill:#e9b23f"/><rect x="33" y="12" width="4" height="22" rx="1" transform="rotate(8 35 23)" style="fill:#f2c55a"/><rect x="37.5" y="15" width="4" height="20" rx="1" transform="rotate(16 39.5 25)" style="fill:#e9b23f"/><path d="M19 28 H45 L41.5 52 H22.5 Z" ${R}/><path d="M19 28 q13 6 26 0" style="fill:none;stroke:var(--ilu);stroke-width:2"/><circle cx="32" cy="41" r="4" ${C}/>`,
    sandwich: `<path d="M7 32 c2 -6 9 -8.5 25 -8.5 s23 2.5 25 8.5 z" style="fill:#d6913f"/><path d="M15 27 l5 -1.5 M27 25.5 l5 -0.5 M39 26 l5 1" style="stroke:#a96a28;stroke-width:1.6;stroke-linecap:round"/><path d="M6 34 q4.5 -3 9 0 t9 0 t9 0 t9 0 t9 0 t6 0 v2 H6 z" style="fill:#6f9c3c"/><path d="M8 36 h48 l-3 3.5 l-3.5 -2 l-3.5 2 l-3.5 -2 l-3.5 2 H10 z" style="fill:#c3402b"/><rect x="7" y="38.5" width="50" height="4.5" rx="2.2" style="fill:#5b2c17"/><path d="M8 44 h48 c-1 3.5 -5 5 -11 5 H19 c-6 0 -10 -1.5 -11 -5 z" style="fill:#d6913f"/>`,
    bocados: `<ellipse cx="32" cy="43" rx="21" ry="7" ${C}/><ellipse cx="32" cy="42" rx="17" ry="5" style="fill:var(--surface);opacity:.18"/><rect x="17" y="27" width="22" height="7" rx="3.5" transform="rotate(-18 28 30.5)" style="fill:#d6913f"/><rect x="25" y="30" width="22" height="7" rx="3.5" transform="rotate(10 36 33.5)" style="fill:#c27a2c"/><rect x="18" y="35" width="24" height="7" rx="3.5" transform="rotate(4 30 38.5)" style="fill:#e0a24a"/><path d="M41 22 q3 -5 7 -3 q-1 5 -7 3 z" ${R}/>`,
    rabas: `<ellipse cx="32" cy="43" rx="21" ry="7" ${C}/><circle cx="24" cy="34" r="5.5" style="fill:none;stroke:#d6913f;stroke-width:3.6"/><circle cx="36" cy="32" r="5.5" style="fill:none;stroke:#e0a24a;stroke-width:3.6"/><circle cx="30" cy="40" r="5" style="fill:none;stroke:#c27a2c;stroke-width:3.4"/><circle cx="41" cy="40" r="4.6" style="fill:none;stroke:#d6913f;stroke-width:3.2"/><path d="M14 26 a6 6 0 0 1 9 -6 z" style="fill:#f2e15a"/>`,
    dip: `<ellipse cx="32" cy="33" rx="15" ry="4.5" ${L}/><path d="M16 33 h32 c0 10 -7 16 -16 16 s-16 -6 -16 -16 z" ${C}/><ellipse cx="32" cy="33" rx="16" ry="5" style="fill:none;stroke:var(--ilu);stroke-width:2"/><ellipse cx="32" cy="33" rx="14.6" ry="3.8" ${L}/><path d="M38 27 q3 -10 9 -12" style="fill:none;stroke:#e0a24a;stroke-width:4;stroke-linecap:round"/>`,
    huevo: `<path d="M17 34 c-3 -10 6 -17 14 -15 c5 -6 15 -2 15 6 c6 3 4 13 -3 14 c-3 6 -12 7 -16 3 c-7 2 -12 -3 -10 -8 z" ${C}/><circle cx="32" cy="31" r="7.5" style="fill:#f2a41f"/><circle cx="29.5" cy="28.5" r="2" style="fill:#fff;opacity:.6"/>`,
    panceta: `<path d="M12 22 q6 -6 12 0 t12 0 t12 0 t6 -1" style="fill:none;stroke:#b43a2c;stroke-width:7;stroke-linecap:round"/><path d="M12 22 q6 -6 12 0 t12 0 t12 0 t6 -1" style="fill:none;stroke:var(--ilu);stroke-width:1.6;stroke-linecap:round"/><path d="M10 36 q6 -6 12 0 t12 0 t12 0 t8 -1" style="fill:none;stroke:#c3402b;stroke-width:7;stroke-linecap:round"/><path d="M10 36 q6 -6 12 0 t12 0 t12 0 t8 -1" style="fill:none;stroke:var(--ilu);stroke-width:1.6;stroke-linecap:round"/><path d="M14 49 q6 -6 12 0 t12 0 t12 0" style="fill:none;stroke:#b43a2c;stroke-width:7;stroke-linecap:round"/><path d="M14 49 q6 -6 12 0 t12 0 t12 0" style="fill:none;stroke:var(--ilu);stroke-width:1.6;stroke-linecap:round"/>`,
    medallon: `<ellipse cx="32" cy="36" rx="19" ry="11" style="fill:#4a2413"/><ellipse cx="32" cy="33" rx="19" ry="11" style="fill:#6a341b"/><path d="M19 29 l26 8 M18 35 l24 7 M22 24 l24 8" style="stroke:#2f160b;stroke-width:2.6;stroke-linecap:round"/>`,
  };

  const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${
    Object.entries(DIBUJOS).map(([id, d]) => `<symbol id="il-${id}" viewBox="0 0 64 64">${d}</symbol>`).join('')
  }</defs></svg>`;

  // colores de lo que hay adentro; el primero que coincide gana
  const COLORES = [
    [/heineken 0\.0/, '#2d62a8'], [/heineken|grolsch/, '#2f7a3d'], [/michelob/, '#c9ccd1'], [/blue moon/, '#2f4c7f'],
    [/milk stout|cream stout/, '#2e1b10'], [/negra|dunkel/, '#24140d'], [/old ale/, '#7a2410'], [/roja/, '#9b2f17'],
    [/neipa/, '#e6b54a'], [/golden|miller|pilsner|schneider|rubia/, '#e9a92a'], [/ipa/, '#c46f1c'], [/apa/, '#d68a2a'],
    [/ocean blue/, '#3a82d6'], [/rosa|raspberry|sunset|frambuesa/, '#e2648a'], [/verde/, '#8cc05a'], [/pomelo/, '#f08a6a'],
    [/cafe/, '#6b3f22'], [/baileys/, '#d8c19c'], [/daikiri/, '#e8475a'], [/margarita/, '#d8e39c'],
    [/ferroviario/, '#3c1219'], [/fernet|jager|jäger|cuba libre|coca|pepsi|ramazzotti|hodlmoser/, '#2b170f'],
    [/negroni/, '#a51e26'], [/campari/, '#c8202f'], [/carpano/, '#7a1f1f'], [/cynar/, '#5a4a22'], [/gancia/, '#e6d79a'],
    [/mojito|caipi|sprite|7 up|limoneto|limonada|aquarius/, '#d6e6a0'], [/sex on the beach/, '#f07a4a'],
    [/naranja|destornillador|san francisco|fanta|mirinda|levite|sunset/, '#f2a33a'], [/manzana/, '#c8d870'],
    [/malibu/, '#f1ece0'], [/agua/, '#bcd9e4'], [/red bull/, '#2b4a8c'], [/speed/, '#c22b35'],
    [/whisky|jameson|walker|chivas|ballantines|jack|beam|\bjb\b|\bron\b|tequila.*dorado|cuervo dorado/, '#c47a22'],
    [/skyy/, '#2f62b5'], [/tequila|vodka|absolut|smirnoff/, '#e4e8e6'],
    [/gin|tonic|aconcagua/, '#cfe3ea'],
  ];
  const VINO = { tinto: '#6e0f22', blanco: '#e7d27e', espuma: '#efd98a' };
  const color = (n) => (COLORES.find(([re]) => re.test(n)) || [null, '#c46f1c'])[1];

  // qué dibujo va con cada producto; el primero que coincide gana
  function de(nombre, grupo, seccion) {
    const n = nombre.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const s = seccion.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const c = color(n);
    if (grupo === 'vinos') {
      if (/mumm|chandon|mercier|espumante|brut|leger/.test(n)) return ['flauta', VINO.espuma];
      return ['copa', /chenin|blanco|dulce/.test(n) ? VINO.blanco : VINO.tinto];
    }
    if (/descorche/.test(n)) return ['copa', VINO.tinto];
    if (/hamburguesa/.test(n)) return ['hamburguesa'];
    if (/medallon/.test(n)) return ['medallon'];
    if (/pizza/.test(n)) return ['pizza'];
    if (/papas/.test(n) && !/pinta/.test(n)) return ['papas'];
    if (/sandwich/.test(n)) return ['sandwich'];
    if (/rabas/.test(n)) return ['rabas'];
    if (/tequeno|tiritas|combo/.test(n)) return ['bocados'];
    if (/^dip/.test(n)) return ['dip', /cheddar/.test(n) ? '#f0a224' : /guacamole/.test(n) ? '#7aa63a' : /barbacoa/.test(n) ? '#6e2416' : '#5e6b2a'];
    if (/huevo/.test(n)) return ['huevo'];
    if (/panceta/.test(n)) return ['panceta'];
    const cv = /blue moon/.test(n) ? '#f1cc6e' : c; // en el vaso la Blue Moon es rubia; el azul es de la lata
    if (/^media pinta/.test(n)) return ['media', cv];
    if (/pinta|vaso de tirada/.test(n)) return ['pinta', cv];
    if (/^lata|^cerveza/.test(n) || s === 'latas' || /red bull \(|^speed/.test(n)) return ['lata', c];
    if (/heineken|grolsch|imperial|miller|schneider/.test(n)) return ['porron', c];
    if (/^tanque/.test(n)) return ['tanque', c];
    if (/^jarra|jarra$/.test(n)) return ['jarra', c];
    if (s === 'shot' || /^shot/.test(n)) return ['shot', c];
    if (/^botella|tequila cuervo dorado/.test(n)) return ['botella', c];
    if (grupo === 'sin-alcohol' && /agua|coca|pepsi|fanta|sprite|7 up|mirinda|h2 oh|levite|aquarius/.test(n)) return ['gaseosa', c];
    if (s === 'whisky' || /negroni|ramazzotti|carpano/.test(n)) return ['corto', c];
    if (/margarita|daikiri|frozen/.test(n)) return ['coctel', c];
    if (/^gin|tonic/.test(n)) return ['balon', c];
    if (/2 x 1 gin/.test(n)) return ['balon', c];
    return ['largo', c];
  }

  window.ILUS = { sprite, de };
})();
