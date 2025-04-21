// src/app/tags/[slug]/page.tsx

import React, { Suspense } from "react";
import TagBreadcrumbs from "@/components/tags/TagBreadcrumbs";
import PostGrid from "@/components/posts/PostGrid";
import PostGridSkeleton from "@/components/posts/skeletons/PostGridSkeleton";

export default function TagPage({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;

    return (
        <div className="container mx-auto px-4 py-8">
            <TagBreadcrumbs tagName={slug} />

            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-8">
                Posts etiquetados con <span className="text-blue-600 dark:text-blue-400">#{slug}</span>
            </h1>

            <Suspense
                key={slug}
                fallback={<PostGridSkeleton />}
            >
                <PostGrid tag={slug} />
            </Suspense>
        </div>
    );
}
