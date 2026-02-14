// firebase/firestore/post.ts

import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove,
    increment,
    updateDoc,
    runTransaction,
    query,
    where,
    orderBy,
    limit,
    QueryConstraint,
    documentId,
} from "firebase/firestore";
import { Post, PostWithAuthor } from "@/types/Post";
import { db } from "../config";
import { convertDatesToTimestamps, serializePost } from "@/services/firebase/utils/utils";
import { getAuthor } from "./authors";

// Colección de Firestore
const postsCollection = collection(db, "posts");

// Helper function to populate author data in a post
const populatePostAuthor = async (post: Post): Promise<PostWithAuthor | null> => {
    try {
        const author = await getAuthor(post.authorId);
        if (!author) {
            console.warn(`Author not found for post ${post.id}, authorId: ${post.authorId}`);
            return null;
        }
        
        return {
            ...post,
            author,
        };
    } catch (error) {
        console.error(`Error populating author for post ${post.id}:`, error);
        return null;
    }
};

// Obtener un post por ID
export const getPostById = async (id: string): Promise<Post | undefined> => {
    const postRef = doc(postsCollection, id);
    const postDoc = await getDoc(postRef);
    if (postDoc.exists()) {
        return serializePost(postDoc.data() as Post);
    }
    return undefined;
};

// Obtener un post por slug
export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
    const q = query(postsCollection, where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        const postDoc = snapshot.docs[0];
        return serializePost(postDoc.data() as Post);
    }
    return undefined;
};

// Obtener posts por tags
export const getPostsByTag = async (tag: string): Promise<Post[]> => {
    const q = query(
        postsCollection,
        where("tags", "array-contains", tag)
    );
    const snapshot = await getDocs(q);

    let posts = snapshot.docs.map((doc) => {
        return serializePost(doc.data() as Post);
    });

    // Filter for published posts client-side
    posts = posts.filter((post) => post.isPublished === true);

    // Sort by publishedAt descending
    posts.sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
    });

    return posts;
};

// Obtener todos los posts
export const getAllPosts = async (): Promise<Post[]> => {
    const q = query(postsCollection, orderBy("createdAt", "desc"), limit(200));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
        return serializePost(doc.data() as Post);
    });
};

// Obtener todos los posts publicados
interface PostFilters {
    searchTerm?: string;
    level?: string;
    tag?: string;
    type?: string;
    limitCount?: number;
}

export const getAllPublishedPosts = async (filters: PostFilters): Promise<Post[]> => {
    const { searchTerm = "", level = "", tag = "", type = "", limitCount = 200 } = filters;

    // Build query with server-side filters (requires composite indexes)
    const constraints: QueryConstraint[] = [
        where("isPublished", "==", true),
    ];

    // Use server-side type filter when composite index is available
    if (type) {
        constraints.push(where("type", "==", type));
    }

    // Use server-side level filter when composite index is available
    if (level) {
        constraints.push(where("level", "==", level));
    }

    constraints.push(orderBy("publishedAt", "desc"));
    constraints.push(limit(limitCount));

    const q = query(postsCollection, ...constraints);

    const snapshot = await getDocs(q);
    let posts = snapshot.docs.map((doc) => {
        return serializePost(doc.data() as Post);
    });

    // Tag and search filters remain client-side (array-contains can't combine with other inequality)
    if (tag) {
        posts = posts.filter((post) =>
            post.tags && post.tags.some(postTag =>
                postTag.toLowerCase() === tag.toLowerCase()
            )
        );
    }

    if (searchTerm) {
        posts = posts.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    return posts;
};

// Crea o actualiza un post (atomic: uses transaction to avoid TOCTOU race)
export const createOrUpdatePost = async (id: string, updatedFields: Partial<Post>): Promise<void> => {
    const postRef = doc(postsCollection, id);

    await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);

        const data = postDoc.exists()
            ? { ...updatedFields, updatedAt: new Date() }
            : { id, createdAt: new Date(), ...updatedFields, updatedAt: new Date() };

        const processedData = convertDatesToTimestamps(data);
        transaction.set(postRef, processedData, { merge: true });
    });
};

// Eliminar un post y sus comentarios asociados
export const deletePost = async (id: string): Promise<void> => {
    const { deletePostComments } = await import("./comments");
    await deletePostComments(id);
    await deleteDoc(doc(postsCollection, id));
};

