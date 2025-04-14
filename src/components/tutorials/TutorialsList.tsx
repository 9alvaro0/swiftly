// src/components/tutorials/TutorialsList.tsx

"use client";

import { Post } from "@/types/Post";
import TutorialCard from "@/components/tutorials/TutorialCard";
import Pagination from "@/components/ui/Pagination";

interface TutorialsListProps {
    tutorials: Post[];
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    hasActiveFilters: boolean;
    onClearFilters: () => void;
}

export default function TutorialsList({
    tutorials,
    currentPage,
    itemsPerPage,
    onPageChange,
    hasActiveFilters,
    onClearFilters,
}: TutorialsListProps) {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTutorials = tutorials.slice(indexOfFirstItem, indexOfLastItem);

    if (currentTutorials.length === 0) {
        return (
            <div className="text-center py-16 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <p className="text-text-secondary text-lg mb-4">
                    No se encontraron tutoriales con los filtros seleccionados.
                </p>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                    >
                        Limpiar filtros
                    </button>
                )}
            </div>
        );
    }

    return (
        <>
            <div className="mb-4 text-text-secondary">
                Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, tutorials.length)} de {tutorials.length}{" "}
                tutoriales
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTutorials.map((tutorial) => (
                    <TutorialCard
                        key={tutorial.slug}
                        tutorial={tutorial}
                    />
                ))}
            </div>

            {tutorials.length > 0 && (
                <div className="flex justify-center pt-12">
                    <Pagination
                        totalItems={tutorials.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </>
    );
}
