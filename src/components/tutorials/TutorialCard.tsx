import Link from "next/link";
import Image from "next/image";
import { Clock, BookOpen } from "lucide-react";
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
                    <h3 className="font-bold text-lg h-14 mb-2 line-clamp-2 text-white group-hover:text-blue-400 transition-colors flex items-center">
                        {tutorial.title}
                    </h3>

                    {/* Description - fixed height with line clamp */}
                    <p className="text-white/70 line-clamp-2 h-12">{tutorial.description}</p>
                </div>

                {/* Footer - fixed height */}
                <div className="p-5 border-t border-white/5 flex items-center">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                            <BookOpen
                                size={16}
                                className="mr-2"
                            />
                            <span className="group-hover:underline">Leer tutorial</span>
                        </div>

                        <div className="flex items-center">
                            {tutorial.author?.avatar ? (
                                <Image
                                    src={tutorial.author.avatar}
                                    alt={tutorial.author.name || "Autor"}
                                    width={24}
                                    height={24}
                                    className="rounded-full border border-white/20 mr-2"
                                />
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs text-white mr-2">
                                    {tutorial.author?.name?.charAt(0) || "A"}
                                </div>
                            )}
                            <span className="text-sm text-white/60">{tutorial.author.name}</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
