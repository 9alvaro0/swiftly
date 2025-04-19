// src/app/admin/tutorials/edit/[slug]/page.tsx

"use client";

import { useEffect } from "react";
import TutorialForm from "@/components/admin/PostForm";
import { notFound, useParams } from "next/navigation";
import { usePost } from "@/hooks/usePost";

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
        return <div className="p-8">Cargando...</div>;
    }

    if (!post && !isLoading) {
        notFound();
    }
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Editar Post</h1>
            <TutorialForm
                isEdit
                initialData={post!}
            />
        </div>
    );
}