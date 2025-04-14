// src/services/tutorialService.ts
import { Post, PostCategory, PostType, PostLevel } from "@/types/Post";
import tutorialsData from "@/data/posts.json";

function mapToPostType(tutorialData: any): Post {
    return {
        // Identificadores
        id: tutorialData.id,
        slug: tutorialData.slug,

        // Contenido principal
        title: tutorialData.title,
        description: tutorialData.excerpt || tutorialData.description,
        content: tutorialData.content,

        // Metadatos de publicación
        createdAt: new Date(tutorialData.date || Date.now()),
        updatedAt: new Date(tutorialData.updatedAt || tutorialData.date || Date.now()),
        isPublished: tutorialData.isPublished ?? true,

        // Categorización
        category: tutorialData.category || "Swift",
        tags: tutorialData.tags || tutorialData.tag || [],
        level: tutorialData.level || "Principiante",
        type: tutorialData.type || "tutorial",

        // Multimedia
        imageUrl: tutorialData.image || tutorialData.coverImage,
        images: tutorialData.images || [],

        // Información de lectura
        readTime:
            typeof tutorialData.readTime === "string"
                ? parseInt(tutorialData.readTime.replace(" min", ""), 10)
                : typeof tutorialData.readTime === "number"
                ? tutorialData.readTime
                : 5,
        // Autor
        author: {
            id: tutorialData.author.id || crypto.randomUUID(),
            name: tutorialData.author.name,
            avatar: tutorialData.author.avatar,
            bio: tutorialData.author.bio,
            socialLinks: tutorialData.author.socialLinks || {},
        },

        // SEO y discoverability
        keywords: tutorialData.keywords || [],
        metaDescription: tutorialData.metaDescription || tutorialData.excerpt,

        // Relaciones
        relatedPosts:
            tutorialData.relatedPosts?.map((relTutorial: any) => ({
                id: relTutorial.id,
                title: relTutorial.title,
                slug: relTutorial.slug,
            })) || [],

        // Interacción
        views: tutorialData.views || 0,
        likes: tutorialData.likes || 0,
        comments: tutorialData.comments || 0,

        // Opciones adicionales
        draft: tutorialData.draft || false,
        featured: tutorialData.featured || false,
        language: tutorialData.language || "es",
    };
}

export function getAllTutorials(): Post[] {
    return tutorialsData
        .map(mapToPostType)
        .filter((tutorial) => tutorial.isPublished && !tutorial.draft)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getTutorialBySlug(slug: string): Post | undefined {
    const foundTutorial = tutorialsData.find((tutorial) => tutorial.id === slug || tutorial.slug === slug);

    return foundTutorial ? mapToPostType(foundTutorial) : undefined;
}

export function getTutorialsByCategory(category: PostCategory): Post[] {
    return getAllTutorials().filter((tutorial) => tutorial.category === category);
}

export function getTutorialsByTag(tag: string): Post[] {
    return getAllTutorials().filter((tutorial) =>
        tutorial.tags.some((tutorialTag) => tutorialTag.toLowerCase() === tag.toLowerCase())
    );
}

export function getFeaturedTutorials(): Post[] {
    return getAllTutorials().filter((tutorial) => tutorial.featured);
}
