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

            // Esperar un poco más para asegurar que el token de autenticación esté disponible
            await new Promise(resolve => setTimeout(resolve, 500));

            // Forzar la actualización del token
            try {
                await user.getIdToken(true);
            } catch (error) {
                console.warn('Error refreshing token:', error);
            }

            // Intentar crear el perfil con reintentos
            let retries = 3;
            let lastError;
            
            while (retries > 0) {
                try {
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
                    break;
                } catch (error) {
                    lastError = error;
                    retries--;
                    if (retries > 0) {
                        console.warn(`Failed to create GitHub user profile, retrying... (${retries} attempts left)`);
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }
            }

            if (retries === 0 && lastError) {
                console.error('Failed to create GitHub user profile after all retries:', lastError);
                throw lastError;
            }
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
            // Esperar un poco más para asegurar que el token de autenticación esté disponible
            await new Promise(resolve => setTimeout(resolve, 500));

            // Forzar la actualización del token
            try {
                await user.getIdToken(true);
            } catch (error) {
                console.warn('Error refreshing token:', error);
            }

            // Intentar crear el perfil con reintentos
            let retries = 3;
            let lastError;
            
            while (retries > 0) {
                try {
                    await createUserProfile(user.uid, {
                        email: user.email || "",
                        name: user.displayName || "",
                        username: user.email?.split("@")[0] || "",
                        photoURL: user.photoURL || "",
                        emailVerified: user.emailVerified,
                        phone: user.phoneNumber || undefined,
                        provider: "google",
                    });
                    break;
                } catch (error) {
                    lastError = error;
                    retries--;
                    if (retries > 0) {
                        console.warn(`Failed to create Google user profile, retrying... (${retries} attempts left)`);
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }
            }

            if (retries === 0 && lastError) {
                console.error('Failed to create Google user profile after all retries:', lastError);
                throw lastError;
            }
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

    // Esperar un poco más para asegurar que el token de autenticación esté disponible
    await new Promise(resolve => setTimeout(resolve, 500));

    // Forzar la actualización del token para asegurar que esté disponible
    try {
        await user.getIdToken(true);
    } catch (error) {
        console.warn('Error refreshing token:', error);
    }

    // Intentar crear el perfil con reintentos
    let retries = 3;
    let lastError;
    
    while (retries > 0) {
        try {
            await createUserProfile(user.uid, {
                email,
                name,
                username,
                provider: "email",
                emailVerified: false,
                phone: undefined,
            });
            break; // Success, exit loop
        } catch (error) {
            lastError = error;
            retries--;
            if (retries > 0) {
                console.warn(`Failed to create user profile, retrying... (${retries} attempts left)`);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

    if (retries === 0 && lastError) {
        console.error('Failed to create user profile after all retries:', lastError);
        throw lastError;
    }

    return result;
};

export const logout = async (): Promise<void> => {
    await auth.signOut();
};
