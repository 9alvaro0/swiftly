// src/components/layout/header/MobileNav.tsx

"use client";

import { Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";
import type { User } from "@/types/User";

interface MobileNavProps {
    isOpen: boolean;
    onToggle: () => void;
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
}

export default function MobileNav({ isOpen, onToggle, isAuthenticated, user, isLoading }: MobileNavProps) {
    return (
        <div className="md:hidden">
            {/* Overlay para cerrar el menú */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
                    onClick={onToggle}
                />
            )}

            {/* Menú desplegable con fondo sólido */}
            <div
                className={`absolute top-full left-0 right-0 bg-black/95 border-b border-white/10 shadow-2xl transform transition-all duration-300 ease-out ${
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
                }`}
                style={{ zIndex: 35 }}
            >
                <nav className="container mx-auto px-4 py-8">
                    <NavLinks
                        isMobile={true}
                        onItemClick={onToggle}
                        isAuthenticated={isAuthenticated}
                        user={user}
                        isLoading={isLoading}
                    />
                </nav>
            </div>

            {/* Botón siempre visible encima del menú */}
            <button
                className="relative p-2 text-white hover:bg-white/5 rounded-lg transition-all duration-300 z-50"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
                {isOpen ? (
                    <X
                        size={24}
                        className="transition-transform duration-300 rotate-0"
                    />
                ) : (
                    <Menu
                        size={24}
                        className="transition-transform duration-300 rotate-0"
                    />
                )}
            </button>
        </div>
    );
}
