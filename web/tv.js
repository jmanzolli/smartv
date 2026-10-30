// TV home, driven by the remote's arrows, OK, Back and Menu.
//
// Two layers: the home screen shows only what's worth a glance (clock, weather, the next event and
// reminder, the apps). Down from the apps opens "Today" with the agenda, reminders and headlines.
// Menu (☰) on an app or a note opens its options; elsewhere it opens Settings.
//
// Inside the Fire TV app, window.TVNative (see android/) launches apps and fetches feeds that
// browsers would block. Opened in a plain browser the page still works, without those parts.

// Apps in the default row. Fire TV and Android TV package names differ, so each lists the known
// ones; if none is installed the label is matched against the installed apps instead.
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

const PHOTO_EVERY = 2 * 60 * 1000;
const SAVER_AFTER = 5 * 60 * 1000;       // idle time before the screensaver
const SAVER_RELEASE = 60 * 60 * 1000;    // then let the TV's own sleep take over
const NIGHT_FROM = 22;                   // night mode hours
const NIGHT_UNTIL = 7;
const AGENDA_DAYS = 7;
const TODAY_EVENTS = 5;                  // agenda rows in the Today panel
const TODAY_NOTES = 4;
const HEADLINES = 4;
const NTFY = 'https://ntfy.sh/';         // free relay for notes sent from the phone
const NOTES_POLL = 30 * 1000;
const SNOOZE = 10 * 60 * 1000;
const LONG_PRESS = 700;

// Colours for apps added from the installed list, which have no colour of their own.
const TILE_COLORS = ['#3B3F8F', '#7A2E5C', '#1F6F5C', '#8A4B12', '#2E5E8A', '#5B3A8F', '#7A1C1C', '#28524A'];

