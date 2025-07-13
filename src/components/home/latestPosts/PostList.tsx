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
            <div className="text-center bg-[var(--color-card)] border-[var(--color-card-border)] rounded-lg border p-8">
                <AiFillTags className="mx-auto text-[var(--color-muted)] text-5xl mb-4" />
                <p className="text-[var(--color-muted)] mb-2">No hay posts asociados a esta etiqueta.</p>
                <Link
                    href="/tags"
                    className="inline-block mt-4 text-[var(--color-blue-light)] hover:underline"
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
            <div className="rounded-lg overflow-hidden bg-[var(--color-card)] border-[var(--color-card-border)] border">
                <div className="md:flex">
                    <div>
                        {featuredPost.imageUrl ? (
                            <div className="relative h-64 md:h-full">
                                <Image
                                    src={featuredPost.imageUrl}
                                    alt={featuredPost.title}
                                    width={250}
                                    height={250}
                                />
                            </div>
                        ) : (
                            <div className="h-64 md:h-full bg-[var(--color-border)] text-[var(--color-muted)] flex items-center justify-center">
                                <span>Sin imagen</span>
                            </div>
                        )}
                    </div>

                    <div className="p-6 md:w-3/5 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center mb-2 text-sm text-[var(--color-blue-light)]">
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
                                                        className="text-[var(--color-blue-light)] hover:underline"
                                                    >
                                                        #{tag}
                                                    </Link>
                                                ))}
                                        </span>
                                    </>
                                )}
                            </div>

                            <Link href={`/posts/${featuredPost.slug}`}>
                                <h2 className="text-2xl font-bold mb-3 text-[var(--color-foreground)] hover:text-[var(--color-blue-light)] transition-colors">
                                    {featuredPost.title}
                                </h2>
                            </Link>

                            <p className="text-[var(--color-muted)] line-clamp-3">
                                {featuredPost.description || featuredPost.content.substring(0, 160)}...
                            </p>
                        </div>

                        <div className="mt-4">
                            <Link
                                href={`/posts/${featuredPost.slug}`}
                                className="text-[var(--color-blue-light)] font-medium hover:underline"
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
                        className="flex border-b border-[var(--color-border)] pb-6 last:border-0"
                    >
                        {post.coverImage && (
                            <div className="w-1/4 mr-4 h-24 relative flex-shrink-0 rounded-md overflow-hidden">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <div className="flex-1">
                            <div className="flex items-center mb-1 text-xs text-[var(--color-blue-light)]">
                                <span>{post.publishedAt ? formatDate(post.publishedAt) : "Fecha no disponible"}</span>
                                {post.tags && post.tags.length > 0 && (
                                    <>
                                        <span className="mx-2">•</span>
                                        <span>
                                            <Link
                                                href={`/tags/${post.tags[0]}`}
                                                className="text-[var(--color-blue-light)] hover:underline"
                                            >
                                                #{post.tags[0]}
                                            </Link>
                                        </span>
                                    </>
                                )}
                            </div>

                            <Link href={`/posts/${post.slug}`}>
                                <h3 className="text-lg font-semibold mb-1 text-[var(--color-foreground)] hover:text-[var(--color-blue-light)] transition-colors">
                                    {post.title}
                                </h3>
                            </Link>

                            <p className="text-sm text-[var(--color-muted)] line-clamp-2">
                                {post.description || post.content.substring(0, 100)}...
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
