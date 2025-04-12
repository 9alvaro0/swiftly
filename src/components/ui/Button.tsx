// src/components/ui/Button.tsx
"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    children: ReactNode;
    fullWidth?: boolean;
}

const Button = ({
    variant = "primary",
    size = "md",
    children,
    fullWidth = false,
    className = "",
    ...props
}: ButtonProps) => {
    const baseStyles = "font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyles = {
        primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
        secondary: "bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary",
        outline: "bg-white border border-neutral-300 text-secondary hover:bg-neutral-50 focus:ring-primary",
    };

    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm rounded-md",
        md: "px-4 py-2 text-base rounded-md",
        lg: "px-6 py-3 text-lg rounded-md",
    };

    const widthStyle = fullWidth ? "w-full" : "";

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;

    return (
        <button
            className={combinedStyles}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
