"use client";

import Image from "next/image";
import { Clock, Calendar, BookOpen } from "lucide-react";
import type { Post } from "@/types/Post";
import LikeButton from "./LikeButton";
import { useAuthStore } from "@/store/authStore";

type PostHeaderProps = {
    post: Post;
};

export default function PostHeader({ post }: PostHeaderProps) {
    const { user } = useAuthStore()
    
    // Función para formatear la fecha
    const formatDate = (date: string | Date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="mb-8">
            {/* Categoría y nivel */}
            <div className="flex flex-wrap items-center gap-2 text-sm mb-4">
                {post.category && (
                    <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                    </span>
                )}
                {post.level && (
                    <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {post.level}
                    </span>
                )}
                {post.type && (
                    <span className="inline-block bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {post.type}
                    </span>
                )}
            </div>

            {/* Título y descripción */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">{post.title}</h1>

            <p className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed">{post.description}</p>

            {/* Metadatos básicos */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">
                    <Calendar
                        size={16}
                        className="text-blue-400"
                    />
                    <time dateTime={new Date(post.createdAt).toISOString()}>{formatDate(post.createdAt)}</time>
                </div>

                <div className="flex items-center gap-2">
                    <Clock
                        size={16}
                        className="text-blue-400"
                    />
                    <span>{post.readTime || 10} min de lectura</span>
                </div>

                {post.views !== undefined && (
                    <div className="flex items-center gap-2">
                        <BookOpen
                            size={16}
                            className="text-blue-400"
                        />
                        <span>{post.views.toLocaleString()} lecturas</span>
                    </div>
                )}

                {/* Botón de Like */}
                <div className="flex items-center gap-2">
                    <LikeButton post={post} currentUser={user} />
                </div>

                {/* Avatar y nombre del autor simplificados */}
                {post.author && (
                    <div className="flex items-center gap-2 ml-auto">
                        {post.author.avatar && (
                            <Image
                                src={post.author.avatar}
                                alt={post.author.name || "Autor"}
                                width={24}
                                height={24}
                                className="rounded-full"
                            />
                        )}
                        <span className="font-medium">{post.author.name || "Autor"}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
