"use client";

import { useEffect, useState } from "react";
import SplashWelcome from "../ui/SplashWelcome";
import useSplashStore from "@/store/splashStore";

export default function SplashWelcomeManager() {
    const { hasSeenWelcomeSplash, setHasSeenWelcomeSplash } = useSplashStore();
    const [showSplash, setShowSplash] = useState(false);

    useEffect(() => {
        // Solo mostramos el splash si el usuario no lo ha visto antes
        // y esperamos un poco para que la página se cargue primero
        if (!hasSeenWelcomeSplash) {
            const timer = setTimeout(() => {
                setShowSplash(true);
            }, 1500); // Mostramos después de 1.5 segundos para dar tiempo a cargar la página
            
            return () => clearTimeout(timer);
        }
    }, [hasSeenWelcomeSplash]);

    const handleCloseSplash = () => {
        setShowSplash(false);
        setHasSeenWelcomeSplash(true);
    };

    return (
        <SplashWelcome 
            isOpen={showSplash} 
            onClose={handleCloseSplash} 
        />
    );
}
