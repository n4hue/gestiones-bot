---
name: Gestiones BOT
description: Consola de turno para registrar gestiones de BackOffice NOC sin fricción.
colors:
  noche: "#0B0F19"
  noche-panel: "#111827"
  tinta: "#E8ECF4"
  tinta-suave: "#8592A6"
  tinta-tenue: "#7B879B"
  naranja-turno: "#FF6B35"
  naranja-turno-hondo: "#E65F2B"
  rojo-alerta: "#EF4444"
  verde-meta: "#10B981"
  ambar-aviso: "#F59E0B"
  cat-internet: "#3B82F6"
  cat-telefonia: "#8B5CF6"
  cat-wifi-mesh: "#10B981"
  cat-television: "#F59E0B"
  cat-web-app: "#EC4899"
  cat-escalamiento: "#EF4444"
  cat-especiales: "#6366F1"
  cat-callcontact: "#06B6D4"
  papel: "#F0F2F5"
  papel-panel: "#FFFFFF"
  tinta-clara: "#1A202C"
  tinta-clara-suave: "#4A5568"
typography:
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 700
    letterSpacing: "-0.03em"
  counter:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 800
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
    letterSpacing: "0.06em"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
  data:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
rounded:
  xs: "3px"
  sm: "6px"
  md: "10px"
  pill: "999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
components:
  button-primary:
    backgroundColor: "{colors.naranja-turno}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 1rem"
  button-secondary:
    backgroundColor: "{colors.noche-panel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 1rem"
  input:
    backgroundColor: "{colors.noche-panel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 0.7rem"
  chip:
    backgroundColor: "{colors.noche-panel}"
    textColor: "{colors.tinta-suave}"
    rounded: "{rounded.pill}"
    padding: "0.22rem 0.6rem"
  card:
    backgroundColor: "{colors.noche-panel}"
    rounded: "{rounded.md}"
    padding: "1rem"
---

# Design System: Gestiones BOT

> Estado: **sistema actual documentado** (antes del refinamiento visual). Los
> tokens reflejan el código de hoy. Las reglas marcadas como *dirección
> aprobada* son decisiones confirmadas por el usuario que el refinamiento va a
> aplicar; cuando se apliquen, este archivo se actualiza.

## Overview

**Creative North Star: "La consola del turno"**

Gestiones BOT es el tablero que un operador tiene abierto las seis horas de su
turno, al lado del CRM. La superficie es oscura y calma para no competir con
Viena; el naranja es la única voz fuerte y marca lo que importa ahora: la
acción de registrar, el progreso hacia las 30 gestiones y la selección actual.
Todo lo demás (categorías, estados, historial) se apoya en una paleta de
colores de categoría que funciona como código, no como decoración.

Es una herramienta de uso intensivo con teclado: densa pero legible, con
atajos visibles al lado de cada acción y datos (horas, MACs, atajos) en
tipografía monoespaciada. La personalidad del equipo vive en los mensajes de
ritmo, el confeti y los sonidos de celebración al llegar a la meta, no en el
cromado de la interfaz.

**Key Characteristics:**
- Oscuro por defecto, con tema claro a la par.
- Un solo acento (naranja) para acción, progreso y selección.
- Colores de categoría consistentes en historial, estadísticas y chips.
- Atajos de teclado visibles junto a las acciones.
- Funciona en una ventana de ~500 px de ancho a todo el alto.

## Colors

Fondo azul-noche casi negro, superficies apenas más claras, texto frío y un
naranja cálido como única señal de acción.

