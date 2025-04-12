"use client";

import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

const Card = ({ children, className = "", hover = false }: CardProps) => {
    return (
        <div
            className={`
        rounded-apple-md 
        shadow-apple-md 
        border border-neutral-200 
        dark:border-neutral-700 
        bg-card 
        overflow-hidden 
        transition-all 
        duration-200 
        ${hover ? "hover:shadow-apple-lg hover:translate-y-[-2px]" : ""} 
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = "" }: CardProps) => {
    return (
        <div
            className={`
        px-5 
        py-3.5 
        border-b 
        border-neutral-200 
        dark:border-neutral-700 
        text-primary 
        font-medium 
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export const CardBody = ({ children, className = "" }: CardProps) => {
    return (
        <div
            className={`
        px-5 
        py-4 
        text-primary 
        dark:text-primary 
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export const CardFooter = ({ children, className = "" }: CardProps) => {
    return (
        <div
            className={`
        px-5 
        py-3 
        bg-surface 
        dark:bg-neutral-800 
        border-t 
        border-neutral-200 
        dark:border-neutral-700 
        text-secondary 
        ${className}
      `}
        >
            {children}
        </div>
    );
};

// Additional card components for more flexibility

export const CardTitle = ({ children, className = "" }: CardProps) => {
    return (
        <h3
            className={`
        text-lg 
        font-semibold 
        text-primary 
        dark:text-primary 
        ${className}
      `}
        >
            {children}
        </h3>
    );
};

export const CardDescription = ({ children, className = "" }: CardProps) => {
    return (
        <p
            className={`
        text-sm 
        text-secondary 
        dark:text-secondary 
        mt-1 
        ${className}
      `}
        >
            {children}
        </p>
    );
};

export const CardContent = ({ children, className = "" }: CardProps) => {
    return (
        <div
            className={`
        text-primary 
        dark:text-primary 
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default Card;
