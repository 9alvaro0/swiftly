// src/components/posts/PostsListClient.tsx

"use client";

import PostCard from "@/components/posts/PostCard";
import PostCardList from "@/components/posts/PostCardList";
import Pagination from "@/components/ui/Pagination";
import { Post } from "@/types/Post";
import { ViewMode } from "./ViewToggle";
import { SortOption } from "./SortOptions";

interface PostsListClientProps {
    posts: Post[];
    searchTerm: string;
    currentPage: number;
    viewMode: ViewMode;
    sortBy: SortOption;
}

export default function PostsListClient({
    posts,
    searchTerm,
    currentPage,
    viewMode,
    sortBy,
}: PostsListClientProps) {
    const POSTS_PER_PAGE = 9;

    // Aplicar ordenamiento en el cliente
    let sortedPosts = [...posts];
    switch (sortBy) {
        case "popular":
            sortedPosts = sortedPosts.sort((a, b) => (b.views || 0) - (a.views || 0));
            break;
        case "alphabetical":
            sortedPosts = sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "recent":
        default:
            // Ya viene ordenado por fecha desde el servicio
            break;
    }

    const indexOfLastItem = currentPage * POSTS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - POSTS_PER_PAGE;
    const currentPosts = sortedPosts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

    if (currentPosts.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-text-secondary text-lg mb-4">No se encontraron artículos</p>
            </div>
        );
    }

    return (
        <>
            <div className="mb-4 text-text-secondary">
                Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedPosts.length)} de {sortedPosts.length} artículos
            </div>
            
            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {currentPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            searchTerm={searchTerm}
                        />
                    ))}
                </div>
            ) : (
                <div className="space-y-4 sm:space-y-6">
                    {currentPosts.map((post) => (
                        <PostCardList
                            key={post.id}
                            post={post}
                            searchTerm={searchTerm}
                        />
                    ))}
                </div>
            )}

            {sortedPosts.length > 0 && totalPages > 1 && (
                <div className="flex justify-center pt-12">
                    <Pagination
                        totalItems={sortedPosts.length}
                        itemsPerPage={POSTS_PER_PAGE}
                    />
                </div>
            )}
        </>
    );
}