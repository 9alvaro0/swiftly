// firebase/firestore/post.ts

import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
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
    console.log("Post actualizado:", id);
};

// Eliminar un post
export const deletePost = async (id: string): Promise<void> => {
    await deleteDoc(doc(postsCollection, id));
    console.log("Post eliminado:", id);
};
