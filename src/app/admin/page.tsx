// src/app/admin/page.tsx

'use client';

import PerformanceChart from "@/components/admin/dashboard/PerformanceChart";
import UserStats from "@/components/admin/dashboard/UserStats";
import TutorialStatsCards from "@/components/admin/dashboard/TutorialStatsCards";
import Loading from "@/app/admin/loading";
import { useTutorials } from "@/hooks/useTutorials";

export default function AdminDashboardPage() {
    const { isLoading } = useTutorials();

    if (isLoading) return <Loading />;

    return (
        <div className="space-y-8 p-6">
            <TutorialStatsCards />
            <UserStats />
            <PerformanceChart />
        </div>
    );
}
