import Image from "next/image";
import { Clock, Calendar, BookOpen } from "lucide-react";
import type { Tutorial } from "@/types/Tutorial";

type TutorialHeaderProps = {
    tutorial: Tutorial;
};

export default function TutorialHeader({ tutorial }: TutorialHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
                <span className="inline-block bg-neutral-900 dark:bg-neutral-700 text-white px-2 py-1 rounded text-xs">
                    {tutorial.category}
                </span>
                <span className="inline-block bg-neutral-900/80 text-white px-2 py-1 rounded text-xs">
                    {tutorial.level}
                </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">{tutorial.title}</h1>

            <p className="text-xl text-text-secondary mb-6">{tutorial.description}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <time dateTime={tutorial.date}>
                        {new Date(tutorial.date).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                </div>

                <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{tutorial.readTime || 10} min de lectura</span>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                    <div className="flex items-center">
                        {tutorial.author.avatar && (
                            <Image
                                src={tutorial.author.avatar || "/placeholder.svg"}
                                alt={tutorial.author.name}
                                width={32}
                                height={32}
                                className="rounded-full mr-2"
                            />
                        )}
                        <span>{tutorial.author.name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
