import Card, { CardBody, CardTitle } from "@/components/ui/Card";
import { Award, Tag, Users } from "lucide-react";
import { PostStats } from "@/types/PostStats";

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
                                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
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
                                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300"
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
                            <div className="h-8 w-8 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-700 dark:text-cyan-300 font-medium text-sm">
                                {stats.topAuthor.name.charAt(0)}
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {stats.topAuthor.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {stats.topAuthor.postCount} posts
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">No hay suficientes datos</div>
            ),
        },
    ];

    return (
        <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Categorización</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categorizationCards.map((card) => (
                    <Card
                        key={card.id}
                        className="overflow-hidden"
                    >
                        <CardBody>
                            <div className="flex items-center">
                                <div
                                    className={`p-2 rounded-lg bg-${card.color}-100 dark:bg-${card.color}-900/30 mr-3`}
                                >
                                    {card.icon}
                                </div>
                                <CardTitle className="text-base font-medium text-gray-800 dark:text-gray-200">
                                    {card.title}
                                </CardTitle>
                            </div>
                            {card.content}
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}
