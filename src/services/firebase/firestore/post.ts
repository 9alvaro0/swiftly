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
import { Post } from "@/types/Post";
import { db } from "../config";
import { convertDatesToTimestamps, convertTimestampsToDates } from "@/services/firebase/utils/utils";

// Colección de Firestore
const postsCollection = collection(db, "posts");

// Obtener un post por ID
export const getPostById = async (id: string): Promise<Post | undefined> => {
    try {
        const postRef = doc(postsCollection, id);
        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) {
            const postData = convertTimestampsToDates(postDoc.data());
            return postData as Post;
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
            const postData = convertTimestampsToDates(postDoc.data());
            return postData as Post;
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
            const postData = convertTimestampsToDates(doc.data());
            return postData as Post;
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
            const postData = convertTimestampsToDates(doc.data());
            return postData as Post;
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
    type?: string;
}

export const getAllPublishedPosts = async (filters: PostFilters): Promise<Post[]> => {
    try {
        const { searchTerm = "", level = "", type = "" } = filters;
        
        // Use simple query that doesn't require composite indexes
        const q = query(
            postsCollection,
            where("isPublished", "==", true)
        );
        
        const snapshot = await getDocs(q);
        let posts = snapshot.docs.map((doc) => {
            const postData = convertTimestampsToDates(doc.data());
            return postData as Post;
        });
        
        // Apply all filtering client-side to avoid index requirements
        if (level) {
            posts = posts.filter((post) => post.level === level);
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
