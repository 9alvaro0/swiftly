"use client";

import { useState, useEffect } from "react";
import TutorialCard from "@/components/tutorials/TutorialCard";
import TutorialCardSkeleton from "@/components/tutorials/skeletons/TutorialCardSkeleton";
import Pagination from "@/components/ui/Pagination";
import { fetchTutorials } from "@/services/api";
import type { Tutorial } from "@/types/Tutorial";
import { Filter, Search, X } from "lucide-react";

export default function TutorialsPage() {
    const [allTutorials, setAllTutorials] = useState<Tutorial[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const itemsPerPage = 9;

    // Estados para filtros
    const [categoryFilter, setCategoryFilter] = useState("");
    const [levelFilter, setLevelFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function loadTutorials() {
            try {
                setLoading(true);
                const tutorials = await fetchTutorials(100);
                setAllTutorials(tutorials);
            } catch (error) {
                console.error("Error cargando tutoriales:", error);
            } finally {
                setLoading(false);
            }
        }

        loadTutorials();
    }, []);

    // Filtrar tutoriales
    const filteredTutorials = allTutorials.filter((tutorial) => {
        const matchesCategory = categoryFilter ? tutorial.category === categoryFilter : true;
        const matchesLevel = levelFilter ? tutorial.level === levelFilter : true;
        const matchesSearch = searchQuery
            ? tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        return matchesCategory && matchesLevel && matchesSearch;
    });

    // Calcular índices para paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Obtener tutoriales para la página actual
    const currentTutorials = filteredTutorials.slice(indexOfFirstItem, indexOfLastItem);

    // Cambiar de página
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    // Restablecer paginación cuando cambian los filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [categoryFilter, levelFilter, searchQuery]);

    // Limpiar todos los filtros
    const clearFilters = () => {
        setCategoryFilter("");
        setLevelFilter("");
        setSearchQuery("");
    };

    // Verificar si hay filtros activos
    const hasActiveFilters = categoryFilter || levelFilter || searchQuery;

    // Obtener categorías únicas para el filtro
    const categories = Array.from(new Set(allTutorials.map((tutorial) => tutorial.category)));

    return (
        <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="space-y-6 mb-10">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 text-text-primary">Tutoriales de Swift y SwiftUI</h1>
                    <p className="text-xl text-text-secondary">
                        Aprende desarrollo de iOS paso a paso con nuestros tutoriales detallados.
                    </p>
                </div>

                {/* Barra de búsqueda y filtros */}
                <div className="bg-surface rounded-lg shadow-sm p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search
                                    size={18}
                                    className="text-neutral-400"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar tutoriales..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                aria-expanded={showFilters}
                                aria-controls="filter-panel"
                            >
                                <Filter size={18} />
                                <span>Filtros</span>
                                {hasActiveFilters && (
                                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                                        {(categoryFilter ? 1 : 0) + (levelFilter ? 1 : 0)}
                                    </span>
                                )}
                            </button>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                    aria-label="Limpiar filtros"
                                >
                                    <X size={18} />
                                    <span>Limpiar</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Panel de filtros */}
                    {showFilters && (
                        <div
                            id="filter-panel"
                            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700"
                        >
                            <div>
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium text-text-secondary mb-1"
                                >
                                    Categoría
                                </label>
                                <select
                                    id="category"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="w-full rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="">Todas las categorías</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="level"
                                    className="block text-sm font-medium text-text-secondary mb-1"
                                >
                                    Nivel
                                </label>
                                <select
                                    id="level"
                                    value={levelFilter}
                                    onChange={(e) => setLevelFilter(e.target.value)}
                                    className="w-full rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="">Todos los niveles</option>
                                    <option value="Principiante">Principiante</option>
                                    <option value="Intermedio">Intermedio</option>
                                    <option value="Avanzado">Avanzado</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Resultados y estado de carga */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <TutorialCardSkeleton key={index} />
                    ))}
                </div>
            ) : currentTutorials.length > 0 ? (
                <>
                    <div className="mb-4 text-text-secondary">
                        Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredTutorials.length)} de{" "}
                        {filteredTutorials.length} tutoriales
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentTutorials.map((tutorial) => (
                            <TutorialCard
                                key={tutorial.slug}
                                tutorial={tutorial}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-16 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <p className="text-text-secondary text-lg mb-4">
                        No se encontraron tutoriales con los filtros seleccionados.
                    </p>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    )}
                </div>
            )}

            {/* Paginación */}
            {filteredTutorials.length > 0 && (
                <div className="flex justify-center pt-12">
                    <Pagination
                        totalItems={filteredTutorials.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
}
