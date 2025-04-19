"use client";

import React, { useRef, useState } from "react";
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
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { Tag } from "@/types/Tag";
import { useTags } from "@/hooks/useTags";
import { useAuthStore } from "@/store/authStore";
interface PostFormProps {
    isEdit?: boolean;
    initialData?: Post;
    onSubmit?: (data: Post) => void;
}

export default function PostForm({ isEdit = false, initialData, onSubmit }: PostFormProps) {
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const { tags, createNewTag, isLoading: loadingTags } = useTags();
    const [isAddingNewTag, setIsAddingNewTag] = useState(false);
    const [newTagName, setNewTagName] = useState("");
    const [tagError, setTagError] = useState("");
    const { user } = useAuthStore();

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

    // Función para añadir una etiqueta existente
    const handleAddExistingTag = (tagName: string) => {
        if (!tagName || (post.tags && post.tags.includes(tagName))) {
            return;
        }
        addTag(tagName);
    };

    // Función para crear y añadir una nueva etiqueta
    const handleCreateNewTag = async () => {
        if (!newTagName.trim()) {
            setTagError("El nombre de la etiqueta no puede estar vacío");
            return;
        }

        // Verificar si la etiqueta ya existe en las etiquetas disponibles
        const tagExists: boolean = tags.some((tag: Tag) => tag.name.toLowerCase() === newTagName.toLowerCase());
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
            addTag(newTagName.trim());

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
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
                onSubmit?.(post);
            }}
            className="space-y-8"
        >
            {/* Secciones básicas y metadatos */}
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

            {/* Sección de etiquetas mejorada */}
            <div>
                <label className="block text-primary font-medium mb-2">Etiquetas</label>

                {/* Mostrar etiquetas seleccionadas */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.map((tag) => (
                        <div
                            key={tag}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full flex items-center"
                        >
                            <span className="mr-2">#{tag}</span>
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
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
                        <div className="items-center space-x-2">
                            <Select
                                id="existingTags"
                                label=""
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                    handleAddExistingTag(e.target.value)
                                }
                                value=""
                                options={[
                                    { value: "", label: "Seleccionar etiqueta..." },
                                    ...tags
                                        .filter((tag: Tag) => !post.tags?.includes(tag.name))
                                        .map((tag: Tag) => ({ value: tag.name, label: `#${tag.name}` })),
                                ]}
                                disabled={loadingTags}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
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
                        <div className="items-end space-x-2">
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
                            <Button
                                type="button"
                                variant="primary"
                                size="sm"
                                onClick={handleCreateNewTag}
                            >
                                Crear y añadir
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
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
                )}
            </div>

            {/* Keywords para SEO */}
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

            {/* Markdown editor */}
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

            {/* Subida de imágenes */}
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
                                    width={300}
                                    height={200}
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

            {/* Autor */}
            <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-6 bg-blue-50 dark:bg-blue-950/30 shadow-sm mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Información del Autor</h3>

                    {(post.author?.name || user?.name) && (
                        <div className="flex items-center">
                            <span className="text-sm text-blue-600 dark:text-blue-400 mr-2">Usando perfil actual</span>
                            <Checkbox
                                id="useProfileInfo"
                                checked={!!(post.author?.name || user?.name)}
                                disabled={true}
                                label=""
                            />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input
                        id="author.name"
                        name="author.name"
                        label="Nombre del Autor"
                        value={post.author?.name || user?.name || ""}
                        onChange={handleChange}
                        disabled={!!(post.author?.name || user?.name)}
                        className={post.author?.name || user?.name ? "bg-gray-100 dark:bg-gray-800" : ""}
                    />
                    <Input
                        id="author.username"
                        name="author.username"
                        label="Username del Autor"
                        value={post.author?.username || user?.username || ""}
                        onChange={handleChange}
                        disabled={!!(post.author?.username || user?.username)}
                        className={post.author?.username || user?.username ? "bg-gray-100 dark:bg-gray-800" : ""}
                    />
                    <Input
                        id="author.avatar"
                        name="author.avatar"
                        label="Avatar del Autor"
                        value={post.author?.avatar || user?.photoURL || ""}
                        onChange={handleChange}
                        disabled={!!(post.author?.avatar || user?.photoURL)}
                        className={post.author?.avatar || user?.photoURL ? "bg-gray-100 dark:bg-gray-800" : ""}
                    />
                </div>

                <Textarea
                    id="author.bio"
                    name="author.bio"
                    label="Bio del Autor"
                    value={post.author?.bio || user?.bio || ""}
                    onChange={handleChange}
                    rows={3}
                    disabled={!!(post.author?.bio || user?.bio)}
                    className={post.author?.bio || user?.bio ? "bg-gray-100 dark:bg-gray-800" : ""}
                />

                {/* Redes Sociales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <Input
                        id="author.socialLinks.github"
                        name="author.socialLinks.github"
                        label="GitHub"
                        value={post.author?.socialLinks?.github || user?.socialLinks?.github || ""}
                        onChange={handleChange}
                        disabled={!!(post.author?.socialLinks?.github || user?.socialLinks?.github)}
                        className={
                            post.author?.socialLinks?.github || user?.socialLinks?.github
                                ? "bg-gray-100 dark:bg-gray-800"
                                : ""
                        }
                    />
                    <Input
                        id="author.socialLinks.linkedin"
                        name="author.socialLinks.linkedin"
                        label="LinkedIn"
                        value={post.author?.socialLinks?.linkedin || user?.socialLinks?.linkedin || ""}
                        onChange={handleChange}
                        disabled={!!(post.author?.socialLinks?.linkedin || user?.socialLinks?.linkedin)}
                        className={
                            post.author?.socialLinks?.linkedin || user?.socialLinks?.linkedin
                                ? "bg-gray-100 dark:bg-gray-800"
                                : ""
                        }
                    />
                </div>

                {(post.author?.name || user?.name) && (
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                        <p>
                            Los campos del autor están prellenados con tu información de perfil y bloqueados para
                            edición. Si necesitas cambiar estos datos, por favor actualiza tu perfil.
                        </p>
                    </div>
                )}
            </div>

            {/* Flags adicionales */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Checkbox
                    id="isPublished"
                    name="isPublished"
                    checked={post.isPublished}
                    onChange={(e) => setPost({ ...post, isPublished: e.target.checked })}
                    label="¿Publicar?"
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
