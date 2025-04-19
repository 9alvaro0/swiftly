"use client";

import React from "react";
import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";
import TagBreadcrumbs from "@/components/tags/TagBreadcrumbs";
import { AiFillTags } from "react-icons/ai";
import PostGrid from "@/components/posts/PostGrid";
import TagPageSkeleton from "@/components/tags/skeletons/TagPageSkeleton";
import { useParams } from "next/navigation";

export default function TagPage() {
    const routeParams = useParams();
    const slug = routeParams.slug as string;

    const { posts, isLoading } = usePosts();

    // Filtrar posts que tienen este tag
    const filteredPosts = React.useMemo(() => {
        return posts.filter((post) => post.tags && post.tags.some((tag) => tag.toLowerCase() === slug.toLowerCase()));
    }, [posts, slug]);

    if (isLoading) {
        return <TagPageSkeleton />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <TagBreadcrumbs tagName={slug} />

            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-8">
                Posts etiquetados con <span className="text-blue-600 dark:text-blue-400">#{slug}</span>
            </h1>

            {filteredPosts.length > 0 ? (
                <PostGrid posts={filteredPosts} />
            ) : (
                <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow p-8">
                    <AiFillTags className="mx-auto text-gray-400 dark:text-gray-500 text-5xl mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2">No hay posts asociados a esta etiqueta.</p>
                    <Link
                        href="/tags"
                        className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Ver todas las etiquetas
                    </Link>
                </div>
            )}
        </div>
    );
}
