// src/app/tutorials/page.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { PostLevel } from "@/types/Post";
import { usePosts } from "@/hooks/usePosts";
import TutorialsHeader from "@/components/tutorials/TutorialsHeader";
import TutorialsFilters from "@/components/tutorials/TutorialsFilters";
import TutorialsList from "@/components/tutorials/TutorialsList";
import TutorialsSkeleton from "@/components/tutorials/skeletons/TutorialsSkeleton";

export default function TutorialsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const itemsPerPage = 9;

    const [levelFilter, setLevelFilter] = useState<PostLevel | "">("");
    const [searchQuery, setSearchQuery] = useState("");

    const {
        posts: tutorials,
        isLoading,
        error,
        filters,
        updateFilters,
        resetFilters,
    } = usePosts({ type: "tutorial" });

    const applyFilters = useCallback(() => {
        updateFilters({
            level: levelFilter || undefined,
            searchTerm: searchQuery || undefined,
        });
    }, [levelFilter, searchQuery, updateFilters]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    const clearFilters = () => {
        setLevelFilter("");
        setSearchQuery("");
        resetFilters();
    };

    const hasActiveFilters = Boolean( levelFilter || searchQuery);

    if (isLoading) {
        return <TutorialsSkeleton />;
    }

    if (error) {
        return (
            <section className="container mx-auto px-4 py-12">
                <div className="container mx-auto px-4">
                    <p className="text-red-500 text-lg mb-4">Error al cargar los tutoriales: {error.message}</p>
                </div>
            </section>
        );
    }

    return (
        <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="space-y-6 mb-10">
                <TutorialsHeader />

                <TutorialsFilters
                    searchQuery={searchQuery}
                    levelFilter={levelFilter}
                    showFilters={showFilters}
                    hasActiveFilters={hasActiveFilters}
                    onSearchChange={setSearchQuery}
                    onLevelChange={setLevelFilter}
                    onToggleFilters={() => setShowFilters(!showFilters)}
                    onClearFilters={clearFilters}
                />
            </div>

            <TutorialsList
                tutorials={tutorials}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={clearFilters}
            />
        </div>
    );
}
