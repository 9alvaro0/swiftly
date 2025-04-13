// src/components/posts/PostCard.tsx
import Link from "next/link";
import PostTag from "./PostTag";
import PostMeta from "./PostMeta";
import { Post } from "@/types/Post";

interface PostCardProps extends Post {
    variant?: "default" | "featured";
}

export default function PostCard({
    id,
    slug,
    title,
    date,
    excerpt,
    image,
    tag,
    readTime,
    author,
    variant = "default",
}: PostCardProps) {
    const isFeatured = variant === "featured";

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
                <img
                    src={image}
                    alt={title}
                    className={`
                        w-full object-cover 
                        ${isFeatured ? "h-96" : "h-48"}
                    `}
                />
                <div className="absolute top-4 left-4">
                    <PostTag label={tag} />
                </div>
            </div>
            <div className="p-6">
                <h3
                    className={`
                    font-bold mb-2 text-gray-800 
                    ${isFeatured ? "text-2xl" : "text-lg"} 
                    line-clamp-2
                `}
                >
                    {title}
                </h3>
                <PostMeta
                    date={date}
                    readTime={readTime}
                    author={author}
                />
                <p
                    className={`
                    text-gray-600 mt-3 
                    ${isFeatured ? "text-base" : "text-sm"} 
                    line-clamp-3
                `}
                >
                    {excerpt}
                </p>
                <Link
                    href={`/posts/${slug}`}
                    className="
                        inline-flex items-center 
                        text-blue-600 hover:text-blue-800 
                        font-semibold text-sm mt-4
                    "
                >
                    Leer más
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
            </div>
        </article>
    );
}
