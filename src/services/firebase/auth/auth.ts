// firebase/auth.ts
import { auth } from "@/services/firebase/config";
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    UserCredential,
    AuthError,
} from "firebase/auth";
import { createUserProfile, updateLastLogin, getUser } from "@/services/firebase/firestore/user";

// Type guard para verificar si es un AuthError
function isAuthError(error: unknown): error is AuthError {
    return (
        error !== null &&
        typeof error === 'object' &&
        'code' in error &&
        typeof (error as Record<string, unknown>).code === 'string'
    );
}

// Función para login con GitHub
export const loginWithGithub = async (): Promise<UserCredential> => {
    try {
        const provider = new GithubAuthProvider();
        provider.addScope('user:email');

        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userProfile = await getUser(user.uid);

        if (!userProfile) {
            const githubUsername = user.email?.split("@")[0] || "";
            const githubUrl = `https://github.com/${githubUsername}`;

            // Esperar un poco para asegurar que el token de autenticación esté disponible
            await new Promise(resolve => setTimeout(resolve, 200));

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
    } catch (error) {
        console.error('Error al iniciar sesión con GitHub:', error);
        
        // Manejar error de cuenta existente con diferente proveedor
        if (isAuthError(error) && error.code === 'auth/account-exists-with-different-credential') {
            const email = (error as AuthError & { customData?: { email?: string } }).customData?.email;
            throw new Error(`Ya tienes una cuenta con este email (${email}) usando Google. Por favor, inicia sesión con Google primero.`);
        }
        
        throw error;
    }
};

// Función para login con Google
export const loginWithGoogle = async (): Promise<UserCredential> => {
    try {
        const provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');

        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userProfile = await getUser(user.uid);

        if (!userProfile) {
            // Esperar un poco para asegurar que el token de autenticación esté disponible
            await new Promise(resolve => setTimeout(resolve, 200));

            // Crear el perfil de usuario en Firestore
            await createUserProfile(user.uid, {
                email: user.email || "",
                name: user.displayName || "",
                username: user.email?.split("@")[0] || "",
                photoURL: user.photoURL || "",
                emailVerified: user.emailVerified,
                phone: user.phoneNumber || undefined,
                provider: "google",
            });
        } else {
            await updateLastLogin(user.uid);
        }
        return result;
    } catch (error) {
        console.error('Error al iniciar sesión con Google:', error);
        
        // Manejar error de cuenta existente con diferente proveedor
        if (isAuthError(error) && error.code === 'auth/account-exists-with-different-credential') {
            const email = (error as AuthError & { customData?: { email?: string } }).customData?.email;
            throw new Error(`Ya tienes una cuenta con este email (${email}) usando GitHub. Por favor, inicia sesión con GitHub primero.`);
        }
        
        throw error;
    }
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

    // Esperar un poco para asegurar que el token de autenticación esté disponible
    await new Promise(resolve => setTimeout(resolve, 200));

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
