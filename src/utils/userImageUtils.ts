/**
 * Utilidades para gestión de imágenes de usuario en Firebase Storage
 */
import { v4 as uuidv4 } from "uuid";
import { deleteImage } from "@/firebase/storage/image";
import { extractImagePathFromUrl } from "./imageUtils";

/**
 * Genera una ruta segura para almacenar imágenes de usuario en Firebase Storage
 * @param fileName - Nombre original del archivo
 * @param userId - ID del usuario (si no se provee, genera uno temporal)
 * @returns Ruta completa para almacenamiento (ej. "users/user123/1678901234567-foto-perfil.jpg")
 */
export const generateUserImagePath = (fileName: string, userId: string): string => {
    const id = userId || `temp-${uuidv4()}`;
    const timestamp = Date.now();

    const safeFileName = fileName
        .toLowerCase()
        .normalize("NFD") // Normaliza caracteres acentuados
        .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos
        .replace(/\s+/g, "-")
        .replace(/[^\w\-.]/g, "");

    return `users/${id}/${timestamp}-${safeFileName}`;
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

    // Verificar que la ruta pertenece a la carpeta de usuarios por seguridad
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
