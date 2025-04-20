"use client";

import React, { useRef } from "react";
import { usePostForm } from "@/hooks/usePostForm";
import { Post } from "@/types/Post";
import PostBasicInfo from "./postFormSections/PostBasicInfo";
import PostCategorization from "./postFormSections/PostCategorization";
import PostTagsSection from "./postFormSections/PostTagsSection";
import PostSeoSection from "./postFormSections/PostSeoSection";
import PostContentEditor from "./postFormSections/PostContentEditor";
import PostImageSection from "./postFormSections/PostImageSection";
import PostAuthorSection from "./postFormSections/PostAuthorSection";
import PostPublishOptions from "./postFormSections/PostPublishOptions";
import Button from "@/components/ui/Button";

interface PostFormProps {
    isEdit?: boolean;
    initialData?: Post;
}

export default function PostForm({ isEdit = false, initialData }: PostFormProps) {
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
                console.log("PostForm submit", post);
                handleSubmit(e);
            }}
            className="space-y-8"
        >
            {/* Información básica: título, descripción */}
            <PostBasicInfo
                title={post.title}
                description={post.description}
                onChange={handleChange}
                errors={errors}
            />

            {/* Categorías, nivel, tipo */}
            <PostCategorization
                post={post}
                onChange={handleChange}
            />

            {/* Sección de etiquetas */}
            <PostTagsSection
                tags={post.tags || []}
                onAddTag={addTag}
                onRemoveTag={removeTag}
            />

            {/* SEO: keywords, meta description */}
            <PostSeoSection
                post={post}
                onChange={handleChange}
                onAddKeyword={addKeyword}
                onRemoveKeyword={removeKeyword}
            />

            {/* Editor de contenido */}
            <PostContentEditor
                content={post.content || ""}
                onChange={handleChange}
                isPreview={isPreviewMode}
                setIsPreview={setIsPreviewMode}
                handleQuickInsert={handleQuickInsert}
                contentRef={contentRef}
                error={errors.content}
            />

            {/* Gestor de imágenes */}
            <PostImageSection
                post={initialData}
                uploadedImages={uploadedImages}
                onSelectMainImage={(imageUrl) => setPost({ ...post, imageUrl })}
                onSelectCoverImage={(imageUrl) => setPost({ ...post, coverImage: imageUrl })}
                onInsertInContent={handleImageInsert}
            />

            {/* Información del autor */}
            <PostAuthorSection
                post={post}
                onChange={handleChange}
            />

            {/* Opciones de publicación */}
            <PostPublishOptions
                isPublished={post.isPublished || false}
                onChange={(isPublished) => setPost({ ...post, isPublished })}
            />

            {/* Botón de guardar */}
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
