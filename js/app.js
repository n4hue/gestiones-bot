document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // DOM Elements
    // ============================================
    const form = document.getElementById('registro-form');
    const inputCliente = document.getElementById('cliente-id');
    const selectRa = document.getElementById('tipo-ra');
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

    // New features DOM
    const paceIndicator = document.getElementById('pace-indicator');
    const btnQuickSummary = document.getElementById('btn-quick-summary');

    // Break Alarm DOM
    const breakIndicator = document.getElementById('break-indicator');
    const breakOverlay = document.getElementById('break-overlay');
    const breakOperatorName = document.getElementById('break-operator-name');
    const breakCountdown = document.getElementById('break-countdown');
    const btnDismissBreak = document.getElementById('btn-dismiss-break');

    // ============================================
    // Constants
    // ============================================
    const DAILY_GOAL = 30;
    const STORAGE_KEY = 'bot_gestiones_today';
    const DATE_KEY = 'bot_gestiones_date';
    const ARCHIVE_PREFIX = 'bot_gestiones_archive_';
    const GFORM_URL_KEY = 'bot_gform_url';
    const SHEETS_URL_KEY = 'bot_sheets_url';
    const THEME_KEY = 'bot_theme';
    const SOUND_KEY = 'bot_sound_enabled';
    const STATS_COLLAPSED_KEY = 'bot_stats_collapsed';
    const OPERATOR_NAME_KEY = 'bot_operator_name';
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
        '303 Deco en Bucle': '303 Deco en Bucle',

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
        '303 Deco en Bucle': '303 Deco en Bucle'
    };

    // List of tipo_ra values that qualify as "Gestiones Especiales" and need conditional fields
    const GESTIONES_ESPECIALES_VALUES = [
        'Analisis Tickets Cargados',
        'Analisis/Carga RA ID121',
        '303 Deco en Bucle'
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
    let operatorName = localStorage.getItem(OPERATOR_NAME_KEY) || '';
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
    if (inputOperatorName) inputOperatorName.value = operatorName;
    if (inputPassCrm) inputPassCrm.value = passCrm;

    // Password visibility toggle
    if (btnTogglePass && inputPassCrm) {
        btnTogglePass.addEventListener('click', () => {
            const isPassword = inputPassCrm.type === 'password';
            inputPassCrm.type = isPassword ? 'text' : 'password';
            btnTogglePass.textContent = isPassword ? '🙈' : '👁️';
            btnTogglePass.title = isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña';
        });
    }

    updateUI();
    startSessionTimer();

    // Initialize RA search filter (Quick-Pick)
    initRaSearchFilter();

    // Initialize conditional fields toggle
    initConditionalFields();

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
        const observaciones = inputObservaciones ? inputObservaciones.value.trim() : '';

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
            if (inputObservaciones) inputObservaciones.value = '';
            if (checkForm) checkForm.checked = false;

            // Reset conditional fields (Gestiones Especiales)
            if (camposEspeciales) {
                camposEspeciales.classList.remove('visible');
                setTimeout(() => camposEspeciales.classList.add('hidden'), 350);
                if (selectContactoEsp) selectContactoEsp.value = '';
                if (selectEstadoEsp) selectEstadoEsp.value = '';
            }

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
                gestiones[index].observaciones = observaciones;
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
                const gestion = {
                    id: Date.now().toString(),
                    cliente: cliente,
                    tipo_ra: tipoRa,
                    observaciones: observaciones,
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
                    if (inputObservaciones) inputObservaciones.disabled = true;

                    const checkInterval = setInterval(() => {
                        if (formWindow.closed) {
                            clearInterval(checkInterval);

                            btnSubmit.innerHTML = originalBtnHtml;
                            btnSubmit.disabled = false;
                            inputCliente.disabled = false;
                            selectRa.disabled = false;
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
            if (inputObservaciones) inputObservaciones.value = '';
            if (checkForm) checkForm.checked = false;
            btnSubmit.innerHTML = 'Registrar Gestión <span class="shortcut-hint">Ctrl+Enter</span>';
            btnCancelEdit.classList.add('hidden');
            inputCliente.focus();
        });
    }

    // ============================================
    // Feature 5: Keyboard Shortcuts
    // ============================================
    document.addEventListener('keydown', (e) => {
        // Ctrl+Enter to submit (opens form in background)
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            if (form.checkValidity()) {
                form.requestSubmit();
            } else {
                form.reportValidity();
            }
        }
        // Escape to cancel edit or close modals
        if (e.key === 'Escape') {
            if (editingId) {
                btnCancelEdit.click();
            }
            if (!settingsModal.classList.contains('hidden')) {
                settingsModal.classList.add('hidden');
            }
            if (jornadaModal && !jornadaModal.classList.contains('hidden')) {
                if (btnCancelarJornada) btnCancelarJornada.click();
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
        if (['inconveniente con insumos', 'problemas cableados red.500', 'reposición de equipos cm/dd', 'escalamiento teams'].includes(lower)) return 'ESCALAMIENTO N3';
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

            // Build secondary details row (obs + equipos)
            let detailsHtml = '';
            if ((g.observaciones && g.observaciones.trim()) || equiposHtml) {
                detailsHtml = `<div class="gestion-details">`;
                if (g.observaciones && g.observaciones.trim()) {
                    detailsHtml += `<div class="gestion-obs">${g.observaciones}</div>`;
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
                    <span class="gestion-tipo" title="${g.tipo_ra}">${shortRa}</span>
                    <div class="gestion-actions">
                        <button class="btn-icon" title="Editar" onclick="editGestion('${g.id}')">✏️</button>
                        <button class="btn-icon" title="Eliminar" onclick="deleteGestion('${g.id}')">🗑️</button>
                    </div>
                </div>
                ${detailsHtml}
            `;
            historyBody.appendChild(card);
        });
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
            paceIndicator.innerHTML = `<span class="pace-dot"></span>Felicidades, llegaste al objetivo diario de gestiones. Podes ir a dormirte una siestita💤😴`;
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
    // Feature 1: Google Sheets Sync
    // ============================================
    function syncToGoogleSheets(gestion) {
        if (!sheetsUrl) return;

        updateSyncStatus('sending');

        fetch(sheetsUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'add', data: gestion })
        })
            .then(() => {
                // With no-cors we can't read response, but if no error => assume success
                updateSyncStatus('success');
            })
            .catch(err => {
                console.error('Sync error:', err);
                updateSyncStatus('error');
            });
    }

    function updateSyncStatus(status) {
        if (!syncStatusEl) return;

        syncStatusEl.classList.remove('hidden', 'sending', 'success', 'error');
        syncStatusEl.classList.add(status);

        const textEl = syncStatusEl.querySelector('.sync-text');
        if (textEl) {
            switch (status) {
                case 'sending': textEl.textContent = 'Sincronizando...'; break;
                case 'success': textEl.textContent = 'Sincronizado'; break;
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
            btnTheme.textContent = theme === 'dark' ? '☀️' : '🌙';
            btnTheme.title = theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
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
            if (inputObservaciones) inputObservaciones.value = gestion.observaciones || '';
            if (checkForm) checkForm.checked = true;

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
                // Feature 1 update: Delete from Google Sheets
                updateSyncStatus('sending');
                fetch(sheetsUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'delete',
                        id: id,
                        fecha: gestionToDelete.fecha
                    })
                })
                    .then(() => updateSyncStatus('success'))
                    .catch(() => updateSyncStatus('error'));
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
        const headers = ['ID', 'Fecha', 'Hora', 'N_Cliente', 'Tipo_RA', 'Observaciones', 'CM_MAC', 'MTA_MAC', 'ONT_MAC', 'Decos', 'Linea'];
        const csvRows = [];
        csvRows.push(headers.join(','));

        const exportData = [...gestiones].reverse();

        exportData.forEach(g => {
            const tipoRaEscaped = `"${g.tipo_ra.replace(/"/g, '""')}"`;
            const obsEscaped = g.observaciones ? `"${g.observaciones.replace(/"/g, '""')}"` : '""';
            const eq = g.equipos || {};
            const cm = eq.cm || '';
            const mta = eq.mta || '';
            const ont = eq.ont || '';
            const decos = eq.decos && eq.decos.length ? `"${eq.decos.join(' / ')}"` : '""';
            const linea = eq.linea || '';

            const row = [g.id, g.fecha, g.hora, g.cliente, tipoRaEscaped, obsEscaped, cm, mta, ont, decos, linea];
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
    // Feature: Quick Summary (Resumen Rápido)
    // ============================================
    if (btnQuickSummary) {
        btnQuickSummary.addEventListener('click', () => {
            if (gestiones.length === 0) {
                showToast('No hay gestiones registradas aún', 'info');
                return;
            }

            const today = new Date();
            const dateStr = today.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
            const count = gestiones.length;

            // Calculate per-hour rate
            let perHour = '—';
            if (count > 0) {
                const firstG = gestiones[gestiones.length - 1];
                const [h, m, s] = firstG.hora.split(':').map(Number);
                const startTime = new Date();
                startTime.setHours(h, m, s, 0);
                const elapsedH = (Date.now() - startTime) / 3600000;
                if (elapsedH > 0.05) perHour = (count / elapsedH).toFixed(1);
            }

            // Top categories
            const catCounts = {};
            gestiones.forEach(g => {
                const cat = getCategory(g.tipo_ra);
                catCounts[cat] = (catCounts[cat] || 0) + 1;
            });
            const topCats = Object.entries(catCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([cat, c]) => `${cat} (${c})`)
                .join(' | ');

            const streak = calculateStreak();

            const summary = `Jornada ${dateStr} | ${count} gestiones | ${perHour} g/h\nTop: ${topCats}\nRacha: ${streak} días 🔥`;

            navigator.clipboard.writeText(summary).then(() => {
                showToast('📋 Resumen copiado al portapapeles', 'success');
            }).catch(() => {
                // Fallback: show in toast
                showToast(summary, 'info');
            });
        });
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

            // Save operator settings
            operatorName = inputOperatorName ? inputOperatorName.value.trim() : '';
            localStorage.setItem(OPERATOR_NAME_KEY, operatorName);

            passCrm = inputPassCrm ? inputPassCrm.value.trim() : '';
            localStorage.setItem(PASS_CRM_KEY, passCrm);

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
                    <button type="button" class="btn-copy btn-copy-deco" title="Copiar">📋</button>
                    <button type="button" class="btn-remove-deco" title="Quitar Deco">➖</button>
                </div>
            `;
            decosContainer.appendChild(group);

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
                const original = btn.textContent;
                btn.textContent = '✓';
                btn.classList.add('copied');
                setTimeout(() => {
                    if (btn) {
                        btn.textContent = original;
                        btn.classList.remove('copied');
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

        selectRa.addEventListener('change', () => {
            const val = selectRa.value;
            if (val) {
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
        searchIcon.textContent = '🔍';
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar tipo de gestión...';
        searchInput.autocomplete = 'off';
        wrapper.appendChild(searchIcon);
        wrapper.appendChild(searchInput);

        selectRa.parentNode.insertBefore(wrapper, selectRa);

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
            breakAudio.volume = 0.5;
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

});
