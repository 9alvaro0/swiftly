/**
 * Utilidades para gestión de imágenes de usuario en Firebase Storage
 */
import { deleteImage } from "@/services/firebase/storage/image";
import { extractImagePathFromUrl } from "./imageUtils";

/**
 * Genera una ruta segura para almacenar imágenes de usuario en Firebase Storage
 * @param fileName - Nombre original del archivo
 * @param userId - ID del usuario (si no se provee, genera uno temporal)
 * @returns Ruta completa para almacenamiento (ej. "users/user123/1678901234567-foto-perfil.jpg")
 */
// src/utils/userImageUtils.ts

export const generateUserImagePath = (userId: string, fileName: string): string => {
    const timestamp = Date.now();

    const safeFileName = fileName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w\-.]/g, "");

    console.log("Path generado:", `users/${userId}/${timestamp}-${safeFileName}`);
    return `users/${userId}/${timestamp}-${safeFileName}`;
};

/**
 * Elimina una imagen de usuario de Firebase Storage usando su URL
 * @param imageUrl - URL completa de la imagen en Storage
 * @returns Promesa que resuelve:
 *           - true: si la imagen se eliminó correctamente
 *           - false: si no se pudo extraer la ruta o hubo error
 */
export const deleteUserImageByUrl = async (imageUrl: string): Promise<boolean> => {
    const path = extractImagePathFromUrl(imageUrl);
    if (!path) {
        console.warn("URL de imagen no válida para extraer ruta");
        return false;
    }

    if (!path.startsWith("users/")) {
        console.error("Intento de eliminar imagen fuera del directorio de usuarios");
        return false;
    }

    try {
        await deleteImage(path);
        return true;
    } catch (error) {
        console.error(`Error eliminando imagen ${path}:`, error);
        return false;
    }
};
