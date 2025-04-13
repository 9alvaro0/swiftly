export default function TutorialContentSkeleton() {
    return (
        <div className="space-y-6 mb-12">
            {Array.from({ length: 8 }).map((_, index) => (
                <div
                    key={index}
                    className="space-y-3"
                >
                    {index % 3 === 0 && (
                        <div className="h-7 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                    )}
                    <div className="h-5 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                    <div className="h-5 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                    {index % 2 === 0 && (
                        <div className="h-5 w-4/5 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                    )}
                </div>
            ))}
        </div>
    );
}
