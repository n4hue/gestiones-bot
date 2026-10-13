// Categorías de gestión: color de cada una y clasificación de un tipo de RA.
export const CATEGORY_COLORS = {
    'INTERNET': '#3b82f6',
    'TELEFONIA': '#8b5cf6',
    'WIFI MESH': '#10b981',
    'TELEVISIÓN': '#f59e0b',
    'WEB / APP': '#ec4899',
    'ESCALAMIENTO N3': '#ef4444',
    'GESTIONES ESPECIALES': '#6366f1',
    'CALLCONTACT': '#06b6d4'
};

export function getCategory(tipoRa) {
    const lower = tipoRa.toLowerCase();
    if (lower.includes('callcontact')) return 'CALLCONTACT';
    if (lower.includes('banda ancha') || lower.includes('internet')) return 'INTERNET';
    if (lower.includes('telefonia') || lower.includes('telef resid')) return 'TELEFONIA';
    if (lower.includes('wifi mesh')) return 'WIFI MESH';
    if (lower.includes('televisión') || lower.includes('television') || lower.includes('aplicaciones - deco')) return 'TELEVISIÓN';
    if (lower.includes('web/app') || lower.includes('app mobile')) return 'WEB / APP';
    if (['inconveniente con insumos', 'problemas cableados red.500', 'reposición de equipos cm/dd', 'escalamiento teams', 'pantalla (deco android) soy cliente sin solucion',].includes(lower)) return 'ESCALAMIENTO N3';
    return 'GESTIONES ESPECIALES';
}
