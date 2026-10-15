# Diagnóstico de diseño — Gestiones BOT

Fecha: 2026-10-15 · Método: `/impeccable critique` (dos evaluaciones
independientes en paralelo: revisión de diseño y detector + navegador) y
`/impeccable audit` (revisión técnica del código). Contexto: `PRODUCT.md` y
`DESIGN.md`.

Alcance acordado: **refinamiento visual** (apariencia y acomodo), sin cambiar
campos, atajos ni flujos. Vista de referencia: ventana de **~500 × 1000 px**;
además 1366 × 768, 1920 × 1080 y ~960 px; tema oscuro primero y claro a la par.

---

## Resumen

| Evaluación | Puntaje | Banda |
|---|---|---|
| Heurísticas de Nielsen (critique) | **28 / 40** | Buena base, con trabajo pendiente |
| Salud técnica (audit) | **11 / 20** | Aceptable: requiere trabajo significativo |

**Veredicto de especificidad:** lo que la app *hace* está hecho a medida del
equipo (Smart Paste desde Viena, taxonomía de RA, plantillas de reiterado,
francos y breaks, atajos en cada campo). Lo que la app *parece* es genérico:
un tablero oscuro "glassmorphism" con vidrio, halos naranjas, título con
degradado y tarjetas dentro de tarjetas. El CSS lo dice en su primera línea:
`GESTIONES BOT — Premium Glassmorphism UI`. Cambiando el naranja por violeta
podría ser cualquier otro producto. La personalidad está en los textos, no en
el lenguaje visual.

**La mayor oportunidad:** que la vista angosta (500 px) deje de ser la
versión "de celular" y pase a ser una vista de escritorio angosta pensada a
propósito, con el botón Registrar siempre a mano, y que el lenguaje visual se
vuelva sólido, preciso y con un solo acento.

---

## Heurísticas de Nielsen

| # | Heurística | Puntaje | Problema principal |
|---|---|---|---|
| 1 | Visibilidad del estado | 3 | Contador, reloj y ritmo visibles; pero en 500 px el historial (la confirmación de "¿se guardó?") queda ~2 pantallas abajo, y el ritmo bajo se muestra en rojo durante horas. |
| 2 | Lenguaje del usuario | 3 | Lenguaje del equipo muy bien; jerga en la IA ("Nivel de Gestionabilidad 0%", "IA RPA", etiqueta "Sagemcom DOCSIS 3.1" en un caso de datos faltantes). |
| 3 | Control y libertad | 3 | Editar, eliminar con Deshacer, Esc y checklist de jornada; la acción destructiva está arriba de todo. |
| 4 | Consistencia | 2 | Tres tratamientos de foco (naranja, azul en Tipo de Gestión, borde naranja "en reposo" en los desplegables de Ajustes), tres colores de botón principal, franja de Callcontact distinta al gráfico, modo compacto más ancho que el normal, emojis mezclados con íconos. |
| 5 | Prevención de errores | 3 | Tipo obligatorio, auditoría local y checklist; el texto de las plantillas se corta a mitad de palabra. |
| 6 | Reconocer antes que recordar | 3 | Los atajos visibles junto a cada campo son excelentes; editar y eliminar están ocultos hasta pasar el mouse. |
| 7 | Flexibilidad y eficiencia | 3 | Atajos, Smart Paste y modo compacto; en 1366 × 768 el botón Registrar queda debajo del pliegue. |
| 8 | Estética y minimalismo | 2 | Vidrio, halos, título con degradado, cajas dentro de cajas, gráfico de seis colores y panel de IA sobrecargado. |
| 9 | Recuperación de errores | 3 | Mensajes de validación claros; el globo nativo del navegador desentona con el tema oscuro; el veredicto de la IA dramatiza. |
| 10 | Ayuda y documentación | 3 | Modal de atajos y tooltips útiles; el modal de atajos es difícil de escanear (texto alineado a la derecha, `kbd` que se parten). |
| | **Total** | **28 / 40** | |

## Salud técnica (audit)

| # | Dimensión | Puntaje | Hallazgo principal |
|---|---|---|---|
| 1 | Accesibilidad | 2 | 11 fallas de contraste por tema (botón principal 2,8:1); sin `prefers-reduced-motion` con 26 animaciones; modales sin `role="dialog"`/`aria-modal`; foco solo con el anillo por defecto (2 reglas `:focus-visible` en todo el CSS) y los inputs con `outline: none`. |
| 2 | Rendimiento | 3 | 16 superficies con `backdrop-filter: blur(16px)` y ~25 halos con sombras de color, siempre activos durante un turno de 6 horas al lado del CRM. El JS no tiene problemas visibles. |
| 3 | Tematización | 2 | Hay tokens, pero 113 colores hex y 143 `rgba()` fijos fuera de ellos; variables indefinidas (`--radius-md`, `--text-color`, `--text`); sin token de Callcontact. |
| 4 | Responsive | 2 | Sin scroll horizontal en 500 px, pero la vista angosta es la de celular (columna de 420 px, menú hamburguesa bajo 600 px); botón de copiar cliente de 15 px de alto y editar/eliminar de 20 × 20 px. |
| 5 | Integridad de implementación | 2 | Varios patrones genéricos verificados (vidrio, degradado en texto, halos, tarjetas anidadas, rebote); la franja lateral de las tarjetas sí lleva dato (categoría). |
| | **Total** | **11 / 20** | **Aceptable** |

