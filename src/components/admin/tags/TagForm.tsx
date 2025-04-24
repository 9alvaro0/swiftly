"use client";

import { useState, useEffect, FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Tag } from "@/types/Tag";
import { createTag, updateTag, getTagById } from "@/firebase/firestore/tags";
import Input from "@/components/ui/Input";
import { revalidateTagsPath } from "@/actions/revalidateTagsPath";

export default function TagForm() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const tagId = searchParams.get("tagId");
    const [formData, setFormData] = useState({ id: "", name: "" });

    const handleCancel = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("tagId");
        replace(`${pathName}?${params.toString()}`);
        setFormData({ id: "", name: "" });
    };

    useEffect(() => {
        async function loadTag() {
            if (tagId) {
                const tag = await getTagById(tagId);
                if (tag) {
                    setFormData({ id: tag.id, name: tag.name });
                }
            }
        }

        loadTag();
    }, [tagId]);

    // Manejar cambios en el formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    // Manejar envío del formulario
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!tagId) {
            const newTag: Tag = {
                id: uuidv4(),
                name: formData.name.trim(),
            };

            await createTag(newTag);
        } else {
            const updatedFields: Partial<Tag> = {
                name: formData.name.trim(),
            };

            await updateTag(tagId, updatedFields);
        }

        await revalidateTagsPath();
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
            >
                <h2 className="text-xl font-semibold mb-4">{tagId ? "Editar tag" : "Crear nuevo tag"}</h2>

                <div className="mb-4">
                    <Input
                        id="name"
                        label="Nombre del tag"
                        placeholder="Ingresa el nombre del tag"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
                    >
                        {tagId ? "Actualizar Tag" : "Crear Tag"}
                    </button>

                    {tagId && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </>
    );
}
