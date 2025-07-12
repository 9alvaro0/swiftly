// src/app/posts/page.tsx

import PostsHeader from "@/components/posts/PostsHeader";
import PostsList from "@/components/posts/PostsList";
import PostsListSkeleton from "@/components/posts/skeletons/PostsListSkeleton";
import ContentPageLayout from "@/components/shared/ContentPageLayout";
import ContentFilters from "@/components/shared/ContentFilters";
import { ViewMode } from "@/components/posts/ViewToggle";
import { SortOption } from "@/components/posts/SortOptions";

export default async function PostsPage(props: {
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
            header={<PostsHeader />}
            filters={
                <ContentFilters
                    viewMode={viewMode}
                    sortBy={sortBy}
                    levelLabel="Nivel"
                    showViewToggle={true}
                    showSortOptions={true}
                    showTags={true}
                    showMobileFilters={true}
                />
            }
            suspenseKey={query + level + tag + currentPage + viewMode + sortBy}
            fallback={<PostsListSkeleton />}
        >
            <PostsList
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
