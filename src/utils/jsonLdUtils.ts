import { PostWithAuthor } from "@/types/Post";
import { SITE_URL } from "@/lib/constants";

const siteUrl = SITE_URL;

export function generateArticleJsonLd(
    post: PostWithAuthor,
    section: "posts" | "tutorials"
) {
    const url = `${siteUrl}/${section}/${post.slug}`;
    const publishDate = new Date(post.publishedAt || post.createdAt).toISOString();
    const modifiedDate = new Date(post.updatedAt).toISOString();

    return {
        "@context": "https://schema.org",
        "@type": post.type === "tutorial" ? "TechArticle" : "Article",
        headline: post.title,
        description: post.metaDescription || post.description,
        image: post.coverImage || post.imageUrl || undefined,
        url,
        datePublished: publishDate,
        dateModified: modifiedDate,
        author: {
            "@type": "Person",
            name: post.author?.name || "aprendeSwift Team",
        },
        publisher: {
            "@type": "Organization",
            name: "aprendeSwift",
            logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/icons/logo.png`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        keywords: post.keywords?.join(", ") || post.tags?.join(", "),
        wordCount: post.wordCount,
        inLanguage: "es",
    };
}
