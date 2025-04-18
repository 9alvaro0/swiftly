// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/User";
import * as UserService from "@/firebase/firestore/user";
import { toast } from "sonner";
import { logout } from "@/firebase/auth/auth";

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    error: string | null;

    // Acciones de autenticación
    setUser: (user: User | null) => void;
    updateSocialLinks: (socialLinks: Partial<User["socialLinks"]>) => Promise<void>;
    incrementUserStat: (stat: keyof User["stats"], value?: number) => Promise<void>;

    // Acciones de sesión
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
                if (user) {
                    try {
                        if (user.uid) {
                            await UserService.updateUser(user.uid, {
                                ...user,
                                updatedAt: new Date(),
                            });
                        }
                        set({ user });
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
                        set({
                            error: errorMessage,
                            user: null,
                        });
                        console.error("Error actualizando perfil de usuario:", error);
                        toast.error("No se pudo actualizar el perfil");
                    }
                } else {
                    set({ user: null });
                }
            },

            // Actualización de enlaces sociales
            updateSocialLinks: async (socialLinks) => {
                const currentUser = get().user;
                if (!currentUser) {
                    toast.error("No hay usuario autenticado");
                    return;
                }

                if (!socialLinks) {
                    toast.error("No hay enlaces sociales para actualizar");
                    return;
                }

                try {
                    // Actualizar en Firestore
                    await UserService.updateSocialLinks(currentUser.uid, socialLinks);

                    // Actualizar en el store
                    set((state) => ({
                        user: state.user
                            ? {
                                  ...state.user,
                                  socialLinks: {
                                      ...state.user.socialLinks,
                                      ...socialLinks,
                                  },
                                  updatedAt: new Date(),
                              }
                            : null,
                    }));

                    toast.success("Links sociales actualizados");
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
                    set({ error: errorMessage });
                    console.error("Error actualizando links sociales:", error);
                    toast.error("No se pudieron actualizar los links sociales");
                }
            },

            // Incrementar estadística
            incrementUserStat: async (stat, value = 1) => {
                const currentUser = get().user;
                if (!currentUser) {
                    toast.error("No hay usuario autenticado");
                    return;
                }

                try {
                    // Incrementar en Firestore
                    await UserService.incrementUserStat(currentUser.uid, stat, value);

                    // Actualizar en el store
                    set((state) => ({
                        user: state.user
                            ? {
                                  ...state.user,
                                  stats: {
                                      ...state.user.stats,
                                      likesCount: state.user.stats?.likesCount || 0,
                                      viewsCount: state.user.stats?.viewsCount || 0,
                                      [stat]: (state.user.stats?.[stat] || 0) + value,
                                  },
                              }
                            : null,
                    }));
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
                    set({ error: errorMessage });
                    console.error(`Error incrementando ${stat}:`, error);
                    toast.error(`No se pudo incrementar ${stat}`);
                }
            },

            // Acciones de sesión
            setAuthenticated: (status) => set({ isAuthenticated: status }),
            setLoading: (status) => set({ isLoading: status }),
            setError: (error) => set({ error }),
            logout: () => {
                set({ user: null, isAuthenticated: false, error: null });
                logout();
                toast.success("Sesión cerrada correctamente");
            },
        }),
        {
            name: "auth-storage",
        }
    )
);
