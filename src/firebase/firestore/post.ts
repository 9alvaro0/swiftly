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
  runTransaction 
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
    console.log("Post creado:", post.id);
};

// Obtener un post por ID
export const getPostById = async (id: string): Promise<Post | null> => {
    const docRef = doc(postsCollection, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
        const postData = convertTimestampsToDates(snapshot.data());
        return postData as Post;
    }
    return null;
};

// Obtener todos los posts
export const getAllPosts = async (): Promise<Post[]> => {
    const snapshot = await getDocs(postsCollection);
    return snapshot.docs.map((doc) => {
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
                    likedBy: arrayUnion(userId)
                });
            } else {
                // Quitar like
                transaction.update(postRef, {
                    likedBy: arrayRemove(userId)
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
export const incrementPostViews = async (postId: string): Promise<{views: number}> => {
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
                views: increment(1)
            });
        });
        
        return { views: newViewCount };
    } catch (error) {
        console.error("Error al incrementar vistas:", error);
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
