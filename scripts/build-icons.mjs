// Genera js/vendor/lucide-icons.js con SOLO los íconos de Lucide que usa la app.
//
// Uso (no hace falta package.json):
//   npm install --no-save lucide@1.56.0
//   node scripts/build-icons.mjs
//
// Volvé a correrlo cada vez que agregues un data-lucide="..." nuevo en el HTML o el JS.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(root, 'package.json'));
const { icons } = require('lucide');
const lucideVersion = require('lucide/package.json').version;
const OUT = join(root, 'js', 'vendor', 'lucide-icons.js');

function listFiles(dir) {
    return readdirSync(dir).flatMap(name => {
        const full = join(dir, name);
        if (full === OUT) return [];
        return statSync(full).isDirectory() ? listFiles(full) : [full];
    });
}

const sources = [join(root, 'index.html'), ...listFiles(join(root, 'js')).filter(f => f.endsWith('.js'))];
const used = new Set();
for (const file of sources) {
    for (const m of readFileSync(file, 'utf8').matchAll(/data-lucide="([a-z0-9-]+)"/g)) used.add(m[1]);
}
// Íconos que se asignan de forma dinámica (no aparecen literales como data-lucide="...").
for (const extra of ['check-circle-2', 'x-circle', 'info', 'alert-triangle']) used.add(extra);

const toPascal = name => name.split('-').map(p => p[0].toUpperCase() + p.slice(1)).join('');
const data = {};
for (const name of [...used].sort()) {
    const node = icons[toPascal(name)];
    if (!node) throw new Error(`Ícono inexistente en lucide@${lucideVersion}: ${name}`);
    data[name] = node;
}

const runtime = `/* Generado por scripts/build-icons.mjs a partir de lucide@${lucideVersion} (ISC License).
   No editar a mano. Contiene ${Object.keys(data).length} íconos. */
(function () {
    'use strict';
    var ICONS = ${JSON.stringify(data)};
    var SVG_NS = 'http://www.w3.org/2000/svg';
    var DEFAULT_ATTRS = {
        xmlns: SVG_NS, width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none',
        stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    };

    function buildSvg(name, source) {
        var svg = document.createElementNS(SVG_NS, 'svg');
        Object.keys(DEFAULT_ATTRS).forEach(function (k) { svg.setAttribute(k, DEFAULT_ATTRS[k]); });
        // Copiar atributos del <i> original (class, style, title, etc.)
        Array.prototype.forEach.call(source.attributes, function (attr) {
            svg.setAttribute(attr.name, attr.value);
        });
        var cls = (source.getAttribute('class') || '').split(/\\s+/).filter(Boolean);
        svg.setAttribute('class', ['lucide', 'lucide-' + name].concat(cls).join(' '));
        svg.setAttribute('aria-hidden', 'true');
        ICONS[name].forEach(function (child) {
            var el = document.createElementNS(SVG_NS, child[0]);
            Object.keys(child[1]).forEach(function (k) { el.setAttribute(k, child[1][k]); });
            svg.appendChild(el);
        });
        return svg;
    }

    function createIcons(options) {
        var root = (options && options.root) || document;
        var nodes = Array.prototype.slice.call(root.querySelectorAll('[data-lucide]'));
        if (root.matches && root.matches('[data-lucide]')) nodes.unshift(root);
        nodes.forEach(function (el) {
            if (el.namespaceURI === SVG_NS) return; // ya convertido
            var name = el.getAttribute('data-lucide');
            if (!ICONS[name]) {
                console.warn('[icons] Ícono no incluido en el bundle: ' + name + ' (correr scripts/build-icons.mjs)');
                return;
            }
            el.parentNode && el.parentNode.replaceChild(buildSvg(name, el), el);
        });
    }

    window.lucide = { createIcons: createIcons };
})();
`;
writeFileSync(OUT, runtime);
console.log(`OK: ${Object.keys(data).length} íconos → ${OUT}`);
