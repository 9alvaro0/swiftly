// src/app/tutoriales/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import TutorialCard from "@/components/tutorials/TutorialCard";
import Pagination from "@/components/ui/Pagination";
import { Tutorial } from "@/types/Tutorial";

export default function TutorialsPage() {
    const [allTutorials, setAllTutorials] = useState<Tutorial[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Estados para filtros
    const [categoryFilter, setCategoryFilter] = useState("");
    const [levelFilter, setLevelFilter] = useState("");

    useEffect(() => {
        // Cargar tutoriales desde localStorage
        const storedTutorials = localStorage.getItem("tutorials");
        if (storedTutorials) {
            const parsedTutorials = JSON.parse(storedTutorials);
            // Solo mostrar tutoriales publicados
            setAllTutorials(parsedTutorials.filter((t: Tutorial) => t.isPublished));
        }
        setLoading(false);
    }, []);

    // Filtrar tutoriales
    const filteredTutorials = allTutorials.filter((tutorial) => {
        const matchesCategory = categoryFilter ? tutorial.category === categoryFilter : true;
        const matchesLevel = levelFilter ? tutorial.level === levelFilter : true;
        return matchesCategory && matchesLevel;
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
    }, [categoryFilter, levelFilter]);

    if (loading) return <div className="p-8 text-center">Cargando tutoriales...</div>;

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Tutoriales de Swift y SwiftUI</h1>
                <p className="text-gray-600">
                    Aprende desarrollo de iOS paso a paso con nuestros tutoriales detallados.
                </p>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-4 py-4">
                <div>
                    <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Categoría
                    </label>
                    <select
                        id="category"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Todas</option>
                        <option value="Swift">Swift</option>
                        <option value="SwiftUI">SwiftUI</option>
                        <option value="Xcode">Xcode</option>
                        <option value="iOS">iOS</option>
                        <option value="macOS">macOS</option>
                        <option value="Frameworks">Frameworks</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="level"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Nivel
                    </label>
                    <select
                        id="level"
                        value={levelFilter}
                        onChange={(e) => setLevelFilter(e.target.value)}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Todos</option>
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                    </select>
                </div>
            </div>

            {/* Lista de tutoriales */}
            {currentTutorials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentTutorials.map((tutorial) => (
                        <TutorialCard
                            key={tutorial.id}
                            id={tutorial.id}
                            title={tutorial.title}
                            description={tutorial.description}
                            category={tutorial.category}
                            level={tutorial.level}
                            date={tutorial.date}
                            imageUrl={tutorial.imageUrl}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-neutral-50 rounded-lg">
                    <p className="text-gray-500">No se encontraron tutoriales con los filtros seleccionados.</p>
                    {(categoryFilter || levelFilter) && (
                        <button
                            onClick={() => {
                                setCategoryFilter("");
                                setLevelFilter("");
                            }}
                            className="text-primary mt-2 hover:underline"
                        >
                            Limpiar filtros
                        </button>
                    )}
                </div>
            )}

            {/* Paginación */}
            {filteredTutorials.length > 0 && (
                <div className="flex justify-center pt-8">
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
