// src/components/posts/PostGrid.tsx

import { Post } from "@/types/Post";
import PostCard from "./PostCard";

interface PostGridProps {
    posts: Post[];
    featuredPostIndex?: number | null;
}

export default function PostGrid({ posts, featuredPostIndex = null }: PostGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post, index) => (
                <PostCard
                    key={post.id}
                    post= {post}
                    variant={index === featuredPostIndex ? "featured" : "default"}
                />
            ))}
        </div>
    );
}
