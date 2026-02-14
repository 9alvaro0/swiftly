// src/app/tutorials/[slug]/page.tsx

import PostDetail from "@/components/post/PostDetail";
import { getPostBySlugWithAuthorServer } from "@/services/firebase/firestore/post-server";
import { generateMetadata as generatePostMetadata } from "@/utils/metadataUtils";
import { generateArticleJsonLd } from "@/utils/jsonLdUtils";
import { notFound } from "next/navigation";

export const generateMetadata = generatePostMetadata;
export const revalidate = 300; // 5 minutes

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function TutorialDetailPage(props: PageProps) {
    const resolvedParams = await props.params;
    const { slug } = resolvedParams;

    const tutorial = await getPostBySlugWithAuthorServer(slug);

    if (!tutorial) {
        notFound();
    }

    const jsonLd = generateArticleJsonLd(tutorial, "tutorials");

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PostDetail
                post={tutorial}
                branch="tutorials"
            />
        </>
    );
}
