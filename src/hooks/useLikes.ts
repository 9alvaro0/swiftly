// src/hooks/useLikes.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { hasUserLikedPost, togglePostLike } from "@/services/firebase/firestore/post";
import { Post } from "@/types/Post";
import { User } from "@/types/User";
import { saveUser } from "@/services/firebase/firestore/user";

interface UseLikesResult {
    isLiked: boolean;
    likesCount: number;
    isLoading: boolean;
    error: string | null;
    toggleLike: () => Promise<void>;
}

/**
 * Hook personalizado para manejar la lógica de likes en posts
 */
export function useLikes(post: Post, currentUser: User | null): UseLikesResult {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(Array.isArray(post.likedBy) ? post.likedBy.length : 0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const previousPostId = useRef(post.id);

    // Verificar si el usuario ha dado like al post
    const checkLikeStatus = useCallback(async () => {
        if (!currentUser) return;

        try {
            setIsLoading(true);
            setError(null);

            // Verificar directamente desde el post si está entre los likedBy
            if (post.likedBy && Array.isArray(post.likedBy)) {
                setIsLiked(post.likedBy.includes(currentUser.uid));
            } else {
                // Si no está en el post, consultamos a Firestore
                const liked = await hasUserLikedPost(post.id, currentUser.uid);
                setIsLiked(liked);
            }
        } catch (err) {
            console.error("Error al verificar estado de like:", err);
            setError("No se pudo verificar si te gusta este post");
        } finally {
            setIsLoading(false);
        }
    }, [currentUser, post]);

    // Comprobar estado inicial de like
    useEffect(() => {
        if (currentUser && post) {
            checkLikeStatus();
        }
    }, [checkLikeStatus, currentUser, post]);

    useEffect(() => {
        if (currentUser && post.id !== previousPostId.current) {
            previousPostId.current = post.id;
            checkLikeStatus();
        }
    }, [checkLikeStatus, currentUser, post]);

    // Función para dar/quitar like
    const toggleLike = async () => {
        if (!currentUser) {
            setError("Debes iniciar sesión para dar like");
            return;
        }

        const previousLikedState = isLiked;
        const previousLikesCount = likesCount;

        try {
            setIsLoading(true);
            setError(null);

            const newLikedState = !isLiked;
            setIsLiked(newLikedState);
            setLikesCount((prevCount) => (newLikedState ? prevCount + 1 : prevCount - 1));

            // Actualizar en Firestore el estado del post
            await togglePostLike(post.id, currentUser.uid, newLikedState);

            // Actualizar en Firestore el usuario con la referencia del post
            const updatedLikedPosts = newLikedState
                ? [...(currentUser.stats?.likes || []), post.id]
                : (currentUser.stats?.likes || []).filter((likedPostId) => likedPostId !== post.id);

            await saveUser({
                ...currentUser,
                stats: {
                    ...currentUser.stats,
                    likes: updatedLikedPosts,
                    viewsCount: currentUser.stats?.viewsCount ?? 0,
                },
            });
        } catch {
            setIsLiked(previousLikedState);
            setLikesCount(previousLikesCount);
            setError("No se pudo cambiar el estado del like");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLiked,
        likesCount,
        isLoading,
        error,
        toggleLike
    };
}
