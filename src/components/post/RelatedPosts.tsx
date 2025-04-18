import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types/Post";

type RelatedPostsProps = {
    posts: Pick<Post, "id" | "title" | "slug" | "imageUrl" | "category" | "description">[];
};

export default function RelatedPosts({ posts }: RelatedPostsProps) {
    if (!posts || posts.length === 0) return null;

    return (
        <div className="mt-12 mb-8 border-t border-neutral-200 dark:border-neutral-800 pt-8">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Tutoriales relacionados</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/posts/${post.slug}`}
                        className="group"
                    >
                        <div className="bg-surface rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md h-full">
                            <div className="h-40 relative bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                                {post.imageUrl ? (
                                    <Image
                                        src={post.imageUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                                        <span className="text-2xl">Swift</span>
                                    </div>
                                )}
                                {post.category && (
                                    <div className="absolute top-0 right-0 m-2">
                                        <span className="inline-block bg-neutral-900 dark:bg-neutral-700 text-white text-xs px-2 py-1 rounded">
                                            {post.category}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-base mb-2 text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                {post.description && (
                                    <p className="text-text-secondary text-sm line-clamp-2">{post.description}</p>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
