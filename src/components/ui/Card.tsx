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

export const CardHeader = ({ children, className = "", ...props }: BaseCardProps) => {
    return (
        <div
            className={`
        px-5 
        py-3.5 
        border-b 
        border-neutral-200/20
        dark:border-neutral-700/50
        text-primary 
        font-medium 
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

export const CardFooter = ({ children, className = "", ...props }: BaseCardProps) => {
    return (
        <div
            className={`
        px-5 
        py-3 
        bg-surface/60
        dark:bg-neutral-800/60
        backdrop-blur-sm
        border-t 
        border-neutral-200/20
        dark:border-neutral-700/50
        text-secondary 
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

// Additional card components with appropriate HTML elements

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const CardTitle = ({ children, className = "", as: Component = "h3", ...props }: CardTitleProps) => {
    return (
        <Component
            className={`
        font-bold 
        text-lg 
        mb-3
        text-primary 
        dark:text-white 
        group-hover:text-blue-400
        transition-colors
        line-clamp-2
        ${className}
      `}
            {...props}
        >
            {children}
        </Component>
    );
};

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children: ReactNode;
    className?: string;
}

export const CardDescription = ({ children, className = "", ...props }: CardDescriptionProps) => {
    return (
        <p
            className={`
        text-sm 
        text-secondary
        dark:text-white/70
        mt-3
        line-clamp-3
        ${className}
      `}
            {...props}
        >
            {children}
        </p>
    );
};

interface CardContentProps extends BaseCardProps {
    actions?: boolean;
}

export const CardContent = ({ children, className = "", actions = false, ...props }: CardContentProps) => {
    return (
        <div
            className={`
        text-primary 
        dark:text-white/90
        ${actions ? "flex items-center justify-between" : ""}
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

// New component for badges
interface CardBadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    className?: string;
    color?: "blue" | "purple" | "yellow" | "green" | "red" | "default";
}

export const CardBadge = ({ children, className = "", color = "default", ...props }: CardBadgeProps) => {
    const colorStyles = {
        blue: "bg-blue-600/80 text-white",
        purple: "bg-purple-600/80 text-white",
        yellow: "bg-yellow-500/90 text-white",
        green: "bg-green-500/80 text-white",
        red: "bg-red-500/80 text-white",
        default: "bg-white/10 text-white/80 hover:bg-white/15",
    };

    return (
        <span
            className={`
        inline-block
        backdrop-blur-sm
        text-xs
        px-3
        py-1
        rounded-full
        font-medium
        transition-colors
        ${colorStyles[color]}
        ${className}
      `}
            {...props}
        >
            {children}
        </span>
    );
};

export default Card;
