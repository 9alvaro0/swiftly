// src/store/splashStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SplashState {
    hasSeenWelcomeSplash: boolean;
    setHasSeenWelcomeSplash: (value: boolean) => void;
}

// Creamos el store con persistencia para recordar la configuración entre sesiones
const useSplashStore = create<SplashState>()(
    persist(
        (set) => ({
            hasSeenWelcomeSplash: false,
            setHasSeenWelcomeSplash: (value) => set({ hasSeenWelcomeSplash: value }),
        }),
        {
            name: "swiftly-splash-storage",
        }
    )
);

export default useSplashStore;
