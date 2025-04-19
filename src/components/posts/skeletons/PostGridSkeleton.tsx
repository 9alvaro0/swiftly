// src/components/posts/skeletons/PostGridSkeleton.tsx

import React from "react";
import PostCardSkeleton from "./PostCardSkeleton";

interface PostGridSkeletonProps {
    count?: number;
    featuredPostIndex?: number | null;
}

export default function PostGridSkeleton({ count = 8, featuredPostIndex = null }: PostGridSkeletonProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <PostCardSkeleton
                    key={index}
                    variant={index === featuredPostIndex ? "featured" : "default"}
                />
            ))}
        </div>
    );
}
