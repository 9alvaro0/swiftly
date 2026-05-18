// src/components/ui/LinkButton.tsx
"use client";

import Link from "next/link";
import React, { ReactNode } from "react";
import { getButtonStyles } from "./buttonStyles";

interface LinkButtonProps {
    href: string;
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    className?: string;
}

const LinkButton = ({
    href,
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
}: LinkButtonProps) => {
    return (
        <Link
            href={href}
            className={getButtonStyles(variant, size, fullWidth, className)}
        >
            {children}
        </Link>
    );
};

export default LinkButton;