// Dar/quitar like a un post
export const togglePostLike = async (postId: string, userId: string, likeStatus: boolean): Promise<void> => {
    const postRef = doc(postsCollection, postId);

    try {
        await runTransaction(db, async (transaction) => {
            const postDoc = await transaction.get(postRef);

            if (!postDoc.exists()) {
                throw new Error("El post no existe");
            }

            // Determinar la operación a realizar según el estado del like
            if (likeStatus) {
                // Agregar like
                transaction.update(postRef, {
                    likedBy: arrayUnion(userId),
                });
            } else {
                // Quitar like
                transaction.update(postRef, {
                    likedBy: arrayRemove(userId),
                });
            }
        });
    } catch (error) {
        throw error;
    }
};

// Incrementa el contador de vistas de un post (single write, no re-read)
export const incrementPostViews = async (postId: string): Promise<void> => {
    const postRef = doc(postsCollection, postId);
    await updateDoc(postRef, { views: increment(1) });
};

// === FUNCTIONS WITH POPULATED AUTHOR DATA ===

// Batch populate authors to avoid N+1 queries
const batchPopulateAuthors = async (posts: Post[]): Promise<PostWithAuthor[]> => {
    if (posts.length === 0) return [];

    // Get unique author IDs
    const uniqueAuthorIds = [...new Set(posts.map(p => p.authorId))];

    // Fetch all unique authors in parallel
    const authorEntries = await Promise.all(
        uniqueAuthorIds.map(async (authorId) => {
            try {
                const author = await getAuthor(authorId);
                return [authorId, author] as const;
            } catch (error) {
                console.error(`Error fetching author ${authorId}:`, error);
                return [authorId, null] as const;
            }
        })
    );

    const authorMap = new Map(authorEntries);

    // Map posts to PostWithAuthor using the author map
    const results: PostWithAuthor[] = [];
    for (const post of posts) {
        const author = authorMap.get(post.authorId);
        if (!author) continue;
        const { authorId: _, ...rest } = post;
        results.push({ ...rest, author });
    }
    return results;
};

// Obtener un post por slug con datos del autor
export const getPostBySlugWithAuthor = async (slug: string): Promise<PostWithAuthor | undefined> => {
    const post = await getPostBySlug(slug);
    if (!post) return undefined;

    const postWithAuthor = await populatePostAuthor(post);
    return postWithAuthor || undefined;
};


// Obtener todos los posts con datos del autor
export const getAllPostsWithAuthor = async (): Promise<PostWithAuthor[]> => {
    const posts = await getAllPosts();
    return batchPopulateAuthors(posts);
};

// Obtener todos los posts publicados con datos del autor
export const getAllPublishedPostsWithAuthor = async (filters: PostFilters): Promise<PostWithAuthor[]> => {
    const posts = await getAllPublishedPosts(filters);
    return batchPopulateAuthors(posts);
};

// Obtener posts por IDs con datos del autor (batched queries, max 30 per batch)
export const getPostsByIds = async (postIds: string[]): Promise<PostWithAuthor[]> => {
    if (!postIds.length) return [];

    // Deduplicate IDs
    const uniqueIds = [...new Set(postIds)];

    // Firestore 'in' operator supports max 30 items per query
    const BATCH_SIZE = 30;
    const allPosts: Post[] = [];

    for (let i = 0; i < uniqueIds.length; i += BATCH_SIZE) {
        const batch = uniqueIds.slice(i, i + BATCH_SIZE);
        const q = query(postsCollection, where(documentId(), "in", batch));
        const snapshot = await getDocs(q);
        snapshot.docs.forEach((doc) => {
            allPosts.push(serializePost(doc.data() as Post));
        });
    }

    return batchPopulateAuthors(allPosts);
};

// Obtener posts que el usuario ha dado like
export const getUserLikedPosts = async (userStats: { likes: string[] } | undefined): Promise<PostWithAuthor[]> => {
    if (!userStats?.likes?.length) return [];

    // Get posts by liked post IDs, most recent first
    const likedPostIds = [...userStats.likes].reverse();
    const posts = await getPostsByIds(likedPostIds);

    // Filter only published posts
    return posts.filter(post => post.isPublished);
};

// Obtener posts que el usuario ha visto recientemente
export const getUserViewedPosts = async (userStats: { views: string[] } | undefined): Promise<PostWithAuthor[]> => {
    if (!userStats?.views?.length) return [];

    // Get posts by viewed post IDs, most recent first (last 20 views)
    const recentViewedIds = [...userStats.views].reverse().slice(0, 20);
    const posts = await getPostsByIds(recentViewedIds);

    // Filter only published posts
    return posts.filter(post => post.isPublished);
};
