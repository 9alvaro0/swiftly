// src/hooks/usePosts.ts
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Post, PostCategory, PostLevel, PostType } from "@/types/Post";
import { PostService } from "@/services/postService";

interface PostFilters {
    category?: PostCategory;
    level?: PostLevel;
    type?: PostType;
    searchTerm?: string;
    tags?: string[];
    featured?: boolean;
}

export function usePosts(initialFilters: PostFilters = {}) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [filters, setFilters] = useState<PostFilters>(initialFilters);

    const loadPosts = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const fetchedPosts = await PostService.fetchPosts();
            setPosts(fetchedPosts);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            console.error("Error fetching posts:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchCategory = !filters.category || post.category === filters.category;
            const matchLevel = !filters.level || post.level === filters.level;
            const matchType = !filters.type || post.type === filters.type;
            const matchFeatured = filters.featured === undefined || post.featured === filters.featured;
            const matchSearchTerm =
                !filters.searchTerm ||
                post.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                post.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
            const matchTags = !filters.tags?.length || filters.tags.some((tag) => post.tags.includes(tag));

            return matchCategory && matchLevel && matchType && matchSearchTerm && matchTags && matchFeatured;
        });
    }, [posts, filters]);

    const stats = useMemo(
        () => ({
            totalPosts: posts.length,
            filteredPosts: filteredPosts.length,
            publishedPosts: posts.filter((p) => p.isPublished).length,
            postsByCategory: posts.reduce((acc, post) => {
                acc[post.category] = (acc[post.category] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
            postsByLevel: posts.reduce((acc, post) => {
                acc[post.level] = (acc[post.level] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
            postsByType: posts.reduce((acc, post) => {
                acc[post.type] = (acc[post.type] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
        }),
        [posts, filteredPosts]
    );

    const updateFilters = useCallback((newFilters: Partial<PostFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({});
    }, []);

    return {
        posts: filteredPosts,
        allPosts: posts,
        stats,
        isLoading,
        error,
        filters,
        updateFilters,
        resetFilters,
        refetch: loadPosts
    };
}
