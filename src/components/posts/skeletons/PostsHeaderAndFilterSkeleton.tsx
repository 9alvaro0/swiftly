// src/components/ui/skeletons/PostsHeaderAndFilterSkeleton.tsx

export default function PostsHeaderAndFilterSkeleton() {
    return (
        <div className="space-y-6 mb-10">
            <div className="space-y-2">
                <div className="h-10 w-64 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                <div className="h-4 w-full max-w-3xl bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                <div className="h-4 w-2/3 max-w-2xl bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-lg flex-grow"></div>
                    <div className="h-12 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}
