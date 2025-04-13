import TutorialCardSkeleton from "@/components/tutorials/skeletons/TutorialCardSkeleton";

export default function Loading() {
    return (
        <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="space-y-6 mb-10">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="h-10 w-64 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mx-auto mb-4"></div>
                    <div className="h-6 w-full max-w-md bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mx-auto"></div>
                </div>

                <div className="bg-surface rounded-lg shadow-sm p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="h-10 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                        <div className="h-10 w-32 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
                    <TutorialCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}
