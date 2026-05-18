// src/app/feed.xml/route.ts

import { NextResponse } from 'next/server';
import { getAllPublishedPostsWithAuthor } from '@/services/firebase/firestore/post';
import { PostWithAuthor } from '@/types/Post';
import { formatRssDate, createExcerpt, escapeXml } from '@/utils/dateUtils';

const baseUrl = 'https://aprendeswift.dev';
const siteTitle = 'aprendeSwift Blog';
const siteDescription = 'Artículos y tutoriales sobre desarrollo web, programación y tecnología moderna';
const siteLanguage = 'es-ES';
const authorEmail = '9alvaro0@gmail.com';

export const dynamic = 'force-static';

export async function GET(): Promise<NextResponse> {
    try {
        // Get latest published posts with author data
        const allPosts = await getAllPublishedPostsWithAuthor({});
        const posts = allPosts.slice(0, 20); // Limit to 20 posts

        // Generate RSS XML
        const rssItems = posts.map((post: PostWithAuthor) => {
            const postUrl = post.type === 'tutorial' 
                ? `${baseUrl}/tutorials/${post.slug}`
                : `${baseUrl}/posts/${post.slug}`;
            
            const publishDate = new Date(post.publishedAt || post.createdAt);
            const excerpt = createExcerpt(post.content || post.description || '', 300);
            
            // Generate categories from tags
            const categories = (post.tags || [])
                .map(tag => `        <category>${escapeXml(tag)}</category>`)
                .join('\n');

            return `    <item>
        <title>${escapeXml(post.title)}</title>
        <description>${escapeXml(excerpt)}</description>
        <link>${postUrl}</link>
        <guid isPermaLink="true">${postUrl}</guid>
        <pubDate>${formatRssDate(publishDate)}</pubDate>
        <author>${authorEmail} (${escapeXml(post.author?.name || 'aprendeSwift Team')})</author>
${categories}
        <content:encoded><![CDATA[${post.content || excerpt}]]></content:encoded>
    </item>`;
        }).join('\n');

        const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${escapeXml(siteTitle)}</title>
        <description>${escapeXml(siteDescription)}</description>
        <link>${baseUrl}</link>
        <language>${siteLanguage}</language>
        <lastBuildDate>${formatRssDate(new Date())}</lastBuildDate>
        <ttl>60</ttl>
        <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
        
        <image>
            <url>${baseUrl}/icons/logo.png</url>
            <title>${escapeXml(siteTitle)}</title>
            <link>${baseUrl}</link>
            <width>144</width>
            <height>144</height>
        </image>

${rssItems}
    </channel>
</rss>`;

        console.log(`Generated RSS feed with ${posts.length} posts`);

        // Return RSS XML with proper headers
        return new NextResponse(rssXml, {
            status: 200,
            headers: {
                'Content-Type': 'application/rss+xml; charset=utf-8',
                'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400', // Cache for 1 hour, stale-while-revalidate for 24 hours
            },
        });

    } catch (error) {
        console.error('Error generating RSS feed:', error);
        
        // Return minimal RSS feed on error
        const errorFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
    <channel>
        <title>${escapeXml(siteTitle)}</title>
        <description>${escapeXml(siteDescription)}</description>
        <link>${baseUrl}</link>
        <language>${siteLanguage}</language>
        <lastBuildDate>${formatRssDate(new Date())}</lastBuildDate>
    </channel>
</rss>`;

        return new NextResponse(errorFeed, {
            status: 200,
            headers: {
                'Content-Type': 'application/rss+xml; charset=utf-8',
                'Cache-Control': 'public, max-age=300', // Shorter cache on error
            },
        });
    }
}