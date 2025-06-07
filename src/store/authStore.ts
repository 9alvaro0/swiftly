// src/store/authStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/User";
import { toast } from "sonner";
import { logout as firebaseLogout } from "@/services/firebase/auth/auth";

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    error: string | null;
    setUser: (user: User | null) => void;
    setAuthenticated: (status: boolean) => void;
    setLoading: (status: boolean) => void;
    setError: (error: string | null) => void;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            isLoading: true,
            error: null,

            setUser: (user) => {
                set({ user });
            },
            setAuthenticated: (status) => set({ isAuthenticated: status }),
            setLoading: (status) => set({ isLoading: status }),
            setError: (error) => set({ error }),
            logout: async () => {
                try {
                    set({ user: null, isAuthenticated: false, error: null });
                    await firebaseLogout();
                    toast.success("Sesión cerrada");
                } catch (error) {
                    console.error("Error during logout:", error);
                    toast.error("Error al cerrar sesión");
                }
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
