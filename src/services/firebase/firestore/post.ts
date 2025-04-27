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
} from "firebase/firestore";
import { Post } from "@/types/Post";
import { db } from "../config";
import { convertDatesToTimestamps, convertTimestampsToDates } from "@/services/firebase/utils/utils";

// Colección de Firestore
const postsCollection = collection(db, "posts");

// Obtener un post por ID
export const getPostById = async (id: string): Promise<Post | undefined> => {
    const postRef = doc(postsCollection, id);
    const postDoc = await getDoc(postRef);
    if (postDoc.exists()) {
        const postData = convertTimestampsToDates(postDoc.data());
        return postData as Post;
    }
    return undefined;
};

// Obtener un post por slug
export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
    const snapshot = await getDocs(postsCollection);
    const postDoc = snapshot.docs.find((doc) => doc.data().slug === slug);
    if (postDoc) {
        const postData = convertTimestampsToDates(postDoc.data());
        return postData as Post;
    }
    return undefined;
};

// Obtener posts por tags
export const getPostsByTag = async (tag: string): Promise<Post[]> => {
    const snapshot = await getDocs(postsCollection);
    return snapshot.docs
        .filter((doc) => {
            const data = doc.data() as Post;
            return data.tags && data.tags.some((t) => t.toLowerCase() === tag.toLowerCase());
        })
        .map((doc) => {
            const postData = convertTimestampsToDates(doc.data());
            return postData as Post;
        });
};

// Obtener todos los posts

export const getAllPosts = async (): Promise<Post[]> => {
    const snapshot = await getDocs(postsCollection);
    return snapshot.docs.map((doc) => {
        console.log("doc.data()", doc.data());
        const postData = convertTimestampsToDates(doc.data());
        return postData as Post;
    });
};

// Obtener todos los posts publicados
interface PostFilters {
    searchTerm?: string;
    level?: string;
    type?: string;
}

export const getAllPublishedPosts = async (filters: PostFilters): Promise<Post[]> => {
    const { searchTerm = "", level = "", type = "" } = filters;
    const snapshot = await getDocs(postsCollection);

    return snapshot.docs
        .filter((doc) => {
            const data = doc.data() as Post;
            if (data.isPublished !== true) return false;

            if (searchTerm && !data.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            if (level && data.level !== level) return false;

            if (type && data.type !== type) return false;

            return true;
        })
        .map((doc) => {
            const postData = convertTimestampsToDates(doc.data());
            return postData as Post;
        });
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
