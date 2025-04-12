// src/components/ui/Card.tsx
"use client";

import React, { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
    return (
        <div className={`bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = "" }: CardProps) => {
    return <div className={`px-6 py-4 border-b border-neutral-200 ${className}`}>{children}</div>;
};

export const CardBody = ({ children, className = "" }: CardProps) => {
    return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = "" }: CardProps) => {
    return <div className={`px-6 py-4 bg-surface border-t border-neutral-200 ${className}`}>{children}</div>;
};

export default Card;
