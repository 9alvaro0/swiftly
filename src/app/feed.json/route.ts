// src/app/feed.json/route.ts

import { NextResponse } from 'next/server';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import { Post } from '@/types/Post';
import { toJSDate, createExcerpt } from '@/utils/dateUtils';

const baseUrl = 'https://aprendeswift.dev';
const siteTitle = 'aprendeSwift Blog';
const siteDescription = 'Artículos y tutoriales sobre desarrollo web, programación y tecnología moderna';
const authorName = 'aprendeSwift Team';

export async function GET(): Promise<NextResponse> {
    try {
        // Get latest published posts
        const postsQuery = query(
            collection(db, 'posts'),
            where('isPublished', '==', true),
            where('status', '==', 'published'),
            orderBy('publishedAt', 'desc'),
            limit(20)
        );

        const postsSnapshot = await getDocs(postsQuery);
        const posts = postsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Post));

        // Generate JSON Feed items
        const jsonItems = posts.map(post => {
            const postUrl = post.type === 'tutorial' 
                ? `${baseUrl}/tutorials/${post.slug}`
                : `${baseUrl}/posts/${post.slug}`;
            
            const publishDate = toJSDate(post.publishedAt);
            const excerpt = createExcerpt(post.content || post.description || '', 300);
            
            return {
                id: postUrl,
                url: postUrl,
                title: post.title,
                content_html: post.content || excerpt,
                content_text: excerpt,
                summary: post.description || excerpt,
                date_published: publishDate.toISOString(),
                date_modified: toJSDate(post.updatedAt).toISOString(),
                author: {
                    name: post.author?.name || authorName,
                    avatar: post.author?.avatar || `${baseUrl}/icons/logo.png`,
                },
                tags: post.tags || [],
                image: post.coverImage || post.imageUrl,
                language: 'es',
            };
        });

        // JSON Feed format
        const jsonFeed = {
            version: 'https://jsonfeed.org/version/1.1',
            title: siteTitle,
            description: siteDescription,
            home_page_url: baseUrl,
            feed_url: `${baseUrl}/feed.json`,
            language: 'es',
            icon: `${baseUrl}/icons/logo.png`,
            favicon: `${baseUrl}/favicon.ico`,
            authors: [
                {
                    name: authorName,
                    url: baseUrl,
                }
            ],
            items: jsonItems,
        };

        console.log(`Generated JSON feed with ${posts.length} posts`);

        // Return JSON Feed with proper headers
        return new NextResponse(JSON.stringify(jsonFeed, null, 2), {
            status: 200,
            headers: {
                'Content-Type': 'application/feed+json; charset=utf-8',
                'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
            },
        });

    } catch (error) {
        console.error('Error generating JSON feed:', error);
        
        // Return minimal JSON feed on error
        const errorFeed = {
            version: 'https://jsonfeed.org/version/1.1',
            title: siteTitle,
            description: siteDescription,
            home_page_url: baseUrl,
            feed_url: `${baseUrl}/feed.json`,
            language: 'es',
            items: [],
        };

        return new NextResponse(JSON.stringify(errorFeed, null, 2), {
            status: 200,
            headers: {
                'Content-Type': 'application/feed+json; charset=utf-8',
                'Cache-Control': 'public, max-age=300',
            },
        });
    }
}