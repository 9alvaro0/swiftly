// src/components/tags/TagsHeader.tsx

"use client";

import Input from "@/components/ui/Input";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function TagsFilters() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

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

    return (
        <div className="flex-grow">
            <Input
                id="tag-search"
                label="Buscar tags..."
                placeholder="Escribe el nombre del tag"
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
}
