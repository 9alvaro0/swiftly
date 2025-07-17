import { Award, Tag, Users } from "lucide-react";
import { PostStats } from "@/types/PostStats";
import { AdminCard, AdminCardBody } from "@/components/ui/AdminCard";

interface StatsCategoriesSectionProps {
    stats: PostStats;
}

export default function StatsCategoriesSection({ stats }: StatsCategoriesSectionProps) {
    // Tarjetas de categorización
    const categorizationCards = [
        {
            id: "levels",
            title: "Por Nivel",
            icon: <Award className="h-6 w-6 text-purple-500" />,
            color: "purple",
            content: (
                <div className="flex flex-wrap gap-2 mt-3">
                    {Object.entries(stats.postsByLevel).map(
                        ([level, count]) =>
                            count > 0 && (
                                <span
                                    key={level}
                                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-900/30 text-purple-400"
                                >
                                    {level}: {count}
                                </span>
                            )
                    )}
                </div>
            ),
        },
        {
            id: "tags",
            title: "Tags Populares",
            icon: <Tag className="h-6 w-6 text-rose-500" />,
            color: "rose",
            content: (
                <div className="flex flex-wrap gap-2 mt-3">
                    {stats.topTags &&
                        stats.topTags.slice(0, 5).map(({ tag, count }) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-rose-900/30 text-rose-400"
                            >
                                {tag}: {count}
                            </span>
                        ))}
                </div>
            ),
        },
        {
            id: "authors",
            title: "Autor Principal",
            icon: <Users className="h-6 w-6 text-cyan-500" />,
            color: "cyan",
            content: stats.topAuthor ? (
                <div className="mt-3">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-cyan-900/30 flex items-center justify-center text-cyan-400 font-medium text-sm">
                                {stats.topAuthor.name.charAt(0)}
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white">
                                {stats.topAuthor.name}
                            </p>
                            <p className="text-sm text-gray-400">
                                {stats.topAuthor.postCount} posts
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-3 text-sm text-gray-400">No hay suficientes datos</div>
            ),
        },
    ];

    return (
        <div>
            <h3 className="text-lg font-medium text-white mb-4">Categorización</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {categorizationCards.map((card) => (
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
                            {card.content}
                        </AdminCardBody>
                    </AdminCard>
                ))}
            </div>
        </div>
    );
}
