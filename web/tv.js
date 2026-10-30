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

const PHOTO_EVERY = 2 * 60 * 1000;
const SAVER_AFTER = 5 * 60 * 1000;       // idle time before the screensaver
const SAVER_RELEASE = 60 * 60 * 1000;    // then let the TV's own sleep take over
const NIGHT_FROM = 22;                   // night mode hours
const NIGHT_UNTIL = 7;
const HOME_EVENTS = 3;                   // events on the home screen; the rest in the full agenda
const AGENDA_DAYS = 7;

const NTFY = 'https://ntfy.sh/';      // free relay for notes sent from the phone
const NOTES_POLL = 30 * 1000;
const SNOOZE = 10 * 60 * 1000;
const HOME_NOTES = 2;

// Colours for apps added from the installed list, which have no colour of their own.
const TILE_COLORS = ['#3B3F8F', '#7A2E5C', '#1F6F5C', '#8A4B12', '#2E5E8A', '#5B3A8F', '#7A1C1C', '#28524A'];

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
    margin: 'Margem da tela', marginHint: 'Se as bordas ficarem cortadas na TV, aumente a margem.',
    photos: 'Fotos de fundo', autostart: 'Abrir ao ligar a TV', on: 'Ligado', off: 'Desligado',
    feels: 'Sensação de', fullAgenda: 'Ver agenda completa', nextDays: 'Próximos 7 dias', until: 'até',
    back: 'Voltar', agendaHint: 'Setas para percorrer · Voltar para fechar',
    nightBadge: 'Modo noturno até 7:00', nightMode: 'Modo noturno',
    nightHint: 'Das 22:00 às 7:00 a tela escurece e as manchetes somem.',
    organize: 'Organizar apps', organizeHint: 'Escolha um app e use os botões para mudar de lugar.',
    moveLeft: 'Mover para a esquerda', moveRight: 'Mover para a direita', removeApp: 'Remover da fileira',
    addApp: 'Adicionar', addTitle: 'Adicionar app', addHint: 'Apps instalados nesta TV. OK adiciona ou tira da fileira.',
    inRow: 'Na fileira', done: 'Pronto', position: 'posição {n} de {total}', addOnlyTv: 'A lista de apps só aparece na TV.',
    organizeHow: 'Para chegar aqui: segure OK em qualquer app da tela inicial, ou escolha o bloco + no fim da fileira.',
    reminders: 'Lembretes', notesKicker: 'Notas e lembretes', newNote: 'Nova nota', newShort: 'Nova',
    noteWhat: 'O que lembrar?', notePlaceholder: 'Ex.: dentista amanhã 9h', remindWhen: 'Lembrar com aviso na tela',
    whenNone: 'Sem aviso', whenHalf: 'Em 30 min', whenHour: 'Em 1 hora', whenTonight: 'Hoje, 20:00', whenMorning: 'Amanhã, 8:00',
    cancel: 'Cancelar', noteDone: 'Feito', snooze: 'Adiar 10 min', reminder: 'Lembrete', fromPhone: 'Nota do celular',
    deleteNote: 'Apagar nota', notesEmpty: 'Nenhuma nota. Crie uma aqui ou mande do celular.',
    notesHint: 'OK marca como feita · Direita leva à lixeira · Voltar fecha. As feitas saem da lista no dia seguinte.',
    phoneTitle: 'Mande notas do celular', phoneNotes: 'Notas pelo celular',
    phoneHint: 'Aponte a câmera para o código, ou abra o endereço no celular, e mande uma mensagem. Um horário no texto vira aviso: “dentista amanhã 9h”.',
    phoneNotesHint: 'Usa o serviço gratuito ntfy.sh. Quem souber o endereço pode mandar notas para a TV. Endereço:',
    tomorrowWords: 'amanhã|amanha', todayWords: 'hoje', atWords: 'às|as|a',
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
    margin: 'Screen margin', marginHint: 'If the edges are cut off on the TV, increase the margin.',
    photos: 'Background photos', autostart: 'Open when the TV turns on', on: 'On', off: 'Off',
    feels: 'Feels like', fullAgenda: 'See full calendar', nextDays: 'Next 7 days', until: 'until',
    back: 'Back', agendaHint: 'Arrows to browse · Back to close',
    nightBadge: 'Night mode until 7:00', nightMode: 'Night mode',
    nightHint: 'From 10 PM to 7 AM the screen dims and headlines are hidden.',
    organize: 'Arrange apps', organizeHint: 'Pick an app and use the buttons to move it.',
    moveLeft: 'Move left', moveRight: 'Move right', removeApp: 'Remove from row',
    addApp: 'Add', addTitle: 'Add an app', addHint: 'Apps installed on this TV. OK adds or removes it from the row.',
    inRow: 'In row', done: 'Done', position: 'position {n} of {total}', addOnlyTv: 'The app list only shows on the TV.',
    organizeHow: 'To get here: hold OK on any app on the home screen, or pick the + tile at the end of the row.',
    reminders: 'Reminders', notesKicker: 'Notes and reminders', newNote: 'New note', newShort: 'New',
    noteWhat: 'What to remember?', notePlaceholder: 'E.g. dentist tomorrow 9:00', remindWhen: 'Remind me on screen',
    whenNone: 'No reminder', whenHalf: 'In 30 min', whenHour: 'In 1 hour', whenTonight: 'Tonight, 8 PM', whenMorning: 'Tomorrow, 8 AM',
    cancel: 'Cancel', noteDone: 'Done', snooze: 'Snooze 10 min', reminder: 'Reminder', fromPhone: 'Note from your phone',
    deleteNote: 'Delete note', notesEmpty: 'No notes. Add one here or send one from your phone.',
    notesHint: 'OK marks it done · Right goes to the bin · Back closes. Done notes leave the list the next day.',
    phoneTitle: 'Send notes from your phone', phoneNotes: 'Notes from the phone',
    phoneHint: 'Point the camera at the code, or open the address on your phone, and send a message. A time in the text becomes a reminder: “dentist tomorrow 9:00”.',
    phoneNotesHint: 'Uses the free ntfy.sh service. Anyone who knows the address can send notes to the TV. Address:',
    tomorrowWords: 'tomorrow', todayWords: 'today', atWords: 'at',
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
    margin: "Marge de l'écran", marginHint: 'Si les bords sont coupés sur la télé, augmentez la marge.',
    photos: 'Photos en arrière-plan', autostart: 'Ouvrir au démarrage de la télé', on: 'Activé', off: 'Désactivé',
    feels: 'Ressenti', fullAgenda: 'Voir tout l’agenda', nextDays: '7 prochains jours', until: 'jusqu’à',
    back: 'Retour', agendaHint: 'Flèches pour parcourir · Retour pour fermer',
    nightBadge: 'Mode nuit jusqu’à 7 h', nightMode: 'Mode nuit',
    nightHint: 'De 22 h à 7 h, l’écran s’assombrit et les manchettes disparaissent.',
    organize: 'Organiser les applis', organizeHint: 'Choisissez une appli et déplacez-la avec les boutons.',
    moveLeft: 'Déplacer à gauche', moveRight: 'Déplacer à droite', removeApp: 'Retirer de la rangée',
    addApp: 'Ajouter', addTitle: 'Ajouter une appli', addHint: 'Applis installées sur cette télé. OK l’ajoute ou la retire de la rangée.',
    inRow: 'Dans la rangée', done: 'Terminé', position: 'position {n} sur {total}', addOnlyTv: 'La liste des applis s’affiche seulement sur la télé.',
    organizeHow: 'Pour venir ici : maintenez OK sur une appli de l’accueil, ou choisissez la tuile + au bout de la rangée.',
    reminders: 'Rappels', notesKicker: 'Notes et rappels', newNote: 'Nouvelle note', newShort: 'Nouvelle',
    noteWhat: 'Quoi retenir ?', notePlaceholder: 'Ex. : dentiste demain 9h', remindWhen: 'Me le rappeler à l’écran',
    whenNone: 'Sans rappel', whenHalf: 'Dans 30 min', whenHour: 'Dans 1 heure', whenTonight: 'Ce soir, 20 h', whenMorning: 'Demain, 8 h',
    cancel: 'Annuler', noteDone: 'Fait', snooze: 'Reporter 10 min', reminder: 'Rappel', fromPhone: 'Note du téléphone',
    deleteNote: 'Supprimer la note', notesEmpty: 'Aucune note. Créez-en une ici ou envoyez-la du téléphone.',
    notesHint: 'OK la marque comme faite · Droite mène à la corbeille · Retour ferme. Les notes faites partent le lendemain.',
    phoneTitle: 'Envoyez des notes du téléphone', phoneNotes: 'Notes du téléphone',
    phoneHint: 'Visez le code avec l’appareil photo, ou ouvrez l’adresse sur le téléphone, et envoyez un message. Une heure dans le texte devient un rappel : « dentiste demain 9h ».',
    phoneNotesHint: 'Utilise le service gratuit ntfy.sh. Toute personne qui connaît l’adresse peut envoyer des notes à la télé. Adresse :',
    tomorrowWords: 'demain', todayWords: 'aujourd’hui|aujourd\'hui', atWords: 'à|a',
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
    margin: 'Margen de la pantalla', marginHint: 'Si los bordes se ven cortados en la tele, aumenta el margen.',
    photos: 'Fotos de fondo', autostart: 'Abrir al encender la tele', on: 'Activado', off: 'Desactivado',
    feels: 'Sensación de', fullAgenda: 'Ver agenda completa', nextDays: 'Próximos 7 días', until: 'hasta',
    back: 'Volver', agendaHint: 'Flechas para recorrer · Atrás para cerrar',
    nightBadge: 'Modo nocturno hasta las 7:00', nightMode: 'Modo nocturno',
    nightHint: 'De 22:00 a 7:00 la pantalla se oscurece y los titulares desaparecen.',
    organize: 'Ordenar apps', organizeHint: 'Elige una app y usa los botones para moverla.',
    moveLeft: 'Mover a la izquierda', moveRight: 'Mover a la derecha', removeApp: 'Quitar de la fila',
    addApp: 'Añadir', addTitle: 'Añadir app', addHint: 'Apps instaladas en esta tele. OK la añade o la quita de la fila.',
    inRow: 'En la fila', done: 'Listo', position: 'posición {n} de {total}', addOnlyTv: 'La lista de apps solo aparece en la tele.',
    organizeHow: 'Para llegar aquí: mantén OK en cualquier app de la pantalla de inicio, o elige el bloque + al final de la fila.',
    reminders: 'Recordatorios', notesKicker: 'Notas y recordatorios', newNote: 'Nueva nota', newShort: 'Nueva',
    noteWhat: '¿Qué recordar?', notePlaceholder: 'Ej.: dentista mañana 9h', remindWhen: 'Avisarme en pantalla',
    whenNone: 'Sin aviso', whenHalf: 'En 30 min', whenHour: 'En 1 hora', whenTonight: 'Hoy, 20:00', whenMorning: 'Mañana, 8:00',
    cancel: 'Cancelar', noteDone: 'Hecho', snooze: 'Posponer 10 min', reminder: 'Recordatorio', fromPhone: 'Nota del móvil',
    deleteNote: 'Borrar nota', notesEmpty: 'No hay notas. Crea una aquí o mándala desde el móvil.',
    notesHint: 'OK la marca como hecha · Derecha lleva a la papelera · Atrás cierra. Las hechas salen de la lista al día siguiente.',
    phoneTitle: 'Manda notas desde el móvil', phoneNotes: 'Notas desde el móvil',
    phoneHint: 'Apunta la cámara al código, o abre la dirección en el móvil, y manda un mensaje. Una hora en el texto se vuelve aviso: «dentista mañana 9h».',
    phoneNotesHint: 'Usa el servicio gratuito ntfy.sh. Quien conozca la dirección puede mandar notas a la tele. Dirección:',
    tomorrowWords: 'mañana|manana', todayWords: 'hoy', atWords: 'a las|a',
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
  margin: store.get('margin', 0),
  night: store.get('night', true),
  apps: store.get('apps', null), // row order as app names or 'pkg:<package>'; null = APPS
  phoneNotes: store.get('phoneNotes', true),
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

