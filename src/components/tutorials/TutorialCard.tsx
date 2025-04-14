import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { Post } from "@/types/Post";

type TutorialCardProps = {
    tutorial: Post;
};

export default function TutorialCard({ tutorial }: TutorialCardProps) {
    return (
        <Link
            href={`/tutorials/${tutorial.slug}`}
            className="group block h-full"
        >
            <article className="bg-surface rounded-lg shadow-sm overflow-hidden h-full grid grid-rows-[192px_auto_60px] transition-all duration-200 hover:shadow-md">
                {/* Image section - fixed height */}
                <div className="relative bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    {tutorial.imageUrl ? (
                        <Image
                            src={tutorial.imageUrl || "/placeholder.svg"}
                            alt={tutorial.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : tutorial.coverImage ? (
                        <Image
                            src={tutorial.coverImage || "/placeholder.svg"}
                            alt={tutorial.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                            <span className="text-4xl">Swift</span>
                        </div>
                    )}
                    <div className="absolute top-0 right-0 m-3">
                        <span className="inline-block bg-neutral-900 dark:bg-neutral-700 text-white text-xs px-2 py-1 rounded">
                            {tutorial.category}
                        </span>
                    </div>
                    <div className="absolute bottom-0 left-0 m-3">
                        <span className="inline-block bg-neutral-900/80 text-white text-xs px-2 py-1 rounded">
                            {tutorial.level}
                        </span>
                    </div>
                </div>

                {/* Content area with fixed structure */}
                <div className="p-5 flex flex-col">
                    {/* Date and read time - fixed height */}
                    <div className="flex items-center text-text-secondary text-sm h-5 mb-3">
                        <time dateTime={tutorial.createdAt.toISOString()}>
                            {tutorial.createdAt.toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                            <Clock
                                size={14}
                                className="mr-1"
                            />
                            {tutorial.readTime || 5} min
                        </span>
                    </div>

                    {/* Title - fixed height with line clamp */}
                    <h3 className="font-bold text-lg h-14 mb-2 line-clamp-2 text-text-primary group-hover:text-primary transition-colors flex items-center">
                        {tutorial.title}
                    </h3>

                    {/* Description - fixed height with line clamp */}
                    <p className="text-text-secondary line-clamp-2 h-12">{tutorial.description}</p>
                </div>

                {/* Footer - fixed height */}
                <div className="p-5 border-t border-gray-100 dark:border-gray-800 flex items-center">
                    <div className="flex justify-between items-center w-full">
                        <div className="text-primary font-medium group-hover:underline">Leer tutorial →</div>

                        <div className="flex items-center">
                            {tutorial.author?.avatar && (
                                <Image
                                    src={tutorial.author.avatar || "/placeholder.svg"}
                                    alt={tutorial.author.name}
                                    width={24}
                                    height={24}
                                    className="rounded-full mr-2"
                                />
                            )}
                            <span className="text-sm text-text-secondary">{tutorial.author.name}</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
