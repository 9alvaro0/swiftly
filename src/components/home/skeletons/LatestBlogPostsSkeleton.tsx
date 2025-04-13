// src/components/home/skeletons/LatestBlogPostsSkeleton.tsx
export default function LatestBlogPostsSkeleton() {
    return (
        <section className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div 
                        key={i} 
                        className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm overflow-hidden"
                    >
                        <div className="h-48 bg-neutral-200 dark:bg-neutral-800 animate-pulse"></div>
                        <div className="p-5">
                            <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-2"></div>
                            <div className="h-6 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-2"></div>
                            <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-1"></div>
                            <div className="h-4 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-4"></div>
                            <div className="flex items-center space-x-2">
                                <div className="h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse"></div>
                                <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}