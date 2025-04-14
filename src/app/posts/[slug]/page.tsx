// src/app/posts/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import PostTag from "@/components/posts/PostTag";
import { Metadata } from "next";
import React from "react";
import { usePosts } from "@/hooks/usePosts";

// Generar metadatos para SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const resolvedParams = params;
    const slug = resolvedParams.slug;

    try {
        const { getPostBySlug } = usePosts(); 
        const post = await getPostBySlug(slug);

        if (!post) {
            return {
                title: "Post no encontrado",
                description: "El post solicitado no existe",
            };
        }

        return {
            title: post.title,
            description: post.description,
            openGraph: {
                title: post.title,
                description: post.description,
                images: post.imageUrl ? [{ url: post.imageUrl }] : [],
            },
        };
    } catch (error) {
        console.error("Error fetching post metadata:", error);
        return {
            title: "Error al cargar el post",
            description: "Ocurrió un error al intentar cargar este post",
        };
    }
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
    const resolvedParams = params;
    const slug = resolvedParams.slug;

    try {
        const { getPostBySlug } = usePosts(); 
        const post = await getPostBySlug(slug);

        if (!post) {
            notFound();
        }

        return (
            <article className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="mb-8">
                    <PostTag label={post.category} />
                    <h1 className="text-4xl font-bold mt-4 mb-6">{post.title}</h1>

                    <div className="flex items-center space-x-4 text-gray-600 mb-6">
                        {post.author.avatar && (
                            <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        )}
                        <div>
                            <p className="font-semibold">{post.author.name}</p>
                            <p className="text-sm">
                                {post.createdAt.toLocaleDateString("es-ES", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}{" "}
                                • {post.readTime} min lectura
                            </p>
                        </div>
                    </div>
                </div>

                {post.imageUrl && (
                    <div className="relative w-full h-[400px] mb-8">
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                )}

                <div className="prose lg:prose-xl dark:prose-invert">
                    <p>{post.description}</p>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    {/* Si tienes contenido estructurado como en tu ejemplo original,
                    puedes renderizarlo aquí en lugar de usar dangerouslySetInnerHTML */}
                </div>
            </article>
        );
    } catch (error) {
        console.error("Error fetching post:", error);
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold text-red-500">Error al cargar el post</h1>
                <p className="mt-4">Ocurrió un error al intentar cargar este post. Por favor, inténtalo más tarde.</p>
            </div>
        );
    }
}
