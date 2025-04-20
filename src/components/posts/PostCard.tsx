// src/components/posts/PostCard.tsx

import Link from "next/link";
import Image from "next/image";
import { Eye, Heart, ArrowRight } from "lucide-react";
import { Post } from "@/types/Post";

interface PostCardProps {
    post: Post;
    variant?: "default" | "featured";
}

export default function PostCard({ post, variant = "default" }: PostCardProps) {
    if (!post) return null;

    const isFeatured = variant === "featured";

    const getImageUrl = () => {
        if (post.imageUrl) return post.imageUrl;
        if (post.coverImage) return post.coverImage;
        return "/images/default-cover.jpg";
    };
    
    // Función segura para formatear fechas
    const formatDate = (date: Date | string | undefined) => {
        if (!date) return "Fecha no disponible";
        try {
            const dateObj = date instanceof Date ? date : new Date(date);
            return dateObj.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Fecha inválida";
        }
    };

    return (
        <Link
            href={`/posts/${post.slug}`}
            className={`group block h-full ${isFeatured ? "md:col-span-2 lg:col-span-3" : ""}`}
        >
            <article
                className={`
                    bg-white/5 backdrop-blur-sm border border-white/10 
                    rounded-xl overflow-hidden 
                    transition-all duration-300 
                    group-hover:translate-y-[-4px] group-hover:shadow-lg group-hover:shadow-blue-500/10 group-hover:border-blue-400/30
                    h-full
                `}
            >
                <div className="relative">
                    <div className={`relative w-full ${isFeatured ? "h-96" : "h-56"}`}>
                        {post.imageUrl || post.coverImage ? (
                            <Image
                                src={getImageUrl()}
                                alt={post.title || "Imagen del post"}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes={
                                    isFeatured
                                        ? "(max-width: 768px) 100vw, 100vw"
                                        : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                }
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-purple-900/40">
                                <span className="text-4xl text-white/70 font-bold">Swift</span>
                            </div>
                        )}

                        {/* Overlay gradient for better readability of badges */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                    </div>

                    {/* Level badge if exists */}
                    {post.level && (
                        <div className="absolute bottom-4 left-4">
                            <span className="inline-block bg-purple-600/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                                {post.level}
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-6">
                    {post.title && (
                        <h3
                            className={`font-bold mb-3 text-white ${
                                isFeatured ? "text-2xl" : "text-lg"
                            } line-clamp-2 group-hover:text-blue-400 transition-colors`}
                        >
                            {post.title}
                        </h3>
                    )}

                    <div className="flex items-center text-white/60 text-sm flex-wrap">
                        {post.createdAt && (
                            <time
                                dateTime={
                                    post.createdAt instanceof Date
                                        ? post.createdAt.toISOString()
                                        : String(post.createdAt)
                                }
                            >
                                {formatDate(post.createdAt)}
                            </time>
                        )}

                        {post.createdAt && post.readTime && <span className="mx-2">•</span>}

                        {post.readTime !== undefined && <span>{post.readTime} min lectura</span>}

                        {post.author && (
                            <>
                                <span className="mx-2">•</span>
                                <div className="flex items-center">
                                    {post.author.avatar ? (
                                        <Image
                                            src={
                                                post.author.avatar.startsWith("/")
                                                    ? post.author.avatar
                                                    : `/${post.author.avatar}`
                                            }
                                            alt={post.author.name || "Avatar del autor"}
                                            width={20}
                                            height={20}
                                            className="rounded-full border border-white/20 mr-1"
                                        />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center text-xs text-white mr-1">
                                            {post.author.name?.charAt(0) || "A"}
                                        </div>
                                    )}
                                    <span>{post.author.name || "Autor"}</span>
                                </div>
                            </>
                        )}
                    </div>

                    {post.description && (
                        <p className={`text-white/70 mt-4 ${isFeatured ? "text-base" : "text-sm"} line-clamp-3`}>
                            {post.description}
                        </p>
                    )}

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs bg-white/10 text-white/80 px-3 py-1 rounded-full hover:bg-white/15 transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                            {post.tags.length > 3 && (
                                <span className="text-xs text-white/50">+{post.tags.length - 3} más</span>
                            )}
                        </div>
                    )}

                    {(post.views !== undefined || post.likedBy?.length !== undefined) && (
                        <div className="flex gap-4 mt-4 text-sm text-white/60">
                            {post.views !== undefined && (
                                <span className="flex items-center">
                                    <Eye
                                        size={16}
                                        className="mr-1 text-blue-400/80"
                                    />
                                    {post.views}
                                </span>
                            )}

                            {post.likedBy?.length !== undefined && (
                                <span className="flex items-center">
                                    <Heart
                                        size={16}
                                        className="mr-1 text-blue-400/80"
                                    />
                                    {post.likedBy?.length}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="inline-flex items-center text-blue-400 group-hover:text-blue-300 font-semibold text-sm mt-4">
                        Leer artículo
                        <ArrowRight
                            size={16}
                            className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                        />
                    </div>
                </div>
            </article>
        </Link>
    );
}