### Detector automático (`impeccable detect`)

51 hallazgos en el escaneo estático y 30–34 por vista en el navegador.

| Regla | Veredicto |
|---|---|
| `low-contrast` (14) | **Real.** Blanco sobre #FF6B35 = 2,8:1 (todos los botones principales); blanco sobre #FF8C42 = 2,3:1 (botón del aviso de break); pie de página 2,2:1 (oscuro) y 1,9:1 (claro); placeholders 3,0–3,2:1; atajo dentro del botón principal 2,4:1; en tema claro el naranja #E65F2B como texto da 3,1–3,5:1. |
| `dark-glow` (11) | **Real.** Halos naranjas en el contador, el botón principal, la barra de progreso y el aviso de break. |
| `side-tab` (7–12) | **Parcial.** En las tarjetas del historial el borde lateral indica la categoría (lleva dato); en toasts, plantillas, avisos de IA y ajustes es decoración. |
| `gradient-text` (4) | **Real.** Título "Gestiones BOT", checklist de jornada y título del aviso de break. |
| `nested-cards` (7, navegador) | **Real.** Smart Paste, Tipo de Gestión, los dos acordeones y las tarjetas de estadísticas dentro de tarjetas. |
| `bounce-easing` (2) | **Real.** Tarjeta y emoji del aviso de break. |
| `tight-leading` (3) | **Menor.** Botones de backup y descripción de plantillas. |
| `cramped-padding` (8) | **Falso positivo.** Son los `<optgroup>` del select nativo, que el combobox reemplaza. |
| `gray-on-color` (1) | **Falso positivo.** No se reproduce en la página real. |
| `overused-font` (1) | **Falso positivo por decisión de marca.** Inter es un compromiso confirmado en `PRODUCT.md`. |

---

## Qué funciona

1. **Smart Paste como puerta de entrada**, con los dos atajos visibles; los
   campos muestran su atajo Alt. El modelo de teclado se enseña en el lugar.
2. **La tarjeta del historial**: hora en monoespaciada, N° de cliente que se
   copia con un click, franja de categoría, badge de reiterado, tipo de RA
   recortado a lo que lo distingue y paginación "Mostrando X de Y".
3. **Disciplina tipográfica**: escala con mínimo de 12 px, monoespaciada para
   datos, estados vacíos honestos y una personalidad que es del equipo.

## Problemas prioritarios

