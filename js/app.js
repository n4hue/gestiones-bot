document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
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
    const formHint = document.getElementById('form-hint');

    // Modal Elements
    const modal = document.getElementById('google-form-modal');
    const modalGestionTipo = document.getElementById('modal-gestion-tipo');
    const btnAbrirForm = document.getElementById('btn-abrir-form');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');
    const inputFormUrl = document.getElementById('form-url-input');
    const btnSaveUrl = document.getElementById('btn-save-url');

    // Constants
    const DAILY_GOAL = 30;
    const STORAGE_KEY = 'bot_gestiones_today';
    const GFORM_URL_KEY = 'bot_gform_url';

    // State
    let gestiones = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let googleFormUrl = localStorage.getItem(GFORM_URL_KEY) || 'https://docs.google.com/forms/d/e/1FAIpQLSfBvf69_0snKpz2m6LGpkrIc0PDgS25aCDTA_og2Xj6hRYdHw/viewform';
    let editingId = null;

    // Initialize
    inputFormUrl.value = googleFormUrl;
    updateUI();
    inputCliente.focus();

    // --- Form Handling ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const cliente = inputCliente.value.trim();
        const tipoRa = selectRa.value;
        const observaciones = inputObservaciones ? inputObservaciones.value.trim() : '';

        if (!cliente || !tipoRa) return;

        if (editingId) {
            // Update existing
            const index = gestiones.findIndex(g => g.id === editingId);
            if (index !== -1) {
                gestiones[index].cliente = cliente;
                gestiones[index].tipo_ra = tipoRa;
                gestiones[index].observaciones = observaciones;
            }
            editingId = null;
            btnSubmit.textContent = 'Registrar Gestión';
            btnCancelEdit.classList.add('hidden');
        } else {
            // Add new
            const now = new Date();
            const gestion = {
                id: Date.now().toString(), // Unique ID based on timestamp
                cliente: cliente,
                tipo_ra: tipoRa,
                observaciones: observaciones,
                fecha: now.toLocaleDateString('es-AR'),
                hora: now.toLocaleTimeString('es-AR', { hour12: false })
            };
            gestiones.unshift(gestion); // Add to beginning (newest first)
            
            // Only require Google Form if it's a new management
            if (googleFormUrl) {
                window.open(googleFormUrl, '_blank');
            } else {
                showModal(tipoRa);
            }
        }

        saveData();
        updateUI();

        // Reset form but keep focus
        inputCliente.value = '';
        selectRa.value = '';
        if(inputObservaciones) inputObservaciones.value = '';
        if(checkForm) checkForm.checked = false;
        if(formHint) formHint.classList.add('hidden');
        inputCliente.focus();
    });

    if (btnCancelEdit) {
        btnCancelEdit.addEventListener('click', () => {
            editingId = null;
            inputCliente.value = '';
            selectRa.value = '';
            if(inputObservaciones) inputObservaciones.value = '';
            if(checkForm) checkForm.checked = false;
            btnSubmit.textContent = 'Registrar Gestión';
            btnCancelEdit.classList.add('hidden');
            inputCliente.focus();
        });
    }

    // --- UI Updates ---
    function updateUI() {
        renderHistory();
        updateProgress();
    }

    function renderHistory() {
        historyBody.innerHTML = '';
        
        if (gestiones.length === 0) {
            historyBody.innerHTML = '<tr><td colspan="5" class="empty-state">No hay gestiones registradas aún en esta jornada.</td></tr>';
            return;
        }

        gestiones.forEach(g => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${g.hora}</td>
                <td><strong>${g.cliente}</strong></td>
                <td>${g.tipo_ra}</td>
                <td><span style="font-size: 0.8em; color: var(--text-muted);">${g.observaciones || '-'}</span></td>
                <td>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn-icon edit" title="Editar" onclick="editGestion('${g.id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg>
                        </button>
                        <button class="btn-icon delete" title="Eliminar" onclick="deleteGestion('${g.id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                    </div>
                </td>
            `;
            historyBody.appendChild(tr);
        });
    }

    function updateProgress() {
        const count = gestiones.length;
        dailyCountEl.textContent = count;

        let percentage = (count / DAILY_GOAL) * 100;
        
        // Visual max cap at 100% for the bar, though count can exceed
        const barWidth = percentage > 100 ? 100 : percentage;
        progressBar.style.width = `${barWidth}%`;

        if (count >= DAILY_GOAL) {
            progressBar.classList.add('success');
        } else {
            progressBar.classList.remove('success');
        }
    }

    // --- Actions ---
    window.editGestion = function(id) {
        const gestion = gestiones.find(g => g.id === id);
        if (gestion) {
            editingId = id;
            inputCliente.value = gestion.cliente;
            selectRa.value = gestion.tipo_ra;
            if (inputObservaciones) inputObservaciones.value = gestion.observaciones || '';
            if (checkForm) checkForm.checked = true; // Ya hecho
            
            btnSubmit.textContent = 'Actualizar Gestión';
            btnCancelEdit.classList.remove('hidden');
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            inputCliente.focus();
        }
    };

    window.deleteGestion = function(id) {
        if(confirm('¿Seguro que deseas eliminar esta gestión?')) {
            gestiones = gestiones.filter(g => g.id !== id);
            saveData();
            updateUI();
        }
    };

    btnReset.addEventListener('click', () => {
        if(gestiones.length === 0) return;

        const confirmMsg = '¿Estás seguro de iniciar una nueva jornada?\nEsto borrará los datos actuales de la pantalla.\n\nRecuerda EXPORTAR primero si quieres guardar un respaldo.';
        if(confirm(confirmMsg)) {
            gestiones = [];
            saveData();
            updateUI();
        }
    });

    btnExport.addEventListener('click', () => {
        if(gestiones.length === 0) {
            alert('No hay gestiones para exportar.');
            return;
        }

        // CSV Creation
        const headers = ['ID', 'Fecha', 'Hora', 'N_Cliente', 'Tipo_RA', 'Observaciones'];
        const csvRows = [];
        csvRows.push(headers.join(','));

        // Copy array to sort oldest to newest for export, or keep newest to oldest
        // Let's export chronologically (oldest first)
        const exportData = [...gestiones].reverse(); 

        exportData.forEach(g => {
            // Escape commas and quotes if present in text
            const tipoRaEscaped = `"${g.tipo_ra.replace(/"/g, '""')}"`;
            const obsEscaped = g.observaciones ? `"${g.observaciones.replace(/"/g, '""')}"` : '""';
            const row = [g.id, g.fecha, g.hora, g.cliente, tipoRaEscaped, obsEscaped];
            csvRows.push(row.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        
        // Download Link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        const dateStr = new Date().toISOString().split('T')[0];
        link.setAttribute('href', url);
        link.setAttribute('download', `gestiones_bot_${dateStr}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gestiones));
    }

    // --- Modal Logic ---
    function showModal(tipoRa) {
        if(modalGestionTipo) modalGestionTipo.textContent = tipoRa;
        modal.classList.remove('hidden');
    }

    btnCerrarModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        inputCliente.focus();
    });

    btnAbrirForm.addEventListener('click', () => {
        if (googleFormUrl) {
            window.open(googleFormUrl, '_blank');
            modal.classList.add('hidden');
            inputCliente.focus();
        } else {
            alert('Primero debes guardar la URL del Google Form en la configuración de abajo.');
        }
    });

    btnSaveUrl.addEventListener('click', () => {
        const url = inputFormUrl.value.trim();
        if(url) {
            googleFormUrl = url;
            localStorage.setItem(GFORM_URL_KEY, googleFormUrl);
            alert('URL guardada correctamente. De ahora en adelante se abrirá automáticamente en cada gestión.');
            window.open(googleFormUrl, '_blank');
            modal.classList.add('hidden');
            inputCliente.focus();
        } else {
            alert('Por favor ingresa una URL válida.');
        }
    });
    
    // Allow re-opening modal to config URL
    window.openConfigModal = function() {
        if(modalGestionTipo) modalGestionTipo.textContent = "Configuración";
        inputFormUrl.value = googleFormUrl;
        modal.classList.remove('hidden');
    };
});
