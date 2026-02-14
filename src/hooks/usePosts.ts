// src/hooks/usePosts.ts
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Post, PostLevel, PostType } from "@/types/Post";
import { PostStats } from "@/types/PostStats";
import { getAllPosts } from "@/services/firebase/firestore/post";
import { getAuthor } from "@/services/firebase/firestore/authors";

interface PostFilters {
    level?: string;
    type?: PostType;
    searchTerm?: string;
    tags?: string[];
}

export function usePosts(initialFilters: PostFilters = {}) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [filters, setFilters] = useState<PostFilters>(initialFilters);
    const [topAuthorName, setTopAuthorName] = useState<string | undefined>();

    const loadAllPosts = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const fetchedPosts = await getAllPosts();
            setPosts(fetchedPosts);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error loading posts"));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAllPosts();
    }, [loadAllPosts]);

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchLevel = !filters.level || post.level === filters.level;
            const matchType = !filters.type || post.type === filters.type;
            const matchSearchTerm =
                !filters.searchTerm ||
                post.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                post.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
            const matchTags = !filters.tags?.length || filters.tags.some((tag) => post.tags.includes(tag));

            return matchLevel && matchType && matchSearchTerm && matchTags;
        });
    }, [posts, filters]);

    const stats: PostStats = useMemo(() => {
        // Fecha actual y hace un mes para calcular métricas de tiempo
        const now = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        // Inicializar contadores y acumuladores
        let totalViews = 0;
        let totalReadTime = 0;
        let totalWordCount = 0;

        let mostViewedPost: PostStats["mostViewedPost"] = undefined;
        let longestPost: PostStats["longestPost"] = undefined;

        const postsByLevel: Record<PostLevel, number> = {
            Principiante: 0,
            Intermedio: 0,
            Avanzado: 0,
        };

        const postsByType: Record<PostType, number> = {
            article: 0,
            tutorial: 0,
        };

        const postsByTag: Record<string, number> = {};
        const postsByAuthor: Record<string, number> = {};

        // Calcular posts de este mes y del mes anterior
        const postsThisMonth = posts.filter((post) => {
            const postDate = post.createdAt instanceof Date ? post.createdAt : new Date(post.createdAt);
            return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear();
        }).length;

        const postsLastMonth = posts.filter((post) => {
            const postDate = post.createdAt instanceof Date ? post.createdAt : new Date(post.createdAt);
            return postDate.getMonth() === lastMonth.getMonth() && postDate.getFullYear() === lastMonth.getFullYear();
        }).length;

        // Procesar cada post
        posts.forEach((post) => {
            // Contabilizar por nivel
            if (post.level) {
                postsByLevel[post.level] = (postsByLevel[post.level] || 0) + 1;
            }

            // Contabilizar por tipo
            if (post.type) {
                postsByType[post.type] = (postsByType[post.type] || 0) + 1;
            }

            // Contabilizar por tags
            post.tags?.forEach((tag) => {
                postsByTag[tag] = (postsByTag[tag] || 0) + 1;
            });

            // Contabilizar por autor
            if (post.authorId) {
                postsByAuthor[post.authorId] = (postsByAuthor[post.authorId] || 0) + 1;
            }

            // Acumular vistas
            if (post.views) {
                totalViews += post.views;

                // Verificar si es el post más visto
                if (!mostViewedPost || post.views > mostViewedPost.views) {
                    mostViewedPost = {
                        id: post.id,
                        title: post.title,
                        views: post.views,
                        slug: post.slug,
                    };
                }
            }

            // Acumular tiempo de lectura
            if (post.readTime) {
                totalReadTime += post.readTime;
            }

            // Acumular conteo de palabras
            if (post.wordCount) {
                totalWordCount += post.wordCount;

                // Verificar si es el post más largo
                if (!longestPost || post.wordCount > longestPost.wordCount) {
                    longestPost = {
                        id: post.id,
                        title: post.title,
                        wordCount: post.wordCount,
                        slug: post.slug,
                    };
                }
            }
        });

        // Encontrar el autor con más posts
        let topAuthor: PostStats["topAuthor"] = undefined;
        let topAuthorId: string | undefined;
        let topAuthorCount = 0;
        Object.entries(postsByAuthor).forEach(([authorId, count]) => {
            if (count > topAuthorCount) {
                topAuthorId = authorId;
                topAuthorCount = count;
            }
        });
        if (topAuthorId && topAuthorName) {
            topAuthor = {
                id: topAuthorId,
                name: topAuthorName,
                postCount: topAuthorCount,
            };
        }

        // Ordenar tags por popularidad
        const topTags = Object.entries(postsByTag)
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        // Calcular tasa de crecimiento
        const postsGrowthRate =
            postsLastMonth === 0
                ? postsThisMonth > 0
                    ? 100
                    : 0
                : ((postsThisMonth - postsLastMonth) / postsLastMonth) * 100;

        return {
            // Conteo básico
            totalPosts: posts.length,
            filteredPosts: filteredPosts.length,
            publishedPosts: posts.filter((p) => p.isPublished).length,
            draftPosts: posts.filter((p) => !p.isPublished).length,

            // Por nivel y tipo
            postsByLevel,
            postsByType,

            // Por etiquetas
            postsByTag,
            topTags,

            // Métricas de engagement
            totalViews,
            averageViews: posts.length ? Math.round(totalViews / posts.length) : 0,
            mostViewedPost,

            // Métricas de tiempo de lectura
            totalReadTime,
            averageReadTime: posts.length ? Math.round(totalReadTime / posts.length) : 0,

            // Métricas de contenido
            totalWordCount,
            averageWordCount: posts.length ? Math.round(totalWordCount / posts.length) : 0,
            longestPost,

            // Métricas de tiempo
            postsThisMonth,
            postsLastMonth,
            postsGrowthRate: Math.round(postsGrowthRate * 10) / 10, // Redondeado a 1 decimal

            // Métricas de autor
            postsByAuthor,
            topAuthor,
        };
    }, [posts, filteredPosts, topAuthorName]);

    // Fetch top author name lazily (1 read instead of N)
    useEffect(() => {
        if (!posts.length) return;
        const authorCounts: Record<string, number> = {};
        posts.forEach(p => {
            if (p.authorId) authorCounts[p.authorId] = (authorCounts[p.authorId] || 0) + 1;
        });
        const topId = Object.entries(authorCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
        if (!topId) return;
        getAuthor(topId).then(author => {
            if (author) setTopAuthorName(author.name);
        }).catch(() => {});
    }, [posts]);

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
        refetch: loadAllPosts,
    };
}
