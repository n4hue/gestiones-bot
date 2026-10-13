// Motor de auditoría local de reclamos: reglas por tipo de RA, validación de
// coherencia técnica y cálculo del nivel de gestionabilidad. No toca el DOM.
import { escapeHtml } from './utils.js';

export function isPasswordEvaded(rawPass) {
    if (!rawPass || !rawPass.trim()) return true;
    const clean = rawPass.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (/^(?:-+|\.+|\?+|n\/?a|no|none|null|undefined|falta|ningun[ao])$/i.test(clean)) return true;
    if (/(?:no\s*(?:la\s*)?(?:brinda|dice|sabe|pasa|tiene|posee|recuerda|quiere|da|informa)|cliente\s*no\s*(?:brinda|dice|sabe|recuerda|tiene)|se\s*niega|vaci[ao]|faltante|sin\s*(?:contrasena|clave|pass|password)|desconoce|\bfalta\b|\bningun[ao]\b)/i.test(clean)) return true;
    return false;
}

// ============================================
// Content Coherence Validation Engine
// ============================================
// Validates that extracted field values are semantically valid
// (e.g., a MAC is hexadecimal, a URL is a real host, etc.)
export function validateContentCoherence(fieldId, value, coherenceType) {
    if (!value || !value.trim()) return null;
    const clean = value.trim();

    switch (coherenceType) {
        case 'mac': {
            // MAC must be 12 hex chars (with or without separators : - .)
            const macClean = clean.replace(/[:\-.\s]/g, '');
            if (!/^[0-9A-Fa-f]{12}$/.test(macClean)) {
                return {
                    valid: false,
                    label: `MAC inválida: "${clean}"`,
                    desc: `El valor "${clean}" no es una dirección MAC válida. Debe ser 12 caracteres hexadecimales (0-9, A-F), ej: AA:BB:CC:DD:EE:FF o AABBCCDDEEFF.`
                };
            }
            return { valid: true };
        }

        case 'mac_multiple': {
            // Can contain multiple MACs or "ninguna mac"
            if (/ninguna\s*mac/i.test(clean)) return { valid: true };
            const macMatches = clean.match(/[0-9A-Fa-f]{2}[:\-][0-9A-Fa-f]{2}[:\-][0-9A-Fa-f]{2}[:\-][0-9A-Fa-f]{2}[:\-][0-9A-Fa-f]{2}[:\-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12}/gi);
            if (!macMatches || macMatches.length === 0) {
                // Check if the text at least references MAC concepts
                if (/mac|[0-9A-Fa-f]{6,}/i.test(clean)) return { valid: true };
                return {
                    valid: false,
                    label: `MACs no detectadas en: "${clean.substring(0, 50)}..."`,
                    desc: `No se encontraron direcciones MAC válidas (12 hex: AA:BB:CC:DD:EE:FF). Si no hay equipos, indicar "Ninguna Mac".`
                };
            }
            // Validate each found MAC
            for (const m of macMatches) {
                const hex = m.replace(/[:\-.\s]/g, '');
                if (hex.length !== 12) {
                    return {
                        valid: false,
                        label: `MAC con longitud incorrecta: "${m}"`,
                        desc: `La MAC "${m}" no tiene los 12 caracteres hexadecimales obligatorios.`
                    };
                }
            }
            return { valid: true };
        }

        case 'host_url': {
            // Must be a valid URL, domain, IP, or at least look like a destination
            // Reject obvious garbage like single words without dots, or greetings
            const lc = clean.toLowerCase();
            if (/^(hola|chau|si|no|ok|test|nada|todo|ayuda|gracias|buenas|porfa|favor|ninguno|varios|muchos)$/i.test(lc)) {
                return {
                    valid: false,
                    label: `Destino inválido: "${clean}"`,
                    desc: `"${clean}" no es un host, dominio, URL o dirección IP válida para testear acceso. Debe ser algo como: google.com, 8.8.8.8, https://example.com, etc.`
                };
            }
            // Check if it looks like a domain, URL, or IP
            const isUrl = /^https?:\/\//i.test(clean);
            const isDomain = /^[a-zA-Z0-9][a-zA-Z0-9\-]*\.[a-zA-Z]{2,}/i.test(clean);
            const isIp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(clean);
            const containsDomain = /[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}/.test(clean);
            const containsIp = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(clean);
            // Also accept descriptive destinations like "camaras IP", "servidor NAS"
            const isDescriptive = /c[aá]mara|servidor|server|nvr|dvr|nas|impresora|printer|iot|smart\s*home|domotica|camara\s*ip/i.test(clean);

            if (!isUrl && !isDomain && !isIp && !containsDomain && !containsIp && !isDescriptive) {
                // If it's a short string without any resemblance to a host
                if (clean.length < 4 || !/[.\/:0-9]/.test(clean)) {
                    return {
                        valid: false,
                        label: `Destino dudoso: "${clean}"`,
                        desc: `"${clean}" no parece ser un destino de red válido (URL, dominio o IP). Ejemplos válidos: google.com, 192.168.1.1, https://sitio.com, cámara IP Hikvision, etc.`
                    };
                }
            }
            return { valid: true };
        }

        case 'ip_v4': {
            // Must be a valid IPv4 address
            const ipMatch = clean.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
            if (!ipMatch) {
                return {
                    valid: false,
                    label: `IP inválida: "${clean}"`,
                    desc: `No se encontró una dirección IPv4 válida en "${clean}". Formato esperado: X.X.X.X (ej: 192.168.0.10).`
                };
            }
            const parts = ipMatch[1].split('.').map(Number);
            if (parts.some(p => p > 255)) {
                return {
                    valid: false,
                    label: `IP fuera de rango: "${ipMatch[1]}"`,
                    desc: `La IP "${ipMatch[1]}" tiene octetos fuera del rango 0-255.`
                };
            }
            return { valid: true };
        }

        case 'port_number': {
            // Must be a port number 1-65535
            const portNum = parseInt(clean.replace(/[^\d]/g, ''), 10);
            if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
                return {
                    valid: false,
                    label: `Puerto inválido: "${clean}"`,
                    desc: `"${clean}" no es un número de puerto válido. Los puertos van de 1 a 65535.`
                };
            }
            return { valid: true };
        }

        case 'error_code': {
            // Should contain an error code, message, or description, not just "no funciona"
            if (/^\s*(no|si|nada|todo|ok|bien|mal)\s*$/i.test(clean)) {
                return {
                    valid: false,
                    label: `Error poco descriptivo: "${clean}"`,
                    desc: `"${clean}" no describe un error específico. Debe incluir el código de error, mensaje en pantalla, o una descripción clara de la falla (ej: "error 404", "pantalla en negro", "no carga login", etc.).`
                };
            }
            return { valid: true };
        }

        case 'soporte_brindado': {
            // Should describe actual support steps, not just "si" or "no"
            if (/^\s*(si|no|ok|nada)\s*$/i.test(clean)) {
                return {
                    valid: false,
                    label: `Soporte poco detallado: "${clean}"`,
                    desc: `"${clean}" no describe el soporte brindado. Debe detallar las acciones realizadas (refresco CRM, batch I3, reseteo manual deco, reseteo de fábrica, reseteo CM/ONT, etc.).`
                };
            }
            return { valid: true };
        }

        case 'velocidad': {
            // Should contain a numeric speed value
            if (!/\d/.test(clean)) {
                return {
                    valid: false,
                    label: `Velocidad sin valor numérico: "${clean}"`,
                    desc: `"${clean}" no contiene un valor de velocidad medible (ej: "150 Mbps", "50 megas por WiFi", etc.).`
                };
            }
            return { valid: true };
        }

        case 'canal_tv': {
            // Should mention specific channels, IDs, or "todos"
            if (/^\s*(si|no|ok|nada|hola)\s*$/i.test(clean)) {
                return {
                    valid: false,
                    label: `Canales no especificados: "${clean}"`,
                    desc: `"${clean}" no identifica canales. Debe especificar cuáles (ej: "canal 5, 10, 30" o "todos los canales con placa ID121").`
                };
            }
            return { valid: true };
        }

        default:
            return { valid: true };
    }
}

