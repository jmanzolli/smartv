// TV home: clock, weather, agenda, headlines, background photos and app shortcuts,
// driven by the remote's arrows, OK, Back and Menu.
//
// Inside the Fire TV app, window.TVNative (see android/) launches apps and fetches feeds that
// browsers would block. Opened in a plain browser the page still works, without those parts.

// Apps in row order. Fire TV and Android TV package names differ, so each lists the known ones;
// if none is installed the label is matched against the installed apps instead.
const APPS = [
  { name: 'Netflix',     color: '#B20710', packages: ['com.netflix.ninja'] },
  { name: 'Disney+',     color: '#0B2A6F', packages: ['com.disney.disneyplus'] },
  { name: 'Prime Video', color: '#1A98FF', packages: ['com.amazon.avod', 'com.amazon.firebat', 'com.amazon.amazonvideo.livingroom'] },
  { name: 'Crave',       color: '#0B4F6C', packages: ['ca.bellmedia.cravetv'] },
  { name: 'Apple TV',    color: '#26262B', packages: ['com.apple.atve.amazon.appletv', 'com.apple.atve.androidtv.appletv'] },
  { name: 'YouTube',     color: '#E62117', packages: ['com.amazon.firetv.youtube', 'com.google.android.youtube.tv'] },
  { name: 'Spotify',     color: '#1ED760', ink: '#08210F', packages: ['com.spotify.tv.android'] },
];

const DEFAULT_CITY = { name: 'Montréal', lat: 45.5017, lon: -73.5673 };

