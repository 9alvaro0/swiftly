import TutorialStatsCards from "@/components/admin/dashboard/skeletons/TutorialStatsCardsSkeleton";

export default function Loading() {
    return (
        <div className="space-y-8 p-6">
            <TutorialStatsCards />
            {/* <UserStatsSkeleton />
            <PerformanceChartSkeleton /> */}
        </div>
    );
}
