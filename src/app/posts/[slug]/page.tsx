// src/app/posts/[slug]/page.tsx

"use client";

import { useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { usePost } from "@/hooks/usePost";
import TutorialDetailSkeleton from "@/components/tutorials/skeletons/TutorialDetailSkeleton";
import PostDetail from "@/components/post/PostDetail";

export default function PostDetailPage() {
    const routeParams = useParams();
    const slug = routeParams.slug as string;
    
    const { post, isLoading, error } = usePost(slug);

    useEffect(() => {
        if (error) {
            console.error("Error fetching post:", error);
        }
    }, [error]);

    if (isLoading) {
        return <TutorialDetailSkeleton />;
    }

    if (!post && !isLoading) {
        notFound();
    }

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold text-red-500">Error al cargar el post</h1>
                <p className="mt-4">Ocurrió un error al intentar cargar este post. Por favor, inténtalo más tarde.</p>
            </div>
        );
    }

    return <PostDetail post={post} branch="tutoriales" />;
}
