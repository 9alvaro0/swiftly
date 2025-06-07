"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { useTags } from "@/hooks/useTags";
import { Tag } from "@/types/Tag";
import { v4 as uuidv4 } from "uuid";

interface PostTagsSectionProps {
    tags: string[];
    onAddTag: (tag: string) => void;
    onRemoveTag: (tag: string) => void;
}

const PostTagsSection: React.FC<PostTagsSectionProps> = ({ tags, onAddTag, onRemoveTag }) => {
    const { tags: availableTags, createNewTag, isLoading: loadingTags } = useTags();
    const [isAddingNewTag, setIsAddingNewTag] = useState(false);
    const [newTagName, setNewTagName] = useState("");
    const [tagError, setTagError] = useState("");

    // Función para añadir una etiqueta existente
    const handleAddExistingTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tagName = e.target.value;
        if (!tagName || tags.includes(tagName)) {
            return;
        }
        onAddTag(tagName);
    };

    // Función para crear y añadir una nueva etiqueta
    const handleCreateNewTag = async () => {
        if (!newTagName.trim()) {
            setTagError("El nombre de la etiqueta no puede estar vacío");
            return;
        }

        // Verificar si la etiqueta ya existe en las etiquetas disponibles
        const tagExists: boolean = availableTags.some(
            (tag: Tag) => tag.name.toLowerCase() === newTagName.toLowerCase()
        );

        if (tagExists) {
            setTagError("Esta etiqueta ya existe. Por favor selecciónala de la lista.");
            return;
        }

        try {
            // Crear nueva etiqueta en el sistema
            const newTag: Tag = {
                id: uuidv4(),
                name: newTagName.trim(),
            };

            await createNewTag(newTag);

            // Añadir la etiqueta al post actual
            onAddTag(newTagName.trim());

            // Limpiar el estado
            setNewTagName("");
            setIsAddingNewTag(false);
            setTagError("");
        } catch (error) {
            setTagError("Error al crear la etiqueta");
            console.error(error);
        }
    };

    return (
        <div className="space-y-4">
            <label className="block text-primary font-medium mb-2">Etiquetas</label>

            {/* Mostrar etiquetas seleccionadas */}
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                    <div
                        key={tag}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full flex items-center"
                    >
                        <span className="mr-2">#{tag}</span>
                        <button
                            type="button"
                            onClick={() => onRemoveTag(tag)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                            <AiOutlineClose size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Interfaz para añadir etiquetas existentes o crear nuevas */}
            {!isAddingNewTag ? (
                <div className="mb-4">
                    <div className="space-y-4">
                        <label
                            className="block text-white font-medium mb-2 tracking-wide"
                        >
                            Anadir etiqueta existente
                        </label>
                        <Select
                            id="existingTags"
                            label=""
                            onChange={handleAddExistingTag}
                            value=""
                            options={[
                                { value: "", label: "Seleccionar etiqueta..." },
                                ...availableTags
                                    .filter((tag: Tag) => !tags.includes(tag.name))
                                    .map((tag: Tag) => ({ value: tag.name, label: `#${tag.name}` })),
                            ]}
                            disabled={loadingTags}
                        />
                        <Button
                            variant="primary"
                            size="md"
                            onClick={() => setIsAddingNewTag(true)}
                        >
                            <div className="flex items-center">
                                <AiOutlinePlus className="mr-1" /> Añadir nueva etiqueta
                            </div>
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="mb-4">
                    <div className=" space-y-4">
                        <div className="flex-grow">
                            <Input
                                id="newTagName"
                                label="Nueva etiqueta"
                                value={newTagName}
                                onChange={(e) => setNewTagName(e.target.value)}
                                error={tagError}
                                placeholder="Escribe el nombre de la nueva etiqueta"
                            />
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="primary"
                                size="md"
                                onClick={handleCreateNewTag}
                            >
                                Crear y añadir
                            </Button>
                            <Button
                                variant="outline"
                                size="md"
                                onClick={() => {
                                    setIsAddingNewTag(false);
                                    setNewTagName("");
                                    setTagError("");
                                }}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostTagsSection;
