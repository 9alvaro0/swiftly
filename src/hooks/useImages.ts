import { useState, useCallback } from "react";
import { uploadImage, getImageURL, deleteImage, updateImage, listImages } from "@/firebase/storage/image";

interface UseImagesState {
    loading: boolean;
    error: Error | null;
    urls: string[];
}

interface UseImagesReturn extends UseImagesState {
    upload: (file: File, path: string) => Promise<string>;
    getURL: (path: string) => Promise<string>;
    remove: (path: string) => Promise<void>;
    update: (file: File, path: string) => Promise<string>;
    list: (folderPath: string) => Promise<string[]>;
    resetState: () => void;
}

/**
 * Hook para interactuar con Firebase Storage para imágenes
 * @returns Métodos para manipular imágenes y estado actual
 */
export const useImages = (): UseImagesReturn => {
    const [state, setState] = useState<UseImagesState>({
        loading: false,
        error: null,
        urls: [],
    });

    // Restablecer el estado (útil después de errores o al cambiar de componente)
    const resetState = useCallback(() => {
        setState({
            loading: false,
            error: null,
            urls: [],
        });
    }, []);

    // Subir imagen
    const upload = useCallback(async (file: File, path: string): Promise<string> => {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            const url = await uploadImage(file, path);
            setState((prev) => ({
                loading: false,
                error: null,
                urls: [...prev.urls, url],
            }));
            return url;
        } catch (error) {
            const errorObj = error instanceof Error ? error : new Error("Error desconocido al subir imagen");
            setState((prev) => ({ ...prev, loading: false, error: errorObj }));
            throw errorObj;
        }
    }, []);

    // Obtener URL de imagen
    const getURL = useCallback(async (path: string): Promise<string> => {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            const url = await getImageURL(path);
            setState((prev) => ({ loading: false, error: null, urls: prev.urls }));
            return url;
        } catch (error) {
            const errorObj = error instanceof Error ? error : new Error("Error desconocido al obtener URL");
            setState((prev) => ({ ...prev, loading: false, error: errorObj }));
            throw errorObj;
        }
    }, []);

    // Eliminar imagen
    const remove = useCallback(async (path: string): Promise<void> => {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            await deleteImage(path);
            setState((prev) => ({ loading: false, error: null, urls: prev.urls }));
        } catch (error) {
            const errorObj = error instanceof Error ? error : new Error("Error desconocido al eliminar imagen");
            setState((prev) => ({ ...prev, loading: false, error: errorObj }));
            throw errorObj;
        }
    }, []);

    // Actualizar imagen
    const update = useCallback(async (file: File, path: string): Promise<string> => {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            const url = await updateImage(file, path);
            setState((prev) => ({ loading: false, error: null, urls: prev.urls }));
            return url;
        } catch (error) {
            const errorObj = error instanceof Error ? error : new Error("Error desconocido al actualizar imagen");
            setState((prev) => ({ ...prev, loading: false, error: errorObj }));
            throw errorObj;
        }
    }, []);

    // Listar imágenes
    const list = useCallback(async (folderPath: string): Promise<string[]> => {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            const urls = await listImages(folderPath);
            setState({ loading: false, error: null, urls });
            return urls;
        } catch (error) {
            const errorObj = error instanceof Error ? error : new Error("Error desconocido al listar imágenes");
            setState((prev) => ({ ...prev, loading: false, error: errorObj }));
            throw errorObj;
        }
    }, []);

    return {
        ...state,
        upload,
        getURL,
        remove,
        update,
        list,
        resetState,
    };
};