const STRINGS = {
  pt: {
    locale: 'pt-BR', label: 'Português', bing: 'pt-BR',
    settings: 'Configurações', language: 'Idioma', clockFormat: 'Formato da hora', margin: 'Margem da tela',
    city: 'Cidade do clima', cityPlaceholder: 'Digite o nome da cidade', search: 'Buscar',
    searching: 'Buscando…', noResults: 'Nenhuma cidade encontrada. Confira o nome e tente de novo.',
    pickCity: 'Escolha a cidade:', weatherError: 'Sem dados do clima agora', feels: 'Sensação',
    next: 'Próximo', inTime: 'em {t}', nothingNext: 'Nada nos próximos 7 dias',
    agenda: 'Agenda', today: 'Hoje', tomorrow: 'Amanhã', allDay: 'Dia todo', now: 'Agora', until: 'até',
    agendaConnect: 'Conecte sua agenda em Configurações ou pelo celular.',
    agendaEmpty: 'Nada marcado para hoje e amanhã.',
    agendaError: 'Não consegui ler a agenda. Confira o endereço em Configurações.',
    calendarLabel: 'Agenda (endereço secreto iCal)', calendarPlaceholder: 'Cole o endereço que termina em .ics',
    save: 'Salvar', calendarChecking: 'Lendo a agenda…', calendarSaved: 'Agenda salva.', calendarCleared: 'Agenda desconectada.',
    calendarHint: 'No Google Agenda, pelo computador: Configurações → sua agenda → Endereço secreto no formato iCal. Mais fácil: mande “agenda: <endereço>” pelo celular (veja abaixo).',
    news: 'Notícias', newsSource: 'Notícias', newsAuto: 'Seguir o idioma',
    newsError: 'Sem notícias agora. Nova tentativa em alguns minutos.',
    photos: 'Fotos de fundo', autostart: 'Abrir ao ligar a TV', on: 'Ligado', off: 'Desligado',
    nightMode: 'Modo noturno', nightBadge: 'Modo noturno até 7:00', nightRange: '22:00–7:00',
    groupGeneral: 'Geral', groupInfo: 'Informações', groupScreen: 'Tela', connected: 'Conectada', notConnected: 'Não conectada',
    back: 'Voltar', done: 'Pronto', cancel: 'Cancelar',
    todayHandle: 'Hoje · agenda, lembretes e notícias',
    nextDays: 'Próximos 7 dias', eventsCount: '{n} eventos', weekEmpty: 'Nada marcado nos próximos 7 dias.',
    weekHint: '← → muda de dia · ↑ ↓ percorre os eventos · Voltar fecha',
    open: 'Abrir', move: 'Mover', removeApp: 'Remover da fileira', addApp: 'Adicionar app…',
    moveHint: 'Use <b>← →</b> para mover · <b>OK</b> para soltar',
    addTitle: 'Adicionar app', addCount: '{n} instalados · OK põe ou tira da fileira', addOnlyTv: 'A lista de apps só aparece na TV.',
    install: 'Instalar',
    reminders: 'Lembretes', newNote: 'Nova nota', notesPending: '{n} pendentes', moreNotes: '+{n}',
    noteWhat: 'O que lembrar?', notePlaceholder: 'Ex.: dentista amanhã 9h', remindWhen: 'Avisar',
    whenNone: 'Sem aviso', whenHalf: 'Em 30 min', whenHour: 'Em 1 hora', whenTonight: 'Hoje, 20:00', whenMorning: 'Amanhã, 8:00',
    noteDone: 'Feito', snooze: 'Adiar 10 min', reminder: 'Lembrete', fromPhone: 'Do celular', fromPhoneShort: 'Do celular:',
    markDone: 'Marcar como feita', markUndone: 'Desmarcar', deleteNote: 'Apagar',
    notesEmpty: 'Nenhuma nota. Crie uma aqui ou mande do celular.',
    notesHint: 'OK marca como feita · ☰ mais opções · Voltar fecha',
    phoneTitle: 'Mande do celular', phoneNotes: 'Notas pelo celular',
    phoneHint: '“dentista amanhã 9h” vira aviso na hora.',
    phoneSetup: 'Configurar pelo celular',
    phoneSetupHint: 'Mande “agenda: <endereço iCal>” ou “cidade: <nome>” para:',
    agendaSetPhone: 'Agenda conectada pelo celular', citySetPhone: 'Cidade do clima mudou para',
    tomorrowWords: 'amanhã|amanha', todayWords: 'hoje', atWords: 'às|as|a',
    wx: ['Céu limpo', 'Quase limpo', 'Parcialmente nublado', 'Nublado', 'Neblina', 'Garoa', 'Chuva',
         'Chuva congelante', 'Neve', 'Pancadas de chuva', 'Pancadas de neve', 'Tempestade'],
  },
  en: {
    locale: 'en-CA', label: 'English', bing: 'en-CA',
    settings: 'Settings', language: 'Language', clockFormat: 'Clock format', margin: 'Screen margin',
    city: 'Weather city', cityPlaceholder: 'Type a city name', search: 'Search',
    searching: 'Searching…', noResults: 'No city found. Check the spelling and try again.',
    pickCity: 'Choose your city:', weatherError: 'No weather data right now', feels: 'Feels like',
    next: 'Next', inTime: 'in {t}', nothingNext: 'Nothing in the next 7 days',
    agenda: 'Calendar', today: 'Today', tomorrow: 'Tomorrow', allDay: 'All day', now: 'Now', until: 'until',
    agendaConnect: 'Connect your calendar in Settings or from your phone.',
    agendaEmpty: 'Nothing scheduled today or tomorrow.',
    agendaError: 'Couldn’t read the calendar. Check the address in Settings.',
    calendarLabel: 'Calendar (secret iCal address)', calendarPlaceholder: 'Paste the address ending in .ics',
    save: 'Save', calendarChecking: 'Reading the calendar…', calendarSaved: 'Calendar saved.', calendarCleared: 'Calendar disconnected.',
    calendarHint: 'In Google Calendar on a computer: Settings → your calendar → Secret address in iCal format. Easier: send “calendar: <address>” from your phone (see below).',
    news: 'News', newsSource: 'News', newsAuto: 'Match the language',
    newsError: 'No headlines right now. Trying again in a few minutes.',
    photos: 'Background photos', autostart: 'Open when the TV turns on', on: 'On', off: 'Off',
    nightMode: 'Night mode', nightBadge: 'Night mode until 7:00', nightRange: '10 PM–7 AM',
    groupGeneral: 'General', groupInfo: 'Information', groupScreen: 'Screen', connected: 'Connected', notConnected: 'Not connected',
    back: 'Back', done: 'Done', cancel: 'Cancel',
    todayHandle: 'Today · calendar, reminders and news',
    nextDays: 'Next 7 days', eventsCount: '{n} events', weekEmpty: 'Nothing scheduled in the next 7 days.',
    weekHint: '← → changes day · ↑ ↓ goes through events · Back closes',
    open: 'Open', move: 'Move', removeApp: 'Remove from row', addApp: 'Add an app…',
    moveHint: 'Use <b>← →</b> to move · <b>OK</b> to drop',
    addTitle: 'Add an app', addCount: '{n} installed · OK adds or removes it', addOnlyTv: 'The app list only shows on the TV.',
    install: 'Install',
    reminders: 'Reminders', newNote: 'New note', notesPending: '{n} pending', moreNotes: '+{n}',
    noteWhat: 'What to remember?', notePlaceholder: 'E.g. dentist tomorrow 9:00', remindWhen: 'Remind me',
    whenNone: 'No reminder', whenHalf: 'In 30 min', whenHour: 'In 1 hour', whenTonight: 'Tonight, 8 PM', whenMorning: 'Tomorrow, 8 AM',
    noteDone: 'Done', snooze: 'Snooze 10 min', reminder: 'Reminder', fromPhone: 'From your phone', fromPhoneShort: 'From your phone:',
    markDone: 'Mark as done', markUndone: 'Mark as not done', deleteNote: 'Delete',
    notesEmpty: 'No notes. Add one here or send one from your phone.',
    notesHint: 'OK marks it done · ☰ more options · Back closes',
    phoneTitle: 'Send from your phone', phoneNotes: 'Notes from the phone',
    phoneHint: '“dentist tomorrow 9:00” becomes a reminder.',
    phoneSetup: 'Set up from your phone',
    phoneSetupHint: 'Send “calendar: <iCal address>” or “city: <name>” to:',
    agendaSetPhone: 'Calendar connected from your phone', citySetPhone: 'Weather city changed to',
    tomorrowWords: 'tomorrow', todayWords: 'today', atWords: 'at',
    wx: ['Clear sky', 'Mostly clear', 'Partly cloudy', 'Cloudy', 'Fog', 'Drizzle', 'Rain',
         'Freezing rain', 'Snow', 'Showers', 'Snow showers', 'Thunderstorm'],
  },
  fr: {
    locale: 'fr-CA', label: 'Français', bing: 'fr-CA',
    settings: 'Paramètres', language: 'Langue', clockFormat: 'Format de l’heure', margin: 'Marge de l’écran',
    city: 'Ville de la météo', cityPlaceholder: 'Tapez le nom de la ville', search: 'Chercher',
    searching: 'Recherche…', noResults: 'Aucune ville trouvée. Vérifiez le nom et réessayez.',
    pickCity: 'Choisissez la ville :', weatherError: 'Pas de météo pour le moment', feels: 'Ressenti',
    next: 'Prochain', inTime: 'dans {t}', nothingNext: 'Rien dans les 7 prochains jours',
    agenda: 'Agenda', today: 'Aujourd’hui', tomorrow: 'Demain', allDay: 'Toute la journée', now: 'Maintenant', until: 'jusqu’à',
    agendaConnect: 'Connectez votre agenda dans Paramètres ou du téléphone.',
    agendaEmpty: 'Rien de prévu aujourd’hui ni demain.',
    agendaError: 'Impossible de lire l’agenda. Vérifiez l’adresse dans Paramètres.',
    calendarLabel: 'Agenda (adresse secrète iCal)', calendarPlaceholder: 'Collez l’adresse qui finit par .ics',
    save: 'Enregistrer', calendarChecking: 'Lecture de l’agenda…', calendarSaved: 'Agenda enregistré.', calendarCleared: 'Agenda déconnecté.',
    calendarHint: 'Dans Google Agenda, sur ordinateur : Paramètres → votre agenda → Adresse secrète au format iCal. Plus simple : envoyez « agenda: <adresse> » du téléphone (voir plus bas).',
    news: 'Actualités', newsSource: 'Actualités', newsAuto: 'Selon la langue',
    newsError: 'Pas de manchettes pour le moment. Nouvel essai dans quelques minutes.',
    photos: 'Photos en arrière-plan', autostart: 'Ouvrir au démarrage de la télé', on: 'Activé', off: 'Désactivé',
    nightMode: 'Mode nuit', nightBadge: 'Mode nuit jusqu’à 7 h', nightRange: '22 h – 7 h',
    groupGeneral: 'Général', groupInfo: 'Informations', groupScreen: 'Écran', connected: 'Connecté', notConnected: 'Non connecté',
    back: 'Retour', done: 'Terminé', cancel: 'Annuler',
    todayHandle: 'Aujourd’hui · agenda, rappels et actualités',
    nextDays: '7 prochains jours', eventsCount: '{n} événements', weekEmpty: 'Rien de prévu dans les 7 prochains jours.',
    weekHint: '← → change de jour · ↑ ↓ parcourt les événements · Retour ferme',
    open: 'Ouvrir', move: 'Déplacer', removeApp: 'Retirer de la rangée', addApp: 'Ajouter une appli…',
    moveHint: '<b>← →</b> pour déplacer · <b>OK</b> pour déposer',
    addTitle: 'Ajouter une appli', addCount: '{n} installées · OK l’ajoute ou la retire', addOnlyTv: 'La liste des applis s’affiche seulement sur la télé.',
    install: 'Installer',
    reminders: 'Rappels', newNote: 'Nouvelle note', notesPending: '{n} en attente', moreNotes: '+{n}',
    noteWhat: 'Quoi retenir ?', notePlaceholder: 'Ex. : dentiste demain 9h', remindWhen: 'Rappel',
    whenNone: 'Sans rappel', whenHalf: 'Dans 30 min', whenHour: 'Dans 1 heure', whenTonight: 'Ce soir, 20 h', whenMorning: 'Demain, 8 h',
    noteDone: 'Fait', snooze: 'Reporter 10 min', reminder: 'Rappel', fromPhone: 'Du téléphone', fromPhoneShort: 'Du téléphone :',
    markDone: 'Marquer comme fait', markUndone: 'Marquer comme à faire', deleteNote: 'Supprimer',
    notesEmpty: 'Aucune note. Créez-en une ici ou envoyez-la du téléphone.',
    notesHint: 'OK la marque comme faite · ☰ plus d’options · Retour ferme',
    phoneTitle: 'Envoyez du téléphone', phoneNotes: 'Notes du téléphone',
    phoneHint: '« dentiste demain 9h » devient un rappel.',
    phoneSetup: 'Configurer du téléphone',
    phoneSetupHint: 'Envoyez « agenda: <adresse iCal> » ou « ville: <nom> » à :',
    agendaSetPhone: 'Agenda connecté du téléphone', citySetPhone: 'Ville de la météo changée pour',
    tomorrowWords: 'demain', todayWords: 'aujourd’hui|aujourd\'hui', atWords: 'à|a',
    wx: ['Ciel dégagé', 'Plutôt dégagé', 'Partiellement nuageux', 'Nuageux', 'Brouillard', 'Bruine', 'Pluie',
         'Pluie verglaçante', 'Neige', 'Averses', 'Averses de neige', 'Orage'],
  },
  es: {
    locale: 'es-ES', label: 'Español', bing: 'es-ES',
    settings: 'Ajustes', language: 'Idioma', clockFormat: 'Formato de hora', margin: 'Margen de la pantalla',
    city: 'Ciudad del tiempo', cityPlaceholder: 'Escribe el nombre de la ciudad', search: 'Buscar',
    searching: 'Buscando…', noResults: 'No se encontró la ciudad. Revisa el nombre e inténtalo de nuevo.',
    pickCity: 'Elige la ciudad:', weatherError: 'Sin datos del tiempo ahora', feels: 'Sensación',
    next: 'Próximo', inTime: 'en {t}', nothingNext: 'Nada en los próximos 7 días',
    agenda: 'Agenda', today: 'Hoy', tomorrow: 'Mañana', allDay: 'Todo el día', now: 'Ahora', until: 'hasta',
    agendaConnect: 'Conecta tu agenda en Ajustes o desde el móvil.',
    agendaEmpty: 'Nada previsto para hoy ni mañana.',
    agendaError: 'No pude leer la agenda. Revisa la dirección en Ajustes.',
    calendarLabel: 'Agenda (dirección secreta iCal)', calendarPlaceholder: 'Pega la dirección que termina en .ics',
    save: 'Guardar', calendarChecking: 'Leyendo la agenda…', calendarSaved: 'Agenda guardada.', calendarCleared: 'Agenda desconectada.',
    calendarHint: 'En Google Calendar, desde el ordenador: Configuración → tu calendario → Dirección secreta en formato iCal. Más fácil: manda «agenda: <dirección>» desde el móvil (mira abajo).',
    news: 'Noticias', newsSource: 'Noticias', newsAuto: 'Según el idioma',
    newsError: 'Sin titulares ahora. Nuevo intento en unos minutos.',
    photos: 'Fotos de fondo', autostart: 'Abrir al encender la tele', on: 'Activado', off: 'Desactivado',
    nightMode: 'Modo nocturno', nightBadge: 'Modo nocturno hasta las 7:00', nightRange: '22:00–7:00',
    groupGeneral: 'General', groupInfo: 'Información', groupScreen: 'Pantalla', connected: 'Conectada', notConnected: 'Sin conectar',
    back: 'Volver', done: 'Listo', cancel: 'Cancelar',
    todayHandle: 'Hoy · agenda, recordatorios y noticias',
    nextDays: 'Próximos 7 días', eventsCount: '{n} eventos', weekEmpty: 'Nada previsto en los próximos 7 días.',
    weekHint: '← → cambia de día · ↑ ↓ recorre los eventos · Atrás cierra',
    open: 'Abrir', move: 'Mover', removeApp: 'Quitar de la fila', addApp: 'Añadir app…',
    moveHint: 'Usa <b>← →</b> para mover · <b>OK</b> para soltar',
    addTitle: 'Añadir app', addCount: '{n} instaladas · OK la añade o la quita', addOnlyTv: 'La lista de apps solo aparece en la tele.',
    install: 'Instalar',
    reminders: 'Recordatorios', newNote: 'Nueva nota', notesPending: '{n} pendientes', moreNotes: '+{n}',
    noteWhat: '¿Qué recordar?', notePlaceholder: 'Ej.: dentista mañana 9h', remindWhen: 'Avisar',
    whenNone: 'Sin aviso', whenHalf: 'En 30 min', whenHour: 'En 1 hora', whenTonight: 'Hoy, 20:00', whenMorning: 'Mañana, 8:00',
    noteDone: 'Hecho', snooze: 'Posponer 10 min', reminder: 'Recordatorio', fromPhone: 'Del móvil', fromPhoneShort: 'Desde el móvil:',
    markDone: 'Marcar como hecha', markUndone: 'Desmarcar', deleteNote: 'Borrar',
    notesEmpty: 'No hay notas. Crea una aquí o mándala desde el móvil.',
    notesHint: 'OK la marca como hecha · ☰ más opciones · Atrás cierra',
    phoneTitle: 'Mándalas desde el móvil', phoneNotes: 'Notas desde el móvil',
    phoneHint: '«dentista mañana 9h» se vuelve un aviso.',
    phoneSetup: 'Configurar desde el móvil',
    phoneSetupHint: 'Manda «agenda: <dirección iCal>» o «ciudad: <nombre>» a:',
    agendaSetPhone: 'Agenda conectada desde el móvil', citySetPhone: 'La ciudad del tiempo ahora es',
    tomorrowWords: 'mañana|manana', todayWords: 'hoy', atWords: 'a las|a',
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
  margin: store.get('margin', 0),
  night: store.get('night', true),
  apps: store.get('apps', null), // row order as app names or 'pkg:<package>'; null = APPS
  phoneNotes: store.get('phoneNotes', true),
};

const t = (key) => STRINGS[prefs.lang][key];
const $ = (id) => document.getElementById(id);

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fill = (s, n) => s.replace('{n}', n);

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

const MARGINS = [0, 2.5, 5, 7.5]; // percent of the screen left empty on each side
let stageScale = 1;

// The app also calls this when the WebView changes size, since a TV may report its real size late.
function fitStage() {
  const w = document.documentElement.clientWidth || window.innerWidth;
  const h = document.documentElement.clientHeight || window.innerHeight;
  if (!w || !h) return;
  stageScale = Math.min(w / 1920, h / 1080) * (1 - prefs.margin / 50);
  $('stage').style.transform = `translate(-50%, -50%) scale(${stageScale})`;
}
window.tvFit = fitStage;
window.addEventListener('resize', fitStage);
window.addEventListener('load', fitStage);

// ---------- Icons ----------

const ICONS = {
  sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>',
  partly: '<path d="M8.5 3.5v1.3M3.4 8.6h1.3M4.9 5l.9.9M12.1 5l-.9.9"/><path d="M5.6 11.2a3.4 3.4 0 1 1 6-3"/><path d="M8 20h9.5a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.6 1.2A2.9 2.9 0 0 0 8 20Z"/>',
  cloud: '<path d="M7 19h10.5a4 4 0 0 0 .5-8 6 6 0 0 0-11.6 1.6A3.2 3.2 0 0 0 7 19Z"/>',
  fog: '<path d="M7 13.5h10.5a4 4 0 0 0 .5-8 6 6 0 0 0-11.6 1.6A3.2 3.2 0 0 0 7 13.5Z"/><path d="M4 17h16M6 20.5h12"/>',
  rain: '<path d="M7 14h10.5a4 4 0 0 0 .5-8 6 6 0 0 0-11.6 1.6A3.2 3.2 0 0 0 7 14Z"/><path d="M8.5 17l-1 3M12.5 17l-1 3M16.5 17l-1 3"/>',
  snow: '<path d="M7 14h10.5a4 4 0 0 0 .5-8 6 6 0 0 0-11.6 1.6A3.2 3.2 0 0 0 7 14Z"/><path d="M8 18h.01M12 20h.01M16 18h.01M10 21.5h.01M14 21.5h.01" stroke-width="2.6"/>',
  storm: '<path d="M7 14h10.5a4 4 0 0 0 .5-8 6 6 0 0 0-11.6 1.6A3.2 3.2 0 0 0 7 14Z"/><path d="M12.5 14.5 10 18.5h3.5L11 22.5"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4l2-2Z"/><path d="M10 21h4"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  left: '<path d="M15 5l-7 7 7 7"/>',
  right: '<path d="M9 5l7 7-7 7"/>',
};
const svg = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

// ---------- Dates ----------

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function formatTime(date) {
  return date.toLocaleTimeString(t('locale'), { hour: 'numeric', minute: '2-digit', hour12: prefs.hour12 });
}

// "Hoje", "Amanhã" or a short weekday ("Dom.").
function shortDay(date) {
  const today = startOfDay(new Date());
  if (date < addDays(today, 1)) return t('today');
  if (date < addDays(today, 2)) return t('tomorrow');
  return capitalize(date.toLocaleDateString(t('locale'), { weekday: 'short' }));
}

function longDate(date) {
  return date.toLocaleDateString(t('locale'), { weekday: 'long', day: 'numeric', month: 'long' });
}

// "em 1 h 40 min"
function inTime(ms) {
  const mins = Math.max(1, Math.round(ms / 60000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return t('inTime').replace('{t}', (h ? `${h} h` : '') + (h && m ? ' ' : '') + (m || !h ? `${m} min` : ''));
}

// ---------- Clock and sky ----------

function skyFor(hour) {
  if (hour >= 5 && hour < 7) return 'dawn';
  if (hour >= 7 && hour < 17) return 'day';
  if (hour >= 17 && hour < 19) return 'dusk';
  return 'night';
}

function clockText(now) {
  const h = now.getHours();
  const hh = prefs.hour12 ? String(h % 12 || 12) : String(h).padStart(2, '0');
  return hh + ':' + String(now.getMinutes()).padStart(2, '0');
}

function renderClock() {
  const now = new Date();
  const h = now.getHours();
  $('clock').innerHTML = escapeHtml(clockText(now)) + (prefs.hour12 ? `<span class="ampm">${h < 12 ? 'AM' : 'PM'}</span>` : '');
  $('date').textContent = longDate(now);
  $('today-clock').textContent = clockText(now);
  $('today-date').textContent = longDate(now);

  const sky = 'sky-' + skyFor(h);
  if (!document.body.classList.contains(sky)) {
    document.body.classList.remove('sky-dawn', 'sky-day', 'sky-dusk', 'sky-night');
    document.body.classList.add(sky);
  }
}

// ---------- Night mode (darker sky, no photo, quieter tiles) ----------

function applyNight() {
  const h = new Date().getHours();
  document.body.classList.toggle('night', prefs.night && (h >= NIGHT_FROM || h < NIGHT_UNTIL));
}

function everyMinute() {
  renderClock();
  renderGlance();
  if (view === 'today') renderTodayAgenda();
  applyNight();
  if (saverOn) renderSaver();
}

function startClock() {
  everyMinute();
  // Tick on the minute boundary so the display never lags.
  setTimeout(() => { everyMinute(); setInterval(everyMinute, 60000); }, 60000 - (Date.now() % 60000) + 50);
}

// ---------- Weather (Open-Meteo, no key needed) ----------

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

let lastWeather = null;

async function loadWeather() {
  const { lat, lon } = prefs.city;
  const url = 'https://api.open-meteo.com/v1/forecast'
    + `?latitude=${lat}&longitude=${lon}`
    + '&current=temperature_2m,apparent_temperature,weather_code,is_day'
    + '&timezone=auto';
  try {
    lastWeather = JSON.parse(await fetchText(url));
  } catch (e) {
    lastWeather = null;
  }
  renderWeather();
}

function feelsText(cur) {
  return typeof cur.apparent_temperature === 'number' ? `${t('feels')} ${Math.round(cur.apparent_temperature)}°` : '';
}

function renderWeather() {
  const cur = lastWeather && lastWeather.current;
  if (!cur) {
    $('weather-icon').innerHTML = '';
    $('weather-temp').textContent = '';
    $('weather-desc').textContent = t('weatherError');
    $('weather-sub').textContent = prefs.city.name;
    $('today-weather').textContent = '';
    return;
  }
  const [wx, icon] = describe(cur.weather_code, cur.is_day === 1);
  $('weather-icon').innerHTML = svg(icon);
  $('weather-temp').textContent = Math.round(cur.temperature_2m) + '°';
  $('weather-desc').textContent = t('wx')[wx];
  $('weather-sub').textContent = [feelsText(cur), prefs.city.name].filter(Boolean).join(' · ');
  $('today-weather').textContent = [Math.round(cur.temperature_2m) + '°', feelsText(cur)].filter(Boolean).join(' · ');
}

// ---------- Agenda (secret iCal address) ----------

let calendarEvents = null;
let calendarFailed = false;

async function loadCalendar() {
  if (!prefs.calendarUrl) {
    calendarEvents = null;
    calendarFailed = false;
  } else {
    try {
      calendarEvents = Calendar.parse(await fetchText(prefs.calendarUrl.replace(/^webcal:/i, 'https:')));
      calendarFailed = false;
    } catch (e) {
      calendarFailed = true;
    }
  }
  renderGlance();
  renderTodayAgenda();
  if (view === 'week') renderWeek();
  return !calendarFailed;
}

// Events from now through the next AGENDA_DAYS days.
function upcoming(days = AGENDA_DAYS) {
  if (!calendarEvents) return [];
  const now = new Date();
  return Calendar.between(calendarEvents, now, addDays(startOfDay(now), days));
}

function eventDetails(ev) {
  const parts = [];
  if (!ev.allDay && ev.end - ev.start > 0) parts.push(`${t('until')} ${formatTime(ev.end)}`);
  if (ev.location) parts.push(ev.location);
  return parts.join(' · ');
}

// ---------- Home: the next event and reminder ----------

function renderGlance() {
  const now = new Date();
  const title = $('next-title');
  const sub = $('next-sub');
  if (!prefs.calendarUrl) {
    title.textContent = '';
    sub.textContent = t('agendaConnect');
  } else if (calendarFailed) {
    title.textContent = '';
    sub.textContent = t('agendaError');
  } else {
    const ev = upcoming()[0];
    if (!ev) {
      title.textContent = calendarEvents ? t('nothingNext') : '';
      sub.textContent = '';
    } else {
      const happening = !ev.allDay && ev.start <= now && ev.end > now;
      const today = ev.start < addDays(startOfDay(now), 1);
      let when;
      if (happening) when = t('now');
      else if (ev.allDay) when = shortDay(ev.start);
      else when = today ? formatTime(ev.start) : `${shortDay(ev.start)} ${formatTime(ev.start)}`;
      title.innerHTML = `<span class="time">${escapeHtml(when)}</span>${escapeHtml(ev.title)}`;
      const bits = [];
      if (!happening && !ev.allDay && today) bits.push(inTime(ev.start - now));
      else if (eventDetails(ev)) bits.push(...eventDetails(ev).split(' · ').slice(0, 1));
      if (ev.location && bits.indexOf(ev.location) < 0) bits.push(ev.location);
      sub.textContent = bits.join(' · ');
    }
  }

  const list = pendingNotes();
  const first = list[0];
  $('next-reminder').innerHTML = first
    ? svg('bell') + `<span>${escapeHtml(first.text)}${first.at ? ' · ' + escapeHtml(noteTime(first.at)) : ''}</span>`
      + (list.length > 1 ? `<span class="more">${escapeHtml(fill(t('moreNotes'), list.length - 1))}</span>` : '')
    : '';
}

// ---------- Today panel ----------

function renderTodayAgenda() {
  const box = $('today-agenda');
  if (!prefs.calendarUrl) { box.innerHTML = `<p class="note">${escapeHtml(t('agendaConnect'))}</p>`; return; }
  if (calendarFailed) { box.innerHTML = `<p class="note">${escapeHtml(t('agendaError'))}</p>`; return; }
  const items = upcoming(2).slice(0, TODAY_EVENTS);
  if (!items.length) { box.innerHTML = `<p class="note">${escapeHtml(t('agendaEmpty'))}</p>`; return; }
  const tomorrow = addDays(startOfDay(new Date()), 1);
  let shownTomorrow = false;
  box.innerHTML = items.map((ev) => {
    let head = '';
    if (ev.start >= tomorrow && !shownTomorrow) {
      shownTomorrow = true;
      head = `<p class="subhead">${escapeHtml(t('tomorrow'))}</p>`;
    }
    const details = eventDetails(ev);
    return head + `<div class="row" data-nav tabindex="-1"><span class="time">${escapeHtml(ev.allDay ? t('allDay') : formatTime(ev.start))}</span>`
      + `<div><p class="what">${escapeHtml(ev.title)}</p>${details ? `<p class="details">${escapeHtml(details)}</p>` : ''}</div></div>`;
  }).join('');
}

function renderTodayNotes() {
  const list = pendingNotes().slice(0, TODAY_NOTES);
  $('today-notes').innerHTML = list.map(noteRowHtml).join('')
    || `<p class="note">${escapeHtml(t('notesEmpty'))}</p>`;
  renderPhoneBits();
}

function openToday() {
  renderClock();
  renderWeather();
  renderTodayAgenda();
  renderTodayNotes();
  const first = $('today-view').querySelector('.col-body [data-nav]') || $('week-btn');
  openView('today', first);
}

$('today-handle').addEventListener('click', openToday);
$('week-btn').addEventListener('click', () => { renderWeek(); openView('week', $('week-grid').querySelector('[data-nav]') || $('week-back')); });
$('today-new-note').addEventListener('click', () => openNewNote());
$('today-notes').addEventListener('click', (e) => {
  const row = e.target.closest('[data-note]');
  if (row) toggleNote(row.dataset.note);
});

// ---------- Week ----------

function renderWeek() {
  const all = upcoming();
  const today = startOfDay(new Date());
  $('week-count').textContent = fill(t('eventsCount'), all.length);
  let html = '';
  for (let i = 0; i < AGENDA_DAYS; i++) {
    const day = addDays(today, i);
    const next = addDays(today, i + 1);
    const events = all.filter((ev) => (i === 0 ? ev.start < next : ev.start >= day && ev.start < next));
    const label = i === 0 ? t('today') : capitalize(day.toLocaleDateString(t('locale'), { weekday: 'short' })).replace('.', '');
    html += `<div class="day-col${i === 0 ? ' today' : ''}"><p class="weekday">${escapeHtml(label)}</p><p class="num">${day.getDate()}</p>`
      + events.map((ev) => {
        const details = eventDetails(ev);
        return `<div class="ev-card" data-nav tabindex="-1"><p class="time">${escapeHtml(ev.allDay ? t('allDay') : formatTime(ev.start))}</p>`
          + `<p class="what">${escapeHtml(ev.title)}</p>${details ? `<p class="details">${escapeHtml(details)}</p>` : ''}</div>`;
      }).join('') + '</div>';
  }
  $('week-grid').innerHTML = html;
}

$('week-back').addEventListener('click', () => closeView());

// ---------- Headlines (RSS) ----------

function newsKey() {
  return NEWS[prefs.news] ? prefs.news : NEWS_FOR_LANG[prefs.lang];
}

function newsSource() {
  if (prefs.news === 'off') return null;
  return NEWS[newsKey()];
}

// Left/right on the switcher next to "News" changes the source and remembers it.
function cycleNews(step) {
  const keys = Object.keys(NEWS);
  const i = keys.indexOf(newsKey());
  prefs.news = keys[(i + step + keys.length) % keys.length];
  store.set('news', prefs.news);
  loadNews();
}

async function loadNews() {
  const source = newsSource();
  const col = $('news-list').closest('.col');
  col.hidden = !source;
  if (!source) return;

  const keys = Object.keys(NEWS);
  $('news-source').textContent = source.label;
  $('news-dots').innerHTML = keys.map((k) => `<i${k === newsKey() ? ' class="on"' : ''}></i>`).join('');
  $('news-note').textContent = '';
  try {
    const xml = new DOMParser().parseFromString(await fetchText(source.url), 'application/xml');
    const titles = [...xml.querySelectorAll('item > title, entry > title')]
      .map((el) => decodeEntities(el.textContent).trim())
      .filter(Boolean)
      .slice(0, HEADLINES);
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

$('news-switch').addEventListener('click', () => cycleNews(1));

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
    $('saver-credit').textContent = '';
    return;
  }
  // Bing serves at most 8 photos per request and keeps about 15 days, so ask for both halves.
  const pages = await Promise.all([0, 7].map((idx) =>
    fetchText(`https://www.bing.com/HPImageArchive.aspx?format=js&idx=${idx}&n=8&mkt=${t('bing')}`)
      .then((text) => JSON.parse(text).images || [], () => [])));
  const seen = new Set();
  photos = [].concat(...pages)
    .filter((img) => img.urlbase && !seen.has(img.urlbase) && seen.add(img.urlbase))
    .map((img) => ({
      url: 'https://www.bing.com' + img.urlbase + '_1920x1080.jpg',
      credit: img.copyright || '',
    }));
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
    $('saver-credit').textContent = photo.credit;
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

// Each installed app's own banner and icon, read once from the TV.
const art = {};

function artFor(pkg) {
  if (!(pkg in art)) {
    try { art[pkg] = native && native.appArt ? JSON.parse(native.appArt(pkg)) : {}; } catch (e) { art[pkg] = {}; }
  }
  return art[pkg];
}

function colorFor(pkg) {
  let h = 0;
  for (const c of pkg) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return TILE_COLORS[h % TILE_COLORS.length];
}

// The row as the viewer arranged it. Apps added from the installed list are stored as 'pkg:<package>'.
function rowIds() {
  return prefs.apps || APPS.map((a) => a.name);
}

function appFor(id) {
  if (id.indexOf('pkg:') === 0) {
    const pkg = id.slice(4);
    const found = installed && installed.find((a) => a.pkg === pkg);
    if (installed && !found) return null; // uninstalled since; skip it
    const known = APPS.find((a) => a.packages.indexOf(pkg) >= 0);
    return { id, name: found ? found.label : pkg, color: known ? known.color : colorFor(pkg), ink: known && known.ink, packages: [pkg] };
  }
  const app = APPS.find((a) => a.name === id);
  return app ? Object.assign({ id }, app) : null;
}

// Until the viewer arranges the row, the default apps that aren't installed stay out of it.
function rowApps() {
  const apps = rowIds().map(appFor).filter(Boolean);
  return prefs.apps || !installed ? apps : apps.filter((app) => packageFor(app));
}

function saveRow(apps) {
  prefs.apps = apps.map((a) => a.id);
  store.set('apps', prefs.apps);
}

function tileHtml(app, i) {
  const pkg = packageFor(app);
  const look = pkg ? artFor(pkg) : {};
  const name = escapeHtml(app.name);
  const open = `<button class="app${look.banner ? ' has-banner' : ''}" data-nav data-app="${i}" aria-label="${name}"`
    + ` style="--tile:${app.color};${app.ink ? `--tile-ink:${app.ink}` : ''}">`;
  if (look.banner) return open + `<img class="banner" src="${look.banner}" alt=""></button>`;
  return open + (look.icon ? `<img class="icon" src="${look.icon}" alt="">` : '')
    + (installed && !pkg ? `<span class="badge">${t('install')}</span>` : '') + name + '</button>';
}

function renderApps() {
  refreshInstalled();
  const row = $('app-row');
  row.classList.toggle('moving', moving !== null);
  row.innerHTML = rowApps().map((app, i) =>
    `<li${i === moving ? ' class="lifted"' : ''}><span class="arrow left">${svg('left')}</span>${tileHtml(app, i)}<span class="arrow right">${svg('right')}</span></li>`).join('')
    + `<li><button class="app-add" id="app-add" data-nav aria-label="${escapeHtml(t('addTitle'))}">${svg('plus')}</button></li>`;
}

function launchApp(app) {
  if (!native || !app) return;
  const pkg = packageFor(app);
  if (!pkg || !native.launch(pkg)) native.openStore(app.name);
}

$('app-row').addEventListener('click', (e) => {
  if (e.target.closest('#app-add')) { openAdder(); return; }
  const btn = e.target.closest('[data-app]');
  if (!btn) return;
  if (moving !== null) { endMove(); return; }
  launchApp(rowApps()[Number(btn.dataset.app)]);
});

// Moving a tile: the lifted tile swaps with its neighbour on each arrow press.
let moving = null;

function startMove(i) {
  moving = i;
  document.body.classList.add('moving-app');
  $('move-hint').innerHTML = t('moveHint');
  $('move-hint').hidden = false;
  renderApps();
  focus($('app-row').querySelector(`[data-app="${i}"]`));
}

function stepMove(step) {
  const apps = rowApps();
  const j = moving + step;
  if (j < 0 || j >= apps.length) return;
  [apps[moving], apps[j]] = [apps[j], apps[moving]];
  saveRow(apps);
  moving = j;
  renderApps();
  focus($('app-row').querySelector(`[data-app="${j}"]`));
}

function endMove() {
  const i = moving;
  moving = null;
  document.body.classList.remove('moving-app');
  $('move-hint').hidden = true;
  renderApps();
  focus($('app-row').querySelector(`[data-app="${i}"]`));
}

function removeApp(i) {
  const apps = rowApps();
  if (apps.length <= 1) return;
  apps.splice(i, 1);
  saveRow(apps);
  renderApps();
  focus($('app-row').querySelector(`[data-app="${Math.min(i, apps.length - 1)}"]`));
}

// ---------- Add an installed app ----------

function inRow(pkg) {
  return rowApps().some((app) => packageFor(app) === pkg);
}

function openAdder() {
  refreshInstalled();
  renderAdder();
  openView('add', $('add-grid').querySelector('[data-pkg]') || $('add-done'));
  loadAdderArt();
}

function renderAdder() {
  const list = (installed || []).slice().sort((a, b) => a.label.localeCompare(b.label));
  $('add-count').textContent = native ? fill(t('addCount'), list.length) : '';
  $('add-note').textContent = native ? '' : t('addOnlyTv');
  $('add-grid').innerHTML = list.map((a) => {
    const look = art[a.pkg] || {};
    const known = APPS.find((app) => app.packages.indexOf(a.pkg) >= 0);
    const color = known ? known.color : colorFor(a.pkg);
    const icon = look.icon ? `<img src="${look.icon}" alt="">` : escapeHtml(a.label.charAt(0));
    return `<button class="add-tile" data-nav data-pkg="${escapeHtml(a.pkg)}" style="--tile:${color}">`
      + `<span class="icon" aria-hidden="true">${icon}</span><span class="name">${escapeHtml(a.label)}</span>`
      + (inRow(a.pkg) ? `<svg class="tick" viewBox="0 0 24 24" role="img" aria-label="✓">${ICONS.check}</svg>` : '')
      + '</button>';
  }).join('');
}

// Icons take a moment each to read, so they arrive a few at a time after the grid shows.
function loadAdderArt() {
  const missing = (installed || []).filter((a) => !(a.pkg in art));
  const step = () => {
    if (view !== 'add' || !missing.length) return;
    artFor(missing.shift().pkg);
    if (!missing.length || missing.length % 4 === 0) {
      const focused = current && current.dataset.pkg;
      renderAdder();
      if (focused) focus($('add-grid').querySelector(`[data-pkg="${focused}"]`));
    }
    setTimeout(step, 0);
  };
  setTimeout(step, 50);
}

$('add-grid').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-pkg]');
  if (!btn) return;
  const pkg = btn.dataset.pkg;
  const apps = rowApps();
  if (inRow(pkg)) {
    saveRow(apps.filter((app) => packageFor(app) !== pkg));
  } else {
    apps.push(appFor('pkg:' + pkg));
    saveRow(apps);
  }
  renderApps();
  renderAdder();
  focus($('add-grid').querySelector(`[data-pkg="${pkg}"]`));
});
$('add-done').addEventListener('click', () => closeView());

// ---------- Notes and reminders ----------

// [{ id, text, at (ms or null), done, doneAt, alerted, from: 'tv' | 'phone', created }]
let notes = store.get('notes', []);

function saveNotes() {
  store.set('notes', notes);
  renderGlance();
  if (view === 'today') renderTodayNotes();
  if (view === 'notes') renderNotesView();
}

// Done notes stay visible, struck through, until the day after.
function pruneNotes() {
  const today = startOfDay(new Date()).getTime();
  const kept = notes.filter((n) => !n.done || n.doneAt >= today);
  if (kept.length !== notes.length) { notes = kept; saveNotes(); }
}

function pendingNotes() {
  return notes.filter((n) => !n.done).sort((a, b) => {
    if (a.at && b.at) return a.at - b.at;
    if (a.at || b.at) return a.at ? -1 : 1;
    return b.created - a.created;
  });
}

// "19:00" today, "Amanhã 8:00" or "Seg. 9:00" otherwise.
function noteTime(at) {
  const d = new Date(at);
  return d < addDays(startOfDay(new Date()), 1) ? formatTime(d) : shortDay(d) + ' ' + formatTime(d);
}

// Pulls a time out of the text, so "dentista amanhã 9h" becomes "dentista" at 9:00 tomorrow.
function parseNote(raw) {
  let text = ' ' + raw + ' ';
  const words = Object.keys(STRINGS).map((k) => STRINGS[k]);
  const any = (key) => words.map((w) => w[key]).join('|');
  let tomorrow = false;
  const dayRe = new RegExp(`\\s(${any('tomorrowWords')})(?=[\\s.,!])`, 'i');
  if (dayRe.test(text)) { tomorrow = true; text = text.replace(dayRe, ' '); }
  text = text.replace(new RegExp(`\\s(${any('todayWords')})(?=[\\s.,!])`, 'i'), ' ');

  let at = null;
  const timeRe = new RegExp(`\\s(?:(?:${any('atWords')})\\s+)?([01]?\\d|2[0-3])(?::([0-5]\\d)|h([0-5]\\d)?)(?=[\\s.,!])`, 'i');
  const m = text.match(timeRe);
  if (m) {
    text = text.replace(timeRe, ' ');
    const now = new Date();
    let d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +m[1], +(m[2] || m[3] || 0));
    if (tomorrow) d = addDays(d, 1);
    else if (d <= now) d = addDays(d, 1);
    d.setHours(+m[1], +(m[2] || m[3] || 0));
    at = d.getTime();
  } else if (tomorrow) {
    const d = addDays(startOfDay(new Date()), 1);
    d.setHours(9, 0);
    at = d.getTime();
  }
  text = text.replace(/\s+/g, ' ').replace(/^[\s,.-]+|[\s,.-]+$/g, '');
  return { text: text || raw.trim(), at };
}

