import { useState, useEffect, useCallback } from "react";
import { getAllTags, getTagById, createTag, updateTag, deleteTag } from "@/firebase/firestore/tags";
import { Tag } from "@/types/Tag";

interface TagsFilters {
    searchTerm?: string;
}

interface TagsStats {
    total: number;
}

interface UseTagsOptions {
    initialFilters?: TagsFilters;
}

interface UseTagsReturn {
    tags: Tag[];
    filteredTags: Tag[];
    stats: TagsStats;
    isLoading: boolean;
    error: Error | null;
    filters: TagsFilters;
    refetch: () => Promise<void>;
    updateFilters: (newFilters: TagsFilters) => void;
    resetFilters: () => void;
    createNewTag: (tag: Tag) => Promise<void>;
    updateTagById: (tagId: string, updatedFields: Partial<Tag>) => Promise<void>;
    deleteTagById: (tagId: string) => Promise<void>;
    getTag: (tagId: string) => Promise<Tag | null>;
}

export function useTags(options: UseTagsOptions = {}): UseTagsReturn {
    const [tags, setTags] = useState<Tag[]>([]);
    const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [stats, setStats] = useState<TagsStats>({ total: 0 });

    const [filters, setFilters] = useState<TagsFilters>(options.initialFilters || { searchTerm: "" });

    const calculateStats = (tagsData: Tag[]): TagsStats => {
        return { total: tagsData.length };
    };

    // Obtener todos los tags
    const fetchTags = useCallback(async () => {
        try {
            setIsLoading(true);
            const tagsData = await getAllTags();
            setTags(tagsData);
            setStats(calculateStats(tagsData));
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error desconocido al obtener tags"));
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Actualizar filtros
    const updateFilters = useCallback((newFilters: TagsFilters) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    }, []);

    // Resetear filtros
    const resetFilters = useCallback(() => {
        setFilters({ searchTerm: "" });
    }, []);

    // Aplicar filtros a los tags
    useEffect(() => {
        if (!tags.length) return;

        let result = [...tags];

        // Aplicar filtro de búsqueda
        if (filters.searchTerm) {
            const searchTermLower = filters.searchTerm.toLowerCase();
            result = result.filter((tag) => tag.name.toLowerCase().includes(searchTermLower));
        }

        setFilteredTags(result);
    }, [tags, filters]);

    // Cargar tags iniciales
    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    // Función para crear un nuevo tag
    const createNewTag = async (tag: Tag): Promise<void> => {
        try {
            await createTag(tag);
            await fetchTags(); // Refrescar la lista después de crear
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error al crear el tag"));
            throw err;
        }
    };

    // Función para actualizar un tag
    const updateTagById = async (tagId: string, updatedFields: Partial<Tag>): Promise<void> => {
        try {
            await updateTag(tagId, updatedFields);
            await fetchTags(); // Refrescar la lista después de actualizar
        } catch (err) {
            setError(err instanceof Error ? err : new Error(`Error al actualizar el tag: ${tagId}`));
            throw err;
        }
    };

    // Función para eliminar un tag
    const deleteTagById = async (tagId: string): Promise<void> => {
        try {
            await deleteTag(tagId);
            await fetchTags();
        } catch (err) {
            setError(err instanceof Error ? err : new Error(`Error al eliminar el tag: ${tagId}`));
            throw err;
        }
    };

    // Función para obtener un tag específico
    const getTag = async (tagId: string): Promise<Tag | null> => {
        try {
            return await getTagById(tagId);
        } catch (err) {
            setError(err instanceof Error ? err : new Error(`Error al obtener el tag: ${tagId}`));
            throw err;
        }
    };

    return {
        tags,
        filteredTags,
        stats,
        isLoading,
        error,
        filters,
        refetch: fetchTags,
        updateFilters,
        resetFilters,
        createNewTag,
        updateTagById,
        deleteTagById,
        getTag,
    };
}
