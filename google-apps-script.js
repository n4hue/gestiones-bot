// ============================================
// GESTIONES BOT - Google Apps Script
// ============================================
// INSTRUCCIONES DE INSTALACIÓN:
//
// 1. Crear una Google Sheet nueva (https://sheets.new)
// 2. Ir a Extensiones → Apps Script
// 3. Borrar todo el contenido del editor
// 4. Pegar este código completo
// 5. Guardar con Ctrl+S
// 6. Clic en "Implementar" → "Nueva implementación"
//    - Tipo: Aplicación web
//    - Ejecutar como: Yo (tu email)
//    - Quién tiene acceso: Cualquier persona
// 7. Clic en "Implementar" y autorizar cuando se solicite
// 8. Copiar la URL que aparece
// 9. Abrir Gestiones BOT → ⚙️ Configuración
//    → Pegar la URL en "URL de Google Sheets"
//    → Guardar
//
// ¡Listo! Cada gestión se sincronizará automáticamente.
// ============================================

const SHEET_NAME = 'Gestiones';

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Crear la hoja con encabezados si no existe
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'ID', 'Fecha', 'Hora', 'N_Cliente',
        'Tipo_RA', 'Observaciones', 'Sync_Timestamp'
      ]);
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.id || '',
      data.fecha || '',
      data.hora || '',
      data.cliente || '',
      data.tipo_ra || '',
      data.observaciones || '',
      new Date().toISOString()
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Endpoint de verificación (GET)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Gestiones BOT endpoint activo ✅'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
