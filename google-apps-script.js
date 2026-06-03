// ============================================
// GESTIONES BOT - Google Apps Script
// ============================================
// INSTRUCCIONES DE ACTUALIZACIÓN:
//
// 1. Ir a Extensiones → Apps Script en tu Google Sheet
// 2. Borrar todo el contenido actual y pegar este nuevo
// 3. Guardar con Ctrl+S
// 4. Clic en "Implementar" → "Gestionar implementaciones"
// 5. Editar (lápiz) la implementación actual
// 6. Versión: elegir "Nueva versión"
// 7. Clic en "Implementar"
// ============================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Determinar la acción (por defecto es 'add' si viene del formato anterior)
    const action = data.action || 'add';
    const gestionData = action === 'add' ? (data.data || data) : data;
    
    // 1. Lógica para segmentar por día
    // Formatear la fecha para que sea segura en nombres de hojas (ej. 02-06-2026)
    const rawFecha = gestionData.fecha || data.fecha || new Date().toLocaleDateString('es-AR');
    const sheetName = 'Gestiones_' + rawFecha.replace(/\//g, '-');
    
    let sheet = ss.getSheetByName(sheetName);

    // 2. Acción: ELIMINAR gestión
    if (action === 'delete') {
      if (sheet) {
        const idToDelete = data.id.toString();
        const dataRange = sheet.getDataRange();
        const values = dataRange.getValues();
        
        // Recorremos de abajo hacia arriba para evitar problemas con los índices al eliminar filas
        for (let i = values.length - 1; i >= 1; i--) { // i >= 1 ignora la fila de encabezados
          if (values[i][0].toString() === idToDelete) {
            sheet.deleteRow(i + 1); // deleteRow espera índice 1-based, y values array es 0-based
          }
        }
      }
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'ok', action: 'deleted' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Acción: AGREGAR gestión
    // Crear la hoja con encabezados si no existe (incluye soporte para Equipos)
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow([
        'ID', 'Fecha', 'Hora', 'N_Cliente',
        'Tipo_RA', 'Observaciones', 'CM_MAC', 'MTA_MAC', 'ONT_MAC', 'Decos', 'Linea', 'Sync_Timestamp'
      ]);
      sheet.getRange(1, 1, 1, 12).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const eq = gestionData.equipos || {};
    
    sheet.appendRow([
      gestionData.id || '',
      gestionData.fecha || '',
      gestionData.hora || '',
      gestionData.cliente || '',
      gestionData.tipo_ra || '',
      gestionData.observaciones || '',
      eq.cm || '',
      eq.mta || '',
      eq.ont || '',
      (eq.decos && eq.decos.length) ? eq.decos.join(' / ') : '',
      eq.linea || '',
      new Date().toISOString()
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', action: 'added' }))
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
      message: 'Gestiones BOT endpoint activo ✅ (Soporte Multi-Hoja y Borrado)'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
