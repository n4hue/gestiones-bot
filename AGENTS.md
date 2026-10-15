# Reglas para agentes (Claude, Gemini y otros)

Este archivo es la **única fuente de reglas** para cualquier agente de IA que
trabaje en este repositorio. `CLAUDE.md` y `GEMINI.md` solo lo importan: si hay
que cambiar una regla, se cambia acá.

---

## 1. Autonomía

- **Hacer, no preguntar.** Ante un pedido de cambio o corrección, editar los
  archivos y verificar directamente, sin pedir confirmación ni aprobación de un
  plan.
- **Preguntar solo si es crítico:** una ambigüedad de negocio que el código no
  resuelve, o un riesgo de pérdida de datos (por ejemplo, borrar historial o
  cambiar claves de `localStorage`).

## 2. Git

| Acción | Cuándo |
|---|---|
| `git add` + `git commit` | **Siempre**, automáticamente, al terminar y verificar cada pedido. |
| `git push` + abrir PR | **Automáticamente**, sin esperar a que el usuario lo pida, siguiendo las buenas prácticas de abajo. |

Buenas prácticas de ramas y PRs:

- Una rama por cambio o fase, creada desde `main` actualizado; nunca trabajar
  directo sobre `main` ni reutilizar la rama de un PR ya mergeado.
- Un PR por cambio o fase, hacia `main`, con descripción de qué cambia y qué
  probar en el preview de Vercel. Si un PR depende de otro todavía abierto,
  aclararlo en la descripción y el orden de merge.
- Pushear solo después de verificar (regla 4). Nunca reescribir historial ya
  pusheado ni hacer `push --force` sin que el usuario lo pida.

Formato de commits: [Conventional Commits](https://www.conventionalcommits.org/),
en español, descriptivos y sin alcance entre paréntesis:

- `feat:` nueva función o campo
- `fix:` corrección de un bug o ajuste
- `style:` retoques visuales o de CSS
- `refactor:` reorganización de código sin cambio de comportamiento
- `docs:` documentación (README, este archivo)

Ejemplo: `fix: el filtro de Telefonía no mostraba resultados`

**Autoría:** los commits van a nombre del usuario (`n4hue
<nahuelgamer584@gmail.com>`), nunca del agente. No agregar líneas
`Co-Authored-By:`, `Claude-Session:` ni ninguna otra firma o atribución del
agente en el mensaje del commit.

## 3. Arquitectura y estilo del código

- **Sin frameworks ni build:** Vanilla JS (módulos ES), Vanilla CSS y HTML. No
  agregar dependencias de npm a la app.
- Preservar comentarios y lógica existentes salvo que el pedido requiera
  cambiarlos.

### Dónde está cada cosa

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura de la página; opciones de Tipo de Gestión (`<select id="tipo-ra">`). |
| `js/app.js` | Lógica de la interfaz (formulario, historial, Smart Paste, breaks, ajustes). |
| `js/modules/config.js` | Constantes: claves de `localStorage`, horarios de operadores (`OPERATOR_SCHEDULE`), URL e IDs del Google Form, `GFORM_RA_MAPPING`, `GFORM_ESP_MAPPING`, `GESTIONES_ESPECIALES_VALUES`. |
| `js/modules/categories.js` | `getCategory()` y colores por categoría. |
| `js/modules/ai-rules.js` | Motor de auditoría IA local (reglas por tipo de RA). |
| `js/modules/combobox.js` | Desplegable visual que reemplaza a todos los `<select>`. |
| `js/modules/utils.js` | Utilidades puras (`escapeHtml`, MACs). |
| `css/style.css` | Estilos y tokens de diseño (`--fs-*`, colores, temas). |
| `sw.js` | Service worker (caché offline). |
| `PRODUCT.md` | Quién usa la app, para qué y con qué restricciones (contexto de producto para agentes de diseño). |
| `DESIGN.md` | Sistema visual: tokens, componentes y reglas de diseño. Actualizarlo cuando cambie el visual. |

### Checklists al modificar

- **Agregar o cambiar un Tipo de Gestión:** actualizar juntos `index.html`
  (opción del `<select id="tipo-ra">`), `GFORM_RA_MAPPING` o `GFORM_ESP_MAPPING`
  y, si corresponde, `GESTIONES_ESPECIALES_VALUES` en `js/modules/config.js`,
  `getCategory()` en `js/modules/categories.js` y `RA_AI_RULES` en
  `js/modules/ai-rules.js`.
- **Agregar un operador:** solo en `OPERATOR_SCHEDULE` (`js/modules/config.js`);
  el desplegable de Ajustes se genera solo.
- **Usar un ícono nuevo** (`data-lucide="..."`): regenerar el bundle con
  `npm install --no-save lucide@1.56.0 && node scripts/build-icons.mjs`.
- **Agregar un archivo JS o CSS:** sumarlo a `urlsToCache` en `sw.js` y subir el
  número de `CACHE_NAME`.
- **Agregar un `<select>`:** no hace falta nada extra; `combobox.js` lo convierte
  automáticamente al visual de la app.
- **Insertar texto del usuario en HTML:** pasarlo siempre por `escapeHtml()`
  (o usar `textContent`).

## 4. Verificación

Después de cada cambio, y antes del commit:

- Probar la funcionalidad modificada en el navegador, en tema oscuro y claro, y
  en ancho de escritorio y de móvil.
- Revisar que no haya errores en la consola.
- Comprobar que no se rompan funciones existentes (regresiones), sobre todo:
  registrar una gestión, Smart Paste, auditoría IA, editar/eliminar del
  historial y el pre-llenado del Google Form.
