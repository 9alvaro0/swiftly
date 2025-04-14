// src/hooks/useTutorials.ts
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Post, PostCategory, PostLevel } from "@/types/Post";
import { getAllTutorials } from "@/services/tutorialService";

interface TutorialFilters {
    category?: PostCategory;
    level?: PostLevel;
    searchTerm?: string;
    tags?: string[];
}

export function useTutorials(initialFilters: TutorialFilters = {}) {
    const [tutorials, setTutorials] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [filters, setFilters] = useState<TutorialFilters>(initialFilters);

    const loadTutorials = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const fetchedTutorials = await getAllTutorials();
            const tutorialsOnly = fetchedTutorials.filter((post) => post.type === "tutorial");
            setTutorials(tutorialsOnly);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            console.error("Error fetching tutorials:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTutorials();
    }, [loadTutorials]);

    const filteredTutorials = useMemo(() => {
        return tutorials.filter((tutorial) => {
            const matchCategory = !filters.category || tutorial.category === filters.category;
            const matchLevel = !filters.level || tutorial.level === filters.level;
            const matchSearchTerm =
                !filters.searchTerm ||
                tutorial.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                tutorial.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
            const matchTags = !filters.tags?.length || filters.tags.some((tag) => tutorial.tags.includes(tag));

            return matchCategory && matchLevel && matchSearchTerm && matchTags;
        });
    }, [tutorials, filters]);

    const stats = useMemo(
        () => ({
            totalTutorials: tutorials.length,
            filteredTutorials: filteredTutorials.length,
            publishedTutorials: tutorials.filter((t) => t.isPublished).length,
            tutorialsByCategory: tutorials.reduce((acc, tutorial) => {
                acc[tutorial.category] = (acc[tutorial.category] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
            tutorialsByLevel: tutorials.reduce((acc, tutorial) => {
                acc[tutorial.level] = (acc[tutorial.level] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
        }),
        [tutorials, filteredTutorials]
    );

    // Memoizar estas funciones para evitar re-renderizados innecesarios
    const updateFilters = useCallback((newFilters: Partial<TutorialFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({});
    }, []);

    return {
        tutorials: filteredTutorials,
        allTutorials: tutorials,
        stats,
        isLoading,
        error,
        filters,
        updateFilters,
        resetFilters,
        refetch: loadTutorials,
    };
}
