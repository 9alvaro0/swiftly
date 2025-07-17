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
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg">
                {user?.photoURL ? (
                    <Image
                        src={user.photoURL}
                        alt={user.name || "Usuario"}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold">
                        {user?.name?.charAt(0) || "U"}
                    </div>
                )}
            </div>

            <button
                onClick={onEditClick}
                className="absolute bottom-0 right-0 bg-gray-700 hover:bg-gray-600 rounded-full p-2 shadow-md transition-all border-2 border-gray-800"
                title="Editar foto de perfil"
            >
                <FaCamera className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />
            </button>
        </div>
    );
}
