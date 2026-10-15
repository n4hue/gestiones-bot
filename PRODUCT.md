# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Unos 5 operadores del equipo de Analistas BackOffice Técnico (NOC). Cada uno
registra en la app las gestiones que resuelve durante su turno (mañana 08–14 o
tarde 14–20), con un objetivo diario de 30 gestiones. La usan todo el turno,
varias veces por hora, en paralelo con el CRM y Viena, de donde copian los
datos de cada reclamo.

## Product Purpose

Registrar cada gestión rápido y sin errores, y dejarla cargada en el Google
Form corporativo (pre-llenado desde la app) y, opcionalmente, en Google
Sheets. Alrededor de eso, la app acompaña la jornada: progreso hacia las 30
gestiones, ritmo, racha, alarmas de break según el horario de cada operador,
historial del día y herramientas para el reclamo (Smart Paste, auditoría del
texto del reclamo con reglas locales y con Gemini, calculadora de MACs,
plantillas de reclamo reiterado).

Éxito: registrar una gestión lleva segundos, con la menor fricción posible
entre copiar el reclamo en Viena y tenerlo cargado.

## Positioning

Es la herramienta propia del equipo: conoce sus tipos de gestión y RA, los
campos exactos del Google Form, las reglas de auditoría de cada RA y los
horarios y francos de cada operador. Nada genérico reemplaza eso.

## Operating Context

- Navegador de escritorio (Chrome o Edge) en monitores de 1080 px de alto.
- El tamaño de la ventana varía según la persona: pantalla completa (1920 o
  1366 de ancho), media pantalla junto al CRM (~960 px), o **la ventana lo
  más angosta posible a todo el alto (~500 × 1000 px)**, que es como la usa el
  dueño del proyecto. No se usa en el celular.
- Flujo típico: copiar el reclamo en Viena → Smart Paste (Ctrl+V o Alt+P) →
  revisar tipo de gestión → Registrar (Ctrl+Enter) → completar y cerrar el
  Google Form que se abre → la gestión queda en el historial.
- Uso intensivo de teclado: atajos Alt+C, Alt+G, Alt+P, Alt+R, Alt+T, Alt+M,
  Alt+L, Ctrl+K, Ctrl+Enter y Esc.
- Hay un modo compacto (Alt+M) y temas oscuro (predeterminado) y claro.
- Los datos viven en `localStorage` de cada navegador (PWA con service worker).

## Capabilities and Constraints

- Sin frameworks ni build: Vanilla JS (módulos ES), Vanilla CSS y HTML,
  desplegado en Vercel. Ver `AGENTS.md`.
- El funcionamiento actual es correcto y se mantiene: campos, atajos, flujos
  y lógica no cambian sin un pedido explícito.
- Terminología del dominio: gestión, RA (reclamo administrativo), tipo de
  gestión, reiterado, Viena, CRM, Google Form, Pass CRM, franco, break, NOC.

## Brand Commitments

- Nombre: "Gestiones BOT".
- Identidad que se conserva: color principal naranja `#FF6B35`, tema oscuro
  como predeterminado, Inter para la interfaz y JetBrains Mono para datos
  (horas, MACs, atajos).
- Personalidad informal y motivadora del equipo: mensajes de ritmo como "Hay
  que agarrar un poco más la pala", sonidos de celebración distintos para cada
  día al llegar a 30, confeti. Se conserva, con la posibilidad de desactivar
  sonidos y mensajes.

## Product Principles

1. **La tarea primero.** Cada pantalla existe para registrar una gestión más
   rápido o con menos errores; lo demás acompaña sin competir.
2. **Memoria muscular intocable.** Los operadores usan la app de memoria:
   atajos, orden de los campos y flujos se respetan.
3. **Funciona igual de bien en una ventana angosta** que a pantalla completa.
4. **Personalidad con interruptor.** El tono del equipo motiva, pero cada
   operador puede bajarlo.

## Accessibility & Inclusion

Uso prolongado (turnos de 6 horas): contraste WCAG AA en ambos temas, texto
mínimo de 12 px, todo operable con teclado y respeto por "reducir movimiento".
