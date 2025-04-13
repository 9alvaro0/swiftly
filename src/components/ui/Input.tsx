// src/components/ui/Input.tsx
"use client";

import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    id: string;
}

const Input = ({ label, error, id, className = "", ...props }: InputProps) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-primary font-medium mb-2"
            >
                {label}
            </label>
            <input
                id={id}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none 
        ${error ? "border-error" : "border-neutral-300"} ${className}`}
                {...props}
            />
            {error && <p className="text-error text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Input;
