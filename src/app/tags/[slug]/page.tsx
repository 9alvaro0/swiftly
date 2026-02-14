// src/app/tags/[slug]/page.tsx

import React, { Suspense } from "react";
import type { Metadata } from "next";
import TagBreadcrumbs from "@/components/tags/TagBreadcrumbs";
import PostGrid from "@/components/home/latestPosts/PostList";
import PostGridSkeleton from "@/components/posts/skeletons/PostGridSkeleton";
import { slugToTag, tagToSlug } from "@/utils/tagUtils";
import { getAllPublishedPostsServer } from "@/services/firebase/firestore/post-server";
import { SITE_URL } from "@/lib/constants";

export async function generateStaticParams() {
    const posts = await getAllPublishedPostsServer({});
    const tags = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
    return [...tags].map((tag) => ({ slug: tagToSlug(tag) }));
}

interface TagPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const { slug } = await params;
    const tagName = slugToTag(slug);

    return {
        title: `${tagName} - aprendeSwift`,
        description: `Artículos y tutoriales sobre ${tagName} en aprendeSwift.`,
        alternates: {
            canonical: `${SITE_URL}/tags/${slug}`,
        },
        openGraph: {
            title: `${tagName} - aprendeSwift`,
            description: `Artículos y tutoriales sobre ${tagName} en aprendeSwift.`,
            url: `${SITE_URL}/tags/${slug}`,
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function TagPage(props: TagPageProps) {
    const resolvedParams = await props.params;
    const { slug } = resolvedParams;
    
    // Convert slug back to original tag format for database query
    const originalTag = slugToTag(slug);

    return (
        <div className="container mx-auto px-4 py-8">
            <TagBreadcrumbs tagName={originalTag} />

            <h1 className="text-3xl font-extrabold text-white mb-8">
                Posts etiquetados con <span className="text-blue-400">#{originalTag}</span>
            </h1>

            <Suspense
                key={slug}
                fallback={<PostGridSkeleton />}
            >
                <PostGrid tag={originalTag} />
            </Suspense>
        </div>
    );
}
