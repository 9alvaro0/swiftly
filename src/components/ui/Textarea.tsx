"use client";

import React, { TextareaHTMLAttributes, ReactNode } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    ref?: React.Ref<HTMLTextAreaElement>;
    id: string;
    icon?: ReactNode;
    onIconClick?: () => void;
    height?: number; // Nueva prop opcional
}

const Textarea = ({
    label,
    ref,
    error,
    id,
    icon,
    height = 128, // Valor por defecto: 128px (igual que h-32)
    className = "",
    onIconClick,
    ...props
}: TextareaProps) => {
    return (
        <div>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-white font-medium mb-2 tracking-wide"
                >
                    {label}
                </label>
            )}

            <div className="relative">
                <textarea
                    ref={ref}
                    id={id}
                    style={{ height }} // Usamos height dinámico
                    className={`w-full px-4 py-2 rounded-lg bg-white/5 
                        border ${error ? "border-red-500" : "border-white/10"} 
                        text-white placeholder-white/40
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400
                        transition-all duration-300 ease-in-out
                        backdrop-blur-md
                        resize-none
                        ${icon ? "pl-10" : ""}
                        ${className}
                    `}
                    {...props}
                />

                {icon && (
                    <div className="absolute top-3 left-3 flex items-start">
                        <button
                            type="button"
                            onClick={onIconClick}
                            className={`text-white/40 ${
                                onIconClick ? "hover:text-white" : ""
                            } transition-colors focus:outline-none`}
                        >
                            {icon}
                        </button>
                    </div>
                )}
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Textarea;
