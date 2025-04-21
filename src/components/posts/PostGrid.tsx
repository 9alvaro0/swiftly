import { getPostsByTag } from "@/firebase/firestore/post";
import PostCard from "./PostCard";
import Link from "next/link";
import { AiFillTags } from "react-icons/ai";
import { Post } from "@/types/Post";

interface PostGridProps {
    tag?: string;
    posts?: Post[];
}

export default async function PostGrid({ tag, posts: initialPosts }: PostGridProps) {
    let displayPosts: Post[] = [];

    if (initialPosts) {
        displayPosts = initialPosts;
    } else if (tag) {
        displayPosts = await getPostsByTag(tag);
    }

    return (
        <div>
            {displayPosts.length === 0 ? (
                <div className="text-center bg-white/5 rounded-lg border border-white/10 p-8">
                    <AiFillTags className="mx-auto text-gray-400 dark:text-gray-500 text-5xl mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2">No hay posts asociados a esta etiqueta.</p>
                    <Link
                        href="/tags"
                        className="inline-block mt-4 text-blue-500 hover:text-blue-400 hover:underline"
                    >
                        Ver todas las etiquetas
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
