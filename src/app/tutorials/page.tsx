// src/app/tutorials/page.tsx

import TutorialsHeader from "@/components/tutorials/TutorialsHeader";
import TutorialsFilters from "@/components/tutorials/TutorialsFilters";
import TutorialsList from "@/components/tutorials/TutorialsList";
import TutorialListSkeleton from "@/components/tutorials/skeletons/TutorialListSkeleton";
import { Suspense } from "react";

export default async function TutorialsPage({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        level?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || "";
    const level = searchParams?.level || "";
    const currentPage = searchParams?.page ? Number(searchParams.page) : 1;

    return (
        <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="space-y-6 mb-10">
                <TutorialsHeader />

                <TutorialsFilters />
            </div>

            <Suspense
                key={query + level + currentPage}
                fallback={<TutorialListSkeleton />}
            >
                <TutorialsList
                    searchTerm={query}
                    level={level}
                    currentPage={currentPage}
                />
            </Suspense>
        </div>
    );
}
