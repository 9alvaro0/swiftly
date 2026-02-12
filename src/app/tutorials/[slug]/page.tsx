// src/app/tutorials/[slug]/page.tsx

import PostDetail from "@/components/post/PostDetail";
import { getPostBySlugWithAuthor } from "@/services/firebase/firestore/post";
import { generateMetadata as generatePostMetadata } from "@/utils/metadataUtils";
import { notFound } from "next/navigation";

export const generateMetadata = generatePostMetadata;

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function TutorialDetailPage(props: PageProps) {
    const resolvedParams = await props.params;
    const { slug } = resolvedParams;

    const tutorial = await getPostBySlugWithAuthor(slug);

    if (!tutorial) {
        notFound();
    }

    return (
        <PostDetail
            post={tutorial}
            branch="tutorials"
        />
    );
}
