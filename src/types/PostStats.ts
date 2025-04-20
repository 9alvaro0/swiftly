import { PostLevel, PostType } from "./Post";

export interface PostStats {
    // Conteo básico
    totalPosts: number;
    filteredPosts: number;
    publishedPosts: number;
    draftPosts: number;

    // Por nivel de dificultad
    postsByLevel: Record<PostLevel, number>;

    // Por tipo de post
    postsByType: Record<PostType, number>;

    // Por etiquetas
    postsByTag: Record<string, number>;
    topTags: Array<{ tag: string; count: number }>;

    // Métricas de engagement
    totalViews: number;
    averageViews: number;
    mostViewedPost?: {
        id: string;
        title: string;
        views: number;
        slug: string;
    };

    // Métricas de tiempo
    averageReadTime: number;
    totalReadTime: number;

    // Métricas de contenido
    averageWordCount: number;
    totalWordCount: number;
    longestPost?: {
        id: string;
        title: string;
        wordCount: number;
        slug: string;
    };

    // Métricas de tiempo
    postsThisMonth: number;
    postsLastMonth: number;
    postsGrowthRate: number;

    // Métricas de autor
    postsByAuthor: Record<string, number>;
    topAuthor?: {
        id: string;
        name: string;
        postCount: number;
    };
}
