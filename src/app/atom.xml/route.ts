// src/app/atom.xml/route.ts

import { NextResponse } from 'next/server';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import { Post } from '@/types/Post';
import { toJSDate, formatAtomDate, createExcerpt, escapeXml } from '@/utils/dateUtils';

const baseUrl = 'https://aprendeswift.dev';
const siteTitle = 'aprendeSwift Blog';
const siteDescription = 'Artículos y tutoriales sobre desarrollo web, programación y tecnología moderna';
const authorName = 'aprendeSwift Team';
const authorEmail = 'hello@aprendeswift.dev';

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

        const lastUpdated = posts.length > 0 ? toJSDate(posts[0].publishedAt) : new Date();

        // Generate Atom entries
        const atomEntries = posts.map(post => {
            const postUrl = post.type === 'tutorial' 
                ? `${baseUrl}/tutorials/${post.slug}`
                : `${baseUrl}/posts/${post.slug}`;
            
            const publishDate = toJSDate(post.publishedAt);
            const updateDate = toJSDate(post.updatedAt) || publishDate;
            const excerpt = createExcerpt(post.content || post.description || '', 300);
            
            // Generate categories from tags
            const categories = (post.tags || [])
                .map(tag => `        <category term="${escapeXml(tag)}" />`)
                .join('\n');

            return `    <entry>
        <title>${escapeXml(post.title)}</title>
        <link href="${postUrl}" />
        <id>${postUrl}</id>
        <published>${formatAtomDate(publishDate)}</published>
        <updated>${formatAtomDate(updateDate)}</updated>
        <author>
            <name>${escapeXml(post.author?.name || authorName)}</name>
            <email>${authorEmail}</email>
        </author>
        <summary type="text">${escapeXml(excerpt)}</summary>
        <content type="html"><![CDATA[${post.content || excerpt}]]></content>
${categories}
    </entry>`;
        }).join('\n');

        const atomXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>${escapeXml(siteTitle)}</title>
    <subtitle>${escapeXml(siteDescription)}</subtitle>
    <link href="${baseUrl}/atom.xml" rel="self" />
    <link href="${baseUrl}" />
    <id>${baseUrl}/</id>
    <updated>${formatAtomDate(lastUpdated)}</updated>
    <author>
        <name>${escapeXml(authorName)}</name>
        <email>${authorEmail}</email>
    </author>
    <generator uri="https://nextjs.org" version="15.3.0">Next.js</generator>
    <icon>${baseUrl}/favicon.ico</icon>
    <logo>${baseUrl}/icons/logo.png</logo>

${atomEntries}
</feed>`;

        console.log(`Generated Atom feed with ${posts.length} posts`);

        // Return Atom XML with proper headers
        return new NextResponse(atomXml, {
            status: 200,
            headers: {
                'Content-Type': 'application/atom+xml; charset=utf-8',
                'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
            },
        });

    } catch (error) {
        console.error('Error generating Atom feed:', error);
        
        // Return minimal Atom feed on error
        const errorFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>${escapeXml(siteTitle)}</title>
    <subtitle>${escapeXml(siteDescription)}</subtitle>
    <link href="${baseUrl}/atom.xml" rel="self" />
    <link href="${baseUrl}" />
    <id>${baseUrl}/</id>
    <updated>${formatAtomDate(new Date())}</updated>
    <author>
        <name>${escapeXml(authorName)}</name>
        <email>${authorEmail}</email>
    </author>
</feed>`;

        return new NextResponse(errorFeed, {
            status: 200,
            headers: {
                'Content-Type': 'application/atom+xml; charset=utf-8',
                'Cache-Control': 'public, max-age=300',
            },
        });
    }
}