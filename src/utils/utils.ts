/**
 * Valida URLs según formato general o específico de plataforma
 * @param url - URL a validar
 * @param platform - Plataforma específica para validación (opcional)
 * @returns boolean - true si la URL es válida para el formato/plataforma
 */
export const isValidUrl = (url: string, platform?: string): boolean => {
    // Validación básica de estructura URL
    try {
        const urlObj = new URL(url);

        // Verificación adicional de protocolos permitidos (http/https)
        if (!["http:", "https:"].includes(urlObj.protocol)) {
            return false;
        }
    } catch {
        return false;
    }

    // Si no se especifica plataforma, retornar verdadero (ya pasó validación básica)
    if (!platform) return true;

    // Patrones de validación para plataformas soportadas
    const PLATFORM_PATTERNS: Record<string, RegExp> = {
        linkedin: /^https:\/\/(www\.)?linkedin\.com\/(in|company|school|profile\/view\?id=|pub\/)[a-zA-Z0-9_-]+\/?/i,
        github: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?/i,
        twitter: /^https:\/\/(www\.)?(twitter|x)\.com\/[a-zA-Z0-9_]+\/?/i,
        instagram: /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?/i,
        facebook: /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?/i,
        youtube: /^https:\/\/(www\.)?(youtube\.com\/(channel\/|user\/|c\/)|youtu\.be\/)[a-zA-Z0-9_-]+\/?/i,
    };

    // Validación para plataforma específica si existe patrón
    if (platform.toLowerCase() in PLATFORM_PATTERNS) {
        return PLATFORM_PATTERNS[platform.toLowerCase()].test(url);
    }

    // Plataforma no soportada específicamente, pero URL es válida
    return true;
};
