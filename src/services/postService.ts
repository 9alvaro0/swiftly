// src/services/postService.ts
import { Post } from "@/types/Post";
import postsData from "@/data/posts.json";

export const PostService = {
    // Obtener todos los posts
    async fetchPosts(): Promise<Post[]> {
        // Simular una llamada asíncrona
        await new Promise((resolve) => setTimeout(resolve, 500));

        return postsData.map((post) => ({
            ...post,
            createdAt: new Date(post.createdAt),
            updatedAt: new Date(post.updatedAt),
            publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
        })) as Post[];
    },

    // Obtener post por slug
    async fetchPostBySlug(slug: string): Promise<Post | null> {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const post = postsData.find((p) => p.slug === slug);
        return post
            ? ({
                  ...post,
                  createdAt: new Date(post.createdAt),
                  updatedAt: new Date(post.updatedAt),
                  publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
              } as Post)
            : null;
    },

    // Métodos mock para mantener la interfaz
    async createPost(postData: Partial<Post>): Promise<Post> {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newPost: Post = {
            ...postData,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
            isPublished: postData.isPublished ?? true,
        } as Post;

        // En un escenario real, esto se haría en el backend
        return newPost;
    },

    async updatePost(id: string, postData: Partial<Post>): Promise<Post> {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const post = postsData.find((p) => p.id === id);
        if (!post) throw new Error("Post not found");

        return {
            ...post,
            ...postData,
            updatedAt: new Date(),
        } as Post;
    },

    async deletePost(id: string): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock de eliminación
        console.log(`Post ${id} eliminado`);
    },
};