function addNote(raw, at, from) {
  const parsed = parseNote(raw);
  const note = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    text: parsed.text, at: at !== undefined ? at : parsed.at,
    done: false, doneAt: 0, alerted: false, from, created: Date.now(),
  };
  notes.push(note);
  saveNotes();
  return note;
}

function setDone(id, done) {
  const n = notes.find((x) => x.id === id);
  if (!n) return;
  n.done = done;
  n.doneAt = done ? Date.now() : 0;
  saveNotes();
}

function toggleNote(id) {
  const n = notes.find((x) => x.id === id);
  if (!n) return;
  setDone(id, !n.done);
  focus(document.querySelector(`#${view === 'notes' ? 'notes-list' : 'today-notes'} [data-note="${id}"]`));
}

function deleteNote(id) {
  const scope = view === 'notes' ? $('notes-list') : $('today-notes');
  const rows = [...scope.querySelectorAll('[data-note]')];
  const i = rows.findIndex((r) => r.dataset.note === id);
  notes = notes.filter((n) => n.id !== id);
  saveNotes();
  const left = scope.querySelectorAll('[data-note]');
  focus(left[Math.min(i, left.length - 1)] || (view === 'notes' ? $('notes-new') : $('today-new-note')));
}

function noteRowHtml(n) {
  const meta = n.at && !n.done
    ? `<span class="meta timed">${svg('bell')}${escapeHtml(noteTime(n.at))}</span>`
    : n.from === 'phone' ? `<span class="meta">${svg('phone')}</span>` : '';
  return `<div class="note-row${n.done ? ' done' : ''}" data-nav tabindex="-1" data-note="${n.id}">`
    + `<span class="check">${n.done ? svg('check') : ''}</span>`
    + `<span class="text">${escapeHtml(n.text)}</span>${meta}</div>`;
}

