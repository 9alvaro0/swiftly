// src/app/admin/page.tsx

"use client";

import PerformanceChart from "@/components/admin/dashboard/PerformanceChart";
import UserStats from "@/components/admin/dashboard/UserStats";
import TutorialStatsCards from "@/components/admin/dashboard/TutorialStatsCards";
import Loading from "@/app/admin/loading";

export default function AdminDashboardPage() {

    if (isLoading) return <Loading />;

    return (
        <div className="space-y-8 p-6">
            <TutorialStatsCards stats={stats} />
            {/* <UserStats />
            <PerformanceChart /> */}
        </div>
    );
}
