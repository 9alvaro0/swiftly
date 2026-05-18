// src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { getAllPublishedPostsServer, getAllTagsServer } from '@/services/firebase/firestore/post-server';
import { getLatestDate } from '@/utils/dateUtils';
import { SITE_URL } from '@/lib/constants';

const baseUrl = SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const sitemapEntries: MetadataRoute.Sitemap = [];

        // Static pages
        const staticPages = [
            { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
            { url: `${baseUrl}/posts`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
            { url: `${baseUrl}/tutorials`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
            { url: `${baseUrl}/tags`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
            { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
            { url: `${baseUrl}/site-map`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
            { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
            { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
            { url: `${baseUrl}/cookies`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
        ];

        sitemapEntries.push(...staticPages);

        // Get published posts via Admin SDK (no client SDK in server context)
        let posts: Awaited<ReturnType<typeof getAllPublishedPostsServer>> = [];
        try {
            posts = await getAllPublishedPostsServer({});
        } catch (postsError) {
            console.error('Error fetching posts for sitemap:', postsError);
        }

        for (const post of posts) {
            sitemapEntries.push({
                url: `${baseUrl}/posts/${post.slug}`,
                lastModified: getLatestDate(post.updatedAt, post.publishedAt),
                changeFrequency: 'weekly' as const,
                priority: post.type === 'tutorial' ? 0.8 : 0.7,
            });

            if (post.type === 'tutorial') {
                sitemapEntries.push({
                    url: `${baseUrl}/tutorials/${post.slug}`,
                    lastModified: getLatestDate(post.updatedAt, post.publishedAt),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                });
            }
        }

        // Get all tags via Admin SDK
        let tags: { id: string; name: string; slug?: string; updatedAt?: Date }[] = [];
        try {
            tags = await getAllTagsServer();
        } catch (tagsError) {
            console.error('Error fetching tags for sitemap:', tagsError);
        }

        for (const tag of tags) {
            const slug = tag.slug || tag.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            sitemapEntries.push({
                url: `${baseUrl}/tags/${slug}`,
                lastModified: getLatestDate(tag.updatedAt, null),
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            });
        }

        return sitemapEntries;
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return [{ url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 }];
    }
}
