"use client";

import type { ReactNode, HTMLAttributes } from "react";

// Base props interface
interface BaseCardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

// Card specific props
interface CardProps extends BaseCardProps {
    hover?: boolean;
    variant?: "default" | "featured" | "glass";
}

const Card = ({ children, className = "", hover = false, variant = "default", ...props }: CardProps) => {
    const glassStyles =
        variant === "glass"
            ? `
    bg-white/5 
    backdrop-blur-sm 
    border border-white/10
  `
            : `
    bg-card 
    border border-neutral-200 
    dark:border-neutral-700 
  `;

    const hoverStyles = hover
        ? `
    hover:shadow-lg 
    hover:shadow-blue-500/10 
    hover:translate-y-[-2px] 
    hover:border-blue-400/30
  `
        : "";

    const featuredStyles = variant === "featured" ? "md:col-span-2 lg:col-span-3" : "";

    return (
        <div
            className={`
        rounded-xl 
        overflow-hidden 
        shadow-apple-md 
        transition-all 
        duration-200 
        ${glassStyles}
        ${hoverStyles}
        ${featuredStyles}
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};


export const CardBody = ({ children, className = "", ...props }: BaseCardProps) => {
    return (
        <div
            className={`
        px-6 
        py-5 
        text-primary 
        dark:text-white/90
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};




export default Card;
