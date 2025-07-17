import Link from "next/link";
import { Eye, Clock, TrendingUp } from "lucide-react";
import { PostStats } from "@/types/PostStats";
import { AdminCard, AdminCardBody } from "@/components/ui/AdminCard";

interface StatsEngagementSectionProps {
    stats: PostStats;
}

export default function StatsEngagementSection({ stats }: StatsEngagementSectionProps) {
    // Tarjetas de métricas de engagement
    const engagementCards = [
        {
            id: "views",
            title: "Total de Vistas",
            count: stats.totalViews.toLocaleString(),
            icon: <Eye className="h-6 w-6 text-blue-500" />,
            color: "blue",
            detail: `${stats.averageViews.toLocaleString()} vistas promedio por post`,
            highlight: stats.mostViewedPost ? (
                <div className="mt-2 text-xs">
                    <span className="block text-gray-500">Post más visto:</span>
                    <Link
                        href={`/posts/${stats.mostViewedPost.slug}`}
                        className="text-blue-400 hover:underline line-clamp-1 font-medium"
                    >
                        {stats.mostViewedPost.title} ({stats.mostViewedPost.views})
                    </Link>
                </div>
            ) : null,
        },
        {
            id: "readTime",
            title: "Tiempo de Lectura",
            count: `${stats.averageReadTime} min`,
            icon: <Clock className="h-6 w-6 text-indigo-500" />,
            color: "indigo",
            detail: `${stats.totalReadTime} minutos de lectura en total`,
            highlight: stats.totalWordCount ? (
                <div className="mt-2 text-xs">
                    <span className="block text-gray-500">Palabras totales:</span>
                    <span className="text-indigo-400 font-medium">
                        {stats.totalWordCount.toLocaleString()} palabras
                    </span>
                </div>
            ) : null,
        },
        {
            id: "growth",
            title: "Crecimiento Mensual",
            count: `${stats.postsGrowthRate > 0 ? "+" : ""}${stats.postsGrowthRate}%`,
            icon: <TrendingUp className="h-6 w-6 text-green-500" />,
            color: "green",
            detail: `${stats.postsThisMonth} este mes vs ${stats.postsLastMonth} el mes anterior`,
            highlight:
                stats.postsGrowthRate > 0 ? (
                    <div className="mt-2 text-xs">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                            Crecimiento positivo
                        </span>
                    </div>
                ) : stats.postsGrowthRate < 0 ? (
                    <div className="mt-2 text-xs">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-400">
                            Crecimiento negativo
                        </span>
                    </div>
                ) : (
                    <div className="mt-2 text-xs">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300">
                            Sin cambios
                        </span>
                    </div>
                ),
        },
    ];

    return (
        <div>
            <h3 className="text-lg font-medium text-white mb-4">Métricas de Engagement</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {engagementCards.map((card) => (
                    <AdminCard
                        key={card.id}
                        hover
                    >
                        <AdminCardBody>
                            <div className="flex items-center mb-3">
                                <div
                                    className={`p-2 rounded-lg bg-${card.color}-900/30 mr-3`}
                                >
                                    {card.icon}
                                </div>
                                <h4 className="text-base font-medium text-white">
                                    {card.title}
                                </h4>
                            </div>
                            <p className={`text-2xl font-bold text-${card.color}-400 mb-2`}>
                                {card.count}
                            </p>
                            <p className="text-sm text-gray-400 mb-3">{card.detail}</p>
                            {card.highlight && (
                                <div className="mt-2">
                                    {card.highlight}
                                </div>
                            )}
                        </AdminCardBody>
                    </AdminCard>
                ))}
            </div>
        </div>
    );
}
