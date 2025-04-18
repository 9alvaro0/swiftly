// src/components/post/LikeButton.tsx
"use client";

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Post } from '@/types/Post';
import { User } from '@/types/User';
import { togglePostLike } from '@/firebase/firestore/post';

interface LikeButtonProps {
  post: Post;
  currentUser: User | null;
}

export default function LikeButton({ post, currentUser }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [isLoading, setIsLoading] = useState(false);

  // Verificar si el usuario actual ha dado like al post
  useEffect(() => {
    if (currentUser && post.likedBy) {
      setIsLiked(post.likedBy.includes(currentUser.uid));
    }
  }, [currentUser, post.likedBy]);

  const handleLikeToggle = async () => {
    if (!currentUser) {
      // Mostrar diálogo de login o redireccionar si no hay usuario
      alert('Debes iniciar sesión para dar like a un post');
      return;
    }

    setIsLoading(true);
    
    try {
      // Este es el nuevo valor de "me gusta" (antes de la actualización en la BD)
      const newLikedState = !isLiked;
      
      // Actualizar optimistamente la UI
      setIsLiked(newLikedState);
      setLikesCount(prevCount => newLikedState ? prevCount + 1 : prevCount - 1);
      
      // Llamar al servicio para actualizar en Firestore
      await togglePostLike(post.id, currentUser.uid, newLikedState);
    } catch (error) {
      console.error('Error al actualizar like:', error);
      
      // Revertir cambios en caso de error
      setIsLiked(!isLiked);
      setLikesCount(post.likes || 0);
      
      alert('No se pudo procesar tu like. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLikeToggle}
      disabled={isLoading}
      className={`flex items-center gap-1 focus:outline-none transition-colors ${
        isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
      }`}
      aria-label={isLiked ? "Quitar like" : "Dar like"}
    >
      <Heart 
        size={20} 
        className={`${isLiked ? 'fill-red-500' : 'fill-none'} transition-all ${
          isLoading ? 'animate-pulse' : ''
        }`} 
      />
      <span className="text-sm font-medium">
        {likesCount > 0 ? likesCount : ''}
      </span>
    </button>
  );
}
