// src/components/posts/PostsFilters.tsx

"use client";

import { FaFilter, FaSearch, FaTimes } from "react-icons/fa";
import { PostLevel } from "@/types/Post";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function PostsFilters() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const [showFilters, setShowFilters] = useState(false);

    const levelFilter = searchParams.get("level")?.toString() || "";
    const hasActiveFilters = !!levelFilter;

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        params.set("page", "1");
        replace(`${pathName}?${params.toString()}`);
    }, 300);

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

    const handleClearFilters = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("level");
        params.set("page", "1");
        replace(`${pathName}?${params.toString()}`);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="bg-surface rounded-lg shadow-sm ">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Input
                        id="search"
                        label="Buscar publicaciones..."
                        placeholder="Escribe aqui la publicación que deseas buscar"
                        defaultValue={searchParams.get("query")?.toString()}
                        icon={<FaSearch size={18} />}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFilters}
                    aria-expanded={showFilters}
                    aria-controls="filter-panel"
                >
                    <FaFilter size={18} />
                    <span>Filtros</span>
                    {hasActiveFilters && (
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                            {levelFilter ? 1 : 0}
                        </span>
                    )}
                </Button>
                <div className="flex gap-2">
                    {hasActiveFilters && (
                        <Button
                            onClick={handleClearFilters}
                            variant="outline"
                            size="sm"
                            aria-label="Limpiar filtros"
                        >
                            <FaTimes size={18} />
                            <span>Limpiar</span>
                        </Button>
                    )}
                </div>
            </div>

            {/* Panel de filtros */}
            {showFilters && (
                <div
                    id="filter-panel"
                    className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700"
                >
                    <Select
                        id="level"
                        label="Nivel"
                        options={[
                            { value: "", label: "Todos los niveles" },
                            { value: "Principiante", label: "Principiante" },
                            { value: "Intermedio", label: "Intermedio" },
                            { value: "Avanzado", label: "Avanzado" },
                        ]}
                        value={levelFilter}
                        onChange={(e) => handleLevelChange(e.target.value as PostLevel | "")}
                        className="w-full rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
            )}
        </div>
    );
}