### Primary
- **Naranja Turno** (#FF6B35): botón principal, progreso del día, contador,
  selección activa (chips, opción del desplegable), foco de inputs, zona de
  Smart Paste. Es el color de la identidad: no se reemplaza.
- **Naranja Turno Hondo** (#E65F2B): hover del primario y su versión en el
  tema claro.

### Neutral
- **Noche** (#0B0F19): fondo de la página (tema oscuro).
- **Noche Panel** (#111827): superficies sólidas (desplegables, toasts).
- **Tinta** (#E8ECF4): texto principal.
- **Tinta Suave** (#8592A6) y **Tinta Tenue** (#7B879B): texto secundario y
  etiquetas; ambos cumplen 4.5:1 sobre el fondo.
- Tema claro: **Papel** (#F0F2F5), **Papel Panel** (#FFFFFF), **Tinta Clara**
  (#1A202C), **Tinta Clara Suave** (#4A5568).

### Semánticos
- **Rojo Alerta** (#EF4444): acciones destructivas y errores.
- **Verde Meta** (#10B981): éxito, meta alcanzada, sincronizado.
- **Ámbar Aviso** (#F59E0B): advertencias y badge de reiterado.

### Categorías
Internet #3B82F6 · Telefonía #8B5CF6 · WiFi Mesh #10B981 · Televisión #F59E0B
· Web/App #EC4899 · Escalamiento N3 #EF4444 · Especiales #6366F1 · Callcontact
#06B6D4. Se usan en el borde de las tarjetas del historial y en las barras de
estadísticas.

### Named Rules
**The Una Sola Voz Rule.** El naranja es el único color de acento: marca la
acción principal, el progreso y la selección actual. Nunca se usa como
decoración de fondo ni en estados inactivos.

**The Contraste en el Botón Rule** *(dirección aprobada)*. El texto sobre el
naranja tiene que cumplir 4.5:1. El blanco sobre #FF6B35 da 2.8:1 y no
cumple: el botón principal lleva texto oscuro (Noche) o un naranja más hondo.

## Typography

**Body Font:** Inter (con -apple-system, BlinkMacSystemFont, sans-serif)
**Label/Mono Font:** JetBrains Mono (con monospace)

**Character:** Una sola familia sans para toda la interfaz y una monoespaciada
para todo lo que es dato: horas, MACs, atajos de teclado.

### Hierarchy
- **Headline** (700, 1.4rem): el nombre "Gestiones BOT" en el header.
- **Counter** (800, 1.6rem): el contador "X / 30".
- **Title** (600, 0.85rem, mayúsculas, 0.06em): títulos de sección
  ("Registrar nueva gestión", "Historial de hoy").
- **Body** (400, 0.875rem, 1.5): texto de la interfaz e inputs.
- **Label** (600, 0.8125rem): etiquetas de campos, sin mayúsculas forzadas.
- **Data** (400, 0.75rem, JetBrains Mono): horas, MACs, atajos.

Escala mínima: ningún texto por debajo de 12 px (`--fs-xs`).

## Layout

Columna única de 420 px de ancho máximo, centrada; desde 1100 px de ancho
pasa a dos columnas (formulario a la izquierda; estadísticas e historial a la
derecha) con un contenedor de hasta 1240 px. El modo compacto (Alt+M) reduce
paddings y tamaños.

La vista de referencia es una **ventana angosta de ~500 × 1000 px**: ahí el
header, el progreso y el formulario completo tienen que entrar sin scrollear.
Espaciado basado en múltiplos de 0.25rem (0.25 / 0.5 / 0.75 / 1rem).

## Elevation & Depth

Hoy la profundidad viene de tarjetas translúcidas con `backdrop-filter:
blur(16px)` sobre un fondo con dos degradados radiales, más sombras amplias
(`0 8px 32px rgba(0,0,0,.3)`) y halos naranjas en elementos activos.

### Named Rules
**The Superficies Sólidas Rule** *(dirección aprobada)*. El refinamiento
reemplaza el vidrio por superficies sólidas con capas tonales: el fondo, un
panel apenas más claro y un borde de 1 px. Las sombras quedan para lo que
flota (desplegables, modales, toasts), no para lo que está en reposo.

## Shapes

Esquinas suaves y consistentes: 6 px para controles (botones, inputs,
tarjetas del historial), 10 px para tarjetas de sección, píldora para chips y
badges, 3–4 px para elementos chicos (atajos, badges de tipo).

## Components

### Buttons
- **Shape:** 6 px.
- **Primary:** naranja, ancho completo en el formulario, con el atajo
  (`Ctrl+Enter`) dentro del botón.
- **Secondary:** superficie neutra con borde de 1 px.
- **Danger outline:** "Nueva Jornada": borde rojo, se rellena solo al hover.
- **Link:** texto naranja sin fondo ("Ver todas", "Mostrar menos").

### Chips
- **Style:** píldora neutra con contador; el activo lleva borde y texto
  naranja y el contador relleno de naranja.

### Cards / Containers
- **Sección:** esquina de 10 px, borde de 1 px, padding 1rem.
- **Gestión del historial:** esquina de 6 px y borde izquierdo con el color de
  la categoría.

### Inputs / Fields
- **Style:** fondo levemente más claro que la tarjeta, borde de 1 px, 6 px.
- **Focus:** borde naranja + anillo de 2 px del naranja translúcido.

### Desplegable (combobox)
Todos los `<select>` se reemplazan por un combobox propio
(`js/modules/combobox.js`): lista sólida flotante, encabezados de grupo en
naranja, opción activa con fondo naranja tenue y la elegida con ✓. Las listas
largas permiten buscar.

### Smart Paste
Zona punteada naranja arriba del formulario con el ícono, el texto de ayuda y
los atajos `Ctrl+V` / `Alt+P`. Es la puerta de entrada del flujo.

## Do's and Don'ts

### Do:
- **Do** usar el naranja #FF6B35 solo para acción, progreso y selección.
- **Do** mostrar el atajo de teclado junto a cada acción que lo tenga.
- **Do** usar JetBrains Mono para horas, MACs y atajos.
- **Do** verificar cada cambio en una ventana de ~500 × 1000 px además de
  1366 × 768 y 1920 × 1080, en tema oscuro y claro.
- **Do** mantener contraste WCAG AA y texto de 12 px como mínimo.
- **Do** respetar `prefers-reduced-motion` en toda animación.

### Don't:
- **Don't** usar texto con degradado (el título actual lo tiene; el
  refinamiento lo reemplaza por un color sólido). *(dirección aprobada)*
- **Don't** usar vidrio (`backdrop-filter`) ni halos de color como profundidad
  de superficies en reposo. *(dirección aprobada)*
- **Don't** poner texto blanco sobre el naranja #FF6B35 (2.8:1).
- **Don't** cambiar campos, atajos, orden ni flujos: la memoria muscular de
  los operadores es intocable.
- **Don't** usar animaciones con rebote; el movimiento acompaña cambios de
  estado en 150–250 ms.
