import { Post } from "@/types/Post";

/**
 * Respuesta de la API de generación de SEO
 */
export interface SEOResponse {
    keywords: string[];
    metaDescription: string;
}

/**
 * Datos mínimos necesarios para generar SEO
 */
interface SEORequestData {
    title: string;
    content: string;
    type: string;
    tags: string[];
    level: string;
}

/**
 * Determina la URL base para las peticiones API
 * @returns URL base para las peticiones
 */
function getBaseUrl(): string {
    return typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" : "";
}

/**
 * Prepara los datos para la petición de SEO
 * @param post Post del que se generará SEO
 * @returns Datos formateados para la petición
 * @throws Error si faltan datos obligatorios
 */
function prepareSEORequestData(post: Post): SEORequestData {
    const requestData = {
        title: post.title || "",
        content: post.content || "",
        type: post.type || "article",
        tags: post.tags || [],
        level: post.level || "",
    };

    if (!requestData.title || !requestData.content) {
        throw new Error("Se requiere título y contenido para generar SEO");
    }

    return requestData;
}

/**
 * Aplica la respuesta SEO al post original
 * @param post Post original
 * @param seo Datos SEO generados
 * @returns Post completo con datos SEO aplicados
 */
function applySEOToPost(post: Post, seo: SEOResponse): Post {
    return {
        ...post,
        keywords: post.keywords?.length ? post.keywords : seo.keywords,
        metaDescription: post.metaDescription?.trim() ? post.metaDescription : seo.metaDescription.trim(),
    };
}

/**
 * Genera un fallback SEO cuando la API falla
 * @param post Post original
 * @returns Post con SEO básico generado localmente
 */
function generateFallbackSEO(post: Post): Post {
    return {
        ...post,
        keywords: post.tags || [],
        metaDescription: post.description || post.title || "",
    };
}

/**
 * Llama a la API para generar SEO (desde cliente)
 * @param post Post del que se generará SEO
 * @returns Post con datos SEO aplicados
 */
export async function generateSEO(post: Post): Promise<Post> {
    try {
        const requestData = prepareSEORequestData(post);
        const baseUrl = getBaseUrl();

        const response = await fetch(`${baseUrl}/api/generate-seo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
            signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => "");
            throw new Error(`Error al generar SEO: ${response.status}${errorText ? ` - ${errorText}` : ""}`);
        }

        const seo: SEOResponse = await response.json();
        return applySEOToPost(post, seo);
    } catch (error) {
        console.error("[generateSEOClient] Error:", error);
        return generateFallbackSEO(post);
    }
}
