// src/app/tags/[slug]/page.tsx

import React, { Suspense } from "react";
import TagBreadcrumbs from "@/components/tags/TagBreadcrumbs";
import PostGrid from "@/components/home/latestPosts/PostList";
import PostGridSkeleton from "@/components/posts/skeletons/PostGridSkeleton";
import { slugToTag } from "@/utils/tagUtils";

interface TagPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function TagPage(props: TagPageProps) {
    const resolvedParams = await props.params;
    const { slug } = resolvedParams;
    
    // Convert slug back to original tag format for database query
    const originalTag = slugToTag(slug);

    return (
        <div className="container mx-auto px-4 py-8">
            <TagBreadcrumbs tagName={originalTag} />

            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-8">
                Posts etiquetados con <span className="text-blue-600 dark:text-blue-400">#{originalTag}</span>
            </h1>

            <Suspense
                key={slug}
                fallback={<PostGridSkeleton />}
            >
                <PostGrid tag={originalTag} />
            </Suspense>
        </div>
    );
}
