// src/app/tutorials/[slug]/page.tsx
import { notFound } from "next/navigation";
import { PostService } from "@/services/postService";
import type { Metadata } from "next";
import TutorialDetail from "@/components/tutorials/TutorialDetail";
import TutorialError from "@/components/tutorials/TutorialError";

// Generar metadatos para SEO
export async function generateMetadata(props: { params: { slug: string } }): Promise<Metadata> {
    const params = await Promise.resolve(props.params);
    const slug = params.slug;

    try {
        const tutorial = await PostService.fetchPostBySlug(slug);

        if (!tutorial || !tutorial.isPublished) {
            return {
                title: "Tutorial no encontrado",
                description: "El tutorial que buscas no existe o no está disponible.",
            };
        }

        return {
            title: tutorial.title,
            description: tutorial.description,
            openGraph: {
                title: tutorial.title,
                description: tutorial.description,
                images: tutorial.imageUrl ? [{ url: tutorial.imageUrl }] : [],
            },
        };
    } catch (error) {
        console.error("Error fetching post metadata:", error);
        return {
            title: "Error al cargar el tutorial",
            description: "Ocurrió un error al intentar cargar este tutorial.",
        };
    }
}

export default async function TutorialDetailPage(props: { params: { slug: string } }) {
    const params = await Promise.resolve(props.params);
    const slug = params.slug;

    try {
        const tutorial = await PostService.fetchPostBySlug(slug);

        if (!tutorial || !tutorial.isPublished) {
            notFound();
        }

        return <TutorialDetail tutorial={tutorial} />;
    } catch (error) {
        console.error("Error fetching post:", error);
        return <TutorialError />;
    }
}