export const NETWORK_INCOHERENCE_RULES = [
    {
        id: 'ip_publica_fija',
        label: 'IP Pública Estática / Fija en Conexión Residencial',
        regex: /(?:ip\s*fija|ip\s*est[aá]tica|ip\s*publica\s*fija|ip\s*publica\s*est[aá]tica|fijar\s*ip\s*p[uú]blica|reserva\s*de\s*ip\s*p[uú]blica|pool\s*de\s*ips?\s*p[uú]blicas?|subnet\s*p[uú]blica|ip\s*fija\s*en\s*(?:wan|cpe|modem|router))/i,
        motivo: 'IP Pública Estática / Fija en Conexión Residencial DHCP/CGNAT',
        technicalReason: 'El servicio masivo residencial sobre DOCSIS 3.1 y GPON opera exclusivamente con direccionamiento WAN dinámico por DHCP o pool CGNAT (100.64.0.0/10). El firmware Sagemcom residencial no cuenta con soporte ni aprovisionamiento de IP pública fija. La asignación de direccionamiento estático público requiere un servicio Corporativo / Empresas con ruteo dedicado en Core.',
        rejectionAdvice: 'Corresponde rechazar el RA y devolver a Front. Informar al cliente que su abono es residencial dinámico y que para IP pública estática debe ser derivado a ventas Corporativas / Empresas.'
    },
    {
        id: 'velocidad_imposible_24',
        label: 'Velocidad Imposible por Límite Físico de Espectro WiFi 2.4 GHz',
        regex: /(?:(?:[3-9]\d{2}|1000)\s*(?:mbps?|megas?)\s*(?:en|por|con)\s*(?:wifi\s*)?2\.4|(?:no\s*llega\s*a\s*(?:[2-9]\d{2}|1000)\s*(?:mbps?|megas?)|exige\s*(?:[2-9]\d{2}|1000)\s*(?:mbps?|megas?))\s*(?:en|por|con)\s*(?:wifi\s*)?2\.4|2\.4\s*ghz[^\n\.\+]*?(?:[3-9]\d{2}|1000)\s*(?:mbps?|megas?))/i,
        motivo: 'Velocidad Imposible por Límite Físico de Espectro WiFi 2.4 GHz (802.11n)',
        technicalReason: 'La banda de 2.4 GHz (802.11n) posee una limitación física en 20 MHz que en entornos residenciales urbanos saturados rinde entre 40 y 70 Mbps reales. Es técnicamente imposible alcanzar 300, 500 o 1000 Mbps por WiFi 2.4 GHz. La velocidad contratada se valida únicamente por cable de red Ethernet CAT 5e/6 conectado a puerto Gigabit o por red WiFi 5 GHz / 6 GHz (802.11ac/ax) a corta distancia.',
        rejectionAdvice: 'Corresponde rechazar el RA. Reclamar velocidad superior a 100 Mbps sobre WiFi 2.4 GHz no constituye una falla de red. Asesorar al cliente a conectar a la red 5.8 GHz (SSID_5G) o por cable directo.'
    },
    {
        id: 'vpn_server_cpe',
        label: 'Servidor VPN dentro de CPE Residencial Sagemcom',
        regex: /(?:(?:servidor|server)\s*vpn|montar\s*(?:openvpn|wireguard|ipsec|vpn)\s*en\s*(?:el\s*)?(?:sagemcom|modem|cpe|ont|router)|instalar\s*(?:openvpn|wireguard|vpn)\s*en\s*(?:el\s*)?(?:sagemcom|modem|ont))/i,
        motivo: 'Servidor VPN en Firmware de CPE Residencial Sagemcom',
        technicalReason: 'Los Sagemcom DOCSIS 3.1 y ONT GPON residenciales incorporan únicamente la función de VPN Passthrough (dejar pasar tráfico VPN hacia un equipo en la LAN). Su firmware no cuenta con servidor VPN integrado (ni OpenVPN ni WireGuard) ni permite ejecutar daemons VPN.',
        rejectionAdvice: 'Corresponde rechazar el RA. El módem ya posee VPN Passthrough activo. El cliente debe montar el servidor VPN en su propio host local (PC/Servidor/NAS) o en su router personal en LAN.'
    },
    {
        id: 'routing_corporativo',
        label: 'Protocolos de Enrutamiento Corporativo (BGP/OSPF/MPLS/VLAN)',
        regex: /(?:configurar\s*(?:bgp|ospf|mpls|rip|t[uú]nel\s*gre)|enrutamiento\s*din[aá]mico|ruteo\s*din[aá]mico|vlan\s*tagging\s*802\.1q\s*en\s*puertos?\s*lan|trunk\s*802\.1q\s*en\s*lan|multiples\s*subredes\s*wan)/i,
        motivo: 'Protocolo de Enrutamiento Corporativo / VLAN Trunking Fuera de Alcance de GUI Sagemcom',
        technicalReason: 'Los Sagemcom son Gateway Home NAT residenciales. No soportan protocolos de enrutamiento dinámico (BGP, OSPF, MPLS) ni configuración de puertos LAN en modo Trunk 802.1Q desde su interfaz web.',
        rejectionAdvice: 'Corresponde rechazar el RA. Estas funciones corresponden a enlaces corporativos dedicados.'
    },
    {
        id: 'acceso_root_firmware',
        label: 'Acceso Root / SSH / Flasheo de Firmware Custom',
        regex: /(?:habilitar\s*(?:ssh|telnet)|acceso\s*(?:root|consola|shell|terminal)\s*(?:al|del|en)\s*(?:sagemcom|modem|ont|cpe)|flashear\s*(?:openwrt|dd-wrt|firmware\s*custom)|modificar\s*firmware\s*del\s*(?:cm|ont|sagemcom))/i,
        motivo: 'Petición de Acceso Root / SSH / Flasheo de Firmware Inviolable',
        technicalReason: 'El firmware de los Sagemcom está firmado criptográficamente y los servicios SSH/Telnet están estrictamente aislados en la VLAN de gestión interna del ISP. La GUI no expone consola shell ni permite flasheo de terceros.',
        rejectionAdvice: 'Corresponde rechazar el RA de inmediato por políticas de seguridad de planta externa y resguardo de la red del ISP.'
    },
    {
        id: 'puertos_bloqueados_cgnat',
        label: 'Puertos Críticos Bloqueados o Apertura bajo CGNAT',
        regex: /(?:abrir\s*(?:puerto|puertos)\s*(?:25|53|80|443|135|137|138|139|445|161|1900)\s*(?:en\s*wan|wan|hacia\s*afuera|entrante)|abrir\s*puertos\s*(?:estando|bajo)\s*cgnat)/i,
        motivo: 'Apertura de Puertos Bloqueados por Política de Seguridad ISP o bajo CGNAT',
        technicalReason: 'Puertos de infraestructura (25, 53, 80/443 WAN, 135-139, 445) están filtrados en la capa Core del ISP por seguridad perimetral anti-spam y anti-botnets. Además, bajo CGNAT (100.64.0.0/10) ningún puerto entrante es accesible sin salir previamente de CGNAT.',
        rejectionAdvice: 'Corresponde rechazar el RA. Si requiere apertura para cámaras con IP 100.64.x.x, primero debe tramitarse el reclamo de Salida de CGNAT / IP Pública Dinámica.'
    },
    {
        id: 'forwarding_ip_incompatible',
        label: 'Port Forwarding hacia IP fuera de Subred CPE (192.168.0.xxx)',
        regex: /(?:abrir\s*puertos?|apertura\s*(?:de\s*)?puertos?|port\s*forward(?:ing)?|redirecci[oó]n\s*(?:de\s*)?puertos?|mapeo\s*(?:de\s*)?puertos?)[^\n\.\+]*?(?:a\s*(?:la\s*)?(?:ip\s*)?|ip[:=\s]+|host[:=\s]+)(?!192\.168\.0\.)\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/i,
        motivo: 'Dirección IP de Port Forwarding Incompatible con Gateway CPE Sagemcom / ONT',
        technicalReason: 'Los Cablemódems DOCSIS 3.1 y ONTs GPON residenciales tienen su Gateway configurado en la subred 192.168.0.1/24. La regla de Port Forwarding en la GUI del CPE exige que la IP destino pertenezca obligatoriamente al segmento LAN local (192.168.0.xxx). No es técnicamente posible reenviar tráfico hacia otras subredes privadas (ej: 192.168.1.x, 10.x.x.x) ni hacia IPs públicas.',
        rejectionAdvice: 'Corresponde rechazar o rectificar el RA. Indicar que el dispositivo destino debe tener asignada una IP dentro del rango 192.168.0.xxx (ej: 192.168.0.100) acorde al gateway 192.168.0.1 del equipo.'
    },
    {
        id: 'simetrico_docsis',
        label: 'Velocidad Simétrica de Subida en Red Coaxial DOCSIS 3.1 HFC',
        regex: /(?:(?:[1-9]\d{2}|1000)\s*(?:mbps?|megas?)\s*(?:de\s*)?subida\s*en\s*(?:docsis|cablemodem|cm|coaxil|hfc)|(?:subida\s*sim[eé]trica|servicio\s*sim[eé]trico|igual\s*subida\s*que\s*bajada)\s*en\s*(?:docsis|cablemodem|cm|hfc)|exige\s*(?:[1-9]\d{2}|1000)\s*(?:mbps?|megas?)\s*upstream\s*(?:en\s*)?(?:docsis|cm))/i,
        motivo: 'Petición de Velocidad Simétrica en Red DOCSIS 3.1 HFC Residencial',
        technicalReason: 'La arquitectura HFC de DOCSIS 3.1 residencial es asimétrica por diseño de espectro de retorno, con velocidades de subida topes de entre 20 y 50 Mbps. Es físicamente inviable brindar 300 o 500 Mbps de subida sobre cablemódem residencial.',
        rejectionAdvice: 'Corresponde rechazar el RA. El servicio HFC es asimétrico por diseño de ingeniería.'
    },
    {
        id: 'parametros_rf_omci',
        label: 'Parámetros Físicos de RF DOCSIS / OMCI GPON Fuera de GUI',
        regex: /(?:cambiar\s*(?:frecuencia|canal\s*rf)\s*(?:de\s*)?(?:downstream|upstream)|cambiar\s*potencia\s*[oó]ptica\s*(?:ont|olt)|cambiar\s*longitud\s*de\s*onda\s*gpon|forzar\s*qam\s*(?:4096|1024|256)|modificar\s*(?:t-cont|gem\s*port)\s*gpon|cambiar\s*mtu\s*(?:de\s*la\s*fibra|de\s*la\s*red\s*externa)|cambiar\s*frecuencia\s*del\s*cmts)/i,
        motivo: 'Parámetros Físicos de RF DOCSIS / OMCI GPON Administrados Exclusivamente por CMTS/OLT',
        technicalReason: 'Frecuencias, niveles de potencia (dBmV/dBm), modulaciones QAM/OFDM, T-CONT y perfiles OMCI son aprovisionados y controlados exclusivamente por el CMTS / OLT a través de archivos de configuración de red. Son de sólo lectura o completamente inaccesibles en la GUI del Sagemcom.',
        rejectionAdvice: 'Corresponde rechazar el RA de configuración. Si el cliente experimenta niveles fuera de norma, debe generarse un RA técnico de planta externa, no de configuración en CPE.'
    },
    {
        id: 'bridge_en_deco_mesh',
        label: 'Modo Bridge en Dispositivo Terminal (Deco o Nodo Mesh)',
        regex: /(?:poner\s*en\s*bridge\s*(?:el|al)\s*(?:deco|decodificador|stb|extensor|mesh|nodo)|modo\s*bridge\s*en\s*(?:deco|decodificador|stb|extensor|mesh|nodo)|bridge\s*en\s*deco\s*iptv)/i,
        motivo: 'Petición de Modo Bridge en Dispositivo Terminal (Deco o Extensor Mesh)',
        technicalReason: 'Los decodificadores IPTV y los nodos mesh son clientes terminales de la LAN. Carecen de interfaz WAN puente. La función de Bridge aplica exclusivamente en el Cablemódem Sagemcom o la ONT principal.',
        rejectionAdvice: 'Corresponde rechazar el RA por incoherencia de topología de red. El modo bridge sólo puede configurarse en el equipo principal.'
    },
    {
        id: 'incompatibilidad_medios',
        label: 'Incompatibilidad de Medios Físicos (Fibra en Coaxil o Coaxil en ONT)',
        regex: /(?:conectar\s*fibra\s*en\s*cablemodem|conectar\s*cable\s*coaxil\s*en\s*ont\s*gpon|puerto\s*sfp\s*en\s*sagemcom\s*docsis)/i,
        motivo: 'Incompatibilidad de Medios Físicos de Conexión',
        technicalReason: 'Confusión física de tecnología entre infraestructura coaxial HFC y fibra óptica GPON.',
        rejectionAdvice: 'Corresponde rechazar el RA por incompatibilidad física de medios.'
    }
];

