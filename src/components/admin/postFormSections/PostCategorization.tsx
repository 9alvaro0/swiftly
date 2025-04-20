"use client";

import React from "react";
import Select from "@/components/ui/Select";
import { LEVEL_OPTIONS, POST_TYPE_OPTIONS } from "@/constants/post";

interface PostCategorizationProps {
    post: {
        level?: string;
        type?: string;
    };
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PostCategorization: React.FC<PostCategorizationProps> = ({ post, onChange }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Categorización</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Select
                    id="level"
                    name="level"
                    label="Nivel"
                    value={post.level || ""}
                    onChange={onChange}
                    options={LEVEL_OPTIONS}
                />

                <Select
                    id="type"
                    name="type"
                    label="Tipo de Post"
                    value={post.type || ""}
                    onChange={onChange}
                    options={POST_TYPE_OPTIONS}
                />
            </div>
        </div>
    );
};

export default PostCategorization;
