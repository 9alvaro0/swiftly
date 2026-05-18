// src/components/posts/PostsSearchBar.tsx

"use client";

import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import Input from "@/components/ui/Input";

export default function PostsSearchBar() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const [currentQuery, setCurrentQuery] = useState("");

    const query = searchParams.get("query") || "";

    useEffect(() => {
        setCurrentQuery(query);
    }, [query]);

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCurrentQuery(value);
        handleSearch(value);
    };

    return (
        <div className="w-full">
            <Input
                id="search"
                label="Buscar publicaciones"
                placeholder="Buscar..."
                value={currentQuery}
                icon={<FaSearch size={16} />}
                onChange={handleInputChange}
                className="w-full"
            />
        </div>
    );
}