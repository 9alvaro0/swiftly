"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Tutorial } from "@/types/Tutorial";
import Card, { CardHeader, CardBody, CardTitle } from "@/components/ui/Card";
import { BarChartIcon, FileTextIcon, FilePenLineIcon } from "@/components/icons";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalTutorials: 0,
        publishedTutorials: 0,
        draftTutorials: 0,
    });

    useEffect(() => {
        // Cargar datos desde localStorage
        const storedTutorials = localStorage.getItem("tutorials");
        if (storedTutorials) {
            const tutorials: Tutorial[] = JSON.parse(storedTutorials);
            setStats({
                totalTutorials: tutorials.length,
                publishedTutorials: tutorials.filter((t) => t.isPublished).length,
                draftTutorials: tutorials.filter((t) => !t.isPublished).length,
            });
        }
    }, []);

    return (
        <div className="p-6 md:p-8 bg-background">
            <h1 className="text-2xl font-bold mb-6 text-primary">Dashboard</h1>

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
                            <CardTitle className="text-lg font-semibold text-primary mb-1">
                                Total de Tutoriales
                            </CardTitle>
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
                                href="/admin/tutorials"
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
                                href="/admin/tutorials"
                                className="text-warning text-sm hover:underline block mt-2"
                            >
                                Ver borradores →
                            </Link>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Acciones rápidas</CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/admin/tutorials/new"
                            className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors duration-200"
                        >
                            Crear nuevo tutorial
                        </Link>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
