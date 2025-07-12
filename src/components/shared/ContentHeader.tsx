// src/components/shared/ContentHeader.tsx

import { ReactNode } from "react";

interface ContentHeaderProps {
    title: string;
    description: string;
    icon?: ReactNode;
    stats?: {
        label: string;
        value: string | number;
    }[];
    badge?: {
        text: string;
        variant?: "primary" | "secondary" | "accent";
    };
}

export default function ContentHeader({
    title,
    description,
    icon,
    stats,
    badge
}: ContentHeaderProps) {
    const badgeVariants = {
        primary: "bg-blue-500/20 text-blue-300 border-blue-400/30",
        secondary: "bg-purple-500/20 text-purple-300 border-purple-400/30",
        accent: "bg-green-500/20 text-green-300 border-green-400/30"
    };

    return (
        <div className="py-6 md:py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Contenido principal */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        {icon && (
                            <div className="p-2 bg-white/10 rounded-lg">
                                {icon}
                            </div>
                        )}
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl md:text-3xl font-bold text-white">
                                {title}
                            </h1>
                            {badge && (
                                <span className={`px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${
                                    badgeVariants[badge.variant || "primary"]
                                }`}>
                                    {badge.text}
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                        {description}
                    </p>
                </div>

                {/* Estadísticas */}
                {stats && stats.length > 0 && (
                    <div className="flex gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl font-bold text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-white/60">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}