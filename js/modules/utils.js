// Utilidades puras (sin DOM).
export function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ============================================
// Tools Logic (MAC Formatting & MTA Math)
// ============================================
export function formatMac(value) {
    let v = value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
    return v.match(/.{1,2}/g)?.join(':') || '';
}

export function calculateMta(cmMac) {
    const hex = cmMac.replace(/:/g, '');
    if (hex.length === 12) {
        try {
            let num = BigInt("0x" + hex);
            num += 3n;
            let newHex = num.toString(16).toUpperCase().padStart(12, '0');
            if (newHex.length > 12) newHex = newHex.slice(-12);
            return newHex.match(/.{1,2}/g)?.join(':') || '';
        } catch (e) {
            return '';
        }
    }
    return '';
}
