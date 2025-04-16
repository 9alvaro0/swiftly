"use client";

import Link from "next/link";
import Card, { CardBody, CardTitle } from "@/components/ui/Card";
import { BarChart, FileText, FilePenLine } from "lucide-react";
import { usePosts } from "@/hooks/usePosts";

export default function PostStatsCards() {
    const { stats } = usePosts();

    const cards = [
        {
            id: "total",
            title: "Total de Publicaciones",
            count: stats.totalPosts,
            icon: <BarChart className="h-6 w-6 text-primary" />,
            color: "primary",
            link: "/admin/posts",
            linkText: "Ver todos",
        },
        {
            id: "published",
            title: "Publicadas",
            count: stats.publishedPosts,
            icon: <FileText className="h-6 w-6 text-secondary" />,
            color: "secondary",
            link: { pathname: "/admin/posts", query: { status: "published" } },
            linkText: "Ver publicados",
        },
        {
            id: "drafts",
            title: "Borradores",
            count: stats.filteredPosts,
            icon: <FilePenLine className="h-6 w-6 text-warning" />,
            color: "warning",
            link: { pathname: "/admin/posts", query: { status: "draft" } },
            linkText: "Ver borradores",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    hover
                    className={`border-l-4 border-l-${card.color}`}
                >
                    <CardBody className="flex items-start gap-4">
                        <div className={`p-3 rounded-full bg-${card.color}/10`}>{card.icon}</div>
                        <div className="flex-1">
                            <CardTitle className={`text-lg font-semibold text-${card.color} mb-1`}>
                                {card.title}
                            </CardTitle>
                            <p className="text-3xl font-bold text-primary">{card.count}</p>
                            <Link
                                href={card.link}
                                className={`text-${card.color} text-sm hover:underline block mt-2`}
                                aria-label={`${card.linkText} ${card.title.toLowerCase()}`}
                            >
                                {card.linkText} →
                            </Link>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
