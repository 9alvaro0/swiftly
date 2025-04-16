// src/components/admin/dashboard/PostStatsCardsSkeleton.tsx

export default function PostStatsCardsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Generate three skeleton cards */}
            {[1, 2, 3].map((index) => (
                <div
                    key={index}
                    className="rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-apple-md overflow-hidden animate-pulse"
                >
                    <div className="p-4 flex items-start gap-4">
                        {/* Icon placeholder */}
                        <div className="p-3 rounded-full bg-neutral-200 dark:bg-neutral-800 h-12 w-12"></div>

                        <div className="flex-1">
                            {/* Title placeholder */}
                            <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-md w-3/4 mb-3"></div>

                            {/* Count placeholder */}
                            <div className="h-8 bg-neutral-300 dark:bg-neutral-600 rounded-md w-1/4 mb-4"></div>

                            {/* Link placeholder */}
                            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-1/3"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