function openNotes(focusId) {
  pruneNotes();
  renderNotesView();
  const row = focusId && $('notes-list').querySelector(`[data-note="${focusId}"]`);
  openView('notes', row || $('notes-list').querySelector('[data-note]') || $('notes-new'));
}

function renderNotesView() {
  const list = pendingNotes().concat(notes.filter((n) => n.done));
  $('notes-count').textContent = fill(t('notesPending'), pendingNotes().length);
  $('notes-list').innerHTML = list.map(noteRowHtml).join('')
    || `<p class="note">${escapeHtml(t('notesEmpty'))}</p>`;
  renderPhoneBits();
}

$('notes-list').addEventListener('click', (e) => {
  const row = e.target.closest('[data-note]');
  if (row) toggleNote(row.dataset.note);
});
$('notes-new').addEventListener('click', () => openNewNote());
$('notes-back').addEventListener('click', () => closeView());

// ---------- New note ----------

const WHENS = ['none', 'half', 'hour', 'tonight', 'morning'];
let noteWhen = 'none';

function whenAt(key) {
  const now = new Date();
  if (key === 'half') return now.getTime() + 30 * 60 * 1000;
  if (key === 'hour') return now.getTime() + 60 * 60 * 1000;
  if (key === 'tonight') {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0);
    return (d > now ? d : addDays(d, 1)).getTime();
  }
  if (key === 'morning') return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 8, 0).getTime();
  return undefined; // no choice: take a time typed in the text, if any
}

