import React from "react";
import {Heart, Eye } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function UserStatsSection() {
    const { user } = useAuthStore();
    const stats = user?.stats;

    const StatItem = ({ icon: Icon, value, label }: { icon: React.ElementType; value: number; label: string }) => (
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
                <Icon
                    className="mr-3 text-gray-500"
                    size={20}
                />
                <span>{label}</span>
            </div>
            <span className="font-semibold">{value}</span>
        </div>
    );

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 p-4">
                <h2 className="text-xl font-semibold">Estadísticas</h2>
            </div>
            {stats ? (
                <>
                    <StatItem
                        icon={Heart}
                        value={stats.likes.length}
                        label="Likes"
                    />
                    <StatItem
                        icon={Eye}
                        value={stats.viewsCount}
                        label="Vistas"
                    />
                </>
            ) : (
                <div className="p-4 text-center text-gray-500">No hay estadísticas disponibles</div>
            )}
        </div>
    );
}
