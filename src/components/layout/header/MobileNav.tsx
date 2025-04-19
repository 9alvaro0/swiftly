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
            <button
                className="p-1 text-primary transition-transform"
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

            {/* Menú desplegable con fondo sólido */}
            <div
                className={`absolute top-full left-0 right-0 bg-background shadow-apple-md transform transition-all duration-300 ${
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
                }`}
                style={{ zIndex: 50 }}
            >
                <nav className="container mx-auto px-4 py-6">
                    <NavLinks
                        isMobile={true}
                        onItemClick={onToggle}
                        isAuthenticated={isAuthenticated}
                        user={user}
                        isLoading={isLoading}
                    />
                </nav>
            </div>
        </div>
    );
}
