export default function NewsletterPageSkeleton() {
    const skeletonItems = Array.from({ length: 8 }, (_, index) => index);

    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="animate-pulse">
                <div className="h-8 w-64 bg-white/10 rounded mb-2"></div>
                <div className="h-4 w-48 bg-white/10 rounded"></div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array(3).fill(0).map((_, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 animate-pulse">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/10 p-3 rounded-xl">
                                <div className="h-6 w-6 bg-white/20 rounded"></div>
                            </div>
                            <div>
                                <div className="h-3 w-24 bg-white/10 rounded mb-2"></div>
                                <div className="h-6 w-12 bg-white/10 rounded"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Controls Skeleton */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 animate-pulse">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="flex gap-2">
                        {Array(3).fill(0).map((_, index) => (
                            <div key={index} className="h-10 w-20 bg-white/10 rounded-lg"></div>
                        ))}
                    </div>
                    <div className="w-full sm:w-64">
                        <div className="h-10 w-full bg-white/10 rounded-lg"></div>
                    </div>
                </div>
            </div>

            {/* Table Skeleton */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="text-left px-6 py-4">
                                    <div className="h-3 w-12 bg-white/10 rounded animate-pulse"></div>
                                </th>
                                <th className="text-left px-6 py-4">
                                    <div className="h-3 w-16 bg-white/10 rounded animate-pulse"></div>
                                </th>
                                <th className="text-left px-6 py-4">
                                    <div className="h-3 w-24 bg-white/10 rounded animate-pulse"></div>
                                </th>
                                <th className="text-left px-6 py-4">
                                    <div className="h-3 w-16 bg-white/10 rounded animate-pulse"></div>
                                </th>
                                <th className="text-right px-6 py-4">
                                    <div className="h-3 w-16 bg-white/10 rounded animate-pulse ml-auto"></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {skeletonItems.map((item) => (
                                <tr
                                    key={item}
                                    className="border-b border-white/5 animate-pulse"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-4 w-4 bg-white/10 rounded"></div>
                                            <div className="h-4 w-48 bg-white/10 rounded"></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full">
                                            <div className="h-3 w-3 bg-white/10 rounded-full"></div>
                                            <div className="h-3 w-12 bg-white/10 rounded"></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-20 bg-white/10 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-16 bg-white/10 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="h-6 w-16 bg-white/10 rounded-lg ml-auto"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}