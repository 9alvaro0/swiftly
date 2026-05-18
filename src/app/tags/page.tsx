// src/app/tags/page.tsx

import type { Metadata } from "next";
import { Suspense } from "react";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Tags - aprendeSwift",
    description: "Explora contenido por etiquetas en aprendeSwift.",
    alternates: {
        canonical: `${SITE_URL}/tags`,
    },
    openGraph: {
        title: "Tags - aprendeSwift",
        description: "Explora contenido por etiquetas en aprendeSwift.",
        url: `${SITE_URL}/tags`,
    },
    twitter: {
        title: "Tags - aprendeSwift",
        description: "Explora contenido por etiquetas en aprendeSwift.",
    },
};
// ISR: revalidate every 5 minutes
export const revalidate = 300;

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
