import { getPostBySlug } from "@/services/firebase/firestore/post";
import type { Metadata } from "next";

const siteUrl = "https://swifly.com";

interface GenerateMetadataProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post no encontrado",
            description: "Este artículo no está disponible.",
            robots: { index: false, follow: false },
        };
    }

    const url = `${siteUrl}/${post.type === "article" ? "posts" : "tutorial"}/${slug}`;

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
            siteName: "Swiftly",
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
        publisher: "https://www.linkedin.com/in/alvaro-guerra/",
    };
}
