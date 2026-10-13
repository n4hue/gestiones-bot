// Desplegable personalizado (combobox) que reemplaza visualmente a un <select>.
//
// El <select> original queda oculto como fuente de verdad: el resto de la app
// sigue leyendo select.value y escuchando su evento 'change'. El combobox se
// mantiene sincronizado aunque el valor o las opciones cambien por código
// (asignación de .value, innerHTML, appendChild, disabled).
//
// - searchable: se puede escribir para filtrar (sin tildes, cualquier orden de
//   palabras). Por defecto se activa si el select tiene más de 8 opciones.
// - La lista se dibuja en <body> con position: fixed para que no la recorten
//   cards ni modales (backdrop-filter / overflow).

const SEARCH_THRESHOLD = 8;
let instanceCounter = 0;

const normalize = (str) => str.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ').trim();

const isPlaceholder = (opt) => opt.disabled && opt.value === '';

function readOptions(select) {
    const out = [];
    const push = (opt, group) => {
        if (isPlaceholder(opt) || opt.disabled) return;
        const label = opt.textContent.replace(/\s+/g, ' ').trim();
        out.push({ value: opt.value, label, group, haystack: normalize(`${group || ''} ${label}`) });
    };
    Array.from(select.children).forEach(child => {
        if (child.tagName === 'OPTGROUP') {
            Array.from(child.children).forEach(opt => push(opt, child.label));
        } else if (child.tagName === 'OPTION') {
            push(child, null);
        }
    });
    return out;
}

function placeholderText(select, fallback) {
    const ph = Array.from(select.options).find(isPlaceholder);
    return ph ? ph.textContent.trim() : fallback;
}

/**
 * @param {HTMLSelectElement} select
 * @param {object} [opts]
 * @param {boolean} [opts.searchable]   Permite escribir para filtrar.
 * @param {boolean} [opts.clearable]    Muestra un botón × para quitar la selección.
 * @param {string}  [opts.placeholder]  Texto del input vacío (default: opción placeholder del select).
 * @param {string}  [opts.inputId]      id del input (default: `${select.id}-combo`).
 * @param {string}  [opts.requiredMessage] Mensaje de validación si el select era `required`.
 * @param {(opt: object) => void} [opts.onChoose] Se llama después de elegir con el usuario.
 * @param {() => void} [opts.onClear]   Se llama al quitar la selección desde el combobox.
 */
