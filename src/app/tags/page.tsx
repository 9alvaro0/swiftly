// src/app/tags/page.tsx

import { Suspense } from "react";
import TagsSkeleton from "@/components/tags/skeletons/TagsSkeleton";
import TagsHeader from "@/components/tags/TagsHeader";
import TagsFilters from "@/components/tags/TagsFilters";
import TagsList from "@/components/tags/TagsList";

export default async function TagsPage(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";

    return (
        <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="space-y-6 mb-10">
                <TagsHeader />
                <TagsFilters />
            </div>

            <Suspense
                key={query}
                fallback={<TagsSkeleton />}
            >
                <TagsList searchTerm={query} />
            </Suspense>
        </div>
    );
}
