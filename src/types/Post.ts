// src/types/Post.ts

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
    category: PostCategory;
    tags: string[];
    level: PostLevel;
    type: PostType;

    // Multimedia
    imageUrl: string;
    images?: string[];
    coverImage?: string;

    // Información de lectura
    readTime?: number; // en minutos
    wordCount?: number;

    // Autor
    author: Author; 

    // SEO y discoverability
    keywords?: string[];
    metaDescription?: string;

    // Relaciones
    relatedPosts?: Pick<Post, "id" | "title" | "slug" | "imageUrl" | "category" | "description">[];

    // Interacción
    views?: number;
    likedBy?: string[];

    // Opciones adicionales
    language?: string;
}

// Interfaz para el autor
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

// Enums para tipos
export type PostCategory =
    | "Swift"
    | "SwiftUI"
    | "Xcode"
    | "iOS"
    | "macOS"
    | "Frameworks"
    | "visionOS"
    | "Arquitectura"
    | "Testing"
    | "watchOS";

export type PostLevel = "Principiante" | "Intermedio" | "Avanzado";

export type PostType = "article" | "tutorial";
