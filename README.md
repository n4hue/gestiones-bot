# 🤖 Gestiones BOT - Tracker

Una potente y estilizada aplicación web progresiva (PWA) diseñada para el seguimiento, registro y agilización de gestiones diarias como **Analista BackOffice Técnico**. 

Permite registrar interacciones rápidamente, calcular automáticamente parámetros de hardware (como MTA MAC), gestionar el historial del día y mantener estadísticas detalladas en tiempo real, todo con soporte para almacenamiento local offline y sincronización en la nube mediante **Google Sheets**.

---

## 🚀 Características Principales

*   **Registro Rápido y Optimizado:** Carga de gestiones estructuradas por categoría, cliente y observaciones con atajos de teclado para flujo de trabajo veloz.
*   **🛠️ Herramientas de Equipos (Calculadora de MACs):**
    *   **Formateo Automático:** Agrega dos puntos (`:`) y convierte a mayúsculas automáticamente a medida que escribes las direcciones MAC.
    *   **Cálculo de MTA MAC:** Calcula la dirección MTA MAC de forma automática a partir de la CM MAC (sumando `3` en hexadecimal).
    *   **Portapapeles con un Clic:** Botones dedicados para copiar rápidamente cualquier MAC o línea telefónica y pegarla en sistemas corporativos.
*   **📊 Dashboard de Estadísticas en Tiempo Real:**
    *   Cálculo automático de Gestiones por Hora.
    *   Racha de días consecutivos alcanzando el objetivo diario.
    *   Categoría de gestión más frecuente con gráficos de distribución dinámicos.
*   **📂 Historial Diario Completo:** Búsqueda rápida interactiva por cliente u observaciones, filtros por categoría de gestión y opciones para editar o eliminar registros de la jornada.
*   **☁️ Sincronización Automática con Google Sheets:** Integración nativa con Google Sheets (vía Google Apps Script) para guardar y eliminar filas en la nube en tiempo real.
*   **💾 Persistencia Local e Historial:** Guarda tus gestiones de forma segura en el navegador (`localStorage`) agrupadas automáticamente por fecha.
*   **📥 Exportación de Datos:** Descarga tu historial diario con un clic en formato CSV compatible con Microsoft Excel.
*   **📱 Soporte PWA (Progressive Web App):** Instala la aplicación en tu escritorio o dispositivo móvil y utilízala sin conexión de red gracias a su Service Worker.
*   **🎨 Interfaz Moderna y Responsive:** Diseño premium con transiciones suaves, notificaciones flotantes (toasts) y soporte completo para **Modo Oscuro** y **Modo Claro**.

---

## 🎹 Atajos de Teclado

*   `Ctrl + Enter` : Registrar / Guardar gestión actual.
*   `Esc` : Cancelar edición actual o cerrar ventanas modales.

---

## 🔌 Integración con Google Sheets (Google Apps Script)

Si deseas que cada gestión registrada en la aplicación web se sincronice automáticamente en una hoja de cálculo de Google (creando automáticamente pestañas diarias tipo `Gestiones_DD-MM-YYYY`), sigue estos pasos:

### Paso 1: Configurar la Hoja de Cálculo
1. Crea una nueva hoja de cálculo en **Google Sheets**.
2. Ponle el nombre que prefieras (ej. *Control de Gestiones*).

### Paso 2: Agregar el Script de Google Apps
1. En el menú superior de tu Google Sheet, ve a **Extensiones** ➡️ **Apps Script**.
2. Borra cualquier código que aparezca por defecto en el editor.
3. Abre el archivo [google-apps-script.js](file:///d:/portfolio/webapp%20gestiones%20BOT/google-apps-script.js) de este repositorio, copia todo su contenido y pégalo en el editor de Apps Script.
4. Presiona `Ctrl + S` para guardar el proyecto. Puedes cambiar el título del proyecto arriba a la izquierda si lo deseas (ej. *Backend Gestiones BOT*).

### Paso 3: Publicar como Aplicación Web
1. Haz clic en el botón **Implementar** (o *Deploy*) en la esquina superior derecha ➡️ **Nueva implementación**.
2. En el engranaje de configuración de tipo, selecciona **Aplicación web**.
3. Configura los parámetros de la siguiente manera:
    *   **Descripción:** `API Gestiones BOT`
    *   **Ejecutar como:** `Yo` (tu correo electrónico).
    *   **Quién tiene acceso:** `Cualquiera` (o *Anyone*, esto es fundamental para que la web app pueda enviar los datos sin requerir inicio de sesión de Google).
4. Haz clic en **Implementar**.
5. **Autorizar Acceso:** Google te solicitará otorgar permisos al script.
    *   Selecciona tu cuenta de Google.
    *   Verás una pantalla de advertencia ("Google no ha verificado esta aplicación"). Haz clic en **Configuración Avanzada** (abajo a la izquierda).
    *   Haz clic en **Ir a Proyecto sin título (no seguro)**.
    *   Permite los accesos requeridos.

### Paso 4: Vincular en la Web App
1. Tras completar la implementación, Google te mostrará una ventana con la **URL de la aplicación web** (termina en `/exec`). Copia esa URL completa.
2. Abre tu aplicación web **Gestiones BOT**.
3. Haz clic en el ícono de configuración (⚙️) en la parte superior derecha.
4. En el campo **URL de Google Sheets (Apps Script)**, pega la URL que acabas de copiar.
5. Haz clic en **Guardar**.

¡Listo! A partir de ahora, cada gestión agregada se enviará a tu planilla en tiempo real (creando pestañas por día) y si eliminas una gestión del historial del día en la app, también se eliminará de Google Sheets.

---

## 🛠️ Tecnologías Utilizadas

*   **Frontend:** HTML5 semántico, CSS3 personalizado (con variables dinámicas para temas) y JavaScript Moderno (ES6+).
*   **Almacenamiento Local:** LocalStorage API para persistencia de datos y estado de configuración.
*   **Sonido y Micro-interacciones:** Web Audio API para reproducir notificaciones sonoras sin archivos externos.
*   **Integración:** Fetch API para peticiones HTTPS asíncronas con Google Sheets API (vía Apps Script).
*   **PWA:** Service Worker con estrategias de caché personalizadas para funcionamiento Offline.
*   **Hosting:** Configuración lista para despliegue rápido y seguro en plataformas como Vercel o Netlify.

---

## 🖥️ Ejecución Local

Para correr el proyecto localmente no necesitas ningún servidor complejo, basta con abrir el archivo `index.html` en tu navegador, o bien utilizar una extensión de servidor local como *Live Server* en VS Code:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/gestiones-bot.git
   ```
2. Abre la carpeta en tu editor de código favorito.
3. Ejecuta un servidor local o abre directamente el archivo `index.html`.

## 📁 Estructura del Proyecto

*   `index.html` - Interfaz de usuario estructurada.
*   `css/style.css` - Estilos del layout, animaciones, componentes y variables de diseño.
*   `js/app.js` - Controladores, interactividad, formateadores de MAC, almacenamiento y lógica de sync.
*   `google-apps-script.js` - Backend para Google Sheets.
*   `sw.js` - Service worker para soporte offline (PWA).
*   `manifest.json` - Configuración para instalación de la PWA.
*   `vercel.json` - Configuración de headers de seguridad y caché para despliegue en Vercel.

---
Desarrollado con ❤️ por **n4hue**.
