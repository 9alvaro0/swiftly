import TutorialHeaderSkeleton from "@/components/tutorials/skeletons/TutorialHeaderSkeleton";
import TutorialContentSkeleton from "@/components/tutorials/skeletons/TutorialContentSkeleton";

export default function TutorialDetailSkeleton() {
    return (
        <div className="py-12 px-4 md:px-6 max-w-4xl mx-auto">
            {/* Breadcrumbs skeleton */}
            <div className="mb-8">
                <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
            </div>

            {/* Tutorial header skeleton */}
            <TutorialHeaderSkeleton />

            {/* Tutorial image skeleton */}
            <div className="relative h-64 sm:h-96 rounded-lg bg-neutral-200 dark:bg-neutral-800 animate-pulse mb-8"></div>

            {/* Tutorial content skeleton */}
            <TutorialContentSkeleton />
        </div>
    );
}
