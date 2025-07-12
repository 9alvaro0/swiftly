// src/components/posts/PostCardList.tsx

import Link from "next/link";
import Image from "next/image";
import { Eye, Heart } from "lucide-react";
import { Post } from "@/types/Post";
import HighlightText from "@/components/ui/HighlightText";

interface PostCardListProps {
    post: Post;
    searchTerm?: string;
}

export default function PostCardList({ post, searchTerm = "" }: PostCardListProps) {
    if (!post) return null;

    return (
        <Link href={`/posts/${post.slug}`} className="group block">
            <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-blue-400/30 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                <div className="flex">
                    {/* Imagen */}
                    <div className="relative w-48 h-32 flex-shrink-0">
                        {(post.imageUrl || post.coverImage) ? (
                            <Image
                                src={post.imageUrl || post.coverImage || ""}
                                alt={post.title || "Imagen del post"}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 192px"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                                <span className="text-white/60 text-xs font-medium">
                                    Sin imagen
                                </span>
                            </div>
                        )}
                        
                        {post.level && (
                            <div className="absolute top-2 left-2">
                                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                    {post.level}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 p-6">
                        <div className="flex flex-col h-full">
                            {/* Título */}
                            {post.title && (
                                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                    <HighlightText text={post.title} searchTerm={searchTerm} />
                                </h3>
                            )}

                            {/* Descripción */}
                            {post.description && (
                                <p className="text-white/70 text-sm mb-4 line-clamp-2 flex-1">
                                    <HighlightText text={post.description} searchTerm={searchTerm} />
                                </p>
                            )}

                            <div className="mt-auto">
                                {/* Tags */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {post.tags.slice(0, 4).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full hover:bg-white/15 transition-colors"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                        {post.tags.length > 4 && (
                                            <span className="text-xs text-white/50">+{post.tags.length - 4} más</span>
                                        )}
                                    </div>
                                )}

                                {/* Stats */}
                                {(post.views !== undefined || post.likedBy?.length !== undefined) && (
                                    <div className="flex gap-4 text-sm text-white/60">
                                        {post.views !== undefined && (
                                            <span className="flex items-center">
                                                <Eye size={16} className="mr-1 text-blue-400/80" />
                                                {post.views}
                                            </span>
                                        )}

                                        {post.likedBy?.length !== undefined && (
                                            <span className="flex items-center">
                                                <Heart size={16} className="mr-1 text-red-400/80" />
                                                {post.likedBy.length}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}