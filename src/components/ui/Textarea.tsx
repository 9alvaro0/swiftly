// src/components/ui/Textarea.tsx
"use client";

import React, { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    id: string;
}

const Textarea = ({ label, error, id, className = "", ...props }: TextareaProps) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-primary font-medium mb-2"
            >
                {label}
            </label>
            <textarea
                id={id}
                className={`w-full p-2 border bg-white rounded-md focus:ring-2 focus:ring-primary focus:outline-none 
        ${error ? "border-error" : "border-neutral-300"} ${className}`}
                {...props}
            />
            {error && <p className="text-error text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Textarea;
