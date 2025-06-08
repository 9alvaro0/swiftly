import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config";
import { Tag } from "@/types/Tag"; // Importar el objeto Tag

// Colección de Firestore
const tagsCollection = collection(db, "tags");


// Obtener un tag por ID
export const getTagById = async (tagId: string): Promise<Tag | null> => {
    try {
        if (!tagId || typeof tagId !== 'string') {
            throw new Error("Valid tag ID is required");
        }
        
        const docRef = doc(tagsCollection, tagId);
        const snapshot = await getDoc(docRef);
        
        if (snapshot.exists()) {
            const tagData = snapshot.data() as Tag;
            console.log(`Tag retrieved successfully: ${tagId}`);
            return tagData;
        }
        
        console.log(`Tag not found: ${tagId}`);
        return null;
    } catch (error) {
        console.error(`Error getting tag by ID (${tagId}):`, error);
        if (error instanceof Error && error.message.includes("Valid tag ID is required")) {
            throw error;
        }
        throw new Error(`Failed to get tag: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Obtener todos los tags (solo para uso público)
export const getAllTags = async (): Promise<Tag[]> => {
    try {
        const snapshot = await getDocs(tagsCollection);
        
        const tags = snapshot.docs
            .filter((doc) => {
                try {
                    const data = doc.data() as Tag;
                    if (!data || !data.name) {
                        console.warn(`Invalid tag data found in document: ${doc.id}`);
                        return false;
                    }
                    return true;
                } catch (error) {
                    console.warn(`Error processing tag document ${doc.id}:`, error);
                    return false;
                }
            })
            .map((doc) => {
                const tagData = doc.data() as Tag;
                return tagData;
            });
            
        console.log(`Retrieved ${tags.length} tags`);
        return tags;
    } catch (error) {
        console.error("Error getting all tags:", error);
        return [];
    }
};

// Deprecated admin functions - now handled by Firebase Functions
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createTag = async (_tag: Tag): Promise<void> => {
    console.error('createTag is deprecated - use Firebase Functions instead');
    throw new Error('This operation must be performed through Firebase Functions');
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateTag = async (_tagId: string, _updatedFields: Partial<Tag>): Promise<void> => {
    console.error('updateTag is deprecated - use Firebase Functions instead');
    throw new Error('This operation must be performed through Firebase Functions');
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteTag = async (_tagId: string): Promise<void> => {
    console.error('deleteTag is deprecated - use Firebase Functions instead');
    throw new Error('This operation must be performed through Firebase Functions');
};
