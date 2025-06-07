export default function TagsSkeleton() {
    return (
        <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-neutral-200 dark:bg-neutral-800 rounded-xl p-8 animate-pulse"
                    ></div>
                ))}
            </div>
        </div>
    );
}
