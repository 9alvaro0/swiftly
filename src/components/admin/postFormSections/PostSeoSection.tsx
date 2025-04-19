"use client";

import React from "react";
import Textarea from "@/components/ui/Textarea";
import TagInput from "@/components/ui/TagInput";

interface PostSeoSectionProps {
    post: {
        keywords?: string[];
        metaDescription?: string;
    };
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onAddKeyword: (keyword: string) => void;
    onRemoveKeyword: (keyword: string) => void;
}

const PostSeoSection: React.FC<PostSeoSectionProps> = ({ post, onChange, onAddKeyword, onRemoveKeyword }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">SEO</h3>

            <TagInput
                id="keywords"
                label="Palabras clave (SEO)"
                tags={post.keywords || []}
                onAddTag={onAddKeyword}
                onRemoveTag={onRemoveKeyword}
            />

            <Textarea
                id="metaDescription"
                name="metaDescription"
                label="Meta Descripción (SEO)"
                value={post.metaDescription || ""}
                onChange={onChange}
                rows={2}
                placeholder="Descripción breve que aparecerá en los resultados de búsqueda (150-160 caracteres recomendados)"
                maxLength={160}
            />

            {post.metaDescription && (
                <div className="text-xs text-gray-500">{post.metaDescription.length}/160 caracteres</div>
            )}
        </div>
    );
};

export default PostSeoSection;
