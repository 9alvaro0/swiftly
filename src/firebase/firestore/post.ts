// firebase/firestore/post.ts

import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove,
    increment,
    runTransaction,
} from "firebase/firestore";
import { Post } from "@/types/Post";
import { db } from "../config";
import { convertDatesToTimestamps, convertTimestampsToDates } from "@/firebase/utils/utils";

// Colección de Firestore
const postsCollection = collection(db, "posts");

// Crear un post
export const createPost = async (post: Post): Promise<void> => {
    const postWithTimestamps = convertDatesToTimestamps(post);
    await setDoc(doc(postsCollection, post.id), postWithTimestamps);
};

// Obtener un post por slug
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
    const snapshot = await getDocs(postsCollection);
    const postDoc = snapshot.docs.find((doc) => doc.data().slug === slug);
    if (postDoc) {
        const postData = convertTimestampsToDates(postDoc.data());
        return postData as Post;
    }
    return null;
};

// Obtener posts por tags
export const getPostsByTag = async (tag: string): Promise<Post[]> => {
    const snapshot = await getDocs(postsCollection);
    return snapshot.docs
        .filter((doc) => {
            const data = doc.data() as Post;
            return data.tags && data.tags.includes(tag);
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
        const postData = convertTimestampsToDates(doc.data());
        console.log("Post data:", postData); // Log para depuración
        return postData as Post;
    });
};

// Obtener todos los posts publicados
export const getAllPublishedPosts = async (
    searchTerm: string = "",
    level: string = "",
    type: string = ""
): Promise<Post[]> => {
    console.log("Buscando posts con los siguientes parámetros:", {
        searchTerm,
        level,
        type,
    });
    const snapshot = await getDocs(postsCollection);

    return snapshot.docs
        .filter((doc) => {
            const data = doc.data() as Post;
            console.log("Post data:", data); // Log para depuración
            // Only filter published posts
            if (data.isPublished !== true) return false;

            // Case-insensitive search
            if (searchTerm && !data.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            // Optional level filter
            if (level && data.level !== level) return false;

            // Optional type filter
            if (type && data.type !== type) return false;

            return true;
        })
        .map((doc) => {
            const postData = convertTimestampsToDates(doc.data());
            return postData as Post;
        });
};

// Actualizar un post
export const updatePost = async (id: string, updatedFields: Partial<Post>): Promise<void> => {
    const updatedData = convertDatesToTimestamps({
        ...updatedFields,
        updatedAt: new Date(),
    });

    await updateDoc(doc(postsCollection, id), updatedData);
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

// Obtiene el número actual de vistas de un post
export const getPostViews = async (postId: string): Promise<number> => {
    const postRef = doc(postsCollection, postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
        return 0;
    }

    return postDoc.data().views || 0;
};
