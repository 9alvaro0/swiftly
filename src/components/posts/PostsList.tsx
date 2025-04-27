// src/components/posts/PostsList.tsx

import React from "react";
import PostCard from "@/components/posts/PostCard";
import Pagination from "@/components/ui/Pagination";
import { getAllPublishedPosts } from "@/services/firebase/firestore/post";

export default async function PostsList({
    searchTerm,
    level,
    currentPage,
}: {
    searchTerm: string;
    level: string;
    currentPage: number;
}) {
    const POSTS_PER_PAGE = 9;

    const posts = await getAllPublishedPosts({ searchTerm, level, type: "article" });

    const indexOfLastItem = currentPage * POSTS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - POSTS_PER_PAGE;
    const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

    if (currentPosts.length === 0) {
        return (
            <div className="text-center py-16 ">
                <p className="text-text-secondary text-lg mb-4">No se encontraron artículos</p>
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
                        itemsPerPage={POSTS_PER_PAGE}
                    />
                </div>
            )}
        </>
    );
}
