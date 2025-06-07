// src/hooks/useComments.ts

import { useState, useEffect, useCallback } from "react";
import { Comment, CreateCommentData, CommentAuthor } from "@/types/Comment";
import { 
    createComment, 
    getPostComments, 
    updateComment, 
    deleteComment, 
    toggleCommentLike 
} from "@/services/firebase/firestore/comments";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

/**
 * Hook para gestionar comentarios de un post
 */
export function useComments(postId: string) {
    const { user, isAuthenticated } = useAuthStore();
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // Cargar comentarios del post
    const loadComments = useCallback(async () => {
        if (!postId) {
            return;
        }
        
        try {
            setLoading(true);
            setError(null);
            const postComments = await getPostComments(postId, true);
            setComments(postComments);
        } catch (err) {
            console.error("Error loading comments:", err);
            setError("Error al cargar los comentarios");
        } finally {
            setLoading(false);
        }
    }, [postId]);

    // Cargar comentarios al montar el componente
    useEffect(() => {
        loadComments();
    }, [loadComments]);

    // Crear nuevo comentario
    const addComment = async (content: string, parentId?: string): Promise<boolean> => {
        if (!isAuthenticated || !user) {
            toast.error("Debes iniciar sesión para comentar");
            return false;
        }

        if (!content.trim()) {
            toast.error("El comentario no puede estar vacío");
            return false;
        }

        try {
            setSubmitting(true);
            
            const commentAuthor: CommentAuthor = {
                id: user.uid,
                name: user.name || "Usuario",
                ...(user.username && { username: user.username }),
                ...(user.photoURL && { avatar: user.photoURL }),
            };

            const commentData: CreateCommentData = {
                postId,
                content: content.trim(),
                parentId,
            };

            await createComment(commentData, commentAuthor);
            
            // Recargar comentarios para mostrar el nuevo
            await loadComments();
            
            toast.success(parentId ? "Respuesta publicada" : "Comentario publicado");
            return true;
        } catch (err) {
            console.error("Error adding comment:", err);
            const errorMessage = err instanceof Error ? err.message : "Error al publicar comentario";
            toast.error(errorMessage);
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    // Editar comentario
    const editComment = async (commentId: string, newContent: string): Promise<boolean> => {
        if (!isAuthenticated || !user) {
            toast.error("No tienes permisos para editar");
            return false;
        }

        if (!newContent.trim()) {
            toast.error("El comentario no puede estar vacío");
            return false;
        }

        try {
            await updateComment(commentId, newContent.trim(), user.uid);
            await loadComments(); // Recargar para mostrar cambios
            toast.success("Comentario actualizado");
            return true;
        } catch (err) {
            console.error("Error editing comment:", err);
            const errorMessage = err instanceof Error ? err.message : "Error al editar comentario";
            toast.error(errorMessage);
            return false;
        }
    };

    // Eliminar comentario
    const removeComment = async (commentId: string): Promise<boolean> => {
        if (!isAuthenticated || !user) {
            toast.error("No tienes permisos para eliminar");
            return false;
        }

        try {
            await deleteComment(commentId, user.uid);
            await loadComments(); // Recargar para mostrar cambios
            toast.success("Comentario eliminado");
            return true;
        } catch (err) {
            console.error("Error deleting comment:", err);
            const errorMessage = err instanceof Error ? err.message : "Error al eliminar comentario";
            toast.error(errorMessage);
            return false;
        }
    };

    // Toggle like en comentario
    const likeComment = async (commentId: string): Promise<void> => {
        if (!isAuthenticated || !user) {
            toast.error("Debes iniciar sesión para dar like");
            return;
        }

        try {
            const result = await toggleCommentLike(commentId, user.uid);
            
            // Actualizar el comentario específico en el estado local
            setComments(prevComments => 
                updateCommentInTree(prevComments, commentId, {
                    likes: result.likes,
                    likedBy: result.isLiked 
                        ? [...(getCommentFromTree(prevComments, commentId)?.likedBy || []), user.uid]
                        : (getCommentFromTree(prevComments, commentId)?.likedBy || []).filter(id => id !== user.uid)
                })
            );
        } catch (err) {
            console.error("Error liking comment:", err);
            toast.error("Error al dar like");
        }
    };

    // Obtener el conteo total de comentarios
    const getTotalComments = (): number => {
        return countCommentsInTree(comments);
    };

    return {
        comments,
        loading,
        error,
        submitting,
        totalComments: getTotalComments(),
        addComment,
        editComment,
        removeComment,
        likeComment,
        refetch: loadComments,
    };
}

/**
 * Utilidades para manejar la estructura de árbol de comentarios
 */

// Actualizar un comentario específico en el árbol
function updateCommentInTree(comments: Comment[], commentId: string, updates: Partial<Comment>): Comment[] {
    return comments.map(comment => {
        if (comment.id === commentId) {
            return { ...comment, ...updates };
        }
        if (comment.replies && comment.replies.length > 0) {
            return {
                ...comment,
                replies: updateCommentInTree(comment.replies, commentId, updates)
            };
        }
        return comment;
    });
}

// Buscar un comentario específico en el árbol
function getCommentFromTree(comments: Comment[], commentId: string): Comment | null {
    for (const comment of comments) {
        if (comment.id === commentId) {
            return comment;
        }
        if (comment.replies && comment.replies.length > 0) {
            const found = getCommentFromTree(comment.replies, commentId);
            if (found) return found;
        }
    }
    return null;
}

// Contar comentarios totales incluyendo respuestas
function countCommentsInTree(comments: Comment[]): number {
    let count = 0;
    for (const comment of comments) {
        count += 1;
        if (comment.replies && comment.replies.length > 0) {
            count += countCommentsInTree(comment.replies);
        }
    }
    return count;
}