export function createCombobox(select, opts = {}) {
    if (!select || select.dataset.combobox) return null;
    select.dataset.combobox = 'on';

    const uid = ++instanceCounter;
    const initialOptions = readOptions(select);
    const searchable = opts.searchable ?? initialOptions.length > SEARCH_THRESHOLD;
    const clearable = !!opts.clearable;
    const required = select.required;
    const inputId = opts.inputId || `${select.id || 'select-' + uid}-combo`;
    const listId = `${inputId}-list`;

    // El select deja de ser visible e interactivo; la validación pasa al input.
    select.required = false;
    select.tabIndex = -1;
    select.classList.add('combo-native-select');
    select.setAttribute('aria-hidden', 'true');

    const wrapper = document.createElement('div');
    wrapper.className = `combo${searchable ? ' combo-searchable' : ' combo-static'}`;
    if (select.style.flex) wrapper.style.flex = select.style.flex;

    const icon = searchable ? 'search' : 'chevron-down';
    wrapper.innerHTML = `
        <span class="combo-icon combo-icon-${searchable ? 'left' : 'right'}"><i data-lucide="${icon}"></i></span>
        <input type="text" id="${inputId}" class="combo-input" autocomplete="off" spellcheck="false"
            role="combobox" aria-autocomplete="${searchable ? 'list' : 'none'}" aria-expanded="false"
            aria-controls="${listId}" ${searchable ? '' : 'readonly'}>
        ${clearable ? `<button type="button" class="combo-clear hidden" title="Quitar selección" aria-label="Quitar selección"><i data-lucide="x"></i></button>` : ''}
    `;
    select.parentNode.insertBefore(wrapper, select);

    const list = document.createElement('ul');
    list.className = 'combo-list hidden';
    list.id = listId;
    list.setAttribute('role', 'listbox');
    document.body.appendChild(list);

    if (typeof lucide !== 'undefined') lucide.createIcons({ root: wrapper });

    const input = wrapper.querySelector('input');
    const btnClear = wrapper.querySelector('.combo-clear');

    // El <label for="select"> pasa a apuntar al input visible
    if (select.id) {
        document.querySelectorAll(`label[for="${CSS.escape(select.id)}"]`).forEach(l => l.setAttribute('for', inputId));
    }

    let options = initialOptions;
    let filtered = options;
    let activeIndex = -1;

    const isOpen = () => !list.classList.contains('hidden');

    function selectedOption() {
        const idx = select.selectedIndex;
        if (idx < 0) return null;
        const opt = select.options[idx];
        if (!opt || isPlaceholder(opt)) return null;
        return options.find(o => o.value === opt.value) || null;
    }

    // Refleja en el input el estado actual del select.
    function sync() {
        options = readOptions(select);
        const sel = selectedOption();
        input.value = sel ? sel.label : '';
        input.placeholder = opts.placeholder || placeholderText(select, 'Seleccionar...');
        input.disabled = select.disabled;
        if (btnClear) {
            btnClear.classList.toggle('hidden', !sel);
            btnClear.disabled = select.disabled;
        }
        wrapper.classList.toggle('has-value', !!sel);
        wrapper.classList.toggle('is-disabled', select.disabled);
        if (required) {
            input.setCustomValidity(sel ? '' : (opts.requiredMessage || 'Elegí una opción de la lista'));
        }
        if (select.disabled && isOpen()) close();
    }

    function render() {
        list.innerHTML = '';
        if (filtered.length === 0) {
            const li = document.createElement('li');
            li.className = 'combo-empty';
            li.textContent = 'Sin coincidencias. Probá con otra palabra.';
            list.appendChild(li);
            return;
        }
        const current = selectedOption();
        let lastGroup;
        filtered.forEach((opt, i) => {
            if (opt.group && opt.group !== lastGroup) {
                const g = document.createElement('li');
                g.className = 'combo-group';
                g.setAttribute('role', 'presentation');
                g.textContent = opt.group;
                list.appendChild(g);
            }
            lastGroup = opt.group;
            const li = document.createElement('li');
            li.className = 'combo-option';
            li.id = `${listId}-opt-${i}`;
            li.setAttribute('role', 'option');
            li.dataset.index = i;
            li.dataset.value = opt.value;
            li.textContent = opt.label;
            if (current && opt.value === current.value) li.classList.add('is-selected');
            list.appendChild(li);
        });
    }

    function setActive(index) {
        activeIndex = index;
        list.querySelectorAll('.combo-option').forEach(li => {
            const on = Number(li.dataset.index) === index;
            li.classList.toggle('is-active', on);
            li.setAttribute('aria-selected', on ? 'true' : 'false');
            if (on) li.scrollIntoView({ block: 'nearest' });
        });
        if (index >= 0) input.setAttribute('aria-activedescendant', `${listId}-opt-${index}`);
        else input.removeAttribute('aria-activedescendant');
    }

    function filter(term) {
        const words = normalize(term).split(' ').filter(Boolean);
        filtered = words.length ? options.filter(o => words.every(w => o.haystack.includes(w))) : options;
    }

    // Posiciona la lista debajo del input (o arriba si no hay lugar).
    function position(e) {
        // El scroll dentro de la propia lista no debe reposicionarla
        if (e && e.target === list) return;
        const r = input.getBoundingClientRect();
        const gap = 4;
        const below = window.innerHeight - r.bottom - gap - 8;
        const above = r.top - gap - 8;
        list.style.left = `${r.left}px`;
        list.style.width = `${r.width}px`;
        // scrollHeight es el alto del contenido aunque haya max-height: no hace falta
        // quitarlo (hacerlo devolvía la lista al principio en cada scroll)
        const natural = Math.min(list.scrollHeight, 340);
        const openUp = below < Math.min(natural, 220) && above > below;
        const avail = Math.max(openUp ? above : below, 120);
        list.style.maxHeight = `${Math.min(340, avail)}px`;
        if (openUp) {
            list.style.top = '';
            list.style.bottom = `${window.innerHeight - r.top + gap}px`;
        } else {
            list.style.bottom = '';
            list.style.top = `${r.bottom + gap}px`;
        }
        list.classList.toggle('opens-up', openUp);
    }

    function showList() {
        render();
        list.classList.remove('hidden');
        input.setAttribute('aria-expanded', 'true');
        wrapper.classList.add('is-open');
        position();
        setActive(activeIndex);
        window.addEventListener('scroll', position, true);
        window.addEventListener('resize', position);
    }

    function open() {
        if (input.disabled) return;
        options = readOptions(select);
        const sel = selectedOption();
        filter(searchable && !(sel && input.value === sel.label) ? input.value : '');
        const selIndex = sel ? filtered.findIndex(o => o.value === sel.value) : -1;
        activeIndex = selIndex >= 0 ? selIndex : (filtered.length ? 0 : -1);
        showList();
    }

    function close() {
        list.classList.add('hidden');
        input.setAttribute('aria-expanded', 'false');
        wrapper.classList.remove('is-open');
        input.removeAttribute('aria-activedescendant');
        window.removeEventListener('scroll', position, true);
        window.removeEventListener('resize', position);
    }

    function choose(opt) {
        close();
        if (opt.value !== select.value) {
            select.value = opt.value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
            sync();
        }
        if (opts.onChoose) opts.onChoose(opt);
    }

    function clearSelection() {
        close();
        if (!selectedOption()) { sync(); return; }
        select.value = '';
        select.dispatchEvent(new Event('change', { bubbles: true }));
        if (opts.onClear) opts.onClear();
    }

    if (searchable) {
        input.addEventListener('focus', () => input.select());
        input.addEventListener('input', () => {
            filter(input.value);
            activeIndex = filtered.length ? 0 : -1;
            showList();
        });
    }
    input.addEventListener('click', () => { if (!isOpen()) open(); });

    input.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen()) { open(); return; }
                if (filtered.length) setActive((activeIndex + 1) % filtered.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (!isOpen()) { open(); return; }
                if (filtered.length) setActive((activeIndex - 1 + filtered.length) % filtered.length);
                break;
            case 'Enter':
            case ' ':
                if (e.key === ' ' && searchable) return; // el espacio se escribe en la búsqueda
                if (e.ctrlKey || e.metaKey) return;      // Ctrl+Enter = registrar (atajo global)
                if (isOpen() && activeIndex >= 0 && filtered[activeIndex]) {
                    e.preventDefault();
                    choose(filtered[activeIndex]);
                } else if (!isOpen()) {
                    e.preventDefault();
                    open();
                }
                break;
            case 'Escape':
                if (isOpen()) {
                    e.preventDefault();
                    e.stopPropagation();
                    close();
                    sync();
                } else if (clearable && selectedOption()) {
                    e.preventDefault();
                    e.stopPropagation();
                    clearSelection();
                }
                break;
            case 'Backspace':
                if (!clearable || !selectedOption()) return;
                if (!searchable || input.value === '' ||
                    (input.selectionStart === 0 && input.selectionEnd === input.value.length)) {
                    e.preventDefault();
                    clearSelection();
                    if (searchable) open();
                }
                break;
            case 'Tab':
                close();
                sync();
                break;
        }
    });

    // mousedown (no click) para que el input no pierda el foco antes de elegir
    list.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const li = e.target.closest('.combo-option');
        if (li) choose(filtered[Number(li.dataset.index)]);
    });
    list.addEventListener('mousemove', (e) => {
        const li = e.target.closest('.combo-option');
        if (li && Number(li.dataset.index) !== activeIndex) setActive(Number(li.dataset.index));
    });

    input.addEventListener('blur', () => {
        close();
        sync();
    });

    if (btnClear) {
        btnClear.addEventListener('mousedown', (e) => e.preventDefault());
        btnClear.addEventListener('click', () => {
            clearSelection();
            input.focus();
        });
    }

    // --- Sincronización con cambios hechos por código sobre el select ---
    select.addEventListener('change', sync);

    // Asignaciones directas (select.value = x / select.selectedIndex = n)
    ['value', 'selectedIndex'].forEach(prop => {
        const desc = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, prop);
        Object.defineProperty(select, prop, {
            configurable: true,
            get() { return desc.get.call(this); },
            set(v) { desc.set.call(this, v); sync(); }
        });
    });

    // Opciones reemplazadas/agregadas y cambios de disabled
    new MutationObserver(sync).observe(select, {
        childList: true, subtree: true, characterData: true,
        attributes: true, attributeFilter: ['disabled', 'selected']
    });

    // Si el select se quita del DOM (contenido regenerado), se limpia la lista del body
    new MutationObserver(() => {
        if (!select.isConnected) {
            close();
            list.remove();
        }
    }).observe(document.body, { childList: true, subtree: true });

    sync();

    return {
        input,
        sync,
        focus() { input.focus(); open(); },
        setDisabled(disabled) { select.disabled = disabled; sync(); }
    };
}

/**
 * Convierte todos los <select> dentro de `root` en combobox, y también los que
 * se agreguen después (por ejemplo, los que se generan con innerHTML).
 */
export function enhanceSelects(root = document.body) {
    const run = (scope) => {
        if (scope.matches && scope.matches('select')) createCombobox(scope);
        scope.querySelectorAll && scope.querySelectorAll('select:not([data-combobox])').forEach(s => createCombobox(s));
    };
    run(root);
    new MutationObserver(mutations => {
        mutations.forEach(m => m.addedNodes.forEach(node => {
            if (node.nodeType === 1) run(node);
        }));
    }).observe(root, { childList: true, subtree: true });
}
