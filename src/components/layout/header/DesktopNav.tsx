// src/components/layout/header/DesktopNav.tsx

import type { User } from "@/types/User";
import NavLinks from "./NavLinks";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface DesktopNavProps {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
}

export default function DesktopNav({ isAuthenticated, user, isLoading }: DesktopNavProps) {
    return (
        <div className="hidden md:flex items-center space-x-4">
            <NavLinks
                isAuthenticated={isAuthenticated}
                user={user}
                isLoading={isLoading}
            />
            <ThemeToggle />
        </div>
    );
}
