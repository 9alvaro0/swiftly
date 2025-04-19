import { Post } from "@/types/Post";

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export const isValidUrl = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(linkedin\.com|github\.com)\/[a-zA-Z0-9_-]+$/;
    return regex.test(url);
};

export const getDefaultPost = (): Post => ({
    // Identificadores
    id: "",
    slug: "",

    // Contenido principal
    title: "",
    description: "",
    content: "",

    // Metadatos de publicación
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: false,

    // Categorización
    category: "Swift",
    tags: [],
    level: "Principiante",
    type: "article",

    // Multimedia
    imageUrl: "",
    images: [],
    coverImage: "",

    // Información de lectura
    readTime: 0,
    wordCount: 0,

    // Autor
    author: {
        id: "",
        name: "",
        username: "",
        avatar: "",
        bio: "",
        socialLinks: {
            twitter: "",
            github: "",
            linkedin: "",
        },
    },

    // SEO y discoverability
    keywords: [],
    metaDescription: "",

    // Relaciones
    relatedPosts: [],

    // Interacción
    views: 0,
    likedBy: [],

    // Opciones adicionales
    language: "es",
});
