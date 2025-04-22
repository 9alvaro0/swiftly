// src/app/tutorials/[slug]/page.tsx

import PostDetail from "@/components/post/PostDetail";
import DetailError from "@/components/tutorials/DetailError";
import { getPostBySlug } from "@/firebase/firestore/post";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function TutorialDetailPage(props: PageProps) {
    const resolvedParams = await props.params;
    const { slug } = resolvedParams;

    const tutorial = await getPostBySlug(slug);

    if (!tutorial) {
        return <DetailError />;
    }

    if (!tutorial) {
        return <DetailError />;
    }
    return (
        <PostDetail
            post={tutorial}
            branch="tutorials"
        />
    );
}
