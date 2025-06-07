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
    const baseStyles = `
    font-semibold tracking-wide inline-flex items-center justify-center
    transition-all duration-300 ease-in-out focus:outline-none focus:ring-2
    focus:ring-offset-0 focus:ring-blue-500 shadow-md
  `;

    const variantStyles = {
        primary: `
        bg-blue-600 text-white
        hover:bg-blue-700
        hover:shadow-blue-500/40
        shadow-blue-500/20
        `,
        secondary: `
        bg-purple-600 text-white
        hover:bg-purple-700
        hover:shadow-purple-500/40
        shadow-purple-500/20
        `,
        outline: `
        border border-white/20 text-white bg-white/5
        hover:bg-white/10 hover:shadow-white/30
        shadow-white/10
        `,
    };

    const sizeStyles = {
        sm: "px-3 text-sm rounded-md",
        md: "px-5 py-2 text-base rounded-lg",
        lg: "px-6 py-3 text-lg rounded-xl",
    };

    const widthStyle = fullWidth ? "w-full" : "";

    const combinedStyles = `
    ${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}
    backdrop-blur-lg
  `;

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
