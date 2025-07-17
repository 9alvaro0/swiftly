// src/types/Comment.ts

/**
 * Tipos relacionados con comentarios del blog
 */

export interface Comment {
    // Identificadores
    id: string;
    postId: string;
    parentId?: string; // Para comentarios anidados (respuestas)

    // Contenido
    content: string;
    
    // Autor
    author: CommentAuthor;
    
    // Metadatos
    createdAt: Date;
    updatedAt: Date;
    isEdited: boolean;
    
    // Moderación
    isApproved: boolean;
    isDeleted: boolean;
    
    // Interacción
    likes: number;
    likedBy: string[];
    
    // Respuestas (para comentarios anidados)
    replies?: Comment[];
    replyCount: number;
}

/**
 * Autor de comentario (simplificado del User)
 */
export interface CommentAuthor {
    id: string;
    name: string;
    username?: string;
    avatar?: string | null;
}

/**
 * Datos para crear un nuevo comentario
 */
export interface CreateCommentData {
    postId: string;
    content: string;
    parentId?: string;
}

