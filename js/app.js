document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // DOM Elements
    // ============================================
    const form = document.getElementById('registro-form');
    const inputCliente = document.getElementById('cliente-id');
    const selectRa = document.getElementById('tipo-ra');
    const inputReclamoTexto = document.getElementById('reclamo-texto');
    const inputObservaciones = document.getElementById('observaciones');
    const checkForm = document.getElementById('form-check');
    const btnSubmit = document.getElementById('btn-submit');
    const btnCancelEdit = document.getElementById('btn-cancel-edit');
    const historyBody = document.getElementById('history-body');
    const dailyCountEl = document.getElementById('daily-count');
    const progressBar = document.getElementById('progress-bar');
    const btnExport = document.getElementById('btn-export');
    const btnReset = document.getElementById('btn-reset');
    const sessionTimerEl = document.getElementById('session-timer');
    const syncStatusEl = document.getElementById('sync-status');
    const searchInput = document.getElementById('search-input');
    const filterCategory = document.getElementById('filter-category');
    const btnTheme = document.getElementById('btn-theme');
    const toastContainer = document.getElementById('toast-container');

    // Stats
    const statPerHour = document.getElementById('stat-per-hour');
    const statStreak = document.getElementById('stat-streak');
    const statTopCategory = document.getElementById('stat-top-category');
    const categoryChart = document.getElementById('category-chart');
    const btnToggleStats = document.getElementById('btn-toggle-stats');
    const statsContent = document.getElementById('stats-content');

    // Settings Modal
    const settingsModal = document.getElementById('settings-modal');
    const btnOpenSettings = document.getElementById('btn-open-settings');
    const inputFormUrl = document.getElementById('form-url-input');
    const inputSheetsUrl = document.getElementById('sheets-url-input');
    const soundToggleEl = document.getElementById('sound-toggle');
    const breakAlarmToggleEl = document.getElementById('break-alarm-toggle');
    const inputGeminiApiKey = document.getElementById('gemini-api-key-input');
    const selectGeminiModel = document.getElementById('gemini-model-select');
    const btnTestGemini = document.getElementById('btn-test-gemini');
    const btnToggleGeminiKey = document.getElementById('btn-toggle-gemini-key');
    const geminiModelStatus = document.getElementById('gemini-model-status');
    const btnSaveSettings = document.getElementById('btn-save-settings');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');

    // Operator Settings Elements
    const inputOperatorName = document.getElementById('operator-name-input');
    const inputPassCrm = document.getElementById('pass-crm-input');
    const btnTogglePass = document.getElementById('btn-toggle-pass');

    // Confirm Modal
    const confirmModal = document.getElementById('confirm-modal');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmYes = document.getElementById('confirm-yes');
    const confirmNo = document.getElementById('confirm-no');

    // Tools Elements
    const toolsAccordion = document.getElementById('tools-accordion');
    const reclamoAccordion = document.getElementById('reclamo-accordion');
    const macCm = document.getElementById('mac-cm');
    const macMta = document.getElementById('mac-mta');
    const macOnt = document.getElementById('mac-ont');
    const lineaTel = document.getElementById('linea-tel');
    const decosContainer = document.getElementById('decos-container');
    const btnClearTools = document.getElementById('btn-clear-tools');

    // Gestiones Especiales conditional fields
    const camposEspeciales = document.getElementById('campos-especiales');
    const selectContactoEsp = document.getElementById('contacto-especial');
    const selectEstadoEsp = document.getElementById('estado-gestion-especial');

    // SN conditional field (PANTALLA DECO ANDROID)
    const campoSn = document.getElementById('campo-sn');
    const inputSn = document.getElementById('input-sn');

    // New features DOM
    const paceIndicator = document.getElementById('pace-indicator');
    const btnClearForm = document.getElementById('btn-clear-form');

    // Break Alarm DOM
    const breakIndicator = document.getElementById('break-indicator');
    const breakOverlay = document.getElementById('break-overlay');
    const breakOperatorName = document.getElementById('break-operator-name');
    const breakCountdown = document.getElementById('break-countdown');
    const btnDismissBreak = document.getElementById('btn-dismiss-break');

    // Compact Mode, Shortcuts & Smart Paste DOM
    const btnToggleCompact = document.getElementById('btn-toggle-compact');
    const btnShortcutsHelp = document.getElementById('btn-shortcuts-help');
    const shortcutsModal = document.getElementById('shortcuts-modal');
    const btnCloseShortcuts = document.getElementById('btn-close-shortcuts');
    const btnSmartPaste = document.getElementById('btn-smart-paste');
    const btnExportBackup = document.getElementById('btn-export-backup');
    const btnImportBackup = document.getElementById('btn-import-backup');
    const fileImportBackup = document.getElementById('file-import-backup');
    const historyChips = document.getElementById('history-chips');

    // Reclamo Reiterado DOM
    const chkReiterado = document.getElementById('chk-reiterado');
    const badgeRecurrencia = document.getElementById('badge-recurrencia');
    const reiteradoPanel = document.getElementById('reiterado-panel');
    const reiteradoRaId = document.getElementById('reiterado-ra-id');
    const plantillaTextSinContacto = document.getElementById('plantilla-text-sin-contacto');
    const plantillaTextBienGestionado = document.getElementById('plantilla-text-bien-gestionado');
    const plantillaTextMalGestionado = document.getElementById('plantilla-text-mal-gestionado');

    // AI Claim Audit DOM
    const btnAiAudit = document.getElementById('btn-ai-audit');
    const aiObsPanel = document.getElementById('ai-obs-panel');
    const aiRaTag = document.getElementById('ai-ra-tag');
    const aiScoreNum = document.getElementById('ai-score-num');
    const aiProgressFill = document.getElementById('ai-progress-fill');
    const aiVerdictBox = document.getElementById('ai-verdict-box');
    const aiVerdictBadge = document.getElementById('ai-verdict-badge');
    const aiVerdictTitle = document.getElementById('ai-verdict-title');
    const aiVerdictDesc = document.getElementById('ai-verdict-desc');
    const aiRelevantList = document.getElementById('ai-relevant-list');
    const aiMissingList = document.getElementById('ai-missing-list');
    const aiNoiseList = document.getElementById('ai-noise-list');
    const btnAiLlmAudit = document.getElementById('btn-ai-llm-audit');
    const aiSummaryContent = document.getElementById('ai-summary-content');
    const btnAiCopySummary = document.getElementById('btn-ai-copy-summary');
    const btnAiApplySummary = document.getElementById('btn-ai-apply-summary');
    const aiTemplateUsage = document.getElementById('ai-template-usage');
    const aiTemplateCode = document.getElementById('ai-template-code');
    const btnAiCopyRawTemplate = document.getElementById('btn-ai-copy-raw-template');
    const aiCoherenceBox = document.getElementById('ai-coherence-box');
    const aiCoherenceTitle = document.getElementById('ai-coherence-title');
    const aiCoherenceReason = document.getElementById('ai-coherence-reason');
    const aiCoherenceAdvice = document.getElementById('ai-coherence-advice');

    // ============================================
    // Constants
    // ============================================
    const DAILY_GOAL = 30;
    const STORAGE_KEY = 'bot_gestiones_today';
    const DATE_KEY = 'bot_gestiones_date';
    const ARCHIVE_PREFIX = 'bot_gestiones_archive_';
    const COMPACT_KEY = 'bot_compact_mode';
    const SYNC_QUEUE_KEY = 'bot_sync_queue';
    const GFORM_URL_KEY = 'bot_gform_url';
    const SHEETS_URL_KEY = 'bot_sheets_url';
    const THEME_KEY = 'bot_theme';
    const SOUND_KEY = 'bot_sound_enabled';
    const BREAK_ALARM_KEY = 'bot_break_alarm_enabled';
    const STATS_COLLAPSED_KEY = 'bot_stats_collapsed';
    const OPERATOR_NAME_KEY = 'bot_operator_name';
    const GEMINI_API_KEY_STORAGE = 'bot_gemini_api_key';
    const GEMINI_MODEL_STORAGE = 'bot_gemini_model';
    const PASS_CRM_KEY = 'bot_pass_crm';

    // ============================================
    // Operator Break Schedule
    // ============================================
    // francos: array de días JS (0=Dom, 1=Lun, ..., 6=Sáb)
    // breaks: array de 2 strings "HH:MM" en formato 24h
    const OPERATOR_SCHEDULE = {
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
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScyha3vodHNJvqCJQouyHD7GKM3Mh-blJLGiklP0OT7sUCFqQ/viewform';

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
    const GFORM_ENTRY_OPERATOR_NAME = 'entry.1032949883'; // Campo "Operador" del Google Form
    const GFORM_ENTRY_PASS_CRM = 'entry.1602826454';      // Campo "Pass CRM" del Google Form
    const GFORM_ENTRY_CLIENTE = 'entry.497919059';         // Campo "N° de Cliente / Asunto Mail" del Google Form
    const GFORM_ENTRY_GESTION_RA = 'entry.2074675876';     // Campo "Gestión RAs" del Google Form
    const GFORM_ENTRY_ESTADO = 'entry.1658376896';         // Campo "Estado" del Google Form
    const GFORM_ENTRY_CONTACTO_RA = 'entry.1018921590';    // Campo "Estado Contacto RA" del Google Form
    const GFORM_ENTRY_ESTADO_RA = 'entry.789248115';       // Campo "Estado Gestión RA" del Google Form
    const GFORM_ENTRY_GESTIONES_ESP = 'entry.1800489466';  // Campo "Gestiones Especiales" del Google Form
    const GFORM_ENTRY_CONTACTO_ESP = 'entry.549594727';    // Campo "Contacto Especial" del Google Form
    const GFORM_ENTRY_ESTADO_ESP = 'entry.247821766';      // Campo "Estado Gestión Especial" del Google Form
    // ============================================================

    // ============================================================
    // MAPEO: Valores de la Web App → Valores exactos del Google Form
    // ============================================================
    // La web app usa nombres ligeramente distintos a los del Google Form.
    // Este objeto traduce el valor seleccionado en la app al valor
    // exacto que espera el dropdown del formulario de Google.
    // ============================================================
    const GFORM_RA_MAPPING = {
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

        // GESTIONES ESPECIALES (idénticos)
        'Problemas Postes/Columnas': 'Problemas Postes/Columnas',
        'Reservado para carga de BOT': 'Reservado para carga de BOT',
        'Referidos': 'Referidos',
        'Analisis Tickets Cargados': 'Analisis Tickets Cargados',
        'Analisis/Carga RA ID121': 'Analisis/Carga RA ID121',
        'Reiterados viena': 'Reiterados viena',

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
    const GFORM_ESP_MAPPING = {
        'Analisis Tickets Cargados': 'Analisis Tickets Cargados',
        'Analisis/Carga RA ID121': 'Analisis/Carga RA ID121',
        'Reiterados viena': 'Reiterados viena'
    };

    // List of tipo_ra values that qualify as "Gestiones Especiales" and need conditional fields
    const GESTIONES_ESPECIALES_VALUES = [
        'Analisis Tickets Cargados',
        'Analisis/Carga RA ID121',
        'Reiterados viena'
    ];

    const CATEGORY_COLORS = {
        'INTERNET': '#3b82f6',
        'TELEFONIA': '#8b5cf6',
        'WIFI MESH': '#10b981',
        'TELEVISIÓN': '#f59e0b',
        'WEB / APP': '#ec4899',
        'ESCALAMIENTO N3': '#ef4444',
        'GESTIONES ESPECIALES': '#6366f1'
    };

    // ============================================
    // State
    // ============================================
    let gestiones = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let sheetsUrl = localStorage.getItem(SHEETS_URL_KEY) || '';
    let editingId = null;
    let timerInterval = null;
    let soundEnabled = localStorage.getItem(SOUND_KEY) !== 'false';
    let breakAlarmEnabled = localStorage.getItem(BREAK_ALARM_KEY) !== 'false';
    let operatorName = localStorage.getItem(OPERATOR_NAME_KEY) || '';
    let geminiApiKey = localStorage.getItem(GEMINI_API_KEY_STORAGE) || '';
    let geminiModel = localStorage.getItem(GEMINI_MODEL_STORAGE) || 'auto';
    let passCrm = localStorage.getItem(PASS_CRM_KEY) || '';

    // Break alarm state
    let breakInterval = null;
    let breakCountdownInterval = null;
    let lastBreakAlerted = null;
    let activeBreakEnd = null;

    // ── Fix Bug Form URL: la constante del código siempre gana ──
    // Si el LS tiene una URL vieja distinta al código, se sobreescribe.
    // El usuario puede cambiarla manualmente en Ajustes como override local,
    // pero al actualizar el código fuente, la nueva URL prevalecerá.
    let googleFormUrl = GOOGLE_FORM_URL;
    const storedFormUrl = localStorage.getItem(GFORM_URL_KEY);
    if (!storedFormUrl || storedFormUrl !== GOOGLE_FORM_URL) {
        // El código se actualizó o es la primera vez → forzar URL del código
        localStorage.setItem(GFORM_URL_KEY, GOOGLE_FORM_URL);
    } else {
        // El LS coincide con el código → usar la del LS (por si el usuario
        // la cambió manualmente a la misma que hay en el código, no hay conflicto)
        googleFormUrl = storedFormUrl;
    }


    // ============================================
    // Initialize
    // ============================================
    checkDayChange();
    loadTheme();
    loadStatsCollapsed();

    if (inputFormUrl) inputFormUrl.value = googleFormUrl;
    if (inputSheetsUrl) inputSheetsUrl.value = sheetsUrl;
    if (soundToggleEl) soundToggleEl.checked = soundEnabled;
    if (breakAlarmToggleEl) breakAlarmToggleEl.checked = breakAlarmEnabled;
    if (inputOperatorName) inputOperatorName.value = operatorName;
    if (inputPassCrm) inputPassCrm.value = passCrm;
    if (inputGeminiApiKey) inputGeminiApiKey.value = geminiApiKey;
    if (selectGeminiModel) selectGeminiModel.value = geminiModel;

    // Password visibility toggle
    if (btnTogglePass && inputPassCrm) {
        btnTogglePass.addEventListener('click', () => {
            const isPassword = inputPassCrm.type === 'password';
            inputPassCrm.type = isPassword ? 'text' : 'password';
            btnTogglePass.innerHTML = isPassword ? '<i data-lucide="eye-off"></i>' : '<i data-lucide="eye"></i>';
            btnTogglePass.title = isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }

    // Gemini API Key visibility toggle
    if (btnToggleGeminiKey && inputGeminiApiKey) {
        btnToggleGeminiKey.addEventListener('click', () => {
            const isPassword = inputGeminiApiKey.type === 'password';
            inputGeminiApiKey.type = isPassword ? 'text' : 'password';
            btnToggleGeminiKey.innerHTML = isPassword ? '<i data-lucide="eye-off"></i>' : '<i data-lucide="eye"></i>';
            btnToggleGeminiKey.title = isPassword ? 'Ocultar API Key' : 'Mostrar API Key';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }

    // Probar conexión y detectar modelos Gemini
    if (btnTestGemini) {
        btnTestGemini.addEventListener('click', async () => {
            const key = inputGeminiApiKey ? inputGeminiApiKey.value.trim() : '';
            if (!key) {
                showToast('Ingresá una API Key de Gemini primero', 'warning');
                return;
            }
            btnTestGemini.disabled = true;
            const origHtml = btnTestGemini.innerHTML;
            btnTestGemini.innerHTML = '<i class="spin" data-lucide="loader-2"></i>';
            if (typeof lucide !== 'undefined') lucide.createIcons();
            if (geminiModelStatus) geminiModelStatus.textContent = 'Consultando modelos disponibles en Google AI...';

            try {
                const models = await getAvailableGeminiModels(key);
                if (!models || models.length === 0) {
                    throw new Error('No se encontraron modelos con soporte para generateContent');
                }
                populateGeminiModelOptions(models);
                let best = pickBestGeminiModel(models);

                // Validar generación con el modelo elegido (reintenta y auto-resuelve si Google sugiere otro)
                best = await testAndResolveWorkingModel(key, best, models);

                if (selectGeminiModel) selectGeminiModel.value = best;
                geminiModel = best;
                localStorage.setItem(GEMINI_MODEL_STORAGE, best);
                if (geminiModelStatus) {
                    const isFlash = best.toLowerCase().includes('flash');
                    const speedNote = isFlash ? ' (Modo Rápido ⚡)' : '';
                    geminiModelStatus.innerHTML = `<span style="color: #10B981; font-weight: 600;">✓ Conexión y generación exitosa.</span> ${models.length} modelos detectados. Activo: <strong>${best}</strong>${speedNote}`;
                }
                showToast(`Modelo más rápido asignado: ${best}`, 'success');
            } catch (err) {
                console.error('Error al probar Gemini:', err);
                if (geminiModelStatus) {
                    geminiModelStatus.innerHTML = `<span style="color: #EF4444; font-weight: 600;">✗ Error:</span> ${err.message}`;
                }
                showToast(`Error al conectar con Gemini: ${err.message}`, 'error');
            } finally {
                btnTestGemini.disabled = false;
                btnTestGemini.innerHTML = origHtml;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        });
    }

    updateUI();
    startSessionTimer();

    // Initialize RA search filter (Quick-Pick)
    initRaSearchFilter();

    // Initialize conditional fields toggle
    initConditionalFields();

    // Initialize Reclamo Reiterado & Plantillas
    initReiterados();

    // Initialize Compact Mode, Shortcuts, Category Chips, Smart Paste, Backup & Offline Sync
    initCompactMode();
    initShortcutsModal();
    initCategoryFilterChips();
    initSmartPaste();
    initAiClaimAudit();
    initBackupAndRestore();
    initOfflineSyncQueue();

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    inputCliente.focus();

    // Initialize Break Monitor
    initBreakMonitor();

    // ============================================
    // Feature 3: Day Persistence
    // ============================================
    function checkDayChange() {
        const today = new Date().toISOString().split('T')[0];
        const storedDate = localStorage.getItem(DATE_KEY);

        if (storedDate && storedDate !== today) {
            // Archive previous day
            if (gestiones.length > 0) {
                localStorage.setItem(ARCHIVE_PREFIX + storedDate, JSON.stringify(gestiones));
            }
            gestiones = [];
            saveData();
        }

        localStorage.setItem(DATE_KEY, today);
    }

    // ============================================
    // Form Handling
    // ============================================
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const cliente = inputCliente.value.trim();
        const tipoRa = selectRa.value;
        const reclamoTexto = inputReclamoTexto ? inputReclamoTexto.value.trim() : '';
        const snValue = inputSn ? inputSn.value.trim() : '';
        let observaciones = inputObservaciones ? inputObservaciones.value.trim() : '';

        // Append SN to observaciones if present
        if (snValue) {
            observaciones = observaciones ? `${observaciones} | SN: ${snValue}` : `SN: ${snValue}`;
        }

        if (!cliente || !tipoRa) return;

        let equipos = null;
        if (toolsAccordion && toolsAccordion.open) {
            const decos = [];
            if (decosContainer) {
                decosContainer.querySelectorAll('.deco-input').forEach(input => {
                    if (input.value) decos.push(input.value);
                });
            }
            const cmVal = macCm ? macCm.value : '';
            const ontVal = macOnt ? macOnt.value : '';
            const mtaVal = macMta ? macMta.value : '';
            const lineaVal = lineaTel ? lineaTel.value : '';

            if (cmVal || ontVal || lineaVal || decos.length > 0) {
                equipos = {
                    cm: cmVal,
                    mta: mtaVal,
                    ont: ontVal,
                    decos: decos,
                    linea: lineaVal
                };
            }
        }

        function completeSubmit() {
            saveData();
            updateUI();
            startSessionTimer();

            // Check if we just hit the daily goal
            if (gestiones.length >= DAILY_GOAL) {
                triggerGoalCelebration();
            }

            // Reset form
            inputCliente.value = '';
            selectRa.value = '';
            if (inputReclamoTexto) inputReclamoTexto.value = '';
            if (inputObservaciones) inputObservaciones.value = '';
            if (checkForm) checkForm.checked = false;

            // Reset AI audit panel
            if (reclamoAccordion) reclamoAccordion.open = false;
            if (aiObsPanel) {
                aiObsPanel.classList.add('hidden');
                if (btnAiAudit) btnAiAudit.classList.remove('active');
            }
            if (aiCoherenceBox) aiCoherenceBox.classList.add('hidden');

            // Reset conditional fields (Gestiones Especiales)
            if (camposEspeciales) {
                camposEspeciales.classList.remove('visible');
                setTimeout(() => camposEspeciales.classList.add('hidden'), 350);
                if (selectContactoEsp) selectContactoEsp.value = '';
                if (selectEstadoEsp) selectEstadoEsp.value = '';
            }

            // Reset SN field
            if (campoSn) {
                campoSn.classList.remove('visible');
                setTimeout(() => campoSn.classList.add('hidden'), 350);
                if (inputSn) inputSn.value = '';
            }

            // Reset Reclamo Reiterado
            if (chkReiterado) chkReiterado.checked = false;
            if (reiteradoPanel) reiteradoPanel.classList.add('hidden');
            const reiteradoSec = document.querySelector('.reiterado-section');
            if (reiteradoSec) reiteradoSec.classList.remove('active');
            if (badgeRecurrencia) {
                badgeRecurrencia.classList.add('hidden');
                badgeRecurrencia.innerHTML = '';
            }
            if (reiteradoRaId) reiteradoRaId.value = '';
            updateSinContactoTemplate();

            // Clear tools
            if (btnClearTools) btnClearTools.click();

            inputCliente.focus();
        }

        if (editingId) {
            // Update existing
            const index = gestiones.findIndex(g => g.id === editingId);
            if (index !== -1) {
                gestiones[index].cliente = cliente;
                gestiones[index].tipo_ra = tipoRa;
                gestiones[index].reclamo_datos = reclamoTexto;
                gestiones[index].observaciones = observaciones;
                gestiones[index].is_reiterado = chkReiterado ? chkReiterado.checked : false;
                gestiones[index].ra_id = reiteradoRaId ? reiteradoRaId.value.trim() : '';
                if (equipos) {
                    gestiones[index].equipos = equipos;
                }
            }
            editingId = null;
            btnSubmit.innerHTML = 'Registrar Gestión <span class="shortcut-hint">Ctrl+Enter</span>';
            btnCancelEdit.classList.add('hidden');
            showToast('Gestión actualizada correctamente', 'success');
            completeSubmit();
        } else {
            // Add new
            const processNewGestion = () => {
                const now = new Date();
                const isReiterado = chkReiterado ? chkReiterado.checked : false;
                const raId = reiteradoRaId ? reiteradoRaId.value.trim() : '';
                const gestion = {
                    id: Date.now().toString(),
                    cliente: cliente,
                    tipo_ra: tipoRa,
                    reclamo_datos: reclamoTexto,
                    observaciones: observaciones,
                    is_reiterado: isReiterado,
                    ra_id: raId,
                    fecha: now.toLocaleDateString('es-AR'),
                    hora: now.toLocaleTimeString('es-AR', { hour12: false })
                };
                if (equipos) {
                    gestion.equipos = equipos;
                }
                gestiones.unshift(gestion);

                // Feature 8: Sound
                playSuccessSound();

                // Feature 1: Google Sheets sync
                syncToGoogleSheets(gestion);

                showToast('✅ Gestión #' + gestiones.length + ' registrada', 'success');
                completeSubmit();
            };

            // Open Google Form (with pre-fill if operator data is configured)
            if (googleFormUrl) {
                // Validación: verificar que los datos del operador estén configurados
                if (!operatorName || !passCrm) {
                    showToast('⚠️ Por favor, configurá tu Nombre de Operador y Pass CRM en Ajustes antes de continuar', 'warning');
                    return;
                }
                const prefilledUrl = buildPrefilledFormUrl(googleFormUrl, cliente, tipoRa, 'Gestión');
                const formWindow = window.open(prefilledUrl, '_blank');
                if (formWindow) {
                    const originalBtnHtml = btnSubmit.innerHTML;
                    btnSubmit.innerHTML = '⏳ Gestión en proceso en el Form...';
                    btnSubmit.disabled = true;
                    inputCliente.disabled = true;
                    selectRa.disabled = true;
                    if (inputReclamoTexto) inputReclamoTexto.disabled = true;
                    if (inputObservaciones) inputObservaciones.disabled = true;

                    const checkInterval = setInterval(() => {
                        if (formWindow.closed) {
                            clearInterval(checkInterval);

                            btnSubmit.innerHTML = originalBtnHtml;
                            btnSubmit.disabled = false;
                            inputCliente.disabled = false;
                            selectRa.disabled = false;
                            if (inputReclamoTexto) inputReclamoTexto.disabled = false;
                            if (inputObservaciones) inputObservaciones.disabled = false;

                            processNewGestion();
                        }
                    }, 500);
                } else {
                    showToast('Habilita las ventanas emergentes (pop-ups) para abrir el Form automáticamente', 'error');
                    processNewGestion();
                }
            } else {
                processNewGestion();
            }
        }
    });

    // Cancel edit
    if (btnCancelEdit) {
        btnCancelEdit.addEventListener('click', () => {
            editingId = null;
            inputCliente.value = '';
            selectRa.value = '';
            if (inputReclamoTexto) inputReclamoTexto.value = '';
            if (inputObservaciones) inputObservaciones.value = '';
            if (checkForm) checkForm.checked = false;

            if (aiObsPanel) {
                aiObsPanel.classList.add('hidden');
                if (btnAiAudit) btnAiAudit.classList.remove('active');
            }
            if (aiCoherenceBox) aiCoherenceBox.classList.add('hidden');

            if (chkReiterado) chkReiterado.checked = false;
            if (reiteradoPanel) reiteradoPanel.classList.add('hidden');
            const reiteradoSec = document.querySelector('.reiterado-section');
            if (reiteradoSec) reiteradoSec.classList.remove('active');
            if (badgeRecurrencia) {
                badgeRecurrencia.classList.add('hidden');
                badgeRecurrencia.innerHTML = '';
            }
            if (reiteradoRaId) reiteradoRaId.value = '';
            updateSinContactoTemplate();

            btnSubmit.innerHTML = 'Registrar Gestión <span class="shortcut-hint">Ctrl+Enter</span>';
            btnCancelEdit.classList.add('hidden');
            inputCliente.focus();
        });
    }

    // ============================================
    // Feature 5: Keyboard Shortcuts
    // ============================================
    document.addEventListener('keydown', (e) => {
        // Ctrl+Enter to submit
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            if (form.checkValidity()) {
                form.requestSubmit();
            } else {
                form.reportValidity();
            }
        }
        // Alt+C to focus Cliente input
        if (e.altKey && (e.key === 'c' || e.key === 'C')) {
            e.preventDefault();
            if (inputCliente) {
                inputCliente.focus();
                inputCliente.select();
            }
        }
        // Alt+G to focus RA search filter
        if (e.altKey && (e.key === 'g' || e.key === 'G')) {
            e.preventDefault();
            const raSearch = document.querySelector('.ra-search-wrapper input');
            if (raSearch) {
                raSearch.focus();
                raSearch.select();
            }
        }
        // Alt+P for Smart Paste
        if (e.altKey && (e.key === 'p' || e.key === 'P')) {
            e.preventDefault();
            handleSmartPaste();
        }
        // Alt+R to toggle Reclamo Reiterado
        if (e.altKey && (e.key === 'r' || e.key === 'R')) {
            e.preventDefault();
            if (chkReiterado) {
                chkReiterado.checked = !chkReiterado.checked;
                chkReiterado.dispatchEvent(new Event('change'));
            }
        }
        // Alt+T to toggle Tools accordion
        if (e.altKey && (e.key === 't' || e.key === 'T')) {
            e.preventDefault();
            if (toolsAccordion) toolsAccordion.open = !toolsAccordion.open;
        }
        // Alt+M to toggle Compact Mode
        if (e.altKey && (e.key === 'm' || e.key === 'M')) {
            e.preventDefault();
            toggleCompactMode();
        }
        // Alt+L to clear all form fields
        if (e.altKey && (e.key === 'l' || e.key === 'L')) {
            e.preventDefault();
            if (btnClearForm) btnClearForm.click();
        }
        // Ctrl+K to focus history search input
        if (e.ctrlKey && (e.key === 'k' || e.key === 'K')) {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        // Escape to cancel edit or close modals
        if (e.key === 'Escape') {
            if (editingId) {
                btnCancelEdit.click();
            }
            if (settingsModal && !settingsModal.classList.contains('hidden')) {
                settingsModal.classList.add('hidden');
            }
            if (shortcutsModal && !shortcutsModal.classList.contains('hidden')) {
                shortcutsModal.classList.add('hidden');
            }
            if (jornadaModal && !jornadaModal.classList.contains('hidden')) {
                if (btnCancelarJornada) btnCancelarJornada.click();
            }
            if (confirmModal && !confirmModal.classList.contains('hidden')) {
                confirmModal.classList.add('hidden');
            }
        }
    });

    // ============================================
    // UI Updates
    // ============================================
    function updateUI() {
        renderHistory();
        updateProgress();
        renderStats();
    }

    // ============================================
    // Feature 4: Search & Filter
    // ============================================
    function getCategory(tipoRa) {
        const lower = tipoRa.toLowerCase();
        if (lower.includes('banda ancha') || lower.includes('internet')) return 'INTERNET';
        if (lower.includes('telefonia')) return 'TELEFONIA';
        if (lower.includes('wifi mesh')) return 'WIFI MESH';
        if (lower.includes('televisión') || lower.includes('television') || lower.includes('aplicaciones - deco')) return 'TELEVISIÓN';
        if (lower.includes('web/app') || lower.includes('app mobile')) return 'WEB / APP';
        if (['inconveniente con insumos', 'problemas cableados red.500', 'reposición de equipos cm/dd', 'escalamiento teams', 'pantalla (deco android) soy cliente sin solucion',].includes(lower)) return 'ESCALAMIENTO N3';
        return 'GESTIONES ESPECIALES';
    }

    function getFilteredGestiones() {
        let filtered = [...gestiones];

        const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
        const catFilter = filterCategory ? filterCategory.value : '';

        if (searchTerm) {
            filtered = filtered.filter(g =>
                g.cliente.toLowerCase().includes(searchTerm) ||
                g.tipo_ra.toLowerCase().includes(searchTerm) ||
                (g.reclamo_datos && g.reclamo_datos.toLowerCase().includes(searchTerm)) ||
                (g.observaciones && g.observaciones.toLowerCase().includes(searchTerm))
            );
        }

        if (catFilter) {
            filtered = filtered.filter(g => getCategory(g.tipo_ra) === catFilter);
        }

        return filtered;
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => renderHistory());
    }
    if (filterCategory) {
        filterCategory.addEventListener('change', () => renderHistory());
    }

    // ============================================
    // Render History — Timeline Cards
    // ============================================
    function renderHistory() {
        historyBody.innerHTML = '';

        const filtered = getFilteredGestiones();

        if (filtered.length === 0) {
            const msg = gestiones.length === 0
                ? 'No hay gestiones registradas aún en esta jornada.'
                : 'No se encontraron resultados para el filtro.';
            historyBody.innerHTML = `<div class="empty-state">${msg}</div>`;
            return;
        }

        filtered.forEach(g => {
            const category = getCategory(g.tipo_ra);

            // Build equipment details HTML
            let equiposHtml = '';
            if (g.equipos) {
                const eq = g.equipos;
                const parts = [];
                if (eq.cm) parts.push(`CM: ${eq.cm}`);
                if (eq.mta) parts.push(`MTA: ${eq.mta}`);
                if (eq.ont) parts.push(`ONT: ${eq.ont}`);
                if (eq.decos && eq.decos.length) parts.push(`Decos: ${eq.decos.length}`);
                if (eq.linea) parts.push(`Línea: ${eq.linea}`);
                if (parts.length > 0) {
                    equiposHtml = `<div class="gestion-equipos">🛠️ ${parts.join(' · ')}</div>`;
                }
            }

            // Build secondary details row (reclamo_datos + obs + equipos)
            let detailsHtml = '';
            const hasReclamo = g.reclamo_datos && g.reclamo_datos.trim();
            const hasObs = g.observaciones && g.observaciones.trim();
            if (hasReclamo || hasObs || equiposHtml) {
                detailsHtml = `<div class="gestion-details">`;
                if (hasReclamo) {
                    detailsHtml += `<div class="gestion-reclamo-datos">${escapeHtml(g.reclamo_datos)}</div>`;
                }
                if (hasObs) {
                    detailsHtml += `<div class="gestion-obs">${escapeHtml(g.observaciones)}</div>`;
                }
                detailsHtml += equiposHtml + `</div>`;
            }

            // Short RA label for the badge
            let shortRa = g.tipo_ra;
            shortRa = shortRa.replace(/^NOC - (INTERNET|BANDA ANCHA|TELEFONIA|TELEF RESID|TELEVISIÓN|TELEVISION|WIFI MESH|APLICACIONES) - /, '');
            shortRa = shortRa.replace(/^(Web\/App|App Mobile) - /, '');
            if (shortRa.length > 25) shortRa = shortRa.substring(0, 23) + '…';

            const card = document.createElement('div');
            card.className = 'gestion-card';
            card.dataset.id = g.id;
            card.dataset.cat = category;
            card.innerHTML = `
                <div class="gestion-card-row">
                    <span class="gestion-hora">${g.hora}</span>
                    <span class="gestion-cliente">${g.cliente}</span>
                    <span class="gestion-tipo" title="${g.tipo_ra}">
                        ${shortRa}
                        ${g.is_reiterado ? `<span class="badge-reiterado-mini" title="Reclamo Reiterado ${g.ra_id ? '(RA: ' + g.ra_id + ')' : ''}"><i data-lucide="repeat"></i> Reiterado</span>` : ''}
                    </span>
                    <div class="gestion-actions">
                        <button class="btn-icon" title="Editar" onclick="editGestion('${g.id}')"><i data-lucide="pencil"></i></button>
                        <button class="btn-icon" title="Eliminar" onclick="deleteGestion('${g.id}')"><i data-lucide="trash-2"></i></button>
                    </div>
                </div>
                ${detailsHtml}
            `;
            historyBody.appendChild(card);
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        updateCategoryChipCounts();
    }

    // ============================================
    // Update Progress
    // ============================================
    function updateProgress() {
        const count = gestiones.length;
        const prevCount = parseInt(dailyCountEl.textContent) || 0;
        dailyCountEl.textContent = count;

        // Pulse animation when count increases
        if (count > prevCount) {
            dailyCountEl.classList.remove('pulse-pop');
            void dailyCountEl.offsetWidth; // Force reflow
            dailyCountEl.classList.add('pulse-pop');
        }

        let percentage = (count / DAILY_GOAL) * 100;
        const barWidth = percentage > 100 ? 100 : percentage;
        progressBar.style.width = `${barWidth}%`;

        if (count >= DAILY_GOAL) {
            progressBar.classList.add('success');
        } else {
            progressBar.classList.remove('success');
        }
    }

    // ============================================
    // Feature 2: Statistics Dashboard
    // ============================================
    function renderStats() {
        // Gestiones per hour
        if (statPerHour) {
            if (gestiones.length > 0) {
                const firstGestion = gestiones[gestiones.length - 1];
                const [h, m, s] = firstGestion.hora.split(':').map(Number);
                const firstTime = new Date();
                firstTime.setHours(h, m, s, 0);
                const now = new Date();
                const hoursElapsed = Math.max((now - firstTime) / (1000 * 60 * 60), 1);
                statPerHour.textContent = (gestiones.length / hoursElapsed).toFixed(1);
            } else {
                statPerHour.textContent = '0';
            }
        }

        // Streak
        if (statStreak) {
            const streak = calculateStreak();
            statStreak.textContent = streak + ' 🔥';
        }

        // Category distribution
        const categoryCounts = {};
        gestiones.forEach(g => {
            const cat = getCategory(g.tipo_ra);
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        });

        // Top category
        if (statTopCategory) {
            const entries = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
            if (entries.length > 0) {
                statTopCategory.textContent = entries[0][0];
                statTopCategory.classList.add('small-text');
            } else {
                statTopCategory.textContent = '-';
                statTopCategory.classList.remove('small-text');
            }
        }

        // Bar chart
        if (categoryChart) {
            const entries = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

            if (entries.length === 0) {
                categoryChart.innerHTML = '<p class="empty-state" style="padding: 0.5rem 0; font-size: 0.8rem;">Sin datos aún</p>';
                return;
            }

            const maxCount = Math.max(...entries.map(e => e[1]), 1);
            categoryChart.innerHTML = entries.map(([cat, count]) => `
                <div class="chart-row">
                    <span class="chart-label" title="${cat}">${cat}</span>
                    <div class="chart-bar-container">
                        <div class="chart-bar-fill" style="width: ${(count / maxCount) * 100}%; background: ${CATEGORY_COLORS[cat] || '#64748b'}"></div>
                    </div>
                    <span class="chart-count">${count}</span>
                </div>
            `).join('');
        }
    }

    function calculateStreak() {
        let streak = 0;
        const today = new Date();

        // Check if today qualifies
        if (gestiones.length >= DAILY_GOAL) {
            streak++;
        }

        // Check archived days going backwards
        // New rule: skip days without data (francos/weekends)
        // Only break the streak on a WORKED day with < DAILY_GOAL
        let checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - 1); // Start from yesterday

        for (let i = 0; i < 365; i++) {
            const dateStr = checkDate.toISOString().split('T')[0];
            const archived = localStorage.getItem(ARCHIVE_PREFIX + dateStr);
            if (archived) {
                const data = JSON.parse(archived);
                if (data.length >= DAILY_GOAL) {
                    streak++;
                } else {
                    // Worked day with < 30 → streak broken
                    break;
                }
            }
            // No data for this day (franco) → skip, don't break
            checkDate.setDate(checkDate.getDate() - 1);
        }

        return streak;
    }

    // Stats toggle
    if (btnToggleStats) {
        btnToggleStats.addEventListener('click', () => {
            statsContent.classList.toggle('collapsed');
            const isCollapsed = statsContent.classList.contains('collapsed');
            localStorage.setItem(STATS_COLLAPSED_KEY, isCollapsed ? 'true' : 'false');
        });
    }

    function loadStatsCollapsed() {
        if (localStorage.getItem(STATS_COLLAPSED_KEY) === 'true' && statsContent) {
            statsContent.classList.add('collapsed');
        }
    }

    // ============================================
    // Feature 9: Session Timer
    // ============================================
    function startSessionTimer() {
        if (timerInterval) clearInterval(timerInterval);

        if (!sessionTimerEl) return;

        if (gestiones.length === 0) {
            sessionTimerEl.textContent = '⏱ Sin iniciar';
            updatePaceIndicator(0, 0);
            return;
        }

        // Get the first gestión registered (oldest = last in array)
        const firstGestion = gestiones[gestiones.length - 1];
        const [fh, fm, fs] = firstGestion.hora.split(':').map(Number);
        const sessionStart = new Date();
        sessionStart.setHours(fh, fm, fs, 0);

        // Get latest gestión (first in array = last registered)
        const latestGestion = gestiones[0];
        const [hours, minutes, seconds] = latestGestion.hora.split(':').map(Number);
        const startTime = new Date();
        startTime.setHours(hours, minutes, seconds, 0);

        function tick() {
            const now = new Date();
            let diff = Math.floor((now - startTime) / 1000);
            if (diff < 0) diff = 0;
            const hh = String(Math.floor(diff / 3600)).padStart(2, '0');
            const mm = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
            const ss = String(diff % 60).padStart(2, '0');
            sessionTimerEl.textContent = `⏱ ${hh}:${mm}:${ss}`;

            // Update pace indicator every tick
            const elapsedHours = (now - sessionStart) / 3600000;
            updatePaceIndicator(gestiones.length, elapsedHours);
        }

        tick();
        timerInterval = setInterval(tick, 1000);
    }

    // ============================================
    // Feature: Pace Indicator (Ritmo en Tiempo Real)
    // ============================================
    function updatePaceIndicator(count, elapsedHours) {
        if (!paceIndicator) return;

        // Goal reached! Show special message
        if (count >= DAILY_GOAL) {
            paceIndicator.classList.remove('hidden');
            paceIndicator.className = 'pace-indicator pace-goal';
            paceIndicator.innerHTML = `<span class="pace-dot"></span>Felicidades, llegaste al objetivo diario de gestiones 😎`;
            return;
        }

        if (count === 0) {
            paceIndicator.classList.remove('hidden');
            paceIndicator.className = 'pace-indicator pace-ok';
            paceIndicator.innerHTML = `<span class="pace-dot"></span>Esperando 1ra gestión...`;
            return;
        }

        // Evitar picos irreales al inicio tomando como mínimo 1 minuto de tiempo transcurrido
        const effectiveHours = Math.max(elapsedHours, 1 / 60);

        paceIndicator.classList.remove('hidden');
        const rate = count / effectiveHours;

        let paceClass, msg;
        if (rate >= 5) {
            paceClass = 'pace-good';
            msg = `Vas bien 🔥`;
        } else if (rate >= 4) {
            paceClass = 'pace-ok';
            msg = `Vas justo para las 30 gestiones, pero se puede mejorar.`;
        } else {
            paceClass = 'pace-low';
            msg = `Hay que agarrar un poco mas la pala.`;
        }

        paceIndicator.className = `pace-indicator ${paceClass}`;
        paceIndicator.innerHTML = `<span class="pace-dot"></span>${msg}`;
    }

    // ============================================
    // Feature: Goal Celebration (Confetti + Banner)
    // ============================================
    let celebrationTriggered = gestiones.length >= DAILY_GOAL; // Don't re-trigger on reload if already past 30

    // Celebration sounds — one per day of the week (0=Domingo ... 6=Sábado)
    const CELEBRATION_SOUNDS = {
        0: 'assets/level-up-sound.mp3',  // Domingo
        1: 'assets/level-up-sound.mp3',              // Lunes (FF Victory Fanfare)
        2: 'assets/congratulations-you-are-moving-to-the-next-level.mp3',         // Martes
        3: 'assets/ZeldaOpenChestLoot-SoundEffectforediting.mp3',           // Miércoles
        4: 'assets/gta-sanandreas-missionpassed.mp3',               // Jueves
        5: 'assets/YouWinPerfect.mp3',                   // Viernes
        6: 'assets/YouWin-WiiSports.mp3'            // Sábado
    };

    function triggerGoalCelebration() {
        if (celebrationTriggered) return;
        celebrationTriggered = true;

        // 1. Play day-of-week celebration sound 🎶
        const dayOfWeek = new Date().getDay(); // 0=Dom, 1=Lun, ..., 6=Sab
        const soundFile = CELEBRATION_SOUNDS[dayOfWeek] || 'assets/level-up-sound.mp3';
        try {
            const celebrationAudio = new Audio(soundFile);
            celebrationAudio.volume = 0.7;
            celebrationAudio.play().catch(() => {
                // If the specific file is missing, try the default FF sound
                const fallback = new Audio('assets/level-up-sound.mp3');
                fallback.volume = 0.7;
                fallback.play().catch(() => playSuccessSound());
            });
        } catch (e) {
            playSuccessSound();
        }

        // 2. Add glow to progress panel
        const progressCard = document.querySelector('.progress-panel');
        if (progressCard) {
            progressCard.classList.add('goal-reached');
            setTimeout(() => progressCard.classList.remove('goal-reached'), 6500);
        }

        // 3. Show celebration banner
        const banner = document.createElement('div');
        banner.className = 'celebration-banner';
        banner.innerHTML = '<span>🎉 ¡Objetivo diario cumplido! Ahora a mimirr 😴</span>';
        document.body.appendChild(banner);
        setTimeout(() => banner.remove(), 5500);

        // 4. Launch confetti
        launchConfetti();
    }

    function launchConfetti() {
        const canvas = document.createElement('canvas');
        canvas.id = 'celebration-canvas';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = [
            '#FF6B35', '#FF8C42', '#FFD700', '#10B981',
            '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B',
            '#EF4444', '#06B6D4'
        ];

        const confetti = [];
        const PARTICLE_COUNT = 120;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                w: Math.random() * 8 + 4,
                h: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3 + 2,
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10,
                opacity: 1
            });
        }

        const startTime = Date.now();
        const DURATION = 4000; // 4 seconds

        function animate() {
            const elapsed = Date.now() - startTime;
            if (elapsed > DURATION) {
                canvas.remove();
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Fade out in the last second
            const fadeStart = DURATION - 1000;
            const globalAlpha = elapsed > fadeStart ? 1 - (elapsed - fadeStart) / 1000 : 1;

            confetti.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05; // gravity
                p.rotation += p.rotSpeed;
                p.vx *= 0.99; // air resistance

                ctx.save();
                ctx.globalAlpha = globalAlpha * p.opacity;
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });

            requestAnimationFrame(animate);
        }

        animate();
    }

    // ============================================
    // Feature 1: Google Sheets Sync & Offline Queue
    // ============================================
    function getSyncQueue() {
        try {
            return JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveSyncQueue(queue) {
        localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
        if (queue.length > 0) {
            updateSyncStatus('pending', queue.length);
        }
    }

    function addToSyncQueue(payload) {
        const queue = getSyncQueue();
        queue.push(payload);
        saveSyncQueue(queue);
    }

    async function flushSyncQueue() {
        const queue = getSyncQueue();
        if (!queue.length || !sheetsUrl || !navigator.onLine) return;

        updateSyncStatus('sending');
        const remaining = [];
        for (const item of queue) {
            try {
                await fetch(sheetsUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item)
                });
            } catch (err) {
                console.error('Sync queue retry failed:', err);
                remaining.push(item);
            }
        }
        saveSyncQueue(remaining);
        if (remaining.length === 0) {
            updateSyncStatus('success');
        } else {
            updateSyncStatus('pending', remaining.length);
        }
    }

    function syncToGoogleSheets(gestion) {
        if (!sheetsUrl) return;
        const payload = { action: 'add', data: gestion };

        if (!navigator.onLine) {
            addToSyncQueue(payload);
            return;
        }

        updateSyncStatus('sending');

        fetch(sheetsUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(() => {
                updateSyncStatus('success');
            })
            .catch(err => {
                console.error('Sync error, adding to offline queue:', err);
                addToSyncQueue(payload);
            });
    }

    function updateSyncStatus(status, pendingCount = 0) {
        if (!syncStatusEl) return;

        syncStatusEl.classList.remove('hidden', 'sending', 'success', 'error', 'pending');
        syncStatusEl.classList.add(status);

        const textEl = syncStatusEl.querySelector('.sync-text');
        if (textEl) {
            switch (status) {
                case 'sending': textEl.textContent = 'Sincronizando...'; break;
                case 'success': textEl.textContent = 'Sincronizado'; break;
                case 'pending': textEl.textContent = `⏳ ${pendingCount} pendiente(s)`; break;
                case 'error': textEl.textContent = 'Error de sync'; break;
            }
        }

        // Auto-hide success after 4s
        if (status === 'success') {
            setTimeout(() => {
                if (syncStatusEl.classList.contains('success')) {
                    syncStatusEl.classList.add('hidden');
                }
            }, 4000);
        }
    }

    // ============================================
    // Feature 8: Sound
    // ============================================
    function playSuccessSound() {
        if (!soundEnabled) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();

            // Note 1: D5
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.frequency.value = 587.33;
            osc1.type = 'sine';
            gain1.gain.setValueAtTime(0.12, ctx.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
            osc1.start(ctx.currentTime);
            osc1.stop(ctx.currentTime + 0.15);

            // Note 2: G5
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.frequency.value = 783.99;
            osc2.type = 'sine';
            gain2.gain.setValueAtTime(0.12, ctx.currentTime + 0.12);
            gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
            osc2.start(ctx.currentTime + 0.12);
            osc2.stop(ctx.currentTime + 0.35);
        } catch (e) {
            // Web Audio not supported
        }
    }

    // ============================================
    // Feature 6: Toast Notifications
    // ============================================
    function showToast(message, type = 'info') {
        if (!toastContainer) return;

        const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        // Auto remove
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function showConfirm(message) {
        return new Promise((resolve) => {
            if (!confirmModal || !confirmMessage || !confirmYes || !confirmNo) {
                resolve(confirm(message)); // Fallback
                return;
            }

            confirmMessage.textContent = message;
            confirmModal.classList.remove('hidden');

            function cleanup() {
                confirmModal.classList.add('hidden');
                confirmYes.removeEventListener('click', onYes);
                confirmNo.removeEventListener('click', onNo);
            }

            function onYes() { cleanup(); resolve(true); }
            function onNo() { cleanup(); resolve(false); }

            confirmYes.addEventListener('click', onYes);
            confirmNo.addEventListener('click', onNo);
        });
    }

    // ============================================
    // Feature 7: Theme Toggle
    // ============================================
    function loadTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeButton(savedTheme);
        updateThemeColor(savedTheme);
    }

    function updateThemeButton(theme) {
        if (btnTheme) {
            btnTheme.innerHTML = theme === 'dark' ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
            btnTheme.title = theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }

    function updateThemeColor(theme) {
        const meta = document.getElementById('meta-theme-color');
        if (meta) {
            meta.setAttribute('content', theme === 'dark' ? '#121212' : '#f1f5f9');
        }
    }

    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'dark';
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem(THEME_KEY, next);
            updateThemeButton(next);
            updateThemeColor(next);
        });
    }

    // ============================================
    // Actions
    // ============================================
    window.editGestion = function (id) {
        const gestion = gestiones.find(g => g.id === id);
        if (gestion) {
            editingId = id;
            inputCliente.value = gestion.cliente;
            selectRa.value = gestion.tipo_ra;
            if (inputReclamoTexto) inputReclamoTexto.value = gestion.reclamo_datos || '';
            if (inputObservaciones) inputObservaciones.value = gestion.observaciones || '';
            if (checkForm) checkForm.checked = true;

            if (aiObsPanel && !aiObsPanel.classList.contains('hidden')) {
                renderAiAudit(false);
            }

            if (gestion.is_reiterado) {
                if (chkReiterado) {
                    chkReiterado.checked = true;
                    chkReiterado.dispatchEvent(new Event('change'));
                }
                if (reiteradoRaId) {
                    reiteradoRaId.value = gestion.ra_id || '';
                    updateSinContactoTemplate();
                }
            } else {
                if (chkReiterado) {
                    chkReiterado.checked = false;
                    chkReiterado.dispatchEvent(new Event('change'));
                }
                if (reiteradoRaId) {
                    reiteradoRaId.value = '';
                    updateSinContactoTemplate();
                }
            }

            btnSubmit.innerHTML = 'Actualizar Gestión <span class="shortcut-hint">Ctrl+Enter</span>';
            btnCancelEdit.classList.remove('hidden');

            window.scrollTo({ top: 0, behavior: 'smooth' });
            inputCliente.focus();
        }
    };

    window.deleteGestion = async function (id) {
        const confirmed = await showConfirm('¿Seguro que deseas eliminar esta gestión?');
        if (confirmed) {
            const gestionToDelete = gestiones.find(g => g.id === id);
            if (gestionToDelete && sheetsUrl) {
                const deletePayload = {
                    action: 'delete',
                    id: id,
                    fecha: gestionToDelete.fecha
                };
                if (!navigator.onLine) {
                    addToSyncQueue(deletePayload);
                } else {
                    updateSyncStatus('sending');
                    fetch(sheetsUrl, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(deletePayload)
                    })
                        .then(() => updateSyncStatus('success'))
                        .catch(err => {
                            console.error('Delete sync error, adding to offline queue:', err);
                            addToSyncQueue(deletePayload);
                        });
                }
            }

            // Animate card removal before updating data
            const cardEl = historyBody.querySelector(`.gestion-card[data-id="${id}"]`);
            if (cardEl) {
                cardEl.classList.add('removing');
                await new Promise(resolve => setTimeout(resolve, 300));
            }
            gestiones = gestiones.filter(g => g.id !== id);
            saveData();
            updateUI();
            startSessionTimer();
            showToast('Gestión eliminada', 'info');
        }
    };

    // ============================================
    // Nueva Jornada Checklist Modal
    // ============================================
    const jornadaModal = document.getElementById('jornada-modal');
    const chkQueueMetrics = document.getElementById('chk-queuemetrics');
    const chk3cx = document.getElementById('chk-3cx');
    const chkFormInicio = document.getElementById('chk-form-inicio');
    const chkFormHint = document.getElementById('chk-form-hint');
    const btnOpenFormInicio = document.getElementById('btn-open-form-inicio');
    const btnIniciarJornada = document.getElementById('btn-iniciar-jornada');
    const btnCancelarJornada = document.getElementById('btn-cancelar-jornada');
    const jornadaProgressBar = document.getElementById('jornada-progress-bar');
    const jornadaProgressText = document.getElementById('jornada-progress-text');

    let formInicioWindow = null;
    let formInicioCheckInterval = null;

    function resetChecklistState() {
        if (chkQueueMetrics) chkQueueMetrics.checked = false;
        if (chk3cx) chk3cx.checked = false;
        if (chkFormInicio) {
            chkFormInicio.checked = false;
            chkFormInicio.disabled = true;
        }
        if (btnOpenFormInicio) {
            btnOpenFormInicio.disabled = false;
            btnOpenFormInicio.classList.remove('waiting');
            btnOpenFormInicio.textContent = '📝 Abrir Form';
        }
        if (chkFormHint) chkFormHint.textContent = 'Abrí el form, completalo y cerrá la pestaña';

        // Clear form window polling
        if (formInicioCheckInterval) {
            clearInterval(formInicioCheckInterval);
            formInicioCheckInterval = null;
        }
        formInicioWindow = null;

        // Reset visual states
        document.querySelectorAll('.checklist-item').forEach(item => {
            item.classList.remove('checked');
        });

        updateJornadaProgress();
    }

    function updateJornadaProgress() {
        const checks = [
            chkQueueMetrics && chkQueueMetrics.checked,
            chk3cx && chk3cx.checked,
            chkFormInicio && chkFormInicio.checked
        ];
        const completed = checks.filter(Boolean).length;

        // Update progress bar
        if (jornadaProgressBar) {
            jornadaProgressBar.style.width = `${(completed / 3) * 100}%`;
        }
        if (jornadaProgressText) {
            jornadaProgressText.textContent = `${completed} de 3 completados`;
        }

        // Update start button
        if (btnIniciarJornada) {
            const allDone = completed === 3;
            btnIniciarJornada.disabled = !allDone;
            btnIniciarJornada.innerHTML = allDone
                ? '✅ Iniciar Nueva Jornada'
                : '🔒 Iniciar Nueva Jornada';
        }

        // Update visual state of each item
        document.querySelectorAll('.checklist-item').forEach(item => {
            const cb = item.querySelector('.checklist-checkbox');
            if (cb && cb.checked) {
                item.classList.add('checked');
            } else {
                item.classList.remove('checked');
            }
        });
    }

    // Manual checkboxes
    [chkQueueMetrics, chk3cx].forEach(cb => {
        if (cb) {
            cb.addEventListener('change', updateJornadaProgress);
        }
    });

    // "Abrir Form" button — opens form in new tab and monitors .closed
    if (btnOpenFormInicio) {
        btnOpenFormInicio.addEventListener('click', () => {
            // Validación: verificar que los datos del operador estén configurados
            if (!operatorName || !passCrm) {
                showToast('⚠️ Por favor, configurá tu Nombre de Operador y Pass CRM en Ajustes antes de continuar', 'warning');
                return;
            }
            const baseFormUrl = googleFormUrl || 'https://docs.google.com/forms/d/e/1FAIpQLSfBvf69_0snKpz2m6LGpkrIc0PDgS25aCDTA_og2Xj6hRYdHw/viewform';
            const formUrl = buildPrefilledFormUrl(baseFormUrl, null, null, 'Estados Sin Gestión');
            formInicioWindow = window.open(formUrl, '_blank');

            if (formInicioWindow) {
                // Update UI to "waiting" state
                btnOpenFormInicio.disabled = true;
                btnOpenFormInicio.classList.add('waiting');
                btnOpenFormInicio.textContent = '⏳ Esperando...';
                if (chkFormHint) chkFormHint.textContent = 'Completá el form y cerrá la pestaña para continuar...';

                // Poll for the window closing
                formInicioCheckInterval = setInterval(() => {
                    if (formInicioWindow && formInicioWindow.closed) {
                        clearInterval(formInicioCheckInterval);
                        formInicioCheckInterval = null;
                        formInicioWindow = null;

                        // Auto-check the form checkbox
                        if (chkFormInicio) {
                            chkFormInicio.checked = true;
                        }

                        // Update button visuals
                        btnOpenFormInicio.classList.remove('waiting');
                        btnOpenFormInicio.textContent = '✅ Form completado';
                        if (chkFormHint) chkFormHint.textContent = 'Form de inicio cargado correctamente';

                        updateJornadaProgress();
                    }
                }, 500);
            } else {
                showToast('Habilitá las ventanas emergentes (pop-ups) para abrir el Form', 'error');
            }
        });
    }

    // "Nueva Jornada" button opens the checklist modal
    btnReset.addEventListener('click', () => {
        resetChecklistState();
        if (jornadaModal) {
            jornadaModal.classList.remove('hidden');
        }
    });

    // "Cancelar" in the checklist modal
    if (btnCancelarJornada) {
        btnCancelarJornada.addEventListener('click', () => {
            // Clean up any ongoing form window polling
            if (formInicioCheckInterval) {
                clearInterval(formInicioCheckInterval);
                formInicioCheckInterval = null;
            }
            if (jornadaModal) jornadaModal.classList.add('hidden');
        });
    }

    // "Iniciar Nueva Jornada" — the real reset
    if (btnIniciarJornada) {
        btnIniciarJornada.addEventListener('click', () => {
            // Archive current day data
            if (gestiones.length > 0) {
                const today = new Date().toISOString().split('T')[0];
                localStorage.setItem(ARCHIVE_PREFIX + today, JSON.stringify(gestiones));
            }

            // Reset everything
            gestiones = [];
            saveData();
            updateUI();
            startSessionTimer();

            // Close modal
            if (jornadaModal) jornadaModal.classList.add('hidden');

            showToast('🚀 Nueva jornada iniciada. ¡Éxitos!', 'success');
            inputCliente.focus();
        });
    }

    btnExport.addEventListener('click', () => {
        if (gestiones.length === 0) {
            showToast('No hay gestiones para exportar', 'info');
            return;
        }

        // CSV Creation
        const headers = ['ID', 'Fecha', 'Hora', 'N_Cliente', 'Tipo_RA', 'Datos_Reclamo', 'Observaciones', 'CM_MAC', 'MTA_MAC', 'ONT_MAC', 'Decos', 'Linea'];
        const csvRows = [];
        csvRows.push(headers.join(','));

        const exportData = [...gestiones].reverse();

        exportData.forEach(g => {
            const tipoRaEscaped = `"${g.tipo_ra.replace(/"/g, '""')}"`;
            const reclamoEscaped = g.reclamo_datos ? `"${g.reclamo_datos.replace(/"/g, '""')}"` : '""';
            const obsEscaped = g.observaciones ? `"${g.observaciones.replace(/"/g, '""')}"` : '""';
            const eq = g.equipos || {};
            const cm = eq.cm || '';
            const mta = eq.mta || '';
            const ont = eq.ont || '';
            const decos = eq.decos && eq.decos.length ? `"${eq.decos.join(' / ')}"` : '""';
            const linea = eq.linea || '';

            const row = [g.id, g.fecha, g.hora, g.cliente, tipoRaEscaped, reclamoEscaped, obsEscaped, cm, mta, ont, decos, linea];
            csvRows.push(row.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const dateStr = new Date().toISOString().split('T')[0];
        link.setAttribute('href', url);
        link.setAttribute('download', `gestiones_bot_${dateStr}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('CSV exportado correctamente', 'success');
    });

    // ============================================
    // Feature: Limpiar Campos (Clear All Form Fields)
    // ============================================
    function clearAllFormFields() {
        if (inputCliente) inputCliente.value = '';
        if (selectRa) {
            selectRa.value = '';
            selectRa.dispatchEvent(new Event('change'));
            const raSearch = document.querySelector('.ra-search-wrapper input');
            if (raSearch) raSearch.value = '';
        }
        if (inputReclamoTexto) inputReclamoTexto.value = '';
        if (inputObservaciones) inputObservaciones.value = '';
        if (checkForm) checkForm.checked = false;

        // Reset AI audit panel & Coherence box
        if (reclamoAccordion) reclamoAccordion.open = false;
        if (aiObsPanel) {
            aiObsPanel.classList.add('hidden');
            if (btnAiAudit) btnAiAudit.classList.remove('active');
        }
        if (aiCoherenceBox) aiCoherenceBox.classList.add('hidden');

        // Reset SN field
        if (campoSn) {
            campoSn.classList.remove('visible');
            setTimeout(() => campoSn.classList.add('hidden'), 350);
            if (inputSn) inputSn.value = '';
        }

        // Reset Gestiones Especiales conditional fields
        if (camposEspeciales) {
            camposEspeciales.classList.remove('visible');
            setTimeout(() => camposEspeciales.classList.add('hidden'), 350);
            if (selectContactoEsp) selectContactoEsp.value = '';
            if (selectEstadoEsp) selectEstadoEsp.value = '';
        }

        // Reset Reclamo Reiterado
        if (chkReiterado) chkReiterado.checked = false;
        if (reiteradoPanel) reiteradoPanel.classList.add('hidden');
        const reiteradoSec = document.querySelector('.reiterado-section');
        if (reiteradoSec) reiteradoSec.classList.remove('active');
        if (badgeRecurrencia) {
            badgeRecurrencia.classList.add('hidden');
            badgeRecurrencia.innerHTML = '';
        }
        if (reiteradoRaId) reiteradoRaId.value = '';
        updateSinContactoTemplate();

        // Clear equipment tools
        if (btnClearTools) btnClearTools.click();

        // Cancel edit mode if active
        if (editingId) {
            editingId = null;
            if (btnSubmit) btnSubmit.innerHTML = 'Registrar Gestión <span class="shortcut-hint">Ctrl+Enter</span>';
            if (btnCancelEdit) btnCancelEdit.classList.add('hidden');
        }

        if (inputCliente) inputCliente.focus();
        showToast('🧹 Todos los campos fueron limpiados', 'info');
    }

    if (btnClearForm) {
        btnClearForm.addEventListener('click', clearAllFormFields);
    }

    function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gestiones));
    }

    // ============================================
    // Settings Modal
    // ============================================
    if (btnOpenSettings) {
        btnOpenSettings.addEventListener('click', () => {
            if (inputFormUrl) inputFormUrl.value = googleFormUrl;
            if (inputSheetsUrl) inputSheetsUrl.value = sheetsUrl;
            if (soundToggleEl) soundToggleEl.checked = soundEnabled;
            if (inputOperatorName) inputOperatorName.value = operatorName;
            if (inputPassCrm) inputPassCrm.value = passCrm;
            if (inputGeminiApiKey) inputGeminiApiKey.value = geminiApiKey;
            if (selectGeminiModel) selectGeminiModel.value = geminiModel;
            settingsModal.classList.remove('hidden');
        });
    }

    // Also expose for legacy compatibility
    window.openConfigModal = function () {
        if (btnOpenSettings) btnOpenSettings.click();
    };

    if (btnCerrarModal) {
        btnCerrarModal.addEventListener('click', () => {
            settingsModal.classList.add('hidden');
            inputCliente.focus();
        });
    }

    if (btnSaveSettings) {
        btnSaveSettings.addEventListener('click', () => {
            // Save Google Form URL (override local del usuario)
            // Se guarda en LS. Si el código fuente tiene una URL diferente,
            // la del código ganará en el próximo reload. Pero si el usuario
            // no puede actualizar el código, puede forzar la URL desde acá.
            const formUrl = inputFormUrl ? inputFormUrl.value.trim() : '';
            if (formUrl) {
                googleFormUrl = formUrl;
                localStorage.setItem(GFORM_URL_KEY, googleFormUrl);
            }

            // Save Sheets URL
            const newSheetsUrl = inputSheetsUrl ? inputSheetsUrl.value.trim() : '';
            sheetsUrl = newSheetsUrl;
            localStorage.setItem(SHEETS_URL_KEY, sheetsUrl);

            // Save sound preference
            soundEnabled = soundToggleEl ? soundToggleEl.checked : true;
            localStorage.setItem(SOUND_KEY, soundEnabled.toString());

            // Save break alarm preference
            breakAlarmEnabled = breakAlarmToggleEl ? breakAlarmToggleEl.checked : true;
            localStorage.setItem(BREAK_ALARM_KEY, breakAlarmEnabled.toString());
            updateNextBreakIndicator();

            // Save operator settings
            operatorName = inputOperatorName ? inputOperatorName.value.trim() : '';
            localStorage.setItem(OPERATOR_NAME_KEY, operatorName);

            passCrm = inputPassCrm ? inputPassCrm.value.trim() : '';
            localStorage.setItem(PASS_CRM_KEY, passCrm);

            // Save Gemini API Key & Model
            const newGeminiKey = inputGeminiApiKey ? inputGeminiApiKey.value.trim() : '';
            geminiApiKey = newGeminiKey;
            localStorage.setItem(GEMINI_API_KEY_STORAGE, geminiApiKey);

            const newGeminiModel = selectGeminiModel ? selectGeminiModel.value : 'auto';
            geminiModel = newGeminiModel;
            localStorage.setItem(GEMINI_MODEL_STORAGE, geminiModel);

            settingsModal.classList.add('hidden');
            showToast('Configuración guardada', 'success');
            inputCliente.focus();
        });
    }

    // ============================================
    // Pre-fill Google Form URL Builder
    // ============================================
    // Construye una URL de Google Form con parámetros de pre-llenado
    // usando los datos del operador guardados en Ajustes.
    function buildPrefilledFormUrl(baseUrl, clienteValue, tipoRaValue, estadoValue) {
        if (!operatorName && !passCrm && !clienteValue && !tipoRaValue && !estadoValue) return baseUrl;

        // Asegurarse de que la URL base no tenga un # al final
        let url = baseUrl.split('#')[0];

        // Determinar el separador (? o &) según si la URL ya tiene parámetros
        const separator = url.includes('?') ? '&' : '?';
        const params = [];

        if (operatorName) {
            params.push(`${GFORM_ENTRY_OPERATOR_NAME}=${encodeURIComponent(operatorName)}`);
        }
        if (passCrm) {
            params.push(`${GFORM_ENTRY_PASS_CRM}=${encodeURIComponent(passCrm)}`);
        }
        if (clienteValue) {
            params.push(`${GFORM_ENTRY_CLIENTE}=${encodeURIComponent(clienteValue)}`);
        }
        if (tipoRaValue) {
            // Buscar el valor mapeado del Google Form para la gestión seleccionada
            const formValue = GFORM_RA_MAPPING[tipoRaValue];
            if (formValue) {
                params.push(`${GFORM_ENTRY_GESTION_RA}=${encodeURIComponent(formValue)}`);
            }

            // Handle the additional fields (Contacto / Estado Gestión)
            const contactoValue = selectContactoEsp ? selectContactoEsp.value : '';
            const estadoExtraValue = selectEstadoEsp ? selectEstadoEsp.value : '';

            // If it's a Gestión Especial, use ESP entry IDs
            if (GESTIONES_ESPECIALES_VALUES.includes(tipoRaValue)) {
                const espFormValue = GFORM_ESP_MAPPING[tipoRaValue];
                if (espFormValue) {
                    params.push(`${GFORM_ENTRY_GESTIONES_ESP}=${encodeURIComponent(espFormValue)}`);
                }
                if (contactoValue) {
                    params.push(`${GFORM_ENTRY_CONTACTO_ESP}=${encodeURIComponent(contactoValue)}`);
                }
                if (estadoExtraValue) {
                    params.push(`${GFORM_ENTRY_ESTADO_ESP}=${encodeURIComponent(estadoExtraValue)}`);
                }
            } else {
                // It's a standard RA, use RA entry IDs
                if (contactoValue) {
                    params.push(`${GFORM_ENTRY_CONTACTO_RA}=${encodeURIComponent(contactoValue)}`);
                }
                if (estadoExtraValue) {
                    params.push(`${GFORM_ENTRY_ESTADO_RA}=${encodeURIComponent(estadoExtraValue)}`);
                }
            }
        }
        if (estadoValue) {
            params.push(`${GFORM_ENTRY_ESTADO}=${encodeURIComponent(estadoValue)}`);
        }

        return url + separator + params.join('&');
    }

    // ============================================
    // Tools Logic (MAC Formatting & MTA Math)
    // ============================================
    function formatMac(value) {
        let v = value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
        return v.match(/.{1,2}/g)?.join(':') || '';
    }

    function calculateMta(cmMac) {
        const hex = cmMac.replace(/:/g, '');
        if (hex.length === 12) {
            try {
                let num = BigInt("0x" + hex);
                num += 3n;
                let newHex = num.toString(16).toUpperCase().padStart(12, '0');
                if (newHex.length > 12) newHex = newHex.slice(-12);
                return newHex.match(/.{1,2}/g)?.join(':') || '';
            } catch (e) {
                return '';
            }
        }
        return '';
    }

    function setupMacInput(input) {
        input.addEventListener('input', (e) => {
            const start = input.selectionStart;
            const oldLen = input.value.length;

            input.value = formatMac(input.value);

            let diff = input.value.length - oldLen;
            let newPos = start + diff;
            if (newPos < 0) newPos = 0;

            try {
                input.setSelectionRange(newPos, newPos);
            } catch (err) { }

            if (input.id === 'mac-cm') {
                if (macMta) {
                    macMta.value = input.value.replace(/:/g, '').length === 12 ? calculateMta(input.value) : '';
                }
            }
        });
    }

    if (macCm) setupMacInput(macCm);
    if (macOnt) setupMacInput(macOnt);
    document.querySelectorAll('.deco-input').forEach(setupMacInput);

    const btnAddDeco = document.getElementById('btn-add-deco');
    if (btnAddDeco && decosContainer) {
        btnAddDeco.addEventListener('click', () => {
            const currentDecos = decosContainer.querySelectorAll('.deco-group').length;
            const index = currentDecos + 1;
            const group = document.createElement('div');
            group.className = 'tool-group deco-group';
            group.innerHTML = `
                <label>Deco MAC ${index}</label>
                <div class="input-with-copy">
                    <input type="text" class="mac-input deco-input" placeholder="AA:BB:CC:DD:EE:FF" autocomplete="off" maxlength="17">
                    <button type="button" class="btn-copy btn-copy-deco" title="Copiar"><i data-lucide="copy"></i></button>
                    <button type="button" class="btn-remove-deco" title="Quitar Deco"><i data-lucide="minus"></i></button>
                </div>
            `;
            decosContainer.appendChild(group);
            if (typeof lucide !== 'undefined') lucide.createIcons();

            setupMacInput(group.querySelector('.deco-input'));

            group.querySelector('.btn-remove-deco').addEventListener('click', () => {
                group.remove();
                decosContainer.querySelectorAll('.deco-group label').forEach((lbl, i) => {
                    lbl.textContent = 'Deco MAC ' + (i + 1);
                });
            });

            setupCopyButton(group.querySelector('.btn-copy'), group.querySelector('.deco-input'));
        });
    }

    function setupCopyButton(btn, inputEl) {
        if (!btn || !inputEl) return;
        btn.addEventListener('click', async () => {
            if (!inputEl.value) return;
            try {
                // Strip colons from MAC addresses so external tools accept them
                let copyValue = inputEl.value;
                if (inputEl.classList.contains('mac-input')) {
                    copyValue = copyValue.replace(/:/g, '');
                }
                await navigator.clipboard.writeText(copyValue);
                btn.innerHTML = '<i data-lucide="check"></i>';
                btn.classList.add('copied');
                if (typeof lucide !== 'undefined') lucide.createIcons();
                setTimeout(() => {
                    if (btn) {
                        btn.innerHTML = '<i data-lucide="copy"></i>';
                        btn.classList.remove('copied');
                        if (typeof lucide !== 'undefined') lucide.createIcons();
                    }
                }, 1500);
            } catch (err) {
                console.error('Failed to copy', err);
            }
        });
    }

    document.querySelectorAll('.btn-copy').forEach(btn => {
        if (btn.classList.contains('btn-copy-deco')) {
            setupCopyButton(btn, btn.previousElementSibling);
        } else if (btn.dataset.target) {
            setupCopyButton(btn, document.getElementById(btn.dataset.target));
        }
    });

    if (btnClearTools) {
        btnClearTools.addEventListener('click', () => {
            if (macCm) macCm.value = '';
            if (macMta) macMta.value = '';
            if (macOnt) macOnt.value = '';
            if (lineaTel) lineaTel.value = '';

            if (decosContainer) {
                const decoGroups = decosContainer.querySelectorAll('.deco-group');
                decoGroups.forEach((g, i) => {
                    if (i === 0) {
                        g.querySelector('.deco-input').value = '';
                    } else {
                        g.remove();
                    }
                });
            }
            showToast('Herramientas limpiadas', 'info');
        });
    }

    // ============================================
    // Feature: Conditional Fields (Gestiones Especiales)
    // ============================================
    function initConditionalFields() {
        if (!selectRa || !camposEspeciales) return;

        const labelContacto = document.getElementById('label-contacto');
        const labelEstado = document.getElementById('label-estado');
        const PANTALLA_VALUE = 'PANTALLA (DECO ANDROID) SOY CLIENTE SIN SOLUCION';

        selectRa.addEventListener('change', () => {
            const val = selectRa.value;

            // Handle SN field (only for PANTALLA DECO ANDROID)
            if (campoSn) {
                if (val === PANTALLA_VALUE) {
                    campoSn.classList.remove('hidden');
                    requestAnimationFrame(() => campoSn.classList.add('visible'));
                } else {
                    campoSn.classList.remove('visible');
                    setTimeout(() => {
                        if (!campoSn.classList.contains('visible')) {
                            campoSn.classList.add('hidden');
                        }
                    }, 350);
                    if (inputSn) inputSn.value = '';
                }
            }

            if (val) {
                // If Reiterados viena is selected, auto-check Reclamo Reiterado
                if (val === 'Reiterados viena') {
                    if (chkReiterado && !chkReiterado.checked) {
                        chkReiterado.checked = true;
                        chkReiterado.dispatchEvent(new Event('change'));
                    }
                }

                // Determine if it's an Especial or RA
                const isEspecial = GESTIONES_ESPECIALES_VALUES.includes(val);

                // Update Labels
                if (labelContacto) labelContacto.textContent = isEspecial ? 'Contacto Especial' : 'Estado Contacto RA';
                if (labelEstado) labelEstado.textContent = isEspecial ? 'Estado Gestión Especial' : 'Estado Gestión RA';

                // Populate Contacto Select
                if (selectContactoEsp) {
                    const prevValue = selectContactoEsp.value;
                    selectContactoEsp.innerHTML = '<option value="" disabled selected>Seleccionar...</option>';
                    const contactoOpts = isEspecial
                        ? ['Contacto', 'Sin Contacto', 'No es necesario Contacto']
                        : ['Contacto', 'Sin Contacto', 'No es necesario el Contacto'];
                    contactoOpts.forEach(opt => {
                        selectContactoEsp.innerHTML += `<option value="${opt}">${opt}</option>`;
                    });
                    // Try to restore previous value if it matches the new options
                    if (contactoOpts.includes(prevValue)) selectContactoEsp.value = prevValue;
                }

                // Populate Estado Select
                if (selectEstadoEsp) {
                    const prevValue = selectEstadoEsp.value;
                    selectEstadoEsp.innerHTML = '<option value="" disabled selected>Seleccionar...</option>';
                    const estadoOpts = isEspecial
                        ? ['Gestionado', 'Pendiente']
                        : ['Cerrado', 'Pendiente', 'Rechazado'];
                    estadoOpts.forEach(opt => {
                        selectEstadoEsp.innerHTML += `<option value="${opt}">${opt}</option>`;
                    });
                    // Try to restore previous value if it matches the new options
                    if (estadoOpts.includes(prevValue)) selectEstadoEsp.value = prevValue;
                }

                camposEspeciales.classList.remove('hidden');
                // Trigger slide animation
                requestAnimationFrame(() => {
                    camposEspeciales.classList.add('visible');
                });
            } else {
                camposEspeciales.classList.remove('visible');
                // Wait for animation to complete before hiding
                setTimeout(() => {
                    if (!camposEspeciales.classList.contains('visible')) {
                        camposEspeciales.classList.add('hidden');
                    }
                }, 350);
                // Reset conditional fields
                if (selectContactoEsp) selectContactoEsp.value = '';
                if (selectEstadoEsp) selectEstadoEsp.value = '';
            }
        });
    }

    // ============================================
    // Feature: RA Search Filter (Quick-Pick)
    // ============================================
    function initRaSearchFilter() {
        if (!selectRa) return;

        // Store all original options
        const allOptions = [];
        selectRa.querySelectorAll('option, optgroup').forEach(el => {
            if (el.tagName === 'OPTGROUP') {
                const group = { label: el.label, options: [] };
                el.querySelectorAll('option').forEach(opt => {
                    group.options.push({ value: opt.value, text: opt.textContent, disabled: opt.disabled });
                });
                allOptions.push(group);
            } else if (!el.closest('optgroup') && el.value === '') {
                // Default placeholder
                allOptions.push({ placeholder: true, text: el.textContent, disabled: el.disabled });
            }
        });

        // Create search input above the select
        const wrapper = document.createElement('div');
        wrapper.className = 'ra-search-wrapper';
        const searchIcon = document.createElement('span');
        searchIcon.className = 'search-icon';
        searchIcon.innerHTML = '<i data-lucide="search"></i>';
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar tipo de gestión... (Alt+G)';
        searchInput.autocomplete = 'off';
        wrapper.appendChild(searchIcon);
        wrapper.appendChild(searchInput);

        selectRa.parentNode.insertBefore(wrapper, selectRa);
        if (typeof lucide !== 'undefined') lucide.createIcons();

        function clearRaSelection() {
            if (!selectRa.value) return;
            selectRa.value = '';
            if (searchInput) searchInput.value = '';
            rebuildSelect(allOptions, null);
            selectRa.dispatchEvent(new Event('change'));
            showToast('Tipo de gestión borrado', 'info');
        }

        searchInput.addEventListener('keydown', (e) => {
            // Borrar gestión seleccionada con Backspace si el buscador está vacío
            if (e.key === 'Backspace' && searchInput.value === '') {
                if (selectRa.value) {
                    e.preventDefault();
                    clearRaSelection();
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectRa.focus();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const visibleOpts = selectRa.querySelectorAll('option:not([disabled])');
                if (visibleOpts.length > 0) {
                    visibleOpts[0].selected = true;
                    selectRa.dispatchEvent(new Event('change'));
                    if (inputReclamoTexto) inputReclamoTexto.focus();
                    else if (inputObservaciones) inputObservaciones.focus();
                }
            } else if (e.key === 'Escape') {
                if (searchInput.value) {
                    searchInput.value = '';
                    rebuildSelect(allOptions, null);
                } else {
                    clearRaSelection();
                }
                searchInput.blur();
            }
        });

        // Borrar gestión seleccionada con Backspace o Supr directamente sobre el select
        selectRa.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                e.preventDefault();
                clearRaSelection();
                if (searchInput) searchInput.focus();
            }
        });

        searchInput.addEventListener('input', () => {
            const term = searchInput.value.trim().toLowerCase();
            if (!term) {
                // Restore all options
                rebuildSelect(allOptions, null);
                return;
            }
            rebuildSelect(allOptions, term);
        });

        // Clear search on select change
        selectRa.addEventListener('change', () => {
            if (searchInput.value) {
                searchInput.value = '';
                rebuildSelect(allOptions, null);
            }
        });

        function rebuildSelect(groups, term) {
            const currentValue = selectRa.value;
            selectRa.innerHTML = '';

            groups.forEach(item => {
                if (item.placeholder) {
                    const opt = document.createElement('option');
                    opt.value = '';
                    opt.textContent = item.text;
                    opt.disabled = true;
                    if (!currentValue) opt.selected = true;
                    selectRa.appendChild(opt);
                    return;
                }

                const matchingOpts = term
                    ? item.options.filter(o => !o.disabled && o.text.toLowerCase().includes(term))
                    : item.options;

                if (matchingOpts.length === 0) return;

                const optgroup = document.createElement('optgroup');
                optgroup.label = item.label;
                matchingOpts.forEach(o => {
                    const opt = document.createElement('option');
                    opt.value = o.value;
                    opt.textContent = o.text;
                    if (o.disabled) opt.disabled = true;
                    if (o.value === currentValue) opt.selected = true;
                    optgroup.appendChild(opt);
                });
                selectRa.appendChild(optgroup);
            });

            // Auto-select if only one match
            if (term) {
                const visibleOpts = selectRa.querySelectorAll('option:not([disabled])');
                if (visibleOpts.length === 1) {
                    visibleOpts[0].selected = true;
                    selectRa.dispatchEvent(new Event('change'));
                }
            }
        }
    }

    // ============================================
    // Feature: Break Alarm System
    // ============================================

    function initBreakMonitor() {
        // Update indicator immediately
        updateNextBreakIndicator();

        // Start monitoring every 10 seconds
        if (breakInterval) clearInterval(breakInterval);
        breakInterval = setInterval(() => {
            checkBreakTime();
            updateNextBreakIndicator();
        }, 10000);

        // Dismiss button
        if (btnDismissBreak) {
            btnDismissBreak.addEventListener('click', () => {
                dismissBreakAlert();
            });
        }
    }

    function getOperatorSchedule() {
        if (!operatorName) return null;
        return OPERATOR_SCHEDULE[operatorName] || null;
    }

    function checkBreakTime() {
        if (!breakAlarmEnabled) return;
        const schedule = getOperatorSchedule();
        if (!schedule) return;

        const now = new Date();
        const dayOfWeek = now.getDay(); // 0=Dom ... 6=Sab

        // Don't alert on franco days
        if (schedule.francos.includes(dayOfWeek)) return;

        const currentHH = String(now.getHours()).padStart(2, '0');
        const currentMM = String(now.getMinutes()).padStart(2, '0');
        const currentTime = `${currentHH}:${currentMM}`;
        const todayStr = now.toISOString().split('T')[0];

        schedule.breaks.forEach((breakTime, index) => {
            if (currentTime === breakTime) {
                const alertKey = `${todayStr}-${breakTime}`;
                if (lastBreakAlerted === alertKey) return; // Already alerted
                lastBreakAlerted = alertKey;
                showBreakAlert(index + 1, breakTime);
            }
        });
    }

    function updateNextBreakIndicator() {
        if (!breakIndicator) return;

        if (!breakAlarmEnabled) {
            breakIndicator.classList.add('hidden');
            return;
        }

        // If a break is currently active, let the countdown interval manage the indicator
        if (activeBreakEnd) return;

        const schedule = getOperatorSchedule();
        if (!schedule) {
            breakIndicator.classList.add('hidden');
            return;
        }

        breakIndicator.classList.remove('hidden');
        const now = new Date();
        const dayOfWeek = now.getDay();

        // Franco day
        if (schedule.francos.includes(dayOfWeek)) {
            breakIndicator.className = 'break-indicator franco';
            breakIndicator.innerHTML = '🏖️ Día de franco — sin breaks';
            return;
        }

        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        // Find next break
        let nextBreak = null;
        let nextBreakIndex = -1;
        for (let i = 0; i < schedule.breaks.length; i++) {
            const [bh, bm] = schedule.breaks[i].split(':').map(Number);
            const breakMinutes = bh * 60 + bm;
            if (currentMinutes < breakMinutes) {
                nextBreak = schedule.breaks[i];
                nextBreakIndex = i + 1;
                break;
            }
        }

        if (nextBreak) {
            // There is a future break today
            const [bh, bm] = nextBreak.split(':').map(Number);
            const diffMin = (bh * 60 + bm) - currentMinutes;
            const label = diffMin <= 30
                ? `☕ Break ${nextBreakIndex} en ${diffMin} min (${nextBreak})`
                : `☕ Próximo Break: ${nextBreak}`;
            breakIndicator.className = 'break-indicator active';
            breakIndicator.innerHTML = label;
        } else {
            // All breaks passed
            breakIndicator.className = 'break-indicator done';
            breakIndicator.innerHTML = '✅ Breaks completados por hoy';
        }
    }

    function showBreakAlert(breakNum, breakTime) {
        if (!breakOverlay) return;

        // Play beep
        playBreakBeep();

        // Set content
        if (breakOperatorName) {
            breakOperatorName.textContent = `${operatorName} — Break ${breakNum}`;
        }

        if (breakCountdown) {
            breakCountdown.textContent = '15:00';
        }

        // Show overlay
        breakOverlay.classList.remove('hidden');
    }

    function startBreakCountdown() {
        if (breakCountdownInterval) clearInterval(breakCountdownInterval);

        activeBreakEnd = new Date();
        activeBreakEnd.setMinutes(activeBreakEnd.getMinutes() + 15);

        function updateCountdown() {
            if (!activeBreakEnd) return;

            const now = new Date();
            let diff = Math.max(0, Math.floor((activeBreakEnd - now) / 1000));
            const mm = String(Math.floor(diff / 60)).padStart(2, '0');
            const ss = String(diff % 60).padStart(2, '0');

            if (breakIndicator) {
                breakIndicator.className = 'break-indicator active';
                breakIndicator.innerHTML = `⏳ Break termina en ${mm}:${ss}`;
            }

            if (diff <= 0) {
                clearInterval(breakCountdownInterval);
                activeBreakEnd = null;

                // Play end of break alarm
                playEndOfBreakBeep();

                // Revert indicator back to next break
                updateNextBreakIndicator();
            }
        }

        updateCountdown();
        breakCountdownInterval = setInterval(updateCountdown, 1000);
    }

    function dismissBreakAlert() {
        if (breakOverlay) breakOverlay.classList.add('hidden');
        // Start the actual countdown ONLY when the user dismisses the alert
        startBreakCountdown();
    }

    function playEndOfBreakBeep() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const frequencies = [1100, 880, 660, 440]; // 4 descending tones for "back to work"

            frequencies.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'square'; // harsher tone to wake up
                osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.25);
                gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.25);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.25 + 0.23);

                osc.start(ctx.currentTime + i * 0.25);
                osc.stop(ctx.currentTime + i * 0.25 + 0.25);
            });

            setTimeout(() => ctx.close(), 1500);
        } catch (e) { }
    }

    function playBreakBeep() {
        try {
            const breakAudio = new Audio('assets/Gallo%20delay.mp3');
            breakAudio.volume = 0.3;
            breakAudio.play().then(() => {
                setTimeout(() => {
                    breakAudio.pause();
                    breakAudio.currentTime = 0;
                }, 7000);
            }).catch(e => console.warn('No se pudo reproducir el audio de break', e));
        } catch (e) {
            console.error('Error al reproducir audio de break', e);
        }
    }

    // Expose break functions for console testing
    window.showBreakAlert = showBreakAlert;
    window.playBreakBeep = playBreakBeep;

    // ============================================
    // Feature: Compact Mode (Split Screen)
    // ============================================
    function initCompactMode() {
        const isCompact = localStorage.getItem(COMPACT_KEY) === 'true';
        if (isCompact) {
            document.documentElement.classList.add('compact-mode');
        }
        updateCompactButton(isCompact);

        if (btnToggleCompact) {
            btnToggleCompact.addEventListener('click', toggleCompactMode);
        }
    }

    function toggleCompactMode() {
        const isCompact = document.documentElement.classList.toggle('compact-mode');
        localStorage.setItem(COMPACT_KEY, isCompact);
        updateCompactButton(isCompact);
        showToast(isCompact ? 'Modo Compacto activado' : 'Modo Estándar activado', 'info');
    }

    function updateCompactButton(isCompact) {
        if (btnToggleCompact) {
            btnToggleCompact.innerHTML = isCompact ? '<i data-lucide="maximize-2"></i>' : '<i data-lucide="minimize-2"></i>';
            btnToggleCompact.title = isCompact ? 'Salir de Modo Compacto (Alt+M)' : 'Activar Modo Compacto (Alt+M)';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }

    // ============================================
    // Feature: Shortcuts Modal
    // ============================================
    function initShortcutsModal() {
        if (btnShortcutsHelp && shortcutsModal) {
            btnShortcutsHelp.addEventListener('click', () => {
                shortcutsModal.classList.remove('hidden');
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        }
        if (btnCloseShortcuts && shortcutsModal) {
            btnCloseShortcuts.addEventListener('click', () => {
                shortcutsModal.classList.add('hidden');
            });
        }
        if (shortcutsModal) {
            shortcutsModal.addEventListener('click', (e) => {
                if (e.target === shortcutsModal) {
                    shortcutsModal.classList.add('hidden');
                }
            });
        }
    }

    // ============================================
    // Feature: Category Filter Chips
    // ============================================
    function initCategoryFilterChips() {
        if (historyChips) {
            historyChips.querySelectorAll('.history-chip').forEach(chip => {
                chip.addEventListener('click', () => {
                    historyChips.querySelectorAll('.history-chip').forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    if (filterCategory) {
                        filterCategory.value = chip.dataset.cat;
                    }
                    renderHistory();
                });
            });
        }

        if (filterCategory) {
            filterCategory.addEventListener('change', () => {
                if (historyChips) {
                    historyChips.querySelectorAll('.history-chip').forEach(c => {
                        c.classList.toggle('active', c.dataset.cat === filterCategory.value);
                    });
                }
                renderHistory();
            });
        }
    }

    function updateCategoryChipCounts() {
        const counts = {
            '': gestiones.length,
            'INTERNET': 0,
            'TELEFONIA': 0,
            'TELEVISIÓN': 0,
            'WEB / APP': 0,
            'ESCALAMIENTO N3': 0,
            'GESTIONES ESPECIALES': 0,
            'WIFI MESH': 0
        };

        gestiones.forEach(g => {
            const cat = getCategory(g.tipo_ra);
            if (cat in counts) {
                counts[cat]++;
            } else if (cat === 'TELEF RESID') {
                counts['TELEFONIA'] = (counts['TELEFONIA'] || 0) + 1;
            }
        });

        const cntAll = document.getElementById('chip-cnt-all');
        if (cntAll) cntAll.textContent = counts[''];
        const cntInternet = document.getElementById('chip-cnt-internet');
        if (cntInternet) cntInternet.textContent = counts['INTERNET'] || 0;
        const cntTelef = document.getElementById('chip-cnt-telefonia');
        if (cntTelef) cntTelef.textContent = counts['TELEFONIA'] || 0;
        const cntTv = document.getElementById('chip-cnt-tv');
        if (cntTv) cntTv.textContent = counts['TELEVISIÓN'] || 0;
        const cntWeb = document.getElementById('chip-cnt-webapp');
        if (cntWeb) cntWeb.textContent = counts['WEB / APP'] || 0;
        const cntN3 = document.getElementById('chip-cnt-n3');
        if (cntN3) cntN3.textContent = counts['ESCALAMIENTO N3'] || 0;
        const cntEsp = document.getElementById('chip-cnt-especiales');
        if (cntEsp) cntEsp.textContent = counts['GESTIONES ESPECIALES'] || 0;
        const cntMesh = document.getElementById('chip-cnt-mesh');
        if (cntMesh) cntMesh.textContent = counts['WIFI MESH'] || 0;
    }

    // ============================================
    // Feature: Smart Paste (Pegado Inteligente)
    // ============================================
    function initSmartPaste() {
        if (btnSmartPaste) {
            btnSmartPaste.addEventListener('click', handleSmartPaste);
        }
    }

    async function handleSmartPaste() {
        try {
            let text = '';
            if (navigator.clipboard && navigator.clipboard.readText) {
                try {
                    text = await navigator.clipboard.readText();
                } catch {
                    text = prompt('Pegá aquí el texto copiado del CRM o correo:');
                }
            } else {
                text = prompt('Pegá aquí el texto copiado del CRM o correo:');
            }

            if (!text || !text.trim()) return;

            let detected = 0;

            // 1. Reclamo Administrativo ID (RA)
            const raIdMatch = text.match(/(?:reclamo\s*administrativo\s*id|ra\s*id|id\s*ra|ra\s*n[°o]?)[:=\s#]+([0-9]+)/i);
            let detectedRaId = null;
            if (raIdMatch && raIdMatch[1]) {
                detectedRaId = raIdMatch[1];
                if (reiteradoRaId) {
                    reiteradoRaId.value = detectedRaId;
                    updateSinContactoTemplate();
                }
                detected++;
            }

            // 2. Cliente / Cuenta (soporta explícito y números de 5 a 10 dígitos)
            let clienteVal = null;
            const explicitCliente = text.match(/(?:id\s*cliente|n[°o]?\s*cliente|cliente\s*id|cuenta\s*id|cta\s*id|n[°o]?\s*cuenta|n[°o]?\s*cta)[:=\s#]+([0-9A-Za-z_-]+)/i);
            if (explicitCliente && explicitCliente[1]) {
                clienteVal = explicitCliente[1];
            } else {
                const generalMatch = text.match(/(?:cliente|cta|cuenta|id|asunto)?[:=\s#]*\b([0-9]{5,10})\b/i);
                if (generalMatch && generalMatch[1] && generalMatch[1] !== detectedRaId) {
                    clienteVal = generalMatch[1];
                }
            }
            if (clienteVal && inputCliente) {
                inputCliente.value = clienteVal;
                detected++;
            }

            // 3. Recurrencia / Reiterado
            const recurrenciaMatch = text.match(/(?:recurrencia\s*detectada|reiterad[oa]s?|recurrencia)[^\n]*?(?:total[:=\s]*([0-9]+))?/i);
            let recurrenciaTotal = null;
            if (recurrenciaMatch) {
                if (recurrenciaMatch[1]) {
                    recurrenciaTotal = parseInt(recurrenciaMatch[1], 10);
                } else {
                    const totalMatch = text.match(/total[:=\s]*([0-9]+)/i);
                    if (totalMatch) recurrenciaTotal = parseInt(totalMatch[1], 10);
                }

                if (chkReiterado) {
                    chkReiterado.checked = true;
                    chkReiterado.dispatchEvent(new Event('change'));
                }

                if (badgeRecurrencia) {
                    badgeRecurrencia.innerHTML = recurrenciaTotal
                        ? `<i data-lucide="repeat"></i> Recurrencia (${recurrenciaTotal})`
                        : `<i data-lucide="repeat"></i> Recurrencia detectada`;
                    badgeRecurrencia.classList.remove('hidden');
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }
                detected++;
            }

            // 4. MACs (CM, ONT, DECO)
            const macRegex = /\b([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})\b/g;
            const macMatches = [...text.matchAll(macRegex)].map(m => m[1]);

            function formatMac(raw) {
                const clean = raw.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
                if (clean.length === 12) {
                    return clean.match(/.{1,2}/g).join(':');
                }
                return raw.toUpperCase();
            }

            const cmMatch = text.match(/(?:cm|cablemodem|cable\s*modem|modem)\s*(?:mac)?[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})/i);
            const ontMatch = text.match(/(?:ont|gpon|fibra)\s*(?:mac)?[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})/i);
            const decoMatch = text.match(/(?:deco|stb|box)\s*(?:mac)?[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})/i);

            let hasEquipment = false;

            if (cmMatch && macCm) {
                macCm.value = formatMac(cmMatch[1]);
                macCm.dispatchEvent(new Event('input'));
                hasEquipment = true;
                detected++;
            } else if (macMatches.length > 0 && macCm && !macCm.value) {
                macCm.value = formatMac(macMatches[0]);
                macCm.dispatchEvent(new Event('input'));
                hasEquipment = true;
                detected++;
            }

            if (ontMatch && macOnt) {
                macOnt.value = formatMac(ontMatch[1]);
                hasEquipment = true;
                detected++;
            }

            if (decoMatch) {
                const firstDeco = document.querySelector('.deco-input');
                if (firstDeco) {
                    firstDeco.value = formatMac(decoMatch[1]);
                    hasEquipment = true;
                    detected++;
                }
            }

            // 5. Teléfono / Línea
            const telMatch = text.match(/(?:tel|linea|telefono|celular|movil)?[:=\s]*\b(11[0-9]{8}|[2-9][0-9]{9})\b/i);
            if (telMatch && lineaTel) {
                lineaTel.value = telMatch[1];
                hasEquipment = true;
                detected++;
            }

            // 6. SN (Serial Number)
            const snMatch = text.match(/(?:sn|serial|serie)?[:=\s]*\b((?:GZ|gz)[0-9A-Za-z]+)\b/i);
            if (snMatch && inputSn) {
                inputSn.value = snMatch[1].toUpperCase();
                detected++;
            }

            // 7. Tipo de Gestión / RA / Reclamo (Clasificación inteligente con jerarquía de campos)
            if (selectRa) {
                const subMatch = text.match(/(?:subclasificaci[oó]n|subcategoria)[:=\s]+([^\n\r]+)/i);
                const clasifMatch = text.match(/(?:clasificaci[oó]n|categoria)[:=\s]+([^\n\r]+)/i);
                const headerMatch = text.match(/^([^\n\r]+)(?:\n[^\n\r]+)?(?=\s*informaci[oó]n\s*del\s*ra)/i);

                const norm = (s) => s.toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-z0-9]/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();

                const allRaOptions = Array.from(selectRa.querySelectorAll('option'))
                    .filter(opt => opt.value && !opt.disabled)
                    .map(opt => opt.value);

                function scoreMatch(candidate) {
                    if (!candidate) return null;
                    const normCand = norm(candidate);
                    let bestOpt = null;
                    let maxLen = 0;

                    for (const optVal of allRaOptions) {
                        const normOpt = norm(optVal);
                        if (normCand.includes(normOpt) && normOpt.length > maxLen) {
                            bestOpt = optVal;
                            maxLen = normOpt.length;
                        }

                        const corePhrase = optVal
                            .replace(/^NOC\s*-\s*(INTERNET|BANDA ANCHA|TELEFONIA|TELEF RESID|TELEVISIÓN|TELEVISION|WIFI MESH|APLICACIONES)\s*-\s*/i, '')
                            .replace(/^(Web\/App|App Mobile)\s*-\s*/i, '');
                        const normCore = norm(corePhrase);

                        if (normCore.length >= 3 && normCand.includes(normCore) && normCore.length > maxLen) {
                            bestOpt = optVal;
                            maxLen = normCore.length;
                        }
                    }
                    return bestOpt;
                }

                let matchedRa = null;
                if (subMatch) matchedRa = scoreMatch(subMatch[1]);
                if (!matchedRa && headerMatch) matchedRa = scoreMatch(headerMatch[1]);
                if (!matchedRa && clasifMatch) matchedRa = scoreMatch(clasifMatch[1] + (subMatch ? ' ' + subMatch[1] : ''));
                if (!matchedRa) {
                    const textWithoutObs = text.replace(/(?:observaciones|obs|detalles|detalle|nota|comentarios)[:=\s]*\n?[\s\S]*?(?=(?:\n\s*(?:id\s*cliente|cliente|usuario|clasificaci[oó]n|subclasificaci[oó]n|recurrencia|reclamo\s*administrativo|informaci[oó]n\s*del\s*ra)\b|$))/i, '');
                    matchedRa = scoreMatch(textWithoutObs) || scoreMatch(text);
                }

                if (matchedRa) {
                    selectRa.value = matchedRa;
                    selectRa.dispatchEvent(new Event('change'));
                    detected++;

                    const raSearch = document.querySelector('.ra-search-wrapper input');
                    if (raSearch) raSearch.value = '';
                }
            }

            // 8. Datos del Reclamo (captura completa del bloque multi-línea)
            const obsMatch = text.match(/(?:observaciones|obs|detalles|detalle|nota|comentarios)[:=\s]*\n?([\s\S]*?)(?=(?:\n\s*(?:id\s*cliente|cliente|usuario|clasificaci[oó]n|subclasificaci[oó]n|recurrencia|reclamo\s*administrativo|informaci[oó]n\s*del\s*ra)\b|$))/i);
            if (obsMatch && obsMatch[1] && inputReclamoTexto) {
                const cleanObs = obsMatch[1].trim();
                if (cleanObs.length > 2) {
                    inputReclamoTexto.value = cleanObs;
                    detected++;
                }
            }

            if (hasEquipment && toolsAccordion) {
                toolsAccordion.open = true;
            }

            if (detected > 0) {
                const recMsg = recurrenciaTotal ? ` (Recurrencia: ${recurrenciaTotal})` : '';
                showToast(`✨ Pegado Inteligente: ${detected} campo(s) detectado(s)${recMsg}`, 'success');
                if (reclamoAccordion) reclamoAccordion.open = true;
                if (inputReclamoTexto && inputReclamoTexto.value.trim() && selectRa && selectRa.value) {
                    renderAiAudit(true);
                }
            } else {
                if (inputCliente && !inputCliente.value) {
                    inputCliente.value = text.trim().substring(0, 40);
                } else if (inputReclamoTexto) {
                    inputReclamoTexto.value = (inputReclamoTexto.value ? inputReclamoTexto.value + '\n' : '') + text.trim();
                    if (reclamoAccordion) reclamoAccordion.open = true;
                } else if (inputObservaciones) {
                    inputObservaciones.value = (inputObservaciones.value ? inputObservaciones.value + ' | ' : '') + text.trim();
                }
                showToast('Texto pegado en el formulario', 'info');
            }
        } catch (err) {
            console.error('Smart paste error:', err);
            showToast('No se pudo acceder al portapapeles', 'error');
        }
    }

    // ============================================
    // Feature: AI Claim Audit & Template Engine
    // ============================================
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function isPasswordEvaded(rawPass) {
        if (!rawPass || !rawPass.trim()) return true;
        const clean = rawPass.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (/^(?:-+|\.+|\?+|n\/?a|no|none|null|undefined|falta|ningun[ao])$/i.test(clean)) return true;
        if (/(?:no\s*(?:la\s*)?(?:brinda|dice|sabe|pasa|tiene|posee|recuerda|quiere|da|informa)|cliente\s*no\s*(?:brinda|dice|sabe|recuerda|tiene)|se\s*niega|vaci[ao]|faltante|sin\s*(?:contrasena|clave|pass|password)|desconoce|\bfalta\b|\bningun[ao]\b)/i.test(clean)) return true;
        return false;
    }

    // ============================================
    // Content Coherence Validation Engine
    // ============================================
    // Validates that extracted field values are semantically valid
    // (e.g., a MAC is hexadecimal, a URL is a real host, etc.)
    function validateContentCoherence(fieldId, value, coherenceType) {
        if (!value || !value.trim()) return null;
        const clean = value.trim();

        switch (coherenceType) {
            case 'mac': {
                // MAC must be 12 hex chars (with or without separators : - .)
                const macClean = clean.replace(/[:\-.\s]/g, '');
                if (!/^[0-9A-Fa-f]{12}$/.test(macClean)) {
                    return {
                        valid: false,
                        label: `MAC inválida: "${clean}"`,
                        desc: `El valor "${clean}" no es una dirección MAC válida. Debe ser 12 caracteres hexadecimales (0-9, A-F), ej: AA:BB:CC:DD:EE:FF o AABBCCDDEEFF.`
                    };
                }
                return { valid: true };
            }

            case 'mac_multiple': {
                // Can contain multiple MACs or "ninguna mac"
                if (/ninguna\s*mac/i.test(clean)) return { valid: true };
                const macMatches = clean.match(/[0-9A-Fa-f]{2}[:\-][0-9A-Fa-f]{2}[:\-][0-9A-Fa-f]{2}[:\-][0-9A-Fa-f]{2}[:\-][0-9A-Fa-f]{2}[:\-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12}/gi);
                if (!macMatches || macMatches.length === 0) {
                    // Check if the text at least references MAC concepts
                    if (/mac|[0-9A-Fa-f]{6,}/i.test(clean)) return { valid: true };
                    return {
                        valid: false,
                        label: `MACs no detectadas en: "${clean.substring(0, 50)}..."`,
                        desc: `No se encontraron direcciones MAC válidas (12 hex: AA:BB:CC:DD:EE:FF). Si no hay equipos, indicar "Ninguna Mac".`
                    };
                }
                // Validate each found MAC
                for (const m of macMatches) {
                    const hex = m.replace(/[:\-.\s]/g, '');
                    if (hex.length !== 12) {
                        return {
                            valid: false,
                            label: `MAC con longitud incorrecta: "${m}"`,
                            desc: `La MAC "${m}" no tiene los 12 caracteres hexadecimales obligatorios.`
                        };
                    }
                }
                return { valid: true };
            }

            case 'host_url': {
                // Must be a valid URL, domain, IP, or at least look like a destination
                // Reject obvious garbage like single words without dots, or greetings
                const lc = clean.toLowerCase();
                if (/^(hola|chau|si|no|ok|test|nada|todo|ayuda|gracias|buenas|porfa|favor|ninguno|varios|muchos)$/i.test(lc)) {
                    return {
                        valid: false,
                        label: `Destino inválido: "${clean}"`,
                        desc: `"${clean}" no es un host, dominio, URL o dirección IP válida para testear acceso. Debe ser algo como: google.com, 8.8.8.8, https://example.com, etc.`
                    };
                }
                // Check if it looks like a domain, URL, or IP
                const isUrl = /^https?:\/\//i.test(clean);
                const isDomain = /^[a-zA-Z0-9][a-zA-Z0-9\-]*\.[a-zA-Z]{2,}/i.test(clean);
                const isIp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(clean);
                const containsDomain = /[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}/.test(clean);
                const containsIp = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(clean);
                // Also accept descriptive destinations like "camaras IP", "servidor NAS"
                const isDescriptive = /c[aá]mara|servidor|server|nvr|dvr|nas|impresora|printer|iot|smart\s*home|domotica|camara\s*ip/i.test(clean);

                if (!isUrl && !isDomain && !isIp && !containsDomain && !containsIp && !isDescriptive) {
                    // If it's a short string without any resemblance to a host
                    if (clean.length < 4 || !/[.\/:0-9]/.test(clean)) {
                        return {
                            valid: false,
                            label: `Destino dudoso: "${clean}"`,
                            desc: `"${clean}" no parece ser un destino de red válido (URL, dominio o IP). Ejemplos válidos: google.com, 192.168.1.1, https://sitio.com, cámara IP Hikvision, etc.`
                        };
                    }
                }
                return { valid: true };
            }

            case 'ip_v4': {
                // Must be a valid IPv4 address
                const ipMatch = clean.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
                if (!ipMatch) {
                    return {
                        valid: false,
                        label: `IP inválida: "${clean}"`,
                        desc: `No se encontró una dirección IPv4 válida en "${clean}". Formato esperado: X.X.X.X (ej: 192.168.0.10).`
                    };
                }
                const parts = ipMatch[1].split('.').map(Number);
                if (parts.some(p => p > 255)) {
                    return {
                        valid: false,
                        label: `IP fuera de rango: "${ipMatch[1]}"`,
                        desc: `La IP "${ipMatch[1]}" tiene octetos fuera del rango 0-255.`
                    };
                }
                return { valid: true };
            }

            case 'port_number': {
                // Must be a port number 1-65535
                const portNum = parseInt(clean.replace(/[^\d]/g, ''), 10);
                if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
                    return {
                        valid: false,
                        label: `Puerto inválido: "${clean}"`,
                        desc: `"${clean}" no es un número de puerto válido. Los puertos van de 1 a 65535.`
                    };
                }
                return { valid: true };
            }

            case 'error_code': {
                // Should contain an error code, message, or description, not just "no funciona"
                if (/^\s*(no|si|nada|todo|ok|bien|mal)\s*$/i.test(clean)) {
                    return {
                        valid: false,
                        label: `Error poco descriptivo: "${clean}"`,
                        desc: `"${clean}" no describe un error específico. Debe incluir el código de error, mensaje en pantalla, o una descripción clara de la falla (ej: "error 404", "pantalla en negro", "no carga login", etc.).`
                    };
                }
                return { valid: true };
            }

            case 'soporte_brindado': {
                // Should describe actual support steps, not just "si" or "no"
                if (/^\s*(si|no|ok|nada)\s*$/i.test(clean)) {
                    return {
                        valid: false,
                        label: `Soporte poco detallado: "${clean}"`,
                        desc: `"${clean}" no describe el soporte brindado. Debe detallar las acciones realizadas (refresco CRM, batch I3, reseteo manual deco, reseteo de fábrica, reseteo CM/ONT, etc.).`
                    };
                }
                return { valid: true };
            }

            case 'velocidad': {
                // Should contain a numeric speed value
                if (!/\d/.test(clean)) {
                    return {
                        valid: false,
                        label: `Velocidad sin valor numérico: "${clean}"`,
                        desc: `"${clean}" no contiene un valor de velocidad medible (ej: "150 Mbps", "50 megas por WiFi", etc.).`
                    };
                }
                return { valid: true };
            }

            case 'canal_tv': {
                // Should mention specific channels, IDs, or "todos"
                if (/^\s*(si|no|ok|nada|hola)\s*$/i.test(clean)) {
                    return {
                        valid: false,
                        label: `Canales no especificados: "${clean}"`,
                        desc: `"${clean}" no identifica canales. Debe especificar cuáles (ej: "canal 5, 10, 30" o "todos los canales con placa ID121").`
                    };
                }
                return { valid: true };
            }

            default:
                return { valid: true };
        }
    }

    const NETWORK_INCOHERENCE_RULES = [
        {
            id: 'ip_publica_fija',
            label: 'IP Pública Estática / Fija en Conexión Residencial',
            regex: /(?:ip\s*fija|ip\s*est[aá]tica|ip\s*publica\s*fija|ip\s*publica\s*est[aá]tica|fijar\s*ip\s*p[uú]blica|reserva\s*de\s*ip\s*p[uú]blica|pool\s*de\s*ips?\s*p[uú]blicas?|subnet\s*p[uú]blica|ip\s*fija\s*en\s*(?:wan|cpe|modem|router))/i,
            motivo: 'IP Pública Estática / Fija en Conexión Residencial DHCP/CGNAT',
            technicalReason: 'El servicio masivo residencial sobre DOCSIS 3.1 y GPON opera exclusivamente con direccionamiento WAN dinámico por DHCP o pool CGNAT (100.64.0.0/10). El firmware Sagemcom residencial no cuenta con soporte ni aprovisionamiento de IP pública fija. La asignación de direccionamiento estático público requiere un servicio Corporativo / Empresas con ruteo dedicado en Core.',
            rejectionAdvice: 'Corresponde rechazar el RA y devolver a Front. Informar al cliente que su abono es residencial dinámico y que para IP pública estática debe ser derivado a ventas Corporativas / Empresas.'
        },
        {
            id: 'velocidad_imposible_24',
            label: 'Velocidad Imposible por Límite Físico de Espectro WiFi 2.4 GHz',
            regex: /(?:(?:[3-9]\d{2}|1000)\s*(?:mbps?|megas?)\s*(?:en|por|con)\s*(?:wifi\s*)?2\.4|(?:no\s*llega\s*a\s*(?:[2-9]\d{2}|1000)\s*(?:mbps?|megas?)|exige\s*(?:[2-9]\d{2}|1000)\s*(?:mbps?|megas?))\s*(?:en|por|con)\s*(?:wifi\s*)?2\.4|2\.4\s*ghz[^\n\.\+]*?(?:[3-9]\d{2}|1000)\s*(?:mbps?|megas?))/i,
            motivo: 'Velocidad Imposible por Límite Físico de Espectro WiFi 2.4 GHz (802.11n)',
            technicalReason: 'La banda de 2.4 GHz (802.11n) posee una limitación física en 20 MHz que en entornos residenciales urbanos saturados rinde entre 40 y 70 Mbps reales. Es técnicamente imposible alcanzar 300, 500 o 1000 Mbps por WiFi 2.4 GHz. La velocidad contratada se valida únicamente por cable de red Ethernet CAT 5e/6 conectado a puerto Gigabit o por red WiFi 5 GHz / 6 GHz (802.11ac/ax) a corta distancia.',
            rejectionAdvice: 'Corresponde rechazar el RA. Reclamar velocidad superior a 100 Mbps sobre WiFi 2.4 GHz no constituye una falla de red. Asesorar al cliente a conectar a la red 5.8 GHz (SSID_5G) o por cable directo.'
        },
        {
            id: 'vpn_server_cpe',
            label: 'Servidor VPN dentro de CPE Residencial Sagemcom',
            regex: /(?:(?:servidor|server)\s*vpn|montar\s*(?:openvpn|wireguard|ipsec|vpn)\s*en\s*(?:el\s*)?(?:sagemcom|modem|cpe|ont|router)|instalar\s*(?:openvpn|wireguard|vpn)\s*en\s*(?:el\s*)?(?:sagemcom|modem|ont))/i,
            motivo: 'Servidor VPN en Firmware de CPE Residencial Sagemcom',
            technicalReason: 'Los Sagemcom DOCSIS 3.1 y ONT GPON residenciales incorporan únicamente la función de VPN Passthrough (dejar pasar tráfico VPN hacia un equipo en la LAN). Su firmware no cuenta con servidor VPN integrado (ni OpenVPN ni WireGuard) ni permite ejecutar daemons VPN.',
            rejectionAdvice: 'Corresponde rechazar el RA. El módem ya posee VPN Passthrough activo. El cliente debe montar el servidor VPN en su propio host local (PC/Servidor/NAS) o en su router personal en LAN.'
        },
        {
            id: 'routing_corporativo',
            label: 'Protocolos de Enrutamiento Corporativo (BGP/OSPF/MPLS/VLAN)',
            regex: /(?:configurar\s*(?:bgp|ospf|mpls|rip|t[uú]nel\s*gre)|enrutamiento\s*din[aá]mico|ruteo\s*din[aá]mico|vlan\s*tagging\s*802\.1q\s*en\s*puertos?\s*lan|trunk\s*802\.1q\s*en\s*lan|multiples\s*subredes\s*wan)/i,
            motivo: 'Protocolo de Enrutamiento Corporativo / VLAN Trunking Fuera de Alcance de GUI Sagemcom',
            technicalReason: 'Los Sagemcom son Gateway Home NAT residenciales. No soportan protocolos de enrutamiento dinámico (BGP, OSPF, MPLS) ni configuración de puertos LAN en modo Trunk 802.1Q desde su interfaz web.',
            rejectionAdvice: 'Corresponde rechazar el RA. Estas funciones corresponden a enlaces corporativos dedicados.'
        },
        {
            id: 'acceso_root_firmware',
            label: 'Acceso Root / SSH / Flasheo de Firmware Custom',
            regex: /(?:habilitar\s*(?:ssh|telnet)|acceso\s*(?:root|consola|shell|terminal)\s*(?:al|del|en)\s*(?:sagemcom|modem|ont|cpe)|flashear\s*(?:openwrt|dd-wrt|firmware\s*custom)|modificar\s*firmware\s*del\s*(?:cm|ont|sagemcom))/i,
            motivo: 'Petición de Acceso Root / SSH / Flasheo de Firmware Inviolable',
            technicalReason: 'El firmware de los Sagemcom está firmado criptográficamente y los servicios SSH/Telnet están estrictamente aislados en la VLAN de gestión interna del ISP. La GUI no expone consola shell ni permite flasheo de terceros.',
            rejectionAdvice: 'Corresponde rechazar el RA de inmediato por políticas de seguridad de planta externa y resguardo de la red del ISP.'
        },
        {
            id: 'puertos_bloqueados_cgnat',
            label: 'Puertos Críticos Bloqueados o Apertura bajo CGNAT',
            regex: /(?:abrir\s*(?:puerto|puertos)\s*(?:25|53|80|443|135|137|138|139|445|161|1900)\s*(?:en\s*wan|wan|hacia\s*afuera|entrante)|abrir\s*puertos\s*(?:estando|bajo)\s*cgnat)/i,
            motivo: 'Apertura de Puertos Bloqueados por Política de Seguridad ISP o bajo CGNAT',
            technicalReason: 'Puertos de infraestructura (25, 53, 80/443 WAN, 135-139, 445) están filtrados en la capa Core del ISP por seguridad perimetral anti-spam y anti-botnets. Además, bajo CGNAT (100.64.0.0/10) ningún puerto entrante es accesible sin salir previamente de CGNAT.',
            rejectionAdvice: 'Corresponde rechazar el RA. Si requiere apertura para cámaras con IP 100.64.x.x, primero debe tramitarse el reclamo de Salida de CGNAT / IP Pública Dinámica.'
        },
        {
            id: 'forwarding_ip_incompatible',
            label: 'Port Forwarding hacia IP fuera de Subred CPE (192.168.0.xxx)',
            regex: /(?:abrir\s*puertos?|apertura\s*(?:de\s*)?puertos?|port\s*forward(?:ing)?|redirecci[oó]n\s*(?:de\s*)?puertos?|mapeo\s*(?:de\s*)?puertos?)[^\n\.\+]*?(?:a\s*(?:la\s*)?(?:ip\s*)?|ip[:=\s]+|host[:=\s]+)(?!192\.168\.0\.)\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/i,
            motivo: 'Dirección IP de Port Forwarding Incompatible con Gateway CPE Sagemcom / ONT',
            technicalReason: 'Los Cablemódems DOCSIS 3.1 y ONTs GPON residenciales tienen su Gateway configurado en la subred 192.168.0.1/24. La regla de Port Forwarding en la GUI del CPE exige que la IP destino pertenezca obligatoriamente al segmento LAN local (192.168.0.xxx). No es técnicamente posible reenviar tráfico hacia otras subredes privadas (ej: 192.168.1.x, 10.x.x.x) ni hacia IPs públicas.',
            rejectionAdvice: 'Corresponde rechazar o rectificar el RA. Indicar que el dispositivo destino debe tener asignada una IP dentro del rango 192.168.0.xxx (ej: 192.168.0.100) acorde al gateway 192.168.0.1 del equipo.'
        },
        {
            id: 'simetrico_docsis',
            label: 'Velocidad Simétrica de Subida en Red Coaxial DOCSIS 3.1 HFC',
            regex: /(?:(?:[1-9]\d{2}|1000)\s*(?:mbps?|megas?)\s*(?:de\s*)?subida\s*en\s*(?:docsis|cablemodem|cm|coaxil|hfc)|(?:subida\s*sim[eé]trica|servicio\s*sim[eé]trico|igual\s*subida\s*que\s*bajada)\s*en\s*(?:docsis|cablemodem|cm|hfc)|exige\s*(?:[1-9]\d{2}|1000)\s*(?:mbps?|megas?)\s*upstream\s*(?:en\s*)?(?:docsis|cm))/i,
            motivo: 'Petición de Velocidad Simétrica en Red DOCSIS 3.1 HFC Residencial',
            technicalReason: 'La arquitectura HFC de DOCSIS 3.1 residencial es asimétrica por diseño de espectro de retorno, con velocidades de subida topes de entre 20 y 50 Mbps. Es físicamente inviable brindar 300 o 500 Mbps de subida sobre cablemódem residencial.',
            rejectionAdvice: 'Corresponde rechazar el RA. El servicio HFC es asimétrico por diseño de ingeniería.'
        },
        {
            id: 'parametros_rf_omci',
            label: 'Parámetros Físicos de RF DOCSIS / OMCI GPON Fuera de GUI',
            regex: /(?:cambiar\s*(?:frecuencia|canal\s*rf)\s*(?:de\s*)?(?:downstream|upstream)|cambiar\s*potencia\s*[oó]ptica\s*(?:ont|olt)|cambiar\s*longitud\s*de\s*onda\s*gpon|forzar\s*qam\s*(?:4096|1024|256)|modificar\s*(?:t-cont|gem\s*port)\s*gpon|cambiar\s*mtu\s*(?:de\s*la\s*fibra|de\s*la\s*red\s*externa)|cambiar\s*frecuencia\s*del\s*cmts)/i,
            motivo: 'Parámetros Físicos de RF DOCSIS / OMCI GPON Administrados Exclusivamente por CMTS/OLT',
            technicalReason: 'Frecuencias, niveles de potencia (dBmV/dBm), modulaciones QAM/OFDM, T-CONT y perfiles OMCI son aprovisionados y controlados exclusivamente por el CMTS / OLT a través de archivos de configuración de red. Son de sólo lectura o completamente inaccesibles en la GUI del Sagemcom.',
            rejectionAdvice: 'Corresponde rechazar el RA de configuración. Si el cliente experimenta niveles fuera de norma, debe generarse un RA técnico de planta externa, no de configuración en CPE.'
        },
        {
            id: 'bridge_en_deco_mesh',
            label: 'Modo Bridge en Dispositivo Terminal (Deco o Nodo Mesh)',
            regex: /(?:poner\s*en\s*bridge\s*(?:el|al)\s*(?:deco|decodificador|stb|extensor|mesh|nodo)|modo\s*bridge\s*en\s*(?:deco|decodificador|stb|extensor|mesh|nodo)|bridge\s*en\s*deco\s*iptv)/i,
            motivo: 'Petición de Modo Bridge en Dispositivo Terminal (Deco o Extensor Mesh)',
            technicalReason: 'Los decodificadores IPTV y los nodos mesh son clientes terminales de la LAN. Carecen de interfaz WAN puente. La función de Bridge aplica exclusivamente en el Cablemódem Sagemcom o la ONT principal.',
            rejectionAdvice: 'Corresponde rechazar el RA por incoherencia de topología de red. El modo bridge sólo puede configurarse en el equipo principal.'
        },
        {
            id: 'incompatibilidad_medios',
            label: 'Incompatibilidad de Medios Físicos (Fibra en Coaxil o Coaxil en ONT)',
            regex: /(?:conectar\s*fibra\s*en\s*cablemodem|conectar\s*cable\s*coaxil\s*en\s*ont\s*gpon|puerto\s*sfp\s*en\s*sagemcom\s*docsis)/i,
            motivo: 'Incompatibilidad de Medios Físicos de Conexión',
            technicalReason: 'Confusión física de tecnología entre infraestructura coaxial HFC y fibra óptica GPON.',
            rejectionAdvice: 'Corresponde rechazar el RA por incompatibilidad física de medios.'
        }
    ];

    function checkInternetNetworkSanity(text, tipoRa) {
        if (!text || !text.trim()) return null;
        const isNetworkClaim = /INTERNET|WIFI|BANDA ANCHA|CONFIGURACI[OÓ]N|ACCESO|INSUMOS/i.test(tipoRa || '') ||
            /sagemcom|modem|router|cpe|ont|cm|wifi|puertos?|ip|velocidad|bridge|vpn/i.test(text);

        if (!isNetworkClaim) return null;

        const found = NETWORK_INCOHERENCE_RULES.find(rule => rule.regex.test(text));
        return found || null;
    }

    const RA_AI_RULES = {
        // === ESCALAMIENTO N3 ===
        'Inconveniente con insumos': {
            usos: 'Diferencias de MAC entre CM, ONT, DECOS y/o Extensor en el domicilio del cliente y los insumos en CRM (CM, ONT, DECOS y/o Extensor)',
            plantilla: '[Problemática] + [Macs que posee el cliente] + [Mac registradas en CRM] + [Nombre + Teléfono]',
            items: [
                { id: 'problematica', label: 'Problemática detallada', critical: true, regex: /(?:problem[aá]tica|problema|inconveniente|falla|diferencia|motivo)[:=\s]*([^\n\]\+]+)/i },
                { id: 'macs_cliente', label: 'MACs que posee el cliente en domicilio', critical: true, coherenceType: 'mac_multiple', regex: /(?:macs?\s*(?:que\s*posee|cliente|en\s*domicilio|reales?|f[ií]sicas?))[:=\s]*([^\n\]\+]+)|(?:cm|ont|deco)?\s*mac[:=\s]*([0-9A-Fa-f:.-]{12,17})/i },
                { id: 'macs_crm', label: 'MACs registradas en CRM', critical: true, coherenceType: 'mac_multiple', regex: /(?:macs?\s*(?:registradas?\s*en\s*crm|crm|sistema))[:=\s]*([^\n\]\+]+)/i },
                { id: 'contacto', label: 'Nombre + Teléfono de contacto', critical: false, isContactInfo: true, regex: /(?:nombre|contacto|titular)[:=\s]*([^\n\]\+]+)|(?:tel[eé]fono|tel|cel|movil)[:=\s]*([0-9\s\-]{7,})/i }
            ]
        },
        'Reposición de Equipos CM/DD': {
            usos: 'Equipos robados, perdidos o quemados',
            plantilla: '[Problemática] + [Mac de equipos existentes en domicilio o Ninguna Mac] + [Nombre + Teléfono] + [Costo informado USD 100 Deco, USD 100 Modem, USD 100 Wifi Mesh, USD 200 Deco Alexa]',
            items: [
                { id: 'problematica', label: 'Problemática (robo, pérdida, quemado)', critical: true, regex: /(?:problem[aá]tica|motivo|robo|perdid[ao]|quemad[ao]|falla|siniestro)[:=\s]*([^\n\]\+]+)/i },
                { id: 'macs_existentes', label: 'MAC de equipos existentes o Ninguna Mac', critical: true, coherenceType: 'mac_multiple', regex: /(?:macs?\s*(?:existentes?|en\s*domicilio|domicilio|posee)|ninguna\s*mac)[:=\s]*([^\n\]\+]+)|([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})/i },
                { id: 'contacto', label: 'Nombre + Teléfono de contacto', critical: false, isContactInfo: true, regex: /(?:nombre|contacto|titular)[:=\s]*([^\n\]\+]+)|(?:tel[eé]fono|tel|cel|movil)[:=\s]*([0-9\s\-]{7,})/i },
                { id: 'costo_informado', label: 'Costo informado (USD 100 Deco/Modem/Mesh, USD 200 Alexa)', critical: true, regex: /(?:costo|precio|usd|dolares|arancel|informa\s*costo|costo\s*informado)/i }
            ]
        },
        'Escalamiento Teams': {
            usos: 'Cliente se comunica con casuística no contemplada en los procesos actuales y requiere intervención de un supervisor para su solución',
            plantilla: '[Nombre supervisor autorizante] + [Casuística / Motivo]',
            items: [
                { id: 'supervisor', label: 'Nombre supervisor autorizante', critical: true, regex: /(?:supervisor|autoriz[oó]|autorizante|autoriza|escalado\s*por)[:=\s]*([^\n\]\+]+)/i },
                { id: 'casuistica', label: 'Casuística no contemplada / Motivo', critical: true, regex: /(?:casu[ií]stica|motivo|detalle|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i }
            ]
        },

        // === INTERNET & WIFI MESH (Configuración & Acceso) ===
        'NOC - INTERNET - SOLICITUD DE CONFIGURACIÓN': {
            usos: 'Se requiera aplicar una configuración técnica viable en CPE (apertura de puertos con TCP/UDP/IP 192.168.0.xxx, cambio de service package, reaprovisionamiento, sacar morosidad, WiFi, bridge, etc.)',
            plantilla: 'Solicitud técnica viable: [Apertura de Puertos (Protocolo TCP/UDP, Puerto e IP Privada 192.168.0.xxx)] / [Cambiar Service Package] / [Reaprovisionar] / [Sacar Morosidad] / [WiFi] / [Bridge] / [Red PC/NAT]',
            isFlexibleConfig: true
        },
        'NOC - WIFI MESH - SOLICITUD DE CONFIGURACION': {
            usos: 'Se requiera aplicar una configuración técnica viable en CPE / Extensor (apertura de puertos con TCP/UDP/IP 192.168.0.xxx, cambio de service package, reaprovisionamiento, sacar morosidad, WiFi, bridge, etc.)',
            plantilla: 'Solicitud técnica viable: [Apertura de Puertos (Protocolo TCP/UDP, Puerto e IP Privada 192.168.0.xxx)] / [Cambiar Service Package] / [Reaprovisionar] / [Sacar Morosidad] / [WiFi] / [Bridge] / [Red PC/NAT]',
            isFlexibleConfig: true
        },
        'NOC - INTERNET - PROBLEMAS PARTICULARES DE ACCESO': {
            usos: 'Sin acceso a páginas particulares, cámara IP, problemas de navegación a determinados sitios',
            plantilla: '[Detallar a qué destino no puede acceder el cliente, si el problema es con cámaras detallar información del dispositivo]',
            items: [
                { id: 'destino', label: 'Destino, web o IP al que no puede acceder', critical: true, coherenceType: 'host_url', regex: /(?:destino|sitio|p[aá]gina|web|url|ip|puerto|dominio)[:=\s]*([^\n\]\+]+)|(?:https?:\/\/|\b(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i },
                { id: 'dispositivo_camara', label: 'Información del dispositivo (marca, modelo, app o cámara si aplica)', critical: false, regex: /(?:c[aá]mara|cam|dispositivo|marca|modelo|equipo)[:=\s]*([^\n\]\+]+)/i }
            ]
        },
        'NOC - WIFI MESH - PROBLEMAS PARTICULARES DE ACCESO': {
            usos: 'Sin acceso a páginas particulares, cámara IP, problemas de navegación a determinados sitios',
            plantilla: '[Detallar a qué destino no puede acceder el cliente, si el problema es con cámaras detallar información del dispositivo]',
            items: [
                { id: 'destino', label: 'Destino, web o IP al que no puede acceder', critical: true, coherenceType: 'host_url', regex: /(?:destino|sitio|p[aá]gina|web|url|ip|puerto|dominio)[:=\s]*([^\n\]\+]+)|(?:https?:\/\/|\b(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i },
                { id: 'dispositivo_camara', label: 'Información del dispositivo (marca, modelo o cámara si aplica)', critical: false, regex: /(?:c[aá]mara|cam|dispositivo|marca|modelo|equipo)[:=\s]*([^\n\]\+]+)/i }
            ]
        },

        // === WIFI MESH ===
        'NOC - WIFI MESH - SIN NAVEGACION': {
            usos: 'El cliente ve la red, logra conectarse pero no navega',
            plantilla: '[Uno o todos los dispositivos, si es 1 aclarar (MARCA, MODELO, MAC), en el caso que sea por ETH aclararlo]',
            items: [
                { id: 'alcance_disp', label: 'Aclaración de uno o todos los dispositivos', critical: true, regex: /(?:uno|todos|un\s*solo|todos\s*los\s*dispositivos|1\s*disp)/i },
                { id: 'datos_disp', label: 'Datos del dispositivo (Marca, Modelo, MAC) o conexión ETH', critical: true, regex: /(?:marca|modelo|mac|eth|ethernet|cableado)/i }
            ]
        },
        'NOC - WIFI MESH - LENTITUD EN NAVEGACION': {
            usos: 'El cliente percibe que le funciona lento, tardan en cargar páginas, no llega a la velocidad contratada, etc.',
            plantilla: '[Informar velocidades máximas alcanzadas, información del dispositivo de prueba, velocidad de enlace. ¿En qué sitios o APPs percibe lentitud?]',
            items: [
                { id: 'velocidad_max', label: 'Velocidades máximas alcanzadas (Mbps / Test)', critical: true, coherenceType: 'velocidad', regex: /(?:velocidad|megas|mbps|mb|speedtest|test|alcanzad[ao]|llega\s*a)[:=\s]*([0-9]+)/i },
                { id: 'disp_prueba', label: 'Dispositivo de prueba y velocidad de enlace', critical: true, regex: /(?:dispositivo|celular|pc|notebook|enlace|conexion)[:=\s]*([^\n\]\+]+)/i },
                { id: 'sitios_apps', label: 'Sitios o APPs donde percibe lentitud', critical: true, regex: /(?:sitios?|apps?|aplicaci[oó]n|en\s*qu[eé]|youtube|netflix|navegar)[:=\s]*([^\n\]\+]+)/i }
            ]
        },
        'NOC - WIFI MESH - CORTES INTERMITENTES': {
            usos: 'El cliente percibe cortes en el servicio, puede ser en un momento particular del día',
            plantilla: '[En qué momento del día los percibe, por cuánto tiempo lo percibe. ¿En un solo dispositivo o en todos? ¿En diferentes partes del hogar?]',
            items: [
                { id: 'momento_duracion', label: 'Momento del día y duración de los cortes', critical: true, regex: /(?:momento|horario|mañana|tarde|noche|duraci[oó]n|minutos|tiempo)[:=\s]*([^\n\]\+]+)/i },
                { id: 'dispositivos_afectados', label: '¿En un solo dispositivo o en todos?', critical: true, regex: /(?:uno|todos|un\s*solo|todos\s*los|dispositivos?)/i },
                { id: 'ubicacion_hogar', label: '¿En diferentes partes del hogar / cobertura?', critical: false, regex: /(?:partes?|habitaci[oó]n|living|dormitorio|hogar|casa|distancia|cerca|lejos)/i }
            ]
        },
        'NOC - WIFI MESH - WIFI - DISPOSITIVO NO CONECTA': {
            usos: 'Ve la red con su dispositivo pero no logra conectarse / autenticar',
            plantilla: '[Informar características del dispositivo (MARCA, MODELO, MAC)]',
            items: [
                { id: 'caract_disp', label: 'Características del dispositivo (Marca, Modelo, MAC)', critical: true, regex: /(?:marca|modelo|mac)[:=\s]*([^\n\]\+]+)|([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2})/i }
            ]
        },
        'NOC - WIFI MESH - WIFI - NO SE VISUALIZA RED': {
            usos: 'Ningún dispositivo del hogar ve la red wifi',
            plantilla: '[Informar características del dispositivo (MARCA, MODELO, MAC)]',
            items: [
                { id: 'caract_disp', label: 'Características del dispositivo probado (Marca, Modelo, MAC)', critical: true, regex: /(?:marca|modelo|mac)[:=\s]*([^\n\]\+]+)|([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2})/i }
            ]
        },

        // === TELEVISIÓN ===
        'NOC - TELEVISIÓN - SIN SUSCRIPCION': {
            usos: 'No ve los canales contratados',
            plantilla: '[Mac del equipo con problema] + [Canal/les o todos los canales con placa ID121] + [marca del equipo] + [Nombre y apellido de la persona que se contacta] + [Conciliacion OK, IQ Verde] (Constatar conectado a internet y deco encendido)',
            items: [
                { id: 'mac_equipo', label: 'MAC del equipo con problema', critical: true, coherenceType: 'mac', regex: /(?:mac|stb|deco)[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})/i },
                { id: 'canales_id121', label: 'Canales con placa ID121 o todos los canales', critical: true, coherenceType: 'canal_tv', regex: /(?:canales?|todos|id121|121|placa)[:=\s]*([^\n\]\+]+)/i },
                { id: 'marca_equipo', label: 'Marca del equipo', critical: true, regex: /(?:marca|zte|sagemcom|kaon|skyworth)[:=\s]*([^\n\]\+]+)/i },
                { id: 'contacto', label: 'Nombre y apellido de contacto', critical: false, isContactInfo: true, regex: /(?:nombre|titular|apellido|contacto)[:=\s]*([^\n\]\+]+)/i },
                { id: 'conciliacion', label: 'Conciliación OK, IQ Verde / Conectado y encendido', critical: true, regex: /(?:conciliaci[oó]n|iq\s*verde|conectado|encendido)/i }
            ]
        },
        'NOC - TELEVISIÓN - PIXELACION/FREEZE': {
            usos: 'El cliente percibe en 1 o varios canales pixelación o que la imagen se congela',
            plantilla: '[Mac del equipo con problema] + [Tel. de contacto] + [Horario de contacto] + [Problema] + [Soporte brindado: Refresco CRM (SI/NO), Batch I3 (SI/NO), Reseteo Manual del Deco (SI/NO), Reseteo de Fabrica (SI/NO), Reseteo de CM/ONT (SI/NO)]',
            items: [
                { id: 'mac_equipo', label: 'MAC del equipo con problema', critical: true, coherenceType: 'mac', regex: /(?:mac|stb|deco)[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})/i },
                { id: 'contacto', label: 'Teléfono y horario de contacto', critical: false, isContactInfo: true, regex: /(?:tel|telefono|celular|horario)[:=\s]*([^\n\]\+]+)/i },
                { id: 'problema', label: 'Detalle del problema (canales, pixelación, freeze)', critical: true, regex: /(?:pixelaci[oó]n|freeze|congel|canales?|problema)[:=\s]*([^\n\]\+]+)/i },
                { id: 'soporte_brindado', label: 'Soporte brindado (Refresco CRM, Batch I3, Reseteo Deco, Fabrica, CM/ONT)', critical: true, coherenceType: 'soporte_brindado', regex: /(?:soporte|refresco|batch|reseteo|reinicio)/i }
            ]
        },
        'NOC - TELEVISION - Internal Error/Error 310 o 410 sin Solución Online': {
            usos: 'Cuando el cliente visualiza alguno de los errores 310 o 410',
            plantilla: '[Mac del equipo con problema] + [APP con error]',
            items: [
                { id: 'mac_equipo', label: 'MAC del equipo con problema', critical: true, coherenceType: 'mac', regex: /(?:mac|stb|deco)[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})/i },
                { id: 'app_error', label: 'APP con error (310 / 410 / Internal Error)', critical: true, coherenceType: 'error_code', regex: /(?:app|aplicaci[oó]n|error\s*310|error\s*410|internal\s*error)[:=\s]*([^\n\]\+]+)/i }
            ]
        },
        'NOC - TELEVISIÓN - PANTALLA EN NEGRO': {
            usos: 'Si luego de brindar soporte o ante la reiteración del problema, el cliente continúa sin solución',
            plantilla: '[Mac del equipo con problema] + [Tel. de contacto] + [Soporte brindado: Refresco CRM (SI/NO), Reseteo Manual del Deco (SI/NO)]',
            items: [
                { id: 'mac_equipo', label: 'MAC del equipo con problema', critical: true, coherenceType: 'mac', regex: /(?:mac|stb|deco)[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})/i },
                { id: 'contacto', label: 'Teléfono de contacto', critical: false, isContactInfo: true, regex: /(?:tel|telefono|celular|contacto)[:=\s]*([0-9\s\-]+)/i },
                { id: 'soporte_brindado', label: 'Soporte brindado (Refresco CRM SI/NO, Reseteo Manual Deco SI/NO)', critical: true, coherenceType: 'soporte_brindado', regex: /(?:soporte|refresco|reseteo|reinicio)/i }
            ]
        },
        'NOC - APLICACIONES - DECO - DESAPARECEN APPS': {
            usos: 'Desaparecen aplicaciones en el decodificador',
            plantilla: '[Mac del equipo con problema] + [Apps que desaparecen] + [Soporte brindado]',
            items: [
                { id: 'mac_equipo', label: 'MAC del equipo con problema', critical: true, coherenceType: 'mac', regex: /(?:mac|stb|deco)[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})/i },
                { id: 'apps', label: 'Apps que desaparecen', critical: true, regex: /(?:app|apps|aplicaci[oó]n|desaparecen)[:=\s]*([^\n\]\+]+)/i }
            ]
        },

        // === TELEFONÍA ===
        'NOC - TELEFONIA - LLAMADAS SIN LLAMADAS ENTRANTES': {
            usos: 'Sondeos obligatorios para llamadas entrantes fallidas',
            plantilla: '[La linea existe en CRM, se reseteo CM, el que esta realizando la llamada esta marcando correctamente el numero de CRM, NO MOLESTAR deshabiltado, sin DESVIOS, volumen de timbrado funciona bien, probo otro terminal y RJ11, las pruebas se realizaron con terminal directo al CM] + [Día y horario aproximado]',
            items: [
                { id: 'linea_crm', label: 'Línea existe en CRM e I3', critical: true, regex: /(?:linea\s*existe|crm|i3)/i },
                { id: 'reseteo_cm', label: 'Se reinició / reseteó el CM', critical: true, regex: /(?:reseteo\s*cm|reinici[oó]\s*cm|reseteo|reinicio)/i },
                { id: 'marcacion_ok', label: 'Marcación correcta sin el 11', critical: true, regex: /(?:marcando|marcaci[oó]n|numero|sin\s*el\s*11)/i },
                { id: 'no_molestar_desvios', label: 'NO MOLESTAR deshabilitado y sin DESVÍOS', critical: true, regex: /(?:no\s*molestar|desv[ií]os)/i },
                { id: 'terminal_rj11_directo', label: 'Probó otro terminal/RJ11 y pruebas directo al CM', critical: true, regex: /(?:terminal|rj11|directo\s*al\s*cm|timbrado)/i }
            ]
        },
        'NOC - TELEFONIA - LLAMADAS SIN LLAMADAS SALIENTES': {
            usos: 'Sondeos obligatorios para llamadas salientes fallidas',
            plantilla: '[La linea existe en CRM, se reseteo CM, no tiene level que impida el llamado saliente, el terminal esta en modo TONO, Pausa interdigito ok, probo otro terminal y RJ11, las pruebas se realizaron con terminal directo al CM] [A celulares antepuso el 15][Para larga distancia detallar Código de país, ciudad y teléfono, si es fijo/cel/IVR]',
            items: [
                { id: 'linea_crm', label: 'Línea existe en CRM e I3 y se reseteó CM', critical: true, regex: /(?:linea\s*existe|crm|reseteo|reinici[oó])/i },
                { id: 'sin_level', label: 'Sin level de bloqueo activo', critical: true, regex: /(?:level|bloqueo|sin\s*level)/i },
                { id: 'modo_tono', label: 'Terminal en modo TONO (no pulso)', critical: true, regex: /(?:tono|modo\s*tono|pulso)/i },
                { id: 'pruebas_terminal', label: 'Pausa interdígito OK, probó otro terminal/RJ11 directo al CM', critical: true, regex: /(?:interd[ií]gito|rj11|directo\s*al\s*cm|terminal)/i },
                { id: 'antepuso_15_ld', label: 'A celulares antepuso 15 / LD código país/ciudad detallado', critical: false, regex: /(?:15|celulares?|larga\s*distancia|c[oó]digo)/i }
            ]
        },
        'NOC - TELEFONIA - LLAMADAS SIN TONO': {
            usos: 'Sondeos obligatorios cuando el cliente levanta y no hay tono',
            plantilla: '[No se escucha tono al levantar teléfono, existe la linea en CRM, se reinicio el CM, niveles óptimos en CRM/I3, terminal conectado correctamente en puerto especificado en I3/CRM, se probo con otro terminal y otro RJ11, se reseteo base del inalámbrico y se verificaron pilas en teléfono inalámbrico, Pruebas realizadas con terminal directo al CM.]',
            items: [
                { id: 'sin_tono', label: 'Constatado sin tono al levantar', critical: true, regex: /(?:sin\s*tono|no\s*(?:se\s*escucha\s*)?tono)/i },
                { id: 'linea_reseteo', label: 'Línea existe en CRM y CM reiniciado', critical: true, regex: /(?:linea|crm|reinici[oó]|reseteo)/i },
                { id: 'niveles_puerto', label: 'Niveles óptimos y conectado en puerto correcto de I3/CRM', critical: true, regex: /(?:niveles|puerto|i3|crm)/i },
                { id: 'pruebas_base_rj11', label: 'Probó otro terminal, RJ11, base/pilas de inalámbrico y directo a CM', critical: true, regex: /(?:terminal|rj11|inal[aá]mbrico|pilas|directo\s*al\s*cm)/i }
            ]
        },
        'NOC - TELEFONIA - VARIOS': {
            usos: 'Otras casuísticas de telefonía',
            plantilla: '[Sin plantilla obligatoria, detallar problema de telefonía y soporte]',
            items: [
                { id: 'detalle', label: 'Detalle del inconveniente y pruebas realizadas', critical: true, regex: /.{10,}/ }
            ]
        },

        // === WEB / APP MOBILE (NOC APLICACIONES) ===
        'Web/App - Disney': {
            usos: 'Problemas de acceso o activación en Disney+',
            plantilla: '[Tipo de error] + [Usuario sucursal virtual] + [Contraseña] + [Equipo donde falla] + [¿Funcionó en otro momento?]',
            items: [
                { id: 'tipo_error', label: 'Tipo de error', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i },
                { id: 'usuario_sv', label: 'Usuario sucursal virtual', critical: true, regex: /(?:usuario\s*(?:sucursal\s*virtual|sv|app)?|email|correo)[:=\s]*([^\n\]\+\s]+@[^\n\]\+\s]+|[^\n\]\+]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i },
                { id: 'password', label: 'Contraseña (ESTRICTAMENTE NECESARIA)', critical: true, isPassword: true, regex: /(?:contrase[ñn]a|clave|pass|password)[:=\s]*([^\n\]\+]+)/i },
                { id: 'equipo_falla', label: 'Equipo donde falla', critical: true, regex: /(?:equipo\s*donde\s*falla|equipo|dispositivo|falla\s*en)[:=\s]*([^\n\]\+]+)/i },
                { id: 'funciono_antes', label: '¿Funcionó en otro momento?', critical: true, regex: /(?:(?:[¿?]?\s*funcion[oó]\s*(?:en\s*otro\s*momento)?|\banduvo\b))[?:\s=]+([^\n\]\+]+)/i }
            ]
        },
        'Web/App - Max': {
            usos: 'Problemas de acceso o activación en Max',
            plantilla: '[Tipo de error] + [Usuario sucursal virtual] + [Contraseña] + [Equipo donde falla] + [¿Funcionó en otro momento?]',
            items: [
                { id: 'tipo_error', label: 'Tipo de error', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i },
                { id: 'usuario_sv', label: 'Usuario sucursal virtual', critical: true, regex: /(?:usuario\s*(?:sucursal\s*virtual|sv|app)?|email|correo)[:=\s]*([^\n\]\+\s]+@[^\n\]\+\s]+|[^\n\]\+]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i },
                { id: 'password', label: 'Contraseña (ESTRICTAMENTE NECESARIA)', critical: true, isPassword: true, regex: /(?:contrase[ñn]a|clave|pass|password)[:=\s]*([^\n\]\+]+)/i },
                { id: 'equipo_falla', label: 'Equipo donde falla', critical: true, regex: /(?:equipo\s*donde\s*falla|equipo|dispositivo|falla\s*en)[:=\s]*([^\n\]\+]+)/i },
                { id: 'funciono_antes', label: '¿Funcionó en otro momento?', critical: true, regex: /(?:(?:[¿?]?\s*funcion[oó]\s*(?:en\s*otro\s*momento)?|\banduvo\b))[?:\s=]+([^\n\]\+]+)/i }
            ]
        },
        'Web/App - Amazon': {
            usos: 'Problemas de acceso o activación en Amazon Prime Video',
            plantilla: '[Tipo de error] + [Usuario sucursal virtual] + [Contraseña] + [Equipo donde falla] + [¿Funcionó en otro momento?]',
            items: [
                { id: 'tipo_error', label: 'Tipo de error', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i },
                { id: 'usuario_sv', label: 'Usuario sucursal virtual', critical: true, regex: /(?:usuario\s*(?:sucursal\s*virtual|sv|app)?|email|correo)[:=\s]*([^\n\]\+\s]+@[^\n\]\+\s]+|[^\n\]\+]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i },
                { id: 'password', label: 'Contraseña (ESTRICTAMENTE NECESARIA)', critical: true, isPassword: true, regex: /(?:contrase[ñn]a|clave|pass|password)[:=\s]*([^\n\]\+]+)/i },
                { id: 'equipo_falla', label: 'Equipo donde falla', critical: true, regex: /(?:equipo\s*donde\s*falla|equipo|dispositivo|falla\s*en)[:=\s]*([^\n\]\+]+)/i },
                { id: 'funciono_antes', label: '¿Funcionó en otro momento?', critical: true, regex: /(?:(?:[¿?]?\s*funcion[oó]\s*(?:en\s*otro\s*momento)?|\banduvo\b))[?:\s=]+([^\n\]\+]+)/i }
            ]
        },
        'Web/App - Netflix': {
            usos: 'Problemas de acceso o activación en Netflix',
            plantilla: '[Tipo de error] + [Usuario sucursal virtual] + [Contraseña] + [Equipo donde falla] + [¿Funcionó en otro momento?]',
            items: [
                { id: 'tipo_error', label: 'Tipo de error', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i },
                { id: 'usuario_sv', label: 'Usuario sucursal virtual', critical: true, regex: /(?:usuario\s*(?:sucursal\s*virtual|sv|app)?|email|correo)[:=\s]*([^\n\]\+\s]+@[^\n\]\+\s]+|[^\n\]\+]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i },
                { id: 'password', label: 'Contraseña (ESTRICTAMENTE NECESARIA)', critical: true, isPassword: true, regex: /(?:contrase[ñn]a|clave|pass|password)[:=\s]*([^\n\]\+]+)/i },
                { id: 'equipo_falla', label: 'Equipo donde falla', critical: true, regex: /(?:equipo\s*donde\s*falla|equipo|dispositivo|falla\s*en)[:=\s]*([^\n\]\+]+)/i },
                { id: 'funciono_antes', label: '¿Funcionó en otro momento?', critical: true, regex: /(?:(?:[¿?]?\s*funcion[oó]\s*(?:en\s*otro\s*momento)?|\banduvo\b))[?:\s=]+([^\n\]\+]+)/i }
            ]
        },
        'Web/App - Sucursal Virtual': {
            usos: 'Problemas de acceso a Sucursal Virtual',
            plantilla: '[Tipo de error] + [Usuario sucursal virtual] + [Contraseña] + [Equipo donde falla] + [¿Funcionó en otro momento?]',
            items: [
                { id: 'tipo_error', label: 'Tipo de error', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i },
                { id: 'usuario_sv', label: 'Usuario sucursal virtual', critical: true, regex: /(?:usuario\s*(?:sucursal\s*virtual|sv|app)?|email|correo)[:=\s]*([^\n\]\+\s]+@[^\n\]\+\s]+|[^\n\]\+]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i },
                { id: 'password', label: 'Contraseña (ESTRICTAMENTE NECESARIA)', critical: true, isPassword: true, regex: /(?:contrase[ñn]a|clave|pass|password)[:=\s]*([^\n\]\+]+)/i },
                { id: 'equipo_falla', label: 'Equipo donde falla', critical: true, regex: /(?:equipo\s*donde\s*falla|equipo|dispositivo|falla\s*en)[:=\s]*([^\n\]\+]+)/i },
                { id: 'funciono_antes', label: '¿Funcionó en otro momento?', critical: true, regex: /(?:(?:[¿?]?\s*funcion[oó]\s*(?:en\s*otro\s*momento)?|\banduvo\b))[?:\s=]+([^\n\]\+]+)/i }
            ]
        },
        'Web/App - Tplay': {
            usos: 'Problemas con la aplicación Tplay',
            plantilla: '[Tipo de error] + [Usuario sucursal virtual] + [Contraseña] + [Equipo donde falla] + [¿Funcionó en otro momento?]',
            items: [
                { id: 'tipo_error', label: 'Tipo de error', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i },
                { id: 'usuario_sv', label: 'Usuario sucursal virtual', critical: true, regex: /(?:usuario\s*(?:sucursal\s*virtual|sv|app)?|email|correo)[:=\s]*([^\n\]\+\s]+@[^\n\]\+\s]+|[^\n\]\+]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i },
                { id: 'password', label: 'Contraseña (ESTRICTAMENTE NECESARIA)', critical: true, isPassword: true, regex: /(?:contrase[ñn]a|clave|pass|password)[:=\s]*([^\n\]\+]+)/i },
                { id: 'equipo_falla', label: 'Equipo donde falla', critical: true, regex: /(?:equipo\s*donde\s*falla|equipo|dispositivo|falla\s*en)[:=\s]*([^\n\]\+]+)/i },
                { id: 'funciono_antes', label: '¿Funcionó en otro momento?', critical: true, regex: /(?:(?:[¿?]?\s*funcion[oó]\s*(?:en\s*otro\s*momento)?|\banduvo\b))[?:\s=]+([^\n\]\+]+)/i }
            ]
        },
        'App Mobile - Tphone': {
            usos: 'Problemas con la aplicación Tphone',
            plantilla: '[Tipo de error] + [Usuario sucursal virtual] + [Contraseña] + [Equipo donde falla] + [¿Funcionó en otro momento?]',
            items: [
                { id: 'tipo_error', label: 'Tipo de error', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i },
                { id: 'usuario_sv', label: 'Usuario sucursal virtual', critical: true, regex: /(?:usuario\s*(?:sucursal\s*virtual|sv|app)?|email|correo)[:=\s]*([^\n\]\+\s]+@[^\n\]\+\s]+|[^\n\]\+]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i },
                { id: 'password', label: 'Contraseña (ESTRICTAMENTE NECESARIA)', critical: true, isPassword: true, regex: /(?:contrase[ñn]a|clave|pass|password)[:=\s]*([^\n\]\+]+)/i },
                { id: 'equipo_falla', label: 'Equipo donde falla', critical: true, regex: /(?:equipo\s*donde\s*falla|equipo|dispositivo|falla\s*en)[:=\s]*([^\n\]\+]+)/i },
                { id: 'funciono_antes', label: '¿Funcionó en otro momento?', critical: true, regex: /(?:(?:[¿?]?\s*funcion[oó]\s*(?:en\s*otro\s*momento)?|\banduvo\b))[?:\s=]+([^\n\]\+]+)/i }
            ]
        },
        'Web/App - Tplay en Tizen Samsung TV': {
            usos: 'Cliente reclama que tiene problemas con la app Tplay con su Televisor Samsung Crystal con sistema Tizen',
            plantilla: '[Tipo de error]',
            items: [
                { id: 'tipo_error', label: 'Tipo de error detallado en TV Samsung Tizen', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema)[:=\s]*([^\n\]\+]+)|.{5,}/i }
            ]
        }
    };

    function analyzeSolicitudConfiguracion(text, tipoRa, incoherence, rule) {
        if (incoherence) {
            return {
                hasRule: true,
                tipoRa,
                usos: rule.usos,
                plantillaOficial: rule.plantilla,
                score: 15,
                verdict: 'Apto para Rechazo',
                verdictClass: 'danger',
                verdictDesc: `⛔ INCOHERENCIA DE RED DETECTADA: ${incoherence.motivo}. Petición técnicamente inviable o fuera del alcance de la GUI de un CPE Sagemcom DOCSIS 3.1 / ONT GPON. ${incoherence.rejectionAdvice}`,
                detectedItems: [{ label: 'Texto libre ingresado', val: text.trim().substring(0, 80) + '...', critical: false }],
                missingItems: [{
                    label: 'Incoherencia Técnica de Red',
                    critical: true,
                    isIncoherence: true,
                    desc: `${incoherence.motivo}. ${incoherence.technicalReason}`
                }],
                noiseItems: [],
                structuredSummary: text.trim(),
                incoherenceData: incoherence
            };
        }

        const isPortForwarding = /(?:abrir\s*puertos?|apertura\s*(?:de\s*)?puertos?|port\s*forward(?:ing)?|redirecci[oó]n\s*(?:de\s*)?puertos?|mapeo\s*(?:de\s*)?puertos?|forwarding|abrir\s*(?:el|los|un)?\s*puertos?|\bpuertos?\b|\bports?\b|\bdmz\b)/i.test(text);

        if (isPortForwarding) {
            const protoMatch = text.match(/\b(tcp\s*[\/\-y]\s*udp|ambos|tcp|udp)\b/i);
            const portMatch = text.match(/(?:puertos?|port|ports|dst\s*port)[:=\s#]*([0-9]{1,5}(?:\s*(?:-|–|y|,|\/)\s*[0-9]{1,5})*)/i) ||
                              text.match(/\b([1-9][0-9]{0,4})\b(?!\s*(?:megas|mbps|mb|gb|d[ií]as|meses|pesos|usd|cliente|id|ra))/i);

            // Extraer y clasificar direcciones IPv4 en el reclamo
            const allIpMatches = [...text.matchAll(/\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/g)].map(m => m[1]);

            // Filtrar IPs de la subred del gateway CPE: 192.168.0.xxx (rango 192.168.0.0/24)
            const cpeSubnetIps = allIpMatches.filter(ip => {
                const parts = ip.split('.').map(Number);
                return parts[0] === 192 && parts[1] === 168 && parts[2] === 0 && parts[3] >= 0 && parts[3] <= 255;
            });

            // Priorizar IP de host (distinta de .1 que es el gateway y de .0/.255)
            const hostIp = cpeSubnetIps.find(ip => {
                const last = Number(ip.split('.')[3]);
                return last >= 2 && last <= 254;
            }) || (cpeSubnetIps.length > 0 ? cpeSubnetIps[0] : null);

            // Detectar si ingresó otra subred privada de 192.168 (ej: 192.168.1.x)
            const otherSubnet192 = allIpMatches.find(ip => {
                const parts = ip.split('.').map(Number);
                return parts[0] === 192 && parts[1] === 168 && parts[2] !== 0 && parts[3] <= 255;
            });

            // O cualquier otra IP no perteneciente a 192.168.0.xxx
            const genericIp = allIpMatches.find(ip => !cpeSubnetIps.includes(ip));

            const proto = protoMatch ? protoMatch[0].toUpperCase() : null;
            const port = portMatch ? (portMatch[1] || portMatch[0]) : null;

            const detectedItems = [];
            const missingItems = [];

            if (proto) {
                detectedItems.push({ label: 'Protocolo de Red', val: proto, critical: true });
            } else {
                missingItems.push({ label: 'Protocolo de Red (TCP o UDP obligatorio)', critical: true, isPassword: false });
            }

            if (port) {
                detectedItems.push({ label: 'Puerto(s) a redireccionar', val: port, critical: true });
            } else {
                missingItems.push({ label: 'Número de Puerto o Rango a abrir', critical: true, isPassword: false });
            }

            let isIpValid = false;
            if (hostIp) {
                const lastOctet = Number(hostIp.split('.')[3]);
                if (lastOctet === 1) {
                    detectedItems.push({
                        label: 'Dirección IP Subred CPE (192.168.0.1)',
                        val: `${hostIp} (⚠ Gateway del módem/ONT; verificar si el host destino tiene otra IP en LAN)`,
                        critical: true
                    });
                    isIpValid = true;
                } else if (lastOctet === 0 || lastOctet === 255) {
                    missingItems.push({
                        label: 'IP inválida para host en subred 192.168.0.0/24',
                        critical: true,
                        isPassword: false,
                        isIncoherence: true,
                        isContentIncoherence: true,
                        desc: `La dirección ${hostIp} corresponde a la red/broadcast de la subred. Para port forwarding la IP debe estar entre 192.168.0.2 y 192.168.0.254.`
                    });
                } else {
                    detectedItems.push({ label: 'Dirección IP Privada CPE (192.168.0.xxx)', val: hostIp, critical: true });
                    isIpValid = true;
                }
            } else if (otherSubnet192) {
                missingItems.push({
                    label: 'IP fuera de la subred del gateway CPE (192.168.0.1)',
                    critical: true,
                    isPassword: false,
                    isIncoherence: true,
                    isContentIncoherence: true,
                    desc: `La dirección ${otherSubnet192} no pertenece a la subred del gateway por defecto de los CMs y ONTs (192.168.0.1/24). La IP de destino para port forwarding debe ser de tipo 192.168.0.xxx (ej: 192.168.0.100).`
                });
            } else if (genericIp) {
                missingItems.push({
                    label: 'IP fuera del rango de gateway CPE (192.168.0.xxx)',
                    critical: true,
                    isPassword: false,
                    isIncoherence: true,
                    isContentIncoherence: true,
                    desc: `La dirección ${genericIp} no pertenece a la subred 192.168.0.0/24 del gateway de los CMs y ONTs. El router/ONT solo permite port forwarding hacia IPs de su LAN local (192.168.0.xxx).`
                });
            } else {
                missingItems.push({ label: 'Dirección IPv4 Privada del rango CPE (192.168.0.xxx)', critical: true, isPassword: false });
            }

            const destMatch = text.match(/(?:dvr|c[aá]mara|camaras|servidor|server|playstation|ps[45]|xbox|nvr|torrent|nas|pc|ipcam)/i);
            if (destMatch) {
                detectedItems.push({ label: 'Dispositivo / Servicio Destino', val: destMatch[0].toUpperCase(), critical: false });
            }

            const isComplete = proto && port && isIpValid;
            const missingCount = (!proto ? 1 : 0) + (!port ? 1 : 0) + (!isIpValid ? 1 : 0);
            const score = isComplete ? 100 : (missingCount === 1 ? 50 : 25);
            const verdict = isComplete ? 'Gestionable' : (score >= 50 ? 'Parcialmente Gestionable' : 'Rechazable');
            const verdictClass = isComplete ? 'success' : (score >= 50 ? 'warning' : 'danger');
            const verdictDesc = isComplete
                ? 'Solicitud de Apertura de Puertos completa y técnicamente viable: Especifica protocolo (TCP/UDP), puerto(s) e IP privada de la subred del gateway CPE (192.168.0.xxx) para aplicar Port Forwarding.'
                : 'Faltan parámetros obligatorios para apertura de puertos: Se requiere especificar protocolo (TCP o UDP), número de puerto y la dirección IP privada de la subred del gateway CPE (192.168.0.xxx) de destino para configurar el forwarding.';

            const structuredSummary = `[SOLICITUD: APERTURA DE PUERTOS] + [PROTOCOLO: ${proto || 'FALTA (TCP/UDP)'}] + [PUERTO: ${port || 'FALTA'}] + [IP PRIVADA: ${isIpValid ? hostIp : 'FALTA (192.168.0.xxx)'}]${destMatch ? ` + [DESTINO: ${destMatch[0].toUpperCase()}]` : ''}`;

            return {
                hasRule: true,
                tipoRa,
                usos: rule.usos,
                plantillaOficial: rule.plantilla,
                score,
                verdict,
                verdictClass,
                verdictDesc,
                detectedItems,
                missingItems,
                noiseItems: [],
                structuredSummary,
                incoherenceData: null
            };
        }

        const viableConfigs = [
            {
                id: 'REAPROVISIONAR',
                name: 'Reaprovisionamiento de Equipo',
                regex: /(?:reaprovisionar|reaprovisionamiento|provisionar|aprovisionamiento|enviar\s*bootfile|actualizar\s*perfil\s*(?:cmts|olt)|reiniciar\s*desde\s*sistema|re-aprovisionar)/i,
                desc: 'Solicitud viable: Reaprovisionamiento de CPE o actualización de bootfile en CMTS u OLT.'
            },
            {
                id: 'SERVICE_PACKAGE',
                name: 'Cambio de Service Package / Velocidad',
                regex: /(?:service\s*package|perfil\s*(?:de\s*)?(?:velocidad|navegaci[oó]n|paquete|servicio)|cambi(?:o|ar)\s*(?:de\s*)?(?:plan|velocidad|pack|service)|subir\s*megas|bajar\s*megas|plan\s*de\s*\d+\s*(?:megas|mbps|mb)|modificar\s*(?:el\s*)?(?:ancho\s*de\s*banda|velocidad))/i,
                desc: 'Solicitud viable: Modificación de Service Package o perfil de velocidad asignado al cliente.'
            },
            {
                id: 'MOROSIDAD',
                name: 'Retirar Mensaje de Morosidad / Suspensión',
                regex: /(?:(?:sacar|quitar|levantar|eliminar|desbloquear)\s*(?:el\s*)?(?:mensaje|aviso|pantalla|cartel)?\s*(?:de\s*)?morosidad|morosidad|aviso\s*de\s*pago|portal\s*cautivo|mensaje\s*de\s*deuda|bloqueo\s*por\s*morosidad)/i,
                desc: 'Solicitud viable: Retiro del portal de morosidad o aviso de deuda tras confirmación de pago.'
            },
            {
                id: 'WIFI',
                name: 'Configuración de Red WiFi',
                regex: /(?:(?:cambi(?:o|ar)|configurar|modificar)\s*(?:de\s*)?(?:clave|contrase[nñ]a|ssid|nombre\s*de\s*red|wifi)|clave\s*wifi|contrase[nñ]a\s*wifi|ssid|red\s*2\.4(?:\s*ghz)?|red\s*5(?:\s*ghz)?|frecuencia|wpa2)/i,
                desc: 'Solicitud viable: Configuración de parámetros de red inalámbrica WiFi en el CPE.'
            },
            {
                id: 'BANDSTEERING',
                name: 'Configuración de Bandsteering',
                regex: /(?:bandsteering|band\s*steering|unificar\s*redes|separar\s*(?:las\s*)?redes)/i,
                desc: 'Solicitud viable: Configuración de Bandsteering para unificar o separar frecuencias 2.4 y 5 GHz.'
            },
            {
                id: 'BRIDGE',
                name: 'Configuración Modo Bridge / Router',
                regex: /(?:modo\s*bridge|pasar\s*a\s*bridge|poner\s*en\s*bridge|router\s*\/\s*bridge|modo\s*puente|desactivar\s*router)/i,
                desc: 'Solicitud viable: Cambio de modo de operación del CPE a Bridge o Router.'
            },
            {
                id: 'PC_NAT',
                name: 'Modo Red PC/NAT, DMZ o UPnP',
                regex: /(?:modo\s*red\s*pc\/?nat|dmz|upnp)/i,
                desc: 'Solicitud viable: Configuración de Modo Red PC/NAT, DMZ o UPnP.'
            }
        ];

        for (const cfg of viableConfigs) {
            if (cfg.regex.test(text)) {
                const matchSnippet = text.match(cfg.regex)[0];
                return {
                    hasRule: true,
                    tipoRa,
                    usos: rule.usos,
                    plantillaOficial: rule.plantilla,
                    score: 100,
                    verdict: 'Gestionable',
                    verdictClass: 'success',
                    verdictDesc: cfg.desc,
                    detectedItems: [
                        { label: 'Configuración Solicitada', val: cfg.name, critical: true },
                        { label: 'Parámetro detectado', val: matchSnippet, critical: false }
                    ],
                    missingItems: [],
                    noiseItems: [],
                    structuredSummary: `[SOLICITUD: ${cfg.name.toUpperCase()}] + [DETALLE: ${text.trim().substring(0, 80)}]`,
                    incoherenceData: null
                };
            }
        }

        return {
            hasRule: true,
            tipoRa,
            usos: rule.usos,
            plantillaOficial: rule.plantilla,
            score: 35,
            verdict: 'Rechazable',
            verdictClass: 'danger',
            verdictDesc: 'Falta especificar qué configuración técnica viable se requiere (ej: apertura de puertos con protocolo/puerto/IP 192.168.0.xxx, cambio de service package, reaprovisionar, sacar morosidad, WiFi, bridge, etc.).',
            detectedItems: text.trim().length > 8 ? [{ label: 'Texto ingresado', val: text.trim().substring(0, 70) + '...', critical: false }] : [],
            missingItems: [{
                label: 'Configuración técnica viable y detallada',
                critical: true,
                isPassword: false,
                desc: 'Debe especificar el cambio técnico (puertos con TCP/UDP/IP 192.168.0.xxx, service package, reaprovisionar, morosidad, WiFi, bridge, etc.)'
            }],
            noiseItems: [],
            structuredSummary: text.trim() ? `[SOLICITUD: CONFIGURACIÓN] + [DETALLE: ${text.trim().substring(0, 80)}]` : '',
            incoherenceData: null
        };
    }

    function analyzeClaimWithAI(text, tipoRa) {
        if (!text || !text.trim()) {
            return {
                hasRule: !!RA_AI_RULES[tipoRa],
                score: 0,
                verdict: 'Sin Datos',
                verdictClass: 'neutral',
                verdictDesc: 'Pegá los datos del reclamo o redactá el caso para analizar su gestionabilidad.',
                detectedItems: [],
                missingItems: [],
                structuredSummary: '',
                noiseItems: [],
                incoherenceData: null
            };
        }

        // Check network coherence for Sagemcom DOCSIS 3.1 & ONT GPON
        const incoherence = checkInternetNetworkSanity(text, tipoRa);

        const rule = RA_AI_RULES[tipoRa];
        if (rule && rule.isFlexibleConfig) {
            return analyzeSolicitudConfiguracion(text, tipoRa, incoherence, rule);
        }
        if (!rule) {
            return {
                hasRule: false,
                score: incoherence ? 15 : (text.trim().length > 20 ? 85 : 45),
                verdict: incoherence ? 'Apto para Rechazo' : (text.trim().length > 20 ? 'Gestionable' : 'Poco Detalle'),
                verdictClass: incoherence ? 'danger' : (text.trim().length > 20 ? 'success' : 'warning'),
                verdictDesc: incoherence
                    ? `⛔ INCOHERENCIA DE RED DETECTADA: ${incoherence.motivo}. Petición técnicamente inviable o fuera del alcance de la GUI de un CPE Sagemcom DOCSIS 3.1 / ONT GPON. ${incoherence.rejectionAdvice}`
                    : 'Esta gestión no posee plantilla estricta obligatoria. Verificá que el motivo y soporte brindado sean claros.',
                detectedItems: [{ label: 'Texto libre ingresado', val: text.trim().substring(0, 100) + (text.trim().length > 100 ? '...' : ''), critical: false }],
                missingItems: incoherence ? [{
                    label: 'Incoherencia Técnica de Red',
                    critical: true,
                    isIncoherence: true,
                    desc: `${incoherence.motivo}. ${incoherence.technicalReason}`
                }] : [],
                structuredSummary: text.trim(),
                noiseItems: [],
                incoherenceData: incoherence
            };
        }

        let foundCount = 0;
        let criticalMissing = 0;
        let passwordMissing = false;
        let passwordEvaded = false;
        let evasionText = '';
        let keywordsMissing = false;
        let contentIncoherenceCount = 0;
        const detectedItems = [];
        const missingItems = [];
        const extractedData = {};

        for (const item of rule.items) {
            let matchVal = null;

            if (item.checkKeywords) {
                const upper = text.toUpperCase();
                const foundKw = rule.keywords.find(kw => upper.includes(kw.toUpperCase()));
                if (foundKw) matchVal = foundKw;
                else keywordsMissing = true;
            } else if (item.regex) {
                const m = text.match(item.regex);
                if (m) {
                    matchVal = m[1] || m[2] || m[0];
                }
            }

            if (matchVal && matchVal.trim()) {
                const trimmedVal = matchVal.trim().replace(/^[?:=\s]+/, '');
                // Check password evasion (e.g. "no la brinda", "no la dice", "vacio", "no sabe")
                if (item.isPassword && isPasswordEvaded(trimmedVal)) {
                    passwordMissing = true;
                    passwordEvaded = true;
                    evasionText = trimmedVal;
                    if (item.critical) criticalMissing++;
                    missingItems.push({
                        label: item.label,
                        critical: true,
                        isPassword: true,
                        isEvaded: true,
                        evasionText: trimmedVal
                    });
                } else {
                    // Run coherence validation if a coherenceType is defined
                    let coherenceResult = null;
                    if (item.coherenceType) {
                        coherenceResult = validateContentCoherence(item.id, trimmedVal, item.coherenceType);
                    }

                    if (coherenceResult && !coherenceResult.valid) {
                        // Value was found but is semantically invalid
                        foundCount++; // Still counts as "found" (not missing)
                        extractedData[item.id] = trimmedVal;
                        detectedItems.push({
                            label: item.label,
                            val: trimmedVal,
                            critical: item.critical,
                            hasCoherenceIssue: true
                        });
                        missingItems.push({
                            label: coherenceResult.label,
                            critical: false,
                            isIncoherence: true,
                            isContentIncoherence: true,
                            desc: coherenceResult.desc
                        });
                        contentIncoherenceCount++;
                    } else {
                        foundCount++;
                        extractedData[item.id] = trimmedVal;
                        detectedItems.push({
                            label: item.label,
                            val: extractedData[item.id],
                            critical: item.critical
                        });
                    }
                }
            } else {
                // Handle missing items - isContactInfo fields are non-grave
                if (item.isContactInfo) {
                    // Contact info missing is not critical, just informational
                    missingItems.push({
                        label: item.label,
                        critical: false,
                        isContactInfo: true,
                        isPassword: false,
                        isEvaded: false
                    });
                } else {
                    if (item.critical) criticalMissing++;
                    if (item.isPassword) passwordMissing = true;
                    missingItems.push({
                        label: item.label,
                        critical: item.critical,
                        isPassword: item.isPassword,
                        isEvaded: false
                    });
                }
            }
        }

        const totalItems = rule.items.length;
        let score = Math.round((foundCount / totalItems) * 100);

        // Apply strict protocol penalties
        if (passwordMissing) {
            score = Math.min(score, 35);
        }
        if (keywordsMissing) {
            score = Math.min(score, 40);
        }
        if (criticalMissing > 0) {
            score = Math.min(score, Math.max(15, 100 - (criticalMissing * 25)));
        }

        // Apply Network Incoherence Penalty (Sagemcom DOCSIS 3.1 / ONT GPON)
        if (incoherence) {
            score = Math.min(score, 15);
        }

        // Apply Content Coherence Penalty (invalid MACs, garbage URLs, etc.)
        if (contentIncoherenceCount > 0) {
            score = Math.max(20, score - (contentIncoherenceCount * 10));
        }

        let verdict = 'Gestionable';
        let verdictClass = 'success';
        let verdictDesc = 'El reclamo cuenta con la información reglamentaria requerida para ser gestionado y escalado.';

        if (incoherence) {
            verdict = 'Apto para Rechazo';
            verdictClass = 'danger';
            verdictDesc = `⛔ INCOHERENCIA DE RED DETECTADA: ${incoherence.motivo}. Petición técnicamente inviable o fuera del alcance de la GUI de un CPE Sagemcom DOCSIS 3.1 / ONT GPON. ${incoherence.rejectionAdvice}`;
            missingItems.unshift({
                label: 'Incoherencia Técnica de Red',
                critical: true,
                isIncoherence: true,
                desc: `${incoherence.motivo}. ${incoherence.technicalReason}`
            });
        } else if (score < 50) {
            verdict = 'Rechazable';
            verdictClass = 'danger';
            if (passwordEvaded) {
                verdictDesc = `Corresponde rechazar el RA / devolver a Front: El operador indicó que la contraseña "${escapeHtml(evasionText)}" (vacía o no brindada). La contraseña del cliente es estrictamente obligatoria para validar credenciales en NOC Aplicaciones.`;
            } else if (passwordMissing) {
                verdictDesc = 'Corresponde rechazar el RA / devolver a Front: La contraseña es estrictamente necesaria y no fue brindada.';
            } else if (keywordsMissing) {
                verdictDesc = 'Corresponde rechazar el RA: No se especificó ninguna de las palabras clave requeridas de CONFIGURAR.';
            } else {
                verdictDesc = 'Corresponde rechazar el RA / devolver a Front: Falta información crítica exigida por la plantilla oficial.';
            }
        } else if (score < 80) {
            verdict = 'Parcialmente Gestionable';
            verdictClass = 'warning';
            verdictDesc = 'El reclamo tiene información útil pero omite campos reglamentarios. Se recomienda completarlos antes de enviar a NOC.';
        }

        // Detect non-template lines (support info or noise)
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        const noiseItems = [];
        lines.forEach(line => {
            if (!line.includes('[') && !line.includes(']') && line.length > 5) {
                if (/hugo\s*ruderman|sc\s*por|indica\s*que|codigo\s*de\s*suscripcion|se\s*chequea|pruebas|reinicio|soporte/i.test(line)) {
                    noiseItems.push({ type: 'soporte', text: line });
                } else if (/enojado|reclamo\s*reiterado|llamar\s*urgente|amenaza|molesto/i.test(line)) {
                    noiseItems.push({ type: 'ruido', text: line });
                }
            }
        });

        // Structured official summary
        let summaryParts = [];
        rule.items.forEach(it => {
            const shortLabel = it.label.split('(')[0].trim();
            if (extractedData[it.id]) {
                summaryParts.push(`[${shortLabel}: ${extractedData[it.id]}]`);
            } else if (it.isPassword && passwordEvaded) {
                summaryParts.push(`[${shortLabel}: NO BRINDADA ("${evasionText}")]`);
            } else {
                summaryParts.push(`[${shortLabel}: FALTA]`);
            }
        });
        const structuredSummary = summaryParts.join(' + ');

        return {
            hasRule: true,
            tipoRa,
            usos: rule.usos,
            plantillaOficial: rule.plantilla,
            score,
            verdict,
            verdictClass,
            verdictDesc,
            detectedItems,
            missingItems,
            noiseItems,
            structuredSummary,
            incoherenceData: incoherence
        };
    }

    function renderAiAudit(showIfHidden = false) {
        if (!aiObsPanel) return;

        if (showIfHidden) {
            aiObsPanel.classList.remove('hidden');
            if (btnAiAudit) btnAiAudit.classList.add('active');
        }

        const text = inputReclamoTexto ? inputReclamoTexto.value : '';
        const tipoRa = selectRa ? selectRa.value : '';

        if (!tipoRa) {
            if (aiCoherenceBox) aiCoherenceBox.classList.add('hidden');
            if (aiRaTag) aiRaTag.textContent = 'Seleccioná un RA primero';
            if (aiScoreNum) aiScoreNum.textContent = '0%';
            if (aiProgressFill) {
                aiProgressFill.style.width = '0%';
                aiProgressFill.style.backgroundColor = 'var(--color-danger)';
            }
            if (aiVerdictBox) aiVerdictBox.className = 'ai-verdict-box warning';
            if (aiVerdictBadge) {
                aiVerdictBadge.textContent = 'Sin Clasificación';
                aiVerdictBadge.className = 'ai-verdict-badge badge-warning';
            }
            if (aiVerdictTitle) aiVerdictTitle.textContent = 'Falta Tipo de Reclamo';
            if (aiVerdictDesc) aiVerdictDesc.textContent = 'Seleccioná un tipo de reclamo en el selector superior para que la IA audite el reclamo con las plantillas oficiales.';
            if (aiRelevantList) aiRelevantList.innerHTML = '<li class="ai-item-empty">Esperando selección de RA...</li>';
            if (aiMissingList) aiMissingList.innerHTML = '<li class="ai-item-empty">Seleccioná una gestión para evaluar requisitos.</li>';
            if (aiSummaryContent) aiSummaryContent.textContent = '(Seleccioná un RA primero)';
            if (aiTemplateUsage) aiTemplateUsage.textContent = '';
            if (aiTemplateCode) aiTemplateCode.textContent = '';
            return;
        }

        const res = analyzeClaimWithAI(text, tipoRa);
        renderAiAuditWithData(res, tipoRa);
    }

    function renderAiAuditWithData(res, tipoRa) {
        if (!res) return;

        // Asegurar que la plantilla oficial y los usos siempre estén presentes
        const rule = typeof RA_AI_RULES !== 'undefined' ? RA_AI_RULES[tipoRa] : null;
        if (rule) {
            if (!res.plantillaOficial) res.plantillaOficial = rule.plantilla;
            if (!res.usos) res.usos = rule.usos;

            // Si el resumen estructurado no vino del analizador/LLM, construirlo a partir de la plantilla y los datos detectados
            if (!res.structuredSummary && Array.isArray(rule.items)) {
                const summaryParts = [];
                rule.items.forEach(it => {
                    const shortLabel = it.label.split('(')[0].trim();
                    const detected = (res.detectedItems || []).find(d => {
                        const dl = (d.label || '').toLowerCase();
                        const sl = shortLabel.toLowerCase();
                        return dl.includes(sl) || sl.includes(dl) || (it.id && dl.includes(it.id.toLowerCase()));
                    });
                    if (detected && detected.val) {
                        summaryParts.push(`[${shortLabel}: ${detected.val}]`);
                    } else if (it.isPassword && res.verdictDesc && res.verdictDesc.toLowerCase().includes('no la brinda')) {
                        summaryParts.push(`[${shortLabel}: NO BRINDADA]`);
                    } else {
                        summaryParts.push(`[${shortLabel}: FALTA]`);
                    }
                });
                if (summaryParts.length > 0) {
                    res.structuredSummary = summaryParts.join(' + ');
                }
            }
        }

        if (!res.verdict) {
            res.verdict = res.score >= 80 ? 'Válido y Completo' : (res.score >= 50 ? 'Incompleto / Advertencia' : 'Rechazable');
        }

        // Si es rechazable y no tiene incoherencia de red, generar un motivo general de rechazo
        if (!res.incoherenceData && (res.score < 50 || res.verdictClass === 'danger')) {
            const hasPasswordEvasion = res.verdictDesc && res.verdictDesc.toLowerCase().includes('contraseña');
            res.incoherenceData = {
                isGeneralRejection: true,
                motivo: hasPasswordEvasion ? 'Datos Incompletos - Evasión de Contraseña' : 'Datos Obligatorios Faltantes o Incompletos',
                technicalReason: hasPasswordEvasion 
                    ? 'La contraseña es estrictamente necesaria para validar credenciales y realizar la gestión. No se puede avanzar si no es proporcionada.'
                    : 'El reclamo omite parámetros críticos exigidos por la plantilla oficial. Sin esta información explícita, el área técnica no puede proceder con la gestión ni aplicar cambios en los sistemas.',
                rejectionAdvice: 'Corresponde rechazar el RA y devolver al área emisora (Front). Solicitar que se proporcionen los datos faltantes que se detallan en el panel de auditoría (marcados en color rojo).'
            };
        }

        // Update Coherence Alert Box
        if (aiCoherenceBox) {
            if (res.incoherenceData) {
                aiCoherenceBox.classList.remove('hidden');
                if (aiCoherenceTitle) {
                    aiCoherenceTitle.textContent = `⛔ ${res.incoherenceData.motivo}`;
                }
                if (aiCoherenceReason) {
                    const reasonLabel = res.incoherenceData.isGeneralRejection ? 'Descripción de Rechazo:' : 'Límite de Red / GUI:';
                    aiCoherenceReason.innerHTML = `<strong>${reasonLabel}</strong> ${escapeHtml(res.incoherenceData.technicalReason)}`;
                }
                if (aiCoherenceAdvice) {
                    aiCoherenceAdvice.innerHTML = `<strong>Acción Sugerida:</strong> ${escapeHtml(res.incoherenceData.rejectionAdvice)}`;
                }
            } else {
                aiCoherenceBox.classList.add('hidden');
            }
        }

        if (aiRaTag) aiRaTag.textContent = tipoRa;
        if (aiScoreNum) aiScoreNum.textContent = res.score + '%';

        // Update progress bar
        if (aiProgressFill) {
            aiProgressFill.style.width = res.score + '%';
            if (res.score >= 80) {
                aiProgressFill.style.backgroundColor = '#10B981';
            } else if (res.score >= 50) {
                aiProgressFill.style.backgroundColor = '#F59E0B';
            } else {
                aiProgressFill.style.backgroundColor = '#EF4444';
            }
        }

        // Update verdict box
        if (aiVerdictBox) {
            aiVerdictBox.className = 'ai-verdict-box ' + res.verdictClass;
        }
        if (aiVerdictBadge) {
            aiVerdictBadge.textContent = res.verdict;
            aiVerdictBadge.className = 'ai-verdict-badge ' + (
                res.verdictClass === 'success' ? 'badge-success' : (res.verdictClass === 'warning' ? 'badge-warning' : 'badge-danger')
            );
        }
        if (aiVerdictTitle) {
            aiVerdictTitle.textContent = res.incoherenceData
                ? '⛔ Reclamo Apto para Rechazo Técnico'
                : (res.score >= 80
                    ? '✓ Reclamo Gestionable'
                    : (res.score >= 50 ? '⚠️ Reclamo Parcialmente Gestionable' : '✕ Reclamo Rechazable'));
        }
        if (aiVerdictDesc) {
            aiVerdictDesc.textContent = res.verdictDesc;
        }

        // Render Relevant (Detected)
        if (aiRelevantList) {
            let relevantHtml = '';
            if (res.detectedItems && res.detectedItems.length > 0) {
                res.detectedItems.forEach(item => {
                    if (item.hasCoherenceIssue) {
                        relevantHtml += `
                            <li class="ai-item-warning">
                                <i data-lucide="alert-triangle"></i>
                                <div class="ai-item-body">
                                    <span class="ai-item-label">${escapeHtml(item.label)}:</span>
                                    <span class="ai-item-val ai-val-incoherent">${escapeHtml(item.val)}</span>
                                    <span class="ai-coherence-tag">⚠ Formato dudoso</span>
                                </div>
                            </li>
                        `;
                    } else {
                        relevantHtml += `
                            <li class="ai-item-valid">
                                <i data-lucide="check-circle-2"></i>
                                <div class="ai-item-body">
                                    <span class="ai-item-label">${escapeHtml(item.label)}:</span>
                                    <span class="ai-item-val">${escapeHtml(item.val)}</span>
                                </div>
                            </li>
                        `;
                    }
                });
            }
            if (res.noiseItems && res.noiseItems.length > 0) {
                res.noiseItems.forEach(n => {
                    relevantHtml += `
                        <li class="ai-item-info">
                            <i data-lucide="info"></i>
                            <div class="ai-item-body">
                                <span class="ai-item-label">Info complementaria:</span>
                                <span class="ai-item-val">${escapeHtml(n.text)}</span>
                            </div>
                        </li>
                    `;
                });
            }
            if (!relevantHtml) {
                relevantHtml = '<li class="ai-item-empty">No se detectaron datos reglamentarios todavía.</li>';
            }
            aiRelevantList.innerHTML = relevantHtml;
        }

        // Render Missing / Non-compliant / Incoherence
        if (aiMissingList) {
            let missingHtml = '';
            if (res.missingItems && res.missingItems.length > 0) {
                res.missingItems.forEach(item => {
                    if (item.isContentIncoherence) {
                        // Content coherence issue (orange/amber warning)
                        missingHtml += `
                            <li class="ai-item-content-incoherent">
                                <i data-lucide="alert-triangle"></i>
                                <div class="ai-item-body">
                                    <span class="ai-item-label">${escapeHtml(item.label)}</span>
                                    <span class="ai-item-desc">${escapeHtml(item.desc)}</span>
                                </div>
                            </li>
                        `;
                    } else if (item.isIncoherence) {
                        missingHtml += `
                            <li class="ai-item-incoherent">
                                <i data-lucide="shield-alert"></i>
                                <div class="ai-item-body">
                                    <span class="ai-item-label">${escapeHtml(item.label)}:</span>
                                    <span class="ai-item-desc">${escapeHtml(item.desc)}</span>
                                </div>
                            </li>
                        `;
                    } else if (item.isContactInfo) {
                        // Contact info missing - non-grave, just informational
                        missingHtml += `
                            <li class="ai-item-missing">
                                <i data-lucide="user"></i>
                                <div class="ai-item-body">
                                    <span class="ai-item-label">${escapeHtml(item.label)}</span>
                                    <span class="ai-contact-tag">Info. de contacto (no grave)</span>
                                </div>
                            </li>
                        `;
                    } else {
                        let tag = item.critical ? '<span class="ai-critical-tag">Obligatorio</span>' : '<span class="ai-optional-tag">Sugerido</span>';
                        if (item.isPassword) {
                            tag = item.isEvaded 
                                ? `<span class="ai-pwd-alert">¡Contraseña No Brindada / Vacía ("${escapeHtml(item.evasionText)}")!</span>`
                                : '<span class="ai-pwd-alert">¡Estrictamente Necesaria!</span>';
                        }
                        missingHtml += `
                            <li class="ai-item-missing ${item.critical ? 'is-critical' : ''}">
                                <i data-lucide="alert-circle"></i>
                                <div class="ai-item-body">
                                    <span class="ai-item-label">${escapeHtml(item.label)}</span>
                                    ${tag}
                                </div>
                            </li>
                        `;
                    }
                });
            } else {
                missingHtml = '<li class="ai-item-empty success-text">✓ Cumple con todos los requisitos oficiales de la plantilla.</li>';
            }
            aiMissingList.innerHTML = missingHtml;
        }

        // Summary and Template details
        if (aiSummaryContent) {
            aiSummaryContent.textContent = res.structuredSummary || '(Sin datos suficientes para estructurar resumen)';
        }
        if (aiTemplateUsage) {
            aiTemplateUsage.textContent = res.usos ? `Uso oficial: ${res.usos}` : '';
        }
        if (aiTemplateCode) {
            aiTemplateCode.textContent = res.plantillaOficial || '[Sin plantilla estricta para esta gestión]';
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    function initAiClaimAudit() {
        if (btnAiAudit && aiObsPanel) {
            btnAiAudit.addEventListener('click', () => {
                const isHidden = aiObsPanel.classList.contains('hidden');
                if (isHidden) {
                    aiObsPanel.classList.remove('hidden');
                    btnAiAudit.classList.add('active');
                    renderAiAudit(true);
                } else {
                    aiObsPanel.classList.add('hidden');
                    btnAiAudit.classList.remove('active');
                }
            });
        }

        let aiAuditDebounce = null;
        if (inputReclamoTexto) {
            inputReclamoTexto.addEventListener('input', () => {
                if (aiObsPanel && !aiObsPanel.classList.contains('hidden')) {
                    clearTimeout(aiAuditDebounce);
                    aiAuditDebounce = setTimeout(() => {
                        renderAiAudit(false);
                    }, 250);
                }
            });
        }

        if (selectRa) {
            selectRa.addEventListener('change', () => {
                if (aiObsPanel && !aiObsPanel.classList.contains('hidden')) {
                    renderAiAudit(false);
                }
            });
        }

        if (btnAiCopySummary && aiSummaryContent) {
            btnAiCopySummary.addEventListener('click', async () => {
                const text = aiSummaryContent.textContent;
                if (!text || text.startsWith('(')) {
                    showToast('No hay resumen generado para copiar', 'warning');
                    return;
                }
                try {
                    await navigator.clipboard.writeText(text);
                    showToast('Resumen oficial copiado al portapapeles', 'success');
                } catch {
                    showToast('Error al copiar al portapapeles', 'error');
                }
            });
        }

        if (btnAiApplySummary && aiSummaryContent && inputReclamoTexto) {
            btnAiApplySummary.addEventListener('click', () => {
                const text = aiSummaryContent.textContent;
                if (!text || text.startsWith('(')) {
                    showToast('No hay resumen válido para aplicar', 'warning');
                    return;
                }
                inputReclamoTexto.value = text;
                inputReclamoTexto.dispatchEvent(new Event('input'));
                inputReclamoTexto.focus();
                showToast('✨ Resumen estructurado aplicado a Datos del Reclamo', 'success');
            });
        }

        if (btnAiCopyRawTemplate && aiTemplateCode) {
            btnAiCopyRawTemplate.addEventListener('click', async () => {
                const text = aiTemplateCode.textContent;
                if (!text) {
                    showToast('No hay plantilla disponible', 'warning');
                    return;
                }
                try {
                    await navigator.clipboard.writeText(text);
                    showToast('Plantilla oficial vacía copiada', 'success');
                } catch {
                    showToast('Error al copiar plantilla', 'error');
                }
            });
        }

        if (btnAiLlmAudit) {
            btnAiLlmAudit.addEventListener('click', handleLlmAudit);
        }
    }

    // ============================================
    // Feature: Gemini LLM Integration & Discovery
    // ============================================

    async function getAvailableGeminiModels(apiKey) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error?.message || `HTTP ${response.status}`);
        }
        const data = await response.json();
        const supported = (data.models || []).filter(m => 
            Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes('generateContent')
        );
        return supported;
    }

    function pickBestGeminiModel(modelsList) {
        if (!modelsList || modelsList.length === 0) return 'gemini-3.1-flash';
        
        // Descartar modelos obsoletos que Google rechaza para generateContent en cuentas nuevas
        const blacklist = ['gemini-2.5-pro', 'gemini-1.0-pro'];
        const validModels = modelsList.filter(m => {
            const clean = m.name.replace(/^models\//, '');
            return !blacklist.includes(clean);
        });

        const candidateList = validModels.length > 0 ? validModels : modelsList;

        // Prioridad ESTRICTA POR VELOCIDAD (Modelos Flash más rápidos primero):
        const speedPriority = [
            'gemini-3.1-flash',
            'gemini-3.0-flash',
            'gemini-3-flash',
            'gemini-2.5-flash',
            'gemini-2.0-flash',
            'gemini-1.5-flash-8b',
            'gemini-1.5-flash-latest',
            'gemini-1.5-flash-002',
            'gemini-1.5-flash-001',
            'gemini-1.5-flash',
            'gemini-2.0-flash-exp'
        ];

        for (const p of speedPriority) {
            const found = candidateList.find(m => {
                const name = m.name.replace(/^models\//, '');
                return name === p;
            });
            if (found) return found.name.replace(/^models\//, '');
        }

        // Si no está en la lista exacta pero contiene 'flash', es rápido
        const anyFlash = candidateList.find(m => m.name.toLowerCase().includes('flash'));
        if (anyFlash) return anyFlash.name.replace(/^models\//, '');

        // Solo si NO hay ningún modelo Flash, recurrir a los modelos Pro (más lentos):
        const proPriority = [
            'gemini-3.1-pro-preview',
            'gemini-3.1-pro',
            'gemini-3-pro',
            'gemini-1.5-pro'
        ];
        for (const p of proPriority) {
            const found = candidateList.find(m => {
                const name = m.name.replace(/^models\//, '');
                return name === p;
            });
            if (found) return found.name.replace(/^models\//, '');
        }

        return candidateList[0].name.replace(/^models\//, '');
    }

    async function testAndResolveWorkingModel(apiKey, candidateModel, modelsList = []) {
        let toTest = candidateModel;
        const tested = new Set();

        for (let i = 0; i < 4; i++) {
            if (!toTest || tested.has(toTest)) break;
            tested.add(toTest);

            try {
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${toTest}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: 'ping' }] }],
                        generationConfig: { maxOutputTokens: 2 }
                    })
                });

                if (res.ok) {
                    return toTest;
                }

                const errData = await res.json().catch(() => ({}));
                const errMsg = errData.error?.message || '';

                // Si Google sugiere explícitamente un modelo en el mensaje
                const match = errMsg.match(/models\/([a-zA-Z0-9._-]+)/);
                if (match && match[1] && !tested.has(match[1])) {
                    toTest = match[1];
                    continue;
                }

                // Si no, elegir el siguiente mejor modelo de la lista
                const remaining = modelsList.filter(m => !tested.has(m.name.replace(/^models\//, '')));
                if (remaining.length > 0) {
                    toTest = pickBestGeminiModel(remaining);
                } else {
                    break;
                }
            } catch (e) {
                console.warn(`Error al verificar modelo ${toTest}:`, e);
                break;
            }
        }

        return toTest;
    }

    function populateGeminiModelOptions(modelsList) {
        if (!selectGeminiModel || !modelsList || modelsList.length === 0) return;
        const currentVal = selectGeminiModel.value;
        selectGeminiModel.innerHTML = '<option value="auto">⚡ Auto-detectar modelo más rápido (Recomendado)</option>';

        // Descartar obsoletos
        const blacklist = ['gemini-2.5-pro', 'gemini-1.0-pro'];
        const validModels = modelsList.filter(m => !blacklist.includes(m.name.replace(/^models\//, '')));

        // Ordenar con Flash (más rápidos) arriba de todo
        const sorted = [...validModels].sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            const isFlashA = nameA.includes('flash');
            const isFlashB = nameB.includes('flash');
            if (isFlashA && !isFlashB) return -1;
            if (!isFlashA && isFlashB) return 1;

            const getScore = (n) => {
                if (n.includes('3.1')) return 50;
                if (n.includes('3.')) return 45;
                if (n.includes('2.5')) return 40;
                if (n.includes('2.0') || n.includes('2.')) return 30;
                if (n.includes('1.5')) return 20;
                return 10;
            };
            return getScore(nameB) - getScore(nameA);
        });

        sorted.forEach(m => {
            const cleanName = m.name.replace(/^models\//, '');
            const opt = document.createElement('option');
            opt.value = cleanName;
            const isFlash = cleanName.toLowerCase().includes('flash');
            const icon = isFlash ? '⚡ ' : '🧠 ';
            const tag = isFlash ? ' (Rápido)' : ' (Razonamiento)';
            opt.textContent = `${icon}${cleanName}${tag}`;
            selectGeminiModel.appendChild(opt);
        });

        if (currentVal && Array.from(selectGeminiModel.options).some(o => o.value === currentVal)) {
            selectGeminiModel.value = currentVal;
        }
    }

    function sanitizeSensitiveDataForLlm(rawText, tipoRa) {
        if (!rawText || typeof rawText !== 'string') return '';
        let text = rawText;

        // 1. Redactar todos los correos electrónicos estándar (RFC 5322 con @)
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/gi;
        text = text.replace(emailRegex, '[EMAIL_PROTEGIDO]');

        // 2. Redactar usuarios etiquetados sin @ (ej: usuario sv: carlos123, email: user1)
        text = text.replace(/((?:email|correo|mail|usuario\s*(?:sucursal\s*virtual|sv|app)?)\s*[:=]\s*)([^\s\n\r,\+\[\]\<\>\|\;\-\/]+)/gi, (match, prefix, val) => {
            if (val.includes('EMAIL_PROTEGIDO')) return match;
            const trailing = val.match(/\s*$/)[0];
            return `${prefix}[EMAIL_PROTEGIDO]${trailing}`;
        });

        // 3. Redactar contraseñas y claves (con o sin corchetes)
        // Ejemplo: Contraseña: 1234, [Contraseña: 1234], Pass: MiClave, Clave Wifi: 87654321, pin:, wpa2:
        const pwdRegex = /((?:\[\s*)?(?:contrase[ñn]a|clave|password|pass|pwd|pin|wpa2?)(?:\s+(?:de\s+)?(?:wifi|red|cpe|router|modem|acceso|sucursal|app|cliente|usuario|crm|anterior|actual|nueva|provisoria|temporal))?\s*[:=]\s*)([^\n\r,\+\[\]\<\>\|\;\-\/]+)(\]?)/gi;
        text = text.replace(pwdRegex, (match, prefix, val, closingBracket) => {
            const trimmed = val.trim();
            if (trimmed.includes('PASSWORD_PROTEGIDO')) return match;
            if (typeof isPasswordEvaded === 'function' && isPasswordEvaded(trimmed)) {
                return match;
            }
            const trailing = val.match(/\s*$/)[0];
            return `${prefix}[PASSWORD_PROTEGIDO]${trailing}${closingBracket}`;
        });

        // 4. Delimitados por '+' en plantillas de Web/App (donde la posición 2 es contraseña)
        if (!text.includes('[PASSWORD_PROTEGIDO]') && text.includes('+')) {
            const parts = text.split('+');
            if (parts.length >= 4) {
                if (parts[1].includes('[EMAIL_PROTEGIDO]') || /usuario|email|correo/i.test(parts[1])) {
                    const rawField = parts[2];
                    const trimmed = rawField.trim();
                    if (trimmed && !isPasswordEvaded(trimmed)) {
                        parts[2] = rawField.replace(trimmed, '[PASSWORD_PROTEGIDO]');
                        text = parts.join('+');
                    }
                }
            }
        }

        return text;
    }

    async function handleLlmAudit() {
        if (!geminiApiKey) {
            showToast('API Key requerida. Configurá tu clave de Gemini en Ajustes.', 'warning');
            if (typeof window.openConfigModal === 'function') {
                window.openConfigModal();
            }
            return;
        }
        const rawText = inputReclamoTexto ? inputReclamoTexto.value.trim() : '';
        const tipoRa = selectRa ? selectRa.value : '';
        if (!rawText || !tipoRa) {
            showToast('Completá el tipo de reclamo y los datos del reclamo.', 'warning');
            return;
        }
        
        // Sanitización estricta de privacidad (DLP) antes de enviar cualquier dato al LLM
        const sanitizedText = sanitizeSensitiveDataForLlm(rawText, tipoRa);
        const hadRedaction = sanitizedText !== rawText;
        if (hadRedaction) {
            console.log('[DLP / Privacidad] Datos sensibles del cliente (email / contraseña) enmascarados antes del envío a Gemini.');
        }

        btnAiLlmAudit.disabled = true;
        const originalText = btnAiLlmAudit.innerHTML;
        btnAiLlmAudit.innerHTML = '<i class="spin" data-lucide="loader-2"></i> Razonando con Gemini...';
        if (typeof lucide !== 'undefined') lucide.createIcons();

        try {
            const rule = RA_AI_RULES[tipoRa];
            const systemPrompt = `Sos un experto en auditoría de reclamos técnicos de un ISP (Internet Service Provider).
Reglas para el tipo de reclamo "${tipoRa}":
${rule ? JSON.stringify(rule) : 'No hay plantilla estricta. Verificá que tenga sentido.'}

POLÍTICA ESTRICTA DE PRIVACIDAD Y SEGURIDAD (DLP / PII):
Por normativa de confidencialidad del cliente, los correos electrónicos y contraseñas reales han sido enmascarados/redactados localmente antes del envío utilizando tokens protectores:
- [EMAIL_PROTEGIDO]: Debe considerarse como un correo o usuario válido y suministrado por el operador.
- [PASSWORD_PROTEGIDO]: Debe considerarse como una contraseña válida y suministrada por el operador.
- Si en cambio observás indicaciones explícitas de omisión o evasión de contraseña (por ejemplo: "no la brinda", "no la sabe", "vacio", "se niega", "faltante"), trátalo como contraseña FALTANTE / NO BRINDADA (motivo de rechazo para reclamos que la exigen).

Analizá el reclamo ingresado por el operador. Verificá si contiene todos los campos obligatorios y si tiene coherencia técnica para redes HFC DOCSIS 3.1 o FTTH GPON.
Devolvé tu respuesta ÚNICAMENTE en formato JSON estricto con esta estructura (no markdown):
{
  "score": 0 a 100,
  "verdictClass": "success", "warning" o "danger",
  "verdictDesc": "breve explicación del veredicto",
  "structuredSummary": "resumen con corchetes [Campo: valor] siguiendo la plantilla oficial o null",
  "detectedItems": [{"label": "nombre", "val": "valor extraído", "critical": true/false}],
  "missingItems": [{"label": "nombre", "critical": true/false, "desc": "por qué falta"}],
  "noiseItems": [{"type": "ruido", "text": "ruido detectado"}],
  "incoherenceData": null o {"isGeneralRejection": true/false, "motivo": "motivo", "technicalReason": "razón", "rejectionAdvice": "consejo"}
}
Reclamo a analizar:
"""
${sanitizedText}
"""
Solo JSON puro, sin tags HTML.`;

            // Determinar modelo a usar
            let modelToUse = geminiModel;
            let available = null;
            if (!modelToUse || modelToUse === 'auto') {
                try {
                    available = await getAvailableGeminiModels(geminiApiKey);
                    if (available && available.length > 0) {
                        modelToUse = pickBestGeminiModel(available);
                    } else {
                        modelToUse = 'gemini-3.1-flash';
                    }
                } catch {
                    modelToUse = 'gemini-3.1-flash';
                }
            }

            const executeCall = async (model) => {
                return await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: systemPrompt }] }],
                        generationConfig: { temperature: 0.1, responseMimeType: "application/json" }
                    })
                });
            };

            const testedModels = new Set();
            let response = null;
            let finalErrorMsg = '';

            for (let attempt = 0; attempt < 4; attempt++) {
                testedModels.add(modelToUse);
                response = await executeCall(modelToUse);

                if (response.ok) {
                    geminiModel = modelToUse;
                    localStorage.setItem(GEMINI_MODEL_STORAGE, modelToUse);
                    if (selectGeminiModel) selectGeminiModel.value = modelToUse;
                    break;
                }

                const errData = await response.json().catch(() => ({}));
                finalErrorMsg = errData.error?.message || `HTTP ${response.status}`;
                console.warn(`Modelo ${modelToUse} falló: ${finalErrorMsg}`);

                // 1. Si Google sugiere explícitamente un modelo en el mensaje de error:
                const match = finalErrorMsg.match(/models\/([a-zA-Z0-9._-]+)/);
                if (match && match[1] && !testedModels.has(match[1])) {
                    modelToUse = match[1];
                    continue;
                }

                // 2. Si no, consultar modelos disponibles y elegir el siguiente mejor
                if (!available) {
                    available = await getAvailableGeminiModels(geminiApiKey).catch(() => null);
                }
                if (available && available.length > 0) {
                    const next = pickBestGeminiModel(available.filter(m => !testedModels.has(m.name.replace(/^models\//, ''))));
                    if (next && !testedModels.has(next)) {
                        modelToUse = next;
                        continue;
                    }
                }

                break;
            }

            if (!response || !response.ok) {
                throw new Error(finalErrorMsg || 'Error en Gemini API');
            }

            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!textResponse) {
                throw new Error('Respuesta vacía de Gemini');
            }
            let cleanedText = textResponse.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
            const resData = JSON.parse(cleanedText);

            // Combinar con análisis base local para garantizar plantilla oficial, usos y resumen estructurado
            const localBase = analyzeClaimWithAI(rawText, tipoRa);
            resData.plantillaOficial = localBase.plantillaOficial || (rule ? rule.plantilla : '');
            resData.usos = localBase.usos || (rule ? rule.usos : '');
            if (!resData.structuredSummary || resData.structuredSummary.trim().length === 0 || resData.structuredSummary === 'null') {
                resData.structuredSummary = localBase.structuredSummary;
            }
            if (!resData.verdict) {
                resData.verdict = localBase.verdict || (resData.score >= 80 ? 'Válido y Completo' : (resData.score >= 50 ? 'Incompleto / Advertencia' : 'Rechazable'));
            }

            resData.verdictDesc = `✨ (${modelToUse}) ` + resData.verdictDesc;
            renderAiAuditWithData(resData, tipoRa);
            showToast(`Análisis profundo completado (${modelToUse})` + (hadRedaction ? ' 🛡️ Datos sensibles protegidos' : ''), 'success');

        } catch (error) {
            console.error('Gemini Error:', error);
            showToast('Error LLM: ' + error.message, 'error');
        } finally {
            btnAiLlmAudit.disabled = false;
            btnAiLlmAudit.innerHTML = originalText;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }

    // ============================================
    // Feature: Reclamo Reiterado & Plantillas
    // ============================================
    function initReiterados() {
        if (!chkReiterado) return;

        chkReiterado.addEventListener('change', () => {
            const isActive = chkReiterado.checked;
            const section = document.querySelector('.reiterado-section');
            if (section) {
                section.classList.toggle('active', isActive);
            }
            if (reiteradoPanel) {
                if (isActive) {
                    reiteradoPanel.classList.remove('hidden');
                } else {
                    reiteradoPanel.classList.add('hidden');
                    if (badgeRecurrencia) badgeRecurrencia.classList.add('hidden');
                }
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });

        if (reiteradoRaId) {
            reiteradoRaId.addEventListener('input', () => {
                updateSinContactoTemplate();
            });
        }

        // Copiar plantilla al portapapeles
        document.querySelectorAll('.btn-copy-plantilla').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const targetId = btn.dataset.target;
                const targetElem = document.getElementById(targetId);
                if (!targetElem) return;

                const textToCopy = targetElem.textContent.trim();
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    const origHtml = btn.innerHTML;
                    btn.innerHTML = '<i data-lucide="check"></i> Copiado';
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                    showToast('Plantilla copiada al portapapeles', 'success');
                    setTimeout(() => {
                        btn.innerHTML = origHtml;
                        if (typeof lucide !== 'undefined') lucide.createIcons();
                    }, 1500);
                } catch {
                    showToast('Error al copiar plantilla', 'error');
                }
            });
        });

        // Insertar plantilla en Observaciones
        document.querySelectorAll('.btn-insert-plantilla').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.dataset.target;
                const targetElem = document.getElementById(targetId);
                if (!targetElem || !inputObservaciones) return;

                const textToInsert = targetElem.textContent.trim();
                const currentObs = inputObservaciones.value.trim();

                if (!currentObs) {
                    inputObservaciones.value = textToInsert;
                } else if (!currentObs.includes(textToInsert)) {
                    inputObservaciones.value = `${textToInsert}\n\n${currentObs}`;
                }

                inputObservaciones.dispatchEvent(new Event('input'));
                inputObservaciones.focus();
                showToast('Plantilla insertada en Observaciones', 'success');
            });
        });
    }

    function updateSinContactoTemplate() {
        const raVal = (reiteradoRaId && reiteradoRaId.value.trim()) ? reiteradoRaId.value.trim() : '########';
        if (plantillaTextSinContacto) {
            plantillaTextSinContacto.textContent = `[Sin Contacto] RA ${raVal}`;
        }
    }

    // ============================================
    // Feature: Backup & Restore JSON
    // ============================================
    function initBackupAndRestore() {
        if (btnExportBackup) {
            btnExportBackup.addEventListener('click', exportBackupJson);
        }
        if (btnImportBackup && fileImportBackup) {
            btnImportBackup.addEventListener('click', () => {
                fileImportBackup.click();
            });
            fileImportBackup.addEventListener('change', (e) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                    importBackupJson(file);
                    fileImportBackup.value = '';
                }
            });
        }
    }

    function exportBackupJson() {
        const backupData = {
            version: '1.0',
            appName: 'Gestiones BOT',
            exportDate: new Date().toISOString(),
            localStorage: {}
        };

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.startsWith('bot_') || key.startsWith('gestiones_') || key === 'operator_name' || key === 'pass_crm')) {
                backupData.localStorage[key] = localStorage.getItem(key);
            }
        }

        const jsonStr = JSON.stringify(backupData, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const dateStr = new Date().toISOString().slice(0, 10);
        a.href = url;
        a.download = `gestiones_bot_backup_${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Copia de seguridad (JSON) descargada con éxito', 'success');
    }

    function importBackupJson(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (!data.localStorage || typeof data.localStorage !== 'object') {
                    throw new Error('Formato de backup inválido');
                }
                let count = 0;
                for (const [key, val] of Object.entries(data.localStorage)) {
                    localStorage.setItem(key, val);
                    count++;
                }
                showToast(`Backup restaurado con éxito (${count} registros)`, 'success');
                setTimeout(() => {
                    location.reload();
                }, 1000);
            } catch (err) {
                console.error('Import error:', err);
                showToast('Error: archivo JSON de backup no válido', 'error');
            }
        };
        reader.readAsText(file);
    }

    // ============================================
    // Feature: Offline Sync Queue Auto-Flush
    // ============================================
    function initOfflineSyncQueue() {
        window.addEventListener('online', () => {
            showToast('Conexión restaurada. Sincronizando pendientes...', 'info');
            flushSyncQueue();
        });

        // Check queue periodically
        setInterval(flushSyncQueue, 30000);

        // Initial check if there are pending items
        const pending = getSyncQueue();
        if (pending.length > 0) {
            updateSyncStatus('pending', pending.length);
            if (navigator.onLine) {
                flushSyncQueue();
            }
        }
    }

    // ============================================
    // Feature: Global JS Tooltips
    // ============================================
    function initGlobalTooltips() {
        const globalTooltip = document.createElement('div');
        globalTooltip.className = 'global-tooltip';
        document.body.appendChild(globalTooltip);

        let tooltipTimeout;

        const setupTooltips = () => {
            const elements = document.querySelectorAll('[title]');
            elements.forEach(el => {
                const title = el.getAttribute('title');
                if (!title) return;
                
                el.setAttribute('data-original-title', title);
                el.removeAttribute('title');
                
                el.addEventListener('mouseenter', () => {
                    const text = el.getAttribute('data-original-title');
                    if (!text) return;
                    
                    globalTooltip.textContent = text;
                    const rect = el.getBoundingClientRect();
                    
                    const top = rect.top - globalTooltip.offsetHeight + window.scrollY;
                    const left = rect.left + (rect.width / 2) + window.scrollX;
                    
                    globalTooltip.style.top = `${top}px`;
                    globalTooltip.style.left = `${left}px`;
                    
                    clearTimeout(tooltipTimeout);
                    globalTooltip.classList.add('visible');
                });
                
                el.addEventListener('mouseleave', () => {
                    tooltipTimeout = setTimeout(() => {
                        globalTooltip.classList.remove('visible');
                    }, 50);
                });
            });
        };
        
        setupTooltips();

        const observer = new MutationObserver((mutations) => {
            let shouldSetup = false;
            mutations.forEach(m => {
                if (m.addedNodes.length > 0) {
                    m.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && (node.hasAttribute('title') || node.querySelector('[title]'))) {
                            shouldSetup = true;
                        }
                    });
                }
            });
            if (shouldSetup) setupTooltips();
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    initGlobalTooltips();

});
