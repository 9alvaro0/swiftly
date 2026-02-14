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
    User as FirebaseUser,
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

// Shared helper: refresh token + create profile with retries
async function ensureUserProfile(
    user: FirebaseUser,
    profileData: Parameters<typeof createUserProfile>[1]
): Promise<void> {
    // Wait for auth token to be available
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
        await user.getIdToken(true);
    } catch (error) {
        console.warn('Error refreshing token:', error);
    }

    let retries = 3;
    let lastError: unknown;

    while (retries > 0) {
        try {
            await createUserProfile(user.uid, profileData);
            return;
        } catch (error) {
            lastError = error;
            retries--;
            if (retries > 0) {
                console.warn(`Failed to create user profile, retrying... (${retries} attempts left)`);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

    console.error('Failed to create user profile after all retries:', lastError);
    throw lastError;
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
            await ensureUserProfile(user, {
                email: user.email || "",
                name: user.displayName || "",
                username: githubUsername,
                photoURL: user.photoURL || "",
                emailVerified: user.emailVerified,
                phone: user.phoneNumber || undefined,
                provider: "github",
                socialLinks: {
                    github: `https://github.com/${githubUsername}`,
                },
            });
        } else {
            await updateLastLogin(user.uid);
        }
        return result;
    } catch (error) {
        console.error('Error al iniciar sesión con GitHub:', error);

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
            await ensureUserProfile(user, {
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

    await ensureUserProfile(result.user, {
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
