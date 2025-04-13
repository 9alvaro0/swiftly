import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchTutorialBySlug, fetchTutorials } from "@/services/api";
import TutorialHeader from "@/components/tutorials/TutorialHeader";
import TutorialContent from "@/components/tutorials/TutorialContent";
import RelatedTutorials from "@/components/tutorials/RelatedTutorials";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

// Generar metadatos para SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const tutorial = await fetchTutorialBySlug(params.slug);

    if (!tutorial) {
        return {
            title: "Tutorial no encontrado",
            description: "El tutorial que buscas no existe o no está disponible.",
        };
    }

    return {
        title: `${tutorial.title} | Swiftly`,
        description: tutorial.description,
        openGraph: {
            title: `${tutorial.title} | Swiftly`,
            description: tutorial.description,
            images: tutorial.imageUrl ? [tutorial.imageUrl] : [],
            type: "article",
            authors: [tutorial.author.name],
            publishedTime: tutorial.date,
            tags: tutorial.tags,
        },
    };
}

// Generar rutas estáticas para todos los tutoriales
export async function generateStaticParams() {
    const tutorials = await fetchTutorials(0); // Obtener todos los tutoriales

    return tutorials.map((tutorial) => ({
        slug: tutorial.slug,
    }));
}

export default async function TutorialDetailPage({ params }: { params: { slug: string } }) {
    const tutorial = await fetchTutorialBySlug(params.slug);

    if (!tutorial || !tutorial.isPublished) {
        notFound();
    }

    // Obtener tutoriales relacionados
    const allTutorials = await fetchTutorials(0);
    const relatedTutorials = allTutorials
        .filter(
            (t) =>
                t.id !== tutorial.id &&
                t.isPublished &&
                (t.category === tutorial.category || tutorial.tags.some((tag) => t.tags.includes(tag)))
        )
        .slice(0, 3);

    return (
        <div className="py-12 px-4 md:px-6 max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm mb-8">
                <Link
                    href="/tutoriales"
                    className="text-text-secondary hover:text-primary flex items-center group"
                >
                    <ChevronLeft
                        size={16}
                        className="mr-1 group-hover:-translate-x-1 transition-transform"
                    />
                    Volver a tutoriales
                </Link>
            </div>

            {/* Tutorial header */}
            <TutorialHeader tutorial={tutorial} />

            {/* Tutorial image */}
            {tutorial.imageUrl && (
                <div className="relative h-64 sm:h-96 rounded-lg overflow-hidden mb-8">
                    <Image
                        src={tutorial.imageUrl || "/placeholder.svg"}
                        alt={tutorial.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 1024px"
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            {/* Tutorial content */}
            <TutorialContent content={tutorial.content} />

            {/* Tags */}
            {tutorial.tags && tutorial.tags.length > 0 && (
                <div className="mb-12">
                    <h3 className="text-lg font-semibold mb-3 text-text-primary">Etiquetas:</h3>
                    <div className="flex flex-wrap gap-2">
                        {tutorial.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full text-sm text-text-secondary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Author bio */}
            {tutorial.author.bio && (
                <div className="mb-12 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="flex items-center gap-4 mb-4">
                        {tutorial.author.avatar && (
                            <Image
                                src={tutorial.author.avatar || "/placeholder.svg"}
                                alt={tutorial.author.name}
                                width={64}
                                height={64}
                                className="rounded-full"
                            />
                        )}
                        <div>
                            <h3 className="text-lg font-bold text-text-primary">Sobre el autor</h3>
                            <p className="text-text-secondary">{tutorial.author.name}</p>
                        </div>
                    </div>
                    <p className="text-text-secondary">{tutorial.author.bio}</p>
                </div>
            )}

            {/* Related tutorials */}
            {relatedTutorials.length > 0 && <RelatedTutorials tutorials={relatedTutorials} />}
        </div>
    );
}
