// src/components/theme/ThemeInitializer.tsx

"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";

interface ThemeInitializerProps {
    children: React.ReactNode;
}

export default function ThemeInitializer({ children }: ThemeInitializerProps) {
    const initializeTheme = useThemeStore((state) => state.initializeTheme);

    useEffect(() => {
        const cleanup = initializeTheme();
        return cleanup;
    }, [initializeTheme]);

    return <>{children}</>;
}