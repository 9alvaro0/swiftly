import { BarChart, FileText, FilePenLine } from "lucide-react";
import { PostStats } from "@/types/PostStats";
import StatsCard from "@/components/ui/StatsCard";

interface StatsGeneralSectionProps {
    stats: PostStats;
}

export default function StatsGeneralSection({ stats }: StatsGeneralSectionProps) {
    // Tarjetas principales
    const mainCards = [
        {
            id: "total",
            title: "Total de Publicaciones",
            value: stats.totalPosts,
            icon: <BarChart className="h-6 w-6 text-blue-400" />,
            variant: "accent" as const,
            link: "/admin/posts",
            linkText: "Ver todos",
            detail: `${stats.postsByType.article || 0} artículos, ${stats.postsByType.tutorial || 0} tutoriales`,
        },
        {
            id: "published",
            title: "Publicadas",
            value: stats.publishedPosts,
            icon: <FileText className="h-6 w-6 text-emerald-400" />,
            variant: "success" as const,
            link: "/admin/posts?status=published",
            linkText: "Ver publicados",
            detail: `${Math.round((stats.publishedPosts / (stats.totalPosts || 1)) * 100)}% del total`,
        },
        {
            id: "drafts",
            title: "Borradores",
            value: stats.draftPosts,
            icon: <FilePenLine className="h-6 w-6 text-amber-400" />,
            variant: "warning" as const,
            link: "/admin/posts?status=draft",
            linkText: "Ver borradores",
            detail: `${Math.round((stats.draftPosts / (stats.totalPosts || 1)) * 100)}% del total`,
        },
    ];

    return (
        <div>
            <h3 className="text-lg font-medium text-white mb-4">Estadísticas Generales</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {mainCards.map((card) => (
                    <StatsCard
                        key={card.id}
                        title={card.title}
                        value={card.value}
                        detail={card.detail}
                        icon={card.icon}
                        variant={card.variant}
                        link={card.link}
                        linkText={card.linkText}
                    />
                ))}
            </div>
        </div>
    );
}
