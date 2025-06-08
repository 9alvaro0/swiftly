// src/components/admin/users/UserListClient.tsx
"use client";

import { useAdminUsers } from "@/hooks/useAdminAPI";
import UserItem from "@/components/admin/users/UserItem";
import NoUsersFound from "./NoUsersFound";
import Pagination from "@/components/ui/Pagination";
import UserSkeleton from "./skeletons/UserSkeleton";

interface UserListClientProps {
    searchTerm: string;
    currentPage: number;
    role: string;
    status: string;
}

export default function UserListClient({ searchTerm, currentPage, role, status }: UserListClientProps) {
    const USERS_PER_PAGE = 5;
    const { data: users, isLoading, error } = useAdminUsers(searchTerm, role, status);

    if (isLoading) {
        return <UserSkeleton />;
    }

    if (error) {
        return (
            <div className="text-center py-16">
                <div className="text-red-500 mb-4">Error loading users</div>
                <div className="text-sm text-gray-600">{error}</div>
            </div>
        );
    }

    if (!users || users.length === 0) {
        return (
            <div className="text-center py-16">
                <NoUsersFound />
            </div>
        );
    }

    const indexOfLastItem = currentPage * USERS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - USERS_PER_PAGE;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                            User
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                            Role
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                            Last Login
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                            Joined
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {currentUsers.map((user) => (
                        <UserItem
                            key={user.uid}
                            user={user}
                        />
                    ))}
                </tbody>
            </table>

            {users.length > USERS_PER_PAGE && (
                <div className="flex justify-center pt-12">
                    <Pagination
                        totalItems={users.length}
                        itemsPerPage={USERS_PER_PAGE}
                    />
                </div>
            )}
        </div>
    );
}