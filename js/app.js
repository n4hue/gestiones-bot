import {
    ARCHIVE_PREFIX,
    BREAK_ALARM_KEY,
    COMPACT_KEY,
    DAILY_GOAL,
    DATE_KEY,
    DAY_NAMES_ES,
    DAY_SHORT_NAMES_ES,
    FRANCO_SWAP_DAY_GIV_KEY,
    FRANCO_SWAP_DAY_REC_KEY,
    FRANCO_SWAP_PARTNER_KEY,
    GEMINI_API_KEY_STORAGE,
    GEMINI_MODEL_STORAGE,
    GESTIONES_ESPECIALES_VALUES,
    GFORM_ENTRY_CLIENTE,
    GFORM_ENTRY_CONTACTO_CALLCONTACT,
    GFORM_ENTRY_CONTACTO_ESP,
    GFORM_ENTRY_CONTACTO_RA,
    GFORM_ENTRY_ESTADO,
    GFORM_ENTRY_ESTADO_CALLCONTACT,
    GFORM_ENTRY_ESTADO_ESP,
    GFORM_ENTRY_ESTADO_RA,
    GFORM_ENTRY_GESTIONES_ESP,
    GFORM_ENTRY_GESTION_RA,
    GFORM_ENTRY_OPERATOR_NAME,
    GFORM_ENTRY_PASS_CRM,
    GFORM_ENTRY_TIPO_GESTION,
    GFORM_ESP_MAPPING,
    GFORM_RA_MAPPING,
    GFORM_URL_KEY,
    GOOGLE_FORM_URL,
    OPERATOR_NAME_KEY,
    OPERATOR_SCHEDULE,
    PASS_CRM_KEY,
    SHEETS_URL_KEY,
    SOUND_KEY,
    STATS_COLLAPSED_KEY,
    STORAGE_KEY,
    SYNC_QUEUE_KEY,
    THEME_KEY
} from './modules/config.js';
import { CATEGORY_COLORS, getCategory } from './modules/categories.js';
import { calculateMta, escapeHtml, formatMac } from './modules/utils.js';
import { RA_AI_RULES, analyzeClaimWithAI, isPasswordEvaded } from './modules/ai-rules.js';
import { createCombobox, enhanceSelects } from './modules/combobox.js';

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
    const selectFrancoSwapPartner = document.getElementById('franco-swap-partner-select');
    const francoSwapDetailsCard = document.getElementById('franco-swap-details-card');

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

    // Hamburger Menu DOM
    const btnHamburger = document.getElementById('btn-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

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
    // State
    // ============================================
    let gestiones = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let sheetsUrl = localStorage.getItem(SHEETS_URL_KEY) || '';
    let editingId = null;
    let activeCategoryFilter = ''; // '' = todas las categorías (chips del historial)
    let timerInterval = null;
    let soundEnabled = localStorage.getItem(SOUND_KEY) !== 'false';
    let breakAlarmEnabled = localStorage.getItem(BREAK_ALARM_KEY) !== 'false';
    let operatorName = localStorage.getItem(OPERATOR_NAME_KEY) || '';
    let geminiApiKey = localStorage.getItem(GEMINI_API_KEY_STORAGE) || '';
    let geminiModel = localStorage.getItem(GEMINI_MODEL_STORAGE) || 'auto';
    let passCrm = localStorage.getItem(PASS_CRM_KEY) || '';
    let francoSwapPartner = localStorage.getItem(FRANCO_SWAP_PARTNER_KEY) || '';
    let francoSwapDayReceived = localStorage.getItem(FRANCO_SWAP_DAY_REC_KEY) || '';
    let francoSwapDayGiven = localStorage.getItem(FRANCO_SWAP_DAY_GIV_KEY) || '';

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
    // La lista de operadores sale de OPERATOR_SCHEDULE (única fuente de verdad)
    if (inputOperatorName) {
        Object.keys(OPERATOR_SCHEDULE).sort((a, b) => a.localeCompare(b, 'es')).forEach(name => {
            inputOperatorName.add(new Option(name, name));
        });
    }

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

    populateFrancoSwapPartnerSelect();
    renderFrancoSwapDetails();

    if (inputOperatorName) {
        inputOperatorName.addEventListener('change', () => {
            populateFrancoSwapPartnerSelect();
            renderFrancoSwapDetails();
        });
    }

    if (selectFrancoSwapPartner) {
        selectFrancoSwapPartner.addEventListener('change', () => {
            renderFrancoSwapDetails();
        });
    }

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
                    geminiModelStatus.innerHTML = `<span style="color: #10B981; font-weight: 600;">✓ Conexión y generación exitosa.</span> ${models.length} modelos detectados. Activo: <strong>${escapeHtml(best)}</strong>${speedNote}`;
                }
                showToast(`Modelo más rápido asignado: ${best}`, 'success');
            } catch (err) {
                console.error('Error al probar Gemini:', err);
                if (geminiModelStatus) {
                    geminiModelStatus.innerHTML = `<span style="color: #EF4444; font-weight: 600;">✗ Error:</span> ${escapeHtml(err.message)}`;
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
    const raCombo = initRaCombobox();
    // El resto de los desplegables (formulario y Ajustes, incluidos los que se
    // generan después) usan el mismo componente visual.
    enhanceSelects(document.body);

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
    initHamburgerMenu();

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
            if (raCombo) raCombo.sync();
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
                gestiones[index].contacto = selectContactoEsp ? selectContactoEsp.value : '';
                gestiones[index].estado_gestion = selectEstadoEsp ? selectEstadoEsp.value : '';
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
                    contacto: selectContactoEsp ? selectContactoEsp.value : '',
                    estado_gestion: selectEstadoEsp ? selectEstadoEsp.value : '',
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
                    if (raCombo) raCombo.setDisabled(true);
                    if (selectContactoEsp) selectContactoEsp.disabled = true;
                    if (selectEstadoEsp) selectEstadoEsp.disabled = true;
                    if (inputReclamoTexto) inputReclamoTexto.disabled = true;
                    if (inputObservaciones) inputObservaciones.disabled = true;

                    const checkInterval = setInterval(() => {
                        if (formWindow.closed) {
                            clearInterval(checkInterval);

                            btnSubmit.innerHTML = originalBtnHtml;
                            btnSubmit.disabled = false;
                            inputCliente.disabled = false;
                            selectRa.disabled = false;
                            if (raCombo) raCombo.setDisabled(false);
                            if (selectContactoEsp) selectContactoEsp.disabled = false;
                            if (selectEstadoEsp) selectEstadoEsp.disabled = false;
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
            if (raCombo) raCombo.sync();
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
            if (raCombo) raCombo.focus();
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

    function getFilteredGestiones() {
        let filtered = [...gestiones];

        const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
        const catFilter = activeCategoryFilter;

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

    // ============================================
    // Render History — Timeline Cards
    // ============================================
    function renderHistory() {
        historyBody.innerHTML = '';
        // Antes del posible return temprano: los contadores deben reflejar el estado
        // aunque no haya tarjetas que mostrar.
        updateCategoryChipCounts();

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
                if (eq.cm) parts.push(`CM: ${escapeHtml(eq.cm)}`);
                if (eq.mta) parts.push(`MTA: ${escapeHtml(eq.mta)}`);
                if (eq.ont) parts.push(`ONT: ${escapeHtml(eq.ont)}`);
                if (eq.decos && eq.decos.length) parts.push(`Decos: ${eq.decos.length}`);
                if (eq.linea) parts.push(`Línea: ${escapeHtml(eq.linea)}`);
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
            const reiteradoTitle = `Reclamo Reiterado${g.ra_id ? ' (RA: ' + g.ra_id + ')' : ''}`;

            const card = document.createElement('div');
            card.className = 'gestion-card';
            card.dataset.id = g.id;
            card.dataset.cat = category;
            card.innerHTML = `
                <div class="gestion-card-row">
                    <span class="gestion-hora">${escapeHtml(g.hora)}</span>
                    <button type="button" class="gestion-cliente" data-action="copy-cliente" title="Copiar N° de cliente">${escapeHtml(g.cliente)}</button>
                    ${g.is_reiterado ? `<span class="badge-reiterado-mini" title="${escapeHtml(reiteradoTitle)}"><i data-lucide="repeat"></i><span class="badge-text">Reiterado</span></span>` : ''}
                    <span class="gestion-tipo" title="${escapeHtml(g.tipo_ra)}">${escapeHtml(shortRa)}</span>
                    <div class="gestion-actions">
                        <button type="button" class="btn-icon" data-action="edit" title="Editar" aria-label="Editar gestión"><i data-lucide="pencil"></i></button>
                        <button type="button" class="btn-icon" data-action="delete" title="Eliminar" aria-label="Eliminar gestión"><i data-lucide="trash-2"></i></button>
                    </div>
                </div>
                ${detailsHtml}
            `;
            historyBody.appendChild(card);
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ root: historyBody });
        }
    }

    // Acciones de las tarjetas del historial (delegación: un solo listener)
    historyBody.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const card = btn.closest('.gestion-card');
        if (!card) return;
        const id = card.dataset.id;
        switch (btn.dataset.action) {
            case 'edit': editGestion(id); break;
            case 'delete': deleteGestion(id); break;
            case 'copy-cliente': {
                const g = gestiones.find(x => x.id === id);
                if (g) copyText(g.cliente, `N° de cliente copiado: ${g.cliente}`);
                break;
            }
        }
    });

    function copyText(text, successMsg = 'Copiado al portapapeles') {
        if (!navigator.clipboard) {
            showToast('El navegador no permite copiar automáticamente', 'error');
            return Promise.resolve(false);
        }
        return navigator.clipboard.writeText(text)
            .then(() => { showToast(successMsg, 'success'); return true; })
            .catch(() => { showToast('No se pudo copiar al portapapeles', 'error'); return false; });
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
                statPerHour.textContent = '—';
            }
        }

        // Streak
        if (statStreak) {
            const streak = calculateStreak();
            statStreak.innerHTML = `${streak} <i data-lucide="flame" class="stat-flame"></i>`;
            if (typeof lucide !== 'undefined') lucide.createIcons({ root: statStreak });
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
                statTopCategory.textContent = '—';
                statTopCategory.classList.remove('small-text');
            }
        }

        // Bar chart
        if (categoryChart) {
            const entries = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

            if (entries.length === 0) {
                categoryChart.innerHTML = '<p class="empty-state stats-empty">Registrá tu primera gestión del día para ver tu ritmo y la distribución por categoría.</p>';
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
        0: 'assets/ZeldaOpenChestLoot-SoundEffectforediting.mp3',  // Domingo
        1: 'assets/level-up-sound.mp3',              // Lunes (FF Victory Fanfare)
        2: 'assets/congratulations-you-are-moving-to-the-next-level.mp3',         // Martes
        3: 'assets/en-la-radio-hay-tambien-un-toro-pollito-pio-letra.mp3',           // Miércoles
        4: 'assets/gta-sanandreas-missionpassed.mp3',               // Jueves
        5: 'assets/YouWinPerfect.mp3',                   // Viernes
        6: 'assets/YouWin-WiiSports.mp3'            // Sábado
    };

    // Specific playback start time (in seconds) per day if required (e.g. Wednesday starts at second 26)
    const CELEBRATION_START_TIMES = {
        3: 26 // Miércoles: arrancar desde el segundo 26
    };

    function triggerGoalCelebration() {
        if (celebrationTriggered) return;
        celebrationTriggered = true;

        // 1. Play day-of-week celebration sound 🎶
        const dayOfWeek = new Date().getDay(); // 0=Dom, 1=Lun, ..., 6=Sab
        const soundFile = CELEBRATION_SOUNDS[dayOfWeek] || 'assets/level-up-sound.mp3';
        const startTime = CELEBRATION_START_TIMES[dayOfWeek] || (soundFile.includes('en-la-radio-hay-tambien-un-toro-pollito-pio-letra') ? 26 : 0);
        try {
            const celebrationAudio = new Audio(soundFile);
            celebrationAudio.volume = 0.7;
            if (startTime > 0) {
                celebrationAudio.currentTime = startTime;
                celebrationAudio.addEventListener('loadedmetadata', () => {
                    if (celebrationAudio.currentTime < startTime) {
                        celebrationAudio.currentTime = startTime;
                    }
                }, { once: true });
            }
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
    // options.action = { label, onClick } agrega un botón (ej. "Deshacer").
    // options.duration = ms visibles (default 3000). options.onExpire se llama si el
    // toast se cierra solo, sin que se haya usado la acción.
    function showToast(message, type = 'info', options = {}) {
        if (!toastContainer) return null;

        const icons = { success: 'check-circle-2', error: 'x-circle', info: 'info', warning: 'alert-triangle' };
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

        const iconWrap = document.createElement('span');
        iconWrap.className = 'toast-icon';
        iconWrap.innerHTML = `<i data-lucide="${icons[type] || icons.info}"></i>`;

        // El texto siempre va como textContent: nunca se interpreta como HTML.
        // Se quita el emoji inicial que traían los mensajes viejos (el ícono ya lo da el tipo).
        const text = document.createElement('span');
        text.className = 'toast-text';
        text.textContent = String(message).replace(/^\p{Extended_Pictographic}️?\s*/u, '');

        toast.append(iconWrap, text);

        let actionUsed = false;
        const dismiss = () => {
            if (toast.classList.contains('removing')) return;
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        };

        if (options.action) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'toast-action';
            btn.textContent = options.action.label;
            btn.addEventListener('click', () => {
                actionUsed = true;
                options.action.onClick();
                dismiss();
            });
            toast.appendChild(btn);
        }

        toastContainer.appendChild(toast);
        if (typeof lucide !== 'undefined') lucide.createIcons({ root: iconWrap });

        setTimeout(() => {
            if (!actionUsed && options.onExpire) options.onExpire();
            dismiss();
        }, options.duration || 3000);

        return toast;
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
    function editGestion(id) {
        const gestion = gestiones.find(g => g.id === id);
        if (gestion) {
            editingId = id;
            inputCliente.value = gestion.cliente;
            selectRa.value = gestion.tipo_ra;
            selectRa.dispatchEvent(new Event('change'));
            if (gestion.contacto && selectContactoEsp) {
                selectContactoEsp.value = gestion.contacto;
            }
            if (gestion.estado_gestion && selectEstadoEsp) {
                selectEstadoEsp.value = gestion.estado_gestion;
            }
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
    }

    // Eliminar con "Deshacer": la gestión se quita al instante y se puede restaurar
    // durante UNDO_DELETE_MS. Recién al vencer ese plazo se sincroniza el borrado con Sheets.
    const UNDO_DELETE_MS = 6000;
    const pendingDeletes = new Map(); // id -> payload de borrado para Sheets

    function sendDeleteToSheets(deletePayload) {
        if (!sheetsUrl) return;
        if (!navigator.onLine) {
            addToSyncQueue(deletePayload);
            return;
        }
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

    // Si se cierra la pestaña con borrados pendientes, quedan en la cola offline
    // (se envían en la próxima carga).
    window.addEventListener('pagehide', () => {
        if (!sheetsUrl) return;
        pendingDeletes.forEach(payload => addToSyncQueue(payload));
        pendingDeletes.clear();
    });

    async function deleteGestion(id) {
        const index = gestiones.findIndex(g => g.id === id);
        if (index === -1) return;
        const gestionToDelete = gestiones[index];

        if (editingId === id && btnCancelEdit) btnCancelEdit.click();

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

        pendingDeletes.set(id, { action: 'delete', id: id, fecha: gestionToDelete.fecha });

        showToast(`Gestión ${gestionToDelete.cliente} eliminada`, 'info', {
            duration: UNDO_DELETE_MS,
            action: {
                label: 'Deshacer',
                onClick: () => {
                    pendingDeletes.delete(id);
                    const restoreAt = Math.min(index, gestiones.length);
                    gestiones.splice(restoreAt, 0, gestionToDelete);
                    saveData();
                    updateUI();
                    startSessionTimer();
                    showToast('Gestión restaurada', 'success');
                }
            },
            onExpire: () => {
                const payload = pendingDeletes.get(id);
                if (!payload) return;
                pendingDeletes.delete(id);
                sendDeleteToSheets(payload);
            }
        });
    }

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
            btnOpenFormInicio.innerHTML = '<i data-lucide="external-link"></i> Abrir Form';
            if (typeof lucide !== 'undefined') lucide.createIcons({ root: btnOpenFormInicio });
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
                ? '<i data-lucide="rocket"></i> Iniciar Nueva Jornada'
                : '<i data-lucide="lock"></i> Iniciar Nueva Jornada';
            if (typeof lucide !== 'undefined') lucide.createIcons({ root: btnIniciarJornada });
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
                btnOpenFormInicio.textContent = 'Esperando…';
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
                        btnOpenFormInicio.innerHTML = '<i data-lucide="check"></i> Form completado';
                        if (typeof lucide !== 'undefined') lucide.createIcons({ root: btnOpenFormInicio });
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

        // Cada celda va entre comillas. Si arranca con = + - @ se antepone ' para que
        // Excel no la interprete como fórmula (inyección CSV).
        const csvCell = (value) => {
            let s = value == null ? '' : String(value);
            if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
            return `"${s.replace(/"/g, '""')}"`;
        };

        exportData.forEach(g => {
            const eq = g.equipos || {};
            const decos = eq.decos && eq.decos.length ? eq.decos.join(' / ') : '';
            const row = [g.id, g.fecha, g.hora, g.cliente, g.tipo_ra, g.reclamo_datos, g.observaciones,
                eq.cm, eq.mta, eq.ont, decos, eq.linea];
            csvRows.push(row.map(csvCell).join(','));
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
            populateFrancoSwapPartnerSelect();
            if (selectFrancoSwapPartner) selectFrancoSwapPartner.value = francoSwapPartner;
            renderFrancoSwapDetails();
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

            // Save operator settings
            operatorName = inputOperatorName ? inputOperatorName.value.trim() : '';
            localStorage.setItem(OPERATOR_NAME_KEY, operatorName);

            passCrm = inputPassCrm ? inputPassCrm.value.trim() : '';
            localStorage.setItem(PASS_CRM_KEY, passCrm);

            // Save franco swap
            const newSwapPartner = selectFrancoSwapPartner ? selectFrancoSwapPartner.value : '';
            francoSwapPartner = (newSwapPartner && newSwapPartner !== operatorName) ? newSwapPartner : '';
            localStorage.setItem(FRANCO_SWAP_PARTNER_KEY, francoSwapPartner);

            const pairSelect = document.getElementById('swap-day-pair-select');
            if (pairSelect && francoSwapPartner) {
                const [rec, giv] = pairSelect.value.split('-');
                francoSwapDayReceived = rec;
                francoSwapDayGiven = giv;
            } else if (francoSwapPartner) {
                const mySched = OPERATOR_SCHEDULE[operatorName];
                const partSched = OPERATOR_SCHEDULE[francoSwapPartner];
                if (mySched && partSched) {
                    const pDiff = partSched.francos.filter(d => !mySched.francos.includes(d));
                    const mDiff = mySched.francos.filter(d => !partSched.francos.includes(d));
                    if (pDiff.length === 1 && mDiff.length === 1) {
                        francoSwapDayReceived = String(pDiff[0]);
                        francoSwapDayGiven = String(mDiff[0]);
                    }
                }
            } else {
                francoSwapDayReceived = '';
                francoSwapDayGiven = '';
            }
            localStorage.setItem(FRANCO_SWAP_DAY_REC_KEY, francoSwapDayReceived);
            localStorage.setItem(FRANCO_SWAP_DAY_GIV_KEY, francoSwapDayGiven);

            updateNextBreakIndicator();

            // Save Gemini API Key & Model
            const newGeminiKey = inputGeminiApiKey ? inputGeminiApiKey.value.trim() : '';
            geminiApiKey = newGeminiKey;
            localStorage.setItem(GEMINI_API_KEY_STORAGE, geminiApiKey);

            const newGeminiModel = selectGeminiModel ? selectGeminiModel.value : 'auto';
            geminiModel = newGeminiModel;
            localStorage.setItem(GEMINI_MODEL_STORAGE, geminiModel);

            settingsModal.classList.add('hidden');
            showToast(francoSwapPartner ? `Configuración guardada (Franco cambiado con ${francoSwapPartner})` : 'Configuración guardada', 'success');
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
        if (estadoValue) {
            params.push(`${GFORM_ENTRY_ESTADO}=${encodeURIComponent(estadoValue)}`);
        }
        if (clienteValue) {
            params.push(`${GFORM_ENTRY_CLIENTE}=${encodeURIComponent(clienteValue)}`);
        }
        if (tipoRaValue) {
            // Handle the additional fields (Contacto / Estado Gestión)
            const contactoValue = selectContactoEsp ? selectContactoEsp.value : '';
            const estadoExtraValue = selectEstadoEsp ? selectEstadoEsp.value : '';

            if (tipoRaValue === 'Callcontact') {
                // Rama 2: Callcontact
                params.push(`${GFORM_ENTRY_TIPO_GESTION}=${encodeURIComponent('Callcontact')}`);
                if (contactoValue) {
                    params.push(`${GFORM_ENTRY_CONTACTO_CALLCONTACT}=${encodeURIComponent(contactoValue)}`);
                }
                if (estadoExtraValue) {
                    params.push(`${GFORM_ENTRY_ESTADO_CALLCONTACT}=${encodeURIComponent(estadoExtraValue)}`);
                }
            } else if (GESTIONES_ESPECIALES_VALUES.includes(tipoRaValue)) {
                // Rama 3: Gestiones Especiales
                params.push(`${GFORM_ENTRY_TIPO_GESTION}=${encodeURIComponent('Gestiones Especiales')}`);
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
                // Rama 1: RAs
                params.push(`${GFORM_ENTRY_TIPO_GESTION}=${encodeURIComponent('RAs')}`);
                const formValue = GFORM_RA_MAPPING[tipoRaValue];
                if (formValue) {
                    params.push(`${GFORM_ENTRY_GESTION_RA}=${encodeURIComponent(formValue)}`);
                }
                if (contactoValue) {
                    params.push(`${GFORM_ENTRY_CONTACTO_RA}=${encodeURIComponent(contactoValue)}`);
                }
                if (estadoExtraValue) {
                    params.push(`${GFORM_ENTRY_ESTADO_RA}=${encodeURIComponent(estadoExtraValue)}`);
                }
            }
        }

        return url + separator + params.join('&');
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

    function addDecoInput() {
        if (!decosContainer) return null;
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

        const input = group.querySelector('.deco-input');
        setupMacInput(input);

        group.querySelector('.btn-remove-deco').addEventListener('click', () => {
            group.remove();
            decosContainer.querySelectorAll('.deco-group label').forEach((lbl, i) => {
                lbl.textContent = 'Deco MAC ' + (i + 1);
            });
        });

        setupCopyButton(group.querySelector('.btn-copy'), input);
        return input;
    }

    const btnAddDeco = document.getElementById('btn-add-deco');
    if (btnAddDeco && decosContainer) {
        btnAddDeco.addEventListener('click', () => {
            addDecoInput();
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

                // Determine type
                const isCallcontact = (val === 'Callcontact');
                const isEspecial = GESTIONES_ESPECIALES_VALUES.includes(val);

                // Update Labels
                if (labelContacto) {
                    if (isCallcontact) {
                        labelContacto.textContent = 'Gestión CallContact';
                    } else if (isEspecial) {
                        labelContacto.textContent = 'Contacto Especial';
                    } else {
                        labelContacto.textContent = 'Estado Contacto RA';
                    }
                }
                if (labelEstado) {
                    if (isCallcontact) {
                        labelEstado.textContent = 'Estado Gestión CallContact';
                    } else if (isEspecial) {
                        labelEstado.textContent = 'Estado Gestión Especial';
                    } else {
                        labelEstado.textContent = 'Estado Gestión RA';
                    }
                }

                // Populate Contacto Select
                if (selectContactoEsp) {
                    const prevValue = selectContactoEsp.value;
                    selectContactoEsp.innerHTML = '<option value="" disabled selected>Seleccionar...</option>';
                    const contactoOpts = (isCallcontact || isEspecial)
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
                    const estadoOpts = (isCallcontact || isEspecial)
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
    // Feature: Combobox "Tipo de Gestión / RA"
    // ============================================
    // Un solo control para buscar y elegir (ver js/modules/combobox.js). El
    // <select id="tipo-ra"> queda oculto como fuente de verdad.
    function initRaCombobox() {
        if (!selectRa) return null;
        return createCombobox(selectRa, {
            searchable: true,
            clearable: true,
            inputId: 'ra-combo-input',
            placeholder: 'Buscar: sin tono, netflix, mesh… (Alt+G)',
            requiredMessage: 'Elegí un tipo de gestión de la lista',
            onClear: () => showToast('Tipo de gestión borrado', 'info'),
            // Siguiente campo lógico después de elegir
            onChoose: () => requestAnimationFrame(() => {
                if (camposEspeciales && !camposEspeciales.classList.contains('hidden') && selectContactoEsp) {
                    const contactoInput = document.getElementById('contacto-especial-combo');
                    (contactoInput || selectContactoEsp).focus();
                } else if (inputObservaciones) {
                    inputObservaciones.focus();
                }
            })
        });
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

    function getOperatorSchedule(targetDate = new Date()) {
        if (!operatorName) return null;
        const baseSchedule = OPERATOR_SCHEDULE[operatorName];
        if (!baseSchedule) return null;

        if (!francoSwapPartner || !OPERATOR_SCHEDULE[francoSwapPartner] || francoSwapPartner === operatorName) {
            return {
                francos: [...baseSchedule.francos],
                breaks: [...baseSchedule.breaks],
                isSwapped: false
            };
        }

        const partnerSchedule = OPERATOR_SCHEDULE[francoSwapPartner];
        const partnerDiff = partnerSchedule.francos.filter(d => !baseSchedule.francos.includes(d));
        const myDiff = baseSchedule.francos.filter(d => !partnerSchedule.francos.includes(d));

        if (partnerDiff.length === 0) {
            return {
                francos: [...baseSchedule.francos],
                breaks: [...baseSchedule.breaks],
                isSwapped: false
            };
        }

        let received = [];
        let given = [];

        if (partnerDiff.length === 1 && myDiff.length === 1) {
            received = [partnerDiff[0]];
            given = [myDiff[0]];
        } else {
            if (francoSwapDayReceived === 'all' || francoSwapDayGiven === 'all') {
                received = [...partnerDiff];
                given = [...myDiff];
            } else if (francoSwapDayReceived !== '' && francoSwapDayGiven !== '' && !isNaN(Number(francoSwapDayReceived)) && !isNaN(Number(francoSwapDayGiven))) {
                received = [Number(francoSwapDayReceived)];
                given = [Number(francoSwapDayGiven)];
            } else {
                received = [partnerDiff[0]];
                given = [myDiff[0]];
            }
        }

        const effectiveFrancos = baseSchedule.francos.filter(d => !given.includes(d)).concat(received);
        const dayOfWeek = targetDate.getDay();
        const isSwappedWorkingDay = given.includes(dayOfWeek);
        const isSwappedFrancoDay = received.includes(dayOfWeek);

        // When working on a day that would normally be a franco, use the partner's breaks
        const breaksForToday = isSwappedWorkingDay ? partnerSchedule.breaks : baseSchedule.breaks;

        return {
            francos: effectiveFrancos,
            breaks: breaksForToday,
            isSwapped: true,
            partnerName: francoSwapPartner,
            receivedDays: received,
            givenDays: given,
            isSwappedWorkingDay,
            isSwappedFrancoDay
        };
    }

    function populateFrancoSwapPartnerSelect() {
        if (!selectFrancoSwapPartner) return;
        const currentSelected = selectFrancoSwapPartner.value || francoSwapPartner;
        selectFrancoSwapPartner.innerHTML = '<option value="">Sin cambio (mis francos habituales)</option>';

        const currentOp = inputOperatorName ? inputOperatorName.value : operatorName;

        Object.keys(OPERATOR_SCHEDULE).forEach(opName => {
            if (opName === currentOp) return; // Don't list the current user
            const opData = OPERATOR_SCHEDULE[opName];
            const francosFormatted = opData.francos.map(d => DAY_SHORT_NAMES_ES[d]).join(', ');
            const opt = document.createElement('option');
            opt.value = opName;
            opt.textContent = `${opName} (Francos: ${francosFormatted})`;
            if (opName === currentSelected) {
                opt.selected = true;
            }
            selectFrancoSwapPartner.appendChild(opt);
        });
    }

    function renderFrancoSwapDetails() {
        if (!francoSwapDetailsCard) return;

        const currentOp = inputOperatorName ? inputOperatorName.value : operatorName;
        const partnerName = selectFrancoSwapPartner ? selectFrancoSwapPartner.value : francoSwapPartner;

        if (!currentOp) {
            francoSwapDetailsCard.classList.remove('hidden');
            francoSwapDetailsCard.classList.remove('active');
            francoSwapDetailsCard.innerHTML = `
                <div style="display:flex; align-items:center; gap:0.4rem; color:var(--text-muted);">
                    <i data-lucide="info"></i>
                    <span>Primero seleccioná tu <strong>Nombre de Operador</strong> arriba para configurar un cambio de franco.</span>
                </div>
            `;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
        }

        if (!partnerName || !OPERATOR_SCHEDULE[partnerName] || partnerName === currentOp) {
            francoSwapDetailsCard.classList.add('hidden');
            francoSwapDetailsCard.classList.remove('active');
            francoSwapDetailsCard.innerHTML = '';
            return;
        }

        const mySchedule = OPERATOR_SCHEDULE[currentOp];
        const partnerSchedule = OPERATOR_SCHEDULE[partnerName];

        if (!mySchedule || !partnerSchedule) {
            francoSwapDetailsCard.classList.add('hidden');
            return;
        }

        const partnerDiff = partnerSchedule.francos.filter(d => !mySchedule.francos.includes(d));
        const myDiff = mySchedule.francos.filter(d => !partnerSchedule.francos.includes(d));

        francoSwapDetailsCard.classList.remove('hidden');
        francoSwapDetailsCard.classList.add('active');

        // Case 0: identical francos
        if (partnerDiff.length === 0) {
            francoSwapDetailsCard.innerHTML = `
                <div class="franco-swap-header">
                    <span>🔄 Intercambio de Franco</span>
                    <span class="franco-swap-status-badge swap-on">Mismos francos</span>
                </div>
                <p style="color:var(--text-muted); margin:0;">
                    Tanto vos como <strong>${partnerName}</strong> tienen los mismos días de franco habituales (${mySchedule.francos.map(d => DAY_NAMES_ES[d]).join(' y ')}). El calendario no cambia.
                </p>
                <div class="franco-swap-actions">
                    <button type="button" class="btn btn-secondary btn-xs" id="btn-clear-swap-ui">
                        <i data-lucide="rotate-ccw"></i> Restablecer mis francos
                    </button>
                </div>
            `;
            const btnClear = francoSwapDetailsCard.querySelector('#btn-clear-swap-ui');
            if (btnClear) {
                btnClear.addEventListener('click', () => {
                    selectFrancoSwapPartner.value = '';
                    renderFrancoSwapDetails();
                });
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
        }

        // Case 1: 1 day difference
        if (partnerDiff.length === 1 && myDiff.length === 1) {
            const dayRec = partnerDiff[0];
            const dayGiv = myDiff[0];
            const unchangedFranco = mySchedule.francos.find(d => d !== dayGiv);

            francoSwapDetailsCard.innerHTML = `
                <div class="franco-swap-header">
                    <span>🔄 Cambio con ${partnerName}</span>
                    <span class="franco-swap-status-badge swap-on"><i data-lucide="check-circle-2"></i> Cambio Detectado</span>
                </div>
                <div class="franco-swap-grid">
                    <div class="franco-swap-item received">
                        <span class="label">🏖️ Tu nuevo día de franco:</span>
                        <span class="val">${DAY_NAMES_ES[dayRec]}</span>
                    </div>
                    <div class="franco-swap-item given">
                        <span class="label">💼 Día que trabajás:</span>
                        <span class="val">${DAY_NAMES_ES[dayGiv]}</span>
                    </div>
                </div>
                <div class="franco-swap-breaks-preview">
                    <i data-lucide="coffee"></i>
                    <span>Breaks el <strong>${DAY_NAMES_ES[dayGiv]}</strong>: <strong>${partnerSchedule.breaks.join(' y ')}</strong></span>
                </div>
                ${unchangedFranco !== undefined ? `<div style="font-size:0.68rem; color:var(--text-muted); margin-top:0.35rem;">📅 Tu otro franco habitual (${DAY_NAMES_ES[unchangedFranco]}) se mantiene sin cambios.</div>` : ''}
                <div class="franco-swap-actions">
                    <button type="button" class="btn btn-secondary btn-xs" id="btn-clear-swap-ui">
                        <i data-lucide="rotate-ccw"></i> Restablecer mis francos
                    </button>
                </div>
            `;
            const btnClear = francoSwapDetailsCard.querySelector('#btn-clear-swap-ui');
            if (btnClear) {
                btnClear.addEventListener('click', () => {
                    selectFrancoSwapPartner.value = '';
                    renderFrancoSwapDetails();
                });
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
        }

        // Case 2: 2 days difference (multiple options)
        const currentSavedPair = (francoSwapDayReceived && francoSwapDayGiven) ? `${francoSwapDayReceived}-${francoSwapDayGiven}` : `${partnerDiff[0]}-${myDiff[0]}`;

        francoSwapDetailsCard.innerHTML = `
            <div class="franco-swap-header">
                <span>🔄 Cambio con ${partnerName}</span>
                <span class="franco-swap-status-badge swap-on"><i data-lucide="check-circle-2"></i> Elegí el día</span>
            </div>
            <div class="franco-swap-options">
                <label for="swap-day-pair-select">Seleccioná qué día(s) intercambiaste:</label>
                <select id="swap-day-pair-select">
                    <option value="${partnerDiff[0]}-${myDiff[0]}">Recibís franco: ${DAY_NAMES_ES[partnerDiff[0]]} ↔ Trabajás: ${DAY_NAMES_ES[myDiff[0]]}</option>
                    <option value="${partnerDiff[1]}-${myDiff[0]}">Recibís franco: ${DAY_NAMES_ES[partnerDiff[1]]} ↔ Trabajás: ${DAY_NAMES_ES[myDiff[0]]}</option>
                    <option value="${partnerDiff[0]}-${myDiff[1]}">Recibís franco: ${DAY_NAMES_ES[partnerDiff[0]]} ↔ Trabajás: ${DAY_NAMES_ES[myDiff[1]]}</option>
                    <option value="${partnerDiff[1]}-${myDiff[1]}">Recibís franco: ${DAY_NAMES_ES[partnerDiff[1]]} ↔ Trabajás: ${DAY_NAMES_ES[myDiff[1]]}</option>
                    <option value="all-all">Intercambio completo (ambos francos: ${partnerDiff.map(d => DAY_NAMES_ES[d]).join(' y ')} por ${myDiff.map(d => DAY_NAMES_ES[d]).join(' y ')})</option>
                </select>
            </div>
            <div id="swap-dynamic-preview" style="margin-top: 0.5rem;"></div>
            <div class="franco-swap-actions">
                <button type="button" class="btn btn-secondary btn-xs" id="btn-clear-swap-ui">
                    <i data-lucide="rotate-ccw"></i> Restablecer mis francos
                </button>
            </div>
        `;

        const pairSelect = francoSwapDetailsCard.querySelector('#swap-day-pair-select');
        const dynamicPreview = francoSwapDetailsCard.querySelector('#swap-dynamic-preview');

        if (pairSelect) {
            // Restore previous choice if available
            if ([...pairSelect.options].some(o => o.value === currentSavedPair)) {
                pairSelect.value = currentSavedPair;
            }

            const updatePairPreview = () => {
                if (!dynamicPreview) return;
                const val = pairSelect.value;
                if (val === 'all-all') {
                    dynamicPreview.innerHTML = `
                        <div class="franco-swap-grid">
                            <div class="franco-swap-item received">
                                <span class="label">🏖️ Nuevos francos:</span>
                                <span class="val">${partnerDiff.map(d => DAY_NAMES_ES[d]).join(' y ')}</span>
                            </div>
                            <div class="franco-swap-item given">
                                <span class="label">💼 Días que trabajás:</span>
                                <span class="val">${myDiff.map(d => DAY_NAMES_ES[d]).join(' y ')}</span>
                            </div>
                        </div>
                        <div class="franco-swap-breaks-preview">
                            <i data-lucide="coffee"></i>
                            <span>Breaks en días trabajados: <strong>${partnerSchedule.breaks.join(' y ')}</strong></span>
                        </div>
                    `;
                } else {
                    const [rec, giv] = val.split('-').map(Number);
                    dynamicPreview.innerHTML = `
                        <div class="franco-swap-grid">
                            <div class="franco-swap-item received">
                                <span class="label">🏖️ Tu nuevo día de franco:</span>
                                <span class="val">${DAY_NAMES_ES[rec]}</span>
                            </div>
                            <div class="franco-swap-item given">
                                <span class="label">💼 Día que trabajás:</span>
                                <span class="val">${DAY_NAMES_ES[giv]}</span>
                            </div>
                        </div>
                        <div class="franco-swap-breaks-preview">
                            <i data-lucide="coffee"></i>
                            <span>Breaks el <strong>${DAY_NAMES_ES[giv]}</strong>: <strong>${partnerSchedule.breaks.join(' y ')}</strong></span>
                        </div>
                    `;
                }
                if (typeof lucide !== 'undefined') lucide.createIcons();
            };

            pairSelect.addEventListener('change', updatePairPreview);
            updatePairPreview();
        }

        const btnClear = francoSwapDetailsCard.querySelector('#btn-clear-swap-ui');
        if (btnClear) {
            btnClear.addEventListener('click', () => {
                selectFrancoSwapPartner.value = '';
                renderFrancoSwapDetails();
            });
        }

        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function checkBreakTime() {
        if (!breakAlarmEnabled) return;
        const now = new Date();
        const schedule = getOperatorSchedule(now);
        if (!schedule) return;

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

        const now = new Date();
        const schedule = getOperatorSchedule(now);
        if (!schedule) {
            breakIndicator.classList.add('hidden');
            return;
        }

        breakIndicator.classList.remove('hidden');
        const dayOfWeek = now.getDay();

        // Franco day
        if (schedule.francos.includes(dayOfWeek)) {
            breakIndicator.className = 'break-indicator franco';
            if (schedule.isSwapped && schedule.isSwappedFrancoDay) {
                breakIndicator.innerHTML = `🏖️ Día de franco (cambiado con ${schedule.partnerName}) — sin breaks`;
            } else {
                breakIndicator.innerHTML = '🏖️ Día de franco — sin breaks';
            }
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

        const swapTag = schedule.isSwapped && schedule.isSwappedWorkingDay
            ? ` <span class="franco-swap-badge" title="Cubriendo franco de ${schedule.partnerName}">[Cambio: ${schedule.partnerName}]</span>`
            : '';

        if (nextBreak) {
            // There is a future break today
            const [bh, bm] = nextBreak.split(':').map(Number);
            const diffMin = (bh * 60 + bm) - currentMinutes;
            const label = diffMin <= 30
                ? `☕ Break ${nextBreakIndex} en ${diffMin} min (${nextBreak})${swapTag}`
                : `☕ Próximo Break: ${nextBreak}${swapTag}`;
            breakIndicator.className = 'break-indicator active';
            breakIndicator.innerHTML = label;
        } else {
            // All breaks passed
            breakIndicator.className = 'break-indicator done';
            breakIndicator.innerHTML = `✅ Breaks completados por hoy${swapTag}`;
        }
    }

    function showBreakAlert(breakNum, breakTime) {
        if (!breakOverlay) return;

        // Play beep
        playBreakBeep();

        const schedule = getOperatorSchedule();
        let nameText = `${operatorName} — Break ${breakNum}`;
        if (schedule && schedule.isSwapped && schedule.isSwappedWorkingDay) {
            nameText += ` (Cambio con ${schedule.partnerName})`;
        }

        // Set content
        if (breakOperatorName) {
            breakOperatorName.textContent = nameText;
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
    // Feature: Hamburger Menu (Mobile Responsive)
    // ============================================
    function initHamburgerMenu() {
        if (!btnHamburger || !mobileMenu) return;

        // Create backdrop element
        const backdrop = document.createElement('div');
        backdrop.className = 'mobile-menu-backdrop';
        document.body.appendChild(backdrop);

        function toggleMobileMenu() {
            const isOpen = mobileMenu.classList.toggle('open');
            btnHamburger.setAttribute('aria-expanded', isOpen);
            backdrop.classList.toggle('active', isOpen);

            // Swap icon between menu and X
            btnHamburger.innerHTML = isOpen
                ? '<i data-lucide="x"></i>'
                : '<i data-lucide="menu"></i>';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove('open');
            btnHamburger.setAttribute('aria-expanded', 'false');
            backdrop.classList.remove('active');
            btnHamburger.innerHTML = '<i data-lucide="menu"></i>';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        // Toggle on hamburger click
        btnHamburger.addEventListener('click', toggleMobileMenu);

        // Close on backdrop click
        backdrop.addEventListener('click', closeMobileMenu);

        // Handle menu item actions
        mobileMenu.addEventListener('click', (e) => {
            const item = e.target.closest('.mobile-menu-item');
            if (!item) return;

            const action = item.dataset.action;
            closeMobileMenu();

            // Map actions to existing button clicks
            switch (action) {
                case 'toggle-compact':
                    toggleCompactMode();
                    break;
                case 'shortcuts-help':
                    if (shortcutsModal) shortcutsModal.classList.remove('hidden');
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                    break;
                case 'toggle-theme':
                    if (btnTheme) btnTheme.click();
                    break;
                case 'open-settings':
                    if (btnOpenSettings) btnOpenSettings.click();
                    break;
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        });
    }

    // ============================================
    // Feature: Category Filter Chips
    // ============================================
    function initCategoryFilterChips() {
        if (!historyChips) return;
        historyChips.querySelectorAll('.history-chip').forEach(chip => {
            chip.setAttribute('aria-pressed', chip.classList.contains('active') ? 'true' : 'false');
            chip.addEventListener('click', () => {
                historyChips.querySelectorAll('.history-chip').forEach(c => {
                    c.classList.remove('active');
                    c.setAttribute('aria-pressed', 'false');
                });
                chip.classList.add('active');
                chip.setAttribute('aria-pressed', 'true');
                activeCategoryFilter = chip.dataset.cat;
                renderHistory();
            });
        });
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
            'CALLCONTACT': 0,
            'WIFI MESH': 0
        };

        gestiones.forEach(g => {
            const cat = getCategory(g.tipo_ra);
            if (cat in counts) {
                counts[cat]++;
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
        const cntCallcontact = document.getElementById('chip-cnt-callcontact');
        if (cntCallcontact) cntCallcontact.textContent = counts['CALLCONTACT'] || 0;
        const cntMesh = document.getElementById('chip-cnt-mesh');
        if (cntMesh) cntMesh.textContent = counts['WIFI MESH'] || 0;

        // Ocultar categorías sin gestiones (salvo "Todas" y la que esté activa)
        if (historyChips) {
            historyChips.querySelectorAll('.history-chip').forEach(chip => {
                const cat = chip.dataset.cat;
                const empty = cat !== '' && !counts[cat];
                chip.classList.toggle('hidden', empty && cat !== activeCategoryFilter);
            });
        }
    }

    // ============================================
    // Feature: Smart Paste (Pegado Inteligente)
    // ============================================
    // La zona de Smart Paste acepta Ctrl+V directo (no necesita permiso de
    // portapapeles). Además, Ctrl+V con el foco fuera de cualquier campo de texto
    // también dispara el Smart Paste.
    function initSmartPaste() {
        if (btnSmartPaste) {
            btnSmartPaste.addEventListener('click', () => handleSmartPaste());
            btnSmartPaste.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSmartPaste();
                }
            });
        }

        document.addEventListener('paste', (e) => {
            const t = e.target;
            const isEditable = t && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName));
            if (isEditable) return; // pegado normal dentro de un campo
            if (document.querySelector('.modal:not(.hidden)')) return; // no rellenar el form detrás de un modal
            const text = e.clipboardData ? e.clipboardData.getData('text') : '';
            if (!text || !text.trim()) return;
            e.preventDefault();
            handleSmartPaste(text);
        });
    }

    function setPasteZoneState(state, message) {
        if (!btnSmartPaste) return;
        btnSmartPaste.classList.remove('is-awaiting', 'is-success');
        if (state) btnSmartPaste.classList.add(`is-${state}`);
        const msgEl = btnSmartPaste.querySelector('.paste-zone-text');
        if (msgEl && message) msgEl.textContent = message;
    }

    const PASTE_ZONE_DEFAULT_TEXT = 'Pegá acá el reclamo completo de Viena';
    let pasteZoneResetTimer = null;
    function resetPasteZoneLater(ms) {
        clearTimeout(pasteZoneResetTimer);
        pasteZoneResetTimer = setTimeout(() => setPasteZoneState(null, PASTE_ZONE_DEFAULT_TEXT), ms);
    }

    // textOverride: texto ya obtenido de un evento 'paste'. Si no viene, se lee
    // el portapapeles (requiere permiso del navegador).
    async function handleSmartPaste(textOverride) {
        try {
            let text = typeof textOverride === 'string' ? textOverride : '';
            if (typeof textOverride !== 'string') {
                try {
                    if (!navigator.clipboard || !navigator.clipboard.readText) throw new Error('sin API');
                    text = await navigator.clipboard.readText();
                } catch {
                    // Sin permiso de lectura: se le pide al usuario que pegue con Ctrl+V sobre la zona
                    if (btnSmartPaste) {
                        btnSmartPaste.focus();
                        setPasteZoneState('awaiting', 'Presioná Ctrl+V para pegar el reclamo');
                        resetPasteZoneLater(8000);
                    }
                    showToast('El navegador no dejó leer el portapapeles: presioná Ctrl+V', 'info', { duration: 5000 });
                    return 0;
                }
            }

            if (!text || !text.trim()) {
                showToast('El portapapeles está vacío', 'info');
                return 0;
            }

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

            // 4. Tipo de Gestión / RA / Reclamo (Clasificación inteligente previa para orientar equipos/MACS)
            let matchedRa = null;
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
                }
            }

            // 5. MACs según subclasificación del RA (CM, ONT, DECO)
            const currentRa = matchedRa || (selectRa ? selectRa.value : '');
            const raCat = currentRa ? getCategory(currentRa) : '';

            const isTelevision = raCat === 'TELEVISIÓN' ||
                /\b(televisi[oó]n|deco\s*android|deco|stb)\b/i.test(currentRa) ||
                /\bnoc\s*-\s*televisi[oó]n\b/i.test(text) ||
                /\bsubclasificaci[oó]n[:=\s]*[^\n\r]*televisi[oó]n/i.test(text);

            const isInternet = !isTelevision && (
                raCat === 'INTERNET' ||
                raCat === 'WIFI MESH' ||
                /\b(internet|banda\s*ancha)\b/i.test(currentRa) ||
                /\bnoc\s*-\s*(?:internet|banda\s*ancha)\b/i.test(text) ||
                /\bsubclasificaci[oó]n[:=\s]*[^\n\r]*(?:internet|banda\s*ancha)/i.test(text)
            );

            const macRegex = /\b([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}|[0-9A-Fa-f]{12})\b/g;
            const rawMacs = [...text.matchAll(macRegex)].map(m => m[1]);

            // Deduplicar MACs en orden de aparición
            const uniqueMacs = [];
            const seenMacs = new Set();
            for (const raw of rawMacs) {
                const formatted = formatMac(raw);
                if (formatted && !seenMacs.has(formatted)) {
                    seenMacs.add(formatted);
                    uniqueMacs.push(formatted);
                }
            }

            let hasEquipment = false;

            if (isTelevision) {
                // En NOC - TELEVISION: todas las MACs van a los DECOS, cargando tantos decos como MACs haya
                if (uniqueMacs.length > 0 && decosContainer) {
                    let decoInputs = decosContainer.querySelectorAll('.deco-input');

                    // Crear campos adicionales si hay más MACs que campos actuales
                    while (decoInputs.length < uniqueMacs.length) {
                        addDecoInput();
                        decoInputs = decosContainer.querySelectorAll('.deco-input');
                    }

                    // Quitar campos excedentes si antes había más decos que en este reclamo
                    const decoGroups = decosContainer.querySelectorAll('.deco-group');
                    decoGroups.forEach((group, index) => {
                        if (index >= uniqueMacs.length && index > 0) {
                            group.remove();
                        }
                    });

                    // Cargar cada MAC en su correspondiente deco
                    decoInputs = decosContainer.querySelectorAll('.deco-input');
                    uniqueMacs.forEach((macVal, i) => {
                        if (decoInputs[i]) {
                            decoInputs[i].value = macVal;
                            decoInputs[i].dispatchEvent(new Event('input'));
                        }
                    });

                    // Re-etiquetar orden de decos
                    decosContainer.querySelectorAll('.deco-group label').forEach((lbl, i) => {
                        lbl.textContent = 'Deco MAC ' + (i + 1);
                    });

                    hasEquipment = true;
                    detected += uniqueMacs.length;
                }
            } else if (isInternet) {
                // En NOC - INTERNET: verificar si en alguna parte indica ONT o CM (cablemodem)
                const cmMatch = text.match(/(?:cm|cablemodem|cable\s*modem|modem)\s*(?:mac)?[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}|[0-9A-Fa-f]{12})/i);
                const ontMatch = text.match(/(?:ont|gpon|fibra|ftth)\s*(?:mac)?[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}|[0-9A-Fa-f]{12})/i);
                const decoMatch = text.match(/(?:deco|stb|box)\s*(?:mac)?[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}|[0-9A-Fa-f]{12})/i);

                if (cmMatch && macCm) {
                    macCm.value = formatMac(cmMatch[1]);
                    macCm.dispatchEvent(new Event('input'));
                    hasEquipment = true;
                    detected++;
                }

                if (ontMatch && macOnt) {
                    macOnt.value = formatMac(ontMatch[1]);
                    macOnt.dispatchEvent(new Event('input'));
                    hasEquipment = true;
                    detected++;
                }

                if (decoMatch) {
                    const firstDeco = document.querySelector('.deco-input');
                    if (firstDeco) {
                        firstDeco.value = formatMac(decoMatch[1]);
                        firstDeco.dispatchEvent(new Event('input'));
                        hasEquipment = true;
                        detected++;
                    }
                }

                // Si hay MACs genéricas que no fueron asignadas por match explícito
                const unassignedMacs = uniqueMacs.filter(m => {
                    const assigned = [];
                    if (macCm && macCm.value) assigned.push(macCm.value);
                    if (macOnt && macOnt.value) assigned.push(macOnt.value);
                    return !assigned.includes(m);
                });

                if (unassignedMacs.length > 0) {
                    const ontKeywordRegex = /\b(ont|gpon|ftth|fibra\s*optica|fibra|huawei|zte|fiberhome|nokia)\b/i;
                    const cmKeywordRegex = /\b(cm|cablemodem|cable\s*modem|modem|hfc|docsis|sagemcom|arris|cisco|technicolor|motorola)\b/i;

                    const hasOntIndication = ontKeywordRegex.test(text);
                    const hasCmIndication = cmKeywordRegex.test(text);

                    unassignedMacs.forEach(macVal => {
                        let targetDevice = 'CM'; // default

                        if (hasOntIndication && !hasCmIndication) {
                            targetDevice = 'ONT';
                        } else if (hasCmIndication && !hasOntIndication) {
                            targetDevice = 'CM';
                        } else if (hasOntIndication && hasCmIndication) {
                            // Proximidad en caracteres entre la MAC y los términos clave
                            const macPos = text.search(new RegExp(macVal.replace(/[^0-9A-Fa-f]/g, '[^0-9A-Fa-f]?'), 'i'));
                            let minOntDist = Infinity;
                            for (const m of text.matchAll(new RegExp(ontKeywordRegex.source, 'gi'))) {
                                const dist = Math.abs(m.index - (macPos !== -1 ? macPos : 0));
                                if (dist < minOntDist) minOntDist = dist;
                            }
                            let minCmDist = Infinity;
                            for (const m of text.matchAll(new RegExp(cmKeywordRegex.source, 'gi'))) {
                                const dist = Math.abs(m.index - (macPos !== -1 ? macPos : 0));
                                if (dist < minCmDist) minCmDist = dist;
                            }
                            targetDevice = minOntDist < minCmDist ? 'ONT' : 'CM';
                        }

                        if (targetDevice === 'ONT' && macOnt && !macOnt.value) {
                            macOnt.value = macVal;
                            macOnt.dispatchEvent(new Event('input'));
                            hasEquipment = true;
                            detected++;
                        } else if (targetDevice === 'CM' && macCm && !macCm.value) {
                            macCm.value = macVal;
                            macCm.dispatchEvent(new Event('input'));
                            hasEquipment = true;
                            detected++;
                        } else if (macOnt && !macOnt.value) {
                            macOnt.value = macVal;
                            macOnt.dispatchEvent(new Event('input'));
                            hasEquipment = true;
                            detected++;
                        } else if (macCm && !macCm.value) {
                            macCm.value = macVal;
                            macCm.dispatchEvent(new Event('input'));
                            hasEquipment = true;
                            detected++;
                        }
                    });
                }
            } else {
                // Otras gestiones (Telefonía, Gestiones Especiales, Web/App, etc.)
                const cmMatch = text.match(/(?:cm|cablemodem|cable\s*modem|modem)\s*(?:mac)?[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}|[0-9A-Fa-f]{12})/i);
                const ontMatch = text.match(/(?:ont|gpon|fibra|ftth)\s*(?:mac)?[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}|[0-9A-Fa-f]{12})/i);
                const decoMatch = text.match(/(?:deco|stb|box)\s*(?:mac)?[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}|[0-9A-Fa-f]{12})/i);

                if (cmMatch && macCm) {
                    macCm.value = formatMac(cmMatch[1]);
                    macCm.dispatchEvent(new Event('input'));
                    hasEquipment = true;
                    detected++;
                }
                if (ontMatch && macOnt) {
                    macOnt.value = formatMac(ontMatch[1]);
                    macOnt.dispatchEvent(new Event('input'));
                    hasEquipment = true;
                    detected++;
                }
                if (decoMatch) {
                    const firstDeco = document.querySelector('.deco-input');
                    if (firstDeco) {
                        firstDeco.value = formatMac(decoMatch[1]);
                        firstDeco.dispatchEvent(new Event('input'));
                        hasEquipment = true;
                        detected++;
                    }
                }

                if (!hasEquipment && uniqueMacs.length > 0) {
                    const ontKeywordRegex = /\b(ont|gpon|ftth|fibra\s*optica|fibra)\b/i;
                    const decoKeywordRegex = /\b(deco|stb|box)\b/i;

                    if (ontKeywordRegex.test(text) && macOnt) {
                        macOnt.value = uniqueMacs[0];
                        macOnt.dispatchEvent(new Event('input'));
                        hasEquipment = true;
                        detected++;
                    } else if (decoKeywordRegex.test(text)) {
                        const firstDeco = document.querySelector('.deco-input');
                        if (firstDeco) {
                            firstDeco.value = uniqueMacs[0];
                            firstDeco.dispatchEvent(new Event('input'));
                            hasEquipment = true;
                            detected++;
                        }
                    } else if (macCm) {
                        macCm.value = uniqueMacs[0];
                        macCm.dispatchEvent(new Event('input'));
                        hasEquipment = true;
                        detected++;
                    }
                }
            }

            // 6. Teléfono / Línea
            const telMatch = text.match(/(?:tel|linea|telefono|celular|movil)?[:=\s]*\b(11[0-9]{8}|[2-9][0-9]{9})\b/i);
            if (telMatch && lineaTel) {
                lineaTel.value = telMatch[1];
                hasEquipment = true;
                detected++;
            }

            // 7. SN (Serial Number)
            const snMatch = text.match(/(?:sn|serial|serie)?[:=\s]*\b((?:GZ|gz)[0-9A-Za-z]+)\b/i);
            if (snMatch && inputSn) {
                inputSn.value = snMatch[1].toUpperCase();
                detected++;
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
                setPasteZoneState('success', `${detected} campo(s) completado(s). Revisalos antes de registrar.`);
                resetPasteZoneLater(4000);
            } else {
                if (inputCliente && !inputCliente.value) {
                    inputCliente.value = text.trim().substring(0, 40);
                } else if (inputReclamoTexto) {
                    inputReclamoTexto.value = (inputReclamoTexto.value ? inputReclamoTexto.value + '\n' : '') + text.trim();
                } else if (inputObservaciones) {
                    inputObservaciones.value = (inputObservaciones.value ? inputObservaciones.value + ' | ' : '') + text.trim();
                }
                showToast('Texto pegado en el formulario', 'info');
                setPasteZoneState(null, PASTE_ZONE_DEFAULT_TEXT);
            }
            return detected;
        } catch (err) {
            console.error('Smart paste error:', err);
            showToast('No se pudo procesar el texto pegado', 'error');
            return 0;
        }
    }

    // ============================================
    // Feature: AI Claim Audit & Template Engine
    // ============================================

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
¡IMPORTANTE!: Si detectás errores, datos faltantes críticos o incoherencias técnicas, asegurate de ser EXTENSO, sumamente DETALLADO y DIDÁCTICO en tus explicaciones (especialmente en los campos verdictDesc, missingItems.desc y technicalReason). Explicá exactamente por qué está mal y cómo debería corregirse según los protocolos del ISP.
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

                    let positionClass = 'top';
                    let top = rect.top - globalTooltip.offsetHeight - 8;
                    let left = rect.left + (rect.width / 2);

                    if (top < 10) {
                        top = rect.bottom + 8;
                        positionClass = 'bottom';
                    }

                    const maxLeft = window.innerWidth - (globalTooltip.offsetWidth / 2) - 10;
                    const minLeft = (globalTooltip.offsetWidth / 2) + 10;

                    if (left > maxLeft) left = maxLeft;
                    if (left < minLeft) left = minLeft;

                    globalTooltip.className = `global-tooltip ${positionClass}`;
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
