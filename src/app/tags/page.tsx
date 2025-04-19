"use client";

import { useState } from "react";
import Link from "next/link";
import { useTags } from "@/hooks/useTags";
import { Tag } from "@/types/Tag";

export default function TagsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const { filteredTags, stats, isLoading, error, updateFilters, resetFilters } = useTags();

    // Aplicar filtros
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        updateFilters({ searchTerm: query });
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("");
        resetFilters();
    };

    const hasActiveFilters = Boolean(searchQuery || selectedCategory);

    if (isLoading) {
        return <TagsSkeleton />;
    }

    if (error) {
        return (
            <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-10 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <svg
                            className="w-16 h-16 text-red-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                            Error al cargar los tags
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md">{error.message}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="space-y-6 mb-10">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-3">Explora Tags</h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Navega por nuestros tags para encontrar exactamente lo que estás buscando. Tenemos {stats.total}{" "}
                        tags en nuestra colección.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Buscar tags..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <svg
                                className="absolute left-3 top-3.5 w-4 h-4 text-gray-500 dark:text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        <div className="flex flex-wrap gap-3 w-full md:w-auto">
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                    Limpiar filtros
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {filteredTags.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                            {filteredTags.length} tags encontrados
                        </h2>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 hover:underline"
                            >
                                <span>Limpiar filtros</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredTags.map((tag: Tag) => (
                            <Link
                                key={tag.id}
                                href={`/tags/${tag.name}`}
                                className="group"
                            >
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 h-full transition-all hover:shadow-md dark:hover:shadow-blue-900/10 flex flex-col">
                                    <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        #{tag.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-10 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <svg
                            className="w-16 h-16 text-gray-400 dark:text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M7 7l5-1 5 1m0 0l5 5m-5-5L7 17m10 0l-5 5m5-5L7 7"
                            />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                            No se encontraron tags
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md">
                            No hay tags que coincidan con tu búsqueda. Intenta con otros términos
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="text-blue-600 dark:text-blue-400 font-medium ml-1 hover:underline"
                                >
                                    o limpia los filtros
                                </button>
                            )}
                            .
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

// Componente de esqueleto para mostrar durante la carga
function TagsSkeleton() {
    return (
        <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="space-y-6 mb-10">
                <div className="text-center">
                    <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-3 animate-pulse"></div>
                    <div className="h-4 w-full max-w-2xl bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
                    <div className="h-4 w-3/4 max-w-xl bg-gray-200 dark:bg-gray-700 rounded mx-auto mt-2 animate-pulse"></div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.from({ length: 15 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 animate-pulse"
                        >
                            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                            <div className="h-3 w-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
