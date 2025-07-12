// src/components/posts/PostsFiltersMobile.tsx

"use client";

import { useState } from "react";
import { FaFilter, FaTimes, FaTag } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PostLevel } from "@/types/Post";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { useTags } from "@/hooks/useTags";

export default function PostsFiltersMobile() {
    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const { tags, isLoading: tagsLoading } = useTags();

    const levelFilter = searchParams.get("level") || "";
    const tagFilter = searchParams.get("tag") || "";
    const hasActiveFilters = !!(levelFilter || tagFilter);
    const activeFiltersCount = [levelFilter, tagFilter].filter(Boolean).length;

    const handleLevelChange = (level: PostLevel | "") => {
        const params = new URLSearchParams(searchParams);
        if (level) {
            params.set("level", level);
        } else {
            params.delete("level");
        }
        params.set("page", "1");
        replace(`${pathName}?${params.toString()}`);
    };

    const handleTagChange = (tag: string) => {
        const params = new URLSearchParams(searchParams);
        if (tag) {
            params.set("tag", tag);
        } else {
            params.delete("tag");
        }
        params.set("page", "1");
        replace(`${pathName}?${params.toString()}`);
    };

    const handleClearFilters = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("level");
        params.delete("tag");
        params.set("page", "1");
        replace(`${pathName}?${params.toString()}`);
    };

    return (
        <>
            {/* Botón de filtros móvil */}
            <div className="lg:hidden flex items-center gap-2">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2"
                >
                    <FaFilter size={16} />
                    Filtros
                    {hasActiveFilters && (
                        <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {activeFiltersCount}
                        </span>
                    )}
                </Button>

                {hasActiveFilters && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClearFilters}
                        className="text-red-600 dark:text-red-400"
                    >
                        <FaTimes size={14} />
                    </Button>
                )}
            </div>

            {/* Modal/Drawer de filtros */}
            {isOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Overlay */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Drawer desde abajo */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                Filtros
                            </h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsOpen(false)}
                                className="text-neutral-500 dark:text-neutral-400"
                            >
                                <FaTimes size={16} />
                            </Button>
                        </div>

                        <div className="space-y-6">
                            {/* Filtro de Nivel */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                                    Nivel de dificultad
                                </label>
                                <Select
                                    id="level-mobile"
                                    label=""
                                    options={[
                                        { value: "", label: "Todos los niveles" },
                                        { value: "Principiante", label: "Principiante" },
                                        { value: "Intermedio", label: "Intermedio" },
                                        { value: "Avanzado", label: "Avanzado" },
                                    ]}
                                    value={levelFilter}
                                    onChange={(e) => handleLevelChange(e.target.value as PostLevel | "")}
                                    className="w-full"
                                />
                            </div>

                            {/* Tags como chips */}
                            {!tagsLoading && tags.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                                        <FaTag className="inline mr-2" size={14} />
                                        Filtrar por tag
                                    </label>
                                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                                        {tags.slice(0, 15).map(tag => (
                                            <button
                                                key={tag.id}
                                                onClick={() => handleTagChange(tagFilter === tag.name ? "" : tag.name)}
                                                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                                                    tagFilter === tag.name
                                                        ? "bg-blue-500 text-white border-blue-500"
                                                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700"
                                                }`}
                                            >
                                                #{tag.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {tagsLoading && (
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                                        <FaTag className="inline mr-2" size={14} />
                                        Filtrar por tag
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="h-7 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Botones de acción */}
                            <div className="flex gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                {hasActiveFilters && (
                                    <Button
                                        variant="outline"
                                        onClick={handleClearFilters}
                                        className="flex-1 text-red-600 dark:text-red-400 border-red-600 dark:border-red-400"
                                    >
                                        Limpiar filtros
                                    </Button>
                                )}
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1"
                                >
                                    Aplicar filtros
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}