// src/app/posts/page.tsx
import PostGrid from "@/components/posts/PostGrid";
import { getAllPosts } from "@/services/postService";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Todos los Posts | Swift Academy",
    description: "Explora nuestra biblioteca de tutoriales y artículos sobre Swift y desarrollo iOS",
};

export default function PostsPage() {
    const posts = getAllPosts();

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Todas las Publicaciones</h1>
            <div className="space-y-8">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">{posts.length} publicaciones disponibles</p>
                </div>
                <PostGrid posts={posts} />
            </div>
        </div>
    );
}
