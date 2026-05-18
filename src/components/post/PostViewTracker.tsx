"use client";

import { usePostViews } from "@/hooks/usePostViews";

interface PostViewTrackerProps {
    postId: string;
    initialViews: number;
}

/**
 * Client component that tracks post views.
 * Renders nothing — just runs the usePostViews side effect.
 */
export default function PostViewTracker({ postId, initialViews }: PostViewTrackerProps) {
    usePostViews(postId, initialViews);
    return null;
}
