// src/components/ui/Select.tsx
"use client";

import React, { SelectHTMLAttributes } from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: SelectOption[];
    error?: string;
    id: string;
}

const Select = ({ label, options, error, id, className = "", ...props }: SelectProps) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-primary font-medium mb-2"
            >
                {label}
            </label>
            <select
                id={id}
                className={`w-full p-2 border bg-white rounded-md focus:ring-2 focus:ring-primary focus:outline-none 
        ${error ? "border-error" : "border-neutral-300"} ${className}`}
                {...props}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-error text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Select;
