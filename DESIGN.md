---
name: Gestiones BOT
description: Consola de turno para registrar gestiones de BackOffice NOC sin fricción.
colors:
  noche: "#0B0F19"
  noche-panel: "#121826"
  noche-flotante: "#171E2C"
  noche-hundido: "#0D121D"
  noche-relleno: "#1A2232"
  borde: "#222B3B"
  borde-fuerte: "#2E384B"
  tinta: "#E8ECF4"
  tinta-suave: "#8F9BB0"
  tinta-tenue: "#7F8BA0"
  naranja-turno: "#FF6B35"
  naranja-turno-hover: "#FF8152"
  naranja-texto: "#FF7A47"
  sobre-naranja: "#0B0F19"
  rojo-alerta: "#EF4444"
  rojo-relleno: "#DC2626"
  rojo-texto: "#F87171"
  verde-meta: "#10B981"
  verde-texto: "#34D399"
  ambar-aviso: "#F59E0B"
  ambar-texto: "#FBBF24"
  violeta-ia: "#818CF8"
  cat-internet: "#3B82F6"
  cat-telefonia: "#8B5CF6"
  cat-wifi-mesh: "#10B981"
  cat-television: "#F59E0B"
  cat-web-app: "#EC4899"
  cat-escalamiento: "#EF4444"
  cat-especiales: "#6366F1"
  cat-callcontact: "#06B6D4"
  papel: "#EEF1F5"
  papel-panel: "#FFFFFF"
  papel-hundido: "#F5F7FA"
  papel-borde: "#DDE2E9"
  tinta-clara: "#1A202C"
  tinta-clara-suave: "#4A5568"
  naranja-texto-claro: "#C2410C"
  rojo-texto-claro: "#B91C1C"
  verde-texto-claro: "#047857"
  ambar-texto-claro: "#B45309"
typography:
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 700
    letterSpacing: "-0.02em"
  counter:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 800
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 650
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
  small:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
  data:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  pill: "999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
components:
  button-primary:
    backgroundColor: "{colors.naranja-turno}"
    textColor: "{colors.sobre-naranja}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 1rem"
  button-secondary:
    backgroundColor: "{colors.noche-relleno}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 1rem"
  input:
    backgroundColor: "{colors.noche-hundido}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 0.7rem"
  chip:
    backgroundColor: "{colors.noche-relleno}"
    textColor: "{colors.tinta-suave}"
    rounded: "{rounded.pill}"
    padding: "0.22rem 0.6rem"
  card:
    backgroundColor: "{colors.noche-panel}"
    rounded: "{rounded.lg}"
    padding: "1rem"
---

# Design System: Gestiones BOT

> Estado: **sistema refinado** (PR de refinamiento visual). Los tokens
> reflejan `css/style.css`; los nombres de la izquierda son los de este
> documento y entre paréntesis va la variable CSS.

## Overview

**Creative North Star: "La consola del turno"**

Gestiones BOT es el tablero que un operador tiene abierto las seis horas de su
turno, al lado del CRM. La superficie es oscura, sólida y calma para no
competir con Viena; el naranja es la única voz fuerte y marca lo que importa
ahora: la acción de registrar, el progreso hacia las 30 gestiones y la
selección actual. Todo lo demás (categorías, estados, historial) se apoya en
colores de categoría que funcionan como código, no como decoración.

Es una herramienta de uso intensivo con teclado: densa pero legible, con
atajos visibles al lado de cada acción y datos (horas, MACs, atajos) en
tipografía monoespaciada. La personalidad del equipo vive en los mensajes de
ritmo, el confeti y los sonidos de celebración al llegar a la meta, no en el
cromado de la interfaz.

**Key Characteristics:**
- Oscuro por defecto, con tema claro a la par.
- Superficies sólidas en capas tonales; sin vidrio, halos ni degradados.
- Un solo acento (naranja) para acción, progreso y selección.
- Colores de categoría como punto de 8 px, nunca como franja.
- Atajos de teclado visibles junto a las acciones.
- Pensado para una ventana de ~500 px de ancho a todo el alto.

## Colors

Fondo azul-noche casi negro, paneles apenas más claros, texto frío y un
naranja cálido como única señal de acción.