const NEWS = {
  g1:     { label: 'g1',           url: 'https://g1.globo.com/rss/g1/' },
  cbc:    { label: 'CBC News',     url: 'https://www.cbc.ca/webfeed/rss/rss-topstories' },
  rc:     { label: 'Radio-Canada', url: 'https://ici.radio-canada.ca/rss/4159' },
  elpais: { label: 'El País',      url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada' },
};
const NEWS_FOR_LANG = { pt: 'g1', en: 'cbc', fr: 'rc', es: 'elpais' };

const PHOTO_EVERY = 5 * 60 * 1000;

const STRINGS = {
  pt: {
    locale: 'pt-BR', label: 'Português', bing: 'pt-BR',
    morning: 'Bom dia', afternoon: 'Boa tarde', evening: 'Boa noite',
    settings: 'Configurações', language: 'Idioma', clockFormat: 'Formato da hora', city: 'Cidade do clima',
    cityPlaceholder: 'Digite o nome da cidade', search: 'Buscar', close: 'Fechar',
    backHint: 'Aperte Voltar no controle para fechar.',
    searching: 'Buscando…', noResults: 'Nenhuma cidade encontrada. Confira o nome e tente de novo.',
    pickCity: 'Escolha a cidade:', weatherError: 'Sem dados do clima agora. Nova tentativa em alguns minutos.',
    agenda: 'Agenda', today: 'Hoje', tomorrow: 'Amanhã', allDay: 'Dia todo', now: 'Agora',
    agendaConnect: 'Conecte sua agenda em Configurações.',
    agendaEmpty: 'Nada marcado para hoje e amanhã.',
    agendaError: 'Não consegui ler a agenda. Confira o endereço em Configurações.',
    calendarLabel: 'Agenda (endereço secreto iCal)', calendarPlaceholder: 'Cole o endereço que termina em .ics',
    save: 'Salvar', calendarChecking: 'Lendo a agenda…', calendarSaved: 'Agenda salva.',
    calendarCleared: 'Agenda desconectada.',
    calendarHint: 'No Google Agenda, pelo computador: Configurações → sua agenda → Endereço secreto no formato iCal. Dica: o app Amazon Fire TV no celular tem um teclado para colar o endereço.',
    news: 'Manchetes', newsSource: 'Fonte das manchetes', newsAuto: 'Seguir o idioma',
    newsError: 'Sem manchetes agora. Nova tentativa em alguns minutos.',
    photos: 'Fotos de fundo', autostart: 'Abrir ao ligar a TV', on: 'Ligado', off: 'Desligado',
    install: 'Instalar',
    wx: ['Céu limpo', 'Quase limpo', 'Parcialmente nublado', 'Nublado', 'Neblina', 'Garoa', 'Chuva',
         'Chuva congelante', 'Neve', 'Pancadas de chuva', 'Pancadas de neve', 'Tempestade'],
  },
  en: {
    locale: 'en-CA', label: 'English', bing: 'en-CA',
    morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening',
    settings: 'Settings', language: 'Language', clockFormat: 'Clock format', city: 'Weather city',
    cityPlaceholder: 'Type a city name', search: 'Search', close: 'Close',
    backHint: 'Press Back on the remote to close.',
    searching: 'Searching…', noResults: 'No city found. Check the spelling and try again.',
    pickCity: 'Choose your city:', weatherError: 'No weather data right now. Trying again in a few minutes.',
    agenda: 'Calendar', today: 'Today', tomorrow: 'Tomorrow', allDay: 'All day', now: 'Now',
    agendaConnect: 'Connect your calendar in Settings.',
    agendaEmpty: 'Nothing scheduled today or tomorrow.',
    agendaError: 'Couldn’t read the calendar. Check the address in Settings.',
    calendarLabel: 'Calendar (secret iCal address)', calendarPlaceholder: 'Paste the address ending in .ics',
    save: 'Save', calendarChecking: 'Reading the calendar…', calendarSaved: 'Calendar saved.',
    calendarCleared: 'Calendar disconnected.',
    calendarHint: 'In Google Calendar on a computer: Settings → your calendar → Secret address in iCal format. Tip: the Amazon Fire TV phone app has a keyboard for pasting it.',
    news: 'Headlines', newsSource: 'Headline source', newsAuto: 'Match the language',
    newsError: 'No headlines right now. Trying again in a few minutes.',
    photos: 'Background photos', autostart: 'Open when the TV turns on', on: 'On', off: 'Off',
    install: 'Install',
    wx: ['Clear sky', 'Mostly clear', 'Partly cloudy', 'Overcast', 'Fog', 'Drizzle', 'Rain',
         'Freezing rain', 'Snow', 'Rain showers', 'Snow showers', 'Thunderstorm'],
  },
  fr: {
    locale: 'fr-CA', label: 'Français', bing: 'fr-CA',
    morning: 'Bonjour', afternoon: 'Bon après-midi', evening: 'Bonsoir',
    settings: 'Paramètres', language: 'Langue', clockFormat: 'Format de l’heure', city: 'Ville pour la météo',
    cityPlaceholder: 'Tapez le nom de la ville', search: 'Chercher', close: 'Fermer',
    backHint: 'Appuyez sur Retour pour fermer.',
    searching: 'Recherche…', noResults: 'Aucune ville trouvée. Vérifiez le nom et réessayez.',
    pickCity: 'Choisissez la ville :', weatherError: 'Pas de données météo pour l’instant. Nouvel essai dans quelques minutes.',
    agenda: 'Agenda', today: 'Aujourd’hui', tomorrow: 'Demain', allDay: 'Toute la journée', now: 'En cours',
    agendaConnect: 'Connectez votre agenda dans Paramètres.',
    agendaEmpty: 'Rien de prévu aujourd’hui ni demain.',
    agendaError: 'Impossible de lire l’agenda. Vérifiez l’adresse dans Paramètres.',
    calendarLabel: 'Agenda (adresse secrète iCal)', calendarPlaceholder: 'Collez l’adresse qui finit par .ics',
    save: 'Enregistrer', calendarChecking: 'Lecture de l’agenda…', calendarSaved: 'Agenda enregistré.',
    calendarCleared: 'Agenda déconnecté.',
    calendarHint: 'Dans Google Agenda sur ordinateur : Paramètres → votre agenda → Adresse secrète au format iCal. Astuce : l’app Amazon Fire TV sur téléphone a un clavier pour la coller.',
    news: 'Manchettes', newsSource: 'Source des manchettes', newsAuto: 'Selon la langue',
    newsError: 'Pas de manchettes pour l’instant. Nouvel essai dans quelques minutes.',
    photos: 'Photos en arrière-plan', autostart: 'Ouvrir au démarrage de la télé', on: 'Activé', off: 'Désactivé',
    install: 'Installer',
    wx: ['Ciel dégagé', 'Plutôt dégagé', 'Partiellement nuageux', 'Couvert', 'Brouillard', 'Bruine', 'Pluie',
         'Pluie verglaçante', 'Neige', 'Averses', 'Averses de neige', 'Orage'],
  },
  es: {
    locale: 'es-ES', label: 'Español', bing: 'es-ES',
    morning: 'Buenos días', afternoon: 'Buenas tardes', evening: 'Buenas noches',
    settings: 'Ajustes', language: 'Idioma', clockFormat: 'Formato de hora', city: 'Ciudad del clima',
    cityPlaceholder: 'Escribe el nombre de la ciudad', search: 'Buscar', close: 'Cerrar',
    backHint: 'Pulsa Atrás en el mando para cerrar.',
    searching: 'Buscando…', noResults: 'No se encontró la ciudad. Revisa el nombre e inténtalo de nuevo.',
    pickCity: 'Elige la ciudad:', weatherError: 'Sin datos del clima ahora. Nuevo intento en unos minutos.',
    agenda: 'Agenda', today: 'Hoy', tomorrow: 'Mañana', allDay: 'Todo el día', now: 'Ahora',
    agendaConnect: 'Conecta tu agenda en Ajustes.',
    agendaEmpty: 'Nada programado para hoy ni mañana.',
    agendaError: 'No se pudo leer la agenda. Revisa la dirección en Ajustes.',
    calendarLabel: 'Agenda (dirección secreta iCal)', calendarPlaceholder: 'Pega la dirección que termina en .ics',
    save: 'Guardar', calendarChecking: 'Leyendo la agenda…', calendarSaved: 'Agenda guardada.',
    calendarCleared: 'Agenda desconectada.',
    calendarHint: 'En Google Calendar desde el ordenador: Configuración → tu calendario → Dirección secreta en formato iCal. Consejo: la app Amazon Fire TV del móvil tiene un teclado para pegarla.',
    news: 'Titulares', newsSource: 'Fuente de titulares', newsAuto: 'Según el idioma',
    newsError: 'Sin titulares ahora. Nuevo intento en unos minutos.',
    photos: 'Fotos de fondo', autostart: 'Abrir al encender la tele', on: 'Activado', off: 'Desactivado',
    install: 'Instalar',
    wx: ['Despejado', 'Mayormente despejado', 'Parcialmente nublado', 'Nublado', 'Niebla', 'Llovizna', 'Lluvia',
         'Lluvia helada', 'Nieve', 'Chubascos', 'Chubascos de nieve', 'Tormenta'],
  },
};

// ---------- Saved preferences ----------

const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem('tvhome.' + key);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('tvhome.' + key, JSON.stringify(value)); } catch (e) { /* not persisted */ }
  },
};

