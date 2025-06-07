// src/components/admin/users/AdminUsersPage.tsx

import { Suspense } from "react";
import UserSkeleton from "@/components/admin/users/skeletons/UserSkeleton";
import UserFilters from "@/components/admin/users/UserFilters";
import UserList from "@/components/admin/users/UserList";

export default async function AdminUsersPage(props: {
    searchParams?: Promise<{
        query?: string;
        role?: string;
        status?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const role = searchParams?.role || "";
    const status = searchParams?.status || "";
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <>
            <UserFilters />

            <Suspense
                key={query + currentPage + status + role}
                fallback={<UserSkeleton />}
            >
                <UserList
                    searchTerm={query}
                    currentPage={currentPage}
                    role={role}
                    status={status}
                />
            </Suspense>
        </>
    );
}
