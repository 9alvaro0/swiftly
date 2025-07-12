// src/components/tutorials/TutorialCardList.tsx

import Link from "next/link";
import Image from "next/image";
import { Eye, Heart } from "lucide-react";
import { Post } from "@/types/Post";
import HighlightText from "@/components/ui/HighlightText";

interface TutorialCardListProps {
    tutorial: Post;
    searchTerm?: string;
}

export default function TutorialCardList({ tutorial, searchTerm = "" }: TutorialCardListProps) {
    if (!tutorial) return null;

    return (
        <Link href={`/tutorials/${tutorial.slug}`} className="group block">
            <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-blue-400/30 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                <div className="flex">
                    {/* Imagen */}
                    <div className="relative w-48 h-32 flex-shrink-0">
                        {(tutorial.imageUrl || tutorial.coverImage) ? (
                            <Image
                                src={tutorial.imageUrl || tutorial.coverImage || ""}
                                alt={tutorial.title || "Imagen del tutorial"}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 192px"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                                <span className="text-white/60 text-xs font-medium">
                                    Sin imagen
                                </span>
                            </div>
                        )}
                        
                        {tutorial.level && (
                            <div className="absolute top-2 left-2">
                                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                    {tutorial.level}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 p-6">
                        <div className="flex flex-col h-full">
                            {/* Título */}
                            {tutorial.title && (
                                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                                    <HighlightText text={tutorial.title} searchTerm={searchTerm} />
                                </h3>
                            )}

                            {/* Descripción */}
                            {tutorial.description && (
                                <p className="text-white/70 text-sm mb-4 line-clamp-2 flex-1">
                                    <HighlightText text={tutorial.description} searchTerm={searchTerm} />
                                </p>
                            )}

                            <div className="mt-auto">
                                {/* Tags */}
                                {tutorial.tags && tutorial.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {tutorial.tags.slice(0, 4).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full hover:bg-white/15 transition-colors"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                        {tutorial.tags.length > 4 && (
                                            <span className="text-xs text-white/50">+{tutorial.tags.length - 4} más</span>
                                        )}
                                    </div>
                                )}

                                {/* Stats */}
                                {(tutorial.views !== undefined || tutorial.likedBy?.length !== undefined) && (
                                    <div className="flex gap-4 text-sm text-white/60">
                                        {tutorial.views !== undefined && (
                                            <span className="flex items-center">
                                                <Eye size={16} className="mr-1 text-purple-400/80" />
                                                {tutorial.views}
                                            </span>
                                        )}

                                        {tutorial.likedBy?.length !== undefined && (
                                            <span className="flex items-center">
                                                <Heart size={16} className="mr-1 text-red-400/80" />
                                                {tutorial.likedBy.length}
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