const browserLang = (navigator.language || 'pt').slice(0, 2);
const prefs = {
  lang: store.get('lang', STRINGS[browserLang] ? browserLang : 'pt'),
  hour12: store.get('hour12', false),
  city: store.get('city', DEFAULT_CITY),
  calendarUrl: store.get('calendarUrl', ''),
  news: store.get('news', 'auto'),
  photos: store.get('photos', true),
};

const t = (key) => STRINGS[prefs.lang][key];
const $ = (id) => document.getElementById(id);

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------- Native bridge ----------

const native = window.TVNative || null;
const pending = {};
let requestId = 0;

// The app answers fetchText() later by calling this.
window.__tvResolve = (id, ok, body) => {
  const p = pending[id];
  if (!p) return;
  delete pending[id];
  if (ok) p.resolve(body); else p.reject(new Error(body));
};

// GET a URL as text. The app fetches natively, so feeds without CORS headers work too.
function fetchText(url) {
  if (!native) {
    return fetch(url).then((res) => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.text();
    });
  }
  return new Promise((resolve, reject) => {
    const id = ++requestId;
    pending[id] = { resolve, reject };
    native.fetchText(url, id);
  });
}

// ---------- Fit the 1920×1080 stage to any screen ----------

function fitStage() {
  const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  $('stage').style.transform = `translate(-50%, -50%) scale(${scale})`;
}
window.addEventListener('resize', fitStage);

// ---------- Clock, date, greeting, sky ----------

function skyFor(hour) {
  if (hour >= 5 && hour < 7) return 'dawn';
  if (hour >= 7 && hour < 17) return 'day';
  if (hour >= 17 && hour < 19) return 'dusk';
  return 'night';
}

function formatTime(date) {
  return date.toLocaleTimeString(t('locale'), { hour: 'numeric', minute: '2-digit', hour12: prefs.hour12 });
}

