// src/types/Post.ts

export type ContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "code"; language: string; code: string }
    | { type: "heading"; level: 1 | 2 | 3; text: string }
    | { type: "list"; items: string[] }
    | { type: "image"; src: string; alt: string; caption?: string };

export interface Post {
    id: string;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    image: string;
    tag: string;
    readTime?: string;
    author: {
        name: string;
        avatar: string;
    };
    content: ContentBlock[];
    relatedPosts?: string[];
    keywords?: string[];
    type: "post" | "tutorial" | "course";
}

export interface Course {
    price: number;
    duration: string;
    level: string;
    description: string;
    prerequisites: string[];
    curriculum: string[];
    projects: string[];
    testimonials: string[];
    resources: string[];
    reviews: string[];
    

    lessons: Lessons[]
    posts: Post[];
}

export interface Lessons {
    id: string;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    image: string;
    tag: string;
    readTime?: string;
    posts: Post[];
}