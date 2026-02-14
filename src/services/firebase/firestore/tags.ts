import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, limit } from "firebase/firestore";
import { db } from "../config";
import { Tag } from "@/types/Tag"; // Importar el objeto Tag
import { auth } from "../config";

// Helper function to serialize Firestore data for client components
function serializeTag(data: Record<string, unknown>, docId: string): Tag {
    const tag: Tag = {
        id: docId,
        name: data.name as string,
        description: (data.description as string) || '',
    };

    // Add optional fields if they exist
    if (data.createdAt) {
        const createdAt = data.createdAt as { toDate?: () => Date };
        tag.createdAt = createdAt.toDate?.() || (createdAt as Date);
    }
    
    if (data.updatedAt) {
        const updatedAt = data.updatedAt as { toDate?: () => Date };
        tag.updatedAt = updatedAt.toDate?.() || (updatedAt as Date);
    }
    
    if (data.slug) {
        tag.slug = data.slug as string;
    }
    
    if (data.postCount !== undefined) {
        tag.postCount = data.postCount as number;
    }

    return tag;
}

// Colección de Firestore
const tagsCollection = collection(db, "tags");

// Crear un tag usando la API admin (evita problemas de permisos)
export const createTagViaAPI = async (tagData: { name: string; slug: string; description?: string }): Promise<Tag> => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not authenticated");
        }

        const token = await user.getIdToken();
        
        const response = await fetch('/api/admin/tags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(tagData)
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to create tag');
        }

        return result.tag;
    } catch (error) {
        console.error("Error creating tag via API:", error);
        throw new Error(`Failed to create tag: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Crear un tag
export const createTag = async (tag: Tag): Promise<void> => {
    try {
        if (!tag || !tag.id) {
            throw new Error("Tag data or tag ID is required");
        }
        await setDoc(doc(tagsCollection, tag.id), tag);
    } catch (error) {
        console.error("Error creating tag:", error);
        throw new Error(`Failed to create tag: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Obtener un tag por ID
export const getTagById = async (tagId: string): Promise<Tag | null> => {
    try {
        if (!tagId || typeof tagId !== 'string') {
            throw new Error("Valid tag ID is required");
        }
        
        const docRef = doc(tagsCollection, tagId);
        const snapshot = await getDoc(docRef);
        
        if (snapshot.exists()) {
            const tagData = snapshot.data();
            return serializeTag(tagData, tagId);
        }

        return null;
    } catch (error) {
        console.error(`Error getting tag by ID (${tagId}):`, error);
        if (error instanceof Error && error.message.includes("Valid tag ID is required")) {
            throw error;
        }
        throw new Error(`Failed to get tag: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Obtener todos los tags
export const getAllTags = async (
    searchTerm: string = "",
): Promise<Tag[]> => {
    try {
        const q = query(tagsCollection, limit(200));
        const snapshot = await getDocs(q);
        
        const tags = snapshot.docs
            .filter((doc) => {
                try {
                    const data = doc.data() as Tag;
                    if (!data || !data.name) {
                        console.warn(`Invalid tag data found in document: ${doc.id}`);
                        return false;
                    }
                    return data.name.toLowerCase().includes(searchTerm.toLowerCase());
                } catch (error) {
                    console.warn(`Error processing tag document ${doc.id}:`, error);
                    return false;
                }
            })
            .map((doc) => {
                const tagData = doc.data();
                return serializeTag(tagData, doc.id);
            });
            
        return tags;
    } catch (error) {
        console.error("Error getting all tags:", error);
        // Return empty array as fallback to prevent app crashes
        return [];
    }
};

// Actualizar un tag
export const updateTag = async (tagId: string, updatedFields: Partial<Tag>): Promise<void> => {
    try {
        if (!tagId || typeof tagId !== 'string') {
            throw new Error("Valid tag ID is required");
        }
        
        if (!updatedFields || Object.keys(updatedFields).length === 0) {
            throw new Error("Updated fields are required");
        }
        
        await updateDoc(doc(tagsCollection, tagId), updatedFields);
    } catch (error) {
        console.error(`Error updating tag (${tagId}):`, error);
        throw new Error(`Failed to update tag: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Eliminar un tag
export const deleteTag = async (tagId: string): Promise<void> => {
    try {
        if (!tagId || typeof tagId !== 'string') {
            throw new Error("Valid tag ID is required");
        }
        
        await deleteDoc(doc(tagsCollection, tagId));
    } catch (error) {
        console.error(`Error deleting tag (${tagId}):`, error);
        throw new Error(`Failed to delete tag: ${error instanceof Error ? error.message : String(error)}`);
    }
};