const pressed = (on) => `aria-pressed="${on}"`;

function renderWhens() {
  const label = { none: 'whenNone', half: 'whenHalf', hour: 'whenHour', tonight: 'whenTonight', morning: 'whenMorning' };
  $('note-when').innerHTML = WHENS.map((k) =>
    `<button type="button" data-nav data-when="${k}" ${pressed(k === noteWhen)}>${escapeHtml(t(label[k]))}</button>`).join('');
}

function openNewNote() {
  noteWhen = 'none';
  $('note-input').value = '';
  renderWhens();
  openView('note-new', $('note-input'));
}

$('note-when').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-when]');
  if (!btn) return;
  noteWhen = btn.dataset.when;
  renderWhens();
  focus($('note-when').querySelector(`[data-when="${noteWhen}"]`));
});

$('note-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const raw = $('note-input').value.trim();
  $('note-input').blur();
  if (!raw) { focus($('note-input')); return; }
  const note = addNote(raw, whenAt(noteWhen), 'tv');
  closeView();
  const row = document.querySelector(`#${view === 'notes' ? 'notes-list' : 'today-notes'} [data-note="${note.id}"]`);
  if (row) focus(row);
});
$('note-cancel').addEventListener('click', () => closeView());

// ---------- Reminder alert ----------

