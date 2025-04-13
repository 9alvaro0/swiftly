// src/components/posts/PostMeta.tsx
interface PostMetaProps {
    date: string;
    readTime?: string;
    author?: {
        name: string;
        avatar: string;
    };
}

export default function PostMeta({ date, readTime, author }: PostMetaProps) {
    return (
        <div className="flex items-center space-x-3 text-gray-500 text-sm">
            <span>{date}</span>
            {readTime && <span>• {readTime} lectura</span>}
            {author && (
                <div className="flex items-center space-x-2">
                    <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-6 h-6 rounded-full"
                    />
                    <span>{author.name}</span>
                </div>
            )}
        </div>
    );
}