const MARGINS = [0, 2.5, 5, 7.5]; // percent of the screen left empty on each side

// The app also calls this when the WebView changes size, since a TV may report its real size late.
function fitStage() {
  const w = document.documentElement.clientWidth || window.innerWidth;
  const h = document.documentElement.clientHeight || window.innerHeight;
  if (!w || !h) return;
  const scale = Math.min(w / 1920, h / 1080) * (1 - prefs.margin / 50);
  $('stage').style.transform = `translate(-50%, -50%) scale(${scale})`;
}
window.tvFit = fitStage;
window.addEventListener('resize', fitStage);
window.addEventListener('load', fitStage);

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
  applyNight();
  if (saverOn) renderSaver();
}

// ---------- Night mode (dims the screen and hides the headlines) ----------

function applyNight() {
  const h = new Date().getHours();
  const on = prefs.night && (h >= NIGHT_FROM || h < NIGHT_UNTIL);
  document.body.classList.toggle('night', on);
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
    + '&current=temperature_2m,apparent_temperature,weather_code,is_day'
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
    $('weather-feels').textContent = '';
    $('forecast').innerHTML = '';
    document.body.classList.remove('overcast');
    return;
  }

  const cur = lastWeather.current;
  const [wx, icon] = describe(cur.weather_code, cur.is_day === 1);
  $('weather-icon').innerHTML = svg(icon);
  $('weather-temp').textContent = Math.round(cur.temperature_2m) + '°';
  $('weather-desc').textContent = t('wx')[wx];
  $('weather-feels').innerHTML = typeof cur.apparent_temperature === 'number'
    ? `${t('feels')} <b>${Math.round(cur.apparent_temperature)}°</b>` : '';
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

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Events from now through the next AGENDA_DAYS days.
function upcoming() {
  const now = new Date();
  return Calendar.between(calendarEvents, now, addDays(startOfDay(now), AGENDA_DAYS));
}

