import { useState, useEffect } from "react";
import { incrementPostViews } from "@/services/firebase/firestore/post";
import { incrementUserStat } from "@/services/firebase/firestore/user";
import { useAuthStore } from "@/store/authStore";

// Constants for sessionStorage management
const VIEWED_POSTS_KEY = "viewedPosts";
const MAX_VIEWED_POSTS = 100; // Limit stored posts to prevent memory issues
const CLEANUP_THRESHOLD = 150; // Clean up when we exceed this threshold

/**
 * Manages and cleans up viewed posts in sessionStorage
 */
const manageViewedPosts = (postId: string): { viewedPosts: string[], shouldRegisterView: boolean } => {
    try {
        let viewedPosts = JSON.parse(sessionStorage.getItem(VIEWED_POSTS_KEY) || "[]");
        
        // Validate that viewedPosts is an array
        if (!Array.isArray(viewedPosts)) {
            viewedPosts = [];
        }
        
        // Check if post was already viewed
        if (viewedPosts.includes(postId)) {
            return { viewedPosts, shouldRegisterView: false };
        }
        
        // Clean up if we exceed the threshold
        if (viewedPosts.length >= CLEANUP_THRESHOLD) {
            viewedPosts = viewedPosts.slice(-MAX_VIEWED_POSTS);
        }
        
        // Add current post
        const updatedViewedPosts = [...viewedPosts, postId];
        sessionStorage.setItem(VIEWED_POSTS_KEY, JSON.stringify(updatedViewedPosts));
        
        return { viewedPosts: updatedViewedPosts, shouldRegisterView: true };
    } catch (error) {
        console.error("Error managing viewed posts in sessionStorage:", error);
        // Fallback: clear corrupted data and start fresh
        sessionStorage.setItem(VIEWED_POSTS_KEY, JSON.stringify([postId]));
        return { viewedPosts: [postId], shouldRegisterView: true };
    }
};

/**
 * Hook para gestionar y actualizar las vistas de un post
 * @param postId ID del post
 * @param initialViews Número inicial de vistas (opcional)
 * @returns Un objeto con el número de vistas y el estado de carga
 */
export function usePostViews(postId: string, initialViews: number = 0) {
    const { user } = useAuthStore();
    const [views, setViews] = useState<number>(initialViews);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const registerView = async () => {
            if (!postId) return;

            // Use the new sessionStorage management function
            const { shouldRegisterView } = manageViewedPosts(postId);

            if (!shouldRegisterView) {
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const result = await incrementPostViews(postId);
                setViews(result.views);

                // Add visualization to user stats (with proper error handling)
                if (user) {
                    try {
                        await incrementUserStat(user.uid, "views", postId);
                    } catch (userStatError) {
                        console.error("Error updating user stats:", userStatError);
                        // Don't fail the whole operation if user stats update fails
                    }
                }
            } catch (error) {
                console.error("Error registering post view:", error);
                setError("No se pudo registrar la vista");
            } finally {
                setLoading(false);
            }
        };

        registerView();
    }, [postId, user]);

    return { views, loading, error };
}
