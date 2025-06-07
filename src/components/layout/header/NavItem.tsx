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
    disabled?: boolean;
    comingSoonText?: string;
}

export default function NavItem({
    name,
    path,
    isActive,
    onClick,
    isMobile = false,
    className = "",
    icon,
    disabled = false,
    comingSoonText = "Próximamente",
}: NavItemProps) {
    const baseStyles = `
    ${isMobile ? "block w-full py-3 px-4" : "relative px-3 py-2"}
    font-medium transition-all duration-300
    ${isMobile ? (isActive ? "border-l-4 border-blue-500" : "") : "rounded-lg"}
    ${icon ? "flex items-center gap-1" : ""}
    ${
        disabled
            ? "text-white/40 cursor-not-allowed"
            : isActive
            ? "text-white bg-white/10 backdrop-blur-sm"
            : "text-white/70 hover:text-white hover:bg-white/5"
    }
    ${className}
  `;

    return (
        <li className="relative">
            <Link
                href={disabled ? "#" : path}
                className={baseStyles}
                onClick={(e) => {
                    if (disabled) {
                        e.preventDefault();
                        return;
                    }
                    onClick?.();
                }}
            >
                {icon && <span>{icon}</span>}
                <span>{name}</span>
                {isActive && !isMobile && !disabled && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-blue-500 rounded-full" />
                )}

                {disabled && !isMobile && (
                    <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium rounded bg-yellow-500/20 text-yellow-300">
                        {comingSoonText}
                    </span>
                )}
            </Link>
        </li>
    );
}
