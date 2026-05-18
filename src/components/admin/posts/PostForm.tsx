"use client";

import { Post, PostWithAuthor, postWithAuthorToPost } from "@/types/Post";
import PostBasicInfo from "@/components/admin/posts/postFormSections/PostBasicInfo";
import PostCategorization from "@/components/admin/posts/postFormSections/PostCategorization";
import PostTagsSection from "@/components/admin/posts/postFormSections/PostTagsSection";
import PostContentEditor from "@/components/admin/posts/postFormSections/PostContentEditor";
import PostImageSection from "@/components/admin/posts/postFormSections/PostImageSection";
import PostPublishOptions from "@/components/admin/posts/postFormSections/PostPublishOptions";
import Button from "@/components/ui/Button";
import usePostForm from "@/hooks/usePostForm";
import Spinner from "@/components/ui/Spinner";
import { FiArrowRight } from "react-icons/fi";

interface PostFormProps {
    selectedPost?: Post | PostWithAuthor;
}

export default function PostForm({ selectedPost }: PostFormProps) {
    const {
        post,
        setPost,
        errors,
        setMainImage,
        setCoverImage,
        insertImageInContent,
        removeImageFromPost,
        isPreviewMode,
        setIsPreviewMode,
        handleChange,
        handleSubmit,
        addTag,
        removeTag,
        insertSnippet,
        contentRef,
        isSubmitting,
    } = usePostForm({ 
        selectedPost: selectedPost && 'author' in selectedPost 
            ? postWithAuthorToPost(selectedPost) 
            : selectedPost 
    });

    return (
        <form
            onSubmit={handleSubmit}
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

            {/* Editor de contenido */}
            <PostContentEditor
                content={post.content}
                onChange={handleChange}
                isPreview={isPreviewMode}
                setIsPreview={setIsPreviewMode}
                handleQuickInsert={insertSnippet}
                contentRef={contentRef}
                error={errors.content}
            />

            {/* Gestor de imágenes */}
            <PostImageSection
                post={post}
                onSelectMainImage={setMainImage}
                onSelectCoverImage={setCoverImage}
                onInsertInContent={insertImageInContent}
                onImageDeleted={removeImageFromPost}
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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <Spinner />
                            <span className="ml-2">Enviando...</span>
                        </span>
                    ) : (
                        <span className="flex items-center justify-center">
                            {selectedPost ? "Actualizar Post" : "Guardar Post"}
                            <FiArrowRight className="ml-2 h-4 w-4" />
                        </span>
                    )}
                </Button>
            </div>
        </form>
    );
}
