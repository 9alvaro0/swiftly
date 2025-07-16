// firebase/firestore/authors.ts

import {
    collection,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";
import { db } from "../config";
import { Author } from "@/types/Post";
import { User } from "@/types/User";

// Colección de Firestore
const authorsCollection = collection(db, "authors");

// Crear o actualizar perfil de autor desde datos de usuario
export const createOrUpdateAuthorProfile = async (user: User): Promise<void> => {
    try {
        if (!user || !user.uid) {
            throw new Error("Valid user data with UID is required");
        }
        
        // Construir datos del autor sin valores undefined
        const authorData: Record<string, unknown> = {
            id: user.uid,
            name: user.name || user.username || 'Usuario',
        };
        
        // Solo agregar campos que no sean undefined
        if (user.username) authorData.username = user.username;
        if (user.photoURL) authorData.avatar = user.photoURL;
        if (user.bio) authorData.bio = user.bio;
        
        // Construir socialLinks solo con valores definidos
        const socialLinks: Record<string, string> = {};
        if (user.socialLinks?.github) socialLinks.github = user.socialLinks.github;
        if (user.socialLinks?.linkedin) socialLinks.linkedin = user.socialLinks.linkedin;
        
        if (Object.keys(socialLinks).length > 0) {
            authorData.socialLinks = socialLinks;
        }

        await setDoc(doc(authorsCollection, user.uid), authorData);
        console.log(`Author profile created/updated successfully: ${user.uid}`);
    } catch (error) {
        console.error(`Error creating/updating author profile (${user?.uid || 'unknown'}):`, error);
        throw new Error(`Failed to create/update author profile: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Obtener perfil de autor por ID
export const getAuthor = async (authorId: string): Promise<Author | null> => {
    try {
        if (!authorId || typeof authorId !== 'string') {
            throw new Error("Valid author ID is required");
        }
        
        const authorDoc = await getDoc(doc(authorsCollection, authorId));

        if (authorDoc.exists()) {
            const authorData = authorDoc.data() as Author;
            console.log(`Author retrieved successfully: ${authorId}`);
            return authorData;
        }

        console.log(`Author not found: ${authorId}`);
        return null;
    } catch (error) {
        console.error(`Error getting author (${authorId}):`, error);
        if (error instanceof Error && error.message.includes("Valid author ID is required")) {
            throw error;
        }
        throw new Error(`Failed to get author: ${error instanceof Error ? error.message : String(error)}`);
    }
};

