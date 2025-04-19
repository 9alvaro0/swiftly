// src/components/posts/skeletons/PostCardSkeleton.tsx

import React from "react";

interface PostCardSkeletonProps {
    variant?: "default" | "featured";
}

export default function PostCardSkeleton({ variant = "default" }: PostCardSkeletonProps) {
    const isFeatured = variant === "featured";

    return (
        <article
            className={`
                rounded-lg shadow-md overflow-hidden 
                animate-pulse
                ${isFeatured ? "md:col-span-2 lg:col-span-3" : ""}
            `}
        >
            <div className={`relative w-full ${isFeatured ? "h-96" : "h-48"} bg-neutral-200 dark:bg-neutral-800`}></div>

            <div className="p-6">
                <div
                    className={`h-${isFeatured ? "8" : "6"} bg-neutral-200 dark:bg-neutral-800 rounded mb-3 w-3/4`}
                ></div>

                <div className="flex items-center space-x-3 mb-3">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-24"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-20"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-16"></div>
                </div>

                <div className="space-y-2 mt-4">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-4/6"></div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded-full w-16"></div>
                    <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded-full w-12"></div>
                    <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded-full w-14"></div>
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-16"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-16"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-16"></div>
                </div>

                <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-28 mt-4"></div>
            </div>
        </article>
    );
}
