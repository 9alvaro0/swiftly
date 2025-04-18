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
import { CATEGORY_OPTIONS, LEVEL_OPTIONS, CODE_SNIPPETS, POST_TYPE_OPTIONS } from "@/constants/post";
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
        addKeyword,
        removeKeyword,
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
                onSubmit?.(post);
            }}
            className="space-y-8"
        >
            {/* Básico */}
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
                    id="slug"
                    name="slug"
                    label="Slug personalizado"
                    value={post.slug}
                    onChange={handleChange}
                />
                <Input
                    id="imageUrl"
                    name="imageUrl"
                    label="URL de Imagen Principal"
                    value={post.imageUrl}
                    onChange={handleChange}
                    error={errors.imageUrl}
                />
                <Input
                    id="coverImage"
                    name="coverImage"
                    label="Imagen de Portada (opcional)"
                    value={post.coverImage || ""}
                    onChange={handleChange}
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
                <Select
                    id="type"
                    name="type"
                    label="Tipo de Post"
                    value={post.type}
                    onChange={handleChange}
                    options={POST_TYPE_OPTIONS}
                />
            </div>

            {/* Autor */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                    id="author.name"
                    name="author.name"
                    label="Nombre del Autor"
                    value={post.author?.name}
                    onChange={handleChange}
                />
                <Input
                    id="author.username"
                    name="author.username"
                    label="Username del Autor"
                    value={post.author?.username || ""}
                    onChange={handleChange}
                />
                <Input
                    id="author.avatar"
                    name="author.avatar"
                    label="Avatar del Autor"
                    value={post.author?.avatar || ""}
                    onChange={handleChange}
                />
            </div>

            <Textarea
                id="author.bio"
                name="author.bio"
                label="Bio del Autor"
                value={post.author?.bio || ""}
                onChange={handleChange}
                rows={3}
            />

            {/* Redes Sociales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                    id="author.socialLinks.twitter"
                    name="author.socialLinks.twitter"
                    label="Twitter"
                    value={post.author?.socialLinks?.twitter || ""}
                    onChange={handleChange}
                />
                <Input
                    id="author.socialLinks.github"
                    name="author.socialLinks.github"
                    label="GitHub"
                    value={post.author?.socialLinks?.github || ""}
                    onChange={handleChange}
                />
                <Input
                    id="author.socialLinks.linkedin"
                    name="author.socialLinks.linkedin"
                    label="LinkedIn"
                    value={post.author?.socialLinks?.linkedin || ""}
                    onChange={handleChange}
                />
            </div>

            {/* Etiquetas y Keywords */}
            <TagInput
                id="tags"
                label="Etiquetas"
                tags={post.tags || []}
                onAddTag={addTag}
                onRemoveTag={removeTag}
            />
            <TagInput
                id="keywords"
                label="Palabras clave (SEO)"
                tags={post.keywords || []}
                onAddTag={addKeyword}
                onRemoveTag={removeKeyword}
            />

            <Textarea
                id="metaDescription"
                name="metaDescription"
                label="Meta Descripción (SEO)"
                value={post.metaDescription || ""}
                onChange={handleChange}
                rows={2}
            />

            {/* Markdown */}
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

            <Checkbox
                id="preview"
                label="Vista Previa"
                checked={isPreviewMode}
                onChange={() => setIsPreviewMode(!isPreviewMode)}
            />

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
                    error={errors.content}
                />
            ) : (
                <div className="border rounded-md p-4 h-[30rem] overflow-auto">
                    <PostContent content={post.content || "Vista previa de tu contenido..."} />
                </div>
            )}

            <div className="mt-6">
                <label className="block text-primary font-medium mb-2">Subir Imágenes</label>
                <ImageUploader onImageUpload={handleImageInsert} />
            </div>

            {uploadedImages.length > 0 && (
                <div className="mt-4">
                    <label className="block text-primary font-medium mb-2">Imágenes Subidas</label>
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

            {/* Flags adicionales */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Checkbox
                    id="isPublished"
                    name="isPublished"
                    checked={post.isPublished}
                    onChange={(e) => setPost({ ...post, isPublished: e.target.checked })}
                    label="¿Publicar?"
                />
                <Checkbox
                    id="featured"
                    name="featured"
                    checked={post.featured || false}
                    onChange={(e) => setPost({ ...post, featured: e.target.checked })}
                    label="Destacado"
                />
                <Checkbox
                    id="draft"
                    name="draft"
                    checked={post.draft || false}
                    onChange={(e) => setPost({ ...post, draft: e.target.checked })}
                    label="Borrador"
                />
            </div>

            <div className="flex justify-end mt-8">
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
