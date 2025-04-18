// src/components/auth/AuthInitializer.tsx
"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { getUser } from "@/firebase/firestore/user";
import { useAuthStore } from "@/store/authStore";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
    const { setUser, setAuthenticated, setLoading } = useAuthStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Usuario está autenticado, obtener perfil
                    const userProfile = await getUser(firebaseUser.uid);

                    if (userProfile) {
                        setUser(userProfile);
                        setAuthenticated(true);
                    } else {
                        // Si no hay perfil, cerrar sesión
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
