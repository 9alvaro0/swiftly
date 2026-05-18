// src/app/posts/[slug]/page.tsx

import PostDetail from "@/components/post/PostDetail";
import { getPostBySlugWithAuthorServer, getAllPublishedPostsServer } from "@/services/firebase/firestore/post-server";
import { generateMetadata as generatePostMetadata } from "@/utils/metadataUtils";
import { generateArticleJsonLd } from "@/utils/jsonLdUtils";
import { notFound } from "next/navigation";

export const generateMetadata = generatePostMetadata;
export const revalidate = 300; // 5 minutes

export async function generateStaticParams() {
    const posts = await getAllPublishedPostsServer({ type: "article" });
    return posts.map((post) => ({ slug: post.slug }));
}

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function PostDetailPage(props: PageProps) {
    const resolvedParams = await props.params;
    const { slug } = resolvedParams;

    const post = await getPostBySlugWithAuthorServer(slug);

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
