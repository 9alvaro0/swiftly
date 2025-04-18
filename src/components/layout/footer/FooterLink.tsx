// src/components/layout/footer/FooterLink.tsx

import React from "react";
import Link from "next/link";

interface FooterLinkProps {
    href: string;
    external?: boolean;
    children: React.ReactNode;
}

export default function FooterLink({ href, external = false, children }: FooterLinkProps) {
    const className = "text-secondary hover:text-primary transition-colors flex items-center";

    if (external) {
        return (
            <a
                href={href}
                className={className}
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        );
    }

    return (
        <Link
            href={href}
            className={className}
        >
            {children}
        </Link>
    );
}
