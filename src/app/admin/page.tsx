// src/app/admin/page.tsx

"use client";

import TutorialStatsCards from "@/components/admin/dashboard/TutorialStatsCards";
import Loading from "@/app/admin/loading";
import { usePosts } from "@/hooks/usePosts";

export default function AdminDashboardPage() {
    const { isLoading, stats } = usePosts();

    if (isLoading) return <Loading />;

    return (
        <div className="space-y-8 p-6">
            <TutorialStatsCards stats={stats} />
        </div>
    );
}
