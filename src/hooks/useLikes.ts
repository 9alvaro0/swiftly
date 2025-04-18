// src/hooks/useLikes.ts
import { useState, useEffect } from 'react';
import { hasUserLikedPost, togglePostLike } from '@/firebase/firestore/post';
import { Post } from '@/types/Post';
import { User } from '@/types/User';

interface UseLikesResult {
  isLiked: boolean;
  likesCount: number;
  isLoading: boolean;
  error: string | null;
  toggleLike: () => Promise<void>;
  checkLikeStatus: () => Promise<void>;
}

/**
 * Hook personalizado para manejar la lógica de likes en posts
 */
export function useLikes(post: Post, currentUser: User | null): UseLikesResult {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Comprobar estado inicial de like
  useEffect(() => {
    if (currentUser && post) {
      checkLikeStatus();
    }
  }, [currentUser, post.id]);

  // Verificar si el usuario ha dado like al post
  const checkLikeStatus = async () => {
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
      console.error('Error al verificar estado de like:', err);
      setError('No se pudo verificar si te gusta este post');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para dar/quitar like
  const toggleLike = async () => {
    if (!currentUser) {
      setError('Debes iniciar sesión para dar like');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Actualizar optimistamente la UI
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      setLikesCount(prevCount => newLikedState ? prevCount + 1 : prevCount - 1);
      
      // Actualizar en Firestore
      await togglePostLike(post.id, currentUser.uid, newLikedState);
    } catch (err) {
      console.error('Error al cambiar estado de like:', err);
      
      // Revertir cambios en caso de error
      setIsLiked(!isLiked);
      setLikesCount(post.likes || 0);
      setError('No se pudo procesar tu like');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLiked,
    likesCount,
    isLoading,
    error,
    toggleLike,
    checkLikeStatus
  };
}
