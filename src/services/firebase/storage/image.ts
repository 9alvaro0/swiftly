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
        console.log("🛠 Subiendo imagen a Firebase Storage en:", path);
        console.log("🔍 Detalles del archivo:", {
            name: file.name,
            size: file.size,
            type: file.type,
        });
        // Crear metadatos con el tipo MIME correcto
        const metadata = {
            contentType: file.type,
        };

        console.log(`Subiendo archivo: ${file.name}, tipo: ${file.type}, tamaño: ${file.size} bytes`);

        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, file, metadata);
        console.log("Subida completada con éxito:", snapshot);

        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("URL de descarga obtenida:", downloadURL);

        return downloadURL;
    } catch (error) {
        console.error("Error al subir imagen:", error);
        throw new Error("No se pudo subir la imagen: " + (error instanceof Error ? error.message : String(error)));
    }
};

/**
 * Elimina una imagen de Firebase Storage
 * @param path - Ruta de la imagen a eliminar
 */
export const deleteImage = async (path: string): Promise<void> => {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
};

/**
 * Actualiza una imagen existente (elimina la anterior y sube la nueva)
 * @param file - Nuevo archivo a subir
 * @param path - Ruta donde se guardará (misma de la imagen a reemplazar)
 * @returns URL de descarga de la nueva imagen
 */
export const updateImage = async (file: File, path: string): Promise<string> => {
    await deleteImage(path);
    return await uploadImage(file, path);
};

/**
 * Lista todas las imágenes en una carpeta específica
 * @param folderPath - Ruta de la carpeta en Storage (ej: "users/userId/")
 * @returns Lista de URLs de las imágenes
 */
export const listImages = async (folderPath: string): Promise<string[]> => {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);

    // Obtener URLs de descarga para todos los items
    const downloadURLs = await Promise.all(result.items.map((itemRef) => getDownloadURL(itemRef)));

    return downloadURLs;
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
