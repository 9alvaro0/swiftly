"use client";

import React from "react";
import Checkbox from "@/components/ui/Checkbox";

interface PostPublishOptionsProps {
    isPublished: boolean;
    onChange: (isPublished: boolean) => void;
}

const PostPublishOptions: React.FC<PostPublishOptionsProps> = ({ isPublished, onChange }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Opciones de Publicación</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Checkbox
                    id="isPublished"
                    name="isPublished"
                    checked={isPublished}
                    onChange={(e) => onChange(e.target.checked)}
                    label="¿Publicar?"
                />

            {/* Aquí puedes añadir más opciones de publicación como:
            - Programar publicación
            - Destacar post
            - Permitir comentarios
            - etc.
            */}
            </div>

            {!isPublished && (
                <div className="text-sm text-gray-500 italic">
                    Este post se guardará como borrador y no será visible para los usuarios.
                </div>
            )}
        </div>
    );
};

export default PostPublishOptions;