function renderClock() {
  const now = new Date();
  const h = now.getHours();

  let hh = h;
  let ampm = '';
  if (prefs.hour12) {
    ampm = h < 12 ? 'AM' : 'PM';
    hh = h % 12 || 12;
  }
  const digits = (prefs.hour12 ? String(hh) : String(hh).padStart(2, '0')) + ':' + String(now.getMinutes()).padStart(2, '0');
  $('clock').innerHTML = [...digits]
    .map((c) => (c === ':' ? '<span class="colon">:</span>' : `<span class="digit">${c}</span>`))
    .join('') + (ampm ? `<span class="ampm">${ampm}</span>` : '');

  $('date').textContent = now.toLocaleDateString(t('locale'), { weekday: 'long', day: 'numeric', month: 'long' });
  $('greeting').textContent = h >= 5 && h < 12 ? t('morning') : h >= 12 && h < 18 ? t('afternoon') : t('evening');

  const sky = 'sky-' + skyFor(h);
  if (!document.body.classList.contains(sky)) {
    document.body.classList.remove('sky-dawn', 'sky-day', 'sky-dusk', 'sky-night');
    document.body.classList.add(sky);
  }
}

function everyMinute() {
  renderClock();
  renderAgenda();
}

function startClock() {
  everyMinute();
  // Tick on the minute boundary so the display never lags.
  setTimeout(() => { everyMinute(); setInterval(everyMinute, 60000); }, 60000 - (Date.now() % 60000) + 50);
}

// ---------- Weather (Open-Meteo, no key needed) ----------

const ICONS = {
  sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>',
  partly: '<path d="M8.5 3.5v1.3M3.4 8.6h1.3M4.9 5l.9.9M12.1 5l-.9.9"/><path d="M5.6 11.2a3.4 3.4 0 1 1 6-3"/><path d="M8 20h9.5a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.6 1.2A2.9 2.9 0 0 0 8 20Z"/>',
  cloud: '<path d="M7 19h10.5a4 4 0 0 0 .5-8 6 6 0 0 0-11.6 1.6A3.2 3.2 0 0 0 7 19Z"/>',
  fog: '<path d="M7 13.5h10.5a4 4 0 0 0 .5-8 6 6 0 0 0-11.6 1.6A3.2 3.2 0 0 0 7 13.5Z"/><path d="M4 17h16M6 20.5h12"/>',
  rain: '<path d="M7 14h10.5a4 4 0 0 0 .5-8 6 6 0 0 0-11.6 1.6A3.2 3.2 0 0 0 7 14Z"/><path d="M8.5 17l-1 3M12.5 17l-1 3M16.5 17l-1 3"/>',
  snow: '<path d="M7 14h10.5a4 4 0 0 0 .5-8 6 6 0 0 0-11.6 1.6A3.2 3.2 0 0 0 7 14Z"/><path d="M8 18h.01M12 20h.01M16 18h.01M10 21.5h.01M14 21.5h.01" stroke-width="2.6"/>',
  storm: '<path d="M7 14h10.5a4 4 0 0 0 .5-8 6 6 0 0 0-11.6 1.6A3.2 3.2 0 0 0 7 14Z"/><path d="M12.5 14.5 10 18.5h3.5L11 22.5"/>',
};

// WMO weather code → [index into STRINGS.wx, icon]
function describe(code, isDay = true) {
  if (code === 0) return [0, isDay ? 'sun' : 'moon'];
  if (code === 1) return [1, isDay ? 'sun' : 'moon'];
  if (code === 2) return [2, 'partly'];
  if (code === 3) return [3, 'cloud'];
  if (code === 45 || code === 48) return [4, 'fog'];
  if (code >= 51 && code <= 57) return [5, 'rain'];
  if (code === 66 || code === 67) return [7, 'rain'];
  if (code >= 61 && code <= 65) return [6, 'rain'];
  if (code >= 71 && code <= 77) return [8, 'snow'];
  if (code >= 80 && code <= 82) return [9, 'rain'];
  if (code === 85 || code === 86) return [10, 'snow'];
  if (code >= 95) return [11, 'storm'];
  return [3, 'cloud'];
}

const svg = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

let lastWeather = null;

async function loadWeather() {
  const { lat, lon } = prefs.city;
  const url = 'https://api.open-meteo.com/v1/forecast'
    + `?latitude=${lat}&longitude=${lon}`
    + '&current=temperature_2m,weather_code,is_day'
    + '&daily=weather_code,temperature_2m_max,temperature_2m_min'
    + '&timezone=auto&forecast_days=4';
  try {
    lastWeather = JSON.parse(await fetchText(url));
  } catch (e) {
    lastWeather = null;
  }
  renderWeather();
}

