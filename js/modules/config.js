// Configuración estática de la app: claves de almacenamiento, horarios de
// operadores, URL/IDs del Google Form y mapeos de valores.
// ============================================
// Constants
// ============================================
export const DAILY_GOAL = 30;
export const STORAGE_KEY = 'bot_gestiones_today';
export const DATE_KEY = 'bot_gestiones_date';
export const ARCHIVE_PREFIX = 'bot_gestiones_archive_';
export const COMPACT_KEY = 'bot_compact_mode';
export const SYNC_QUEUE_KEY = 'bot_sync_queue';
export const GFORM_URL_KEY = 'bot_gform_url';
export const SHEETS_URL_KEY = 'bot_sheets_url';
export const THEME_KEY = 'bot_theme';
export const SOUND_KEY = 'bot_sound_enabled';
export const BREAK_ALARM_KEY = 'bot_break_alarm_enabled';
export const STATS_COLLAPSED_KEY = 'bot_stats_collapsed';
export const OPERATOR_NAME_KEY = 'bot_operator_name';
export const GEMINI_API_KEY_STORAGE = 'bot_gemini_api_key';
export const GEMINI_MODEL_STORAGE = 'bot_gemini_model';
export const PASS_CRM_KEY = 'bot_pass_crm';
export const PREFILL_PASS_KEY = 'bot_prefill_pass_in_url';
export const FRANCO_SWAP_PARTNER_KEY = 'bot_franco_swap_partner';
export const FRANCO_SWAP_DAY_REC_KEY = 'bot_franco_swap_day_received';
export const FRANCO_SWAP_DAY_GIV_KEY = 'bot_franco_swap_day_given';

export const DAY_NAMES_ES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
export const DAY_SHORT_NAMES_ES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// ============================================
// Operator Break Schedule
// ============================================
// francos: array de días JS (0=Dom, 1=Lun, ..., 6=Sáb)
// breaks: array de 2 strings "HH:MM" en formato 24h
export const OPERATOR_SCHEDULE = {
    // TURNO MAÑANA (08:00-14:00)
    'Francia Diego': { francos: [5, 6], breaks: ['09:30', '12:15'] },
    'Conti Melanie': { francos: [5, 0], breaks: ['09:45', '12:30'] },
    'Montenegro Omar': { francos: [4, 0], breaks: ['10:00', '12:45'] },
    'Matos Luciano': { francos: [4, 5], breaks: ['10:15', '13:00'] },
    'Gomez Ignacio': { francos: [3, 0], breaks: ['10:30', '13:15'] },
    'Ibacache Ivan': { francos: [3, 6], breaks: ['10:45', '13:45'] },
    'Mamani Yanina': { francos: [5, 0], breaks: ['11:00', '13:30'] },
    'Pardo Josafat': { francos: [3, 6], breaks: ['11:30', '13:30'] },
    // TURNO TARDE (14:00-20:00)
    'Ortellado Alex': { francos: [4, 0], breaks: ['15:30', '18:00'] },
    'Scaramello Juliana': { francos: [5, 6], breaks: ['15:45', '18:15'] },
    'Bonfanti Cecilia': { francos: [4, 6], breaks: ['16:00', '18:30'] },
    'Leclerc Kevin': { francos: [5, 0], breaks: ['16:15', '18:45'] },
    'Scardaccione Luca': { francos: [3, 6], breaks: ['16:30', '19:00'] },
    'Vignolo Nahuel': { francos: [5, 0], breaks: ['16:45', '19:15'] },
    'Jurnet Lucas': { francos: [3, 0], breaks: ['17:00', '19:30'] },
    'Cepeda Nicolas': { francos: [4, 0], breaks: ['17:15', '19:45'] }
};

// ============================================
// Source-of-Truth URL del Google Form
// ============================================
// Esta constante SIEMPRE sobreescribe el valor del LocalStorage
// al cargar la app. Si necesitás cambiar el Form, editá acá.
export const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScyha3vodHNJvqCJQouyHD7GKM3Mh-blJLGiklP0OT7sUCFqQ/viewform';