// "Hoje", "Amanhã" or a short weekday ("Dom.").
function shortDay(date) {
  const today = startOfDay(new Date());
  if (date < addDays(today, 1)) return t('today');
  if (date < addDays(today, 2)) return t('tomorrow');
  return capitalize(date.toLocaleDateString(t('locale'), { weekday: 'short' }));
}

function eventWhen(ev) {
  const now = new Date();
  if (!ev.allDay && ev.start <= now && ev.end > now) return t('now');
  return shortDay(ev.start) + ', ' + (ev.allDay ? t('allDay').toLowerCase() : formatTime(ev.start));
}

function renderAgenda() {
  const list = $('agenda-list');
  const note = $('agenda-note');
  const more = $('agenda-more');
  list.innerHTML = '';
  note.textContent = '';
  more.hidden = true;

  if (!prefs.calendarUrl) { note.textContent = t('agendaConnect'); return; }
  if (calendarFailed) { note.textContent = t('agendaError'); return; }
  if (!calendarEvents) return;

  const now = new Date();
  const all = upcoming();
  const items = all.slice(0, HOME_EVENTS);
  if (!items.length) { note.textContent = t('agendaEmpty'); return; }

  list.innerHTML = items.map((ev) => {
    const happening = !ev.allDay && ev.start <= now && ev.end > now;
    return `<li${happening ? ' class="is-now"' : ''}><span class="when">${escapeHtml(eventWhen(ev))}</span>`
      + `<span class="what">${escapeHtml(ev.title)}</span></li>`;
  }).join('');

  const extra = all.length - items.length;
  more.innerHTML = escapeHtml(t('fullAgenda')) + (extra > 0 ? ` <span>+${extra}</span>` : '');
  more.hidden = false;
  if (view === 'agenda') renderAgendaView();
}

