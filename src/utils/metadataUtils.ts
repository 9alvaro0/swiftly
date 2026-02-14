import { getPostBySlugWithAuthorServer } from "@/services/firebase/firestore/post-server";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

const siteUrl = SITE_URL;

interface GenerateMetadataProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const post = await getPostBySlugWithAuthorServer(slug);

    if (!post) {
        return {
            title: "Post no encontrado",
            description: "Este artículo no está disponible.",
            robots: { index: false, follow: false },
        };
    }

    const url = `${siteUrl}/${post.type === "article" ? "posts" : "tutorials"}/${slug}`;

    return {
        title: post.title,
        description: post.metaDescription || post.description,
        keywords: post.keywords || [],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: post.title,
            description: post.metaDescription || post.description,
            url: url,
            type: "article",
            images: post.coverImage ? [{ url: post.coverImage }] : [],
            siteName: "aprendeSwift",
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.metaDescription || post.description,
            images: post.coverImage ? [post.coverImage] : [],
        },
        robots: {
            index: true,
            follow: true,
        },
        authors: post.author?.name ? [{ name: post.author.name }] : undefined,
        publisher: "aprendeSwift",
    };
}
