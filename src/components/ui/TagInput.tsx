// src/components/ui/TagInput.tsx
"use client";

import React, { useState } from "react";
import Button from "./Button";

interface TagInputProps {
    label: string;
    tags: string[];
    onAddTag: (tag: string) => void;
    onRemoveTag: (tag: string) => void;
    id: string;
}

const TagInput = ({ label, tags, onAddTag, onRemoveTag, id }: TagInputProps) => {
    const [currentTag, setCurrentTag] = useState("");

    const handleAddTag = () => {
        if (currentTag.trim()) {
            onAddTag(currentTag.trim());
            setCurrentTag("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTag();
        }
    };

    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-primary font-medium mb-2"
            >
                {label}
            </label>
            <div className="flex">
                <input
                    type="text"
                    id={id}
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full p-2 border border-neutral-300 rounded-l-md focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="Añadir etiqueta"
                />
                <Button
                    variant="primary"
                    type="button"
                    onClick={handleAddTag}
                    className="rounded-l-none"
                >
                    Añadir
                </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-surface px-2 py-1 rounded-md text-sm flex items-center border border-neutral-200"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => onRemoveTag(tag)}
                            className="ml-2 text-neutral-400 hover:text-error transition-colors"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagInput;
