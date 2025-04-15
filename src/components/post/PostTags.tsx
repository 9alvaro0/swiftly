// src/components/post/PostTags.tsx

import { Tag } from "lucide-react";
import PostTag from "../posts/PostTag";

interface PostTagsProps {
    tags: string[];
}

export default function PostTags({ tags }: PostTagsProps) {
    if (!tags || tags.length === 0) return null;

    return (
        <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
                <Tag
                    size={18}
                    className="text-blue-400"
                />
                <h3 className="text-lg font-semibold text-white">Etiquetas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <PostTag
                        key={tag}
                        tag={tag}
                    />
                ))}
            </div>
        </div>
    );
}
