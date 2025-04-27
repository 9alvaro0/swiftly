// src/components/profile/ProfileAvatar.tsx
import React from "react";
import { User } from "@/types/User";
import { FaCamera } from "react-icons/fa";
import Image from "next/image";

interface ProfileAvatarProps {
    user: User | null;
    onEditClick: () => void;
}

export default function ProfileAvatar({ user, onEditClick }: ProfileAvatarProps) {
    return (
        <div className="relative">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                {user?.photoURL ? (
                    <Image
                        src={user.photoURL}
                        alt={user.name || "Usuario"}
                        width={144}
                        height={144}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
                        {user?.name?.charAt(0) || "U"}
                    </div>
                )}
            </div>

            <button
                onClick={onEditClick}
                className="absolute bottom-2 right-2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-600"
                title="Editar foto de perfil"
            >
                <FaCamera className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
        </div>
    );
}
