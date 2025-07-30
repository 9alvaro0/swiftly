'use client';

import { PostWithAuthor } from '@/types/Post';
import { Heart, Eye, ArrowRight, BookOpen } from 'lucide-react';
import CompactArticleCard from './CompactArticleCard';

interface ProfileArticlesSectionProps {
    type: 'liked' | 'viewed';
    posts: PostWithAuthor[];
    isLoading?: boolean;
}

export default function ProfileArticlesSection({ type, posts, isLoading }: ProfileArticlesSectionProps) {
    const config = {
        liked: {
            title: 'Artículos Favoritos',
            icon: Heart,
            color: 'text-red-400',
            emptyMessage: 'Aún no has marcado favoritos',
            emptySubtext: 'Los artículos que marques con ❤️ aparecerán aquí',
        },
        viewed: {
            title: 'Vistos Recientemente',
            icon: Eye,
            color: 'text-blue-400',
            emptyMessage: 'No hay lecturas recientes',
            emptySubtext: 'Los artículos que leas aparecerán aquí',
        }
    };

    const { title, icon: Icon, color, emptyMessage, emptySubtext } = config[type];
    const displayPosts = posts.slice(0, 3); // Solo mostrar 3

    if (isLoading) {
        return (
            <div className="space-y-4">
                {/* Header con loading */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${color}`} />
                        <h3 className="text-lg font-semibold text-white">{title}</h3>
                    </div>
                </div>

                {/* Loading cards */}
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                            <div className="flex gap-3">
                                <div className="w-12 h-12 bg-gray-600 rounded-lg animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-600 rounded animate-pulse w-3/4" />
                                    <div className="h-3 bg-gray-600 rounded animate-pulse w-1/2" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${color}`} />
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    {posts.length > 0 && (
                        <span className="text-sm text-gray-400">({posts.length})</span>
                    )}
                </div>
                
                {posts.length > 3 && (
                    <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors group">
                        Ver todos
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                )}
            </div>

            {/* Content */}
            {posts.length === 0 ? (
                <div className="text-center py-8 px-4">
                    <div className="inline-flex p-3 rounded-full bg-gray-700/50 mb-3">
                        <BookOpen className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-300 font-medium text-sm mb-1">{emptyMessage}</p>
                    <p className="text-gray-500 text-xs">{emptySubtext}</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {displayPosts.map((post) => (
                        <CompactArticleCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}