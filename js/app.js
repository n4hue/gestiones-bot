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

    const CATEGORY_COLORS = {
        'BANDA ANCHA': '#3b82f6',
        'TELEF RESID': '#8b5cf6',
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
    let googleFormUrl = localStorage.getItem(GFORM_URL_KEY) || 'https://docs.google.com/forms/d/e/1FAIpQLSfBvf69_0snKpz2m6LGpkrIc0PDgS25aCDTA_og2Xj6hRYdHw/viewform';
    let sheetsUrl = localStorage.getItem(SHEETS_URL_KEY) || '';
    let editingId = null;
    let timerInterval = null;
    let soundEnabled = localStorage.getItem(SOUND_KEY) !== 'false';

    // ============================================
    // Initialize
    // ============================================
    checkDayChange();
    loadTheme();
    loadStatsCollapsed();

    if (inputFormUrl) inputFormUrl.value = googleFormUrl;
    if (inputSheetsUrl) inputSheetsUrl.value = sheetsUrl;
    if (soundToggleEl) soundToggleEl.checked = soundEnabled;

    updateUI();
    startSessionTimer();
    inputCliente.focus();

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

            // Reset form
            inputCliente.value = '';
            selectRa.value = '';
            if (inputObservaciones) inputObservaciones.value = '';
            if (checkForm) checkForm.checked = false;

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

            // Open Google Form
            if (googleFormUrl) {
                const formWindow = window.open(googleFormUrl, '_blank');
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
        // Ctrl+Enter to submit
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
        if (lower.includes('banda ancha')) return 'BANDA ANCHA';
        if (lower.includes('telef resid')) return 'TELEF RESID';
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
    // Render History
    // ============================================
    function renderHistory() {
        historyBody.innerHTML = '';

        const filtered = getFilteredGestiones();

        if (filtered.length === 0) {
            const msg = gestiones.length === 0
                ? 'No hay gestiones registradas aún en esta jornada.'
                : 'No se encontraron resultados para el filtro.';
            historyBody.innerHTML = `<tr><td colspan="5" class="empty-state">${msg}</td></tr>`;
            return;
        }

        filtered.forEach(g => {
            let equiposHtml = '';
            if (g.equipos) {
                const eq = g.equipos;
                const parts = [];
                if (eq.cm) parts.push(`CM: <span style="font-family:monospace">${eq.cm}</span>`);
                if (eq.mta) parts.push(`MTA: <span style="font-family:monospace">${eq.mta}</span>`);
                if (eq.ont) parts.push(`ONT: <span style="font-family:monospace">${eq.ont}</span>`);
                if (eq.decos && eq.decos.length) parts.push(`Decos: ${eq.decos.length}`);
                if (eq.linea) parts.push(`Línea: ${eq.linea}`);
                if (parts.length > 0) {
                    equiposHtml = `<div style="font-size: 0.8rem; line-height:1.4; color: var(--primary); margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid var(--border);">🛠️ ${parts.join(' | ')}</div>`;
                }
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${g.hora}</td>
                <td><strong>${g.cliente}</strong></td>
                <td>${g.tipo_ra}</td>
                <td><span class="obs-text">${g.observaciones || '—'}</span>${equiposHtml}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" title="Editar" onclick="editGestion('${g.id}')">✏️</button>
                        <button class="btn-icon" title="Eliminar" onclick="deleteGestion('${g.id}')">🗑️</button>
                    </div>
                </td>
            `;
            historyBody.appendChild(tr);
        });
    }

    // ============================================
    // Update Progress
    // ============================================
    function updateProgress() {
        const count = gestiones.length;
        dailyCountEl.textContent = count;

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
                const hoursElapsed = Math.max((now - firstTime) / (1000 * 60 * 60), 0.1);
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
        let checkDate = new Date(today);
        // If today doesn't qualify, start checking from yesterday only if today has no gestiones yet
        if (gestiones.length < DAILY_GOAL && gestiones.length > 0) {
            // Today started but not complete - check from yesterday
            checkDate.setDate(checkDate.getDate() - 1);
        } else if (gestiones.length >= DAILY_GOAL) {
            // Today complete, check from yesterday
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            // No gestiones today, check from yesterday
            checkDate.setDate(checkDate.getDate() - 1);
        }

        for (let i = 0; i < 365; i++) {
            const dateStr = checkDate.toISOString().split('T')[0];
            const archived = localStorage.getItem(ARCHIVE_PREFIX + dateStr);
            if (archived) {
                const data = JSON.parse(archived);
                if (data.length >= DAILY_GOAL) {
                    streak++;
                    checkDate.setDate(checkDate.getDate() - 1);
                } else {
                    break;
                }
            } else {
                break;
            }
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
            return;
        }

        // Get earliest gestión (last in array = first registered)
        const firstGestion = gestiones[gestiones.length - 1];
        const [hours, minutes, seconds] = firstGestion.hora.split(':').map(Number);
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
        }

        tick();
        timerInterval = setInterval(tick, 1000);
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

        const icons = { success: '✅', error: '❌', info: 'ℹ️' };
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

            gestiones = gestiones.filter(g => g.id !== id);
            saveData();
            updateUI();
            startSessionTimer();
            showToast('Gestión eliminada', 'info');
        }
    };

    btnReset.addEventListener('click', async () => {
        if (gestiones.length === 0) {
            showToast('No hay gestiones para archivar', 'info');
            return;
        }

        const confirmed = await showConfirm(
            '¿Estás seguro de iniciar una nueva jornada?\n\nLos datos actuales se archivarán automáticamente.\nTambién puedes exportar un CSV antes.'
        );

        if (confirmed) {
            // Archive current day
            const today = new Date().toISOString().split('T')[0];
            localStorage.setItem(ARCHIVE_PREFIX + today, JSON.stringify(gestiones));

            gestiones = [];
            saveData();
            updateUI();
            startSessionTimer();
            showToast('Nueva jornada iniciada. Datos archivados.', 'success');
        }
    });

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
            // Save Google Form URL
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

            settingsModal.classList.add('hidden');
            showToast('Configuración guardada', 'success');
            inputCliente.focus();
        });
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
                await navigator.clipboard.writeText(inputEl.value);
                const original = btn.textContent;
                btn.textContent = '✅';
                setTimeout(() => { if (btn) btn.textContent = original; }, 1500);
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

});
