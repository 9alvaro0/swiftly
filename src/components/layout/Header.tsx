// src/components/layout/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Logo from "./header/Logo";
import DesktopNav from "./header/DesktopNav";
import MobileNav from "./header/MobileNav";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Detectar scroll para cambiar la apariencia del header
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

    return (
        <header
            className={`sticky top-0 z-40 transition-all duration-300 ${
                scrolled
                    ? "bg-black/50 shadow-lg shadow-blue-900/10 backdrop-blur-md py-3"
                    : "bg-transparent backdrop-blur-sm py-4"
            }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Logo />
                <DesktopNav />
                <MobileNav
                    isOpen={isMenuOpen}
                    onToggle={toggleMenu}
                />
            </div>
        </header>
    );
};

export default Header;
