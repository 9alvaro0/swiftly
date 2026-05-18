import { ref, uploadBytes, getDownloadURL, deleteObject, listAll, getMetadata } from "firebase/storage";
import { storage } from "@/services/firebase/config";

/**
 * Sube una imagen al Firebase Storage
 * @param file - Archivo a subir
 * @param path - Ruta donde se guardará en Storage (ej: "users/userId/profile.jpg")
 * @returns URL de descarga de la imagen subida
 */

export const uploadImage = async (file: File, path: string): Promise<string> => {
    try {
        // Validaciones de entrada
        if (!file) {
            throw new Error("File is required");
        }
        
        if (!path || typeof path !== 'string') {
            throw new Error("Valid file path is required");
        }
        
        // Validar tipo de archivo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            throw new Error(`Invalid file type: ${file.type}. Allowed types: ${allowedTypes.join(', ')}`);
        }
        
        // Validar tamaño de archivo (5MB máximo)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            throw new Error(`File size too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Maximum allowed: 5MB`);
        }
        
        const metadata = { 
            contentType: file.type,
            customMetadata: {
                originalName: file.name,
                uploadedAt: new Date().toISOString(),
            }
        };
        
        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, file, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log(`Image uploaded successfully: ${path}`);
        return downloadURL;
    } catch (error) {
        console.error(`Error uploading image (${path}):`, error);
        
        // Re-throw validation errors as-is
        if (error instanceof Error && (
            error.message.includes("File is required") ||
            error.message.includes("Valid file path is required") ||
            error.message.includes("Invalid file type") ||
            error.message.includes("File size too large")
        )) {
            throw error;
        }
        
        throw new Error(`No se pudo subir la imagen: ${error instanceof Error ? error.message : String(error)}`);
    }
};

/**
 * Elimina una imagen de Firebase Storage
 * @param path - Ruta de la imagen a eliminar
 */
export const deleteImage = async (path: string): Promise<void> => {
    try {
        if (!path || typeof path !== 'string') {
            throw new Error("Valid file path is required");
        }
        
        const storageRef = ref(storage, path);
        await deleteObject(storageRef);
        console.log(`Image deleted successfully: ${path}`);
    } catch (error) {
        console.error(`Error deleting image (${path}):`, error);
        
        // If file doesn't exist, log but don't throw error
        if ((error as { code?: string }).code === "storage/object-not-found") {
            console.warn(`Image not found for deletion: ${path}`);
            return; // Don't throw error for non-existent files
        }
        
        throw new Error(`Failed to delete image: ${error instanceof Error ? error.message : String(error)}`);
    }
};

/**
 * Actualiza una imagen existente (elimina la anterior y sube la nueva)
 * @param file - Nuevo archivo a subir
 * @param path - Ruta donde se guardará (misma de la imagen a reemplazar)
 * @returns URL de descarga de la nueva imagen
 */
export const updateImage = async (file: File, path: string): Promise<string> => {
    try {
        if (!file) {
            throw new Error("File is required");
        }
        
        if (!path || typeof path !== 'string') {
            throw new Error("Valid file path is required");
        }
        
        // Check if old image exists before trying to delete
        const imageExists = await checkImageExists(path);
        if (imageExists) {
            await deleteImage(path);
        } else {
            console.log(`No existing image to replace at: ${path}`);
        }
        
        const downloadURL = await uploadImage(file, path);
        console.log(`Image updated successfully: ${path}`);
        return downloadURL;
    } catch (error) {
        console.error(`Error updating image (${path}):`, error);
        throw new Error(`Failed to update image: ${error instanceof Error ? error.message : String(error)}`);
    }
};

/**
 * Lista todas las imágenes en una carpeta específica
 * @param folderPath - Ruta de la carpeta en Storage (ej: "users/userId/")
 * @returns Lista de URLs de las imágenes
 */
export const listImages = async (folderPath: string): Promise<string[]> => {
    try {
        if (!folderPath || typeof folderPath !== 'string') {
            throw new Error("Valid folder path is required");
        }
        
        const folderRef = ref(storage, folderPath);
        const result = await listAll(folderRef);

        // Obtener URLs de descarga para todos los items
        const downloadURLs = await Promise.all(
            result.items.map(async (itemRef) => {
                try {
                    return await getDownloadURL(itemRef);
                } catch (error) {
                    console.warn(`Failed to get download URL for ${itemRef.fullPath}:`, error);
                    return null;
                }
            })
        );

        // Filter out null values from failed downloads
        const validURLs = downloadURLs.filter((url): url is string => url !== null);
        console.log(`Listed ${validURLs.length} images from folder: ${folderPath}`);
        return validURLs;
    } catch (error) {
        console.error(`Error listing images (${folderPath}):`, error);
        // Return empty array as fallback
        return [];
    }
};

/**
 * Checks if an image exists at the given path
 */
export const checkImageExists = async (path: string): Promise<boolean> => {
    try {
        const storageRef = ref(storage, path);
        await getMetadata(storageRef);
        return true;
    } catch (error) {
        if ((error as { code?: string }).code === "storage/object-not-found") {
            return false;
        }
        throw error;
    }
};
