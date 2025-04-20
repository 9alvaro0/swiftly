import Link from "next/link";
import Card, { CardBody, CardTitle } from "@/components/ui/Card";
import { BarChart, FileText, FilePenLine } from "lucide-react";
import { PostStats } from "@/types/PostStats";

interface StatsGeneralSectionProps {
    stats: PostStats;
}

export default function StatsGeneralSection({ stats }: StatsGeneralSectionProps) {
    // Tarjetas principales
    const mainCards = [
        {
            id: "total",
            title: "Total de Publicaciones",
            count: stats.totalPosts,
            icon: <BarChart className="h-6 w-6 text-primary" />,
            color: "primary",
            link: "/admin/posts",
            linkText: "Ver todos",
            detail: `${stats.postsByType.article || 0} artículos, ${stats.postsByType.tutorial || 0} tutoriales`,
        },
        {
            id: "published",
            title: "Publicadas",
            count: stats.publishedPosts,
            icon: <FileText className="h-6 w-6 text-emerald-500" />,
            color: "emerald",
            link: { pathname: "/admin/posts", query: { status: "published" } },
            linkText: "Ver publicados",
            detail: `${Math.round((stats.publishedPosts / (stats.totalPosts || 1)) * 100)}% del total`,
        },
        {
            id: "drafts",
            title: "Borradores",
            count: stats.draftPosts,
            icon: <FilePenLine className="h-6 w-6 text-amber-500" />,
            color: "amber",
            link: { pathname: "/admin/posts", query: { status: "draft" } },
            linkText: "Ver borradores",
            detail: `${Math.round((stats.draftPosts / (stats.totalPosts || 1)) * 100)}% del total`,
        },
    ];

    return (
        <>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Estadísticas Generales</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mainCards.map((card) => (
                    <Card
                        key={card.id}
                        hover
                        className={`border-l-4 border-l-${card.color}-500 dark:border-l-${card.color}-400`}
                    >
                        <CardBody className="flex items-start gap-4">
                            <div className={`p-3 rounded-full bg-${card.color}-100 dark:bg-${card.color}-900/30`}>
                                {card.icon}
                            </div>
                            <div className="flex-1">
                                <CardTitle
                                    className={`text-lg font-semibold text-${card.color}-600 dark:text-${card.color}-400 mb-1`}
                                >
                                    {card.title}
                                </CardTitle>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{card.count}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{card.detail}</p>
                                <Link
                                    href={card.link}
                                    className={`text-${card.color}-600 dark:text-${card.color}-400 text-sm hover:underline inline-flex items-center mt-2`}
                                    aria-label={`${card.linkText} ${card.title.toLowerCase()}`}
                                >
                                    {card.linkText}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </>
    );
}
