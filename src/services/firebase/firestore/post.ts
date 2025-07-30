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
    runTransaction,
    query,
    where,
    orderBy,
    limit,
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
    try {
        const postRef = doc(postsCollection, id);
        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) {
            return serializePost(postDoc.data() as Post);
        }
        return undefined;
    } catch (error) {
        console.error("Error getting post by ID:", error);
        return undefined;
    }
};

// Obtener un post por slug
export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
    try {
        const q = query(postsCollection, where("slug", "==", slug), limit(1));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
            const postDoc = snapshot.docs[0];
            return serializePost(postDoc.data() as Post);
        }
        return undefined;
    } catch (error) {
        console.error("Error getting post by slug:", error);
        return undefined;
    }
};

// Obtener posts por tags
export const getPostsByTag = async (tag: string): Promise<Post[]> => {
    try {
        // Use simple query to avoid composite index requirements
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
    } catch (error) {
        console.error("Error getting posts by tag:", error);
        return [];
    }
};

// Obtener todos los posts
export const getAllPosts = async (): Promise<Post[]> => {
    try {
        const q = query(postsCollection, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => {
            return serializePost(doc.data() as Post);
        });
    } catch (error) {
        console.error("Error getting all posts:", error);
        return [];
    }
};

// Obtener todos los posts publicados
interface PostFilters {
    searchTerm?: string;
    level?: string;
    tag?: string;
    type?: string;
}

