"use client";

import React from "react";
import PostImageHandler from "@/components/admin/PostImageHandler";

interface PostImageSectionProps {
    postId?: string;
    uploadedImages: string[];
    onSelectMainImage: (imageUrl: string) => void;
    onSelectCoverImage: (imageUrl: string) => void;
    onInsertInContent: (imageUrl: string) => void;
}

const PostImageSection: React.FC<PostImageSectionProps> = ({
    postId,
    uploadedImages,
    onSelectMainImage,
    onSelectCoverImage,
    onInsertInContent,
}) => {
    return (
        <div className="space-y-4">
            <label className="block text-primary font-medium mb-2">Gestión de Imágenes</label>

            <PostImageHandler
                postId={postId}
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
