// src/components/posts/ViewToggle.tsx

"use client";

import { FaTh, FaList } from "react-icons/fa";

export type ViewMode = "grid" | "list";

interface ViewToggleProps {
    viewMode: ViewMode;
    onViewChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
    return (
        <div className="flex items-center bg-white/10 rounded-lg p-1">
            <button
                onClick={() => onViewChange("grid")}
                className={`flex items-center justify-center w-8 h-8 rounded transition-colors ${
                    viewMode === "grid"
                        ? "bg-blue-500 text-white"
                        : "text-white/60 hover:text-white/80 hover:bg-white/10"
                }`}
                aria-label="Vista en grid"
            >
                <FaTh size={14} />
            </button>
            <button
                onClick={() => onViewChange("list")}
                className={`flex items-center justify-center w-8 h-8 rounded transition-colors ${
                    viewMode === "list"
                        ? "bg-blue-500 text-white"
                        : "text-white/60 hover:text-white/80 hover:bg-white/10"
                }`}
                aria-label="Vista en lista"
            >
                <FaList size={14} />
            </button>
        </div>
    );
}