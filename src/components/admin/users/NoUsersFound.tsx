// src/components/admin/users/NoUsersFound.tsx

"use client";

import Button from "@/components/ui/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function NoUsersFound() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const handleRefresh = async () => {
        const params = new URLSearchParams(searchParams);
        params.delete("query");
        params.delete("role");
        params.delete("status");
        params.set("page", "1");
        replace(`${pathName}?${params.toString()}`);
    };

    return (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400 space-y-4">
            <svg
                className="w-12 h-12 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>
            <p className="mt-2">No se encontraron usuarios. </p>

            <Button
                variant="outline"
                size="md"
                onClick={handleRefresh}
            >
                Limpiar filtros
            </Button>
        </div>
    );
}
