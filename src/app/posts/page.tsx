// src/app/posts/page.tsx

import { Suspense } from "react";
import PostsHeader from "@/components/posts/PostsHeader";
import PostsFilters from "@/components/posts/PostsFilters";
import PostsList from "@/components/posts/PostsList";
import PostsListSkeleton from "@/components/posts/skeletons/PostsListSkeleton";

export default async function PostsPage(props: {
    searchParams?: Promise<{
        query?: string;
        level?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const level = searchParams?.level || "";
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="space-y-6 mb-10">
                <PostsHeader />
                <PostsFilters />
            </div>

            <Suspense
                key={query + level + currentPage}
                fallback={<PostsListSkeleton />}
            >
                <PostsList
                    searchTerm={query}
                    level={level}
                    currentPage={currentPage}
                />
            </Suspense>
        </div>
    );
}
