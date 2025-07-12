// src/components/posts/SortOptions.tsx

"use client";

import Select from "@/components/ui/Select";

export type SortOption = "recent" | "popular" | "alphabetical";

interface SortOptionsProps {
    sortBy: SortOption;
    onSortChange: (sort: SortOption) => void;
}

export default function SortOptions({ sortBy, onSortChange }: SortOptionsProps) {
    return (
        <div className="w-48">
            <label className="block text-sm font-medium text-white/80 mb-2">
                Ordenar por
            </label>
            <Select
                id="sort"
                label=""
                options={[
                    { value: "recent", label: "Más recientes" },
                    { value: "popular", label: "Más populares" },
                    { value: "alphabetical", label: "Alfabético" },
                ]}
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="w-full"
            />
        </div>
    );
}