// src/app/tutoriales/[slug]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Tutorial } from "@/types/Tutorial";
import TutorialHeader from "@/components/tutorials/TutorialHeader";
import TutorialContent from "@/components/tutorials/TutorialContent";
import RelatedTutorials from "@/components/tutorials/RelatedTutorials";

export default function TutorialDetailPage({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const [tutorial, setTutorial] = useState<Tutorial | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedTutorials, setRelatedTutorials] = useState<{ id: string; title: string }[]>([]);

    useEffect(() => {
        // Cargar el tutorial desde localStorage
        const storedTutorials = localStorage.getItem("tutorials");
        if (storedTutorials) {
            const tutorials = JSON.parse(storedTutorials);
            // Buscar por id o por slug
            const foundTutorial = tutorials.find((t: Tutorial) => t.id === params.slug || t.slug === params.slug);

            if (foundTutorial && foundTutorial.isPublished) {
                setTutorial(foundTutorial);

                // Encontrar tutoriales relacionados (de la misma categoría)
                const related = tutorials
                    .filter(
                        (t: Tutorial) =>
                            t.id !== foundTutorial.id &&
                            t.isPublished &&
                            (t.category === foundTutorial.category ||
                                foundTutorial.tags.some((tag) => t.tags.includes(tag)))
                    )
                    .slice(0, 3)
                    .map((t: Tutorial) => ({ id: t.id, title: t.title }));

                setRelatedTutorials(related);
            } else {
                // Tutorial no encontrado o no publicado
                router.push("/tutoriales");
            }
        }
        setLoading(false);
    }, [params.slug, router]);

    if (loading) return <div className="p-8 text-center">Cargando...</div>;
    if (!tutorial) return <div className="p-8 text-center">Tutorial no encontrado</div>;

    return (
        <div className="max-w-3xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm mb-6">
                <Link
                    href="/tutoriales"
                    className="text-primary hover:underline"
                >
                    Tutoriales
                </Link>
                <span className="mx-2">/</span>
                <span className="text-secondary">{tutorial.title}</span>
            </div>

            {/* Tutorial header */}
            <TutorialHeader
                title={tutorial.title}
                description={tutorial.description}
                category={tutorial.category}
                level={tutorial.level}
                date={tutorial.date}
                author={tutorial.author}
            />

            {/* Tutorial image */}
            {tutorial.imageUrl && (
                <div className="relative h-64 sm:h-96 rounded-lg overflow-hidden mb-8">
                    <Image
                        src={tutorial.imageUrl}
                        alt={tutorial.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            {/* Tutorial content */}
            <TutorialContent content={tutorial.content} />

            {/* Tags */}
            {tutorial.tags && tutorial.tags.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-2">Etiquetas:</h3>
                    <div className="flex flex-wrap gap-2">
                        {tutorial.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-neutral-100 px-3 py-1 rounded-full text-sm text-secondary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Related tutorials */}
            {relatedTutorials.length > 0 && <RelatedTutorials tutorials={relatedTutorials} />}
        </div>
    );
}
