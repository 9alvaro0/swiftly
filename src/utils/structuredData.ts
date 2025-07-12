// src/utils/structuredData.ts

import { PostWithAuthor } from '@/types/Post';
import { User } from '@/types/User';

const baseUrl = 'https://aprendeswift.dev';
const siteName = 'aprendeSwift Blog';
const organizationName = 'aprendeSwift';

export interface StructuredDataConfig {
    type: 'website' | 'article' | 'tutorial' | 'blogPosting' | 'breadcrumb' | 'organization';
    data: Record<string, unknown>;
}

// Organization structured data
export function generateOrganizationLD(): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: organizationName,
        url: baseUrl,
        logo: `${baseUrl}/icons/logo.png`,
        sameAs: [
            // Add social media URLs here when available
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: 'hello@aprendeswift.dev',
        },
    };
}

// Website structured data
export function generateWebsiteLD(): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: baseUrl,
        description: 'Artículos y tutoriales sobre desarrollo web, programación y tecnología moderna',
        inLanguage: 'es-ES',
        publisher: {
            '@type': 'Organization',
            name: organizationName,
            url: baseUrl,
            logo: `${baseUrl}/icons/logo.png`,
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/posts?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
}

// Article structured data
export function generateArticleLD(post: PostWithAuthor, author?: User): object {
    const postUrl = post.type === 'tutorial' 
        ? `${baseUrl}/tutorials/${post.slug}`
        : `${baseUrl}/posts/${post.slug}`;

    const publishDate = post.publishedAt || new Date();
    const modifiedDate = post.updatedAt || publishDate;

    const authorData = author || post.author;

    const structuredData: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': post.type === 'tutorial' ? 'TechArticle' : 'BlogPosting',
        headline: post.title,
        description: post.description || post.metaDescription,
        url: postUrl,
        datePublished: publishDate.toISOString(),
        dateModified: modifiedDate.toISOString(),
        inLanguage: 'es-ES',
        author: {
            '@type': 'Person',
            name: authorData?.name || 'aprendeSwift Team',
            url: authorData?.socialLinks?.linkedin || baseUrl,
        },
        publisher: {
            '@type': 'Organization',
            name: organizationName,
            url: baseUrl,
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/icons/logo.png`,
                width: 144,
                height: 144,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': postUrl,
        },
    };

    // Add image if available
    if (post.coverImage || post.imageUrl) {
        structuredData.image = {
            '@type': 'ImageObject',
            url: post.coverImage || post.imageUrl,
            alt: post.title,
        };
    }

    // Add keywords if available
    if (post.keywords && post.keywords.length > 0) {
        structuredData.keywords = post.keywords.join(', ');
    }

    // Add categories/tags
    if (post.tags && post.tags.length > 0) {
        structuredData.about = post.tags.map(tag => ({
            '@type': 'Thing',
            name: tag,
        }));
    }

    // Add article section for tutorials
    if (post.type === 'tutorial') {
        structuredData.articleSection = 'Tutorial';
        structuredData.educationalLevel = post.level || 'Beginner';
        
        // Add skill level and learning objectives if available
        if (post.level) {
            structuredData.educationalLevel = post.level;
        }
    }

    // Add engagement metrics if available
    if (post.views) {
        structuredData.interactionStatistic = {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/ReadAction',
            userInteractionCount: post.views,
        };
    }

    return structuredData;
}

// Breadcrumb structured data
export function generateBreadcrumbLD(breadcrumbs: Array<{ name: string; url: string }>): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((breadcrumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: breadcrumb.name,
            item: breadcrumb.url,
        })),
    };
}

// Blog structured data for listing pages
export function generateBlogLD(): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: siteName,
        description: 'Artículos y tutoriales sobre desarrollo web, programación y tecnología moderna',
        url: `${baseUrl}/posts`,
        inLanguage: 'es-ES',
        publisher: {
            '@type': 'Organization',
            name: organizationName,
            url: baseUrl,
            logo: `${baseUrl}/icons/logo.png`,
        },
    };
}

// Collection page (tags) structured data
export function generateCollectionPageLD(tagName: string, tagSlug: string, posts: PostWithAuthor[]): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `Artículos sobre ${tagName}`,
        description: `Todos los artículos y tutoriales etiquetados con ${tagName}`,
        url: `${baseUrl}/tags/${tagSlug}`,
        inLanguage: 'es-ES',
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: posts.length,
            itemListElement: posts.map((post, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: post.type === 'tutorial' 
                    ? `${baseUrl}/tutorials/${post.slug}`
                    : `${baseUrl}/posts/${post.slug}`,
                name: post.title,
            })),
        },
    };
}

// Helper function to inject structured data into page head
export function generateStructuredDataScript(data: object): string {
    return `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`;
}

// Helper function to combine multiple structured data objects
export function combineStructuredData(dataObjects: object[]): object {
    if (dataObjects.length === 1) {
        return dataObjects[0];
    }

    return {
        '@context': 'https://schema.org',
        '@graph': dataObjects,
    };
}