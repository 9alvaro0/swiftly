// src/components/posts/PostCard.tsx

import Link from "next/link";
import Image from "next/image";
import PostTag from "@/components/posts/PostTag";
import { Post } from "@/types/Post";

interface PostCardProps {
    post: Post;
    variant?: "default" | "featured";
}

export default function PostCard({ post, variant = "default" }: PostCardProps) {
    // Verificar si post existe
    if (!post) {
        return null; // O un componente de fallback/error
    }

    const isFeatured = variant === "featured";

    // Función segura para obtener la URL de la imagen
    const getImageUrl = () => {
        if (post.imageUrl) {
            return post.imageUrl.startsWith("/") ? post.imageUrl : `/${post.imageUrl}`;
        }

        if (post.coverImage) {
            return post.coverImage.startsWith("/") ? post.coverImage : `/${post.coverImage}`;
        }

        return "/placeholder.svg";
    };

    // Función segura para formatear fechas
    const formatDate = (date: Date | string | undefined) => {
        if (!date) return "Fecha no disponible";

        try {
            const dateObj = date instanceof Date ? date : new Date(date);
            return dateObj.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Fecha inválida";
        }
    };

    return (
        <article
            className={`
            rounded-lg shadow-md overflow-hidden 
            transition-all duration-300 
            hover:shadow-xl hover:-translate-y-2
            ${isFeatured ? "md:col-span-2 lg:col-span-3" : ""}
        `}
        >
            <div className="relative">
                <div className={`relative w-full ${isFeatured ? "h-96" : "h-48"}`}>
                    {post.imageUrl || post.coverImage ? (
                        <Image
                            src={getImageUrl()}
                            alt={post.title || "Imagen del post"}
                            fill
                            className="object-cover"
                            sizes={
                                isFeatured
                                    ? "(max-width: 768px) 100vw, 100vw"
                                    : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            }
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500">
                            <span className="text-4xl">Swift</span>
                        </div>
                    )}
                </div>

                {post.category && (
                    <div className="absolute top-4 left-4">
                        <PostTag tag={post.category} />
                    </div>
                )}

                {post.featured && (
                    <div className="absolute top-4 right-4">
                        <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded font-medium">
                            Destacado
                        </span>
                    </div>
                )}
            </div>

            <div className="p-6">
                {post.title && (
                    <h3 className={`font-bold mb-2 text-gray-800 ${isFeatured ? "text-2xl" : "text-lg"} line-clamp-2`}>
                        {post.title}
                    </h3>
                )}

                <div className="flex items-center text-gray-500 text-sm flex-wrap">
                    {post.createdAt && (
                        <time
                            dateTime={
                                post.createdAt instanceof Date
                                    ? post.createdAt.toISOString()
                                    : post.createdAt
                            }
                        >
                            {formatDate(post.createdAt)}
                        </time>
                    )}

                    {post.createdAt && post.readTime && <span className="mx-2">•</span>}

                    {post.readTime !== undefined && <span>{post.readTime} min lectura</span>}

                    {post.author && (
                        <>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                                {post.author.avatar && (
                                    <Image
                                        src={
                                            post.author.avatar.startsWith("/")
                                                ? post.author.avatar
                                                : `/${post.author.avatar}`
                                        }
                                        alt={post.author.name || "Avatar del autor"}
                                        width={20}
                                        height={20}
                                        className="rounded-full mr-1"
                                    />
                                )}
                                <span>{post.author.name || "Autor"}</span>
                            </div>
                        </>
                    )}
                </div>

                {post.description && (
                    <p className={`text-gray-600 mt-3 ${isFeatured ? "text-base" : "text-sm"} line-clamp-3`}>
                        {post.description}
                    </p>
                )}

                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                        {post.tags.length > 3 && (
                            <span className="text-xs text-gray-500">+{post.tags.length - 3} más</span>
                        )}
                    </div>
                )}

                {(post.views !== undefined || post.likes !== undefined || post.comments !== undefined) && (
                    <div className="flex gap-4 mt-3 text-sm text-gray-500">
                        {post.views !== undefined && (
                            <span className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                                {post.views}
                            </span>
                        )}

                        {post.likes !== undefined && (
                            <span className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                                {post.likes}
                            </span>
                        )}

                        {post.comments !== undefined && (
                            <span className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    />
                                </svg>
                                {post.comments}
                            </span>
                        )}
                    </div>
                )}

                {post.slug && (
                    <Link
                        href={`/posts/${post.slug}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm mt-4"
                    >
                        Leer artículo
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </Link>
                )}
            </div>
        </article>
    );
}
