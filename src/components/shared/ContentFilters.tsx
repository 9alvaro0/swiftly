// src/components/shared/ContentFilters.tsx

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import { PostLevel } from "@/types/Post";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import PostsSearchBar from "@/components/posts/PostsSearchBar";
import PostsFiltersMobile from "@/components/posts/PostsFiltersMobile";
import ViewToggle, { ViewMode } from "@/components/posts/ViewToggle";
import SortOptions, { SortOption } from "@/components/posts/SortOptions";

interface ContentFiltersProps {
    viewMode: ViewMode;
    sortBy: SortOption;
    levelLabel?: string;
    showViewToggle?: boolean;
    showSortOptions?: boolean;
    showMobileFilters?: boolean;
}

export default function ContentFilters({
    viewMode,
    sortBy,
    levelLabel = "Nivel",
    showViewToggle = true,
    showSortOptions = true,
    showMobileFilters = true
}: ContentFiltersProps) {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const levelFilter = searchParams.get("level") || "";
    const tagFilter = searchParams.get("tag") || "";

    const hasActiveFilters = !!(levelFilter || tagFilter);

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
        params.delete("tag");
        params.set("page", "1");
        replace(`${pathName}?${params.toString()}`);
    };

    const handleViewChange = (mode: ViewMode) => {
        const params = new URLSearchParams(searchParams);
        params.set("view", mode);
        params.set("page", "1");
        replace(`${pathName}?${params.toString()}`);
    };

    const handleSortChange = (sort: SortOption) => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", sort);
        params.set("page", "1");
        replace(`${pathName}?${params.toString()}`);
    };

    return (
        <div className="space-y-4">
            {/* Fila principal: Búsqueda + Controles + Botón móvil */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between">
                {/* Búsqueda + Filtros móviles */}
                <div className="flex-1 max-w-md">
                    <div className="flex gap-2 items-end">
                        <div className="flex-1">
                            <PostsSearchBar />
                        </div>
                        {/* Filtros móviles integrados */}
                        {showMobileFilters && (
                            <PostsFiltersMobile 
                                viewMode={viewMode}
                                sortBy={sortBy}
                                onViewChange={handleViewChange}
                                onSortChange={handleSortChange}
                            />
                        )}
                    </div>
                </div>

                {/* Filtros desktop */}
                <div className="hidden lg:flex items-end gap-4">
                    {/* Filtro de Nivel */}
                    <div className="w-48">
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            {levelLabel}
                        </label>
                        <Select
                            id="level"
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

                    {/* Ordenamiento */}
                    {showSortOptions && (
                        <SortOptions 
                            sortBy={sortBy} 
                            onSortChange={handleSortChange} 
                        />
                    )}

                    {/* Toggle de vista */}
                    {showViewToggle && (
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Vista
                            </label>
                            <ViewToggle 
                                viewMode={viewMode} 
                                onViewChange={handleViewChange} 
                            />
                        </div>
                    )}

                    {/* Botón limpiar */}
                    {hasActiveFilters && (
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleClearFilters}
                            className="text-red-400 border-red-400 hover:bg-red-400/10"
                        >
                            <FaTimes size={14} className="mr-2" />
                            Limpiar
                        </Button>
                    )}
                </div>

            </div>

        </div>
    );
}