function renderWeather() {
  $('weather-city').textContent = prefs.city.name;
  if (!lastWeather || !lastWeather.current) {
    $('weather-icon').innerHTML = '';
    $('weather-temp').textContent = '';
    $('weather-desc').textContent = t('weatherError');
    $('forecast').innerHTML = '';
    document.body.classList.remove('overcast');
    return;
  }

  const cur = lastWeather.current;
  const [wx, icon] = describe(cur.weather_code, cur.is_day === 1);
  $('weather-icon').innerHTML = svg(icon);
  $('weather-temp').textContent = Math.round(cur.temperature_2m) + '°';
  $('weather-desc').textContent = t('wx')[wx];
  document.body.classList.toggle('overcast', cur.weather_code >= 3);

  const d = lastWeather.daily;
  const dayName = new Intl.DateTimeFormat(t('locale'), { weekday: 'short' });
  $('forecast').innerHTML = d.time.slice(1, 4).map((iso, i) => {
    const k = i + 1;
    const [, dIcon] = describe(d.weather_code[k]);
    const label = dayName.format(new Date(iso + 'T12:00:00')).replace('.', '');
    return `<li><span class="day">${label}</span>${svg(dIcon)}`
      + `<span class="range">${Math.round(d.temperature_2m_max[k])}°<span>${Math.round(d.temperature_2m_min[k])}°</span></span></li>`;
  }).join('');
}

// ---------- Agenda (secret iCal address) ----------

let calendarEvents = null;
let calendarFailed = false;

async function loadCalendar() {
  if (!prefs.calendarUrl) {
    calendarEvents = null;
    calendarFailed = false;
    renderAgenda();
    return true;
  }
  try {
    calendarEvents = Calendar.parse(await fetchText(prefs.calendarUrl.replace(/^webcal:/i, 'https:')));
    calendarFailed = false;
  } catch (e) {
    calendarFailed = true;
  }
  renderAgenda();
  return !calendarFailed;
}

function renderAgenda() {
  const list = $('agenda-list');
  const note = $('agenda-note');
  list.innerHTML = '';
  note.textContent = '';

  if (!prefs.calendarUrl) { note.textContent = t('agendaConnect'); return; }
  if (calendarFailed) { note.textContent = t('agendaError'); return; }
  if (!calendarEvents) return;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today.getTime() + 86400000);
  const dayAfter = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
  const items = Calendar.between(calendarEvents, now, dayAfter).slice(0, 5);

  if (!items.length) { note.textContent = t('agendaEmpty'); return; }

  list.innerHTML = items.map((ev) => {
    const day = ev.start < tomorrow ? t('today') : t('tomorrow');
    const happening = !ev.allDay && ev.start <= now && ev.end > now;
    let when = day + ', ' + (ev.allDay ? t('allDay').toLowerCase() : formatTime(ev.start));
    if (happening) when = t('now');
    return `<li${happening ? ' class="is-now"' : ''}><span class="when">${escapeHtml(when)}</span>`
      + `<span class="what">${escapeHtml(ev.title)}</span></li>`;
  }).join('');
}

// ---------- Headlines (RSS) ----------

function newsSource() {
  if (prefs.news === 'off') return null;
  return NEWS[prefs.news] || NEWS[NEWS_FOR_LANG[prefs.lang]];
}

async function loadNews() {
  const source = newsSource();
  const section = $('news-list').parentElement;
  section.hidden = !source;
  if (!source) return;

  $('news-title').innerHTML = `${t('news')} <span class="source">${escapeHtml(source.label)}</span>`;
  $('news-note').textContent = '';
  try {
    const xml = new DOMParser().parseFromString(await fetchText(source.url), 'application/xml');
    const titles = [...xml.querySelectorAll('item > title, entry > title')]
      .map((el) => decodeEntities(el.textContent).trim())
      .filter(Boolean)
      .slice(0, 3);
    if (!titles.length) throw new Error('empty feed');
    $('news-list').innerHTML = titles.map((title) => `<li>${escapeHtml(title)}</li>`).join('');
  } catch (e) {
    $('news-list').innerHTML = '';
    $('news-note').textContent = t('newsError');
  }
}

