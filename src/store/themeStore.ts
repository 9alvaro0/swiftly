// src/store/themeStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface ThemeState {
    theme: Theme;
    systemTheme: "light" | "dark";
    currentTheme: "light" | "dark";
    setTheme: (theme: Theme) => void;
    setSystemTheme: (theme: "light" | "dark") => void;
    toggleTheme: () => void;
    initializeTheme: () => void;
}

const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getCurrentTheme = (theme: Theme, systemTheme: "light" | "dark"): "light" | "dark" => {
    return theme === "system" ? systemTheme : theme;
};

const applyTheme = (theme: "light" | "dark") => {
    if (typeof window === "undefined") return;
    
    const root = window.document.documentElement;
    console.log("Applying theme:", theme);
    console.log("Classes before:", root.className);
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    console.log("Classes after:", root.className);
};

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: "dark",
            systemTheme: "dark",
            currentTheme: "dark",

            setTheme: (theme) => {
                const systemTheme = get().systemTheme;
                const currentTheme = getCurrentTheme(theme, systemTheme);
                
                set({ theme, currentTheme });
                applyTheme(currentTheme);
            },

            setSystemTheme: (systemTheme) => {
                const theme = get().theme;
                const currentTheme = getCurrentTheme(theme, systemTheme);
                
                set({ systemTheme, currentTheme });
                
                if (theme === "system") {
                    applyTheme(currentTheme);
                }
            },

            toggleTheme: () => {
                const { theme } = get();
                if (theme === "system") {
                    // If system, switch to opposite of current system theme
                    const systemTheme = getSystemTheme();
                    const newTheme = systemTheme === "dark" ? "light" : "dark";
                    get().setTheme(newTheme);
                } else {
                    // If manual theme, toggle between light and dark
                    const newTheme = theme === "dark" ? "light" : "dark";
                    get().setTheme(newTheme);
                }
            },

            initializeTheme: () => {
                const systemTheme = getSystemTheme();
                const theme = get().theme;
                const currentTheme = getCurrentTheme(theme, systemTheme);
                
                set({ systemTheme, currentTheme });
                
                // Aplicar el tema inmediatamente
                applyTheme(currentTheme);

                // Listen for system theme changes
                if (typeof window !== "undefined") {
                    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
                    const handleChange = (e: MediaQueryListEvent) => {
                        get().setSystemTheme(e.matches ? "dark" : "light");
                    };
                    
                    mediaQuery.addEventListener("change", handleChange);
                    
                    // Return cleanup function
                    return () => {
                        mediaQuery.removeEventListener("change", handleChange);
                    };
                }
            },
        }),
        {
            name: "theme-storage",
            partialize: (state) => ({
                theme: state.theme,
            }),
        }
    )
);