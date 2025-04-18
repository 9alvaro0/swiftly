// src/components/post/LikeButton.tsx
"use client";

import { Heart } from 'lucide-react';
import { Post } from '@/types/Post';
import { User } from '@/types/User';
import { useLikes } from '@/hooks/useLikes';
import { useState } from 'react';

interface LikeButtonProps {
  post: Post;
  currentUser: User | null;
  className?: string;
}

export default function LikeButton({ post, currentUser, className = "" }: LikeButtonProps) {
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  
  // Utilizamos el hook personalizado para gestionar la lógica de likes
  const { isLiked, likesCount, isLoading, error, toggleLike } = useLikes(post, currentUser);

  const handleLikeClick = async () => {
    if (!currentUser) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000);
      return;
    }

    await toggleLike();
  };

  return (
    <div className="relative">
      <button 
        onClick={handleLikeClick}
        disabled={isLoading}
        className={`flex items-center gap-1 focus:outline-none transition-colors ${
          isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
        } ${className}`}
        aria-label={isLiked ? "Quitar like" : "Dar like"}
        title={isLiked ? "Quitar like" : "Dar like"}
      >
        <Heart 
          size={20} 
          className={`${isLiked ? 'fill-red-500' : 'fill-none'} transition-all ${
            isLoading ? 'animate-pulse' : ''
          }`} 
        />
        {likesCount > 0 && (
          <span className="text-sm font-medium">{likesCount}</span>
        )}
      </button>
      
      {/* Mensaje de error/login */}
      {(error || showLoginMessage) && (
        <div className="absolute -bottom-10 left-0 z-10 bg-black/80 text-white text-xs p-2 rounded shadow-lg whitespace-nowrap">
          {error || "Inicia sesión para dar like"}
        </div>
      )}
    </div>
  );
}
