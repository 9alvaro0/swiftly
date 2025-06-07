// src/components/profile/ProfileStats.tsx
import React from "react";
import { User } from "@/types/User";

interface ProfileStatsProps {
    user: User | null;
}

export default function ProfileStats({ user }: ProfileStatsProps) {
    if (!user) return null;

    const stats = [
        { label: "Likes", value: user.stats?.likes.length || 0 },
        { label: "Visualizaciones", value: user.stats?.views.length || 0 },
    ];

    return (
        <div className="flex items-center gap-6">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="text-center"
                >
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
            ))}
        </div>
    );
}
