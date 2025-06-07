// src/app/admin/tags/TagSearch.tsx

'use client';

import { FaSearch } from "react-icons/fa";
import Input from "@/components/ui/Input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function TagSearch() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const query = searchParams.get("query") || "";

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
        <div className="relative">
            <Input
                id="search"
                label="Buscar tags..."
                placeholder="Escribe el nombre del tag"
                defaultValue={query}
                icon={<FaSearch size={16} />}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
}
