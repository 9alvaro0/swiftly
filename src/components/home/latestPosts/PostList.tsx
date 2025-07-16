import { getPostsByTag } from "@/services/firebase/firestore/post";
import Link from "next/link";
import { AiFillTags } from "react-icons/ai";
import { Post } from "@/types/Post";
import Image from "next/image";
import { formatDate } from "@/utils/dateUtils";

interface PostListProps {
    tag?: string;
    posts?: Post[];
}

export default async function PostList({ tag, posts: initialPosts }: PostListProps) {
    let displayPosts: Post[] = [];

    if (initialPosts) {
        displayPosts = initialPosts;
    } else if (tag) {
        displayPosts = await getPostsByTag(tag);
    }

    if (displayPosts.length === 0) {
        return (
            <div className="text-center bg-white/5 rounded-lg border border-white/10 p-8">
                <AiFillTags className="mx-auto text-gray-500 text-5xl mb-4" />
                <p className="text-gray-400 mb-2">No hay posts asociados a esta etiqueta.</p>
                <Link
                    href="/tags"
                    className="inline-block mt-4 text-blue-400 hover:text-blue-300 hover:underline"
                >
                    Ver todas las etiquetas
                </Link>
            </div>
        );
    }

    // Separamos el post más reciente del resto
    const [featuredPost, ...remainingPosts] = displayPosts;

    return (
        <div className="space-y-8">
            {/* Post destacado (el más reciente) */}
            <div className="rounded-lg overflow-hidden bg-white/5 border border-white/10">
                <div className="flex flex-col md:flex-row">
                    <div>
                        {featuredPost.imageUrl ? (
                            <div className="relative h-48 md:h-full md:w-80 flex-shrink-0">
                                <Image
                                    src={featuredPost.imageUrl}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 320px"
                                />
                            </div>
                        ) : (
                            <div className="h-48 md:h-full md:w-80 flex-shrink-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                                <span className="text-gray-400">Sin imagen</span>
                            </div>
                        )}
                    </div>

                    <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center mb-2 text-sm text-blue-400">
                                <span>
                                    {featuredPost.createdAt
                                        ? formatDate(featuredPost.createdAt)
                                        : "Fecha no disponible"}
                                </span>
                                {featuredPost.tags && featuredPost.tags.length > 0 && (
                                    <>
                                        <span className="mx-2">•</span>
                                        <span className="flex flex-wrap gap-1">
                                            {featuredPost.tags
                                                .filter((t) => t.toLowerCase() !== tag?.toLowerCase())
                                                .map((tag) => (
                                                    <Link
                                                        key={tag}
                                                        href={`/tags/${tag}`}
                                                        className="hover:underline"
                                                    >
                                                        #{tag}
                                                    </Link>
                                                ))}
                                        </span>
                                    </>
                                )}
                            </div>

                            <Link href={`/posts/${featuredPost.slug}`}>
                                <h2 className="text-2xl font-bold mb-3 text-white hover:text-blue-400 transition-colors">
                                    {featuredPost.title}
                                </h2>
                            </Link>

                            <p className="text-gray-300 line-clamp-3">
                                {featuredPost.description || featuredPost.content.substring(0, 160)}...
                            </p>
                        </div>

                        <div className="mt-4">
                            <Link
                                href={`/posts/${featuredPost.slug}`}
                                className="text-blue-400 font-medium hover:text-blue-300 hover:underline"
                            >
                                Leer más →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de posts restantes */}
            <div className="space-y-6">
                {remainingPosts.map((post) => (
                    <div
                        key={post.id}
                        className="flex border-b border-white/10 pb-6 last:border-0"
                    >
                        {post.coverImage && (
                            <div className="w-20 sm:w-24 mr-4 h-16 sm:h-20 relative flex-shrink-0 rounded-md overflow-hidden">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 80px, 96px"
                                />
                            </div>
                        )}

                        <div className="flex-1">
                            <div className="flex items-center mb-1 text-xs text-blue-400">
                                <span>{post.publishedAt ? formatDate(post.publishedAt) : "Fecha no disponible"}</span>
                                {post.tags && post.tags.length > 0 && (
                                    <>
                                        <span className="mx-2">•</span>
                                        <span>
                                            <Link
                                                href={`/tags/${post.tags[0]}`}
                                                className="hover:underline"
                                            >
                                                #{post.tags[0]}
                                            </Link>
                                        </span>
                                    </>
                                )}
                            </div>

                            <Link href={`/posts/${post.slug}`}>
                                <h3 className="text-lg font-semibold mb-1 text-white hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h3>
                            </Link>

                            <p className="text-sm text-gray-400 line-clamp-2">
                                {post.description || post.content.substring(0, 100)}...
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
