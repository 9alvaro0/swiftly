// src/components/home/LatestBlogPosts.tsx
"use client";

import { useState } from "react";
import PostGrid from "@/components/posts/PostGrid";
import { Post } from "@/types/Post";
import Pagination from "../ui/Pagination";
import { getAllPosts } from "@/services/postService";

export default function LatestBlogPosts() {
    // Obtener posts desde el servicio
    const posts = getAllPosts();

    // Estados para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const POSTS_PER_PAGE = 6;

    // Lógica de paginación
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Función para cambiar de página
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Últimas publicaciones</h2>
                <a
                    href="/posts"
                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                >
                    Ver todos los artículos
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
            </div>

            {/* Grid de posts con solo los posts de la página actual */}
            <PostGrid posts={currentPosts} />

            {/* Componente de Paginación */}
            <div className="mt-8">
                <Pagination
                    totalItems={posts.length}
                    itemsPerPage={POSTS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </section>
    );
}
