import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Tutorial } from "@/types/Tutorial";

type TutorialCardProps = {
    tutorial: Tutorial;
};

export default function TutorialCard({ tutorial }: TutorialCardProps) {
    return (
        <Link
            href={`/tutoriales/${tutorial.slug}`}
            className="group"
        >
            <article className="bg-surface rounded-lg shadow-sm overflow-hidden h-full transition-all duration-200 hover:shadow-md">
                <div className="h-48 relative bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    {tutorial.imageUrl ? (
                        <Image
                            src={tutorial.imageUrl || "/placeholder.svg"}
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

                <div className="p-5">
                    <div className="flex items-center text-text-secondary text-sm mb-3">
                        <time dateTime={tutorial.date}>
                            {new Date(tutorial.date).toLocaleDateString("es-ES", {
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

                    <h3 className="font-bold text-lg mb-2 text-text-primary group-hover:text-primary transition-colors">
                        {tutorial.title}
                    </h3>

                    <p className="text-text-secondary mb-4 line-clamp-2">{tutorial.description}</p>

                    <div className="flex justify-between items-center">
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
                            <span className="text-sm text-text-secondary">{tutorial.author?.name}</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