export function checkInternetNetworkSanity(text, tipoRa) {
    if (!text || !text.trim()) return null;
    const isNetworkClaim = /INTERNET|WIFI|BANDA ANCHA|CONFIGURACI[OÓ]N|ACCESO|INSUMOS/i.test(tipoRa || '') ||
        /sagemcom|modem|router|cpe|ont|cm|wifi|puertos?|ip|velocidad|bridge|vpn/i.test(text);

    if (!isNetworkClaim) return null;

    const found = NETWORK_INCOHERENCE_RULES.find(rule => rule.regex.test(text));
    return found || null;
}

export const RA_AI_RULES = {
    // === ESCALAMIENTO N3 ===
    'Inconveniente con insumos': {
        usos: 'Diferencias de MAC entre CM, ONT, DECOS y/o Extensor en el domicilio del cliente y los insumos en CRM (CM, ONT, DECOS y/o Extensor)',
        plantilla: '[Problemática] + [Macs que posee el cliente] + [Mac registradas en CRM] + [Nombre + Teléfono]',
        items: [
            { id: 'problematica', label: 'Problemática detallada', critical: true, regex: /(?:problem[aá]tica|problema|inconveniente|falla|diferencia|motivo)[:=\s]*([^\n\]\+]+)/i },
            { id: 'macs_cliente', label: 'MACs que posee el cliente en domicilio', critical: true, coherenceType: 'mac_multiple', regex: /(?:macs?\s*(?:que\s*posee|cliente|en\s*domicilio|reales?|f[ií]sicas?))[:=\s]*([^\n\]\+]+)|(?:cm|ont|deco)?\s*mac[:=\s]*([0-9A-Fa-f:.-]{12,17})/i },
            { id: 'macs_crm', label: 'MACs registradas en CRM', critical: true, coherenceType: 'mac_multiple', regex: /(?:macs?\s*(?:registradas?\s*en\s*crm|crm|sistema))[:=\s]*([^\n\]\+]+)/i },
            { id: 'contacto', label: 'Nombre + Teléfono de contacto', critical: false, isContactInfo: true, regex: /(?:nombre|contacto|titular)[:=\s]*([^\n\]\+]+)|(?:tel[eé]fono|tel|cel|movil)[:=\s]*([0-9\s\-]{7,})/i }
        ]
    },
    'Reposición de Equipos CM/DD': {
        usos: 'Equipos robados, perdidos o quemados',
        plantilla: '[Problemática] + [Mac de equipos existentes en domicilio o Ninguna Mac] + [Nombre + Teléfono] + [Costo informado USD 100 Deco, USD 100 Modem, USD 100 Wifi Mesh, USD 200 Deco Alexa]',
        items: [
            { id: 'problematica', label: 'Problemática (robo, pérdida, quemado)', critical: true, regex: /(?:problem[aá]tica|motivo|robo|perdid[ao]|quemad[ao]|falla|siniestro)[:=\s]*([^\n\]\+]+)/i },
            { id: 'macs_existentes', label: 'MAC de equipos existentes o Ninguna Mac', critical: true, coherenceType: 'mac_multiple', regex: /(?:macs?\s*(?:existentes?|en\s*domicilio|domicilio|posee)|ninguna\s*mac)[:=\s]*([^\n\]\+]+)|([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})/i },
            { id: 'contacto', label: 'Nombre + Teléfono de contacto', critical: false, isContactInfo: true, regex: /(?:nombre|contacto|titular)[:=\s]*([^\n\]\+]+)|(?:tel[eé]fono|tel|cel|movil)[:=\s]*([0-9\s\-]{7,})/i },
            { id: 'costo_informado', label: 'Costo informado (USD 100 Deco/Modem/Mesh, USD 200 Alexa)', critical: true, regex: /(?:costo|precio|usd|dolares|arancel|informa\s*costo|costo\s*informado)/i }
        ]
    },
    'Escalamiento Teams': {
        usos: 'Cliente se comunica con casuística no contemplada en los procesos actuales y requiere intervención de un supervisor para su solución',
        plantilla: '[Nombre supervisor autorizante] + [Casuística / Motivo]',
        items: [
            { id: 'supervisor', label: 'Nombre supervisor autorizante', critical: true, regex: /(?:supervisor|autoriz[oó]|autorizante|autoriza|escalado\s*por)[:=\s]*([^\n\]\+]+)/i },
            { id: 'casuistica', label: 'Casuística no contemplada / Motivo', critical: true, regex: /(?:casu[ií]stica|motivo|detalle|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i }
        ]
    },

    // === INTERNET & WIFI MESH (Configuración & Acceso) ===
    'NOC - INTERNET - SOLICITUD DE CONFIGURACIÓN': {
        usos: 'Se requiera aplicar una configuración técnica viable en CPE (apertura de puertos con TCP/UDP/IP 192.168.0.xxx, cambio de service package, reaprovisionamiento, sacar morosidad, WiFi, bridge, etc.)',
        plantilla: 'Solicitud técnica viable: [Apertura de Puertos (Protocolo TCP/UDP, Puerto e IP Privada 192.168.0.xxx)] / [Cambiar Service Package] / [Reaprovisionar] / [Sacar Morosidad] / [WiFi] / [Bridge] / [Red PC/NAT]',
        isFlexibleConfig: true
    },
    'NOC - WIFI MESH - SOLICITUD DE CONFIGURACION': {
        usos: 'Se requiera aplicar una configuración técnica viable en CPE / Extensor (apertura de puertos con TCP/UDP/IP 192.168.0.xxx, cambio de service package, reaprovisionamiento, sacar morosidad, WiFi, bridge, etc.)',
        plantilla: 'Solicitud técnica viable: [Apertura de Puertos (Protocolo TCP/UDP, Puerto e IP Privada 192.168.0.xxx)] / [Cambiar Service Package] / [Reaprovisionar] / [Sacar Morosidad] / [WiFi] / [Bridge] / [Red PC/NAT]',
        isFlexibleConfig: true
    },
    'NOC - INTERNET - PROBLEMAS PARTICULARES DE ACCESO': {
        usos: 'Sin acceso a páginas particulares, cámara IP, problemas de navegación a determinados sitios',
        plantilla: '[Detallar a qué destino no puede acceder el cliente. Idealmente indicar si se probó en otros dispositivos o con datos móviles. IMPORTANTE: La información del dispositivo solo es obligatoria si el inconveniente es con CÁMARAS]',
        items: [
            { id: 'destino', label: 'Destino, web o IP al que no puede acceder', critical: true, coherenceType: 'host_url', regex: /(?:destino|sitio|p[aá]gina|web|url|ip|puerto|dominio)[:=\s]*([^\n\]\+]+)|(?:https?:\/\/|\b(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i },
            { id: 'dispositivo_camara', label: 'Información del dispositivo (Solo obligatorio para reclamos de CÁMARAS)', critical: false, regex: /(?:c[aá]mara|cam|dvr|dispositivo|marca|modelo|equipo)[:=\s]*([^\n\]\+]+)/i }
        ]
    },
    'NOC - WIFI MESH - PROBLEMAS PARTICULARES DE ACCESO': {
        usos: 'Sin acceso a páginas particulares, cámara IP, problemas de navegación a determinados sitios',
        plantilla: '[Detallar a qué destino no puede acceder el cliente. Idealmente indicar si se probó en otros dispositivos o con datos móviles. IMPORTANTE: La información del dispositivo solo es obligatoria si el inconveniente es con CÁMARAS]',
        items: [
            { id: 'destino', label: 'Destino, web o IP al que no puede acceder', critical: true, coherenceType: 'host_url', regex: /(?:destino|sitio|p[aá]gina|web|url|ip|puerto|dominio)[:=\s]*([^\n\]\+]+)|(?:https?:\/\/|\b(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i },
            { id: 'dispositivo_camara', label: 'Información del dispositivo (Solo obligatorio para reclamos de CÁMARAS)', critical: false, regex: /(?:c[aá]mara|cam|dvr|dispositivo|marca|modelo|equipo)[:=\s]*([^\n\]\+]+)/i }
        ]
    },

    // === WIFI MESH ===
    'NOC - WIFI MESH - SIN NAVEGACION': {
        usos: 'El cliente ve la red, logra conectarse pero no navega',
        plantilla: '[Uno o todos los dispositivos, si es 1 aclarar (MARCA, MODELO, MAC), en el caso que sea por ETH aclararlo]',
        items: [
            { id: 'alcance_disp', label: 'Aclaración de uno o todos los dispositivos', critical: true, regex: /(?:uno|todos|un\s*solo|todos\s*los\s*dispositivos|1\s*disp)/i },
            { id: 'datos_disp', label: 'Datos del dispositivo (Marca, Modelo, MAC) o conexión ETH', critical: true, regex: /(?:marca|modelo|mac|eth|ethernet|cableado)/i }
        ]
    },
    'NOC - WIFI MESH - LENTITUD EN NAVEGACION': {
        usos: 'El cliente percibe que le funciona lento, tardan en cargar páginas, no llega a la velocidad contratada, etc.',
        plantilla: '[Informar velocidades máximas alcanzadas, información del dispositivo de prueba, velocidad de enlace. ¿En qué sitios o APPs percibe lentitud?]',
        items: [
            { id: 'velocidad_max', label: 'Velocidades máximas alcanzadas (Mbps / Test)', critical: true, coherenceType: 'velocidad', regex: /(?:velocidad|megas|mbps|mb|speedtest|test|alcanzad[ao]|llega\s*a)[:=\s]*([0-9]+)/i },
            { id: 'disp_prueba', label: 'Dispositivo de prueba y velocidad de enlace', critical: true, regex: /(?:dispositivo|celular|pc|notebook|enlace|conexion)[:=\s]*([^\n\]\+]+)/i },
            { id: 'sitios_apps', label: 'Sitios o APPs donde percibe lentitud', critical: true, regex: /(?:sitios?|apps?|aplicaci[oó]n|en\s*qu[eé]|youtube|netflix|navegar)[:=\s]*([^\n\]\+]+)/i }
        ]
    },
    'NOC - WIFI MESH - CORTES INTERMITENTES': {
        usos: 'El cliente percibe cortes en el servicio, puede ser en un momento particular del día',
        plantilla: '[En qué momento del día los percibe, por cuánto tiempo lo percibe. ¿En un solo dispositivo o en todos? ¿En diferentes partes del hogar?]',
        items: [
            { id: 'momento_duracion', label: 'Momento del día y duración de los cortes', critical: true, regex: /(?:momento|horario|mañana|tarde|noche|duraci[oó]n|minutos|tiempo)[:=\s]*([^\n\]\+]+)/i },
            { id: 'dispositivos_afectados', label: '¿En un solo dispositivo o en todos?', critical: true, regex: /(?:uno|todos|un\s*solo|todos\s*los|dispositivos?)/i },
            { id: 'ubicacion_hogar', label: '¿En diferentes partes del hogar / cobertura?', critical: false, regex: /(?:partes?|habitaci[oó]n|living|dormitorio|hogar|casa|distancia|cerca|lejos)/i }
        ]
    },
    'NOC - WIFI MESH - WIFI - DISPOSITIVO NO CONECTA': {
        usos: 'Ve la red con su dispositivo pero no logra conectarse / autenticar',
        plantilla: '[Informar características del dispositivo (MARCA, MODELO, MAC)]',
        items: [
            { id: 'caract_disp', label: 'Características del dispositivo (Marca, Modelo, MAC)', critical: true, regex: /(?:marca|modelo|mac)[:=\s]*([^\n\]\+]+)|([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2})/i }
        ]
    },
    'NOC - WIFI MESH - WIFI - NO SE VISUALIZA RED': {
        usos: 'Ningún dispositivo del hogar ve la red wifi',
        plantilla: '[Informar características del dispositivo (MARCA, MODELO, MAC)]',
        items: [
            { id: 'caract_disp', label: 'Características del dispositivo probado (Marca, Modelo, MAC)', critical: true, regex: /(?:marca|modelo|mac)[:=\s]*([^\n\]\+]+)|([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2})/i }
        ]
    },

    // === TELEVISIÓN ===
    'NOC - TELEVISIÓN - SIN SUSCRIPCION': {
        usos: 'No ve los canales contratados',
        plantilla: '[Mac del equipo con problema] + [Canal/les o todos los canales con placa ID121] + [marca del equipo] + [Nombre y apellido de la persona que se contacta] + [Conciliacion OK, IQ Verde] (Constatar conectado a internet y deco encendido)',
        items: [
            { id: 'mac_equipo', label: 'MAC del equipo con problema', critical: true, coherenceType: 'mac', regex: /(?:mac|stb|deco)[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})/i },
            { id: 'canales_id121', label: 'Canales con placa ID121 o todos los canales', critical: true, coherenceType: 'canal_tv', regex: /(?:canales?|todos|id121|121|placa)[:=\s]*([^\n\]\+]+)/i },
            { id: 'marca_equipo', label: 'Marca del equipo', critical: true, regex: /(?:marca|zte|sagemcom|kaon|skyworth)[:=\s]*([^\n\]\+]+)/i },
            { id: 'contacto', label: 'Nombre y apellido de contacto', critical: false, isContactInfo: true, regex: /(?:nombre|titular|apellido|contacto)[:=\s]*([^\n\]\+]+)/i },
            { id: 'conciliacion', label: 'Conciliación OK, IQ Verde / Conectado y encendido', critical: true, regex: /(?:conciliaci[oó]n|iq\s*verde|conectado|encendido)/i }
        ]
    },
    'NOC - TELEVISIÓN - PIXELACION/FREEZE': {
        usos: 'El cliente percibe en 1 o varios canales pixelación o que la imagen se congela',
        plantilla: '[Mac del equipo con problema] + [Tel. de contacto] + [Horario de contacto] + [Problema] + [Soporte brindado: Refresco CRM (SI/NO), Batch I3 (SI/NO), Reseteo Manual del Deco (SI/NO), Reseteo de Fabrica (SI/NO), Reseteo de CM/ONT (SI/NO)]',
        items: [
            { id: 'mac_equipo', label: 'MAC del equipo con problema', critical: true, coherenceType: 'mac', regex: /(?:mac|stb|deco)[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})/i },
            { id: 'contacto', label: 'Teléfono y horario de contacto', critical: false, isContactInfo: true, regex: /(?:tel|telefono|celular|horario)[:=\s]*([^\n\]\+]+)/i },
            { id: 'problema', label: 'Detalle del problema (canales, pixelación, freeze)', critical: true, regex: /(?:pixelaci[oó]n|freeze|congel|canales?|problema)[:=\s]*([^\n\]\+]+)/i },
            { id: 'soporte_brindado', label: 'Soporte brindado (Refresco CRM, Batch I3, Reseteo Deco, Fabrica, CM/ONT)', critical: true, coherenceType: 'soporte_brindado', regex: /(?:soporte|refresco|batch|reseteo|reinicio)/i }
        ]
    },
    'NOC - TELEVISION - Internal Error/Error 310 o 410 sin Solución Online': {
        usos: 'Cuando el cliente visualiza alguno de los errores 310 o 410',
        plantilla: '[Mac del equipo con problema] + [APP con error]',
        items: [
            { id: 'mac_equipo', label: 'MAC del equipo con problema', critical: true, coherenceType: 'mac', regex: /(?:mac|stb|deco)[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})/i },
            { id: 'app_error', label: 'APP con error (310 / 410 / Internal Error)', critical: true, coherenceType: 'error_code', regex: /(?:app|aplicaci[oó]n|error\s*310|error\s*410|internal\s*error)[:=\s]*([^\n\]\+]+)/i }
        ]
    },
    'NOC - TELEVISIÓN - PANTALLA EN NEGRO': {
        usos: 'Si luego de brindar soporte o ante la reiteración del problema, el cliente continúa sin solución',
        plantilla: '[Mac del equipo con problema] + [Tel. de contacto] + [Soporte brindado: Refresco CRM (SI/NO), Reseteo Manual del Deco (SI/NO)]',
        items: [
            { id: 'mac_equipo', label: 'MAC del equipo con problema', critical: true, coherenceType: 'mac', regex: /(?:mac|stb|deco)[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})/i },
            { id: 'contacto', label: 'Teléfono de contacto', critical: false, isContactInfo: true, regex: /(?:tel|telefono|celular|contacto)[:=\s]*([0-9\s\-]+)/i },
            { id: 'soporte_brindado', label: 'Soporte brindado (Refresco CRM SI/NO, Reseteo Manual Deco SI/NO)', critical: true, coherenceType: 'soporte_brindado', regex: /(?:soporte|refresco|reseteo|reinicio)/i }
        ]
    },
    'NOC - APLICACIONES - DECO - DESAPARECEN APPS': {
        usos: 'Desaparecen aplicaciones en el decodificador',
        plantilla: '[Mac del equipo con problema] + [Apps que desaparecen] + [Soporte brindado]',
        items: [
            { id: 'mac_equipo', label: 'MAC del equipo con problema', critical: true, coherenceType: 'mac', regex: /(?:mac|stb|deco)[:=\s]*([0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}|[0-9A-Fa-f]{12})/i },
            { id: 'apps', label: 'Apps que desaparecen', critical: true, regex: /(?:app|apps|aplicaci[oó]n|desaparecen)[:=\s]*([^\n\]\+]+)/i }
        ]
    },

    // === TELEFONÍA ===
    'NOC - TELEFONIA - LLAMADAS SIN LLAMADAS ENTRANTES': {
        usos: 'Sondeos obligatorios para llamadas entrantes fallidas',
        plantilla: '[La linea existe en CRM, se reseteo CM, el que esta realizando la llamada esta marcando correctamente el numero de CRM, NO MOLESTAR deshabiltado, sin DESVIOS, volumen de timbrado funciona bien, probo otro terminal y RJ11, las pruebas se realizaron con terminal directo al CM] + [Día y horario aproximado]',
        items: [
            { id: 'linea_crm', label: 'Línea existe en CRM e I3', critical: true, regex: /(?:linea\s*existe|crm|i3)/i },
            { id: 'reseteo_cm', label: 'Se reinició / reseteó el CM', critical: true, regex: /(?:reseteo\s*cm|reinici[oó]\s*cm|reseteo|reinicio)/i },
            { id: 'marcacion_ok', label: 'Marcación correcta sin el 11', critical: true, regex: /(?:marcando|marcaci[oó]n|numero|sin\s*el\s*11)/i },
            { id: 'no_molestar_desvios', label: 'NO MOLESTAR deshabilitado y sin DESVÍOS', critical: true, regex: /(?:no\s*molestar|desv[ií]os)/i },
            { id: 'terminal_rj11_directo', label: 'Probó otro terminal/RJ11 y pruebas directo al CM', critical: true, regex: /(?:terminal|rj11|directo\s*al\s*cm|timbrado)/i }
        ]
    },
    'NOC - TELEFONIA - LLAMADAS SIN LLAMADAS SALIENTES': {
        usos: 'Sondeos obligatorios para llamadas salientes fallidas',
        plantilla: '[La linea existe en CRM, se reseteo CM, no tiene level que impida el llamado saliente, el terminal esta en modo TONO, Pausa interdigito ok, probo otro terminal y RJ11, las pruebas se realizaron con terminal directo al CM] [A celulares antepuso el 15][Para larga distancia detallar Código de país, ciudad y teléfono, si es fijo/cel/IVR]',
        items: [
            { id: 'linea_crm', label: 'Línea existe en CRM e I3 y se reseteó CM', critical: true, regex: /(?:linea\s*existe|crm|reseteo|reinici[oó])/i },
            { id: 'sin_level', label: 'Sin level de bloqueo activo', critical: true, regex: /(?:level|bloqueo|sin\s*level)/i },
            { id: 'modo_tono', label: 'Terminal en modo TONO (no pulso)', critical: true, regex: /(?:tono|modo\s*tono|pulso)/i },
            { id: 'pruebas_terminal', label: 'Pausa interdígito OK, probó otro terminal/RJ11 directo al CM', critical: true, regex: /(?:interd[ií]gito|rj11|directo\s*al\s*cm|terminal)/i },
            { id: 'antepuso_15_ld', label: 'A celulares antepuso 15 / LD código país/ciudad detallado', critical: false, regex: /(?:15|celulares?|larga\s*distancia|c[oó]digo)/i }
        ]
    },
    'NOC - TELEFONIA - LLAMADAS SIN TONO': {
        usos: 'Sondeos obligatorios cuando el cliente levanta y no hay tono',
        plantilla: '[No se escucha tono al levantar teléfono, existe la linea en CRM, se reinicio el CM, niveles óptimos en CRM/I3, terminal conectado correctamente en puerto especificado en I3/CRM, se probo con otro terminal y otro RJ11, se reseteo base del inalámbrico y se verificaron pilas en teléfono inalámbrico, Pruebas realizadas con terminal directo al CM.]',
        items: [
            { id: 'sin_tono', label: 'Constatado sin tono al levantar', critical: true, regex: /(?:sin\s*tono|no\s*(?:se\s*escucha\s*)?tono)/i },
            { id: 'linea_reseteo', label: 'Línea existe en CRM y CM reiniciado', critical: true, regex: /(?:linea|crm|reinici[oó]|reseteo)/i },
            { id: 'niveles_puerto', label: 'Niveles óptimos y conectado en puerto correcto de I3/CRM', critical: true, regex: /(?:niveles|puerto|i3|crm)/i },
            { id: 'pruebas_base_rj11', label: 'Probó otro terminal, RJ11, base/pilas de inalámbrico y directo a CM', critical: true, regex: /(?:terminal|rj11|inal[aá]mbrico|pilas|directo\s*al\s*cm)/i }
        ]
    },
    'NOC - TELEFONIA - VARIOS': {
        usos: 'Otras casuísticas de telefonía',
        plantilla: '[Sin plantilla obligatoria, detallar problema de telefonía y soporte]',
        items: [
            { id: 'detalle', label: 'Detalle del inconveniente y pruebas realizadas', critical: true, regex: /.{10,}/ }
        ]
    },

    // === WEB / APP MOBILE (NOC APLICACIONES) ===
    'Web/App - Disney': {
        usos: 'Problemas de acceso o activación en Disney+',
        plantilla: '[Tipo de error] + [Usuario sucursal virtual] + [Contraseña] + [Equipo donde falla] + [¿Funcionó en otro momento?]',
        items: [
            { id: 'tipo_error', label: 'Tipo de error', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i },
            { id: 'usuario_sv', label: 'Usuario sucursal virtual', critical: true, regex: /(?:usuario\s*(?:sucursal\s*virtual|sv|app)?|email|correo)[:=\s]*([^\n\]\+\s]+@[^\n\]\+\s]+|[^\n\]\+]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i },
            { id: 'password', label: 'Contraseña (ESTRICTAMENTE NECESARIA)', critical: true, isPassword: true, regex: /(?:contrase[ñn]a|clave|pass|password)[:=\s]*([^\n\]\+]+)/i },
            { id: 'equipo_falla', label: 'Equipo donde falla', critical: true, regex: /(?:equipo\s*donde\s*falla|equipo|dispositivo|falla\s*en)[:=\s]*([^\n\]\+]+)/i },
            { id: 'funciono_antes', label: '¿Funcionó en otro momento?', critical: true, regex: /(?:(?:[¿?]?\s*funcion[oó]\s*(?:en\s*otro\s*momento)?|\banduvo\b))[?:\s=]+([^\n\]\+]+)/i }
        ]
    },
    'Web/App - Max': {
        usos: 'Problemas de acceso o activación en Max',
        plantilla: '[Tipo de error] + [Usuario sucursal virtual] + [Contraseña] + [Equipo donde falla] + [¿Funcionó en otro momento?]',
        items: [
            { id: 'tipo_error', label: 'Tipo de error', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i },
            { id: 'usuario_sv', label: 'Usuario sucursal virtual', critical: true, regex: /(?:usuario\s*(?:sucursal\s*virtual|sv|app)?|email|correo)[:=\s]*([^\n\]\+\s]+@[^\n\]\+\s]+|[^\n\]\+]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i },
            { id: 'password', label: 'Contraseña (ESTRICTAMENTE NECESARIA)', critical: true, isPassword: true, regex: /(?:contrase[ñn]a|clave|pass|password)[:=\s]*([^\n\]\+]+)/i },
            { id: 'equipo_falla', label: 'Equipo donde falla', critical: true, regex: /(?:equipo\s*donde\s*falla|equipo|dispositivo|falla\s*en)[:=\s]*([^\n\]\+]+)/i },
            { id: 'funciono_antes', label: '¿Funcionó en otro momento?', critical: true, regex: /(?:(?:[¿?]?\s*funcion[oó]\s*(?:en\s*otro\s*momento)?|\banduvo\b))[?:\s=]+([^\n\]\+]+)/i }
        ]
    },
    'Web/App - Amazon': {
        usos: 'Problemas de acceso o activación en Amazon Prime Video',
        plantilla: '[Tipo de error] + [Usuario sucursal virtual] + [Contraseña] + [Equipo donde falla] + [¿Funcionó en otro momento?]',
        items: [
            { id: 'tipo_error', label: 'Tipo de error', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i },
            { id: 'usuario_sv', label: 'Usuario sucursal virtual', critical: true, regex: /(?:usuario\s*(?:sucursal\s*virtual|sv|app)?|email|correo)[:=\s]*([^\n\]\+\s]+@[^\n\]\+\s]+|[^\n\]\+]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i },
            { id: 'password', label: 'Contraseña (ESTRICTAMENTE NECESARIA)', critical: true, isPassword: true, regex: /(?:contrase[ñn]a|clave|pass|password)[:=\s]*([^\n\]\+]+)/i },
            { id: 'equipo_falla', label: 'Equipo donde falla', critical: true, regex: /(?:equipo\s*donde\s*falla|equipo|dispositivo|falla\s*en)[:=\s]*([^\n\]\+]+)/i },
            { id: 'funciono_antes', label: '¿Funcionó en otro momento?', critical: true, regex: /(?:(?:[¿?]?\s*funcion[oó]\s*(?:en\s*otro\s*momento)?|\banduvo\b))[?:\s=]+([^\n\]\+]+)/i }
        ]
    },
    'Web/App - Netflix': {
        usos: 'Problemas de acceso o activación en Netflix',
        plantilla: '[Tipo de error] + [Usuario sucursal virtual] + [Contraseña] + [Equipo donde falla] + [¿Funcionó en otro momento?]',
        items: [
            { id: 'tipo_error', label: 'Tipo de error', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i },
            { id: 'usuario_sv', label: 'Usuario sucursal virtual', critical: true, regex: /(?:usuario\s*(?:sucursal\s*virtual|sv|app)?|email|correo)[:=\s]*([^\n\]\+\s]+@[^\n\]\+\s]+|[^\n\]\+]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i },
            { id: 'password', label: 'Contraseña (ESTRICTAMENTE NECESARIA)', critical: true, isPassword: true, regex: /(?:contrase[ñn]a|clave|pass|password)[:=\s]*([^\n\]\+]+)/i },
            { id: 'equipo_falla', label: 'Equipo donde falla', critical: true, regex: /(?:equipo\s*donde\s*falla|equipo|dispositivo|falla\s*en)[:=\s]*([^\n\]\+]+)/i },
            { id: 'funciono_antes', label: '¿Funcionó en otro momento?', critical: true, regex: /(?:(?:[¿?]?\s*funcion[oó]\s*(?:en\s*otro\s*momento)?|\banduvo\b))[?:\s=]+([^\n\]\+]+)/i }
        ]
    },
    'Web/App - Sucursal Virtual': {
        usos: 'Problemas de acceso a Sucursal Virtual',
        plantilla: '[Tipo de error] + [Usuario sucursal virtual] + [Contraseña] + [Equipo donde falla] + [¿Funcionó en otro momento?]',
        items: [
            { id: 'tipo_error', label: 'Tipo de error', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i },
            { id: 'usuario_sv', label: 'Usuario sucursal virtual', critical: true, regex: /(?:usuario\s*(?:sucursal\s*virtual|sv|app)?|email|correo)[:=\s]*([^\n\]\+\s]+@[^\n\]\+\s]+|[^\n\]\+]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i },
            { id: 'password', label: 'Contraseña (ESTRICTAMENTE NECESARIA)', critical: true, isPassword: true, regex: /(?:contrase[ñn]a|clave|pass|password)[:=\s]*([^\n\]\+]+)/i },
            { id: 'equipo_falla', label: 'Equipo donde falla', critical: true, regex: /(?:equipo\s*donde\s*falla|equipo|dispositivo|falla\s*en)[:=\s]*([^\n\]\+]+)/i },
            { id: 'funciono_antes', label: '¿Funcionó en otro momento?', critical: true, regex: /(?:(?:[¿?]?\s*funcion[oó]\s*(?:en\s*otro\s*momento)?|\banduvo\b))[?:\s=]+([^\n\]\+]+)/i }
        ]
    },
    'Web/App - Tplay': {
        usos: 'Problemas con la aplicación Tplay',
        plantilla: '[Tipo de error] + [Usuario sucursal virtual] + [Contraseña] + [Equipo donde falla] + [¿Funcionó en otro momento?]',
        items: [
            { id: 'tipo_error', label: 'Tipo de error', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i },
            { id: 'usuario_sv', label: 'Usuario sucursal virtual', critical: true, regex: /(?:usuario\s*(?:sucursal\s*virtual|sv|app)?|email|correo)[:=\s]*([^\n\]\+\s]+@[^\n\]\+\s]+|[^\n\]\+]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i },
            { id: 'password', label: 'Contraseña (ESTRICTAMENTE NECESARIA)', critical: true, isPassword: true, regex: /(?:contrase[ñn]a|clave|pass|password)[:=\s]*([^\n\]\+]+)/i },
            { id: 'equipo_falla', label: 'Equipo donde falla', critical: true, regex: /(?:equipo\s*donde\s*falla|equipo|dispositivo|falla\s*en)[:=\s]*([^\n\]\+]+)/i },
            { id: 'funciono_antes', label: '¿Funcionó en otro momento?', critical: true, regex: /(?:(?:[¿?]?\s*funcion[oó]\s*(?:en\s*otro\s*momento)?|\banduvo\b))[?:\s=]+([^\n\]\+]+)/i }
        ]
    },
    'App Mobile - Tphone': {
        usos: 'Problemas con la aplicación Tphone',
        plantilla: '[Tipo de error] + [Usuario sucursal virtual] + [Contraseña] + [Equipo donde falla] + [¿Funcionó en otro momento?]',
        items: [
            { id: 'tipo_error', label: 'Tipo de error', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema|inconveniente)[:=\s]*([^\n\]\+]+)/i },
            { id: 'usuario_sv', label: 'Usuario sucursal virtual', critical: true, regex: /(?:usuario\s*(?:sucursal\s*virtual|sv|app)?|email|correo)[:=\s]*([^\n\]\+\s]+@[^\n\]\+\s]+|[^\n\]\+]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i },
            { id: 'password', label: 'Contraseña (ESTRICTAMENTE NECESARIA)', critical: true, isPassword: true, regex: /(?:contrase[ñn]a|clave|pass|password)[:=\s]*([^\n\]\+]+)/i },
            { id: 'equipo_falla', label: 'Equipo donde falla', critical: true, regex: /(?:equipo\s*donde\s*falla|equipo|dispositivo|falla\s*en)[:=\s]*([^\n\]\+]+)/i },
            { id: 'funciono_antes', label: '¿Funcionó en otro momento?', critical: true, regex: /(?:(?:[¿?]?\s*funcion[oó]\s*(?:en\s*otro\s*momento)?|\banduvo\b))[?:\s=]+([^\n\]\+]+)/i }
        ]
    },
    'Web/App - Tplay en Tizen Samsung TV': {
        usos: 'Cliente reclama que tiene problemas con la app Tplay con su Televisor Samsung Crystal con sistema Tizen',
        plantilla: '[Tipo de error]',
        items: [
            { id: 'tipo_error', label: 'Tipo de error detallado en TV Samsung Tizen', critical: true, coherenceType: 'error_code', regex: /(?:tipo\s*de\s*error|error|falla|problema)[:=\s]*([^\n\]\+]+)|.{5,}/i }
        ]
    }
};

