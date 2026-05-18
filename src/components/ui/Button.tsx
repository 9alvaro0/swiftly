// src/components/ui/Button.tsx

"use client";

import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { getButtonStyles } from "./buttonStyles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    children: ReactNode;
    fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = "primary",
    size = "md",
    children,
    fullWidth = false,
    className = "",
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            className={getButtonStyles(variant, size, fullWidth, className)}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";

export default Button;
