// src/app/admin/tutorials/edit/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchTutorialBySlug } from "@/services/tutorialService";
import TutorialForm from "@/components/admin/TutorialForm";
import { Tutorial } from "@/types/Tutorial";

export default function EditTutorialPage({ params }: { params: { slug: string } }) {
    const [tutorial, setTutorial] = useState<Tutorial | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTutorial = async () => {
            try {
                const data = await fetchTutorialBySlug(params.slug);
                setTutorial(data);
            } catch (err) {
                console.error("No se pudo cargar el tutorial:", err);
            } finally {
                setLoading(false);
            }
        };

        loadTutorial();
    }, [params.slug]);

    if (loading) return <div className="p-8">Cargando...</div>;
    if (!tutorial) return <div className="p-8">Tutorial no encontrado.</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Editar Tutorial</h1>
            <TutorialForm
                isEdit
                initialData={tutorial}
            />
        </div>
    );
}
