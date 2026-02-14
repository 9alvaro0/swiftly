"use client";

import React, { InputHTMLAttributes, ReactNode, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    id: string;
    icon?: ReactNode;
    onIconClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, id, icon, className = "", onIconClick, ...props }, ref) => {
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
                    ref={ref}
                    id={id}
                    aria-invalid={!!error || undefined}
                    aria-describedby={error ? `${id}-error` : undefined}
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
                        {onIconClick ? (
                            <button
                                type="button"
                                onClick={onIconClick}
                                aria-label={props.type === "password" ? "Mostrar contraseña" : props.type === "text" && id?.includes("password") ? "Ocultar contraseña" : "Icono de entrada"}
                                className="text-white/40 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {icon}
                            </button>
                        ) : (
                            <span className="text-white/40" aria-hidden="true">
                                {icon}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {error && <p id={`${id}-error`} role="alert" className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
});

Input.displayName = "Input";

export default Input;
