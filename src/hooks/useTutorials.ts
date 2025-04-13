// src/hooks/useTutorials.ts
"use client";

import { useState, useEffect } from 'react';
import { fetchTutorials } from '@/services/api';
import type { Tutorial } from '@/types/Tutorial';

export function useTutorials() {
    const [tutorials, setTutorials] = useState<Tutorial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const loadTutorials = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const fetchedTutorials = await fetchTutorials(0);
            setTutorials(fetchedTutorials);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred'));
            console.error('Error fetching tutorials:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTutorials();
    }, []);

    const stats = {
        totalTutorials: tutorials.length,
        publishedTutorials: tutorials.filter((t) => t.isPublished).length,
        draftTutorials: tutorials.filter((t) => !t.isPublished).length,
    };

    return {
        tutorials,
        stats,
        isLoading,
        error,
        refetch: loadTutorials
    };
}