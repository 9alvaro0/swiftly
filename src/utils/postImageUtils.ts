/**
 * Utilidades para gestionar imágenes relacionadas con posts
 */

import { v4 as uuidv4 } from "uuid";
import { deleteImage } from "@/firebase/storage/image";

/**
 * Genera una ruta para almacenar imágenes de posts
 * @param fileName - Nombre del archivo
 * @param postId - ID del post (opcional, si no existe aún)
 * @returns Ruta para Firebase Storage
 */
export const generatePostImagePath = (fileName: string, postId?: string): string => {
    // Crear un ID temporal si el post aún no tiene ID
    const id = postId || `temp-${uuidv4()}`;

    // Crear un nombre de archivo seguro (eliminar espacios, caracteres especiales, etc.)
    const safeFileName = fileName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-\.]/g, "");

    // Añadir timestamp para evitar conflictos
    const timestamp = Date.now();

    return `posts/${id}/${timestamp}-${safeFileName}`;
};

/**
 * Extrae la ruta de la imagen desde una URL
 * @param imageUrl - URL de la imagen
 * @returns Ruta para usar con deleteImage
 */
export const extractImagePathFromUrl = (imageUrl: string): string | null => {
    try {
        // Firebase Storage URLs tienen este formato:
        // https://firebasestorage.googleapis.com/v0/b/[proyecto]/o/[path]?token...
        const match = imageUrl.match(/firebasestorage\.googleapis\.com\/v0\/b\/[^\/]+\/o\/([^?]+)/);
        if (!match || !match[1]) return null;

        // Firebase codifica los caracteres especiales en las URLs, así que decodificamos
        return decodeURIComponent(match[1]);
    } catch (error) {
        console.error("Error extrayendo path de imagen:", error);
        return null;
    }
};

/**
 * Elimina una imagen de Firebase Storage a partir de su URL
 * @param imageUrl - URL de la imagen a eliminar
 * @returns Promise<boolean> Verdadero si se eliminó correctamente
 */
export const deletePostImageByUrl = async (imageUrl: string): Promise<boolean> => {
    const path = extractImagePathFromUrl(imageUrl);
    if (!path) {
        console.error("No se pudo extraer la ruta de la imagen");
        return false;
    }

    try {
        await deleteImage(path);
        return true;
    } catch (error) {
        console.error("Error eliminando imagen:", error);
        return false;
    }
};

/**
 * Extrae las URLs de imágenes de Firebase Storage de un contenido markdown
 * @param content - Contenido markdown del post
 * @returns Array de URLs de imágenes
 */
export const extractImagesFromContent = (content: string): string[] => {
    if (!content) return [];

    // Buscar todas las imágenes en formato markdown ![alt](url)
    const markdownImageRegex = /!\[.*?\]\((https:\/\/firebasestorage\.googleapis\.com\/[^\)]+)\)/g;
    const markdownMatches = Array.from(content.matchAll(markdownImageRegex)).map((match) => match[1]);

    // Buscar también URLs de imágenes directas (por si están en otro formato)
    const urlImageRegex = /(https:\/\/firebasestorage\.googleapis\.com\/[^\s\"\'\)]+)/g;
    const urlMatches = Array.from(content.matchAll(urlImageRegex)).map((match) => match[1]);

    // Combinar y eliminar duplicados
    const allUrls = [...markdownMatches, ...urlMatches];
    return [...new Set(allUrls)];
};

/**
 * Limpia las imágenes no utilizadas al actualizar un post
 * @param oldContent - Contenido anterior del post
 * @param newContent - Nuevo contenido del post
 * @param excludeUrls - URLs adicionales a excluir de la limpieza (ej: imagen principal, portada)
 */
export const cleanUnusedImages = async (
    oldContent: string,
    newContent: string,
    excludeUrls: string[] = []
): Promise<void> => {
    // Extraer URLs de imágenes del contenido antiguo y nuevo
    const oldImages = extractImagesFromContent(oldContent);
    const newImages = extractImagesFromContent(newContent);

    // Encontrar imágenes que estaban en el contenido antiguo pero no en el nuevo
    const imagesToDelete = oldImages.filter((url) => !newImages.includes(url) && !excludeUrls.includes(url));

    // Eliminar cada imagen no utilizada
    for (const imageUrl of imagesToDelete) {
        await deletePostImageByUrl(imageUrl);
    }
};

/**
 * Mueve imágenes de una carpeta temporal a una carpeta permanente
 * @param tempFolder - Carpeta de origen (temporal)
 * @param permanentFolder - Carpeta de destino (permanente)
 * @param content - Contenido del post para encontrar imágenes
 * @returns Contenido actualizado con nuevas URLs
 */
export const moveTemporaryImages = async (
    tempFolder: string,
    permanentFolder: string,
    content: string,
    imageUrl?: string,
    coverImage?: string
): Promise<{
    updatedContent: string;
    updatedImageUrl?: string;
    updatedCoverImage?: string;
}> => {
    // Esta función simula el movimiento de imágenes.
    // En una implementación real, deberías:
    // 1. Listar todas las imágenes en tempFolder
    // 2. Copiar cada imagen a permanentFolder
    // 3. Eliminar las imágenes originales
    // 4. Actualizar las URLs en el contenido

    // Por ahora, solo actualizamos el contenido con URLs simuladas
    let updatedContent = content;
    let updatedImageUrl = imageUrl;
    let updatedCoverImage = coverImage;

    // Actualización simple para simulación
    if (content) {
        updatedContent = content.replace(new RegExp(tempFolder, "g"), permanentFolder);
    }

    if (imageUrl && imageUrl.includes(tempFolder)) {
        updatedImageUrl = imageUrl.replace(tempFolder, permanentFolder);
    }

    if (coverImage && coverImage.includes(tempFolder)) {
        updatedCoverImage = coverImage.replace(tempFolder, permanentFolder);
    }

    return {
        updatedContent,
        updatedImageUrl,
        updatedCoverImage,
    };
};