// The full agenda: the next days, grouped by day.
function renderAgendaView() {
  const box = $('agenda-days');
  const all = calendarEvents ? upcoming() : [];
  const today = startOfDay(new Date());
  const groups = [];
  all.forEach((ev) => {
    const day = ev.start < today ? today : startOfDay(ev.start);
    let g = groups[groups.length - 1];
    if (!g || g.day.getTime() !== day.getTime()) groups.push(g = { day, events: [] });
    g.events.push(ev);
  });

  box.innerHTML = groups.map((g) => {
    const date = g.day.toLocaleDateString(t('locale'), { weekday: 'long', day: 'numeric', month: 'long' });
    const offset = Math.round((g.day - today) / 86400000);
    const title = offset === 0 ? `${t('today')} · ${date}` : offset === 1 ? `${t('tomorrow')} · ${date}` : capitalize(date);
    return `<section class="day"><h2>${escapeHtml(title)}</h2>` + g.events.map((ev) => {
      const time = ev.allDay ? t('allDay') : formatTime(ev.start);
      const details = [];
      if (!ev.allDay && ev.end - ev.start > 0) details.push(`${t('until')} ${formatTime(ev.end)}`);
      if (ev.location) details.push(ev.location);
      return `<div class="ev" data-nav tabindex="-1"><span class="when">${escapeHtml(time)}</span><div>`
        + `<p class="what">${escapeHtml(ev.title)}</p>`
        + (details.length ? `<p class="details">${escapeHtml(details.join(' · '))}</p>` : '')
        + '</div></div>';
    }).join('') + '</section>';
  }).join('') || `<p class="note">${escapeHtml(t('agendaEmpty'))}</p>`;
}

$('agenda-more').addEventListener('click', () => {
  renderAgendaView();
  openView('agenda', $('agenda-days').querySelector('.ev') || $('agenda-back'));
});
$('agenda-back').addEventListener('click', () => closeView());

// ---------- Headlines (RSS) ----------

function newsKey() {
  return NEWS[prefs.news] ? prefs.news : NEWS_FOR_LANG[prefs.lang];
}

function newsSource() {
  if (prefs.news === 'off') return null;
  return NEWS[newsKey()];
}

// Left/right on the switcher next to "Headlines" changes the source and remembers it.
function cycleNews(step) {
  const keys = Object.keys(NEWS);
  const i = keys.indexOf(newsKey());
  prefs.news = keys[(i + step + keys.length) % keys.length];
  store.set('news', prefs.news);
  loadNews();
}

async function loadNews() {
  const source = newsSource();
  const section = $('news-list').closest('section');
  section.hidden = !source;
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
    try { art[pkg] = native.appArt ? JSON.parse(native.appArt(pkg)) : {}; } catch (e) { art[pkg] = {}; }
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
    return { id, name: found ? found.label : pkg, color: colorFor(pkg), packages: [pkg] };
  }
  const app = APPS.find((a) => a.name === id);
  return app ? Object.assign({ id }, app) : null;
}

function rowApps() {
  return rowIds().map(appFor).filter(Boolean);
}

function saveRow(apps) {
  prefs.apps = apps.map((a) => a.id);
  store.set('apps', prefs.apps);
  renderApps();
}

function tileHtml(app, attrs) {
  const pkg = packageFor(app);
  const look = pkg ? artFor(pkg) : {};
  const name = escapeHtml(app.name);
  const open = `<button class="app${look.banner ? ' has-banner' : ''}" data-nav ${attrs} aria-label="${name}"`
    + ` style="--tile:${app.color};${app.ink ? `--tile-ink:${app.ink}` : ''}">`;
  if (look.banner) return open + `<img class="banner" src="${look.banner}" alt=""></button>`;
  const mark = look.icon
    ? `<img class="icon" src="${look.icon}" alt="">`
    : `<span class="mark" aria-hidden="true">${escapeHtml(app.name[0])}</span>`;
  return open + (installed && !pkg ? `<span class="badge">${t('install')}</span>` : '') + mark + name + '</button>';
}

const PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';

function renderApps() {
  refreshInstalled();
  $('app-row').innerHTML = rowApps().map((app, i) => `<li>${tileHtml(app, `data-app="${i}"`)}</li>`).join('')
    + `<li><button class="app-add" id="app-add" data-nav aria-label="${escapeHtml(t('organize'))}">${PLUS}</button></li>`;
}

function launchApp(app) {
  if (!native) return;
  const pkg = packageFor(app);
  if (!pkg || !native.launch(pkg)) native.openStore(app.name);
}

$('app-row').addEventListener('click', (e) => {
  if (e.target.closest('#app-add')) { openOrganizer(0); return; }
  const btn = e.target.closest('[data-app]');
  if (btn) launchApp(rowApps()[Number(btn.dataset.app)]);
});

// ---------- Arrange apps ----------

let editSel = 0;

function openOrganizer(index) {
  editSel = index;
  renderEditor();
  openView('apps', $('edit-row').querySelector(`[data-edit="${editSel}"]`));
}

function renderEditor() {
  const apps = rowApps();
  editSel = Math.max(0, Math.min(editSel, apps.length - 1));
  $('edit-row').innerHTML = apps.map((app, i) =>
    `<li${i === editSel ? ' class="is-picked"' : ''}>${tileHtml(app, `data-edit="${i}"`)}</li>`).join('')
    + `<li><button class="app-add wide" id="add-app" data-nav>${PLUS}<span>${escapeHtml(t('addApp'))}</span></button></li>`;
  renderEditorStatus();
}

function renderEditorStatus() {
  const apps = rowApps();
  if (!apps.length) { $('edit-status').textContent = ''; return; }
  $('edit-status').innerHTML = `<b>${escapeHtml(apps[editSel].name)}</b> · `
    + escapeHtml(t('position').replace('{n}', editSel + 1).replace('{total}', apps.length));
  $('edit-row').querySelectorAll('li').forEach((li, i) => li.classList.toggle('is-picked', i === editSel));
}

function moveApp(step) {
  const apps = rowApps();
  const j = editSel + step;
  if (j < 0 || j >= apps.length) return;
  [apps[editSel], apps[j]] = [apps[j], apps[editSel]];
  editSel = j;
  saveRow(apps);
  renderEditor();
}

$('move-left').addEventListener('click', () => moveApp(-1));
$('move-right').addEventListener('click', () => moveApp(1));
$('remove-app').addEventListener('click', () => {
  const apps = rowApps();
  if (apps.length <= 1) return;
  apps.splice(editSel, 1);
  saveRow(apps);
  renderEditor();
});
$('apps-done').addEventListener('click', () => closeView());
$('edit-row').addEventListener('click', (e) => {
  if (e.target.closest('#add-app')) { openAdder(); return; }
  const btn = e.target.closest('[data-edit]');
  if (btn) { editSel = Number(btn.dataset.edit); renderEditorStatus(); }
});

// ---------- Add an installed app ----------

function inRow(pkg) {
  return rowApps().some((app) => packageFor(app) === pkg);
}

function openAdder() {
  refreshInstalled();
  renderAdder();
  openView('add', $('add-grid').querySelector('[data-pkg]') || $('add-back'));
  loadAdderArt();
}

function renderAdder() {
  const list = (installed || []).slice().sort((a, b) => a.label.localeCompare(b.label));
  $('add-note').textContent = native ? '' : t('addOnlyTv');
  $('add-grid').innerHTML = list.map((a) => {
    const look = art[a.pkg] || {};
    const name = escapeHtml(a.label);
    const badge = inRow(a.pkg) ? `<span class="badge on">✓ ${escapeHtml(t('inRow'))}</span>` : '';
    if (look.banner) {
      return `<button class="app has-banner" data-nav data-pkg="${escapeHtml(a.pkg)}" aria-label="${name}">`
        + `<img class="banner" src="${look.banner}" alt="">${badge}</button>`;
    }
    const known = APPS.find((app) => app.packages.indexOf(a.pkg) >= 0);
    const tile = known ? `--tile:${known.color};${known.ink ? `--tile-ink:${known.ink}` : ''}` : `--tile:${colorFor(a.pkg)}`;
    return `<button class="app" data-nav data-pkg="${escapeHtml(a.pkg)}" style="${tile}">`
      + badge + name + '</button>';
  }).join('');
}

// Banners take a moment each to read, so they arrive one by one after the grid shows.
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
  renderAdder();
  focus($('add-grid').querySelector(`[data-pkg="${pkg}"]`));
});
$('add-back').addEventListener('click', () => { renderEditor(); openView('apps', $('add-app')); });

