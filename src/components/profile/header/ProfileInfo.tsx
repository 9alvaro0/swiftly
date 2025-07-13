// src/components/profile/ProfileInfo.tsx
import React from "react";
import { User } from "@/types/User";
import { PencilIcon, MapPinIcon } from "lucide-react";
import NewsletterStatus from "@/components/ui/NewsletterStatus";

interface ProfileInfoProps {
    user: User | null;
    onEdit: (field: string) => void;
}

export default function ProfileInfo({ user, onEdit }: ProfileInfoProps) {
    if (!user) return null;

    return (
        <div className="flex-1">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {user.name || "Sin nombre"}
                        <button
                            onClick={() => onEdit("name")}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            title="Editar nombre"
                        >
                            <PencilIcon className="h-4 w-4" />
                        </button>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        @{user.username || "username"}
                        <button
                            onClick={() => onEdit("username")}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            title="Editar nombre de usuario"
                        >
                            <PencilIcon className="h-4 w-4" />
                        </button>
                    </p>
                </div>
            </div>

            <div className="mt-3 space-y-2">
                {user.location && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{user.location}</span>
                        <button
                            onClick={() => onEdit("location")}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            title="Editar ubicación"
                        >
                            <PencilIcon className="h-3 w-3" />
                        </button>
                    </div>
                )}

                {!user.location && (
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => onEdit("location")}
                            className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center gap-1"
                        >
                            <MapPinIcon className="h-3 w-3" />
                            Añadir ubicación
                        </button>
                    </div>
                )}

                {/* Newsletter Status */}
                <div className="mt-3">
                    <NewsletterStatus compact />
                </div>
            </div>
        </div>
    );
}
