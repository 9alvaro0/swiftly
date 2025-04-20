// src/app/admin/page.tsx

"use client";

import StatsCardsSkeleton from "@/components/admin/dashboard/skeletons/StatsCardsSkeleton";
import StatsCategoriesSection from "@/components/admin/dashboard/stats/StatsCategoriesSection";
import StatsEngagementSection from "@/components/admin/dashboard/stats/StatsEngagementSection";
import StatsGeneralSection from "@/components/admin/dashboard/stats/StatsGeneralSection";
import { usePosts } from "@/hooks/usePosts";

export default function AdminDashboardPage() {
    const { stats, isLoading } = usePosts();

    // Si está cargando, mostrar skeleton
    if (isLoading) {
        return <StatsCardsSkeleton />;
    }

    return (
        <div className="space-y-8 p-6">
            {/* Sección de estadísticas generales */}
            <StatsGeneralSection stats={stats} />

            {/* Sección de métricas de engagement */}
            <StatsEngagementSection stats={stats} />

            {/* Sección de categorización */}
            <StatsCategoriesSection stats={stats} />
        </div>
    );
}
