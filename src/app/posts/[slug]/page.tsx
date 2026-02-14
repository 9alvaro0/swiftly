// src/app/posts/[slug]/page.tsx

import PostDetail from "@/components/post/PostDetail";
import { getPostBySlugWithAuthor } from "@/services/firebase/firestore/post";
import { generateMetadata as generatePostMetadata } from "@/utils/metadataUtils";
import { generateArticleJsonLd } from "@/utils/jsonLdUtils";
import { notFound } from "next/navigation";

export const generateMetadata = generatePostMetadata;

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function PostDetailPage(props: PageProps) {
    const resolvedParams = await props.params;
    const { slug } = resolvedParams;

    const post = await getPostBySlugWithAuthor(slug);

    if (!post) {
        notFound();
    }

    const jsonLd = generateArticleJsonLd(post, "posts");

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PostDetail
                post={post}
                branch="articles"
            />
        </>
    );
}
