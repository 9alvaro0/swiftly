// src/components/ui/Checkbox.tsx
"use client";

import React, { InputHTMLAttributes } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label: string;
    id: string;
}

const Checkbox = ({ label, id, className = "", ...props }: CheckboxProps) => {
    return (
        <div className="flex items-center mb-4">
            <input
                type="checkbox"
                id={id}
                className={`h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary ${className}`}
                {...props}
            />
            <label
                htmlFor={id}
                className="ml-2 text-secondary"
            >
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