let alertNote = null;
let alertReturn = null;

function checkAlerts() {
  if (alertNote) return;
  const now = Date.now();
  const due = pendingNotes().find((n) => n.at && n.at <= now && !n.alerted);
  if (!due) return;
  noteActivity(); // wake the screensaver: this is worth seeing
  closeCtx();
  alertNote = due;
  alertReturn = current;
  $('alert-kicker').textContent = `${formatTime(new Date(due.at))} · ${t('reminder')}`;
  $('alert-title').textContent = due.text;
  $('alert').hidden = false;
  focus($('alert-done'));
}

function closeAlert() {
  if (!alertNote) return;
  alertNote = null;
  $('alert').hidden = true;
  focus(alertReturn && document.body.contains(alertReturn) ? alertReturn : document.querySelector('#app-row .app'));
  setTimeout(checkAlerts, 500); // another one may be due
}

$('alert-done').addEventListener('click', () => {
  const id = alertNote && alertNote.id;
  closeAlert();
  if (id) setDone(id, true);
});
$('alert-snooze').addEventListener('click', () => {
  if (alertNote) { alertNote.at = Date.now() + SNOOZE; saveNotes(); }
  closeAlert();
});

// A short banner for things that arrive from the phone.
let toastTimer = null;
function toast(label, text) {
  $('toast').innerHTML = `${svg('phone')}<span><b>${escapeHtml(label)}</b> · ${escapeHtml(text)}</span>`;
  $('toast').hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $('toast').hidden = true; }, 12000);
}

// ---------- The phone (ntfy.sh): notes and set-up ----------

function ntfyTopic() {
  let topic = store.get('ntfyTopic', '');
  if (!topic) {
    const chars = 'abcdefghijkmnpqrstuvwxyz23456789';
    const bytes = new Uint8Array(8);
    (window.crypto || window.msCrypto).getRandomValues(bytes);
    topic = 'claudetv-' + [...bytes].map((b) => chars[b % chars.length]).join('');
    store.set('ntfyTopic', topic);
  }
  return topic;
}

const phoneAddress = () => 'ntfy.sh/' + ntfyTopic();

function qrInto(el) {
  if (typeof qrcode !== 'function' || el.dataset.topic === ntfyTopic()) return;
  const qr = qrcode(0, 'M');
  qr.addData(NTFY + ntfyTopic());
  qr.make();
  el.innerHTML = qr.createSvgTag({ cellSize: 6, margin: 0, scalable: true });
  el.dataset.topic = ntfyTopic();
}

// Every place that shows the phone address and code, shown only while the feature is on.
function renderPhoneBits() {
  ['today-phone', 'notes-phone', 'setup-card'].forEach((id) => { $(id).hidden = !prefs.phoneNotes; });
  if (!prefs.phoneNotes) return;
  document.querySelectorAll('.phone-address').forEach((el) => { el.textContent = phoneAddress(); });
  ['today-qr', 'notes-qr', 'setup-qr'].forEach((id) => qrInto($(id)));
}

// "agenda: <address>" or "cidade: <name>" set things up; anything else becomes a note.
async function phoneCommand(text) {
  const cal = text.match(/^\s*(?:agenda|calendar|calendrier|calendario|ical)\s*:\s*(\S+)\s*$/i);
  if (cal) {
    prefs.calendarUrl = cal[1];
    store.set('calendarUrl', prefs.calendarUrl);
    await loadCalendar();
    toast(t('fromPhone'), calendarFailed ? t('agendaError') : t('agendaSetPhone'));
    return true;
  }
  const city = text.match(/^\s*(?:cidade|city|ville|ciudad)\s*:\s*(.+?)\s*$/i);
  if (city) {
    const found = (await searchCities(city[1]))[0];
    if (found) {
      setCity(found);
      toast(t('fromPhone'), `${t('citySetPhone')} ${found.name}`);
    } else {
      toast(t('fromPhone'), t('noResults'));
    }
    return true;
  }
  return false;
}

// ntfy.sh keeps messages for about 12 hours; ask for everything since the last one seen.
async function pollPhone() {
  if (!prefs.phoneNotes) return;
  const since = store.get('ntfySince', '12h');
  let text;
  try {
    text = await fetchText(`${NTFY}${ntfyTopic()}/json?poll=1&since=${encodeURIComponent(since)}`);
  } catch (e) {
    return; // offline; try again next time
  }
  let last = null;
  const messages = [];
  text.split('\n').forEach((line) => {
    if (!line.trim()) return;
    let msg;
    try { msg = JSON.parse(line); } catch (e) { return; }
    if (msg.event !== 'message' || !msg.message) return;
    last = msg.id;
    messages.push(msg.title ? `${msg.title}: ${msg.message}` : msg.message);
  });
  if (last) store.set('ntfySince', last);
  for (const body of messages) {
    if (await phoneCommand(body)) continue;
    const note = addNote(body, undefined, 'phone');
    if (!note.at) toast(t('fromPhone'), note.text);
  }
  checkAlerts();
}

