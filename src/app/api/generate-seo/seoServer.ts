import { generateJSON } from "@/services/ai/utils/utils";
import { SEORequest, SEOResponse } from "@/types/SEO";

/**
 * Constantes para la generación de SEO
 */
const SEO_CONFIG = {
    MAX_KEYWORDS: 8,
    MIN_KEYWORDS: 5,
    TARGET_DESCRIPTION_LENGTH: 180,
    MIN_WORD_LENGTH: 3,
};

/**
 * Interfaz para datos SEO sin validar que pueden venir de la API
 */
interface UnsafeSEOResponse {
    keywords?: unknown;
    metaDescription?: unknown;
}

/**
 * Prepara el prompt para la generación de SEO
 * @param postData Datos del post para generar SEO
 * @returns Prompt formateado
 */
function prepareSEOPrompt(postData: SEORequest): string {
    return `
        Genera keywords y meta description SEO para un artículo o tutorial con la siguiente información:

        Título: ${postData.title}
        Tipo: ${postData.type || ""}
        Nivel: ${postData.level || ""}
        Tags: ${postData.tags?.join(", ") || ""}

        Contenido completo:
        ${postData.content}

        INSTRUCCIONES:
        1. Genera entre ${SEO_CONFIG.MIN_KEYWORDS}-${SEO_CONFIG.MAX_KEYWORDS} keywords relevantes para SEO.
        2. Crea una meta description optimizada de aproximadamente 150-${
            SEO_CONFIG.TARGET_DESCRIPTION_LENGTH
        } caracteres.
    `;
}

/**
 * Genera keywords de fallback desde el título
 * @param title Título del post
 * @returns Array de keywords
 */
function generateFallbackKeywords(title: string): string[] {
    if (!title) return [];

    return title
        .toLowerCase()
        .split(" ")
        .filter((word) => word.length > SEO_CONFIG.MIN_WORD_LENGTH)
        .slice(0, SEO_CONFIG.MIN_KEYWORDS);
}

/**
 * Genera meta description de fallback
 * @param postData Datos del post
 * @returns Meta description generada
 */
function generateFallbackDescription(postData: SEORequest): string {
    if (!postData.title && !postData.content) return "";

    const cleanContent = postData.content.substring(0, 100).replace(/[#*_]/g, "");
    return `${postData.title}. ${cleanContent}...`.trim();
}

/**
 * Sanitiza y valida la respuesta SEO
 * @param seoData Datos SEO recibidos
 * @returns Datos SEO validados y limpios
 */
function sanitizeSEOResponse(seoData: UnsafeSEOResponse): SEOResponse {
    return {
        keywords: Array.isArray(seoData?.keywords)
            ? seoData.keywords
                  .slice(0, SEO_CONFIG.MAX_KEYWORDS)
                  .map((k) => (typeof k === "string" ? k.trim() : ""))
                  .filter(Boolean)
            : [],
        metaDescription: typeof seoData?.metaDescription === "string" ? seoData.metaDescription.trim() : "",
    };
}

/**
 * Genera datos SEO usando IA para un post
 * @param postData Datos del post para generar SEO
 * @returns Datos SEO generados (keywords y meta description)
 */
export async function generateSEO(postData: SEORequest): Promise<SEOResponse> {
    const systemPrompt = `
      Eres un experto en SEO. Responde con un objeto JSON con:
      - "keywords": array de strings (${SEO_CONFIG.MIN_KEYWORDS}-${SEO_CONFIG.MAX_KEYWORDS} keywords relevantes)
      - "metaDescription": string de aproximadamente 150-${SEO_CONFIG.TARGET_DESCRIPTION_LENGTH} caracteres.
    `;

    try {
        if (!postData.title || !postData.content) {
            throw new Error("Se requiere título y contenido para generar SEO");
        }

        const prompt = prepareSEOPrompt(postData);
        const seoData = await generateJSON<SEOResponse>({
            prompt,
            systemPrompt,
        });

        return sanitizeSEOResponse(seoData);
    } catch (error) {
        console.error("[generateSEO] Fallback por error:", error);

        return {
            keywords: generateFallbackKeywords(postData.title),
            metaDescription: generateFallbackDescription(postData),
        };
    }
}
