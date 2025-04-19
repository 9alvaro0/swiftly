export default function TutorialCardSkeleton() {
    return (
        <div className="bg-surface rounded-lg shadow-sm overflow-hidden h-full">
            <div className="h-48 bg-neutral-200 dark:bg-neutral-800 animate-pulse"></div>
            <div className="p-5">
                <div className="flex items-center mb-3">
                    <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                    <div className="mx-2">•</div>
                    <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                </div>
                <div className="h-6 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-4"></div>
                <div className="flex justify-between">
                    <div className="h-5 w-28 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                    <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse mr-2"></div>
                        <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
