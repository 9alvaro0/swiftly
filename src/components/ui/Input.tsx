"use client";

import React, { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    id: string;
    icon?: ReactNode;
    onIconClick?: () => void;
}

const Input = ({ label, error, id, icon, className = "", onIconClick, ...props }: InputProps) => {
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
                <input
                    id={id}
                    className={`w-full px-4 py-2 rounded-lg bg-white/5 
                        border ${error ? "border-red-500" : "border-white/10"} 
                        text-white placeholder-white/40
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400
                        transition-all duration-300 ease-in-out
                        backdrop-blur-md
                        ${icon ? "pl-10" : ""}
                        ${className}
                    `}
                    {...props}
                />

                {icon && (
                    <div className="absolute inset-y-0 left-3 flex items-center">
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

export default Input;
