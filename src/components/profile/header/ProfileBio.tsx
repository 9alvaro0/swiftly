// src/components/profile/ProfileBio.tsx
import React from "react";
import { PencilIcon } from "lucide-react";

interface ProfileBioProps {
    bio?: string;
    onEditClick: () => void;
}

export default function ProfileBio({ bio, onEditClick }: ProfileBioProps) {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Biografía</h2>
                <button
                    onClick={onEditClick}
                    className="text-gray-400 hover:text-gray-300 p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                    title="Editar biografía"
                >
                    <PencilIcon className="h-4 w-4" />
                </button>
            </div>

            {bio ? (
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-lg">{bio}</p>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-400 italic mb-4">
                        No hay biografía disponible.
                    </p>
                    <button
                        onClick={onEditClick}
                        className="text-blue-400 hover:text-blue-300 text-sm hover:underline"
                    >
                        Añadir biografía
                    </button>
                </div>
            )}
        </div>
    );
}
