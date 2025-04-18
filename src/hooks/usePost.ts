// src/hooks/usePost.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { Post } from "@/types/Post";
import { PostService } from "@/services/postService";

export function usePost(slug: string) {
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const loadPost = useCallback(async () => {
        if (!slug) {
            setError(new Error("Post slug is required"));
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const fetchedPost = await PostService.fetchPostBySlug(slug);
            setPost(fetchedPost);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            console.error(`Error fetching post with slug ${slug}:`, err);
        } finally {
            setIsLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        loadPost();
    }, [loadPost]);

    return {
        post,
        isLoading,
        error,
        refetch: loadPost,
    };
}
