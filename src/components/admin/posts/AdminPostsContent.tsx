// components/admin/posts/AdminPostsContent.tsx
"use client";

import Link from "next/link";
import { Tag, FileText } from "lucide-react";
import PostCard from "@/components/admin/posts/PostCard";
import { useSearchParams, useRouter } from "next/navigation";
import { useAdminPosts } from "@/hooks/useAdminAPI";
import AdminPostsSkeleton from "@/components/admin/posts/skeletons/AdminPostsSkeleton";
import Select from "@/components/ui/Select";
import { useCallback } from "react";

export default function AdminPostsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const status = searchParams.get("status");

    const { data: posts, isLoading, refetch } = useAdminPosts();

    const filteredPosts = posts && status
        ? posts.filter((t) => (status === "published" ? t.isPublished : !t.isPublished))
        : posts || [];

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
        <div className="space-y-6 md:space-y-8">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
                        <FileText className="h-6 w-6 text-blue-400" />
                        Gestión de Publicaciones
                    </h1>
                    <p className="text-gray-400 mt-1">
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
                        className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all hover:shadow-md"
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
                <div className="text-center py-16 bg-gray-800/30 rounded-xl border border-gray-700">
                    <div className="inline-flex justify-center items-center p-4 bg-gray-800 rounded-full mb-4">
                        <FileText className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-white">No hay publicaciones disponibles</h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                        {status === "published"
                            ? "No hay publicaciones publicadas. Publica algunas publicaciones para verlas aquí."
                            : status === "draft"
                            ? "No hay borradores de publicaciones. Crea una nueva publicación para empezar."
                            : "No hay publicaciones en el sistema. Crea tu primera publicación para empezar."}
                    </p>
                    <Link
                        href="/admin/posts/new"
                        className="bg-gray-700 hover:bg-gray-600 text-white inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
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
