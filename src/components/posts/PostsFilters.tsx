"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFilter, FaSearch, FaTimes } from "react-icons/fa";
import { PostLevel } from "@/types/Post";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function PostsFilters() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const [showFilters, setShowFilters] = useState(false);
    const levelFilter = searchParams.get("level") || "";
    const query = searchParams.get("query") || "";

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

    const toggleFilters = () => setShowFilters((prev) => !prev);

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div className="flex-grow">
                    <Input
                        id="search"
                        label="Buscar publicaciones"
                        placeholder="Escribe el título o tema..."
                        defaultValue={query}
                        icon={<FaSearch size={16} />}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 items-center">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={toggleFilters}
                        aria-expanded={showFilters}
                        aria-controls="filter-panel"
                        className="flex items-center gap-2"
                    >
                        <FaFilter size={16} />
                    </Button>

                    {hasActiveFilters && (
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleClearFilters}
                            aria-label="Limpiar filtros"
                            className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                        >
                            <FaTimes size={14} />
                            Limpiar
                        </Button>
                    )}
                </div>
            </div>

            {showFilters && (
                <div
                    id="filter-panel"
                    className="pt-4 border-t border-neutral-200 dark:border-neutral-700 grid grid-cols-1 sm:grid-cols-2 gap-4"
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
                        className="w-full"
                    />
                </div>
            )}
        </div>
    );
}
