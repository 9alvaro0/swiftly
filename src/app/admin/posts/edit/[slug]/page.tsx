// src/app/admin/tutorials/edit/[slug]/page.tsx

"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { usePost } from "@/hooks/usePost";
import PostForm from "@/components/admin/posts/PostForm";
import Spinner from "@/components/ui/Spinner";

export default function EditTutorialPage() {
    const routeParams = useParams();
    const slug = routeParams.slug as string;
    const { post, isLoading, error } = usePost(slug);

    useEffect(() => {
        if (error) {
            console.error("Error fetching post:", error);
        }
    }, [error]);

    if (isLoading) {
        return (
            <div className="p-8">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Editar Post</h1>
            <PostForm selectedPost={post} />
        </div>
    );
}
