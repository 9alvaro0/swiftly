// firebase/auth.ts
import { auth } from "@/firebase/config";
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    UserCredential,
} from "firebase/auth";
import { createUserProfile, updateLastLogin, getUser } from "@/firebase/firestore/user";

// Función para login con GitHub
export const loginWithGithub = async (): Promise<UserCredential> => {
    const provider = new GithubAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userProfile = await getUser(user.uid);

    if (!userProfile) {
        const githubUsername = user.email?.split("@")[0] || "";
        const githubUrl = `https://github.com/${githubUsername}`;

        // Crear el perfil de usuario en Firestore
        await createUserProfile(user.uid, {
            email: user.email || "",
            name: user.displayName || "",
            username: githubUsername,
            photoURL: user.photoURL || "",
            emailVerified: user.emailVerified,
            phone: user.phoneNumber || undefined,
            provider: "github",
            socialLinks: {
                github: githubUrl,
            },
        });
    } else {
        await updateLastLogin(user.uid);
    }
    return result;
};

export const loginWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    await updateLastLogin(user.uid);
    return result;
};

export const registerWithEmailAndPassword = async (
    email: string,
    password: string,
    name: string,
    username?: string
): Promise<UserCredential> => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    await createUserProfile(user.uid, {
        email,
        name,
        username,
        provider: "email",
        emailVerified: false,
        phone: undefined,
    });

    return result;
};

export const logout = async (): Promise<void> => {
    await auth.signOut();
};
