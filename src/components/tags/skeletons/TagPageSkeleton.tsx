import PostGridSkeleton from "@/components/posts/skeletons/PostGridSkeleton";

export default function TagPageSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumbs skeleton */}
            <div className="flex items-center text-sm mb-8">
                <div className="flex items-center space-x-2">
                    <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                    <div className="h-4 w-2 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                    <div className="h-4 w-2 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                    <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                </div>
            </div>

            {/* Título skeleton */}
            <div className="h-9 w-96 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-8"></div>

            {/* Contenido skeleton */}
            <PostGridSkeleton />
        </div>
    );
}
