// src/app/tutorials/page.tsx

import TutorialsHeader from "@/components/tutorials/TutorialsHeader";
import TutorialsList from "@/components/tutorials/TutorialsList";
import TutorialListSkeleton from "@/components/tutorials/skeletons/TutorialListSkeleton";
import ContentPageLayout from "@/components/shared/ContentPageLayout";
import ContentFilters from "@/components/shared/ContentFilters";
import { ViewMode } from "@/components/posts/ViewToggle";
import { SortOption } from "@/components/posts/SortOptions";

export default async function TutorialsPage(props: {
    searchParams?: Promise<{
        query?: string;
        level?: string;
        tag?: string;
        page?: string;
        view?: string;
        sort?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const level = searchParams?.level || "";
    const tag = searchParams?.tag || "";
    const viewMode = (searchParams?.view as ViewMode) || "grid";
    const sortBy = (searchParams?.sort as SortOption) || "recent";
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <ContentPageLayout
            header={<TutorialsHeader />}
            filters={
                <ContentFilters
                    viewMode={viewMode}
                    sortBy={sortBy}
                    levelLabel="Nivel de dificultad"
                    showViewToggle={true}
                    showSortOptions={true}
                    showMobileFilters={true}
                />
            }
            suspenseKey={query + level + tag + currentPage + viewMode + sortBy}
            fallback={<TutorialListSkeleton />}
        >
            <TutorialsList
                searchTerm={query}
                level={level}
                tag={tag}
                currentPage={currentPage}
                viewMode={viewMode}
                sortBy={sortBy}
            />
        </ContentPageLayout>
    );
}
