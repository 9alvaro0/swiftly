// src/services/firebase/firestore/post-server.ts
// Server-side post queries using Firebase Admin SDK.
// Import this from Server Components, generateMetadata, API routes, and feed generators
// instead of the client-side post.ts.

import { getAdminDb } from '@/lib/firebase-admin';
import { Post, PostWithAuthor, Author } from '@/types/Post';

type AdminDb = NonNullable<Awaited<ReturnType<typeof getAdminDb>>>;

/** Recursively converts Admin SDK Timestamps to JS Dates */
function serializeValue(value: unknown): unknown {
    if (value === null || value === undefined) return value;
    if (
        typeof value === 'object' &&
        value !== null &&
        'toDate' in value &&
        typeof (value as { toDate: unknown }).toDate === 'function'
    ) {
        return (value as { toDate(): Date }).toDate();
    }
    if (
        typeof value === 'object' &&
        value !== null &&
        'seconds' in value &&
        'nanoseconds' in value
    ) {
        return new Date((value as { seconds: number }).seconds * 1000);
    }
    if (Array.isArray(value)) return value.map(serializeValue);
    if (typeof value === 'object' && value !== null) {
        const out: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(value)) out[k] = serializeValue(v);
        return out;
    }
    return value;
}

function serializeDoc<T>(data: Record<string, unknown>): T {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data)) out[k] = serializeValue(v);
    return out as T;
}

async function requireDb(): Promise<AdminDb> {
    const db = await getAdminDb();
    if (!db) throw new Error('Firebase Admin SDK not available');
    return db;
}

async function getAuthorById(db: AdminDb, authorId: string): Promise<Author | null> {
    const snap = await db.collection('authors').doc(authorId).get();
    if (!snap.exists) return null;
    return snap.data() as Author;
}

async function batchPopulateAuthors(db: AdminDb, posts: Post[]): Promise<PostWithAuthor[]> {
    if (!posts.length) return [];

    const uniqueIds = [...new Set(posts.map(p => p.authorId))];
    const entries = await Promise.all(
        uniqueIds.map(async id => [id, await getAuthorById(db, id)] as const)
    );

    const authorMap = new Map(entries);
    const results: PostWithAuthor[] = [];
    for (const post of posts) {
        const author = authorMap.get(post.authorId);
        if (!author) continue;
        results.push({ ...post, author });
    }
    return results;
}

// === Public API ===

export async function getPostBySlugServer(slug: string): Promise<Post | undefined> {
    const db = await requireDb();
    const snap = await db.collection('posts')
        .where('slug', '==', slug)
        .limit(1)
        .get();
    if (snap.empty) return undefined;
    return serializeDoc<Post>(snap.docs[0].data());
}

export async function getPostBySlugWithAuthorServer(slug: string): Promise<PostWithAuthor | undefined> {
    const db = await requireDb();
    const snap = await db.collection('posts')
        .where('slug', '==', slug)
        .limit(1)
        .get();
    if (snap.empty) return undefined;

    const post = serializeDoc<Post>(snap.docs[0].data());
    const author = await getAuthorById(db, post.authorId);
    if (!author) return undefined;
    return { ...post, author };
}

interface PostFilters {
    searchTerm?: string;
    level?: string;
    tag?: string;
    type?: string;
    limitCount?: number;
}

export async function getAllPublishedPostsServer(filters: PostFilters = {}): Promise<Post[]> {
    const db = await requireDb();
    const { searchTerm = '', level = '', tag = '', type = '', limitCount = 200 } = filters;

    let ref = db.collection('posts').where('isPublished', '==', true) as
        FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;
    if (type) ref = ref.where('type', '==', type);
    if (level) ref = ref.where('level', '==', level);
    ref = ref.orderBy('publishedAt', 'desc').limit(limitCount);

    const snap = await ref.get();
    let posts = snap.docs.map(d => serializeDoc<Post>(d.data()));

    if (tag) {
        posts = posts.filter(p =>
            p.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
        );
    }
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        posts = posts.filter(p =>
            p.title.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );
    }
    return posts;
}

export async function getAllPublishedPostsWithAuthorServer(filters: PostFilters = {}): Promise<PostWithAuthor[]> {
    const db = await requireDb();
    const posts = await getAllPublishedPostsServer(filters);
    return batchPopulateAuthors(db, posts);
}
