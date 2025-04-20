// src/components/posts/PostsFilters.tsx

"use client";

import React from "react";
import { PostLevel } from "@/types/Post";
import { X, Filter, Search } from "lucide-react";

interface PostsFiltersProps {
    searchQuery: string;
    levelFilter: PostLevel | "";
    showFilters: boolean;
    hasActiveFilters: boolean;
    onSearchChange: (query: string) => void;
    onLevelChange: (level: PostLevel | "") => void;
    onToggleFilters: () => void;
    onClearFilters: () => void;
}

const PostsFilters = ({
    searchQuery,
    levelFilter,
    showFilters,
    hasActiveFilters,
    onSearchChange,
    onLevelChange,
    onToggleFilters,
    onClearFilters,
}: PostsFiltersProps) => {
    return (
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
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={onToggleFilters}
                        className="flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        aria-expanded={showFilters}
                        aria-controls="filter-panel"
                    >
                        <Filter size={18} />
                        <span>Filtros</span>
                        {hasActiveFilters && (
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                                {(levelFilter ? 1 : 0)}
                            </span>
                        )}
                    </button>
                    {hasActiveFilters && (
                        <button
                            onClick={onClearFilters}
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
                            htmlFor="level"
                            className="block text-sm font-medium text-text-secondary mb-1"
                        >
                            Nivel
                        </label>
                        <select
                            id="level"
                            value={levelFilter}
                            onChange={(e) => onLevelChange(e.target.value as PostLevel | "")}
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
    );
};

export default PostsFilters;
