// src/components/posts/skeletons/PostsSkeleton.tsx

import PostsHeaderAndFilterSkeleton from "@/components/posts/skeletons/PostsHeaderAndFilterSkeleton";
import PostCardSkeleton from "@/components/posts/skeletons/PostCardSkeleton";

export default function PostsSkeleton() {
    return (
        <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
            <PostsHeaderAndFilterSkeleton />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
                    <PostCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};
