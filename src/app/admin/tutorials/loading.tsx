// src/app/admin/tutorials/loading.tsx
export default function Loading() {
    return (
        <div className="p-8">
            <div className="animate-pulse">
                <div className="flex justify-between items-center mb-8">
                    <div className="h-8 bg-neutral-200 dark:bg-neutral-800 w-1/4 rounded"></div>
                    <div className="h-10 bg-neutral-200 dark:bg-neutral-800 w-32 rounded"></div>
                </div>

                <div className="rounded-md p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div
                                key={item}
                                className="bg-neutral-200 h-50 dark:bg-neutral-800 rounded animate-pulse"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
