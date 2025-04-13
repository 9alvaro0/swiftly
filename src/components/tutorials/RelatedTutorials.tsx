import Link from "next/link";
import Image from "next/image";
import type { Tutorial } from "@/types/Tutorial";

type RelatedTutorialsProps = {
    tutorials: Tutorial[];
};

export default function RelatedTutorials({ tutorials }: RelatedTutorialsProps) {
    if (!tutorials || tutorials.length === 0) return null;

    return (
        <div className="mt-12 mb-8 border-t border-neutral-200 dark:border-neutral-800 pt-8">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Tutoriales relacionados</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tutorials.map((tutorial) => (
                    <Link
                        key={tutorial.id}
                        href={`/tutoriales/${tutorial.slug}`}
                        className="group"
                    >
                        <div className="bg-surface rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md h-full">
                            <div className="h-40 relative bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                                {tutorial.imageUrl ? (
                                    <Image
                                        src={tutorial.imageUrl || "/placeholder.svg"}
                                        alt={tutorial.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                                        <span className="text-2xl">Swift</span>
                                    </div>
                                )}
                                <div className="absolute top-0 right-0 m-2">
                                    <span className="inline-block bg-neutral-900 dark:bg-neutral-700 text-white text-xs px-2 py-1 rounded">
                                        {tutorial.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-base mb-2 text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                                    {tutorial.title}
                                </h3>
                                <p className="text-text-secondary text-sm line-clamp-2">{tutorial.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