### [P1] El naranja principal no cumple contraste en ningún tema
- **Dónde:** `.btn-primary` (blanco sobre #FF6B35, 2,84:1), atajo dentro del
  botón (2,4:1), contador del chip activo (2,8:1); en tema claro, #E65F2B
  usado como texto (3,1–3,5:1) en "Smart Paste", "Tipo de Gestión / RA",
  "Ver todas" y la estadística destacada.
- **Por qué importa:** es el botón que más se aprieta, y `PRODUCT.md` exige
  AA para turnos de 6 horas.
- **Arreglo, conservando la marca:** texto oscuro (#0B0F19) sobre el naranja
  = **6,75:1**; un token `--primary-text` para el naranja usado como texto
  (#FF6B35 en oscuro, ~#C2410C en claro, ≥ 4,5:1).
- **Comando:** `/impeccable colorize` + `/impeccable polish`.

### [P1] La ventana angosta usa el layout de celular
- **Dónde:** `.app-container { max-width: 420px }`, menú hamburguesa bajo
  600 px, botones del header en una fila aparte.
- **Por qué importa:** es la vista principal del dueño del proyecto. Se
  pierden 80 px de ancho, tema/ajustes/atajos/compacto quedan detrás del menú
  y el historial queda ~2 pantallas abajo.
- **Arreglo:** columna que ocupe el ancho disponible (hasta ~560 px), menú
  hamburguesa solo bajo ~380 px, header compacto (progreso en una línea,
  acciones como íconos con tooltip).
- **Comando:** `/impeccable adapt` + `/impeccable layout`.

### [P1] El botón Registrar se pierde de vista
- **Dónde:** `#btn-submit` queda debajo del pliegue en 1366 × 768 y se va
  2,5 pantallas abajo cuando se abre el panel de IA o las plantillas.
- **Arreglo:** botón fijo al pie del formulario (decisión ya tomada: se queda
  pegado al borde inferior mientras se ve el formulario y no tapa el
  historial).
- **Comando:** `/impeccable layout`.

### [P2] Vidrio, halos y degradados aplanan la jerarquía y se ven genéricos
- **Dónde:** título con degradado + `drop-shadow` (en 1920 dibuja un
  rectángulo oscuro detrás), halos radiales del `body`, 16 superficies con
  `backdrop-filter`, `--shadow-glow`, foco azul en Tipo de Gestión, cajas
  dentro de cajas.
- **Arreglo:** superficies sólidas en capas (fondo, panel, hundido) con bordes
  de 1 px; título sólido; sin halos salvo el anillo de foco; un único estilo
  de foco (contorno naranja de 2 px con separación); sacar el recuadro de
  Tipo de Gestión; el aviso de ritmo bajo en ámbar en lugar de rojo.
- **Comando:** `/impeccable quieter` + `/impeccable polish`.

### [P2] El panel de auditoría IA es una pared de alarmas
- **Dónde:** `#ai-obs-panel`: veredicto, caja de incoherencia, botón verde de
  Gemini, dos columnas de ítems, resumen y plantilla anidada; los íconos ⓘ
  quedan solos en su propia línea (el CSS apunta a `i`, pero Lucide lo
  reemplaza por `svg`).
- **Por qué importa:** en 500 px suma ~1.700 px, usa cinco colores y cuatro
  niveles de anidado; los operadores aprenden a ignorarlo.
- **Arreglo (mismo contenido):** veredicto en una fila (badge + una frase),
  faltantes como checklist compacta, caja de coherencia neutra, Gemini como
  botón secundario, íconos alineados en línea.
- **Comando:** `/impeccable distill`.

## Usuarios tipo

- **Operador experto (teclado, 30 por día):** en 500 px tema/ajustes/atajos
  quedan detrás del menú; el historial está lejos para confirmar la última
  carga; editar/eliminar invisibles hasta el hover; tres botones naranjas
  "Pegar en Obs." en el panel de reiterado.
- **Primera vez:** dos lugares para "pegar el reclamo" (Smart Paste y el
  campo de datos del reclamo); "Nueva Jornada" en rojo arriba parece el punto
  de partida; "(Opcional)" cuatro veces; el modal de Ajustes no tiene ✕ y
  hay que scrollear para llegar a Guardar.
- **Usuario que depende de accesibilidad:** contraste del botón principal
  2,8:1; sin "reducir movimiento"; foco igual al borde en reposo; la
  categoría se comunica solo con una franja de 3 px de color.

## Observaciones menores

- **Callcontact:** sin regla de franja en las tarjetas (queda naranja) y sin
  token `--cat-callcontact`, aunque en el gráfico es cian.
- **Variables CSS indefinidas:** `--radius-md`, `--text-color`, `--text`.
- `.plantilla-code { word-break: break-all }` corta palabras ("Se escala no /
  c"); conviene `overflow-wrap: anywhere`.
- "Hay que agarrar un poco **mas** la pala" → falta la tilde ("más").
- Pie de página en inglés ("Developed by") en una interfaz en español.
- El aviso de Ajustes pasa al "tú" ("No **debes**…") en una app en voseo.
- El progreso muestra "18 / 30" pero no "faltan 12", que es el número que se
  sigue durante el turno.
- El tile "Más frecuente" se parte en 3 líneas en 500 px.
- El ícono de info del aviso de Ajustes se ve como un punto (mismo problema
  `i` vs `svg`).

## Fuera del alcance visual (se registra, no se corrige en el refinamiento)

- **El sonido de celebración ignora el switch "Activar sonido"**
  (`triggerGoalCelebration()` en `js/app.js`). Es un bug funcional; encaja en
  el PR de personalidad, que suma los switches de sonido y mensajes.

---

## Plan de acción

| Prioridad | Comando | Qué resuelve | PR |
|---|---|---|---|
| P1 | `/impeccable colorize` | Contraste del naranja: texto oscuro en el botón, token `--primary-text`. | Refinamiento visual |
| P1 | `/impeccable adapt` | Vista angosta de escritorio: columna más ancha, menú hamburguesa solo en anchos mínimos, header compacto. | Refinamiento visual |
| P1 | `/impeccable layout` | Botón Registrar fijo al pie del formulario; jerarquía de header, formulario, estadísticas e historial. | Refinamiento visual |
| P2 | `/impeccable quieter` | Superficies sólidas, sin halos ni degradados, un único estilo de foco, ritmo bajo en ámbar. | Refinamiento visual |
| P2 | `/impeccable distill` | Panel de IA compacto, plantillas de reiterado más livianas. | Refinamiento visual |
| P2 | `/impeccable typeset` | Títulos de sección, modal de atajos, cortes de palabra. | Refinamiento visual |
| P2 | `/impeccable harden` | Foco visible, modales accesibles, objetivos táctiles, `prefers-reduced-motion`. | Refinamiento visual / Movimiento |
| P3 | `/impeccable animate` + `delight` | Movimiento medido y celebración coherente; switches de sonido y mensajes. | Movimiento y personalidad |
| — | `/impeccable polish` | Pasada final y nueva medición. | Cada PR |
