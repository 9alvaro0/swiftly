// src/app/tutorials/[slug]/page.tsx

"use client";

import { useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import PostDetail from "@/components/post/PostDetail";
import TutorialError from "@/components/tutorials/TutorialError";
import { usePost } from "@/hooks/usePost";
import TutorialDetailSkeleton from "@/components/tutorials/skeletons/TutorialDetailSkeleton";

export default function TutorialDetailPage() {
    const routeParams = useParams();
    const slug = routeParams.slug as string;

    const { post: tutorial, isLoading, error } = usePost(slug);

    useEffect(() => {
        if (error) {
            console.error("Error fetching post:", error);
        }
    }, [error]);

    if (isLoading) {
        return <TutorialDetailSkeleton />;
    }

    if (!tutorial && !isLoading) {
        notFound();
    }

    if (!tutorial) {
        return <TutorialError />;
    }
    return (
        <PostDetail
            post={tutorial}
            branch="tutorials"
        />
    );
}
