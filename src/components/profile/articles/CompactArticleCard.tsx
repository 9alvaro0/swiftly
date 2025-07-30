'use client';

import { PostWithAuthor } from '@/types/Post';
import { BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/utils/dateUtils';

interface CompactArticleCardProps {
    post: PostWithAuthor;
}

export default function CompactArticleCard({ post }: CompactArticleCardProps) {
    return (
        <Link
            href={`/posts/${post.slug}`}
            className="group block"
        >
            <article className="bg-gray-800/50 hover:bg-gray-700/50 rounded-lg p-4 transition-all duration-200 border border-gray-700/50 hover:border-gray-600">
                <div className="flex gap-3">
                    {/* Imagen pequeña */}
                    <div className="flex-shrink-0">
                        {post.imageUrl ? (
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                />
                            </div>
                        ) : (
                            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-gray-400" />
                            </div>
                        )}
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors text-sm line-clamp-2 mb-1">
                            {post.title}
                        </h4>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                        </div>

                        {/* Tags compactos */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex gap-1 mt-2">
                                {post.tags.slice(0, 2).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-0.5 text-xs bg-gray-600/50 text-gray-300 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {post.tags.length > 2 && (
                                    <span className="text-xs text-gray-500 px-1">
                                        +{post.tags.length - 2}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
}