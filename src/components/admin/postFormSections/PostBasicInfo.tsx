"use client";

import React from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Image from "next/image";

interface PostBasicInfoProps {
    post: {
        title?: string;
        slug?: string;
        imageUrl?: string;
        coverImage?: string;
        description?: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    errors: {
        title?: string;
        description?: string;
        imageUrl?: string;
        [key: string]: string | undefined;
    };
}

const PostBasicInfo: React.FC<PostBasicInfoProps> = ({ post, onChange, errors }) => {
    return (
        <div className="space-y-6">
            {/* Sección de visualización de imágenes */}
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <h3 className="text-lg font-medium mb-4">Imágenes del Post</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Imagen Principal */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Imagen Principal
                        </label>
                        <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800 h-40 relative">
                            {post.imageUrl ? (
                                <Image
                                    src={post.imageUrl}
                                    alt="Imagen principal"
                                    className="w-full h-full object-contain"
                                    width={1600}
                                    height={900}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-600">
                                    <span>No hay imagen principal seleccionada</span>
                                </div>
                            )}
                        </div>
                        {/* Campo oculto que mantiene el valor pero no se muestra visualmente */}
                        <input
                            type="hidden"
                            id="imageUrl"
                            name="imageUrl"
                            value={post.imageUrl || ""}
                        />
                        {errors.imageUrl && <p className="text-sm text-red-500 mt-1">{errors.imageUrl}</p>}
                    </div>

                    {/* Imagen de Portada */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Imagen de Portada (opcional)
                        </label>
                        <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800 h-40 relative">
                            {post.coverImage ? (
                                <Image
                                    src={post.coverImage}
                                    alt="Imagen de portada"
                                    className="w-full h-full object-contain"
                                    width={1600}
                                    height={900}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-600">
                                    <span>No hay imagen de portada seleccionada</span>
                                </div>
                            )}
                        </div>
                        {/* Campo oculto para mantener el valor */}
                        <input
                            type="hidden"
                            id="coverImage"
                            name="coverImage"
                            value={post.coverImage || ""}
                        />
                    </div>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Para cambiar estas imágenes, utiliza el Gestor de Imágenes más abajo y selecciona &quot;Imagen Principal&quot;
                    o &quot;Portada&quot;.
                </p>
            </div>

            {/* Campos de texto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    id="title"
                    name="title"
                    label="Título del Post"
                    value={post.title || ""}
                    onChange={onChange}
                    error={errors.title}
                />
                <Input
                    id="slug"
                    name="slug"
                    label="Slug personalizado"
                    value={post.slug || ""}
                    onChange={onChange}
                />
            </div>

            <Textarea
                id="description"
                name="description"
                label="Descripción Corta"
                value={post.description || ""}
                onChange={onChange}
                rows={2}
                error={errors.description}
            />
        </div>
    );
};

export default PostBasicInfo;