// ---------- Notes and reminders ----------

// [{ id, text, at (ms or null), done, doneAt, alerted, from: 'tv' | 'phone', created }]
let notes = store.get('notes', []);

function saveNotes() {
  store.set('notes', notes);
  renderNoteChips();
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

// "19:00" today, "Amanhã, 8:00" or "Seg., 9:00" otherwise.
function noteTime(at) {
  const d = new Date(at);
  return d < addDays(startOfDay(new Date()), 1) ? formatTime(d) : shortDay(d) + ', ' + formatTime(d);
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

const BELL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4l2-2Z"/><path d="M10 21h4"/></svg>';
const PHONE = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>';
const CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>';
const TRASH = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>';

// The home screen shows the next few as chips under the agenda.
function renderNoteChips() {
  const list = pendingNotes();
  const shown = list.slice(0, HOME_NOTES);
  $('note-chips').innerHTML = shown.map((n) =>
    `<button class="chip${n.at ? ' timed' : ''}" data-nav data-chip="${n.id}">`
    + (n.at ? BELL : '') + `<span class="chip-text">${escapeHtml(n.text)}</span>`
    + (n.at ? `<b>${escapeHtml(noteTime(n.at))}</b>` : '') + '</button>').join('')
    + (list.length > shown.length ? `<button class="chip" data-nav data-chip="more">+${list.length - shown.length}</button>` : '')
    + `<button class="chip add" data-nav data-chip="new">${PLUS}<span>${escapeHtml(t('newShort'))}</span></button>`;
}

function openNotes(focusId) {
  pruneNotes();
  renderNotesView();
  const row = focusId && $('notes-list').querySelector(`[data-note="${focusId}"]`);
  openView('notes', row || $('notes-list').querySelector('[data-note]') || $('notes-new'));
}

function renderNotesView() {
  const list = pendingNotes().concat(notes.filter((n) => n.done));
  $('notes-list').innerHTML = list.map((n) =>
    `<div class="note-row${n.done ? ' done' : ''}" data-nav tabindex="-1" data-note="${n.id}">`
    + `<span class="check">${n.done ? CHECK : ''}</span>`
    + `<span class="note-text">${escapeHtml(n.text)}</span>`
    + (n.from === 'phone' ? `<span class="from">${PHONE}</span>` : '')
    + (n.at && !n.done ? `<span class="when">${BELL}${escapeHtml(noteTime(n.at))}</span>` : '')
    + `<button class="note-del" data-nav data-del="${n.id}" aria-label="${escapeHtml(t('deleteNote'))}">${TRASH}</button>`
    + '</div>').join('') || `<p class="note">${escapeHtml(t('notesEmpty'))}</p>`;
  renderPhonePanel();
}

function phoneAddress() {
  return 'ntfy.sh/' + ntfyTopic();
}

function renderPhonePanel() {
  $('phone-panel').hidden = !prefs.phoneNotes;
  if (!prefs.phoneNotes) return;
  $('phone-address').textContent = phoneAddress();
  if (typeof qrcode === 'function' && !$('phone-qr').dataset.topic) {
    const qr = qrcode(0, 'M');
    qr.addData(NTFY + ntfyTopic());
    qr.make();
    $('phone-qr').innerHTML = qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true });
    $('phone-qr').dataset.topic = ntfyTopic();
  }
}

$('note-chips').addEventListener('click', (e) => {
  const chip = e.target.closest('[data-chip]');
  if (!chip) return;
  if (chip.dataset.chip === 'new') openNewNote('home');
  else openNotes(chip.dataset.chip === 'more' ? null : chip.dataset.chip);
});

$('notes-list').addEventListener('click', (e) => {
  const del = e.target.closest('[data-del]');
  if (del) {
    const rows = [...$('notes-list').querySelectorAll('[data-note]')];
    const i = rows.findIndex((r) => r.dataset.note === del.dataset.del);
    notes = notes.filter((n) => n.id !== del.dataset.del);
    saveNotes();
    const left = $('notes-list').querySelectorAll('[data-note]');
    focus(left[Math.min(i, left.length - 1)] || $('notes-new'));
    return;
  }
  const row = e.target.closest('[data-note]');
  if (!row) return;
  const n = notes.find((x) => x.id === row.dataset.note);
  if (n) setDone(n.id, !n.done);
  focus($('notes-list').querySelector(`[data-note="${row.dataset.note}"]`));
});

$('notes-new').addEventListener('click', () => openNewNote('notes'));
$('notes-back').addEventListener('click', () => closeView());

// ---------- New note ----------

const WHENS = ['none', 'half', 'hour', 'tonight', 'morning'];
let noteWhen = 'none';
let noteFrom = 'home';

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

function renderWhens() {
  const label = { none: 'whenNone', half: 'whenHalf', hour: 'whenHour', tonight: 'whenTonight', morning: 'whenMorning' };
  $('note-when').innerHTML = WHENS.map((k) =>
    `<button type="button" data-nav data-when="${k}" ${pressed(k === noteWhen)}>${escapeHtml(t(label[k]))}</button>`).join('');
}

