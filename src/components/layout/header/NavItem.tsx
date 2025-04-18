// src/components/layout/header/NavItem.tsx

"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface NavItemProps {
    name: string;
    path: string;
    isActive: boolean;
    onClick?: () => void;
    isMobile?: boolean;
    className?: string;
    icon?: ReactNode;
}

export default function NavItem({ 
    name, 
    path, 
    isActive, 
    onClick, 
    isMobile = false, 
    className = "",
    icon
}: NavItemProps) {
    return (
        <li>
            <Link
                href={path}
                className={`
                    ${isMobile ? "block w-full py-3 px-4" : "relative px-3 py-2"} 
                    font-medium transition-all duration-300
                    ${isActive ? "text-white bg-white/10 backdrop-blur-sm" : "text-white/70 hover:text-white"}
                    ${isMobile ? (isActive ? "border-l-4 border-blue-500" : "") : "rounded-lg hover:bg-white/5"}
                    ${className}
                    ${icon ? "flex items-center gap-1" : ""}
                `}
                onClick={onClick}
            >
                {icon && <span className="flex items-center">{icon}</span>}
                <span>{name}</span>
                {isActive && !isMobile && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-blue-500 rounded-full" />
                )}
            </Link>
        </li>
    );
}
