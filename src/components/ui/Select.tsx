"use client";

import React, { useState, useRef, useEffect, useId } from "react";
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
    const [internalSelected, setInternalSelected] = useState<SelectOption | null>(
        value ? options.find((option) => option.value === value) || null : null
    );
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const selectRef = useRef<HTMLDivElement>(null);
    const listboxId = useId();

    const selectedOption = value !== undefined
        ? options.find((o) => o.value === value) ?? null
        : internalSelected;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setFocusedIndex(-1);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const openDropdown = () => {
        const currentIndex = selectedOption
            ? options.findIndex((o) => o.value === selectedOption.value)
            : -1;
        setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
        setIsOpen(true);
    };

    const closeDropdown = () => {
        setIsOpen(false);
        setFocusedIndex(-1);
    };

    const handleSelect = (option: SelectOption) => {
        if (value === undefined) setInternalSelected(option);
        closeDropdown();
        onChange({
            target: { name: id, value: option.value },
        } as React.ChangeEvent<HTMLSelectElement>);
    };

    const toggleDropdown = () => {
        if (disabled) return;
        if (isOpen) closeDropdown();
        else openDropdown();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
            case "Enter":
            case " ":
                e.preventDefault();
                if (isOpen && focusedIndex >= 0) {
                    handleSelect(options[focusedIndex]);
                } else {
                    toggleDropdown();
                }
                break;
            case "ArrowDown":
                e.preventDefault();
                if (!isOpen) {
                    openDropdown();
                } else {
                    setFocusedIndex((prev) =>
                        prev < options.length - 1 ? prev + 1 : 0
                    );
                }
                break;
            case "ArrowUp":
                e.preventDefault();
                if (!isOpen) {
                    openDropdown();
                } else {
                    setFocusedIndex((prev) =>
                        prev > 0 ? prev - 1 : options.length - 1
                    );
                }
                break;
            case "Escape":
                e.preventDefault();
                closeDropdown();
                break;
            case "Tab":
                closeDropdown();
                break;
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
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-controls={listboxId}
                    aria-invalid={!!error || undefined}
                    aria-describedby={error ? `${id}-error` : undefined}
                    aria-activedescendant={
                        isOpen && focusedIndex >= 0
                            ? `${listboxId}-option-${focusedIndex}`
                            : undefined
                    }
                    onClick={toggleDropdown}
                    onKeyDown={handleKeyDown}
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
                >
                    <span className={`${!selectedOption ? "text-white/40" : ""}`}>
                        {selectedOption ? selectedOption.label : "Seleccionar..."}
                    </span>
                    <ChevronDown
                        className={`ml-2 h-5 w-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
                    />
                </div>

                {isOpen && (
                    <div
                        id={listboxId}
                        role="listbox"
                        className="absolute z-10 w-full mt-1 bg-neutral-800/90 backdrop-blur-md border border-white/10 rounded-lg max-h-60 overflow-auto"
                    >
                        {options.map((option, index) => (
                            <div
                                key={option.value}
                                id={`${listboxId}-option-${index}`}
                                role="option"
                                aria-selected={selectedOption?.value === option.value}
                                className={`px-4 py-2 cursor-pointer transition-colors
                                    ${
                                        selectedOption?.value === option.value
                                            ? "bg-blue-500/20 text-blue-300"
                                            : "text-white"
                                    }
                                    ${
                                        focusedIndex === index
                                            ? "bg-white/10"
                                            : "hover:bg-white/10"
                                    }
                                `}
                                onClick={() => handleSelect(option)}
                                onMouseEnter={() => setFocusedIndex(index)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {error && <p id={`${id}-error`} role="alert" className="text-red-500 text-sm mt-1">{error}</p>}

            {/* Hidden native select for form submission */}
            <select
                name={id}
                value={selectedOption?.value || ""}
                onChange={() => {}} // Controlled by our custom implementation
                className="sr-only"
                required={required}
                disabled={disabled}
                aria-hidden="true"
                tabIndex={-1}
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
