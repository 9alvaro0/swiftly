// src/app/tutorials/page.tsx

import TutorialsHeader from "@/components/tutorials/TutorialsHeader";
import TutorialsFilters from "@/components/tutorials/TutorialsFilters";
import TutorialsList from "@/components/tutorials/TutorialsList";
import TutorialListSkeleton from "@/components/tutorials/skeletons/TutorialListSkeleton";
import { Suspense } from "react";

export default async function TutorialsPage(props: {
    searchParams?: Promise<{
        query?: string;
        level?: string;
        page?: string;
    }>;
}) {
    const resolvedParams = await props.searchParams;
    const query = resolvedParams?.query || "";
    const level = resolvedParams?.level || "";
    const currentPage = Number(resolvedParams?.page) || 1;

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
