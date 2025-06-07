// src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import { Post } from '@/types/Post';
import { Tag } from '@/types/Tag';
import { getLatestDate } from '@/utils/dateUtils';

const baseUrl = 'https://aprendeswift.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const sitemapEntries: MetadataRoute.Sitemap = [];

        // Static pages
        const staticPages = [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily' as const,
                priority: 1.0,
            },
            {
                url: `${baseUrl}/posts`,
                lastModified: new Date(),
                changeFrequency: 'daily' as const,
                priority: 0.9,
            },
            {
                url: `${baseUrl}/tutorials`,
                lastModified: new Date(),
                changeFrequency: 'daily' as const,
                priority: 0.9,
            },
            {
                url: `${baseUrl}/tags`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            },
            {
                url: `${baseUrl}/contact`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.6,
            },
        ];

        sitemapEntries.push(...staticPages);

        // Get published posts
        const postsQuery = query(
            collection(db, 'posts'),
            where('isPublished', '==', true),
            where('status', '==', 'published'),
            orderBy('publishedAt', 'desc')
        );

        const postsSnapshot = await getDocs(postsQuery);
        const posts = postsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Post));

        // Add posts to sitemap
        for (const post of posts) {
            const postEntry = {
                url: `${baseUrl}/posts/${post.slug}`,
                lastModified: getLatestDate(post.updatedAt, post.publishedAt),
                changeFrequency: 'weekly' as const,
                priority: post.type === 'tutorial' ? 0.8 : 0.7,
            };
            sitemapEntries.push(postEntry);

            // Also add tutorials to their specific path
            if (post.type === 'tutorial') {
                const tutorialEntry = {
                    url: `${baseUrl}/tutorials/${post.slug}`,
                    lastModified: getLatestDate(post.updatedAt, post.publishedAt),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                };
                sitemapEntries.push(tutorialEntry);
            }
        }

        // Get all tags - simplified approach since Tag interface is basic
        const tagsQuery = query(collection(db, 'tags'));
        const tagsSnapshot = await getDocs(tagsQuery);
        const tags = tagsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Tag & { slug?: string; updatedAt?: Date }));

        // Add tags to sitemap
        for (const tag of tags) {
            // Generate slug from name if not present
            const tagData = tag as Tag & { slug?: string; updatedAt?: Date };
            const slug = tagData.slug || tag.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            
            const tagEntry = {
                url: `${baseUrl}/tags/${slug}`,
                lastModified: getLatestDate(tagData.updatedAt, null),
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            };
            sitemapEntries.push(tagEntry);
        }

        console.log(`Generated sitemap with ${sitemapEntries.length} entries`);
        return sitemapEntries;

    } catch (error) {
        console.error('Error generating sitemap:', error);
        
        // Return minimal sitemap if there's an error
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1.0,
            },
        ];
    }
}