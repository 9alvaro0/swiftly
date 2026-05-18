// src/components/posts/PostCard.tsx

import Link from "next/link";
import Image from "next/image";
import { Eye, Heart } from "lucide-react";
import { Post } from "@/types/Post";
import HighlightText from "@/components/ui/HighlightText";

interface PostCardProps {
    post: Post;
    variant?: "default" | "featured";
    searchTerm?: string;
}

export default function PostCard({ post, variant = "default", searchTerm = "" }: PostCardProps) {
    if (!post) return null;

    const isFeatured = variant === "featured";

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
                    h-full flex flex-col
                `}
            >
                <div className="relative">
                    <div className={`relative w-full ${isFeatured ? "h-96" : "h-48"}`}>
                        {post.imageUrl || post.coverImage ? (
                            <Image
                                src={post.imageUrl}
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
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                    {post.title && (
                        <h3
                            className={`group-hover:underline font-bold mb-3 text-white ${
                                isFeatured ? "text-2xl" : "text-lg"
                            } line-clamp-2 group-hover:text-blue-400 transition-colors`}
                        >
                            <HighlightText text={post.title} searchTerm={searchTerm} />
                        </h3>
                    )}

                    {post.description && (
                        <p className={`text-white/70 mt-4 ${isFeatured ? "text-base" : "text-sm"} line-clamp-3`}>
                            <HighlightText text={post.description} searchTerm={searchTerm} />
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
                        <div className="flex gap-4 mt-auto pt-4 text-sm text-white/60">
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
                </div>
            </article>
        </Link>
    );
}