// ============================================================
// IDs DE CAMPOS DE GOOGLE FORMS PARA PRE-LLENADO (PRE-FILL)
// ============================================================
// INSTRUCCIONES: Reemplazá los valores de abajo con los IDs
// reales de tu Google Form.
//
// Para obtener los IDs:
//   1. Abrí tu Google Form en el navegador.
//   2. Hacé clic en los 3 puntos (menú) → "Obtener vínculo con
//      respuestas precargadas".
//   3. Completá los campos de ejemplo y generá el link.
//   4. En la URL generada, buscá los parámetros como:
//      &entry.123456789=valor
//   5. Copiá el número (ej. 123456789) y pegalo abajo.
//
// Ejemplo: si tu URL dice "entry.1234567890=Juan", entonces:
//   GFORM_ENTRY_OPERATOR_NAME = 'entry.1234567890';
// ============================================================
export const GFORM_ENTRY_OPERATOR_NAME = 'entry.1032949883'; // Campo "Operador" del Google Form
export const GFORM_ENTRY_PASS_CRM = 'entry.1602826454';      // Campo "Pass CRM" del Google Form
export const GFORM_ENTRY_ESTADO = 'entry.1658376896';         // Campo "Estado" ("Gestión" o "Estados Sin Gestión")
export const GFORM_ENTRY_CLIENTE = 'entry.497919059';         // Campo "N° de Cliente / Asunto Mail" del Google Form
export const GFORM_ENTRY_TIPO_GESTION = 'entry.2099167134';   // Campo "Tipo de Gestión" ("RAs", "Callcontact", "Gestiones Especiales")

// Rama 1: RAs
export const GFORM_ENTRY_GESTION_RA = 'entry.2074675876';     // Campo "Gestión RAs" del Google Form
export const GFORM_ENTRY_CONTACTO_RA = 'entry.1018921590';    // Campo "Estado Contacto RA" del Google Form
export const GFORM_ENTRY_ESTADO_RA = 'entry.789248115';       // Campo "Estado Gestión RA" del Google Form

// Rama 2: Callcontact
export const GFORM_ENTRY_CONTACTO_CALLCONTACT = 'entry.766613145'; // Campo "Gestión CallContact" del Google Form
export const GFORM_ENTRY_ESTADO_CALLCONTACT = 'entry.1116303635';  // Campo "Estado Gestión CallContact" del Google Form

// Rama 3: Gestiones Especiales
export const GFORM_ENTRY_GESTIONES_ESP = 'entry.1800489466';  // Campo "Gestiones Especiales" del Google Form
export const GFORM_ENTRY_CONTACTO_ESP = 'entry.549594727';    // Campo "Contacto Especial" del Google Form
export const GFORM_ENTRY_ESTADO_ESP = 'entry.247821766';      // Campo "Estado Gestión Especial" del Google Form
// ============================================================

