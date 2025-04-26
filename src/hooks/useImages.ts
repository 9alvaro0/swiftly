import { useState, useCallback } from "react";
import { uploadImage, updateImage, listImages, checkImageExists } from "@/services/firebase/storage/image";

interface UseImagesState {
    loading: boolean;
    error: Error | null;
    urls: string[];
}

interface UseImagesReturn extends UseImagesState {
    uploadOrUpdate: (file: File, path: string) => Promise<string>;
    list: (folderPath: string) => Promise<string[]>;
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
        list,
    };
};
