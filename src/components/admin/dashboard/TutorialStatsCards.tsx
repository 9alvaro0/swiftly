"use client";

import Link from "next/link";
import Card, { CardBody, CardTitle } from "@/components/ui/Card";
import { BarChartIcon, FileTextIcon, FilePenLineIcon } from "@/components/icons";
import { useTutorials } from "@/hooks/usePosts";

export default function () {
    const { stats, isLoading } = useTutorials();

    if (isLoading) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card
                hover
                className="border-l-4 border-l-primary"
            >
                <CardBody className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                        <BarChartIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-primary mb-1">Total de Tutoriales</CardTitle>
                        <p className="text-3xl font-bold text-primary">{stats.totalTutorials}</p>
                        <Link
                            href="/admin/tutorials"
                            className="text-primary text-sm hover:underline block mt-2"
                        >
                            Ver todos →
                        </Link>
                    </div>
                </CardBody>
            </Card>

            <Card
                hover
                className="border-l-4 border-l-secondary"
            >
                <CardBody className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-secondary/10">
                        <FileTextIcon className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-secondary mb-1">
                            Tutoriales Publicados
                        </CardTitle>
                        <p className="text-3xl font-bold text-primary">{stats.publishedTutorials}</p>
                        <Link
                            href={{ pathname: "/admin/tutorials", query: { status: "published" } }}
                            className="text-secondary text-sm hover:underline block mt-2"
                        >
                            Ver publicados →
                        </Link>
                    </div>
                </CardBody>
            </Card>

            <Card
                hover
                className="border-l-4 border-l-warning"
            >
                <CardBody className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-warning/10">
                        <FilePenLineIcon className="h-6 w-6 text-warning" />
                    </div>
                    <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-warning mb-1">Borradores</CardTitle>
                        <p className="text-3xl font-bold text-primary">{stats.draftTutorials}</p>
                        <Link
                            href={{ pathname: "/admin/tutorials", query: { status: "draft" } }}
                            className="text-warning text-sm hover:underline block mt-2"
                        >
                            Ver borradores →
                        </Link>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