function decodeEntities(s) {
  const el = document.createElement('textarea');
  el.innerHTML = s;
  return el.value;
}

// ---------- Background photos (Bing photo of the day) ----------

let photos = [];
let photoIndex = 0;
let photoTimer = null;
let photoLayer = 'a';

async function loadPhotos() {
  clearInterval(photoTimer);
  if (!prefs.photos) {
    document.body.classList.remove('has-photo');
    $('photo-a').classList.remove('is-shown');
    $('photo-b').classList.remove('is-shown');
    $('photo-credit').textContent = '';
    return;
  }
  try {
    const data = JSON.parse(await fetchText(
      `https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=${t('bing')}`));
    photos = (data.images || []).map((img) => ({
      url: 'https://www.bing.com' + img.urlbase + '_1920x1080.jpg',
      credit: img.copyright || '',
    }));
  } catch (e) {
    photos = [];
  }
  if (!photos.length) return; // keep the sky
  photoIndex = 0;
  showPhoto();
  photoTimer = setInterval(() => {
    photoIndex = (photoIndex + 1) % photos.length;
    showPhoto();
  }, PHOTO_EVERY);
}

function showPhoto() {
  const photo = photos[photoIndex];
  const img = new Image();
  img.onload = () => {
    const next = photoLayer === 'a' ? 'b' : 'a';
    $('photo-' + next).style.backgroundImage = `url("${photo.url}")`;
    $('photo-' + next).classList.add('is-shown');
    $('photo-' + photoLayer).classList.remove('is-shown');
    photoLayer = next;
    document.body.classList.add('has-photo');
    $('photo-credit').textContent = photo.credit;
  };
  img.src = photo.url;
}

// ---------- Apps ----------

let installed = null; // [{ pkg, label }] inside the app, null in a browser

function refreshInstalled() {
  if (!native) return;
  try { installed = JSON.parse(native.listApps()); } catch (e) { installed = []; }
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9+]/g, '');

function packageFor(app) {
  if (!installed) return null;
  const byPkg = installed.find((a) => app.packages.indexOf(a.pkg) >= 0);
  if (byPkg) return byPkg.pkg;
  const byLabel = installed.find((a) => norm(a.label) === norm(app.name));
  return byLabel ? byLabel.pkg : null;
}

function renderApps() {
  refreshInstalled();
  $('app-row').innerHTML = APPS.map((app, i) => {
    const missing = installed && !packageFor(app);
    return `<li><button class="app" data-nav data-app="${i}" style="--tile:${app.color};${app.ink ? `--tile-ink:${app.ink}` : ''}">`
      + (missing ? `<span class="badge">${t('install')}</span>` : '')
      + `<span class="mark" aria-hidden="true">${app.name[0]}</span>${escapeHtml(app.name)}</button></li>`;
  }).join('');
}

$('app-row').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-app]');
  if (!btn || !native) return;
  const app = APPS[Number(btn.dataset.app)];
  const pkg = packageFor(app);
  if (!pkg || !native.launch(pkg)) native.openStore(app.name);
});

// ---------- Settings ----------

const pressed = (on) => `aria-pressed="${on}"`;

function renderChoices() {
  $('lang-choices').innerHTML = Object.keys(STRINGS).map((code) =>
    `<button data-nav data-lang="${code}" ${pressed(code === prefs.lang)}>${STRINGS[code].label}</button>`
  ).join('');
  $('hour-choices').innerHTML = [false, true].map((h12) =>
    `<button data-nav data-hour12="${h12}" ${pressed(h12 === prefs.hour12)}>${h12 ? '12 h' : '24 h'}</button>`
  ).join('');
  const newsKeys = ['auto'].concat(Object.keys(NEWS), ['off']);
  $('news-choices').innerHTML = newsKeys.map((key) => {
    const label = key === 'auto' ? t('newsAuto') : key === 'off' ? t('off') : NEWS[key].label;
    return `<button data-nav data-news="${key}" ${pressed(key === prefs.news)}>${label}</button>`;
  }).join('');
  $('photo-choices').innerHTML = [true, false].map((on) =>
    `<button data-nav data-photos="${on}" ${pressed(on === prefs.photos)}>${on ? t('on') : t('off')}</button>`
  ).join('');
  if (native && native.getAutoStart) {
    const auto = native.getAutoStart();
    $('autostart-block').hidden = false;
    $('autostart-choices').innerHTML = [true, false].map((on) =>
      `<button data-nav data-autostart="${on}" ${pressed(on === auto)}>${on ? t('on') : t('off')}</button>`
    ).join('');
  }
}