// ---------- Weather city search (Settings and the phone) ----------

async function searchCities(q) {
  try {
    const data = JSON.parse(await fetchText('https://geocoding-api.open-meteo.com/v1/search'
      + `?name=${encodeURIComponent(q)}&count=4&language=${prefs.lang}&format=json`));
    return data.results || [];
  } catch (e) {
    return [];
  }
}

function setCity(c) {
  prefs.city = { name: c.name, lat: c.latitude, lon: c.longitude };
  store.set('city', prefs.city);
  loadWeather();
}

// ---------- Settings: one row per option; OK moves to the next value ----------

const nextOf = (list, value) => list[(list.indexOf(value) + 1) % list.length];

function settingRows() {
  const percent = new Intl.NumberFormat(t('locale'), { maximumFractionDigits: 1 });
  const onOff = (on) => (on ? t('on') : t('off'));
  const newsKeys = ['auto'].concat(Object.keys(NEWS), ['off']);
  const rows = [
    { group: 'groupGeneral' },
    { key: 'lang', label: 'language', value: STRINGS[prefs.lang].label,
      next() { prefs.lang = nextOf(Object.keys(STRINGS), prefs.lang); store.set('lang', prefs.lang); applyLanguage(); loadNews(); if (prefs.photos) loadPhotos(); } },
    { key: 'hour12', label: 'clockFormat', value: prefs.hour12 ? '12 h' : '24 h',
      next() { prefs.hour12 = !prefs.hour12; store.set('hour12', prefs.hour12); everyMinute(); } },
    { key: 'margin', label: 'margin', value: percent.format(prefs.margin) + '%',
      next() { prefs.margin = nextOf(MARGINS, prefs.margin); store.set('margin', prefs.margin); fitStage(); } },
    { group: 'groupInfo' },
    { key: 'city', label: 'city', value: prefs.city.name, edit: 'city' },
    { key: 'calendar', label: 'agenda', value: prefs.calendarUrl ? t('connected') : t('notConnected'), ok: !!prefs.calendarUrl && !calendarFailed, edit: 'calendar' },
    { key: 'news', label: 'newsSource', value: prefs.news === 'auto' ? t('newsAuto') : prefs.news === 'off' ? t('off') : NEWS[prefs.news].label,
      next() { prefs.news = nextOf(newsKeys, prefs.news); store.set('news', prefs.news); loadNews(); } },
    { group: 'groupScreen' },
    { key: 'photos', label: 'photos', value: onOff(prefs.photos),
      next() { prefs.photos = !prefs.photos; store.set('photos', prefs.photos); loadPhotos(); } },
    { key: 'night', label: 'nightMode', value: prefs.night ? t('nightRange') : t('off'),
      next() { prefs.night = !prefs.night; store.set('night', prefs.night); applyNight(); } },
    { key: 'phone', label: 'phoneNotes', value: onOff(prefs.phoneNotes),
      next() { prefs.phoneNotes = !prefs.phoneNotes; store.set('phoneNotes', prefs.phoneNotes); renderPhoneBits(); pollPhone(); } },
  ];
  if (native && native.getAutoStart) {
    const auto = native.getAutoStart();
    rows.push({ key: 'autostart', label: 'autostart', value: onOff(auto), next() { native.setAutoStart(!auto); } });
  }
  return rows;
}

let settingsRows = [];

function renderSettings() {
  settingsRows = settingRows();
  $('settings-list').innerHTML = settingsRows.map((r) => (r.group
    ? `<p class="group">${escapeHtml(t(r.group))}</p>`
    : `<button class="set-row" data-nav data-setting="${r.key}"><span class="label">${escapeHtml(t(r.label))}</span>`
      + `<span class="value${r.ok ? ' ok' : ''}">${escapeHtml(r.value)}</span>${svg('right')}</button>`)).join('');
  renderPhoneBits();
}

function openSettings() {
  renderSettings();
  showSettingsList();
  $('settings').hidden = false;
  document.body.classList.add('in-settings');
  focus($('settings-list').querySelector('[data-setting]'));
}

function closeSettings() {
  if (document.activeElement) document.activeElement.blur();
  $('settings').hidden = true;
  document.body.classList.remove('in-settings');
  focus(view ? viewFocus[view] || $(view + '-view').querySelector('[data-nav]') : $('settings-btn'));
}

let editing = null;

function showSettingsList() {
  editing = null;
  $('settings-edit').hidden = true;
  $('settings-list').hidden = false;
}

function openEditor(which) {
  editing = which;
  $('edit-city').hidden = which !== 'city';
  $('edit-calendar').hidden = which !== 'calendar';
  $('city-status').textContent = '';
  $('city-results').innerHTML = '';
  $('calendar-status').textContent = '';
  $('calendar-input').value = prefs.calendarUrl;
  $('settings-list').hidden = true;
  $('settings-edit').hidden = false;
  focus(which === 'city' ? $('city-input') : $('calendar-input'));
}

function leaveEditor() {
  const key = editing;
  showSettingsList();
  renderSettings();
  focus($('settings-list').querySelector(`[data-setting="${key}"]`));
}

$('settings-btn').addEventListener('click', openSettings);
$('edit-back').addEventListener('click', leaveEditor);

$('settings-list').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-setting]');
  if (!btn) return;
  const row = settingsRows.find((r) => r.key === btn.dataset.setting);
  if (!row) return;
  if (row.edit) { openEditor(row.edit); return; }
  row.next();
  renderSettings();
  focus($('settings-list').querySelector(`[data-setting="${row.key}"]`));
});

let cityMatches = [];

$('city-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const q = $('city-input').value.trim();
  if (!q) return;
  $('city-input').blur();
  $('city-status').textContent = t('searching');
  $('city-results').innerHTML = '';
  cityMatches = await searchCities(q);
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
  setCity(cityMatches[Number(btn.dataset.city)]);
  leaveEditor();
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

function applyLanguage() {
  document.documentElement.lang = t('locale');
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-label]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nLabel)); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  renderClock();
  renderWeather();
  renderGlance();
  renderApps();
  if (view === 'today') { renderTodayAgenda(); renderTodayNotes(); }
}

// ---------- Context menu (☰ on an app or a note) ----------

let ctxReturn = null;
let ctxActions = [];

function openCtx(title, items, anchor) {
  ctxReturn = current;
  ctxActions = items;
  $('ctx-title').textContent = title;
  $('ctx-items').innerHTML = items.map((it, i) =>
    `<button data-nav data-ctx="${i}"${it.danger ? ' class="danger"' : ''}>${escapeHtml(it.label)}</button>`).join('');
  $('ctx').hidden = false;
  // Place it above the anchor (or below, near the top of the screen), in stage pixels.
  const stage = $('stage').getBoundingClientRect();
  const r = anchor.getBoundingClientRect();
  const left = (r.left - stage.left) / stageScale;
  const top = (r.top - stage.top) / stageScale;
  const bottom = (r.bottom - stage.top) / stageScale;
  const h = $('ctx').offsetHeight;
  $('ctx').style.left = Math.max(56, Math.min(left, 1920 - 56 - 380)) + 'px';
  $('ctx').style.top = (top - h - 24 > 40 ? top - h - 24 : bottom + 24) + 'px';
  focus($('ctx-items').querySelector('button'));
}

function closeCtx(restore) {
  if ($('ctx').hidden) return;
  $('ctx').hidden = true;
  if (restore !== false && ctxReturn && document.body.contains(ctxReturn)) focus(ctxReturn);
}

$('ctx-items').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-ctx]');
  if (!btn) return;
  const action = ctxActions[Number(btn.dataset.ctx)];
  closeCtx();
  action.run();
});

// Options for whatever has focus, if it has any.
function contextFor(el) {
  if (!el) return false;
  if (el.dataset.app && moving === null) {
    const i = Number(el.dataset.app);
    const app = rowApps()[i];
    openCtx(app.name, [
      { label: t('open'), run: () => launchApp(app) },
      { label: t('move'), run: () => startMove(i) },
      { label: t('removeApp'), danger: true, run: () => removeApp(i) },
      { label: t('addApp'), run: openAdder },
    ], el);
    return true;
  }
  if (el.dataset.note) {
    const n = notes.find((x) => x.id === el.dataset.note);
    if (!n) return false;
    openCtx(n.text, [
      { label: n.done ? t('markUndone') : t('markDone'), run: () => toggleNote(n.id) },
      { label: t('deleteNote'), danger: true, run: () => deleteNote(n.id) },
    ], el);
    return true;
  }
  return false;
}

// ---------- Views (Today, week, notes, new note, add app) ----------

let current = null;
let view = null;       // the view on top, or null for the home screen
const viewStack = [];
const viewFocus = {};  // where focus was in each view, to come back to it
let homeFocus = null;

const VIEWS = ['today', 'week', 'notes', 'note-new', 'add'];

