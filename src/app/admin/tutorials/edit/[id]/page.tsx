// src/app/admin/tutorials/edit/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tutorial } from "@/types/Tutorial";

export default function EditTutorialPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { id } = params;

    const [loading, setLoading] = useState(true);
    const [tutorial, setTutorial] = useState<Tutorial | null>(null);
    const [currentTag, setCurrentTag] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        // Cargar el tutorial desde localStorage
        const storedTutorials = localStorage.getItem("tutorials");
        if (storedTutorials) {
            const tutorials = JSON.parse(storedTutorials);
            const foundTutorial = tutorials.find((t: Tutorial) => t.id === id);
            if (foundTutorial) {
                setTutorial(foundTutorial);
            } else {
                // Tutorial no encontrado
                router.push("/admin/tutorials");
            }
        }
        setLoading(false);
    }, [id, router]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!tutorial?.title?.trim()) newErrors.title = "El título es obligatorio";
        if (!tutorial?.description?.trim()) newErrors.description = "La descripción es obligatoria";
        if (!tutorial?.content?.trim()) newErrors.content = "El contenido es obligatorio";
        if (!tutorial?.imageUrl?.trim()) newErrors.imageUrl = "La URL de la imagen es obligatoria";
        if (!tutorial?.author?.name?.trim()) newErrors.authorName = "El nombre del autor es obligatorio";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!tutorial) return;

        const { name, value } = e.target;

        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setTutorial({
                ...tutorial,
                [parent]: {
                    ...(tutorial[parent as keyof Tutorial] as Record<string, any>),
                    [child]: value,
                },
            });
        } else {
            setTutorial({ ...tutorial, [name]: value });
        }
    };

    const addTag = () => {
        if (!tutorial) return;

        if (currentTag.trim() && !tutorial.tags?.includes(currentTag.trim())) {
            setTutorial({
                ...tutorial,
                tags: [...(tutorial.tags || []), currentTag.trim()],
            });
            setCurrentTag("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        if (!tutorial) return;

        setTutorial({
            ...tutorial,
            tags: tutorial.tags.filter((tag) => tag !== tagToRemove),
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!tutorial || !validateForm()) return;

        // En un caso real, esto sería una llamada a la API
        const storedTutorials = localStorage.getItem("tutorials");
        if (storedTutorials) {
            const tutorials = JSON.parse(storedTutorials);
            const updatedTutorials = tutorials.map((t: Tutorial) => (t.id === tutorial.id ? tutorial : t));

            localStorage.setItem("tutorials", JSON.stringify(updatedTutorials));
        }

        router.push("/admin/tutorials");
    };

    if (loading) return <div className="p-8 text-center">Cargando...</div>;
    if (!tutorial) return <div className="p-8 text-center">Tutorial no encontrado</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">Editar Tutorial</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-4xl"
            >
                {/* El mismo formulario que en la página de crear, pero con los valores del tutorial existente */}
                {/* Información básica */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-primary font-medium mb-2">Título</label>
                        <input
                            type="text"
                            name="title"
                            value={tutorial.title}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md ${
                                errors.title ? "border-error" : "border-neutral-300"
                            }`}
                        />
                        {errors.title && <p className="text-error text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-primary font-medium mb-2">URL de la imagen</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={tutorial.imageUrl}
                            onChange={handleChange}
                            placeholder="https://ejemplo.com/imagen.jpg"
                            className={`w-full p-2 border rounded-md ${
                                errors.imageUrl ? "border-error" : "border-neutral-300"
                            }`}
                        />
                        {errors.imageUrl && <p className="text-error text-sm mt-1">{errors.imageUrl}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-primary font-medium mb-2">Descripción</label>
                    <textarea
                        name="description"
                        value={tutorial.description}
                        onChange={handleChange}
                        rows={2}
                        className={`w-full p-2 border rounded-md ${
                            errors.description ? "border-error" : "border-neutral-300"
                        }`}
                    />
                    {errors.description && <p className="text-error text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-primary font-medium mb-2">Categoría</label>
                        <select
                            name="category"
                            value={tutorial.category}
                            onChange={handleChange}
                            className="w-full p-2 border border-neutral-300 rounded-md"
                        >
                            <option value="Swift">Swift</option>
                            <option value="SwiftUI">SwiftUI</option>
                            <option value="Xcode">Xcode</option>
                            <option value="iOS">iOS</option>
                            <option value="macOS">macOS</option>
                            <option value="Frameworks">Frameworks</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-primary font-medium mb-2">Nivel</label>
                        <select
                            name="level"
                            value={tutorial.level}
                            onChange={handleChange}
                            className="w-full p-2 border border-neutral-300 rounded-md"
                        >
                            <option value="Principiante">Principiante</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Avanzado">Avanzado</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-primary font-medium mb-2">Nombre del autor</label>
                        <input
                            type="text"
                            name="author.name"
                            value={tutorial.author?.name}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md ${
                                errors.authorName ? "border-error" : "border-neutral-300"
                            }`}
                        />
                        {errors.authorName && <p className="text-error text-sm mt-1">{errors.authorName}</p>}
                    </div>
                </div>

                {/* Etiquetas */}
                <div>
                    <label className="block text-primary font-medium mb-2">Etiquetas</label>
                    <div className="flex">
                        <input
                            type="text"
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            className="w-full p-2 border border-neutral-300 rounded-l-md"
                            placeholder="Añadir etiqueta"
                        />
                        <button
                            type="button"
                            onClick={addTag}
                            className="bg-primary text-white px-4 py-2 rounded-r-md"
                        >
                            Añadir
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tutorial.tags?.map((tag) => (
                            <span
                                key={tag}
                                className="bg-neutral-100 px-2 py-1 rounded-md text-sm flex items-center"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="ml-2 text-neutral-400 hover:text-error"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Contenido */}
                <div>
                    <label className="block text-primary font-medium mb-2">Contenido (HTML)</label>
                    <textarea
                        name="content"
                        value={tutorial.content}
                        onChange={handleChange}
                        rows={15}
                        className={`w-full p-2 border rounded-md font-mono ${
                            errors.content ? "border-error" : "border-neutral-300"
                        }`}
                        placeholder="<p>Escribe tu contenido en HTML...</p>"
                    />
                    {errors.content && <p className="text-error text-sm mt-1">{errors.content}</p>}
                </div>

                {/* Opciones de publicación */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="publish"
                        checked={tutorial.isPublished}
                        onChange={(e) => setTutorial({ ...tutorial, isPublished: e.target.checked })}
                        className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                    />
                    <label
                        htmlFor="publish"
                        className="ml-2 text-secondary"
                    >
                        Publicar inmediatamente
                    </label>
                </div>

                {/* Botones */}
                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.push("/admin/tutorials")}
                        className="px-4 py-2 border border-neutral-300 rounded-md hover:bg-neutral-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                    >
                        Actualizar Tutorial
                    </button>
                </div>
            </form>
        </div>
    );
}
