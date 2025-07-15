// src/components/tutorials/TutorialsListClient.tsx

"use client";

import TutorialCard from "@/components/tutorials/TutorialCard";
import TutorialCardList from "@/components/tutorials/TutorialCardList";
import Pagination from "@/components/ui/Pagination";
import { Post } from "@/types/Post";
import { ViewMode } from "@/components/posts/ViewToggle";
import { SortOption } from "@/components/posts/SortOptions";

interface TutorialsListClientProps {
    tutorials: Post[];
    searchTerm: string;
    currentPage: number;
    viewMode: ViewMode;
    sortBy: SortOption;
}

export default function TutorialsListClient({
    tutorials,
    searchTerm,
    currentPage,
    viewMode,
    sortBy,
}: TutorialsListClientProps) {
    const TUTORIALS_PER_PAGE = 9;

    // Aplicar ordenamiento en el cliente
    let sortedTutorials = [...tutorials];
    switch (sortBy) {
        case "popular":
            sortedTutorials = sortedTutorials.sort((a, b) => (b.views || 0) - (a.views || 0));
            break;
        case "alphabetical":
            sortedTutorials = sortedTutorials.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "recent":
        default:
            // Ya viene ordenado por fecha desde el servicio
            break;
    }

    const indexOfLastItem = currentPage * TUTORIALS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - TUTORIALS_PER_PAGE;
    const currentTutorials = sortedTutorials.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedTutorials.length / TUTORIALS_PER_PAGE);

    if (currentTutorials.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-text-secondary text-lg mb-4">No se encontraron tutoriales</p>
            </div>
        );
    }

    return (
        <>
            <div className="mb-4 text-text-secondary">
                Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedTutorials.length)} de {sortedTutorials.length} tutoriales
            </div>
            
            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {currentTutorials.map((tutorial) => (
                        <TutorialCard
                            key={tutorial.id}
                            tutorial={tutorial}
                            searchTerm={searchTerm}
                        />
                    ))}
                </div>
            ) : (
                <div className="space-y-4 sm:space-y-6">
                    {currentTutorials.map((tutorial) => (
                        <TutorialCardList
                            key={tutorial.id}
                            tutorial={tutorial}
                            searchTerm={searchTerm}
                        />
                    ))}
                </div>
            )}

            {sortedTutorials.length > 0 && totalPages > 1 && (
                <div className="flex justify-center pt-12">
                    <Pagination
                        totalItems={sortedTutorials.length}
                        itemsPerPage={TUTORIALS_PER_PAGE}
                    />
                </div>
            )}
        </>
    );
}