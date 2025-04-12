// src/app/admin/tutorials/new/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Tutorial } from "@/types/Tutorial";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import TagInput from "@/components/ui/TagInput";
import Card from "@/components/ui/Card";
import { CardBody, CardFooter } from "@/components/ui/Card";

export default function NewTutorialPage() {
    const router = useRouter();

    const [tutorial, setTutorial] = useState<Partial<Tutorial>>({
        title: "",
        description: "",
        content: "",
        category: "Swift",
        level: "Principiante",
        imageUrl: "",
        tags: [],
        author: {
            name: "",
        },
        isPublished: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!tutorial.title?.trim()) newErrors.title = "El título es obligatorio";
        if (!tutorial.description?.trim()) newErrors.description = "La descripción es obligatoria";
        if (!tutorial.content?.trim()) newErrors.content = "El contenido es obligatorio";
        if (!tutorial.imageUrl?.trim()) newErrors.imageUrl = "La URL de la imagen es obligatoria";
        if (!tutorial.author?.name?.trim()) newErrors.authorName = "El nombre del autor es obligatorio";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setTutorial({
                ...tutorial,
                [parent]: {
                    ...(tutorial[parent as keyof Partial<Tutorial>] as Record<string, any>),
                    [child]: value,
                },
            });
        } else {
            setTutorial({ ...tutorial, [name]: value });
        }
    };

    const addTag = (tag: string) => {
        if (tag && !tutorial.tags?.includes(tag)) {
            setTutorial({
                ...tutorial,
                tags: [...(tutorial.tags || []), tag],
            });
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTutorial({
            ...tutorial,
            tags: tutorial.tags?.filter((tag) => tag !== tagToRemove) || [],
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const date = new Date().toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        const newTutorial: Tutorial = {
            ...(tutorial as Tutorial),
            id: Date.now().toString(),
            date,
            slug:
                tutorial.title
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]+/g, "") || "",
            readTime: Math.ceil(tutorial.content?.length || 0 / 1000), // Cálculo aproximado
            tags: tutorial.tags || [],
        };

        // En un caso real, esto sería una llamada a la API
        const storedTutorials = localStorage.getItem("tutorials");
        const tutorials = storedTutorials ? JSON.parse(storedTutorials) : [];

        localStorage.setItem("tutorials", JSON.stringify([...tutorials, newTutorial]));

        router.push("/admin/tutorials");
    };

    const categoryOptions = [
        { value: "Swift", label: "Swift" },
        { value: "SwiftUI", label: "SwiftUI" },
        { value: "Xcode", label: "Xcode" },
        { value: "iOS", label: "iOS" },
        { value: "macOS", label: "macOS" },
        { value: "Frameworks", label: "Frameworks" },
    ];

    const levelOptions = [
        { value: "Principiante", label: "Principiante" },
        { value: "Intermedio", label: "Intermedio" },
        { value: "Avanzado", label: "Avanzado" },
    ];

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-primary mb-8">Crear Nuevo Tutorial</h1>

            <CardBody>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {/* Información básica */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            id="title"
                            name="title"
                            label="Título"
                            value={tutorial.title}
                            onChange={handleChange}
                            error={errors.title}
                        />

                        <Input
                            id="imageUrl"
                            name="imageUrl"
                            label="URL de la imagen"
                            value={tutorial.imageUrl}
                            onChange={handleChange}
                            placeholder="https://ejemplo.com/imagen.jpg"
                            error={errors.imageUrl}
                        />
                    </div>

                    <Textarea
                        id="description"
                        name="description"
                        label="Descripción"
                        value={tutorial.description}
                        onChange={handleChange}
                        rows={2}
                        error={errors.description}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Select
                            id="category"
                            name="category"
                            label="Categoría"
                            value={tutorial.category}
                            onChange={handleChange}
                            options={categoryOptions}
                        />

                        <Select
                            id="level"
                            name="level"
                            label="Nivel"
                            value={tutorial.level}
                            onChange={handleChange}
                            options={levelOptions}
                        />

                        <Input
                            id="authorName"
                            name="author.name"
                            label="Nombre del autor"
                            value={tutorial.author?.name}
                            onChange={handleChange}
                            error={errors.authorName}
                        />
                    </div>

                    {/* Etiquetas */}
                    <TagInput
                        id="tags"
                        label="Etiquetas"
                        tags={tutorial.tags || []}
                        onAddTag={addTag}
                        onRemoveTag={removeTag}
                    />

                    {/* Contenido */}
                    <Textarea
                        id="content"
                        name="content"
                        label="Contenido (HTML)"
                        value={tutorial.content}
                        onChange={handleChange}
                        rows={15}
                        className="font-mono"
                        placeholder="<p>Escribe tu contenido en HTML...</p>"
                        error={errors.content}
                    />

                    {/* Opciones de publicación */}
                    <Checkbox
                        id="publish"
                        name="isPublished"
                        checked={tutorial.isPublished}
                        onChange={(e) => setTutorial({ ...tutorial, isPublished: e.target.checked })}
                        label="Publicar inmediatamente"
                    />
                </form>
            </CardBody>

            <CardFooter>
                <div className="flex justify-end space-x-4">
                    <Button
                        variant="outline"
                        onClick={() => router.push("/admin/tutorials")}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                    >
                        Guardar Tutorial
                    </Button>
                </div>
            </CardFooter>
        </div>
    );
}
