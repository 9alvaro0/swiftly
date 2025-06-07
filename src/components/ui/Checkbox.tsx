"use client";

import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    error?: string;
}

const Checkbox = ({ label, id, error, className = "", ...props }: CheckboxProps) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="flex items-center space-x-3 cursor-pointer"
            >
                <input
                    id={id}
                    type="checkbox"
                    className={`
            appearance-none h-5 w-5 border-2 rounded-md border-white/30 bg-white/5
            checked:bg-blue-600 checked:border-blue-600
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
            transition-all duration-200
            relative
            ${className}
          `}
                    {...props}
                />
                <span className="text-white text-sm">{label}</span>
            </label>

            {/* Checkbox checkmark */}
            <style jsx>{`
                input[type="checkbox"]:checked::before {
                    content: "✔";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -55%);
                    font-size: 0.75rem;
                    color: white;
                }
            `}</style>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Checkbox;
