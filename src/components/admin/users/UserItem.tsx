// src/components/admin/users/UserItem.tsx

"use client";

import { User } from "@/types/User";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import Image from "next/image";
import { formatDate } from "@/utils/dateUtils";

interface UserItemProps {
    user: User;
}

export default function UserItem({ user }: UserItemProps) {
    const getRoleClass = (role: string) => {
        switch (role) {
            case "admin":
                return "bg-purple-100 text-purple-800";
            case "editor":
                return "bg-blue-100 text-blue-800";
            case "author":
                return "bg-green-100 text-green-800";
            case "user":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const getStatusClass = (user: User) => {
        if (user.isBanned) return "text-red-600";
        if (!user.isActive) return "text-yellow-600";
        return "text-green-600";
    };

    const getStatusText = (user: User) => {
        if (user.isBanned) return "Banned";
        if (!user.isActive) return "Inactive";
        return "Active";
    };

    const getStatusIcon = (user: User) => {
        if (user.isBanned) return <FiXCircle className="mr-1" />;
        if (!user.isActive) return <FiXCircle className="mr-1" />;
        return <FiCheckCircle className="mr-1" />;
    };

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 relative">
                        {user.photoURL ? (
                            <Image
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full object-cover"
                                src={user.photoURL}
                                alt={user.name}
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">
                                    {user.name.charAt(0)}
                                </span>
                            </div>
                        )}
                        {user.emailVerified && (
                            <div className="absolute -right-1 -bottom-1 bg-green-500 rounded-full p-0.5">
                                <FiCheckCircle className="text-white w-4 h-4" />
                            </div>
                        )}
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">@{user.username}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleClass(
                        user.role
                    )}`}
                >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className={`flex items-center text-sm ${getStatusClass(user)}`}>
                    {getStatusIcon(user)}
                    {getStatusText(user)}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {formatDate(user.lastLogin)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {formatDate(user.createdAt)}
            </td>
        </tr>
    );
}