function applyLanguage() {
  document.documentElement.lang = t('locale');
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-label]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nLabel)); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  renderClock();
  renderWeather();
  renderAgenda();
  renderApps();
}

function openSettings() {
  renderChoices();
  $('city-status').textContent = '';
  $('city-results').innerHTML = '';
  $('calendar-status').textContent = '';
  $('calendar-input').value = prefs.calendarUrl;
  $('settings').hidden = false;
  $('settings').scrollTop = 0;
  focus(document.querySelector('#lang-choices [aria-pressed="true"]'));
}

function closeSettings() {
  if (document.activeElement) document.activeElement.blur();
  $('settings').hidden = true;
  focus($('settings-btn'));
}

$('settings-btn').addEventListener('click', openSettings);
$('close-settings').addEventListener('click', closeSettings);

// One handler for every choice row: update the preference, redraw, keep focus on the same choice.
$('settings').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn || !btn.parentElement.classList.contains('choice-row')) return;
  const d = btn.dataset;
  let selector = '';

  if (d.lang) {
    prefs.lang = d.lang;
    store.set('lang', prefs.lang);
    applyLanguage();
    if (prefs.news === 'auto') loadNews();
    if (prefs.photos) loadPhotos();
    selector = `[data-lang="${d.lang}"]`;
  } else if (d.hour12) {
    prefs.hour12 = d.hour12 === 'true';
    store.set('hour12', prefs.hour12);
    renderClock();
    renderAgenda();
    selector = `[data-hour12="${d.hour12}"]`;
  } else if (d.news) {
    prefs.news = d.news;
    store.set('news', prefs.news);
    loadNews();
    selector = `[data-news="${d.news}"]`;
  } else if (d.photos) {
    prefs.photos = d.photos === 'true';
    store.set('photos', prefs.photos);
    loadPhotos();
    selector = `[data-photos="${d.photos}"]`;
  } else if (d.autostart) {
    native.setAutoStart(d.autostart === 'true');
    selector = `[data-autostart="${d.autostart}"]`;
  } else {
    return;
  }
  renderChoices();
  focus($('settings').querySelector(selector));
});

let cityMatches = [];

$('city-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const q = $('city-input').value.trim();
  if (!q) return;
  $('city-input').blur();
  $('city-status').textContent = t('searching');
  $('city-results').innerHTML = '';
  try {
    const data = JSON.parse(await fetchText('https://geocoding-api.open-meteo.com/v1/search'
      + `?name=${encodeURIComponent(q)}&count=4&language=${prefs.lang}&format=json`));
    cityMatches = data.results || [];
  } catch (err) {
    cityMatches = [];
  }
  if (!cityMatches.length) {
    $('city-status').textContent = t('noResults');
    return;
  }
  $('city-status').textContent = t('pickCity');
  $('city-results').innerHTML = cityMatches.map((c, i) =>
    `<button data-nav data-city="${i}">${escapeHtml(c.name)}<small>${escapeHtml([c.admin1, c.country].filter(Boolean).join(', '))}</small></button>`
  ).join('');
  focus($('city-results').querySelector('button'));
});

$('city-results').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-city]');
  if (!btn) return;
  const c = cityMatches[Number(btn.dataset.city)];
  prefs.city = { name: c.name, lat: c.latitude, lon: c.longitude };
  store.set('city', prefs.city);
  loadWeather();
  closeSettings();
});

$('calendar-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  $('calendar-input').blur();
  prefs.calendarUrl = $('calendar-input').value.trim();
  store.set('calendarUrl', prefs.calendarUrl);
  if (!prefs.calendarUrl) {
    loadCalendar();
    $('calendar-status').textContent = t('calendarCleared');
    return;
  }
  $('calendar-status').textContent = t('calendarChecking');
  const ok = await loadCalendar();
  $('calendar-status').textContent = ok ? t('calendarSaved') : t('agendaError');
});

// ---------- Remote control navigation ----------

let current = null;

function focus(el) {
  if (!el) return;
  if (current) current.classList.remove('is-focused');
  current = el;
  el.classList.add('is-focused');
  // Text boxes only take real focus on OK, so the on-screen keyboard doesn't pop up while passing through.
  if (el.tagName === 'INPUT') {
    if (document.activeElement && document.activeElement !== el) document.activeElement.blur();
  } else {
    el.focus({ preventScroll: true });
  }
  if (el.classList.contains('app')) revealApp(el.parentElement);
  if (!$('settings').hidden) el.scrollIntoView({ block: 'nearest' });
}

