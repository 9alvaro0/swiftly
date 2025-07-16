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
        <div className="grid grid-cols-2 gap-8 w-full max-w-sm mx-auto">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="text-center"
                >
                    <p className="text-3xl font-bold text-white">{stat.value.toLocaleString()}</p>
                    <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
            ))}
        </div>
    );
}
