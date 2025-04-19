// src/components/layout/header/MobileNav.tsx

"use client";

import { usePathname } from "next/navigation";
import NavItem from "./NavItem";
import type { User } from "@/types/User";

// Common navigation items for all users
export const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Publicaciones", path: "/posts" },
    { name: "Tutoriales", path: "/tutorials" },
    { name: "Contacto", path: "/contact" },
];

interface NavLinksProps {
    isMobile?: boolean;
    onItemClick?: () => void;
    isAuthenticated?: boolean;
    user?: User | null;
    isLoading?: boolean;
}

export default function NavLinks({
    isMobile = false,
    onItemClick = () => {},
    isAuthenticated = false,
    user = null,
    isLoading = false,
}: NavLinksProps) {
    const pathname = usePathname();

    if (isLoading) {
        return (
            <ul className={isMobile ? "space-y-5" : "flex space-x-6"}>
                {[1, 2, 3].map((i) => (
                    <li
                        key={i}
                        className="h-6 w-24 bg-gray-700/30 animate-pulse rounded"
                    ></li>
                ))}
            </ul>
        );
    }

    return (
        <>
            <ul className={isMobile ? "space-y-5" : "flex space-x-6"}>
                {navItems.map((item) => (
                    <NavItem
                        key={item.path}
                        name={item.name}
                        path={item.path}
                        isActive={pathname === item.path}
                        onClick={onItemClick}
                        isMobile={isMobile}
                    />
                ))}

                {/* User-specific items */}
                {user?.role === "admin" && (
                    <NavItem
                        name="Administración"
                        path="/admin"
                        isActive={pathname === "/admin"}
                        onClick={onItemClick}
                        isMobile={isMobile}
                    />
                )}

                {/* Authentication-specific items */}
                {isAuthenticated ? (
                    <NavItem
                        name="Perfil"
                        path="/profile"
                        isActive={pathname === "/profile"}
                        onClick={onItemClick}
                        isMobile={isMobile}
                    />
                ) : (
                    <>
                        <NavItem
                            name="Iniciar Sesión"
                            path="/login"
                            isActive={pathname === "/login"}
                            onClick={onItemClick}
                            isMobile={isMobile}
                            className={isMobile ? "" : "bg-blue-600 hover:bg-blue-700 text-white hover:text-white"}
                        />
                    </>
                )}
            </ul>
        </>
    );
}
