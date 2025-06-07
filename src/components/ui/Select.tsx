"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
    value: string;
    label: string;
}

interface CustomSelectProps {
    label: string;
    options: SelectOption[];
    error?: string;
    id: string;
    className?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
    required?: boolean;
}

export default function Select({
    label,
    options,
    error,
    id,
    className = "",
    value,
    onChange,
    disabled = false,
    required = false,
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
        value ? options.find((option) => option.value === value) || null : null
    );
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Update selected option when value prop changes
        if (value) {
            const option = options.find((opt) => opt.value === value);
            if (option) setSelectedOption(option);
        }
    }, [value, options]);

    useEffect(() => {
        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (option: SelectOption) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange({
            target: { value: option.value },
        } as React.ChangeEvent<HTMLSelectElement>);
    };

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-white font-medium mb-2 tracking-wide"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div
                ref={selectRef}
                className="relative"
            >
                <div
                    id={id}
                    onClick={toggleDropdown}
                    className={`w-full px-4 py-2 rounded-lg bg-white/5 
                        border ${error ? "border-red-500" : "border-white/10"} 
                        text-white placeholder-white/40
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400
                        transition-all duration-300 ease-in-out
                        backdrop-blur-md
                        flex justify-between items-center cursor-pointer
                        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                        ${className}`}
                    tabIndex={disabled ? -1 : 0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            toggleDropdown();
                        }
                    }}
                >
                    <span className={`${!selectedOption ? "text-white/40" : ""}`}>
                        {selectedOption ? selectedOption.label : "Seleccionar..."}
                    </span>
                    <ChevronDown
                        className={`ml-2 h-5 w-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
                    />
                </div>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-neutral-800/90 backdrop-blur-md border border-white/10 rounded-lg max-h-60 overflow-auto">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={`px-4 py-2 cursor-pointer hover:bg-white/10 transition-colors
                                    ${
                                        selectedOption?.value === option.value
                                            ? "bg-blue-500/20 text-blue-300"
                                            : "text-white"
                                    }
                                `}
                                onClick={() => handleSelect(option)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            {/* Hidden native select for form submission */}
            <select
                name={id}
                value={selectedOption?.value || ""}
                onChange={() => {}} // Controlled by our custom implementation
                className="sr-only"
                required={required}
                disabled={disabled}
                aria-hidden="true"
            >
                <option
                    value=""
                    disabled
                    hidden
                ></option>
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