// ============================================================
// MAPEO: Valores de la Web App → Valores exactos del Google Form
// ============================================================
// La web app usa nombres ligeramente distintos a los del Google Form.
// Este objeto traduce el valor seleccionado en la app al valor
// exacto que espera el dropdown del formulario de Google.
// ============================================================
export const GFORM_RA_MAPPING = {
    // INTERNET (“NOC - INTERNET” en la app → “NOC - BANDA ANCHA” en el form)
    'NOC - INTERNET - SOLICITUD DE CONFIGURACIÓN': 'NOC - BANDA ANCHA - SOLICITUD DE CONFIGURACION',
    'NOC - INTERNET - PROBLEMAS PARTICULARES DE ACCESO': 'NOC - BANDA ANCHA - PROBLEMAS PARTICULARES DE ACCESO',

    // TELEFONIA (“NOC - TELEFONIA” en la app → “NOC - TELEF RESID” en el form)
    'NOC - TELEFONIA - LLAMADAS SIN TONO': 'NOC - TELEF RESID - LLAMADAS SIN TONO',
    'NOC - TELEFONIA - LLAMADAS SIN LLAMADAS SALIENTES': 'NOC - TELEF RESID - LLAMADAS SIN LLAMADAS SALIENTES',
    'NOC - TELEFONIA - LLAMADAS SIN LLAMADAS ENTRANTES': 'NOC - TELEF RESID - LLAMADAS SIN LLAMADAS ENTRANTES',
    'NOC - TELEFONIA - VARIOS': 'NOC - TELEF RESID - VARIOS',

    // TELEVISIÓN (pequeñas diferencias)
    'NOC - TELEVISIÓN - SIN SUSCRIPCION': 'NOC - TELEVISIÓN - SIN SUSCRIPCION',
    'NOC - TELEVISIÓN - PANTALLA EN NEGRO': 'NOC - TELEVISIÓN - PANTALLA NEGRA',
    'NOC - TELEVISIÓN - PIXELACION/FREEZE': 'NOC - TELEVISIÓN - PIXELACION/FREEZE',
    'NOC - TELEVISION - Internal Error/Error 310 o 410 sin Solución Online': 'NOC - TELEVISION - Internal Error/Error 310 o 410 sin Solución Online',
    'NOC - APLICACIONES - DECO - DESAPARECEN APPS': 'NOC - APLICACIONES - DECO - DESAPARECEN APPS',

    // WEB / APP (la app usa "Web/App" y el form también, salvo el de Tizen que tiene minúscula)
    'Web/App - Sucursal Virtual': 'Web/App - Sucursal Virtual',
    'Web/App - Amazon': 'Web/App - Amazon',
    'Web/App - Disney': 'Web/App - Disney',
    'Web/App - Max': 'Web/App - Max',
    'Web/App - Tplay': 'Web/App - Tplay',
    'Web/App - Netflix': 'Web/App - Netflix',
    'Web/App - Tplay en Tizen Samsung TV': 'web/app - Tplay en Tizen Samsung TV',
    'App Mobile - Tphone': 'App Mobile - Tphone',

    // ESCALAMIENTO N3 (idénticos)
    'Inconveniente con insumos': 'Inconveniente con insumos',
    'Problemas Cableados red.500': 'Problemas Cableados red.500',
    'Reposición de Equipos CM/DD': 'Reposición de Equipos CM/DD',
    'Escalamiento Teams': 'Escalamiento Teams',
    'PANTALLA (DECO ANDROID) SOY CLIENTE SIN SOLUCION': 'PANTALLA (DECO ANDROID) SOY CLIENTE SIN SOLUCION',

    // GESTIONES ESPECIALES EN DROPDOWN DE RAs (idénticos en el Form)
    'Problemas Postes/Columnas': 'Problemas Postes/Columnas',
    'Reservado para carga de BOT': 'Reservado para carga de BOT',
    'Referidos': 'Referidos',

    // WIFI MESH (la app usa "ACCESO" y el form tiene "ACCESSO" con doble S)
    'NOC - WIFI MESH - CORTES INTERMITENTES': 'NOC - WIFI MESH - CORTES INTERMITENTES',
    'NOC - WIFI MESH - LENTITUD EN NAVEGACION': 'NOC - WIFI MESH - LENTITUD EN NAVEGACION',
    'NOC - WIFI MESH - PROBLEMAS PARTICULARES DE ACCESO': 'NOC - WIFI MESH - PROBLEMAS PARTICULARES DE ACCESSO',
    'NOC - WIFI MESH - SIN NAVEGACION': 'NOC - WIFI MESH - SIN NAVEGACION',
    'NOC - WIFI MESH - SOLICITUD DE CONFIGURACION': 'NOC - WIFI MESH - SOLICITUD DE CONFIGURACION',
    'NOC - WIFI MESH - WIFI - DISPOSITIVO NO CONECTA': 'NOC - WIFI MESH - WIFI - DISPOSITIVO NO CONECTA',
    'NOC - WIFI MESH - WIFI - NO SE VISUALIZA RED': 'NOC - WIFI MESH - WIFI - NO SE VISUALIZA RED'
};

// Gestiones Especiales mapping to Google Form values
export const GFORM_ESP_MAPPING = {
    'Analisis Tickets Cargados': 'Analisis Tickets Cargados',
    'Analisis/Carga RA ID121': 'Analisis/Carga RA ID121',
    'Reiterados viena': 'Reiterados viena'
};

// List of tipo_ra values that qualify as "Gestiones Especiales" and need conditional fields
export const GESTIONES_ESPECIALES_VALUES = [
    'Analisis Tickets Cargados',
    'Analisis/Carga RA ID121',
    'Reiterados viena'
];
