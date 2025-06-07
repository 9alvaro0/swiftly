"use client";

import React from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

interface PostBasicInfoProps {
    title?: string;
    description?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    errors: {
        title?: string;
        description?: string;
        imageUrl?: string;
        [key: string]: string | undefined;
    };
}

const PostBasicInfo: React.FC<PostBasicInfoProps> = ({ title, description, onChange, errors }) => {
    return (
        <div className="space-y-6">
            {/* Campos de texto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    id="title"
                    name="title"
                    label="Título del Post"
                    value={title || ""}
                    onChange={onChange}
                    error={errors.title}
                />
            </div>

            <Textarea
                id="description"
                name="description"
                label="Descripción Corta"
                value={description || ""}
                onChange={onChange}
                error={errors.description}
            />
        </div>
    );
};

export default PostBasicInfo;
