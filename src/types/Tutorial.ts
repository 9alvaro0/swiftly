// src/types/Tutorial.ts

export interface Tutorial {
    id: string;
    title: string;
    description: string;
    content: string;
    category: "Swift" | "SwiftUI" | "Xcode" | "iOS" | "macOS" | "Frameworks" | "visionOS" | "Arquitectura" | "Testing" | "watchOS";
    level: "Principiante" | "Intermedio" | "Avanzado";
    date: string;
    imageUrl: string;
    images?: string[];
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
    readTime?: number;
    updatedAt: string;
    createdAt: string;
}
