// src/app/posts/[slug]/page.tsx

import PostDetail from "@/components/post/PostDetail";
import DetailError from "@/components/tutorials/DetailError";
import { getPostBySlug } from "@/firebase/firestore/post";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function PostDetailPage(props: PageProps) {
    const resolvedParams = await props.params;
    const { slug } = resolvedParams;

    const post = await getPostBySlug(slug);

    if (!post) {
        return <DetailError />;
    }

    return (
        <PostDetail
            post={post}
            branch="articles"
        />
    );
}
