// src/components/admin/PostForm.tsx

"use client";

import React, { useRef } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import TagInput from "@/components/ui/TagInput";
import PostContent from "@/components/posts/PostContent";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { CATEGORY_OPTIONS, LEVEL_OPTIONS, CODE_SNIPPETS } from "@/constants/post";
import { usePostForm } from "@/hooks/usePostForm";
import { Post } from "@/types/Post";
import Image from "next/image";

interface PostFormProps {
    isEdit?: boolean;
    initialData?: Post;
    onSubmit?: (data: Post) => void;
}

export default function PostForm({ isEdit = false, initialData, onSubmit }: PostFormProps) {
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const {
        post,
        setPost,
        errors,
        uploadedImages,
        insertImageInContent,
        isPreviewMode,
        setIsPreviewMode,
        handleChange,
        handleSubmit,
        addTag,
        removeTag,
    } = usePostForm(initialData ? { defaultValues: initialData } : undefined);

    const handleQuickInsert = (snippet: string) => {
        if (contentRef.current) {
            const textarea = contentRef.current;
            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            const currentContent = post.content || "";

            const newContent = currentContent.substring(0, startPos) + snippet + currentContent.substring(endPos);

            setPost({ ...post, content: newContent });
        }
    };

    const handleImageInsert = (imageUrl: string) => {
        if (contentRef.current) {
            const textarea = contentRef.current;
            const cursorPosition = textarea.selectionStart;
            const currentContent = post.content || "";

            const markdownImage = `\n![Imagen de post](${imageUrl})\n`;
            const newContent =
                currentContent.substring(0, cursorPosition) + markdownImage + currentContent.substring(cursorPosition);

            setPost({ ...post, content: newContent });
        } else {
            insertImageInContent(imageUrl);
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
                if (onSubmit) onSubmit(post);
            }}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    id="title"
                    name="title"
                    label="Título del Post"
                    value={post.title}
                    onChange={handleChange}
                    error={errors.title}
                />
                <Input
                    id="imageUrl"
                    name="imageUrl"
                    label="URL de la Imagen Principal"
                    value={post.imageUrl}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/imagen-post.jpg"
                    error={errors.imageUrl}
                />
            </div>

            <Textarea
                id="description"
                name="description"
                label="Descripción Corta"
                value={post.description}
                onChange={handleChange}
                rows={2}
                error={errors.description}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Select
                    id="category"
                    name="category"
                    label="Categoría"
                    value={post.category}
                    onChange={handleChange}
                    options={CATEGORY_OPTIONS}
                />
                <Select
                    id="level"
                    name="level"
                    label="Nivel"
                    value={post.level}
                    onChange={handleChange}
                    options={LEVEL_OPTIONS}
                />
                <Input
                    id="authorName"
                    name="author.name"
                    label="Nombre del Autor"
                    value={post.author?.name}
                    onChange={handleChange}
                />
            </div>

            <TagInput
                id="tags"
                label="Etiquetas"
                tags={post.tags || []}
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
                        value={post.content}
                        onChange={handleChange}
                        rows={15}
                        className="font-mono"
                        placeholder="Escribe tu post en Markdown..."
                        error={errors.content}
                    />
                ) : (
                    <div className="border rounded-md p-4 h-[30rem] overflow-auto">
                        <PostContent content={post.content || "Vista previa de tu contenido..."} />
                    </div>
                )}
            </div>

            <div className="mt-6">
                <label className="block text-primary font-medium mb-2">Subir Imágenes para el Post</label>
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
                                <Image
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
                checked={post.isPublished}
                onChange={(e) => setPost({ ...post, isPublished: e.target.checked })}
                label="Publicar inmediatamente"
            />

            <div className="flex justify-end space-x-4">
                <Button
                    variant="primary"
                    type="submit"
                >
                    {isEdit ? "Actualizar Post" : "Guardar Post"}
                </Button>
            </div>
        </form>
    );
}
