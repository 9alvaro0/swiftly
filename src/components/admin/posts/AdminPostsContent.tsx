// components/admin/posts/AdminPostsContent.tsx
"use client";

import Link from "next/link";
import { Tag, FileText } from "lucide-react";
import PostCard from "@/components/admin/PostCard";
import { useSearchParams, useRouter } from "next/navigation";
import { usePosts } from "@/hooks/usePosts";
import AdminPostsSkeleton from "@/components/admin/posts/skeletons/AdminPostsSkeleton";
import Select from "@/components/ui/Select";
import { useCallback } from "react";

export default function AdminPostsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const status = searchParams.get("status");

    const { posts, isLoading, refetch } = usePosts();

    const filteredPosts = status
        ? posts.filter((t) => (status === "published" ? t.isPublished : !t.isPublished))
        : posts;

    const statusOptions = [
        { value: "", label: "Todos" },
        { value: "published", label: "Publicados" },
        { value: "draft", label: "Borradores" },
    ];

    const handleStatusChange = (newStatus: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (newStatus) {
            params.set("status", newStatus);
        } else {
            params.delete("status");
        }
        router.push(`/admin/posts?${params.toString()}`);
    };

    const getStatusText = () => {
        if (status === "published") return "publicados";
        if (status === "draft") return "en borrador";
        return "en total";
    };

    const handlePostDeleted = useCallback(() => {
        refetch();
    }, [refetch]);

    return (
        <div className="p-6 md:p-8 space-y-8">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <FileText className="h-6 w-6 text-primary" />
                        Gestión de Publicaciones
                    </h1>
                    <p className="text-neutral-600 mt-1">
                        {filteredPosts.length} {filteredPosts.length === 1 ? "publicación" : "publicaciones"}{" "}
                        {getStatusText()}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Filter dropdown */}
                    <Select
                        id="status-filter"
                        label=""
                        value={status || ""}
                        options={statusOptions}
                        onChange={(e) => handleStatusChange(e.target.value)}
                    />

                    {/* Create button */}
                    <Link
                        href="/admin/posts/new"
                        className="btn-primary flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all hover:shadow-md"
                    >
                        <Tag className="h-4 w-4" />
                        <span>Nueva publicación</span>
                    </Link>
                </div>
            </div>

            {/* Content section */}
            {isLoading ? (
                <AdminPostsSkeleton />
            ) : filteredPosts.length === 0 ? (
                <div className="text-center py-16 bg-neutral-50 dark:bg-neutral-800/30 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <div className="inline-flex justify-center items-center p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-4">
                        <FileText className="h-6 w-6 text-neutral-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No hay publicaciones disponibles</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
                        {status === "published"
                            ? "No hay publicaciones publicadas. Publica algunas publicaciones para verlas aquí."
                            : status === "draft"
                            ? "No hay borradores de publicaciones. Crea una nueva publicación para empezar."
                            : "No hay publicaciones en el sistema. Crea tu primera publicación para empezar."}
                    </p>
                    <Link
                        href="/admin/posts/new"
                        className="btn-secondary inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                    >
                        <Tag className="h-4 w-4" />
                        <span>Crear nueva publicación</span>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onPostDeleted={handlePostDeleted}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
