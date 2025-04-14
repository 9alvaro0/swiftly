// src/components/home/LatestBlogPosts.tsx

"use client";

import { useState } from "react";
import PostGrid from "@/components/posts/PostGrid";
import Pagination from "../ui/Pagination";
import { useArticles } from "@/hooks/usePosts";
import LatestBlogPostsSkeleton from "./skeletons/LatestBlogPostsSkeleton";
import SectionHeader from "../ui/SectionHeader";

export default function LatestBlogPosts() {
    // Obtener posts desde el servicio
    const { posts: articles, isLoading, error } = useArticles();

    // Estados para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const POSTS_PER_PAGE = 6;

    // Lógica de paginación
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);

    // Función para cambiar de página
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return (
            <section className="container mx-auto px-4 py-12">
                <div className="container mx-auto px-4">
                    <LatestBlogPostsSkeleton />
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="container mx-auto px-4 py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center py-12 text-red-500">Error al cargar los posts: {error.message}</div>
                </div>
            </section>
        );
    }

    return (
        <section className="container mx-auto px-4 py-12">
            <SectionHeader title="Últimas publicaciones" link="/posts" />

            <PostGrid posts={currentPosts} />

            <div className="mt-8">
                <Pagination
                    totalItems={articles.length}
                    itemsPerPage={POSTS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </section>
    );
}
