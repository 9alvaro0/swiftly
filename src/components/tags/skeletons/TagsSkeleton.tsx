export default function TagsSkeleton() {
    return (
        <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="space-y-6 mb-10">
                <div className="text-center">
                    <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-3 animate-pulse"></div>
                    <div className="h-4 w-full max-w-2xl bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
                    <div className="h-4 w-3/4 max-w-xl bg-gray-200 dark:bg-gray-700 rounded mx-auto mt-2 animate-pulse"></div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.from({ length: 15 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 animate-pulse"
                        >
                            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                            <div className="h-3 w-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
