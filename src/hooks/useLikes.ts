// src/hooks/useLikes.ts
import { useState, useEffect, useCallback } from "react";
import { togglePostLike } from "@/services/firebase/firestore/post";
import { PostWithAuthor } from "@/types/Post";
import { User } from "@/types/User";
import { incrementUserStat, removeUserStat } from "@/services/firebase/firestore/user";

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
export function useLikes(post: PostWithAuthor, currentUser: User | null): UseLikesResult {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(Array.isArray(post.likedBy) ? post.likedBy.length : 0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // Verificar estado de like desde los datos del post (sin read adicional)
    useEffect(() => {
        if (!currentUser) return;
        const liked = Array.isArray(post.likedBy) && post.likedBy.includes(currentUser.uid);
        setIsLiked(liked);
    }, [currentUser?.uid, post.id, post.likedBy]);

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

            // Actualizar atomicamente la estadística de likes del usuario
            if (newLikedState) {
                await incrementUserStat(currentUser.uid, 'likes', post.id);
            } else {
                await removeUserStat(currentUser.uid, 'likes', post.id);
            }
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
