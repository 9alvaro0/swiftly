// firebase/firestore/user.ts

import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    query,
    orderBy,
    limit,
    Timestamp,
    arrayUnion,
    arrayRemove,
    FieldValue,
} from "firebase/firestore";
import { db } from "../config";
import { User } from "@/types/User";
import { convertDatesToTimestamps, serializeFirestoreData } from "@/services/firebase/utils/utils";
import { createOrUpdateAuthorProfile } from "./authors";

// Colección de Firestore
const usersCollection = collection(db, "users");

// Crear un perfil de usuario básico cuando se registra
export const createUserProfile = async (
    uid: string,
    profile: Partial<User> & { username?: string; name?: string; provider?: string }
): Promise<void> => {
    try {
        if (!uid || typeof uid !== 'string') {
            throw new Error("Valid user UID is required");
        }
        
        if (!profile) {
            throw new Error("User profile data is required");
        }
        
        const now = new Date();

        const {
            email = "",
            emailVerified = false,
            username = uid,
            name = "",
            photoURL = "",
            phone = "",
            provider = "email",
            socialLinks = {},
        } = profile;

        const newUser: User = {
            uid,
            email,
            emailVerified,
            username,
            name,
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            photoURL,
            bio: profile.bio || "",
            location: profile.location || "",
            phone: phone,
            provider,
            createdAt: now,
            updatedAt: now,
            lastLogin: now,
            role: "user",
            isActive: true,
            isBanned: false,
            stats: {
                views: [],
                likes: [],
            },
            socialLinks,
        };
        
        const userWithTimestamps = convertDatesToTimestamps(newUser);
        
        
        // Crear el perfil de usuario en Firestore
        await setDoc(doc(usersCollection, uid), userWithTimestamps);
        
        // También crear el perfil de autor público
        try {
            await createOrUpdateAuthorProfile(newUser);
        } catch (error) {
            console.warn(`Failed to create author profile for user ${uid}:`, error);
            // No fallar la creación del usuario si falla la creación del autor
        }
        
    } catch (error) {
        console.error(`Error creating user profile (${uid}):`, error);
        throw new Error(`Failed to create user profile: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Guardar o actualizar un perfil de usuario completo
export const saveUser = async (user: User): Promise<void> => {
    try {
        if (!user || !user.uid) {
            throw new Error("Valid user data with UID is required");
        }
        
        const userWithTimestamps = convertDatesToTimestamps({
            ...user,
            updatedAt: new Date(),
        });

        await setDoc(doc(usersCollection, user.uid), userWithTimestamps, { merge: true });
        
        // También actualizar el perfil de autor público
        try {
            await createOrUpdateAuthorProfile({
                ...user,
                updatedAt: new Date(),
            });
        } catch (error) {
            console.warn(`Failed to update author profile for user ${user.uid}:`, error);
            // No fallar la actualización del usuario si falla la actualización del autor
        }
        
    } catch (error) {
        console.error(`Error saving user (${user?.uid || 'unknown'}):`, error);
        throw new Error(`Failed to save user: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Obtener un perfil de usuario por ID
export const getUser = async (uid: string): Promise<User | null> => {
    try {
        if (!uid || typeof uid !== 'string') {
            throw new Error("Valid user UID is required");
        }
        
        const userDoc = await getDoc(doc(usersCollection, uid));

        if (userDoc.exists()) {
            const userData = serializeFirestoreData(userDoc.data());
            return userData as User;
        }

        return null;
    } catch (error) {
        console.error(`Error getting user (${uid}):`, error);
        if (error instanceof Error && error.message.includes("Valid user UID is required")) {
            throw error;
        }
        throw new Error(`Failed to get user: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Actualizar el timestamp de último login
export const updateLastLogin = async (uid: string): Promise<void> => {
    try {
        if (!uid || typeof uid !== 'string') {
            throw new Error("Valid user UID is required");
        }
        
        const now = new Date();
        await updateDoc(doc(usersCollection, uid), {
            lastLogin: Timestamp.fromDate(now),
            updatedAt: Timestamp.fromDate(now),
        });
    } catch (error) {
        console.error(`Error updating last login (${uid}):`, error);
        throw new Error(`Failed to update last login: ${error instanceof Error ? error.message : String(error)}`);
    }
};



// Actualizar campos específicos de un perfil de usuario
export const updateUser = async (uid: string, updatedFields: Partial<User>): Promise<void> => {
    try {
        if (!uid || typeof uid !== 'string') {
            throw new Error("Valid user UID is required");
        }
        
        if (!updatedFields || Object.keys(updatedFields).length === 0) {
            throw new Error("Updated fields are required");
        }
        
        const updatedData = convertDatesToTimestamps({
            ...updatedFields,
            updatedAt: new Date(),
        });

        await updateDoc(doc(usersCollection, uid), updatedData as Record<string, FieldValue | Partial<unknown> | undefined>);
        
        // También actualizar el perfil de autor si se cambiaron campos relevantes
        const authorRelevantFields = ['name', 'username', 'photoURL', 'bio', 'socialLinks'];
        const hasAuthorRelevantChanges = Object.keys(updatedFields).some(key => 
            authorRelevantFields.includes(key)
        );
        
        if (hasAuthorRelevantChanges) {
            try {
                // Obtener el usuario completo para actualizar el autor
                const userDoc = await getDoc(doc(usersCollection, uid));
                if (userDoc.exists()) {
                    const userData = serializeFirestoreData(userDoc.data()) as User;
                    await createOrUpdateAuthorProfile(userData);
                }
            } catch (error) {
                console.warn(`Failed to update author profile for user ${uid}:`, error);
                // No fallar la actualización del usuario si falla la actualización del autor
            }
        }
        
    } catch (error) {
        console.error(`Error updating user (${uid}):`, error);
        throw new Error(`Failed to update user: ${error instanceof Error ? error.message : String(error)}`);
    }
};


// Incrementar una estadística específica del usuario
export const incrementUserStat = async (uid: string, stat: keyof User["stats"], value: string): Promise<void> => {
    try {
        if (!uid || typeof uid !== 'string') {
            throw new Error("Valid user UID is required");
        }
        
        if (!stat || !value) {
            throw new Error("Stat type and value are required");
        }
        
        const validStats = ['views', 'likes'];
        if (!validStats.includes(stat)) {
            throw new Error(`Invalid stat type: ${stat}. Must be one of: ${validStats.join(', ')}`);
        }
        
        await updateDoc(doc(usersCollection, uid), {
            [`stats.${stat}`]: arrayUnion(value),
            updatedAt: Timestamp.fromDate(new Date()),
        });
    } catch (error) {
        console.error(`Error incrementing user stat (${uid}, ${stat}):`, error);
        throw new Error(`Failed to increment user stat: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Eliminar un valor de una estadística del usuario (arrayRemove atómico)
export const removeUserStat = async (uid: string, stat: keyof User["stats"], value: string): Promise<void> => {
    try {
        if (!uid || typeof uid !== 'string') {
            throw new Error("Valid user UID is required");
        }

        if (!stat || !value) {
            throw new Error("Stat type and value are required");
        }

        const validStats = ['views', 'likes'];
        if (!validStats.includes(stat)) {
            throw new Error(`Invalid stat type: ${stat}. Must be one of: ${validStats.join(', ')}`);
        }

        await updateDoc(doc(usersCollection, uid), {
            [`stats.${stat}`]: arrayRemove(value),
            updatedAt: Timestamp.fromDate(new Date()),
        });
    } catch (error) {
        console.error(`Error removing user stat (${uid}, ${stat}):`, error);
        throw new Error(`Failed to remove user stat: ${error instanceof Error ? error.message : String(error)}`);
    }
};


// Obtener todos los usuarios
export const getAllUsers = async (searchTerm: string = "", role: string = "", status: string = ""): Promise<User[]> => {
    const q = query(usersCollection, orderBy("createdAt", "desc"), limit(500));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
        .map((doc) => {
            const userData = serializeFirestoreData(doc.data());
            return userData as User;
        })
        .filter((user) => {
            const isMatchingRole = role ? user.role === role : true;
            const isMatchingStatus = status ? user.isActive === (status === "active") : true;
            const isMatchingSearchTerm = searchTerm
                ? (user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   user.name?.toLowerCase().includes(searchTerm.toLowerCase()))
                : true;

            return isMatchingRole && isMatchingStatus && isMatchingSearchTerm;
        });
};
