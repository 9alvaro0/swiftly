// src/app/tutorials/page.tsx

import TutorialsHeader from "@/components/tutorials/TutorialsHeader";
import PostsFilters from "@/components/posts/PostsFilters";
import TutorialsList from "@/components/tutorials/TutorialsList";
import TutorialListSkeleton from "@/components/tutorials/skeletons/TutorialListSkeleton";
import { Suspense } from "react";

interface TutorialDetailPageProps {
    searchParams?: Promise<{
        query?: string;
        level?: string;
        page?: string;
    }>;
}
export default async function TutorialsPage(props: TutorialDetailPageProps) {
    const resolvedParams = await props.searchParams;
    const query = resolvedParams?.query || "";
    const level = resolvedParams?.level || "";
    const currentPage = Number(resolvedParams?.page) || 1;

    return (
        <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="space-y-6 mb-10">
                <TutorialsHeader />

                <PostsFilters />
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
