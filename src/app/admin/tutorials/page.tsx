// src/app/admin/tutorials/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Tutorial } from "@/types/Tutorial";
import Link from "next/link";

export default function AdminTutorialsPage() {
    const [tutorials, setTutorials] = useState<Tutorial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTutorials = async () => {
            try {
                // En una implementación real, esto sería una llamada a la API
                // Por ahora, cargaremos los datos de localStorage si existen
                const storedTutorials = localStorage.getItem("tutorials");
                if (storedTutorials) {
                    setTutorials(JSON.parse(storedTutorials));
                }
                setLoading(false);
            } catch (err) {
                setError("Error al cargar los tutoriales");
                setLoading(false);
            }
        };

        fetchTutorials();
    }, []);

    const deleteTutorial = (id: string) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este tutorial?")) {
            const updatedTutorials = tutorials.filter((tutorial) => tutorial.id !== id);
            setTutorials(updatedTutorials);
            localStorage.setItem("tutorials", JSON.stringify(updatedTutorials));
        }
    };

    const togglePublishStatus = (id: string) => {
        const updatedTutorials = tutorials.map((tutorial) =>
            tutorial.id === id ? { ...tutorial, isPublished: !tutorial.isPublished } : tutorial
        );
        setTutorials(updatedTutorials);
        localStorage.setItem("tutorials", JSON.stringify(updatedTutorials));
    };

    if (loading) return <div className="p-8 text-center">Cargando...</div>;
    if (error) return <div className="p-8 text-center text-error">{error}</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Gestión de Tutoriales</h1>
                <Link
                    href="/admin/tutorials/new"
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                >
                    Nuevo Tutorial
                </Link>
            </div>

            {tutorials.length === 0 ? (
                <div className="text-center py-12 bg-surface rounded-md">
                    <p className="text-secondary mb-4">No hay tutoriales todavía</p>
                    <Link
                        href="/admin/tutorials/new"
                        className="text-primary hover:underline"
                    >
                        Crear tu primer tutorial
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-surface">
                                <th className="border-b p-3 text-left">Título</th>
                                <th className="border-b p-3 text-left">Categoría</th>
                                <th className="border-b p-3 text-left">Nivel</th>
                                <th className="border-b p-3 text-left">Fecha</th>
                                <th className="border-b p-3 text-left">Estado</th>
                                <th className="border-b p-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tutorials.map((tutorial) => (
                                <tr
                                    key={tutorial.id}
                                    className="border-b hover:bg-neutral-50"
                                >
                                    <td className="p-3">{tutorial.title}</td>
                                    <td className="p-3">{tutorial.category}</td>
                                    <td className="p-3">{tutorial.level}</td>
                                    <td className="p-3">{tutorial.date}</td>
                                    <td className="p-3">
                                        <span
                                            className={`inline-block px-2 py-1 rounded-full text-xs ${
                                                tutorial.isPublished
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-orange-100 text-orange-800"
                                            }`}
                                        >
                                            {tutorial.isPublished ? "Publicado" : "Borrador"}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex space-x-2">
                                            <Link
                                                href={`/admin/tutorials/edit/${tutorial.id}`}
                                                className="text-primary hover:underline"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => togglePublishStatus(tutorial.id)}
                                                className="text-secondary hover:underline mx-2"
                                            >
                                                {tutorial.isPublished ? "Despublicar" : "Publicar"}
                                            </button>
                                            <button
                                                onClick={() => deleteTutorial(tutorial.id)}
                                                className="text-error hover:underline"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
