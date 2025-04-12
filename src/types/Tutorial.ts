// src/types/Tutorial.ts

export interface Tutorial {
    id: string;
    title: string;
    description: string;
    content: string;
    category: "Swift" | "SwiftUI" | "Xcode" | "iOS" | "macOS" | "Frameworks";
    level: "Principiante" | "Intermedio" | "Avanzado";
    date: string;
    imageUrl: string;
    author: {
        name: string;
        avatar?: string;
        bio?: string;
    };
    tags: string[];
    relatedTutorials?: {
        id: string;
        title: string;
    }[];
    isPublished: boolean;
    slug: string;
    readTime?: number; // Tiempo estimado de lectura en minutos
}
