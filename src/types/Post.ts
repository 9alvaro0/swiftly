// src/types/Post.ts

/**
 * Tipos relacionados con publicaciones del blog
 */

export interface Post {
    // Identificadores
    id: string;
    slug: string;

    // Contenido principal
    title: string;
    description: string;
    content: string;

    // Metadatos de publicación
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    isPublished: boolean;

    // Categorización
    tags: string[];
    level: PostLevel;
    type: PostType;

    // Multimedia
    imageUrl: string;
    images?: string[];
    coverImage?: string;

    // Información de lectura
    readTime?: number;
    wordCount?: number;

    // Autor
    author: Author;

    // SEO
    keywords?: string[];
    metaDescription?: string;

    // Relaciones
    relatedPosts?: RelatedPost[];

    // Interacción
    views?: number;
    likedBy?: string[];
}

/**
 * Tipo relacionado con el autor de la publicación
 */
export interface Author {
    id: string;
    name: string;
    username?: string;
    avatar?: string;
    bio?: string;
    socialLinks?: {
        twitter?: string;
        github?: string;
        linkedin?: string;
    };
}

/**
 * Tipo relacionado con las publicaciones relacionadas
 */
export type RelatedPost = Pick<Post, "id" | "title" | "slug" | "imageUrl" | "description">;

/**
 * Tipos relacionados con el nivel de las publicaciones
 */
export type PostLevel = "Principiante" | "Intermedio" | "Avanzado";

/**
 * Tipos relacionados con el formato de las publicaciones
 */
export type PostType = "article" | "tutorial";