function activeScope() {
  return $('settings').hidden ? $('home') : $('settings');
}

// Pick the nearest focusable in the pressed direction, favouring items in line with the current one.
function move(dir) {
  const items = [...activeScope().querySelectorAll('[data-nav]')].filter((el) => el.offsetParent !== null);
  if (!current || items.indexOf(current) < 0) return focus(items[0]);

  const from = current.getBoundingClientRect();
  const fx = from.left + from.width / 2;
  const fy = from.top + from.height / 2;
  const sideways = dir === 'left' || dir === 'right';
  let best = null;
  let bestScore = Infinity;

  for (const el of items) {
    if (el === current) continue;
    const r = el.getBoundingClientRect();
    const dx = r.left + r.width / 2 - fx;
    const dy = r.top + r.height / 2 - fy;
    const main = { left: -dx, right: dx, up: -dy, down: dy }[dir];
    if (main <= 1) continue;
    // Left/right stay on the same row; up/down may reach across the screen.
    if (sideways && (r.bottom <= from.top || r.top >= from.bottom)) continue;
    // Off-axis distance is the gap between edges, so anything overlapping counts as straight ahead.
    const cross = sideways
      ? Math.max(0, r.top - from.bottom, from.top - r.bottom)
      : Math.max(0, r.left - from.right, from.left - r.right);
    const score = main + cross * 2.5;
    if (score < bestScore) { bestScore = score; best = el; }
  }
  if (best) focus(best);
}

// Slide the app row so the focused tile is always fully on screen.
function revealApp(el) {
  const row = $('app-row');
  const viewport = row.clientWidth; // the safe area; neighbours may peek past it
  const left = el.offsetLeft;
  const right = left + el.offsetWidth;
  let shift = Number(row.dataset.shift || 0);
  if (right - shift > viewport) shift = right - viewport;
  if (left - shift < 0) shift = left;
  row.dataset.shift = shift;
  row.style.transform = `translateX(${-shift}px)`;
}

// Called by the app for the remote's Back and Menu buttons; Back returns whether it was used.
window.tvBack = () => {
  if ($('settings').hidden) return false;
  closeSettings();
  return true;
};
window.tvMenu = () => {
  if ($('settings').hidden) openSettings(); else closeSettings();
};
window.tvResume = () => {
  renderClock();
  renderApps();
  if (current && current.classList.contains('app')) focus($('app-row').querySelector(`[data-app="${current.dataset.app}"]`));
};

const BACK_KEYS = ['Escape', 'GoBack', 'BrowserBack'];
const BACK_CODES = [461, 10009]; // LG webOS, Samsung Tizen

document.addEventListener('keydown', (e) => {
  const dir = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' }[e.key];
  const typing = document.activeElement && document.activeElement.tagName === 'INPUT';

  if (dir) {
    // Inside the text box, left/right move the cursor; up/down leave it.
    if (typing && (dir === 'left' || dir === 'right')) return;
    e.preventDefault();
    if (typing) document.activeElement.blur();
    move(dir);
    return;
  }

  if (BACK_KEYS.indexOf(e.key) >= 0 || BACK_CODES.indexOf(e.keyCode) >= 0) {
    if (typing) { document.activeElement.blur(); return; }
    if (window.tvBack()) e.preventDefault();
    return;
  }

  if (e.key === 'Enter' && current && current.tagName === 'INPUT' && !typing) {
    e.preventDefault();
    current.focus();
  }
});

// Keep the highlight in sync if a pointer or the TV's own focus moves it.
document.addEventListener('focusin', (e) => {
  if (e.target.matches('[data-nav]') && e.target !== current) focus(e.target);
});

// ---------- Start ----------

fitStage();
applyLanguage();
startClock();
loadWeather();
loadCalendar();
loadNews();
loadPhotos();
setInterval(loadWeather, 15 * 60 * 1000);
setInterval(loadCalendar, 10 * 60 * 1000);
setInterval(loadNews, 30 * 60 * 1000);
setInterval(() => { if (prefs.photos) loadPhotos(); }, 6 * 60 * 60 * 1000);
focus(document.querySelector('.app'));
