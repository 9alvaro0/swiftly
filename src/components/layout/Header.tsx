// src/components/layout/Header.tsx

"use client";

import React, { useState, useEffect } from "react";
import Logo from "./header/Logo";
import DesktopNav from "./header/DesktopNav";
import MobileNav from "./header/MobileNav";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { isAuthenticated, user, isLoading } = useAuthStore();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Manejar el toggle del menú móvil
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Prevenir scroll del body cuando el menú móvil está abierto
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup al desmontar
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <header
            className={`sticky top-0 z-40 transition-all duration-300 ${
                scrolled || isMenuOpen
                    ? "bg-black/95 shadow-lg shadow-blue-900/10 backdrop-blur-md py-3"
                    : "bg-transparent backdrop-blur-sm py-4"
            }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Logo />
                <DesktopNav
                    isAuthenticated={isAuthenticated}
                    user={user}
                    isLoading={isLoading}
                />
                <MobileNav
                    isOpen={isMenuOpen}
                    onToggle={toggleMenu}
                    isAuthenticated={isAuthenticated}
                    user={user}
                    isLoading={isLoading}
                />
            </div>
        </header>
    );
}
