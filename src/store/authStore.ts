// src/store/authStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/User";
import { toast } from "sonner";
import { logout } from "@/firebase/auth/auth";
import { incrementUserStat, updateSocialLinks, updateUser } from "@/firebase/firestore/user";

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    error: string | null;
    setUser: (user: User | null) => void;
    updateSocialLinks: (socialLinks: Partial<User["socialLinks"]>) => Promise<void>;
    incrementUserStat: (stat: keyof User["stats"], value?: number) => Promise<void>;
    setAuthenticated: (status: boolean) => void;
    setLoading: (status: boolean) => void;
    setError: (error: string | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            user: null,
            isLoading: true,
            error: null,

            setUser: async (user) => {
                try {
                    if (user?.uid) {
                        await updateUser(user.uid, {
                            ...user,
                            updatedAt: new Date(),
                        });
                    }
                    set({ user });
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
                    set({ error: errorMessage, user: null });
                    console.error("Error actualizando perfil:", error);
                    toast.error("Error al actualizar perfil");
                }
            },

            updateSocialLinks: async (socialLinks) => {
                const { user } = get();
                if (!user?.uid) {
                    toast.error("Usuario no autenticado");
                    return;
                }

                try {
                    const updatedLinks = {
                        ...(user.socialLinks || {}),
                        ...socialLinks,
                    };

                    await updateSocialLinks(user.uid, updatedLinks);

                    set({
                        user: {
                            ...user,
                            socialLinks: updatedLinks,
                            updatedAt: new Date(),
                        },
                    });
                    toast.success("Enlaces actualizados");
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : "Error al actualizar";
                    set({ error: errorMessage });
                    console.error("Error en links sociales:", error);
                    toast.error("Error al actualizar enlaces");
                }
            },

            incrementUserStat: async (stat, value = 1) => {
                const { user } = get();
                if (!user?.uid) {
                    toast.error("Usuario no autenticado");
                    return;
                }

                try {
                    await incrementUserStat(user.uid, stat, value);
                    const stats = user.stats || { likes: [], viewsCount: 0 };

                    set({
                        user: {
                            ...user,
                            stats: {
                                ...(stats || {}),
                                [stat]: (user.stats?.[stat] || 0) + value,
                            },
                        },
                    });
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : "Error al incrementar";
                    set({ error: errorMessage });
                    console.error(`Error en ${stat}:`, error);
                    toast.error(`Error al actualizar ${stat}`);
                }
            },

            setAuthenticated: (status) => set({ isAuthenticated: status }),
            setLoading: (status) => set({ isLoading: status }),
            setError: (error) => set({ error }),
            logout: () => {
                set({ user: null, isAuthenticated: false, error: null });
                logout();
                toast.success("Sesión cerrada");
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
                user: state.user,
            }),
        }
    )
);
