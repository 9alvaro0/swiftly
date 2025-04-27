// firebase/firestore/user.ts

import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    limit,
    orderBy,
    Timestamp,
    arrayUnion,
} from "firebase/firestore";
import { db } from "../config";
import { User } from "@/types/User";
import { convertDatesToTimestamps, convertTimestampsToDates } from "@/services/firebase/utils/utils";
import { UserProfile } from "firebase/auth";

// Colección de Firestore
const usersCollection = collection(db, "users");

// Crear un perfil de usuario básico cuando se registra
export const createUserProfile = async (
    uid: string,
    profile: Partial<User> & { username?: string; name?: string; provider?: string }
): Promise<void> => {
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
    await setDoc(doc(usersCollection, uid), userWithTimestamps);
};

// Guardar o actualizar un perfil de usuario completo
export const saveUser = async (user: User): Promise<void> => {
    const userWithTimestamps = convertDatesToTimestamps({
        ...user,
        updatedAt: new Date(),
    });

    await setDoc(doc(usersCollection, user.uid), userWithTimestamps);
};

// Obtener un perfil de usuario por ID
export const getUser = async (uid: string): Promise<User | null> => {
    const userDoc = await getDoc(doc(usersCollection, uid));

    if (userDoc.exists()) {
        const userData = convertTimestampsToDates(userDoc.data());
        return userData as User;
    }

    return null;
};

// Actualizar el timestamp de último login
export const updateLastLogin = async (uid: string): Promise<void> => {
    const now = new Date();
    await updateDoc(doc(usersCollection, uid), {
        lastLogin: Timestamp.fromDate(now),
        updatedAt: Timestamp.fromDate(now),
    });
};

// Verificar si un email ya está registrado
export const emailExists = async (email: string): Promise<boolean> => {
    const q = query(usersCollection, where("email", "==", email), limit(1));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
};

// Verificar si un username ya está registrado
export const usernameExists = async (username: string): Promise<boolean> => {
    const q = query(usersCollection, where("username", "==", username), limit(1));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
};

// Actualizar campos específicos de un perfil de usuario
export const updateUser = async (uid: string, updatedFields: Partial<User>): Promise<void> => {
    const updatedData = convertDatesToTimestamps({
        ...updatedFields,
        updatedAt: new Date(),
    });

    await updateDoc(doc(usersCollection, uid), updatedData);
};

// Actualizar links sociales
export const updateSocialLinks = async (
    uid: string,
    socialLinks: Partial<UserProfile["socialLinks"]>
): Promise<void> => {
    await updateDoc(doc(usersCollection, uid), {
        socialLinks: socialLinks,
        updatedAt: Timestamp.fromDate(new Date()),
    });
};

// Incrementar una estadística específica del usuario
export const incrementUserStat = async (uid: string, stat: keyof User["stats"], value: string): Promise<void> => {
    await updateDoc(doc(usersCollection, uid), {
        [stat]: arrayUnion(value),
        updatedAt: Timestamp.fromDate(new Date()),
    });
};

// Eliminar un perfil de usuario
export const deleteUserProfile = async (uid: string): Promise<void> => {
    await deleteDoc(doc(usersCollection, uid));
};

// Obtener usuarios recientes
export const getRecentUsers = async (limitCount: number = 10): Promise<User[]> => {
    const q = query(usersCollection, orderBy("createdAt", "desc"), limit(limitCount));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
        const userData = convertTimestampsToDates(doc.data());
        return userData as User;
    });
};

// Obtener usuarios más activos (por último login)
export const getActiveUsers = async (limitCount: number = 10): Promise<User[]> => {
    const q = query(usersCollection, orderBy("lastLogin", "desc"), limit(limitCount));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
        const userData = convertTimestampsToDates(doc.data());
        return userData as User;
    });
};

// Obtener todos los usuarios
export const getAllUsers = async (searchTerm: string = "", role: string = "", status: string = ""): Promise<User[]> => {
    const q = query(usersCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
        .map((doc) => {
            const userData = convertTimestampsToDates(doc.data());
            return userData as User;
        })
        .filter((user) => {
            const isMatchingRole = role ? user.role === role : true;
            const isMatchingStatus = status ? user.isActive === (status === "active") : true;
            const isMatchingSearchTerm = searchTerm
                ? user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.username.toLowerCase().includes(searchTerm.toLowerCase())
                : true;

            return isMatchingRole && isMatchingStatus && isMatchingSearchTerm;
        });
};
