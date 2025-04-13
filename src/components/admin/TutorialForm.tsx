// src/components/tutorials/TutorialForm.tsx
"use client";

import React, { useRef } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import TagInput from "@/components/ui/TagInput";
import TutorialContent from "@/components/tutorials/TutorialContent";
import { ImageUploader, UploadedImagesList } from "@/components/admin/ImageUploader";
import { CATEGORY_OPTIONS, LEVEL_OPTIONS, CODE_SNIPPETS } from "@/constants/tutorial";
import { useTutorialForm } from "@/hooks/useTutorialForm";

interface TutorialFormProps {
    isEdit?: boolean;
    initialData?: any;
    onSubmit?: (data: any) => void;
}

export default function TutorialForm({ isEdit = false, initialData, onSubmit }: TutorialFormProps) {
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const {
        tutorial,
        setTutorial,
        errors,
        uploadedImages,
        addImageToTutorial,
        insertImageInContent,
        isPreviewMode,
        setIsPreviewMode,
        handleChange,
        handleSubmit,
        addTag,
        removeTag,
    } = useTutorialForm(initialData ? { defaultValues: initialData } : undefined);

    const handleQuickInsert = (snippet: string) => {
        if (contentRef.current) {
            const textarea = contentRef.current;
            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            const currentContent = tutorial.content || "";

            const newContent = currentContent.substring(0, startPos) + snippet + currentContent.substring(endPos);

            setTutorial({ ...tutorial, content: newContent });
        }
    };

    const handleImageInsert = (imageUrl: string) => {
        if (contentRef.current) {
            const textarea = contentRef.current;
            const cursorPosition = textarea.selectionStart;
            const currentContent = tutorial.content || "";

            const markdownImage = `\n![Imagen de tutorial](${imageUrl})\n`;
            const newContent =
                currentContent.substring(0, cursorPosition) + markdownImage + currentContent.substring(cursorPosition);

            setTutorial({ ...tutorial, content: newContent });
        } else {
            insertImageInContent(imageUrl);
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
                if (onSubmit) onSubmit(tutorial);
            }}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    id="title"
                    name="title"
                    label="Título del Tutorial"
                    value={tutorial.title}
                    onChange={handleChange}
                    error={errors.title}
                />
                <Input
                    id="imageUrl"
                    name="imageUrl"
                    label="URL de la Imagen Principal"
                    value={tutorial.imageUrl}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/imagen-tutorial.jpg"
                    error={errors.imageUrl}
                />
            </div>

            <Textarea
                id="description"
                name="description"
                label="Descripción Corta"
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
                    options={CATEGORY_OPTIONS}
                />
                <Select
                    id="level"
                    name="level"
                    label="Nivel"
                    value={tutorial.level}
                    onChange={handleChange}
                    options={LEVEL_OPTIONS}
                />
                <Input
                    id="authorName"
                    name="author.name"
                    label="Nombre del Autor"
                    value={tutorial.author?.name}
                    onChange={handleChange}
                />
            </div>

            <TagInput
                id="tags"
                label="Etiquetas"
                tags={tutorial.tags || []}
                onAddTag={addTag}
                onRemoveTag={removeTag}
            />

            <div>
                <label className="block text-primary font-medium mb-2">Snippets Rápidos</label>
                <div className="flex flex-wrap gap-2 mb-4">
                    {CODE_SNIPPETS.map((snippet) => (
                        <Button
                            key={snippet.label}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickInsert(snippet.snippet)}
                        >
                            {snippet.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex items-center mb-4">
                    <Checkbox
                        id="preview"
                        label="Vista Previa"
                        checked={isPreviewMode}
                        onChange={() => setIsPreviewMode(!isPreviewMode)}
                    />
                </div>

                {!isPreviewMode ? (
                    <Textarea
                        ref={contentRef}
                        id="content"
                        name="content"
                        label="Contenido (Markdown)"
                        value={tutorial.content}
                        onChange={handleChange}
                        rows={15}
                        className="font-mono"
                        placeholder="Escribe tu tutorial en Markdown..."
                        error={errors.content}
                    />
                ) : (
                    <div className="border rounded-md p-4 h-[30rem] overflow-auto">
                        <TutorialContent content={tutorial.content || "Vista previa de tu contenido..."} />
                    </div>
                )}
            </div>

            <div className="mt-6">
                <label className="block text-primary font-medium mb-2">Subir Imágenes para el Tutorial</label>
                <ImageUploader onImageUpload={handleImageInsert} />
            </div>

            {uploadedImages.length > 0 && (
                <div className="mt-4">
                    <label className="block text-primary font-medium mb-2">Vista Previa de Imágenes</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {uploadedImages.map((imageUrl, index) => (
                            <div
                                key={index}
                                className="relative border rounded-md overflow-hidden group"
                            >
                                <img
                                    src={imageUrl}
                                    alt={`Imagen subida ${index + 1}`}
                                    className="object-cover w-full h-32"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleImageInsert(imageUrl)}
                                    className="absolute bottom-2 left-2 text-xs bg-white/80 hover:bg-white text-primary px-2 py-1 rounded shadow"
                                >
                                    Insertar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Checkbox
                id="publish"
                name="isPublished"
                checked={tutorial.isPublished}
                onChange={(e) => setTutorial({ ...tutorial, isPublished: e.target.checked })}
                label="Publicar inmediatamente"
            />

            <div className="flex justify-end space-x-4">
                <Button
                    variant="primary"
                    type="submit"
                >
                    {isEdit ? "Actualizar Tutorial" : "Guardar Tutorial"}
                </Button>
            </div>
        </form>
    );
}
