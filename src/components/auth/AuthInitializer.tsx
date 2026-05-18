// src/components/auth/AuthInitializer.tsx

"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase/config";
import { getUser } from "@/services/firebase/firestore/user";
import { useAuthStore } from "@/store/authStore";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
    const { setUser, setAuthenticated, setLoading } = useAuthStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Usuario está autenticado, obtener perfil con reintentos
                    let userProfile = await getUser(firebaseUser.uid);
                    let retries = 3;
                    
                    // Si no encuentra el perfil, reintentar (para usuarios recién registrados)
                    while (!userProfile && retries > 0) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        userProfile = await getUser(firebaseUser.uid);
                        retries--;
                    }

                    if (userProfile) {
                        setUser(userProfile);
                        setAuthenticated(true);
                    } else {
                        // Si no hay perfil después de reintentos, cerrar sesión
                        setUser(null);
                        setAuthenticated(false);
                        auth.signOut();
                    }
                } catch (error) {
                    console.error("Error al inicializar la autenticación:", error);
                    setUser(null);
                    setAuthenticated(false);
                }
            } else {
                // No hay usuario autenticado
                setUser(null);
                setAuthenticated(false);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, [setUser, setAuthenticated, setLoading]);

    return <>{children}</>;
}
