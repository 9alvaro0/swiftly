// src/app/admin/page.tsx

import PostStatsCardsSkeleton from "@/components/admin/dashboard/skeletons/PostStatsCardsSkeleton";
import PostStatsCards from "@/components/admin/dashboard/PostStatsCards";
import { Suspense } from "react";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8 p-6">
            <Suspense fallback={<PostStatsCardsSkeleton />}>
                <PostStatsCards />
            </Suspense>
        </div>
    );
}
