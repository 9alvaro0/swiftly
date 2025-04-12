// src/app/admin/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Tutorial } from "@/types/Tutorial";

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
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold text-primary mb-2">Total de Tutoriales</h2>
                    <p className="text-3xl font-bold">{stats.totalTutorials}</p>
                    <Link
                        href="/admin/tutorials"
                        className="text-primary text-sm hover:underline block mt-2"
                    >
                        Ver todos →
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold text-green-600 mb-2">Tutoriales Publicados</h2>
                    <p className="text-3xl font-bold">{stats.publishedTutorials}</p>
                    <Link
                        href="/admin/tutorials"
                        className="text-green-600 text-sm hover:underline block mt-2"
                    >
                        Ver publicados →
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold text-orange-500 mb-2">Borradores</h2>
                    <p className="text-3xl font-bold">{stats.draftTutorials}</p>
                    <Link
                        href="/admin/tutorials"
                        className="text-orange-500 text-sm hover:underline block mt-2"
                    >
                        Ver borradores →
                    </Link>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Acciones rápidas</h2>
                <div className="flex flex-wrap gap-4">
                    <Link
                        href="/admin/tutorials/new"
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                    >
                        Crear nuevo tutorial
                    </Link>
                </div>
            </div>
        </div>
    );
}
