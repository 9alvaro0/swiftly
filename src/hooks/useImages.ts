import { useState, useCallback } from "react";
import {
    uploadImage,
    getImageURL,
    deleteImage,
    updateImage,
    listImages,
    checkImageExists,
} from "@/firebase/storage/image";

interface UseImagesState {
    loading: boolean;
    error: Error | null;
    urls: string[];
}

interface UseImagesReturn extends UseImagesState {
    uploadOrUpdate: (file: File, path: string) => Promise<string>;
    getURL: (path: string) => Promise<string>;
    remove: (path: string) => Promise<void>;
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

    const resetState = useCallback(() => {
        setState({
            loading: false,
            error: null,
            urls: [],
        });
    }, []);

    // Unified upload/update method
    const uploadOrUpdate = useCallback(async (file: File, path: string): Promise<string> => {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        try {
            const exists = await checkImageExists(path);
            let url: string;

            if (exists) {
                url = await updateImage(file, path);
            } else {
                url = await uploadImage(file, path);
            }

            setState((prev) => ({
                loading: false,
                error: null,
                urls: [...prev.urls.filter((u) => u !== url), url], // Replace if exists
            }));

            return url;
        } catch (error) {
            const errorObj = error instanceof Error ? error : new Error("Error al subir/actualizar imagen");
            setState((prev) => ({ ...prev, loading: false, error: errorObj }));
            throw errorObj;
        }
    }, []);

    const getURL = useCallback(async (path: string): Promise<string> => {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            const url = await getImageURL(path);
            setState((prev) => ({ loading: false, error: null, urls: prev.urls }));
            return url;
        } catch (error) {
            const errorObj = error instanceof Error ? error : new Error("Error al obtener URL");
            setState((prev) => ({ ...prev, loading: false, error: errorObj }));
            throw errorObj;
        }
    }, []);

    const remove = useCallback(async (path: string): Promise<void> => {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            await deleteImage(path);
            setState((prev) => ({
                loading: false,
                error: null,
                urls: prev.urls.filter((url) => !url.includes(path)),
            }));
        } catch (error) {
            const errorObj = error instanceof Error ? error : new Error("Error al eliminar imagen");
            setState((prev) => ({ ...prev, loading: false, error: errorObj }));
            throw errorObj;
        }
    }, []);

    const list = useCallback(async (folderPath: string): Promise<string[]> => {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            const urls = await listImages(folderPath);
            setState({ loading: false, error: null, urls });
            return urls;
        } catch (error) {
            const errorObj = error instanceof Error ? error : new Error("Error al listar imágenes");
            setState((prev) => ({ ...prev, loading: false, error: errorObj }));
            throw errorObj;
        }
    }, []);

    return {
        ...state,
        uploadOrUpdate,
        getURL,
        remove,
        list,
        resetState,
    };
};
