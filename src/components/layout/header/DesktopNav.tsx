// src/components/layout/header/DesktopNav.tsx

import type { User } from "@/types/User";
import NavLinks from "./NavLinks";

interface DesktopNavProps {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
}

export default function DesktopNav({ isAuthenticated, user, isLoading }: DesktopNavProps) {
    return (
        <div className="hidden md:block">
            <NavLinks
                isAuthenticated={isAuthenticated}
                user={user}
                isLoading={isLoading}
            />
        </div>
    );
}
