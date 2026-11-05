// La Cervecería: la noche de hoy con la hora de Mendoza, las pintas, la carta de Fudo,
// el marco de Marilyn y el cupón de reserva. Sin este archivo la página se lee igual.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const plata = (n) => '$' + Math.round(n).toLocaleString('es-AR');
  const sinTildes = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const CARTA = window.CARTA;

  // ---------- la noche de hoy, con la hora de San Rafael ----------
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const NOCHES = {
    4: { id: 'jueves', genero: 'techno', dato: 'Música electrónica toda la noche.' },
    5: { id: 'viernes', genero: 'cachengue', dato: 'Cumbia, reggaetón y los temas de la previa.' },
    6: { id: 'sabado', genero: 'cachengue', dato: 'Otra vuelta de cachengue para cerrar la semana.' },
    0: { id: 'domingo', genero: 'rock nacional', dato: 'Rock nacional para despedir el finde.' },
  };
  const ABRE = 19, CIERRA = 5;

  function ahora() {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Argentina/Mendoza', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
      .formatToParts(new Date()).map((x) => [x.type, x.value]));
    const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
    const h = +p.hour % 24, m = +p.minute;
    // pasada la medianoche sigue siendo la noche de ayer hasta el cierre
    const noche = h < CIERRA ? (dia + 6) % 7 : dia;
    return { dia, h, m, noche, abierto: h >= ABRE || h < CIERRA };
  }
  const proxima = (desde) => { for (let i = 0; i < 7; i++) { const d = (desde + i) % 7; if (NOCHES[d]) return { d, en: i }; } };

  function pintarHoy() {
    const t = ahora();
    const ev = NOCHES[t.noche];
    const noche = $('#hoy-noche'), estado = $('#hoy-estado');
    if (ev && t.h < CIERRA) noche.textContent = `Sigue la noche de ${ev.genero} del ${DIAS[t.noche]}.`;
    else if (ev) noche.textContent = `Hoy es ${DIAS[t.noche]}: noche de ${ev.genero}.`;
    else {
      const p = proxima(t.noche);
      noche.textContent = `Hoy no hay fiesta. La próxima es el ${DIAS[p.d]}: ${NOCHES[p.d].genero}.`;
    }
    let txt;
    if (t.abierto) txt = `Abierto ahora, hasta las ${CIERRA}.`;
    else {
      const faltan = (ABRE * 60) - (t.h * 60 + t.m);
      const hs = Math.floor(faltan / 60), min = faltan % 60;
      txt = `Abre hoy a las ${ABRE}, en ${hs ? hs + ' h ' : ''}${min} min.`;
    }
    estado.innerHTML = '<span class="punto" aria-hidden="true"></span>' + txt;
    estado.classList.toggle('is-abierto', t.abierto);
    const dondeEstado = $('#donde-estado');
    if (dondeEstado) dondeEstado.textContent = t.abierto ? '· abierto ahora' : '';
    return t;
  }
  const hoy = pintarHoy();
  setInterval(pintarHoy, 60_000);

  // ---------- las noches: un disco, la de hoy elegida ----------
  const tabsNoche = $$('.noches__lista [role="tab"]');
  const fotosNoche = $$('.noches__foto img');
  const datoNoche = $('#noches-dato');
  const seccionNoches = $('.noches');
  function elegirNoche(id, foco) {
    const [diaNum, ev] = Object.entries(NOCHES).find(([, v]) => v.id === id);
    tabsNoche.forEach((b) => b.setAttribute('aria-selected', String(b.dataset.noche === id)));
    tabsNoche.forEach((b) => (b.tabIndex = b.dataset.noche === id ? 0 : -1));
    fotosNoche.forEach((img) => img.classList.toggle('is-on', img.dataset.noche === id));
    const nombre = DIAS[+diaNum][0].toUpperCase() + DIAS[+diaNum].slice(1);
    datoNoche.innerHTML = `<b>${nombre}, ${ev.genero}</b>${ev.dato} De ${ABRE} a ${CIERRA}.`;
    seccionNoches.classList.add('is-cambio');
    setTimeout(() => seccionNoches.classList.remove('is-cambio'), 260);
    if (foco) tabsNoche.find((b) => b.dataset.noche === id).focus();
  }
  tabsNoche.forEach((b, i) => {
    b.setAttribute('aria-controls', 'noches-dato');
    b.addEventListener('click', () => elegirNoche(b.dataset.noche));
    b.addEventListener('keydown', (e) => {
      const paso = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!paso) return;
      e.preventDefault();
      elegirNoche(tabsNoche[(i + paso + tabsNoche.length) % tabsNoche.length].dataset.noche, true);
    });
  });
  const deHoy = NOCHES[hoy.noche] ? hoy.noche : proxima(hoy.noche).d;
  const botonHoy = tabsNoche.find((b) => b.dataset.noche === NOCHES[deHoy].id);
  botonHoy.insertAdjacentHTML('beforeend', `<span class="hoy-marca">${NOCHES[hoy.noche] ? 'hoy' : 'la próxima'}</span>`);
  elegirNoche(NOCHES[deHoy].id);

  // ---------- pintas: cada una, vista desde arriba, es un círculo de su color ----------
  const ESTILOS = [
    [/golden/i, '#e9a92a', 'Rubia y liviana.'],
    [/blue moon/i, '#f1cc6e', 'Witbier belga con cáscara de naranja.'],
    [/old ale/i, '#7a2410', 'Roja fuerte, con whisky.'],
    [/roja/i, '#9b2f17', 'Maltosa, con notas de caramelo.'],
    [/milk stout/i, '#2e1b10', 'Negra cremosa, con lactosa.'],
    [/negra/i, '#24140d', 'Tostada, con notas de café.'],
    [/neipa/i, '#e6b54a', 'Turbia, jugosa y frutada.'],
    [/ipa/i, '#c46f1c', 'Amarga y lupulada.'],
    [/apa/i, '#d68a2a', 'Pale ale lupulada, fácil de tomar.'],
  ];
  const estilo = (n) => ESTILOS.find(([re]) => re.test(n)) || [null, '#c46f1c', ''];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

  if (CARTA) {
    const seccionPintas = CARTA.grupos.find((g) => g.id === 'cervezas')?.secciones.find((s) => s.nombre === 'Pintas');
    if (seccionPintas) {
      const enteras = seccionPintas.items.filter((i) => !/^media/i.test(i.n));
      const medias = seccionPintas.items.filter((i) => /^media/i.test(i.n));
      const orden = (n) => ESTILOS.findIndex(([re]) => re.test(n));
      enteras.sort((a, b) => [0, 3, 5, 8, 1, 7, 6, 4, 2].indexOf(orden(a.n)) - [0, 3, 5, 8, 1, 7, 6, 4, 2].indexOf(orden(b.n)));
      const lista = $('#lista-pintas');
      lista.innerHTML = enteras.map((i, k) => {
        const [, color, nota] = estilo(i.n);
        const nombre = i.n.replace(/^Pinta\s+/i, '').replace(/\s*\(500 ?ml\)/i, '');
        return `<li class="item" style="--i:${k}"><span class="item__foto item__foto--color" style="--c:${color};--i:${k}" aria-hidden="true"></span>
          <div><p class="item__fila"><b>${esc(nombre)}</b><span>${plata(i.p)}</span></p>${nota ? `<p class="item__desc">${nota}</p>` : ''}</div></li>`;
      }).join('');
      lista.setAttribute('data-reveal-lista', '');
      $('#pintas-cuenta').textContent = `${enteras.length} pintas de 500 ml`;
      if (medias.length) {
        const tipos = medias.map((m) => m.n.replace(/^Media Pinta\s+/i, '').replace(/\s*\(.*\)/, '')).map((s) => s[0].toUpperCase() + s.slice(1));
        $('#pintas-nota').textContent = `Media pinta (250 ml) de ${tipos.slice(0, -1).join(', ')} o ${tipos.at(-1)}: ${plata(medias[0].p)}.`;
      }
    }
  }

  // ---------- la carta completa ----------
  const ORDEN = ['comer', 'cervezas', 'tragos', 'medidas', 'vinos', 'promos', 'sin-alcohol'];
  const cuerpo = $('#carta-cuerpo'), pestanas = $('#pestanas'), buscar = $('#buscar'), selector = $('#selector');
  let grupoActual = matchMedia('(max-width: 47.99em)').matches ? 'promos' : 'comer';

  // cada producto con su dibujo (ilustraciones.js); si ese archivo falta, el punto rojo de antes
  const ILUS = window.ILUS;
  if (ILUS && CARTA) {
    document.body.insertAdjacentHTML('afterbegin', ILUS.sprite);
    for (const g of CARTA.grupos) for (const s of g.secciones) for (const i of s.items) i.ilu = ILUS.de(i.n, g.id, s.nombre);
  }
  const ilustracion = (i) => i.ilu
    ? `<span class="item__foto item__foto--ilu"${i.ilu[1] ? ` style="--liq:${i.ilu[1]}"` : ''} aria-hidden="true"><svg viewBox="0 0 64 64"><use href="#il-${i.ilu[0]}"/></svg></span>`
    : '<span class="item__foto item__foto--sin" aria-hidden="true"></span>';
  const itemHTML = (i, k) => `<li class="item" style="--i:${k}">
      ${ilustracion(i)}
      <div><p class="item__fila"><b>${esc(i.n)}</b><span>${plata(i.p)}</span></p>${i.d ? `<p class="item__desc">${esc(i.d)}</p>` : ''}</div></li>`;
  const seccionHTML = (s, titulo) => `<section class="carta__seccion" aria-label="${esc(titulo || s.nombre)}">
      <div class="cabecera"><h3>${esc(titulo || s.nombre)}</h3><p class="cabecera__cuenta">${s.items.length}</p></div>
      <ul class="menu">${s.items.map(itemHTML).join('')}</ul></section>`;

  function mostrarGrupo(id, foco) {
    grupoActual = id;
    const g = CARTA.grupos.find((x) => x.id === id);
    $$('button', pestanas).forEach((b) => { const on = b.dataset.grupo === id; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
    selector.value = id;
    cuerpo.innerHTML = g.secciones.map((s) => seccionHTML(s, g.secciones.length === 1 ? g.nombre : null)).join('');
    if (foco) $(`button[data-grupo="${id}"]`, pestanas).focus();
  }
  function mostrarBusqueda(q) {
    const t = sinTildes(q);
    const res = [];
    for (const g of CARTA.grupos) for (const s of g.secciones) {
      const items = s.items.filter((i) => sinTildes(i.n + ' ' + (i.d || '') + ' ' + s.nombre).includes(t));
      if (items.length) res.push({ nombre: s.nombre, items });
    }
    $$('button', pestanas).forEach((b) => b.setAttribute('aria-selected', 'false'));
    cuerpo.innerHTML = res.length ? res.map((s) => seccionHTML(s)).join('')
      : `<p class="carta__vacio">No hay nada con «${esc(q)}» en la carta. Probá con otra palabra o preguntá en la barra.</p>`;
  }

  if (CARTA) {
    const grupos = ORDEN.map((id) => CARTA.grupos.find((g) => g.id === id)).filter(Boolean);
    pestanas.innerHTML = grupos.map((g) => `<button role="tab" type="button" data-grupo="${g.id}" aria-controls="carta-cuerpo">${esc(g.nombre)}</button>`).join('');
    selector.innerHTML = grupos.map((g) => `<option value="${g.id}">${esc(g.nombre)}</option>`).join('');
    selector.addEventListener('change', () => { buscar.value = ''; mostrarGrupo(selector.value); });
    const total = CARTA.grupos.reduce((n, g) => n + g.secciones.reduce((m, s) => m + s.items.length, 0), 0);
    $('#carta-cuenta').textContent = `${total} productos`;
    $('#carta-fuente').innerHTML = `Precios de la <a class="link-plain" href="${CARTA.fuente}">carta de Fudo</a> al ${CARTA.fecha}. Pueden cambiar; los confirma la barra.`;
    const botones = $$('button', pestanas);
    botones.forEach((b, i) => {
      b.addEventListener('click', () => { buscar.value = ''; mostrarGrupo(b.dataset.grupo); });
      b.addEventListener('keydown', (e) => {
        const paso = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!paso) return;
        e.preventDefault();
        buscar.value = '';
        mostrarGrupo(botones[(i + paso + botones.length) % botones.length].dataset.grupo, true);
      });
    });
    buscar.addEventListener('input', () => { const q = buscar.value.trim(); q.length >= 2 ? mostrarBusqueda(q) : mostrarGrupo(grupoActual); });
    $$('[data-pestana]').forEach((a) => a.addEventListener('click', () => { buscar.value = ''; mostrarGrupo(a.dataset.pestana); }));
    mostrarGrupo(grupoActual);
  }

  // ---------- Marilyn: un marco, la foto cambia ----------
  const fotos = $$('.rubias__foto img'), pie = $('#rubias-pie');
  let actual = 0, reloj;
  function siguiente() {
    fotos[actual].classList.remove('is-on');
    actual = (actual + 1) % fotos.length;
    fotos[actual].classList.add('is-on');
    pie.textContent = fotos[actual].dataset.pie;
  }
  const arrancar = () => { if (!quieto && !reloj) reloj = setInterval(siguiente, 3200); };
  const parar = () => { clearInterval(reloj); reloj = null; };
  $('.rubias__foto').addEventListener('click', () => { siguiente(); parar(); arrancar(); });
  document.addEventListener('visibilitychange', () => (document.hidden ? parar() : arrancar()));
  arrancar();

  // ---------- el video de la banda ----------
  const video = $('.banda__video video');
  if (quieto) { video.removeAttribute('autoplay'); video.pause(); }

  // ---------- reservas: el cupón arma el mensaje de WhatsApp ----------
  const selNoche = $('#r-noche'), selPers = $('#r-personas'), selHora = $('#r-hora');
  const opciones = [];
  for (let i = 0; i < 8; i++) {
    const d = (hoy.noche + i) % 7;
    const fecha = new Date(Date.now() + (i - (hoy.h < CIERRA ? 1 : 0)) * 864e5);
    const dm = fecha.toLocaleDateString('es-AR', { day: 'numeric', month: 'numeric', timeZone: 'America/Argentina/Mendoza' });
    const ev = NOCHES[d] ? ` · ${NOCHES[d].genero}` : '';
    opciones.push(`${i === 0 ? 'Hoy, ' : ''}${DIAS[d]} ${dm}${ev}`);
  }
  selNoche.innerHTML = opciones.map((o) => `<option>${o}</option>`).join('');
  selPers.innerHTML = [2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => `<option value="${n}">${n} personas</option>`).join('') + '<option value="más de 12">Más de 12</option>';
  selHora.innerHTML = ['20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00', '00:30', '01:00'].map((h) => `<option value="${h}">Llegamos ${h}</option>`).join('');
  selHora.value = '22:00';
  $('#cupon').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = $('#r-nombre').value.trim();
    const noche = selNoche.value.replace(/ · .*$/, '');
    const cuando = noche.startsWith('Hoy, ') ? 'hoy ' + noche.slice(5) : 'el ' + noche;
    const personas = /^\d+$/.test(selPers.value) ? `${selPers.value} personas` : selPers.value + ' personas';
    const texto = `¡Hola! Soy ${nombre}. Quiero reservar una mesa para ${personas} ${cuando}, llegando a las ${selHora.value}. ¿Hay lugar?`;
    window.open(`https://wa.me/542604550271?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
  });

  // ---------- entradas: cada sección sube por partes al entrar ----------
  $$('main > section, .pie').forEach((sec) => $$('[data-reveal]', sec).forEach((el, i) => el.style.setProperty('--i', i)));
  const objetivos = [...$$('[data-reveal]'), ...$$('[data-reveal-lista]')];
  if (!('IntersectionObserver' in window)) objetivos.forEach((el) => el.classList.add('is-in'));
  else {
    const io = new IntersectionObserver((entradas) => {
      for (const en of entradas) if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }, { rootMargin: '0px 0px -4% 0px', threshold: 0.02 });
    objetivos.forEach((el) => io.observe(el));
    addEventListener('load', () => setTimeout(() => objetivos.forEach((el) => {
      const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
    }), 2500));
  }
})();
