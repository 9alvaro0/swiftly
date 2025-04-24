"use client";

import React from "react";
import PostImageHandler from "@/components/admin/PostImageHandler";
import { Post } from "@/types/Post";
import PostFeaturedImage from "@/components/post/PostFeaturedImage";
import { getDefaultPost } from "@/utils/postUtils";
import { HiOutlinePhotograph } from "react-icons/hi";
import TutorialCard from "@/components/tutorials/TutorialCard";
import { formatDate } from "@/utils/dateUtils";
import { Link } from "lucide-react";
import Image from "next/image";

interface PostImageSectionProps {
    post: Post | undefined;
    uploadedImages: string[];
    onSelectMainImage: (imageUrl: string) => void;
    onSelectCoverImage: (imageUrl: string) => void;
    onInsertInContent: (imageUrl: string) => void;
}

const PostImageSection: React.FC<PostImageSectionProps> = ({
    post,
    uploadedImages,
    onSelectMainImage,
    onSelectCoverImage,
    onInsertInContent,
}) => {
    const defaultPost = getDefaultPost();
    const previewPost = {
        ...defaultPost,
        ...post,
    };

    return (
        <div className="space-y-4">
            <label className="block text-primary font-medium mb-2">Gestión de Imágenes</label>

            <PostImageHandler
                postId={post?.id}
                onSelectMainImage={onSelectMainImage}
                onSelectCoverImage={onSelectCoverImage}
                onInsertInContent={onInsertInContent}
                initialImages={uploadedImages}
            />

            <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Imágenes del Post</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Vista previa de la tarjeta */}
                    <div className="space-y-3">
                        {previewPost.imageUrl ? (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Vista previa de la tarjeta
                                    </label>
                                </div>
                                <div className="p-4">
                                    {previewPost?.type === "article" ? (
                                        <div
                                            key={previewPost.id}
                                            className="flex border-b border-white/10 pb-6 last:border-0"
                                        >
                                            {previewPost.coverImage && (
                                                <div className="w-1/4 mr-4 h-24 relative flex-shrink-0 rounded-md overflow-hidden">
                                                    <Image
                                                        src={previewPost.coverImage}
                                                        alt={previewPost.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}

                                            <div className="flex-1">
                                                <div className="flex items-center mb-1 text-xs text-blue-500">
                                                    <span>
                                                        {previewPost.publishedAt
                                                            ? formatDate(previewPost.publishedAt)
                                                            : "Fecha no disponible"}
                                                    </span>
                                                    {previewPost.tags && previewPost.tags.length > 0 && (
                                                        <>
                                                            <span className="mx-2">•</span>
                                                            <span>
                                                                <Link
                                                                    href={`/tags/${previewPost.tags[0]}`}
                                                                    className="hover:underline"
                                                                >
                                                                    #{previewPost.tags[0]}
                                                                </Link>
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                <Link href={`/posts/${previewPost.slug}`}>
                                                    <h3 className="text-lg font-semibold mb-1 hover:text-blue-500 transition-colors">
                                                        {previewPost.title}
                                                    </h3>
                                                </Link>

                                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                    {previewPost.description || previewPost.content.substring(0, 100)}
                                                    ...
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <TutorialCard tutorial={previewPost} />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-6">
                                <HiOutlinePhotograph className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-2" />
                                <span className="text-gray-500 dark:text-gray-400 text-center">
                                    No hay imagen principal seleccionada
                                </span>
                                <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    Sube una imagen para ver la vista previa
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Imagen de Portada */}
                    <div className="space-y-3">
                        {previewPost.imageUrl ? (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Vista previa de la imagen de portada
                                    </label>
                                </div>
                                <div className="p-4">
                                    <PostFeaturedImage
                                        image={previewPost.coverImage || ""}
                                        title={previewPost.title}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-6">
                                <HiOutlinePhotograph className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-2" />
                                <span className="text-gray-500 dark:text-gray-400 text-center">
                                    No hay imagen seleccionada
                                </span>
                                <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    Sube una imagen para ver la vista previa
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Para cambiar estas imágenes, utiliza el Gestor de Imágenes más abajo y selecciona &quot;Imagen
                    Principal&quot; o &quot;Portada&quot;.
                </p>
            </div>

            <div className="text-sm text-gray-500 mt-2">
                <p>
                    Sube imágenes para tu artículo. Puedes seleccionar una como imagen principal, imagen de portada o
                    insertarlas en el contenido del artículo.
                </p>
            </div>
        </div>
    );
};

export default PostImageSection;
