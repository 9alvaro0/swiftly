// src/components/profile/ProfileBio.tsx
import React from "react";
import { PencilIcon } from "lucide-react";

interface ProfileBioProps {
    bio?: string;
    onEditClick: () => void;
}

export default function ProfileBio({ bio, onEditClick }: ProfileBioProps) {
    return (
        <div className="mt-6">
            <div className="flex items-start justify-between">
                <h2 className="text-lg font-semiboldmb-2">Biografía</h2>
                <button
                    onClick={onEditClick}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    title="Editar biografía"
                >
                    <PencilIcon className="h-4 w-4" />
                </button>
            </div>

            {bio ? (
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{bio}</p>
            ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">
                    No hay biografía disponible. Haz clic en el ícono de edición para añadir una.
                </p>
            )}
        </div>
    );
}