function openView(name, target) {
  if (view) viewFocus[view] = current; else homeFocus = current;
  if (view !== name) viewStack.push(name);
  VIEWS.forEach((v) => { $(v + '-view').hidden = v !== name; });
  view = name;
  document.body.classList.add('in-view');
  $(name + '-view').scrollTop = 0;
  focus(target);
}

function closeView() {
  if (!view) return;
  $(view + '-view').hidden = true;
  viewStack.pop();
  view = viewStack[viewStack.length - 1] || null;
  if (view) {
    $(view + '-view').hidden = false;
    if (view === 'today') { renderTodayAgenda(); renderTodayNotes(); }
    if (view === 'notes') renderNotesView();
    const back = viewFocus[view];
    focus(back && document.body.contains(back) ? back : $(view + '-view').querySelector('[data-nav]'));
  } else {
    document.body.classList.remove('in-view');
    focus(homeFocus && document.body.contains(homeFocus) ? homeFocus : document.querySelector('#app-row .app'));
  }
}

// ---------- Remote control navigation ----------

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
  if (el.closest('#app-row')) revealApp(el.parentElement);
  else if (activeScope() !== $('home')) el.scrollIntoView({ block: 'nearest' });
}

function activeScope() {
  if (!$('ctx').hidden) return $('ctx');
  if (alertNote) return $('alert');
  if (!$('settings').hidden) return $('settings');
  return view ? $(view + '-view') : $('home');
}

// Pick the nearest focusable in the pressed direction, favouring items in line with the current one.
function nearest(dir) {
  const items = [...activeScope().querySelectorAll('[data-nav]')].filter((el) => el.offsetParent !== null);
  if (!current || items.indexOf(current) < 0) return items[0] || null;

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
  return best;
}

let lastAppFocus = null;

function move(dir) {
  // The home screen has two zones: the settings button up top and the app row. Down opens Today.
  if (activeScope() === $('home') && current) {
    if (current.closest('#app-row')) {
      lastAppFocus = current;
      if (dir === 'down') { openToday(); return; }
      if (dir === 'up') { focus($('settings-btn')); return; }
    } else if (current === $('settings-btn') && dir === 'down') {
      focus(lastAppFocus && document.body.contains(lastAppFocus) ? lastAppFocus : document.querySelector('#app-row .app'));
      return;
    }
  }
  const best = nearest(dir);
  if (best) { focus(best); return; }
  // Up past the top of Today goes back home.
  if (view === 'today' && dir === 'up' && $('settings').hidden && $('ctx').hidden && !alertNote) closeView();
}

// Slide the app row so the focused tile is always fully on screen.
function revealApp(el) {
  const row = $('app-row');
  const viewport = row.parentElement.clientWidth - 224; // the safe area; neighbours may peek past it
  const left = el.offsetLeft;
  const right = left + el.offsetWidth;
  let shift = Number(row.dataset.shift || 0);
  if (right - shift > viewport) shift = right - viewport;
  if (left - shift < 0) shift = left;
  row.dataset.shift = shift;
  row.style.transform = `translateX(${-shift}px)`;
}

// ---------- Screensaver (after SAVER_AFTER without a key press) ----------

let saverOn = false;
let saverTimer = null;
let saverRelease = null;

function setKeepScreenOn(on) {
  if (native && native.setKeepScreenOn) native.setKeepScreenOn(on);
}

// Any key press: wake the screensaver if it is on, and restart the idle countdown.
function noteActivity() {
  const wasOn = saverOn;
  if (saverOn) {
    saverOn = false;
    document.body.classList.remove('saving');
    $('saver').hidden = true;
  }
  clearTimeout(saverTimer);
  clearTimeout(saverRelease);
  setKeepScreenOn(true);
  saverTimer = setTimeout(startSaver, SAVER_AFTER);
  return wasOn;
}

function startSaver() {
  if (alertNote) { saverTimer = setTimeout(startSaver, SAVER_AFTER); return; } // the alert stays in sight
  closeCtx(false);
  if (moving !== null) endMove();
  if (!$('settings').hidden) closeSettings();
  saverOn = true;
  renderSaver();
  $('saver').hidden = false;
  document.body.classList.add('saving');
  // Keep our screensaver for an hour, then let the TV's own screensaver and sleep take over.
  saverRelease = setTimeout(() => setKeepScreenOn(false), SAVER_RELEASE);
}

function renderSaver() {
  $('saver-clock').textContent = clockText(new Date());
  const bits = [];
  const cur = lastWeather && lastWeather.current;
  if (cur) bits.push(Math.round(cur.temperature_2m) + '°');
  const next = upcoming()[0];
  if (next) bits.push(`${next.allDay ? shortDay(next.start) : shortDay(next.start) + ' ' + formatTime(next.start)} ${next.title}`);
  $('saver-line').textContent = bits.join(' · ');

  // Drift a little every minute so nothing stays burnt into the same pixels.
  const dx = Math.round(Math.random() * 48 - 24);
  const dy = Math.round(Math.random() * 32 - 16);
  $('saver-info').style.transform = `translate(${dx}px, ${dy}px)`;
}

// ---------- Hooks the app calls ----------

// Back and Menu; Back returns whether it was used.
window.tvBack = () => {
  if (noteActivity()) return true;
  if (!$('ctx').hidden) { closeCtx(); return true; }
  if (moving !== null) { endMove(); return true; }
  if (alertNote) { alertNote.alerted = true; saveNotes(); closeAlert(); return true; }
  if (!$('settings').hidden) { if (editing) leaveEditor(); else closeSettings(); return true; }
  if (view) { closeView(); return true; }
  return false;
};
window.tvMenu = () => {
  if (noteActivity()) return;
  if (!$('ctx').hidden) { closeCtx(); return; }
  if (alertNote || moving !== null) return;
  if (!$('settings').hidden) { closeSettings(); return; }
  if (contextFor(current)) return;
  if (!view) openSettings();
};
window.tvResume = () => {
  noteActivity();
  fitStage();
  renderClock();
  applyNight();
  renderApps();
  pollPhone();
  checkAlerts();
  if (current && current.dataset.app) focus($('app-row').querySelector(`[data-app="${current.dataset.app}"]`));
};

const BACK_KEYS = ['Escape', 'GoBack', 'BrowserBack'];
const BACK_CODES = [461, 10009]; // LG webOS, Samsung Tizen

// Runs before the other key handlers: a key that wakes the screensaver does nothing else.
document.addEventListener('keydown', (e) => {
  if (noteActivity()) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
}, true);

// OK on a home tile opens the app when released; held down, it opens the tile's options.
let pressTimer = null;
let pressTile = null;

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' || !current || !current.dataset.app || moving !== null || !$('ctx').hidden) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  if (e.repeat || pressTimer) return;
  pressTile = current;
  pressTimer = setTimeout(() => {
    pressTimer = null;
    contextFor(pressTile);
    pressTile = null;
  }, LONG_PRESS);
});

document.addEventListener('keyup', (e) => {
  if (e.key !== 'Enter' || !pressTimer) return;
  clearTimeout(pressTimer);
  pressTimer = null;
  if (pressTile === current) launchApp(rowApps()[Number(pressTile.dataset.app)]);
  pressTile = null;
});

document.addEventListener('keydown', (e) => {
  const dir = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' }[e.key];
  const typing = document.activeElement && document.activeElement.tagName === 'INPUT';

  // While a tile is lifted, left/right move it and OK drops it.
  if (moving !== null) {
    if (dir === 'left' || dir === 'right') { e.preventDefault(); stepMove(dir === 'left' ? -1 : 1); return; }
    if (e.key === 'Enter') { e.preventDefault(); endMove(); return; }
    if (dir) { e.preventDefault(); return; }
  }

  // On the headline switcher, left/right change the source instead of moving.
  if (current && current.id === 'news-switch' && (dir === 'left' || dir === 'right')) {
    e.preventDefault();
    cycleNews(dir === 'left' ? -1 : 1);
    return;
  }

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

  // The remote's ☰ reaches the page as a native call; in a browser, the context-menu key stands in.
  if (e.key === 'ContextMenu' && !typing) {
    e.preventDefault();
    window.tvMenu();
    return;
  }

  if (e.key === 'Enter' && current && current.tagName === 'INPUT' && !typing) {
    e.preventDefault();
    current.focus();
    return;
  }

  // Rows that aren't buttons (notes, agenda events) still react to OK.
  if (e.key === 'Enter' && current && current.tagName === 'DIV') {
    e.preventDefault();
    current.click();
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
applyNight();
noteActivity();
pruneNotes();
renderGlance();
pollPhone();
checkAlerts();
setInterval(pollPhone, NOTES_POLL);
setInterval(() => { checkAlerts(); renderGlance(); }, 15 * 1000);
setInterval(pruneNotes, 60 * 60 * 1000);
setInterval(loadWeather, 15 * 60 * 1000);
setInterval(loadCalendar, 10 * 60 * 1000);
setInterval(loadNews, 30 * 60 * 1000);
setInterval(() => { if (prefs.photos) loadPhotos(); }, 6 * 60 * 60 * 1000);
focus(document.querySelector('#app-row .app'));
