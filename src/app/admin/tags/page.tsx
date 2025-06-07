// src/app/admin/tags/page.tsx

import { Suspense } from "react";
import TagForm from "@/components/admin/tags/TagForm";
import TagSearch from "@/components/admin/tags/TagSearch";
import TagList from "@/components/admin/tags/TagList";
import TagListSkeleton from "@/components/admin/tags/skeletons/TagListSkeleton";

export default async function AdminTagsPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <div className="container mx-auto px-4 py-4 space-y-16">
            <TagForm />

            <div className="space-y-4">
                <TagSearch />
                <Suspense
                    key={query + currentPage}
                    fallback={<TagListSkeleton />}
                >
                    <TagList
                        searchTerm={query}
                        currentPage={currentPage}
                    />
                </Suspense>
            </div>
        </div>
    );
}
