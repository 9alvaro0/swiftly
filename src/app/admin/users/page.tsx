// src/app/admin/users/page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import UserSkeleton from "@/components/admin/users/skeletons/UserSkeleton";
import UserFilters from "@/components/admin/users/UserFilters";
import UserListClient from "@/components/admin/users/UserListClient";

export default function AdminUsersPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    const role = searchParams.get("role") || "";
    const status = searchParams.get("status") || "";
    const currentPage = Number(searchParams.get("page")) || 1;

    return (
        <>
            <UserFilters />

            <Suspense
                key={query + currentPage + status + role}
                fallback={<UserSkeleton />}
            >
                <UserListClient
                    searchTerm={query}
                    currentPage={currentPage}
                    role={role}
                    status={status}
                />
            </Suspense>
        </>
    );
}