function openNewNote(from) {
  noteFrom = from;
  noteWhen = 'none';
  $('note-input').value = '';
  renderWhens();
  openView('note-new', $('note-input'));
}

function leaveNewNote(saved) {
  if (noteFrom === 'notes' || saved) openNotes(saved && saved.id);
  else closeView();
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
  leaveNewNote(addNote(raw, whenAt(noteWhen), 'tv'));
});
$('note-cancel').addEventListener('click', () => leaveNewNote(null));

// ---------- Reminder alert ----------

let alertNote = null;
let alertReturn = null;

function checkAlerts() {
  if (alertNote) return;
  const now = Date.now();
  const due = pendingNotes().find((n) => n.at && n.at <= now && !n.alerted);
  if (!due) return;
  noteActivity(); // wake the screensaver: this is worth seeing
  alertNote = due;
  alertReturn = current;
  $('alert-kicker').textContent = `${t('reminder')} · ${formatTime(new Date(due.at))}`;
  $('alert-title').textContent = due.text;
  $('alert-snooze').hidden = false;
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

// A short banner for notes that arrive from the phone without a time.
let toastTimer = null;
function toast(text) {
  $('toast').innerHTML = `${PHONE}<span><b>${escapeHtml(t('fromPhone'))}</b> · ${escapeHtml(text)}</span>`;
  $('toast').hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $('toast').hidden = true; }, 12000);
}

// ---------- Notes from the phone (ntfy.sh) ----------

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
  text.split('\n').forEach((line) => {
    if (!line.trim()) return;
    let msg;
    try { msg = JSON.parse(line); } catch (e) { return; }
    if (msg.event !== 'message' || !msg.message) return;
    last = msg.id;
    const body = msg.title ? `${msg.title}: ${msg.message}` : msg.message;
    const note = addNote(body, undefined, 'phone');
    if (!note.at) toast(note.text);
  });
  if (last) store.set('ntfySince', last);
  checkAlerts();
}

// ---------- Settings ----------

const pressed = (on) => `aria-pressed="${on}"`;

function renderChoices() {
  $('lang-choices').innerHTML = Object.keys(STRINGS).map((code) =>
    `<button data-nav data-lang="${code}" ${pressed(code === prefs.lang)}>${STRINGS[code].label}</button>`
  ).join('');
  $('hour-choices').innerHTML = [false, true].map((h12) =>
    `<button data-nav data-hour12="${h12}" ${pressed(h12 === prefs.hour12)}>${h12 ? '12 h' : '24 h'}</button>`
  ).join('');
  const percent = new Intl.NumberFormat(t('locale'), { maximumFractionDigits: 1 });
  $('margin-choices').innerHTML = MARGINS.map((m) =>
    `<button data-nav data-margin="${m}" ${pressed(m === prefs.margin)}>${percent.format(m)}%</button>`
  ).join('');
  const newsKeys = ['auto'].concat(Object.keys(NEWS), ['off']);
  $('news-choices').innerHTML = newsKeys.map((key) => {
    const label = key === 'auto' ? t('newsAuto') : key === 'off' ? t('off') : NEWS[key].label;
    return `<button data-nav data-news="${key}" ${pressed(key === prefs.news)}>${label}</button>`;
  }).join('');
  $('phone-choices').innerHTML = [true, false].map((on) =>
    `<button data-nav data-phone="${on}" ${pressed(on === prefs.phoneNotes)}>${on ? t('on') : t('off')}</button>`
  ).join('');
  $('settings-phone-address').textContent = phoneAddress();
  $('night-choices').innerHTML = [true, false].map((on) =>
    `<button data-nav data-night="${on}" ${pressed(on === prefs.night)}>${on ? t('on') : t('off')}</button>`
  ).join('');
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
  renderNoteChips();
}

function openSettings() {
  renderChoices();
  $('city-status').textContent = '';
  $('city-results').innerHTML = '';
  $('calendar-status').textContent = '';
  $('calendar-input').value = prefs.calendarUrl;
  $('settings').hidden = false;
  document.body.classList.add('in-settings');
  $('settings').scrollTop = 0;
  focus(document.querySelector('#lang-choices [aria-pressed="true"]'));
}

