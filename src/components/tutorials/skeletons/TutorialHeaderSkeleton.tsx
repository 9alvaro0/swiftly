export default function TutorialHeaderSkeleton() {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-20 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
            </div>

            <div className="h-10 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-4"></div>
            <div className="h-6 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-6"></div>

            <div className="flex flex-wrap items-center gap-6">
                <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                <div className="h-5 w-28 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                <div className="flex items-center gap-2 ml-auto">
                    <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse"></div>
                    <div className="h-5 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}
