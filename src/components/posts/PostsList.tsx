// src/components/posts/PostsList.tsx

import React from "react";
import { Post } from "@/types/Post";
import PostCard from "@/components/posts/PostCard";
import Pagination from "@/components/ui/Pagination";

interface PostsListProps {
    posts: Post[];
    currentPage: number;
    itemsPerPage: number;
    hasActiveFilters: boolean;
    onPageChange: (page: number) => void;
    onClearFilters: () => void;
}

const PostsList = ({
    posts,
    currentPage,
    itemsPerPage,
    hasActiveFilters,
    onPageChange,
    onClearFilters,
}: PostsListProps) => {
    // Calcular índices para paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

    if (currentPosts.length === 0) {
        return (
            <div className="text-center py-16 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <p className="text-text-secondary text-lg mb-4">No se encontraron artículos</p>
                {hasActiveFilters && (
                    <div className="mt-4">
                        <p className="text-gray-600 mb-4">Prueba con otros criterios de búsqueda</p>
                        <button
                            onClick={onClearFilters}
                            className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <>
            <div className="mb-4 text-text-secondary">
                Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, posts.length)} de {posts.length} tutoriales
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPosts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>

            {posts.length > 0 && (
                <div className="flex justify-center pt-12">
                    <Pagination
                        totalItems={posts.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </>
    );
};

export default PostsList;
