// src/components/admin/posts/PostImageHandler.tsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { Upload, AlertCircle } from "lucide-react";
import { useImages } from "@/hooks/useImages";
import { deletePostImageByUrl, generatePostImagePath } from "@/utils/postImageUtils";
import Image from "next/image";
import { Post } from "@/types/Post";

interface PostImageHandlerProps {
    post: Post;
    onSelectMainImage: (imageUrl: string) => void;
    onSelectCoverImage: (imageUrl: string) => void;
    onInsertInContent: (imageUrl: string) => void;
    onImageDeleted: (imageUrl: string) => void;
}

export default function PostImageHandler({
    post,
    onSelectMainImage,
    onSelectCoverImage,
    onInsertInContent,
    onImageDeleted,
}: PostImageHandlerProps) {
    const { uploadOrUpdate, loading, error, list } = useImages();
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Cargar imágenes del post cuando cambie
    useEffect(() => {
        const loadImages = async () => {
            if (post.id) {
                try {
                    const images = [...(post.images || [])];
                    setUploadedImages(images);
                } catch (error) {
                    console.error("Error al cargar imágenes:", error);
                }
            }
        };

        loadImages();
    }, [post.id, post.images, post.imageUrl, post.coverImage, list]);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploadProgress(true);
        try {
            const path = generatePostImagePath(file.name, post.id);
            const imageUrl = await uploadOrUpdate(file, path);

            if (!uploadedImages.includes(imageUrl)) {
                const newImages = [...uploadedImages, imageUrl];
                setUploadedImages(newImages);
            }
        } catch (error) {
            console.error("Error subiendo imagen:", error);
        } finally {
            setUploadProgress(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleDeleteImage = async (imageUrl: string) => {
        if (isDeleting) return;

        setIsDeleting(true);
        try {
            const success = await deletePostImageByUrl(imageUrl);

            if (success) {
                const newImages = uploadedImages.filter((url) => url !== imageUrl);
                setUploadedImages(newImages);
                onImageDeleted(imageUrl);
            }
        } catch (error) {
            console.error("Error eliminando imagen:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleUseAsMainImage = (imageUrl: string) => {
        onSelectMainImage(imageUrl);
    };

    const handleUseAsCoverImage = (imageUrl: string) => {
        onSelectCoverImage(imageUrl);
    };

    return (
        <div className="space-y-6">
            <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Gestor de Imágenes</h3>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 mb-4 flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                        <p className="text-red-600 dark:text-red-400 text-sm">Error: {error.message}</p>
                    </div>
                )}

                {/* Componente de subida integrado */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            className="hidden"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={triggerFileInput}
                            className="flex items-center gap-2"
                            disabled={loading || uploadProgress}
                        >
                            <Upload className="w-4 h-4" />
                            {loading || uploadProgress ? "Subiendo..." : "Subir Imagen"}
                        </Button>
                    </div>
                </div>

                {uploadedImages.length > 0 && (
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">Imágenes Disponibles</h4>
                            <p className="text-sm text-gray-500">{uploadedImages.length} imagen(es)</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {uploadedImages.map((imageUrl, index) => (
                                <div
                                    key={`${imageUrl}-${index}`}
                                    className="relative group border rounded-md overflow-hidden"
                                >
                                    {/* Imagen */}
                                    <div className="w-full h-32 relative bg-gray-100">
                                        <Image
                                            src={imageUrl}
                                            alt={`Imagen ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            width={400}
                                            height={200}
                                        />
                                    </div>

                                    {/* Overlay con acciones */}
                                    <div
                                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                                        flex flex-col items-center justify-center gap-2 transition-opacity"
                                    >
                                        <div className="flex gap-2 mb-2">
                                            <button
                                                type="button"
                                                onClick={() => handleUseAsMainImage(imageUrl)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs rounded"
                                            >
                                                Imagen Principal
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleUseAsCoverImage(imageUrl)}
                                                className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 text-xs rounded"
                                            >
                                                Portada
                                            </button>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onInsertInContent(imageUrl)}
                                                className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs rounded"
                                            >
                                                Insertar
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDeleteImage(imageUrl)}
                                                disabled={isDeleting}
                                                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