function closeSettings() {
  if (document.activeElement) document.activeElement.blur();
  $('settings').hidden = true;
  document.body.classList.remove('in-settings');
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
  } else if (d.phone) {
    prefs.phoneNotes = d.phone === 'true';
    store.set('phoneNotes', prefs.phoneNotes);
    pollPhone();
    selector = `[data-phone="${d.phone}"]`;
  } else if (d.night) {
    prefs.night = d.night === 'true';
    store.set('night', prefs.night);
    applyNight();
    selector = `[data-night="${d.night}"]`;
  } else if (d.margin) {
    prefs.margin = Number(d.margin);
    store.set('margin', prefs.margin);
    fitStage();
    selector = `[data-margin="${d.margin}"]`;
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
let view = null; // full-screen view over the home screen: 'agenda', 'apps' or 'add'
let homeFocus = null;

function openView(name, target) {
  if (!view) homeFocus = current;
  ['agenda', 'apps', 'add', 'notes', 'note-new'].forEach((v) => { $(v + '-view').hidden = v !== name; });
  view = name;
  document.body.classList.add('in-view');
  $(name + '-view').scrollTop = 0;
  focus(target);
}

function closeView() {
  if (!view) return;
  $(view + '-view').hidden = true;
  view = null;
  document.body.classList.remove('in-view');
  const back = homeFocus && document.body.contains(homeFocus) ? homeFocus : document.querySelector('#app-row .app');
  focus(back);
}

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
  if (el.dataset.edit) { editSel = Number(el.dataset.edit); renderEditorStatus(); }
  if (activeScope() !== $('home')) el.scrollIntoView({ block: 'nearest' });
}

function activeScope() {
  if (alertNote) return $('alert');
  if (!$('settings').hidden) return $('settings');
  return view ? $(view + '-view') : $('home');
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
  if (!$('settings').hidden) closeSettings();
  saverOn = true;
  renderSaver();
  $('saver').hidden = false;
  document.body.classList.add('saving');
  // Keep our screensaver for an hour, then let the TV's own screensaver and sleep take over.
  saverRelease = setTimeout(() => setKeepScreenOn(false), SAVER_RELEASE);
}

function renderSaver() {
  const now = new Date();
  const hh = prefs.hour12 ? (now.getHours() % 12 || 12) : String(now.getHours()).padStart(2, '0');
  $('saver-clock').textContent = hh + ':' + String(now.getMinutes()).padStart(2, '0');
  $('saver-date').textContent = capitalize(now.toLocaleDateString(t('locale'), { weekday: 'long', day: 'numeric', month: 'long' }));

  const cur = lastWeather && lastWeather.current;
  if (cur) {
    const [, icon] = describe(cur.weather_code, cur.is_day === 1);
    $('saver-weather').innerHTML = svg(icon) + `<span class="temp">${Math.round(cur.temperature_2m)}°</span>`
      + (typeof cur.apparent_temperature === 'number'
        ? `<span class="feels">${t('feels')} ${Math.round(cur.apparent_temperature)}°</span>` : '');
  } else {
    $('saver-weather').innerHTML = '';
  }

  const next = calendarEvents ? upcoming()[0] : null;
  $('saver-next').innerHTML = next ? `${escapeHtml(eventWhen(next))} · <b>${escapeHtml(next.title)}</b>` : '';

  // Drift a little every minute so nothing stays burnt into the same pixels.
  const dx = Math.round(Math.random() * 48 - 24);
  const dy = Math.round(Math.random() * 32 - 16);
  $('saver-info').style.transform = `translate(${dx}px, ${dy}px)`;
}

// ---------- Hooks the app calls ----------

// Back and Menu; Back returns whether it was used.
window.tvBack = () => {
  if (noteActivity()) return true;
  if (alertNote) { alertNote.alerted = true; saveNotes(); closeAlert(); return true; }
  if (!$('settings').hidden) { closeSettings(); return true; }
  if (view === 'note-new') { leaveNewNote(null); return true; }
  if (view === 'add') { renderEditor(); openView('apps', $('add-app')); return true; }
  if (view) { closeView(); return true; }
  return false;
};
window.tvMenu = () => {
  if (noteActivity()) return;
  if (view || alertNote) return;
  if ($('settings').hidden) openSettings(); else closeSettings();
};
window.tvResume = () => {
  noteActivity();
  fitStage();
  renderClock();
  applyNight();
  renderApps();
  if (view === 'apps') renderEditor();
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

// OK on a home tile opens the app when released; held down, it opens "Arrange apps" instead.
let pressTimer = null;
let pressTile = null;

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' || !current || !current.dataset.app) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  if (e.repeat || pressTimer) return;
  pressTile = current;
  pressTimer = setTimeout(() => {
    pressTimer = null;
    pressTile = null;
    openOrganizer(Number(current.dataset.app));
  }, 700);
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

$('news-switch').addEventListener('click', () => cycleNews(1));

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
renderNoteChips();
pollPhone();
checkAlerts();
setInterval(pollPhone, NOTES_POLL);
setInterval(() => { checkAlerts(); renderNoteChips(); }, 15 * 1000);
setInterval(pruneNotes, 60 * 60 * 1000);
setInterval(loadWeather, 15 * 60 * 1000);
setInterval(loadCalendar, 10 * 60 * 1000);
setInterval(loadNews, 30 * 60 * 1000);
setInterval(() => { if (prefs.photos) loadPhotos(); }, 6 * 60 * 60 * 1000);
focus(document.querySelector('#app-row .app'));
