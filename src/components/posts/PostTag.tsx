// src/components/posts/PostTag.tsx
interface PostTagProps {
    label: string;
    className?: string;
}

export default function PostTag({ label, className = '' }: PostTagProps) {
    return (
        <span className={`
            text-xs px-2 py-1 rounded-full 
            bg-blue-100 text-blue-800
            ${className}
        `}>
            {label}
        </span>
    );
}