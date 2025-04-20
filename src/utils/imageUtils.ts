/**
 * Extrae la ruta de almacenamiento de Firebase desde una URL de imagen
 * @param imageUrl - URL completa de la imagen en Firebase Storage
 * @returns Ruta decodificada del archivo en Storage o null si no coincide el formato
 * @example
 * // Returns 'images/profile%2Fuser1.jpg'
 * extractImagePathFromUrl(
 *   'https://firebasestorage.googleapis.com/v0/b/myapp.appspot.com/o/images%2Fprofile%2Fuser1.jpg?alt=media'
 * )
 */
export const extractImagePathFromUrl = (imageUrl: string): string | null => {
    const FIREBASE_STORAGE_REGEX = /firebasestorage\.googleapis\.com\/v0\/b\/[^\/]+\/o\/([^?]+)/;

    try {
        const match = imageUrl.match(FIREBASE_STORAGE_REGEX);
        return match?.[1] ? decodeURIComponent(match[1]) : null;
    } catch (error) {
        console.error("Error extrayendo path de imagen:", error);
        return null;
    }
};
