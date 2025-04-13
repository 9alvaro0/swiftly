// src/app/posts/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import PostTag from "@/components/posts/PostTag";
import { Metadata } from "next";
import { getPostBySlug } from "@/services/postService";
import React from "react";

// Generación dinámica de metadatos
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return {
            title: "Post no encontrado",
            description: "El post solicitado no existe",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [{ url: post.image }],
        },
    };
}

export default function PostDetailPage({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8">
                <PostTag label={post.tag} />
                <h1 className="text-4xl font-bold mt-4 mb-6">{post.title}</h1>

                <div className="flex items-center space-x-4 text-gray-600 mb-6">
                    <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div>
                        <p className="font-semibold">{post.author.name}</p>
                        <p className="text-sm">
                            {post.date} • {post.readTime} lectura
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative w-full h-[400px] mb-8">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded-lg"
                />
            </div>

            <div className="prose lg:prose-xl dark:prose-invert">
                <p>{post.excerpt}</p>
                <p>{post.content.map((block, index) => {
                    switch (block.type) {
                        case "paragraph":
                            return <p key={index}>{block.text}</p>;
                        case "code":
                            return (
                                <pre key={index} className="p-4 rounded-lg">
                                    <code>{block.code}</code>
                                </pre>
                            );
                        case "heading":
                            return React.createElement(`h${block.level}`, { key: index }, block.text);
                        case "list":
                            return (
                                <ul key={index} className="list-disc pl-6">
                                    {block.items.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            );
                        case "image":
                            return (
                                <figure key={index} className="mb-4">
                                    <Image
                                        src={block.src}
                                        alt={block.alt}
                                        width={600}
                                        height={400}
                                        className="rounded-lg"
                                    />
                                    <figcaption>{block.caption}</figcaption>
                                </figure>
                            );
                        default:
                            return null;
                    }
                })}</p>
            </div>
        </article>
    );
}
