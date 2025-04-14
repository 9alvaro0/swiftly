// src/components/layout/header/NavItem.tsx

import Link from "next/link";

interface NavItemProps {
    name: string;
    path: string;
    isActive: boolean;
    onClick?: () => void;
    isMobile?: boolean;
}

export default function NavItem({ name, path, isActive, onClick, isMobile = false }: NavItemProps) {
    return (
        <li>
            <Link
                href={path}
                className={`
          ${isMobile ? "block text-lg" : "relative"} 
          font-medium transition-colors 
          ${isActive ? "text-primary" : "text-secondary hover:text-primary/80"}
        `}
                onClick={onClick}
            >
                {name}
                {isActive && !isMobile && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
            </Link>
        </li>
    );
}
