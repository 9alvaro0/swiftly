/**
 * Utilidades para manejo de imágenes relacionadas a publicaciones
 */
import { deleteImage } from "@/services/firebase/storage/image";
import { extractImagePathFromUrl } from "./imageUtils";

/**
 * Genera una ruta para almacenar imágenes de publicaciones en Firebase Storage
 * @param fileName - Nombre original del archivo
 * @param postId - ID de la publicación (opcional, genera uno temporal si no se provee)
 * @returns Ruta formateada para Storage (ej. "posts/post123/1678901234567-filename.jpg")
 */
export const generatePostImagePath = (fileName: string, postId: string): string => {
    const timestamp = Date.now();
    
    const safeFileName = fileName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-.]/g, "");
        
    return `posts/${postId}/${timestamp}-${safeFileName}`;
};

/**
 * Elimina una imagen de Firebase Storage usando su URL
 * @param imageUrl - URL completa de la imagen en Storage
 * @returns Promesa que resuelve a true si la eliminación fue exitosa
 */
export const deletePostImageByUrl = async (imageUrl: string): Promise<boolean> => {
    const path = extractImagePathFromUrl(imageUrl);
    if (!path) return false;

    try {
        await deleteImage(path);
        return true;
    } catch (error) {
        console.error("Error eliminando imagen:", error);
        return false;
    }
};