### Primary
- **Naranja Turno** (#FF6B35, `--primary`): relleno del botón principal, barra
  de progreso, contador del chip activo, ícono de Smart Paste, foco.
- **Naranja Texto** (#FF7A47 oscuro / #C2410C claro, `--primary-text`): el
  naranja cuando es texto o ícono (contador del día, etiquetas activas,
  enlaces). Cumple 4.5:1 sobre el panel en los dos temas.
- **Sobre Naranja** (#0B0F19, `--on-primary`): texto sobre cualquier relleno
  naranja, verde o ámbar (6.75:1 sobre #FF6B35).

### Neutral (tema oscuro)
- **Noche** (#0B0F19, `--bg-main`): fondo de la página.
- **Noche Panel** (#121826, `--bg-card`): tarjetas de sección.
- **Noche Flotante** (#171E2C, `--bg-card-solid`): modales, toasts,
  desplegables: lo que flota sobre la página.
- **Noche Hundido** (#0D121D, `--bg-input`): campos de texto.
- **Noche Relleno** (#1A2232, `--secondary`): botones secundarios, chips,
  píldoras de tipo.
- **Borde** (#222B3B) y **Borde Fuerte** (#2E384B): separadores de 1 px.
- **Tinta** (#E8ECF4), **Tinta Suave** (#8F9BB0) y **Tinta Tenue** (#7F8BA0):
  texto principal, secundario y metadatos; todos ≥4.5:1 sobre el panel.

### Neutral (tema claro)
**Papel** (#EEF1F5), **Papel Panel** (#FFFFFF), **Papel Hundido** (#F5F7FA),
**Papel Borde** (#DDE2E9), **Tinta Clara** (#1A202C), **Tinta Clara Suave**
(#4A5568).

### Semánticos
Cada estado tiene un color de relleno y uno de texto (`--*-text`), distinto
por tema para que el texto cumpla 4.5:1:
- **Rojo Alerta** (#EF4444; relleno #DC2626; texto #F87171 / #B91C1C).
- **Verde Meta** (#10B981; texto #34D399 / #047857): meta alcanzada, ritmo
  bueno, sincronizado.
- **Ámbar Aviso** (#F59E0B; texto #FBBF24 / #B45309): advertencias, ritmo
  bajo, reiterado.
- **Violeta IA** (#818CF8): exclusivo de la auditoría IA ("Auditar con IA",
  título del panel), para separarla visualmente de la acción principal.

### Categorías
Internet #3B82F6 · Telefonía #8B5CF6 · WiFi Mesh #10B981 · Televisión #F59E0B
· Web/App #EC4899 · Escalamiento N3 #EF4444 · Especiales #6366F1 · Callcontact
#06B6D4. Se usan como punto de 8 px junto a la hora en el historial y en las
barras de "Por categoría".

### Named Rules
**The Una Sola Voz Rule.** El naranja es el único color de acento: marca la
acción principal, el progreso y la selección actual. Nunca se usa como
decoración de fondo ni en estados inactivos (un desplegable con valor no
lleva borde naranja en reposo).

**The Contraste en el Botón Rule.** El texto sobre el naranja (y sobre verde
o ámbar) es Noche (`--on-primary`), nunca blanco: el blanco sobre #FF6B35 da
2.8:1. Sobre el rojo de relleno (#DC2626) sí va blanco.

**The Texto Semántico Rule.** Un color de estado usado como texto va siempre
por su variable `--*-text`, nunca con el hex del relleno: el ámbar #F59E0B
sobre blanco no se lee.

## Typography

**Body Font:** Inter (con -apple-system, BlinkMacSystemFont, sans-serif)
**Label/Mono Font:** JetBrains Mono (con monospace)

**Character:** Una sola familia sans para toda la interfaz y una monoespaciada
para todo lo que es dato: horas, MACs, atajos de teclado.

### Hierarchy
- **Headline** (700, 1.15rem): "Gestiones BOT", con un cuadrado naranja de
  0.7rem como marca.
- **Counter** (800, 1.6rem, cifras tabulares): el contador del día en naranja,
  seguido de "/30" y "faltan N".
- **Title** (650, 1rem, sin mayúsculas forzadas): títulos de sección
  ("Registrar gestión", "Historial de hoy", "Por categoría").
- **Body** (400, 0.875rem, 1.5): texto de la interfaz e inputs.
- **Label** (600, 0.8125rem): etiquetas de campos.
- **Small** (600, 0.75rem): chips, métricas del progreso, etiqueta "opcional".
- **Data** (400, 0.75rem, JetBrains Mono): horas, MACs, atajos.

Escala mínima: ningún texto por debajo de 12 px (`--fs-xs`). Los números que
cambian (contador, cliente, ritmo) usan `font-variant-numeric: tabular-nums`.

## Layout

Columna única de hasta 560 px, centrada. Desde 1100 px de ancho pasa a dos
columnas: el formulario a la izquierda, el historial y "Por categoría" a la
derecha. El modo compacto (Alt+M) reduce paddings y tamaños.

La vista de referencia es una **ventana angosta de ~500 × 1000 px**: ahí el
header, el progreso con su tira de métricas (Ritmo · Racha · Más frecuente) y
el formulario completo, con "Registrar Gestión", entran sin scrollear. El
menú hamburguesa queda solo para anchos menores a 380 px.

Orden de lectura: progreso → acciones del día → formulario → historial →
"Por categoría" (plegable). Espaciado basado en múltiplos de 0.25rem.

## Elevation & Depth

La profundidad viene de capas tonales: fondo, panel apenas más claro y un
borde de 1 px. Las sombras (`--shadow-md`, `--shadow-lg`) quedan para lo que
flota: desplegables, modales, toasts y la tarjeta de break.

### Named Rules
**The Superficies Sólidas Rule.** Sin `backdrop-filter`, sin halos de color
(`box-shadow: 0 0 Npx`), sin brillos en el texto y sin degradados. Una
tarjeta en reposo no tiene sombra ni se levanta al pasar el mouse.

## Shapes

6 px para controles (botones, inputs, tarjetas del historial), 8 px para
bloques internos, 10 px para tarjetas de sección y modales, píldora para
chips y 4 px para elementos chicos (atajos, badges).

## Components

### Buttons
- **Primary:** relleno naranja con texto Noche, ancho completo en el
  formulario, con el atajo (`Ctrl+Enter`) dentro del botón en un recuadro de
  1 px del mismo color del texto.
- **Secondary:** relleno neutro con borde de 1 px. Toda acción que no es
  "Registrar" es secundaria (pegar plantillas, aplicar resumen, Gemini).
- **Danger outline:** "Nueva Jornada": borde y texto rojos; se rellena al
  hover.
- **Link:** texto naranja sin fondo ("Ver todas").

### Registrar fijo
`.form-actions` es `position: sticky; bottom: 0` dentro de la tarjeta del
formulario: con el formulario largo (auditoría IA o herramientas abiertas),
"Registrar Gestión" sigue a la vista sobre una franja del color del panel con
borde superior de 1 px.

### Progreso
Contador grande, "/30", "faltan N" (o "objetivo cumplido" en verde) y el
cronómetro de la sesión con ícono de reloj. Debajo, la barra de 6 px y la
tira de métricas. El mensaje de ritmo es un recuadro neutro con un punto de
color: ámbar si el ritmo está bajo o justo, verde si va bien o se cumplió.

### Chips
Píldora neutra con contador; el activo lleva borde y texto naranja y el
contador relleno de naranja con texto Noche.

### Cards / Containers
- **Sección:** 10 px, borde de 1 px, padding 1rem, sin sombra.
- **Gestión del historial:** 6 px, borde de 1 px; la categoría es un punto de
  8 px antes de la hora. Las acciones (editar, eliminar) quedan tenues en
  reposo y se encienden al pasar el mouse o con el foco.

### Inputs / Fields
- **Style:** fondo hundido, borde de 1 px, 6 px.
- **Focus:** borde naranja más un anillo interno de 1 px. El foco por teclado
  de botones y enlaces es un contorno naranja de 2 px separado 2 px.
- Campos opcionales llevan la etiqueta "opcional" en Small y Tinta Suave.

### Desplegable (combobox)
Todos los `<select>` se reemplazan por un combobox propio
(`js/modules/combobox.js`): lista sólida flotante, encabezados de grupo en
naranja texto, opción activa con fondo naranja tenue y la elegida con ✓. Las
listas largas permiten buscar.

### Smart Paste
Zona punteada naranja arriba del formulario con el ícono en un círculo
naranja, el texto de ayuda y los atajos `Ctrl+V` / `Alt+P`. Es la puerta de
entrada del flujo.

### Auditoría IA
Panel plano dentro del acordeón: puntaje y barra, un recuadro de veredicto
con borde y fondo tenue del color del estado (verde, ámbar, rojo o neutro) y
listas de ítems como filas con el ícono de estado a la izquierda. Sin cajas
anidadas.

### Modales
Encabezado con título (ícono naranja, texto Tinta) y botón ✕ a la derecha;
fondo Noche Flotante, `--shadow-lg`. Los diálogos de confirmación mantienen
el texto centrado.

## Motion

Movimiento presente pero rápido: acompaña un cambio de estado, se nota y
nunca hace esperar.

- **Tokens:** `--dur-fast` 150 ms, `--dur` 220 ms, `--dur-slow` 300 ms;
  `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`) para lo que entra y
  `--ease-in` para lo que sale. Las barras de progreso usan 600 ms porque
  recorren una distancia larga.
- **Qué se mueve:**
  - el contador salta al registrar (escala 1,28);
  - la gestión recién registrada o editada entra desde arriba (16 px) y
    queda resaltada en naranja tenue durante 1,8 s; el resto del historial
    entra con 6 px;
  - los toasts entran desde la derecha (32 px);
  - los modales suben 8 px con escala 0,94;
  - los desplegables (combobox) se abren desde el campo con 10 px de
    recorrido y la flecha gira;
  - los acordeones ("Datos del reclamo", "Herramientas", plantilla oficial)
    animan la altura al abrir y cerrar (`::details-content` con
    `interpolate-size`; en navegadores sin soporte abren sin animar);
  - al llegar a la meta, el panel de progreso destella en verde tres veces.
- **Sin rebote:** ninguna curva pasa del 100 % ni hay keyframes que vuelvan
  hacia atrás.
- **Bucles:** solo para estados que esperan algo (sincronizando, Smart Paste
  esperando el pegado, incoherencia técnica, alarma de break). Un estado ya
  resuelto (meta cumplida) no late.
- **Reducir movimiento:** con `prefers-reduced-motion: reduce` (en Windows,
  "Efectos de animación" apagado) las animaciones y transiciones se anulan
  (las demoras se respetan para que el banner de meta siga durando lo mismo),
  el scroll deja de ser suave y no hay confeti.
- **Animaciones siempre activadas:** un switch en Configuración (apagado por
  defecto) pone `data-motion-always` en `<html>` e ignora la preferencia del
  sistema, para PCs donde los efectos vienen apagados por rendimiento.

### Personalidad
Los mensajes de ritmo, el banner con emojis, el confeti y el sonido del día
son parte de la identidad del equipo. En Configuración hay dos switches,
activados por defecto:
- **Sonido de celebración al llegar a la meta**, independiente del sonido al
  registrar.
- **Mensajes con personalidad y confeti:** apagado, el ritmo se describe en
  tono neutro ("Ritmo justo para llegar a 30.") y la meta muestra un banner
  sin emojis ni confeti.

## Do's and Don'ts

### Do:
- **Do** usar el naranja #FF6B35 solo para acción, progreso y selección, y
  `--primary-text` cuando el naranja es texto.
- **Do** poner texto Noche sobre rellenos naranja, verde y ámbar.
- **Do** mostrar el atajo de teclado junto a cada acción que lo tenga.
- **Do** usar JetBrains Mono para horas, MACs y atajos.
- **Do** verificar cada cambio en una ventana de ~500 × 1000 px además de
  1366 × 768 y 1920 × 1080, en tema oscuro y claro.
- **Do** mantener contraste WCAG AA y texto de 12 px como mínimo; no bajar la
  opacidad de un texto para "atenuarlo" (usar Tinta Suave).
- **Do** respetar `prefers-reduced-motion` en toda animación, salvo que el
  operador active "Animaciones siempre activadas".

### Don't:
- **Don't** usar texto con degradado, vidrio (`backdrop-filter`) ni halos de
  color.
- **Don't** usar bordes laterales de color de más de 1 px como acento
  (franjas a la izquierda o arriba de una tarjeta).
- **Don't** poner texto blanco sobre el naranja #FF6B35 (2.8:1).
- **Don't** usar emojis como íconos de la interfaz (los mensajes de ritmo y
  celebración sí pueden llevarlos).
- **Don't** cambiar campos, atajos, orden ni flujos: la memoria muscular de
  los operadores es intocable.
- **Don't** usar animaciones con rebote; el movimiento acompaña cambios de
  estado en 150–300 ms.
