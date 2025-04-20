"use client";

import React from "react";
import PostImageHandler from "@/components/admin/PostImageHandler";
import { Post } from "@/types/Post";
import PostFeaturedImage from "@/components/post/PostFeaturedImage";
import { getDefaultPost } from "@/utils/postUtils";
import PostCard from "../PostCard";
import { HiOutlinePhotograph } from "react-icons/hi";

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
                                    <PostCard post={previewPost} />
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
                                        imageUrl={previewPost.imageUrl}
                                        coverImage={previewPost.coverImage}
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

            <PostImageHandler
                postId={post?.id}
                onSelectMainImage={onSelectMainImage}
                onSelectCoverImage={onSelectCoverImage}
                onInsertInContent={onInsertInContent}
                initialImages={uploadedImages}
            />

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
