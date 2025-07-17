import Link from "next/link";
import { tagToSlug } from "@/utils/tagUtils";

// src/components/posts/PostTag.tsx
interface PostTagProps {
    tag: string;
}

export default function PostTag({ tag }: PostTagProps) {
    return (
        <Link
            key={tag}
            href={`/tags/${tagToSlug(tag)}`}
        >
            <span className="inline-block px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 rounded-full text-sm transition-all duration-200">
                #{tag}
            </span>
        </Link>
    );
}
