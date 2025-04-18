// src/components/post/LikeButton.tsx
"use client";

import { Heart } from 'lucide-react';
import { Post } from '@/types/Post';
import { User } from '@/types/User';
import { useLikes } from '@/hooks/useLikes';
import { useState, useRef, useEffect } from 'react';
import LikeAnimation from './LikeAnimation';

interface LikeButtonProps {
  post: Post;
  currentUser: User | null;
  className?: string;
}

export default function LikeButton({ post, currentUser, className = "" }: LikeButtonProps) {
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [hasLikeChanged, setHasLikeChanged] = useState(false);
  const previousLikedState = useRef(false);
  
  // Utilizamos el hook personalizado para gestionar la lógica de likes
  const { isLiked, likesCount, isLoading, error, toggleLike } = useLikes(post, currentUser);
  
  useEffect(() => {
    if (previousLikedState.current !== isLiked) {
      setHasLikeChanged(true);
      const timer = setTimeout(() => setHasLikeChanged(false), 1200);
      return () => clearTimeout(timer);
    }
    previousLikedState.current = isLiked;
  }, [isLiked]);

  const handleLikeClick = async () => {
    if (!currentUser) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000);
      return;
    }

    await toggleLike();
  };

  return (
    <div className="relative flex items-center">
      <button 
        onClick={handleLikeClick}
        disabled={isLoading}
        className={`flex items-center gap-1 focus:outline-none transition-colors ${
          isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
        } ${className}`}
        aria-label={isLiked ? "Quitar like" : "Dar like"}
        title={isLiked ? "Quitar like" : "Dar like"}
      >
        <div className="relative">
          <Heart 
            size={20} 
            className={`${isLiked ? 'fill-red-500' : 'fill-none'} transition-all ${
              isLoading ? 'animate-pulse' : ''
            }`} 
          />
          <LikeAnimation isLiked={isLiked} hasChanged={hasLikeChanged} />
        </div>
        
        {likesCount > 0 && (
          <span className="text-sm font-medium">{likesCount}</span>
        )}
      </button>
      
      {/* Indicador de tendencia si el post tiene muchos likes */}
      {likesCount > 10 && (
        <span className="ml-2 text-xs bg-gradient-to-r from-orange-400 to-red-500 text-white px-1.5 py-0.5 rounded-sm">
          Trending
        </span>
      )}
      
      {/* Mensaje de error/login */}
      {(error || showLoginMessage) && (
        <div className="absolute -bottom-10 left-0 z-10 bg-black/80 text-white text-xs p-2 rounded shadow-lg whitespace-nowrap">
          {error || "Inicia sesión para dar like"}
        </div>
      )}
    </div>
  );
}
