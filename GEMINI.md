# Reglas de Trabajo y Automatización

Este documento establece las pautas de comportamiento y flujo de trabajo para el agente en este repositorio.

## 1. Alta Autonomía y Cero Fricción
- **Ejecución directa:** Para cualquier requerimiento, cambio o corrección solicitado por el usuario, proceder inmediatamente a la edición de archivos y verificación sin pedir confirmación previa ni solicitar aprobación de planes detallados.
- **Sin preguntas triviales:** No bloquear el avance con preguntas que puedan deducirse del contexto del código o las buenas prácticas. Solo consultar si hay una ambigüedad crítica de negocio o riesgo de pérdida de datos.

## 2. Flujo de Git y Commits Automáticos
- **Auto-commit al terminar:** Siempre que se complete la implementación y verificación de una tarea o cambio pedido por el usuario, crear automáticamente el commit en Git (`git add` y `git commit`).
- **Formato de commits:** Utilizar el formato Conventional Commits con mensajes descriptivos y claros en español, alineados al historial del proyecto:
  - `feat: <descripción>` (para nuevas funciones o campos)
  - `fix: <descripción>` (para corrección de bugs o ajustes)
  - `style: <descripción>` (para retoques visuales o CSS)
  - `refactor: <descripción>` (para optimización de código sin cambio de comportamiento)
- **Push a remoto:** No ejecutar `git push` de forma automática, salvo que el usuario lo solicite expresamente.

## 3. Calidad y Estilo del Código
- Mantener la arquitectura existente (Vanilla JS, Vanilla CSS, HTML modular).
- Preservar comentarios y lógica preexistente intactos a menos que deban ser modificados por el requerimiento.
- Al modificar listas de opciones, gestiones o mappings, asegurar la coherencia entre `index.html`, `js/app.js` (incluyendo `GFORM_RA_MAPPING`, `GFORM_ESP_MAPPING`, `GESTIONES_ESPECIALES_VALUES`, `getCategory`, etc.).

## 4. Testing y Verificación Constante
- **Pruebas integrales:** Realizar validación y testeo exhaustivo de las funcionalidades del código (mediante ejecución, revisión o confirmación con el usuario) cada vez que se agreguen o modifiquen características. Asegurar que no se rompan lógicas previas (regresiones) y que el comportamiento en la interfaz sea correcto.