export function analyzeSolicitudConfiguracion(text, tipoRa, incoherence, rule) {
    if (incoherence) {
        return {
            hasRule: true,
            tipoRa,
            usos: rule.usos,
            plantillaOficial: rule.plantilla,
            score: 15,
            verdict: 'Apto para Rechazo',
            verdictClass: 'danger',
            verdictDesc: `⛔ INCOHERENCIA DE RED DETECTADA: ${incoherence.motivo}. Petición técnicamente inviable o fuera del alcance de la GUI de un CPE Sagemcom DOCSIS 3.1 / ONT GPON. ${incoherence.rejectionAdvice}`,
            detectedItems: [{ label: 'Texto libre ingresado', val: text.trim().substring(0, 80) + '...', critical: false }],
            missingItems: [{
                label: 'Incoherencia Técnica de Red',
                critical: true,
                isIncoherence: true,
                desc: `${incoherence.motivo}. ${incoherence.technicalReason}`
            }],
            noiseItems: [],
            structuredSummary: text.trim(),
            incoherenceData: incoherence
        };
    }

    const isPortForwarding = /(?:abrir\s*puertos?|apertura\s*(?:de\s*)?puertos?|port\s*forward(?:ing)?|redirecci[oó]n\s*(?:de\s*)?puertos?|mapeo\s*(?:de\s*)?puertos?|forwarding|abrir\s*(?:el|los|un)?\s*puertos?|\bpuertos?\b|\bports?\b|\bdmz\b)/i.test(text);

    if (isPortForwarding) {
        const protoMatch = text.match(/\b(tcp\s*[\/\-y]\s*udp|ambos|tcp|udp)\b/i);
        const portMatch = text.match(/(?:puertos?|port|ports|dst\s*port)[:=\s#]*([0-9]{1,5}(?:\s*(?:-|–|y|,|\/)\s*[0-9]{1,5})*)/i) ||
            text.match(/\b([1-9][0-9]{0,4})\b(?!\s*(?:megas|mbps|mb|gb|d[ií]as|meses|pesos|usd|cliente|id|ra))/i);

        // Extraer y clasificar direcciones IPv4 en el reclamo
        const allIpMatches = [...text.matchAll(/\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/g)].map(m => m[1]);

        // Filtrar IPs de la subred del gateway CPE: 192.168.0.xxx (rango 192.168.0.0/24)
        const cpeSubnetIps = allIpMatches.filter(ip => {
            const parts = ip.split('.').map(Number);
            return parts[0] === 192 && parts[1] === 168 && parts[2] === 0 && parts[3] >= 0 && parts[3] <= 255;
        });

        // Priorizar IP de host (distinta de .1 que es el gateway y de .0/.255)
        const hostIp = cpeSubnetIps.find(ip => {
            const last = Number(ip.split('.')[3]);
            return last >= 2 && last <= 254;
        }) || (cpeSubnetIps.length > 0 ? cpeSubnetIps[0] : null);

        // Detectar si ingresó otra subred privada de 192.168 (ej: 192.168.1.x)
        const otherSubnet192 = allIpMatches.find(ip => {
            const parts = ip.split('.').map(Number);
            return parts[0] === 192 && parts[1] === 168 && parts[2] !== 0 && parts[3] <= 255;
        });

        // O cualquier otra IP no perteneciente a 192.168.0.xxx
        const genericIp = allIpMatches.find(ip => !cpeSubnetIps.includes(ip));

        const proto = protoMatch ? protoMatch[0].toUpperCase() : null;
        const port = portMatch ? (portMatch[1] || portMatch[0]) : null;

        const detectedItems = [];
        const missingItems = [];

        if (proto) {
            detectedItems.push({ label: 'Protocolo de Red', val: proto, critical: true });
        } else {
            missingItems.push({ label: 'Protocolo de Red (TCP o UDP obligatorio)', critical: true, isPassword: false });
        }

        if (port) {
            detectedItems.push({ label: 'Puerto(s) a redireccionar', val: port, critical: true });
        } else {
            missingItems.push({ label: 'Número de Puerto o Rango a abrir', critical: true, isPassword: false });
        }

        let isIpValid = false;
        if (hostIp) {
            const lastOctet = Number(hostIp.split('.')[3]);
            if (lastOctet === 1) {
                detectedItems.push({
                    label: 'Dirección IP Subred CPE (192.168.0.1)',
                    val: `${hostIp} (⚠ Gateway del módem/ONT; verificar si el host destino tiene otra IP en LAN)`,
                    critical: true
                });
                isIpValid = true;
            } else if (lastOctet === 0 || lastOctet === 255) {
                missingItems.push({
                    label: 'IP inválida para host en subred 192.168.0.0/24',
                    critical: true,
                    isPassword: false,
                    isIncoherence: true,
                    isContentIncoherence: true,
                    desc: `La dirección ${hostIp} corresponde a la red/broadcast de la subred. Para port forwarding la IP debe estar entre 192.168.0.2 y 192.168.0.254.`
                });
            } else {
                detectedItems.push({ label: 'Dirección IP Privada CPE (192.168.0.xxx)', val: hostIp, critical: true });
                isIpValid = true;
            }
        } else if (otherSubnet192) {
            missingItems.push({
                label: 'IP fuera de la subred del gateway CPE (192.168.0.1)',
                critical: true,
                isPassword: false,
                isIncoherence: true,
                isContentIncoherence: true,
                desc: `La dirección ${otherSubnet192} no pertenece a la subred del gateway por defecto de los CMs y ONTs (192.168.0.1/24). La IP de destino para port forwarding debe ser de tipo 192.168.0.xxx (ej: 192.168.0.100).`
            });
        } else if (genericIp) {
            missingItems.push({
                label: 'IP fuera del rango de gateway CPE (192.168.0.xxx)',
                critical: true,
                isPassword: false,
                isIncoherence: true,
                isContentIncoherence: true,
                desc: `La dirección ${genericIp} no pertenece a la subred 192.168.0.0/24 del gateway de los CMs y ONTs. El router/ONT solo permite port forwarding hacia IPs de su LAN local (192.168.0.xxx).`
            });
        } else {
            missingItems.push({ label: 'Dirección IPv4 Privada del rango CPE (192.168.0.xxx)', critical: true, isPassword: false });
        }

        const destMatch = text.match(/(?:dvr|c[aá]mara|camaras|servidor|server|playstation|ps[45]|xbox|nvr|torrent|nas|pc|ipcam)/i);
        if (destMatch) {
            detectedItems.push({ label: 'Dispositivo / Servicio Destino', val: destMatch[0].toUpperCase(), critical: false });
        }

        const isComplete = proto && port && isIpValid;
        const missingCount = (!proto ? 1 : 0) + (!port ? 1 : 0) + (!isIpValid ? 1 : 0);
        const score = isComplete ? 100 : (missingCount === 1 ? 50 : 25);
        const verdict = isComplete ? 'Gestionable' : (score >= 50 ? 'Parcialmente Gestionable' : 'Rechazable');
        const verdictClass = isComplete ? 'success' : (score >= 50 ? 'warning' : 'danger');
        const verdictDesc = isComplete
            ? 'Solicitud de Apertura de Puertos completa y técnicamente viable: Especifica protocolo (TCP/UDP), puerto(s) e IP privada de la subred del gateway CPE (192.168.0.xxx) para aplicar Port Forwarding.'
            : 'Faltan parámetros obligatorios para apertura de puertos: Se requiere especificar protocolo (TCP o UDP), número de puerto y la dirección IP privada de la subred del gateway CPE (192.168.0.xxx) de destino para configurar el forwarding.';

        const structuredSummary = `[SOLICITUD: APERTURA DE PUERTOS] + [PROTOCOLO: ${proto || 'FALTA (TCP/UDP)'}] + [PUERTO: ${port || 'FALTA'}] + [IP PRIVADA: ${isIpValid ? hostIp : 'FALTA (192.168.0.xxx)'}]${destMatch ? ` + [DESTINO: ${destMatch[0].toUpperCase()}]` : ''}`;

        return {
            hasRule: true,
            tipoRa,
            usos: rule.usos,
            plantillaOficial: rule.plantilla,
            score,
            verdict,
            verdictClass,
            verdictDesc,
            detectedItems,
            missingItems,
            noiseItems: [],
            structuredSummary,
            incoherenceData: null
        };
    }

    const viableConfigs = [
        {
            id: 'REAPROVISIONAR',
            name: 'Reaprovisionamiento de Equipo',
            regex: /(?:reaprovisionar|reaprovisionamiento|provisionar|aprovisionamiento|enviar\s*bootfile|actualizar\s*perfil\s*(?:cmts|olt)|reiniciar\s*desde\s*sistema|re-aprovisionar)/i,
            desc: 'Solicitud viable: Reaprovisionamiento de CPE o actualización de bootfile en CMTS u OLT.'
        },
        {
            id: 'SERVICE_PACKAGE',
            name: 'Cambio de Service Package / Velocidad',
            regex: /(?:service\s*package|perfil\s*(?:de\s*)?(?:velocidad|navegaci[oó]n|paquete|servicio)|cambi(?:o|ar)\s*(?:de\s*)?(?:plan|velocidad|pack|service)|subir\s*megas|bajar\s*megas|plan\s*de\s*\d+\s*(?:megas|mbps|mb)|modificar\s*(?:el\s*)?(?:ancho\s*de\s*banda|velocidad))/i,
            desc: 'Solicitud viable: Modificación de Service Package o perfil de velocidad asignado al cliente.'
        },
        {
            id: 'MOROSIDAD',
            name: 'Retirar Mensaje de Morosidad / Suspensión',
            regex: /(?:(?:sacar|quitar|levantar|eliminar|desbloquear)\s*(?:el\s*)?(?:mensaje|aviso|pantalla|cartel)?\s*(?:de\s*)?morosidad|morosidad|aviso\s*de\s*pago|portal\s*cautivo|mensaje\s*de\s*deuda|bloqueo\s*por\s*morosidad)/i,
            desc: 'Solicitud viable: Retiro del portal de morosidad o aviso de deuda tras confirmación de pago.'
        },
        {
            id: 'WIFI',
            name: 'Configuración de Red WiFi',
            regex: /(?:(?:cambi(?:o|ar)|configurar|modificar)\s*(?:de\s*)?(?:clave|contrase[nñ]a|ssid|nombre\s*de\s*red|wifi)|clave\s*wifi|contrase[nñ]a\s*wifi|ssid|red\s*2\.4(?:\s*ghz)?|red\s*5(?:\s*ghz)?|frecuencia|wpa2)/i,
            desc: 'Solicitud viable: Configuración de parámetros de red inalámbrica WiFi en el CPE.'
        },
        {
            id: 'BANDSTEERING',
            name: 'Configuración de Bandsteering',
            regex: /(?:bandsteering|band\s*steering|unificar\s*redes|separar\s*(?:las\s*)?redes)/i,
            desc: 'Solicitud viable: Configuración de Bandsteering para unificar o separar frecuencias 2.4 y 5 GHz.'
        },
        {
            id: 'BRIDGE',
            name: 'Configuración Modo Bridge / Router',
            regex: /(?:modo\s*bridge|pasar\s*a\s*bridge|poner\s*en\s*bridge|router\s*\/\s*bridge|modo\s*puente|desactivar\s*router)/i,
            desc: 'Solicitud viable: Cambio de modo de operación del CPE a Bridge o Router.'
        },
        {
            id: 'PC_NAT',
            name: 'Modo Red PC/NAT, DMZ o UPnP',
            regex: /(?:modo\s*red\s*pc\/?nat|dmz|upnp)/i,
            desc: 'Solicitud viable: Configuración de Modo Red PC/NAT, DMZ o UPnP.'
        }
    ];

    for (const cfg of viableConfigs) {
        if (cfg.regex.test(text)) {
            const matchSnippet = text.match(cfg.regex)[0];
            return {
                hasRule: true,
                tipoRa,
                usos: rule.usos,
                plantillaOficial: rule.plantilla,
                score: 100,
                verdict: 'Gestionable',
                verdictClass: 'success',
                verdictDesc: cfg.desc,
                detectedItems: [
                    { label: 'Configuración Solicitada', val: cfg.name, critical: true },
                    { label: 'Parámetro detectado', val: matchSnippet, critical: false }
                ],
                missingItems: [],
                noiseItems: [],
                structuredSummary: `[SOLICITUD: ${cfg.name.toUpperCase()}] + [DETALLE: ${text.trim().substring(0, 80)}]`,
                incoherenceData: null
            };
        }
    }

    return {
        hasRule: true,
        tipoRa,
        usos: rule.usos,
        plantillaOficial: rule.plantilla,
        score: 35,
        verdict: 'Rechazable',
        verdictClass: 'danger',
        verdictDesc: 'Falta especificar qué configuración técnica viable se requiere (ej: apertura de puertos con protocolo/puerto/IP 192.168.0.xxx, cambio de service package, reaprovisionar, sacar morosidad, WiFi, bridge, etc.).',
        detectedItems: text.trim().length > 8 ? [{ label: 'Texto ingresado', val: text.trim().substring(0, 70) + '...', critical: false }] : [],
        missingItems: [{
            label: 'Configuración técnica viable y detallada',
            critical: true,
            isPassword: false,
            desc: 'Debe especificar el cambio técnico (puertos con TCP/UDP/IP 192.168.0.xxx, service package, reaprovisionar, morosidad, WiFi, bridge, etc.)'
        }],
        noiseItems: [],
        structuredSummary: text.trim() ? `[SOLICITUD: CONFIGURACIÓN] + [DETALLE: ${text.trim().substring(0, 80)}]` : '',
        incoherenceData: null
    };
}

export function analyzeClaimWithAI(text, tipoRa) {
    if (!text || !text.trim()) {
        return {
            hasRule: !!RA_AI_RULES[tipoRa],
            score: 0,
            verdict: 'Sin Datos',
            verdictClass: 'neutral',
            verdictDesc: 'Pegá los datos del reclamo o redactá el caso para analizar su gestionabilidad.',
            detectedItems: [],
            missingItems: [],
            structuredSummary: '',
            noiseItems: [],
            incoherenceData: null
        };
    }

    // Check network coherence for Sagemcom DOCSIS 3.1 & ONT GPON
    const incoherence = checkInternetNetworkSanity(text, tipoRa);

    const rule = RA_AI_RULES[tipoRa];
    if (rule && rule.isFlexibleConfig) {
        return analyzeSolicitudConfiguracion(text, tipoRa, incoherence, rule);
    }
    if (!rule) {
        return {
            hasRule: false,
            score: incoherence ? 15 : (text.trim().length > 20 ? 85 : 45),
            verdict: incoherence ? 'Apto para Rechazo' : (text.trim().length > 20 ? 'Gestionable' : 'Poco Detalle'),
            verdictClass: incoherence ? 'danger' : (text.trim().length > 20 ? 'success' : 'warning'),
            verdictDesc: incoherence
                ? `⛔ INCOHERENCIA DE RED DETECTADA: ${incoherence.motivo}. Petición técnicamente inviable o fuera del alcance de la GUI de un CPE Sagemcom DOCSIS 3.1 / ONT GPON. ${incoherence.rejectionAdvice}`
                : 'Esta gestión no posee plantilla estricta obligatoria. Verificá que el motivo y soporte brindado sean claros.',
            detectedItems: [{ label: 'Texto libre ingresado', val: text.trim().substring(0, 100) + (text.trim().length > 100 ? '...' : ''), critical: false }],
            missingItems: incoherence ? [{
                label: 'Incoherencia Técnica de Red',
                critical: true,
                isIncoherence: true,
                desc: `${incoherence.motivo}. ${incoherence.technicalReason}`
            }] : [],
            structuredSummary: text.trim(),
            noiseItems: [],
            incoherenceData: incoherence
        };
    }

    let foundCount = 0;
    let criticalMissing = 0;
    let passwordMissing = false;
    let passwordEvaded = false;
    let evasionText = '';
    let keywordsMissing = false;
    let contentIncoherenceCount = 0;
    const detectedItems = [];
    const missingItems = [];
    const extractedData = {};

    for (const item of rule.items) {
        let matchVal = null;

        if (item.checkKeywords) {
            const upper = text.toUpperCase();
            const foundKw = rule.keywords.find(kw => upper.includes(kw.toUpperCase()));
            if (foundKw) matchVal = foundKw;
            else keywordsMissing = true;
        } else if (item.regex) {
            const m = text.match(item.regex);
            if (m) {
                matchVal = m[1] || m[2] || m[0];
            }
        }

        if (matchVal && matchVal.trim()) {
            const trimmedVal = matchVal.trim().replace(/^[?:=\s]+/, '');
            // Check password evasion (e.g. "no la brinda", "no la dice", "vacio", "no sabe")
            if (item.isPassword && isPasswordEvaded(trimmedVal)) {
                passwordMissing = true;
                passwordEvaded = true;
                evasionText = trimmedVal;
                if (item.critical) criticalMissing++;
                missingItems.push({
                    label: item.label,
                    critical: true,
                    isPassword: true,
                    isEvaded: true,
                    evasionText: trimmedVal
                });
            } else {
                // Run coherence validation if a coherenceType is defined
                let coherenceResult = null;
                if (item.coherenceType) {
                    coherenceResult = validateContentCoherence(item.id, trimmedVal, item.coherenceType);
                }

                if (coherenceResult && !coherenceResult.valid) {
                    // Value was found but is semantically invalid
                    foundCount++; // Still counts as "found" (not missing)
                    extractedData[item.id] = trimmedVal;
                    detectedItems.push({
                        label: item.label,
                        val: trimmedVal,
                        critical: item.critical,
                        hasCoherenceIssue: true
                    });
                    missingItems.push({
                        label: coherenceResult.label,
                        critical: false,
                        isIncoherence: true,
                        isContentIncoherence: true,
                        desc: coherenceResult.desc
                    });
                    contentIncoherenceCount++;
                } else {
                    foundCount++;
                    extractedData[item.id] = trimmedVal;
                    detectedItems.push({
                        label: item.label,
                        val: extractedData[item.id],
                        critical: item.critical
                    });
                }
            }
        } else {
            // Handle missing items - isContactInfo fields are non-grave
            if (item.isContactInfo) {
                // Contact info missing is not critical, just informational
                missingItems.push({
                    label: item.label,
                    critical: false,
                    isContactInfo: true,
                    isPassword: false,
                    isEvaded: false
                });
            } else {
                if (item.critical) criticalMissing++;
                if (item.isPassword) passwordMissing = true;
                missingItems.push({
                    label: item.label,
                    critical: item.critical,
                    isPassword: item.isPassword,
                    isEvaded: false
                });
            }
        }
    }

    const totalItems = rule.items.length;
    let score = Math.round((foundCount / totalItems) * 100);

    // Apply strict protocol penalties
    if (passwordMissing) {
        score = Math.min(score, 35);
    }
    if (keywordsMissing) {
        score = Math.min(score, 40);
    }
    if (criticalMissing > 0) {
        score = Math.min(score, Math.max(15, 100 - (criticalMissing * 25)));
    }

    // Apply Network Incoherence Penalty (Sagemcom DOCSIS 3.1 / ONT GPON)
    if (incoherence) {
        score = Math.min(score, 15);
    }

    // Apply Content Coherence Penalty (invalid MACs, garbage URLs, etc.)
    if (contentIncoherenceCount > 0) {
        score = Math.max(20, score - (contentIncoherenceCount * 10));
    }

    let verdict = 'Gestionable';
    let verdictClass = 'success';
    let verdictDesc = 'El reclamo cuenta con la información reglamentaria requerida para ser gestionado y escalado.';

    if (incoherence) {
        verdict = 'Apto para Rechazo';
        verdictClass = 'danger';
        verdictDesc = `⛔ INCOHERENCIA DE RED DETECTADA: ${incoherence.motivo}. Petición técnicamente inviable o fuera del alcance de la GUI de un CPE Sagemcom DOCSIS 3.1 / ONT GPON. ${incoherence.rejectionAdvice}`;
        missingItems.unshift({
            label: 'Incoherencia Técnica de Red',
            critical: true,
            isIncoherence: true,
            desc: `${incoherence.motivo}. ${incoherence.technicalReason}`
        });
    } else if (score < 50) {
        verdict = 'Rechazable';
        verdictClass = 'danger';
        if (passwordEvaded) {
            verdictDesc = `Corresponde rechazar el RA / devolver a Front: El operador indicó que la contraseña "${escapeHtml(evasionText)}" (vacía o no brindada). La contraseña del cliente es estrictamente obligatoria para validar credenciales en NOC Aplicaciones.`;
        } else if (passwordMissing) {
            verdictDesc = 'Corresponde rechazar el RA / devolver a Front: La contraseña es estrictamente necesaria y no fue brindada.';
        } else if (keywordsMissing) {
            verdictDesc = 'Corresponde rechazar el RA: No se especificó ninguna de las palabras clave requeridas de CONFIGURAR.';
        } else {
            verdictDesc = 'Corresponde rechazar el RA / devolver a Front: Falta información crítica exigida por la plantilla oficial.';
        }
    } else if (score < 80) {
        verdict = 'Parcialmente Gestionable';
        verdictClass = 'warning';
        verdictDesc = 'El reclamo tiene información útil pero omite campos reglamentarios. Se recomienda completarlos antes de enviar a NOC.';
    }

    // Detect non-template lines (support info or noise)
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const noiseItems = [];
    lines.forEach(line => {
        if (!line.includes('[') && !line.includes(']') && line.length > 5) {
            if (/hugo\s*ruderman|sc\s*por|indica\s*que|codigo\s*de\s*suscripcion|se\s*chequea|pruebas|reinicio|soporte/i.test(line)) {
                noiseItems.push({ type: 'soporte', text: line });
            } else if (/enojado|reclamo\s*reiterado|llamar\s*urgente|amenaza|molesto/i.test(line)) {
                noiseItems.push({ type: 'ruido', text: line });
            }
        }
    });

    // Structured official summary
    let summaryParts = [];
    rule.items.forEach(it => {
        const shortLabel = it.label.split('(')[0].trim();
        if (extractedData[it.id]) {
            summaryParts.push(`[${shortLabel}: ${extractedData[it.id]}]`);
        } else if (it.isPassword && passwordEvaded) {
            summaryParts.push(`[${shortLabel}: NO BRINDADA ("${evasionText}")]`);
        } else {
            summaryParts.push(`[${shortLabel}: FALTA]`);
        }
    });
    const structuredSummary = summaryParts.join(' + ');

    return {
        hasRule: true,
        tipoRa,
        usos: rule.usos,
        plantillaOficial: rule.plantilla,
        score,
        verdict,
        verdictClass,
        verdictDesc,
        detectedItems,
        missingItems,
        noiseItems,
        structuredSummary,
        incoherenceData: incoherence
    };
}
