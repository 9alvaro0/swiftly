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
            <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden h-full grid grid-rows-[192px_auto_60px] transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30">
                {/* Image section - fixed height */}
                <div className="relative bg-black/30 overflow-hidden">
                    <Image
                        src={tutorial.imageUrl}
                        alt={tutorial.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Glass effect badges */}
                    <div className="absolute bottom-0 left-0 m-3">
                        <span className="inline-block bg-purple-600/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                            {tutorial.level}
                        </span>
                    </div>
                </div>

                {/* Content area with fixed structure */}
                <div className="p-5 flex flex-col">
                    {/* Date and read time - fixed height */}
                    <div className="flex items-center text-white/60 text-sm h-5 mb-3">
                        <time dateTime={tutorial.createdAt.toISOString()}>
                            {new Date(tutorial.createdAt).toLocaleDateString("es-ES", {
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
                    <h3 className={`group-hover:underline font-bold text-lg h-14 mb-2 line-clamp-2 text-white group-hover:text-blue-400 transition-colors flex items-center`}>
                        {tutorial.title}
                    </h3>

                    {/* Description - fixed height with line clamp */}
                    <p className={`text-white/70 line-clamp-2 h-12`}>{tutorial.description}</p>
                </div>
            </article>
        </Link>
    );
}
