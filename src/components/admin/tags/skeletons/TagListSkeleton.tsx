import React from "react";

const TagListSkeleton = () => {
    const skeletonItems = Array.from({ length: 4 }, (_, index) => index);

    return (
        <div className="overflow-x-auto">
            <div className="mb-4 text-neutral-200 dark:text-neutral-800 flex items-center">
                <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-40 animate-pulse"></div>
            </div>
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {skeletonItems.map((item) => (
                        <tr
                            key={item}
                            className="animate-pulse"
                        >
                            <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded w-32"></div>
                                </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap flex justify-end space-x-2">
                                <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-16"></div>
                                <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-20"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TagListSkeleton;
