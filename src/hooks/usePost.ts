"use client";

import { useState, useEffect, useCallback } from "react";
import { PostWithAuthor } from "@/types/Post";
import { deletePost, getPostBySlugWithAuthor, createOrUpdatePost } from "@/services/firebase/firestore/post";
import { toast } from "sonner";

// Parámetros para el hook cuando se usa para administrar un post existente
interface UsePostAdminProps {
    postId?: string;
    initialPublishState?: boolean;
    onPostDeleted?: () => void;
    onPublishStateChange?: (isPublished: boolean) => void;
}

/**
 * Hook flexible para manejar posts:
 * - Si se pasa un 'slug': Carga los datos del post (lectura)
 * - Si se pasa un 'postId': Permite administración del post (publicar/eliminar)
 * - Si se pasan ambos: Funcionalidad completa
 */
export function usePost(slugOrProps: string | UsePostAdminProps) {
    // Determinar si se llamó con string (slug) o con objeto de propiedades
    const isSlugMode = typeof slugOrProps === "string";

    // Variables para el modo slug (lectura de post)
    const slug = isSlugMode ? slugOrProps : "";

    // Variables para el modo admin (gestión de post)
    const {
        postId,
        initialPublishState = false,
        onPostDeleted,
        onPublishStateChange,
    } = !isSlugMode ? slugOrProps : ({} as UsePostAdminProps);

    // Estados compartidos
    const [post, setPost] = useState<PostWithAuthor | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Estados específicos para administración
    const [isPublished, setIsPublished] = useState(initialPublishState);
    const [isActionInProgress, setIsActionInProgress] = useState(false);

    // Estados para el modal de confirmación
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Bandera para controlar si ya se ha intentado cargar el post
    const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);

    /**
     * Carga un post por su slug (modo lectura)
     */
    const loadPost = useCallback(async () => {
        if (!slug) {
            if (isSlugMode) {
                setError(new Error("Post slug is required"));
                setIsLoading(false);
            }
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const fetchedPost = await getPostBySlugWithAuthor(slug);
            setPost(fetchedPost);

            // Si estamos en modo combinado, actualizar el estado de publicación
            if (fetchedPost && !isSlugMode) {
                setIsPublished(fetchedPost.isPublished || false);
            }
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            console.error(`Error fetching post with slug ${slug}:`, err);
        } finally {
            setIsLoading(false);
            setHasAttemptedLoad(true);
        }
    }, [slug, isSlugMode]);

    useEffect(() => {
        // Solo cargar el post si:
        // 1. Estamos en modo slug (isSlugMode) y no se ha intentado cargar aún
        // 2. O si tenemos un slug pero no tenemos un post y no se ha intentado cargar
        if ((isSlugMode && !hasAttemptedLoad) || (slug && !post && !hasAttemptedLoad)) {
            loadPost();
        } else if (!isSlugMode && !slug) {
            // Si estamos en modo admin sin slug, solo establecer isLoading a false
            setIsLoading(false);
        }
    }, [loadPost, isSlugMode, slug, post, hasAttemptedLoad]);

    /**
     * Cambia el estado de publicación del post (modo admin)
     */
    const togglePublishStatus = async () => {
        if (!postId) {
            console.error("No postId provided for publish/unpublish action");
            return;
        }

        setIsActionInProgress(true);

        try {
            const newState = !isPublished;

            // Actualiza el post en Firestore
            await createOrUpdatePost(postId, {
                isPublished: newState,
                updatedAt: new Date(),
            });

            // Actualiza el estado local
            setIsPublished(newState);

            // Actualiza el post local si está cargado
            if (post) {
                setPost({
                    ...post,
                    isPublished: newState,
                    updatedAt: new Date(),
                });
            }

            // Notifica el cambio
            toast.success(`Post ${newState ? "publicado" : "movido a borradores"}`);

            // Callback opcional
            if (onPublishStateChange) {
                onPublishStateChange(newState);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Error al cambiar estado de publicación";
            setError(new Error(errorMessage));
            toast.error(errorMessage);
            console.error("Error al cambiar estado de publicación:", err);
        } finally {
            setIsActionInProgress(false);
        }
    };

    /**
     * Abre el modal para confirmar la eliminación
     */
    const confirmDeletePost = () => {
        setShowDeleteModal(true);
    };

    /**
     * Cierra el modal de confirmación
     */
    const cancelDeletePost = () => {
        setShowDeleteModal(false);
    };

    /**
     * Elimina el post después de la confirmación del usuario
     */
    const executeDeletePost = async () => {
        if (!postId) {
            console.error("No postId provided for delete action");
            return;
        }

        setIsActionInProgress(true);
        setShowDeleteModal(false);

        try {
            // Elimina el post de Firestore
            await deletePost(postId);

            // Notifica el éxito
            toast.success("Post eliminado correctamente");

            // Callback opcional
            if (onPostDeleted) {
                onPostDeleted();
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Error al eliminar el post";
            setError(new Error(errorMessage));
            toast.error(errorMessage);
            console.error("Error al eliminar el post:", err);
        } finally {
            setIsActionInProgress(false);
        }
    };

    /**
     * Recarga manualmente el post
     */
    const manualRefetch = useCallback(() => {
        setHasAttemptedLoad(false);
        loadPost();
    }, [loadPost]);

    return {
        // Props compartidas
        post,
        isLoading: isLoading || isActionInProgress,
        error,
        refetch: manualRefetch,

        // Props específicas para administración
        isPublished,
        togglePublishStatus,

        // Eliminación con modal
        confirmDeletePost,
        cancelDeletePost,
        executeDeletePost,
        showDeleteModal,

        isActionInProgress,
    };
}
