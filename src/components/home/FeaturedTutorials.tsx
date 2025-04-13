// src/components/home/FeaturedTutorials.tsx

import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { fetchTutorials } from "@/services/api";

export default function FeaturedTutorials() {
    return (
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-text-primary">Tutoriales destacados</h2>
                    <Link
                        href="/tutoriales"
                        className="text-text-primary font-medium hover:underline flex items-center"
                    >
                        Ver todos
                        <span className="ml-1">→</span>
                    </Link>
                </div>

                <TutorialsList />
            </div>
        </section>
    );
}

async function TutorialsList() {
    const tutorials = await fetchTutorials(3);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
                <Link
                    key={tutorial.id}
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
                                    {tutorial.readTime} min
                                </span>
                            </div>

                            <h3 className="font-bold text-lg mb-2 text-text-primary group-hover:text-primary transition-colors">
                                {tutorial.title}
                            </h3>

                            <p className="text-text-secondary mb-4 line-clamp-2">{tutorial.description}</p>

                            <div className="flex justify-between items-center">
                                <div className="text-primary font-medium group-hover:underline">Leer tutorial →</div>

                                <div className="flex items-center">
                                    {tutorial.author.avatar && (
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
            ))}
        </div>
    );
}
