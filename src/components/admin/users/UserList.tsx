// src/components/admin/users/UserList.tsx

import UserItem from "@/components/admin/users/UserItem";
import { getAllUsers } from "@/services/firebase/firestore/user";
import NoUsersFound from "./NoUsersFound";
import Pagination from "@/components/ui/Pagination";

interface UserListProps {
    searchTerm: string;
    currentPage: number;
    role: string;
    status: string;
}

export default async function UserList({ searchTerm, currentPage, role, status }: UserListProps) {
    const USERS_PER_PAGE = 5;

    const users = await getAllUsers(searchTerm, role, status);

    const indexOfLastItem = currentPage * USERS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - USERS_PER_PAGE;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

    if (currentUsers.length === 0) {
        return (
            <div className="text-center py-16 ">
                <NoUsersFound />
            </div>
        );
    }

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
                    {users.map((user) => (
                        <UserItem
                            key={user.uid}
                            user={user}
                        />
                    ))}
                </tbody>

                {users.length > 0 && (
                    <div className="flex justify-center pt-12">
                        <Pagination
                            totalItems={users.length}
                            itemsPerPage={USERS_PER_PAGE}
                        />
                    </div>
                )}
            </table>
        </div>
    );
}
