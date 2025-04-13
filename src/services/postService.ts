// src/services/postService.ts
import { Post, ContentBlock } from "@/types/Post";
import postsData from "@/data/posts.json";

function mapToPostType(postData: any): Post {
    return {
        id: postData.id,
        title: postData.title,
        slug: postData.slug,
        date: postData.date,
        excerpt: postData.excerpt,
        image: postData.image,
        tag: postData.tag,
        readTime: postData.readTime || "5 min",
        author: {
            name: postData.author.name,
            avatar: postData.author.avatar,
        },
        content: postData.content.map(mapContentBlock),
        relatedPosts: postData.relatedPosts || [],
        keywords: postData.keywords || [],
    };
}

function mapContentBlock(block: any): ContentBlock {
    switch (block.type) {
        case "paragraph":
            return { type: "paragraph", text: block.text };
        case "code":
            return {
                type: "code",
                language: block.language,
                code: block.code,
            };
        case "heading":
            return {
                type: "heading",
                level: block.level,
                text: block.text,
            };
        case "list":
            return {
                type: "list",
                items: block.items,
            };
        case "image":
            return {
                type: "image",
                src: block.src,
                alt: block.alt,
                caption: block.caption,
            };
        default:
            throw new Error(`Unsupported content block type: ${block.type}`);
    }
}

export function getAllPosts(): Post[] {
    return postsData.map(mapToPostType).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
    const foundPost = postsData.find((post) => post.id === slug || post.slug === slug);

    return foundPost ? mapToPostType(foundPost) : undefined;
}
