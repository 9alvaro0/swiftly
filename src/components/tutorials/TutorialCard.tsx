import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types/Post";
import { LEVEL_COLORS } from "@/constants/post";

type TutorialCardProps = {
    tutorial: Post;
};

export default function TutorialCard({ tutorial }: TutorialCardProps) {
    const levelStyle = LEVEL_COLORS[tutorial.level];

    return (
        <Link
            href={`/tutorials/${tutorial.slug}`}
            className="group block"
        >
            <article className="flex flex-col rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-md hover:shadow-xl">
                {/* Image container with proper aspect ratio */}
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={tutorial.imageUrl}
                        alt={tutorial.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Level badge - positioned on top of image */}
                    <div className="absolute top-4 left-4">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${levelStyle.color} text-white shadow-lg backdrop-blur-sm`}
                        >
                            {tutorial.level}
                        </span>
                    </div>
                </div>

                {/* Content section */}
                <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {tutorial.title}
                    </h3>

                    {/* Footer with metadata */}
                    <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{tutorial.readTime} min read</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {tutorial.tags?.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 rounded-md bg-gray-700/50 text-gray-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
