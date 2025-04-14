// src/components/layout/header/DesktopNav.tsx

import NavLinks from "./NavLinks";

export default function DesktopNav() {
    return (
        <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
        </nav>
    );
}
