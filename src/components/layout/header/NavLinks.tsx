// src/components/layout/header/NavLinks.tsx

import { usePathname } from "next/navigation";
import NavItem from "./NavItem";

export const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Tutoriales", path: "/tutorials" },
    { name: "Recursos", path: "/recursos" },
    { name: "Blog", path: "/blog" },
];

interface NavLinksProps {
    isMobile?: boolean;
    onItemClick?: () => void;
}

export default function NavLinks({ isMobile = false, onItemClick }: NavLinksProps) {
    const pathname = usePathname();

    return (
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
        </ul>
    );
}
