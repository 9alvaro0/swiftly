// src/hooks/usePosts.ts
"use client";

import { useState, useEffect, useMemo } from "react";
import { Post, PostCategory, PostLevel, PostType } from "@/types/Post";
import { PostService } from "@/services/postService";

interface PostFilters {
    category?: PostCategory;
    level?: PostLevel;
    type?: PostType;
    featured?: boolean;
    searchTerm?: string;
    tags?: string[];
    limit?: number;
}

export function usePosts(initialFilters: PostFilters = {}) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [filters, setFilters] = useState<PostFilters>(initialFilters);

    const fetchPosts = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const fetchedPosts = await PostService.fetchPosts();
            setPosts(fetchedPosts);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error desconocido"));
            console.error("Error fetching posts:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filteredPosts = useMemo(() => {
        let result = posts.filter((post) => {
            const matchCategory = !filters.category || post.category === filters.category;
            const matchLevel = !filters.level || post.level === filters.level;
            const matchType = !filters.type || post.type === filters.type;
            const matchFeatured = filters.featured === undefined || post.featured === filters.featured;
            const matchSearchTerm =
                !filters.searchTerm ||
                post.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                post.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
            const matchTags = !filters.tags?.length || filters.tags.some((tag) => post.tags.includes(tag));

            return matchCategory && matchLevel && matchType && matchFeatured && matchSearchTerm && matchTags;
        });

        // Apply limit if specified
        if (filters.limit) {
            result = result.slice(0, filters.limit);
        }

        return result;
    }, [posts, filters]);

    // Estadísticas
    const stats = useMemo(() => {
        const isPublished = (post: Post) => post.isPublished;
        const byType = (type: PostType) => (post: Post) => post.type === type;

        return {
            total: posts.length,
            filtered: filteredPosts.length,
            published: posts.filter(isPublished).length,

            // Posts por categoría
            byCategory: posts.reduce((acc, post) => {
                acc[post.category] = (acc[post.category] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),

            // Posts por nivel (si aplica)
            byLevel: posts.reduce((acc, post) => {
                if (post.level) {
                    acc[post.level] = (acc[post.level] || 0) + 1;
                }
                return acc;
            }, {} as Record<string, number>),

            // Conteos específicos
            tutorials: posts.filter(byType("tutorial")).length,
            articles: posts.filter(byType("article")).length,
        };
    }, [posts, filteredPosts]);

    // CRUD operations
    const createPost = async (postData: Partial<Post>) => {
        try {
            const newPost = await PostService.createPost(postData);
            setPosts((prev) => [...prev, newPost]);
            return newPost;
        } catch (err) {
            console.error("Error creating post:", err);
            throw err;
        }
    };

    const updatePost = async (id: string, postData: Partial<Post>) => {
        try {
            const updatedPost = await PostService.updatePost(id, postData);
            setPosts((prev) => prev.map((post) => (post.id === id ? updatedPost : post)));
            return updatedPost;
        } catch (err) {
            console.error("Error updating post:", err);
            throw err;
        }
    };

    const deletePost = async (id: string) => {
        try {
            await PostService.deletePost(id);
            setPosts((prev) => prev.filter((post) => post.id !== id));
        } catch (err) {
            console.error("Error deleting post:", err);
            throw err;
        }
    };

    const getPostBySlug = async (slug: string) => {
        try {
            return await PostService.fetchPostBySlug(slug);
        } catch (err) {
            console.error("Error fetching post by slug:", err);
            throw err;
        }
    };

    const updateFilters = (newFilters: Partial<PostFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    const resetFilters = () => {
        setFilters({});
    };

    return {
        posts: filteredPosts,
        allPosts: posts,
        stats,
        isLoading,
        error,
        filters,
        updateFilters,
        resetFilters,
        createPost,
        updatePost,
        deletePost,
        getPostBySlug,
        refetch: fetchPosts,
    };
}

// Hooks específicos (composición sobre herencia)
export function useTutorials(options: Omit<PostFilters, "type"> = {}) {
    return usePosts({ ...options, type: "tutorial" });
}

export function useArticles(options: Omit<PostFilters, "type"> = {}) {
    return usePosts({ ...options, type: "article" });
}

export function useFeaturedPosts(limit = 3) {
    return usePosts({ featured: true, limit });
}

export function usePostsByCategory(category: PostCategory, options: Omit<PostFilters, "category"> = {}) {
    return usePosts({ ...options, category });
}