export const getAllPublishedPosts = async (filters: PostFilters): Promise<Post[]> => {
    try {
        const { searchTerm = "", level = "", tag = "", type = "" } = filters;
        
        // Use simple query that doesn't require composite indexes
        const q = query(
            postsCollection,
            where("isPublished", "==", true)
        );
        
        const snapshot = await getDocs(q);
        let posts = snapshot.docs.map((doc) => {
            return serializePost(doc.data() as Post);
        });
        
        // Apply all filtering client-side to avoid index requirements
        if (level) {
            posts = posts.filter((post) => post.level === level);
        }
        
        if (tag) {
            posts = posts.filter((post) => 
                post.tags && post.tags.some(postTag => 
                    postTag.toLowerCase() === tag.toLowerCase()
                )
            );
        }
        
        if (type) {
            posts = posts.filter((post) => post.type === type);
        }
        
        if (searchTerm) {
            posts = posts.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Sort by publishedAt descending
        posts.sort((a, b) => {
            const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            return dateB - dateA;
        });
        
        return posts;
    } catch (error) {
        console.error("Error getting published posts:", error);
        return [];
    }
};

// Crea o actualiza un post
export const createOrUpdatePost = async (id: string, updatedFields: Partial<Post>): Promise<void> => {
    const existingPost = await getPostById(id);

    let post;
    if (existingPost) {
        post = {
            ...existingPost,
            ...updatedFields,
            updatedAt: new Date(),
        };
    } else {
        post = {
            id,
            createdAt: new Date(),
            ...updatedFields,
            updatedAt: new Date(),
        };
    }

    const processedData = convertDatesToTimestamps(post);
    await setDoc(doc(postsCollection, id), processedData);
};

// Eliminar un post
export const deletePost = async (id: string): Promise<void> => {
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

// Obtener si un usuario ha dado like a un post específico
export const hasUserLikedPost = async (postId: string, userId: string): Promise<boolean> => {
    const postRef = doc(postsCollection, postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
        return false;
    }

    const postData = postDoc.data();
    return Array.isArray(postData.likedBy) && postData.likedBy.includes(userId);
};

// Incrementa el contador de vistas de un post
export const incrementPostViews = async (postId: string): Promise<{ views: number }> => {
    const postRef = doc(postsCollection, postId);

    try {
        let newViewCount = 0;

        await runTransaction(db, async (transaction) => {
            const postDoc = await transaction.get(postRef);

            if (!postDoc.exists()) {
                throw new Error("El post no existe");
            }

            // Obtenemos el número actual de vistas o 0 si no existe
            const currentViews = postDoc.data().views || 0;
            newViewCount = currentViews + 1;

            // Incrementamos el contador de vistas
            transaction.update(postRef, {
                views: increment(1),
            });
        });

        return { views: newViewCount };
    } catch (error) {
        throw error;
    }
};

// === FUNCTIONS WITH POPULATED AUTHOR DATA ===


// Obtener un post por slug con datos del autor
export const getPostBySlugWithAuthor = async (slug: string): Promise<PostWithAuthor | undefined> => {
    try {
        const post = await getPostBySlug(slug);
        if (!post) return undefined;
        
        const postWithAuthor = await populatePostAuthor(post);
        return postWithAuthor || undefined;
    } catch (error) {
        console.error("Error getting post by slug with author:", error);
        return undefined;
    }
};


// Obtener todos los posts con datos del autor
export const getAllPostsWithAuthor = async (): Promise<PostWithAuthor[]> => {
    try {
        const posts = await getAllPosts();
        
        const postsWithAuthor = await Promise.all(
            posts.map(async (post) => {
                const postWithAuthor = await populatePostAuthor(post);
                return postWithAuthor;
            })
        );
        
        return postsWithAuthor.filter((post): post is PostWithAuthor => post !== null);
    } catch (error) {
        console.error("Error getting all posts with author:", error);
        return [];
    }
};

// Obtener todos los posts publicados con datos del autor
export const getAllPublishedPostsWithAuthor = async (filters: PostFilters): Promise<PostWithAuthor[]> => {
    try {
        const posts = await getAllPublishedPosts(filters);
        
        const postsWithAuthor = await Promise.all(
            posts.map(async (post) => {
                const postWithAuthor = await populatePostAuthor(post);
                return postWithAuthor;
            })
        );
        
        return postsWithAuthor.filter((post): post is PostWithAuthor => post !== null);
    } catch (error) {
        console.error("Error getting published posts with author:", error);
        return [];
    }
};

// Obtener posts por IDs con datos del autor
export const getPostsByIds = async (postIds: string[]): Promise<PostWithAuthor[]> => {
    try {
        if (!postIds.length) return [];
        
        // Get posts in parallel
        const posts = await Promise.all(
            postIds.map(async (id) => {
                try {
                    return await getPostById(id);
                } catch (error) {
                    console.warn(`Error getting post with ID ${id}:`, error);
                    return undefined;
                }
            })
        );
        
        // Filter out undefined posts and populate authors
        const validPosts = posts.filter((post): post is Post => post !== undefined);
        
        const postsWithAuthor = await Promise.all(
            validPosts.map(async (post) => {
                const postWithAuthor = await populatePostAuthor(post);
                return postWithAuthor;
            })
        );
        
        return postsWithAuthor.filter((post): post is PostWithAuthor => post !== null);
    } catch (error) {
        console.error("Error getting posts by IDs:", error);
        return [];
    }
};

// Obtener posts que el usuario ha dado like
export const getUserLikedPosts = async (userStats: { likes: string[] } | undefined): Promise<PostWithAuthor[]> => {
    try {
        if (!userStats?.likes?.length) return [];
        
        // Get posts by liked post IDs, most recent first
        const likedPostIds = [...userStats.likes].reverse(); // Most recent likes first
        const posts = await getPostsByIds(likedPostIds);
        
        // Filter only published posts
        return posts.filter(post => post.isPublished);
    } catch (error) {
        console.error("Error getting user liked posts:", error);
        return [];
    }
};

// Obtener posts que el usuario ha visto recientemente
export const getUserViewedPosts = async (userStats: { views: string[] } | undefined): Promise<PostWithAuthor[]> => {
    try {
        if (!userStats?.views?.length) return [];
        
        // Get posts by viewed post IDs, most recent first (last 20 views)
        const recentViewedIds = [...userStats.views].reverse().slice(0, 20); // Last 20 views
        const posts = await getPostsByIds(recentViewedIds);
        
        // Filter only published posts
        return posts.filter(post => post.isPublished);
    } catch (error) {
        console.error("Error getting user viewed posts:", error);
        return [];
    }
};
