import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config";
import { Tag } from "@/types/Tag"; // Importar el objeto Tag

// Colección de Firestore
const tagsCollection = collection(db, "tags");

// Crear un tag
export const createTag = async (tag: Tag): Promise<void> => {
    await setDoc(doc(tagsCollection, tag.id), tag);
};

// Obtener un tag por ID
export const getTagById = async (tagId: string): Promise<Tag | null> => {
    const docRef = doc(tagsCollection, tagId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
        return snapshot.data() as Tag;
    }
    return null;
};

// Obtener todos los tags
export const getAllTags = async (): Promise<Tag[]> => {
    const snapshot = await getDocs(tagsCollection);
    return snapshot.docs.map((doc) => doc.data() as Tag);
};

// Actualizar un tag
export const updateTag = async (tagId: string, updatedFields: Partial<Tag>): Promise<void> => {
    await updateDoc(doc(tagsCollection, tagId), updatedFields);
};

// Eliminar un tag
export const deleteTag = async (tagId: string): Promise<void> => {
    await deleteDoc(doc(tagsCollection, tagId));
};
