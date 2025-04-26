// src/components/post/LikeButton.tsx

"use client";

import { Heart } from "lucide-react";
import { Post } from "@/types/Post";
import { User } from "@/types/User";
import { useLikes } from "@/hooks/useLikes";
import { toast } from "sonner";
import { useEffect } from "react";

interface LikeButtonProps {
    post: Post;
    currentUser: User | null;
    className?: string;
}

export default function LikeButton({ post, currentUser, className = "" }: LikeButtonProps) {
    const { isLiked, likesCount, isLoading, error, toggleLike } = useLikes(post, currentUser);

    useEffect(() => {
        if (error) {
            toast.error(`Error: ${error}`, {
                description: "No se pudo procesar tu reacción. Inténtalo de nuevo.",
                duration: 4000,
            });
        }
    }, [error]);

    const handleLikeClick = async () => {
        if (!currentUser) {
            toast.info("Inicia sesión para dar like");
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
                    isLiked ? "text-red-500" : "text-gray-400 hover:text-red-400"
                } ${className}`}
                aria-label={isLiked ? "Quitar like" : "Dar like"}
                title={isLiked ? "Quitar like" : "Dar like"}
            >
                <div className="relative">
                    <Heart
                        size={20}
                        className={`${isLiked ? "fill-red-500" : "fill-none"} transition-all ${
                            isLoading ? "animate-pulse" : ""
                        }`}
                    />
                </div>

                {likesCount > 0 && <span className="text-sm font-medium">{likesCount}</span>}
            </button>

            {/* Indicador de tendencia si el post tiene muchos likes */}
            {likesCount > 10 && (
                <span className="ml-2 text-xs bg-gradient-to-r from-orange-400 to-red-500 text-white px-1.5 py-0.5 rounded-sm">
                    Trending
                </span>
            )}
        </div>
    );
}
