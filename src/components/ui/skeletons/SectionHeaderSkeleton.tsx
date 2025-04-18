// src/components/ui/skeletons/SectionHeaderSkeleton.tsx

export default function SectionHeaderSkeleton() {
    return (
        <div className="flex justify-between items-center mb-8">
            <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
            <div className="h-6 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
        </div>
    );
}
