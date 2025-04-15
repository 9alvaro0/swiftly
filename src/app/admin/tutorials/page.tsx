"use client";

import Link from "next/link";
import { Tag } from "lucide-react";
import TutorialCard from "@/components/admin/PostCard";
import { useSearchParams } from "next/navigation";
import { usePosts } from "@/hooks/usePosts";

export default function AdminTutorialsPage() {
    const searchParams = useSearchParams();
    const status = searchParams.get("status");

    const { posts, isLoading } = usePosts();

    const filteredPosts = status
        ? posts.filter((t) => (status === "published" ? t.isPublished : !t.isPublished))
        : posts;

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gestión de Tutoriales</h1>
                <Link
                    href="/admin/tutorials/new"
                    className="btn-primary flex items-center space-x-2"
                >
                    <Tag size={16} />
                    <span>Nuevo Tutorial</span>
                </Link>
            </div>

            <div className="text-neutral-600">
                ({filteredPosts.length}) tutoriales{" "}
                {status === "published" ? "publicados" : status === "draft" ? "en borrador" : "cargados"}
            </div>

            {isLoading ? (
                <p>Cargando...</p>
            ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12 rounded-md">
                    <p className="text-neutral-600 mb-4">No hay tutoriales disponibles</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                        <TutorialCard
                            key={post.id}
                            tutorial={post}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
