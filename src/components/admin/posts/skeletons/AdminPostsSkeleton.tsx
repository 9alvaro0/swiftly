export default function AdminPostsSkeleton() {
    // Create an array for skeleton cards
    const skeletonCards = Array.from({ length: 6 }, (_, i) => i + 1);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skeletonCards.map((item) => (
                <div
                    key={item}
                    className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm overflow-hidden animate-pulse"
                >
                    <div className="p-5">
                        {/* Title and status badge */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 w-3/4 rounded-md"></div>
                            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 w-20 rounded-full"></div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2 mb-4">
                            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 w-full rounded-md"></div>
                            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 w-2/3 rounded-md"></div>
                        </div>

                        {/* Category, date and read time */}
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center space-x-2">
                                <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 w-1/3 rounded-md"></div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 w-2/5 rounded-md"></div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 w-1/4 rounded-md"></div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-700 flex justify-between items-center">
                            <div className="flex space-x-1">
                                <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
                                <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
                                <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
                            </div>
                            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 w-16 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
